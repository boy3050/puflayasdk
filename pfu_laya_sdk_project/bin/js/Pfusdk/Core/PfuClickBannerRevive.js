var PFU;
(function (PFU) {
    var PfuClickBannerRevive = (function () {
        function PfuClickBannerRevive() {
            this._isClickBannerAward = false;
            this.Load();
        }
        PfuClickBannerRevive.GetInstance = function () {
            if (!this.instance) {
                this.instance = new PfuClickBannerRevive();
            }
            return this.instance;
        };
        Object.defineProperty(PfuClickBannerRevive.prototype, "IsClickBannerAward", {
            get: function () { return this._isClickBannerAward; },
            enumerable: true,
            configurable: true
        });
        PfuClickBannerRevive.prototype.SetUIHandle = function (handle, callback) {
            this._callUIHandle = handle;
            this._callVisibeCallback = callback;
        };
        PfuClickBannerRevive.prototype.ShowBannerRevive = function (handle, fun) {
            if (this._callVisibeCallback != null) {
                this._resultHandle = handle;
                this._resultCallBack = fun;
                this._callVisibeCallback.call(this._callUIHandle, true);
                this.CreateClickBannerAward();
            }
        };
        PfuClickBannerRevive.prototype.Cancel = function () {
            this.SkipBannerRefresh();
            this._resultCallBack.call(this._resultHandle, PfuSdk.FAIL);
        };
        //# 点击Bannner奖励事件
        PfuClickBannerRevive.prototype.CreateClickBannerAward = function () {
            this._isClickBannerAward = true;
            this._tempBannerDir = PFU.PfuGlobal.GetLastBannnerDir();
            PFU.PfuGlobal.RefreshBanner(function () {
                PFU.PfuGlobal.ShowBanner();
            }, PFU.BannerDirction.CENTER);
        };
        PfuClickBannerRevive.prototype.SkipBannerRefresh = function () {
            this._callVisibeCallback.call(this._callUIHandle, false);
            this._isClickBannerAward = false;
            PFU.PfuGlobal.RefreshBanner(function () {
            }, this._tempBannerDir, PFU.WeChatBannerAd.customWidth);
        };
        PfuClickBannerRevive.prototype.OnAppShow = function () {
            //点击Bannner奖励功能开启时 返回成功
            if (this._isClickBannerAward) {
                this.SkipBannerRefresh();
                this.AddBannerReviveCount();
                this._resultCallBack.call(this._resultHandle, PfuSdk.SUCCESS);
            }
        };
        PfuClickBannerRevive.prototype.OnAppHide = function () {
        };
        //#endregion
        PfuClickBannerRevive.prototype.IsBannerReviveOpen = function () {
            if (PFU.PfuManager.GetInstance().OLParam.pfuSdkBannerRelive == 0) {
                return false;
            }
            if (PFU.PfuPlatformManager.GetInstance().GetUserPlayTime() < PFU.PfuManager.GetInstance().OLParam.pfuSdkPlayTime * 60) {
                return false;
            }
            if (this._DB.count < PFU.PfuManager.GetInstance().OLParam.pfuSdkBannerRelive) {
                return true;
            }
            var lastTime = this._DB.time;
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var curTime = curDay.getTime();
            if (curTime > lastTime) {
                this._DB.time = curTime;
                this._DB.count = 0;
                this.Save();
                return this.IsBannerReviveOpen();
            }
            return false;
        };
        PfuClickBannerRevive.prototype.AddBannerReviveCount = function () {
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            this._DB.time = curDay.getTime();
            this._DB.count++;
            this.Save();
        };
        //#region 存储
        PfuClickBannerRevive.prototype.Load = function () {
            var json = PFU.LocalSaveUtils.GetJsonObject(PfuClickBannerRevive.DB_NAME);
            if (json != null && json != undefined) {
                this._DB = json;
            }
            else {
                this._DB = new ClickBannerEverydayTime();
                this._DB.count = 0;
                this._DB.time = 0;
            }
            return this._DB;
        };
        PfuClickBannerRevive.prototype.Save = function () {
            PFU.LocalSaveUtils.SaveJsonObject(PfuClickBannerRevive.DB_NAME, this._DB);
        };
        return PfuClickBannerRevive;
    }());
    PfuClickBannerRevive.DB_NAME = "PfuClickBannerRevive";
    PFU.PfuClickBannerRevive = PfuClickBannerRevive;
    var ClickBannerEverydayTime = (function () {
        function ClickBannerEverydayTime() {
            this.count = 0;
            this.time = 0;
        }
        return ClickBannerEverydayTime;
    }());
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuClickBannerRevive.js.map