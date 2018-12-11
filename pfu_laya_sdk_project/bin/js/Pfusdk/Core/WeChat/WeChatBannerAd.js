var PFU;
(function (PFU) {
    var BannerDirction;
    (function (BannerDirction) {
        BannerDirction[BannerDirction["DOWN_CENTER"] = 0] = "DOWN_CENTER";
        BannerDirction[BannerDirction["TOP_CENTER"] = 1] = "TOP_CENTER";
    })(BannerDirction = PFU.BannerDirction || (PFU.BannerDirction = {}));
    /*
    * name;
    */
    var WeChatBannerAd = (function () {
        function WeChatBannerAd() {
            this._isReady = false;
        }
        WeChatBannerAd.GetInstance = function () {
            if (!this.instance) {
                this.instance = new WeChatBannerAd();
            }
            return this.instance;
        };
        WeChatBannerAd.prototype.Create = function (adId, dir, fun) {
            var _this = this;
            this._adId = adId;
            this._bannerDir = dir;
            var leftPos = 0;
            var topPos = 0;
            var adWidth = laya.utils.Browser.clientWidth;
            var sceneHeigth = laya.utils.Browser.clientHeight;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === 'function') {
                    this._bannerAd = wx.createBannerAd({
                        adUnitId: adId,
                        style: {
                            left: leftPos,
                            top: topPos,
                            width: 300 //adWidth
                        }
                    });
                    this._bannerAd.onResize(function (res) {
                        _this._bannerAd.style.width = res.width;
                        _this._bannerAd.style.heigth = res.heigth;
                        if (dir == BannerDirction.DOWN_CENTER) {
                            leftPos = (laya.utils.Browser.clientWidth - res.width) / 2;
                            var a = 0;
                            if (Laya.Browser.onAndroid && (_this.isQuanMian() || _this.isLiuHai())) {
                                a = 34;
                            }
                            topPos = laya.utils.Browser.clientHeight - res.height - a;
                        }
                        _this._bannerAd.style.left = leftPos;
                        _this._bannerAd.style.top = topPos;
                    });
                    this._bannerAd.onError(function (err) {
                        console.log(err);
                    });
                    this._bannerAd.onLoad(function () {
                        _this._isReady = true;
                        if (fun != null)
                            fun();
                    });
                }
            }
        };
        WeChatBannerAd.prototype.IsReadyBanner = function () {
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }
            if (this._bannerAd == null) {
                return false;
            }
            return true;
        };
        WeChatBannerAd.prototype.isQuanMian = function () {
            var sceneWidth = laya.utils.Browser.clientWidth;
            var sceneHeigth = laya.utils.Browser.clientHeight;
            var mScreenRatio = sceneHeigth / sceneWidth;
            return 1.789 < mScreenRatio && mScreenRatio < 19 / 9;
        };
        WeChatBannerAd.prototype.isLiuHai = function () {
            var sceneWidth = laya.utils.Browser.clientWidth;
            var sceneHeigth = laya.utils.Browser.clientHeight;
            var mScreenRatio = sceneHeigth / sceneWidth;
            return mScreenRatio >= 19 / 9;
        };
        WeChatBannerAd.prototype.IsAllSceneOrLiuHaiScene = function () {
            if (this.isQuanMian()) {
                return true;
            }
            if (this.isLiuHai()) {
                return true;
            }
            return false;
        };
        //AddCode	
        //EndAddCode
        WeChatBannerAd.prototype.Show = function () {
            if (this.IsReadyBanner()) {
                this._bannerAd.show();
            }
            else {
                this.Refresh(function () { });
            }
        };
        WeChatBannerAd.prototype.Hide = function () {
            if (this.IsReadyBanner()) {
                this._bannerAd.hide();
            }
        };
        WeChatBannerAd.prototype.Destroy = function () {
            if (this._bannerAd != null) {
                this._bannerAd.destroy();
            }
            this._isReady = false;
        };
        WeChatBannerAd.prototype.Refresh = function (fun) {
            this.Destroy();
            this.Create(this._adId, this._bannerDir, fun);
        };
        return WeChatBannerAd;
    }());
    WeChatBannerAd.SAVE_BEANNER_KEY = "s_banner_id";
    PFU.WeChatBannerAd = WeChatBannerAd;
})(PFU || (PFU = {}));
//# sourceMappingURL=WeChatBannerAd.js.map