var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var PfuSdkLayaUI = (function () {
            function PfuSdkLayaUI() {
            }
            PfuSdkLayaUI.CustomSpecialUI = function (scaleX, scaleY, bottomOffset) {
                this._scaleX = scaleX;
                this._scaleY = scaleY;
                this._bottomOffset = bottomOffset;
            };
            PfuSdkLayaUI.CreateUI = function () {
                this.LoadUIData();
                UI.SceneMatchingLayaUtils.bottomOffset = this._bottomOffset;
                UI.SceneMatchingLayaUtils.WIDTH = laya.utils.Browser.width;
                UI.SceneMatchingLayaUtils.HEIGTH = laya.utils.Browser.height;
            };
            PfuSdkLayaUI.LoadUIData = function () {
                Laya.loader.load(PFU.PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/layaui/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
                //Laya.loader.load("https://txpk.jfydgame.com/pfulayasdk/test/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
            };
            PfuSdkLayaUI.AddStage = function (windowUI) {
                windowUI.scale(this._scaleX, this._scaleY);
                this._windowList.push(windowUI);
                Laya.stage.addChild(windowUI);
            };
            PfuSdkLayaUI.GetSdkWindowList = function () {
                return this._windowList;
            };
            PfuSdkLayaUI.CreateUIWindow = function () {
                var _this = this;
                this.moregameUI = new PFU.UI.MoreGameUI();
                this.AddStage(this.moregameUI);
                this.moregameUI.OnHide();
                this.bannerUI = new PFU.UI.UI_PfuBannerUI();
                this.AddStage(this.bannerUI);
                this.boxWindowUI = new PFU.UI.FirstSceneBoxUI();
                this.AddStage(this.boxWindowUI);
                var clickBannerUI = new PFU.UI.ClickBannerUI();
                this.AddStage(clickBannerUI);
                this.redPacketUI = new PFU.UI.RedPacketUI();
                this.AddStage(this.redPacketUI);
                //设置更多游戏显示开关
                PFU.PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, function (isShow, type) {
                    if (isShow) {
                        _this.moregameUI.OnShow(type);
                    }
                    else {
                        _this.moregameUI.OnHide();
                    }
                });
                PFU.PfuClickBannerRevive.GetInstance().SetUIHandle(this, function (isShow) {
                    if (isShow) {
                        clickBannerUI.Show();
                    }
                    else {
                        clickBannerUI.Hide();
                    }
                });
                PFU.PfuGlobal.SetOnDialog(this, PfuSdkLayaUI.OnAddDialog);
                PFU.PfuRedPacketManager.GetInstance().SetRedpacketHandle(this, function (isShowBtn) {
                    _this.moregameUI.SetIconVisible(isShowBtn);
                }, function () {
                    _this.redPacketUI.OpenRadPacketGift();
                }, function () {
                    _this.redPacketUI.OpenEverydayGift();
                }, function (vx, vy) {
                    _this.moregameUI.SetIconBtnPos(vx, vy);
                });
                PFU.PfuMoreGameUpdate.GetInstance().SetPopupListVisible(this, function (isShow) {
                    if (isShow) {
                        _this.moregameUI.ShowLeft();
                    }
                    else {
                        _this.moregameUI.HideLeft();
                    }
                });
            };
            PfuSdkLayaUI.OpenEverydayGift = function () {
                this.redPacketUI.OpenEverydayGift();
            };
            PfuSdkLayaUI.OpenRadPacketTixian = function () {
                this.redPacketUI.OpenRadPacketTixian();
            };
            PfuSdkLayaUI.UpdateIconMoney = function () {
                this.moregameUI.UpdateIconMoney();
            };
            PfuSdkLayaUI.OnAddDialog = function (desc) {
                var dialog = new ui.SdkDialogUIUI();
                dialog.dialogtext.text = "" + desc;
                dialog.zOrder = PfuSdk.UI_ORDER_OTHER;
                Laya.stage.addChild(dialog);
                Laya.stage.updateZOrder();
                Laya.timer.once(2000, this, function () {
                    dialog.removeSelf();
                });
            };
            return PfuSdkLayaUI;
        }());
        PfuSdkLayaUI._scaleX = 1;
        PfuSdkLayaUI._scaleY = 1;
        PfuSdkLayaUI._bottomOffset = 0;
        PfuSdkLayaUI._windowList = new Array();
        UI.PfuSdkLayaUI = PfuSdkLayaUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuSdkLayaUI.js.map