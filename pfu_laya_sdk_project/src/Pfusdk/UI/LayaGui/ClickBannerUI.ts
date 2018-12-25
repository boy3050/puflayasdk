namespace PFU.UI {
    export class ClickBannerUI extends ui.ClickBannerUIUI {

        constructor() {
            super();
            this.visible = false;
            Laya.timer.frameLoop(1, this, this.OnUpdate);
            //this.loaderImg.loadImage();
            this.cancel.on(Laya.Event.CLICK, this, ()=>{
                PfuClickBannerRevive.GetInstance().Cancel();
            });


            this.loaderImg.skin = PFU.PfuGlobal.SDK_RES_CDN_PATH + "bannerrevive/clickbannerbg.jpg";
            this.zOrder = PfuSdk.UI_ORDER_OTHER;
            Laya.stage.updateZOrder();

            //this.loaderImg.y = this.loaderImg.height/2;
        }
        public OnUpdate() {

        }

        public Show() {
            this.visible = true;
            
        }

        public Hide() {
            this.visible = false;
        }

    }
}
