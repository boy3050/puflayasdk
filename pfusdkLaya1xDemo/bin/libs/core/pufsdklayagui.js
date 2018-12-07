var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var SceneMatchingLayaUtils = function() {
            function SceneMatchingLayaUtils() {}
            SceneMatchingLayaUtils.GetLogicOffsetH = function() {
                var r = SceneMatchingLayaUtils.WIDTH / SceneMatchingLayaUtils.DESIGN_WIDTH;
                var offset_h = (SceneMatchingLayaUtils.HEIGTH - SceneMatchingLayaUtils.DESIGN_HEIGHT * r) / 2 / r;
                return offset_h;
            };
            SceneMatchingLayaUtils.GetLogicSceneBottom = function() {
                var offset_h = SceneMatchingLayaUtils.GetLogicOffsetH();
                var bottom = SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 + SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 + offset_h;
                return bottom;
            };
            SceneMatchingLayaUtils.GetLogicSceneTop = function() {
                var offset_h = SceneMatchingLayaUtils.GetLogicOffsetH();
                var top = SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 - SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 - offset_h;
                return top;
            };
            SceneMatchingLayaUtils.SetAlignTop = function(com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) return;
                var add = laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436 ? 60 : 0;
                com.y = SceneMatchingLayaUtils.GetLogicSceneTop() + add + com.y;
            };
            SceneMatchingLayaUtils.SetAlignBottom = function(com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) return;
                var off = SceneMatchingLayaUtils.DESIGN_HEIGHT - com.y;
                if (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) {
                    off += 64;
                }
                com.y = SceneMatchingLayaUtils.GetLogicSceneBottom() - off;
            };
            return SceneMatchingLayaUtils;
        }();
        SceneMatchingLayaUtils.DESIGN_WIDTH = 750;
        SceneMatchingLayaUtils.DESIGN_HEIGHT = 1334;
        UI.SceneMatchingLayaUtils = SceneMatchingLayaUtils;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var PfuSdkLayaUI = function() {
            function PfuSdkLayaUI() {}
            PfuSdkLayaUI.CreateUI = function() {
                this.LoadUIData();
                UI.SceneMatchingLayaUtils.WIDTH = laya.utils.Browser.width;
                UI.SceneMatchingLayaUtils.HEIGTH = laya.utils.Browser.height;
            };
            PfuSdkLayaUI.LoadUIData = function() {
                Laya.loader.load("PfusdkRes/UI/layaui/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
            };
            PfuSdkLayaUI.CreateUIWindow = function() {
                var _this = this;
                this.moregameUI = new PFU.UI.MoreGameUI();
                Laya.stage.addChild(this.moregameUI);
                this.moregameUI.OnHide();
                this.bannerUI = new PFU.UI.UI_PfuBannerUI();
                Laya.stage.addChild(this.bannerUI);
                this.boxWindowUI = new PFU.UI.FirstSceneBoxUI();
                Laya.stage.addChild(this.boxWindowUI);
                PFU.PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, function(isShow) {
                    if (isShow) {
                        _this.moregameUI.OnShow();
                    } else {
                        _this.moregameUI.OnHide();
                    }
                });
            };
            return PfuSdkLayaUI;
        }();
        UI.PfuSdkLayaUI = PfuSdkLayaUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var View = laya.ui.View;

var Dialog = laya.ui.Dialog;

var ui;

(function(ui) {
    var BannerUIUI = function(_super) {
        __extends(BannerUIUI, _super);
        function BannerUIUI() {
            return _super.call(this) || this;
        }
        BannerUIUI.prototype.createChildren = function() {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BannerUIUI.uiView);
        };
        return BannerUIUI;
    }(View);
    BannerUIUI.uiView = {
        type: "View",
        props: {
            width: 750,
            height: 1334
        },
        child: [ {
            type: "Button",
            props: {
                width: 750,
                var: "img_icon",
                skin: "comp/Img_bg_2.png",
                height: 210,
                bottom: 0
            }
        } ]
    };
    ui.BannerUIUI = BannerUIUI;
})(ui || (ui = {}));

