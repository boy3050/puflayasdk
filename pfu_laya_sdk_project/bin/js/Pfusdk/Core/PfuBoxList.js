var PFU;
(function (PFU) {
    var PfuBoxListReq = (function () {
        function PfuBoxListReq() {
            this.from = -1;
        }
        PfuBoxListReq.prototype.getContent = function (key) {
            var contentJson = JSON.stringify(this);
            var content = Base64.encode(contentJson);
            var sign = md5(content + key);
            var postData = "content=" + content + "&sign=" + sign;
            return postData;
        };
        return PfuBoxListReq;
    }());
    var PfuBoxListResp = (function () {
        function PfuBoxListResp() {
            this.adverts = new Array();
        }
        return PfuBoxListResp;
    }());
    var PfuBoxListData = (function () {
        function PfuBoxListData() {
        }
        return PfuBoxListData;
    }());
    PFU.PfuBoxListData = PfuBoxListData;
    var PfuBoxList = (function () {
        function PfuBoxList() {
            this._resp = new PfuBoxListResp();
        }
        PfuBoxList.GetInstance = function () {
            if (!this.instance) {
                this.instance = new PfuBoxList();
            }
            return this.instance;
        };
        PfuBoxList.prototype.Connect = function (wechatgameid, callBack) {
            var _this = this;
            var contentData = new PfuBoxListReq();
            contentData.wxid = wechatgameid;
            this._wechatId = wechatgameid;
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (e) {
                var data = JSON.parse(Base64.decode(e));
                _this.preaseData(data);
                callBack(PfuSdk.SUCCESS);
            });
            xhr.once(Laya.Event.ERROR, this, function (data) {
                //error
                callBack(PfuSdk.FAIL);
            });
            xhr.on(Laya.Event.PROGRESS, this, function () {
                //PROGRESS
            });
            var url = PfuBoxList.OL_BOX_LIST + "?" + contentData.getContent(PFU.PfuManager.OL_KEY);
            //console.log(url);
            xhr.send(url, "", "get", "text");
        };
        PfuBoxList.prototype.preaseData = function (data) {
            if (data.code == PFU.PfuRespState.succeed) {
                this._resp.adverts = data.adverts;
            }
            else {
                console.log("erro:" + data.code);
            }
        };
        PfuBoxList.prototype.GetAdverts = function () {
            var arr = new Array();
            for (var i = 0; i < this._resp.adverts.length; i++) {
                var data = this._resp.adverts[i];
                if (this.IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                    arr.push(data);
                }
            }
            return arr;
        };
        PfuBoxList.prototype.GetMoreGameListData = function () {
            var arr = new Array();
            for (var i = 0; i < this._resp.adverts.length; i++) {
                var data = this._resp.adverts[i];
                if (data.wechatGameid == this._wechatId) {
                    continue;
                }
                if (PFU.PfuConfig.Config.ui_crossGameListType == 0) {
                    if (this.IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                        arr.push(data);
                    }
                }
                else {
                    arr.push(data);
                }
            }
            return arr;
        };
        PfuBoxList.prototype.IsMoreGameDataBeAppIdList = function (wxChatId) {
            if (wxChatId == undefined || wxChatId == "") {
                return false;
            }
            for (var i = 0; i < PFU.PfuConfig.Config.navigateToMiniProgramAppIdList.length; i++) {
                var appId = PFU.PfuConfig.Config.navigateToMiniProgramAppIdList[i];
                if (appId == wxChatId) {
                    return true;
                }
            }
            return false;
        };
        return PfuBoxList;
    }());
    PfuBoxList.OL_BOX_LIST = "https://wxhz.jfydgame.com/jfyd_advert_wechat/wxbox";
    PFU.PfuBoxList = PfuBoxList;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuBoxList.js.map