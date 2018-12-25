var PFU;
(function (PFU) {
    var BannerDirction;
    (function (BannerDirction) {
        BannerDirction[BannerDirction["DOWN_CENTER"] = 0] = "DOWN_CENTER";
        BannerDirction[BannerDirction["TOP_CENTER"] = 1] = "TOP_CENTER";
        BannerDirction[BannerDirction["CENTER"] = 2] = "CENTER";
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
        WeChatBannerAd.prototype.Create = function (adId, dir, fun, cWidth) {
            var _this = this;
            this._adId = adId;
            this._bannerDir = dir;
            var leftPos = 0;
            var topPos = 0;
            var adWidth = cWidth;
            if (adWidth == undefined || adWidth == void 0 || adWidth == null) {
                adWidth = laya.utils.Browser.clientWidth;
            }
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === 'function') {
                    this._bannerAd = wx.createBannerAd({
                        adUnitId: adId,
                        style: {
                            left: leftPos,
                            top: topPos,
                            width: adWidth,
                        }
                    });
                    this._bannerAd.onResize(function (res) {
                        _this._bannerAd.style.width = res.width;
                        _this._bannerAd.style.height = res.height;
                        if (dir == BannerDirction.DOWN_CENTER) {
                            if (WeChatBannerAd.customMaxHeight) {
                                if (res.height > WeChatBannerAd.customMaxHeight) {
                                    var height = WeChatBannerAd.customMaxHeight;
                                    var width = height * res.width / res.height;
                                    _this._bannerAd.style.width = width;
                                    _this._bannerAd.style.height = height;
                                }
                            }
                            leftPos = (laya.utils.Browser.clientWidth - _this._bannerAd.style.width) / 2;
                            var a = 0;
                            if (Laya.Browser.onAndroid && (_this.isQuanMian() || _this.isLiuHai())) {
                                a = 34;
                            }
                            topPos = laya.utils.Browser.clientHeight - _this._bannerAd.style.height - a;
                        }
                        else if (dir == BannerDirction.CENTER) {
                            leftPos = (laya.utils.Browser.clientWidth - res.width) / 2;
                            topPos = (laya.utils.Browser.clientHeight - res.height) / 2;
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
                this.Refresh(function () { }, null, WeChatBannerAd.customWidth);
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
        WeChatBannerAd.prototype.Refresh = function (fun, dir, adWidth) {
            this.Destroy();
            var tempDir = dir;
            if (dir == undefined || dir == void 0 || dir == null) {
                tempDir = this._bannerDir;
            }
            this.Create(this._adId, tempDir, fun, adWidth);
        };
        WeChatBannerAd.prototype.GetLastBannerDir = function () {
            return this._bannerDir;
        };
        return WeChatBannerAd;
    }());
    WeChatBannerAd.SAVE_BEANNER_KEY = "s_banner_id";
    WeChatBannerAd.customWidth = 300;
    PFU.WeChatBannerAd = WeChatBannerAd;
})(PFU || (PFU = {}));
//# sourceMappingURL=WeChatBannerAd.js.map