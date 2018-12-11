namespace PFU.UI {
    export class PfuSdkFairyUI {

        private static firstGameBoxWindow;
        private static _sdkDialogWindow: PFU.UI.SdkDialogWindow = null;

        public static CreateUI() {
            fairygui.UIConfig.packageFileExtension = "bin";
            pfusdkui.pfusdkuiBinder.bindAll();
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            this.LoadUIData();

            SceneMatchingUtils.WIDTH = laya.utils.Browser.width;
            SceneMatchingUtils.HEIGTH = laya.utils.Browser.height;
        }

        private static LoadUIData() {
            let fairyG = "@";
            if (Laya.version.charAt(0) == '2')  {
                //2.0FairyGUI图片链接改为下划线
                fairyG = "_";
            }

            Laya.loader.load([
                { url: "PfusdkRes/UI/fairygui/pfusdkui.bin", type: Laya.Loader.BUFFER },
                { url: "PfusdkRes/UI/fairygui/pfusdkui" + fairyG + "atlas0.png", type: Laya.Loader.IMAGE }
            ],
                Laya.Handler.create(this, () => {
                    fairygui.UIPackage.addPackage("PfusdkRes/UI/fairygui/pfusdkui");
                    this.CreateUIWindow();
                }));
        }

        private static CreateUIWindow() {

            //bannerWindow.Hide();

            let moreGameWindow = new PFU.UI.MoreGameWindow();
            moreGameWindow.InitWindow(pfusdkui.UI_MoreGameUI.createInstance());
            moreGameWindow.Hide();

            let bannerWindow = new PFU.UI.PfuBannerWindow();
            bannerWindow.InitWindow(pfusdkui.UI_PfuBannerUI.createInstance());

            let firstSceneBoxWindow = new PFU.UI.FirstSceneBoxWindow();
            firstSceneBoxWindow.InitWindow(pfusdkui.UI_BoxListUI.createInstance());


            let sdkDialogWindow = new PFU.UI.SdkDialogWindow();
            sdkDialogWindow.InitWindow(pfusdkui.UI_SdkDialogUI.createInstance());
            this._sdkDialogWindow = sdkDialogWindow;
           
            //设置更多游戏显示开关
            PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, (isShow, type) => {
                if (isShow) {
                    moreGameWindow.Show(type);
                } else {
                    moreGameWindow.Hide();
                }
            });
        }

    }
}