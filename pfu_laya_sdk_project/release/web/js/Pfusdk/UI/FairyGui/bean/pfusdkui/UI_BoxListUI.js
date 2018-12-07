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
            this.m_n10 = (this.getChildAt(0));
            this.m_n2 = (this.getChildAt(1));
            this.m_n1 = (this.getChildAt(2));
            this.m_n3 = (this.getChildAt(3));
            this.m_List_game = (this.getChildAt(4));
            this.m_Btn_close = (this.getChildAt(5));
            this.m_Img_banner = (this.getChildAt(6));
        };
        return UI_BoxListUI;
    }(fairygui.GComponent));
    UI_BoxListUI.URL = "ui://xcy52l6510sdc1";
    pfusdkui.UI_BoxListUI = UI_BoxListUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_BoxListUI.js.map