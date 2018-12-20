/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_btn_red_open = (function (_super) {
        __extends(UI_btn_red_open, _super);
        function UI_btn_red_open() {
            return _super.call(this) || this;
        }
        UI_btn_red_open.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "btn_red_open"));
        };
        UI_btn_red_open.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n2 = (this.getChildAt(0));
        };
        return UI_btn_red_open;
    }(fairygui.GComponent));
    UI_btn_red_open.URL = "ui://xcy52l65f4q7d9";
    pfusdkui.UI_btn_red_open = UI_btn_red_open;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_btn_red_open.js.map