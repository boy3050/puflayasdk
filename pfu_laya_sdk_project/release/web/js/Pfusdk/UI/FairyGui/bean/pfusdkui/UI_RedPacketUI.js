/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_RedPacketUI = (function (_super) {
        __extends(UI_RedPacketUI, _super);
        function UI_RedPacketUI() {
            return _super.call(this) || this;
        }
        UI_RedPacketUI.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "RedPacketUI"));
        };
        UI_RedPacketUI.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_btn_redpackageicon = (this.getChild("btn_redpackageicon"));
            this.m_com_openredpackage = (this.getChild("com_openredpackage"));
            this.m_com_tixianredpackage = (this.getChild("com_tixianredpackage"));
            this.m_com_everyday = (this.getChild("com_everyday"));
            this.m_com_awradredpackage = (this.getChild("com_awradredpackage"));
        };
        return UI_RedPacketUI;
    }(fairygui.GComponent));
    UI_RedPacketUI.URL = "ui://xcy52l65f4q7cr";
    pfusdkui.UI_RedPacketUI = UI_RedPacketUI;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_RedPacketUI.js.map