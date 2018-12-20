namespace PFU {
    export class PfuRedPacketManager {
        private static _instance: PfuRedPacketManager;
        public static GetInstance(): PfuRedPacketManager {
            if (this._instance == null) {
                this._instance = new PfuRedPacketManager();
            }
            return this._instance;
        }

        private _redpacketData: PfuRedPacketData;

        //金币礼包
        private _redpacketHandle: any = null;

        private _redpacketVisibeCallback: Function;

        private _redpacketShowGiftCallback: Function;

        private _redpacketShowEveryDayCallback: Function;

        private _setIconPosCallBack: Function; //vx vy

        private _awardRedpacketActionHandle: any;
        private _awardRedpacketActionCallback: Function;

        private static MONEY_MAX: number = 20;
        private static DAY_COUNT: number = 7;

        //19.8 = 9.2 + 10.78
        private static moneyList = [1.15, 1.3, 0.8, 0.2, 0.35, 0.2, 0.51]; //all 4.51*2 = 9.02
        private static resulet_rmb = 10.78; //剩余10.78元   
        private static redMax = 19.8; //

        private static PFURED_PACKET_DATA_NAME = "pfuredpacketdatra";

        public IsShowBtnAction = false;
        public IsBtnShow = false;

        constructor() {
            this.Init();
        }

        private Init() {
            this.Load();
            Laya.timer.loop(200, this, this.CheckAction);
        }

        public GetMoney(): number {
            return this._redpacketData.moneyNum;
        }

        public AddMoney(number: number) {
            let money = this._redpacketData.moneyNum;
            money += number;
            if (money > PfuRedPacketManager.redMax) {
                money = PfuRedPacketManager.redMax;
            }
            this._redpacketData.moneyNum = Math.floor(money * 100) / 100;
        }

        public SetRedpacketHandle(handle: any, visibleCallback: Function, showGiftCallback: Function, showEveryDayCallBack: Function, setIconposCallBack: Function) {
            this._redpacketHandle = handle;
            this._redpacketVisibeCallback = visibleCallback;
            this._redpacketShowGiftCallback = showGiftCallback;
            this._redpacketShowEveryDayCallback = showEveryDayCallBack;
            this._setIconPosCallBack = setIconposCallBack;
        }

        public CheckAction()  {
            if (PfuSdk.GetBoxListComplete && PfuSdk.GetParamComplete && PfuMoreGameUpdate.GetInstance()._isCreateWindow) {
                if (this.IsShowBtnAction)  {
                    if (this.IsBtnShow)  {
                        this.ShowRedPacketBtn();
                    }
                    else  {
                        this.HideRedPacketBtn();
                    }
                    this.IsShowBtnAction = false;
                }
            }
        }

        public CallShowRedPacketBtn(isShow: boolean)  {
            this.IsShowBtnAction = true;
            this.IsBtnShow = isShow;
        }

        /**
         * 显示红包按钮
         */
        private ShowRedPacketBtn() {
            if (this._redpacketHandle == null) {
                return;
            }
            if (PfuManager.GetInstance().OLParam.pfuSdkRed == PfuSwitch.OFF) {
                return;
            }
            this._redpacketVisibeCallback.call(this._redpacketHandle, true);
        }
        /**
         * 隐藏红包按钮
         */
        private HideRedPacketBtn() {
            if (this._redpacketHandle == null) {
                return;
            }

            if (PfuManager.GetInstance().OLParam.pfuSdkRed == PfuSwitch.OFF) {
                return;
            }
            this._redpacketVisibeCallback.call(this._redpacketHandle, false);
        }

        /**
         * 弹出获得红包
         */
        public PopupRedPacket(handle, callback: Function) {
            if (this._redpacketHandle == null) {
                return;
            }
            if (!this.CanGetRedPacket()) {
                return;
            }
            this._awardRedpacketActionHandle = handle;
            this._awardRedpacketActionCallback = callback;
            this._redpacketShowGiftCallback.call(this._redpacketHandle);
        }

        public AwardRedpacketAction(type: number) {
            if (this._awardRedpacketActionCallback) {
                this._awardRedpacketActionCallback.call(this._awardRedpacketActionHandle, type);
            }
        }

        /**
         * 是否可以领取红包
         */
        public CanGetRedPacket(): boolean {
            if (this._redpacketHandle == null) {
                return false;
            }
            return this.CanShowRedPacketGift();
        }

        /**
         * 设置红包按钮位置
         */
        public SetRedPacketBtnPos(vx: number, vy: number) {
            if (this._redpacketHandle == null) {
                return;
            }
            this._setIconPosCallBack.call(this._redpacketHandle, vx, vy);
        }

        /**
         * 显示红包每日领取界面
         */
        public PopupRedPacketEverydayWindow() {
            if (this._redpacketHandle == null) {
                return;
            }
            if (!this.CanEverydayAward()) {
                return;
            }
            this._redpacketShowEveryDayCallback.call(this._redpacketHandle);
        }

        /**
         * 可以领取每日奖励
         */
        public CanEverydayAward() {
            if (this._redpacketData.lastDayTime == 0) {
                return true;
            }
            if (PfuManager.GetInstance().OLParam.pfuSdkRed == PfuSwitch.OFF) {
                return false;
            }
            let lastTime: number = this._redpacketData.lastDayTime;
            let date: Date = new Date();
            let curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let curTime = curDay.getTime();
            if (curTime > lastTime) {
                if (this._redpacketData.dayCount < 7) {
                    return true;
                }
            }

            return false;
        }

        /**
         * 添加奖励次数
         */
        public AddEverydayAwardCount() {
            this._redpacketData.dayCount++;
            let date: Date = new Date();
            let curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            this._redpacketData.lastDayTime = curDay.getTime();
            this.Save();
        }

        /**
         * 获取每日登陆奖励次数
         */
        public GetEverydayAwardCount() {
            return this._redpacketData.dayCount;
        }


        public ShowTXDialog() {
            PfuGlobal.ShowDialog("红包大于" + PfuRedPacketManager.MONEY_MAX + "元才可以提现!", () => {
            });
        }

        public AwardEveryDay(isDouble: boolean) {

            let index = this._redpacketData.dayCount;
            if (index < 0 || index > PfuRedPacketManager.moneyList.length - 1) {
                return;
            }
            let awardCount = PfuRedPacketManager.moneyList[index];
            if (isDouble) {
                awardCount *= 2;
            }
            else  {
                this._redpacketData.everydaysurplus += awardCount;
            }

            PfuRedPacketManager.GetInstance().AddMoney(awardCount);
            PfuRedPacketManager.GetInstance().AddEverydayAwardCount();
        }

        public TestRed()
        {
            while(this.CanShowRedPacketGift())
            {
                this.AwardGift();
            }
        }


        /**
         * 是否还能给与RMB礼包
         */
        public CanShowRedPacketGift() {
            if (PfuManager.GetInstance().OLParam.pfuSdkRed == PfuSwitch.OFF) {
                return false;
            }

            return this._redpacketData.remaining < PfuRedPacketManager.resulet_rmb + this._redpacketData.everydaysurplus;
        }

        /**
         * 添加奖励
         */
        public AwardGift(): number {

            let awardCount = 0;

            if (this._redpacketData.awardRedCount < 20) {
                awardCount = BXRandom.Get().nextFloat(0.12, 0.4);
            } else {
                awardCount = BXRandom.Get().nextFloat(0.03, 0.2);
            }
            let a = Math.floor(awardCount * 100) / 100;
            this._redpacketData.remaining += a;
            PfuRedPacketManager.GetInstance().AddMoney(a);
            this._redpacketData.awardRedCount++;
            //this.Save();
            //奖励
            console.log("奖励第" + this._redpacketData.awardRedCount + "次，奖励金额" + a + "元，总金额" + this._redpacketData.moneyNum);
            return a;
        }

        //#region 存储

        private Load() {
            var json = LocalSaveUtils.GetJsonObject(PfuRedPacketManager.PFURED_PACKET_DATA_NAME);
            if (json != null && json != undefined) {
                this._redpacketData = json;
            } else {
                this._redpacketData = new PfuRedPacketData();
                this._redpacketData.moneyNum = 0;
                this._redpacketData.dayCount = 0;
                this._redpacketData.lastDayTime = 0;
            }
            return this._redpacketData;
        }

        public Save() {
            LocalSaveUtils.SaveJsonObject(PfuRedPacketManager.PFURED_PACKET_DATA_NAME, this._redpacketData);
        }

        //#endregion

    }


    export class PfuRedPacketData {
        public moneyNum: number = 0;
        public dayCount: number = 0;
        public lastDayTime: number = 0;
        public remaining: number = 0;
        //剩余奖励池
        public everydaysurplus: number = 0;
        //奖励红包次数 影响随机
        public awardRedCount: number = 0;
    }
}