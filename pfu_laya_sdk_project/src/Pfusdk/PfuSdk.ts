/*
* name;
*/
class PfuSdk {

    public static readonly SUCCESS = 0;//success
    public static readonly FAIL = 1;//fail

    public static readonly VIDEO_SHOW_FAIL = 2;

    public static get GetParamComplete() { return PFU.PfuManager.GetInstance().GetParamComplete; }
    public static get GetBoxListComplete() { return PFU.PfuManager.GetInstance().GetBoxListComplete; }

    private static sdk_ver = "0.0.6.2";

    public static SHOW_TYPE_ALL = 0;//更多游戏，BosList都显示
    public static SHOW_TYPE_MOREGAME = 1;//只显示更多游戏
    public static SHOW_TYPE_BOXLIST = 2; //只显示底部盒子列表

    /**
     * 初始化 获取 在线参数 平台登录  微信登录 授权
     */
    public static Init() {
        console.log("pfu sdk ver:" + this.sdk_ver);
        PFU.PfuConfig.InitConfig(this, () => {
            PFU.PfuManager.GetInstance().Init();
            PFU.PfuPlatformManager.GetInstance().Init();
        });
    }


    public static GetCdnPath() {
        return PFU.PfuConfig.GetCdnPath();
    }


    public static GetConfig() {
        return PFU.PfuConfig.Config;
    }



    /**
     * name
     */
    public static InitConfig(handler: any, callback: Function) {
        console.log("pfu sdk ver:" + this.sdk_ver);
        PFU.PfuConfig.InitConfig(this, () => {
            PFU.PfuManager.GetInstance().Init();
            PFU.PfuPlatformManager.GetInstance().Init();

            callback.call(handler);
        });
    }


    /**
     * 主动通知APP切换到前台
     */
    private static _showCallBack;
    private static _hideCallBack;
    public static CallOnShow(args) {
        PFU.PfuPlatformManager.GetInstance().SetOnShowWxAdId(args);
        PFU.PfuGlobal.Focus();
        if (this._showCallBack) {
            this._showCallBack();
        }
    }

    /**
     * 主动投中APP切换到后台
     */
    public static CallOnHide() {
        if (this._hideCallBack) {
            this._hideCallBack();
        }
    }

    /**
     * 被动通知显示在前台
     * @param fun 
     */
    public static OnShow(fun: Function) {
        this._showCallBack = fun;
        PFU.WeChatUtils.GetInstance().OnAppShow((args) => {
            PFU.PfuManager.GetInstance().RespondJumpGameBoxRelive(args);
            this.CallOnShow(args);
        });
    }

    /**
     * 被动通知切换到后台
     * @param fun 
     */
    public static OnHide(fun: Function) {
        this._hideCallBack = fun;
        PFU.WeChatUtils.GetInstance().OnAppHide(() => {
            this.CallOnHide();
        });
    }
    /**
     * 是否可以强制视频分享
     */
    public static IsVideoForceShare(): boolean {
        return PFU.PfuManager.GetInstance().IsVideoForceShare();
    }


