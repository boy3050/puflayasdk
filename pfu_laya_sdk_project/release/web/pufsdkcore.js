var PFU;

(function(PFU) {
    var WeChatUtils = function() {
        function WeChatUtils() {}
        WeChatUtils.GetInstance = function() {
            if (!this.instance) {
                this.instance = new WeChatUtils();
            }
            return this.instance;
        };
        WeChatUtils.prototype.IsWeGame = function() {
            return Laya.Browser.onMiniGame;
        };
        WeChatUtils.prototype.PreviewImage = function(imgeUrl) {
            if (this.IsWeGame()) {
                wx.previewImage({
                    urls: [ imgeUrl ]
                });
            }
        };
        WeChatUtils.prototype.ShowShareMenu = function() {
            if (this.IsWeGame()) {
                wx.showShareMenu();
            }
        };
        WeChatUtils.prototype.HideShareMenu = function() {
            if (this.IsWeGame()) {
                wx.HideShareMenu();
            }
        };
        WeChatUtils.prototype.OnShareAppMessage = function(fun, titleStr, imageUrl) {
            if (this.IsWeGame()) {
                wx.onShareAppMessage(function() {
                    return {
                        title: titleStr,
                        imageUrl: imageUrl
                    };
                });
            }
        };
        WeChatUtils.prototype.ShareAppMessage = function(fun, titleTxt) {
            if (this.IsWeGame()) {
                wx.shareAppMessage({
                    title: titleTxt,
                    success: function(res) {
                        fun(PfuSdk.SUCCESS);
                    },
                    fail: function(res) {
                        fun(PfuSdk.FAIL);
                    }
                });
            }
        };
        WeChatUtils.prototype.ShareAppMessageImage = function(fun, titleStr, imageUrl, paramQuery) {
            if (this.IsWeGame()) {
                wx.shareAppMessage({
                    title: titleStr,
                    imageUrl: imageUrl,
                    query: paramQuery,
                    success: function(res) {
                        fun(PfuSdk.SUCCESS);
                        console.log("PfuSdk.SUCCESS");
                    },
                    fail: function(res) {
                        fun(PfuSdk.FAIL);
                        console.log("PfuSdk.FAIL 1");
                    }
                });
            }
        };
        WeChatUtils.prototype.ShareGroupAppMessageImage = function(isGroup, fun, titleStr, imageUrl, paramQuery) {
            if (this.IsWeGame()) {
                wx.shareAppMessage({
                    title: titleStr,
                    imageUrl: imageUrl,
                    query: paramQuery
                });
            }
        };
        WeChatUtils.prototype.GetLaunchOptionsSync = function() {
            if (this.IsWeGame()) {
                if (WeChatUtils._launchOptons == null) {
                    var launch = wx.getLaunchOptionsSync();
                    WeChatUtils._launchOptons = launch;
                    console.log("scene:" + launch.scene);
                    console.log("query:" + launch.query);
                    console.log("isSticky:" + launch.isSticky);
                    console.log("shareTicket:" + launch.shareTicket);
                    console.log("referrerInfo" + launch.referrerInfo);
                }
            }
            return WeChatUtils._launchOptons;
        };
        WeChatUtils.prototype.GetAdAid = function() {
            var launchOption = this.GetLaunchOptionsSync();
            if (launchOption.query && launchOption.query.weixinadinfo) {
                var weixinadinfoArr = launchOption.query.weixinadinfo.split(".");
                var aid = weixinadinfoArr[0];
                console.log("来源广告的广告id是:" + aid);
                return aid;
            }
            return null;
        };
        WeChatUtils.prototype.OnAppHide = function(callBack) {
            if (this.IsWeGame()) {
                wx.onHide(callBack);
            }
        };
        WeChatUtils.prototype.OnAppShow = function(callBack) {
            if (this.IsWeGame()) {
                wx.onShow(callBack);
            }
        };
        WeChatUtils.prototype.SetTicketShareTicket = function(isTicket, complete) {
            if (!this.IsWeGame()) {
                complete();
                return;
            }
            wx.updateShareMenu({
                withShareTicket: isTicket,
                complete: function(res) {
                    complete();
                }
            });
        };
        WeChatUtils.prototype.NavigateToMiniProgram = function(callServer, fun, wechatAppId, pfuPath) {
            if (this.IsWeGame()) {
                wx.navigateToMiniProgram({
                    appId: wechatAppId,
                    path: pfuPath,
                    envVersion: "release",
                    success: function(res) {
                        fun.call(callServer, pfuPath);
                        console.log("success" + res);
                    },
                    fail: function(res) {
                        fun.call(callServer, pfuPath);
                        console.log("fail" + res);
                    }
                });
            }
        };
        WeChatUtils.prototype.IsNavigateToMiniVersion = function() {
            if (this.IsWeGame()) {
                if (typeof wx.navigateToMiniProgram === "function") {
                    return true;
                }
            }
            return false;
        };
        WeChatUtils.prototype.LoadSubpackage = function(subName, callback, callProgress) {
            if (!this.IsWeGame()) {
                callback(PfuSdk.SUCCESS);
                return;
            }
            if (typeof wx.loadSubpackage === "function") {
                var loadTask = wx.loadSubpackage({
                    name: subName,
                    success: function(res) {
                        callback(PfuSdk.SUCCESS);
                    },
                    fail: function(res) {
                        callback(PfuSdk.FAIL);
                    }
                });
            } else {
                callback(PfuSdk.SUCCESS);
            }
        };
        WeChatUtils.prototype.GetSystemInfoSync = function() {
            if (!this.IsWeGame()) {
                return null;
            }
            return wx.getSystemInfoSync();
        };
        WeChatUtils.prototype.GetBenchmarkLevel = function() {
            if (!this.IsWeGame()) {
                return -99;
            }
            return this.GetSystemInfoSync().benchmarkLevel;
        };
        WeChatUtils.prototype.ShowSingleModal = function(title, content, fun) {
            wx.showModal({
                title: title,
                content: content,
                showCancel: false,
                success: function() {
                    fun();
                }
            });
        };
        WeChatUtils.prototype.SetUpdateApp = function() {
            if (!this.IsWeGame()) {
                return;
            }
            var updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function(res) {
                console.log(res.hasUpdate);
            });
            updateManager.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function() {});
        };
        return WeChatUtils;
    }();
    WeChatUtils.IN_GAME_FROM_1001 = 1001;
    WeChatUtils.IN_GAME_FROM_1020 = 1020;
    WeChatUtils.IN_GAME_FROM_1024 = 1024;
    WeChatUtils.IN_GAME_FROM_1035 = 1035;
    WeChatUtils.IN_GAME_FROM_1037 = 1037;
    WeChatUtils._launchOptons = null;
    PFU.WeChatUtils = WeChatUtils;
    var LaunchOption = function() {
        function LaunchOption() {}
        return LaunchOption;
    }();
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var WeChatOpenUtils = function() {
        function WeChatOpenUtils() {
            this._textureSprite = null;
            this._texture = null;
        }
        WeChatOpenUtils.GetInstance = function() {
            if (!this.instance) {
                this.instance = new WeChatOpenUtils();
            }
            return this.instance;
        };
        WeChatOpenUtils.prototype.SetUserOnlyCloudStorage = function(sKey, sValue) {
            var _this = this;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                var keydata = [ {
                    key: sKey,
                    value: sValue
                } ];
                wx.setUserCloudStorage({
                    KVDataList: keydata,
                    success: function(res) {
                        WeChatOpenUtils.wxPostMessage({
                            messageId: WeChatOpenUtils.MESSAGE_ID_UPDATE_MAXSCORE
                        }, _this, function() {});
                        console.log(res);
                    },
                    fail: function(res) {
                        console.log(res);
                    }
                });
            }
        };
        WeChatOpenUtils.prototype.CallInitCanvas = function(message) {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                var openDataContext = wx.getOpenDataContext();
                var texture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                texture.bitmap.alwaysChange = true;
                var sprite = new Laya.Sprite();
                Laya.stage.addChild(sprite);
                sprite.graphics.drawTexture(texture, 0, 0, Laya.stage.desginWidth, Laya.stage.desginHeight);
                console.log("初始化获得离屏数据");
                this._textureSprite = sprite;
                this._texture = texture;
                this._textureSprite.visible = false;
            }
        };
        WeChatOpenUtils.prototype.InitSharedCanvas = function() {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_INIT
                }, this, this.CallInitCanvas);
            }
        };
        WeChatOpenUtils.prototype.ShowSharedCanvas = function() {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (this._textureSprite == null) return;
                this._textureSprite.visible = true;
            }
        };
        WeChatOpenUtils.prototype.HideShardCanvas = function() {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (this._textureSprite == null) return;
                this._textureSprite.visible = false;
            }
        };
        WeChatOpenUtils.prototype.ShowFriendRank = function(data) {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_DRAW_RANK,
                    rankDrawData: data
                }, this, function() {});
            }
        };
        WeChatOpenUtils.prototype.ShowFriedNeighbor = function(data) {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_NEIGHBOR,
                    rankDrawData: data
                }, this, function() {});
            }
        };
        WeChatOpenUtils.prototype.ShowUpperRank = function(data) {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_DRAWUPPER,
                    rankDrawData: data
                }, this, function() {});
            }
        };
        WeChatOpenUtils.wxPostMessage = function(message, caller, callback) {
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                var wx_1 = Laya.Browser.window.wx;
                if (wx_1 != undefined) {
                    console.log("wxPostMessage :" + message);
                    var openDataContext = wx_1.getOpenDataContext();
                    openDataContext.postMessage(message);
                    Laya.timer.once(400, this, function() {
                        if (caller == null || caller == undefined) {
                            callback(message);
                        } else {
                            callback.call(caller, message);
                        }
                    });
                } else {
                    console.log("wx=null");
                }
            }
        };
        WeChatOpenUtils.InitOpenDataOnMessage = function(fun) {
            wx.onMessage(function(data) {
                console.log("zi yu:" + data);
                if (data.messageId == WeChatOpenUtils.MESSAGE_ID_INIT) {
                    console.log("初始化!成功");
                    fun(data.messageId);
                } else if (data.messageId == WeChatOpenUtils.MESSAGE_ID_UPDATE_MAXSCORE) {
                    console.log("更新最高分");
                    fun(data.messageId);
                } else if (data.messageId == WeChatOpenUtils.MESSAGE_ID_DRAW_RANK) {
                    console.log("完整好友排行");
                    fun(data.messageId);
                } else if (data.messageId == WeChatOpenUtils.MESSAGE_ID_NEIGHBOR) {
                    console.log("绘制临近的排行");
                    fun(data.messageId);
                }
                if (data["isLoad"] == "filedata") {
                    laya.wx.mini.MiniFileMgr.ziyuFileData[data.url] = data.data;
                } else if (data["isLoad"] == "filenative") {
                    if (data.isAdd) laya.wx.mini.MiniFileMgr.filesListObj[data.url] = data.data; else delete laya.wx.mini.MiniFileMgr.filesListObj[data.url];
                } else if (data["type"] == "resizeShared") {}
            });
        };
        return WeChatOpenUtils;
    }();
    WeChatOpenUtils.MESSAGE_ID_INIT = 1001;
    WeChatOpenUtils.MESSAGE_ID_UPDATE_MAXSCORE = 1002;
    WeChatOpenUtils.MESSAGE_ID_DRAW_RANK = 1003;
    WeChatOpenUtils.MESSAGE_ID_NEIGHBOR = 1004;
    WeChatOpenUtils.MESSAGE_ID_DRAWUPPER = 1005;
    PFU.WeChatOpenUtils = WeChatOpenUtils;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var WeChatIncentiveAd = function() {
        function WeChatIncentiveAd() {
            this._isReady = false;
        }
        WeChatIncentiveAd.GetInstance = function() {
            if (!this.instance) {
                this.instance = new WeChatIncentiveAd();
            }
            return this.instance;
        };
        WeChatIncentiveAd.prototype.Create = function(adId) {
            var _this = this;
            if (adId == "0") {
                var curVer = PFU.LocalSaveUtils.GetItem(WeChatIncentiveAd.SAVE_INCENTIVE_KEY);
                if (curVer == null || curVer == "") {
                    return;
                } else {
                    adId = adId;
                }
            } else {
                PFU.LocalSaveUtils.SaveItem(WeChatIncentiveAd.SAVE_INCENTIVE_KEY, adId);
            }
            if (adId == "0") {
                return;
            }
            this._adId = adId;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === "function") {
                    this._rewardedVideoAd = wx.createRewardedVideoAd({
                        adUnitId: adId
                    });
                    this._rewardedVideoAd.onLoad(function() {
                        _this._isReady = true;
                    });
                    this._rewardedVideoAd.onError(function(err) {
                        console.log("Create AD:" + err);
                        if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                        _this._playCallback = null;
                    });
                    this._rewardedVideoAd.onClose(function(res) {
                        if (res && res.isEnded || res === undefined) {
                            if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.SUCCESS);
                            _this._playCallback = null;
                        } else {
                            if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.FAIL);
                            _this._playCallback = null;
                        }
                    });
                }
            }
        };
        WeChatIncentiveAd.prototype.IsReady = function() {
            if (!this._isReady) {
                return false;
            }
            if (this._rewardedVideoAd == null) {
                return false;
            }
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }
            return true;
        };
        WeChatIncentiveAd.prototype.IsRewardedReady = function() {
            if (this._rewardedVideoAd == null) {
                return false;
            }
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }
            return true;
        };
        WeChatIncentiveAd.prototype.Show = function(service, fun, adunit) {
            var _this = this;
            this._playService = service;
            this._playCallback = fun;
            if (!adunit || adunit == null || adunit == "") {
                if (this.IsRewardedReady()) {
                    this._rewardedVideoAd.show().catch(function(err) {
                        _this._rewardedVideoAd.load().then(function() {
                            return _this._rewardedVideoAd.show().catch(function(err) {
                                if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                                _this._playCallback = null;
                            });
                        }).catch(function(err) {
                            if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                            _this._playCallback = null;
                        });
                    });
                } else {
                    if (this._playCallback) this._playCallback.call(this._playService, PfuSdk.FAIL);
                    this._playCallback = null;
                }
            } else {
                this.PlayNewVideo(adunit);
            }
        };
        WeChatIncentiveAd.prototype.PlayNewVideo = function(adunit) {
            var _this = this;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === "function") {
                    var video = wx.createRewardedVideoAd({
                        adUnitId: adunit
                    });
                    video.onLoad(function() {});
                    video.onError(function(err) {
                        console.log("video Ad = NULL");
                        if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.FAIL);
                        _this._playCallback = null;
                    });
                    video.onClose(function(res) {
                        if (res && res.isEnded || res === undefined) {
                            if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.SUCCESS);
                            _this._playCallback = null;
                        } else {
                            if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.FAIL);
                            _this._playCallback = null;
                        }
                    });
                    this._rewardedVideoAd.show().catch(function(err) {
                        _this._rewardedVideoAd.load().then(function() {
                            return _this._rewardedVideoAd.show().catch(function(err) {
                                if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                                _this._playCallback = null;
                            });
                        }).catch(function(err) {
                            if (_this._playCallback) _this._playCallback.call(_this._playService, PfuSdk.VIDEO_SHOW_FAIL);
                            _this._playCallback = null;
                        });
                    });
                }
            }
        };
        return WeChatIncentiveAd;
    }();
    WeChatIncentiveAd.SAVE_INCENTIVE_KEY = "s_incentive_id";
    PFU.WeChatIncentiveAd = WeChatIncentiveAd;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var BannerDirction;
    (function(BannerDirction) {
        BannerDirction[BannerDirction["DOWN_CENTER"] = 0] = "DOWN_CENTER";
        BannerDirction[BannerDirction["TOP_CENTER"] = 1] = "TOP_CENTER";
    })(BannerDirction = PFU.BannerDirction || (PFU.BannerDirction = {}));
    var WeChatBannerAd = function() {
        function WeChatBannerAd() {
            this._isReady = false;
        }
        WeChatBannerAd.GetInstance = function() {
            if (!this.instance) {
                this.instance = new WeChatBannerAd();
            }
            return this.instance;
        };
        WeChatBannerAd.prototype.Create = function(adId, dir, fun) {
            var _this = this;
            if (adId == "0") {
                var curVer = PFU.LocalSaveUtils.GetItem(WeChatBannerAd.SAVE_BEANNER_KEY);
                if (curVer == null || curVer == "") {
                    return;
                } else {
                    adId = adId;
                }
            } else {
                PFU.LocalSaveUtils.SaveItem(WeChatBannerAd.SAVE_BEANNER_KEY, adId);
            }
            if (adId == "0") {
                return;
            }
            this._adId = adId;
            this._bannerDir = dir;
            var leftPos = 0;
            var topPos = 0;
            var adWidth = laya.utils.Browser.clientWidth;
            var sceneHeigth = laya.utils.Browser.clientHeight;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (typeof wx.createBannerAd === "function") {
                    this._bannerAd = wx.createBannerAd({
                        adUnitId: adId,
                        style: {
                            left: leftPos,
                            top: topPos,
                            width: 300
                        }
                    });
                    this._bannerAd.onResize(function(res) {
                        _this._bannerAd.style.width = res.width;
                        _this._bannerAd.style.heigth = res.heigth;
                        if (dir == BannerDirction.DOWN_CENTER) {
                            leftPos = (laya.utils.Browser.clientWidth - res.width) / 2;
                            var a = 0;
                            if (Laya.Browser.onAndroid && (_this.isQuanMian() || _this.isLiuHai())) {
                                a = 34;
                            }
                            topPos = laya.utils.Browser.clientHeight - res.height - a;
                        }
                        _this._bannerAd.style.left = leftPos;
                        _this._bannerAd.style.top = topPos;
                    });
                    this._bannerAd.onError(function(err) {
                        console.log(err);
                    });
                    this._bannerAd.onLoad(function() {
                        _this._isReady = true;
                        if (fun != null) fun();
                    });
                }
            }
        };
        WeChatBannerAd.prototype.IsReadyBanner = function() {
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                return false;
            }
            if (this._bannerAd == null) {
                return false;
            }
            return true;
        };
        WeChatBannerAd.prototype.isQuanMian = function() {
            var sceneWidth = laya.utils.Browser.clientWidth;
            var sceneHeigth = laya.utils.Browser.clientHeight;
            var mScreenRatio = sceneHeigth / sceneWidth;
            return 1.789 < mScreenRatio && mScreenRatio < 19 / 9;
        };
        WeChatBannerAd.prototype.isLiuHai = function() {
            var sceneWidth = laya.utils.Browser.clientWidth;
            var sceneHeigth = laya.utils.Browser.clientHeight;
            var mScreenRatio = sceneHeigth / sceneWidth;
            return mScreenRatio >= 19 / 9;
        };
        WeChatBannerAd.prototype.IsAllSceneOrLiuHaiScene = function() {
            if (this.isQuanMian()) {
                return true;
            }
            if (this.isLiuHai()) {
                return true;
            }
            return false;
        };
        WeChatBannerAd.prototype.Show = function() {
            if (this.IsReadyBanner()) {
                this._bannerAd.show();
            } else {
                this.Refresh(function() {});
            }
        };
        WeChatBannerAd.prototype.Hide = function() {
            if (this.IsReadyBanner()) {
                this._bannerAd.hide();
            }
        };
        WeChatBannerAd.prototype.Destroy = function() {
            if (this._bannerAd != null) {
                this._bannerAd.destroy();
            }
            this._isReady = false;
        };
        WeChatBannerAd.prototype.Refresh = function(fun) {
            this.Destroy();
            this.Create(this._adId, this._bannerDir, fun);
        };
        return WeChatBannerAd;
    }();
    WeChatBannerAd.SAVE_BEANNER_KEY = "s_banner_id";
    PFU.WeChatBannerAd = WeChatBannerAd;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var BIOSEXCEPTION_CODE = {
        none: 0,
        overflow: 1,
        buffererror: 2,
        paramerror: 3,
        nosupport: 4
    };
    var BiosException = function() {
        function BiosException(code) {
            this._cause = code;
        }
        return BiosException;
    }();
    var Bostream = function() {
        function Bostream(nLength, bLittleEndian) {
            if (bLittleEndian === void 0) {
                bLittleEndian = false;
            }
            this._iCurLength = 0;
            this._iEndLength = nLength;
            this._bLittleEndian = bLittleEndian;
            this._arrBuffer = new ArrayBuffer(nLength);
            this._dataView = new DataView(this._arrBuffer);
        }
        Bostream.prototype.avail = function() {
            return 0 < this._iEndLength - this._iCurLength;
        };
        Bostream.prototype.resize = function(nLength) {
            if (this._iEndLength < nLength) {
                this._iEndLength = nLength;
                this._arrBuffer = new ArrayBuffer(nLength);
                var dataView = new DataView(this._arrBuffer);
                this._dataView = dataView;
            }
            return this;
        };
        Bostream.prototype.clear = function() {
            this._iCurLength = 0;
        };
        Bostream.prototype.writeFloat32 = function(i) {
            if (this.avail()) {
                this._dataView.setFloat32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeFloat64 = function(i) {
            if (this.avail()) {
                this._dataView.setFloat64(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 8;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeInt32 = function(i) {
            if (this.avail()) {
                this._dataView.setInt32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeArray = function(arr) {
            var _this = this;
            if (!arr) return;
            var writeFunc = this.writeInt8;
            if (arr instanceof Int8Array) {
                writeFunc = this.writeInt8;
            } else if (arr instanceof Uint8Array) {
                writeFunc = this.writeUint8;
            } else if (arr instanceof Int16Array) {
                writeFunc = this.writeInt16;
            } else if (arr instanceof Uint16Array) {
                writeFunc = this.writeUint16;
            } else if (arr instanceof Int32Array) {
                writeFunc = this.writeInt32;
            } else if (arr instanceof Uint32Array) {
                writeFunc = this.writeUInt32;
            } else if (arr instanceof Float32Array) {
                writeFunc = this.writeFloat32;
            } else if (arr instanceof Float64Array) {
                writeFunc = this.writeFloat64;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.nosupport);
            }
            arr.forEach(function(v, i) {
                writeFunc.apply(_this, [ v ]);
            });
        };
        Bostream.prototype.writeChar = function(c) {
            this.writeByte(c);
        };
        Bostream.prototype.writeString = function(str) {
            for (var i = 0; i < str.length; i++) this.writeByte(str.charCodeAt(i));
        };
        Bostream.prototype.writeByte = function(short) {
            this.writeInt8(short);
        };
        Bostream.prototype.writeInt8 = function(value) {
            if (this.avail()) {
                this._dataView.setInt8(this._iCurLength, value);
                this._iCurLength++;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeShort = function(short) {
            this.writeInt16(short);
        };
        Bostream.prototype.writeInt16 = function(value) {
            if (this.avail()) {
                this._dataView.setInt16(this._iCurLength, value);
                this._iCurLength += 2;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeUInt32 = function(i) {
            if (this.avail()) {
                this._dataView.setUint32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeUChar = function(c) {
            this.writeByte(c);
        };
        Bostream.prototype.writeUString = function(str) {
            for (var i = 0; i < str.length; i++) this.writeUByte(str.charCodeAt(i));
        };
        Bostream.prototype.writeUByte = function(byte) {
            this.writeUint8(byte);
        };
        Bostream.prototype.writeUint8 = function(value) {
            if (this.avail()) {
                this._dataView.setUint8(this._iCurLength, value);
                this._iCurLength++;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeUShort = function(short) {
            this.writeUint16(short);
        };
        Bostream.prototype.writeUint16 = function(value) {
            if (this.avail()) {
                this._dataView.setUint16(this._iCurLength, value);
                this._iCurLength += 2;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.buffer = function() {
            return this._arrBuffer;
        };
        Bostream.prototype.bufferToBlob = function() {
            return new Blob([ this._arrBuffer ]);
        };
        return Bostream;
    }();
    PFU.Bostream = Bostream;
    var Biostream = function() {
        function Biostream(pArrayBuffer, bLittleEndian) {
            if (bLittleEndian === void 0) {
                bLittleEndian = false;
            }
            if (pArrayBuffer && pArrayBuffer instanceof ArrayBuffer) {
                this._iCurLength = 0;
                this._iEndLength = pArrayBuffer.byteLength;
                this._bLittleEndian = bLittleEndian;
                this._dataView = new DataView(pArrayBuffer);
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.buffererror);
            }
        }
        Biostream.prototype.avail = function() {
            return 0 < this._iEndLength - this._iCurLength;
        };
        Biostream.prototype.getAvailLength = function() {
            return this._iEndLength - this._iCurLength;
        };
        Biostream.prototype.readFloat32 = function() {
            if (this.avail()) {
                var i = this._dataView.getFloat32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readFloat64 = function() {
            if (this.avail()) {
                var i = this._dataView.getFloat64(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 8;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readInt32 = function() {
            if (this.avail()) {
                var i = this._dataView.getInt32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readUint32 = function() {
            if (this.avail()) {
                var i = this._dataView.getUint32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readInt8 = function() {
            if (this.avail()) {
                var b = this._dataView.getInt8(this._iCurLength);
                this._iCurLength++;
                return b;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readUInt8 = function() {
            if (this.avail()) {
                var b = this._dataView.getUint8(this._iCurLength);
                this._iCurLength++;
                return b;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readByte = function() {
            return this.readInt8();
        };
        Biostream.prototype.readUByte = function() {
            return this.readUInt8();
        };
        Biostream.prototype.readInt16 = function() {
            if (this.avail()) {
                var s = this._dataView.getInt16(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 2;
                return s;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readUint16 = function() {
            if (this.avail()) {
                var s = this._dataView.getUint16(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 2;
                return s;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Biostream.prototype.readShort = function() {
            return this.readInt16();
        };
        Biostream.prototype.readUShort = function() {
            return this.readUint16();
        };
        Biostream.prototype.readArray = function(arrayConstructor, nLength) {
            nLength = nLength || this.getAvailLength();
            if (!arrayConstructor) throw new BiosException(BIOSEXCEPTION_CODE.paramerror);
            var readFunc;
            if (arrayConstructor == Int8Array) {
                readFunc = this.readInt8;
            } else if (arrayConstructor == Uint8Array) {
                readFunc = this.readUInt8;
            } else if (arrayConstructor == Int16Array) {
                readFunc = this.readInt16;
            } else if (arrayConstructor == Uint16Array) {
                readFunc = this.readUint16;
            } else if (arrayConstructor == Int32Array) {
                readFunc = this.readInt32;
            } else if (arrayConstructor == Uint32Array) {
                readFunc = this.readUint32;
            } else if (arrayConstructor == Float32Array) {
                readFunc = this.readFloat32;
            } else if (arrayConstructor == Float64Array) {
                readFunc = this.readFloat64;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.nosupport);
            }
            var resultArr = new arrayConstructor(nLength);
            for (var i = 0; i < nLength; i++) resultArr[i] = readFunc.apply(this);
            return resultArr;
        };
        return Biostream;
    }();
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var LocalSaveUtils = function() {
        function LocalSaveUtils() {}
        LocalSaveUtils.GetJsonObject = function(key) {
            var json = Laya.LocalStorage.getJSON(key);
            if (json != null && json != "") {
                return JSON.parse(json);
            }
            return null;
        };
        LocalSaveUtils.SaveJsonObject = function(key, obj) {
            Laya.LocalStorage.setJSON(key, JSON.stringify(obj));
        };
        LocalSaveUtils.RemoveKey = function(key) {
            Laya.LocalStorage.removeItem(key);
        };
        LocalSaveUtils.GetItem = function(key) {
            return Laya.LocalStorage.getItem(key);
        };
        LocalSaveUtils.SaveItem = function(key, value) {
            Laya.LocalStorage.setItem(key, value);
        };
        return LocalSaveUtils;
    }();
    PFU.LocalSaveUtils = LocalSaveUtils;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var IDictionary = function() {
        function IDictionary() {
            this._object = {};
            this._keys = new Array();
        }
        IDictionary.prototype.add = function(key, value) {};
        IDictionary.prototype.get = function(key) {};
        Object.defineProperty(IDictionary.prototype, "Keys", {
            get: function() {
                return this._keys;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IDictionary.prototype, "count", {
            get: function() {
                return this._keys.length;
            },
            enumerable: true,
            configurable: true
        });
        IDictionary.prototype.clear = function() {
            delete this._object;
            this._object = {};
            this._keys.length = 0;
        };
        return IDictionary;
    }();
    PFU.IDictionary = IDictionary;
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
    var Dictionary = function(_super) {
        __extends(Dictionary, _super);
        function Dictionary() {
            return _super.call(this) || this;
        }
        Dictionary.prototype.add = function(k, value) {
            var key = "" + k;
            if (!this.has(k)) {
                this._keys.push(k);
            }
            this._object[key] = value;
        };
        Dictionary.prototype.get = function(k) {
            if (this.has(k)) {
                var key = "" + k;
                return this._object[key];
            }
            return null;
        };
        Dictionary.prototype.has = function(k) {
            var key = "" + k;
            return key in this._object;
        };
        Dictionary.prototype.remove = function(k) {
            var key = "" + k;
            if (this.has(k)) {
                delete this._object[key];
            }
            var index = this._keys.indexOf(key);
            if (index != -1) {
                this._keys.splice(index, 1);
            }
        };
        Dictionary.prototype.getKeyByIndex = function(index) {
            var k = this._keys[index];
            return k;
        };
        Dictionary.prototype.getValueByIndex = function(index) {
            var key = this.getKeyByIndex(index);
            return this.get(key);
        };
        Dictionary.prototype.containsKey = function(k) {
            return this.has(k);
        };
        Dictionary.prototype.containsValue = function(value) {
            for (var key in this._object) {
                if (this._object[key] == value) {
                    return true;
                }
            }
            return false;
        };
        return Dictionary;
    }(PFU.IDictionary);
    PFU.Dictionary = Dictionary;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var BXStringUtils = function() {
        function BXStringUtils() {}
        BXStringUtils.FormatTimeByMMSS = function(time) {
            var mm = Math.floor(time / 60);
            var ss = Math.floor(time % 60);
            var value = "";
            if (mm < 10) {
                value += "0" + mm;
            } else {
                value += mm;
            }
            value += ":";
            if (ss < 10) {
                value += "0" + ss;
            } else {
                value += ss;
            }
            return value;
        };
        BXStringUtils.ReplaceArray = function(list, str) {
            var value = "" + str;
            for (var i = 0; i < list.length; i++) {
                value = value.replace("{" + i + "}", list[i]);
            }
            return value;
        };
        BXStringUtils.Replace = function(replaceStr, str) {
            var array = [ replaceStr ];
            return BXStringUtils.ReplaceArray(array, str);
        };
        return BXStringUtils;
    }();
    PFU.BXStringUtils = BXStringUtils;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var BXRandom = function() {
        function BXRandom() {}
        BXRandom.Get = function() {
            if (this.random == null) {
                this.random = new BXRandom();
            }
            return this.random;
        };
        BXRandom.prototype.nextInt = function(start, end) {
            return Math.floor(Math.random() * (end - start) + start);
        };
        BXRandom.prototype.nextFloat = function(start, end) {
            return Math.random() * (end - start) + start;
        };
        return BXRandom;
    }();
    BXRandom.random = null;
    PFU.BXRandom = BXRandom;
    var BXRandomUtils = function() {
        function BXRandomUtils() {}
        BXRandomUtils.RandomPropIndex = function(odds) {
            var a = 0;
            for (var i = 0; i < odds.length; i++) {
                a += odds[i];
            }
            var v = BXRandom.Get().nextInt(0, a);
            a = 0;
            for (var i = 0; i < odds.length; i++) {
                a += odds[i];
                if (v < a) {
                    return i;
                }
            }
            return -1;
        };
        return BXRandomUtils;
    }();
    PFU.BXRandomUtils = BXRandomUtils;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuPlatformManager = function() {
        function PfuPlatformManager() {
            this._privateKey = "";
            this.wx_userInfo = null;
            this._respose1003User = null;
            this._shareInGameHandle = null;
            this._shareInGameCallback = null;
            this._gameId = "";
            this._isLoginPlatform = false;
            this.SAVE_KEY = "platform_user";
            this.tempAdId = null;
            this._reconnectCount = 0;
        }
        PfuPlatformManager.GetInstance = function() {
            if (!this.instance) {
                this.instance = new PfuPlatformManager();
            }
            return this.instance;
        };
        PfuPlatformManager.prototype.Init = function() {
            this._privateKey = PFU.PfuConfig.Config.privateKey;
            this.Load();
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                if (this._privateKey != "") {
                    PfuPlatformManager.GetInstance().LoginWegame(PFU.PfuConfig.Config.weChatId, PFU.PfuConfig.Config.pfuAppId);
                }
            }
        };
        PfuPlatformManager.prototype.SetInGameUserHandle = function(handle, callback) {
            this._shareInGameHandle = handle;
            this._shareInGameCallback = callback;
        };
        PfuPlatformManager.prototype.Load = function() {
            var dic = PFU.LocalSaveUtils.GetJsonObject(this.SAVE_KEY);
            this._platformUserData = new PlatformShareUserData();
            if (dic != null) {
                for (var key in dic._notifShareInGames.m_KeyValuePairs) {
                    var vs = dic._notifShareInGames.m_KeyValuePairs[key];
                    var data = vs.value;
                    this._platformUserData._notifShareInGames.add(vs.key, data);
                }
                for (var key in dic._userCache.m_KeyValuePairs) {
                    var vs = dic._userCache.m_KeyValuePairs[key];
                    var data = vs.value;
                    this._platformUserData._userCache.add(vs.key, data);
                }
            }
        };
        PfuPlatformManager.prototype.Save = function() {
            PFU.LocalSaveUtils.SaveJsonObject(this.SAVE_KEY, this._platformUserData);
        };
        PfuPlatformManager.prototype.parseMsg2000 = function(resp) {
            for (var i = 0; i < resp.items.length; i++) {
                var data = resp.items[i];
                this.parseShareInGame(data);
            }
            this.Send2000To2003Msg(resp);
        };
        PfuPlatformManager.prototype.parseShareInGame = function(data) {
            var _this = this;
            var d = data.text.split("___");
            for (var i = 0; i < d.length; i++) {
                console.log("d:" + d[i]);
            }
            var pos = parseInt(d[2]);
            var list = this._platformUserData._notifShareInGames.get(pos);
            if (list == null) {
                list = new Array();
                this._platformUserData._notifShareInGames.add(pos, list);
                console.log("新增一个pos:" + pos);
            }
            for (var i = 0; i < list.length; i++) {
                if (list[i].senderUid == data.senderUid) {
                    return;
                }
            }
            list.push(data);
            var list2 = this._platformUserData._notifShareInGames.get(pos);
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("通知UI更新用户头像" + list.length + "|" + list2.length);
            }
            this.GetUidUserDatas(data.senderUid, function(user) {
                if (_this._shareInGameCallback) {
                    _this._shareInGameCallback.call(_this._shareInGameHandle, user);
                }
            });
        };
        PfuPlatformManager.prototype.GetShareUserList = function(pos) {
            var data = new Array();
            console.log("开始查找用户资料!");
            if (this._platformUserData._notifShareInGames.containsKey(pos)) {
                var arr = this._platformUserData._notifShareInGames.get(pos);
                console.log("拥有" + arr.length + "个用户");
                for (var i = 0; i < arr.length; i++) {
                    console.log("userCache中有" + this._platformUserData._userCache.count + "个用户");
                    var resp = this._platformUserData._userCache.get(arr[i].senderUid);
                    if (resp) {
                        console.log("确认用户头像读取完毕!");
                        data.push(resp);
                    }
                }
            }
            return data;
        };
        PfuPlatformManager.prototype.ClearShareUserList = function(pos) {
            this._platformUserData._notifShareInGames.remove(pos);
            this.Save();
        };
        PfuPlatformManager.prototype.GetShareQuery = function(sharePos, addQurey) {
            if (this._respose1003User == null) {
                return "" + (addQurey ? addQurey : "");
            }
            var isNew = this._respose1003User.name ? false : true;
            var query = "shareUid=" + this._respose1003User.uid + "&rinviteGameid=" + this._gameId + "&rinvitePos=" + sharePos + "&isNew=" + isNew;
            console.log("query1:" + query);
            if (query) {
                var param_1 = query + (addQurey ? "&" + addQurey : "");
                param_1 += "&fromUid=" + this._respose1003User.uid;
                return param_1;
            }
            var param = addQurey ? "&" + addQurey : "";
            param += "&fromUid=" + this._respose1003User.uid;
            return param;
        };
        PfuPlatformManager.prototype.PackageMsgUrl = function(msgId, request, isLogin) {
            var url = isLogin ? this.GetLoginUrlHead(msgId) : this.GetUserUrlHead(msgId);
            url += this.GetContentAndSignAndToken(PfuPlatformManager.MD5_KEY, request);
            if (isLogin) {} else {
                url += "&p=" + PfuPlatformManager.TOKEN;
            }
            return url;
        };
        PfuPlatformManager.prototype.GetLoginUrlHead = function(msgId) {
            var url = PfuPlatformManager.LOGIN_SERVICE_URL + msgId + "?";
            url += "sVersion=" + PfuPlatformManager.S_VERSION + "&pType=" + PfuPlatformManager.P_TYPE + "&";
            return url;
        };
        PfuPlatformManager.prototype.GetUserUrlHead = function(msgId) {
            var url = PfuPlatformManager.INFO_SERVICE_URL + msgId + "?";
            url += "sVersion=" + PfuPlatformManager.S_VERSION + "&pType=" + PfuPlatformManager.P_TYPE + "&";
            return url;
        };
        PfuPlatformManager.prototype.GetContentAndSignAndToken = function(key, request) {
            var contentJson = JSON.stringify(request);
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("content:" + contentJson);
            }
            var content = Base64.encode(contentJson);
            var sign = md5(content + key).toLowerCase();
            var postData = "content=" + content + "&sign=" + sign;
            return postData;
        };
        PfuPlatformManager.prototype.UnicodeToUtf8 = function(unicode) {
            var uchar;
            var utf8str = "";
            var i;
            for (i = 0; i < unicode.length; i += 2) {
                uchar = unicode[i] << 8 | unicode[i + 1];
                utf8str = utf8str + String.fromCharCode(uchar);
            }
            return utf8str;
        };
        PfuPlatformManager.prototype.LoginWegame = function(wxappId, gameId) {
            this._gameId = gameId;
            wx.login({
                timeout: 3e3,
                success: function(res) {
                    console.log("::::" + res.code);
                    PfuPlatformManager.GetInstance().LoginPlatform1003(res.code, wxappId);
                }
            });
        };
        PfuPlatformManager.prototype.SetOnShowWxAdId = function(args) {
            var query = args.query;
            var gdt_vid = query.gdt_vid;
            var weixinadinfo = query.weixinadinfo;
            if (weixinadinfo) {
                var weixinadinfoArr = weixinadinfo.split(".");
                this.tempAdId = "" + weixinadinfoArr[0];
            }
        };
        PfuPlatformManager.prototype.LoginPlatform1003 = function(weToken, appId) {
            var _this = this;
            var request = new PFU.Platform_1003_Request();
            request.Channel = PfuPlatformManager.IS_DEBUG ? "jfyd" : "weixin";
            request.ext3 = PfuPlatformManager.IS_DEBUG ? "id" : weToken;
            var srcid = "";
            var rinviteUid = "";
            var options = PFU.WeChatUtils.GetInstance().GetLaunchOptionsSync();
            if (options) {
                var appid = null;
                if (options.referrerInfo) {
                    appid = options.referrerInfo.appId;
                    srcid = appid;
                }
                var sceneId = options.scene;
                if (sceneId == 1007 || sceneId == 1008 || sceneId == 1044 || sceneId == 1096) {
                    srcid = "share";
                }
                if (sceneId == 1005 || sceneId == 1006 || sceneId == 1027 || sceneId == 1042 || sceneId == 1053) {
                    srcid = "search";
                }
                var query = options.query;
                var gdt_vid = query.gdt_vid;
                var weixinadinfo = query.weixinadinfo;
                var aid = 0;
                if (weixinadinfo) {
                    var weixinadinfoArr = weixinadinfo.split(".");
                    aid = weixinadinfoArr[0];
                    srcid = "weixinad_" + aid;
                }
                var shareImage = query.shareImage;
                if (shareImage && shareImage != "") {
                    srcid = "share_" + shareImage;
                }
                var fromUid = query.fromUid;
                if (fromUid && fromUid != "") {
                    rinviteUid = fromUid;
                }
            }
            request.srcid = srcid;
            request.selfid = appId;
            request.inviteUid = rinviteUid;
            var url = this.PackageMsgUrl(1003, request, true);
            this.HttpGet(url, this, function(data) {
                var respose = data;
                if (respose.state == 3) {
                    _this._respose1003User = respose;
                    PfuPlatformManager.TOKEN = md5(respose.loginToken + _this._privateKey).toLowerCase();
                    _this._isLoginPlatform = true;
                    console.log("pfu 平台登录成功");
                    if (PFU.PfuConfig.Config.pfuShareProtocol == PFU.PfuSwitch.ON) {
                        _this.ListenMsg2000();
                        _this.IsAuthorizeUser(function(type) {
                            if (type == PfuSdk.SUCCESS) {
                                _this.GetUserInfo();
                                console.log("已经授权");
                            } else {
                                _this.UserAuthorize();
                                console.log("创建授权");
                            }
                        });
                    } else {
                        _this.ShareInGameUpdate();
                    }
                } else {
                    console.log("pfu 平台登录失败:" + respose.state);
                }
            }, function() {
                console.log("pfu 平台登录失败!");
            });
        };
        PfuPlatformManager.prototype.IsAuthorizeUser = function(fun) {
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                fun(PfuSdk.SUCCESS);
                return;
            }
            wx.getSetting({
                success: function(res) {
                    if (res.authSetting["scope.userInfo"]) {
                        fun(PfuSdk.SUCCESS);
                    } else {
                        fun(PfuSdk.FAIL);
                    }
                },
                fail: function() {
                    fun(PfuSdk.FAIL);
                }
            });
        };
        PfuPlatformManager.prototype.UserAuthorize = function() {
            var _this = this;
            var button = Laya.Browser.window.wx.createUserInfoButton({
                type: "image",
                text: "",
                image: "",
                style: {
                    left: 0,
                    top: 0,
                    width: laya.utils.Browser.width,
                    height: laya.utils.Browser.height,
                    backgroundColor: "#000000",
                    color: "#ffffff"
                }
            });
            button.onTap(function(res) {
                if (res.userInfo) {
                    console.log("用户授权:" + res);
                    _this.wx_userInfo = res.userInfo;
                    _this.ReadyUpdateNewUser();
                    button.destroy();
                } else {
                    PFU.WeChatUtils.GetInstance().ShowSingleModal("微信授权", "同意获取个人信息才可以进行更多内容游戏，我们不会泄露用户个人信息，请放心使用。", function() {});
                }
            });
        };
        PfuPlatformManager.prototype.GetUserInfo = function() {
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                this.wx_userInfo = [];
                this.wx_userInfo.nickName = "测试";
                this.wx_userInfo.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/pbK4DH6IOuTf0AicCnJHIbKvDTgibmoibdJmiaucIHIuUz6WdjCicqT2dLtRibo2PyS2Lx4Yd7W5JMvcicLtlR4YTUceQ/132";
                this.ReadyUpdateNewUser();
                return;
            }
            wx.getUserInfo({
                success: function(res) {
                    PfuPlatformManager.GetInstance().wx_userInfo = res.userInfo;
                    PfuPlatformManager.GetInstance().ReadyUpdateNewUser();
                },
                fail: function(res) {}
            });
        };
        PfuPlatformManager.prototype.ReadyUpdateNewUser = function() {
            var nikeName = this.wx_userInfo.nickName;
            var avatarUrl = this.wx_userInfo.avatarUrl;
            this.NewUserUpdate1801(nikeName, avatarUrl);
        };
        PfuPlatformManager.prototype.NewUserUpdate1801 = function(name, iconUrl) {
            var _this = this;
            var request = new PFU.Platform_1801_Request();
            request.name = name;
            request.picUrl = iconUrl;
            console.log("send1801 name:" + name);
            var url = this.PackageMsgUrl(1801, request, false);
            this.HttpGet(url, this, function(data) {
                var respose = data;
                if (respose.state == 3) {
                    console.log("更新用户信息成功!");
                    _this.ShareInGameUpdate();
                } else {
                    console.log("更新用户信息失败!" + respose.state);
                }
            }, function() {
                console.log("更新用户信息失败!");
            });
        };
        PfuPlatformManager.prototype.ShareInGameUpdate = function() {
            var query;
            if (PFU.WeChatUtils.GetInstance().IsWeGame()) {
                query = PFU.WeChatUtils.GetInstance().GetLaunchOptionsSync().query;
            }
            if (query) {
                if (query.shareUid && query.rinviteGameid && query.rinvitePos) {
                    var shareUid = parseInt(query.shareUid);
                    var rinviteGameid = parseInt(query.rinviteGameid);
                    var rinvitePos = parseInt(query.rinvitePos);
                    var isNew = this._respose1003User.name ? false : true;
                    if (shareUid && rinviteGameid && rinvitePos) {
                        this.ShareInGameMsg1332(shareUid, rinviteGameid, rinvitePos, isNew);
                    }
                }
            }
        };
        PfuPlatformManager.prototype.ShareInGameMsg1332 = function(shareUid, rinviteGameid, rinvitePos, isNewUser) {
            var request = new PFU.Platform_1332_Request();
            request.shareUid = shareUid;
            request.rinviteGameid = rinviteGameid;
            request.rinvitePos = rinvitePos;
            request.isNew = isNewUser;
            var url = this.PackageMsgUrl(1332, request);
            this.HttpGet(url, this, function(data) {
                var respose = data;
                console.log("发送分享进入数据成功!" + respose.state);
            }, function() {
                console.log("发送分享进入数据失败!");
            });
        };
        PfuPlatformManager.prototype.ListenMsg2000 = function() {
            if (this.socket != null) {
                try {
                    this.socket.cleanSocket();
                    this.socket.close();
                } catch (e) {
                    console.log("" + e);
                }
            }
            this.socket = new Laya.Socket();
            this.socket.connectByUrl(PfuPlatformManager.SOCKET_SERVICE_URL + "msg?pType=" + PfuPlatformManager.P_TYPE + "&p=" + PfuPlatformManager.TOKEN);
            this.output = this.socket.output;
            this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
            this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
        };
        PfuPlatformManager.prototype.onSocketOpen = function() {
            var _this = this;
            console.log("Connected");
            this.SendHeartbeat2002Msg();
            Laya.timer.loop(3e4, this, function() {
                _this.SendHeartbeat2002Msg();
            });
            this._reconnectCount = 0;
        };
        PfuPlatformManager.prototype.SendHeartbeat2002Msg = function() {
            var req = new PFU.Platform_2002_Request();
            this.SendSocketMsg(req, 2002);
        };
        PfuPlatformManager.prototype.Send2000To2003Msg = function(resp) {
            console.log("准备发送2003");
            var itemList = [];
            for (var i = 0; i < resp.items.length; i++) {
                var action = resp.items[i].action;
                if (action == 15 || action == 16) {
                    itemList.push(resp.items[i].time);
                }
            }
            console.log("找到" + itemList.length + "条需要发送的time");
            if (itemList.length > 0) {
                var req = new PFU.Platform_2003_Request();
                req.timeList = itemList;
                this.SendSocketMsg(req, 2003);
                console.log("开始发送2003");
            }
        };
        PfuPlatformManager.prototype.SendSocketMsg = function(request, msgId) {
            var array = null;
            var contentJson = JSON.stringify(request);
            array = this.stringToUint8Array(contentJson);
            var protoLength = array.length;
            var msgAllLength = 4 + 2 + 2 + protoLength;
            var pBosStream = new PFU.Bostream(msgAllLength);
            pBosStream.writeInt32(protoLength);
            pBosStream.writeShort(1);
            pBosStream.writeShort(msgId);
            pBosStream.writeArray(array);
            this.socket.send(pBosStream.buffer());
        };
        PfuPlatformManager.prototype.stringToUint8Array = function(str) {
            var arr = [];
            for (var i = 0, j = str.length; i < j; ++i) {
                arr.push(str.charCodeAt(i));
            }
            var tmpUint8Array = new Uint8Array(arr);
            return tmpUint8Array;
        };
        PfuPlatformManager.prototype.onSocketClose = function() {
            var _this = this;
            console.log("Socket closed");
            Laya.timer.once(this._reconnectCount * 1e4, this, function() {
                _this.ListenMsg2000();
            });
            this._reconnectCount++;
            if (this._reconnectCount > 3) {
                this._reconnectCount = 3;
            }
        };
        PfuPlatformManager.prototype.onMessageReveived = function(message) {
            var array = new DataView(message);
            var pos = 0;
            var msgAllLength = array.getInt32(pos);
            pos += 4;
            var b = array.getInt8(pos);
            pos += 1;
            var msgId = array.getInt16(pos);
            pos += 2;
            var type = array.getInt16(pos);
            pos += 2;
            console.log("解码:" + msgId);
            var com = array.buffer.slice(pos, array.byteLength);
            switch (msgId) {
              case 2002:
                break;

              case 2e3:
                {
                    var jsonStr_1 = this.ab2str(com);
                    console.log("socket Reveived 2000:" + jsonStr_1);
                    this.parseMsg2000(JSON.parse(jsonStr_1));
                }
                break;

              default:
                var jsonStr = this.ab2str(com);
                console.log("socket Reveived " + msgId + ":" + jsonStr);
                break;
            }
            this.socket.input.clear();
        };
        PfuPlatformManager.prototype.ab2str = function(buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        };
        PfuPlatformManager.prototype.onConnectError = function(e) {
            console.log("error");
        };
        PfuPlatformManager.prototype.GetUidUserDatas = function(uid, fun) {
            var _this = this;
            if (this._platformUserData._userCache.containsKey(uid)) {
                var resp = this._platformUserData._userCache.get(uid);
                fun(resp);
                return;
            }
            var request = new PFU.Platform_1333_Request();
            request.uids = "" + uid;
            var url = this.PackageMsgUrl(1333, request);
            this.HttpGet(url, this, function(data) {
                var respose = data;
                if (respose.state == 3) {
                    for (var i = 0; i < respose.infos.length; i++) {
                        _this._platformUserData._userCache.add(respose.infos[i].uid, respose.infos[i]);
                        fun(respose.infos[i]);
                    }
                    console.log("获取用户数据成功!");
                } else {
                    console.log("获取用户数据失败!" + respose.state);
                }
            }, function() {
                console.log("获取用户数据失败!");
            });
        };
        PfuPlatformManager.prototype.HttpGet = function(url, handle, callSucceed, callFail) {
            if (PfuPlatformManager.IS_DEBUG_LOG) {
                console.log("url:" + url);
            }
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 1e4;
            xhr.once(Laya.Event.COMPLETE, this, function(e) {
                var data = JSON.parse(Base64.decode(e));
                console.log("http parse:" + JSON.stringify(data));
                callSucceed.call(handle, data);
            });
            xhr.once(Laya.Event.ERROR, this, function(data) {
                callFail.call(handle, data);
            });
            xhr.send(url, "", "get", "text");
        };
        PfuPlatformManager.prototype.StatisticsMsg2201 = function(type, picId) {
            if (!this._isLoginPlatform) {
                return;
            }
            var request = new PFU.Platform_2201_Request();
            request.type = type;
            request.picId = picId;
            var url = this.PackageMsgUrl(2201, request);
            this.HttpGet(url, this, function(data) {
                var respose = data;
                console.log("上报点击量统计成功!" + respose.state);
            }, function() {
                console.log("上报点击量统计失败!");
            });
        };
        PfuPlatformManager.prototype.StatisticsMsg2202 = function() {
            if (!this._isLoginPlatform) {
                return;
            }
            var request = new PFU.Platform_2202_Request();
            request.type = PlatformStatisticsType.videocomplete;
            var url = this.PackageMsgUrl(2202, request);
            this.HttpGet(url, this, function(data) {
                var respose = data;
                console.log("上报视频播放完成成功!" + respose.state);
            }, function() {
                console.log("上报视频播放完成失败!");
            });
        };
        return PfuPlatformManager;
    }();
    PfuPlatformManager.NOTIFYY_MSG_ID = "SOCKET_";
    PfuPlatformManager.NOTIFY_SHARE_IN_GAME = "n_s_in_game";
    PfuPlatformManager.LOGIN_SERVICE_URL = "https://login.jfydgame.com/user/";
    PfuPlatformManager.INFO_SERVICE_URL = "https://info.jfydgame.com/user/";
    PfuPlatformManager.SOCKET_SERVICE_URL = "wss://msg.jfydgame.com/xxl/";
    PfuPlatformManager.S_VERSION = "1024";
    PfuPlatformManager.P_TYPE = "2";
    PfuPlatformManager.MD5_KEY = "60cff75d0d1e4d548d9f4bca35916b21";
    PfuPlatformManager.IS_DEBUG = false;
    PfuPlatformManager.IS_DEBUG_LOG = true;
    PfuPlatformManager.TOKEN = "";
    PFU.PfuPlatformManager = PfuPlatformManager;
    var PlatformShareUserData = function() {
        function PlatformShareUserData() {
            this._notifShareInGames = new PFU.Dictionary();
            this._userCache = new PFU.Dictionary();
        }
        return PlatformShareUserData;
    }();
    var PlatformStatisticsType;
    (function(PlatformStatisticsType) {
        PlatformStatisticsType[PlatformStatisticsType["moreGame"] = 5] = "moreGame";
        PlatformStatisticsType[PlatformStatisticsType["crossGame"] = 6] = "crossGame";
        PlatformStatisticsType[PlatformStatisticsType["shareGame"] = 8] = "shareGame";
        PlatformStatisticsType[PlatformStatisticsType["videocomplete"] = 7] = "videocomplete";
    })(PlatformStatisticsType = PFU.PlatformStatisticsType || (PFU.PlatformStatisticsType = {}));
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_2003_Request = function() {
        function Platform_2003_Request() {}
        return Platform_2003_Request;
    }();
    PFU.Platform_2003_Request = Platform_2003_Request;
    var Platform_2003_Response = function() {
        function Platform_2003_Response() {}
        return Platform_2003_Response;
    }();
    PFU.Platform_2003_Response = Platform_2003_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_2002_Request = function() {
        function Platform_2002_Request() {}
        return Platform_2002_Request;
    }();
    PFU.Platform_2002_Request = Platform_2002_Request;
    var Platform_2002_Response = function() {
        function Platform_2002_Response() {}
        return Platform_2002_Response;
    }();
    PFU.Platform_2002_Response = Platform_2002_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_2000_Response = function() {
        function Platform_2000_Response() {}
        return Platform_2000_Response;
    }();
    PFU.Platform_2000_Response = Platform_2000_Response;
    var Platform_2000_resp_Data = function() {
        function Platform_2000_resp_Data() {}
        return Platform_2000_resp_Data;
    }();
    PFU.Platform_2000_resp_Data = Platform_2000_resp_Data;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_1801_Request = function() {
        function Platform_1801_Request() {
            this.sex = -1;
            this.level = -1;
            this.energy = 1;
            this.coin = -1;
            this.ingot = -1;
            this.mapId = -1;
            this.pic = -1;
        }
        return Platform_1801_Request;
    }();
    PFU.Platform_1801_Request = Platform_1801_Request;
    var Platform_1801_Response = function() {
        function Platform_1801_Response() {}
        return Platform_1801_Response;
    }();
    PFU.Platform_1801_Response = Platform_1801_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_1333_Request = function() {
        function Platform_1333_Request() {}
        return Platform_1333_Request;
    }();
    PFU.Platform_1333_Request = Platform_1333_Request;
    var Platform_1333_Response = function() {
        function Platform_1333_Response() {}
        return Platform_1333_Response;
    }();
    PFU.Platform_1333_Response = Platform_1333_Response;
    var Platform_1333_ResData = function() {
        function Platform_1333_ResData() {}
        return Platform_1333_ResData;
    }();
    PFU.Platform_1333_ResData = Platform_1333_ResData;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_2201_Request = function() {
        function Platform_2201_Request() {}
        return Platform_2201_Request;
    }();
    PFU.Platform_2201_Request = Platform_2201_Request;
    var Platform_2201_Response = function() {
        function Platform_2201_Response() {}
        return Platform_2201_Response;
    }();
    PFU.Platform_2201_Response = Platform_2201_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_2202_Request = function() {
        function Platform_2202_Request() {}
        return Platform_2202_Request;
    }();
    PFU.Platform_2202_Request = Platform_2202_Request;
    var Platform_2202_Response = function() {
        function Platform_2202_Response() {}
        return Platform_2202_Response;
    }();
    PFU.Platform_2202_Response = Platform_2202_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_1332_Request = function() {
        function Platform_1332_Request() {
            this.rinviteGameid = 1;
        }
        return Platform_1332_Request;
    }();
    PFU.Platform_1332_Request = Platform_1332_Request;
    var Platform_1332_Response = function() {
        function Platform_1332_Response() {}
        return Platform_1332_Response;
    }();
    PFU.Platform_1332_Response = Platform_1332_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var Platform_1003_Request = function() {
        function Platform_1003_Request() {
            this.sid = 1;
        }
        return Platform_1003_Request;
    }();
    PFU.Platform_1003_Request = Platform_1003_Request;
    var Platform_1003_Response = function() {
        function Platform_1003_Response() {}
        return Platform_1003_Response;
    }();
    PFU.Platform_1003_Response = Platform_1003_Response;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuOLParamData = function() {
        function PfuOLParamData() {}
        PfuOLParamData.prototype.Init = function() {
            this.pfuSdkTestMode = PFU.PfuSwitch.ON;
            this.pfuSdkMoreGame = PFU.PfuSwitch.ON;
            this.pfuSdkShowOpenAds = PFU.PfuSwitch.OFF;
            this.pfuSdkBoxRelive = PFU.PfuSwitch.OFF;
            this.pfuSdkShareTime = 4e3;
            this.pfuSdkVideoShare = PFU.PfuSwitch.OFF;
            this.pfuSdkShare1 = "分享失败，请分享到群!";
            this.pfuSdkShare2 = "分享失败，请分享到不同的群！";
            this.pfuSdkRefresh = 1e3;
            this.pfuSdkShareCount = 0;
        };
        return PfuOLParamData;
    }();
    PFU.PfuOLParamData = PfuOLParamData;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuMoreGameUpdate = function() {
        function PfuMoreGameUpdate() {
            this._isCreateWindow = false;
            this._isLastCtrAction = false;
            this._isLastShow = true;
            this._indexLeft = 0;
            this._indexRight = 0;
            this.isSetLayerAction = false;
            this.layerNum = 0;
            this._indexLeft = 0;
            this._indexRight = 0;
            Laya.timer.loop(1e4, this, this.UpdateMoreGame);
            Laya.timer.loop(200, this, this.CheckAction);
        }
        PfuMoreGameUpdate.GetInstance = function() {
            if (!this.instance) {
                this.instance = new PfuMoreGameUpdate();
            }
            return this.instance;
        };
        PfuMoreGameUpdate.prototype.SetChangeHandle = function(handle, fun) {
            this._changeMoreGameHandle = handle;
            this._changeMoreGameFun = fun;
        };
        PfuMoreGameUpdate.prototype.UpdateMoreGame = function() {
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
        PfuMoreGameUpdate.prototype.ShowMoreGame = function(isLeft, callServer, fun) {
            PFU.PfuManager.GetInstance().ShowMoreGameImage(isLeft, isLeft ? this._indexLeft : this._indexRight, callServer, fun);
        };
        PfuMoreGameUpdate.prototype.GetMoreGameIconUrl = function(isLeft) {
            if (isLeft) return PFU.PfuManager.GetInstance().GetMoreGameLeftIconUrl(this._indexLeft); else return PFU.PfuManager.GetInstance().GetMoreGameRightIconUrl(this._indexRight);
        };
        PfuMoreGameUpdate.prototype.SetCtrlMoreGameUI = function(handle, fun) {
            this.moreGameHandle = handle;
            this.moreGameFun = fun;
            this._isCreateWindow = true;
        };
        PfuMoreGameUpdate.prototype.ShowMoreGameUI = function() {
            if (this.moreGameHandle) {
                this.moreGameFun.call(this.moreGameHandle, true, this._showMoreGameType);
            }
        };
        PfuMoreGameUpdate.prototype.HideMoreGameUI = function() {
            if (this.moreGameHandle) {
                this.moreGameFun.call(this.moreGameHandle, false, this._showMoreGameType);
            }
        };
        PfuMoreGameUpdate.prototype.CallShowMoreGameUI = function(type) {
            this._isLastCtrAction = true;
            this._isLastShow = true;
            this._showMoreGameType = type;
        };
        PfuMoreGameUpdate.prototype.CallHideMoreGameUI = function() {
            this._isLastCtrAction = true;
            this._isLastShow = false;
        };
        PfuMoreGameUpdate.prototype.CheckAction = function() {
            if (PfuSdk.GetBoxListComplete && PfuSdk.GetParamComplete && this._isCreateWindow) {
                if (this._isLastCtrAction) {
                    if (this._isLastShow) {
                        this.ShowMoreGameUI();
                    } else {
                        this.HideMoreGameUI();
                    }
                    this._isLastCtrAction = false;
                }
            }
        };
        PfuMoreGameUpdate.prototype.SetMoreGameUILayer = function(layernum) {
            this.isSetLayerAction = true;
            this.layerNum = layernum;
        };
        PfuMoreGameUpdate.prototype.EndSetMoreGameUI = function() {
            this.isSetLayerAction = false;
        };
        return PfuMoreGameUpdate;
    }();
    PFU.PfuMoreGameUpdate = PfuMoreGameUpdate;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuSwitch;
    (function(PfuSwitch) {
        PfuSwitch[PfuSwitch["ON"] = 1] = "ON";
        PfuSwitch[PfuSwitch["OFF"] = 0] = "OFF";
    })(PfuSwitch = PFU.PfuSwitch || (PFU.PfuSwitch = {}));
    var PfuOLParamBean = function() {
        function PfuOLParamBean() {}
        return PfuOLParamBean;
    }();
    PFU.PfuOLParamBean = PfuOLParamBean;
    var PfuManager = function() {
        function PfuManager() {
            this._ingameadvert = null;
            this._officialaccount = null;
            this._moregame = null;
            this._wechatparam = null;
            this._wechatAd = null;
            this._wechatshare = null;
            this._getParamComplete = false;
            this._getBoxlistComplete = false;
            this.moreGameLeft = new Array();
            this.moreGameRight = new Array();
            this.shareIndex = 0;
            this._nextSplashAdIndex = 0;
            this._nextGeneralAdIndex = 0;
            this._shareFinishCount = null;
            this._videoForceShareDataTime = null;
            this._tempJumpGBRHandle = null;
            this._tempJumpGBRCallback = null;
            this._wechatparam = new PfuOLParamBean();
            this._wechatparam.value = new PFU.PfuOLParamData();
            this._wechatparam.value.Init();
            this.GetShareNum();
        }
        PfuManager.GetInstance = function() {
            if (!this.instance) {
                this.instance = new PfuManager();
            }
            return this.instance;
        };
        PfuManager.prototype.GetShareNum = function() {
            var cStr = PFU.LocalSaveUtils.GetItem("shareNumber");
            this.shareIndex = 0;
            if (cStr != void 0 && cStr != null && cStr != "") {
                this.shareIndex = parseInt(cStr);
            }
        };
        PfuManager.prototype.SaveShareNum = function() {
            PFU.LocalSaveUtils.SaveItem("shareNumber", this.shareIndex + "");
        };
        Object.defineProperty(PfuManager.prototype, "OLParam", {
            get: function() {
                return this._wechatparam.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PfuManager.prototype, "MoreGame", {
            get: function() {
                return this._moregame.adverts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PfuManager.prototype, "GetParamComplete", {
            get: function() {
                return this._getParamComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PfuManager.prototype, "GetBoxListComplete", {
            get: function() {
                return this._getBoxlistComplete;
            },
            enumerable: true,
            configurable: true
        });
        PfuManager.prototype.Init = function() {
            var _this = this;
            this.Connect(PFU.PfuConfig.Config.pfuAppId, PFU.PfuConfig.Config.version, PFU.PfuConfig.Config.weChatId, function(type) {
                if (type == PfuSdk.SUCCESS) {
                    var param = _this.OLParam;
                    if (param.pfuSdkTestMode == PfuSwitch.ON) {
                        param.pfuSdkMoreGame = PfuSwitch.OFF;
                        param.pfuSdkVideoShare = PfuSwitch.OFF;
                    }
                    if (param.pfuSdkTestMode == PfuSwitch.OFF && param.pfuSdkShowOpenAds == PfuSwitch.ON) {
                        Laya.timer.once(1e3, _this, function() {
                            _this.ShowSplashAd(false);
                        });
                    }
                    _this._getParamComplete = true;
                }
                PFU.PfuBannerUpdate.GetInstance().CreateBanner();
                PFU.WeChatUtils.GetInstance().ShowShareMenu();
                PfuManager.GetInstance().OnShareAppMessage(function(type) {});
                console.log("在线参数获取成功");
            });
            PFU.PfuGlobal.CreateIncentiveAd(PFU.PfuConfig.Config.videoId);
            PFU.PfuBoxList.GetInstance().Connect(PFU.PfuConfig.Config.weChatId, function(type) {
                _this._getBoxlistComplete = true;
                console.log("盒子列表参数获取成功");
            });
            this.InitVideoForceShare();
            this.InitShareCountData();
            if (PFU.PfuConfig.Config.checkAppUpdate == PfuSwitch.ON) {
                PFU.WeChatUtils.GetInstance().SetUpdateApp();
            }
        };
        PfuManager.prototype.ShowSplashAd = function(ignoreInPath) {
            if (!PFU.PfuGlobal.IsMiniAppInGame()) {
                if (ignoreInPath || !PFU.PfuGlobal.IsMiniAppInGame()) {
                    PFU.PfuGlobal.ShowRandomSplashAd();
                }
            }
        };
        PfuManager.prototype.Connect = function(pfuAppid, version, wechatgameid, callBack, functionIds) {
            var _this = this;
            var contentData = new PfuReq();
            contentData.appId = pfuAppid;
            contentData.version = version;
            contentData.wechatgameid = wechatgameid;
            if (functionIds == void 0) {
                contentData.functions = "0";
            } else {
                contentData.functions = functionIds;
            }
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 1e4;
            xhr.once(Laya.Event.COMPLETE, this, function(e) {
                var data = JSON.parse(Base64.decode(e));
                _this.preaseData(data);
                callBack(PfuSdk.SUCCESS);
            });
            xhr.once(Laya.Event.ERROR, this, function(data) {
                callBack(PfuSdk.FAIL);
            });
            xhr.on(Laya.Event.PROGRESS, this, function() {});
            var url = PfuManager.OL_URL + "?" + contentData.getContent(PfuManager.OL_KEY);
            xhr.send(url, "", "get", "text");
        };
        PfuManager.prototype.preaseData = function(data) {
            this._resp = data;
            if (data.code == PfuRespState.succeed) {
                this.preaseMode();
            } else {
                console.log("erro:" + data.code);
            }
        };
        PfuManager.prototype.preaseMode = function() {
            var data = this._resp;
            for (var key in data.value) {
                var childData = data.value[key];
                if (childData.code == PfuRespState.succeed) {
                    switch (key) {
                      case "" + PfuFunctionId.ingameadvert:
                        this._ingameadvert = childData;
                        break;

                      case "" + PfuFunctionId.officialaccount:
                        this._officialaccount = childData;
                        break;

                      case "" + PfuFunctionId.moregame:
                        this._moregame = childData;
                        if (this._moregame && this._moregame.adverts) {
                            for (var i = 0; i < this._moregame.adverts.length; i++) {
                                var data_1 = this._moregame.adverts[i];
                                if (Laya.Browser.onAndroid) {
                                    if ((data_1.boxId == undefined || data_1.boxId == "") && (data_1.link == undefined || data_1.link == "")) {
                                        continue;
                                    }
                                } else {
                                    if ((data_1.wxid == undefined || data_1.wxid == "") && (data_1.link == undefined || data_1.link == "")) {
                                        continue;
                                    }
                                }
                                if (PFU.PfuConfig.Config.ui_moreGameType == 1) {
                                    this.moreGameLeft.push(data_1);
                                    continue;
                                }
                                if (PFU.PfuConfig.Config.ui_moreGameType == 2) {
                                    this.moreGameRight.push(data_1);
                                    continue;
                                }
                                if (data_1.position == "0") {
                                    this.moreGameLeft.push(data_1);
                                    continue;
                                }
                                this.moreGameRight.push(data_1);
                            }
                        }
                        break;

                      case "" + PfuFunctionId.wechatparam:
                        this._wechatparam = childData;
                        break;

                      case "" + PfuFunctionId.wechatAd:
                        this._wechatAd = childData;
                        break;

                      case "" + PfuFunctionId.wechatshare:
                        this._wechatshare = childData;
                        break;

                      default:
                        console.log("not Define Key:" + key);
                        break;
                    }
                } else {
                    console.log("prease Mode ErrorCode: k=" + key + "|code=" + childData.code);
                }
            }
        };
        PfuManager.prototype.GetTopUrl = function() {
            if (this._resp != null) {
                return this._resp.toppath;
            }
            return "";
        };
        PfuManager.prototype.GetShareData = function(key) {
            if (!this.IsExistShareData()) {
                return null;
            }
            for (var i = 0; i < this._wechatshare.value.length; i++) {
                if (this._wechatshare.value[i].key == key) {
                    return this._wechatshare.value[i];
                }
            }
            return null;
        };
        PfuManager.prototype.IsExistShareData = function() {
            if (this._wechatshare == null) {
                return false;
            }
            if (this._wechatshare.value == null) {
                return false;
            }
            return this._wechatshare.value.length > 0;
        };
        PfuManager.prototype.PfuShareNext = function(isShareGroup, replace, fun, qureyPos, addQurey) {
            if (!this.IsExistShareData()) {
                fun(PfuSdk.FAIL, "分享数据未准备好");
                return;
            }
            var share = this._wechatshare.value[this.shareIndex];
            if (share == null) {
                fun(PfuSdk.FAIL, "分享下标错误");
                return;
            }
            var str = PFU.BXStringUtils.Replace(replace, share.desc);
            var imgUrl = this._resp.toppath + share.shareLink;
            if (this.IsWegameTestMode()) {
                str = PfuManager.TestMode_ShareDesc;
                imgUrl = "";
            }
            var query = PFU.PfuPlatformManager.GetInstance().GetShareQuery(qureyPos ? qureyPos : -999, addQurey);
            console.log("query:" + query);
            PFU.PfuPlatformManager.GetInstance().StatisticsMsg2201(PFU.PlatformStatisticsType.shareGame, share.shareLink);
            PFU.WeChatUtils.GetInstance().ShareGroupAppMessageImage(isShareGroup, fun, str, imgUrl, query);
            this.shareIndex++;
            if (this.shareIndex >= this._wechatshare.value.length) {
                this.shareIndex = 0;
            }
            this.SaveShareNum();
        };
        PfuManager.prototype.OnShareAppMessage = function(fun) {
            var _this = this;
            if (this.IsExistShareData()) {
                this.shareIndex++;
                if (this.shareIndex >= this._wechatshare.value.length) {
                    this.shareIndex = 0;
                }
                var share = this._wechatshare.value[this.shareIndex];
                var str = share.desc;
                var imgUrl = this._resp.toppath + share.shareLink;
                if (this.IsWegameTestMode()) {
                    str = PfuManager.TestMode_ShareDesc;
                    imgUrl = "";
                }
                PFU.WeChatUtils.GetInstance().OnShareAppMessage(function(type) {
                    _this.OnShareAppMessage(fun);
                    _this.SaveShareNum();
                }, str, imgUrl);
            }
        };
        PfuManager.prototype.ShowRandomSplashAd = function() {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            var number = Math.floor(PFU.BXRandom.Get().nextInt(0, this._ingameadvert.adverts.length));
            var url = this._ingameadvert.adverts[number].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
        };
        PfuManager.prototype.ShowNextSplashAd = function() {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            var url = this._ingameadvert.adverts[this._nextSplashAdIndex].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
            this._nextSplashAdIndex++;
            if (this._nextSplashAdIndex >= this._ingameadvert.adverts.length) {
                this._nextSplashAdIndex = 0;
            }
        };
        PfuManager.prototype.IsExistSplashAdData = function() {
            if (this._ingameadvert == null) {
                return false;
            }
            if (this._ingameadvert.adverts == null) {
                return false;
            }
            return this._ingameadvert.adverts.length > 0;
        };
        PfuManager.prototype.ShowCrossGameImage = function(data, callServer, fun) {
            PFU.PfuPlatformManager.GetInstance().StatisticsMsg2201(PFU.PlatformStatisticsType.crossGame, data.link);
            if (PFU.PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function() {}, data.wechatGameid, "");
            } else {
                var url = data.qrcodelink;
                PFU.WeChatUtils.GetInstance().PreviewImage(url);
                fun.call(callServer, url);
            }
        };
        PfuManager.prototype.ShowMoreGameImage = function(isLeft, index, callServer, fun) {
            if (!this.IsExistGeneralMoreGameData()) {
                return;
            }
            var count = isLeft ? this.moreGameLeft.length : this.moreGameRight.length;
            if (count == 0) {
                return;
            }
            if (index >= count || index < 0) {
                index = 0;
            }
            var data = isLeft ? this.moreGameLeft[index] : this.moreGameRight[index];
            PFU.PfuPlatformManager.GetInstance().StatisticsMsg2201(PFU.PlatformStatisticsType.moreGame, data.iconlink);
            var isJumpShowImage = false;
            if (PFU.WeChatUtils.GetInstance().IsNavigateToMiniVersion()) {
                if (Laya.Browser.onAndroid) {
                    if (PFU.PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) {
                        PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function() {}, data.boxId, "");
                    } else {
                        isJumpShowImage = true;
                    }
                } else {
                    if (PFU.PfuBoxList.GetInstance().IsMoreGameDataBeAppIdList(data.wxid)) {
                        PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function() {}, data.wxid, "");
                    } else {
                        isJumpShowImage = true;
                    }
                }
            } else {
                isJumpShowImage = true;
            }
            if (isJumpShowImage) {
                var url = data.link;
                PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
                fun.call(callServer, url);
            }
        };
        PfuManager.prototype.IsMoreGameLeftData = function() {
            return this.moreGameLeft.length > 0;
        };
        PfuManager.prototype.IsMoreGameRightData = function() {
            return this.moreGameRight.length > 0;
        };
        PfuManager.prototype.GetMoreGameLeftIconUrl = function(index) {
            if (!this.IsMoreGameLeftData()) {
                return "";
            }
            if (index >= this.moreGameLeft.length || index < 0) {
                index = 0;
            }
            return this._resp.toppath + this.moreGameLeft[index].iconlink;
        };
        PfuManager.prototype.GetMoreGameRightIconUrl = function(index) {
            if (!this.IsMoreGameRightData()) {
                return "";
            }
            if (index >= this.moreGameRight.length || index < 0) {
                index = 0;
            }
            return this._resp.toppath + this.moreGameRight[index].iconlink;
        };
        PfuManager.prototype.GetTotalMoreGameCount = function() {
            if (!this.IsExistGeneralMoreGameData()) {
                return 0;
            }
            return this._moregame.adverts.length;
        };
        PfuManager.prototype.IsExistGeneralMoreGameData = function() {
            if (this._moregame == null) {
                return false;
            }
            if (this._moregame.adverts == null) {
                return false;
            }
            return this._moregame.adverts.length > 0;
        };
        PfuManager.prototype.GetMoreGameCount = function(isLeft) {
            return isLeft ? this.moreGameLeft.length : this.moreGameRight.length;
        };
        PfuManager.prototype.CustomShowMoreGameImage = function(data, callServer, fun) {
            if (PFU.WeChatUtils.GetInstance().IsNavigateToMiniVersion()) {
                PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(callServer, fun, data.wechatgameid, data.path);
            } else {
                var url = data.link;
                PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
                fun.call(callServer);
            }
        };
        PfuManager.prototype.ShowRandomGeneralAd = function() {
            if (!this.IsExistGeneralAdData()) {
                return;
            }
            var number = Math.floor(PFU.BXRandom.Get().nextInt(0, this._officialaccount.adverts.length));
            var url = this._officialaccount.adverts[number].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
        };
        PfuManager.prototype.ShowNextGeneralAd = function() {
            if (!this.IsExistSplashAdData()) {
                return;
            }
            var url = this._officialaccount.adverts[this._nextGeneralAdIndex].link;
            PFU.WeChatUtils.GetInstance().PreviewImage(this._resp.toppath + url);
            this._nextGeneralAdIndex++;
            if (this._nextGeneralAdIndex >= this._officialaccount.adverts.length) {
                this._nextGeneralAdIndex = 0;
            }
        };
        PfuManager.prototype.IsExistGeneralAdData = function() {
            if (this._officialaccount == null) {
                return false;
            }
            if (this._officialaccount.adverts == null) {
                return false;
            }
            return this._officialaccount.adverts.length > 0;
        };
        PfuManager.prototype.IsMiniAppIn = function() {
            var launch = PFU.WeChatUtils.GetInstance().GetLaunchOptionsSync();
            if (launch != null && launch.referrerInfo) {
                var appid = launch.referrerInfo.appId;
                return appid == "wx5608cdb7dc533937" || appid == "wxe675b6aad9612c74";
            }
            if (launch != null && (launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1020 || launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1024 || launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1035 || launch.scene == PFU.WeChatUtils.IN_GAME_FROM_1037)) {
                return true;
            }
            return false;
        };
        PfuManager.prototype.GetWegameAd = function() {
            if (this._wechatAd == null || this._wechatAd.value == null) {
                return new PfuWechatAdData();
            }
            return this._wechatAd.value;
        };
        PfuManager.prototype.IsWegameTestMode = function() {
            if (this._wechatparam == null || this._wechatparam.value == null) {
                return true;
            }
            if (this._wechatparam.value.pfuSdkTestMode == PfuSwitch.ON) {
                return true;
            }
            return false;
        };
        PfuManager.prototype.IsPfuSdkVideoShare = function() {
            if (this._wechatparam == null || this._wechatparam.value == null) {
                return false;
            }
            return this._wechatparam.value.pfuSdkVideoShare == PfuSwitch.ON;
        };
        PfuManager.prototype.SaveShareFinishCount = function() {
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1e3);
            this._shareFinishCount.time = mt.getTime();
            Laya.LocalStorage.setJSON("shareFinishCount", JSON.stringify(this._shareFinishCount));
        };
        PfuManager.prototype.GetShareFinishCountData = function() {
            var json = Laya.LocalStorage.getJSON("shareFinishCount");
            if (json != null && json != "") {
                this._shareFinishCount = JSON.parse(json);
            } else {
                this._shareFinishCount = new PFU.DataTimeCount();
                this._shareFinishCount.count = 0;
                this._shareFinishCount.time = 0;
            }
            return this._shareFinishCount;
        };
        PfuManager.prototype.IsShareFinishCountNewDay = function() {
            var data = this.GetShareFinishCountData();
            if (data.time == 0) {
                return true;
            }
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        };
        PfuManager.prototype.InitShareCountData = function() {
            this.GetShareFinishCountData();
            if (this.IsShareFinishCountNewDay()) {
                this._shareFinishCount.count = 0;
                this.SaveShareFinishCount();
            }
        };
        PfuManager.prototype.GetShareCount = function() {
            if (this.IsShareFinishCountNewDay()) {
                this._shareFinishCount.count = 0;
                this.SaveShareFinishCount();
            }
            return this._shareFinishCount.count;
        };
        PfuManager.prototype.AddShareCount = function() {
            this._shareFinishCount.count++;
            this.SaveShareFinishCount();
        };
        PfuManager.prototype.GetShareTimeMax = function() {
            return Math.min(this.GetShareCount(), 3);
        };
        PfuManager.prototype.SaveVideoFoceShare = function() {
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var mt = new Date(curDay.getTime() + 24 * 60 * 60 * 1e3);
            this._videoForceShareDataTime.time = mt.getTime();
            Laya.LocalStorage.setJSON("forceShareFinishCount", JSON.stringify(this._videoForceShareDataTime));
        };
        PfuManager.prototype.GetVideoForceShare = function() {
            var json = Laya.LocalStorage.getJSON("forceShareFinishCount");
            if (json != null && json != "") {
                this._videoForceShareDataTime = JSON.parse(json);
            } else {
                this._videoForceShareDataTime = new PFU.DataTimeCount();
                this._videoForceShareDataTime.count = 0;
                this._videoForceShareDataTime.time = 0;
            }
            return this._videoForceShareDataTime;
        };
        PfuManager.prototype.IsNewShareCountDay = function() {
            var data = this.GetVideoForceShare();
            if (data.time == 0) {
                return true;
            }
            var date = new Date();
            var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var curTime = curDay.getTime();
            if (data.time <= curTime) {
                return true;
            }
            return false;
        };
        PfuManager.prototype.InitVideoForceShare = function() {
            this.GetVideoForceShare();
            if (this.IsNewShareCountDay()) {
                this._videoForceShareDataTime.count = 0;
                this.SaveVideoFoceShare();
            }
        };
        PfuManager.prototype.IsVideoForceShare = function() {
            if (this.OLParam.pfuSdkTestMode == PfuSwitch.ON) {
                return false;
            }
            if (this._videoForceShareDataTime == null || this._videoForceShareDataTime.count >= this.OLParam.pfuSdkShareCount) {
                return false;
            }
            return true;
        };
        PfuManager.prototype.AddVideoForceShareFinish = function() {
            this._videoForceShareDataTime.count++;
            if (this._videoForceShareDataTime.count >= this.OLParam.pfuSdkShareCount) {
                this._videoForceShareDataTime.count = this.OLParam.pfuSdkShareCount;
            }
            this.SaveVideoFoceShare();
        };
        PfuManager.prototype.SetJumpGameBoxReliveHandle = function(handle, callback) {
            this._tempJumpGBRHandle = handle;
            this._tempJumpGBRCallback = callback;
        };
        PfuManager.prototype.RespondJumpGameBoxRelive = function(launchOptions) {
            if (this._tempJumpGBRHandle == null) {
                return;
            }
            if (launchOptions.scene == 1037 || launchOptions.scene == 1038) {
                if (launchOptions.referrerInfo && launchOptions.referrerInfo.extraData) {
                    if (launchOptions.referrerInfo.extraData.relive) {
                        this._tempJumpGBRCallback.call(this._tempJumpGBRHandle, PfuSdk.SUCCESS);
                    }
                    this.SetJumpGameBoxReliveHandle(null, null);
                }
            }
        };
        PfuManager.prototype.JumpGameboxForRelive = function(handle, callback) {
            var _this = this;
            if (!PFU.WeChatUtils.GetInstance().IsWeGame()) {
                callback.call(handle, PfuSdk.SUCCESS);
                return;
            }
            var jumpPath = "pages/index/index?pfukey=" + PFU.PfuConfig.Config.weChatId + "&pfuRelive=true";
            var jumpId = "wx3e33fef689f472b1";
            if (this.OLParam.pfuSdkBoxRelive && this.OLParam.pfuSdkBoxRelive != "") {
                jumpId = this.OLParam.pfuSdkBoxRelive;
            }
            PFU.WeChatUtils.GetInstance().NavigateToMiniProgram(this, function(type) {
                if (type == PfuSdk.SUCCESS) {
                    if (!_this.IsWegameTestMode()) {
                        _this.SetJumpGameBoxReliveHandle(handle, callback);
                    }
                } else {
                    callback.call(handle, PfuSdk.FAIL);
                }
            }, jumpId, jumpPath);
        };
        return PfuManager;
    }();
    PfuManager.TestMode_ShareDesc = "这游戏真好玩，快来一起体验吧!";
    PfuManager.OL_URL = "https://wxad.jfydgame.com/jfyd_advert_wechat/";
    PfuManager.OL_KEY = "60cff75d0d1e4d548d9f4bca35916b21";
    PFU.PfuManager = PfuManager;
    var PfuRespState;
    (function(PfuRespState) {
        PfuRespState[PfuRespState["succeed"] = 101] = "succeed";
        PfuRespState[PfuRespState["signError"] = 201] = "signError";
        PfuRespState[PfuRespState["paramError"] = 202] = "paramError";
    })(PfuRespState = PFU.PfuRespState || (PFU.PfuRespState = {}));
    var PfuFunctionId;
    (function(PfuFunctionId) {
        PfuFunctionId[PfuFunctionId["ingameadvert"] = 1] = "ingameadvert";
        PfuFunctionId[PfuFunctionId["officialaccount"] = 2] = "officialaccount";
        PfuFunctionId[PfuFunctionId["moregame"] = 3] = "moregame";
        PfuFunctionId[PfuFunctionId["wechatparam"] = 4] = "wechatparam";
        PfuFunctionId[PfuFunctionId["wechatAd"] = 5] = "wechatAd";
        PfuFunctionId[PfuFunctionId["wechatshare"] = 6] = "wechatshare";
    })(PfuFunctionId || (PfuFunctionId = {}));
    var PfuReq = function() {
        function PfuReq() {}
        PfuReq.prototype.getContent = function(key) {
            var contentJson = JSON.stringify(this);
            var content = Base64.encode(contentJson);
            var sign = md5(content + key);
            var postData = "content=" + content + "&sign=" + sign;
            return postData;
        };
        return PfuReq;
    }();
    var PfuResp = function() {
        function PfuResp() {}
        return PfuResp;
    }();
    var PfuShareBean = function() {
        function PfuShareBean() {}
        return PfuShareBean;
    }();
    var PfuShareData = function() {
        function PfuShareData() {}
        return PfuShareData;
    }();
    var PfuSplashBean = function() {
        function PfuSplashBean() {}
        return PfuSplashBean;
    }();
    var PfuSplashData = function() {
        function PfuSplashData() {}
        return PfuSplashData;
    }();
    var PfuWechatAdBean = function() {
        function PfuWechatAdBean() {}
        return PfuWechatAdBean;
    }();
    var PfuWechatAdData = function() {
        function PfuWechatAdData() {
            this.banner = "0";
            this.video = "0";
        }
        return PfuWechatAdData;
    }();
    var PfuMoreGameBean = function() {
        function PfuMoreGameBean() {}
        return PfuMoreGameBean;
    }();
    var PfuMoreGameData = function() {
        function PfuMoreGameData() {}
        return PfuMoreGameData;
    }();
    PFU.PfuMoreGameData = PfuMoreGameData;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuGlobal = function() {
        function PfuGlobal() {}
        PfuGlobal.ShowNextSplashAd = function() {
            PFU.PfuManager.GetInstance().ShowNextSplashAd();
        };
        PfuGlobal.ShowRandomSplashAd = function() {
            PFU.PfuManager.GetInstance().ShowRandomSplashAd();
        };
        PfuGlobal.ShowRandomGeneralAd = function() {
            PFU.PfuManager.GetInstance().ShowRandomGeneralAd();
        };
        PfuGlobal.ShowNextGeneralAd = function() {
            PFU.PfuManager.GetInstance().ShowNextGeneralAd();
        };
        PfuGlobal.IsMiniAppInGame = function() {
            return PFU.PfuManager.GetInstance().IsMiniAppIn();
        };
        PfuGlobal.CreateBanner = function(adId, dir, fun) {
            return PFU.WeChatBannerAd.GetInstance().Create(adId, dir, fun);
        };
        PfuGlobal.ShowBanner = function() {
            PFU.WeChatBannerAd.GetInstance().Show();
        };
        PfuGlobal.HideBanner = function() {
            PFU.WeChatBannerAd.GetInstance().Hide();
        };
        PfuGlobal.RefreshBanner = function(fun) {
            PFU.WeChatBannerAd.GetInstance().Refresh(fun);
        };
        PfuGlobal.IsReadyBanner = function() {
            return PFU.WeChatBannerAd.GetInstance().IsReadyBanner();
        };
        PfuGlobal.CreateIncentiveAd = function(adId) {
            PFU.WeChatIncentiveAd.GetInstance().Create(adId);
        };
        PfuGlobal.IsIncentivAdReady = function() {
            return PFU.WeChatIncentiveAd.GetInstance().IsReady();
        };
        PfuGlobal.ShowIncentive = function(service, fun, adunit) {
            PFU.WeChatIncentiveAd.GetInstance().Show(service, fun, adunit);
        };
        PfuGlobal.GetOLParam = function() {
            return PFU.PfuManager.GetInstance().OLParam;
        };
        PfuGlobal.SetFocusHandler = function(handler, callback) {
            this.focusCallback = callback;
            this.focusHandler = handler;
        };
        PfuGlobal.Focus = function() {
            if (this.focusHandler != null) {
                this.focusCallback.call(this.focusHandler, Date.now());
            }
        };
        PfuGlobal.PfuShareGroupNext = function(handler, fun, isAward, qureyPos, addQurey) {
            this._shareHandle(handler, fun, isAward, false, qureyPos, addQurey);
        };
        PfuGlobal.PfuShareVideo = function(handler, fun, isAward, qureyPos, addQurey) {
            this._shareHandle(handler, fun, isAward, true, qureyPos, addQurey);
        };
        PfuGlobal._shareHandle = function(handler, fun, isAward, isVideo, qureyPos, addQurey) {
            var _this = this;
            var stamp = Date.now();
            PFU.PfuManager.GetInstance().PfuShareNext(false, "", fun, qureyPos, addQurey);
            if (isAward && !PFU.PfuManager.GetInstance().IsWegameTestMode()) {
                this.SetFocusHandler(this, function(time) {
                    var max = parseInt(_this.GetOLParam().pfuSdkShareTime);
                    if (time - stamp >= max) {
                        console.log("分享成功");
                        fun.call(handler, PfuSdk.SUCCESS, "");
                    } else {
                        var str = PFU.PfuManager.GetInstance().OLParam.pfuSdkShare1;
                        fun.call(handler, PfuSdk.FAIL, str);
                    }
                    console.log("用时:" + (time - stamp) + " | t:" + max);
                    _this.SetFocusHandler(null, null);
                });
            }
        };
        PfuGlobal.GetPfuBannerData = function() {
            var array = [];
            for (var i = 0; i < PFU.PfuManager.GetInstance().MoreGame.length; i++) {
                var gameData = PFU.PfuManager.GetInstance().MoreGame[i];
                if (gameData.bannerLink != null) {
                    array.push(gameData);
                }
            }
            return array;
        };
        PfuGlobal.GetTotalMoreGameCount = function() {
            return PFU.PfuManager.GetInstance().GetTotalMoreGameCount();
        };
        PfuGlobal.GetMoreGameIconUrl = function(index) {
            return PFU.PfuManager.GetInstance().GetMoreGameLeftIconUrl(index);
        };
        PfuGlobal.ShowMoreGameImage = function(index, callServer, fun) {
            PFU.PfuManager.GetInstance().ShowMoreGameImage(true, index, callServer, fun);
        };
        PfuGlobal.CustomShowMoreGameImage = function(data, callServer, fun) {
            PFU.PfuManager.GetInstance().CustomShowMoreGameImage(data, callServer, fun);
        };
        PfuGlobal.GetTopUrl = function() {
            return PFU.PfuManager.GetInstance().GetTopUrl();
        };
        return PfuGlobal;
    }();
    PfuGlobal.focusCallback = null;
    PfuGlobal.focusHandler = null;
    PFU.PfuGlobal = PfuGlobal;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuConfig = function() {
        function PfuConfig() {}
        PfuConfig.InitConfig = function(service, callback) {
            var res = [ {
                url: "PfusdkRes/pfusdkconfig.json",
                type: Laya.Loader.JSON
            } ];
            Laya.loader.load(res, Laya.Handler.create(this, function() {
                var json = Laya.loader.getRes(res[0].url);
                PfuConfig.Config = json;
                callback.call(service);
            }));
        };
        PfuConfig.GetCdnPath = function() {
            return PfuConfig.Config.cdnPath + PfuConfig.Config.version + "/";
        };
        return PfuConfig;
    }();
    PFU.PfuConfig = PfuConfig;
    var PfuConfigBean = function() {
        function PfuConfigBean() {}
        return PfuConfigBean;
    }();
    PFU.PfuConfigBean = PfuConfigBean;
    var DataTimeCount = function() {
        function DataTimeCount() {
            this.time = 0;
            this.count = 0;
        }
        return DataTimeCount;
    }();
    PFU.DataTimeCount = DataTimeCount;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuBoxListReq = function() {
        function PfuBoxListReq() {
            this.from = -1;
        }
        PfuBoxListReq.prototype.getContent = function(key) {
            var contentJson = JSON.stringify(this);
            var content = Base64.encode(contentJson);
            var sign = md5(content + key);
            var postData = "content=" + content + "&sign=" + sign;
            return postData;
        };
        return PfuBoxListReq;
    }();
    var PfuBoxListResp = function() {
        function PfuBoxListResp() {
            this.adverts = new Array();
        }
        return PfuBoxListResp;
    }();
    var PfuBoxListData = function() {
        function PfuBoxListData() {}
        return PfuBoxListData;
    }();
    PFU.PfuBoxListData = PfuBoxListData;
    var PfuBoxList = function() {
        function PfuBoxList() {
            this._resp = new PfuBoxListResp();
        }
        PfuBoxList.GetInstance = function() {
            if (!this.instance) {
                this.instance = new PfuBoxList();
            }
            return this.instance;
        };
        PfuBoxList.prototype.Connect = function(wechatgameid, callBack) {
            var _this = this;
            var contentData = new PfuBoxListReq();
            contentData.wxid = wechatgameid;
            this._wechatId = wechatgameid;
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 1e4;
            xhr.once(Laya.Event.COMPLETE, this, function(e) {
                var data = JSON.parse(Base64.decode(e));
                _this.preaseData(data);
                callBack(PfuSdk.SUCCESS);
            });
            xhr.once(Laya.Event.ERROR, this, function(data) {
                callBack(PfuSdk.FAIL);
            });
            xhr.on(Laya.Event.PROGRESS, this, function() {});
            var url = PfuBoxList.OL_BOX_LIST + "?" + contentData.getContent(PFU.PfuManager.OL_KEY);
            xhr.send(url, "", "get", "text");
        };
        PfuBoxList.prototype.preaseData = function(data) {
            if (data.code == PFU.PfuRespState.succeed) {
                this._resp.adverts = data.adverts;
            } else {
                console.log("erro:" + data.code);
            }
        };
        PfuBoxList.prototype.GetAdverts = function() {
            var arr = new Array();
            for (var i = 0; i < this._resp.adverts.length; i++) {
                var data = this._resp.adverts[i];
                if (this.IsMoreGameDataBeAppIdList(data.wechatGameid)) {
                    arr.push(data);
                }
            }
            return arr;
        };
        PfuBoxList.prototype.GetMoreGameListData = function() {
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
                } else {
                    arr.push(data);
                }
            }
            return arr;
        };
        PfuBoxList.prototype.IsMoreGameDataBeAppIdList = function(wxChatId) {
            if (wxChatId == undefined || wxChatId == "") {
                return false;
            }
            for (var i = 0; i < PFU.PfuConfig.Config.navigateToMiniAppId.length; i++) {
                var appId = PFU.PfuConfig.Config.navigateToMiniAppId[i];
                if (appId == wxChatId) {
                    return true;
                }
            }
            return false;
        };
        return PfuBoxList;
    }();
    PfuBoxList.OL_BOX_LIST = "https://wxhz.jfydgame.com/jfyd_advert_wechat/wxbox";
    PFU.PfuBoxList = PfuBoxList;
})(PFU || (PFU = {}));

var PFU;

(function(PFU) {
    var PfuBannerUpdate = function() {
        function PfuBannerUpdate() {
            this._timeCount = 0;
            this._refreshBannerHandle = null;
            this._refreshBannerCallback = null;
            this._onPfuSetBannerVisible = null;
            this._showIndex = 0;
            this._moreGameData = new Array();
            this._isCreateBanner = false;
            this._isLastCtrAction = false;
            this._isLastShow = true;
            Laya.timer.loop(1e3, this, this.Update);
            Laya.timer.loop(200, this, this.UpdateBannerAction);
        }
        PfuBannerUpdate.GetInstance = function() {
            if (!this.instance) {
                this.instance = new PfuBannerUpdate();
            }
            return this.instance;
        };
        PfuBannerUpdate.prototype.SetRefreshHandle = function(handle, refreshCallback, onVisible) {
            this._refreshBannerHandle = handle;
            this._refreshBannerCallback = refreshCallback;
            this._onPfuSetBannerVisible = onVisible;
            this._moreGameData = PFU.PfuGlobal.GetPfuBannerData();
            this.RefreshPfuBanner();
        };
        PfuBannerUpdate.prototype.CreateBanner = function() {
            var _this = this;
            this._isCreateBanner = false;
            PFU.PfuGlobal.CreateBanner(PFU.PfuConfig.Config.bannerId, PFU.BannerDirction.DOWN_CENTER, function() {
                _this._isCreateBanner = true;
            });
        };
        PfuBannerUpdate.prototype.UpdateBannerAction = function() {
            if (!PfuSdk.GetParamComplete) {
                return;
            }
            if (this._isCreateBanner) {
                if (this._isLastCtrAction) {
                    if (this._isLastShow) {
                        this.onShowBanner();
                    } else {
                        this.onHideBanner();
                    }
                    this._isLastCtrAction = false;
                }
            }
        };
        PfuBannerUpdate.prototype.Update = function() {
            if (!PfuSdk.GetParamComplete) {
                return;
            }
            this._timeCount += 1;
            if (this._timeCount > PFU.PfuGlobal.GetOLParam().pfuSdkRefresh) {
                this.RefreshBanner();
                this._timeCount = 0;
            }
        };
        PfuBannerUpdate.prototype.IsBeBannerImg = function() {
            if (this._moreGameData && this._moreGameData.length > 0) {
                return true;
            }
            return false;
        };
        PfuBannerUpdate.prototype.RefreshPfuBanner = function() {
            if (this._refreshBannerHandle != null) {
                if (!this.IsBeBannerImg()) {
                    return;
                }
                this._showIndex++;
                if (this._showIndex >= this._moreGameData.length) {
                    this._showIndex = 0;
                }
                this._refreshBannerCallback.call(this._refreshBannerHandle);
            }
        };
        PfuBannerUpdate.prototype.RefreshBanner = function() {
            var _this = this;
            this._isCreateBanner = false;
            {
                if (PFU.PfuGlobal.IsReadyBanner()) {
                    PFU.PfuGlobal.RefreshBanner(function() {
                        _this._isCreateBanner = true;
                        _this._isLastCtrAction = true;
                    });
                }
            }
        };
        PfuBannerUpdate.prototype.GetPfuBannerImgUrl = function() {
            if (!this.IsBeBannerImg()) {
                return "";
            }
            return PFU.PfuGlobal.GetTopUrl() + this._moreGameData[this._showIndex].bannerLink;
        };
        PfuBannerUpdate.prototype.ClickPfuBanner = function() {
            if (!this.IsBeBannerImg()) {
                return;
            }
            PfuSdk.CallOnHide();
            PFU.PfuGlobal.CustomShowMoreGameImage(this._moreGameData[this._showIndex], this, function() {
                PfuSdk.CallOnShow({});
            });
        };
        PfuBannerUpdate.prototype.CallShow = function() {
            this._isLastCtrAction = true;
            this._isLastShow = true;
        };
        PfuBannerUpdate.prototype.CallHide = function() {
            this._isLastCtrAction = true;
            this._isLastShow = false;
        };
        PfuBannerUpdate.prototype.onHideBanner = function() {
            {
                PFU.PfuGlobal.HideBanner();
            }
        };
        PfuBannerUpdate.prototype.onShowBanner = function() {
            {
                PFU.PfuGlobal.ShowBanner();
            }
        };
        return PfuBannerUpdate;
    }();
    PFU.PfuBannerUpdate = PfuBannerUpdate;
})(PFU || (PFU = {}));

var PfuSdk = function() {
    function PfuSdk() {}
    Object.defineProperty(PfuSdk, "GetParamComplete", {
        get: function() {
            return PFU.PfuManager.GetInstance().GetParamComplete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PfuSdk, "GetBoxListComplete", {
        get: function() {
            return PFU.PfuManager.GetInstance().GetBoxListComplete;
        },
        enumerable: true,
        configurable: true
    });
    PfuSdk.Init = function() {
        console.log("pfu sdk ver:" + this.sdk_ver);
        PFU.PfuConfig.InitConfig(this, function() {
            PFU.PfuManager.GetInstance().Init();
            PFU.PfuPlatformManager.GetInstance().Init();
        });
    };
    PfuSdk.GetCdnPath = function() {
        return PFU.PfuConfig.GetCdnPath();
    };
    PfuSdk.GetConfig = function() {
        return PFU.PfuConfig.Config;
    };
    PfuSdk.InitConfig = function(handler, callback) {
        console.log("pfu sdk ver:" + this.sdk_ver);
        PFU.PfuConfig.InitConfig(this, function() {
            PFU.PfuManager.GetInstance().Init();
            PFU.PfuPlatformManager.GetInstance().Init();
            callback.call(handler);
        });
    };
    PfuSdk.CallOnShow = function(args) {
        PFU.PfuPlatformManager.GetInstance().SetOnShowWxAdId(args);
        PFU.PfuGlobal.Focus();
        if (this._showCallBack) {
            this._showCallBack();
        }
    };
    PfuSdk.CallOnHide = function() {
        if (this._hideCallBack) {
            this._hideCallBack();
        }
    };
    PfuSdk.OnShow = function(fun) {
        var _this = this;
        this._showCallBack = fun;
        PFU.WeChatUtils.GetInstance().OnAppShow(function(args) {
            PFU.PfuManager.GetInstance().RespondJumpGameBoxRelive(args);
            _this.CallOnShow(args);
        });
    };
    PfuSdk.OnHide = function(fun) {
        var _this = this;
        this._hideCallBack = fun;
        PFU.WeChatUtils.GetInstance().OnAppHide(function() {
            _this.CallOnHide();
        });
    };
    PfuSdk.IsVideoForceShare = function() {
        return PFU.PfuManager.GetInstance().IsVideoForceShare();
    };
    PfuSdk.Share = function(handle, qureyPos, addQurey) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, function() {}, false, qureyPos, addQurey);
    };
    PfuSdk.ShareAward = function(handle, fun, qureyPos, addQurey) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, fun, true, qureyPos, addQurey);
    };
    PfuSdk.Video = function(handle, fun, adunit, isForceShare) {
        var _this = this;
        if (this._sdkVideoShareFinish && PFU.PfuManager.GetInstance().IsPfuSdkVideoShare()) {
            if (isForceShare == undefined || isForceShare == void 0 || isForceShare) {
                PFU.PfuGlobal.PfuShareVideo(this, function(type, desc) {
                    if (type == PfuSdk.SUCCESS) {
                        _this._sdkVideoShareFinish = false;
                        _this.PlayVideo(handle, fun, true, adunit);
                    } else {
                        fun.call(handle, type, desc);
                    }
                }, true);
            } else {
                this.PlayVideo(handle, fun, false, adunit);
            }
            return;
        }
        this.PlayVideo(handle, fun, false, adunit);
    };
    PfuSdk.PlayVideo = function(handle, fun, shareIn, adunit) {
        var _this = this;
        PFU.PfuGlobal.ShowIncentive(this, function(type) {
            var tip = "";
            if (type == PfuSdk.SUCCESS) {
                console.log("video success");
                PFU.PfuPlatformManager.GetInstance().StatisticsMsg2202();
                _this._sdkVideoShareFinish = true;
                fun.call(handle, type, tip);
            } else if (type == PfuSdk.VIDEO_SHOW_FAIL) {
                console.log("video error");
                if (!PFU.PfuManager.GetInstance().IsWegameTestMode()) {
                    if (shareIn) {
                        fun.call(handle, PfuSdk.SUCCESS, "");
                        return;
                    }
                    console.log("video error share");
                    _this.ShareAward(_this, function(type, desc) {
                        console.log("video error share callback:" + type + " |" + desc);
                        if (type == PfuSdk.SUCCESS) {
                            _this._sdkVideoShareFinish = true;
                        }
                        fun.call(handle, type, desc);
                    });
                } else {
                    tip = "暂时没有可播放的视频了";
                    fun.call(handle, type, tip);
                }
            } else {
                console.log("video fail");
                tip = "观看完整视频才会获得奖励";
                fun.call(handle, type, tip);
            }
        }, adunit);
    };
    PfuSdk.GetOLParam = function(name) {
        var list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            return list[name];
        }
        return null;
    };
    PfuSdk.GetOLParamInt = function(name) {
        var list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            return parseInt(list[name]);
        }
        return 0;
    };
    PfuSdk.SetOLParamInt = function(name, newValue) {
        var list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            list[name] = newValue;
        }
    };
    PfuSdk.SetPlatformShreUserHandle = function(handle, callback) {
        PFU.PfuPlatformManager.GetInstance().SetInGameUserHandle(handle, callback);
    };
    PfuSdk.ClearPlatformShareUserCache = function(pos) {
        PFU.PfuPlatformManager.GetInstance().ClearShareUserList(pos);
    };
    PfuSdk.ShowBanner = function() {
        PFU.PfuBannerUpdate.GetInstance().CallShow();
    };
    PfuSdk.HideBanner = function() {
        PFU.PfuBannerUpdate.GetInstance().CallHide();
    };
    PfuSdk.ShowMoreGameList = function(type) {
        PFU.PfuMoreGameUpdate.GetInstance().CallShowMoreGameUI(type);
    };
    PfuSdk.HideMoreGameList = function() {
        PFU.PfuMoreGameUpdate.GetInstance().CallHideMoreGameUI();
    };
    PfuSdk.ShowRandomGeneralAd = function() {
        PFU.PfuManager.GetInstance().ShowRandomGeneralAd();
    };
    PfuSdk.IsTestModel = function() {
        return PFU.PfuManager.GetInstance().IsWegameTestMode();
    };
    PfuSdk.IsPfuSdkVideoShare = function() {
        return PFU.PfuManager.GetInstance().IsPfuSdkVideoShare();
    };
    PfuSdk.JumpGameboxForRelive = function(handle, callback) {
        PFU.PfuManager.GetInstance().JumpGameboxForRelive(handle, callback);
    };
    PfuSdk.SetMoreGameUILayer = function(layernum) {
        PFU.PfuMoreGameUpdate.GetInstance().SetMoreGameUILayer(layernum);
    };
    return PfuSdk;
}();

PfuSdk.SUCCESS = 0;

PfuSdk.FAIL = 1;

PfuSdk.VIDEO_SHOW_FAIL = 2;

PfuSdk.sdk_ver = "0.0.5.9";

PfuSdk.SHOW_TYPE_ALL = 0;

PfuSdk.SHOW_TYPE_MOREGAME = 1;

PfuSdk.SHOW_TYPE_BOXLIST = 2;

PfuSdk._sdkVideoShareFinish = true;