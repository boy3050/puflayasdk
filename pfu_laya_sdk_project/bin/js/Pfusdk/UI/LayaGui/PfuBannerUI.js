var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var UI_PfuBannerUI = (function (_super) {
            __extends(UI_PfuBannerUI, _super);
            function UI_PfuBannerUI() {
                var _this = _super.call(this) || this;
                _this._isCreatePfuBanner = false;
                _this.img_icon.on(Laya.Event.CLICK, _this, _this.ClickPfuBanner);
                _this.visible = false;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                UI.SceneMatchingLayaUtils.SetAlignBottom(_this.img_icon);
                return _this;
            }
            UI_PfuBannerUI.prototype.OnUpdate = function () {
                if (!this._isCreatePfuBanner && PfuSdk.GetParamComplete) {
                    this.CreatePfuBanner();
                    this._isCreatePfuBanner = true;
                }
            };
            UI_PfuBannerUI.prototype.Show = function () {
                //检测在线参数，在线参数收到后 显示UI
                Laya.stage.addChild(this);
            };
            UI_PfuBannerUI.prototype.Hide = function () {
                Laya.stage.removeChild(this);
                Laya.timer.clearAll(this);
            };
            UI_PfuBannerUI.prototype.CreatePfuBanner = function () {
                //console.log("banner:" + PfuGlobal.GetOLParam().ad_banner);
                // if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF && PfuBannerUpdate.GetInstance().IsBeBannerImg()) {
                //     this.visible = true;
                //     PfuBannerUpdate.GetInstance().SetRefreshHandle(this, this.RefreshHandle, (isShow) => {
                //         if (isShow) {
                //             this.visible = true;
                //         }
                //         else {
                //             this.visible = false;
                //         }
                //     });
                // } else 
                {
                    this.visible = false;
                }
            };
            UI_PfuBannerUI.prototype.RefreshHandle = function () {
                this.img_icon.skin = PFU.PfuBannerUpdate.GetInstance().GetPfuBannerImgUrl();
            };
            UI_PfuBannerUI.prototype.ClickPfuBanner = function () {
                PFU.PfuBannerUpdate.GetInstance().ClickPfuBanner();
            };
            return UI_PfuBannerUI;
        }(ui.BannerUIUI));
        UI.UI_PfuBannerUI = UI_PfuBannerUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuBannerUI.js.map