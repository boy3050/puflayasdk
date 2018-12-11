var PFU;
(function (PFU) {
    var PfuOLParamData = (function () {
        function PfuOLParamData() {
        }
        PfuOLParamData.prototype.Init = function () {
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
            this.pfuSdkBannerMin = 30;
            this.pfuSdkBannerCount = 3;
            this.pfuSdkPlayTime = 60;
            this.pfuSdkBannerRelive = 2;
        };
        return PfuOLParamData;
    }());
    PFU.PfuOLParamData = PfuOLParamData;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuOLParamData.js.map