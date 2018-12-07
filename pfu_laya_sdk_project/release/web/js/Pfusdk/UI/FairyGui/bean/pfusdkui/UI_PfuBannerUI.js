/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_PfuBannerUI = (function (_super) {
        __extends(UI_PfuBannerUI, _super);
        function UI_PfuBannerUI() {
            return _super.call(this) || this;
        }
        UI_PfuBannerUI.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "PfuBannerUI"));
        };
        UI_PfuBannerUI.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_loader = (this.getChildAt(0));
        };
        return UI_PfuBannerUI;
    }(fairygui.GComponent));
    UI_PfuBannerUI.URL = "ui://xcy52l6510sdc0";
    pfusdkui.UI_PfuBannerUI = UI_PfuBannerUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_PfuBannerUI.js.map