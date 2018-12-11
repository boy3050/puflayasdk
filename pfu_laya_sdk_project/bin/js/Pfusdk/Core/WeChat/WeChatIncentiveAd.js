var PFU;
(function (PFU) {
    var WeChatIncentiveAd = (function () {
        function WeChatIncentiveAd() {
            this._isReady = false;
        }
        WeChatIncentiveAd.GetInstance = function () {
            if (!this.instance) {
                this.instance = new WeChatIncentiveAd();
            }
            return this.instance;
        };
        WeChatIncentiveAd.prototype.Create = function (adId) {
            var _this = this;
            this._adId = adId;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === 'function') {
                    this._rewardedVideoAd = wx.createRewardedVideoAd({
                        adUnitId: adId
                    });
                    this._rewardedVideoAd.onLoad(function () {
                        _this._isReady = true;
                    });
                    this._rewardedVideoAd.onError(function (err) {
                        console.log("Create AD:" + err);
                        if (_this._playCallback)
                            _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                        _this._playCallback = null;
                    });
                    this._rewardedVideoAd.onClose(function (res) {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.SUCCESS);
                            _this._playCallback = null;
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.FAIL);
                            _this._playCallback = null;
                        }
                    });
                }
            }
        };
        WeChatIncentiveAd.prototype.IsReady = function () {
            if (!this._isReady) {
                return false;
            }
            if (this._rewardedVideoAd == null) {
                return false;
            }
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }
            return true;
        };
        WeChatIncentiveAd.prototype.IsRewardedReady = function () {
            if (this._rewardedVideoAd == null) {
                return false;
            }
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }
            return true;
        };
        //AddCode	
        //EndAddCode
        WeChatIncentiveAd.prototype.Show = function (service, fun, adunit) {
            var _this = this;
            this._playService = service;
            this._playCallback = fun;
            if (!adunit || adunit == null || adunit == "") {
                if (this.IsRewardedReady()) {
                    this._rewardedVideoAd.show()
                        .catch(function (err) {
                        _this._rewardedVideoAd.load()
                            .then(function () { return _this._rewardedVideoAd.show().catch(function (err) {
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                            _this._playCallback = null;
                        }); })
                            .catch(function (err) {
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                            _this._playCallback = null;
                        });
                    });
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
        };
        WeChatIncentiveAd.prototype.PlayNewVideo = function (adunit) {
            var _this = this;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === 'function') {
                    var video = wx.createRewardedVideoAd({
                        adUnitId: adunit
                    });
                    video.onLoad(function () {
                    });
                    video.onError(function (err) {
                        console.log("video Ad = NULL");
                        if (_this._playCallback)
                            _this._playCallback.call(_this._playService, PfuSdk.FAIL);
                        _this._playCallback = null;
                    });
                    video.onClose(function (res) {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                            // 正常播放结束，可以下发游戏奖励
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.SUCCESS);
                            _this._playCallback = null;
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.FAIL);
                            _this._playCallback = null;
                        }
                    });
                    this._rewardedVideoAd.show()
                        .catch(function (err) {
                        _this._rewardedVideoAd.load()
                            .then(function () { return _this._rewardedVideoAd.show().catch(function (err) {
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                            _this._playCallback = null;
                        }); })
                            .catch(function (err) {
                            if (_this._playCallback)
                                _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                            _this._playCallback = null;
                        });
                    });
                }
            }
        };
        return WeChatIncentiveAd;
    }());
    WeChatIncentiveAd.SAVE_INCENTIVE_KEY = "s_incentive_id";
    PFU.WeChatIncentiveAd = WeChatIncentiveAd;
})(PFU || (PFU = {}));
//# sourceMappingURL=WeChatIncentiveAd.js.map