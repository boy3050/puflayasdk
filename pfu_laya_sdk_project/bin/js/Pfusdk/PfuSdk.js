/*
* name;
*/
var PfuSdk = (function () {
    function PfuSdk() {
    }
    Object.defineProperty(PfuSdk, "GetParamComplete", {
        get: function () { return PFU.PfuManager.GetInstance().GetParamComplete; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PfuSdk, "GetBoxListComplete", {
        get: function () { return PFU.PfuManager.GetInstance().GetBoxListComplete; },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化 获取 在线参数 平台登录  微信登录 授权
     */
    PfuSdk.Init = function () {
        console.log("pfu sdk ver:" + this.sdk_ver);
        PFU.PfuConfig.InitConfig(this, function () {
            PFU.PfuManager.GetInstance().Init();
            PFU.PfuPlatformManager.GetInstance().Init();
        });
    };
    PfuSdk.GetCdnPath = function () {
        return PFU.PfuConfig.GetCdnPath();
    };
    PfuSdk.GetConfig = function () {
        return PFU.PfuConfig.Config;
    };
    /**
     * name
     */
    PfuSdk.InitConfig = function (handler, callback) {
        console.log("pfu sdk ver:" + this.sdk_ver);
        PFU.PfuConfig.InitConfig(this, function () {
            PFU.PfuManager.GetInstance().Init();
            PFU.PfuPlatformManager.GetInstance().Init();
            callback.call(handler);
        });
    };
    PfuSdk.CallOnShow = function (args) {
        PFU.PfuPlatformManager.GetInstance().OnShow(args);
        PFU.PfuGlobal.Focus();
        if (this._showCallBack) {
            this._showCallBack();
        }
    };
    /**
     * 主动投中APP切换到后台
     */
    PfuSdk.CallOnHide = function () {
        PFU.PfuPlatformManager.GetInstance().OnHide();
        if (this._hideCallBack) {
            this._hideCallBack();
        }
    };
    /**
     * 被动通知显示在前台
     * @param fun
     */
    PfuSdk.OnShow = function (fun) {
        var _this = this;
        this._showCallBack = fun;
        PFU.WeChatUtils.GetInstance().OnAppShow(function (args) {
            PFU.PfuManager.GetInstance().RespondJumpGameBoxRelive(args);
            _this.CallOnShow(args);
        });
    };
    /**
     * 被动通知切换到后台
     * @param fun
     */
    PfuSdk.OnHide = function (fun) {
        var _this = this;
        this._hideCallBack = fun;
        PFU.WeChatUtils.GetInstance().OnAppHide(function () {
            _this.CallOnHide();
        });
    };
    /**
     * 是否可以强制视频分享
     */
    PfuSdk.IsVideoForceShare = function () {
        return PFU.PfuManager.GetInstance().IsVideoForceShare();
    };
    /**
     * 分享 无回调
     * @param handle
     * @param qureyPos 分享参数
     */
    PfuSdk.Share = function (handle, qureyPos, addQurey) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, function () { }, false, qureyPos, addQurey);
    };
    /**
     * 激励分享
     * @param handle
     * @param fun (type:)
     * @param qureyPos
     */
    PfuSdk.ShareAward = function (handle, fun, qureyPos, addQurey) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, function (type, desc) {
            if (type == PfuSdk.SUCCESS) {
            }
            else {
                PFU.PfuGlobal.ShowDialog(desc);
            }
            fun.call(handle, desc);
        }, true, qureyPos, addQurey);
    };
    /**
     * 播放视频
     * @param handle
     * @param fun
     * @param adunit 视频广告ID
     * @param isForceShare 是否强制分享
     */
    PfuSdk.Video = function (handle, fun, adunit, isForceShare) {
        var _this = this;
        var pfuSdkVideoShare = PfuSdk.GetOLParamInt("pfuSdkVideoShare");
        if (this._sdkVideoShareFinish && pfuSdkVideoShare != 0) {
            //2分享后视频 ;1-分享成功后视频;0-直接看视频 .审核模式下全部是直接看视频
            if (isForceShare == undefined || isForceShare == void 0 || isForceShare) {
                //分享成功后视频播放
                if (pfuSdkVideoShare == 1) {
                    PFU.PfuGlobal.PfuShareVideo(this, function (type, desc) {
                        if (type == PfuSdk.SUCCESS) {
                            //this._sdkVideoShareFinish = false;
                            _this.PlayVideo(handle, fun, true, adunit);
                        }
                        else {
                            fun.call(handle, type, desc);
                            PFU.PfuGlobal.ShowDialog(desc);
                        }
                    }, true);
                }
                else {
                    //pfuSdkVideoShare = 2 分享后直接视频
                    PFU.PfuGlobal.PfuShareVideo(this, function (type, desc) {
                        if (type == PfuSdk.SUCCESS) {
                        }
                        else {
                            PFU.PfuGlobal.ShowDialog(desc);
                        }
                        _this.PlayVideo(handle, fun, false, adunit);
                    }, true);
                }
            }
            else {
                this.PlayVideo(handle, fun, false, adunit);
            }
        }
        else {
            this.PlayVideo(handle, fun, false, adunit);
        }
    };
    PfuSdk.PlayVideo = function (handle, fun, shareIn, adunit) {
        var _this = this;
        PFU.PfuGlobal.ShowIncentive(this, function (type) {
            var tip = "";
            if (type == PfuSdk.SUCCESS) {
                console.log("video success");
                PFU.PfuPlatformManager.GetInstance().StatisticsMsg2202();
                _this._sdkVideoShareFinish = true;
                fun.call(handle, type, tip);
            }
            else if (type == PfuSdk.VIDEO_SHOW_FAIL) {
                console.log("video error");
                if (!PFU.PfuManager.GetInstance().IsWegameTestMode()) {
                    if (shareIn) {
                        fun.call(handle, PfuSdk.SUCCESS, "");
                        return;
                    }
                    console.log("video error share");
                    _this.ShareAward(_this, function (type, desc) {
                        console.log("video error share callback:" + type + " |" + desc);
                        if (type == PfuSdk.SUCCESS) {
                            _this._sdkVideoShareFinish = true;
                        }
                        fun.call(handle, type, desc);
                    });
                }
                else {
                    tip = "暂时没有可播放的视频了";
                    fun.call(handle, type, tip);
                    PFU.PfuGlobal.ShowDialog(tip);
                }
            }
            else {
                console.log("video fail");
                tip = "观看完整视频才会获得奖励";
                fun.call(handle, type, tip);
                PFU.PfuGlobal.ShowDialog(tip);
            }
        }, adunit);
    };
    /**
     * 获取在线参数
     * @param name
     */
    PfuSdk.GetOLParam = function (name) {
        var list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            return list[name];
        }
        return null;
    };
    /**
     * 获取在线参数
     * @param name
     */
    PfuSdk.GetOLParamInt = function (name) {
        var list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            return parseInt(list[name]);
        }
        return 0;
    };
    /**
     * 设置在线参数
     * @param name
     * @param newValue
     */
    PfuSdk.SetOLParamInt = function (name, newValue) {
        var list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            list[name] = newValue;
        }
    };
    /**
     * 分享后有用户点击 消息监听
     * @param handle
     * @param callback
     */
    PfuSdk.SetPlatformShreUserHandle = function (handle, callback) {
        PFU.PfuPlatformManager.GetInstance().SetInGameUserHandle(handle, callback);
    };
    /**
     * 清除某个点分享进入的用户信息
     * @param pos
     */
    PfuSdk.ClearPlatformShareUserCache = function (pos) {
        PFU.PfuPlatformManager.GetInstance().ClearShareUserList(pos);
    };
    /**
     * 显示Banner
     */
    PfuSdk.ShowBanner = function () {
        PFU.PfuBannerUpdate.GetInstance().CallShow();
    };
    /**
     * 隐藏Bannner
     */
    PfuSdk.HideBanner = function () {
        PFU.PfuBannerUpdate.GetInstance().CallHide();
    };
    /**
     * 显示更多游戏页
     */
    PfuSdk.ShowMoreGameList = function (type) {
        PFU.PfuMoreGameUpdate.GetInstance().CallShowMoreGameUI(type);
    };
    /**
     * 隐藏更多游戏页
     */
    PfuSdk.HideMoreGameList = function () {
        PFU.PfuMoreGameUpdate.GetInstance().CallHideMoreGameUI();
    };
    /**
     * 随机显示公众号
     */
    PfuSdk.ShowRandomGeneralAd = function () {
        PFU.PfuManager.GetInstance().ShowRandomGeneralAd();
    };
    /**
     * 是否为审核模式
     */
    PfuSdk.IsTestModel = function () {
        return PFU.PfuManager.GetInstance().IsWegameTestMode();
    };
    /**
    * 视频前分享(复选框)
    */
    PfuSdk.IsPfuSdkVideoShare = function () {
        return PFU.PfuManager.GetInstance().IsPfuSdkVideoShare();
    };
    /**
     * 0.0.3 跳转盒子复活功能，可监听到从盒子返回消息
     * @param handle
     * @param callback
     */
    PfuSdk.JumpGameboxForRelive = function (handle, callback) {
        PFU.PfuManager.GetInstance().JumpGameboxForRelive(handle, callback);
    };
    /**
     * 设置MoreGameUI层级关系
     */
    PfuSdk.SetMoreGameUILayer = function (layernum) {
        PFU.PfuMoreGameUpdate.GetInstance().SetMoreGameUILayer(layernum);
    };
    /**
     * 设置更多游戏按钮Y偏移
     * @param offset
     */
    PfuSdk.SetMoreGameUIOffsetY = function (offset) {
        PFU.PfuMoreGameUpdate.GetInstance().SetMoreGameUIOffsetY(offset);
    };
    return PfuSdk;
}());
PfuSdk.SUCCESS = 0; //success
PfuSdk.FAIL = 1; //fail
PfuSdk.VIDEO_SHOW_FAIL = 2;
PfuSdk.sdk_ver = "0.0.6.5";
PfuSdk.SHOW_TYPE_ALL = 0; //更多游戏，BosList都显示
PfuSdk.SHOW_TYPE_MOREGAME = 1; //只显示更多游戏
PfuSdk.SHOW_TYPE_BOXLIST = 2; //只显示底部盒子列表
PfuSdk._sdkVideoShareFinish = true;
//# sourceMappingURL=PfuSdk.js.map