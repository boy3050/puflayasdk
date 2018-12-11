namespace PFU {
    export class PfuMoreGameUpdate {
        private static instance: PfuMoreGameUpdate;
        public static GetInstance(): PfuMoreGameUpdate {
            if (!this.instance) {
                this.instance = new PfuMoreGameUpdate();
            }
            return this.instance;
        }


        public _isCreateWindow = false;
        //最后一次操作
        public _isLastCtrAction = false;
        //最后一次操作是显示还是隐藏
        public _isLastShow = true;
        //moregameType 
        private _showMoreGameType: number;

        private _indexLeft: number = 0;
        private _indexRight: number = 0;

        private _changeMoreGameHandle: any;
        private _changeMoreGameFun: Function;
        //设置moreGameUI层级动作
        public isSetLayerAction = false;
        //设置moreGameUI层级数值
        public layerNum = 0;

        public isSetMoreGameOffsetY = false;
        public moreGameOffsetY = 0;

        constructor() {
            this._indexLeft = 0;
            this._indexRight = 0;
            Laya.timer.loop(10000, this, this.UpdateMoreGame);

            Laya.timer.loop(200, this, this.CheckAction);
        }

        public SetChangeHandle(handle, fun: Function) {
            this._changeMoreGameHandle = handle;
            this._changeMoreGameFun = fun;
        }

        private UpdateMoreGame() {
            this._indexLeft++;
            if (this._indexLeft >= PfuManager.GetInstance().GetMoreGameCount(true)) {
                this._indexLeft = 0;
            }
            this._indexRight++;
            if (this._indexRight >= PfuManager.GetInstance().GetMoreGameCount(false)) {
                this._indexRight = 0;
            }
            if (this._changeMoreGameHandle != null) {
                this._changeMoreGameFun.call(this._changeMoreGameHandle);
            }
        }
        public ShowMoreGame(isLeft: boolean, callServer: any, fun: Function) {
            PfuManager.GetInstance().ShowMoreGameImage(isLeft, isLeft ? this._indexLeft : this._indexRight, callServer, fun);
        }

        public GetMoreGameIconUrl(isLeft: boolean): string {
            if (isLeft)
                return PfuManager.GetInstance().GetMoreGameLeftIconUrl(this._indexLeft);
            else
                return PfuManager.GetInstance().GetMoreGameRightIconUrl(this._indexRight);
        }



        private moreGameHandle: any;
        private moreGameFun: Function;

        /**
         * 
         * @param handle 
         * @param fun 
         */
        public SetCtrlMoreGameUI(handle: any, fun: Function) {
            this.moreGameHandle = handle;
            this.moreGameFun = fun;
            this._isCreateWindow = true;
        }

        /**
         * 
         */
        private ShowMoreGameUI() {
            if (this.moreGameHandle) {
                this.moreGameFun.call(this.moreGameHandle, true, this._showMoreGameType);
            }
        }

        /**
         * 
         */
        public HideMoreGameUI() {
            if (this.moreGameHandle) {
                this.moreGameFun.call(this.moreGameHandle, false, this._showMoreGameType);
            }
        }

        public CallShowMoreGameUI(type?: number) {
            this._isLastCtrAction = true;
            this._isLastShow = true;
            this._showMoreGameType = type;
        }

        /**
         * 
         */
        public CallHideMoreGameUI() {
            this._isLastCtrAction = true;
            this._isLastShow = false;
        }


        private CheckAction() {
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
            }
        }

        public SetMoreGameUILayer(layernum: number)  {
            this.isSetLayerAction = true;
            this.layerNum = layernum;
        }

        public EndSetMoreGameUI()  {
            this.isSetLayerAction = false;
        }

        public SetMoreGameUIOffsetY(offsetY: number)  {
            this.isSetMoreGameOffsetY = true;
            this.moreGameOffsetY = offsetY;
        }

        public EndMoreGameUIOffsetY()
        {
            this.isSetMoreGameOffsetY = false;
        }
    }
}