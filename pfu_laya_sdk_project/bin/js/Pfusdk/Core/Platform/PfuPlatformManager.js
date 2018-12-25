var PFU;
(function (PFU) {
    var PfuPlatformManager = (function () {
        function PfuPlatformManager() {
            this._privateKey = "";
            this.wx_userInfo = null;
            this._respose1003User = null;
            this._shareInGameHandle = null;
            this._shareInGameCallback = null;
            //pfu后台
            this._gameId = "";
            //是否登录pfu平台
            this._isLoginPlatform = false;
            this.SAVE_KEY = "platform_user";
            this.SAVE_USERPLAY_KEY = "userplayTime";
            this._playtime = 0;
            this._lastTime = 0;
            this.tempAdId = null;
            this._reconnectCount = 0;
            //#region 附加
            this.lastSend2201Type7Time = 0;
            this.lastSend2202Time = 0;
            //#endregion
        }
        PfuPlatformManager.GetInstance = function () {
            if (!this.instance) {
                this.instance = new PfuPlatformManager();
            }
            return this.instance;
        };
        PfuPlatformManager.prototype.Init = function () {
            var _this = this;
            this._privateKey = PFU.PfuConfig.Config.privateKey;
            ;
            //BX.NotificationCenter.GetInstance().AddObserver(this, this.parseMsg2000, PfuPlatformManager.NOTIFYY_MSG_ID + "2000");
            this.Load();
            this._lastTime = Date.now();
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (this._privateKey != "") {
                    PfuPlatformManager.GetInstance().LoginWegame(PFU.PfuConfig.Config.wxId, PFU.PfuConfig.Config.appId);
                }
            }
            PFU.WeChatUtils.GetInstance().OnExitApp(function () {
                _this.OnHide();
            });
            Laya.timer.once(2000, this, function () {
                _this.SetPlayTime();
                Laya.timer.loop(15000, _this, function () {
                    _this.SetPlayTime();
                });
            });
        };
        PfuPlatformManager.prototype.SetInGameUserHandle = function (handle, callback) {
            this._shareInGameHandle = handle;
            this._shareInGameCallback = callback;
        };
        PfuPlatformManager.prototype.Load = function () {
            var dic = PFU.LocalSaveUtils.GetJsonObject(this.SAVE_KEY);
            this._platformUserData = new PlatformShareUserData();
            if (dic != null) {
                for (var key in dic._notifShareInGames.m_KeyValuePairs) {
                    var vs = dic._notifShareInGames.m_KeyValuePairs[key];
                    var data = vs.value;
                    this._platformUserData._notifShareInGames.add(vs.key, data);
                }
                for (var key in dic._userCache.m_KeyValuePairs) {
                    var vs = dic._userCache.m_KeyValuePairs[key];
                    var data = vs.value;
                    this._platformUserData._userCache.add(vs.key, data);
                }
                try {
                    if (dic.userPlayTime) {
                        this._platformUserData.userPlayTime = parseInt("" + dic.userPlayTime);
                    }
                }
                catch (e) {
                    this._platformUserData.userPlayTime = 0;
                }
            }
            var value = PFU.LocalSaveUtils.GetItem(this.SAVE_USERPLAY_KEY);
            if (value) {
                try {
                    this._playtime = parseInt("" + value);
                }
                catch (e) {
                    this._playtime = this._platformUserData.userPlayTime;
                }
            }
            else {
                this._playtime = this._platformUserData.userPlayTime;
                this.SavePlaytime();
            }
        };
        PfuPlatformManager.prototype.SavePlaytime = function () {
            PFU.LocalSaveUtils.SaveItem(this.SAVE_USERPLAY_KEY, this._playtime.toString());
        };
        PfuPlatformManager.prototype.OnShow = function (args) {
            PFU.PfuPlatformManager.GetInstance().SetOnShowWxAdId(args);
            PFU.PfuManager.GetInstance().UpdateNewDay();
            this._lastTime = Date.now();
        };
        PfuPlatformManager.prototype.OnHide = function () {
            if (this._lastTime > 0) {
                //取秒
                var time = (Date.now() - this._lastTime) / 1000;
                PFU.PfuManager.GetInstance().AddPlayTimeCount(Math.floor(time));
                this.SetPlayTime();
                console.log("用户总游戏时长/秒:" + this._platformUserData.userPlayTime);
                this._lastTime = Date.now();
            }
        };
        PfuPlatformManager.prototype.SetPlayTime = function () {
            //取秒
            var time = (Date.now() - this._lastTime) / 1000;
            this._playtime += Math.floor(time);
            this.SavePlaytime();
            this._lastTime = Date.now();
        };
        PfuPlatformManager.prototype.Save = function () {
            PFU.LocalSaveUtils.SaveJsonObject(this.SAVE_KEY, this._platformUserData);
        };
        PfuPlatformManager.prototype.GetUserPlayTime = function () {
            if (this._platformUserData && this._platformUserData.userPlayTime) {
                var time = (Date.now() - this._lastTime) / 1000;
                return this._platformUserData.userPlayTime + Math.floor(time);
            }
            return 0;
        };
        PfuPlatformManager.prototype.GetRunTime = function () {
            var time = (Date.now() - this._lastTime) / 1000;
            return Math.floor(time);
        };
        //private _notifShareInGames: BX.Dictionary<number, Array<Platform_2000_resp_Data>> = new BX.Dictionary<number, Array<Platform_2000_resp_Data>>();
        //private userCache: BX.Dictionary<number, Platform_1333_ResData> = new BX.Dictionary<number, Platform_1333_ResData>();
        /**
         * 解析2000协议
         * @param resp
         */
        PfuPlatformManager.prototype.parseMsg2000 = function (resp) {
            for (var i = 0; i < resp.items.length; i++) {
                var data = resp.items[i];
                this.parseShareInGame(data);
            }
            this.Send2000To2003Msg(resp);
        };
        /**
         * 分析分享的用户数据 请求数据
         * @param data
         */
        PfuPlatformManager.prototype.parseShareInGame = function (data) {
            var _this = this;
            var d = data.text.split("___");
            for (var i = 0; i < d.length; i++) {
                console.log("d:" + d[i]);
            }
            var pos = parseInt(d[2]);
            var list = this._platformUserData._notifShareInGames.get(pos);
            if (list == null) {
                list = new Array();
                this._platformUserData._notifShareInGames.add(pos, list);
                console.log("新增一个pos:" + pos);
            }
            for (var i = 0; i < list.length; i++) {
                if (list[i].senderUid == data.senderUid) {
                    return;
                }
            }
            //Global.StatisticsShareType(StatisticsEventSite.shareInGame);
            list.push(data);
            var list2 = this._platformUserData._notifShareInGames.get(pos);
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("通知UI更新用户头像" + list.length + "|" + list2.length);
            }
            this.GetUidUserDatas(data.senderUid, function (user) {
                if (_this._shareInGameCallback) {
                    _this._shareInGameCallback.call(_this._shareInGameHandle, user);
                }
                //BX.NotificationCenter.GetInstance().PostNotification(PfuPlatformManager.NOTIFY_SHARE_IN_GAME, user);
            });
        };
        PfuPlatformManager.prototype.GetShareUserList = function (pos) {
            if (pos == undefined || pos == void 0) {
                pos == -999;
            }
            var data = new Array();
            console.log("开始查找用户资料!");
            if (this._platformUserData._notifShareInGames.containsKey(pos)) {
                var arr = this._platformUserData._notifShareInGames.get(pos);
                console.log("拥有" + arr.length + "个用户");
                for (var i = 0; i < arr.length; i++) {
                    console.log("userCache中有" + this._platformUserData._userCache.count + "个用户");
                    var resp = this._platformUserData._userCache.get(arr[i].senderUid);
                    if (resp) {
                        console.log("确认用户头像读取完毕!");
                        data.push(resp);
                    }
                }
            }
            return data;
        };
        PfuPlatformManager.prototype.ClearShareUserList = function (pos) {
            this._platformUserData._notifShareInGames.remove(pos);
            this.Save();
        };
        PfuPlatformManager.prototype.GetShareQuery = function (sharePos, addQurey) {
            if (this._respose1003User == null) {
                return "" + (addQurey ? addQurey : "");
            }
            var isNew = this._respose1003User.name ? false : true;
            var query = "shareUid=" + this._respose1003User.uid + "&rinviteGameid=" + this._gameId + "&rinvitePos=" + sharePos + "&isNew=" + isNew;
            console.log("query1:" + query);
            if (query) {
                var param_1 = query + (addQurey ? "&" + addQurey : "");
                param_1 += "&fromUid=" + this._respose1003User.uid;
                return param_1;
            }
            var param = (addQurey ? "&" + addQurey : "");
            param += "&fromUid=" + this._respose1003User.uid;
            return param;
        };
        /**
         * 获取组装消息URL
         * @param msgId
         * @param request
         */
        PfuPlatformManager.prototype.PackageMsgUrl = function (msgId, request, isLogin) {
            var url = isLogin ? this.GetLoginUrlHead(msgId) : this.GetUserUrlHead(msgId);
            url += this.GetContentAndSignAndToken(PfuPlatformManager.MD5_KEY, request);
            if (isLogin) {
            }
            else {
                url += "&p=" + PfuPlatformManager.TOKEN;
            }
            return url;
        };
        PfuPlatformManager.prototype.GetLoginUrlHead = function (msgId) {
            var url = PfuPlatformManager.LOGIN_SERVICE_URL + msgId + "?";
            url += "sVersion=" + PfuPlatformManager.S_VERSION + "&pType=" + PfuPlatformManager.P_TYPE + "&";
            return url;
        };
        PfuPlatformManager.prototype.GetUserUrlHead = function (msgId) {
            var url = PfuPlatformManager.INFO_SERVICE_URL + msgId + "?";
            url += "sVersion=" + PfuPlatformManager.S_VERSION + "&pType=" + PfuPlatformManager.P_TYPE + "&";
            return url;
        };
        PfuPlatformManager.prototype.GetContentAndSignAndToken = function (key, request) {
            var contentJson = JSON.stringify(request);
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("content:" + contentJson);
            }
            var content = Base64.encode(contentJson);
            var sign = md5(content + key).toLowerCase();
            var postData = "content=" + content + "&sign=" + sign;
            return postData;
        };
        //unicode为1个接收数据，串口收到的字符编码放在该数组中
        PfuPlatformManager.prototype.UnicodeToUtf8 = function (unicode) {
            var uchar;
            var utf8str = "";
            var i;
            for (i = 0; i < unicode.length; i += 2) {
                uchar = (unicode[i] << 8) | unicode[i + 1]; //UNICODE为2字节编码，一次读入2个字节
                utf8str = utf8str + String.fromCharCode(uchar); //使用String.fromCharCode强制转换
            }
            return utf8str;
        };
        /**
         * 一 微信登录
         */
        PfuPlatformManager.prototype.LoginWegame = function (wxappId, gameId) {
            this._gameId = gameId;
            wx.login({
                timeout: 3000,
                success: function (res) {
                    console.log("::::" + res.code);
                    PfuPlatformManager.GetInstance().LoginPlatform1003(res.code, wxappId);
                }
            });
        };
        PfuPlatformManager.prototype.SetOnShowWxAdId = function (args) {
            var query = args.query;
            var gdt_vid = query.gdt_vid;
            var weixinadinfo = query.weixinadinfo;
            // 获取⼴告id
            if (weixinadinfo) {
                var weixinadinfoArr = weixinadinfo.split(".");
                this.tempAdId = "" + weixinadinfoArr[0];
            }
        };
        /**
         * 二 平台登录
         */
        PfuPlatformManager.prototype.LoginPlatform1003 = function (weToken, appId) {
            var _this = this;
            var request = new PFU.Platform_1003_Request();
            request.Channel = PfuPlatformManager.IS_DEBUG ? "jfyd" : "weixin";
            request.ext3 = PfuPlatformManager.IS_DEBUG ? "id" : weToken;
            var srcid = "";
            var rinviteUid = 0;
            var options = PFU.WeChatUtils.GetInstance().GetLaunchOptionsSync();
            if (options) {
                var appid = null;
                if (options.referrerInfo) {
                    appid = options.referrerInfo.appId;
                    srcid = appid;
                }
                var sceneId = options.scene;
                if (sceneId == 1007 || sceneId == 1008 || sceneId == 1044 || sceneId == 1096) {
                    srcid = "share";
                }
                if (sceneId == 1005 || sceneId == 1006 || sceneId == 1027 || sceneId == 1042 || sceneId == 1053) {
                    srcid = "search";
                }
                // 参数的query字段中可以获取到gdt_vid、weixinadinfo、channel等参数值
                var query = options.query;
                var gdt_vid = query.gdt_vid;
                var weixinadinfo = query.weixinadinfo;
                // 获取⼴告id
                var aid = 0;
                if (weixinadinfo) {
                    var weixinadinfoArr = weixinadinfo.split(".");
                    aid = weixinadinfoArr[0];
                    srcid = "weixinad_" + aid;
                }
                var shareImage = query.shareImage;
                if (shareImage && shareImage != "") {
                    srcid = "share_" + shareImage;
                }
                var fromUid = query.fromUid;
                if (fromUid && fromUid != "") {
                    try {
                        rinviteUid = parseInt(fromUid);
                    }
                    catch (e) {
                    }
                }
            }
            //Debug.Log("srcId=" + srcid);
            request.srcid = srcid;
            request.selfid = appId;
            request.inviteUid = rinviteUid;
            try {
                request.onlineTime = Math.floor(this._platformUserData.userPlayTime);
            }
            catch (e) {
                request.onlineTime = 0;
            }
            var url = this.PackageMsgUrl(1003, request, true);
            this.HttpGet(url, this, function (data) {
                var respose = data;
                //console.log("havename:" + respose.state);
                if (respose.state == 3) {
                    _this._respose1003User = respose;
                    //token
                    PfuPlatformManager.TOKEN = md5(respose.loginToken + _this._privateKey).toLowerCase();
                    _this._isLoginPlatform = true;
                    console.log("pfu 平台登录成功");
                    if (PFU.PfuConfig.Config.pfuShareProtocol == PFU.PfuSwitch.ON) {
                        _this.ListenMsg2000();
                        _this.IsAuthorizeUser(function (type) {
                            if (type == PfuSdk.SUCCESS) {
                                //继续
                                _this.GetUserInfo();
                                console.log("已经授权");
                            }
                            else {
                                //调用用户授权接口
                                _this.UserAuthorize();
                                console.log("创建授权");
                            }
                        });
                    }
                    else {
                        _this.ShareInGameUpdate();
                    }
                }
                else {
                    console.log("pfu 平台协议登录失败 state:" + respose.state);
                }
            }, function () {
                //登录两次
                PfuPlatformManager._loginCount++; //.GetInstance()._loginCount
                if (PfuPlatformManager._loginCount >= 2) {
                    console.log("pfu 平台登录失败!");
                    return;
                }
                console.log("pfu 登录失败,平台再次登录 等待500毫秒!");
                Laya.timer.once(500, _this, function () {
                    _this.LoginPlatform1003(weToken, appId);
                });
            });
        };
        /**
         * 检查是否已经授权user方法
         * @param fun
         */
        PfuPlatformManager.prototype.IsAuthorizeUser = function (fun) {
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                fun(PfuSdk.SUCCESS);
                return;
            }
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting["scope.userInfo"]) {
                        fun(PfuSdk.SUCCESS);
                    }
                    else {
                        fun(PfuSdk.FAIL);
                    }
                },
                fail: function () {
                    fun(PfuSdk.FAIL);
                }
            });
        };
        /**
         * 拉起授权
         */
        PfuPlatformManager.prototype.UserAuthorize = function () {
            var _this = this;
            //
            var button = Laya.Browser.window.wx.createUserInfoButton({
                type: 'image',
                text: '',
                image: "",
                style: {
                    left: 0,
                    top: 0,
                    width: laya.utils.Browser.width,
                    height: laya.utils.Browser.height,
                    backgroundColor: '#000000',
                    color: '#ffffff',
                }
            });
            button.onTap(function (res) {
                if (res.userInfo) {
                    console.log("用户授权:" + res);
                    _this.wx_userInfo = res.userInfo;
                    _this.ReadyUpdateNewUser();
                    button.destroy();
                }
                else {
                    //弹出提示询问，并且重新创建button 或者不重新创建
                    PFU.WeChatUtils.GetInstance().ShowSingleModal("微信授权", "同意获取个人信息才可以进行更多内容游戏，我们不会泄露用户个人信息，请放心使用。", function () {
                    });
                }
            });
        };
        /**
         * 获取用户信息进行下一步
         * @param respose
         */
        PfuPlatformManager.prototype.GetUserInfo = function () {
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                this.wx_userInfo = [];
                this.wx_userInfo.nickName = "测试";
                this.wx_userInfo.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/pbK4DH6IOuTf0AicCnJHIbKvDTgibmoibdJmiaucIHIuUz6WdjCicqT2dLtRibo2PyS2Lx4Yd7W5JMvcicLtlR4YTUceQ/132";
                this.ReadyUpdateNewUser();
                return;
            }
            wx.getUserInfo({
                success: function (res) {
                    PfuPlatformManager.GetInstance().wx_userInfo = res.userInfo;
                    PfuPlatformManager.GetInstance().ReadyUpdateNewUser();
                },
                fail: function (res) {
                }
            });
        };
        PfuPlatformManager.prototype.ReadyUpdateNewUser = function () {
            var nikeName = this.wx_userInfo.nickName;
            var avatarUrl = this.wx_userInfo.avatarUrl;
            //用户授权登录之后 更新name,和头像地址等信息
            this.NewUserUpdate1801(nikeName, avatarUrl);
        };
        /**
         * 三 新用户要更新头像
         */
        PfuPlatformManager.prototype.NewUserUpdate1801 = function (name, iconUrl) {
            var _this = this;
            var request = new PFU.Platform_1801_Request();
            request.name = name; // encodeURI(name);// escape(name);//name;
            request.picUrl = iconUrl;
            console.log("send1801 name:" + name);
            var url = this.PackageMsgUrl(1801, request, false);
            this.HttpGet(url, this, function (data) {
                var respose = data;
                if (respose.state == 3) {
                    console.log("更新用户信息成功!");
                    _this.ShareInGameUpdate();
                }
                else {
                    console.log("更新用户信息失败!" + respose.state);
                }
            }, function () {
                console.log("更新用户信息失败!");
            });
        };
        /**
         * 四 通过分享链接进入游戏
         */
        PfuPlatformManager.prototype.ShareInGameUpdate = function () {
            var query; // "shareUid=1001&rinviteGameid=1306124&rinvitePos=1&isNew=false";
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                query = PFU.WeChatUtils.GetInstance().GetLaunchOptionsSync().query;
            }
            //游戏入口监听，从何方进入 从分享链接进入 检测数值
            //在分享时添加query必须是key1=val1&key2=val2 的格式
            //获取 wx.getLaunchInfoSync  或  wx.onShow  启动参数Query 
            if (query) {
                //shareUid=&rinviteGameid=&rinvitePos=&isNew
                if (query.shareUid && query.rinviteGameid && query.rinvitePos) {
                    var shareUid = parseInt(query.shareUid); //???
                    var rinviteGameid = parseInt(query.rinviteGameid); //游戏ID 从哪儿来？
                    var rinvitePos = parseInt(query.rinvitePos); //自定义
                    var isNew = this._respose1003User.name ? false : true;
                    if (shareUid && rinviteGameid && rinvitePos) {
                        this.ShareInGameMsg1332(shareUid, rinviteGameid, rinvitePos, isNew);
                    }
                }
            }
        };
        PfuPlatformManager.prototype.ShareInGameMsg1332 = function (shareUid, rinviteGameid, rinvitePos, isNewUser) {
            var request = new PFU.Platform_1332_Request();
            request.shareUid = shareUid;
            request.rinviteGameid = rinviteGameid;
            request.rinvitePos = rinvitePos;
            request.isNew = isNewUser;
            var url = this.PackageMsgUrl(1332, request);
            this.HttpGet(url, this, function (data) {
                var respose = data;
                console.log("发送分享进入数据成功!" + respose.state);
            }, function () {
                console.log("发送分享进入数据失败!");
            });
        };
        /**
         * 监听 websocket 2000协议
         */
        PfuPlatformManager.prototype.ListenMsg2000 = function () {
            //sokect 监听
            if (this.socket != null) {
                try {
                    this.socket.cleanSocket();
                    this.socket.close();
                }
                catch (e) {
                    console.log("" + e);
                }
            }
            this.socket = new Laya.Socket();
            this.socket.connectByUrl(PfuPlatformManager.SOCKET_SERVICE_URL + "msg?pType=" + PfuPlatformManager.P_TYPE + "&p=" + PfuPlatformManager.TOKEN);
            //this.socket.connectByUrl("ws://192.168.0.34:8083/xxl/msg?pType=" + PfuPlatformManager.P_TYPE + "&p=" + PfuPlatformManager.TOKEN);
            this.output = this.socket.output;
            this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
            this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
        };
        PfuPlatformManager.prototype.onSocketOpen = function () {
            var _this = this;
            console.log("Connected");
            //启动时间控制器 需求不高 1分钟一次即可
            this.SendHeartbeat2002Msg();
            Laya.timer.loop(30000, this, function () {
                _this.SendHeartbeat2002Msg();
            });
            this._reconnectCount = 0;
        };
        /**
         * 心跳
         */
        PfuPlatformManager.prototype.SendHeartbeat2002Msg = function () {
            var req = new PFU.Platform_2002_Request();
            this.SendSocketMsg(req, 2002);
        };
        /**
         * 收到2000回执判断
         */
        PfuPlatformManager.prototype.Send2000To2003Msg = function (resp) {
            console.log("准备发送2003");
            var itemList = [];
            for (var i = 0; i < resp.items.length; i++) {
                var action = resp.items[i].action;
                if (action == 15 || action == 16) {
                    itemList.push(resp.items[i].time);
                }
            }
            console.log("找到" + itemList.length + "条需要发送的time");
            if (itemList.length > 0) {
                var req = new PFU.Platform_2003_Request();
                req.timeList = itemList;
                this.SendSocketMsg(req, 2003);
                console.log("开始发送2003");
            }
        };
        PfuPlatformManager.prototype.SendSocketMsg = function (request, msgId) {
            var array = null;
            var contentJson = JSON.stringify(request);
            array = this.stringToUint8Array(contentJson); //消息内容：
            var protoLength = array.length;
            var msgAllLength = 4 + 2 + 2 + protoLength;
            var pBosStream = new PFU.Bostream(msgAllLength);
            pBosStream.writeInt32(protoLength);
            pBosStream.writeShort(1);
            pBosStream.writeShort(msgId);
            pBosStream.writeArray(array);
            this.socket.send(pBosStream.buffer());
            //Debug.Log("send data:" + pBosStream.buffer().byteLength);
        };
        PfuPlatformManager.prototype.stringToUint8Array = function (str) {
            var arr = [];
            for (var i = 0, j = str.length; i < j; ++i) {
                arr.push(str.charCodeAt(i));
            }
            var tmpUint8Array = new Uint8Array(arr);
            return tmpUint8Array;
        };
        PfuPlatformManager.prototype.onSocketClose = function () {
            var _this = this;
            console.log("Socket closed");
            Laya.timer.once(this._reconnectCount * 10000, this, function () {
                _this.ListenMsg2000();
            });
            this._reconnectCount++;
            if (this._reconnectCount > 3) {
                this._reconnectCount = 3;
            }
        };
        PfuPlatformManager.prototype.onMessageReveived = function (message) {
            var array = new DataView(message);
            var pos = 0;
            var msgAllLength = array.getInt32(pos);
            pos += 4;
            var b = array.getInt8(pos);
            pos += 1;
            var msgId = array.getInt16(pos);
            pos += 2;
            var type = array.getInt16(pos);
            pos += 2;
            console.log("解码:" + msgId);
            var com = array.buffer.slice(pos, array.byteLength);
            switch (msgId) {
                case 2002:
                    break;
                case 2000:
                    {
                        var jsonStr_1 = this.ab2str(com);
                        console.log("socket Reveived 2000:" + jsonStr_1);
                        this.parseMsg2000(JSON.parse(jsonStr_1));
                    }
                    break;
                default:
                    //解析com
                    var jsonStr = this.ab2str(com);
                    console.log("socket Reveived " + msgId + ":" + jsonStr);
                    //unescape()
                    //BX.NotificationCenter.GetInstance().PostNotification(PfuPlatformManager.NOTIFYY_MSG_ID + msgId, JSON.parse(jsonStr));
                    break;
            }
            this.socket.input.clear();
        };
        PfuPlatformManager.prototype.ab2str = function (buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        };
        PfuPlatformManager.prototype.onConnectError = function (e) {
            console.log("error");
        };
        // endregion
        //根据uid列表获取玩家资料
        PfuPlatformManager.prototype.GetUidUserDatas = function (uid, fun) {
            var _this = this;
            if (this._platformUserData._userCache.containsKey(uid)) {
                var resp = this._platformUserData._userCache.get(uid);
                fun(resp);
                return;
            }
            //发送1333协议 获取
            var request = new PFU.Platform_1333_Request();
            request.uids = "" + uid;
            var url = this.PackageMsgUrl(1333, request);
            this.HttpGet(url, this, function (data) {
                var respose = data;
                if (respose.state == 3) {
                    for (var i = 0; i < respose.infos.length; i++) {
                        _this._platformUserData._userCache.add(respose.infos[i].uid, respose.infos[i]);
                        _this.Save();
                        fun(respose.infos[i]);
                    }
                    console.log("获取用户数据成功!");
                }
                else {
                    console.log("获取用户数据失败!" + respose.state);
                }
            }, function () {
                console.log("获取用户数据失败!");
            });
        };
        PfuPlatformManager.prototype.HttpGet = function (url, handle, callSucceed, callFail) {
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("url:" + url);
            }
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (e) {
                var data = JSON.parse(Base64.decode(e));
                console.log("http parse:" + JSON.stringify(data));
                callSucceed.call(handle, data);
            });
            xhr.once(Laya.Event.ERROR, this, function (data) {
                callFail.call(handle, data);
            });
            xhr.send(url, "", "get", "text");
        };
        /**
         * 点击量统计
         * @param type
         * @param picId
         */
        PfuPlatformManager.prototype.StatisticsMsg2201 = function (type, picId) {
            if (!this._isLoginPlatform) {
                return;
            }
            if (type == PlatformStatisticsType.shareGame) {
                var t = (Date.now() - this.lastSend2201Type7Time) / 1000;
                if (t < 2000) {
                    return;
                }
            }
            this.lastSend2201Type7Time = Date.now();
            var request = new PFU.Platform_2201_Request();
            request.type = type;
            request.picId = picId;
            var url = this.PackageMsgUrl(2201, request);
            this.HttpGet(url, this, function (data) {
                var respose = data;
                console.log("上报点击量统计成功!" + respose.state);
            }, function () {
                console.log("上报点击量统计失败!");
            });
        };
        PfuPlatformManager.prototype.StatisticsMsg2202 = function () {
            if (!this._isLoginPlatform) {
                return;
            }
            var t = (Date.now() - this.lastSend2202Time) / 1000;
            if (t < 2000) {
                return;
            }
            this.lastSend2202Time = Date.now();
            var request = new PFU.Platform_2202_Request();
            request.type = PlatformStatisticsType.videocomplete;
            var url = this.PackageMsgUrl(2202, request);
            this.HttpGet(url, this, function (data) {
                var respose = data;
                console.log("上报视频播放完成成功!" + respose.state);
            }, function () {
                console.log("上报视频播放完成失败!");
            });
        };
        return PfuPlatformManager;
    }());
    PfuPlatformManager.NOTIFYY_MSG_ID = "SOCKET_";
    PfuPlatformManager.NOTIFY_SHARE_IN_GAME = "n_s_in_game";
    PfuPlatformManager.LOGIN_SERVICE_URL = "https://login.jfydgame.com/user/";
    //public static LOGIN_SERVICE_URL = "http://192.168.0.34:8081/user/";
    PfuPlatformManager.INFO_SERVICE_URL = "https://info.jfydgame.com/user/";
    //public static INFO_SERVICE_URL = "http://192.168.0.34:8082/user/";
    PfuPlatformManager.SOCKET_SERVICE_URL = "wss://msg.jfydgame.com/xxl/";
    //public static SOCKET_SERVICE_URL = "ws://192.168.0.34:8083/xxl";
    PfuPlatformManager.S_VERSION = "1024"; //固定不变
    PfuPlatformManager.P_TYPE = "2"; //固定不变
    PfuPlatformManager.MD5_KEY = "60cff75d0d1e4d548d9f4bca35916b21";
    PfuPlatformManager.IS_DEBUG = false;
    PfuPlatformManager.IS_DEBUG_LOG = true;
    //pfu token
    PfuPlatformManager.TOKEN = "";
    PfuPlatformManager._loginCount = 0;
    PFU.PfuPlatformManager = PfuPlatformManager;
    var PlatformShareUserData = (function () {
        function PlatformShareUserData() {
            this._notifShareInGames = new PFU.Dictionary();
            this._userCache = new PFU.Dictionary();
            this.userPlayTime = 0;
        }
        return PlatformShareUserData;
    }());
    var PlatformStatisticsType;
    (function (PlatformStatisticsType) {
        PlatformStatisticsType[PlatformStatisticsType["moreGame"] = 5] = "moreGame";
        PlatformStatisticsType[PlatformStatisticsType["crossGame"] = 6] = "crossGame";
        PlatformStatisticsType[PlatformStatisticsType["shareGame"] = 8] = "shareGame";
        //协议2202
        PlatformStatisticsType[PlatformStatisticsType["videocomplete"] = 7] = "videocomplete";
    })(PlatformStatisticsType = PFU.PlatformStatisticsType || (PFU.PlatformStatisticsType = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuPlatformManager.js.map