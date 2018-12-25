namespace PFU.UI {
    export class PfuSdkLayaUI {
        public static boxWindowUI: PFU.UI.FirstSceneBoxUI;
        public static moregameUI: PFU.UI.MoreGameUI;
        public static bannerUI: PFU.UI.UI_PfuBannerUI;
        public static redPacketUI: PFU.UI.RedPacketUI;

        private static _scaleX: number = 1;
        private static _scaleY: number = 1;
        private static _bottomOffset: number = 0;

        private static _windowList: Array<any> = new Array<any>();

        public static CustomSpecialUI(scaleX: number, scaleY: number, bottomOffset: number) {
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._bottomOffset = bottomOffset;
        }


        public static CreateUI() {
            this.LoadUIData();
            SceneMatchingLayaUtils.bottomOffset = this._bottomOffset;
            SceneMatchingLayaUtils.WIDTH = laya.utils.Browser.width;
            SceneMatchingLayaUtils.HEIGTH = laya.utils.Browser.height;
        }

        private static LoadUIData() {
            Laya.loader.load(PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/layaui/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
            //Laya.loader.load("https://txpk.jfydgame.com/pfulayasdk/test/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
        }

        private static AddStage(windowUI: any) {
            windowUI.scale(this._scaleX, this._scaleY);
            this._windowList.push(windowUI);
            Laya.stage.addChild(windowUI);
        }

        public static GetSdkWindowList(): Array<any> {
            return this._windowList;
        }

        private static CreateUIWindow() {
            this.moregameUI = new PFU.UI.MoreGameUI();
            this.AddStage(this.moregameUI);
            this.moregameUI.OnHide();

            this.bannerUI = new PFU.UI.UI_PfuBannerUI();
            this.AddStage(this.bannerUI);

            this.boxWindowUI = new PFU.UI.FirstSceneBoxUI();
            this.AddStage(this.boxWindowUI);

            let clickBannerUI = new PFU.UI.ClickBannerUI();
            this.AddStage(clickBannerUI);

            this.redPacketUI = new PFU.UI.RedPacketUI();
            this.AddStage(this.redPacketUI);
    


            //设置更多游戏显示开关
            PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, (isShow, type) => {
                if (isShow) {
                    this.moregameUI.OnShow(type);
                } else {
                    this.moregameUI.OnHide();
                }
            });

            PfuClickBannerRevive.GetInstance().SetUIHandle(this, (isShow) => {
                if (isShow) {
                    clickBannerUI.Show();
                } else {
                    clickBannerUI.Hide();
                }
            });

            PFU.PfuGlobal.SetOnDialog(this, PfuSdkLayaUI.OnAddDialog);

            PfuRedPacketManager.GetInstance().SetRedpacketHandle(this, (isShowBtn) => {
                this.moregameUI.SetIconVisible(isShowBtn);
            }, () => {
                this.redPacketUI.OpenRadPacketGift();
            }, () => {
                this.redPacketUI.OpenEverydayGift();
            }, (vx: number, vy: number) => {
                this.moregameUI.SetIconBtnPos(vx, vy);
            });

            PfuMoreGameUpdate.GetInstance().SetPopupListVisible(this, (isShow) => {
                if (isShow) {
                    this.moregameUI.ShowLeft();
                } else {
                    this.moregameUI.HideLeft();
                }
            });
        }

        public static OpenEverydayGift()
        {
            this.redPacketUI.OpenEverydayGift();
        }

        public static OpenRadPacketTixian()
        {
            this.redPacketUI.OpenRadPacketTixian();
        }

        public static UpdateIconMoney()
        {
            this.moregameUI.UpdateIconMoney();
        }

        public static OnAddDialog(desc: string) {

            let dialog: ui.SdkDialogUIUI = new ui.SdkDialogUIUI();
            dialog.dialogtext.text = "" + desc;
            dialog.zOrder = PfuSdk.UI_ORDER_OTHER;
            Laya.stage.addChild(dialog);
            Laya.stage.updateZOrder();

            Laya.timer.once(2000, this, () => {
                dialog.removeSelf();
            });
        }
    }
}