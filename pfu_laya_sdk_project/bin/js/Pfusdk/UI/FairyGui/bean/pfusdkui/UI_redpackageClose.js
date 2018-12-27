/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_redpackageClose = (function (_super) {
        __extends(UI_redpackageClose, _super);
        function UI_redpackageClose() {
            return _super.call(this) || this;
        }
        UI_redpackageClose.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "redpackageClose"));
        };
        UI_redpackageClose.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getController("button");
            this.m_n1 = (this.getChild("n1"));
            this.m_n2 = (this.getChild("n2"));
        };
        return UI_redpackageClose;
    }(fairygui.GButton));
    UI_redpackageClose.URL = "ui://xcy52l65f4q7d7";
    pfusdkui.UI_redpackageClose = UI_redpackageClose;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_redpackageClose.js.map