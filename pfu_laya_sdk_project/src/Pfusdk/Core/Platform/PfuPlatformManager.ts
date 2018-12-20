namespace PFU {
    export class PfuPlatformManager {
        private static instance: PfuPlatformManager;

        public static GetInstance(): PfuPlatformManager {
            if (!this.instance) {
                this.instance = new PfuPlatformManager();
            }
            return this.instance;
        }

        public static NOTIFYY_MSG_ID = "SOCKET_";
        public static NOTIFY_SHARE_IN_GAME = "n_s_in_game";

        public static LOGIN_SERVICE_URL = "https://login.jfydgame.com/user/";
        //public static LOGIN_SERVICE_URL = "http://192.168.0.34:8081/user/";
        public static INFO_SERVICE_URL = "https://info.jfydgame.com/user/";
        //public static INFO_SERVICE_URL = "http://192.168.0.34:8082/user/";

        public static SOCKET_SERVICE_URL = "wss://msg.jfydgame.com/xxl/";
        //public static SOCKET_SERVICE_URL = "ws://192.168.0.34:8083/xxl";


        public static S_VERSION = "1024";//固定不变
        public static P_TYPE = "2";//固定不变
        public static MD5_KEY = "60cff75d0d1e4d548d9f4bca35916b21";

        public static IS_DEBUG = false;
        public static IS_DEBUG_LOG = true;

        //pfu token
        public static TOKEN: string = "";

        private _privateKey: string = "";

        private wx_userInfo: any = null;

        private _respose1003User: Platform_1003_Response = null;

        private _shareInGameHandle: any = null;
        private _shareInGameCallback: Function = null;

        //pfu后台
        private _gameId: string = "";

        private _platformUserData: PlatformShareUserData;
        //是否登录pfu平台
        private _isLoginPlatform: boolean = false;





        public Init() {
            this._privateKey = PfuConfig.Config.privateKey;;

            //BX.NotificationCenter.GetInstance().AddObserver(this, this.parseMsg2000, PfuPlatformManager.NOTIFYY_MSG_ID + "2000");

            this.Load();


            if (WeChatUtils.GetInstance().IsWeGame()) {
                if (this._privateKey != "") {

                    PfuPlatformManager.GetInstance().LoginWegame(PfuConfig.Config.wxId, PfuConfig.Config.appId);
                }
            }
        }

        public SetInGameUserHandle(handle: any, callback: Function) {
            this._shareInGameHandle = handle;
            this._shareInGameCallback = callback;
        }

        private SAVE_KEY = "platform_user";

        private Load() {
            let dic = LocalSaveUtils.GetJsonObject(this.SAVE_KEY);
            this._platformUserData = new PlatformShareUserData();
            if (dic != null) {

                for (let key in dic._notifShareInGames.m_KeyValuePairs) {
                    let vs = dic._notifShareInGames.m_KeyValuePairs[key];
                    let data: Array<Platform_2000_resp_Data> = <Array<Platform_2000_resp_Data>>vs.value;
                    this._platformUserData._notifShareInGames.add(vs.key, data);
                }

                for (let key in dic._userCache.m_KeyValuePairs) {
                    let vs = dic._userCache.m_KeyValuePairs[key];
                    let data: Platform_1333_ResData = <Platform_1333_ResData>vs.value;
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
        }

        private _lastTime = 0;

        public OnShow(args: any) {
            PFU.PfuPlatformManager.GetInstance().SetOnShowWxAdId(args);
            this._lastTime = Date.now();
        }

        public OnHide() {
            if (this._lastTime > 0) {
                //取秒
                let time = (Date.now() - this._lastTime) / 1000;
                console.log("本次游戏时长/秒:" + time);
                this._platformUserData.userPlayTime += Math.floor(time);
                console.log("用户总游戏时长/秒:" + this._platformUserData.userPlayTime)
                this.Save();

                this._lastTime = Date.now();
            }
        }


        public Save() {
            LocalSaveUtils.SaveJsonObject(this.SAVE_KEY, this._platformUserData);
        }

        public GetUserPlayTime()
        {
            if(this._platformUserData && this._platformUserData.userPlayTime)
            {
                return this._platformUserData.userPlayTime;
            }
            return 0;
        }

        //private _notifShareInGames: BX.Dictionary<number, Array<Platform_2000_resp_Data>> = new BX.Dictionary<number, Array<Platform_2000_resp_Data>>();
        //private userCache: BX.Dictionary<number, Platform_1333_ResData> = new BX.Dictionary<number, Platform_1333_ResData>();

        /**
         * 解析2000协议
         * @param resp 
         */
        private parseMsg2000(resp: Platform_2000_Response) {
            for (let i = 0; i < resp.items.length; i++) {
                let data: Platform_2000_resp_Data = resp.items[i];
                this.parseShareInGame(data);
            }

            this.Send2000To2003Msg(resp);
        }
        /**
         * 分析分享的用户数据 请求数据
         * @param data 
         */
        private parseShareInGame(data: Platform_2000_resp_Data) {
            let d: string[] = data.text.split("___");

            for (let i = 0; i < d.length; i++) {
                console.log("d:" + d[i]);
            }

            let pos = parseInt(d[2]);
            let list = this._platformUserData._notifShareInGames.get(pos)
            if (list == null) {
                list = new Array<Platform_2000_resp_Data>();
                this._platformUserData._notifShareInGames.add(pos, list);
                console.log("新增一个pos:" + pos)
            }

            for (let i = 0; i < list.length; i++) {
                if (list[i].senderUid == data.senderUid) {
                    return;
                }
            }

            //Global.StatisticsShareType(StatisticsEventSite.shareInGame);

            list.push(data);

            let list2 = this._platformUserData._notifShareInGames.get(pos);
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("通知UI更新用户头像" + list.length + "|" + list2.length);
            }

            this.GetUidUserDatas(data.senderUid, (user: Platform_1333_ResData) => {

                if (this._shareInGameCallback) {
                    this._shareInGameCallback.call(this._shareInGameHandle, user);
                }
                //BX.NotificationCenter.GetInstance().PostNotification(PfuPlatformManager.NOTIFY_SHARE_IN_GAME, user);
            });

        }

        public GetShareUserList(pos?: number): Array<Platform_1333_ResData> {

            if (pos == undefined || pos == void 0)  {
                pos == -999;
            }

            let data = new Array<Platform_1333_ResData>();
            console.log("开始查找用户资料!");
            if (this._platformUserData._notifShareInGames.containsKey(pos)) {
                let arr = this._platformUserData._notifShareInGames.get(pos);

                console.log("拥有" + arr.length + "个用户");
                for (let i = 0; i < arr.length; i++) {
                    console.log("userCache中有" + this._platformUserData._userCache.count + "个用户");
                    let resp = this._platformUserData._userCache.get(arr[i].senderUid);
                    if (resp) {
                        console.log("确认用户头像读取完毕!");
                        data.push(resp);
                    }
                }
            }
            return data;
        }

        public ClearShareUserList(pos: number) {
            this._platformUserData._notifShareInGames.remove(pos);
            this.Save();
        }

        public GetShareQuery(sharePos: number, addQurey?: string): string {
            if (this._respose1003User == null) {
                return "" + (addQurey ? addQurey : "");
            }
            let isNew = this._respose1003User.name ? false : true;
            let query: string = "shareUid=" + this._respose1003User.uid + "&rinviteGameid=" + this._gameId + "&rinvitePos=" + sharePos + "&isNew=" + isNew;
            console.log("query1:" + query);
            if (query) {
                let param = query + (addQurey ? "&" + addQurey : "");
                param += "&fromUid=" + this._respose1003User.uid;
                return param;
            }
            let param = (addQurey ? "&" + addQurey : "");
            param += "&fromUid=" + this._respose1003User.uid;
            return param;
        }

        /**
         * 获取组装消息URL
         * @param msgId 
         * @param request 
         */
        public PackageMsgUrl(msgId: number, request: any, isLogin?: boolean): string {
            let url = isLogin ? this.GetLoginUrlHead(msgId) : this.GetUserUrlHead(msgId);
            url += this.GetContentAndSignAndToken(PfuPlatformManager.MD5_KEY, request);
            if (isLogin) {

            } else {
                url += "&p=" + PfuPlatformManager.TOKEN;
            }
            return url;
        }

        private GetLoginUrlHead(msgId: number) {
            let url = PfuPlatformManager.LOGIN_SERVICE_URL + msgId + "?";
            url += "sVersion=" + PfuPlatformManager.S_VERSION + "&pType=" + PfuPlatformManager.P_TYPE + "&";
            return url;
        }

        private GetUserUrlHead(msgId: number) {
            let url = PfuPlatformManager.INFO_SERVICE_URL + msgId + "?";
            url += "sVersion=" + PfuPlatformManager.S_VERSION + "&pType=" + PfuPlatformManager.P_TYPE + "&";
            return url;
        }

        public GetContentAndSignAndToken(key: string, request: any): string {
            let contentJson: string = JSON.stringify(request);

            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("content:" + contentJson);
            }
            let content: string = Base64.encode(contentJson);
            let sign: string = md5(content + key).toLowerCase();
            let postData = "content=" + content + "&sign=" + sign;
            return postData;
        }
        //unicode为1个接收数据，串口收到的字符编码放在该数组中
        private UnicodeToUtf8(unicode) {
            var uchar;
            var utf8str = "";
            var i;

            for (i = 0; i < unicode.length; i += 2) {
                uchar = (unicode[i] << 8) | unicode[i + 1];				//UNICODE为2字节编码，一次读入2个字节
                utf8str = utf8str + String.fromCharCode(uchar);	//使用String.fromCharCode强制转换
            }
            return utf8str;
        }

        /**
         * 一 微信登录
         */
        public LoginWegame(wxappId: string, gameId: string) {
            this._gameId = gameId;
            wx.login({
                timeout: 3000,
                success: function (res) {
                    console.log("::::" + res.code);
                    PfuPlatformManager.GetInstance().LoginPlatform1003(res.code, wxappId);
                }
            });
        }

        private tempAdId = null;
        public SetOnShowWxAdId(args) {
            let query = args.query;
            let gdt_vid = query.gdt_vid;
            let weixinadinfo = query.weixinadinfo;
            // 获取⼴告id
            if (weixinadinfo) {
                let weixinadinfoArr = weixinadinfo.split(".");
                this.tempAdId = "" + weixinadinfoArr[0];
            }
        }


        private static _loginCount = 0;

        /**
         * 二 平台登录
         */
        public LoginPlatform1003(weToken: string, appId: string) {
            let request: Platform_1003_Request = new Platform_1003_Request();
            request.Channel = PfuPlatformManager.IS_DEBUG ? "jfyd" : "weixin";
            request.ext3 = PfuPlatformManager.IS_DEBUG ? "id" : weToken;

            let srcid = "";
            let rinviteUid = 0;
            let options = WeChatUtils.GetInstance().GetLaunchOptionsSync();

            if (options) {

                let appid = null;
                if (options.referrerInfo) {
                    appid = options.referrerInfo.appId;
                    srcid = appid;
                }
                let sceneId = options.scene;
                if (sceneId == 1007 || sceneId == 1008 || sceneId == 1044 || sceneId == 1096) {
                    srcid = "share";

                }
                if (sceneId == 1005 || sceneId == 1006 || sceneId == 1027 || sceneId == 1042 || sceneId == 1053) {
                    srcid = "search";
                }
                // 参数的query字段中可以获取到gdt_vid、weixinadinfo、channel等参数值
                let query = options.query;
                let gdt_vid = query.gdt_vid;
                let weixinadinfo = query.weixinadinfo;
                // 获取⼴告id
                let aid = 0;
                if (weixinadinfo) {
                    let weixinadinfoArr = weixinadinfo.split(".");
                    aid = weixinadinfoArr[0];
                    srcid = "weixinad_" + aid;
                }
                let shareImage = query.shareImage;
                if (shareImage && shareImage != "") {
                    srcid = "share_" + shareImage;
                }
                let fromUid = query.fromUid;
                if (fromUid && fromUid != "") {
                    try {
                        rinviteUid = parseInt(fromUid);
                    }
                    catch (e) {

                    }
                }

                // let aid = WeChatUtils.GetInstance().GetAdAid();
                // if (this.tempAdId != null) {
                //     srcid = "weixinad_" + this.tempAdId;
                // }
                // else if (aid != null || options.scene == 1045 || options.scene == 1046 || options.scene == 1067 || options.scene == 1084) {//1045 1046 1067 1084
                //     srcid = "weixinad_" + aid;

                // } else if (options.scene == 1007 || options.scene == 1008 || options.scene == 1044 || options.scene == 1096) {//1007 1008 1044 1096
                //     srcid = "share";
                // }
                // else if (options.scene == 1005 || options.scene == 1006 || options.scene == 1027 || options.scene == 1053) {//1005 1006 1027 1042 1053
                //     srcid = "search";
                // } else {//
                //     let referrerInfo = options.referrerInfo;
                //     if (referrerInfo && referrerInfo.appId) {
                //         srcid = referrerInfo.appId;
                //     }
                // }
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


            let url = this.PackageMsgUrl(1003, request, true);

            this.HttpGet(url, this, (data) => {
                let respose: Platform_1003_Response = data;
                //console.log("havename:" + respose.state);
                if (respose.state == 3) {
                    this._respose1003User = respose;
                    //token
                    PfuPlatformManager.TOKEN = md5(respose.loginToken + this._privateKey).toLowerCase();
                    this._isLoginPlatform = true;
                    console.log("pfu 平台登录成功");
                    if (PfuConfig.Config.pfuShareProtocol == PfuSwitch.ON) {
                        this.ListenMsg2000();
                        this.IsAuthorizeUser((type) => {
                            if (type == PfuSdk.SUCCESS) {
                                //继续
                                this.GetUserInfo();
                                console.log("已经授权");
                            }
                            else {
                                //调用用户授权接口
                                this.UserAuthorize();
                                console.log("创建授权");
                            }
                        })
                    }
                    else {
                        this.ShareInGameUpdate()
                    }
                }
                else {
                    console.log("pfu 平台协议登录失败 state:" + respose.state);
                }


            }, () => {

                //登录两次
                PfuPlatformManager._loginCount++;//.GetInstance()._loginCount
                if (PfuPlatformManager._loginCount >= 2)  {
                    console.log("pfu 平台登录失败!");
                    return;
                }

                console.log("pfu 登录失败,平台再次登录 等待500毫秒!");
                Laya.timer.once(500, this, () => {
                    this.LoginPlatform1003(weToken, appId);
                });
            });
        }

        /**
         * 检查是否已经授权user方法
         * @param fun 
         */
        private IsAuthorizeUser(fun: Function) {

            if (!WeChatUtils.GetInstance().IsWeGame()) {
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
        }

        /**
         * 拉起授权
         */
        private UserAuthorize() {
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
            button.onTap((res) => {
                if (res.userInfo) {
                    console.log("用户授权:" + res);
                    this.wx_userInfo = res.userInfo;
                    this.ReadyUpdateNewUser();
                    button.destroy();

                } else {
                    //弹出提示询问，并且重新创建button 或者不重新创建
                    WeChatUtils.GetInstance().ShowSingleModal("微信授权", "同意获取个人信息才可以进行更多内容游戏，我们不会泄露用户个人信息，请放心使用。", () => {

                    });

                    //button.destroy();
                }
            })
        }

        /**
         * 获取用户信息进行下一步
         * @param respose 
         */
        private GetUserInfo() {
            if (!WeChatUtils.GetInstance().IsWeGame()) {
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
        }

        private ReadyUpdateNewUser() {
            let nikeName = this.wx_userInfo.nickName;
            let avatarUrl = this.wx_userInfo.avatarUrl;
            //用户授权登录之后 更新name,和头像地址等信息
            this.NewUserUpdate1801(nikeName, avatarUrl);
        }


        /**
         * 三 新用户要更新头像
         */
        public NewUserUpdate1801(name: string, iconUrl: string) {
            let request: Platform_1801_Request = new Platform_1801_Request();
            request.name = name;// encodeURI(name);// escape(name);//name;
            request.picUrl = iconUrl;
            console.log("send1801 name:" + name);

            let url = this.PackageMsgUrl(1801, request, false);
            this.HttpGet(url, this, (data) => {
                let respose: Platform_1801_Response = data;
                if (respose.state == 3) {
                    console.log("更新用户信息成功!");
                    this.ShareInGameUpdate();
                }
                else {
                    console.log("更新用户信息失败!" + respose.state);
                }
            }, () => {
                console.log("更新用户信息失败!");
            });
        }

        /**
         * 四 通过分享链接进入游戏
         */
        public ShareInGameUpdate() {

            let query: any;// "shareUid=1001&rinviteGameid=1306124&rinvitePos=1&isNew=false";
            if (WeChatUtils.GetInstance().IsWeGame()) {
                query = WeChatUtils.GetInstance().GetLaunchOptionsSync().query;
            }


            //游戏入口监听，从何方进入 从分享链接进入 检测数值
            //在分享时添加query必须是key1=val1&key2=val2 的格式

            //获取 wx.getLaunchInfoSync  或  wx.onShow  启动参数Query 

            if (query) {
                //shareUid=&rinviteGameid=&rinvitePos=&isNew

                if (query.shareUid && query.rinviteGameid && query.rinvitePos) {
                    let shareUid: number = parseInt(query.shareUid);  //???
                    let rinviteGameid: number = parseInt(query.rinviteGameid); //游戏ID 从哪儿来？
                    let rinvitePos: number = parseInt(query.rinvitePos); //自定义
                    let isNew: boolean = this._respose1003User.name ? false : true;

                    if (shareUid && rinviteGameid && rinvitePos) {
                        this.ShareInGameMsg1332(shareUid, rinviteGameid, rinvitePos, isNew);
                    }
                }
            }
        }

        public ShareInGameMsg1332(shareUid: number, rinviteGameid: number, rinvitePos: number, isNewUser: boolean) {
            let request: Platform_1332_Request = new Platform_1332_Request();
            request.shareUid = shareUid;
            request.rinviteGameid = rinviteGameid;
            request.rinvitePos = rinvitePos;
            request.isNew = isNewUser;

            let url = this.PackageMsgUrl(1332, request);
            this.HttpGet(url, this, (data) => {
                let respose: Platform_1332_Response = data;
                console.log("发送分享进入数据成功!" + respose.state);
            }, () => {
                console.log("发送分享进入数据失败!");
            });
        }

        // region
        private socket: Laya.Socket;
        private output: any;

        private _reconnectCount = 0;
        /**
         * 监听 websocket 2000协议
         */
        public ListenMsg2000() {
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

        }

        private onSocketOpen(): void {
            console.log("Connected");
            //启动时间控制器 需求不高 1分钟一次即可
            this.SendHeartbeat2002Msg();
            Laya.timer.loop(30000, this, () => {
                this.SendHeartbeat2002Msg();
            });
            this._reconnectCount = 0;
        }

        /**
         * 心跳
         */
        private SendHeartbeat2002Msg() {
            let req = new Platform_2002_Request();
            this.SendSocketMsg(req, 2002);
        }

        /**
         * 收到2000回执判断
         */
        private Send2000To2003Msg(resp: Platform_2000_Response) {
            console.log("准备发送2003");
            let itemList = [];
            for (let i = 0; i < resp.items.length; i++) {
                let action = resp.items[i].action;
                if (action == 15 || action == 16) {
                    itemList.push(resp.items[i].time);
                }
            }
            console.log("找到" + itemList.length + "条需要发送的time");
            if (itemList.length > 0) {
                let req = new Platform_2003_Request();
                req.timeList = itemList;
                this.SendSocketMsg(req, 2003);
                console.log("开始发送2003");
            }
        }

        private SendSocketMsg(request: any, msgId: number) {
            let array = null;
            let contentJson: string = JSON.stringify(request);
            array = this.stringToUint8Array(contentJson); //消息内容：
            let protoLength = array.length;
            let msgAllLength = 4 + 2 + 2 + protoLength;
            let pBosStream = new Bostream(msgAllLength);
            pBosStream.writeInt32(protoLength);
            pBosStream.writeShort(1);
            pBosStream.writeShort(msgId);
            pBosStream.writeArray(array);

            this.socket.send(pBosStream.buffer());

            //Debug.Log("send data:" + pBosStream.buffer().byteLength);
        }

        public stringToUint8Array(str): Uint8Array {
            var arr = [];
            for (var i = 0, j = str.length; i < j; ++i) {
                arr.push(str.charCodeAt(i));
            }

            var tmpUint8Array = new Uint8Array(arr);
            return tmpUint8Array
        }

        private onSocketClose(): void {
            console.log("Socket closed");
            Laya.timer.once(this._reconnectCount * 10000, this, () => {
                this.ListenMsg2000();
            });
            this._reconnectCount++;
            if (this._reconnectCount > 3) {
                this._reconnectCount = 3;
            }
        }

        private onMessageReveived(message: any): void {

            let array = new DataView(message);
            let pos = 0;
            let msgAllLength = array.getInt32(pos);
            pos += 4;
            let b = array.getInt8(pos);
            pos += 1;
            let msgId = array.getInt16(pos);
            pos += 2;
            let type = array.getInt16(pos);
            pos += 2;
            console.log("解码:" + msgId);
            let com: ArrayBuffer = array.buffer.slice(pos, array.byteLength);
            switch (msgId) {
                case 2002:
                    break;
                case 2000:
                    {
                        let jsonStr = this.ab2str(com);
                        console.log("socket Reveived 2000:" + jsonStr);
                        this.parseMsg2000(JSON.parse(jsonStr));
                    }
                    break;
                default:
                    //解析com
                    let jsonStr = this.ab2str(com);
                    console.log("socket Reveived " + msgId + ":" + jsonStr);
                    //unescape()

                    //BX.NotificationCenter.GetInstance().PostNotification(PfuPlatformManager.NOTIFYY_MSG_ID + msgId, JSON.parse(jsonStr));
                    break;
            }
            this.socket.input.clear();
        }

        private ab2str(buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        }
        private onConnectError(e: Event): void {
            console.log("error");

        }

        // endregion
        //根据uid列表获取玩家资料
        public GetUidUserDatas(uid: number, fun: Function) {

            if (this._platformUserData._userCache.containsKey(uid)) {
                let resp = this._platformUserData._userCache.get(uid);
                fun(resp);
                return;
            }

            //发送1333协议 获取
            let request: Platform_1333_Request = new Platform_1333_Request();
            request.uids = "" + uid;

            let url = this.PackageMsgUrl(1333, request);
            this.HttpGet(url, this, (data) => {
                let respose: Platform_1333_Response = data;
                if (respose.state == 3) {
                    for (let i = 0; i < respose.infos.length; i++) {
                        this._platformUserData._userCache.add(respose.infos[i].uid, respose.infos[i]);
                        this.Save();
                        fun(respose.infos[i]);
                    }
                    console.log("获取用户数据成功!");
                }
                else {
                    console.log("获取用户数据失败!" + respose.state);
                }

            }, () => {
                console.log("获取用户数据失败!");
            });

        }


        public HttpGet(url: string, handle: any, callSucceed: Function, callFail: Function) {
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("url:" + url);
            }
            let xhr: Laya.HttpRequest = new Laya.HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, (e: any) => {
                let data = JSON.parse(Base64.decode(e));
                console.log("http parse:" + JSON.stringify(data));
                callSucceed.call(handle, data);
            });
            xhr.once(Laya.Event.ERROR, this, (data: any) => {
                callFail.call(handle, data);
            });
            xhr.send(url, "", "get", "text");
        }



        //#region 附加

        private lastSend2201Type7Time = 0;
        /**
         * 点击量统计
         * @param type 
         * @param picId 
         */
        public StatisticsMsg2201(type: PlatformStatisticsType, picId: string) {
            if (!this._isLoginPlatform) {
                return;
            }
            if (type == PlatformStatisticsType.shareGame)  {
                let t = (Date.now() - this.lastSend2201Type7Time) / 1000;
                if (t < 2000)  {
                    return;
                }
            }
            this.lastSend2201Type7Time = Date.now();

            let request: Platform_2201_Request = new Platform_2201_Request();
            request.type = type;
            request.picId = picId;

            let url = this.PackageMsgUrl(2201, request);

            this.HttpGet(url, this, (data) => {
                let respose: Platform_1332_Response = data;
                console.log("上报点击量统计成功!" + respose.state);
            }, () => {
                console.log("上报点击量统计失败!");
            });
        }

        private lastSend2202Time = 0;

        public StatisticsMsg2202() {
            if (!this._isLoginPlatform) {
                return;
            }
            let t = (Date.now() - this.lastSend2202Time) / 1000;
            if (t < 2000)  {
                return;
            }
            this.lastSend2202Time = Date.now();

            let request: Platform_2202_Request = new Platform_2202_Request();
            request.type = PlatformStatisticsType.videocomplete;
            let url = this.PackageMsgUrl(2202, request);
            this.HttpGet(url, this, (data) => {
                let respose: Platform_1332_Response = data;
                console.log("上报视频播放完成成功!" + respose.state);
            }, () => {
                console.log("上报视频播放完成失败!");
            });
        }

        //#endregion

    }

    class PlatformShareUserData {
        public _notifShareInGames: PFU.Dictionary<number, Array<Platform_2000_resp_Data>> = new PFU.Dictionary<number, Array<Platform_2000_resp_Data>>();
        public _userCache: PFU.Dictionary<number, Platform_1333_ResData> = new PFU.Dictionary<number, Platform_1333_ResData>();

        public userPlayTime: number = 0;

    }

    export enum PlatformStatisticsType {
        moreGame = 5,
        crossGame = 6,
        shareGame = 8,
        //协议2202
        videocomplete = 7,
    }
}