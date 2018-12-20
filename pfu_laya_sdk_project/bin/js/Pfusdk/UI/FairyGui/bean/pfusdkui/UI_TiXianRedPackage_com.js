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
            this.m_n8 = (this.getChildAt(0));
            this.m_bg_loader = (this.getChildAt(1));
            this.m_btn_close = (this.getChildAt(2));
            this.m_n15 = (this.getChildAt(3));
            this.m_n16 = (this.getChildAt(4));
            this.m_moneyNum = (this.getChildAt(5));
            this.m_n18 = (this.getChildAt(6));
            this.m_n19 = (this.getChildAt(7));
            this.m_n20 = (this.getChildAt(8));
            this.m_btn_tixian = (this.getChildAt(9));
        };
        return UI_TiXianRedPackage_com;
    }(fairygui.GComponent));
    UI_TiXianRedPackage_com.URL = "ui://xcy52l65f4q7da";
    pfusdkui.UI_TiXianRedPackage_com = UI_TiXianRedPackage_com;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_TiXianRedPackage_com.js.map