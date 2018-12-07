/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_List_Child = (function (_super) {
        __extends(UI_List_Child, _super);
        function UI_List_Child() {
            return _super.call(this) || this;
        }
        UI_List_Child.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "List_Child"));
        };
        UI_List_Child.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n0 = (this.getChildAt(0));
            this.m_n7 = (this.getChildAt(1));
            this.m_Text_name = (this.getChildAt(2));
            this.m_Text_message = (this.getChildAt(3));
            this.m_icon = (this.getChildAt(4));
            this.m_1 = (this.getChildAt(5));
            this.m_Text_name2 = (this.getChildAt(6));
            this.m_btn_start = (this.getChildAt(7));
        };
        return UI_List_Child;
    }(fairygui.GComponent));
    UI_List_Child.URL = "ui://xcy52l6510sdc4";
    pfusdkui.UI_List_Child = UI_List_Child;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_List_Child.js.map