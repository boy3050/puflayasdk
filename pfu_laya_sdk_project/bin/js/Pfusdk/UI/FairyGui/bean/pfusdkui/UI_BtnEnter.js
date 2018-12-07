/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_BtnEnter = (function (_super) {
        __extends(UI_BtnEnter, _super);
        function UI_BtnEnter() {
            return _super.call(this) || this;
        }
        UI_BtnEnter.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "BtnEnter"));
        };
        UI_BtnEnter.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getControllerAt(0);
            this.m_anniu_1 = (this.getChildAt(0));
            this.m_title = (this.getChildAt(1));
            this.m_toSmall = this.getTransitionAt(0);
            this.m_toNormal = this.getTransitionAt(1);
            this.m_tishi = this.getTransitionAt(2);
        };
        return UI_BtnEnter;
    }(fairygui.GButton));
    UI_BtnEnter.URL = "ui://xcy52l6510sdc5";
    pfusdkui.UI_BtnEnter = UI_BtnEnter;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_BtnEnter.js.map