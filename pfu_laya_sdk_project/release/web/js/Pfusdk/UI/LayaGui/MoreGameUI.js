var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var MoreGameUI = (function (_super) {
            __extends(MoreGameUI, _super);
            function MoreGameUI() {
                var _this = _super.call(this) || this;
                _this._isCreateSideMoreGameBtn = false;
                _this._isCreateMoreGameListBar = false;
                _this.isMoveLeft = true;
                _this.isDrag = false;
                _this.isLockLeftBtn = false;
                _this.isLeftOpen = false;
                _this.posx = 0;
                _this.boxList_left.visible = false;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                UI.SceneMatchingLayaUtils.SetAlignBottom(_this.box);
                _this.btn_redpackageicon.on(Laya.Event.CLICK, _this, _this.OnClickRedIcon);
                _this.zOrder = PfuSdk.UI_ORDER_MOREGAME;
                Laya.stage.updateZOrder();
                return _this;
            }
            /**
             * 点击icon
            */
            MoreGameUI.prototype.OnClickRedIcon = function () {
                //进入礼包是否领取
                if (PFU.PfuRedPacketManager.GetInstance().CanEverydayAward()) {
                    //没领取弹礼包界面
                    PFU.UI.PfuSdkLayaUI.OpenEverydayGift();
                }
                else {
                    //领取后弹红包提现界面
                    PFU.UI.PfuSdkLayaUI.OpenRadPacketTixian();
                }
            };
            /**
             * 更新
             * @param money
             */
            MoreGameUI.prototype.UpdateIconMoney = function () {
                this.moneyNumStr.text = "¥" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
            };
            /**
             * 设置红包按钮位置
             * @param xv
             * @param yv
             */
            MoreGameUI.prototype.SetIconBtnPos = function (xv, yv) {
                this.btn_redpackageicon.x = xv;
                this.btn_redpackageicon.y = yv;
            };
            /**
             * 设置隐藏显示
             * @param visible
             */
            MoreGameUI.prototype.SetIconVisible = function (visible) {
                this.btn_redpackageicon.visible = visible;
            };
            MoreGameUI.prototype.OnUpdate = function () {
                //在线参数是否准备完毕
                if (!this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete) {
                    this.CreateSideMoreGameBtn();
                    this._isCreateSideMoreGameBtn = true;
                }
                if (!this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
                    if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                        this.CreateMoreGameList();
                        this.CreateMoreGameListLeft();
                    }
                    this._isCreateMoreGameListBar = true;
                }
                if (this._isCreateMoreGameListBar) {
                    this.UpdateMoreGameListMove();
                }
                // if (PfuMoreGameUpdate.GetInstance().isSetLayerAction) {
                //     if (PfuMoreGameUpdate.GetInstance().layerNum >= 0 && PfuMoreGameUpdate.GetInstance().layerNum < Laya.stage.numChildren) {
                //         Laya.stage.setChildIndex(this, PfuMoreGameUpdate.GetInstance().layerNum);
                //     }
                //     PfuMoreGameUpdate.GetInstance().EndSetMoreGameUI();
                // }
                if (this._isCreateSideMoreGameBtn && PFU.PfuMoreGameUpdate.GetInstance().isSetMoreGameOffsetY) {
                    this.btn_left.y = this.btn_left.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY;
                    this.btn_right.y = this.btn_right.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY;
                    PFU.PfuMoreGameUpdate.GetInstance().EndMoreGameUIOffsetY();
                }
            };
            MoreGameUI.prototype.OnHide = function () {
                //隐藏所有子节点
                this.moregameCtl.visible = false;
                Laya.timer.clearAll(this);
            };
            MoreGameUI.prototype.OnShow = function (type) {
                this.moregameCtl.visible = true;
                Laya.timer.frameLoop(1, this, this.OnUpdate);
                this._isShowType = type;
                this.Refresh();
            };
            MoreGameUI.prototype.Refresh = function () {
                var type = this._isShowType;
                this.box.visible = true;
                this.btn_right.visible = true;
                this.btn_left.visible = true;
                if (!type || type == PfuSdk.SHOW_TYPE_ALL) {
                }
                else {
                    if (type == PfuSdk.SHOW_TYPE_MOREGAME) {
                        this.box.visible = false;
                    }
                    else if (type == PfuSdk.SHOW_TYPE_BOXLIST) {
                        this.HideMoreGameLeftRight();
                    }
                }
                this.RefreshMoreGameVisible();
            };
            MoreGameUI.prototype.HideMoreGameLeftRight = function () {
                this.btn_right.visible = false;
                this.btn_left.visible = false;
            };
            MoreGameUI.prototype.RefreshMoreGameVisible = function () {
                if (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_moreGameType == 1) {
                    this.btn_right.visible = false;
                }
                else if (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_moreGameType == 2) {
                    this.btn_left.visible = false;
                }
                if (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_crossGameListType == -1) {
                    this.box.visible = false;
                }
                //是否显示更多游戏 0 关闭 1 开启
                if (PFU.PfuGlobal.GetOLParam().pfuSdkMoreGame == PFU.PfuSwitch.OFF || (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_moreGameType == -1)) {
                    this.btn_left.visible = false;
                    this.btn_right.visible = false;
                }
                if (PfuSdk.IsTestModel()) {
                    this.box.visible = false;
                }
            };
            MoreGameUI.prototype.CreateSideMoreGameBtn = function () {
                var _this = this;
                this.btn_left.on(Laya.Event.CLICK, this, this.ClickMoreGame, [true]);
                this.btn_right.on(Laya.Event.CLICK, this, this.ClickMoreGame, [false]);
                //刷新左右更多游戏icon
                this.RefreshMoreGameIcon();
                //注册刷新左右两侧更多游戏图标
                PFU.PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, function () {
                    //每个固定时间刷新此处
                    _this.RefreshMoreGameIcon();
                });
                this.Refresh();
            };
            //刷新左右更多游戏icon
            MoreGameUI.prototype.RefreshMoreGameIcon = function () {
                if (PFU.PfuConfig.Config.ui_moreGameType == -1) {
                    return;
                }
                //从PfuMoreGameUpdate 获取icon地址
                if (PFU.PfuConfig.Config.ui_moreGameType != 2) {
                    this.btn_left.loadImage(PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true));
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 1) {
                    this.btn_right.loadImage(PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false));
                }
                // this.btn_left.skin = PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true);
                // this.btn_right.skin = PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false);
            };
            MoreGameUI.prototype.ClickMoreGame = function (isLeft) {
                //跳转更多游戏
                PFU.PfuMoreGameUpdate.GetInstance().ShowMoreGame(isLeft, this, function (url) {
                    // let pos = url.lastIndexOf("/");
                    // let end = url.lastIndexOf(".");
                    // let pngName = url.substring(pos + 1, end);
                    // Global.StatisticsMoreGame(pngName);
                });
            };
            //创建底部更多游戏列表
            MoreGameUI.prototype.CreateMoreGameList = function () {
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                    this.img_title.visible = true;
                    this.box_bg.visible = true;
                    this.boxlist.visible = true;
                }
                else {
                    this.img_title.visible = false;
                    this.box_bg.visible = false;
                    this.boxlist.visible = false;
                }
                this.allgame = [];
                var boxListData;
                // 使用但隐藏滚动条
                this.boxlist.hScrollBarSkin = "";
                this.boxlist.scrollBar.min = 0;
                this.boxlist.scrollBar.max = 300;
                this.boxlist.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
                this.boxlist.scrollBar.elasticBackTime = 200;
                this.boxlist.scrollBar.elasticDistance = 50;
                for (var i = 0; i < count; i++) {
                    boxListData = list[i];
                    this.allgame.push({
                        img_icon: boxListData.link,
                        boxListData: boxListData,
                    });
                    this.boxlist.array = this.allgame;
                }
            };
            MoreGameUI.prototype.ShowLeft = function () {
                if (PfuSdk.IsTestModel()) {
                    return;
                }
                if (PFU.PfuBoxList.GetInstance().GetMoreGameListData().length < 1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this.boxList_left.visible = true;
                }
            };
            MoreGameUI.prototype.HideLeft = function () {
                if (PfuSdk.IsTestModel()) {
                    return;
                }
                if (PFU.PfuBoxList.GetInstance().GetMoreGameListData().length < 1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this.boxList_left.visible = false;
                }
            };
            MoreGameUI.prototype.CreateMoreGameListLeft = function () {
                var _this = this;
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                    this.btn_list_open.visible = true;
                    this.boxlist_left_btn_bg.visible = true;
                }
                else {
                    this.btn_list_open.visible = false;
                    this.boxlist_left_btn_bg.visible = false;
                }
                this.allgame = [];
                var boxListData;
                // 使用但隐藏滚动条
                this.boxlist_array_left.hScrollBarSkin = "";
                this.boxlist_array_left.scrollBar.min = 0;
                this.boxlist_array_left.scrollBar.max = 300;
                this.boxlist_array_left.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
                this.boxlist_array_left.scrollBar.elasticBackTime = 200;
                this.boxlist_array_left.scrollBar.elasticDistance = 50;
                for (var i = 0; i < count; i++) {
                    boxListData = list[i];
                    this.allgame.push({
                        img_icon: boxListData.link,
                        gameName: { text: boxListData.gameName },
                        boxListData: boxListData,
                    });
                    this.boxlist_array_left.array = this.allgame;
                }
                this.btn_list_open.on(Laya.Event.CLICK, this, function () {
                    if (_this.isLockLeftBtn) {
                        return;
                    }
                    _this.isLockLeftBtn = true;
                    if (!_this.isLeftOpen) {
                        _this.showLift.play(0, false);
                        Laya.timer.once(500, _this, function () {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = true;
                        });
                    }
                    else {
                        _this.hideLift.play(0, false);
                        Laya.timer.once(500, _this, function () {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = false;
                        });
                    }
                });
                // this._fui.m_btn_left_click.onClick(this, () => {
                //     if (this.isLockLeftBtn)  {
                //         return;
                //     }
                //     this.isLockLeftBtn = true;
                //     if (!this.isLeftOpen)  {
                //         this._fui.m_showLift.play(Laya.Handler.create(this, () => {
                //             this.isLockLeftBtn = false;
                //             this.isLeftOpen = true;
                //         }));
                //     }
                //     else  {
                //         this._fui.m_hideLift.play(Laya.Handler.create(this, () => {
                //             this.isLockLeftBtn = false;
                //             this.isLeftOpen = false;
                //         }));
                //     }
                // });
            };
            //点击底部更多游戏项目跳转应用
            MoreGameUI.prototype.OnClickMoreGameListItem = function (e, index) {
                if (e.type == Laya.Event.CLICK) {
                    PFU.PfuManager.GetInstance().ShowCrossGameImage(this.allgame[index].boxListData, this, function () { });
                }
                if (e.type == Laya.Event.MOUSE_DOWN) {
                    this.isDrag = true;
                }
                else if (e.type == Laya.Event.MOUSE_UP || e.type == Laya.Event.MOUSE_OVER) {
                    this.posx = this.boxlist.scrollBar.value;
                    this.isDrag = false;
                }
            };
            //更新左右移动动画
            MoreGameUI.prototype.UpdateMoreGameListMove = function () {
                if (this.isDrag)
                    return;
                var dir = this.isMoveLeft ? 1 : -1;
                this.posx += 20 * 0.016 * dir;
                if (this.posx >= 300) {
                    this.posx = 300;
                    this.isMoveLeft = false;
                }
                else if (this.posx < 0) {
                    this.posx = 0;
                    this.isMoveLeft = true;
                }
                this.boxlist.scrollBar.value = this.posx;
            };
            return MoreGameUI;
        }(ui.MoreGameUIUI));
        UI.MoreGameUI = MoreGameUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=MoreGameUI.js.map