/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_DialogCom = (function (_super) {
        __extends(UI_DialogCom, _super);
        function UI_DialogCom() {
            return _super.call(this) || this;
        }
        UI_DialogCom.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "DialogCom"));
        };
        UI_DialogCom.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n4 = (this.getChildAt(0));
            this.m_tiptext = (this.getChildAt(1));
        };
        return UI_DialogCom;
    }(fairygui.GComponent));
    UI_DialogCom.URL = "ui://xcy52l65jkohck";
    pfusdkui.UI_DialogCom = UI_DialogCom;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_DialogCom.js.map