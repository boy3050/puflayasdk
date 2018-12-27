/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_BoxListUI = (function (_super) {
        __extends(UI_BoxListUI, _super);
        function UI_BoxListUI() {
            return _super.call(this) || this;
        }
        UI_BoxListUI.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "BoxListUI"));
        };
        UI_BoxListUI.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n10 = (this.getChild("n10"));
            this.m_n2 = (this.getChild("n2"));
            this.m_n1 = (this.getChild("n1"));
            this.m_n3 = (this.getChild("n3"));
            this.m_List_game = (this.getChild("List_game"));
            this.m_Btn_close = (this.getChild("Btn_close"));
            this.m_Img_banner = (this.getChild("Img_banner"));
        };
        return UI_BoxListUI;
    }(fairygui.GComponent));
    UI_BoxListUI.URL = "ui://xcy52l6510sdc1";
    pfusdkui.UI_BoxListUI = UI_BoxListUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_BoxListUI.js.map