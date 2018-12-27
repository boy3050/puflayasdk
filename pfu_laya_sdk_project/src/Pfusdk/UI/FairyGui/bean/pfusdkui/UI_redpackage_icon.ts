/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_redpackage_icon extends fairygui.GComponent {

		public m_n31:fairygui.GImage;
		public m_n32:fairygui.GImage;
		public m_moneyNumStr:fairygui.GTextField;

		public static URL:string = "ui://xcy52l65f4q7df";

		public static createInstance():UI_redpackage_icon {
			return <UI_redpackage_icon><any>(fairygui.UIPackage.createObject("pfusdkui","redpackage_icon"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n31 = <fairygui.GImage><any>(this.getChild("n31"));
			this.m_n32 = <fairygui.GImage><any>(this.getChild("n32"));
			this.m_moneyNumStr = <fairygui.GTextField><any>(this.getChild("moneyNumStr"));
		}
	}
}