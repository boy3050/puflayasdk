/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_List_GameChild = (function (_super) {
        __extends(UI_List_GameChild, _super);
        function UI_List_GameChild() {
            return _super.call(this) || this;
        }
        UI_List_GameChild.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "List_GameChild"));
        };
        UI_List_GameChild.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_icon = (this.getChild("icon"));
            this.m_n1 = (this.getChild("n1"));
            this.m_n2 = (this.getChild("n2"));
        };
        return UI_List_GameChild;
    }(fairygui.GComponent));
    UI_List_GameChild.URL = "ui://xcy52l656o1rci";
    pfusdkui.UI_List_GameChild = UI_List_GameChild;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_List_GameChild.js.map