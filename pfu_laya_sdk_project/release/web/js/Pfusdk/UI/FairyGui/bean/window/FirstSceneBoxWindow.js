var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        //显示盒子列表，是根据在线参数是否开启来决定，用户不能主动调用，
        //但可以主动关闭
        var FirstSceneBoxWindow = (function (_super) {
            __extends(FirstSceneBoxWindow, _super);
            function FirstSceneBoxWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._bannerGame = new Array();
                return _this;
            }
            FirstSceneBoxWindow.prototype.InitWindow = function (fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            FirstSceneBoxWindow.prototype.OnStart = function () {
                this._fui.visible = false;
                this.CheckShow();
                Laya.timer.loop(200, this, this.CheckShow);
                PfuSdk.HideBanner();
            };
            FirstSceneBoxWindow.prototype.OnUpdate = function () {
            };
            FirstSceneBoxWindow.prototype.CheckShow = function () {
                //检查盒子列表参数 和 在线参数 是否准备完毕
                if (PfuSdk.GetParamComplete && PfuSdk.GetBoxListComplete) {
                    //pfuSdkShowOpenAds = 2 开启盒子列表
                    if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PFU.PfuGlobal.GetOLParam().pfuSdkShowOpenAds == 2) {
                        this.CreateList();
                    }
                    else {
                        this.Hide();
                    }
                    //无论是否开启 都停止检测
                    Laya.timer.clear(this, this.CheckShow);
                }
            };
            FirstSceneBoxWindow.prototype.CreateList = function () {
                this._fui.m_Btn_close.onClick(this, this.OnClickClose);
                //列表项数据检查
                var arrList = PFU.PfuBoxList.GetInstance().GetAdverts();
                for (var i = 0; i < arrList.length; i++) {
                    var b = arrList[i];
                    if (b.bannerlink && b.bannerlink != "") {
                        this._bannerGame.push(b);
                    }
                }
                //fairyUI title图片
                for (var i = 0; i < this._bannerGame.length; i++) {
                    var vo = this._fui.m_Img_banner.addItemFromPool(pfusdkui.UI_BannerImg.URL);
                    vo.m_icon.icon = this._bannerGame[i].bannerlink;
                    //vo.data = this._bannerGame[i];
                    vo.onClick(this, this.OnClickItem, [this._bannerGame[i]]);
                }
                //fairyUI 创建列表
                for (var i = 0; i < arrList.length; i++) {
                    var vo = this._fui.m_List_game.addItemFromPool(pfusdkui.UI_List_Child.URL);
                    var data = arrList[i];
                    vo.m_icon.icon = data.link;
                    vo.m_Text_name.text = data.gameName;
                    vo.m_Text_message.text = data.desc;
                    var min = ((i == 0) ? 30 : 0) + (arrList.length - i) * 2;
                    var max = ((i == 0) ? 30 : 10) + (arrList.length - i) * 8;
                    vo.m_Text_name2.text = PFU.BXRandom.Get().nextInt(min, max) + "万";
                    vo.m_btn_start.onClick(this, this.OnClickItem, [data]);
                }
                this._fui.visible = true;
            };
            FirstSceneBoxWindow.prototype.OnClickClose = function () {
                //PfuSdk.ShowBanner();
                this.Hide();
            };
            FirstSceneBoxWindow.prototype.OnClickItem = function (data, itemObject) {
                //点击跳转事件
                if (data.wechatGameid == PFU.PfuConfig.Config.wxId) {
                    this.OnClickClose();
                    return;
                }
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function () { });
            };
            return FirstSceneBoxWindow;
        }(UI.WindowBase));
        UI.FirstSceneBoxWindow = FirstSceneBoxWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=FirstSceneBoxWindow.js.map