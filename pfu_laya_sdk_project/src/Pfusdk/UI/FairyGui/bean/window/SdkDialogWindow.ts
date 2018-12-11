namespace PFU.UI {
    export class SdkDialogWindow extends WindowBase {
        protected _fui: pfusdkui.UI_SdkDialogUI;

        private _isCreatePfuBanner = false;

        public InitWindow(fui: fairygui.GComponent) {
            this._fui = fui as pfusdkui.UI_SdkDialogUI;
            super.InitWindow(fui);
        }
        protected OnStart() {
           PFU.PfuGlobal.SetOnDialog(this,this.OnAddDialog)
        }

        protected OnUpdate() {
          
        }

        public OnAddDialog(desc:string)
        {
            let dialog:pfusdkui.UI_DialogCom = pfusdkui.UI_DialogCom.createInstance();
            dialog.m_tiptext.text ="" + desc;
            dialog.center();
            this._fui.addChild(dialog);

            Laya.timer.once(2000,this,()=>{
                dialog.dispose();
            });
        }

    }
}
