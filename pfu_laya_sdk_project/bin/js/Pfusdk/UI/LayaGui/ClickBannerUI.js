var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var ClickBannerUI = (function (_super) {
            __extends(ClickBannerUI, _super);
            function ClickBannerUI() {
                var _this = _super.call(this) || this;
                _this.visible = false;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                //this.loaderImg.loadImage();
                _this.cancel.on(Laya.Event.CLICK, _this, function () {
                    PFU.PfuClickBannerRevive.GetInstance().Cancel();
                });
                _this.loaderImg.skin = PFU.PfuGlobal.SDK_RES_CDN_PATH + "bannerrevive/clickbannerbg.jpg";
                _this.zOrder = PfuSdk.UI_ORDER_OTHER;
                Laya.stage.updateZOrder();
                return _this;
                //this.loaderImg.y = this.loaderImg.height/2;
            }
            ClickBannerUI.prototype.OnUpdate = function () {
            };
            ClickBannerUI.prototype.Show = function () {
                this.visible = true;
            };
            ClickBannerUI.prototype.Hide = function () {
                this.visible = false;
            };
            return ClickBannerUI;
        }(ui.ClickBannerUIUI));
        UI.ClickBannerUI = ClickBannerUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=ClickBannerUI.js.map