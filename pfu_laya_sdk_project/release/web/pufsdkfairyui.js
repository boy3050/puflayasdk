var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var PfuSdkFairyUI = function() {
            function PfuSdkFairyUI() {}
            PfuSdkFairyUI.CreateUI = function() {
                fairygui.UIConfig.packageFileExtension = "bin";
                pfusdkui.pfusdkuiBinder.bindAll();
                Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
                this.LoadUIData();
                UI.SceneMatchingUtils.WIDTH = laya.utils.Browser.width;
                UI.SceneMatchingUtils.HEIGTH = laya.utils.Browser.height;
            };
            PfuSdkFairyUI.LoadUIData = function() {
                var _this = this;
                var fairyG = "@";
                if (Laya.version.charAt(0) == "2") {
                    fairyG = "_";
                }
                Laya.loader.load([ {
                    url: "PfusdkRes/UI/fairygui/pfusdkui.bin",
                    type: Laya.Loader.BUFFER
                }, {
                    url: "PfusdkRes/UI/fairygui/pfusdkui" + fairyG + "atlas0.png",
                    type: Laya.Loader.IMAGE
                } ], Laya.Handler.create(this, function() {
                    fairygui.UIPackage.addPackage("PfusdkRes/UI/fairygui/pfusdkui");
                    _this.CreateUIWindow();
                }));
            };
            PfuSdkFairyUI.CreateUIWindow = function() {
                var moreGameWindow = new PFU.UI.MoreGameWindow();
                moreGameWindow.InitWindow(pfusdkui.UI_MoreGameUI.createInstance());
                moreGameWindow.Hide();
                var bannerWindow = new PFU.UI.PfuBannerWindow();
                bannerWindow.InitWindow(pfusdkui.UI_PfuBannerUI.createInstance());
                var firstSceneBoxWindow = new PFU.UI.FirstSceneBoxWindow();
                firstSceneBoxWindow.InitWindow(pfusdkui.UI_BoxListUI.createInstance());
                PFU.PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, function(isShow, type) {
                    if (isShow) {
                        moreGameWindow.Show(type);
                    } else {
                        moreGameWindow.Hide();
                    }
                });
            };
            return PfuSdkFairyUI;
        }();
        UI.PfuSdkFairyUI = PfuSdkFairyUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var SceneMatchingUtils = function() {
            function SceneMatchingUtils() {}
            SceneMatchingUtils.GetLogicOffsetH = function() {
                var r = SceneMatchingUtils.WIDTH / SceneMatchingUtils.DESIGN_WIDTH;
                var offset_h = (SceneMatchingUtils.HEIGTH - SceneMatchingUtils.DESIGN_HEIGHT * r) / 2 / r;
                return offset_h;
            };
            SceneMatchingUtils.GetLogicSceneBottom = function() {
                var offset_h = SceneMatchingUtils.GetLogicOffsetH();
                var bottom = SceneMatchingUtils.DESIGN_HEIGHT / 2 + SceneMatchingUtils.DESIGN_HEIGHT / 2 + offset_h;
                return bottom;
            };
            SceneMatchingUtils.GetLogicSceneTop = function() {
                var offset_h = SceneMatchingUtils.GetLogicOffsetH();
                var top = SceneMatchingUtils.DESIGN_HEIGHT / 2 - SceneMatchingUtils.DESIGN_HEIGHT / 2 - offset_h;
                return top;
            };
            SceneMatchingUtils.SetAlignTop = function(com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) return;
                var add = laya.utils.Browser.onIOS && SceneMatchingUtils.HEIGTH == 2436 ? 60 : 0;
                com.y = SceneMatchingUtils.GetLogicSceneTop() + add + com.y;
            };
            SceneMatchingUtils.SetAlignBottom = function(com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) return;
                var off = SceneMatchingUtils.DESIGN_HEIGHT - com.y;
                if (laya.utils.Browser.onIOS && SceneMatchingUtils.HEIGTH == 2436) {
                    off += 64;
                } else if (Laya.Browser.onAndroid && PFU.WeChatBannerAd.GetInstance().IsAllSceneOrLiuHaiScene()) {
                    off += 64;
                }
                com.y = SceneMatchingUtils.GetLogicSceneBottom() - off;
            };
            return SceneMatchingUtils;
        }();
        SceneMatchingUtils.DESIGN_WIDTH = 750;
        SceneMatchingUtils.DESIGN_HEIGHT = 1334;
        UI.SceneMatchingUtils = SceneMatchingUtils;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var pfusdkui;

