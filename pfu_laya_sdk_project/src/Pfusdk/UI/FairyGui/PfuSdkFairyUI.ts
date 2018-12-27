namespace PFU.UI {
    export class PfuSdkFairyUI {

        private static firstGameBoxWindow;
        private static _sdkDialogWindow: PFU.UI.SdkDialogWindow = null;
        private static _clickBannerWindow: PFU.UI.ClickBannerWindow = null;


        public static CreateUI(callback:Function) {
            fairygui.UIConfig.packageFileExtension = "bin";
            pfusdkui.pfusdkuiBinder.bindAll();
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            this.LoadUIData(callback);

            SceneMatchingUtils.WIDTH = laya.utils.Browser.width;
            SceneMatchingUtils.HEIGTH = laya.utils.Browser.height;
        }

        private static LoadUIData(callback:Function) {
            let fairyG = "@";
            if (Laya.version.charAt(0) == '2') {
                //2.0FairyGUI图片链接改为下划线
                fairyG = "_";
            }

            Laya.loader.load([
                { url: PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/fairygui/pfusdkui.bin", type: Laya.Loader.BUFFER },
                { url: PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/fairygui/pfusdkui" + fairyG + "atlas0.png", type: Laya.Loader.IMAGE }
            ],
                Laya.Handler.create(this, () => {
                    fairygui.UIPackage.addPackage(PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/fairygui/pfusdkui");
                    this.CreateUIWindow();
                    callback();
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

            let clickBannerWindow = new PFU.UI.ClickBannerWindow();
            clickBannerWindow.InitWindow(pfusdkui.UI_ClickBannerUI.createInstance());
            clickBannerWindow.Hide();
            this._clickBannerWindow = clickBannerWindow;

            let redpacketWindow = new PFU.UI.RedPacketWindow();
            redpacketWindow.InitWindow(pfusdkui.UI_RedPacketUI.createInstance());
            redpacketWindow.Show();

            PfuClickBannerRevive.GetInstance().SetUIHandle(this, (isShow) => {
                if (isShow) {
                    clickBannerWindow.Show();
                } else {
                    clickBannerWindow.Hide();
                }
            });


            PfuMoreGameUpdate.GetInstance().SetPopupListVisible(this, (isShow) => {
                if (isShow) {
                    moreGameWindow.ShowLeft();
                } else {
                    moreGameWindow.HideLeft();
                }
            });

            PfuRedPacketManager.GetInstance().SetRedpacketHandle(this, (isShowBtn) => {
                redpacketWindow.SetIconVisible(isShowBtn);
            },()=>{
                redpacketWindow.OpenRadPacketGift();
            },()=>{
                redpacketWindow.OpenEverydayGift();
            },(vx:number,vy:number)=>{
                redpacketWindow.SetIconBtnPos(vx,vy);
            },()=>{
                redpacketWindow.ForceCloseRedPacketUI();
            });


            //设置更多游戏显示开关 createWindow true
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