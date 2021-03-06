namespace PFU.UI {
    export class MoreGameWindow extends WindowBase {
        protected _fui: pfusdkui.UI_MoreGameUI;

        private _isCreateSideMoreGameBtn = false;
        private _isCreateMoreGameListBar = false;
        private isMoveLeft: boolean = true;

        private _isShowType: number;

        public InitWindow(fui: fairygui.GComponent) {
            this._fui = fui as pfusdkui.UI_MoreGameUI;
            super.InitWindow(fui);
        }
        protected OnStart() {
            //设置元素底部适配
            SceneMatchingUtils.SetAlignBottom(this._fui.m_boxList);
        }
        protected OnUpdate() {
            //在线参数是否准备完毕
            if (PfuConfig.Config && !this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete && PfuConfig.Config) {
                this.CreateSideMoreGameBtn();
                this._isCreateSideMoreGameBtn = true;
            }

            if (PfuConfig.Config && !this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
                if (PfuConfig.Config.ui_crossGameListType != -1) {
                    this.CreateMoreGameList();
                    this.CreateMoreGameListLeft();
                }
                this._isCreateMoreGameListBar = true;
            }

            if (this._isCreateMoreGameListBar) {
                this.UpdateMoreGameListMove();
            }

            if (this._isCreateSideMoreGameBtn && PfuMoreGameUpdate.GetInstance().isSetMoreGameOffsetY) {
                this._fui.m_Btn_MoreGameLeft.setXY(this._fui.m_Btn_MoreGameLeft.x, this._fui.m_Btn_MoreGameLeft.y + PfuMoreGameUpdate.GetInstance().moreGameOffsetY);
                this._fui.m_Btn_MoreGameRight.setXY(this._fui.m_Btn_MoreGameRight.x, this._fui.m_Btn_MoreGameRight.y + PfuMoreGameUpdate.GetInstance().moreGameOffsetY);
                PfuMoreGameUpdate.GetInstance().EndMoreGameUIOffsetY();
            }
        }

        public ShowLeft() {

            if (PfuSdk.IsTestModel()) {
                return;
            }
            if (PfuBoxList.GetInstance().GetMoreGameListData().length < 1) {
                return;
            }
            if (PfuConfig.Config.ui_crossGameListType != -1) {
                this._fui.m_boxList_left.visible = true;
            }
        }
        public HideLeft() {
            if (PfuSdk.IsTestModel()) {
                return;
            }
            if (PfuBoxList.GetInstance().GetMoreGameListData().length < 1) {
                return;
            }
            if (PfuConfig.Config.ui_crossGameListType != -1) {
                this._fui.m_boxList_left.visible = false;
            }
        }


        private CreateSideMoreGameBtn() {
            this._fui.m_Btn_MoreGameLeft.onClick(this, this.ClickMoreGame, [true]);
            this._fui.m_Btn_MoreGameRight.onClick(this, this.ClickMoreGame, [false]);
            //刷新左右更多游戏icon
            this.RefreshMoreGameIcon();
            //注册刷新左右两侧更多游戏图标
            PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, () => {
                //每个固定时间刷新此处
                this.RefreshMoreGameIcon();
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
        }

        private HideMoreGameLeftRight() {
            this._fui.m_Btn_MoreGameRight.visible = false;
            this._fui.m_Btn_MoreGameLeft.visible = false;
        }

        private RefreshMoreGameVisible() {
            if (PfuConfig.Config) {
                if (PfuConfig.Config.ui_moreGameType == 1) {
                    this._fui.m_Btn_MoreGameRight.visible = false;
                }
                else if (PfuConfig.Config.ui_moreGameType == 2) {
                    this._fui.m_Btn_MoreGameLeft.visible = false;
                }

                if (PfuConfig.Config.ui_crossGameListType == -1) {
                    this._fui.m_boxList.visible = false;
                    //this._fui.m_boxList_left.visible = false;
                }

                //是否显示更多游戏 0 关闭 1 开启
                if (PfuGlobal.GetOLParam().pfuSdkMoreGame == PfuSwitch.OFF || PfuConfig.Config.ui_moreGameType == -1) {
                    //this._fui.m_boxList.visible = false;
                    //this._fui.m_boxList_left.visible = false;
                    this._fui.m_Btn_MoreGameLeft.visible = false;
                    this._fui.m_Btn_MoreGameRight.visible = false;
                }

                if (PfuSdk.IsTestModel()) {
                    this._fui.m_boxList.visible = false;
                }
            }
        }

        private Refresh() {
            let type = this._isShowType;

            this._fui.m_boxList.visible = true;

            this._fui.m_Btn_MoreGameRight.visible = true;
            this._fui.m_Btn_MoreGameLeft.visible = true;
            if (!type || type == PfuSdk.SHOW_TYPE_ALL) {

            }
            else {
                if (type == PfuSdk.SHOW_TYPE_MOREGAME) {
                    this._fui.m_boxList.visible = false;
                    //this._fui.m_boxList_left.visible = false;
                }
                else if (type == PfuSdk.SHOW_TYPE_BOXLIST) {
                    this.HideMoreGameLeftRight();
                }
            }
            this.RefreshMoreGameVisible();
        }

        //刷新左右更多游戏icon
        private RefreshMoreGameIcon() {
            //从PfuMoreGameUpdate 获取icon地址
            if (PfuConfig.Config.ui_moreGameType == -1) {
                return;
            }
            if (PfuConfig.Config.ui_moreGameType != 2) {
                this._fui.m_Btn_MoreGameLeft.m_icon.asLoader.url = PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true);
            }
            if (PfuConfig.Config.ui_moreGameType != 1) {
                this._fui.m_Btn_MoreGameRight.m_icon.asLoader.url = PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false);
            }
        }

        public Show(type?: number) {
            super.Show(type);
            this._isShowType = type;
            this.Refresh();
        }



        private ClickMoreGame(isLeft: boolean) {
            //跳转更多游戏
            PfuMoreGameUpdate.GetInstance().ShowMoreGame(isLeft, this, (url: string) => {
                // let pos = url.lastIndexOf("/");
                // let end = url.lastIndexOf(".");
                // let pngName = url.substring(pos + 1, end);
                // Global.StatisticsMoreGame(pngName);
            });
        }
        //创建底部更多游戏列表
        private CreateMoreGameList() {
            let list: Array<PfuBoxListData> = PfuBoxList.GetInstance().GetMoreGameListData();

            let count = list.length;
            //没有数据则不显示
            if (count > 0) {
                this._fui.m_list_moregamebg.visible = true;
                this._fui.m_list_moregameStr.visible = true;
                this._fui.m_list_moregame.visible = true;
            }
            else {
                this._fui.m_list_moregamebg.visible = false;
                this._fui.m_list_moregameStr.visible = false;
                this._fui.m_list_moregame.visible = false;
            }
            for (let i = 0; i < count; i++) {
                let boxListData = list[i];
                let vo: pfusdkui.UI_List_GameChild = this._fui.m_list_moregame.addItemFromPool(pfusdkui.UI_List_GameChild.URL) as pfusdkui.UI_List_GameChild;
                vo.m_icon.icon = boxListData.link;
                vo.onClick(this, this.OnClickMoreGameListItem, [boxListData]);
            }
        }
        //点击底部更多游戏项目跳转应用
        private OnClickMoreGameListItem(data: PfuBoxListData, itemObject: fairygui.GObject) {
            PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, () => { });
            //WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.wechatGameid, "");
        }
        //更新左右移动动画
        private UpdateMoreGameListMove() {
            let posx: number = this._fui.m_list_moregame.scrollPane.posX;
            let dir = this.isMoveLeft ? 1 : -1;
            posx += 20 * 0.016 * dir;
            if (posx >= this._fui.m_list_moregame.scrollPane.contentWidth - this._fui.m_list_moregame.width) {
                posx = this._fui.m_list_moregame.scrollPane.contentWidth;
                this.isMoveLeft = false;
            } else if (posx < 0) {
                posx = 0;
                this.isMoveLeft = true;
            }
            let targetx: number = posx;// + (index - curIndex) * this.child_width
            this._fui.m_list_moregame.scrollPane.setPosX(targetx, false);
        }

        private isLockLeftBtn = false;
        private isLeftOpen = false;
        private CreateMoreGameListLeft() {
            let list: Array<PfuBoxListData> = PfuBoxList.GetInstance().GetMoreGameListData();

            let count = list.length;
            if (count > 0) {
                //this._fui.m_boxList_left.visible = true;
            }
            else {
                this._fui.m_boxList_left.visible = false;
            }
            for (let i = 0; i < count; i++) {
                let boxListData = list[i];
                let vo: pfusdkui.UI_List_GameChild_left = this._fui.m_list_moregame_left.addItemFromPool(pfusdkui.UI_List_GameChild_left.URL) as pfusdkui.UI_List_GameChild_left;
                vo.m_icon.icon = boxListData.link;
                vo.onClick(this, this.OnClickMoreGameListItem, [boxListData]);
            }

            this._fui.m_btn_left_click.onClick(this, () => {
                if (this.isLockLeftBtn) {
                    return;
                }
                this.isLockLeftBtn = true;
                if (!this.isLeftOpen) {
                    this._fui.m_showLift.play(Laya.Handler.create(this, () => {
                        this.isLockLeftBtn = false;
                        this.isLeftOpen = true;
                    }));
                }
                else {
                    this._fui.m_hideLift.play(Laya.Handler.create(this, () => {
                        this.isLockLeftBtn = false;
                        this.isLeftOpen = false;
                    }));
                }
            });
        }
    }
}