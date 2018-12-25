var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var PfuSdkFairyUI = (function () {
            function PfuSdkFairyUI() {
            }
            PfuSdkFairyUI.CreateUI = function (callback) {
                fairygui.UIConfig.packageFileExtension = "bin";
                pfusdkui.pfusdkuiBinder.bindAll();
                Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
                this.LoadUIData(callback);
                UI.SceneMatchingUtils.WIDTH = laya.utils.Browser.width;
                UI.SceneMatchingUtils.HEIGTH = laya.utils.Browser.height;
            };
            PfuSdkFairyUI.LoadUIData = function (callback) {
                var _this = this;
                var fairyG = "@";
                if (Laya.version.charAt(0) == '2') {
                    //2.0FairyGUI图片链接改为下划线
                    fairyG = "_";
                }
                Laya.loader.load([
                    { url: PFU.PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/fairygui/pfusdkui.bin", type: Laya.Loader.BUFFER },
                    { url: PFU.PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/fairygui/pfusdkui" + fairyG + "atlas0.png", type: Laya.Loader.IMAGE }
                ], Laya.Handler.create(this, function () {
                    fairygui.UIPackage.addPackage(PFU.PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/fairygui/pfusdkui");
                    _this.CreateUIWindow();
                    callback();
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
                var sdkDialogWindow = new PFU.UI.SdkDialogWindow();
                sdkDialogWindow.InitWindow(pfusdkui.UI_SdkDialogUI.createInstance());
                this._sdkDialogWindow = sdkDialogWindow;
                var clickBannerWindow = new PFU.UI.ClickBannerWindow();
                clickBannerWindow.InitWindow(pfusdkui.UI_ClickBannerUI.createInstance());
                clickBannerWindow.Hide();
                this._clickBannerWindow = clickBannerWindow;
                var redpacketWindow = new PFU.UI.RedPacketWindow();
                redpacketWindow.InitWindow(pfusdkui.UI_RedPacketUI.createInstance());
                redpacketWindow.Show();
                PFU.PfuClickBannerRevive.GetInstance().SetUIHandle(this, function (isShow) {
                    if (isShow) {
                        clickBannerWindow.Show();
                    }
                    else {
                        clickBannerWindow.Hide();
                    }
                });
                PFU.PfuMoreGameUpdate.GetInstance().SetPopupListVisible(this, function (isShow) {
                    if (isShow) {
                        moreGameWindow.ShowLeft();
                    }
                    else {
                        moreGameWindow.HideLeft();
                    }
                });
                PFU.PfuRedPacketManager.GetInstance().SetRedpacketHandle(this, function (isShowBtn) {
                    redpacketWindow.SetIconVisible(isShowBtn);
                }, function () {
                    redpacketWindow.OpenRadPacketGift();
                }, function () {
                    redpacketWindow.OpenEverydayGift();
                }, function (vx, vy) {
                    redpacketWindow.SetIconBtnPos(vx, vy);
                });
                //设置更多游戏显示开关 createWindow true
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
        PfuSdkFairyUI._sdkDialogWindow = null;
        PfuSdkFairyUI._clickBannerWindow = null;
        UI.PfuSdkFairyUI = PfuSdkFairyUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuSdkFairyUI.js.map