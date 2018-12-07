var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var PfuSdkFairyUI = (function () {
            function PfuSdkFairyUI() {
            }
            PfuSdkFairyUI.CreateUI = function () {
                fairygui.UIConfig.packageFileExtension = "bin";
                pfusdkui.pfusdkuiBinder.bindAll();
                Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
                this.LoadUIData();
                UI.SceneMatchingUtils.WIDTH = laya.utils.Browser.width;
                UI.SceneMatchingUtils.HEIGTH = laya.utils.Browser.height;
            };
            PfuSdkFairyUI.LoadUIData = function () {
                var _this = this;
                var fairyG = "@";
                if (Laya.version.charAt(0) == '2') {
                    //2.0FairyGUI图片链接改为下划线
                    fairyG = "_";
                }
                Laya.loader.load([
                    { url: "PfusdkRes/UI/fairygui/pfusdkui.bin", type: Laya.Loader.BUFFER },
                    { url: "PfusdkRes/UI/fairygui/pfusdkui" + fairyG + "atlas0.png", type: Laya.Loader.IMAGE }
                ], Laya.Handler.create(this, function () {
                    fairygui.UIPackage.addPackage("PfusdkRes/UI/fairygui/pfusdkui");
                    _this.CreateUIWindow();
                }));
            };
            PfuSdkFairyUI.CreateUIWindow = function () {
                //bannerWindow.Hide();
                var moreGameWindow = new PFU.UI.MoreGameWindow();
                moreGameWindow.InitWindow(pfusdkui.UI_MoreGameUI.createInstance());
                moreGameWindow.Hide();
                var bannerWindow = new PFU.UI.PfuBannerWindow();
                bannerWindow.InitWindow(pfusdkui.UI_PfuBannerUI.createInstance());
                var firstSceneBoxWindow = new PFU.UI.FirstSceneBoxWindow();
                firstSceneBoxWindow.InitWindow(pfusdkui.UI_BoxListUI.createInstance());
                //设置更多游戏显示开关
                PFU.PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, function (isShow, type) {
                    if (isShow) {
                        moreGameWindow.Show(type);
                    }
                    else {
                        moreGameWindow.Hide();
                    }
                });
            };
            return PfuSdkFairyUI;
        }());
        UI.PfuSdkFairyUI = PfuSdkFairyUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuSdkFairyUI.js.map