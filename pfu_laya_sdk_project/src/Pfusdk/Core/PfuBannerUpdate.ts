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
            Laya.timer.loop(1000, this, this.Update);
            Laya.timer.loop(200, this, this.UpdateBannerAction);

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

            this._timeCount += 1;
            //console.log(PfuGlobal.GetOLParam().pfuSdkRefresh + "" + this._timeCount+"");
            if (this._timeCount > PfuGlobal.GetOLParam().pfuSdkRefresh) {
                //刷新
                this.RefreshBanner();
                this._timeCount = 0;
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
            this._isCreateBanner = false;
            //刷新Banner
            if (PfuGlobal.IsReadyBanner()) {
                PfuGlobal.RefreshBanner(() => {
                    this._isCreateBanner = true;
                    //刷新按照最后一次设置控制显示和隐藏
                    this._isLastCtrAction = true;
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
            if (this._firstShowBanner) {
                this._isLastCtrAction = true;
                this._isLastShow = true;
                this._firstShowBanner = false;
            }
            else  {
                this._isLastShow = true;
                this.RefreshBanner()
            }
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
}