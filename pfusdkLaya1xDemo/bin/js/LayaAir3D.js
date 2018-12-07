// 程序入口
var LayaAir3D = (function () {
    function LayaAir3D() {
        Laya.MiniAdpter.init(true);
        //初始化引擎
        Laya3D.init(720, 1280, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        //竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //开启统计信息
        Laya.Stat.show();
        //添加3D场景
        var scene = Laya.stage.addChildAt(new Laya.Scene(), 0);
        //添加照相机
        var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;
        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(1, -1, 0);
        //添加自定义模型
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        box.meshRender.material = material;
        PfuSdk.Init();
        PfuSdk.InitConfig(this, function () {
            //config文件读取成功
        });
        //监听切换到前台
        PfuSdk.OnShow(function () {
        });
        //监听切换到后台
        PfuSdk.OnHide(function () {
        });
        //FairyGUI创建
        //PFU.UI.PfuSdkFairyUI.CreateUI();
        //LayaGUI创建
        PFU.UI.PfuSdkLayaUI.CreateUI();
        //显示更多游戏列表
        PfuSdk.ShowMoreGameList();
        Laya.timer.once(5000, this, function () {
            //隐藏更多游戏列表
            PfuSdk.HideMoreGameList();
            //显示Banner
            PfuSdk.ShowBanner();
        });
        //单纯分享
        PfuSdk.Share(this);
        //分享 有奖励
        PfuSdk.ShareAward(this, function (type, desc) {
            if (PfuSdk.SUCCESS == type) {
            }
            else {
                //错误描述
                console.log(desc);
            }
        });
        //激励视频
        PfuSdk.Video(this, function (type, desc) {
            if (PfuSdk.SUCCESS == type) {
            }
            else {
                //错误描述
                console.log(desc);
            }
        });
    }
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map