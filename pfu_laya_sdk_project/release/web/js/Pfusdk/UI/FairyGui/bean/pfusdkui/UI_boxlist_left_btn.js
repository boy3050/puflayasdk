/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_boxlist_left_btn = (function (_super) {
        __extends(UI_boxlist_left_btn, _super);
        function UI_boxlist_left_btn() {
            return _super.call(this) || this;
        }
        UI_boxlist_left_btn.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "boxlist_left_btn"));
        };
        UI_boxlist_left_btn.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n9 = (this.getChildAt(0));
        };
        return UI_boxlist_left_btn;
    }(fairygui.GComponent));
    UI_boxlist_left_btn.URL = "ui://xcy52l65f4q7dj";
    pfusdkui.UI_boxlist_left_btn = UI_boxlist_left_btn;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_boxlist_left_btn.js.map