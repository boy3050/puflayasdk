/*
* 微信开放接口数据  设置云存储 获取云存储 等， 开放域的两个接口在此只作为通知Canvas
参照https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.setUserCloudStorage.html
*/
namespace PFU {
    export class WeChatOpenUtils {

        private static instance: WeChatOpenUtils;
        //初始化
        public static MESSAGE_ID_INIT = 1001;
        //更新分数
        public static MESSAGE_ID_UPDATE_MAXSCORE = 1002;
        //完整排行
        public static MESSAGE_ID_DRAW_RANK = 1003;
        //临近的好友排行
        public static MESSAGE_ID_NEIGHBOR = 1004;
        //即将超越好友
        public static MESSAGE_ID_DRAWUPPER = 1005;

        public static GetInstance(): WeChatOpenUtils {
            if (!this.instance) {
                this.instance = new WeChatOpenUtils();
            }
            return this.instance;
        }

        private _textureSprite: Laya.Sprite = null;
        private _texture: Laya.Texture = null;

        ///未设置单一排行
        public SetUserOnlyCloudStorage(sKey: string, sValue: string) {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                let keydata = [{ key: sKey, value: sValue }];
                wx.setUserCloudStorage({
                    KVDataList: keydata,
                    success: res => {
                        //上传分数 更新数据
                        WeChatOpenUtils.wxPostMessage({
                            messageId: WeChatOpenUtils.MESSAGE_ID_UPDATE_MAXSCORE
                        }, this, () => {

                        });
                        console.log(res)
                    }, fail: res => {
                        console.log(res)
                    }
                });
            }

        }
        //AddCode	

        //EndAddCode
        private CallInitCanvas(message) {

            if (WeChatUtils.GetInstance().IsWeGame()) {
                let openDataContext = wx.getOpenDataContext();
                var texture: Laya.Texture = new Laya.Texture(Laya.Browser.window.sharedCanvas);

                texture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
                let sprite: Laya.Sprite = new Laya.Sprite();
                Laya.stage.addChild(sprite);
                sprite.graphics.drawTexture(texture, 0, 0, Laya.stage.desginWidth, Laya.stage.desginHeight);
                console.log("初始化获得离屏数据");
                this._textureSprite = sprite;
                this._texture = texture;
                this._textureSprite.visible = false;
            }

        }


        /**
         * 初始化画布
         */
        public InitSharedCanvas() {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                // Laya.timer.once(1000, this, function():void{
                //     //设置共享画布大小
                //     __JS__('sharedCanvas').width = Laya.stage.width;
                //     __JS__('sharedCanvas').height = Laya.stage.height;
                //     //主域往子域透传消息
                //     __JS__('wx').postMessage({type:"resizeShared",url:"",data:{width:Laya.stage.width,height:Laya.stage.height,matrix:Laya.stage._canvasTransform},isLoad:false});
                // });

                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_INIT
                }, this, this.CallInitCanvas);
            }
        }
        /**
         * 显示离屏数据
         */
        public ShowSharedCanvas() {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                if (this._textureSprite == null) return;
                this._textureSprite.visible = true;
            }

        }

        /**
         * 隐藏离屏数据
         */
        public HideShardCanvas() {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                if (this._textureSprite == null) return;
                this._textureSprite.visible = false;
            }

        }

        /**
         * 显示好友列表数据
         * @param data 
         */
        public ShowFriendRank(data: any) {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_DRAW_RANK,
                    rankDrawData: data
                }, this, () => { });
            }

        }

        /**
         * 显示相邻前后的好友数据
         * @param data 
         */

        public ShowFriedNeighbor(data: any) {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_NEIGHBOR,
                    rankDrawData: data
                }, this, () => { });
            }
        }

        /**
        * 显示即将超越好有
        * @param data 
        */
        public ShowUpperRank(data: any) {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                WeChatOpenUtils.wxPostMessage({
                    messageId: WeChatOpenUtils.MESSAGE_ID_DRAWUPPER,
                    rankDrawData: data
                }, this, () => { });
            }
        }

        //AddCode	

        //EndAddCode

        /**
        * 向开放域发送消息，并接收开放域返回过来的数据，
        * 可根据发送参数和接收数据在主域这边进行下步处理
        * @param message
        * @param caller
        * @param callback
        */
        public static wxPostMessage(message: any, caller: any, callback: Function): void {
            if (WeChatUtils.GetInstance().IsWeGame()) {
                let wx = Laya.Browser.window.wx;
                if (wx != undefined) {
                    console.log("wxPostMessage :" + message);
                    let openDataContext = wx.getOpenDataContext();
                    openDataContext.postMessage(message);
                    Laya.timer.once(400, this, function (): void {
                        //回调处理
                        if (caller == null || caller == undefined) {
                            callback(message);
                        } else {
                            callback.call(caller, message);
                        }
                    });
                }
                else {
                    console.log("wx=null");
                }
            }
        }

        //AddCode	

        //EndAddCode
        public static InitOpenDataOnMessage(fun: Function) {
            wx.onMessage(data => {
                console.log('zi yu:' + data);
                if (data.messageId == WeChatOpenUtils.MESSAGE_ID_INIT) {
                    console.log('初始化!成功');
                    fun(data.messageId);
                }
                else if (data.messageId == WeChatOpenUtils.MESSAGE_ID_UPDATE_MAXSCORE) {
                    //更新最高分数
                    console.log('更新最高分');
                    fun(data.messageId);
                }
                else if (data.messageId == WeChatOpenUtils.MESSAGE_ID_DRAW_RANK) {
                    //完整好友排行
                    console.log('完整好友排行');
                    fun(data.messageId);
                }
                else if (data.messageId == WeChatOpenUtils.MESSAGE_ID_NEIGHBOR) {
                    console.log('绘制临近的排行');
                    //绘制临近的排行
                    fun(data.messageId);
                }

                if (data['isLoad'] == "filedata") {
                    laya.wx.mini.MiniFileMgr.ziyuFileData[data.url] = data.data;//文本数据
                } else if (data['isLoad'] == "filenative") {
                    //子域接收主域传递的文件信息
                    if (data.isAdd)
                        laya.wx.mini.MiniFileMgr.filesListObj[data.url] = data.data;
                    else
                        delete laya.wx.mini.MiniFileMgr.filesListObj[data.url];
                } else if (data['type'] == "resizeShared") {
                    
                }
            });
        }
    }
}