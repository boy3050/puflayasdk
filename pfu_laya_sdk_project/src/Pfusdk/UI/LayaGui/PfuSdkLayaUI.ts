namespace PFU.UI {
    export class PfuSdkLayaUI {
        public static boxWindowUI: PFU.UI.FirstSceneBoxUI;
        public static moregameUI: PFU.UI.MoreGameUI;
        public static bannerUI: PFU.UI.UI_PfuBannerUI;

        private static _scaleX: number = 1;
        private static _scaleY: number = 1;
        private static _bottomOffset: number = 0;

        public static CustomSpecialUI(scaleX: number, scaleY: number, bottomOffset: number)  {
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._bottomOffset = bottomOffset;
        }

        public static CreateUI() {
            this.LoadUIData();
            SceneMatchingLayaUtils.bottomOffset = this._bottomOffset;
            SceneMatchingLayaUtils.WIDTH = laya.utils.Browser.width;
            SceneMatchingLayaUtils.HEIGTH = laya.utils.Browser.height;
        }

        private static LoadUIData() {
            Laya.loader.load("PfusdkRes/UI/layaui/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
        }

        private static CreateUIWindow() {
            this.moregameUI = new PFU.UI.MoreGameUI();
            this.moregameUI.scale(this._scaleX,this._scaleY);
            Laya.stage.addChild(this.moregameUI);
            this.moregameUI.OnHide();
            this.bannerUI = new PFU.UI.UI_PfuBannerUI();
            this.bannerUI.scale(this._scaleX,this._scaleY);
            Laya.stage.addChild(this.bannerUI);
            this.boxWindowUI = new PFU.UI.FirstSceneBoxUI();
            this.boxWindowUI.scale(this._scaleX,this._scaleY);
            Laya.stage.addChild(this.boxWindowUI);

            //设置更多游戏显示开关
            PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, (isShow, type) => {
                if (isShow) {
                    this.moregameUI.OnShow(type);
                } else {
                    this.moregameUI.OnHide();
                }
            });

        }
    }
}