/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_OpenRedPackage_com = (function (_super) {
        __extends(UI_OpenRedPackage_com, _super);
        function UI_OpenRedPackage_com() {
            return _super.call(this) || this;
        }
        UI_OpenRedPackage_com.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "OpenRedPackage_com"));
        };
        UI_OpenRedPackage_com.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n0 = (this.getChildAt(0));
            this.m_bg_loader = (this.getChildAt(1));
            this.m_btn_red_open = (this.getChildAt(2));
            this.m_n3 = (this.getChildAt(3));
            this.m_n4 = (this.getChildAt(4));
            this.m_voidStr = (this.getChildAt(5));
            this.m_n6 = (this.getChildAt(6));
            this.m_n7 = (this.getChildAt(7));
            this.m_btn_close = (this.getChildAt(8));
        };
        return UI_OpenRedPackage_com;
    }(fairygui.GComponent));
    UI_OpenRedPackage_com.URL = "ui://xcy52l65f4q7d6";
    pfusdkui.UI_OpenRedPackage_com = UI_OpenRedPackage_com;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_OpenRedPackage_com.js.map