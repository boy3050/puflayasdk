namespace PFU.UI {
    export class RedPacketUI extends ui.RedPacketUIUI {

        private awradPackageType = 0;

        constructor() {
            super();
            Laya.timer.frameLoop(1, this, this.OnUpdate);
            this.InitIconEvent();
            this.bg_loader.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_di.png");
            this.loader_everyday.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/denglujl_di.png");
            this.loader_award.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png");
            this.loader_tixian.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png");

            //提现event
            this.btn_close_tixian.on(Laya.Event.CLICK, this, () => {
                this.com_tixianredpackage.visible = false;
            });

            this.btn_tixian.on(Laya.Event.CLICK, this, () => {
                PfuRedPacketManager.GetInstance().ShowTXDialog();
            });

            this.btn_tixian_award.on(Laya.Event.CLICK, this, () => {
                PfuRedPacketManager.GetInstance().ShowTXDialog();
            });

            this.btn_close_award.on(Laya.Event.CLICK, this, () => {
                this.com_awradredpackage.visible = false;
                if (this.awradPackageType == 1)
                    PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.SUCCESS);
            });


            this.btn_close.on(Laya.Event.CLICK, this, () => {
                this.com_openredpackage.visible = false;
                PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
            });

            this.btn_red_open.on(Laya.Event.CLICK, this, this.OnRedPacketGiftAward);

            this.zOrder = PfuSdk.UI_ORDER_OTHER;

            Laya.stage.updateZOrder();

            if (PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                this.openredactiontip.text = "看视频领取";
                this.openredTip2.text = "看视频有几率翻倍！"
            } else {
                this.openredactiontip.text = "分享领取";
                this.openredTip2.text = "分享有几率翻倍！"
            }
        }
        public OnUpdate() {

        }

        //region 红包按钮

        public InitIconEvent() {

            this.btn_red_everyday_skip.on(Laya.Event.CLICK, this, this.OnEverydaySkip);
            this.btn_double_btn.on(Laya.Event.CLICK, this, this.OnEveryDoubleAward);
            this.UpdateIconMoney();
        }


        /**
        * 更新
        * @param money 
        */
        private UpdateIconMoney() {

            PFU.UI.PfuSdkLayaUI.UpdateIconMoney();
        }


        //endregion-----------

        //region 红包7天领取

        public OpenEverydayGift() {
            //显示并且设置 按钮等功能
            this.SetEveryDayCom();
            this.com_everyday.visible = true;
        }

        private SetEveryDayCom() {

            let count = 6
            let allgame = [];
            let boxListData;
            // 使用但隐藏滚动条
            this.list_six.hScrollBarSkin = "";
            this.list_six.scrollBar.min = 0;
            this.list_six.scrollBar.max = 300;
            //this.list_six.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
            this.list_six.scrollBar.elasticBackTime = 200;
            this.list_six.scrollBar.elasticDistance = 50;
            for (let i = 0; i < count; i++) {
                if (i < PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                    allgame.push({
                        deveryNum: { text: "已领取" }
                    });
                    continue;
                }

                allgame.push(
                    {
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


            if (6 < PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                this.seven_text.text = "已领取";
            } else {
                this.seven_text.text = "第" + (7) + "天(超大红包)";
            }
        }

        private OnEverydaySkip() {
            //添加money!
            this.com_everyday.visible = false;
            this.EverydayAward(false);
        }

        private EverydayAward(isDouble: boolean) {
            let award = PfuRedPacketManager.GetInstance().AwardEveryDay(isDouble);
            this.UpdateIconMoney();

            this.awradPackageType = 0;
            this.OpenAwardRadPacket(award);
        }

        private OnEveryDoubleAward() {
            if (!WeChatUtils.GetInstance().IsWeGame()) {
                this.com_everyday.visible = false;
                this.EverydayAward(true);
                return;
            }
            PfuSdk.ShareAward(this, (type) => {
                if (type == PfuSdk.SUCCESS) {
                    this.com_everyday.visible = false;
                    this.EverydayAward(true);
                } else {

                }
            });
        }

        //endregion---------------

        //#region 红包提现界面
        public OpenRadPacketTixian() {
            this.com_tixianredpackage.visible = true;
            this.moneyNum.text = "" + (PfuRedPacketManager.GetInstance().GetMoney());
        }


        //#endregion---------------


        //#region 打开红包界面
        public OpenRadPacketGift() {
            this.com_openredpackage.visible = true;
        }

        private OnRedPacketGiftAward() {
            if (!WeChatUtils.GetInstance().IsWeGame()) {
                this.RedPacketGiftAward();
                return;
            }
            if (PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                PfuSdk.Video(this, (type) => {
                    if (type == PfuSdk.SUCCESS) {
                        this.RedPacketGiftAward();
                    } else {
                        //PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                    }
                });
            } else {
                PfuSdk.ShareAward(this, (type) => {
                    if (type == PfuSdk.SUCCESS) {
                        this.RedPacketGiftAward();
                    } else {
                        //PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                    }
                });
            }



        }

        private RedPacketGiftAward() {
            this.com_openredpackage.visible = false;
            let award = PfuRedPacketManager.GetInstance().AwardGift();
            this.awradPackageType = 1;
            this.OpenAwardRadPacket(award);
            this.UpdateIconMoney();
        }

        private OpenAwardRadPacket(award: number) {
            this.com_awradredpackage.visible = true;
            this.allMoney_award.text = "" + (PfuRedPacketManager.GetInstance().GetMoney());
            this.moneyNum_award.text = "" + award.toFixed(2);// Math.floor(award * 100) / 100;
        }

        //#endregion----------------

        public ForceCloseRedPacketUI()
        {
            if(this.com_openredpackage.visible)
            {
                this.com_openredpackage.visible = false;
            }
            
            if(this.com_awradredpackage.visible)
            {
                this.com_awradredpackage.visible = false;
            }

        }
    }
}
