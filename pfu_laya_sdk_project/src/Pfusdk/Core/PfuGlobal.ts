namespace PFU {
    export class PfuGlobal {

        private static focusCallback: any = null;
        private static focusHandler: Function = null;


        //轮播闪屏广告
        public static ShowNextSplashAd() {
            PfuManager.GetInstance().ShowNextSplashAd();
        }

        //随机闪屏广告
        public static ShowRandomSplashAd() {
            PfuManager.GetInstance().ShowRandomSplashAd();
        }
        //随机公众号广告
        public static ShowRandomGeneralAd() {
            PfuManager.GetInstance().ShowRandomGeneralAd();
        }
        //轮播公众号广告
        public static ShowNextGeneralAd() {
            PfuManager.GetInstance().ShowNextGeneralAd();
        }

        //是否从小程序进入(公众号)
        public static IsMiniAppInGame(): boolean {
            return PfuManager.GetInstance().IsMiniAppIn();
        }

        //创建Banner广告条
        public static CreateBanner(adId: string, dir: BannerDirction, fun: Function) {
            //let adId =  PfuManager.GetInstance().GetWegameAd().banner;
            return WeChatBannerAd.GetInstance().Create(adId, dir, fun);
        }
        //显示Banner广告
        public static ShowBanner() {
            WeChatBannerAd.GetInstance().Show();
        }
        //隐藏Banner广告
        public static HideBanner() {
            WeChatBannerAd.GetInstance().Hide();
        }
        //刷新Banner广告
        public static RefreshBanner(fun: Function) {
            WeChatBannerAd.GetInstance().Refresh(fun);
        }
        //广告是否已准备好
        public static IsReadyBanner() {
            return WeChatBannerAd.GetInstance().IsReadyBanner();
        }

        /**
         * 创建奖励广告
         * @param adId 
         */
        public static CreateIncentiveAd(adId: string) {
            //let adId = PfuManager.GetInstance().GetWegameAd().video;
            WeChatIncentiveAd.GetInstance().Create(adId);
        }


        public static IsIncentivAdReady(): boolean {
            return WeChatIncentiveAd.GetInstance().IsReady();
        }

        /**
         * 显示奖励广告
         * @param service 回调对象
         * @param fun 回调函数
         */
        public static ShowIncentive(service: any, fun: Function,adunit?:string) {
            WeChatIncentiveAd.GetInstance().Show(service, fun,adunit);
        }
        //获取在线参数
        public static GetOLParam(): PFU.PfuOLParamData {
            return PfuManager.GetInstance().OLParam;
        }


        private static SetFocusHandler(handler: any, callback: Function) {
            this.focusCallback = callback;
            this.focusHandler = handler;
        }

        public static Focus() {
            if (this.focusHandler != null) {
                this.focusCallback.call(this.focusHandler, Date.now());
            }
        }

        /**
         * 分享
         * @param isShareGroup
         * @param fun (type:number,desc:string)
         */
        public static PfuShareGroupNext(handler: any, fun: Function, isAward: boolean, qureyPos?: number,addQurey?:string) {

            // let stamp: number = Date.now();
            // PfuManager.GetInstance().PfuShareNext(false, "", fun, qureyPos);

            // if (isAward && !PfuManager.GetInstance().IsWegameTestMode()) {
            //     this.SetFocusHandler(this, (time) => {
            //         if (time - stamp >= this.GetOLParam().pfuSdkShareTime * (PfuManager.GetInstance().GetVideoForceShareTimeMax() + 1)) {
            //             console.log("分享成功");
            //             fun.call(handler, PfuSdk.SUCCESS, "");

            //             PfuManager.GetInstance().AddShareCount();
            //         } else {
            //             console.log("分享失败");
            //             let str = PfuManager.GetInstance().OLParam.pfuSdkShare1;
            //             if (PfuManager.GetInstance().GetShareCount() > 0) {
            //                 str = PfuManager.GetInstance().OLParam.pfuSdkShare2;
            //             }
            //             fun.call(handler, PfuSdk.FAIL, str);
            //         }
            //         this.SetFocusHandler(null, null);
            //     });
            // }
            this._shareHandle(handler,fun,isAward,false,qureyPos,addQurey);
        }

        /**
         * 分享
         * @param isShareGroup
         * @param fun (type:number,desc:string)
         */
        public static PfuShareVideo(handler: any, fun: Function, isAward: boolean, qureyPos?: number,addQurey?:string) {
            this._shareHandle(handler,fun,isAward,true,qureyPos,addQurey);
        }

        private static _shareHandle(handler: any, fun: Function, isAward: boolean, isVideo, qureyPos?: number,addQurey?:string)  {
            let stamp: number = Date.now();
            PfuManager.GetInstance().PfuShareNext(false, "", fun, qureyPos,addQurey);

            if (isAward && !PfuManager.GetInstance().IsWegameTestMode()) {
                this.SetFocusHandler(this, (time) => {
                    //let max =  parseInt(this.GetOLParam().pfuSdkShareTime) + (1000 * PfuManager.GetInstance().GetShareTimeMax());
                    let max =  parseInt(this.GetOLParam().pfuSdkShareTime);
                    if (time - stamp >= max) {
                        console.log("分享成功");
                        fun.call(handler, PfuSdk.SUCCESS, "");
                        // if(isVideo)
                        // {
                        //     PfuManager.GetInstance().AddVideoForceShareFinish();
                        // }
                        // //分享次数++;
                        // PfuManager.GetInstance().AddShareCount();
                    } else {
                        let str = PfuManager.GetInstance().OLParam.pfuSdkShare1;
                        // if (PfuManager.GetInstance().GetShareCount() > 0) {
                        //     str = PfuManager.GetInstance().OLParam.pfuSdkShare2;
                        // }
                        fun.call(handler, PfuSdk.FAIL, str);
                    }
                    console.log("用时:" + (time - stamp) + " | t:" + max);

                    this.SetFocusHandler(null, null);
                });
            }
        }

        //AddCode	

        //EndAddCode

        /**
         * 获取更多游戏数据
         */
        public static GetPfuBannerData(): Array<PfuMoreGameData> {
            let array = [];
            for (let i = 0; i < PfuManager.GetInstance().MoreGame.length; i++) {
                let gameData = PfuManager.GetInstance().MoreGame[i];
                if (gameData.bannerLink != null) {
                    array.push(gameData);
                }
            }
            return array;
        }

        /**
         * 获取更多游戏个数
         */
        public static GetTotalMoreGameCount(): number {
            return PfuManager.GetInstance().GetTotalMoreGameCount();
        }
        /**
         * 获取更多游戏iconUrl
         * @param index 
         */
        public static GetMoreGameIconUrl(index: number): string {
            return PfuManager.GetInstance().GetMoreGameLeftIconUrl(index);
        }
        /**
         * 显示更多游戏一张图片
         * @param index
         */
        public static ShowMoreGameImage(index: number, callServer: any, fun: Function): void {
            PfuManager.GetInstance().ShowMoreGameImage(true, index, callServer, fun);
        }


        /**
         * 自定义显示更多游戏图片
         * @param data 
         */
        public static CustomShowMoreGameImage(data: PfuMoreGameData, callServer: any, fun: Function) {
            PfuManager.GetInstance().CustomShowMoreGameImage(data, callServer, fun);
        }


        /**
         * 获取pfu 链接顶层地址
         */
        public static GetTopUrl() {
            return PfuManager.GetInstance().GetTopUrl();
        }
    }
}