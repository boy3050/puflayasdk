namespace PFU.UI {
    export class MoreGameUI extends ui.MoreGameUIUI {
        private allgame: Array<any>;

        private _isCreateSideMoreGameBtn = false;
        private _isCreateMoreGameListBar = false;
        private isMoveLeft: boolean = true;
        private isDrag: boolean = false;

        private _isShowType: number;

        constructor() {
            super();
            Laya.timer.frameLoop(1, this, this.OnUpdate);
            SceneMatchingLayaUtils.SetAlignBottom(this.box);

        }

        public OnUpdate() {
            //在线参数是否准备完毕
            if (!this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete) {
                this.CreateSideMoreGameBtn();
                this._isCreateSideMoreGameBtn = true;
            }
            if (!this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
                if (PfuConfig.Config.ui_crossGameListType != -1) {
                    this.CreateMoreGameList();
                }
                this._isCreateMoreGameListBar = true;
            }

            if (this._isCreateMoreGameListBar) {
                this.UpdateMoreGameListMove();
            }

            if (PfuMoreGameUpdate.GetInstance().isSetLayerAction) {
                if (PfuMoreGameUpdate.GetInstance().layerNum >= 0 && PfuMoreGameUpdate.GetInstance().layerNum < Laya.stage.numChildren) {
                    Laya.stage.setChildIndex(this, PfuMoreGameUpdate.GetInstance().layerNum);
                }
                PfuMoreGameUpdate.GetInstance().EndSetMoreGameUI();
            }

            if (this._isCreateSideMoreGameBtn && PfuMoreGameUpdate.GetInstance().isSetMoreGameOffsetY) {
                this.btn_left.y = this.btn_left.y + PfuMoreGameUpdate.GetInstance().moreGameOffsetY;
                this.btn_right.y = this.btn_right.y + PfuMoreGameUpdate.GetInstance().moreGameOffsetY;
                PfuMoreGameUpdate.GetInstance().EndMoreGameUIOffsetY();
            }
        }
        public OnHide() {
            this.visible = false;
            Laya.timer.clearAll(this);
        }
        public OnShow(type?: number) {
            this.visible = true;

            PfuSdk.SetMoreGameUILayer(Laya.stage.numChildren - 1);

            Laya.timer.frameLoop(1, this, this.OnUpdate);
            this._isShowType = type;
            this.Refresh();
        }

        private Refresh() {
            let type = this._isShowType;
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
        }
        private HideMoreGameLeftRight() {
            this.btn_right.visible = false;
            this.btn_left.visible = false;
        }
        private RefreshMoreGameVisible() {

            if (PfuConfig.Config && PfuConfig.Config.ui_moreGameType == 1) {
                this.btn_right.visible = false;
            }
            else if (PfuConfig.Config && PfuConfig.Config.ui_moreGameType == 2) {
                this.btn_left.visible = false;
            }
            if (PfuConfig.Config && PfuConfig.Config.ui_crossGameListType == -1) {
                this.box.visible = false;
            }
            //是否显示更多游戏 0 关闭 1 开启
            if (PfuGlobal.GetOLParam().pfuSdkMoreGame == PfuSwitch.OFF || (PfuConfig.Config && PfuConfig.Config.ui_moreGameType == -1)) {
                this.btn_left.visible = false;
                this.btn_right.visible = false;
                this.box.visible = false;
            }
        }

        private CreateSideMoreGameBtn() {
            this.btn_left.on(Laya.Event.CLICK, this, this.ClickMoreGame, [true]);
            this.btn_right.on(Laya.Event.CLICK, this, this.ClickMoreGame, [false]);
            //刷新左右更多游戏icon
            this.RefreshMoreGameIcon();
            //注册刷新左右两侧更多游戏图标
            PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, () => {
                //每个固定时间刷新此处
                this.RefreshMoreGameIcon();
            });

            this.Refresh();
        }

        //刷新左右更多游戏icon
        private RefreshMoreGameIcon() {
            if (PfuConfig.Config.ui_moreGameType == -1) {
                return;
            }
            //从PfuMoreGameUpdate 获取icon地址
            if (PfuConfig.Config.ui_moreGameType != 2) {
                this.btn_left.loadImage(PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true));
            }
            if (PfuConfig.Config.ui_moreGameType != 1) {
                this.btn_right.loadImage(PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false));
            }
            // this.btn_left.skin = PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true);
            // this.btn_right.skin = PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false);
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
            if (count > 0) {
                this.img_title.visible = true;
            }
            this.allgame = [];
            let boxListData;
            // 使用但隐藏滚动条
            this.boxlist.hScrollBarSkin = "";
            this.boxlist.scrollBar.min = 0;
            this.boxlist.scrollBar.max = 300;
            this.boxlist.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
            this.boxlist.scrollBar.elasticBackTime = 200;
            this.boxlist.scrollBar.elasticDistance = 50;
            for (let i = 0; i < count; i++) {
                boxListData = list[i];
                this.allgame.push({
                    img_icon: boxListData.link,
                    boxListData,
                });
                this.boxlist.array = this.allgame;
            }
        }
        //点击底部更多游戏项目跳转应用
        private OnClickMoreGameListItem(e: Event, index: number) {
            if (e.type == Laya.Event.CLICK) {
                PFU.PfuManager.GetInstance().ShowCrossGameImage(this.allgame[index].boxListData, this, () => { });
                //WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, this.allgame[index].boxListData.wechatGameid, "");
            }
            if (e.type == Laya.Event.MOUSE_DOWN) {
                this.isDrag = true;
            }
            else if (e.type == Laya.Event.MOUSE_UP || e.type == Laya.Event.MOUSE_OVER) {
                this.posx = this.boxlist.scrollBar.value;
                this.isDrag = false;
            }

        }
        private posx: number = 0;

        //更新左右移动动画
        private UpdateMoreGameListMove() {
            if (this.isDrag) return;

            let dir = this.isMoveLeft ? 1 : -1;
            this.posx += 20 * 0.016 * dir;
            if (this.posx >= 300) {
                this.posx = 300;
                this.isMoveLeft = false;
            } else if (this.posx < 0) {
                this.posx = 0;
                this.isMoveLeft = true;
            }

            this.boxlist.scrollBar.value = this.posx;
        }
    }
}