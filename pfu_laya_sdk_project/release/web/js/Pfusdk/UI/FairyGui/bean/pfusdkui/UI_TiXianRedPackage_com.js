/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_TiXianRedPackage_com = (function (_super) {
        __extends(UI_TiXianRedPackage_com, _super);
        function UI_TiXianRedPackage_com() {
            return _super.call(this) || this;
        }
        UI_TiXianRedPackage_com.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "TiXianRedPackage_com"));
        };
        UI_TiXianRedPackage_com.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n8 = (this.getChild("n8"));
            this.m_bg_loader = (this.getChild("bg_loader"));
            this.m_btn_close = (this.getChild("btn_close"));
            this.m_n15 = (this.getChild("n15"));
            this.m_n16 = (this.getChild("n16"));
            this.m_moneyNum = (this.getChild("moneyNum"));
            this.m_n18 = (this.getChild("n18"));
            this.m_n19 = (this.getChild("n19"));
            this.m_n20 = (this.getChild("n20"));
            this.m_btn_tixian = (this.getChild("btn_tixian"));
        };
        return UI_TiXianRedPackage_com;
    }(fairygui.GComponent));
    UI_TiXianRedPackage_com.URL = "ui://xcy52l65f4q7da";
    pfusdkui.UI_TiXianRedPackage_com = UI_TiXianRedPackage_com;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_TiXianRedPackage_com.js.map