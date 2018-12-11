namespace PFU {
    export class WeChatIncentiveAd {
        //注意，Singleton是要替换成你自己实现的子类 这里没有实际的作用
        private static instance: WeChatIncentiveAd;

        public static GetInstance(): WeChatIncentiveAd {
            if (!this.instance) {
                this.instance = new WeChatIncentiveAd();
            }
            return this.instance;
        }

        private _rewardedVideoAd;
        private _isReady: boolean = false;
        private _adId: string;

        private _playService: any;
        private _playCallback: Function;

        private static readonly SAVE_INCENTIVE_KEY = "s_incentive_id";

        public Create(adId: string) {

            this._adId = adId;

            if (WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === 'function') {
                    this._rewardedVideoAd = wx.createRewardedVideoAd({
                        adUnitId: adId
                    });
                    this._rewardedVideoAd.onLoad(() => {
                        this._isReady = true;
                    });
                    this._rewardedVideoAd.onError(err => {
                        console.log("Create AD:" + err);
                        if (this._playCallback)
                            this._playCallback.call(this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                        this._playCallback = null;
                    });

                    this._rewardedVideoAd.onClose(res => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            if (this._playCallback)
                                this._playCallback.call(this._playService, PfuSdk.SUCCESS);
                            this._playCallback = null;
                        }
                        else {

                            // 播放中途退出，不下发游戏奖励
                            if (this._playCallback)
                                this._playCallback.call(this._playService, PfuSdk.FAIL);
                            this._playCallback = null;
                        }
                    });
                }

            }
        }
        public IsReady(): boolean {
            if (!this._isReady) {
                return false;
            }

            if (this._rewardedVideoAd == null) {
                return false;
            }

            if (!WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }

            return true;
        }

        public IsRewardedReady(): boolean {
            if (this._rewardedVideoAd == null) {
                return false;
            }

            if (!WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }

            return true;
        }
        //AddCode	

        //EndAddCode

        public Show(service: any, fun: Function, adunit?: string) {
            this._playService = service;
            this._playCallback = fun;
            if (!adunit || adunit == null || adunit == "") {
                if (this.IsRewardedReady()) {
                    this._rewardedVideoAd.show()
                        .catch(err => {
                            this._rewardedVideoAd.load()
                                .then(
                                () => this._rewardedVideoAd.show().catch(err => {
                                    if (this._playCallback)
                                        this._playCallback.call(this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                                    this._playCallback = null;
                                })
                                )
                                .catch(err => {
                                    if (this._playCallback)
                                        this._playCallback.call(this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                                    this._playCallback = null;
                                });
                        })
                }
                else {
                    if (this._playCallback)
                        this._playCallback.call(this._playService, PfuSdk.FAIL);
                    this._playCallback = null;
                }
            }
            else {
                this.PlayNewVideo(adunit);
            }
        }

        private PlayNewVideo(adunit?: string) {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === 'function') {
                    let video = wx.createRewardedVideoAd({
                        adUnitId: adunit
                    });
                    video.onLoad(() => {

                    });
                    video.onError(err => {
                        console.log("video Ad = NULL");
                        if (this._playCallback)
                            this._playCallback.call(this._playService, PfuSdk.FAIL);
                        this._playCallback = null;
                    });

                    video.onClose(res => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            if (this._playCallback)
                                this._playCallback.call(this._playService, PfuSdk.SUCCESS);
                            this._playCallback = null;
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            if (this._playCallback)
                                this._playCallback.call(this._playService, PfuSdk.FAIL);
                            this._playCallback = null;
                        }
                    });

                    this._rewardedVideoAd.show()
                        .catch(err => {
                            this._rewardedVideoAd.load()
                                .then(
                                () => this._rewardedVideoAd.show().catch(err => {
                                    if (this._playCallback)
                                        this._playCallback.call(this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                                    this._playCallback = null;
                                })
                                )
                                .catch(err => {
                                    if (this._playCallback)
                                        this._playCallback.call(this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                                    this._playCallback = null;
                                });
                        })
                }

            }
        }

    }
}