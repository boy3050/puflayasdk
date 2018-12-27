/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_List_GameChild_left = (function (_super) {
        __extends(UI_List_GameChild_left, _super);
        function UI_List_GameChild_left() {
            return _super.call(this) || this;
        }
        UI_List_GameChild_left.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "List_GameChild_left"));
        };
        UI_List_GameChild_left.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_icon = (this.getChild("icon"));
            this.m_n1 = (this.getChild("n1"));
            this.m_n2 = (this.getChild("n2"));
        };
        return UI_List_GameChild_left;
    }(fairygui.GComponent));
    UI_List_GameChild_left.URL = "ui://xcy52l65f4q7di";
    pfusdkui.UI_List_GameChild_left = UI_List_GameChild_left;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_List_GameChild_left.js.map