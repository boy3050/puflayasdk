/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_redpackage_icon = (function (_super) {
        __extends(UI_redpackage_icon, _super);
        function UI_redpackage_icon() {
            return _super.call(this) || this;
        }
        UI_redpackage_icon.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "redpackage_icon"));
        };
        UI_redpackage_icon.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n31 = (this.getChildAt(0));
            this.m_n32 = (this.getChildAt(1));
            this.m_moneyNumStr = (this.getChildAt(2));
        };
        return UI_redpackage_icon;
    }(fairygui.GComponent));
    UI_redpackage_icon.URL = "ui://xcy52l65f4q7df";
    pfusdkui.UI_redpackage_icon = UI_redpackage_icon;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_redpackage_icon.js.map