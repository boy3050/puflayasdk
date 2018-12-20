namespace PFU.UI {
    export class ClickBannerWindow extends WindowBase {
        protected _fui: pfusdkui.UI_ClickBannerUI;

        public InitWindow(fui: fairygui.GComponent) {
            this._fui = fui as pfusdkui.UI_ClickBannerUI;
            super.InitWindow(fui);

            this._fui.m_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "bannerrevive/clickbannerbg.jpg";
        }
        protected OnStart() {
            
            this._fui.m_cancel.onClick(this,()=>{
                PfuClickBannerRevive.GetInstance().Cancel();
            });
        }

        protected OnUpdate() {
            
        }

        public Show(type?:number)
        {
            super.Show();
        }

        public Hide()
        {
            super.Hide();
        }



    }
}
