namespace PFU {
    export class WeChatUtils {

        private static instance: WeChatUtils;

        public static GetInstance(): WeChatUtils {
            if (!this.instance) {
                this.instance = new WeChatUtils();
            }
            return this.instance;
        }

        //发现程序入口
        public static readonly IN_GAME_FROM_1001: number = 1001;
        //屏蔽公众号广告

        public static readonly IN_GAME_FROM_1020: number = 1020;
        public static readonly IN_GAME_FROM_1024: number = 1024;
        public static readonly IN_GAME_FROM_1035: number = 1035;
        public static readonly IN_GAME_FROM_1037: number = 1037;


        public IsWeGame() {
            return Laya.Browser.onMiniGame;
        }

        public PreviewImage(imgeUrl: string) {
            if (this.IsWeGame()) {
                wx.previewImage({
                    urls: [imgeUrl]
                });
            }
        }

        /**
         * 显示菜单栏转发
         */
        public ShowShareMenu() {
            if (this.IsWeGame()) {
                wx.showShareMenu();
            }
        }
        /**
         * 隐藏菜单栏转发
         */
        public HideShareMenu() {
            if (this.IsWeGame()) {
                wx.HideShareMenu();
            }
        }
        //AddCode	

        //EndAddCode
        /**
         * 被动转发 监听的右上角转发内容
         * @param title 
         */
        public OnShareAppMessage(fun: Function, titleStr: string, imageUrl: string) {
            if (this.IsWeGame()) {
                wx.onShareAppMessage(function () {
                    fun();
                    return {
                        title: titleStr,
                        imageUrl: imageUrl,
                    }
                }
                );
            }
        }

        /**
         * 主动转发 主动调起转发页面
         */
        public ShareAppMessage(fun: Function, titleTxt: string) {

            if (this.IsWeGame()) {
                wx.shareAppMessage(
                    {
                        title: titleTxt,
                        success: function (res) {
                            fun(PfuSdk.SUCCESS);
                        },
                        fail: function (res) {
                            fun(PfuSdk.FAIL);
                        }
                    }
                )
            }
        }

        /**
         * 主动转发 高级分享 图片地址 title
         * @param fun 
         * @param titleStr 
         * @param imageUrl 
         */
        public ShareAppMessageImage(fun: Function, titleStr: string, imageUrl: string, paramQuery?: string): void {
            if (this.IsWeGame()) {
                wx.shareAppMessage(
                    {
                        title: titleStr,
                        imageUrl: imageUrl,
                        query: paramQuery,
                        success: function (res) {
                            fun(PfuSdk.SUCCESS);
                            console.log("PfuSdk.SUCCESS");
                        },
                        fail: function (res) {
                            fun(PfuSdk.FAIL);
                            console.log("PfuSdk.FAIL 1");
                        }
                    }
                );
            }
        }

        public ShareGroupAppMessageImage(isGroup: boolean, fun: Function, titleStr: string, imageUrl: string, paramQuery?: string): void {
            if (this.IsWeGame()) {
                wx.shareAppMessage(
                    {
                        title: titleStr,
                        imageUrl: imageUrl,
                        query: paramQuery
                    }
                );
            }
        }

        private static _launchOptons: LaunchOption = null;
        /**
         * 获取微信启动参数
         */
        public GetLaunchOptionsSync(): LaunchOption {
            if (this.IsWeGame()) {
                if (WeChatUtils._launchOptons == null) {
                    let launch: LaunchOption = wx.getLaunchOptionsSync();
                    WeChatUtils._launchOptons = launch;
                    console.log("scene:" + launch.scene);
                    console.log("query:" + launch.query);
                    console.log("isSticky:" + launch.isSticky);
                    console.log("shareTicket:" + launch.shareTicket);
                    console.log("referrerInfo" + launch.referrerInfo);

                }
            }
            return WeChatUtils._launchOptons;
        }

        /**
        * 获取广告来源ID
        */
        public GetAdAid(): string {
            let launchOption = this.GetLaunchOptionsSync();
            if (launchOption.query && launchOption.query.weixinadinfo) {
                let weixinadinfoArr = launchOption.query.weixinadinfo.split('.');
                let aid = weixinadinfoArr[0];
                console.log("来源广告的广告id是:" + aid);
                return aid;
            }
            return null;
        }

