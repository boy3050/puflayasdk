
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

    SHOW_TYPE_ALL;//更多游戏，BosList都显示
    SHOW_TYPE_MOREGAME;//只显示更多游戏
    SHOW_TYPE_BOXLIST; //只显示底部盒子列表


    UI_ORDER_MOREGAME;// UI排序 moregameUI 交叉推广按钮更多游戏按钮红包按钮层级关系

    //#region 在Ini之前调用的接口

    /**
     * 打开SDK使用CDN资源不使用本地资源
     */
    OpenCDNRes();
    /**
     * 设置Banner宽度
     */
    SetBannerWidth(width: number);
    /**
     * 限制Banner最大高度
     */
    SetBannerMaxHeight(height: number);

    //#endregion

    /**
     * 必须*** 第一种初始化(Init和InitConfig只能选择一种来初始化)
     */
    Init();
    /**
     * 第二种初始化(Init和InitConfig只能选择一种来初始化)，只是增加了一个Config文件读取的回调
     */
    InitConfig(handle: any, callback: Function);

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
     * 分享 无回调
     */
    Share(handle: any, qureyPos?: number, addQurey?: string);
    /**
     * 激励分享
     * @param handle 
     * @param fun (type:number[返回类型],desc:string[描述])
     * @param qureyPos 
     */
    ShareAward(handle: any, fun: Function, qureyPos?: number, addQurey?: string);
    /**
     * 播放视频
     * @param handle 
     * @param fun 
     * @param adunit 额外视频广告ID
     * @param isForceShare 是否强制分享
     */
    Video(handle: any, fun: Function, adunit?: string, isForceShare?: boolean);
    /**
     * 播放视频复活
     * @param handle 
     * @param fun 
     * @param adunit 额外视频广告ID
     * @param isForceShare 是否强制分享
     */
    VideoRevive(handle: any, fun: Function, adunit?: string, isForceShare?: boolean);
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
     * @param callback (type:number)
     */
    SetPlatformShareUserHandle(handle: any, callback: Function);

    /**
     * 获取分享用户
     * @param pos 
     */
    GetPlatformShareUser(pos?: number);

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
     * 显示更多游戏列表  SHOW_TYPE_ALL  SHOW_TYPE_MOREGAME SHOW_TYPE_BOXLIST
     */
    ShowMoreGameList(type?: number);
    /**
     * 隐藏更多游戏列表
     */
    HideMoreGameList();

    /**
     * 是否为审核模式
     */
    IsTestModel(): boolean;

    /**
     * 随机显示公众号
     */
    ShowRandomGeneralAd();
	/**
	* 视频前分享(复选框开关)
	*/
    IsPfuSdkVideoShare(): boolean;

    /*
    *	跳转盒子复活功能 
    *	callback返回type
    *	callback(type:number) type(SUCCESS,FAIL)
    */
    JumpGameboxForRelive(handle: any, callback: Function);

    /**
     * 设置MoreGameUI层级关系 (LayaUI) 抛弃使用ZOrder来替代层级
     */
    //SetMoreGameUILayer(layernum: number);

    /**
     * 设置更多游戏按钮Y偏移 (*  beta)
    */
    SetMoreGameUIOffsetY(offset: number)

    /**
     * 点击Banner复活
     */
    ShowClickBannnerRevive(handle: any, fun: Function);

    /**
     * 显示弹出试 交叉推广游戏列表
    */
    ShowPopupListGame();

    /**
     * 隐藏弹出试 交叉推广游戏列表
     */
    HidePopupListGame();

    /**
     * 显示红包按钮
     */
    ShowRedPacketBtn();
    /**
    *  隐藏红包按钮
    */
    HideRedPacketBtn();
    /**
     * 弹出获得红包
     */
    PopupRedPacket(handle: any, callback: Function);

    /**
     * 是否可以领取红包
     */
    CanGetRedPacket(): boolean

    /**
     * 设置红包按钮位置
     */
    SetRedPacketBtnPos(vx: number, vy: number)

    /**
     * 显示红包每日领取界面
     */
    PopupRedPacketEverydayWindow();

}
declare const PfuSdk: PfuSdk;

declare module PFU.UI {
    //FairyGui接口
    class PfuSdkFairyUI {

        public static CreateUI(callback: Function);
    }
    //LayaUI接口
    class PfuSdkLayaUI {
    	/*
        * 特殊适配方案，将页面缩放处理，并调整底部适配偏移值
        * scaleX
        * scaleY
        * bottomOffset
        */
        public static CustomSpecialUI(scaleX: number, scaleY: number, bottomOffset: number);
        public static CreateUI();
        public static GetSdkWindowList(): Array<any>;
    }
}


