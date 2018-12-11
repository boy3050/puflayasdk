
namespace PFU {
    export class PfuOLParamData {
        //banner广告
  
        //public ad_banner;
        //1.0.4启用 0 关闭每日礼包 1 视频播放奖励 2 分享奖励
        //public gift;

        //Banner广告条刷新时间
        //public banner_refresh_time;

        //复活分享次数限制
        //public fenxiang_number;
        //复活视频播放次数限制
        //public revive_video_number;
        //分享试玩次数 0 视频 大于0 分享次数，每日更新
        //public fenxiangshiwan;

        //视频领取界面按钮是否播放延迟动画
        //public buttendelay;




        //审核模式 0:上线 1：审核
        public pfuSdkTestMode;
        //SDK显示游戏内交叉推广
        public pfuSdkMoreGame;
        //SDK显示开屏广告
        public pfuSdkShowOpenAds;
        //SDK视频前分享(分享复选框)
        public pfuSdkVideoShare;
        //成功分享间隔时间
        public pfuSdkShareTime;
        //SDK通过盒子复活
        public pfuSdkBoxRelive;
        //分享提示文字1
        public pfuSdkShare1;
        //分享提示文字2
        public pfuSdkShare2;
        //SDK视频前分享次数
        public pfuSdkShareCount;
        //SDK广告刷新时间
        public pfuSdkRefresh;

        //SDKBanner最低刷新时间
        public pfuSdkBannerMin;

        //SDKBanner最大刷新次数
        public pfuSdkBannerCount;

        //SDK用户时间长,通过判断用户时长来打开广告分享功能 单位:分钟
        public pfuSdkPlayTime;

        //通过点击banner复活<实际判断是游戏切到后天再切回来>
        public pfuSdkBannerRelive;


        public Init() {
            
            this.pfuSdkTestMode = PfuSwitch.ON;

            this.pfuSdkMoreGame = PfuSwitch.ON;

            this.pfuSdkShowOpenAds = PfuSwitch.OFF;

            this.pfuSdkBoxRelive = PfuSwitch.OFF;

            this.pfuSdkShareTime = 4000;
            this.pfuSdkVideoShare = PfuSwitch.OFF;
            this.pfuSdkShare1 = "分享失败，请分享到群!";
            this.pfuSdkShare2 = "分享失败，请分享到不同的群！";

            this.pfuSdkRefresh = 1000;
            this.pfuSdkShareCount = 0;

            this.pfuSdkBannerMin = 30;
            this.pfuSdkBannerCount = 3;

            this.pfuSdkPlayTime = 60;

            this.pfuSdkBannerRelive = 2;
        }
        //AddCode	

        //EndAddCode
    }
}