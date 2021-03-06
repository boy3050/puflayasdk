var PFU;
(function (PFU) {
    var PfuMoreGameUpdate = (function () {
        function PfuMoreGameUpdate() {
            this._isCreateWindow = false;
            //最后一次操作
            this._isLastCtrAction = false;
            //最后一次操作是显示还是隐藏
            this._isLastShow = true;
            this._indexLeft = 0;
            this._indexRight = 0;
            //左侧更多游戏
            this._popupListHandle = null;
            this._popupListCallback = null;
            this._isShowPopupAction = false;
            this._showPopupType = false;
            //设置moreGameUI层级动作
            //public isSetLayerAction = false;
            //设置moreGameUI层级数值
            //public layerNum = 0;
            this.isSetMoreGameOffsetY = false;
            this.moreGameOffsetY = 0;
            this._indexLeft = 0;
            this._indexRight = 0;
            Laya.timer.loop(10000, this, this.UpdateMoreGame);
            Laya.timer.loop(200, this, this.CheckAction);
        }
        PfuMoreGameUpdate.GetInstance = function () {
            if (!this.instance) {
                this.instance = new PfuMoreGameUpdate();
            }
            return this.instance;
        };
        PfuMoreGameUpdate.prototype.SetPopupListVisible = function (handle, callback) {
            this._popupListHandle = handle;
            this._popupListCallback = callback;
        };
        PfuMoreGameUpdate.prototype.ShowPopupListGame = function (visible) {
            this._isShowPopupAction = true;
            this._showPopupType = visible;
        };
        PfuMoreGameUpdate.prototype.SetChangeHandle = function (handle, fun) {
            this._changeMoreGameHandle = handle;
            this._changeMoreGameFun = fun;
        };
        PfuMoreGameUpdate.prototype.UpdateMoreGame = function () {
            this._indexLeft++;
            if (this._indexLeft >= PFU.PfuManager.GetInstance().GetMoreGameCount(true)) {
                this._indexLeft = 0;
            }
            this._indexRight++;
            if (this._indexRight >= PFU.PfuManager.GetInstance().GetMoreGameCount(false)) {
                this._indexRight = 0;
            }
            if (this._changeMoreGameHandle != null) {
                this._changeMoreGameFun.call(this._changeMoreGameHandle);
            }
        };
        PfuMoreGameUpdate.prototype.ShowMoreGame = function (isLeft, callServer, fun) {
            PFU.PfuManager.GetInstance().ShowMoreGameImage(isLeft, isLeft ? this._indexLeft : this._indexRight, callServer, fun);
        };
        PfuMoreGameUpdate.prototype.GetMoreGameIconUrl = function (isLeft) {
            if (isLeft)
                return PFU.PfuManager.GetInstance().GetMoreGameLeftIconUrl(this._indexLeft);
            else
                return PFU.PfuManager.GetInstance().GetMoreGameRightIconUrl(this._indexRight);
        };
        /**
         *
         * @param handle
         * @param fun
         */
        PfuMoreGameUpdate.prototype.SetCtrlMoreGameUI = function (handle, fun) {
            this.moreGameHandle = handle;
            this.moreGameFun = fun;
            this._isCreateWindow = true;
        };
        /**
         *
         */
        PfuMoreGameUpdate.prototype.ShowMoreGameUI = function () {
            if (this.moreGameHandle) {
                this.moreGameFun.call(this.moreGameHandle, true, this._showMoreGameType);
            }
        };
        /**
         *
         */
        PfuMoreGameUpdate.prototype.HideMoreGameUI = function () {
            if (this.moreGameHandle) {
                this.moreGameFun.call(this.moreGameHandle, false, this._showMoreGameType);
            }
        };
        PfuMoreGameUpdate.prototype.CallShowMoreGameUI = function (type) {
            this._isLastCtrAction = true;
            this._isLastShow = true;
            this._showMoreGameType = type;
        };
        /**
         *
         */
        PfuMoreGameUpdate.prototype.CallHideMoreGameUI = function () {
            this._isLastCtrAction = true;
            this._isLastShow = false;
        };
        PfuMoreGameUpdate.prototype.CheckAction = function () {
            if (PfuSdk.GetBoxListComplete && PfuSdk.GetParamComplete && this._isCreateWindow) {
                if (this._isLastCtrAction) {
                    if (this._isLastShow) {
                        this.ShowMoreGameUI();
                    }
                    else {
                        this.HideMoreGameUI();
                    }
                    this._isLastCtrAction = false;
                }
                if (this._isShowPopupAction) {
                    if (this._popupListCallback) {
                        this._popupListCallback.call(this._popupListHandle, this._showPopupType);
                    }
                    this._isShowPopupAction = false;
                }
            }
        };
        // public SetMoreGameUILayer(layernum: number) {
        //     this.isSetLayerAction = true;
        //     this.layerNum = layernum;
        // }
        // public EndSetMoreGameUI() {
        //     this.isSetLayerAction = false;
        // }
        PfuMoreGameUpdate.prototype.SetMoreGameUIOffsetY = function (offsetY) {
            this.isSetMoreGameOffsetY = true;
            this.moreGameOffsetY = offsetY;
        };
        PfuMoreGameUpdate.prototype.EndMoreGameUIOffsetY = function () {
            this.isSetMoreGameOffsetY = false;
        };
        return PfuMoreGameUpdate;
    }());
    PFU.PfuMoreGameUpdate = PfuMoreGameUpdate;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuMoreGameUpdate.js.map