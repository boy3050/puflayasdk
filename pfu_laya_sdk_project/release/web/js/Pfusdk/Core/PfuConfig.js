var PFU;
(function (PFU) {
    var PfuConfig = (function () {
        function PfuConfig() {
        }
        PfuConfig.InitConfig = function (service, callback) {
            //载入UI配置表
            var res = [
                { url: "PfusdkRes/pfusdkconfig.json", type: Laya.Loader.JSON },
            ];
            Laya.loader.load(res, Laya.Handler.create(this, function () {
                var json = Laya.loader.getRes(res[0].url);
                PfuConfig.Config = json;
                callback.call(service);
            }));
        };
        PfuConfig.GetCdnPath = function () {
            return PfuConfig.Config.cdnPath +
                PfuConfig.Config.version +
                "/";
        };
        return PfuConfig;
    }());
    PFU.PfuConfig = PfuConfig;
    var PfuConfigBean = (function () {
        function PfuConfigBean() {
        }
        return PfuConfigBean;
    }());
    PFU.PfuConfigBean = PfuConfigBean;
    var DataTimeCount = (function () {
        function DataTimeCount() {
            //最后一次领取时间
            this.time = 0;
            //
            this.count = 0;
        }
        return DataTimeCount;
    }());
    PFU.DataTimeCount = DataTimeCount;
})(PFU || (PFU = {}));
//# sourceMappingURL=PfuConfig.js.map