/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_MoreGameUI = (function (_super) {
        __extends(UI_MoreGameUI, _super);
        function UI_MoreGameUI() {
            return _super.call(this) || this;
        }
        UI_MoreGameUI.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "MoreGameUI"));
        };
        UI_MoreGameUI.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_list_moregamebg = (this.getChild("list_moregamebg"));
            this.m_list_moregame = (this.getChild("list_moregame"));
            this.m_list_moregameStr = (this.getChild("list_moregameStr"));
            this.m_boxList = (this.getChild("boxList"));
            this.m_Btn_MoreGameLeft = (this.getChild("Btn_MoreGameLeft"));
            this.m_Btn_MoreGameRight = (this.getChild("Btn_MoreGameRight"));
            this.m_n10 = (this.getChild("n10"));
            this.m_btn_left_click = (this.getChild("btn_left_click"));
            this.m_list_moregame_left = (this.getChild("list_moregame_left"));
            this.m_n13 = (this.getChild("n13"));
            this.m_boxList_left = (this.getChild("boxList_left"));
            this.m_showLift = this.getTransition("showLift");
            this.m_hideLift = this.getTransition("hideLift");
        };
        return UI_MoreGameUI;
    }(fairygui.GComponent));
    UI_MoreGameUI.URL = "ui://xcy52l6510sdcb";
    pfusdkui.UI_MoreGameUI = UI_MoreGameUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_MoreGameUI.js.map