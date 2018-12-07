** pfusdkLaya1xDemo pfusdkLaya2xDemo 不定时去更新，所以库不保证最新

** pfu_laya_sdk_project保持和Release版本同步


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
	 
   4   分享
   
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


**添加规范**

下载Release

一 SDK部署位置 [/SDK核心]

	PfusdkRes文件夹放入Laya工程bin目录(确保必须在此目录，排除不用的UI库资源)

	core文件夹放入Laya工程bin/libs 目录 (UI类库需要自行排除)
      使用LayaUI保留 pufsdkcore.js 和 pufsdklayagui.js
      使用FiaryGui保留 pufsdkcore.js 和 pufsdkfairyui.js
      Laya1.x版本需要在index.html中引对应库
      Laya2.x版本需要在index.js中引用对应库

	pfusdk.d.ts 文件放入Laya工程libs目录
 
 
  添加依赖库 
  
    base64.min.js 
    md5-min.js
    
    依赖库在sdklibrary文件夹下

  库添加规范和顺序
  
    Laya核心库->sdk依赖库->sdk核心库->sdkUI库
    
 二 pfuSdkConfig配置说明
  
     //微信ID (必须)
    "weChatId": "wx2d47467291703ec7",
    //PFU后台ID (必须)
    "pfuAppId": "1306xxx",
    //后台版本号 (必须)
    "version": "1.4.9",
    //CDN路径 否
    "cdnPath": "https://xxxxx.x.xxx",
    //BannerID
    "bannerId": "adunit-xxxxx",
    //视频ID 
    "videoId": "adunit-xxxxxx",
    //pfu开放平台ID (必须)
    "privateKey": "xxxxxxx",
    //是否使用pfu分享协议来监听分享卡片点击用户 0 关闭 1开启(开启后会开启微信登录)
    "pfuShareProtocol": 0,
    //腾讯统计ID
    "mtaAppId": "",
    //腾讯事件统计ID
    "mtaEventId": "",
    //pfusdk可跳转ID(更多游戏列表使用)
    "navigateToMiniAppId": [
        "wx3e33fef689f472b1",
        "wx2d47467291703ec7",
        "wx7505f4985abb17ce",
        "wx716b36314be3fe89",
        "wx8b25b991dcc6edf6",
        "wx99e08aff982f8dde",
        "wx3b33f72ee2ec7bc1",
        "wx989199f7dc0e3a50",
        "wxbbbef0244fa4d4e4",
        "wx87fe1890ea1384a5",
        "wxa0eee1fe564aa730"
    ],
    //是否启用检测小游戏版本升级，(1开启 0 不开启) 开启后若更新下载完毕 则系统弹窗提示用户更新。
     "checkAppUpdate":1,
    //两侧更多游戏显示类型 0 两侧都显示， 1 显示左侧  2显示右侧 -1不显示更多游戏
    "ui_moreGameType":0,
    //显示交叉推广底部框时是否排除navigateToMiniAppId 
    //0：排除  1 不排除(不在navigateToMiniAppId列表的用参数显示二维码) -1:不显示底部框
    "ui_crossGameListType":0
    
    
  三 开放API说明:
  
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
       * 设置MoreGameUI层级关系
       */
      SetMoreGameUILayer(layernum:number);
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
     
