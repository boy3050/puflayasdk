/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_AwardRedPackage_com = (function (_super) {
        __extends(UI_AwardRedPackage_com, _super);
        function UI_AwardRedPackage_com() {
            return _super.call(this) || this;
        }
        UI_AwardRedPackage_com.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "AwardRedPackage_com"));
        };
        UI_AwardRedPackage_com.prototype.constructFromXML = function (xml) {
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
            this.m_n23 = (this.getChildAt(10));
            this.m_allMoney = (this.getChildAt(11));
            this.m_n25 = (this.getChildAt(12));
        };
        return UI_AwardRedPackage_com;
    }(fairygui.GComponent));
    UI_AwardRedPackage_com.URL = "ui://xcy52l65h5hmdk";
    pfusdkui.UI_AwardRedPackage_com = UI_AwardRedPackage_com;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_AwardRedPackage_com.js.map