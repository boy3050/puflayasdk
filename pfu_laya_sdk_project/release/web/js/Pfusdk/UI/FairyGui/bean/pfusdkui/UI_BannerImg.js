/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pfusdkui;
(function (pfusdkui) {
    var UI_BannerImg = (function (_super) {
        __extends(UI_BannerImg, _super);
        function UI_BannerImg() {
            return _super.call(this) || this;
        }
        UI_BannerImg.createInstance = function () {
            return (fairygui.UIPackage.createObject("pfusdkui", "BannerImg"));
        };
        UI_BannerImg.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_icon = (this.getChildAt(0));
        };
        return UI_BannerImg;
    }(fairygui.GComponent));
    UI_BannerImg.URL = "ui://xcy52l6510sdc9";
    pfusdkui.UI_BannerImg = UI_BannerImg;
})(pfusdkui || (pfusdkui = {}));
//# sourceMappingURL=UI_BannerImg.js.map