(function(ui) {
    var BoxWindowUI = function(_super) {
        __extends(BoxWindowUI, _super);
        function BoxWindowUI() {
            return _super.call(this) || this;
        }
        BoxWindowUI.prototype.createChildren = function() {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.BoxWindowUI.uiView);
        };
        return BoxWindowUI;
    }(View);
    BoxWindowUI.uiView = {
        type: "View",
        props: {
            width: 750,
            height: 1334
        },
        child: [ {
            type: "Image",
            props: {
                x: 0,
                width: 750,
                top: 0,
                skin: "comp/Img_bg_1.png",
                height: 1334,
                bottom: 0
            }
        }, {
            type: "Image",
            props: {
                x: 0,
                width: 750,
                top: 0,
                skin: "comp/Img_bg_2.png",
                height: 163
            }
        }, {
            type: "Button",
            props: {
                width: 750,
                var: "Img_title",
                top: 116,
                stateNum: 1,
                name: "Img_title",
                height: 319
            }
        }, {
            type: "Text",
            props: {
                y: 22,
                x: 284,
                width: 199,
                text: "5588游戏",
                height: 48,
                fontSize: 45,
                font: "Microsoft YaHei",
                color: "#000000",
                bold: true
            }
        }, {
            type: "Button",
            props: {
                y: 22,
                x: 36,
                width: 61,
                var: "closeBtn",
                stateNum: 1,
                skin: "comp/Btn_xclose.png",
                height: 57
            }
        }, {
            type: "List",
            props: {
                x: 0,
                width: 750,
                var: "boxlist",
                top: 417,
                spaceY: 3,
                height: 887
            },
            child: [ {
                type: "Box",
                props: {
                    width: 750,
                    var: "boxitem",
                    renderType: "render",
                    height: 175
                },
                child: [ {
                    type: "Image",
                    props: {
                        y: 5,
                        x: 0,
                        width: 750,
                        skin: "comp/Img_bg_2.png",
                        height: 175
                    }
                }, {
                    type: "Image",
                    props: {
                        y: 37,
                        x: 28,
                        width: 120,
                        skin: "comp/Img_bg_2.png",
                        name: "img_icon",
                        height: 120
                    }
                }, {
                    type: "Button",
                    props: {
                        width: 177,
                        top: 54,
                        stateNum: 1,
                        skin: "comp/anniu_1.png",
                        right: 32,
                        height: 84
                    },
                    child: [ {
                        type: "Label",
                        props: {
                            y: 22,
                            x: 52,
                            text: "开始",
                            fontSize: 33,
                            font: "Microsoft YaHei",
                            color: "#792900",
                            bold: true
                        }
                    } ]
                }, {
                    type: "Label",
                    props: {
                        y: 27,
                        x: 184,
                        width: 163,
                        text: "小猪跑酷",
                        name: "txt_name",
                        height: 42,
                        fontSize: 31,
                        font: "Microsoft YaHei",
                        color: "#000000",
                        bold: true
                    }
                }, {
                    type: "Label",
                    props: {
                        y: 79,
                        x: 181,
                        wordWrap: true,
                        width: 351,
                        text: "ss",
                        name: "txt_desc",
                        height: 76,
                        fontSize: 25,
                        font: "Microsoft YaHei",
                        color: "#000000",
                        bold: false
                    }
                }, {
                    type: "Label",
                    props: {
                        y: 32,
                        wordWrap: true,
                        width: 95,
                        text: "5000万",
                        right: 282,
                        name: "txt_num",
                        height: 40,
                        fontSize: 23,
                        font: "Microsoft YaHei",
                        color: "#f80400",
                        bold: false,
                        align: "right"
                    }
                }, {
                    type: "Label",
                    props: {
                        y: 32,
                        wordWrap: true,
                        width: 183,
                        text: "人在线",
                        right: 101,
                        height: 40,
                        fontSize: 23,
                        font: "Microsoft YaHei",
                        color: "#000000",
                        bold: false,
                        align: "left"
                    }
                } ]
            } ]
        } ]
    };
    ui.BoxWindowUI = BoxWindowUI;
})(ui || (ui = {}));

