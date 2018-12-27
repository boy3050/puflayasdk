/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_red_everyday_child_com extends fairygui.GComponent {

		public m_n27:fairygui.GImage;
		public m_n28:fairygui.GImage;
		public m_text:fairygui.GTextField;

		public static URL:string = "ui://xcy52l65f4q7db";

		public static createInstance():UI_red_everyday_child_com {
			return <UI_red_everyday_child_com><any>(fairygui.UIPackage.createObject("pfusdkui","red_everyday_child_com"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n27 = <fairygui.GImage><any>(this.getChild("n27"));
			this.m_n28 = <fairygui.GImage><any>(this.getChild("n28"));
			this.m_text = <fairygui.GTextField><any>(this.getChild("text"));
		}
	}
}