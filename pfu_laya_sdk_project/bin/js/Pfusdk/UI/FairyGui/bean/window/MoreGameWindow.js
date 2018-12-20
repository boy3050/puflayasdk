var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var MoreGameWindow = (function (_super) {
            __extends(MoreGameWindow, _super);
            function MoreGameWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isCreateSideMoreGameBtn = false;
                _this._isCreateMoreGameListBar = false;
                _this.isMoveLeft = true;
                _this.isLockLeftBtn = false;
                _this.isLeftOpen = false;
                return _this;
            }
            MoreGameWindow.prototype.InitWindow = function (fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            MoreGameWindow.prototype.OnStart = function () {
                //设置元素底部适配
                UI.SceneMatchingUtils.SetAlignBottom(this._fui.m_boxList);
            };
            MoreGameWindow.prototype.OnUpdate = function () {
                //在线参数是否准备完毕
                if (PFU.PfuConfig.Config && !this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete && PFU.PfuConfig.Config) {
                    this.CreateSideMoreGameBtn();
                    this._isCreateSideMoreGameBtn = true;
                }
                if (PFU.PfuConfig.Config && !this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
                    if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                        this.CreateMoreGameList();
                        this.CreateMoreGameListLeft();
                    }
                    this._isCreateMoreGameListBar = true;
                }
                if (this._isCreateMoreGameListBar) {
                    this.UpdateMoreGameListMove();
                }
                if (this._isCreateSideMoreGameBtn && PFU.PfuMoreGameUpdate.GetInstance().isSetMoreGameOffsetY) {
                    this._fui.m_Btn_MoreGameLeft.setXY(this._fui.m_Btn_MoreGameLeft.x, this._fui.m_Btn_MoreGameLeft.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY);
                    this._fui.m_Btn_MoreGameRight.setXY(this._fui.m_Btn_MoreGameRight.x, this._fui.m_Btn_MoreGameRight.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY);
                    PFU.PfuMoreGameUpdate.GetInstance().EndMoreGameUIOffsetY();
                }
            };
            MoreGameWindow.prototype.ShowLeft = function () {
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this._fui.m_boxList_left.visible = true;
                }
            };
            MoreGameWindow.prototype.HideLeft = function () {
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this._fui.m_boxList_left.visible = false;
                }
            };
            MoreGameWindow.prototype.CreateSideMoreGameBtn = function () {
                var _this = this;
                this._fui.m_Btn_MoreGameLeft.onClick(this, this.ClickMoreGame, [true]);
                this._fui.m_Btn_MoreGameRight.onClick(this, this.ClickMoreGame, [false]);
                //刷新左右更多游戏icon
                this.RefreshMoreGameIcon();
                //注册刷新左右两侧更多游戏图标
                PFU.PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, function () {
                    //每个固定时间刷新此处
                    _this.RefreshMoreGameIcon();
                });
                // if (PfuConfig.Config.ui_moreGameType == 1) {
                //     this._fui.m_Btn_MoreGameRight.visible = false;
                // }
                // else if (PfuConfig.Config.ui_moreGameType == 2) {
                //     this._fui.m_Btn_MoreGameLeft.visible = false;
                // }
                // if (PfuConfig.Config.ui_crossGameListType == -1) {
                //     this._fui.m_boxList.visible = false;
                // }
                // //是否显示更多游戏 0 关闭 1 开启
                // if (PfuGlobal.GetOLParam().pfuSdkMoreGame == PfuSwitch.OFF || PfuConfig.Config.ui_moreGameType == -1) {
                //     this._fui.m_boxList.visible = false;
                //     this._fui.m_Btn_MoreGameLeft.visible = false;
                //     this._fui.m_Btn_MoreGameRight.visible = false;
                // }
                this.Refresh();
            };
            MoreGameWindow.prototype.HideMoreGameLeftRight = function () {
                this._fui.m_Btn_MoreGameRight.visible = false;
                this._fui.m_Btn_MoreGameLeft.visible = false;
            };
            MoreGameWindow.prototype.RefreshMoreGameVisible = function () {
                if (PFU.PfuConfig.Config) {
                    if (PFU.PfuConfig.Config.ui_moreGameType == 1) {
                        this._fui.m_Btn_MoreGameRight.visible = false;
                    }
                    else if (PFU.PfuConfig.Config.ui_moreGameType == 2) {
                        this._fui.m_Btn_MoreGameLeft.visible = false;
                    }
                    if (PFU.PfuConfig.Config.ui_crossGameListType == -1) {
                        this._fui.m_boxList.visible = false;
                    }
                    //是否显示更多游戏 0 关闭 1 开启
                    if (PFU.PfuGlobal.GetOLParam().pfuSdkMoreGame == PFU.PfuSwitch.OFF || PFU.PfuConfig.Config.ui_moreGameType == -1) {
                        this._fui.m_boxList.visible = false;
                        //this._fui.m_boxList_left.visible = false;
                        this._fui.m_Btn_MoreGameLeft.visible = false;
                        this._fui.m_Btn_MoreGameRight.visible = false;
                    }
                }
            };
            MoreGameWindow.prototype.Refresh = function () {
                var type = this._isShowType;
                this._fui.m_boxList.visible = true;
                //this._fui.m_boxList_left.visible = true;
                this._fui.m_Btn_MoreGameRight.visible = true;
                this._fui.m_Btn_MoreGameLeft.visible = true;
                if (!type || type == PfuSdk.SHOW_TYPE_ALL) {
                }
                else {
                    if (type == PfuSdk.SHOW_TYPE_MOREGAME) {
                        this._fui.m_boxList.visible = false;
                    }
                    else if (type == PfuSdk.SHOW_TYPE_BOXLIST) {
                        this.HideMoreGameLeftRight();
                    }
                }
                this.RefreshMoreGameVisible();
            };
            //刷新左右更多游戏icon
            MoreGameWindow.prototype.RefreshMoreGameIcon = function () {
                //从PfuMoreGameUpdate 获取icon地址
                if (PFU.PfuConfig.Config.ui_moreGameType == -1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 2) {
                    this._fui.m_Btn_MoreGameLeft.m_icon.asLoader.url = PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true);
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 1) {
                    this._fui.m_Btn_MoreGameRight.m_icon.asLoader.url = PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false);
                }
            };
            MoreGameWindow.prototype.Show = function (type) {
                _super.prototype.Show.call(this, type);
                this._isShowType = type;
                this.Refresh();
            };
            MoreGameWindow.prototype.ClickMoreGame = function (isLeft) {
                //跳转更多游戏
                PFU.PfuMoreGameUpdate.GetInstance().ShowMoreGame(isLeft, this, function (url) {
                    // let pos = url.lastIndexOf("/");
                    // let end = url.lastIndexOf(".");
                    // let pngName = url.substring(pos + 1, end);
                    // Global.StatisticsMoreGame(pngName);
                });
            };
            //创建底部更多游戏列表
            MoreGameWindow.prototype.CreateMoreGameList = function () {
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                    this._fui.m_list_moregamebg.visible = true;
                    this._fui.m_list_moregameStr.visible = true;
                }
                for (var i = 0; i < count; i++) {
                    var boxListData = list[i];
                    var vo = this._fui.m_list_moregame.addItemFromPool(pfusdkui.UI_List_GameChild.URL);
                    vo.m_icon.icon = boxListData.link;
                    vo.onClick(this, this.OnClickMoreGameListItem, [boxListData]);
                }
            };
            //点击底部更多游戏项目跳转应用
            MoreGameWindow.prototype.OnClickMoreGameListItem = function (data, itemObject) {
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function () { });
                //WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.wechatGameid, "");
            };
            //更新左右移动动画
            MoreGameWindow.prototype.UpdateMoreGameListMove = function () {
                var posx = this._fui.m_list_moregame.scrollPane.posX;
                var dir = this.isMoveLeft ? 1 : -1;
                posx += 20 * 0.016 * dir;
                if (posx >= this._fui.m_list_moregame.scrollPane.contentWidth - this._fui.m_list_moregame.width) {
                    posx = this._fui.m_list_moregame.scrollPane.contentWidth;
                    this.isMoveLeft = false;
                }
                else if (posx < 0) {
                    posx = 0;
                    this.isMoveLeft = true;
                }
                var targetx = posx; // + (index - curIndex) * this.child_width
                this._fui.m_list_moregame.scrollPane.setPosX(targetx, false);
            };
            MoreGameWindow.prototype.CreateMoreGameListLeft = function () {
                var _this = this;
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                }
                for (var i = 0; i < count; i++) {
                    var boxListData = list[i];
                    var vo = this._fui.m_list_moregame_left.addItemFromPool(pfusdkui.UI_List_GameChild_left.URL);
                    vo.m_icon.icon = boxListData.link;
                    vo.onClick(this, this.OnClickMoreGameListItem, [boxListData]);
                }
                this._fui.m_btn_left_click.onClick(this, function () {
                    if (_this.isLockLeftBtn) {
                        return;
                    }
                    _this.isLockLeftBtn = true;
                    if (!_this.isLeftOpen) {
                        _this._fui.m_showLift.play(Laya.Handler.create(_this, function () {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = true;
                        }));
                    }
                    else {
                        _this._fui.m_hideLift.play(Laya.Handler.create(_this, function () {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = false;
                        }));
                    }
                });
            };
            return MoreGameWindow;
        }(UI.WindowBase));
        UI.MoreGameWindow = MoreGameWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=MoreGameWindow.js.map