/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_SdkDialogUI extends fairygui.GComponent {

		public m_n0:UI_DialogCom;

		public static URL:string = "ui://xcy52l65jkohcj";

		public static createInstance():UI_SdkDialogUI {
			return <UI_SdkDialogUI><any>(fairygui.UIPackage.createObject("pfusdkui","SdkDialogUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <UI_DialogCom><any>(this.getChildAt(0));
		}
	}
}