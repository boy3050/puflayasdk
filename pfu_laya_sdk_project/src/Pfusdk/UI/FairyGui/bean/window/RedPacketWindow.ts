namespace PFU.UI {
    export class RedPacketWindow extends WindowBase {

        protected _fui: pfusdkui.UI_RedPacketUI;



        //是否显示图标
        private _isShowRedpacket: boolean = false;

        public InitWindow(fui: fairygui.GComponent) {

            this._fui = fui as pfusdkui.UI_RedPacketUI;
            super.InitWindow(fui);

        }

        private awradPackageType = 0;

        protected OnStart() {
            this.InitIconEvent();
            this._fui.m_com_everyday.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/denglujl_di.png";
            this._fui.m_com_tixianredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png";
            this._fui.m_com_openredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_di.png";
            this._fui.m_com_awradredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png";


            //提现event
            this._fui.m_com_tixianredpackage.m_btn_close.onClick(this, () => {
                this._fui.m_com_tixianredpackage.visible = false;
            });

            this._fui.m_com_tixianredpackage.m_btn_tixian.onClick(this, () => {
                PfuRedPacketManager.GetInstance().ShowTXDialog();
            });

            this._fui.m_com_awradredpackage.m_btn_tixian.onClick(this, () => {
                PfuRedPacketManager.GetInstance().ShowTXDialog();
            });
            this._fui.m_com_awradredpackage.m_btn_close.onClick(this, () => {
                this._fui.m_com_awradredpackage.visible = false;
                if (this.awradPackageType == 1)
                    PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.SUCCESS);
            });

            //打开红包
            this._fui.m_com_openredpackage.m_btn_close.onClick(this, () => {
                this._fui.m_com_openredpackage.visible = false;
                PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
            });

            this._fui.m_com_openredpackage.m_btn_red_open.onClick(this, this.OnRedPacketGiftAward);

            if (PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                this._fui.m_com_openredpackage.m_voidStr.text = "看视频领取";
                this._fui.m_com_openredpackage.m_openredtip2.text = "看视频有几率翻倍！";
            } else {
                this._fui.m_com_openredpackage.m_voidStr.text = "分享领取";
                this._fui.m_com_openredpackage.m_openredtip2.text = "分享有几率翻倍！";
            }

        }

        protected OnUpdate() {

            if (PfuSdk.GetParamComplete && !this._isShowRedpacket) {

                //this._fui.m_btn_redpackageicon.visible = true;
                this._isShowRedpacket = false;

            }
        }

        public Show() {
            //检测在线参数，在线参数收到后 显示UI
            super.Show();
        }

        public Hide() {
            super.Hide();
        }

        //region 红包按钮

        public InitIconEvent() {

            this._fui.m_btn_redpackageicon.onClick(this, this.OnClickRedIcon);
            this._fui.m_com_everyday.m_btn_red_everyday_skip.onClick(this, this.OnEverydaySkip);
            this._fui.m_com_everyday.m_btn_double_btn.onClick(this, this.OnEveryDoubleAward);

            this.UpdateIconMoney();
        }

        /**
         * 设置红包按钮位置
         * @param xv 
         * @param yv 
         */
        public SetIconBtnPos(xv: number, yv: number) {
            this._fui.m_btn_redpackageicon.setXY(xv, yv);
        }

        /**
         * 设置隐藏显示
         * @param visible 
         */
        public SetIconVisible(visible: boolean) {
            this._fui.m_btn_redpackageicon.visible = visible;
        }

        /**
         * 更新
         * @param money 
         */
        private UpdateIconMoney() {
            this._fui.m_btn_redpackageicon.m_moneyNumStr.text = "¥" + PfuRedPacketManager.GetInstance().GetMoney();
        }

        /**
         * 点击icon
         */
        private OnClickRedIcon() {
            //进入礼包是否领取
            if (PfuRedPacketManager.GetInstance().CanEverydayAward()) {
                //没领取弹礼包界面
                this.OpenEverydayGift();
            }
            else {
                //领取后弹红包提现界面
                this.OpenRadPacketTixian();
            }
        }

        //endregion-----------

        //region 红包7天领取

        public OpenEverydayGift() {
            //显示并且设置 按钮等功能
            this.SetEveryDayCom();
            this._fui.m_com_everyday.visible = true;
        }

        private SetEveryDayCom() {
            let count = this._fui.m_com_everyday.m_list_sex.numChildren;
            for (let i = 0; i < count; i++) {
                let com: pfusdkui.UI_red_everyday_child_com = this._fui.m_com_everyday.m_list_sex.getChildAt(i) as pfusdkui.UI_red_everyday_child_com;
                if (i < PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                    com.m_text.text = "已领取";
                    continue;
                }
                com.m_text.text = "第" + (i + 1) + "天";
            }
            if (6 < PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                this._fui.m_com_everyday.m_seven.m_text.text = "已领取";
            } else {
                this._fui.m_com_everyday.m_seven.m_text.text = "第" + (7) + "天(超大红包)";
            }
        }

        private OnEverydaySkip() {
            //添加money!
            this._fui.m_com_everyday.visible = false;
            this.EverydayAward(false);
        }

        private EverydayAward(isDouble: boolean) {
            let num = PfuRedPacketManager.GetInstance().AwardEveryDay(isDouble);
            this.UpdateIconMoney();
            this.awradPackageType = 0;
            //打开余额界面
            this.OpenAwardRadPacket(num);
        }

        private OnEveryDoubleAward() {
            if (!WeChatUtils.GetInstance().IsWeGame()) {
                this._fui.m_com_everyday.visible = false;
                this.EverydayAward(true);
                return;
            }

            PfuSdk.ShareAward(this, (type) => {
                if (type == PfuSdk.SUCCESS) {
                    this._fui.m_com_everyday.visible = false;
                    this.EverydayAward(true);
                } else {

                }
            });
        }

        //endregion---------------

        //#region 红包提现界面
        private OpenRadPacketTixian() {
            this._fui.m_com_tixianredpackage.visible = true;
            this._fui.m_com_tixianredpackage.m_moneyNum.text = "" + (PfuRedPacketManager.GetInstance().GetMoney());
        }


        //#endregion---------------


        //#region 打开红包界面
        public OpenRadPacketGift() {
            this._fui.m_com_openredpackage.visible = true;
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
            this._fui.m_com_openredpackage.visible = false;
            let award = PfuRedPacketManager.GetInstance().AwardGift();
            this.awradPackageType = 1;
            this.OpenAwardRadPacket(award);
            this.UpdateIconMoney();
        }

        private OpenAwardRadPacket(award: number) {
            this._fui.m_com_awradredpackage.visible = true;
            this._fui.m_com_awradredpackage.m_allMoney.text = "" + (PfuRedPacketManager.GetInstance().GetMoney());
            this._fui.m_com_awradredpackage.m_moneyNum.text = "" + award.toFixed(2);//  Math.floor(award * 100) / 100;
        }

        //#endregion----------------


    }
}