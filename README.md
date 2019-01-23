** pfusdkLaya1xDemo pfusdkLaya2xDemo 不定时去更新，所以库不保证最新

** pfu_laya_sdk_project保持和Release版本同步

** 初次对接，在微信开发者工具中的game.json 要配置 navigateToMiniProgramAppIdList 参数 如下:

       "navigateToMiniProgramAppIdList": [
	    "wx3e33fef689f472b1",
	    "wx7505f4985abb17ce",
	    "wx716b36314be3fe89",
	    "wx8b25b991dcc6edf6",
	    "wx99e08aff982f8dde",
	    "wx3b33f72ee2ec7bc1",
	    "wx989199f7dc0e3a50",
	    "wxbbbef0244fa4d4e4",
	    "wx87fe1890ea1384a5",
	    "wxa0eee1fe564aa730"
       ]
       此处只能留10个ID， 将sdk中pfusdkconfig文件里的navigateToMiniProgramAppIdList 内容copy过来，优先删除自己的。
       接着从底部开始删除(保留10个)。 最后自己游戏的sdk配置文件可跳转列表与这个10个保持一致。

## 福袋使用

[点击查看福袋调用规则](https://github.com/boy3050/puflayasdk/blob/master/pfu_laya_sdk_project/%E7%A6%8F%E8%A2%8B%E4%BD%BF%E7%94%A8.md)



## 更新日志

[点击这里查看版本更新日志](https://github.com/boy3050/puflayasdk/blob/master/%E6%9B%B4%E6%96%B0%E8%AF%B4%E6%98%8E.md)




## 需要添加合法域名

	Request:
	
	https://txpk.jfydgame.com
	https://login.jfydgame.com
	https://info.jfydgame.com
	https://wxad.jfydgame.com
	https://wxhz.jfydgame.com
	
	downloadFile:
	
	https://txpk.jfydgame.com
	
	Socket:
	
	wss://msg.jfydgame.com
		

**添加规范**

下载最新的Release x.x.x   https://github.com/boy3050/puflayasdk/releases

一 SDK部署位置

      PfusdkRes文件夹放入Laya工程bin目录(确保必须在此目录，排除不用的UI库资源)

      core文件夹放入Laya工程(TS)bin/libs 目录  (AS)bin/h5/libs 目录
      
      Laya1.x版本需要在index.html中引对应库
      
      Laya2.x版本需要在index.js中引用对应库
      
      TS版本
      pfusdk.d.ts 文件放入Laya工程libs目录
      AS版本
      
      **引用特殊规则**
      	<script src="sdklibrary/base64.min.js" loader='laya'></script>
	<script src="sdklibrary/md5-min.js" loader='laya'></script>
	//库核心
	<script src="core/pufsdkcore.js" loader='laya'></script>
	//AS版本的js 启动类里 必须 import laya.ui.View
	<script src='LayaAir3D.max.js' loader='laya'></script>
	//由于gui初始化就用到了laya.ui.view,没办法就先放在最下面。
	<script src="core/pufsdklayagui.js" loader='laya'></script>
      
      PfuSdkHelper.as 放入代码目录引用即可
 
  添加依赖库 
  
    base64.min.js 
    md5-min.js
    
    依赖库在sdklibrary文件夹下

  库添加规范和顺序
  
    Laya核心库->sdk依赖库->sdk核心库->sdkUI库
    
 二 pfuSdkConfig配置说明
 
  	/****前六项可以在pfu后台获取 粘贴在此处****/
	//PFU后台ID
	"appId": "1306xxx",
	//pfu开放平台ID
	"privateKey": "xxxxxxx",
	//微信ID
	"wxId": "wx123123123123",
	//BannerID
	"bannerId": "adunit-xxxxx",
	//视频ID
	"videoId": "adunit-xxxxx",
	
	//pfusdk可跳转ID(更多游戏列表使用 * 要和微信开发者工具内设置成一致10个)
	"navigateToMiniProgramAppIdList": [
		"wx3e33fef689f472b1",
		"wx2d47467291703ec7",
		"wx7505f4985abb17ce",
		"wx716b36314be3fe89",
		"wx8b25b991dcc6edf6",
		"wx99e08aff982f8dde",
		"wx3b33f72ee2ec7bc1",
		"wx989199f7dc0e3a50",
		"wxbbbef0244fa4d4e4",
		"wx87fe1890ea1384a5"
	],
	//定义游戏名称 *客服反馈信息使用
	"gameName":"猪猪侠xxx",
	/***   以下为自定义选项   ***/
	//后台版本号
	"version": "0.0.1",
	//是否使用pfu分享协议来监听分享卡片点击用户 0 关闭 1开启(开启后会开启微信登录)
	"pfuShareProtocol": 0,

	//CDN路径 否
	"cdnPath": "",
	//腾讯统计ID (不是所有项目都用)
	"mtaAppId": "",
	//腾讯事件统计ID
	"mtaEventId": "",

	//是否启用检测小游戏版本升级，(1开启 0 不开启) 开启后若更新下载完毕 则系统弹窗提示用户更新。
	"checkAppUpdate":1,
	//两侧更多游戏显示类型 0 两侧都显示， 1 显示左侧  2显示右侧 -1不显示更多游戏
	"ui_moreGameType":0,
	//显示交叉推广底部框时是否排除navigateToMiniAppId   0：排除  1 不排除(不在navigateToMiniAppId列表的用参数显示二维码) -1:不显示底部框
	"ui_crossGameListType":0


**初始化流程**

   1   必要代码和初始化
	
	//SDK初始化
	PfuSdk.InitConfig(this, () => {
	    //FairyGUI创建
	    //PFU.UI.PfuSdkFairyUI.CreateUI();
	    //LayaGUI创建
	    PFU.UI.PfuSdkLayaUI.CreateUI();
	});
	
	/** 此处注意一下 wx.onShow  wx.onHide 已经封装在SDK中 禁止在其他地方定义**/
	//监听切换到前台
	PfuSdk.OnShow(() => {

	});
	
	//监听切换到后台
	PfuSdk.OnHide(() => {

	});
	
   2   显示/隐藏 更多游戏 和 交叉推广
   
   	PfuSdk.ShowMoreGameList();
	PfuSdk.HideMoreGameList();
	
   3   显示/隐藏 Banner
   
	 PfuSdk.ShowBanner();
	 PfuSdk.HideBanner();
	 
   4   分享 (SDK初始化已包含右上角分享监听，不要再去设置右上角监听)
   
   	 单纯分享
	 PfuSdk.Share(this);
	 激励分享
	 PfuSdk.ShareAward(this, (type, desc) => {
            if (PfuSdk.SUCCESS == type) {
                //给予奖励
            }
            else {
                //错误描述 此处用游戏自己的UI显示错误
                console.log(desc);
		
            }
        });

   5   激励视频 (此API包含最新的SDK激励视频规则规范，调用前后不要再去写分享等机制)
   
   	//激励视频
        PfuSdk.Video(this, (type, desc) => {
            if (PfuSdk.SUCCESS == type) {
                //给予奖励
            }
            else {
                //错误描述
                console.log(desc);
            }
        });


    
** 开放API说明 ***
  
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
	     * 分享 无回调
	     */
	    Share(handle: any, qureyPos?: number,addQurey?:string);
	    /**
	     * 激励分享
	     * @param handle 
	     * @param fun (type:number[返回类型],desc:string[描述])
	     * @param qureyPos 
	     */
	    ShareAward(handle: any, fun: Function, qureyPos?: number,addQurey?:string);
	    /**
	     * 播放视频
	     * @param handle 
	     * @param fun 
	     * @param adunit 额外视频广告ID
	     * @param isForceShare 是否强制分享
	     */
	    Video(handle: any, fun: Function,adunit?:string,isForceShare?:boolean);
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
	    GetPlatformShareUser(pos?:number);

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
	    ShowMoreGameList(type?:number);
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

	    /*
	    *	跳转盒子复活功能 
	    *	callback返回type
	    *	callback(type:number) type(SUCCESS,FAIL)
	    */
	    JumpGameboxForRelive(handle: any, callback: Function);

	    /**
	     * 设置MoreGameUI层级关系 (LayaUI)
	     */
	    SetMoreGameUILayer(layernum:number);

	    /**
	     * 设置更多游戏按钮Y偏移 (*  beta)
	    */
	    SetMoreGameUIOffsetY(offset:number)


	}
	declare const PfuSdk: PfuSdk;

	declare module PFU.UI {
	    //FairyGui接口
	    class PfuSdkFairyUI
	    {

		public static CreateUI();
	    }
	    //LayaUI接口
	    class PfuSdkLayaUI
	    {
		/*
		* 特殊适配方案，将页面缩放处理，并调整底部适配偏移值
		* scaleX
		* scaleY
		* bottomOffset
		*/
		public static CustomSpecialUI(scaleX: number, scaleY: number, bottomOffset: number);
		public static CreateUI();
	    }
	}

