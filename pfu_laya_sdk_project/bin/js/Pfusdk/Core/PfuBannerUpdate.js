var PFU;
(function (PFU) {
    var PfuBannerUpdate = (function () {
        function PfuBannerUpdate() {
            this._timeCount = 0;
            this._refreshBannerHandle = null;
            this._refreshBannerCallback = null;
            this._onPfuSetBannerVisible = null;
            //显示pfu图片数组
            this._showIndex = 0;
            this._moreGameData = new Array();
            this._isCreateBanner = false;
            //最后一次操作
            this._isLastCtrAction = false;
            //最后一次操作是显示还是隐藏
            this._isLastShow = true;
            Laya.timer.loop(1000, this, this.Update);
            Laya.timer.loop(200, this, this.UpdateBannerAction);
        }
        PfuBannerUpdate.GetInstance = function () {
            if (!this.instance) {
                this.instance = new PfuBannerUpdate();
            }
            return this.instance;
        };
        PfuBannerUpdate.prototype.SetRefreshHandle = function (handle, refreshCallback, onVisible) {
            this._refreshBannerHandle = handle;
            this._refreshBannerCallback = refreshCallback;
            this._onPfuSetBannerVisible = onVisible;
            this._moreGameData = PFU.PfuGlobal.GetPfuBannerData();
            this.RefreshPfuBanner();
        };
        PfuBannerUpdate.prototype.CreateBanner = function () {
            var _this = this;
            //设置广告ID
            this._isCreateBanner = false;
            PFU.PfuGlobal.CreateBanner(PFU.PfuConfig.Config.bannerId, PFU.BannerDirction.DOWN_CENTER, function () {
                _this._isCreateBanner = true;
                //PfuGlobal.ShowBanner();
            });
        };
        PfuBannerUpdate.prototype.UpdateBannerAction = function () {
            if (!PfuSdk.GetParamComplete) {
                return;
            }
            if (this._isCreateBanner) {
                if (this._isLastCtrAction) {
                    if (this._isLastShow) {
                        this.onShowBanner();
                    }
                    else {
                        this.onHideBanner();
                    }
                    this._isLastCtrAction = false;
                }
            }
        };
        PfuBannerUpdate.prototype.Update = function () {
            if (!PfuSdk.GetParamComplete) {
                return;
            }
            this._timeCount += 1;
            if (this._timeCount > PFU.PfuGlobal.GetOLParam().pfuSdkRefresh) {
                //刷新
                this.RefreshBanner();
                this._timeCount = 0;
            }
        };
        PfuBannerUpdate.prototype.IsBeBannerImg = function () {
            if (this._moreGameData && this._moreGameData.length > 0) {
                return true;
            }
            return false;
        };
        PfuBannerUpdate.prototype.RefreshPfuBanner = function () {
            //通知pfuBanner
            if (this._refreshBannerHandle != null) {
                if (!this.IsBeBannerImg()) {
                    return;
                }
                this._showIndex++;
                if (this._showIndex >= this._moreGameData.length) {
                    this._showIndex = 0;
                }
                this._refreshBannerCallback.call(this._refreshBannerHandle);
            }
        };
        PfuBannerUpdate.prototype.RefreshBanner = function () {
            var _this = this;
            this._isCreateBanner = false;
            // if (PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF) {
            //     this.RefreshPfuBanner();
            //     this._isCreateBanner = true;
            //     this._isLastCtrAction = true;
            // }
            // else
            {
                //刷新Banner
                if (PFU.PfuGlobal.IsReadyBanner()) {
                    PFU.PfuGlobal.RefreshBanner(function () {
                        _this._isCreateBanner = true;
                        //刷新按照最后一次设置控制显示和隐藏
                        _this._isLastCtrAction = true;
                    });
                }
            }
        };
        PfuBannerUpdate.prototype.GetPfuBannerImgUrl = function () {
            if (!this.IsBeBannerImg()) {
                return "";
            }
            return PFU.PfuGlobal.GetTopUrl() + this._moreGameData[this._showIndex].bannerLink;
        };
        PfuBannerUpdate.prototype.ClickPfuBanner = function () {
            if (!this.IsBeBannerImg()) {
                return;
            }
            PfuSdk.CallOnHide();
            PFU.PfuGlobal.CustomShowMoreGameImage(this._moreGameData[this._showIndex], this, function () {
                PfuSdk.CallOnShow({});
            });
        };
        PfuBannerUpdate.prototype.CallShow = function () {
            this._isLastCtrAction = true;
            this._isLastShow = true;
        };
        PfuBannerUpdate.prototype.CallHide = function () {
            this._isLastCtrAction = true;
            this._isLastShow = false;
        };
        PfuBannerUpdate.prototype.onHideBanner = function () {
            // if (PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF) {
            //     if (this._refreshBannerHandle != null) {
            //         this._onPfuSetBannerVisible.call(this._refreshBannerHandle, false);
            //     }
            // } else 
            {
                PFU.PfuGlobal.HideBanner();
            }
        };
        PfuBannerUpdate.prototype.onShowBanner = function () {
            // if (PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF) {
            //     if (this._refreshBannerHandle != null) {
            //         this._onPfuSetBannerVisible.call(this._refreshBannerHandle, true);
            //     }
            // } else 
            {
                PFU.PfuGlobal.ShowBanner();
            }
        };
        return PfuBannerUpdate;
    }());
    PFU.PfuBannerUpdate = PfuBannerUpdate;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuBannerUpdate.js.map