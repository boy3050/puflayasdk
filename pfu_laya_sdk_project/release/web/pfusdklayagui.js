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
                    off += -64;
                } else if (Laya.Browser.onAndroid && PFU.WeChatBannerAd.GetInstance().IsAllSceneOrLiuHaiScene()) {
                    off += -64;
                }
                com.y = SceneMatchingLayaUtils.GetLogicSceneBottom() - off + this.bottomOffset;
            };
            return SceneMatchingLayaUtils;
        }();
        SceneMatchingLayaUtils.DESIGN_WIDTH = 750;
        SceneMatchingLayaUtils.DESIGN_HEIGHT = 1334;
        SceneMatchingLayaUtils.bottomOffset = 0;
        UI.SceneMatchingLayaUtils = SceneMatchingLayaUtils;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var UI;
    (function(UI) {
        var PfuSdkLayaUI = function() {
            function PfuSdkLayaUI() {}
            PfuSdkLayaUI.CustomSpecialUI = function(scaleX, scaleY, bottomOffset) {
                this._scaleX = scaleX;
                this._scaleY = scaleY;
                this._bottomOffset = bottomOffset;
            };
            PfuSdkLayaUI.CreateUI = function() {
                this.LoadUIData();
                UI.SceneMatchingLayaUtils.bottomOffset = this._bottomOffset;
                UI.SceneMatchingLayaUtils.WIDTH = laya.utils.Browser.width;
                UI.SceneMatchingLayaUtils.HEIGTH = laya.utils.Browser.height;
            };
            PfuSdkLayaUI.LoadUIData = function() {
                Laya.loader.load(PFU.PfuGlobal.sdkCustomResRoot + "PfusdkRes/UI/layaui/atlas/comp.atlas", Laya.Handler.create(this, this.CreateUIWindow));
            };
            PfuSdkLayaUI.AddStage = function(windowUI) {
                windowUI.scale(this._scaleX, this._scaleY);
                this._windowList.push(windowUI);
                Laya.stage.addChild(windowUI);
            };
            PfuSdkLayaUI.GetSdkWindowList = function() {
                return this._windowList;
            };
            PfuSdkLayaUI.CreateUIWindow = function() {
                var _this = this;
                this.moregameUI = new PFU.UI.MoreGameUI();
                this.AddStage(this.moregameUI);
                this.moregameUI.OnHide();
                this.bannerUI = new PFU.UI.UI_PfuBannerUI();
                this.AddStage(this.bannerUI);
                this.boxWindowUI = new PFU.UI.FirstSceneBoxUI();
                this.AddStage(this.boxWindowUI);
                var clickBannerUI = new PFU.UI.ClickBannerUI();
                this.AddStage(clickBannerUI);
                this.redPacketUI = new PFU.UI.RedPacketUI();
                this.AddStage(this.redPacketUI);
                PFU.PfuMoreGameUpdate.GetInstance().SetCtrlMoreGameUI(this, function(isShow, type) {
                    if (isShow) {
                        _this.moregameUI.OnShow(type);
                    } else {
                        _this.moregameUI.OnHide();
                    }
                });
                PFU.PfuClickBannerRevive.GetInstance().SetUIHandle(this, function(isShow) {
                    if (isShow) {
                        clickBannerUI.Show();
                    } else {
                        clickBannerUI.Hide();
                    }
                });
                PFU.PfuGlobal.SetOnDialog(this, PfuSdkLayaUI.OnAddDialog);
                PFU.PfuRedPacketManager.GetInstance().SetRedpacketHandle(this, function(isShowBtn) {
                    _this.moregameUI.SetIconVisible(isShowBtn);
                }, function() {
                    _this.redPacketUI.OpenRadPacketGift();
                }, function() {
                    _this.redPacketUI.OpenEverydayGift();
                }, function(vx, vy) {
                    _this.moregameUI.SetIconBtnPos(vx, vy);
                }, function() {
                    _this.redPacketUI.ForceCloseRedPacketUI();
                });
                PFU.PfuMoreGameUpdate.GetInstance().SetPopupListVisible(this, function(isShow) {
                    if (isShow) {
                        _this.moregameUI.ShowLeft();
                    } else {
                        _this.moregameUI.HideLeft();
                    }
                });
            };
            PfuSdkLayaUI.OpenEverydayGift = function() {
                this.redPacketUI.OpenEverydayGift();
            };
            PfuSdkLayaUI.OpenRadPacketTixian = function() {
                this.redPacketUI.OpenRadPacketTixian();
            };
            PfuSdkLayaUI.UpdateIconMoney = function() {
                this.moregameUI.UpdateIconMoney();
            };
            PfuSdkLayaUI.OnAddDialog = function(desc) {
                var dialog = new ui.SdkDialogUIUI();
                dialog.dialogtext.text = "" + desc;
                dialog.zOrder = PfuSdk.UI_ORDER_OTHER;
                Laya.stage.addChild(dialog);
                Laya.stage.updateZOrder();
                Laya.timer.once(2e3, this, function() {
                    dialog.removeSelf();
                });
            };
            return PfuSdkLayaUI;
        }();
        PfuSdkLayaUI._scaleX = 1;
        PfuSdkLayaUI._scaleY = 1;
        PfuSdkLayaUI._bottomOffset = 0;
        PfuSdkLayaUI._windowList = new Array();
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
            mouseThrough: true,
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
            visible: false,
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
                visible: true,
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
    var ClickBannerUIUI = function(_super) {
        __extends(ClickBannerUIUI, _super);
        function ClickBannerUIUI() {
            return _super.call(this) || this;
        }
        ClickBannerUIUI.prototype.createChildren = function() {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ClickBannerUIUI.uiView);
        };
        return ClickBannerUIUI;
    }(View);
    ClickBannerUIUI.uiView = {
        type: "View",
        props: {
            width: 750,
            height: 1334,
            centerY: .5,
            centerX: .5
        },
        child: [ {
            type: "Image",
            props: {
                y: 813,
                x: 331,
                var: "cancel",
                skin: "comp/dianjifuhuo.png"
            }
        }, {
            type: "Image",
            props: {
                width: 750,
                var: "loaderImg",
                height: 1600,
                centerY: .5,
                centerX: .5
            }
        } ]
    };
    ui.ClickBannerUIUI = ClickBannerUIUI;
})(ui || (ui = {}));

