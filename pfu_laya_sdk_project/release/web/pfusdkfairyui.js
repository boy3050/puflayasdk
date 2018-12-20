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
                var sdkDialogWindow = new PFU.UI.SdkDialogWindow();
                sdkDialogWindow.InitWindow(pfusdkui.UI_SdkDialogUI.createInstance());
                this._sdkDialogWindow = sdkDialogWindow;
                var clickBannerWindow = new PFU.UI.ClickBannerWindow();
                clickBannerWindow.InitWindow(pfusdkui.UI_ClickBannerUI.createInstance());
                clickBannerWindow.Hide();
                this._clickBannerWindow = clickBannerWindow;
                var redpacketWindow = new PFU.UI.RedPacketWindow();
                redpacketWindow.InitWindow(pfusdkui.UI_RedPacketUI.createInstance());
                redpacketWindow.Show();
                PFU.PfuClickBannerRevive.GetInstance().SetUIHandle(this, function(isShow) {
                    if (isShow) {
                        clickBannerWindow.Show();
                    } else {
                        clickBannerWindow.Hide();
                    }
                });
                PFU.PfuMoreGameUpdate.GetInstance().SetPopupListVisible(this, function(isShow) {
                    if (isShow) {
                        moreGameWindow.ShowLeft();
                    } else {
                        moreGameWindow.HideLeft();
                    }
                });
                PFU.PfuRedPacketManager.GetInstance().SetRedpacketHandle(this, function(isShowBtn) {
                    redpacketWindow.SetIconVisible(isShowBtn);
                }, function() {
                    redpacketWindow.OpenRadPacketGift();
                }, function() {
                    redpacketWindow.OpenEverydayGift();
                }, function(vx, vy) {
                    redpacketWindow.SetIconBtnPos(vx, vy);
                });
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
        PfuSdkFairyUI._sdkDialogWindow = null;
        PfuSdkFairyUI._clickBannerWindow = null;
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
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_RedPacketUI.URL, pfusdkui.UI_RedPacketUI);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_OpenRedPackage_com.URL, pfusdkui.UI_OpenRedPackage_com);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_redpackageClose.URL, pfusdkui.UI_redpackageClose);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_red_TiXian.URL, pfusdkui.UI_red_TiXian);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_btn_red_open.URL, pfusdkui.UI_btn_red_open);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_TiXianRedPackage_com.URL, pfusdkui.UI_TiXianRedPackage_com);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_red_everyday_child_com.URL, pfusdkui.UI_red_everyday_child_com);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_red_everyday_double_btn.URL, pfusdkui.UI_red_everyday_double_btn);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_red_everyday_skip.URL, pfusdkui.UI_red_everyday_skip);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_everyday_redpackage_com.URL, pfusdkui.UI_everyday_redpackage_com);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_redpackage_icon.URL, pfusdkui.UI_redpackage_icon);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_List_GameChild_left.URL, pfusdkui.UI_List_GameChild_left);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_boxlist_left_btn.URL, pfusdkui.UI_boxlist_left_btn);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_AwardRedPackage_com.URL, pfusdkui.UI_AwardRedPackage_com);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_SdkDialogUI.URL, pfusdkui.UI_SdkDialogUI);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_DialogCom.URL, pfusdkui.UI_DialogCom);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_ClickBannerUI.URL, pfusdkui.UI_ClickBannerUI);
            fairygui.UIObjectFactory.setPackageItemExtension(pfusdkui.UI_clickSkip.URL, pfusdkui.UI_clickSkip);
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
            this.m_n10 = this.getChildAt(6);
            this.m_btn_left_click = this.getChildAt(7);
            this.m_list_moregame_left = this.getChildAt(8);
            this.m_n13 = this.getChildAt(9);
            this.m_boxList_left = this.getChildAt(10);
            this.m_showLift = this.getTransitionAt(0);
            this.m_hideLift = this.getTransitionAt(1);
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
    var UI_DialogCom = function(_super) {
        __extends(UI_DialogCom, _super);
        function UI_DialogCom() {
            return _super.call(this) || this;
        }
        UI_DialogCom.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "DialogCom");
        };
        UI_DialogCom.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n4 = this.getChildAt(0);
            this.m_tiptext = this.getChildAt(1);
        };
        return UI_DialogCom;
    }(fairygui.GComponent);
    UI_DialogCom.URL = "ui://xcy52l65jkohck";
    pfusdkui.UI_DialogCom = UI_DialogCom;
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

