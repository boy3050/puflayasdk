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
                Laya.loader.load("PfusdkRes/UI/layaui/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
            };
            PfuSdkLayaUI.CreateUIWindow = function () {
                var _this = this;
                this.moregameUI = new PFU.UI.MoreGameUI();
                this.moregameUI.scale(this._scaleX, this._scaleY);
                Laya.stage.addChild(this.moregameUI);
                this.moregameUI.OnHide();
                this.bannerUI = new PFU.UI.UI_PfuBannerUI();
                this.bannerUI.scale(this._scaleX, this._scaleY);
                Laya.stage.addChild(this.bannerUI);
                this.boxWindowUI = new PFU.UI.FirstSceneBoxUI();
                this.boxWindowUI.scale(this._scaleX, this._scaleY);
                Laya.stage.addChild(this.boxWindowUI);
                //设置更多游戏显示开关
                PFU.PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, function (isShow, type) {
                    if (isShow) {
                        _this.moregameUI.OnShow(type);
                    }
                    else {
                        _this.moregameUI.OnHide();
                    }
                });
            };
            return PfuSdkLayaUI;
        }());
        PfuSdkLayaUI._scaleX = 1;
        PfuSdkLayaUI._scaleY = 1;
        PfuSdkLayaUI._bottomOffset = 0;
        UI.PfuSdkLayaUI = PfuSdkLayaUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuSdkLayaUI.js.map