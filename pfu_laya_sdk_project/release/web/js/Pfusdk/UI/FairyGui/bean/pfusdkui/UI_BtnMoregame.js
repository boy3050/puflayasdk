/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_BtnMoregame = (function (_super) {
        __extends(UI_BtnMoregame, _super);
        function UI_BtnMoregame() {
            return _super.call(this) || this;
        }
        UI_BtnMoregame.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "BtnMoregame"));
        };
        UI_BtnMoregame.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getController("button");
            this.m_icon = (this.getChild("icon"));
            this.m_toSmall = this.getTransition("toSmall");
            this.m_toNormal = this.getTransition("toNormal");
        };
        return UI_BtnMoregame;
    }(fairygui.GButton));
    UI_BtnMoregame.URL = "ui://xcy52l6510sdcg";
    pfusdkui.UI_BtnMoregame = UI_BtnMoregame;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_BtnMoregame.js.map