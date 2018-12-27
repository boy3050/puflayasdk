/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_everyday_redpackage_com = (function (_super) {
        __extends(UI_everyday_redpackage_com, _super);
        function UI_everyday_redpackage_com() {
            return _super.call(this) || this;
        }
        UI_everyday_redpackage_com.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "everyday_redpackage_com"));
        };
        UI_everyday_redpackage_com.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n22 = (this.getChild("n22"));
            this.m_bg_loader = (this.getChild("bg_loader"));
            this.m_n24 = (this.getChild("n24"));
            this.m_btn_double_btn = (this.getChild("btn_double_btn"));
            this.m_btn_red_everyday_skip = (this.getChild("btn_red_everyday_skip"));
            this.m_list_sex = (this.getChild("list_sex"));
            this.m_seven = (this.getChild("seven"));
        };
        return UI_everyday_redpackage_com;
    }(fairygui.GComponent));
    UI_everyday_redpackage_com.URL = "ui://xcy52l65f4q7de";
    pfusdkui.UI_everyday_redpackage_com = UI_everyday_redpackage_com;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_everyday_redpackage_com.js.map