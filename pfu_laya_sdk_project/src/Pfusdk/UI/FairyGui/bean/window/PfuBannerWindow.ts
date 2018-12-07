namespace PFU.UI {
    export class PfuBannerWindow extends WindowBase {
        protected _fui: pfusdkui.UI_PfuBannerUI;

        private _isCreatePfuBanner = false;

        public InitWindow(fui: fairygui.GComponent) {
            this._fui = fui as pfusdkui.UI_PfuBannerUI;
            super.InitWindow(fui);
        }
        protected OnStart() {
            this._fui.m_loader.onClick(this, this.ClickPfuBanner);
            this._fui.m_loader.visible = false;
            //设置底部适配
            SceneMatchingUtils.SetAlignBottom(this._fui.m_loader);
        }

        protected OnUpdate() {
            if (!this._isCreatePfuBanner && PfuSdk.GetParamComplete) {
                this.CreatePfuBanner();
                this._isCreatePfuBanner = true;
            }
        }

        public Show() {
            //检测在线参数，在线参数收到后 显示UI
            super.Show();
        }

        public Hide() {
            super.Hide();
        }

        private CreatePfuBanner()  {
            //console.log("banner:" + PfuGlobal.GetOLParam().ad_banner);

            // if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF && PfuBannerUpdate.GetInstance().IsBeBannerImg()) {
            //     this._fui.m_loader.visible = true;
            //     PfuBannerUpdate.GetInstance().SetRefreshHandle(this, this.RefreshHandle,(isShow)=>{
            //         if(isShow)
            //         {
            //             this._fui.m_loader.visible = true;
            //         }
            //         else
            //         {
            //             this._fui.m_loader.visible = false;
            //         }
            //     });
            // } else 
            {
                this._fui.m_loader.visible = false;
            }
        }

        private RefreshHandle()  {
            this._fui.m_loader.visible
            this._fui.m_loader.icon = PfuBannerUpdate.GetInstance().GetPfuBannerImgUrl();
        }

        private ClickPfuBanner() {
            PfuBannerUpdate.GetInstance().ClickPfuBanner();
        }
    }
}
