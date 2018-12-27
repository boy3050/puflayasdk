/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_clickSkip = (function (_super) {
        __extends(UI_clickSkip, _super);
        function UI_clickSkip() {
            return _super.call(this) || this;
        }
        UI_clickSkip.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "clickSkip"));
        };
        UI_clickSkip.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n9 = (this.getChild("n9"));
        };
        return UI_clickSkip;
    }(fairygui.GComponent));
    UI_clickSkip.URL = "ui://xcy52l65sxe6cp";
    pfusdkui.UI_clickSkip = UI_clickSkip;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_clickSkip.js.map