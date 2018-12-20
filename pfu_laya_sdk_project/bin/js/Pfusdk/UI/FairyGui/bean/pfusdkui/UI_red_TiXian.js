/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_red_TiXian = (function (_super) {
        __extends(UI_red_TiXian, _super);
        function UI_red_TiXian() {
            return _super.call(this) || this;
        }
        UI_red_TiXian.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "red_TiXian"));
        };
        UI_red_TiXian.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n21 = (this.getChildAt(0));
        };
        return UI_red_TiXian;
    }(fairygui.GComponent));
    UI_red_TiXian.URL = "ui://xcy52l65f4q7d8";
    pfusdkui.UI_red_TiXian = UI_red_TiXian;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_red_TiXian.js.map