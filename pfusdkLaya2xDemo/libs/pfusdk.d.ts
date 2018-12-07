
interface PfuSdk {
    //判定分享回调 视频回调等 成功状态
    SUCCESS;
    //判断分享回调 视频回到等 失败状态
    FAIL;
    //视频播放错误状态
    VIDEO_SHOW_FAIL;

    //在线参数是否准备完毕
    GetParamComplete(): boolean;
    //盒子列表是否准备完毕
    GetBoxListComplete(): boolean;
    /**
     * 必须*** 第一种初始化(Init和InitConfig只能选择一种来初始化)
     */
    Init();
    /**
     * 第二种初始化(Init和InitConfig只能选择一种来初始化)，只是增加了一个Config文件读取的回调
     */
    InitConfig(handle:any,callback: Function);

    /**
     * 使用cdnpath+varsion作为资源管理使用此配置作为basePath
     * 配置文件中cdn+version
     */
    GetCdnPath(): string;
    /**
     * 获取配置文件参数
     */
    GetConfig(): any;


    /**
     * 必须添加**  监听show方法
     */
    OnShow(callback: Function);
    /**
     * 必须添加**  监听hide方法
     */
    OnHide(callback: Function);

    /**
     * 视频是否为强制分享(可做UI上变化判定)
     */
    IsVideoForceShare(): boolean;

    /**
     * 分享 无回调
     */
    Share(handle: any, qureyPos?: number);
    /**
     * 激励分享
     * @param handle 
     * @param fun (type:返回类型,desc:描述)
     * @param qureyPos 
     */
    ShareAward(handle: any, fun: Function, qureyPos?: number);
    /**
     * 播放视频
     * @param handle 
     * @param fun 
     */
    Video(handle: any, fun: Function);
    /**
     * 获取在线参数
     * @param name 
     */
    GetOLParam(name: string): string;
    /**
     * 获取后台参数int类型
     * 没有参数则返回0
     */
    GetOLParamInt(name: string): number;
    /**
     * 强制设置后台参数 number
     */
    SetOLParamInt(name: string, newValue: number);

    /**
     * 分享后有用户点击 消息监听
     * @param handle 
     * @param callback 
     */
    SetPlatformShreUserHandle(handle: any, callback: Function);
    /**
     * 清除某个点分享进入的用户信息
     * @param pos 
     */
    ClearPlatformShareUserCache(pos: number);

    /**
     * 显示Banner
     */
    ShowBanner();

    /**
     * 隐藏Banner
     */
    HideBanner();


    /**
     * 显示更多游戏列表
     */
    ShowMoreGameList();
    /**
     * 隐藏更多游戏列表
     */
    HideMoreGameList();

    /**
     * 是否为审核模式
     */
    IsTestModel():boolean;

    /**
     * 随机显示公众号
     */
    ShowRandomGeneralAd();
	/**
	* 视频前分享(复选框开关)
	*/
    IsPfuSdkVideoShare():boolean;
}
declare const PfuSdk: PfuSdk;

declare module PFU.UI {
    class PfuSdkFairyUI
    {
        public static CreateUI();
    }

    class PfuSdkLayaUI
    {
        public static CreateUI();
    }
}


