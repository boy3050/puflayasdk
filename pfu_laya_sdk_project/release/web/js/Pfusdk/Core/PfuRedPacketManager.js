var PFU;
(function (PFU) {
    var PfuRedPacketManager = (function () {
        function PfuRedPacketManager() {
            //金币礼包
            this._redpacketHandle = null;
            this.IsShowBtnAction = false;
            this.IsBtnShow = false;
            this.Init();
        }
        PfuRedPacketManager.GetInstance = function () {
            if (this._instance == null) {
                this._instance = new PfuRedPacketManager();
            }
            return this._instance;
        };
        PfuRedPacketManager.prototype.Init = function () {
            this.Load();
            Laya.timer.loop(200, this, this.CheckAction);
        };
        PfuRedPacketManager.prototype.GetMoney = function () {
            return this._redpacketData.moneyNum;
        };
        PfuRedPacketManager.prototype.AddMoney = function (number) {
            var money = this._redpacketData.moneyNum;
            money += number;
            if (money > PfuRedPacketManager.redMax) {
                money = PfuRedPacketManager.redMax;
            }
            this._redpacketData.moneyNum = Math.floor(money * 100) / 100;
        };
        PfuRedPacketManager.prototype.SetRedpacketHandle = function (handle, visibleCallback, showGiftCallback, showEveryDayCallBack, setIconposCallBack) {
            this._redpacketHandle = handle;
            this._redpacketVisibeCallback = visibleCallback;
            this._redpacketShowGiftCallback = showGiftCallback;
            this._redpacketShowEveryDayCallback = showEveryDayCallBack;
            this._setIconPosCallBack = setIconposCallBack;
        };
        PfuRedPacketManager.prototype.CheckAction = function () {
            if (PfuSdk.GetBoxListComplete && PfuSdk.GetParamComplete && PFU.PfuMoreGameUpdate.GetInstance()._isCreateWindow) {
                if (this.IsShowBtnAction) {
                    if (this.IsBtnShow) {
                        this.ShowRedPacketBtn();
                    }
                    else {
                        this.HideRedPacketBtn();
                    }
                    this.IsShowBtnAction = false;
                }
            }
        };
        PfuRedPacketManager.prototype.CallShowRedPacketBtn = function (isShow) {
            this.IsShowBtnAction = true;
            this.IsBtnShow = isShow;
        };
        /**
         * 显示红包按钮
         */
        PfuRedPacketManager.prototype.ShowRedPacketBtn = function () {
            if (this._redpacketHandle == null) {
                return;
            }
            if (PFU.PfuManager.GetInstance().OLParam.pfuSdkRed == PFU.PfuSwitch.OFF) {
                return;
            }
            this._redpacketVisibeCallback.call(this._redpacketHandle, true);
        };
        /**
         * 隐藏红包按钮
         */
        PfuRedPacketManager.prototype.HideRedPacketBtn = function () {
            if (this._redpacketHandle == null) {
                return;
            }
            if (PFU.PfuManager.GetInstance().OLParam.pfuSdkRed == PFU.PfuSwitch.OFF) {
                return;
            }
            this._redpacketVisibeCallback.call(this._redpacketHandle, false);
        };
        /**
         * 弹出获得红包
         */
        PfuRedPacketManager.prototype.PopupRedPacket = function (handle, callback) {
            if (this._redpacketHandle == null) {
                return;
            }
            if (!this.CanGetRedPacket()) {
                return;
            }
            this._awardRedpacketActionHandle = handle;
            this._awardRedpacketActionCallback = callback;
            this._redpacketShowGiftCallback.call(this._redpacketHandle);
        };
        PfuRedPacketManager.prototype.AwardRedpacketAction = function (type) {
            if (this._awardRedpacketActionCallback) {
                this._awardRedpacketActionCallback.call(this._awardRedpacketActionHandle, type);
            }
        };
        /**
         * 是否可以领取红包
         */
        PfuRedPacketManager.prototype.CanGetRedPacket = function () {
            if (this._redpacketHandle == null) {
                return false;
            }
            return this.CanShowRedPacketGift();
        };
        /**
         * 设置红包按钮位置
         */
        PfuRedPacketManager.prototype.SetRedPacketBtnPos = function (vx, vy) {
            if (this._redpacketHandle == null) {
                return;
            }
            this._setIconPosCallBack.call(this._redpacketHandle, vx, vy);
        };
        /**
         * 显示红包每日领取界面
         */
        PfuRedPacketManager.prototype.PopupRedPacketEverydayWindow = function () {
            if (this._redpacketHandle == null) {
                return;
            }
            if (!this.CanEverydayAward()) {
                return;
            }
            this._redpacketShowEveryDayCallback.call(this._redpacketHandle);
        };
        /**
         * 可以领取每日奖励
         */
        PfuRedPacketManager.prototype.CanEverydayAward = function () {
            if (this._redpacketData.lastDayTime == 0) {
                return true;
            }
            if (PFU.PfuManager.GetInstance().OLParam.pfuSdkRed == PFU.PfuSwitch.OFF) {
                return false;
            }
            var lastTime = this._redpacketData.lastDayTime;
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var curTime = curDay.getTime();
            if (curTime > lastTime) {
                if (this._redpacketData.dayCount < 7) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 添加奖励次数
         */
        PfuRedPacketManager.prototype.AddEverydayAwardCount = function () {
            this._redpacketData.dayCount++;
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            this._redpacketData.lastDayTime = curDay.getTime();
            this.Save();
        };
        /**
         * 获取每日登陆奖励次数
         */
        PfuRedPacketManager.prototype.GetEverydayAwardCount = function () {
            return this._redpacketData.dayCount;
        };
        PfuRedPacketManager.prototype.ShowTXDialog = function () {
            PFU.PfuGlobal.ShowDialog("红包大于" + PfuRedPacketManager.MONEY_MAX + "元才可以提现!", function () {
            });
        };
        PfuRedPacketManager.prototype.AwardEveryDay = function (isDouble) {
            var index = this._redpacketData.dayCount;
            if (index < 0 || index > PfuRedPacketManager.moneyList.length - 1) {
                return;
            }
            var awardCount = PfuRedPacketManager.moneyList[index];
            if (isDouble) {
                awardCount *= 2;
            }
            else {
                this._redpacketData.everydaysurplus += awardCount;
            }
            PfuRedPacketManager.GetInstance().AddMoney(awardCount);
            PfuRedPacketManager.GetInstance().AddEverydayAwardCount();
        };
        PfuRedPacketManager.prototype.TestRed = function () {
            while (this.CanShowRedPacketGift()) {
                this.AwardGift();
            }
        };
        /**
         * 是否还能给与RMB礼包
         */
        PfuRedPacketManager.prototype.CanShowRedPacketGift = function () {
            if (PFU.PfuManager.GetInstance().OLParam.pfuSdkRed == PFU.PfuSwitch.OFF) {
                return false;
            }
            return this._redpacketData.remaining < PfuRedPacketManager.resulet_rmb + this._redpacketData.everydaysurplus;
        };
        /**
         * 添加奖励
         */
        PfuRedPacketManager.prototype.AwardGift = function () {
            var awardCount = 0;
            if (this._redpacketData.awardRedCount < 20) {
                awardCount = PFU.BXRandom.Get().nextFloat(0.12, 0.4);
            }
            else {
                awardCount = PFU.BXRandom.Get().nextFloat(0.03, 0.2);
            }
            var a = Math.floor(awardCount * 100) / 100;
            this._redpacketData.remaining += a;
            PfuRedPacketManager.GetInstance().AddMoney(a);
            this._redpacketData.awardRedCount++;
            //this.Save();
            //奖励
            console.log("奖励第" + this._redpacketData.awardRedCount + "次，奖励金额" + a + "元，总金额" + this._redpacketData.moneyNum);
            return a;
        };
        //#region 存储
        PfuRedPacketManager.prototype.Load = function () {
            var json = PFU.LocalSaveUtils.GetJsonObject(PfuRedPacketManager.PFURED_PACKET_DATA_NAME);
            if (json != null && json != undefined) {
                this._redpacketData = json;
            }
            else {
                this._redpacketData = new PfuRedPacketData();
                this._redpacketData.moneyNum = 0;
                this._redpacketData.dayCount = 0;
                this._redpacketData.lastDayTime = 0;
            }
            return this._redpacketData;
        };
        PfuRedPacketManager.prototype.Save = function () {
            PFU.LocalSaveUtils.SaveJsonObject(PfuRedPacketManager.PFURED_PACKET_DATA_NAME, this._redpacketData);
        };
        return PfuRedPacketManager;
    }());
    PfuRedPacketManager.MONEY_MAX = 20;
    PfuRedPacketManager.DAY_COUNT = 7;
    //19.8 = 9.2 + 10.78
    PfuRedPacketManager.moneyList = [1.15, 1.3, 0.8, 0.2, 0.35, 0.2, 0.51]; //all 4.51*2 = 9.02
    PfuRedPacketManager.resulet_rmb = 10.78; //剩余10.78元   
    PfuRedPacketManager.redMax = 19.8; //
    PfuRedPacketManager.PFURED_PACKET_DATA_NAME = "pfuredpacketdatra";
    PFU.PfuRedPacketManager = PfuRedPacketManager;
    var PfuRedPacketData = (function () {
        function PfuRedPacketData() {
            this.moneyNum = 0;
            this.dayCount = 0;
            this.lastDayTime = 0;
            this.remaining = 0;
            //剩余奖励池
            this.everydaysurplus = 0;
            //奖励红包次数 影响随机
            this.awardRedCount = 0;
        }
        return PfuRedPacketData;
    }());
    PFU.PfuRedPacketData = PfuRedPacketData;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuRedPacketManager.js.map