namespace PFU {
    export class PfuConfig {

        public static Config: PfuConfigBean;

        public static InitConfig(service: any, callback: Function) {
            //载入UI配置表
            let res: Array<any> = [
                { url: "PfusdkRes/pfusdkconfig.json", type: Laya.Loader.JSON },
            ];
            Laya.loader.load(res,
                Laya.Handler.create(this, () => {
                    let json = Laya.loader.getRes(res[0].url);
                    PfuConfig.Config = json;
                    callback.call(service);
                }));
        }

        public static GetCdnPath() {
            return PfuConfig.Config.cdnPath +
                PfuConfig.Config.version +
                "/";
        }

    }

    export class PfuConfigBean {
        public weChatId: string;
        public pfuAppId: string;
        public version: string;
        public cdnPath: string;
        public bannerId: string;
        public videoId: string;
        public mtaAppId: string;
        public mtaEventId: string;
        public privateKey: string;
        public pfuShareProtocol: number;
        public navigateToMiniAppId:Array<string>;
        public checkAppUpdate:number;
        public ui_moreGameType:number;
        public ui_crossGameListType:number;
    }

    export class DataTimeCount {
        //最后一次领取时间
        public time: number = 0;
        //
        public count: number = 0;
    }
}