var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var PfuBannerWindow = (function (_super) {
            __extends(PfuBannerWindow, _super);
            function PfuBannerWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isCreatePfuBanner = false;
                return _this;
            }
            PfuBannerWindow.prototype.InitWindow = function (fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            PfuBannerWindow.prototype.OnStart = function () {
                this._fui.m_loader.onClick(this, this.ClickPfuBanner);
                this._fui.m_loader.visible = false;
                //设置底部适配
                UI.SceneMatchingUtils.SetAlignBottom(this._fui.m_loader);
            };
            PfuBannerWindow.prototype.OnUpdate = function () {
                if (!this._isCreatePfuBanner && PfuSdk.GetParamComplete) {
                    this.CreatePfuBanner();
                    this._isCreatePfuBanner = true;
                }
            };
            PfuBannerWindow.prototype.Show = function () {
                //检测在线参数，在线参数收到后 显示UI
                _super.prototype.Show.call(this);
            };
            PfuBannerWindow.prototype.Hide = function () {
                _super.prototype.Hide.call(this);
            };
            PfuBannerWindow.prototype.CreatePfuBanner = function () {
                //console.log("banner:" + PfuGlobal.GetOLParam().ad_banner);
                // if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PfuGlobal.GetOLParam().ad_banner == PfuSwitch.OFF && PfuBannerUpdate.GetInstance().IsBeBannerImg()) {
                //     this._fui.m_loader.visible = true;
                //     PfuBannerUpdate.GetInstance().SetRefreshHandle(this, this.RefreshHandle,(isShow)=>{
                //         if(isShow)
                //         {
                //             this._fui.m_loader.visible = true;
                //         }
                //         else
                //         {
                //             this._fui.m_loader.visible = false;
                //         }
                //     });
                // } else 
                {
                    this._fui.m_loader.visible = false;
                }
            };
            PfuBannerWindow.prototype.RefreshHandle = function () {
                this._fui.m_loader.visible;
                this._fui.m_loader.icon = PFU.PfuBannerUpdate.GetInstance().GetPfuBannerImgUrl();
            };
            PfuBannerWindow.prototype.ClickPfuBanner = function () {
                PFU.PfuBannerUpdate.GetInstance().ClickPfuBanner();
            };
            return PfuBannerWindow;
        }(UI.WindowBase));
        UI.PfuBannerWindow = PfuBannerWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuBannerWindow.js.map