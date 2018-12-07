namespace PFU.UI {
    export class UI_PfuBannerUI extends ui.BannerUIUI {

        private _isCreatePfuBanner = false;
        constructor() {
            super();
            this.img_icon.on(Laya.Event.CLICK, this, this.ClickPfuBanner)
            this.visible = false;
            Laya.timer.frameLoop(1, this, this.OnUpdate);
            SceneMatchingLayaUtils.SetAlignBottom(this.img_icon);

        }
        public OnUpdate() {
            if (!this._isCreatePfuBanner && PfuSdk.GetParamComplete) {
                this.CreatePfuBanner();
                this._isCreatePfuBanner = true;
            }
        }

        public Show() {
            //检测在线参数，在线参数收到后 显示UI
            Laya.stage.addChild(this);
            
        }

        public Hide() {
            Laya.stage.removeChild(this);
            Laya.timer.clearAll(this);
        }

        private CreatePfuBanner() {
            //console.log("banner:" + PfuGlobal.GetOLParam().ad_banner);

            // if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF && PfuBannerUpdate.GetInstance().IsBeBannerImg()) {
            //     this.visible = true;
            //     PfuBannerUpdate.GetInstance().SetRefreshHandle(this, this.RefreshHandle, (isShow) => {
            //         if (isShow) {
            //             this.visible = true;
            //         }
            //         else {
            //             this.visible = false;
            //         }
            //     });
            // } else 
            {
                this.visible = false;
            }
        }

        private RefreshHandle() {
            this.img_icon.skin = PfuBannerUpdate.GetInstance().GetPfuBannerImgUrl();
        }

        private ClickPfuBanner() {
            PfuBannerUpdate.GetInstance().ClickPfuBanner();
        }
    }
}
