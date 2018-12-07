/*
* name;
*/
var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        var WindowBase = (function () {
            function WindowBase() {
            }
            WindowBase.prototype.InitWindow = function (fui) {
                this._obj = fui;
                fui.center(true);
                fairygui.GRoot.inst.addChild(fui);
                //排序 顶级
                fui.sortingOrder = 10000;
                this.Show();
                this.OnStart();
            };
            WindowBase.prototype.OnStart = function () {
            };
            WindowBase.prototype.OnUpdate = function () {
            };
            WindowBase.prototype.Show = function (type) {
                this._obj.visible = true;
                Laya.timer.frameLoop(1, this, this.OnUpdate);
            };
            WindowBase.prototype.Hide = function () {
                this._obj.visible = false;
                Laya.timer.clearAll(this);
            };
            return WindowBase;
        }());
        UI.WindowBase = WindowBase;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=WindowBase.js.map