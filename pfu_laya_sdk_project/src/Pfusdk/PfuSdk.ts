/*
* name;
*/
class PfuSdk {

    public static readonly SUCCESS = 0;//success
    public static readonly FAIL = 1;//fail
    public static readonly VIDEO_SHOW_FAIL = 2;

    public static readonly UI_ORDER_MOREGAME = 90000;

    public static readonly UI_FIRST_SCENEBOX = 10000000000;
    public static readonly UI_ORDER_OTHER = 1000000000;

    public static get GetParamComplete() { return PFU.PfuManager.GetInstance().GetParamComplete; }
    public static get GetBoxListComplete() { return PFU.PfuManager.GetInstance().GetBoxListComplete; }

    private static sdk_ver = "0.0.7.0";

    public static SHOW_TYPE_ALL = 0;//更多游戏，BosList都显示
    public static SHOW_TYPE_MOREGAME = 1;//只显示更多游戏
    public static SHOW_TYPE_BOXLIST = 2; //只显示底部盒子列表

    private static _sdkVideoShareFinish: boolean = true;

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
        PFU.PfuPlatformManager.GetInstance().OnShow(args);
        PFU.PfuGlobal.Focus();
        PFU.PfuClickBannerRevive.GetInstance().OnAppShow();
        if (this._showCallBack) {
            this._showCallBack();
        }
    }

    /**
     * 主动投中APP切换到后台
     */
    public static CallOnHide() {
        PFU.PfuPlatformManager.GetInstance().OnHide();
        PFU.PfuClickBannerRevive.GetInstance().OnAppHide();
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
     * @param qureyPos 分享参数  1
     */
    public static Share(handle: any, qureyPos?: number, addQurey?: string) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, () => { }, false, qureyPos, addQurey);
    }

    /**
     * 激励分享
     * @param handle 
     * @param fun (type:)
     * @param qureyPos 
     */
    public static ShareAward(handle: any, fun: Function, qureyPos?: number, addQurey?: string) {
        PFU.PfuGlobal.PfuShareGroupNext(handle, (type, desc) => {
            if (type == PfuSdk.SUCCESS) {
                fun.call(handle, type, desc);
            } else {
                PFU.PfuGlobal.ShowDialog(desc, () => {
                    fun.call(handle, type, desc);
                });
            }
        }, true, qureyPos, addQurey);
    }



    public static _clickBannerShowTime = 0;
    /**
     * 视频游戏复活功能
     * @param handle 
     * @param fun 
     * @param adunit 
     * @param isForceShare 
     */
    public static VideoRevive(handle: any, fun: Function, adunit?: string, isForceShare?: boolean)  {
        let isShowClickBanner = false;
        if(this._clickBannerShowTime ==0 || (this._clickBannerShowTime > 0 && (Date.now()- this._clickBannerShowTime) >= 60000))
        {
            isShowClickBanner = true;
        }

        if (isShowClickBanner && PFU.PfuClickBannerRevive.GetInstance().IsBannerReviveOpen()) {
            PFU.PfuClickBannerRevive.GetInstance().ShowBannerRevive(handle,(type)=>{
                this._clickBannerShowTime = Date.now();
                fun.call(handle,type);
            });
        } else  {
            this.Video(handle, fun, adunit, isForceShare);
        }

    }

    /**
     * 播放视频
     * @param handle 
     * @param fun 
     * @param adunit 视频广告ID
     * @param isForceShare 是否强制分享
     */
    public static Video(handle: any, fun: Function, adunit?: string, isForceShare?: boolean) {

        let pfuSdkVideoShare = PfuSdk.GetOLParamInt("pfuSdkVideoShare");

        if (this._sdkVideoShareFinish && pfuSdkVideoShare != 0) {
            //2分享后视频 ;1-分享成功后视频;0-直接看视频 .审核模式下全部是直接看视频
            if (isForceShare == undefined || isForceShare == void 0 || isForceShare) {
                //分享成功后视频播放
                if (pfuSdkVideoShare == 1) {
                    PFU.PfuGlobal.PfuShareVideo(this, (type, desc) => {
                        if (type == PfuSdk.SUCCESS) {
                            this.PlayVideo(handle, fun, true, adunit);
                        }
                        else {
                            PFU.PfuGlobal.ShowDialog(desc, () => {
                                fun.call(handle, type, desc);
                            });
                        }
                    }, true);
                } else {
                    //pfuSdkVideoShare = 2 分享后直接视频
                    PFU.PfuGlobal.PfuShareVideo(this, (type, desc) => {
                        if (type == PfuSdk.SUCCESS) {
                            this.PlayVideo(handle, fun, true, adunit);
                        } else {
                            PFU.PfuGlobal.ShowDialog(desc, () => {
                                this.PlayVideo(handle, fun, null, adunit);
                            });
                        }
                    }, true);
                }
            } else {
                this.PlayVideo(handle, fun, false, adunit);
            }
        } else {
            this.PlayVideo(handle, fun, false, adunit);
        }

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
                    if (shareIn == null)  {
                        fun.call(handle, PfuSdk.FAIL, "");
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

                    PFU.PfuGlobal.ShowDialog(tip, () => {
                        fun.call(handle, PfuSdk.FAIL, tip);
                    });
                }
            } else {
                console.log("video fail");
                tip = "观看完整视频才会获得奖励";
                PFU.PfuGlobal.ShowDialog(tip, () => {
                    fun.call(handle, type, tip);
                });
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
    public static SetPlatformShareUserHandle(handle: any, callback: Function) {
        PFU.PfuPlatformManager.GetInstance().SetInGameUserHandle(handle, callback);
    }

    /**
     * 获取分享用户
     * @param pos 
     */
    public static GetPlatformShareUser(pos?: number) {
        return PFU.PfuPlatformManager.GetInstance().GetShareUserList(pos);
    }

    /**
     * 清除某个点分享进入的用户信息
     * @param pos 
     */
    public static ClearPlatformShareUserCache(pos?: number) {
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
    // public static SetMoreGameUILayer(layernum: number) {
    //     PFU.PfuMoreGameUpdate.GetInstance().SetMoreGameUILayer(layernum);
    // }
    /**
     * 设置更多游戏按钮Y偏移
     * @param offset 
     */
    public static SetMoreGameUIOffsetY(offset: number) {
        PFU.PfuMoreGameUpdate.GetInstance().SetMoreGameUIOffsetY(offset);
    }

    /**
     * 看广告复活
     */
    public static ShowClickBannnerRevive(handle: any, fun: Function) {
        PFU.PfuClickBannerRevive.GetInstance().ShowBannerRevive(handle, fun);
    }

    /**
     * 显示弹出试 交叉推广游戏列表
     */
    public static ShowPopupListGame() {
        PFU.PfuMoreGameUpdate.GetInstance().ShowPopupListGame(true);
    }
    /**
     * 隐藏弹出试 交叉推广游戏列表
     */
    public static HidePopupListGame() {
        PFU.PfuMoreGameUpdate.GetInstance().ShowPopupListGame(false);
    }

    /**
     * 显示红包按钮
     */
    public static ShowRedPacketBtn() {
        PFU.PfuRedPacketManager.GetInstance().CallShowRedPacketBtn(true);
    }
    public static HideRedPacketBtn() {
        PFU.PfuRedPacketManager.GetInstance().CallShowRedPacketBtn(false);
    }
    /**
     * 弹出获得红包
     */
    public static PopupRedPacket(handle: any, callback: Function)  {
        PFU.PfuRedPacketManager.GetInstance().PopupRedPacket(handle, callback);
    }

    /**
     * 是否可以领取红包
     */
    public static CanGetRedPacket(): boolean  {
        return PFU.PfuRedPacketManager.GetInstance().CanGetRedPacket();
    }

    /**
     * 设置红包按钮位置
     */
    public static SetRedPacketBtnPos(vx: number, vy: number) {
        PFU.PfuRedPacketManager.GetInstance().SetRedPacketBtnPos(vx, vy);
    }

    /**
     * 显示红包每日领取界面
     */
    public static PopupRedPacketEverydayWindow()  {
        PFU.PfuRedPacketManager.GetInstance().PopupRedPacketEverydayWindow();
    }

}