(function(ui) {
    var MoreGameUIUI = function(_super) {
        __extends(MoreGameUIUI, _super);
        function MoreGameUIUI() {
            return _super.call(this) || this;
        }
        MoreGameUIUI.prototype.createChildren = function() {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.MoreGameUIUI.uiView);
        };
        return MoreGameUIUI;
    }(View);
    MoreGameUIUI.uiView = {
        type: "View",
        props: {
            width: 750,
            mouseThrough: true,
            height: 1334
        },
        child: [ {
            type: "Sprite",
            props: {
                y: 0,
                x: 0,
                width: 750,
                var: "moregameCtl",
                mouseThrough: true,
                height: 1334
            },
            child: [ {
                type: "Button",
                props: {
                    y: 567,
                    x: 7,
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
                    y: 567,
                    x: 710,
                    width: 177,
                    var: "btn_right",
                    top: 567,
                    stateNum: 1,
                    right: 40,
                    height: 84,
                    anchorX: 1
                }
            }, {
                type: "Box",
                props: {
                    y: 0,
                    x: 0,
                    var: "box",
                    mouseThrough: true
                },
                child: [ {
                    type: "Image",
                    props: {
                        y: 1119,
                        width: 113,
                        visible: false,
                        var: "img_title",
                        skin: "comp/Img_hy.png",
                        right: 332,
                        height: 25
                    }
                }, {
                    type: "Image",
                    props: {
                        y: 1157,
                        x: 24,
                        width: 710,
                        visible: false,
                        var: "box_bg",
                        skin: "comp/Img_zjmdt.png",
                        right: 16,
                        height: 164,
                        bottom: 13
                    }
                }, {
                    type: "List",
                    props: {
                        y: 1160,
                        x: 0,
                        width: 750,
                        var: "boxlist",
                        spaceX: 1,
                        repeatY: 1
                    },
                    child: [ {
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
            }, {
                type: "Box",
                props: {
                    y: 298,
                    x: -367,
                    width: 0,
                    visible: false,
                    var: "boxList_left",
                    mouseThrough: true,
                    height: 0
                },
                compId: 23,
                child: [ {
                    type: "Image",
                    props: {
                        y: 153,
                        x: 367,
                        width: 51,
                        var: "btn_list_open",
                        skin: "comp/zx_jt_di.png",
                        rotation: 0,
                        mouseEnabled: true,
                        height: 94,
                        sizeGrid: "21,15,32,15"
                    }
                }, {
                    type: "Image",
                    props: {
                        y: -25,
                        x: -12,
                        width: 379,
                        skin: "comp/zx_jt_di.png",
                        height: 469,
                        sizeGrid: "21,15,32,15"
                    }
                }, {
                    type: "Image",
                    props: {
                        y: 197,
                        x: 392,
                        var: "boxlist_left_btn_bg",
                        skin: "comp/zx_jiantou.png",
                        scaleX: -1,
                        anchorY: .5,
                        anchorX: .5
                    },
                    compId: 33
                }, {
                    type: "List",
                    props: {
                        y: -22,
                        x: -7,
                        width: 371,
                        var: "boxlist_array_left",
                        spaceY: 0,
                        spaceX: 0,
                        repeatY: 3,
                        repeatX: 0,
                        height: 478
                    },
                    child: [ {
                        type: "Box",
                        props: {
                            y: 6,
                            x: -5,
                            width: 125,
                            var: "boxitemleft",
                            renderType: "render",
                            height: 153
                        },
                        child: [ {
                            type: "Image",
                            props: {
                                y: 50,
                                x: 61,
                                width: 100,
                                pivotY: 50,
                                pivotX: 50,
                                name: "img_icon",
                                height: 100
                            }
                        }, {
                            type: "Label",
                            props: {
                                y: 103,
                                x: 0,
                                wordWrap: true,
                                width: 121,
                                text: "更多游戏FK更多游戏FK",
                                overflow: "hidden",
                                name: "gameName",
                                height: 45,
                                fontSize: 20,
                                color: "#ffffff",
                                anchorY: 0,
                                anchorX: 0,
                                align: "center"
                            }
                        } ]
                    } ]
                } ]
            } ]
        }, {
            type: "Sprite",
            props: {
                y: 865,
                x: 656,
                width: 123,
                visible: false,
                var: "btn_redpackageicon",
                pivotY: 71,
                pivotX: 61,
                mouseEnabled: true,
                height: 141
            },
            child: [ {
                type: "Image",
                props: {
                    y: 106,
                    x: 3,
                    skin: "comp/hongbao_tb2.png"
                }
            }, {
                type: "Image",
                props: {
                    skin: "comp/hongbao_tb1.png"
                }
            }, {
                type: "Text",
                props: {
                    y: 110,
                    x: 9,
                    width: 102,
                    var: "moneyNumStr",
                    text: "¥19.65",
                    pivotY: .5,
                    pivotX: .5,
                    height: 20,
                    fontSize: 20,
                    color: "#FFFF00",
                    align: "center"
                }
            } ]
        } ],
        animations: [ {
            nodes: [ {
                target: 23,
                keyframes: {
                    x: [ {
                        value: -367,
                        tweenMethod: "linearNone",
                        tween: true,
                        target: 23,
                        key: "x",
                        index: 0
                    }, {
                        value: 12,
                        tweenMethod: "linearNone",
                        tween: true,
                        target: 23,
                        key: "x",
                        index: 12
                    } ]
                }
            }, {
                target: 33,
                keyframes: {
                    scaleX: [ {
                        value: -1,
                        tweenMethod: "linearNone",
                        tween: false,
                        target: 33,
                        key: "scaleX",
                        index: 0
                    }, {
                        value: 1,
                        tweenMethod: "linearNone",
                        tween: true,
                        target: 33,
                        key: "scaleX",
                        index: 12
                    } ]
                }
            } ],
            name: "showLift",
            id: 1,
            frameRate: 24,
            action: 0
        }, {
            nodes: [ {
                target: 23,
                keyframes: {
                    x: [ {
                        value: 12,
                        tweenMethod: "linearNone",
                        tween: true,
                        target: 23,
                        key: "x",
                        index: 0
                    }, {
                        value: -367,
                        tweenMethod: "linearNone",
                        tween: true,
                        target: 23,
                        key: "x",
                        index: 12
                    } ]
                }
            }, {
                target: 33,
                keyframes: {
                    scaleX: [ {
                        value: 1,
                        tweenMethod: "linearNone",
                        tween: false,
                        target: 33,
                        key: "scaleX",
                        index: 0
                    }, {
                        value: -1,
                        tweenMethod: "linearNone",
                        tween: true,
                        target: 33,
                        key: "scaleX",
                        index: 12
                    } ]
                }
            } ],
            name: "hideLift",
            id: 1,
            frameRate: 24,
            action: 0
        } ]
    };
    ui.MoreGameUIUI = MoreGameUIUI;
})(ui || (ui = {}));

(function(ui) {
    var RedPacketUIUI = function(_super) {
        __extends(RedPacketUIUI, _super);
        function RedPacketUIUI() {
            return _super.call(this) || this;
        }
        RedPacketUIUI.prototype.createChildren = function() {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.RedPacketUIUI.uiView);
        };
        return RedPacketUIUI;
    }(View);
    RedPacketUIUI.uiView = {
        type: "View",
        props: {
            width: 750,
            mouseThrough: true,
            height: 1334
        },
        child: [ {
            type: "Sprite",
            props: {
                y: 0,
                x: 0,
                width: 750,
                visible: false,
                var: "com_openredpackage",
                height: 1334
            },
            child: [ {
                type: "Texture",
                props: {
                    y: -133,
                    x: 0,
                    width: 750,
                    skin: "comp/img_box_1.png",
                    height: 1600
                }
            }, {
                type: "Sprite",
                props: {
                    y: 319,
                    x: 132,
                    width: 517,
                    var: "bg_loader",
                    pivotY: .5,
                    pivotX: .5,
                    height: 695
                }
            }, {
                type: "Image",
                props: {
                    y: 632,
                    x: 299,
                    var: "btn_red_open",
                    skin: "comp/hb_b_kai.png"
                }
            }, {
                type: "Text",
                props: {
                    y: 403,
                    x: 328,
                    text: "恭喜",
                    fontSize: 63,
                    color: "#feffd5"
                }
            }, {
                type: "Text",
                props: {
                    y: 521,
                    x: 245,
                    text: "你获得一个现金红包",
                    fontSize: 33,
                    color: "#FEDB6C"
                }
            }, {
                type: "Text",
                props: {
                    y: 571,
                    x: 330,
                    var: "openredactiontip",
                    text: "看视频领取",
                    fontSize: 25,
                    color: "#FEA963"
                }
            }, {
                type: "Text",
                props: {
                    y: 896,
                    x: 246,
                    var: "openredTip2",
                    text: "看视频有几率翻倍！",
                    fontSize: 33,
                    color: "#FEFFD5"
                }
            }, {
                type: "Text",
                props: {
                    y: 948,
                    x: 222,
                    text: "游戏过程中可能出现现金红包",
                    fontSize: 26,
                    color: "#952B24"
                }
            }, {
                type: "Image",
                props: {
                    y: 349,
                    x: 594,
                    var: "btn_close",
                    skin: "comp/hb_kq_b_x.png"
                }
            } ]
        }, {
            type: "Sprite",
            props: {
                y: 0,
                x: 0,
                width: 750,
                visible: false,
                var: "com_tixianredpackage",
                height: 1334
            },
            child: [ {
                type: "Texture",
                props: {
                    y: -133,
                    x: 0,
                    width: 750,
                    skin: "comp/img_box_1.png",
                    height: 1600
                }
            }, {
                type: "Sprite",
                props: {
                    y: 319,
                    x: 132,
                    width: 517,
                    var: "loader_tixian",
                    pivotY: .5,
                    pivotX: .5,
                    height: 695
                }
            }, {
                type: "Text",
                props: {
                    y: 381,
                    x: 311,
                    text: "现金红包",
                    fontSize: 40,
                    color: "#CE8B52"
                }
            }, {
                type: "Text",
                props: {
                    y: 523,
                    x: 225,
                    text: "余额:",
                    fontSize: 30,
                    color: "#F94A05"
                }
            }, {
                type: "Text",
                props: {
                    y: 673,
                    x: 289,
                    text: "红包满20元可提现",
                    fontSize: 25,
                    color: "#CE8B52"
                }
            }, {
                type: "Text",
                props: {
                    y: 827,
                    x: 335,
                    var: "btn_tixian",
                    text: "提现",
                    mouseEnabled: true,
                    fontSize: 50,
                    color: "#FEFFD5"
                }
            }, {
                type: "Text",
                props: {
                    y: 901,
                    x: 222,
                    text: "游戏过程中可能出现现金红包",
                    fontSize: 26,
                    color: "#992D27"
                }
            }, {
                type: "Image",
                props: {
                    y: 349,
                    x: 594,
                    var: "btn_close_tixian",
                    skin: "comp/hb_kq_b_x.png"
                }
            }, {
                type: "Text",
                props: {
                    y: 483,
                    x: 294,
                    width: 200,
                    var: "moneyNum",
                    text: "12.00",
                    pivotY: .5,
                    pivotX: .5,
                    height: 80,
                    fontSize: 80,
                    color: "#F94A05",
                    align: "center"
                }
            }, {
                type: "Text",
                props: {
                    y: 523,
                    x: 503,
                    text: "元",
                    fontSize: 30,
                    color: "#F94A05"
                }
            } ]
        }, {
            type: "Sprite",
            props: {
                y: 0,
                x: 0,
                width: 750,
                visible: false,
                var: "com_awradredpackage",
                height: 1334
            },
            child: [ {
                type: "Texture",
                props: {
                    y: -133,
                    x: 0,
                    width: 750,
                    skin: "comp/img_box_1.png",
                    height: 1600
                }
            }, {
                type: "Sprite",
                props: {
                    y: 319,
                    x: 132,
                    width: 517,
                    var: "loader_award",
                    pivotY: .5,
                    pivotX: .5,
                    height: 695
                }
            }, {
                type: "Text",
                props: {
                    y: 381,
                    x: 269,
                    text: "获得现金红包",
                    fontSize: 40,
                    color: "#CE8B52"
                }
            }, {
                type: "Text",
                props: {
                    y: 550,
                    x: 278,
                    text: "红包满20元可提现",
                    fontSize: 25,
                    color: "#CE8B52"
                }
            }, {
                type: "Text",
                props: {
                    y: 827,
                    x: 335,
                    var: "btn_tixian_award",
                    text: "提现",
                    mouseEnabled: true,
                    fontSize: 50,
                    color: "#FEFFD5"
                }
            }, {
                type: "Text",
                props: {
                    y: 901,
                    x: 222,
                    text: "游戏过程中可能出现现金红包",
                    fontSize: 26,
                    color: "#992D27"
                }
            }, {
                type: "Image",
                props: {
                    y: 349,
                    x: 594,
                    var: "btn_close_award",
                    skin: "comp/hb_kq_b_x.png"
                }
            }, {
                type: "Text",
                props: {
                    y: 621,
                    x: 312,
                    width: 134,
                    var: "moneyNum_award",
                    text: "12.00",
                    pivotY: .5,
                    pivotX: .5,
                    height: 55,
                    fontSize: 50,
                    color: "#F94A05",
                    align: "center"
                }
            }, {
                type: "Text",
                props: {
                    y: 491,
                    x: 260,
                    text: "余额:",
                    fontSize: 30,
                    color: "#F94A05"
                }
            }, {
                type: "Text",
                props: {
                    y: 476,
                    x: 327,
                    width: 127,
                    var: "allMoney_award",
                    text: "12.00",
                    height: 54,
                    fontSize: 50,
                    color: "#F94A05",
                    align: "center"
                }
            }, {
                type: "Text",
                props: {
                    y: 491,
                    x: 462,
                    text: "元",
                    fontSize: 30,
                    color: "#F94A05"
                }
            }, {
                type: "Text",
                props: {
                    y: 693,
                    x: 319,
                    text: "已存入余额",
                    fontSize: 25,
                    color: "#CE8B52"
                }
            } ]
        }, {
            type: "Sprite",
            props: {
                y: 0,
                x: 0,
                width: 750,
                visible: false,
                var: "com_everyday",
                height: 1334
            },
            child: [ {
                type: "Texture",
                props: {
                    y: -133,
                    x: 0,
                    width: 750,
                    skin: "comp/img_box_1.png",
                    height: 1600
                }
            }, {
                type: "Sprite",
                props: {
                    y: 238,
                    x: 57,
                    width: 635,
                    var: "loader_everyday",
                    pivotY: .5,
                    pivotX: .5,
                    height: 857
                }
            }, {
                type: "Image",
                props: {
                    y: 151,
                    x: 170,
                    skin: "comp/meiridenglu.png"
                }
            }, {
                type: "List",
                props: {
                    y: 313,
                    x: 129,
                    width: 505,
                    var: "list_six",
                    spaceY: 10,
                    spaceX: 80,
                    repeatY: 2,
                    repeatX: 3,
                    mouseEnabled: false,
                    height: 361
                },
                child: [ {
                    type: "Box",
                    props: {
                        y: 0,
                        x: 0,
                        width: 114,
                        renderType: "render",
                        height: 174
                    },
                    child: [ {
                        type: "Image",
                        props: {
                            width: 114,
                            skin: "comp/meitian_hb.png",
                            name: "img_icon",
                            height: 130
                        }
                    }, {
                        type: "Image",
                        props: {
                            y: 131,
                            x: 0,
                            skin: "comp/dijitian_di.png"
                        }
                    }, {
                        type: "Label",
                        props: {
                            y: 139,
                            x: 28,
                            text: "第1天",
                            name: "deveryNum",
                            fontSize: 23,
                            color: "#966549"
                        }
                    } ]
                } ]
            }, {
                type: "Box",
                props: {
                    y: 685,
                    x: 324,
                    width: 114,
                    var: "seven",
                    renderType: "render",
                    mouseEnabled: false,
                    height: 174
                },
                child: [ {
                    type: "Image",
                    props: {
                        width: 114,
                        skin: "comp/meitian_hb.png",
                        name: "img_icon",
                        height: 130
                    }
                }, {
                    type: "Image",
                    props: {
                        y: 133,
                        x: -38,
                        width: 195,
                        skin: "comp/dijitian_di.png",
                        sizeGrid: "0,24,0,22",
                        height: 40
                    }
                }, {
                    type: "Text",
                    props: {
                        y: 142,
                        x: -23,
                        var: "seven_text",
                        text: "第7天(翻倍领取)",
                        fontSize: 23,
                        color: "#966549"
                    }
                } ]
            }, {
                type: "Image",
                props: {
                    y: 890,
                    x: 209,
                    var: "btn_double_btn",
                    skin: "comp/button_fxjs.png"
                }
            }, {
                type: "Image",
                props: {
                    y: 1021,
                    x: 315,
                    visible: true,
                    var: "btn_red_everyday_skip",
                    skin: "comp/button_zjlq.png"
                }
            } ]
        } ]
    };
    ui.RedPacketUIUI = RedPacketUIUI;
})(ui || (ui = {}));

(function(ui) {
    var SdkDialogUIUI = function(_super) {
        __extends(SdkDialogUIUI, _super);
        function SdkDialogUIUI() {
            return _super.call(this) || this;
        }
        SdkDialogUIUI.prototype.createChildren = function() {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.SdkDialogUIUI.uiView);
        };
        return SdkDialogUIUI;
    }(View);
    SdkDialogUIUI.uiView = {
        type: "View",
        props: {
            width: 750,
            mouseThrough: true,
            height: 1334
        },
        child: [ {
            type: "Image",
            props: {
                y: 639,
                x: -543,
                width: 1836,
                skin: "comp/img_box_1.png",
                sizeGrid: "33,28,19,28",
                height: 55
            }
        }, {
            type: "Text",
            props: {
                y: 666,
                x: 377,
                width: 750,
                var: "dialogtext",
                valign: "middle",
                text: "示111语",
                pivotY: 27,
                pivotX: 375,
                name: "dialogtext",
                height: 55,
                fontSize: 28,
                color: "#ffffff",
                align: "center"
            }
        } ]
    };
    ui.SdkDialogUIUI = SdkDialogUIUI;
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
                _this.zOrder = PfuSdk.UI_FIRST_SCENEBOX;
                Laya.stage.updateZOrder();
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
                if (data.wechatGameid == PFU.PfuConfig.Config.wxId) {
                    this.OnCloseUI();
                    return;
                }
                PFU.PfuManager.GetInstance().ShowCrossGameImage(data, this, function() {});
            };
            FirstSceneBoxUI.prototype.OnClickItem = function(e, index) {
                if (e.type == Laya.Event.CLICK) {
                    if (this.allgame[index].data.wechatGameid == PFU.PfuConfig.Config.wxId) {
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
                _this.isLockLeftBtn = false;
                _this.isLeftOpen = false;
                _this.posx = 0;
                _this.boxList_left.visible = false;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                UI.SceneMatchingLayaUtils.SetAlignBottom(_this.box);
                _this.btn_redpackageicon.on(Laya.Event.CLICK, _this, _this.OnClickRedIcon);
                _this.zOrder = PfuSdk.UI_ORDER_MOREGAME;
                Laya.stage.updateZOrder();
                return _this;
            }
            MoreGameUI.prototype.OnClickRedIcon = function() {
                if (PFU.PfuRedPacketManager.GetInstance().CanEverydayAward()) {
                    PFU.UI.PfuSdkLayaUI.OpenEverydayGift();
                } else {
                    PFU.UI.PfuSdkLayaUI.OpenRadPacketTixian();
                }
            };
            MoreGameUI.prototype.UpdateIconMoney = function() {
                this.moneyNumStr.text = "¥" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
            };
            MoreGameUI.prototype.SetIconBtnPos = function(xv, yv) {
                this.btn_redpackageicon.x = xv;
                this.btn_redpackageicon.y = yv;
            };
            MoreGameUI.prototype.SetIconVisible = function(visible) {
                this.btn_redpackageicon.visible = visible;
            };
            MoreGameUI.prototype.OnUpdate = function() {
                if (!this._isCreateSideMoreGameBtn && PfuSdk.GetParamComplete) {
                    this.CreateSideMoreGameBtn();
                    this._isCreateSideMoreGameBtn = true;
                }
                if (!this._isCreateMoreGameListBar && PfuSdk.GetBoxListComplete) {
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
                    this.btn_left.y = this.btn_left.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY;
                    this.btn_right.y = this.btn_right.y + PFU.PfuMoreGameUpdate.GetInstance().moreGameOffsetY;
                    PFU.PfuMoreGameUpdate.GetInstance().EndMoreGameUIOffsetY();
                }
            };
            MoreGameUI.prototype.OnHide = function() {
                this.moregameCtl.visible = false;
                Laya.timer.clearAll(this);
            };
            MoreGameUI.prototype.OnShow = function(type) {
                this.moregameCtl.visible = true;
                Laya.timer.frameLoop(1, this, this.OnUpdate);
                this._isShowType = type;
                this.Refresh();
            };
            MoreGameUI.prototype.Refresh = function() {
                var type = this._isShowType;
                this.box.visible = true;
                this.btn_right.visible = true;
                this.btn_left.visible = true;
                if (!type || type == PfuSdk.SHOW_TYPE_ALL) {} else {
                    if (type == PfuSdk.SHOW_TYPE_MOREGAME) {
                        this.box.visible = false;
                    } else if (type == PfuSdk.SHOW_TYPE_BOXLIST) {
                        this.HideMoreGameLeftRight();
                    }
                }
                this.RefreshMoreGameVisible();
            };
            MoreGameUI.prototype.HideMoreGameLeftRight = function() {
                this.btn_right.visible = false;
                this.btn_left.visible = false;
            };
            MoreGameUI.prototype.RefreshMoreGameVisible = function() {
                if (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_moreGameType == 1) {
                    this.btn_right.visible = false;
                } else if (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_moreGameType == 2) {
                    this.btn_left.visible = false;
                }
                if (PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_crossGameListType == -1) {
                    this.box.visible = false;
                }
                if (PFU.PfuGlobal.GetOLParam().pfuSdkMoreGame == PFU.PfuSwitch.OFF || PFU.PfuConfig.Config && PFU.PfuConfig.Config.ui_moreGameType == -1) {
                    this.btn_left.visible = false;
                    this.btn_right.visible = false;
                }
                if (PfuSdk.IsTestModel()) {
                    this.box.visible = false;
                }
            };
            MoreGameUI.prototype.CreateSideMoreGameBtn = function() {
                var _this = this;
                this.btn_left.on(Laya.Event.CLICK, this, this.ClickMoreGame, [ true ]);
                this.btn_right.on(Laya.Event.CLICK, this, this.ClickMoreGame, [ false ]);
                this.RefreshMoreGameIcon();
                PFU.PfuMoreGameUpdate.GetInstance().SetChangeHandle(this, function() {
                    _this.RefreshMoreGameIcon();
                });
                this.Refresh();
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
                    this.box_bg.visible = true;
                    this.boxlist.visible = true;
                } else {
                    this.img_title.visible = false;
                    this.box_bg.visible = false;
                    this.boxlist.visible = false;
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
            MoreGameUI.prototype.ShowLeft = function() {
                if (PfuSdk.IsTestModel()) {
                    return;
                }
                if (PFU.PfuBoxList.GetInstance().GetMoreGameListData().length < 1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this.boxList_left.visible = true;
                }
            };
            MoreGameUI.prototype.HideLeft = function() {
                if (PfuSdk.IsTestModel()) {
                    return;
                }
                if (PFU.PfuBoxList.GetInstance().GetMoreGameListData().length < 1) {
                    return;
                }
                if (PFU.PfuConfig.Config.ui_crossGameListType != -1) {
                    this.boxList_left.visible = false;
                }
            };
            MoreGameUI.prototype.CreateMoreGameListLeft = function() {
                var _this = this;
                var list = PFU.PfuBoxList.GetInstance().GetMoreGameListData();
                var count = list.length;
                if (count > 0) {
                    this.btn_list_open.visible = true;
                    this.boxlist_left_btn_bg.visible = true;
                } else {
                    this.btn_list_open.visible = false;
                    this.boxlist_left_btn_bg.visible = false;
                }
                this.allgame = [];
                var boxListData;
                this.boxlist_array_left.hScrollBarSkin = "";
                this.boxlist_array_left.scrollBar.min = 0;
                this.boxlist_array_left.scrollBar.max = 300;
                this.boxlist_array_left.mouseHandler = new Laya.Handler(this, this.OnClickMoreGameListItem);
                this.boxlist_array_left.scrollBar.elasticBackTime = 200;
                this.boxlist_array_left.scrollBar.elasticDistance = 50;
                for (var i = 0; i < count; i++) {
                    boxListData = list[i];
                    this.allgame.push({
                        img_icon: boxListData.link,
                        gameName: {
                            text: boxListData.gameName
                        },
                        boxListData: boxListData
                    });
                    this.boxlist_array_left.array = this.allgame;
                }
                this.btn_list_open.on(Laya.Event.CLICK, this, function() {
                    if (_this.isLockLeftBtn) {
                        return;
                    }
                    _this.isLockLeftBtn = true;
                    if (!_this.isLeftOpen) {
                        _this.showLift.play(0, false);
                        Laya.timer.once(500, _this, function() {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = true;
                        });
                    } else {
                        _this.hideLift.play(0, false);
                        Laya.timer.once(500, _this, function() {
                            _this.isLockLeftBtn = false;
                            _this.isLeftOpen = false;
                        });
                    }
                });
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
                _this.zOrder = PfuSdk.UI_ORDER_MOREGAME;
                Laya.stage.updateZOrder();
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
                {
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
        var ClickBannerUI = function(_super) {
            __extends(ClickBannerUI, _super);
            function ClickBannerUI() {
                var _this = _super.call(this) || this;
                _this.visible = false;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                _this.cancel.on(Laya.Event.CLICK, _this, function() {
                    PFU.PfuClickBannerRevive.GetInstance().Cancel();
                });
                _this.loaderImg.skin = PFU.PfuGlobal.SDK_RES_CDN_PATH + "bannerrevive/clickbannerbg.jpg";
                _this.zOrder = PfuSdk.UI_ORDER_OTHER;
                Laya.stage.updateZOrder();
                return _this;
            }
            ClickBannerUI.prototype.OnUpdate = function() {};
            ClickBannerUI.prototype.Show = function() {
                this.visible = true;
            };
            ClickBannerUI.prototype.Hide = function() {
                this.visible = false;
            };
            return ClickBannerUI;
        }(ui.ClickBannerUIUI);
        UI.ClickBannerUI = ClickBannerUI;
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
        var RedPacketUI = function(_super) {
            __extends(RedPacketUI, _super);
            function RedPacketUI() {
                var _this = _super.call(this) || this;
                _this.awradPackageType = 0;
                Laya.timer.frameLoop(1, _this, _this.OnUpdate);
                _this.InitIconEvent();
                _this.bg_loader.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_di.png");
                _this.loader_everyday.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/denglujl_di.png");
                _this.loader_award.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png");
                _this.loader_tixian.loadImage(PFU.PfuGlobal.SDK_RES_CDN_PATH + "redgift/hb_kq_di.png");
                _this.btn_close_tixian.on(Laya.Event.CLICK, _this, function() {
                    _this.com_tixianredpackage.visible = false;
                });
                _this.btn_tixian.on(Laya.Event.CLICK, _this, function() {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                _this.btn_tixian_award.on(Laya.Event.CLICK, _this, function() {
                    PFU.PfuRedPacketManager.GetInstance().ShowTXDialog();
                });
                _this.btn_close_award.on(Laya.Event.CLICK, _this, function() {
                    _this.com_awradredpackage.visible = false;
                    if (_this.awradPackageType == 1) PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.SUCCESS);
                });
                _this.btn_close.on(Laya.Event.CLICK, _this, function() {
                    _this.com_openredpackage.visible = false;
                    PFU.PfuRedPacketManager.GetInstance().AwardRedpacketAction(PfuSdk.FAIL);
                });
                _this.btn_red_open.on(Laya.Event.CLICK, _this, _this.OnRedPacketGiftAward);
                _this.zOrder = PfuSdk.UI_ORDER_OTHER;
                Laya.stage.updateZOrder();
                if (PFU.PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                    _this.openredactiontip.text = "看视频领取";
                    _this.openredTip2.text = "看视频有几率翻倍！";
                } else {
                    _this.openredactiontip.text = "分享领取";
                    _this.openredTip2.text = "分享有几率翻倍！";
                }
                return _this;
            }
            RedPacketUI.prototype.OnUpdate = function() {};
            RedPacketUI.prototype.InitIconEvent = function() {
                this.btn_red_everyday_skip.on(Laya.Event.CLICK, this, this.OnEverydaySkip);
                this.btn_double_btn.on(Laya.Event.CLICK, this, this.OnEveryDoubleAward);
                this.UpdateIconMoney();
            };
            RedPacketUI.prototype.UpdateIconMoney = function() {
                PFU.UI.PfuSdkLayaUI.UpdateIconMoney();
            };
            RedPacketUI.prototype.OpenEverydayGift = function() {
                this.SetEveryDayCom();
                this.com_everyday.visible = true;
            };
            RedPacketUI.prototype.SetEveryDayCom = function() {
                var count = 6;
                var allgame = [];
                var boxListData;
                this.list_six.hScrollBarSkin = "";
                this.list_six.scrollBar.min = 0;
                this.list_six.scrollBar.max = 300;
                this.list_six.scrollBar.elasticBackTime = 200;
                this.list_six.scrollBar.elasticDistance = 50;
                for (var i = 0; i < count; i++) {
                    if (i < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                        allgame.push({
                            deveryNum: {
                                text: "已领取"
                            }
                        });
                        continue;
                    }
                    allgame.push({
                        deveryNum: {
                            text: "第" + (i + 1) + "天"
                        }
                    });
                }
                this.list_six.array = allgame;
                this.list_six.vScrollBarSkin = "";
                if (6 < PFU.PfuRedPacketManager.GetInstance().GetEverydayAwardCount()) {
                    this.seven_text.text = "已领取";
                } else {
                    this.seven_text.text = "第" + 7 + "天(超大红包)";
                }
            };
            RedPacketUI.prototype.OnEverydaySkip = function() {
                this.com_everyday.visible = false;
                this.EverydayAward(false);
            };
            RedPacketUI.prototype.EverydayAward = function(isDouble) {
                var award = PFU.PfuRedPacketManager.GetInstance().AwardEveryDay(isDouble);
                this.UpdateIconMoney();
                this.awradPackageType = 0;
                this.OpenAwardRadPacket(award);
            };
            RedPacketUI.prototype.OnEveryDoubleAward = function() {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this.com_everyday.visible = false;
                    this.EverydayAward(true);
                    return;
                }
                PfuSdk.ShareAward(this, function(type) {
                    if (type == PfuSdk.SUCCESS) {
                        _this.com_everyday.visible = false;
                        _this.EverydayAward(true);
                    } else {}
                });
            };
            RedPacketUI.prototype.OpenRadPacketTixian = function() {
                this.com_tixianredpackage.visible = true;
                this.moneyNum.text = "" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
            };
            RedPacketUI.prototype.OpenRadPacketGift = function() {
                this.com_openredpackage.visible = true;
            };
            RedPacketUI.prototype.OnRedPacketGiftAward = function() {
                var _this = this;
                if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                    this.RedPacketGiftAward();
                    return;
                }
                if (PFU.PfuRedPacketManager.OPEN_RED_ACTION_VIDEO) {
                    PfuSdk.Video(this, function(type) {
                        if (type == PfuSdk.SUCCESS) {
                            _this.RedPacketGiftAward();
                        } else {}
                    });
                } else {
                    PfuSdk.ShareAward(this, function(type) {
                        if (type == PfuSdk.SUCCESS) {
                            _this.RedPacketGiftAward();
                        } else {}
                    });
                }
            };
            RedPacketUI.prototype.RedPacketGiftAward = function() {
                this.com_openredpackage.visible = false;
                var award = PFU.PfuRedPacketManager.GetInstance().AwardGift();
                this.awradPackageType = 1;
                this.OpenAwardRadPacket(award);
                this.UpdateIconMoney();
            };
            RedPacketUI.prototype.OpenAwardRadPacket = function(award) {
                this.com_awradredpackage.visible = true;
                this.allMoney_award.text = "" + PFU.PfuRedPacketManager.GetInstance().GetMoney();
                this.moneyNum_award.text = "" + award.toFixed(2);
            };
            RedPacketUI.prototype.ForceCloseRedPacketUI = function() {
                if (this.com_openredpackage.visible) {
                    this.com_openredpackage.visible = false;
                }
                if (this.com_awradredpackage.visible) {
                    this.com_awradredpackage.visible = false;
                }
            };
            return RedPacketUI;
        }(ui.RedPacketUIUI);
        UI.RedPacketUI = RedPacketUI;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));