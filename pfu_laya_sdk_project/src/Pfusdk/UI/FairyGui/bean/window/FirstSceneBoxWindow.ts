namespace PFU.UI {
    //显示盒子列表，是根据在线参数是否开启来决定，用户不能主动调用，
    //但可以主动关闭

    export class FirstSceneBoxWindow extends WindowBase {
        protected _fui: pfusdkui.UI_BoxListUI;
        private _bannerGame: Array<PfuBoxListData> = new Array<PfuBoxListData>();

        public InitWindow(fui: fairygui.GComponent) {
            this._fui = fui as pfusdkui.UI_BoxListUI;
            super.InitWindow(fui);
        }
        protected OnStart() {
            this._fui.visible = false;
            this.CheckShow();
            Laya.timer.loop(200, this, this.CheckShow);
            PfuSdk.HideBanner();
        }
        

        protected OnUpdate() {

        }

        private CheckShow() {
            //检查盒子列表参数 和 在线参数 是否准备完毕
            if (PfuSdk.GetParamComplete && PfuSdk.GetBoxListComplete) {
                //pfuSdkShowOpenAds = 2 开启盒子列表
                if(!PFU.PfuManager.GetInstance().IsWegameTestMode() &&  PfuGlobal.GetOLParam().pfuSdkShowOpenAds == 2)
                {
                    this.CreateList();
                }
                else
                {
                    this.Hide();
                }
                //无论是否开启 都停止检测
                Laya.timer.clear(this, this.CheckShow);
            }
        }

        private CreateList() {
            this._fui.m_Btn_close.onClick(this, this.OnClickClose);

            //列表项数据检查
            let arrList: Array<PfuBoxListData> = PfuBoxList.GetInstance().GetAdverts();
            for (let i = 0; i < arrList.length; i++) {
                let b: PfuBoxListData = arrList[i];
                if (b.bannerlink && b.bannerlink != "") {
                    this._bannerGame.push(b);
                }
            }

            //fairyUI title图片
            for (let i = 0; i < this._bannerGame.length; i++) {
                let vo: pfusdkui.UI_BannerImg = this._fui.m_Img_banner.addItemFromPool(pfusdkui.UI_BannerImg.URL) as pfusdkui.UI_BannerImg;
                vo.m_icon.icon = this._bannerGame[i].bannerlink;
                //vo.data = this._bannerGame[i];
                vo.onClick(this, this.OnClickItem, [this._bannerGame[i]]);
            }

            //fairyUI 创建列表
            for (let i = 0; i < arrList.length; i++) {
                let vo: pfusdkui.UI_List_Child = this._fui.m_List_game.addItemFromPool(pfusdkui.UI_List_Child.URL) as pfusdkui.UI_List_Child;
                let data: PfuBoxListData = arrList[i];
                vo.m_icon.icon = data.link;
                vo.m_Text_name.text = data.gameName;
                vo.m_Text_message.text = data.desc;
                let min = ((i == 0) ? 30 : 0) + (arrList.length - i) * 2;
                let max = ((i == 0) ? 30 : 10) + (arrList.length - i) * 8;
                vo.m_Text_name2.text = PFU.BXRandom.Get().nextInt(min, max) + "万";
                vo.m_btn_start.onClick(this, this.OnClickItem, [data]);
            }
            this._fui.visible = true;
        }

        private OnClickClose()  {
            //PfuSdk.ShowBanner();
            this.Hide();
        }

        private OnClickItem(data: PfuBoxListData, itemObject: fairygui.GObject)  {

            //点击跳转事件
            if (data.wechatGameid == PfuConfig.Config.weChatId)  {
                this.OnClickClose();
                return;
            }

            PFU.PfuManager.GetInstance().ShowCrossGameImage(data,this, () => { });

        }
    }
}