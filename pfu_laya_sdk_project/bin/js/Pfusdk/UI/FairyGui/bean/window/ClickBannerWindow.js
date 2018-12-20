var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var ClickBannerWindow = (function (_super) {
            __extends(ClickBannerWindow, _super);
            function ClickBannerWindow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ClickBannerWindow.prototype.InitWindow = function (fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
                this._fui.m_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "bannerrevive/clickbannerbg.jpg";
            };
            ClickBannerWindow.prototype.OnStart = function () {
                this._fui.m_cancel.onClick(this, function () {
                    PFU.PfuClickBannerRevive.GetInstance().Cancel();
                });
            };
            ClickBannerWindow.prototype.OnUpdate = function () {
            };
            ClickBannerWindow.prototype.Show = function (type) {
                _super.prototype.Show.call(this);
            };
            ClickBannerWindow.prototype.Hide = function () {
                _super.prototype.Hide.call(this);
            };
            return ClickBannerWindow;
        }(UI.WindowBase));
        UI.ClickBannerWindow = ClickBannerWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=ClickBannerWindow.js.map