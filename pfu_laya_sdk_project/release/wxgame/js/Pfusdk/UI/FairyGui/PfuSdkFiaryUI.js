/*
* name;
*/
var PfuSdkFiaryUI = (function () {
    function PfuSdkFiaryUI() {
    }
    PfuSdkFiaryUI.CreateUI = function () {
        fairygui.UIConfig.packageFileExtension = "bin";
        pfusdkui.pfusdkuiBinder.bindAll();
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        this.LoadUIData();
    };
    PfuSdkFiaryUI.LoadUIData = function () {
        var _this = this;
        Laya.loader.load([
            { url: "PfusdkRes/UI/fairygui/pfusdkui.bin", type: Laya.Loader.BUFFER },
            { url: "PfusdkRes/UI/fairygui/pfusdkui@atlas0.png", type: Laya.Loader.IMAGE }
        ], Laya.Handler.create(this, function () {
            fairygui.UIPackage.addPackage("PfusdkRes/UI/fairygui/pfusdkui");
            _this.CreateUIWindow();
        }));
    };
    PfuSdkFiaryUI.CreateUIWindow = function () {
    };
    return PfuSdkFiaryUI;
}());
//# sourceMappingURL=PfuSdkFiaryUI.js.map