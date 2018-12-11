namespace PFU {
    export class PfuBannerUpdate {
        private static instance: PfuBannerUpdate;
        public static GetInstance(): PfuBannerUpdate {
            if (!this.instance) {
                this.instance = new PfuBannerUpdate();
            }
            return this.instance;
        }
        private _timeCount = 0;

        private _refreshBannerHandle: any = null;
        private _refreshBannerCallback: Function = null;
        private _onPfuSetBannerVisible: Function = null;
        //显示pfu图片数组
        private _showIndex = 0;
        private _moreGameData: Array<PfuMoreGameData> = new Array<PfuMoreGameData>();

        public _isCreateBanner = false;
        //最后一次操作
        public _isLastCtrAction = false;
        //最后一次操作是显示还是隐藏
        public _isLastShow = true;
        //临时记录Banner显示时间
        public _tempShowBannerTime = 0;
        //临时记录Banner刷新次数
        public _tempRefreshBannerData:EveryDayRefreshBannerCount;


        public SetRefreshHandle(handle: any, refreshCallback: Function, onVisible: Function) {
            this._refreshBannerHandle = handle;
            this._refreshBannerCallback = refreshCallback;
            this._onPfuSetBannerVisible = onVisible;
            this._moreGameData = PfuGlobal.GetPfuBannerData();
            this.RefreshPfuBanner();
        }

        public CreateBanner() {
            //设置广告ID
            this._isCreateBanner = false;
            PfuGlobal.CreateBanner(PfuConfig.Config.bannerId, BannerDirction.DOWN_CENTER, () => {
                this._isCreateBanner = true;
                //PfuGlobal.ShowBanner();
            });
        }
        constructor() {
            this._tempRefreshBannerData = this.GetData();// new EveryDayRefreshBannerCount();//
            Laya.timer.loop(1000, this, this.Update);
            Laya.timer.loop(200, this, this.UpdateBannerAction);
        }


        private IsShareFinishCountNewDay(): boolean {
            var data: DataTimeCount = this._tempRefreshBannerData;
            if (data.time == 0) {
                return true;
            }
            var date: Date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        }

        public GetData(): EveryDayRefreshBannerCount {
            var json: string = Laya.LocalStorage.getJSON("everydayrefreshbannercount");
            if (json != null && json != "") {
                this._tempRefreshBannerData = JSON.parse(json);
                if(this.IsShareFinishCountNewDay())
                {
                    this._tempRefreshBannerData.count = 0;
                }
            } else {
                this._tempRefreshBannerData = new EveryDayRefreshBannerCount();
                this._tempRefreshBannerData.time = 0;
                this._tempRefreshBannerData.count = 0;
            }
            return this._tempRefreshBannerData;
        }

        private SaveData() {

            //存储当前时间
            var date: Date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1000);
            this._tempRefreshBannerData.time = mt.getTime();
            this._tempRefreshBannerData.count++;

            Laya.LocalStorage.setJSON("everydayrefreshbannercount",JSON.stringify(this._tempRefreshBannerData));

        }

        private UpdateBannerAction() {
            if (!PfuSdk.GetParamComplete) {
                return;
            }

            if (this._isCreateBanner) {
                if (this._isLastCtrAction) {
                    if (this._isLastShow) {
                        this.onShowBanner();
                    } else {
                        this.onHideBanner();
                    }
                    this._isLastCtrAction = false;
                }
            }
        }


        private Update() {

            if (!PfuSdk.GetParamComplete) {
                return;
            }

            if(this._tempRefreshBannerData.count > PfuManager.GetInstance().OLParam.pfuSdkBannerCount)
            {
                return;
            }

            this._timeCount += 1;
            //console.log(PfuGlobal.GetOLParam().pfuSdkRefresh + "" + this._timeCount+"");
            if (this._timeCount > PfuGlobal.GetOLParam().pfuSdkRefresh) {
                //刷新
                this.RefreshBanner();

            }
        }

        public IsBeBannerImg() {
            if (this._moreGameData && this._moreGameData.length > 0) {
                return true;
            }
            return false;
        }
        private RefreshPfuBanner() {
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
        }

        private RefreshBanner() {
            this._timeCount = 0;
            this._isCreateBanner = false;
            this._tempShowBannerTime = Date.now();
            //刷新Banner
            if (PfuGlobal.IsReadyBanner()) {
                PfuGlobal.RefreshBanner(() => {
                    this._isCreateBanner = true;
                    //刷新按照最后一次设置控制显示和隐藏
                    this._isLastCtrAction = true;

                    this.SaveData();
                });
            }

        }

        public GetPfuBannerImgUrl(): string {
            if (!this.IsBeBannerImg()) {
                return "";
            }
            return PfuGlobal.GetTopUrl() + this._moreGameData[this._showIndex].bannerLink;
        }

        public ClickPfuBanner() {
            if (!this.IsBeBannerImg()) {
                return;
            }
            PfuSdk.CallOnHide();
            PfuGlobal.CustomShowMoreGameImage(this._moreGameData[this._showIndex], this, () => {
                PfuSdk.CallOnShow({});
            });
        }

        private _firstShowBanner = true;

        public CallShow() {
            this._isLastShow = true;
            if (this._firstShowBanner || this._tempRefreshBannerData.count > PfuManager.GetInstance().OLParam.pfuSdkBannerCount) {
                this.ShowBAction();
            }
            else {
                let time = Date.now() - this._tempShowBannerTime;
                if (time > PfuManager.GetInstance().OLParam.pfuSdkBannerMin * 1000) {
                    this.RefreshBanner();
                }
                else {
                    this.ShowBAction();
                }


            }
        }
        private ShowBAction() {
            this._isLastCtrAction = true;
            this._firstShowBanner = false;
        }


        public CallHide() {
            this._isLastCtrAction = true;
            this._isLastShow = false;
        }

        private onHideBanner() {
            // if (PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF) {
            //     if (this._refreshBannerHandle != null) {
            //         this._onPfuSetBannerVisible.call(this._refreshBannerHandle, false);

            //     }
            // } else 
            {
                PfuGlobal.HideBanner();
            }
        }

        private onShowBanner() {
            // if (PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF) {
            //     if (this._refreshBannerHandle != null) {
            //         this._onPfuSetBannerVisible.call(this._refreshBannerHandle, true);
            //     }
            // } else 
            
            {
                PfuGlobal.ShowBanner();
            }
        }
    }

    class EveryDayRefreshBannerCount  {
        //最后一次领取时间
        public time: number = 0;

        public count: number = 0;
    }
}