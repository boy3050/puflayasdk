var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var SdkDialogWindow = (function (_super) {
            __extends(SdkDialogWindow, _super);
            function SdkDialogWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isCreatePfuBanner = false;
                return _this;
            }
            SdkDialogWindow.prototype.InitWindow = function (fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            SdkDialogWindow.prototype.OnStart = function () {
                PFU.PfuGlobal.SetOnDialog(this, this.OnAddDialog);
            };
            SdkDialogWindow.prototype.OnUpdate = function () {
            };
            SdkDialogWindow.prototype.OnAddDialog = function (desc) {
                var dialog = pfusdkui.UI_DialogCom.createInstance();
                dialog.m_tiptext.text = "" + desc;
                dialog.center();
                this._fui.addChild(dialog);
                Laya.timer.once(2000, this, function () {
                    dialog.dispose();
                });
            };
            return SdkDialogWindow;
        }(UI.WindowBase));
        UI.SdkDialogWindow = SdkDialogWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=SdkDialogWindow.js.map