/*
* name;
*/
namespace PFU.UI {
    export class WindowBase {
        private _obj: fairygui.GComponent;
        constructor() {

        }
        public InitWindow(fui: fairygui.GComponent)  {
            this._obj = fui;
            fui.center(true);
            fairygui.GRoot.inst.addChild(fui);
            //排序 顶级
            fui.sortingOrder = 10000;
            this.Show();
            this.OnStart();
        }

        protected OnStart()
        {
            
        }

        protected OnUpdate()
        {

        }

        public Show(type?:number)
        {
            this._obj.visible = true;
            Laya.timer.frameLoop(1,this,this.OnUpdate);
        }

        public Hide()
        {
            this._obj.visible = false;
            Laya.timer.clearAll(this);
        }
    }

}

