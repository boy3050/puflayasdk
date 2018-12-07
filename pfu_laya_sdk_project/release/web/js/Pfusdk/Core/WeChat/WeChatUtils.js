var PFU;
(function (PFU) {
    var WeChatUtils = (function () {
        function WeChatUtils() {
        }
        WeChatUtils.GetInstance = function () {
            if (!this.instance) {
                this.instance = new WeChatUtils();
            }
            return this.instance;
        };
        WeChatUtils.prototype.IsWeGame = function () {
            return Laya.Browser.onMiniGame;
        };
        WeChatUtils.prototype.PreviewImage = function (imgeUrl) {
            if (this.IsWeGame()) {
                wx.previewImage({
                    urls: [imgeUrl]
                });
            }
        };
        /**
         * 显示菜单栏转发
         */
        WeChatUtils.prototype.ShowShareMenu = function () {
            if (this.IsWeGame()) {
                wx.showShareMenu();
            }
        };
        /**
         * 隐藏菜单栏转发
         */
        WeChatUtils.prototype.HideShareMenu = function () {
            if (this.IsWeGame()) {
                wx.HideShareMenu();
            }
        };
        //AddCode	
        //EndAddCode
        /**
         * 被动转发 监听的右上角转发内容
         * @param title
         */
        WeChatUtils.prototype.OnShareAppMessage = function (fun, titleStr, imageUrl) {
            if (this.IsWeGame()) {
                wx.onShareAppMessage(function () {
                    return {
                        title: titleStr,
                        imageUrl: imageUrl,
                    };
                });
            }
        };
        /**
         * 主动转发 主动调起转发页面
         */
        WeChatUtils.prototype.ShareAppMessage = function (fun, titleTxt) {
            if (this.IsWeGame()) {
                wx.shareAppMessage({
                    title: titleTxt,
                    success: function (res) {
                        fun(PfuSdk.SUCCESS);
                    },
                    fail: function (res) {
                        fun(PfuSdk.FAIL);
                    }
                });
            }
        };
        /**
         * 主动转发 高级分享 图片地址 title
         * @param fun
         * @param titleStr
         * @param imageUrl
         */
        WeChatUtils.prototype.ShareAppMessageImage = function (fun, titleStr, imageUrl, paramQuery) {
            if (this.IsWeGame()) {
                wx.shareAppMessage({
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
                });
            }
        };
        WeChatUtils.prototype.ShareGroupAppMessageImage = function (isGroup, fun, titleStr, imageUrl, paramQuery) {
            if (this.IsWeGame()) {
                wx.shareAppMessage({
                    title: titleStr,
                    imageUrl: imageUrl,
                    query: paramQuery
                });
            }
        };
        /**
         * 获取微信启动参数
         */
        WeChatUtils.prototype.GetLaunchOptionsSync = function () {
            if (this.IsWeGame()) {
                if (WeChatUtils._launchOptons == null) {
                    var launch = wx.getLaunchOptionsSync();
                    WeChatUtils._launchOptons = launch;
                    console.log("scene:" + launch.scene);
                    console.log("query:" + launch.query);
                    console.log("isSticky:" + launch.isSticky);
                    console.log("shareTicket:" + launch.shareTicket);
                    console.log("referrerInfo" + launch.referrerInfo);
                }
            }
            return WeChatUtils._launchOptons;
        };
        /**
        * 获取广告来源ID
        */
        WeChatUtils.prototype.GetAdAid = function () {
            var launchOption = this.GetLaunchOptionsSync();
            if (launchOption.query && launchOption.query.weixinadinfo) {
                var weixinadinfoArr = launchOption.query.weixinadinfo.split('.');
                var aid = weixinadinfoArr[0];
                console.log("来源广告的广告id是:" + aid);
                return aid;
            }
            return null;
        };
        // #region
        //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件
        WeChatUtils.prototype.OnAppHide = function (callBack) {
            if (this.IsWeGame()) {
                wx.onHide(callBack);
            }
        };
        WeChatUtils.prototype.OnAppShow = function (callBack) {
            if (this.IsWeGame()) {
                wx.onShow(callBack);
            }
        };
        // #endregin
        //AddCode	
        //EndAddCode
        WeChatUtils.prototype.SetTicketShareTicket = function (isTicket, complete) {
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
            });
        };
        // #region 跳转小程序
        /**
         * 跳转其他Aapp
         * @param wechatAppId
         * @param path
         */
        WeChatUtils.prototype.NavigateToMiniProgram = function (callServer, fun, wechatAppId, pfuPath) {
            if (this.IsWeGame()) {
                wx.navigateToMiniProgram({
                    appId: wechatAppId,
                    path: pfuPath,
                    envVersion: "release",
                    success: function (res) {
                        fun.call(callServer, pfuPath);
                        console.log("success" + res);
                    },
                    fail: function (res) {
                        fun.call(callServer, pfuPath);
                        console.log("fail" + res);
                    }
                });
            }
        };
        WeChatUtils.prototype.IsNavigateToMiniVersion = function () {
            if (this.IsWeGame()) {
                if (typeof wx.navigateToMiniProgram === 'function') {
                    return true;
                }
            }
            return false;
        };
        // #endregion
        // #region 分包加载
        WeChatUtils.prototype.LoadSubpackage = function (subName, callback, callProgress) {
            if (!this.IsWeGame()) {
                callback(PfuSdk.SUCCESS);
                return;
            }
            if (typeof wx.loadSubpackage === 'function') {
                var loadTask = wx.loadSubpackage({
                    name: subName,
                    success: function (res) {
                        // 分包加载成功后通过 success 回调
                        callback(PfuSdk.SUCCESS);
                    },
                    fail: function (res) {
                        // 分包加载失败通过 fail 回调
                        callback(PfuSdk.FAIL);
                    }
                });
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
        };
        // #endregion
        //  #region 微信系统相关
        WeChatUtils.prototype.GetSystemInfoSync = function () {
            if (!this.IsWeGame()) {
                return null;
            }
            return wx.getSystemInfoSync();
        };
        WeChatUtils.prototype.GetBenchmarkLevel = function () {
            if (!this.IsWeGame()) {
                return -99;
            }
            return this.GetSystemInfoSync().benchmarkLevel;
        };
        //AddCode	
        //EndAddCode
        WeChatUtils.prototype.ShowSingleModal = function (title, content, fun) {
            wx.showModal({
                title: title,
                content: content,
                showCancel: false,
                success: function () {
                    fun();
                }
            });
        };
        WeChatUtils.prototype.SetUpdateApp = function () {
            if (!this.IsWeGame()) {
                return;
            }
            var updateManager = wx.getUpdateManager();
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
        };
        return WeChatUtils;
    }());
    //发现程序入口
    WeChatUtils.IN_GAME_FROM_1001 = 1001;
    //屏蔽公众号广告
    WeChatUtils.IN_GAME_FROM_1020 = 1020;
    WeChatUtils.IN_GAME_FROM_1024 = 1024;
    WeChatUtils.IN_GAME_FROM_1035 = 1035;
    WeChatUtils.IN_GAME_FROM_1037 = 1037;
    WeChatUtils._launchOptons = null;
    PFU.WeChatUtils = WeChatUtils;
    var LaunchOption = (function () {
        function LaunchOption() {
        }
        return LaunchOption;
    }());
})(PFU || (PFU = {}));
//# sourceMappingURL=WeChatUtils.js.map