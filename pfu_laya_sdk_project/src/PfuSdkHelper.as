package 
{
	public class PfuSdkHelper
	{
		//判定分享回调 视频回调等 成功状态
		public static var SUCCESS:Number = 0;
		//判断分享回调 视频回到等 失败状态
		public static var FAIL:Number = 1;
		//视频播放错误状态
		public static var VIDEO_SHOW_FAIL:Number = 2;
		//更多游戏，BosList都显示
		public static var SHOW_TYPE_ALL:Number = 0;
		//只显示更多游戏
		public static var SHOW_TYPE_MOREGAME:Number = 1;
		//只显示底部盒子列表
		public static var SHOW_TYPE_BOXLIST:Number = 2;

		// UI排序 moregameUI 交叉推广按钮更多游戏按钮红包按钮层级关系
    	public static var UI_ORDER_MOREGAME:Number = 90000;

		private static function JSObj():*
		{
			return __JS__('PfuSdk');
		}

		/**
		* 在线参数是否准备完成
		*/
		public static function GetParamComplete():Boolean {
			return PfuSdkHelper.JSObj().GetParamComplete;
		}

		/**
		* 在线参数是否准备完成
		*/
		public static function GetBoxListComplete():Boolean {
			return PfuSdkHelper.JSObj().GetBoxListComplete;
		}
		/**
		* 打开SDK使用CDN资源不使用本地资源
		*/
		public static function OpenCDNRes()
		{
			PfuSdkHelper.JSObj().OpenCDNRes();
		}

		/**
		* 设置Banner宽度
		*/
		public static function SetBannerWidth(width:number)
		{
			PfuSdkHelper.JSObj().SetBannerWidth(width);
		}

		/**
     	* 限制Banner最大高度
     	*/
    	public static function SetBannerMaxHeight(height:number)
		{
			PfuSdkHelper.JSObj().SetBannerMaxHeight(height);
		}


		/**
		* 初始化 获取 在线参数 平台登录  微信登录 授权
		*/
		public static function InitConfig(handler:*, callback: Function):void 
		{
			PfuSdkHelper.JSObj().InitConfig(handler,callback);
		}


		/**
		* 使用cdnpath+varsion作为资源管理使用此配置作为basePath
		* 配置文件中cdn+version
		*/
		public static function GetCdnPath():String 
		{
			return PfuSdkHelper.JSObj().GetCdnPath();
		}

		/**
		 * 获取配置文件参数
		*/
		public static function GetConfig():* 
		{
			return PfuSdkHelper.JSObj().GetConfig();
		}

		/**
		* 必须添加**  监听show方法
		*/
		public static function OnShow(callback: Function):void
		{
			PfuSdkHelper.JSObj().OnShow(callback);
		}
		/**
		* 必须添加**  监听hide方法
		*/
		public static function OnHide(callback: Function):void
		{
			PfuSdkHelper.JSObj().OnHide(callback);
		}

		/**
		* 分享 无回调
		*/
		public static function Share(handle: *, qureyPos: Number = null,addQurey:String = null):void
		{
			PfuSdkHelper.JSObj().Share(handle,qureyPos,addQurey);
		}

		/**
		* 激励分享
		* @param handle 
		* @param fun (type:number[返回类型],desc:string[描述])
		* @param qureyPos 
		*/
		public static function ShareAward(handle: *, fun: Function, qureyPos: Number = null,addQurey:String = null):void
		{
			PfuSdkHelper.JSObj().ShareAward(handle,fun,qureyPos,addQurey);
		}
		
		/**
		* 播放视频
		* @param handle 
		* @param fun 
		* @param adunit 额外视频广告ID
		* @param isForceShare 是否强制分享
		*/
		public static function Video(handle: *, fun: Function,adunit:String = null,isForceShare:Boolean = true):void
		{
			PfuSdkHelper.JSObj().Video(handle,fun,adunit,isForceShare);
		}


		/**
		* 获取在线参数
		* @param name 
		*/
		public static function GetOLParam(name: String): String
		{
			return PfuSdkHelper.JSObj().GetOLParam(name);
		}
		/**
		* 获取后台参数int类型
		* 没有参数则返回0
		*/
		public static function GetOLParamInt(name: String): Number
		{
			return PfuSdkHelper.JSObj().GetOLParamInt(name);
		}

		/**
		* 强制设置后台参数 number
		*/
		public static function SetOLParamInt(name: String, newValue: Number):void
		{
			PfuSdkHelper.JSObj().SetOLParamInt(name);
		}

		/**
		* 获取当天游戏时长
		*/
		public static function GetTodayPlaySecond(): Number
		{
			return PfuSdkHelper.JSObj().GetTodayPlaySecond();
		}

		/**
		* 获取用户总时长
		*/
		public static function GetUserPlayTime(): Number
		{
			return PfuSdkHelper.JSObj().GetUserPlayTime();
		}
		
		/**
		* 分享后有用户点击 消息监听 (*beta)
		* @param handle 
		* @param callback (type:number)
		*/
		public static function SetPlatformShareUserHandle(handle: *, callback: Function):void
		{
			PfuSdkHelper.JSObj().SetPlatformShareUserHandle(handle,callback);
		}

		/**
		* 获取分享用户 (*beta)
		* @param pos 
		*/	
		public static function GetPlatformShareUser(pos:Number = -999):*
		{
			return PfuSdkHelper.JSObj().GetPlatformShareUser(pos);
		}

		/**
		* 清除某个点分享进入的用户信息 (*beta)
		* @param pos 
		*/
		public static function ClearPlatformShareUserCache(pos: Number):void
		{
			PfuSdkHelper.JSObj().ClearPlatformShareUserCache(pos);
		}

		/**
		* 显示Banner
		*/
		public static function ShowBanner():void
		{
			PfuSdkHelper.JSObj().ShowBanner();
		}

		/**
		* 隐藏Banner
		*/
		public static function HideBanner():void
		{
			PfuSdkHelper.JSObj().HideBanner();
		}

		/*
		*	显示更多游戏列表
		*/
		public static function ShowMoreGameList(type:Number = 0):Boolean {
			return PfuSdkHelper.JSObj().ShowMoreGameList(type);
		}

		/**
		 * 隐藏更多游戏列表
		 */
		public static function HideMoreGameList():Boolean {
			return PfuSdkHelper.JSObj().HideMoreGameList();
		}
		


		/**
		* 是否为审核模式
		*/
		public static function IsTestModel():Boolean
		{
			return PfuSdkHelper.JSObj().IsTestModel();
		}

		/**
		* 随机显示公众号
		*/
		public static function ShowRandomGeneralAd():void
		{
			PfuSdkHelper.JSObj().ShowRandomGeneralAd();
		}

		/**
		* 视频前分享(复选框开关)
		*/
		public static function IsPfuSdkVideoShare():Boolean
		{
			return PfuSdkHelper.JSObj().IsPfuSdkVideoShare();
		}

		/*
		*	跳转盒子复活功能 
		*	callback返回type
		*	callback(type:number) type(SUCCESS,FAIL)
		*/
		public static function JumpGameboxForRelive(handle:*, callback: Function):void
		{
			PfuSdkHelper.JSObj().JumpGameboxForRelive(handle,callback);
		}

		/**
		* 设置MoreGameUI层级关系 (LayaUI) 抛弃使用ZOrder来替代层级
		*/
		// public static function SetMoreGameUILayer(layernum:Number):void
		// {
		// 	PfuSdkHelper.JSObj().SetMoreGameUILayer(layernum);
		// }

		/**
		* 设置更多游戏按钮Y偏移 (*beta)
		*/
		public static function SetMoreGameUIOffsetY(offset:Number):void
		{
			PfuSdkHelper.JSObj().SetMoreGameUIOffsetY(offset);
		}

		/**
		* 创建LayaUI
		*/
		public static function LayaUI_CreateUI():void {
			__JS__('PFU').UI.PfuSdkLayaUI.CreateUI();
		}

		/*
		* 特殊适配方案，将页面缩放处理，并调整底部适配偏移值
		* scaleX
		* scaleY
		* bottomOffset
		*/
		public static function LayaUI_CustomSpecialUI(scaleX: Number, scaleY: Number, bottomOffset: Number):void {
			__JS__('PFU').UI.PfuSdkLayaUI.CreateUI();
		}

		/**
		 * 返回一个SDK包含的View数组
		 */
		public static function LayaUI_GetSdkWindowList():Array
		{
			return __JS__('PFU').UI.PfuSdkLayaUI.GetSdkWindowList();
		}


		/**
		* 创建FairyUI
		*/
		public static function FairyUI_CreateUI():void {
			__JS__('PFU').UI.PfuSdkFairyUI.CreateUI();
		}

		/**
		* 播放视频复活
		* @param handle 
		* @param fun 
		* @param adunit 额外视频广告ID
		* @param isForceShare 是否强制分享
		*/
		public static function VideoRevive(handle: *, fun: Function,adunit:String = null,isForceShare:Boolean = true):void
		{
			PfuSdkHelper.JSObj().Video(handle,fun,adunit,isForceShare);
		}


		/**
		* 显示弹出试 交叉推广游戏列表
		*/
		public static function ShowPopupListGame():void
		{
			PfuSdkHelper.JSObj().ShowPopupListGame();
		}

		/**
		* 隐藏弹出试 交叉推广游戏列表
		*/
		public static function HidePopupListGame():void
		{
			PfuSdkHelper.JSObj().HidePopupListGame();
		}
		/**
     	* 显示红包按钮
     	*/
		public static function ShowRedPacketBtn():void
		{
			PfuSdkHelper.JSObj().ShowRedPacketBtn();
		}
		/**
		 * 隐藏红包按钮
		 */
		public static function HideRedPacketBtn():void
		{
			PfuSdkHelper.JSObj().HideRedPacketBtn();
		}


		/**
		* 弹出获得红包
		*/
	 	public static function PopupRedPacket(handle:*,callback:Function):void
		{
			PfuSdkHelper.JSObj().PopupRedPacket(handle,callback);
		}
		/**
		* 是否可以领取红包
		*/
		public static function CanGetRedPacket():Boolean
		{
			return PfuSdkHelper.JSObj().CanGetRedPacket();
		}
		/**
		* 设置红包按钮位置
		*/
		public static function SetRedPacketBtnPos(vx: Number, vy: Number):Boolean
		{
			return PfuSdkHelper.JSObj().SetRedPacketBtnPos(vx,vy);
		}
    
		/**
		* 显示红包每日领取界面
		*/
		public static function PopupRedPacketEverydayWindow():Boolean
		{
			return PfuSdkHelper.JSObj().PopupRedPacketEverydayWindow();
		}

	}

}