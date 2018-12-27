var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var RedPacketWindow = (function (_super) {
            __extends(RedPacketWindow, _super);
            function RedPacketWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //是否显示图标
                _this._isShowRedpacket = false;
                _this.awradPackageType = 0;
                return _this;
            }
            RedPacketWindow.prototype.InitWindow = function (fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            RedPacketWindow.prototype.OnStart = function () {
                var _this = this;
                this.InitIconEvent();
                this._fui.m_com_everyday.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/denglujl_di.png";
                this._fui.m_com_tixianredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png";
                this._fui.m_com_openredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_di.png";
                this._fui.m_com_awradredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png";
                //提现event
                this._fui.m_com_tixianredpackage.m_btn_close.onClick(this, function () {
                    _this._fui.m_com_tixianredpackage.visible = false;
                });
                this._fui.m_com_tixianredpackage.m_btn_tixian.onClick(this, function () {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                this._fui.m_com_awradredpackage.m_btn_tixian.onClick(this, function () {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                this._fui.m_com_awradredpackage.m_btn_close.onClick(this, function () {
                    _this._fui.m_com_awradredpackage.visible = false;
                    if (_this.awradPackageType == 1)
                        PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.SUCCESS);
                });
                //打开红包
                this._fui.m_com_openredpackage.m_btn_close.onClick(this, function () {
                    _this._fui.m_com_openredpackage.visible = false;
                    PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                });
                this._fui.m_com_openredpackage.m_btn_red_open.onClick(this, this.OnRedPacketGiftAward);
                if (PFU.PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                    this._fui.m_com_openredpackage.m_voidStr.text = "看视频领取";
                    this._fui.m_com_openredpackage.m_openredtip2.text = "看视频有几率翻倍！";
                }
                else {
                    this._fui.m_com_openredpackage.m_voidStr.text = "分享领取";
                    this._fui.m_com_openredpackage.m_openredtip2.text = "分享有几率翻倍！";
                }
            };
            RedPacketWindow.prototype.OnUpdate = function () {
                if (PfuSdk.GetParamComplete && !this._isShowRedpacket) {
                    //this._fui.m_btn_redpackageicon.visible = true;
                    this._isShowRedpacket = false;
                }
            };
            RedPacketWindow.prototype.Show = function () {
                //检测在线参数，在线参数收到后 显示UI
                _super.prototype.Show.call(this);
            };
            RedPacketWindow.prototype.Hide = function () {
                _super.prototype.Hide.call(this);
            };
            //region 红包按钮
            RedPacketWindow.prototype.InitIconEvent = function () {
                this._fui.m_btn_redpackageicon.onClick(this, this.OnClickRedIcon);
                this._fui.m_com_everyday.m_btn_red_everyday_skip.onClick(this, this.OnEverydaySkip);
                this._fui.m_com_everyday.m_btn_double_btn.onClick(this, this.OnEveryDoubleAward);
                this.UpdateIconMoney();
            };
            /**
             * 设置红包按钮位置
             * @param xv
             * @param yv
             */
            RedPacketWindow.prototype.SetIconBtnPos = function (xv, yv) {
                this._fui.m_btn_redpackageicon.setXY(xv, yv);
            };
            /**
             * 设置隐藏显示
             * @param visible
             */
            RedPacketWindow.prototype.SetIconVisible = function (visible) {
                this._fui.m_btn_redpackageicon.visible = visible;
            };
            /**
             * 更新
             * @param money
             */
            RedPacketWindow.prototype.UpdateIconMoney = function () {
                this._fui.m_btn_redpackageicon.m_moneyNumStr.text = "¥" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
            };
            /**
             * 点击icon
             */
            RedPacketWindow.prototype.OnClickRedIcon = function () {
                //进入礼包是否领取
                if (PFU.PfuRedPacketManager.GetInstance().CanEverydayAward()) {
                    //没领取弹礼包界面
                    this.OpenEverydayGift();
                }
                else {
                    //领取后弹红包提现界面
                    this.OpenRadPacketTixian();
                }
            };
            //endregion-----------
            //region 红包7天领取
            RedPacketWindow.prototype.OpenEverydayGift = function () {
                //显示并且设置 按钮等功能
                this.SetEveryDayCom();
                this._fui.m_com_everyday.visible = true;
            };
            RedPacketWindow.prototype.SetEveryDayCom = function () {
                var count = this._fui.m_com_everyday.m_list_sex.numChildren;
                for (var i = 0; i < count; i++) {
                    var com = this._fui.m_com_everyday.m_list_sex.getChildAt(i);
                    if (i < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                        com.m_text.text = "已领取";
                        continue;
                    }
                    com.m_text.text = "第" + (i + 1) + "天";
                }
                if (6 < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                    this._fui.m_com_everyday.m_seven.m_text.text = "已领取";
                }
                else {
                    this._fui.m_com_everyday.m_seven.m_text.text = "第" + (7) + "天(超大红包)";
                }
            };
            RedPacketWindow.prototype.OnEverydaySkip = function () {
                //添加money!
                this._fui.m_com_everyday.visible = false;
                this.EverydayAward(false);
            };
            RedPacketWindow.prototype.EverydayAward = function (isDouble) {
                var num = PFU.PfuRedPacketManager.GetInstance().AwardEveryDay(isDouble);
                this.UpdateIconMoney();
                this.awradPackageType = 0;
                //打开余额界面
                this.OpenAwardRadPacket(num);
            };
            RedPacketWindow.prototype.OnEveryDoubleAward = function () {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this._fui.m_com_everyday.visible = false;
                    this.EverydayAward(true);
                    return;
                }
                PfuSdk.ShareAward(this, function (type) {
                    if (type == PfuSdk.SUCCESS) {
                        _this._fui.m_com_everyday.visible = false;
                        _this.EverydayAward(true);
                    }
                    else {
                    }
                });
            };
            //endregion---------------
            //#region 红包提现界面
            RedPacketWindow.prototype.OpenRadPacketTixian = function () {
                this._fui.m_com_tixianredpackage.visible = true;
                this._fui.m_com_tixianredpackage.m_moneyNum.text = "" + (PFU.PfuRedPacketManager.GetInstance().GetMoney());
            };
            //#endregion---------------
            //#region 打开红包界面
            RedPacketWindow.prototype.OpenRadPacketGift = function () {
                this._fui.m_com_openredpackage.visible = true;
            };
            RedPacketWindow.prototype.OnRedPacketGiftAward = function () {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this.RedPacketGiftAward();
                    return;
                }
                if (PFU.PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                    PfuSdk.Video(this, function (type) {
                        if (type == PfuSdk.SUCCESS) {
                            _this.RedPacketGiftAward();
                        }
                        else {
                        }
                    });
                }
                else {
                    PfuSdk.ShareAward(this, function (type) {
                        if (type == PfuSdk.SUCCESS) {
                            _this.RedPacketGiftAward();
                        }
                        else {
                        }
                    });
                }
            };
            RedPacketWindow.prototype.RedPacketGiftAward = function () {
                this._fui.m_com_openredpackage.visible = false;
                var award = PFU.PfuRedPacketManager.GetInstance().AwardGift();
                this.awradPackageType = 1;
                this.OpenAwardRadPacket(award);
                this.UpdateIconMoney();
            };
            RedPacketWindow.prototype.OpenAwardRadPacket = function (award) {
                this._fui.m_com_awradredpackage.visible = true;
                this._fui.m_com_awradredpackage.m_allMoney.text = "" + (PFU.PfuRedPacketManager.GetInstance().GetMoney());
                this._fui.m_com_awradredpackage.m_moneyNum.text = "" + award.toFixed(2); //  Math.floor(award * 100) / 100;
            };
            //#endregion----------------
            RedPacketWindow.prototype.ForceCloseRedPacketUI = function () {
                if (this._fui.m_com_openredpackage.visible)
                    this._fui.m_com_openredpackage.visible = false;
                if (this._fui.m_com_awradredpackage.visible) {
                    this._fui.m_com_awradredpackage.visible = false;
                }
            };
            return RedPacketWindow;
        }(UI.WindowBase));
        UI.RedPacketWindow = RedPacketWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=RedPacketWindow.js.map