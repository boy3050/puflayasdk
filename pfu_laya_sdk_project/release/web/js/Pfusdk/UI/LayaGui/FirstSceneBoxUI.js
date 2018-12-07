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
        var FirstSceneBoxUI = (function (_super) {
            __extends(FirstSceneBoxUI, _super);
            function FirstSceneBoxUI() {
                var _this = _super.call(this) || this;
                _this._bannerGame = new Array();
                _this.visible = false;
                _this.CheckShow();
                Laya.timer.loop(200, _this, _this.CheckShow);
                PfuSdk.HideBanner();
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.OnCloseUI);
                return _this;
            }
            FirstSceneBoxUI.prototype.OnCloseUI = function () {
                Laya.stage.removeChild(this);
                Laya.timer.clearAll(this);
            };
            FirstSceneBoxUI.prototype.CheckShow = function () {
                //检查盒子列表参数 和 在线参数 是否准备完毕
                if (PfuSdk.GetParamComplete && PfuSdk.GetBoxListComplete) {
                    //kaiping = 2 开启盒子列表
                    if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PFU.PfuGlobal.GetOLParam().pfuSdkShowOpenAds == 2) {
                        this.CreateList();
                    }
                    else {
                        this.OnCloseUI();
                    }
                    //无论是否开启 都停止检测
                    Laya.timer.clear(this, this.CheckShow);
                }
            };
            FirstSceneBoxUI.prototype.CreateList = function () {
                //列表项数据检查
                var arrList = PFU.PfuBoxList.GetInstance().GetAdverts();
                for (var i = 0; i < arrList.length; i++) {
                    var b = arrList[i];
                    if (b.bannerlink && b.bannerlink != "") {
                        this._bannerGame.push(b);
                    }
                }
                // title图片
                for (var i = 0; i < this._bannerGame.length; i++) {
                    this.Img_title.loadImage(this._bannerGame[i].bannerlink);
                    // let title = this.getChildByName("Img_title") as Laya.Image;
                    // title.skin = this._bannerGame[i].bannerlink;
                    // this.Img_title.skin = this._bannerGame[i].bannerlink;
                    this.Img_title.on(Laya.Event.CLICK, this, this.OnClickItem1, [this._bannerGame[i]]);
                    break;
                }
                var data;
                //初始化游戏列表
                this.allgame = [];
                // 使用但隐藏滚动条
                this.boxlist.vScrollBarSkin = "";
                this.boxlist.mouseHandler = new Laya.Handler(this, this.OnClickItem);
                this.boxlist.scrollBar.elasticBackTime = 200;
                this.boxlist.scrollBar.elasticDistance = 50;
                // 创建列表
                for (var i = 0; i < arrList.length; i++) {
                    data = arrList[i];
                    var min = ((i == 0) ? 30 : 0) + (arrList.length - i) * 2;
                    var max = ((i == 0) ? 30 : 10) + (arrList.length - i) * 8;
                    var num = PFU.BXRandom.Get().nextInt(min, max) + "万";
                    this.allgame.push({
                        img_icon: data.link,
                        txt_name: data.gameName,
                        txt_desc: data.desc,
                        txt_num: num,
                        data: data,
                    });
                }
                this.boxlist.array = this.allgame;
                this.visible = true;
            };
            FirstSceneBoxUI.prototype.OnClickItem1 = function (data) {
                console.error("==");
                //点击跳转事件
                if (data.wechatGameid == PFU.PfuConfig.Config.weChatId) {
                    this.OnCloseUI();
                    return;
                }
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function () { });
                //WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.wechatGameid, "");
            };
            FirstSceneBoxUI.prototype.OnClickItem = function (e, index) {
                if (e.type == Laya.Event.CLICK) {
                    //点击跳转事件
                    if (this.allgame[index].data.wechatGameid == PFU.PfuConfig.Config.weChatId) {
                        this.OnCloseUI();
                        return;
                    }
                    PFU.PfuManager.GetInstance().ShowCrossGameImage(this.allgame[index].data, this, function () { });
                }
            };
            return FirstSceneBoxUI;
        }(ui.BoxWindowUI));
        UI.FirstSceneBoxUI = FirstSceneBoxUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=FirstSceneBoxUI.js.map