    /**
     * 分享 无回调
     * @param handle 
     * @param qureyPos 分享参数 
     */
    public static Share(handle: any, qureyPos?: number,addQurey?:string) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, () => { }, false, qureyPos,addQurey);
    }
    /**
     * 激励分享
     * @param handle 
     * @param fun (type:)
     * @param qureyPos 
     */
    public static ShareAward(handle: any, fun: Function, qureyPos?: number,addQurey?:string) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, fun, true, qureyPos,addQurey);
    }

    private static _sdkVideoShareFinish: boolean = true;

    private static _isVideoError: false;


    /**
     * 播放视频
     * @param handle 
     * @param fun 
     * @param adunit 视频广告ID
     * @param isForceShare 是否强制分享
     */
    public static Video(handle: any, fun: Function, adunit?: string, isForceShare?: boolean) {

        if (this._sdkVideoShareFinish && PFU.PfuManager.GetInstance().IsPfuSdkVideoShare()) {

            if (isForceShare == undefined || isForceShare == void 0 || isForceShare) {
                PFU.PfuGlobal.PfuShareVideo(this, (type, desc) => {
                    if (type == PfuSdk.SUCCESS) {
                        this._sdkVideoShareFinish = false;
                        this.PlayVideo(handle, fun, true, adunit);
                    }
                    else {
                        fun.call(handle, type, desc);
                    }
                }, true);
            } else  {
                this.PlayVideo(handle, fun, false, adunit);
            }



            return;
        }
        this.PlayVideo(handle, fun, false, adunit);
    }

    private static PlayVideo(handle: any, fun: Function, shareIn: boolean, adunit?: string) {

        PFU.PfuGlobal.ShowIncentive(this, (type: number) => {
            let tip = "";
            if (type == PfuSdk.SUCCESS) {
                console.log("video success");
                PFU.PfuPlatformManager.GetInstance().StatisticsMsg2202();
                this._sdkVideoShareFinish = true;
                fun.call(handle, type, tip);
            } else if (type == PfuSdk.VIDEO_SHOW_FAIL) {
                console.log("video error");
                if (!PFU.PfuManager.GetInstance().IsWegameTestMode()) {
                    if (shareIn) {
                        fun.call(handle, PfuSdk.SUCCESS, "");
                        return;
                    }
                    console.log("video error share");
                    this.ShareAward(this, (type, desc) => {
                        console.log("video error share callback:" + type + " |" + desc);
                        if (type == PfuSdk.SUCCESS) {
                            this._sdkVideoShareFinish = true;
                        }
                        fun.call(handle, type, desc);
                    });
                }
                else {
                    tip = "暂时没有可播放的视频了";
                    fun.call(handle, type, tip);
                }
            } else {
                console.log("video fail");
                tip = "观看完整视频才会获得奖励";
                fun.call(handle, type, tip);
            }

        }, adunit);
    }


    /**
     * 获取在线参数
     * @param name 
     */
    public static GetOLParam(name: string): string {
        let list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            return list[name];
        }
        return null;
    }
    /**
     * 获取在线参数
     * @param name 
     */
    public static GetOLParamInt(name: string): number {
        let list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            return parseInt(list[name]);
        }
        return 0;
    }
    /**
     * 设置在线参数
     * @param name 
     * @param newValue 
     */
    public static SetOLParamInt(name: string, newValue: number) {
        let list = PFU.PfuGlobal.GetOLParam();
        if (list[name]) {
            list[name] = newValue;
        }
    }

    /**
     * 分享后有用户点击 消息监听
     * @param handle 
     * @param callback 
     */
    public static SetPlatformShreUserHandle(handle: any, callback: Function) {
        PFU.PfuPlatformManager.GetInstance().SetInGameUserHandle(handle, callback);
    }

    /**
     * 清除某个点分享进入的用户信息
     * @param pos 
     */
    public static ClearPlatformShareUserCache(pos: number) {
        PFU.PfuPlatformManager.GetInstance().ClearShareUserList(pos);
    }

    /**
     * 显示Banner
     */
    public static ShowBanner() {
        PFU.PfuBannerUpdate.GetInstance().CallShow();
    }
    /**
     * 隐藏Bannner
     */
    public static HideBanner() {
        PFU.PfuBannerUpdate.GetInstance().CallHide();
    }

    /**
     * 显示更多游戏页
     */
    public static ShowMoreGameList(type?: number) {
        PFU.PfuMoreGameUpdate.GetInstance().CallShowMoreGameUI(type);
    }
    /**
     * 隐藏更多游戏页
     */
    public static HideMoreGameList() {
        PFU.PfuMoreGameUpdate.GetInstance().CallHideMoreGameUI();
    }
    /**
     * 随机显示公众号
     */
    public static ShowRandomGeneralAd() {
        PFU.PfuManager.GetInstance().ShowRandomGeneralAd();
    }
    /**
     * 是否为审核模式
     */
    public static IsTestModel() {

        return PFU.PfuManager.GetInstance().IsWegameTestMode();
    }
    /**
    * 视频前分享(复选框)
    */
    public static IsPfuSdkVideoShare() {
        return PFU.PfuManager.GetInstance().IsPfuSdkVideoShare();
    }

    /**
     * 0.0.3 跳转盒子复活功能，可监听到从盒子返回消息
     * @param handle 
     * @param callback 
     */
    public static JumpGameboxForRelive(handle: any, callback: Function) {
        PFU.PfuManager.GetInstance().JumpGameboxForRelive(handle, callback);
    }

    /**
     * 设置MoreGameUI层级关系
     */
    public static SetMoreGameUILayer(layernum: number) {
        PFU.PfuMoreGameUpdate.GetInstance().SetMoreGameUILayer(layernum);
    }
}