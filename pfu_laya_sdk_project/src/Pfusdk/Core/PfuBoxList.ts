namespace PFU {

    class PfuBoxListReq {
        public wxid: string;
        public from: number = -1;


        public getContent(key: string): string {
            let contentJson: string = JSON.stringify(this);
            let content: string = Base64.encode(contentJson);
            let sign: string = md5(content + key);
            let postData = "content=" + content + "&sign=" + sign;
            return postData;
        }
    }

    class PfuBoxListResp {
        public adverts: Array<PfuBoxListData> = new Array<PfuBoxListData>();
    }
    export class PfuBoxListData {
        public bannerlink: string;
        public desc: string;
        public gameName: string;
        public jumpId: string;
        public link: string;
        public tags: string;
        public tjId: string;
        public wechatGameid: string;
        public qrcodelink:string;
    }


    export class PfuBoxList {
        private static instance: PfuBoxList;
        public static GetInstance(): PfuBoxList {
            if (!this.instance) {
                this.instance = new PfuBoxList();
            }
            return this.instance;
        }

        public static readonly OL_BOX_LIST: string = "https://wxhz.jfydgame.com/jfyd_advert_wechat/wxbox";

        private _resp: PfuBoxListResp = new PfuBoxListResp();
        private _wechatId;

        public Connect(wechatgameid: string, callBack: Function) {
            let contentData: PfuBoxListReq = new PfuBoxListReq();
            contentData.wxid = wechatgameid;
            this._wechatId = wechatgameid;

            let xhr: Laya.HttpRequest = new Laya.HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, (e: any) => {
                let data = JSON.parse(Base64.decode(e));
                this.preaseData(data);
                callBack(PfuSdk.SUCCESS);
            });
            xhr.once(Laya.Event.ERROR, this, (data: any) => {
                //error
                callBack(PfuSdk.FAIL);
            });
            xhr.on(Laya.Event.PROGRESS, this, () => {
                //PROGRESS
            });

            let url = PfuBoxList.OL_BOX_LIST + "?" + contentData.getContent(PfuManager.OL_KEY);
            //console.log(url);
            xhr.send(url, "", "get", "text");
        }

        private preaseData(data: any) {

            if (data.code == PfuRespState.succeed) {
                this._resp.adverts = data.adverts;
            }
            else {
                console.log("erro:" + data.code);
            }
        }

        public GetAdverts(): Array<PfuBoxListData> {

            let arr = new Array<PfuBoxListData>();
            for (let i = 0; i < this._resp.adverts.length; i++) {
                let data: PfuBoxListData = this._resp.adverts[i];
                if (this.IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                    arr.push(data);
                }
            }
            return arr;
        }

        public GetMoreGameListData(): Array<PfuBoxListData> {
            let arr = new Array<PfuBoxListData>();
            for (let i = 0; i < this._resp.adverts.length; i++) {
                let data: PfuBoxListData = this._resp.adverts[i];
                if (data.wechatGameid == this._wechatId) {
                    continue;
                }

                if (PfuConfig.Config.ui_crossGameListType == 0)  {
                    if (this.IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                        arr.push(data);
                    }
                }
                else
                {
                    arr.push(data);
                }
            }
            return arr;
        }

        public IsMoreGameDataBeAppIdList(wxChatId: string) {

            if(wxChatId == undefined || wxChatId == "")
            {
                return false;
            }

            for (let i = 0; i < PfuConfig.Config.navigateToMiniAppId.length; i++) {
                let appId = PfuConfig.Config.navigateToMiniAppId[i];
                if (appId == wxChatId) {
                    return true;
                }
            }
            return false;
        }

    }
}