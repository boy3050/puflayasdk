// 程序入口
class LayaAir3D {
    constructor() {
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
        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(1, -1, 0);

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.StandardMaterial = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        box.meshRender.material = material;

        //SDK初始化
        PfuSdk.InitConfig(this, () => {

            //FairyGUI创建
            //PFU.UI.PfuSdkFairyUI.CreateUI();
            //LayaGUI创建
            PFU.UI.PfuSdkLayaUI.CreateUI();
        });

        //监听切换到前台
        PfuSdk.OnShow(() => {

        });
        //监听切换到后台
        PfuSdk.OnHide(() => {

        });



        //显示更多游戏列表
        PfuSdk.ShowMoreGameList();

        Laya.timer.once(4000, this, () => {

            //PfuSdk.HideMoreGameList();
            //显示Banner
            //PfuSdk.ShowBanner();

            // PfuSdk.ShareAward(this, (type, desc) => {
            //     if (PfuSdk.SUCCESS == type) {
            //         //给予奖励
            //     }
            //     else {
            //         //错误描述
            //         console.log(desc);
            //     }
            // });
        });

        //单纯分享
        PfuSdk.Share(this);

        //分享 有奖励
        PfuSdk.ShareAward(this, (type, desc) => {
            if (PfuSdk.SUCCESS == type) {
                //给予奖励
            }
            else {
                //错误描述
                console.log(desc);
            }
        });
        //激励视频
        PfuSdk.Video(this, (type, desc) => {
            if (PfuSdk.SUCCESS == type) {
                //给予奖励
            }
            else {
                //错误描述
                console.log(desc);
            }
        });

        console.log("Laya.version:" + Laya.version.charAt(0));
    }
}
new LayaAir3D();