/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_BtnClose = (function (_super) {
        __extends(UI_BtnClose, _super);
        function UI_BtnClose() {
            return _super.call(this) || this;
        }
        UI_BtnClose.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "BtnClose"));
        };
        UI_BtnClose.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getController("button");
            this.m_anniu_1 = (this.getChild("anniu_1"));
            this.m_toSmall = this.getTransition("toSmall");
            this.m_toNormal = this.getTransition("toNormal");
            this.m_tishi = this.getTransition("tishi");
        };
        return UI_BtnClose;
    }(fairygui.GButton));
    UI_BtnClose.URL = "ui://xcy52l6510sdc7";
    pfusdkui.UI_BtnClose = UI_BtnClose;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_BtnClose.js.map