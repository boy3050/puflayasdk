/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_SdkDialogUI extends fairygui.GComponent {

		public m_com:UI_DialogCom;

		public static URL:string = "ui://xcy52l65jkohcj";

		public static createInstance():UI_SdkDialogUI {
			return <UI_SdkDialogUI><any>(fairygui.UIPackage.createObject("pfusdkui","SdkDialogUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_com = <UI_DialogCom><any>(this.getChild("com"));
		}
	}
}