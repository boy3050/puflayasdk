/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_SdkDialogUI = (function (_super) {
        __extends(UI_SdkDialogUI, _super);
        function UI_SdkDialogUI() {
            return _super.call(this) || this;
        }
        UI_SdkDialogUI.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "SdkDialogUI"));
        };
        UI_SdkDialogUI.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_com = (this.getChild("com"));
        };
        return UI_SdkDialogUI;
    }(fairygui.GComponent));
    UI_SdkDialogUI.URL = "ui://xcy52l65jkohcj";
    pfusdkui.UI_SdkDialogUI = UI_SdkDialogUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_SdkDialogUI.js.map