var PFU;
(function (PFU) {
    var PfuSwitch;
    (function (PfuSwitch) {
        //开
        PfuSwitch[PfuSwitch["ON"] = 1] = "ON";
        //关
        PfuSwitch[PfuSwitch["OFF"] = 0] = "OFF";
    })(PfuSwitch = PFU.PfuSwitch || (PFU.PfuSwitch = {}));
    //在线参数类 和 后台对接上KeyName
    var PfuOLParamBean = (function () {
        function PfuOLParamBean() {
        }
        return PfuOLParamBean;
    }());
    PFU.PfuOLParamBean = PfuOLParamBean;
    /*
    * Pfu在线参数管理类;
    */
    var PfuManager = (function () {
        function PfuManager() {
            this._ingameadvert = null;
            this._officialaccount = null;
            this._moregame = null;
            this._wechatparam = null;
            this._wechatAd = null;
            this._wechatshare = null;
            this._getParamComplete = false;
            this._getBoxlistComplete = false;
            this.moreGameLeft = new Array();
            this.moreGameRight = new Array();
            this.shareIndex = 0;
            // /**
            //  * 设置 替换参数的分享  pfu后台 replace会替换文本中的{0}
            //  * @param key 
            //  * @param replace 
            //  * @param fun 
            //  */
            // public PfuShareReplace(key: string, replace: string, fun: Function) {
            //     if (!this.IsExistShareData()) {
            //         fun(PfuSdk.FAIL);
            //         return;
            //     }
            //     let share: PfuShareData = this.GetShareData(key);
            //     if (share == null) {
            //         fun(PfuSdk.FAIL);
            //         return;
            //     }
            //     let str = PFU.BXStringUtils.Replace(replace, share.desc);
            //     let imgUrl = this._resp.toppath + share.shareLink;
            //     if (this.IsWegameTestMode()) {
            //         str = PfuManager.TestMode_ShareDesc;
            //         imgUrl = "";
            //     }
            //     WeChatUtils.GetInstance().ShareAppMessageImage(fun, str, imgUrl);
            // }
            // #endregion
            // #region 开屏广告
            this._nextSplashAdIndex = 0;
            // #region GENERAL
            //获取公众号广告
            this._nextGeneralAdIndex = 0;
            // #endregion
            //#region 存储分享成功次数
            this._shareFinishCount = null;
            //#endregion
            //#region 存储强制视频到分享时间
            this._videoForceShareDataTime = null;
            //#endregion
            //#region 盒子跳转复活
            this._tempJumpGBRHandle = null;
            this._tempJumpGBRCallback = null;
            this._wechatparam = new PfuOLParamBean();
            this._wechatparam.value = new PFU.PfuOLParamData();
            this._wechatparam.value.Init();
            this.GetShareNum();
        }
        PfuManager.GetInstance = function () {
            if (!this.instance) {
                this.instance = new PfuManager();
            }
            return this.instance;
        };
        PfuManager.prototype.GetShareNum = function () {
            var cStr = PFU.LocalSaveUtils.GetItem("shareNumber");
            this.shareIndex = 0;
            if (cStr != void 0 && cStr != null && cStr != "") {
                this.shareIndex = parseInt(cStr);
            }
        };
        PfuManager.prototype.SaveShareNum = function () {
            PFU.LocalSaveUtils.SaveItem("shareNumber", this.shareIndex + "");
        };
        Object.defineProperty(PfuManager.prototype, "OLParam", {
            get: function () { return this._wechatparam.value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PfuManager.prototype, "MoreGame", {
            get: function () { return this._moregame.adverts; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PfuManager.prototype, "GetParamComplete", {
            get: function () { return this._getParamComplete; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PfuManager.prototype, "GetBoxListComplete", {
            get: function () { return this._getBoxlistComplete; },
            enumerable: true,
            configurable: true
        });
        //#region 初始化
        PfuManager.prototype.Init = function () {
            var _this = this;
            this.Connect(PFU.PfuConfig.Config.pfuAppId, PFU.PfuConfig.Config.version, PFU.PfuConfig.Config.weChatId, function (type) {
                if (type == PfuSdk.SUCCESS) {
                    var param = _this.OLParam;
                    //param.kaiping = 2;
                    //param.ad_banner = PfuSwitch.OFF;
                    if (param.pfuSdkTestMode == PfuSwitch.ON) {
                        param.pfuSdkMoreGame = PfuSwitch.OFF;
                        param.pfuSdkVideoShare = PfuSwitch.OFF;
                    }
                    if (param.pfuSdkTestMode == PfuSwitch.OFF && param.pfuSdkShowOpenAds == PfuSwitch.ON) {
                        Laya.timer.once(1000, _this, function () {
                            _this.ShowSplashAd(false);
                        });
                    }
                    _this._getParamComplete = true;
                }
                PFU.PfuBannerUpdate.GetInstance().CreateBanner();
                PFU.WeChatUtils.GetInstance().ShowShareMenu();
                PfuManager.GetInstance().OnShareAppMessage(function (type) {
                    //
                });
                console.log("在线参数获取成功");
            });
            PFU.PfuGlobal.CreateIncentiveAd(PFU.PfuConfig.Config.videoId);
            PFU.PfuBoxList.GetInstance().Connect(PFU.PfuConfig.Config.weChatId, function (type) {
                _this._getBoxlistComplete = true;
                console.log("盒子列表参数获取成功");
            });
            this.InitVideoForceShare();
            this.InitShareCountData();
            if (PFU.PfuConfig.Config.checkAppUpdate == PfuSwitch.ON) {
                PFU.WeChatUtils.GetInstance().SetUpdateApp();
            }
        };
        //#endregion
        /**
         *
         * @param ignoreInPath 忽略入口判断 （盒子导入用户不显示插屏）
         */
        PfuManager.prototype.ShowSplashAd = function (ignoreInPath) {
            if (!PFU.PfuGlobal.IsMiniAppInGame()) {
                if (ignoreInPath || !PFU.PfuGlobal.IsMiniAppInGame()) {
                    PFU.PfuGlobal.ShowRandomSplashAd();
                }
            }
        };
        PfuManager.prototype.Connect = function (pfuAppid, version, wechatgameid, callBack, functionIds) {
            var _this = this;
            var contentData = new PfuReq();
            contentData.appId = pfuAppid;
            contentData.version = version;
            contentData.wechatgameid = wechatgameid;
            if (functionIds == void 0) {
                contentData.functions = "0";
            }
            else {
                contentData.functions = functionIds;
            }
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (e) {
                var data = JSON.parse(Base64.decode(e));
                _this.preaseData(data);
                callBack(PfuSdk.SUCCESS);
            });
            xhr.once(Laya.Event.ERROR, this, function (data) {
                //error
                callBack(PfuSdk.FAIL);
            });
            xhr.on(Laya.Event.PROGRESS, this, function () {
                //PROGRESS
            });
            var url = PfuManager.OL_URL + "?" + contentData.getContent(PfuManager.OL_KEY);
            //console.log(url);
            xhr.send(url, "", "get", "text");
        };
        //AddCode	
        //EndAddCode
        PfuManager.prototype.preaseData = function (data) {
            this._resp = data;
            if (data.code == PfuRespState.succeed) {
                this.preaseMode();
            }
            else {
                console.log("erro:" + data.code);
            }
        };
        PfuManager.prototype.preaseMode = function () {
            var data = this._resp;
            for (var key in data.value) {
                var childData = data.value[key];
                if (childData.code == PfuRespState.succeed) {
                    switch (key) {
                        case "" + PfuFunctionId.ingameadvert:
                            this._ingameadvert = childData;
                            break;
                        case "" + PfuFunctionId.officialaccount:
                            this._officialaccount = childData;
                            break;
                        case "" + PfuFunctionId.moregame:
                            this._moregame = childData;
                            if (this._moregame && this._moregame.adverts) {
                                for (var i = 0; i < this._moregame.adverts.length; i++) {
                                    var data_1 = this._moregame.adverts[i];
                                    if (Laya.Browser.onAndroid) {
                                        if ((data_1.boxId == undefined || data_1.boxId == "") && (data_1.link == undefined || data_1.link == "")) {
                                            continue;
                                        }
                                    }
                                    else {
                                        if ((data_1.wxid == undefined || data_1.wxid == "") && (data_1.link == undefined || data_1.link == "")) {
                                            continue;
                                        }
                                    }
                                    if (PFU.PfuConfig.Config.ui_moreGameType == 1) {
                                        this.moreGameLeft.push(data_1);
                                        continue;
                                    }
                                    if (PFU.PfuConfig.Config.ui_moreGameType == 2) {
                                        this.moreGameRight.push(data_1);
                                        continue;
                                    }
                                    if (data_1.position == "0") {
                                        this.moreGameLeft.push(data_1);
                                        continue;
                                    }
                                    this.moreGameRight.push(data_1);
                                }
                            }
                            break;
                        case "" + PfuFunctionId.wechatparam:
                            this._wechatparam = childData;
                            break;
                        case "" + PfuFunctionId.wechatAd:
                            this._wechatAd = childData;
                            break;
                        case "" + PfuFunctionId.wechatshare:
                            this._wechatshare = childData;
                            break;
                        default:
                            console.log("not Define Key:" + key);
                            break;
                    }
                }
                else {
                    console.log("prease Mode ErrorCode: k=" + key + "|code=" + childData.code);
                }
            }
        };
        PfuManager.prototype.GetTopUrl = function () {
            if (this._resp != null) {
                return this._resp.toppath;
            }
            return "";
        };
        // #endregion
        PfuManager.prototype.GetShareData = function (key) {
            if (!this.IsExistShareData()) {
                return null;
            }
            for (var i = 0; i < this._wechatshare.value.length; i++) {
                if (this._wechatshare.value[i].key == key) {
                    return this._wechatshare.value[i];
                }
            }
            return null;
        };
        //AddCode	
        //EndAddCode
        /**
         * 是否存在可分享的内容
         */
        PfuManager.prototype.IsExistShareData = function () {
            if (this._wechatshare == null) {
                return false;
            }
            if (this._wechatshare.value == null) {
                return false;
            }
            return this._wechatshare.value.length > 0;
        };
        /**
         * 设置 替换参数的分享到群  pfu后台 replace会替换文本中的{0}
         * @param key
         * @param replace
         * @param fun
         */
        PfuManager.prototype.PfuShareNext = function (isShareGroup, replace, fun, qureyPos, addQurey) {
            if (!this.IsExistShareData()) {
                fun(PfuSdk.FAIL, "分享数据未准备好");
                return;
            }
            var share = this._wechatshare.value[this.shareIndex];
            if (share == null) {
                fun(PfuSdk.FAIL, "分享下标错误");
                return;
            }
            var str = PFU.BXStringUtils.Replace(replace, share.desc);
            var imgUrl = this._resp.toppath + share.shareLink;
            if (this.IsWegameTestMode()) {
                str = PfuManager.TestMode_ShareDesc;
                imgUrl = "";
            }
            var query = PFU.PfuPlatformManager.GetInstance().GetShareQuery((qureyPos) ? qureyPos : -999, addQurey);
            console.log("query:" + query);
            PFU.PfuPlatformManager.GetInstance().StatisticsMsg2201(PFU.PlatformStatisticsType.shareGame, share.shareLink);
            PFU.WeChatUtils.GetInstance().ShareGroupAppMessageImage(isShareGroup, fun, str, imgUrl, query);
            this.shareIndex++;
            if (this.shareIndex >= this._wechatshare.value.length) {
                this.shareIndex = 0;
            }
            this.SaveShareNum();
        };
        /**
        * 被动转发 监听的右上角转发内容
        * @param title
        */
        PfuManager.prototype.OnShareAppMessage = function (fun) {
            var _this = this;
            if (this.IsExistShareData()) {
                this.shareIndex++;
                if (this.shareIndex >= this._wechatshare.value.length) {
                    this.shareIndex = 0;
                }
                var share = this._wechatshare.value[this.shareIndex];
                var str = share.desc;
                var imgUrl = this._resp.toppath + share.shareLink;
                if (this.IsWegameTestMode()) {
                    str = PfuManager.TestMode_ShareDesc;
                    imgUrl = "";
                }
                PFU.WeChatUtils.GetInstance().OnShareAppMessage(function (type) {
                    _this.OnShareAppMessage(fun);
                    _this.SaveShareNum();
                }, str, imgUrl);
            }
        };
        PfuManager.prototype.ShowRandomSplashAd = function () {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            //开屏广告参数
            var number = Math.floor(PFU.BXRandom.Get().nextInt(0, this._ingameadvert.adverts.length));
            var url = this._ingameadvert.adverts[number].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
        };
        PfuManager.prototype.ShowNextSplashAd = function () {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            //开屏广告参数
            var url = this._ingameadvert.adverts[this._nextSplashAdIndex].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
            this._nextSplashAdIndex++;
            if (this._nextSplashAdIndex >= this._ingameadvert.adverts.length) {
                this._nextSplashAdIndex = 0;
            }
        };
        /**
         * 是否存开屏广告
         */
        PfuManager.prototype.IsExistSplashAdData = function () {
            if (this._ingameadvert == null) {
                return false;
            }
            if (this._ingameadvert.adverts == null) {
                return false;
            }
            return this._ingameadvert.adverts.length > 0;
        };
        // #endregion
        //更多游戏
        /*
        public ShowRandomGeneralMoreGame(): void {
            if(!this.IsExistGeneralMoreGameData())
            {
                return;
            }
            //更多游戏参数
            let number = Math.floor(BX.BXRandom.Get().nextInt(0,this._moregame.adverts.length));
            let url = this._moregame.adverts[number].link;
            WeChatUtils.GetInstance().PreviewImage(this._resp.toppath +url);
        }*/
        /**
         * 交叉推广跳转
         */
        PfuManager.prototype.ShowCrossGameImage = function (data, callServer, fun) {
            PFU.PfuPlatformManager.GetInstance().StatisticsMsg2201(PFU.PlatformStatisticsType.crossGame, data.link);
            //判断是否在循环列表
            if (PFU.PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function () { }, data.wechatGameid, "");
            }
            else {
                var url = data.qrcodelink;
                PFU.WeChatUtils.GetInstance().PreviewImage(url);
                fun.call(callServer, url);
            }
        };
        //显示更多游戏中的一个
        PfuManager.prototype.ShowMoreGameImage = function (isLeft, index, callServer, fun) {
            if (!this.IsExistGeneralMoreGameData()) {
                return;
            }
            var count = isLeft ? this.moreGameLeft.length : this.moreGameRight.length;
            if (count == 0) {
                return;
            }
            if (index >= count || index < 0) {
                index = 0;
            }
            var data = isLeft ? this.moreGameLeft[index] : this.moreGameRight[index];
            PFU.PfuPlatformManager.GetInstance().StatisticsMsg2201(PFU.PlatformStatisticsType.moreGame, data.iconlink);
            var isJumpShowImage = false;
            if (PFU.WeChatUtils.GetInstance().IsNavigateToMiniVersion()) {
                if (Laya.Browser.onAndroid) {
                    if (PFU.PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) {
                        PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function () { }, data.boxId, "");
                    }
                    else {
                        isJumpShowImage = true;
                    }
                }
                else {
                    if (PFU.PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) {
                        PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function () { }, data.wxid, "");
                    }
                    else {
                        isJumpShowImage = true;
                    }
                }
            }
            else {
                isJumpShowImage = true;
            }
            if (isJumpShowImage) {
                var url = data.link;
                PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
                fun.call(callServer, url);
            }
        };
        PfuManager.prototype.IsMoreGameLeftData = function () {
            return this.moreGameLeft.length > 0;
        };
        PfuManager.prototype.IsMoreGameRightData = function () {
            return this.moreGameRight.length > 0;
        };
        //拿到更多游戏中的一个Icon
        PfuManager.prototype.GetMoreGameLeftIconUrl = function (index) {
            if (!this.IsMoreGameLeftData()) {
                return "";
            }
            if (index >= this.moreGameLeft.length || index < 0) {
                index = 0;
            }
            return this._resp.toppath + this.moreGameLeft[index].iconlink;
        };
        PfuManager.prototype.GetMoreGameRightIconUrl = function (index) {
            if (!this.IsMoreGameRightData()) {
                return "";
            }
            if (index >= this.moreGameRight.length || index < 0) {
                index = 0;
            }
            return this._resp.toppath + this.moreGameRight[index].iconlink;
        };
        //AddCode	
        //EndAddCode
        //更多游戏中有多少个需要好显示
        PfuManager.prototype.GetTotalMoreGameCount = function () {
            if (!this.IsExistGeneralMoreGameData()) {
                return 0;
            }
            return this._moregame.adverts.length;
        };
        //后台是否返回正确数据
        PfuManager.prototype.IsExistGeneralMoreGameData = function () {
            if (this._moregame == null) {
                return false;
            }
            if (this._moregame.adverts == null) {
                return false;
            }
            return this._moregame.adverts.length > 0;
        };
        PfuManager.prototype.GetMoreGameCount = function (isLeft) {
            return isLeft ? this.moreGameLeft.length : this.moreGameRight.length;
        };
        /**
         * 自定义显示更多游戏图片
         * @param data
         */
        PfuManager.prototype.CustomShowMoreGameImage = function (data, callServer, fun) {
            if (PFU.WeChatUtils.GetInstance().IsNavigateToMiniVersion()) {
                PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(callServer, fun, data.wechatgameid, data.path);
            }
            else {
                var url = data.link;
                PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
                fun.call(callServer);
            }
        };
        PfuManager.prototype.ShowRandomGeneralAd = function () {
            if (!this.IsExistGeneralAdData()) {
                return;
            }
            //公众号广告参数
            var number = Math.floor(PFU.BXRandom.Get().nextInt(0, this._officialaccount.adverts.length));
            var url = this._officialaccount.adverts[number].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
        };
        PfuManager.prototype.ShowNextGeneralAd = function () {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            //公众号广告参数
            var url = this._officialaccount.adverts[this._nextGeneralAdIndex].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
            this._nextGeneralAdIndex++;
            if (this._nextGeneralAdIndex >= this._officialaccount.adverts.length) {
                this._nextGeneralAdIndex = 0;
            }
        };
        /**
         * 是否存公众号广告
         */
        PfuManager.prototype.IsExistGeneralAdData = function () {
            if (this._officialaccount == null) {
                return false;
            }
            if (this._officialaccount.adverts == null) {
                return false;
            }
            return this._officialaccount.adverts.length > 0;
        };
        // #endregion
        // #region 是否从小程序进入(主要功能：屏蔽公众号闪屏广告)
        PfuManager.prototype.IsMiniAppIn = function () {
            var launch = PFU.WeChatUtils.GetInstance().GetLaunchOptionsSync();
            //单独判断是否从两个排除的appId进入
            if (launch != null && launch.referrerInfo) {
                var appid = launch.referrerInfo.appId;
                return (appid == "wx5608cdb7dc533937" || appid == "wxe675b6aad9612c74");
            }
            if (launch != null && (launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1020
                || launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1024
                || launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1035
                || launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1037)) {
                return true;
            }
            return false;
        };
        // #endregion
        // #region 游戏参数
        PfuManager.prototype.GetWegameAd = function () {
            if (this._wechatAd == null || this._wechatAd.value == null) {
                return new PfuWechatAdData();
            }
            return this._wechatAd.value;
        };
        /**
         * 是否是审核版
         */
        PfuManager.prototype.IsWegameTestMode = function () {
            if (this._wechatparam == null || this._wechatparam.value == null) {
                return true;
            }
            if (this._wechatparam.value.pfuSdkTestMode == PfuSwitch.ON) {
                return true;
            }
            return false;
        };
        /**
         * 视频前分享
         */
        PfuManager.prototype.IsPfuSdkVideoShare = function () {
            if (this._wechatparam == null || this._wechatparam.value == null) {
                return false;
            }
            return this._wechatparam.value.pfuSdkVideoShare == PfuSwitch.ON;
        };
        PfuManager.prototype.SaveShareFinishCount = function () {
            //存储当前时间
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1000);
            this._shareFinishCount.time = mt.getTime();
            Laya.LocalStorage.setJSON("shareFinishCount", JSON.stringify(this._shareFinishCount));
        };
        PfuManager.prototype.GetShareFinishCountData = function () {
            var json = Laya.LocalStorage.getJSON("shareFinishCount");
            if (json != null && json != "") {
                this._shareFinishCount = JSON.parse(json);
            }
            else {
                this._shareFinishCount = new PFU.DataTimeCount();
                this._shareFinishCount.count = 0;
                this._shareFinishCount.time = 0;
            }
            return this._shareFinishCount;
        };
        PfuManager.prototype.IsShareFinishCountNewDay = function () {
            var data = this.GetShareFinishCountData();
            if (data.time == 0) {
                return true;
            }
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        };
        PfuManager.prototype.InitShareCountData = function () {
            this.GetShareFinishCountData();
            if (this.IsShareFinishCountNewDay()) {
                this._shareFinishCount.count = 0;
                this.SaveShareFinishCount();
            }
        };
        PfuManager.prototype.GetShareCount = function () {
            if (this.IsShareFinishCountNewDay()) {
                this._shareFinishCount.count = 0;
                this.SaveShareFinishCount();
            }
            return this._shareFinishCount.count;
        };
        PfuManager.prototype.AddShareCount = function () {
            this._shareFinishCount.count++;
            this.SaveShareFinishCount();
        };
        /**
         * 设置分享最大时间
         */
        PfuManager.prototype.GetShareTimeMax = function () {
            return Math.min(this.GetShareCount(), 3);
        };
        PfuManager.prototype.SaveVideoFoceShare = function () {
            //存储当前时间
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1000);
            this._videoForceShareDataTime.time = mt.getTime();
            Laya.LocalStorage.setJSON("forceShareFinishCount", JSON.stringify(this._videoForceShareDataTime));
        };
        PfuManager.prototype.GetVideoForceShare = function () {
            var json = Laya.LocalStorage.getJSON("forceShareFinishCount");
            if (json != null && json != "") {
                this._videoForceShareDataTime = JSON.parse(json);
            }
            else {
                this._videoForceShareDataTime = new PFU.DataTimeCount();
                this._videoForceShareDataTime.count = 0;
                this._videoForceShareDataTime.time = 0;
            }
            return this._videoForceShareDataTime;
        };
        PfuManager.prototype.IsNewShareCountDay = function () {
            var data = this.GetVideoForceShare();
            if (data.time == 0) {
                return true;
            }
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        };
        PfuManager.prototype.InitVideoForceShare = function () {
            this.GetVideoForceShare();
            if (this.IsNewShareCountDay()) {
                this._videoForceShareDataTime.count = 0;
                this.SaveVideoFoceShare();
            }
        };
        PfuManager.prototype.IsVideoForceShare = function () {
            if (this.OLParam.pfuSdkTestMode == PfuSwitch.ON) {
                return false;
            }
            if (this._videoForceShareDataTime == null || this._videoForceShareDataTime.count >= this.OLParam.pfuSdkShareCount) {
                return false;
            }
            return true;
        };
        PfuManager.prototype.AddVideoForceShareFinish = function () {
            this._videoForceShareDataTime.count++;
            if (this._videoForceShareDataTime.count >= this.OLParam.pfuSdkShareCount) {
                this._videoForceShareDataTime.count = this.OLParam.pfuSdkShareCount;
            }
            this.SaveVideoFoceShare();
        };
        PfuManager.prototype.SetJumpGameBoxReliveHandle = function (handle, callback) {
            this._tempJumpGBRHandle = handle;
            this._tempJumpGBRCallback = callback;
        };
        PfuManager.prototype.RespondJumpGameBoxRelive = function (launchOptions) {
            if (this._tempJumpGBRHandle == null) {
                return;
            }
            if (launchOptions.scene == 1037 || launchOptions.scene == 1038) {
                if (launchOptions.referrerInfo && launchOptions.referrerInfo.extraData) {
                    if (launchOptions.referrerInfo.extraData.relive) {
                        this._tempJumpGBRCallback.call(this._tempJumpGBRHandle, PfuSdk.SUCCESS);
                    }
                    this.SetJumpGameBoxReliveHandle(null, null);
                }
            }
        };
        //跳转盒子复活
        PfuManager.prototype.JumpGameboxForRelive = function (handle, callback) {
            var _this = this;
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                callback.call(handle, PfuSdk.SUCCESS);
                return;
            }
            var jumpPath = "pages/index/index?pfukey=" + PFU.PfuConfig.Config.weChatId + "&pfuRelive=true";
            var jumpId = "wx3e33fef689f472b1";
            if (this.OLParam.pfuSdkBoxRelive && this.OLParam.pfuSdkBoxRelive != "") {
                jumpId = this.OLParam.pfuSdkBoxRelive;
            }
            PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function (type) {
                if (type == PfuSdk.SUCCESS) {
                    if (!_this.IsWegameTestMode()) {
                        _this.SetJumpGameBoxReliveHandle(handle, callback);
                    }
                }
                else {
                    callback.call(handle, PfuSdk.FAIL);
                }
            }, jumpId, jumpPath);
        };
        return PfuManager;
    }());
    //#region 统一在线参数管理
    PfuManager.TestMode_ShareDesc = "这游戏真好玩，快来一起体验吧!";
    PfuManager.OL_URL = "https://wxad.jfydgame.com/jfyd_advert_wechat/";
    PfuManager.OL_KEY = "60cff75d0d1e4d548d9f4bca35916b21";
    PFU.PfuManager = PfuManager;
    var PfuRespState;
    (function (PfuRespState) {
        PfuRespState[PfuRespState["succeed"] = 101] = "succeed";
        PfuRespState[PfuRespState["signError"] = 201] = "signError";
        PfuRespState[PfuRespState["paramError"] = 202] = "paramError";
    })(PfuRespState = PFU.PfuRespState || (PFU.PfuRespState = {}));
    var PfuFunctionId;
    (function (PfuFunctionId) {
        PfuFunctionId[PfuFunctionId["ingameadvert"] = 1] = "ingameadvert";
        PfuFunctionId[PfuFunctionId["officialaccount"] = 2] = "officialaccount";
        PfuFunctionId[PfuFunctionId["moregame"] = 3] = "moregame";
        PfuFunctionId[PfuFunctionId["wechatparam"] = 4] = "wechatparam";
        PfuFunctionId[PfuFunctionId["wechatAd"] = 5] = "wechatAd";
        PfuFunctionId[PfuFunctionId["wechatshare"] = 6] = "wechatshare";
    })(PfuFunctionId || (PfuFunctionId = {}));
    var PfuReq = (function () {
        function PfuReq() {
        }
        PfuReq.prototype.getContent = function (key) {
            var contentJson = JSON.stringify(this);
            var content = Base64.encode(contentJson);
            var sign = md5(content + key);
            var postData = "content=" + content + "&sign=" + sign;
            return postData;
        };
        return PfuReq;
    }());
    var PfuResp = (function () {
        function PfuResp() {
        }
        return PfuResp;
    }());
    //分享
    var PfuShareBean = (function () {
        function PfuShareBean() {
        }
        return PfuShareBean;
    }());
    //分享数据
    var PfuShareData = (function () {
        function PfuShareData() {
        }
        return PfuShareData;
    }());
    //互推 or 开屏广告
    var PfuSplashBean = (function () {
        function PfuSplashBean() {
        }
        return PfuSplashBean;
    }());
    //互推 or 开屏广告数据
    var PfuSplashData = (function () {
        function PfuSplashData() {
        }
        return PfuSplashData;
    }());
    //广告ID
    var PfuWechatAdBean = (function () {
        function PfuWechatAdBean() {
        }
        return PfuWechatAdBean;
    }());
    var PfuWechatAdData = (function () {
        function PfuWechatAdData() {
            this.banner = "0";
            this.video = "0";
        }
        return PfuWechatAdData;
    }());
    var PfuMoreGameBean = (function () {
        function PfuMoreGameBean() {
        }
        return PfuMoreGameBean;
    }());
    var PfuMoreGameData = (function () {
        function PfuMoreGameData() {
        }
        return PfuMoreGameData;
    }());
    PFU.PfuMoreGameData = PfuMoreGameData;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuManager.js.map