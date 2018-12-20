namespace PFU {
    export class PfuClickBannerRevive {

        private static instance: PfuClickBannerRevive;

        public static GetInstance(): PfuClickBannerRevive {
            if (!this.instance) {
                this.instance = new PfuClickBannerRevive();
            }
            return this.instance;
        }

        private static readonly DB_NAME = "PfuClickBannerRevive";

        private _isClickBannerAward = false;
        private _tempBannerDir: BannerDirction;

        private _DB: ClickBannerEverydayTime;

        public get IsClickBannerAward() { return this._isClickBannerAward }

        private _callUIHandle;
        private _callVisibeCallback: Function;

        private _resultHandle: any;
        private _resultCallBack: Function;

        constructor() {
            this.Load();
        }


        public SetUIHandle(handle: any, callback: Function) {
            this._callUIHandle = handle;
            this._callVisibeCallback = callback;
        }

        public ShowBannerRevive(handle: any, fun: Function) {
            if (this._callVisibeCallback != null) {
                this._resultHandle = handle;
                this._resultCallBack = fun;
                this._callVisibeCallback.call(this._callUIHandle, true);
                this.CreateClickBannerAward();
            }
        }

        public Cancel() {
            this.SkipBannerRefresh();
            this._resultCallBack.call(this._resultHandle, PfuSdk.FAIL);
        }

        //# 点击Bannner奖励事件
        public CreateClickBannerAward() {
            this._isClickBannerAward = true;
            this._tempBannerDir = PfuGlobal.GetLastBannnerDir();
            PfuGlobal.RefreshBanner(() => {
                PfuGlobal.ShowBanner();
            }, BannerDirction.CENTER);
        }

        public SkipBannerRefresh() {

            this._callVisibeCallback.call(this._callUIHandle, false);
            this._isClickBannerAward = false;
            PfuGlobal.RefreshBanner(() => {

            }, this._tempBannerDir, WeChatBannerAd.customWidth);
        }

        public OnAppShow() {
            //点击Bannner奖励功能开启时 返回成功
            if (this._isClickBannerAward) {
                this.SkipBannerRefresh();
                this.AddBannerReviveCount();
                this._resultCallBack.call(this._resultHandle, PfuSdk.SUCCESS);
                
            }
        }
        public OnAppHide() {

        }
        //#endregion

        public IsBannerReviveOpen():boolean  {

            if(PfuManager.GetInstance().OLParam.pfuSdkBannerRelive == 0)
            {
                return false;
            }

            if(PfuPlatformManager.GetInstance().GetUserPlayTime() < PfuManager.GetInstance().OLParam.pfuSdkPlayTime * 60)
            {
                return false;
            }
            if(this._DB.count < PfuManager.GetInstance().OLParam.pfuSdkBannerRelive)
            {
                return true;
            }

            let lastTime: number = this._DB.time;
            let date: Date = new Date();
            let curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let curTime = curDay.getTime();
            if (curTime > lastTime) {
                this._DB.time = curTime;
                this._DB.count = 0;
                this.Save();
                return this.IsBannerReviveOpen();
            }
            return false;
        }

        private AddBannerReviveCount()
        {
            let date: Date = new Date();
            let curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            this._DB.time = curDay.getTime();
            this._DB.count++;
            this.Save();
        }

        //#region 存储

        private Load() {
            var json = LocalSaveUtils.GetJsonObject(PfuClickBannerRevive.DB_NAME);
            if (json != null && json != undefined) {
                this._DB = json;
            } else {
                this._DB = new ClickBannerEverydayTime();
                this._DB.count = 0;
                this._DB.time = 0;
            }
            return this._DB;
        }

        public Save() {
            LocalSaveUtils.SaveJsonObject(PfuClickBannerRevive.DB_NAME, this._DB);
        }

        //#endregion
    }

    class ClickBannerEverydayTime {
        public count = 0;
        public time = 0;
    }
}