        // #region

        //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件
        public OnAppHide(callBack: Function) {
            if (this.IsWeGame()) {
                wx.onHide(callBack);
            }
        }

        public OnAppShow(callBack: Function) {
            if (this.IsWeGame()) {
                wx.onShow(callBack);
            }
        }

        // #endregin

        //AddCode	

        //EndAddCode


        public SetTicketShareTicket(isTicket: boolean, complete: Function): void {
            if (!this.IsWeGame()) {

                complete();
                return;
            }
            // 设置 withShareTicket: true
            wx.updateShareMenu({
                withShareTicket: isTicket,
                complete: function (res) {
                    complete();
                }
            })
        }


        // #region 跳转小程序

        /**
         * 跳转其他Aapp
         * @param wechatAppId 
         * @param path
         */
        public NavigateToMiniProgram(callServer: any, fun: Function, wechatAppId: string, pfuPath: string) {
            if (this.IsWeGame()) {
                wx.navigateToMiniProgram({
                    appId: wechatAppId,
                    path: pfuPath,
                    envVersion: "release",
                    success(res) {
                        fun.call(callServer, pfuPath);
                        console.log("success" + res);
                    },
                    fail(res) {
                        fun.call(callServer, pfuPath);
                        console.log("fail" + res);
                    }
                });
            }
        }

        public IsNavigateToMiniVersion(): boolean {
            if (this.IsWeGame()) {
                if (typeof wx.navigateToMiniProgram === 'function') {
                    return true;
                }
            }
            return false;
        }

        // #endregion



        // #region 分包加载

        public LoadSubpackage(subName: string, callback: Function, callProgress?: Function) {
            if (!this.IsWeGame()) {
                callback(PfuSdk.SUCCESS);
                return;
            }

            if (typeof wx.loadSubpackage === 'function') {
                const loadTask = wx.loadSubpackage({
                    name: subName, // name 可以填 name 或者 root
                    success: function (res) {
                        // 分包加载成功后通过 success 回调
                        callback(PfuSdk.SUCCESS);
                    },
                    fail: function (res) {
                        // 分包加载失败通过 fail 回调
                        callback(PfuSdk.FAIL);
                    }
                })

                // loadTask.onProgressUpdate(res => {
                //     console.log('下载进度', res.progress)
                //     console.log('已经下载的数据长度', res.totalBytesWritten)
                //     console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                // })
            }
            else {
                //require('./' + subName+'/game.js');
                callback(PfuSdk.SUCCESS);
            }

            // loadTask.onProgressUpdate(res => {
            //     console.log('下载进度', res.progress);
            //     console.log('已经下载的数据长度', res.totalBytesWritten);
            //     console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite);
            //     if(callProgress == void 0)
            //     {

            //     }
            //     else
            //     {
            //         callProgress(res.progress);
            //     }
            // });

        }



        // #endregion

        //  #region 微信系统相关

        public GetSystemInfoSync(): any {
            if (!this.IsWeGame()) {
                return null;
            }
            return wx.getSystemInfoSync();
        }

        public GetBenchmarkLevel(): number {
            if (!this.IsWeGame()) {
                return -99;
            }

            return this.GetSystemInfoSync().benchmarkLevel;
        }

        //AddCode	

        //EndAddCode


        public ShowSingleModal(title: string, content: string, fun: Function) {
            if (this.IsWeGame())  {
                wx.showModal({
                    title: title,
                    content: content,
                    showCancel: false,
                    success: function () {
                        fun();
                    }
                });
            }
            else
            {
                fun();
            }
        }


        public SetUpdateApp() {
            if (!this.IsWeGame()) {
                return;
            }
            const updateManager = wx.getUpdateManager();

            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate);
            });

            updateManager.onUpdateReady(function () {
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                    }
                });
            });

            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
            });
        }


        //  #endregion
    }

    class LaunchOption {
        public scene;
        public query;
        public isSticky;
        public shareTicket;
        public referrerInfo;
    }
}