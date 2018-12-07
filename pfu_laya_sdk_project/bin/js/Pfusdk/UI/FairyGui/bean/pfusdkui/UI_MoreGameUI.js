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
            this.m_list_moregamebg = (this.getChildAt(0));
            this.m_list_moregame = (this.getChildAt(1));
            this.m_list_moregameStr = (this.getChildAt(2));
            this.m_boxList = (this.getChildAt(3));
            this.m_Btn_MoreGameLeft = (this.getChildAt(4));
            this.m_Btn_MoreGameRight = (this.getChildAt(5));
        };
        return UI_MoreGameUI;
    }(fairygui.GComponent));
    UI_MoreGameUI.URL = "ui://xcy52l6510sdcb";
    pfusdkui.UI_MoreGameUI = UI_MoreGameUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_MoreGameUI.js.map