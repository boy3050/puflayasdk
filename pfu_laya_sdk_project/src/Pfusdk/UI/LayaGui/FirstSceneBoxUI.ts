namespace PFU.UI {
    //显示盒子列表，是根据在线参数是否开启来决定，用户不能主动调用，
    //但可以主动关闭

    export class FirstSceneBoxUI extends ui.BoxWindowUI {
        private allgame: Array<any>;
        constructor() {
            super();
            this.visible = false;

            this.CheckShow();
            Laya.timer.loop(200, this, this.CheckShow);
            PfuSdk.HideBanner();
            this.closeBtn.on(Laya.Event.CLICK, this, this.OnCloseUI);
            this.zOrder = PfuSdk.UI_FIRST_SCENEBOX;
            Laya.stage.updateZOrder();
        }
        private OnCloseUI(): void {
            Laya.stage.removeChild(this);
            Laya.timer.clearAll(this);
        }


        private _bannerGame: Array<PfuBoxListData> = new Array<PfuBoxListData>();
        private CheckShow() {
            //检查盒子列表参数 和 在线参数 是否准备完毕
            if (PfuSdk.GetParamComplete && PfuSdk.GetBoxListComplete) {
                //kaiping = 2 开启盒子列表
                if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PfuGlobal.GetOLParam().pfuSdkShowOpenAds == 2) {
                    this.CreateList();
                }
                else {
                    this.OnCloseUI();
                }
                //无论是否开启 都停止检测
                Laya.timer.clear(this, this.CheckShow);
            }
        }

        private CreateList() {
            //列表项数据检查
            let arrList: Array<PfuBoxListData> = PfuBoxList.GetInstance().GetAdverts();
            for (let i = 0; i < arrList.length; i++) {
                let b: PfuBoxListData = arrList[i];
                if (b.bannerlink && b.bannerlink != "") {
                    this._bannerGame.push(b);
                }
            }

            // title图片
            for (let i = 0; i < this._bannerGame.length; i++) {
                this.Img_title.loadImage(this._bannerGame[i].bannerlink)
                // let title = this.getChildByName("Img_title") as Laya.Image;
                // title.skin = this._bannerGame[i].bannerlink;
                // this.Img_title.skin = this._bannerGame[i].bannerlink;
                this.Img_title.on(Laya.Event.CLICK, this, this.OnClickItem1, [this._bannerGame[i]]);
                break;
            }

            let data: PfuBoxListData;
            //初始化游戏列表
            this.allgame = [];
            // 使用但隐藏滚动条
            this.boxlist.vScrollBarSkin = "";
            this.boxlist.mouseHandler = new Laya.Handler(this, this.OnClickItem);
            this.boxlist.scrollBar.elasticBackTime = 200;
            this.boxlist.scrollBar.elasticDistance = 50;
            // 创建列表
            for (let i = 0; i < arrList.length; i++) {
                data = arrList[i];
                let min = ((i == 0) ? 30 : 0) + (arrList.length - i) * 2;
                let max = ((i == 0) ? 30 : 10) + (arrList.length - i) * 8;
                let num = PFU.BXRandom.Get().nextInt(min, max) + "万";
                this.allgame.push({
                    img_icon: data.link,
                    txt_name: data.gameName,
                    txt_desc: data.desc,
                    txt_num: num,
                    data,
                });
            }
            this.boxlist.array = this.allgame;
            this.visible = true;


        }
        private OnClickItem1(data: PfuBoxListData) {
            console.error("==")
            //点击跳转事件
            if (data.wechatGameid == PfuConfig.Config.wxId) {
                this.OnCloseUI();
                return;
            }
            PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, () => { });
            //WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, data.wechatGameid, "");
        }
        private OnClickItem(e: Event, index: number) {
            if (e.type == Laya.Event.CLICK) {
                //点击跳转事件
                if (this.allgame[index].data.wechatGameid == PfuConfig.Config.wxId) {
                    this.OnCloseUI();
                    return;
                }
                PFU.PfuManager.GetInstance().ShowCrossGameImage(this.allgame[index].data, this, () => { });
                //WeChatUtils.GetInstance().NavigateToMiniProgram(this, () => { }, this.allgame[index].data.wechatGameid, "");
            }

        }
    }
}