(function(pfusdkui) {
    var pfusdkuiBinder = function() {
        function pfusdkuiBinder() {}
        pfusdkuiBinder.bindAll = function() {
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_PfuBannerUI.URL, pfusdkui.UI_PfuBannerUI);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_BoxListUI.URL, pfusdkui.UI_BoxListUI);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_List_Child.URL, pfusdkui.UI_List_Child);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_BtnEnter.URL, pfusdkui.UI_BtnEnter);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_BtnClose.URL, pfusdkui.UI_BtnClose);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_BannerImg.URL, pfusdkui.UI_BannerImg);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_MoreGameUI.URL, pfusdkui.UI_MoreGameUI);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_BtnMoregame.URL, pfusdkui.UI_BtnMoregame);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_List_GameChild.URL, pfusdkui.UI_List_GameChild);
        };
        return pfusdkuiBinder;
    }();
    pfusdkui.pfusdkuiBinder = pfusdkuiBinder;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_BannerImg = function(_super) {
        __extends(UI_BannerImg, _super);
        function UI_BannerImg() {
            return _super.call(this) || this;
        }
        UI_BannerImg.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "BannerImg");
        };
        UI_BannerImg.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_icon = this.getChildAt(0);
        };
        return UI_BannerImg;
    }(fairygui.GComponent);
    UI_BannerImg.URL = "ui://xcy52l6510sdc9";
    pfusdkui.UI_BannerImg = UI_BannerImg;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_BoxListUI = function(_super) {
        __extends(UI_BoxListUI, _super);
        function UI_BoxListUI() {
            return _super.call(this) || this;
        }
        UI_BoxListUI.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "BoxListUI");
        };
        UI_BoxListUI.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n10 = this.getChildAt(0);
            this.m_n2 = this.getChildAt(1);
            this.m_n1 = this.getChildAt(2);
            this.m_n3 = this.getChildAt(3);
            this.m_List_game = this.getChildAt(4);
            this.m_Btn_close = this.getChildAt(5);
            this.m_Img_banner = this.getChildAt(6);
        };
        return UI_BoxListUI;
    }(fairygui.GComponent);
    UI_BoxListUI.URL = "ui://xcy52l6510sdc1";
    pfusdkui.UI_BoxListUI = UI_BoxListUI;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_BtnClose = function(_super) {
        __extends(UI_BtnClose, _super);
        function UI_BtnClose() {
            return _super.call(this) || this;
        }
        UI_BtnClose.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "BtnClose");
        };
        UI_BtnClose.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getControllerAt(0);
            this.m_anniu_1 = this.getChildAt(0);
            this.m_toSmall = this.getTransitionAt(0);
            this.m_toNormal = this.getTransitionAt(1);
            this.m_tishi = this.getTransitionAt(2);
        };
        return UI_BtnClose;
    }(fairygui.GButton);
    UI_BtnClose.URL = "ui://xcy52l6510sdc7";
    pfusdkui.UI_BtnClose = UI_BtnClose;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_BtnEnter = function(_super) {
        __extends(UI_BtnEnter, _super);
        function UI_BtnEnter() {
            return _super.call(this) || this;
        }
        UI_BtnEnter.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "BtnEnter");
        };
        UI_BtnEnter.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getControllerAt(0);
            this.m_anniu_1 = this.getChildAt(0);
            this.m_title = this.getChildAt(1);
            this.m_toSmall = this.getTransitionAt(0);
            this.m_toNormal = this.getTransitionAt(1);
            this.m_tishi = this.getTransitionAt(2);
        };
        return UI_BtnEnter;
    }(fairygui.GButton);
    UI_BtnEnter.URL = "ui://xcy52l6510sdc5";
    pfusdkui.UI_BtnEnter = UI_BtnEnter;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_BtnMoregame = function(_super) {
        __extends(UI_BtnMoregame, _super);
        function UI_BtnMoregame() {
            return _super.call(this) || this;
        }
        UI_BtnMoregame.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "BtnMoregame");
        };
        UI_BtnMoregame.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getControllerAt(0);
            this.m_icon = this.getChildAt(0);
            this.m_toSmall = this.getTransitionAt(0);
            this.m_toNormal = this.getTransitionAt(1);
        };
        return UI_BtnMoregame;
    }(fairygui.GButton);
    UI_BtnMoregame.URL = "ui://xcy52l6510sdcg";
    pfusdkui.UI_BtnMoregame = UI_BtnMoregame;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_List_Child = function(_super) {
        __extends(UI_List_Child, _super);
        function UI_List_Child() {
            return _super.call(this) || this;
        }
        UI_List_Child.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "List_Child");
        };
        UI_List_Child.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n0 = this.getChildAt(0);
            this.m_n7 = this.getChildAt(1);
            this.m_Text_name = this.getChildAt(2);
            this.m_Text_message = this.getChildAt(3);
            this.m_icon = this.getChildAt(4);
            this.m_1 = this.getChildAt(5);
            this.m_Text_name2 = this.getChildAt(6);
            this.m_btn_start = this.getChildAt(7);
        };
        return UI_List_Child;
    }(fairygui.GComponent);
    UI_List_Child.URL = "ui://xcy52l6510sdc4";
    pfusdkui.UI_List_Child = UI_List_Child;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_List_GameChild = function(_super) {
        __extends(UI_List_GameChild, _super);
        function UI_List_GameChild() {
            return _super.call(this) || this;
        }
        UI_List_GameChild.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "List_GameChild");
        };
        UI_List_GameChild.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_icon = this.getChildAt(0);
            this.m_n1 = this.getChildAt(1);
            this.m_n2 = this.getChildAt(2);
        };
        return UI_List_GameChild;
    }(fairygui.GComponent);
    UI_List_GameChild.URL = "ui://xcy52l656o1rci";
    pfusdkui.UI_List_GameChild = UI_List_GameChild;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_MoreGameUI = function(_super) {
        __extends(UI_MoreGameUI, _super);
        function UI_MoreGameUI() {
            return _super.call(this) || this;
        }
        UI_MoreGameUI.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "MoreGameUI");
        };
        UI_MoreGameUI.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_list_moregamebg = this.getChildAt(0);
            this.m_list_moregame = this.getChildAt(1);
            this.m_list_moregameStr = this.getChildAt(2);
            this.m_boxList = this.getChildAt(3);
            this.m_Btn_MoreGameLeft = this.getChildAt(4);
            this.m_Btn_MoreGameRight = this.getChildAt(5);
        };
        return UI_MoreGameUI;
    }(fairygui.GComponent);
    UI_MoreGameUI.URL = "ui://xcy52l6510sdcb";
    pfusdkui.UI_MoreGameUI = UI_MoreGameUI;
})(pfusdkui || (pfusdkui = {}));

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_PfuBannerUI = function(_super) {
        __extends(UI_PfuBannerUI, _super);
        function UI_PfuBannerUI() {
            return _super.call(this) || this;
        }
        UI_PfuBannerUI.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "PfuBannerUI");
        };
        UI_PfuBannerUI.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_loader = this.getChildAt(0);
        };
        return UI_PfuBannerUI;
    }(fairygui.GComponent);
    UI_PfuBannerUI.URL = "ui://xcy52l6510sdc0";
    pfusdkui.UI_PfuBannerUI = UI_PfuBannerUI;
})(pfusdkui || (pfusdkui = {}));

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var WindowBase = function() {
            function WindowBase() {}
            WindowBase.prototype.InitWindow = function(fui) {
                this._obj = fui;
                fui.center(true);
                fairygui.GRoot.inst.addChild(fui);
                fui.sortingOrder = 1e4;
                this.Show();
                this.OnStart();
            };
            WindowBase.prototype.OnStart = function() {};
            WindowBase.prototype.OnUpdate = function() {};
            WindowBase.prototype.Show = function(type) {
                this._obj.visible = true;
                Laya.timer.frameLoop(1, this, this.OnUpdate);
            };
            WindowBase.prototype.Hide = function() {
                this._obj.visible = false;
                Laya.timer.clearAll(this);
            };
            return WindowBase;
        }();
        UI.WindowBase = WindowBase;
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
        var FirstSceneBoxWindow = function(_super) {
            __extends(FirstSceneBoxWindow, _super);
            function FirstSceneBoxWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._bannerGame = new Array();
                return _this;
            }
            FirstSceneBoxWindow.prototype.InitWindow = function(fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            FirstSceneBoxWindow.prototype.OnStart = function() {
                this._fui.visible = false;
                this.CheckShow();
                Laya.timer.loop(200, this, this.CheckShow);
                PfuSdk.HideBanner();
            };
            FirstSceneBoxWindow.prototype.OnUpdate = function() {};
            FirstSceneBoxWindow.prototype.CheckShow = function() {
                if (PfuSdk.GetParamComplete && PfuSdk.GetBoxListComplete) {
                    if (!PFU.PfuManager.GetInstance().IsWegameTestMode() && PFU.PfuGlobal.GetOLParam().pfuSdkShowOpenAds == 2) {
                        this.CreateList();
                    } else {
                        this.Hide();
                    }
                    Laya.timer.clear(this, this.CheckShow);
                }
            };
            FirstSceneBoxWindow.prototype.CreateList = function() {
                this._fui.m_Btn_close.onClick(this, this.OnClickClose);
                var arrList = PFU.PfuBoxList.GetInstance().GetAdverts();
                for (var i = 0; i < arrList.length; i++) {
                    var b = arrList[i];
                    if (b.bannerlink && b.bannerlink != "") {
                        this._bannerGame.push(b);
                    }
                }
                for (var i = 0; i < this._bannerGame.length; i++) {
                    var vo = this._fui.m_Img_banner.addItemFromPool(pfusdkui.UI_BannerImg.URL);
                    vo.m_icon.icon = this._bannerGame[i].bannerlink;
                    vo.onClick(this, this.OnClickItem, [ this._bannerGame[i] ]);
                }
                for (var i = 0; i < arrList.length; i++) {
                    var vo = this._fui.m_List_game.addItemFromPool(pfusdkui.UI_List_Child.URL);
                    var data = arrList[i];
                    vo.m_icon.icon = data.link;
                    vo.m_Text_name.text = data.gameName;
                    vo.m_Text_message.text = data.desc;
                    var min = (i == 0 ? 30 : 0) + (arrList.length - i) * 2;
                    var max = (i == 0 ? 30 : 10) + (arrList.length - i) * 8;
                    vo.m_Text_name2.text = PFU.BXRandom.Get().nextInt(min, max) + "万";
                    vo.m_btn_start.onClick(this, this.OnClickItem, [ data ]);
                }
                this._fui.visible = true;
            };
            FirstSceneBoxWindow.prototype.OnClickClose = function() {
                this.Hide();
            };
            FirstSceneBoxWindow.prototype.OnClickItem = function(data, itemObject) {
                if (data.wechatGameid == PFU.PfuConfig.Config.weChatId) {
                    this.OnClickClose();
                    return;
                }
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function() {});
            };
            return FirstSceneBoxWindow;
        }(UI.WindowBase);
        UI.FirstSceneBoxWindow = FirstSceneBoxWindow;
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
        var MoreGameWindow = function(_super) {
            __extends(MoreGameWindow, _super);
            function MoreGameWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isCreateSideMoreGameBtn = false;
                _this._isCreateMoreGameListBar = false;
                _this.isMoveLeft = true;
                return _this;
            }
            MoreGameWindow.prototype.InitWindow = function(fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            MoreGameWindow.prototype.OnStart = function() {
                UI.SceneMatchingUtils.SetAlignBottom(this._fui.m_boxList);
            };
            MoreGameWindow.prototype.OnUpdate = function() {
                if (PFU.PfuConfig.Config && !this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete && PFU.PfuConfig.Config) {
                    this.CreateSideMoreGameBtn();
                    this._isCreateSideMoreGameBtn = true;
                }
                if (PFU.PfuConfig.Config && !this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
                    if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                        this.CreateMoreGameList();
                    }
                    this._isCreateMoreGameListBar = true;
                }
                if (this._isCreateMoreGameListBar) {
                    this.UpdateMoreGameListMove();
                }
            };
            MoreGameWindow.prototype.CreateSideMoreGameBtn = function() {
                var _this = this;
                this._fui.m_Btn_MoreGameLeft.onClick(this, this.ClickMoreGame, [ true ]);
                this._fui.m_Btn_MoreGameRight.onClick(this, this.ClickMoreGame, [ false ]);
                this.RefreshMoreGameIcon();
                PFU.PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, function() {
                    _this.RefreshMoreGameIcon();
                });
                this.Refresh();
            };
            MoreGameWindow.prototype.HideMoreGameLeftRight = function() {
                this._fui.m_Btn_MoreGameRight.visible = false;
                this._fui.m_Btn_MoreGameLeft.visible = false;
            };
            MoreGameWindow.prototype.RefreshMoreGameVisible = function() {
                if (PFU.PfuConfig.Config) {
                    if (PFU.PfuConfig.Config.ui_moreGameType == 1) {
                        this._fui.m_Btn_MoreGameRight.visible = false;
                    } else if (PFU.PfuConfig.Config.ui_moreGameType == 2) {
                        this._fui.m_Btn_MoreGameLeft.visible = false;
                    }
                    if (PFU.PfuConfig.Config.ui_crossGameListType == -1) {
                        this._fui.m_boxList.visible = false;
                    }
                    if (PFU.PfuGlobal.GetOLParam().pfuSdkMoreGame == PFU.PfuSwitch.OFF || PFU.PfuConfig.Config.ui_moreGameType == -1) {
                        this._fui.m_boxList.visible = false;
                        this._fui.m_Btn_MoreGameLeft.visible = false;
                        this._fui.m_Btn_MoreGameRight.visible = false;
                    }
                }
            };
            MoreGameWindow.prototype.Refresh = function() {
                var type = this._isShowType;
                this._fui.m_boxList.visible = true;
                this._fui.m_Btn_MoreGameRight.visible = true;
                this._fui.m_Btn_MoreGameLeft.visible = true;
                if (!type || type == PfuSdk.SHOW_TYPE_ALL) {} else {
                    if (type == PfuSdk.SHOW_TYPE_MOREGAME) {
                        this._fui.m_boxList.visible = false;
                    } else if (type == PfuSdk.SHOW_TYPE_BOXLIST) {
                        this.HideMoreGameLeftRight();
                    }
                }
                this.RefreshMoreGameVisible();
            };
            MoreGameWindow.prototype.RefreshMoreGameIcon = function() {
                if (PFU.PfuConfig.Config.ui_moreGameType == -1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 2) {
                    this._fui.m_Btn_MoreGameLeft.m_icon.asLoader.url = PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(true);
                }
                if (PFU.PfuConfig.Config.ui_moreGameType != 1) {
                    this._fui.m_Btn_MoreGameRight.m_icon.asLoader.url = PFU.PfuMoreGameUpdate.GetInstance().GetMoreGameIconUrl(false);
                }
            };
            MoreGameWindow.prototype.Show = function(type) {
                _super.prototype.Show.call(this, type);
                this._isShowType = type;
                this.Refresh();
            };
            MoreGameWindow.prototype.ClickMoreGame = function(isLeft) {
                PFU.PfuMoreGameUpdate.GetInstance().ShowMoreGame(isLeft, this, function(url) {});
            };
            MoreGameWindow.prototype.CreateMoreGameList = function() {
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                    this._fui.m_list_moregamebg.visible = true;
                    this._fui.m_list_moregameStr.visible = true;
                }
                for (var i = 0; i < count; i++) {
                    var boxListData = list[i];
                    var vo = this._fui.m_list_moregame.addItemFromPool(pfusdkui.UI_List_GameChild.URL);
                    vo.m_icon.icon = boxListData.link;
                    vo.onClick(this, this.OnClickMoreGameListItem, [ boxListData ]);
                }
            };
            MoreGameWindow.prototype.OnClickMoreGameListItem = function(data, itemObject) {
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function() {});
            };
            MoreGameWindow.prototype.UpdateMoreGameListMove = function() {
                var posx = this._fui.m_list_moregame.scrollPane.posX;
                var dir = this.isMoveLeft ? 1 : -1;
                posx += 20 * .016 * dir;
                if (posx >= this._fui.m_list_moregame.scrollPane.contentWidth - this._fui.m_list_moregame.width) {
                    posx = this._fui.m_list_moregame.scrollPane.contentWidth;
                    this.isMoveLeft = false;
                } else if (posx < 0) {
                    posx = 0;
                    this.isMoveLeft = true;
                }
                var targetx = posx;
                this._fui.m_list_moregame.scrollPane.setPosX(targetx, false);
            };
            return MoreGameWindow;
        }(UI.WindowBase);
        UI.MoreGameWindow = MoreGameWindow;
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
        var PfuBannerWindow = function(_super) {
            __extends(PfuBannerWindow, _super);
            function PfuBannerWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isCreatePfuBanner = false;
                return _this;
            }
            PfuBannerWindow.prototype.InitWindow = function(fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            PfuBannerWindow.prototype.OnStart = function() {
                this._fui.m_loader.onClick(this, this.ClickPfuBanner);
                this._fui.m_loader.visible = false;
                UI.SceneMatchingUtils.SetAlignBottom(this._fui.m_loader);
            };
            PfuBannerWindow.prototype.OnUpdate = function() {
                if (!this._isCreatePfuBanner && PfuSdk.GetParamComplete) {
                    this.CreatePfuBanner();
                    this._isCreatePfuBanner = true;
                }
            };
            PfuBannerWindow.prototype.Show = function() {
                _super.prototype.Show.call(this);
            };
            PfuBannerWindow.prototype.Hide = function() {
                _super.prototype.Hide.call(this);
            };
            PfuBannerWindow.prototype.CreatePfuBanner = function() {
                {
                    this._fui.m_loader.visible = false;
                }
            };
            PfuBannerWindow.prototype.RefreshHandle = function() {
                this._fui.m_loader.visible;
                this._fui.m_loader.icon = PFU.PfuBannerUpdate.GetInstance().GetPfuBannerImgUrl();
            };
            PfuBannerWindow.prototype.ClickPfuBanner = function() {
                PFU.PfuBannerUpdate.GetInstance().ClickPfuBanner();
            };
            return PfuBannerWindow;
        }(UI.WindowBase);
        UI.PfuBannerWindow = PfuBannerWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));