(function(ui) {
    var MoreGameUIUI = function(_super) {
        __extends(MoreGameUIUI, _super);
        function MoreGameUIUI() {
            return _super.call(this) || this;
        }
        MoreGameUIUI.prototype.createChildren = function() {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MoreGameUIUI.uiView);
        };
        return MoreGameUIUI;
    }(View);
    MoreGameUIUI.uiView = {
        type: "View",
        props: {
            width: 750,
            height: 1334
        },
        child: [ {
            type: "Button",
            props: {
                width: 177,
                var: "btn_left",
                top: 567,
                stateNum: 1,
                left: 7,
                height: 84
            }
        }, {
            type: "Button",
            props: {
                width: 177,
                var: "btn_right",
                top: 567,
                stateNum: 1,
                right: 40,
                height: 84,
                anchorX: 1
            }
        }, {
            type: "Image",
            props: {
                width: 113,
                var: "img_title",
                top: 1117,
                skin: "comp/Img_hy.png",
                right: 325,
                height: 25
            }
        }, {
            type: "List",
            props: {
                y: 1160,
                width: 750,
                var: "boxlist",
                spaceX: 1,
                repeatY: 1
            },
            child: [ {
                type: "Image",
                props: {
                    y: 5,
                    x: 24,
                    width: 710,
                    skin: "comp/Img_zjmdt.png",
                    right: 16,
                    height: 164,
                    bottom: 13
                }
            }, {
                type: "Box",
                props: {
                    width: 130,
                    var: "boxitem",
                    renderType: "render",
                    height: 130
                },
                child: [ {
                    type: "Image",
                    props: {
                        width: 130,
                        skin: "comp/Img_bg_2.png",
                        name: "img_icon",
                        height: 130
                    }
                }, {
                    type: "Sprite",
                    props: {
                        y: 65,
                        x: 65,
                        width: 0,
                        renderType: "mask",
                        height: 0
                    },
                    child: [ {
                        type: "Circle",
                        props: {
                            radius: 60,
                            lineWidth: 1,
                            fillColor: "#ff0000"
                        }
                    } ]
                } ]
            } ]
        } ]
    };
    ui.MoreGameUIUI = MoreGameUIUI;
})(ui || (ui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var FirstSceneBoxUI = function(_super) {
            __extends(FirstSceneBoxUI, _super);
            function FirstSceneBoxUI() {
                var _this = _super.call(this) || this;
                _this._bannerGame = new Array();
                _this.visible = false;
                _this.CheckShow();
                Laya.timer.loop(200, _this, _this.CheckShow);
                PfuSdk.HideBanner();
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.OnCloseUI);
                _this.CreateList();
                return _this;
            }
            FirstSceneBoxUI.prototype.OnCloseUI = function() {
                Laya.stage.removeChild(this);
                Laya.timer.clearAll(this);
            };
            FirstSceneBoxUI.prototype.CheckShow = function() {
                if (PfuSdk.GetParamComplete && PfuSdk.GetBoxListComplete) {
                    if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PFU.PfuGlobal.GetOLParam().pfuSdkShowOpenAds == 2) {
                        this.CreateList();
                    } else {
                        this.OnCloseUI();
                    }
                    Laya.timer.clear(this, this.CheckShow);
                }
            };
            FirstSceneBoxUI.prototype.CreateList = function() {
                var arrList = PFU.PfuBoxList.GetInstance().GetAdverts();
                for (var i = 0; i < arrList.length; i++) {
                    var b = arrList[i];
                    if (b.bannerlink && b.bannerlink != "") {
                        this._bannerGame.push(b);
                    }
                }
                for (var i = 0; i < this._bannerGame.length; i++) {
                    this.Img_title.loadImage(this._bannerGame[i].bannerlink);
                    this.Img_title.on(Laya.Event.CLICK, this, this.OnClickItem1, [ this._bannerGame[i] ]);
                    break;
                }
                var data;
                this.allgame = [];
                this.boxlist.vScrollBarSkin = "";
                this.boxlist.mouseHandler = new Laya.Handler(this, this.OnClickItem);
                this.boxlist.scrollBar.elasticBackTime = 200;
                this.boxlist.scrollBar.elasticDistance = 50;
                for (var i = 0; i < arrList.length; i++) {
                    data = arrList[i];
                    var min = (i == 0 ? 30 : 0) + (arrList.length - i) * 2;
                    var max = (i == 0 ? 30 : 10) + (arrList.length - i) * 8;
                    var num = PFU.BXRandom.Get().nextInt(min, max) + "万";
                    this.allgame.push({
                        img_icon: data.link,
                        txt_name: data.gameName,
                        txt_desc: data.desc,
                        txt_num: num,
                        data: data
                    });
                }
                this.boxlist.array = this.allgame;
                this.visible = true;
            };
            FirstSceneBoxUI.prototype.OnClickItem1 = function(data) {
                console.error("==");
                if (data.wechatGameid == PFU.PfuConfig.Config.weChatId) {
                    this.OnCloseUI();
                    return;
                }
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function() {});
            };
            FirstSceneBoxUI.prototype.OnClickItem = function(e, index) {
                if (e.type == Laya.Event.CLICK) {
                    if (this.allgame[index].data.wechatGameid == PFU.PfuConfig.Config.weChatId) {
                        this.OnCloseUI();
                        return;
                    }
                    PFU.PfuManager.GetInstance().ShowCrossGameImage(this.allgame[index].data, this, function() {});
                }
            };
            return FirstSceneBoxUI;
        }(ui.BoxWindowUI);
        UI.FirstSceneBoxUI = FirstSceneBoxUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var MoreGameUI = function(_super) {
            __extends(MoreGameUI, _super);
            function MoreGameUI() {
                var _this = _super.call(this) || this;
                _this._isCreateSideMoreGameBtn = false;
                _this._isCreateMoreGameListBar = false;
                _this.isMoveLeft = true;
                _this.isDrag = false;
                _this.posx = 0;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                UI.SceneMatchingLayaUtils.SetAlignBottom(_this.boxlist);
                return _this;
            }
            MoreGameUI.prototype.OnUpdate = function() {
                if (!this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete) {
                    this.CreateSideMoreGameBtn();
                    this._isCreateSideMoreGameBtn = true;
                }
                if (!this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
                    if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                        this.CreateMoreGameList();
                    }
                    this._isCreateMoreGameListBar = true;
                }
                if (this._isCreateMoreGameListBar) {
                    this.UpdateMoreGameListMove();
                }
            };
            MoreGameUI.prototype.OnHide = function() {
                this.visible = false;
                Laya.timer.clearAll(this);
            };
            MoreGameUI.prototype.OnShow = function() {
                this.visible = true;
                Laya.timer.frameLoop(1, this, this.OnUpdate);
            };
            MoreGameUI.prototype.CreateSideMoreGameBtn = function() {
                var _this = this;
                this.btn_left.on(Laya.Event.CLICK, this, this.ClickMoreGame, [ true ]);
                this.btn_right.on(Laya.Event.CLICK, this, this.ClickMoreGame, [ false ]);
                this.RefreshMoreGameIcon();
                PFU.PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, function() {
                    _this.RefreshMoreGameIcon();
                });
                if (PFU.PfuConfig.Config.ui_moreGameType == 1) {
                    this.btn_right.visible = false;
                } else if (PFU.PfuConfig.Config.ui_moreGameType == 2) {
                    this.btn_left.visible = false;
                }
                if (PFU.PfuConfig.Config.ui_crossGameListType == -1) {
                    this.boxlist.visible = false;
                }
                if (PFU.PfuGlobal.GetOLParam().pfuSdkMoreGame == PFU.PfuSwitch.OFF || PFU.PfuConfig.Config.ui_moreGameType == -1) {
                    this.btn_left.visible = false;
                    this.btn_right.visible = false;
                    this.boxlist.visible = false;
                }
            };
            MoreGameUI.prototype.RefreshMoreGameIcon = function() {
                if (PFU.PfuConfig.Config.ui_moreGameType == -1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 2) {
                    this.btn_left.loadImage(PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true));
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 1) {
                    this.btn_right.loadImage(PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false));
                }
            };
            MoreGameUI.prototype.ClickMoreGame = function(isLeft) {
                PFU.PfuMoreGameUpdate.GetInstance().ShowMoreGame(isLeft, this, function(url) {});
            };
            MoreGameUI.prototype.CreateMoreGameList = function() {
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                    this.img_title.visible = true;
                }
                this.allgame = [];
                var boxListData;
                this.boxlist.hScrollBarSkin = "";
                this.boxlist.scrollBar.min = 0;
                this.boxlist.scrollBar.max = 300;
                this.boxlist.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
                this.boxlist.scrollBar.elasticBackTime = 200;
                this.boxlist.scrollBar.elasticDistance = 50;
                for (var i = 0; i < count; i++) {
                    boxListData = list[i];
                    this.allgame.push({
                        img_icon: boxListData.link,
                        boxListData: boxListData
                    });
                    this.boxlist.array = this.allgame;
                }
            };
            MoreGameUI.prototype.OnClickMoreGameListItem = function(e, index) {
                if (e.type == Laya.Event.CLICK) {
                    PFU.PfuManager.GetInstance().ShowCrossGameImage(this.allgame[index].boxListData, this, function() {});
                }
                if (e.type == Laya.Event.MOUSE_DOWN) {
                    this.isDrag = true;
                } else if (e.type == Laya.Event.MOUSE_UP || e.type == Laya.Event.MOUSE_OVER) {
                    this.posx = this.boxlist.scrollBar.value;
                    this.isDrag = false;
                }
            };
            MoreGameUI.prototype.UpdateMoreGameListMove = function() {
                if (this.isDrag) return;
                var dir = this.isMoveLeft ? 1 : -1;
                this.posx += 20 * .016 * dir;
                if (this.posx >= 300) {
                    this.posx = 300;
                    this.isMoveLeft = false;
                } else if (this.posx < 0) {
                    this.posx = 0;
                    this.isMoveLeft = true;
                }
                this.boxlist.scrollBar.value = this.posx;
            };
            return MoreGameUI;
        }(ui.MoreGameUIUI);
        UI.MoreGameUI = MoreGameUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var UI_PfuBannerUI = function(_super) {
            __extends(UI_PfuBannerUI, _super);
            function UI_PfuBannerUI() {
                var _this = _super.call(this) || this;
                _this._isCreatePfuBanner = false;
                _this.img_icon.on(Laya.Event.CLICK, _this, _this.ClickPfuBanner);
                _this.visible = false;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                UI.SceneMatchingLayaUtils.SetAlignBottom(_this.img_icon);
                return _this;
            }
            UI_PfuBannerUI.prototype.OnUpdate = function() {
                if (!this._isCreatePfuBanner && PfuSdk.GetParamComplete) {
                    this.CreatePfuBanner();
                    this._isCreatePfuBanner = true;
                }
            };
            UI_PfuBannerUI.prototype.Show = function() {
                Laya.stage.addChild(this);
            };
            UI_PfuBannerUI.prototype.Hide = function() {
                Laya.stage.removeChild(this);
                Laya.timer.clearAll(this);
            };
            UI_PfuBannerUI.prototype.CreatePfuBanner = function() {
                var _this = this;
                console.log("banner:" + PFU.PfuGlobal.GetOLParam().ad_banner);
                if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PFU.PfuGlobal.GetOLParam().ad_banner == PFU.PfuSwitch.OFF && PFU.PfuBannerUpdate.GetInstance().IsBeBannerImg()) {
                    this.visible = true;
                    PFU.PfuBannerUpdate.GetInstance().SetRefreshHandle(this, this.RefreshHandle, function(isShow) {
                        if (isShow) {
                            _this.visible = true;
                        } else {
                            _this.visible = false;
                        }
                    });
                } else {
                    this.visible = false;
                }
            };
            UI_PfuBannerUI.prototype.RefreshHandle = function() {
                this.img_icon.skin = PFU.PfuBannerUpdate.GetInstance().GetPfuBannerImgUrl();
            };
            UI_PfuBannerUI.prototype.ClickPfuBanner = function() {
                PFU.PfuBannerUpdate.GetInstance().ClickPfuBanner();
            };
            return UI_PfuBannerUI;
        }(ui.BannerUIUI);
        UI.UI_PfuBannerUI = UI_PfuBannerUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));