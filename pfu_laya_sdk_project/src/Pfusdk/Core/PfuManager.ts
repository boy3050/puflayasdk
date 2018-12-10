namespace PFU {
    export enum PfuSwitch {
        //开
        ON = 1,
        //关
        OFF = 0
    }

    //在线参数类 和 后台对接上KeyName
    export class PfuOLParamBean {
        public code: number;
        public value: PFU.PfuOLParamData;
    }

    /*
    * Pfu在线参数管理类;
    */
    export class PfuManager {

        private static instance: PfuManager;

        public static GetInstance(): PfuManager {
            if (!this.instance) {
                this.instance = new PfuManager();
            }
            return this.instance;
        }

        constructor() {
            this._wechatparam = new PfuOLParamBean();
            this._wechatparam.value = new PFU.PfuOLParamData();
            this._wechatparam.value.Init();

            this.GetShareNum();
        }

        private GetShareNum(): void {
            let cStr = LocalSaveUtils.GetItem("shareNumber");
            this.shareIndex = 0;
            if (cStr != void 0 && cStr != null && cStr != "") {
                this.shareIndex = parseInt(cStr);
            }
        }

        private SaveShareNum() {
            LocalSaveUtils.SaveItem("shareNumber", this.shareIndex + "");
        }

        public get OLParam() { return this._wechatparam.value; }
        public get MoreGame() { return this._moregame.adverts; }

        //#region 统一在线参数管理

        public static TestMode_ShareDesc = "这游戏真好玩，快来一起体验吧!";

        public static readonly OL_URL: string = "https://wxad.jfydgame.com/jfyd_advert_wechat/"
        public static readonly OL_KEY: string = "60cff75d0d1e4d548d9f4bca35916b21";

        public _resp: PfuResp;

        private _ingameadvert: PfuSplashBean = null;
        private _officialaccount: PfuSplashBean = null;
        private _moregame: PfuMoreGameBean = null;
        private _wechatparam: PfuOLParamBean = null;
        private _wechatAd: PfuWechatAdBean = null;
        private _wechatshare: PfuShareBean = null;

        private _getParamComplete = false;
        public get GetParamComplete() { return this._getParamComplete; }
        private _getBoxlistComplete = false;
        public get GetBoxListComplete() { return this._getBoxlistComplete; }




        //#region 初始化
        public Init() {
            this.Connect(PfuConfig.Config.pfuAppId, PfuConfig.Config.version, PfuConfig.Config.weChatId, (type: number) => {
                if (type == PfuSdk.SUCCESS) {
                    let param: PFU.PfuOLParamData = this.OLParam;
                    //param.kaiping = 2;
                    //param.ad_banner = PfuSwitch.OFF;
                    if (param.pfuSdkTestMode == PfuSwitch.ON) {
                        param.pfuSdkMoreGame = PfuSwitch.OFF;
                        param.pfuSdkVideoShare = PfuSwitch.OFF;
                    }

                    if (param.pfuSdkTestMode == PfuSwitch.OFF && param.pfuSdkShowOpenAds == PfuSwitch.ON) {
                        Laya.timer.once(1000, this, () => {
                            this.ShowSplashAd(false);
                        });
                    }
                    this._getParamComplete = true;
                }

                PfuBannerUpdate.GetInstance().CreateBanner();
                WeChatUtils.GetInstance().ShowShareMenu();
                PfuManager.GetInstance().OnShareAppMessage((type: number) => {
                    //
                });
                console.log("在线参数获取成功");
            });

            PfuGlobal.CreateIncentiveAd(PfuConfig.Config.videoId);
            PfuBoxList.GetInstance().Connect(PfuConfig.Config.weChatId, (type) => {
                this._getBoxlistComplete = true;
                console.log("盒子列表参数获取成功");
            });

            this.InitVideoForceShare();
            this.InitShareCountData();

            if (PfuConfig.Config.checkAppUpdate == PfuSwitch.ON) {
                PFU.WeChatUtils.GetInstance().SetUpdateApp();
            }
        }

        //#endregion
        /**
         * 
         * @param ignoreInPath 忽略入口判断 （盒子导入用户不显示插屏）
         */
        private ShowSplashAd(ignoreInPath: boolean) {
            if (!PfuGlobal.IsMiniAppInGame()) {
                if (ignoreInPath || !PfuGlobal.IsMiniAppInGame()) {
                    PfuGlobal.ShowRandomSplashAd();
                }
            }
        }


        public Connect(pfuAppid: string, version: string, wechatgameid: string, callBack: Function, functionIds?: string) {
            let contentData: PfuReq = new PfuReq();
            contentData.appId = pfuAppid;
            contentData.version = version;
            contentData.wechatgameid = wechatgameid;

            if (functionIds == void 0) {
                contentData.functions = "0";
            } else {
                contentData.functions = functionIds;
            }

            let xhr: Laya.HttpRequest = new Laya.HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, (e: any) => {
                let data = JSON.parse(Base64.decode(e));
                this.preaseData(data);
                callBack(PfuSdk.SUCCESS);
            });
            xhr.once(Laya.Event.ERROR, this, (data: any) => {
                //error
                callBack(PfuSdk.FAIL);
            });
            xhr.on(Laya.Event.PROGRESS, this, () => {
                //PROGRESS
            });

            let url = PfuManager.OL_URL + "?" + contentData.getContent(PfuManager.OL_KEY);
            //console.log(url);
            xhr.send(url, "", "get", "text");
        }

        //AddCode	

        //EndAddCode

        private preaseData(data: any) {
            this._resp = data;
            if (data.code == PfuRespState.succeed) {
                this.preaseMode()
            }
            else {
                console.log("erro:" + data.code);
            }
        }

        private moreGameLeft = new Array<PfuMoreGameData>();
        private moreGameRight = new Array<PfuMoreGameData>();

        private preaseMode() {
            let data = this._resp;

            for (let key in data.value) {
                let childData = data.value[key];
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
                                for (let i = 0; i < this._moregame.adverts.length; i++) {
                                    let data: PfuMoreGameData = this._moregame.adverts[i];

                                    if (Laya.Browser.onAndroid) {
                                        if ((data.boxId == undefined || data.boxId == "" || !PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.boxId)) && (data.link == undefined || data.link == ""))  {
                                            continue;
                                        }
                                    }
                                    else  {
                                        if ((data.wxid == undefined || data.wxid == "" || !PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) && (data.link == undefined || data.link == ""))  {
                                            if(!PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid))
                                            {
                                                console.log("more:" + data.wxid);
                                            }

                                            continue;
                                        }
                                    }

                                    if (PfuConfig.Config.ui_moreGameType == 1) {
                                        this.moreGameLeft.push(data);
                                        continue;
                                    }
                                    if (PfuConfig.Config.ui_moreGameType == 2) {
                                        this.moreGameRight.push(data);
                                        continue;
                                    }

                                    if (data.position == "0") {
                                        this.moreGameLeft.push(data);
                                        continue;
                                    }
                                    this.moreGameRight.push(data);
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
        }

        public GetTopUrl(): string {
            if (this._resp != null) {
                return this._resp.toppath;
            }
            return "";
        }

        // #endregion

        public GetShareData(key: string): PfuShareData {
            if (!this.IsExistShareData()) {
                return null;
            }

            for (let i = 0; i < this._wechatshare.value.length; i++) {
                if (this._wechatshare.value[i].key == key) {
                    return this._wechatshare.value[i];
                }
            }
            return null;
        }

        //AddCode	

        //EndAddCode

        /**
         * 是否存在可分享的内容
         */
        public IsExistShareData(): boolean {
            if (this._wechatshare == null) {
                return false;
            }
            if (this._wechatshare.value == null) {
                return false;
            }
            return this._wechatshare.value.length > 0;
        }



        public shareIndex = 0;
        /**
         * 设置 替换参数的分享到群  pfu后台 replace会替换文本中的{0}
         * @param key 
         * @param replace 
         * @param fun 
         */
        public PfuShareNext(isShareGroup: boolean, replace: string, fun: Function, qureyPos?: number, addQurey?: string) {
            if (!this.IsExistShareData()) {
                fun(PfuSdk.FAIL, "分享数据未准备好");
                return;
            }
            let share: PfuShareData = this._wechatshare.value[this.shareIndex]
            if (share == null) {
                fun(PfuSdk.FAIL, "分享下标错误");
                return;
            }
            let str = PFU.BXStringUtils.Replace(replace, share.desc);
            let imgUrl = this._resp.toppath + share.shareLink;
            if (this.IsWegameTestMode()) {
                str = PfuManager.TestMode_ShareDesc;
                imgUrl = "";
            }

            let query = PfuPlatformManager.GetInstance().GetShareQuery((qureyPos) ? qureyPos : -999, addQurey);
            console.log("query:" + query);
            if (!this.IsWegameTestMode()) {
                query += "&shareImage="+share.shareLink;
            }
            
            PfuPlatformManager.GetInstance().StatisticsMsg2201(PlatformStatisticsType.shareGame, share.shareLink);

            WeChatUtils.GetInstance().ShareGroupAppMessageImage(isShareGroup, fun, str, imgUrl, query);
            this.shareIndex++;
            if (this.shareIndex >= this._wechatshare.value.length) {
                this.shareIndex = 0;
            }
            this.SaveShareNum();
        }

        /**
        * 被动转发 监听的右上角转发内容
        * @param title 
        */
        public OnShareAppMessage(fun: Function) {
            if (this.IsExistShareData()) {
                this.shareIndex++;
                if (this.shareIndex >= this._wechatshare.value.length) {
                    this.shareIndex = 0;
                }
                let share: PfuShareData = this._wechatshare.value[this.shareIndex];
                let str = share.desc;
                let imgUrl = this._resp.toppath + share.shareLink;
                if (this.IsWegameTestMode()) {
                    str = PfuManager.TestMode_ShareDesc;
                    imgUrl = "";
                }
                WeChatUtils.GetInstance().OnShareAppMessage((type: number) => {
                    this.OnShareAppMessage(fun);
                    this.SaveShareNum();
                }, str, imgUrl);
            }
        }

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

        private _nextSplashAdIndex: number = 0;

        public ShowRandomSplashAd(): void {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            //开屏广告参数
            let number = Math.floor(PFU.BXRandom.Get().nextInt(0, this._ingameadvert.adverts.length));
            let url = this._ingameadvert.adverts[number].link;
            WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
        }

        public ShowNextSplashAd(): void {

            if (!this.IsExistSplashAdData()) {
                return;
            }
            //开屏广告参数
            let url = this._ingameadvert.adverts[this._nextSplashAdIndex].link;
            WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);

            this._nextSplashAdIndex++;
            if (this._nextSplashAdIndex >= this._ingameadvert.adverts.length) {
                this._nextSplashAdIndex = 0;
            }
        }

        /**
         * 是否存开屏广告
         */
        public IsExistSplashAdData(): boolean {
            if (this._ingameadvert == null) {
                return false;
            }
            if (this._ingameadvert.adverts == null) {
                return false;
            }
            return this._ingameadvert.adverts.length > 0;
        }
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
        public ShowCrossGameImage(data: PfuBoxListData, callServer: any, fun: Function) {
            PfuPlatformManager.GetInstance().StatisticsMsg2201(PlatformStatisticsType.crossGame, data.link);

            //判断是否在循环列表
            if (PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.wechatGameid, "");
            }
            else {
                let url = data.qrcodelink;
                WeChatUtils.GetInstance().PreviewImage(url);
                fun.call(callServer, url);
            }

        }



        //显示更多游戏中的一个
        public ShowMoreGameImage(isLeft: boolean, index: number, callServer: any, fun: Function) {
            if (!this.IsExistGeneralMoreGameData()) {
                return;
            }
            let count = isLeft ? this.moreGameLeft.length : this.moreGameRight.length;
            if (count == 0) {
                return;
            }
            if (index >= count || index < 0) {
                index = 0;
            }
            let data: PfuMoreGameData = isLeft ? this.moreGameLeft[index] : this.moreGameRight[index];

            PfuPlatformManager.GetInstance().StatisticsMsg2201(PlatformStatisticsType.moreGame, data.iconlink);

            let isJumpShowImage: boolean = false;
            if (WeChatUtils.GetInstance().IsNavigateToMiniVersion()) {

                if (Laya.Browser.onAndroid) {
                    if (PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) {
                        WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.boxId, "");
                    }
                    else {
                        isJumpShowImage = true;
                    }
                }
                else {
                    if (PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) {
                        WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.wxid, "");
                    } else {
                        isJumpShowImage = true;
                    }
                }
            } else {
                isJumpShowImage = true;
            }

            if (isJumpShowImage)  {
                let url = data.link;
                WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
                fun.call(callServer, url);
            }

        }

        public IsMoreGameLeftData() {
            return this.moreGameLeft.length > 0;
        }
        public IsMoreGameRightData() {
            return this.moreGameRight.length > 0;
        }
        //拿到更多游戏中的一个Icon
        public GetMoreGameLeftIconUrl(index: number): string {
            if (!this.IsMoreGameLeftData()) {
                return "";
            }

            if (index >= this.moreGameLeft.length || index < 0) {
                index = 0;
            }

            return this._resp.toppath + this.moreGameLeft[index].iconlink;
        }

        public GetMoreGameRightIconUrl(index: number): string {
            if (!this.IsMoreGameRightData()) {
                return "";
            }

            if (index >= this.moreGameRight.length || index < 0) {
                index = 0;
            }

            return this._resp.toppath + this.moreGameRight[index].iconlink;
        }

        //AddCode	

        //EndAddCode

        //更多游戏中有多少个需要好显示
        public GetTotalMoreGameCount(): number {
            if (!this.IsExistGeneralMoreGameData()) {
                return 0;
            }
            return this._moregame.adverts.length;
        }

        //后台是否返回正确数据
        private IsExistGeneralMoreGameData() {
            if (this._moregame == null) {
                return false;
            }
            if (this._moregame.adverts == null) {
                return false;
            }
            return this._moregame.adverts.length > 0;
        }

        public GetMoreGameCount(isLeft: boolean) {
            return isLeft ? this.moreGameLeft.length : this.moreGameRight.length;
        }


        /**
         * 自定义显示更多游戏图片
         * @param data 
         */
        public CustomShowMoreGameImage(data: PfuMoreGameData, callServer: any, fun: Function) {
            if (WeChatUtils.GetInstance().IsNavigateToMiniVersion()) {
                WeChatUtils.GetInstance().NavigateToMiniProgram(callServer, fun, data.wechatgameid, data.path);
            }
            else {
                let url = data.link;
                WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
                fun.call(callServer);
            }
        }

        // #region GENERAL
        //获取公众号广告
        private _nextGeneralAdIndex: number = 0;
        public ShowRandomGeneralAd(): void {
            if (!this.IsExistGeneralAdData()) {
                return;
            }
            //公众号广告参数
            let number = Math.floor(PFU.BXRandom.Get().nextInt(0, this._officialaccount.adverts.length));
            let url = this._officialaccount.adverts[number].link;
            WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
        }

        public ShowNextGeneralAd(): void {

            if (!this.IsExistSplashAdData()) {
                return;
            }
            //公众号广告参数
            let url = this._officialaccount.adverts[this._nextGeneralAdIndex].link;
            WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);

            this._nextGeneralAdIndex++;
            if (this._nextGeneralAdIndex >= this._officialaccount.adverts.length) {
                this._nextGeneralAdIndex = 0;
            }
        }

        /**
         * 是否存公众号广告
         */
        public IsExistGeneralAdData(): boolean {
            if (this._officialaccount == null) {
                return false;
            }
            if (this._officialaccount.adverts == null) {
                return false;
            }
            return this._officialaccount.adverts.length > 0;
        }

        // #endregion


        // #region 是否从小程序进入(主要功能：屏蔽公众号闪屏广告)
        public IsMiniAppIn(): boolean {
            let launch: any = WeChatUtils.GetInstance().GetLaunchOptionsSync();

            //单独判断是否从两个排除的appId进入
            if (launch != null && launch.referrerInfo) {
                let appid = launch.referrerInfo.appId;
                return (appid == "wx5608cdb7dc533937" || appid == "wxe675b6aad9612c74");
            }

            if (launch != null && (launch.scene == WeChatUtils.IN_GAME_FROM_1020
                || launch.scene == WeChatUtils.IN_GAME_FROM_1024
                || launch.scene == WeChatUtils.IN_GAME_FROM_1035
                || launch.scene == WeChatUtils.IN_GAME_FROM_1037
            )) {
                return true;
            }
            return false;
        }

        // #endregion

        // #region 游戏参数
        public GetWegameAd(): PfuWechatAdData {
            if (this._wechatAd == null || this._wechatAd.value == null) {
                return new PfuWechatAdData();
            }
            return this._wechatAd.value;
        }

        /**
         * 是否是审核版
         */
        public IsWegameTestMode() {
            if (this._wechatparam == null || this._wechatparam.value == null) {
                return true;
            }

            if (this._wechatparam.value.pfuSdkTestMode == PfuSwitch.ON) {
                return true;
            }
            return false;
        }

        /**
         * 视频前分享
         */
        public IsPfuSdkVideoShare(): boolean {
            if (this._wechatparam == null || this._wechatparam.value == null) {
                return false;
            }
            return this._wechatparam.value.pfuSdkVideoShare == PfuSwitch.ON;
        }

        // #endregion

        //#region 存储分享成功次数
        private _shareFinishCount: DataTimeCount = null;
        private SaveShareFinishCount() {
            //存储当前时间
            var date: Date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1000);
            this._shareFinishCount.time = mt.getTime();
            Laya.LocalStorage.setJSON("shareFinishCount", JSON.stringify(this._shareFinishCount));

        }
        private GetShareFinishCountData() {
            var json: string = Laya.LocalStorage.getJSON("shareFinishCount");
            if (json != null && json != "") {
                this._shareFinishCount = JSON.parse(json);
            } else {
                this._shareFinishCount = new DataTimeCount();
                this._shareFinishCount.count = 0;
                this._shareFinishCount.time = 0;
            }
            return this._shareFinishCount;
        }
        private IsShareFinishCountNewDay(): boolean {
            var data: DataTimeCount = this.GetShareFinishCountData();
            if (data.time == 0) {
                return true;
            }
            var date: Date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        }
        private InitShareCountData() {
            this.GetShareFinishCountData();
            if (this.IsShareFinishCountNewDay()) {
                this._shareFinishCount.count = 0;
                this.SaveShareFinishCount();
            }
        }

        public GetShareCount() {
            if (this.IsShareFinishCountNewDay()) {
                this._shareFinishCount.count = 0;
                this.SaveShareFinishCount();
            }
            return this._shareFinishCount.count;
        }

        public AddShareCount() {
            this._shareFinishCount.count++;
            this.SaveShareFinishCount();
        }

        /**
         * 设置分享最大时间
         */
        public GetShareTimeMax() {
            return Math.min(this.GetShareCount(), 3);
        }

        //#endregion

        //#region 存储强制视频到分享时间
        private _videoForceShareDataTime: DataTimeCount = null;
        private SaveVideoFoceShare() {
            //存储当前时间
            var date: Date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1000);
            this._videoForceShareDataTime.time = mt.getTime();
            Laya.LocalStorage.setJSON("forceShareFinishCount", JSON.stringify(this._videoForceShareDataTime));
        }
        private GetVideoForceShare() {
            var json: string = Laya.LocalStorage.getJSON("forceShareFinishCount");
            if (json != null && json != "") {
                this._videoForceShareDataTime = JSON.parse(json);
            } else {
                this._videoForceShareDataTime = new DataTimeCount();
                this._videoForceShareDataTime.count = 0;
                this._videoForceShareDataTime.time = 0;
            }
            return this._videoForceShareDataTime;
        }
        private IsNewShareCountDay(): boolean {
            var data: DataTimeCount = this.GetVideoForceShare();

            if (data.time == 0) {
                return true;
            }

            var date: Date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        }
        private InitVideoForceShare() {
            this.GetVideoForceShare();
            if (this.IsNewShareCountDay()) {
                this._videoForceShareDataTime.count = 0;
                this.SaveVideoFoceShare();
            }
        }

        public IsVideoForceShare() {
            if (this.OLParam.pfuSdkTestMode == PfuSwitch.ON) {
                return false;
            }
            if (this._videoForceShareDataTime == null || this._videoForceShareDataTime.count >= this.OLParam.pfuSdkShareCount) {
                return false;
            }
            return true;
        }

        public AddVideoForceShareFinish() {
            this._videoForceShareDataTime.count++;
            if (this._videoForceShareDataTime.count >= this.OLParam.pfuSdkShareCount) {
                this._videoForceShareDataTime.count = this.OLParam.pfuSdkShareCount;
            }
            this.SaveVideoFoceShare();
        }


        //#endregion


        //#region 盒子跳转复活
        private _tempJumpGBRHandle: any = null;
        private _tempJumpGBRCallback: Function = null;
        public SetJumpGameBoxReliveHandle(handle: any, callback: Function) {
            this._tempJumpGBRHandle = handle;
            this._tempJumpGBRCallback = callback;
        }

        public RespondJumpGameBoxRelive(launchOptions) {
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
        }
        //跳转盒子复活
        public JumpGameboxForRelive(handle: any, callback: Function) {
            if (!WeChatUtils.GetInstance().IsWeGame()) {
                callback.call(handle, PfuSdk.SUCCESS);
                return;
            }
            let jumpPath = "pages/index/index?pfukey=" + PfuConfig.Config.weChatId + "&pfuRelive=true";

            let jumpId = "wx3e33fef689f472b1";

            if (this.OLParam.pfuSdkBoxRelive && this.OLParam.pfuSdkBoxRelive != "") {
                jumpId = this.OLParam.pfuSdkBoxRelive;
            }
            WeChatUtils.GetInstance().NavigateToMiniProgram(this, (type) => {
                if (type == PfuSdk.SUCCESS) {
                    if (!this.IsWegameTestMode()) {
                        this.SetJumpGameBoxReliveHandle(handle, callback);
                    }
                }
                else {
                    callback.call(handle, PfuSdk.FAIL);
                }
            }, jumpId, jumpPath);

        }

        // JumpGameboxForRelive(cb) {
        //     if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        //         PfuSdk.reliveCb = cb;
        //         let jumpId = "wx3e33fef689f472b1";
        //         if (online.wechatparam.pfuSdkBoxRelive) {
        //             jumpId = online.wechatparam.pfuSdkBoxRelive;
        //         }
        //         wx.navigateToMiniProgram({
        //             appId: jumpId,
        //             path: 
        //             success(res) {

        //             },
        //             fail(res) {
        //                 PfuSdk.reliveCb = null;
        //             }
        //         })
        //     } else {
        //         if (cb) cb();
        //     }
        // },


        //#endregion
    }



    export enum PfuRespState {
        succeed = 101,
        signError = 201,
        paramError = 202
    }

    enum PfuFunctionId {
        ingameadvert = 1, //微信互推广告-开屏广告
        officialaccount = 2, //微信互推广告-公众号
        moregame = 3,   //更多游戏
        wechatparam = 4,  //微信在线参数
        wechatAd = 5,   //微信游戏参数(广告位)
        wechatshare = 6, //微信分享管理
    }


    class PfuReq {
        public appId: string;
        public version: string;
        public wechatgameid: string;
        public functions: string;

        public getContent(key: string): string {
            let contentJson: string = JSON.stringify(this);
            let content: string = Base64.encode(contentJson);
            let sign: string = md5(content + key);
            let postData = "content=" + content + "&sign=" + sign;
            return postData;
        }
    }


    class PfuResp {
        public code: number;
        public toppath: string;
        public value: any;
    }

    //分享
    class PfuShareBean {
        public code: number;
        public value: Array<PfuShareData>;
    }
    //分享数据
    class PfuShareData {
        public key: string;
        public shareLink: string;
        public desc: string;
    }

    //互推 or 开屏广告
    class PfuSplashBean {
        public code: number;
        public adverts: Array<PfuSplashData>;
    }
    //互推 or 开屏广告数据
    class PfuSplashData {
        public link: string;
        public wechatGameid: string;
        public gameName: string;
    }
    //广告ID
    class PfuWechatAdBean {
        public code: number;
        public value: PfuWechatAdData;
    }

    class PfuWechatAdData {
        public banner: string = "0";
        public video: string = "0";
    }

    class PfuMoreGameBean {
        public code: number;
        public adverts: Array<PfuMoreGameData>;
    }

    export class PfuMoreGameData {
        public link: string;
        public wechatgameid: string;
        public iconlink: string;
        public path: string;
        public bannerLink: string;
        public boxId: string;
        public position: string;
        //IOS跳转ID
        public wxid: string;
        //排序
        public rank: number;
    }
}