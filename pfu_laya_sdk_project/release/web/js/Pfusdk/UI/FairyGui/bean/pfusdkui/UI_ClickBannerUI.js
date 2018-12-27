/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_ClickBannerUI = (function (_super) {
        __extends(UI_ClickBannerUI, _super);
        function UI_ClickBannerUI() {
            return _super.call(this) || this;
        }
        UI_ClickBannerUI.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "ClickBannerUI"));
        };
        UI_ClickBannerUI.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n1 = (this.getChild("n1"));
            this.m_loader = (this.getChild("loader"));
            this.m_cancel = (this.getChild("cancel"));
        };
        return UI_ClickBannerUI;
    }(fairygui.GComponent));
    UI_ClickBannerUI.URL = "ui://xcy52l65sxe6cl";
    pfusdkui.UI_ClickBannerUI = UI_ClickBannerUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_ClickBannerUI.js.map