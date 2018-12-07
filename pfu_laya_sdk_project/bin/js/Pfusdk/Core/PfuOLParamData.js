var PFU;
(function (PFU) {
    var PfuOLParamData = (function () {
        function PfuOLParamData() {
        }
        PfuOLParamData.prototype.Init = function () {
            //this.ad_banner = PfuSwitch.ON;
            //this.gift = PfuSwitch.OFF;
            //this.banner_refresh_time = 180;
            //this.fenxiang_number = 1;
            //this.revive_video_number = 3;
            //this.fenxiangshiwan = 0;
            //this.buttendelay = PfuSwitch.ON;
            this.pfuSdkTestMode = PFU.PfuSwitch.ON;
            this.pfuSdkMoreGame = PFU.PfuSwitch.ON;
            this.pfuSdkShowOpenAds = PFU.PfuSwitch.OFF;
            this.pfuSdkBoxRelive = PFU.PfuSwitch.OFF;
            this.pfuSdkShareTime = 4000;
            this.pfuSdkVideoShare = PFU.PfuSwitch.OFF;
            this.pfuSdkShare1 = "分享失败，请分享到群!";
            this.pfuSdkShare2 = "分享失败，请分享到不同的群！";
            this.pfuSdkRefresh = 1000;
            this.pfuSdkShareCount = 0;
        };
        return PfuOLParamData;
    }());
    PFU.PfuOLParamData = PfuOLParamData;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuOLParamData.js.map