var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var RedPacketUI = (function (_super) {
            __extends(RedPacketUI, _super);
            function RedPacketUI() {
                var _this = _super.call(this) || this;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                _this.InitIconEvent();
                _this.bg_loader.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_di.png");
                _this.loader_everyday.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/denglujl_di.png");
                _this.loader_award.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png");
                _this.loader_tixian.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png");
                //提现event
                _this.btn_close_tixian.on(Laya.Event.CLICK, _this, function () {
                    _this.com_tixianredpackage.visible = false;
                });
                _this.btn_tixian.on(Laya.Event.CLICK, _this, function () {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                _this.btn_tixian_award.on(Laya.Event.CLICK, _this, function () {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                _this.btn_close_award.on(Laya.Event.CLICK, _this, function () {
                    _this.com_awradredpackage.visible = false;
                    PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.SUCCESS);
                });
                _this.btn_close.on(Laya.Event.CLICK, _this, function () {
                    _this.com_openredpackage.visible = false;
                    PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                });
                _this.btn_red_open.on(Laya.Event.CLICK, _this, _this.OnRedPacketGiftAward);
                _this.zOrder = PfuSdk.UI_ORDER_OTHER;
                Laya.stage.updateZOrder();
                return _this;
            }
            RedPacketUI.prototype.OnUpdate = function () {
            };
            //region 红包按钮
            RedPacketUI.prototype.InitIconEvent = function () {
                this.btn_red_everyday_skip.on(Laya.Event.CLICK, this, this.OnEverydaySkip);
                this.btn_double_btn.on(Laya.Event.CLICK, this, this.OnEveryDoubleAward);
                this.UpdateIconMoney();
            };
            /**
            * 更新
            * @param money
            */
            RedPacketUI.prototype.UpdateIconMoney = function () {
                PFU.UI.PfuSdkLayaUI.UpdateIconMoney();
            };
            //endregion-----------
            //region 红包7天领取
            RedPacketUI.prototype.OpenEverydayGift = function () {
                //显示并且设置 按钮等功能
                this.SetEveryDayCom();
                this.com_everyday.visible = true;
            };
            RedPacketUI.prototype.SetEveryDayCom = function () {
                var count = 6;
                var allgame = [];
                var boxListData;
                // 使用但隐藏滚动条
                this.list_six.hScrollBarSkin = "";
                this.list_six.scrollBar.min = 0;
                this.list_six.scrollBar.max = 300;
                //this.list_six.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
                this.list_six.scrollBar.elasticBackTime = 200;
                this.list_six.scrollBar.elasticDistance = 50;
                for (var i = 0; i < count; i++) {
                    if (i < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                        allgame.push({
                            deveryNum: { text: "已领取" }
                        });
                        continue;
                    }
                    allgame.push({
                        deveryNum: { text: "第" + (i + 1) + "天" }
                    });
                }
                this.list_six.array = allgame;
                this.list_six.vScrollBarSkin = "";
                // for(let i=0;i<this.list_six.numChildren;i++)
                // {
                //     let cell = this.list_six.getChildAt(i);
                //     let t:Laya.Text = cell.getChildByName("text") as Laya.Text;
                //     if (i < PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                //         t.text = "已领取";
                //         continue;
                //     }
                //     t.text ="第" + (i+1) + "天";
                // }
                if (6 < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                    this.seven_text.text = "已领取";
                }
                else {
                    this.seven_text.text = "第" + (7) + "天(超大红包)";
                }
            };
            RedPacketUI.prototype.OnEverydaySkip = function () {
                //添加money!
                this.com_everyday.visible = false;
                this.EverydayAward(false);
            };
            RedPacketUI.prototype.EverydayAward = function (isDouble) {
                PFU.PfuRedPacketManager.GetInstance().AwardEveryDay(isDouble);
                this.UpdateIconMoney();
            };
            RedPacketUI.prototype.OnEveryDoubleAward = function () {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this.com_everyday.visible = false;
                    this.EverydayAward(true);
                    return;
                }
                PfuSdk.Video(this, function (type) {
                    if (type == PfuSdk.SUCCESS) {
                        _this.com_everyday.visible = false;
                        _this.EverydayAward(true);
                    }
                    else {
                    }
                });
            };
            //endregion---------------
            //#region 红包提现界面
            RedPacketUI.prototype.OpenRadPacketTixian = function () {
                this.com_tixianredpackage.visible = true;
                this.moneyNum.text = "" + (PFU.PfuRedPacketManager.GetInstance().GetMoney());
            };
            //#endregion---------------
            //#region 打开红包界面
            RedPacketUI.prototype.OpenRadPacketGift = function () {
                this.com_openredpackage.visible = true;
            };
            RedPacketUI.prototype.OnRedPacketGiftAward = function () {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this.RedPacketGiftAward();
                    return;
                }
                PfuSdk.Video(this, function (type) {
                    if (type == PfuSdk.SUCCESS) {
                        _this.RedPacketGiftAward();
                    }
                    else {
                        PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                    }
                });
            };
            RedPacketUI.prototype.RedPacketGiftAward = function () {
                this.com_openredpackage.visible = false;
                var award = PFU.PfuRedPacketManager.GetInstance().AwardGift();
                this.OpenAwardRadPacket(award);
                this.UpdateIconMoney();
            };
            RedPacketUI.prototype.OpenAwardRadPacket = function (award) {
                this.com_awradredpackage.visible = true;
                this.allMoney_award.text = "" + (PFU.PfuRedPacketManager.GetInstance().GetMoney());
                this.moneyNum_award.text = "" + award;
            };
            return RedPacketUI;
        }(ui.RedPacketUIUI));
        UI.RedPacketUI = RedPacketUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=RedPacketUI.js.map