var __extends = this && this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var pfusdkui;

(function(pfusdkui) {
    var UI_AwardRedPackage_com = function(_super) {
        __extends(UI_AwardRedPackage_com, _super);
        function UI_AwardRedPackage_com() {
            return _super.call(this) || this;
        }
        UI_AwardRedPackage_com.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "AwardRedPackage_com");
        };
        UI_AwardRedPackage_com.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n8 = this.getChildAt(0);
            this.m_bg_loader = this.getChildAt(1);
            this.m_btn_close = this.getChildAt(2);
            this.m_n15 = this.getChildAt(3);
            this.m_n16 = this.getChildAt(4);
            this.m_moneyNum = this.getChildAt(5);
            this.m_n18 = this.getChildAt(6);
            this.m_n19 = this.getChildAt(7);
            this.m_n20 = this.getChildAt(8);
            this.m_btn_tixian = this.getChildAt(9);
            this.m_n23 = this.getChildAt(10);
            this.m_allMoney = this.getChildAt(11);
            this.m_n25 = this.getChildAt(12);
        };
        return UI_AwardRedPackage_com;
    }(fairygui.GComponent);
    UI_AwardRedPackage_com.URL = "ui://xcy52l65h5hmdk";
    pfusdkui.UI_AwardRedPackage_com = UI_AwardRedPackage_com;
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
    var UI_boxlist_left_btn = function(_super) {
        __extends(UI_boxlist_left_btn, _super);
        function UI_boxlist_left_btn() {
            return _super.call(this) || this;
        }
        UI_boxlist_left_btn.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "boxlist_left_btn");
        };
        UI_boxlist_left_btn.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n9 = this.getChildAt(0);
        };
        return UI_boxlist_left_btn;
    }(fairygui.GComponent);
    UI_boxlist_left_btn.URL = "ui://xcy52l65f4q7dj";
    pfusdkui.UI_boxlist_left_btn = UI_boxlist_left_btn;
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
    var UI_btn_red_open = function(_super) {
        __extends(UI_btn_red_open, _super);
        function UI_btn_red_open() {
            return _super.call(this) || this;
        }
        UI_btn_red_open.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "btn_red_open");
        };
        UI_btn_red_open.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n2 = this.getChildAt(0);
        };
        return UI_btn_red_open;
    }(fairygui.GComponent);
    UI_btn_red_open.URL = "ui://xcy52l65f4q7d9";
    pfusdkui.UI_btn_red_open = UI_btn_red_open;
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
    var UI_ClickBannerUI = function(_super) {
        __extends(UI_ClickBannerUI, _super);
        function UI_ClickBannerUI() {
            return _super.call(this) || this;
        }
        UI_ClickBannerUI.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "ClickBannerUI");
        };
        UI_ClickBannerUI.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n1 = this.getChildAt(0);
            this.m_loader = this.getChildAt(1);
            this.m_cancel = this.getChildAt(2);
        };
        return UI_ClickBannerUI;
    }(fairygui.GComponent);
    UI_ClickBannerUI.URL = "ui://xcy52l65sxe6cl";
    pfusdkui.UI_ClickBannerUI = UI_ClickBannerUI;
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
    var UI_clickSkip = function(_super) {
        __extends(UI_clickSkip, _super);
        function UI_clickSkip() {
            return _super.call(this) || this;
        }
        UI_clickSkip.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "clickSkip");
        };
        UI_clickSkip.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n9 = this.getChildAt(0);
        };
        return UI_clickSkip;
    }(fairygui.GComponent);
    UI_clickSkip.URL = "ui://xcy52l65sxe6cp";
    pfusdkui.UI_clickSkip = UI_clickSkip;
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
    var UI_everyday_redpackage_com = function(_super) {
        __extends(UI_everyday_redpackage_com, _super);
        function UI_everyday_redpackage_com() {
            return _super.call(this) || this;
        }
        UI_everyday_redpackage_com.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "everyday_redpackage_com");
        };
        UI_everyday_redpackage_com.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n22 = this.getChildAt(0);
            this.m_bg_loader = this.getChildAt(1);
            this.m_n24 = this.getChildAt(2);
            this.m_btn_double_btn = this.getChildAt(3);
            this.m_btn_red_everyday_skip = this.getChildAt(4);
            this.m_list_sex = this.getChildAt(5);
            this.m_seven = this.getChildAt(6);
        };
        return UI_everyday_redpackage_com;
    }(fairygui.GComponent);
    UI_everyday_redpackage_com.URL = "ui://xcy52l65f4q7de";
    pfusdkui.UI_everyday_redpackage_com = UI_everyday_redpackage_com;
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
    var UI_List_GameChild_left = function(_super) {
        __extends(UI_List_GameChild_left, _super);
        function UI_List_GameChild_left() {
            return _super.call(this) || this;
        }
        UI_List_GameChild_left.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "List_GameChild_left");
        };
        UI_List_GameChild_left.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_icon = this.getChildAt(0);
            this.m_n1 = this.getChildAt(1);
            this.m_n2 = this.getChildAt(2);
        };
        return UI_List_GameChild_left;
    }(fairygui.GComponent);
    UI_List_GameChild_left.URL = "ui://xcy52l65f4q7di";
    pfusdkui.UI_List_GameChild_left = UI_List_GameChild_left;
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
    var UI_OpenRedPackage_com = function(_super) {
        __extends(UI_OpenRedPackage_com, _super);
        function UI_OpenRedPackage_com() {
            return _super.call(this) || this;
        }
        UI_OpenRedPackage_com.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "OpenRedPackage_com");
        };
        UI_OpenRedPackage_com.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n0 = this.getChildAt(0);
            this.m_bg_loader = this.getChildAt(1);
            this.m_btn_red_open = this.getChildAt(2);
            this.m_n3 = this.getChildAt(3);
            this.m_n4 = this.getChildAt(4);
            this.m_voidStr = this.getChildAt(5);
            this.m_n6 = this.getChildAt(6);
            this.m_n7 = this.getChildAt(7);
            this.m_btn_close = this.getChildAt(8);
        };
        return UI_OpenRedPackage_com;
    }(fairygui.GComponent);
    UI_OpenRedPackage_com.URL = "ui://xcy52l65f4q7d6";
    pfusdkui.UI_OpenRedPackage_com = UI_OpenRedPackage_com;
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
    var UI_red_everyday_child_com = function(_super) {
        __extends(UI_red_everyday_child_com, _super);
        function UI_red_everyday_child_com() {
            return _super.call(this) || this;
        }
        UI_red_everyday_child_com.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "red_everyday_child_com");
        };
        UI_red_everyday_child_com.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n27 = this.getChildAt(0);
            this.m_n28 = this.getChildAt(1);
            this.m_text = this.getChildAt(2);
        };
        return UI_red_everyday_child_com;
    }(fairygui.GComponent);
    UI_red_everyday_child_com.URL = "ui://xcy52l65f4q7db";
    pfusdkui.UI_red_everyday_child_com = UI_red_everyday_child_com;
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
    var UI_red_everyday_double_btn = function(_super) {
        __extends(UI_red_everyday_double_btn, _super);
        function UI_red_everyday_double_btn() {
            return _super.call(this) || this;
        }
        UI_red_everyday_double_btn.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "red_everyday_double_btn");
        };
        UI_red_everyday_double_btn.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n25 = this.getChildAt(0);
        };
        return UI_red_everyday_double_btn;
    }(fairygui.GComponent);
    UI_red_everyday_double_btn.URL = "ui://xcy52l65f4q7dc";
    pfusdkui.UI_red_everyday_double_btn = UI_red_everyday_double_btn;
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
    var UI_red_everyday_skip = function(_super) {
        __extends(UI_red_everyday_skip, _super);
        function UI_red_everyday_skip() {
            return _super.call(this) || this;
        }
        UI_red_everyday_skip.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "red_everyday_skip");
        };
        UI_red_everyday_skip.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n26 = this.getChildAt(0);
        };
        return UI_red_everyday_skip;
    }(fairygui.GComponent);
    UI_red_everyday_skip.URL = "ui://xcy52l65f4q7dd";
    pfusdkui.UI_red_everyday_skip = UI_red_everyday_skip;
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
    var UI_red_TiXian = function(_super) {
        __extends(UI_red_TiXian, _super);
        function UI_red_TiXian() {
            return _super.call(this) || this;
        }
        UI_red_TiXian.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "red_TiXian");
        };
        UI_red_TiXian.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n21 = this.getChildAt(0);
        };
        return UI_red_TiXian;
    }(fairygui.GComponent);
    UI_red_TiXian.URL = "ui://xcy52l65f4q7d8";
    pfusdkui.UI_red_TiXian = UI_red_TiXian;
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
    var UI_redpackage_icon = function(_super) {
        __extends(UI_redpackage_icon, _super);
        function UI_redpackage_icon() {
            return _super.call(this) || this;
        }
        UI_redpackage_icon.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "redpackage_icon");
        };
        UI_redpackage_icon.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n31 = this.getChildAt(0);
            this.m_n32 = this.getChildAt(1);
            this.m_moneyNumStr = this.getChildAt(2);
        };
        return UI_redpackage_icon;
    }(fairygui.GComponent);
    UI_redpackage_icon.URL = "ui://xcy52l65f4q7df";
    pfusdkui.UI_redpackage_icon = UI_redpackage_icon;
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
    var UI_redpackageClose = function(_super) {
        __extends(UI_redpackageClose, _super);
        function UI_redpackageClose() {
            return _super.call(this) || this;
        }
        UI_redpackageClose.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "redpackageClose");
        };
        UI_redpackageClose.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_button = this.getControllerAt(0);
            this.m_n1 = this.getChildAt(0);
            this.m_n2 = this.getChildAt(1);
        };
        return UI_redpackageClose;
    }(fairygui.GButton);
    UI_redpackageClose.URL = "ui://xcy52l65f4q7d7";
    pfusdkui.UI_redpackageClose = UI_redpackageClose;
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
    var UI_RedPacketUI = function(_super) {
        __extends(UI_RedPacketUI, _super);
        function UI_RedPacketUI() {
            return _super.call(this) || this;
        }
        UI_RedPacketUI.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "RedPacketUI");
        };
        UI_RedPacketUI.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_btn_redpackageicon = this.getChildAt(0);
            this.m_com_openredpackage = this.getChildAt(1);
            this.m_com_tixianredpackage = this.getChildAt(2);
            this.m_com_everyday = this.getChildAt(3);
            this.m_com_awradredpackage = this.getChildAt(4);
        };
        return UI_RedPacketUI;
    }(fairygui.GComponent);
    UI_RedPacketUI.URL = "ui://xcy52l65f4q7cr";
    pfusdkui.UI_RedPacketUI = UI_RedPacketUI;
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
    var UI_TiXianRedPackage_com = function(_super) {
        __extends(UI_TiXianRedPackage_com, _super);
        function UI_TiXianRedPackage_com() {
            return _super.call(this) || this;
        }
        UI_TiXianRedPackage_com.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "TiXianRedPackage_com");
        };
        UI_TiXianRedPackage_com.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n8 = this.getChildAt(0);
            this.m_bg_loader = this.getChildAt(1);
            this.m_btn_close = this.getChildAt(2);
            this.m_n15 = this.getChildAt(3);
            this.m_n16 = this.getChildAt(4);
            this.m_moneyNum = this.getChildAt(5);
            this.m_n18 = this.getChildAt(6);
            this.m_n19 = this.getChildAt(7);
            this.m_n20 = this.getChildAt(8);
            this.m_btn_tixian = this.getChildAt(9);
        };
        return UI_TiXianRedPackage_com;
    }(fairygui.GComponent);
    UI_TiXianRedPackage_com.URL = "ui://xcy52l65f4q7da";
    pfusdkui.UI_TiXianRedPackage_com = UI_TiXianRedPackage_com;
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
    var UI_SdkDialogUI = function(_super) {
        __extends(UI_SdkDialogUI, _super);
        function UI_SdkDialogUI() {
            return _super.call(this) || this;
        }
        UI_SdkDialogUI.createInstance = function() {
            return fairygui.UIPackage.createObject("pfusdkui", "SdkDialogUI");
        };
        UI_SdkDialogUI.prototype.constructFromXML = function(xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.m_n0 = this.getChildAt(0);
        };
        return UI_SdkDialogUI;
    }(fairygui.GComponent);
    UI_SdkDialogUI.URL = "ui://xcy52l65jkohcj";
    pfusdkui.UI_SdkDialogUI = UI_SdkDialogUI;
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
                if (data.wechatGameid == PFU.PfuConfig.Config.wxId) {
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
        var RedPacketWindow = function(_super) {
            __extends(RedPacketWindow, _super);
            function RedPacketWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isShowRedpacket = false;
                return _this;
            }
            RedPacketWindow.prototype.InitWindow = function(fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            RedPacketWindow.prototype.OnStart = function() {
                var _this = this;
                this.InitIconEvent();
                this._fui.m_com_everyday.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/denglujl_di.png";
                this._fui.m_com_tixianredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png";
                this._fui.m_com_openredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_di.png";
                this._fui.m_com_awradredpackage.m_bg_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png";
                this._fui.m_com_tixianredpackage.m_btn_close.onClick(this, function() {
                    _this._fui.m_com_tixianredpackage.visible = false;
                });
                this._fui.m_com_tixianredpackage.m_btn_tixian.onClick(this, function() {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                this._fui.m_com_awradredpackage.m_btn_tixian.onClick(this, function() {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                this._fui.m_com_awradredpackage.m_btn_close.onClick(this, function() {
                    _this._fui.m_com_awradredpackage.visible = false;
                    PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.SUCCESS);
                });
                this._fui.m_com_openredpackage.m_btn_close.onClick(this, function() {
                    _this._fui.m_com_openredpackage.visible = false;
                    PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                });
                this._fui.m_com_openredpackage.m_btn_red_open.onClick(this, this.OnRedPacketGiftAward);
            };
            RedPacketWindow.prototype.OnUpdate = function() {
                if (PfuSdk.GetParamComplete && !this._isShowRedpacket) {
                    this._isShowRedpacket = false;
                }
            };
            RedPacketWindow.prototype.Show = function() {
                _super.prototype.Show.call(this);
            };
            RedPacketWindow.prototype.Hide = function() {
                _super.prototype.Hide.call(this);
            };
            RedPacketWindow.prototype.InitIconEvent = function() {
                this._fui.m_btn_redpackageicon.onClick(this, this.OnClickRedIcon);
                this._fui.m_com_everyday.m_btn_red_everyday_skip.onClick(this, this.OnEverydaySkip);
                this._fui.m_com_everyday.m_btn_double_btn.onClick(this, this.OnEveryDoubleAward);
                this.UpdateIconMoney();
            };
            RedPacketWindow.prototype.SetIconBtnPos = function(xv, yv) {
                this._fui.m_btn_redpackageicon.setXY(xv, yv);
            };
            RedPacketWindow.prototype.SetIconVisible = function(visible) {
                this._fui.m_btn_redpackageicon.visible = visible;
            };
            RedPacketWindow.prototype.UpdateIconMoney = function() {
                this._fui.m_btn_redpackageicon.m_moneyNumStr.text = "¥" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
            };
            RedPacketWindow.prototype.OnClickRedIcon = function() {
                if (PFU.PfuRedPacketManager.GetInstance().CanEverydayAward()) {
                    this.OpenEverydayGift();
                } else {
                    this.OpenRadPacketTixian();
                }
            };
            RedPacketWindow.prototype.OpenEverydayGift = function() {
                this.SetEveryDayCom();
                this._fui.m_com_everyday.visible = true;
            };
            RedPacketWindow.prototype.SetEveryDayCom = function() {
                var count = this._fui.m_com_everyday.m_list_sex.numChildren;
                for (var i = 0; i < count; i++) {
                    var com = this._fui.m_com_everyday.m_list_sex.getChildAt(i);
                    if (i < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                        com.m_text.text = "已领取";
                        continue;
                    }
                    com.m_text.text = "第" + (i + 1) + "天";
                }
                if (6 < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                    this._fui.m_com_everyday.m_seven.m_text.text = "已领取";
                } else {
                    this._fui.m_com_everyday.m_seven.m_text.text = "第" + 7 + "天(超大红包)";
                }
            };
            RedPacketWindow.prototype.OnEverydaySkip = function() {
                this._fui.m_com_everyday.visible = false;
                this.EverydayAward(false);
            };
            RedPacketWindow.prototype.EverydayAward = function(isDouble) {
                PFU.PfuRedPacketManager.GetInstance().AwardEveryDay(isDouble);
                this.UpdateIconMoney();
            };
            RedPacketWindow.prototype.OnEveryDoubleAward = function() {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this._fui.m_com_everyday.visible = false;
                    this.EverydayAward(true);
                    return;
                }
                PfuSdk.Video(this, function(type) {
                    if (type == PfuSdk.SUCCESS) {
                        _this._fui.m_com_everyday.visible = false;
                        _this.EverydayAward(true);
                    } else {}
                });
            };
            RedPacketWindow.prototype.OpenRadPacketTixian = function() {
                this._fui.m_com_tixianredpackage.visible = true;
                this._fui.m_com_tixianredpackage.m_moneyNum.text = "" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
            };
            RedPacketWindow.prototype.OpenRadPacketGift = function() {
                this._fui.m_com_openredpackage.visible = true;
            };
            RedPacketWindow.prototype.OnRedPacketGiftAward = function() {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this.RedPacketGiftAward();
                    return;
                }
                PfuSdk.Video(this, function(type) {
                    if (type == PfuSdk.SUCCESS) {
                        _this.RedPacketGiftAward();
                    } else {
                        PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                    }
                });
            };
            RedPacketWindow.prototype.RedPacketGiftAward = function() {
                this._fui.m_com_openredpackage.visible = false;
                var award = PFU.PfuRedPacketManager.GetInstance().AwardGift();
                this.OpenAwardRadPacket(award);
                this.UpdateIconMoney();
            };
            RedPacketWindow.prototype.OpenAwardRadPacket = function(award) {
                this._fui.m_com_awradredpackage.visible = true;
                this._fui.m_com_awradredpackage.m_allMoney.text = "" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
                this._fui.m_com_awradredpackage.m_moneyNum.text = "" + award;
            };
            return RedPacketWindow;
        }(UI.WindowBase);
        UI.RedPacketWindow = RedPacketWindow;
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
                _this.isLockLeftBtn = false;
                _this.isLeftOpen = false;
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
                        this.CreateMoreGameListLeft();
                    }
                    this._isCreateMoreGameListBar = true;
                }
                if (this._isCreateMoreGameListBar) {
                    this.UpdateMoreGameListMove();
                }
                if (this._isCreateSideMoreGameBtn && PFU.PfuMoreGameUpdate.GetInstance().isSetMoreGameOffsetY) {
                    this._fui.m_Btn_MoreGameLeft.setXY(this._fui.m_Btn_MoreGameLeft.x, this._fui.m_Btn_MoreGameLeft.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY);
                    this._fui.m_Btn_MoreGameRight.setXY(this._fui.m_Btn_MoreGameRight.x, this._fui.m_Btn_MoreGameRight.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY);
                    PFU.PfuMoreGameUpdate.GetInstance().EndMoreGameUIOffsetY();
                }
            };
            MoreGameWindow.prototype.ShowLeft = function() {
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this._fui.m_boxList_left.visible = true;
                }
            };
            MoreGameWindow.prototype.HideLeft = function() {
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this._fui.m_boxList_left.visible = false;
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
            MoreGameWindow.prototype.CreateMoreGameListLeft = function() {
                var _this = this;
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {}
                for (var i = 0; i < count; i++) {
                    var boxListData = list[i];
                    var vo = this._fui.m_list_moregame_left.addItemFromPool(pfusdkui.UI_List_GameChild_left.URL);
                    vo.m_icon.icon = boxListData.link;
                    vo.onClick(this, this.OnClickMoreGameListItem, [ boxListData ]);
                }
                this._fui.m_btn_left_click.onClick(this, function() {
                    if (_this.isLockLeftBtn) {
                        return;
                    }
                    _this.isLockLeftBtn = true;
                    if (!_this.isLeftOpen) {
                        _this._fui.m_showLift.play(Laya.Handler.create(_this, function() {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = true;
                        }));
                    } else {
                        _this._fui.m_hideLift.play(Laya.Handler.create(_this, function() {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = false;
                        }));
                    }
                });
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
        var SdkDialogWindow = function(_super) {
            __extends(SdkDialogWindow, _super);
            function SdkDialogWindow() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isCreatePfuBanner = false;
                return _this;
            }
            SdkDialogWindow.prototype.InitWindow = function(fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
            };
            SdkDialogWindow.prototype.OnStart = function() {
                PFU.PfuGlobal.SetOnDialog(this, this.OnAddDialog);
            };
            SdkDialogWindow.prototype.OnUpdate = function() {};
            SdkDialogWindow.prototype.OnAddDialog = function(desc) {
                var dialog = pfusdkui.UI_DialogCom.createInstance();
                dialog.m_tiptext.text = "" + desc;
                dialog.center();
                this._fui.addChild(dialog);
                Laya.timer.once(2e3, this, function() {
                    dialog.dispose();
                });
            };
            return SdkDialogWindow;
        }(UI.WindowBase);
        UI.SdkDialogWindow = SdkDialogWindow;
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
        var ClickBannerWindow = function(_super) {
            __extends(ClickBannerWindow, _super);
            function ClickBannerWindow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ClickBannerWindow.prototype.InitWindow = function(fui) {
                this._fui = fui;
                _super.prototype.InitWindow.call(this, fui);
                this._fui.m_loader.icon = PFU.PfuGlobal.SDK_RES_CDN_PATH + "bannerrevive/clickbannerbg.jpg";
            };
            ClickBannerWindow.prototype.OnStart = function() {
                this._fui.m_cancel.onClick(this, function() {
                    PFU.PfuClickBannerRevive.GetInstance().Cancel();
                });
            };
            ClickBannerWindow.prototype.OnUpdate = function() {};
            ClickBannerWindow.prototype.Show = function(type) {
                _super.prototype.Show.call(this);
            };
            ClickBannerWindow.prototype.Hide = function() {
                _super.prototype.Hide.call(this);
            };
            return ClickBannerWindow;
        }(UI.WindowBase);
        UI.ClickBannerWindow = ClickBannerWindow;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));