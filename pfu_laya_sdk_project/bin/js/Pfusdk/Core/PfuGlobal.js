var PFU;
(function (PFU) {
    var PfuGlobal = (function () {
        function PfuGlobal() {
        }
        PfuGlobal.SetOnDialog = function (handle, callBack) {
            this._addDialogHandle = handle;
            this._addDialogCallback = callBack;
        };
        PfuGlobal.ShowDialog = function (desc) {
            if (this._addDialogCallback) {
                this._addDialogCallback.call(this._addDialogHandle, desc);
            }
        };
        //轮播闪屏广告
        PfuGlobal.ShowNextSplashAd = function () {
            PFU.PfuManager.GetInstance().ShowNextSplashAd();
        };
        //随机闪屏广告
        PfuGlobal.ShowRandomSplashAd = function () {
            PFU.PfuManager.GetInstance().ShowRandomSplashAd();
        };
        //随机公众号广告
        PfuGlobal.ShowRandomGeneralAd = function () {
            PFU.PfuManager.GetInstance().ShowRandomGeneralAd();
        };
        //轮播公众号广告
        PfuGlobal.ShowNextGeneralAd = function () {
            PFU.PfuManager.GetInstance().ShowNextGeneralAd();
        };
        //是否从小程序进入(公众号)
        PfuGlobal.IsMiniAppInGame = function () {
            return PFU.PfuManager.GetInstance().IsMiniAppIn();
        };
        //创建Banner广告条
        PfuGlobal.CreateBanner = function (adId, dir, fun) {
            //let adId =  PfuManager.GetInstance().GetWegameAd().banner;
            return PFU.WeChatBannerAd.GetInstance().Create(adId, dir, fun);
        };
        //显示Banner广告
        PfuGlobal.ShowBanner = function () {
            PFU.WeChatBannerAd.GetInstance().Show();
        };
        //隐藏Banner广告
        PfuGlobal.HideBanner = function () {
            PFU.WeChatBannerAd.GetInstance().Hide();
        };
        //刷新Banner广告
        PfuGlobal.RefreshBanner = function (fun) {
            PFU.WeChatBannerAd.GetInstance().Refresh(fun);
        };
        //广告是否已准备好
        PfuGlobal.IsReadyBanner = function () {
            return PFU.WeChatBannerAd.GetInstance().IsReadyBanner();
        };
        /**
         * 创建奖励广告
         * @param adId
         */
        PfuGlobal.CreateIncentiveAd = function (adId) {
            //let adId = PfuManager.GetInstance().GetWegameAd().video;
            PFU.WeChatIncentiveAd.GetInstance().Create(adId);
        };
        PfuGlobal.IsIncentivAdReady = function () {
            return PFU.WeChatIncentiveAd.GetInstance().IsReady();
        };
        /**
         * 显示奖励广告
         * @param service 回调对象
         * @param fun 回调函数
         */
        PfuGlobal.ShowIncentive = function (service, fun, adunit) {
            PFU.WeChatIncentiveAd.GetInstance().Show(service, fun, adunit);
        };
        //获取在线参数
        PfuGlobal.GetOLParam = function () {
            return PFU.PfuManager.GetInstance().OLParam;
        };
        PfuGlobal.SetFocusHandler = function (handler, callback) {
            this.focusCallback = callback;
            this.focusHandler = handler;
        };
        PfuGlobal.Focus = function () {
            if (this.focusHandler != null) {
                this.focusCallback.call(this.focusHandler, Date.now());
            }
        };
        /**
         * 分享
         * @param isShareGroup
         * @param fun (type:number,desc:string)
         */
        PfuGlobal.PfuShareGroupNext = function (handler, fun, isAward, qureyPos, addQurey) {
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
            this._shareHandle(handler, fun, isAward, false, qureyPos, addQurey);
        };
        /**
         * 分享
         * @param isShareGroup
         * @param fun (type:number,desc:string)
         */
        PfuGlobal.PfuShareVideo = function (handler, fun, isAward, qureyPos, addQurey) {
            this._shareHandle(handler, fun, isAward, true, qureyPos, addQurey);
        };
        PfuGlobal._shareHandle = function (handler, fun, isAward, isVideo, qureyPos, addQurey) {
            var _this = this;
            var stamp = Date.now();
            PFU.PfuManager.GetInstance().PfuShareNext(false, "", fun, qureyPos, addQurey);
            if (isAward && !PFU.PfuManager.GetInstance().IsWegameTestMode()) {
                this.SetFocusHandler(this, function (time) {
                    //let max =  parseInt(this.GetOLParam().pfuSdkShareTime) + (1000 * PfuManager.GetInstance().GetShareTimeMax());
                    var max = parseInt(_this.GetOLParam().pfuSdkShareTime);
                    if (time - stamp >= max) {
                        console.log("分享成功");
                        fun.call(handler, PfuSdk.SUCCESS, "");
                    }
                    else {
                        var str = PFU.PfuManager.GetInstance().OLParam.pfuSdkShare1;
                        // if (PfuManager.GetInstance().GetShareCount() > 0) {
                        //     str = PfuManager.GetInstance().OLParam.pfuSdkShare2;
                        // }
                        fun.call(handler, PfuSdk.FAIL, str);
                    }
                    console.log("用时:" + (time - stamp) + " | t:" + max);
                    _this.SetFocusHandler(null, null);
                });
            }
        };
        //AddCode	
        //EndAddCode
        /**
         * 获取更多游戏数据
         */
        PfuGlobal.GetPfuBannerData = function () {
            var array = [];
            for (var i = 0; i < PFU.PfuManager.GetInstance().MoreGame.length; i++) {
                var gameData = PFU.PfuManager.GetInstance().MoreGame[i];
                if (gameData.bannerLink != null) {
                    array.push(gameData);
                }
            }
            return array;
        };
        /**
         * 获取更多游戏个数
         */
        PfuGlobal.GetTotalMoreGameCount = function () {
            return PFU.PfuManager.GetInstance().GetTotalMoreGameCount();
        };
        /**
         * 获取更多游戏iconUrl
         * @param index
         */
        PfuGlobal.GetMoreGameIconUrl = function (index) {
            return PFU.PfuManager.GetInstance().GetMoreGameLeftIconUrl(index);
        };
        /**
         * 显示更多游戏一张图片
         * @param index
         */
        PfuGlobal.ShowMoreGameImage = function (index, callServer, fun) {
            PFU.PfuManager.GetInstance().ShowMoreGameImage(true, index, callServer, fun);
        };
        /**
         * 自定义显示更多游戏图片
         * @param data
         */
        PfuGlobal.CustomShowMoreGameImage = function (data, callServer, fun) {
            PFU.PfuManager.GetInstance().CustomShowMoreGameImage(data, callServer, fun);
        };
        /**
         * 获取pfu 链接顶层地址
         */
        PfuGlobal.GetTopUrl = function () {
            return PFU.PfuManager.GetInstance().GetTopUrl();
        };
        return PfuGlobal;
    }());
    PfuGlobal.focusCallback = null;
    PfuGlobal.focusHandler = null;
    PfuGlobal._addDialogCallback = null;
    PfuGlobal._addDialogHandle = null;
    PFU.PfuGlobal = PfuGlobal;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuGlobal.js.map