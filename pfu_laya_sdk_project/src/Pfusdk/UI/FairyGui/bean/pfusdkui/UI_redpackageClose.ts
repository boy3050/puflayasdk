/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_redpackageClose extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_n1:fairygui.GImage;
		public m_n2:fairygui.GImage;

		public static URL:string = "ui://xcy52l65f4q7d7";

		public static createInstance():UI_redpackageClose {
			return <UI_redpackageClose><any>(fairygui.UIPackage.createObject("pfusdkui","redpackageClose"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getController("button");
			this.m_n1 = <fairygui.GImage><any>(this.getChild("n1"));
			this.m_n2 = <fairygui.GImage><any>(this.getChild("n2"));
		}
	}
}