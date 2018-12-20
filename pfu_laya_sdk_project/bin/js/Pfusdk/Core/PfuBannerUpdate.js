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
            //临时记录Banner显示时间
            this._tempShowBannerTime = 0;
            this._firstShowBanner = true;
            this._tempRefreshBannerData = this.GetData(); // new EveryDayRefreshBannerCount();//
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
        PfuBannerUpdate.prototype.IsShareFinishCountNewDay = function () {
            var data = this._tempRefreshBannerData;
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
        PfuBannerUpdate.prototype.GetData = function () {
            var json = Laya.LocalStorage.getJSON("everydayrefreshbannercount");
            if (json != null && json != "") {
                this._tempRefreshBannerData = JSON.parse(json);
                if (this.IsShareFinishCountNewDay()) {
                    this._tempRefreshBannerData.count = 0;
                }
            }
            else {
                this._tempRefreshBannerData = new EveryDayRefreshBannerCount();
                this._tempRefreshBannerData.time = 0;
                this._tempRefreshBannerData.count = 0;
            }
            return this._tempRefreshBannerData;
        };
        PfuBannerUpdate.prototype.SaveData = function () {
            //存储当前时间
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1000);
            this._tempRefreshBannerData.time = mt.getTime();
            this._tempRefreshBannerData.count++;
            Laya.LocalStorage.setJSON("everydayrefreshbannercount", JSON.stringify(this._tempRefreshBannerData));
        };
        PfuBannerUpdate.prototype.UpdateBannerAction = function () {
            if (!PfuSdk.GetParamComplete) {
                return;
            }
            if (PFU.PfuClickBannerRevive.GetInstance().IsClickBannerAward) {
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
            if (PFU.PfuClickBannerRevive.GetInstance().IsClickBannerAward) {
                return;
            }
            if (this._tempRefreshBannerData.count > PFU.PfuManager.GetInstance().OLParam.pfuSdkBannerCount) {
                return;
            }
            this._timeCount += 1;
            //console.log(PfuGlobal.GetOLParam().pfuSdkRefresh + "" + this._timeCount+"");
            if (this._timeCount > PFU.PfuGlobal.GetOLParam().pfuSdkRefresh) {
                //刷新
                this.RefreshBanner();
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
            this._timeCount = 0;
            this._isCreateBanner = false;
            this._tempShowBannerTime = Date.now();
            //刷新Banner
            if (PFU.PfuGlobal.IsReadyBanner()) {
                PFU.PfuGlobal.RefreshBanner(function () {
                    _this._isCreateBanner = true;
                    //刷新按照最后一次设置控制显示和隐藏
                    _this._isLastCtrAction = true;
                    _this.SaveData();
                }, null, PFU.WeChatBannerAd.customWidth);
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
            //PfuSdk.CallOnHide();
            PFU.PfuGlobal.CustomShowMoreGameImage(this._moreGameData[this._showIndex], this, function () {
                //PfuSdk.CallOnShow({});
            });
        };
        PfuBannerUpdate.prototype.CallShow = function () {
            this._isLastShow = true;
            if (this._firstShowBanner || this._tempRefreshBannerData.count > PFU.PfuManager.GetInstance().OLParam.pfuSdkBannerCount) {
                this.ShowBAction();
            }
            else {
                var time = Date.now() - this._tempShowBannerTime;
                if (time > PFU.PfuManager.GetInstance().OLParam.pfuSdkBannerMin * 1000) {
                    this.RefreshBanner();
                }
                else {
                    this.ShowBAction();
                }
            }
        };
        PfuBannerUpdate.prototype.ShowBAction = function () {
            this._isLastCtrAction = true;
            this._firstShowBanner = false;
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
    var EveryDayRefreshBannerCount = (function () {
        function EveryDayRefreshBannerCount() {
            //最后一次领取时间
            this.time = 0;
            this.count = 0;
        }
        return EveryDayRefreshBannerCount;
    }());
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuBannerUpdate.js.map