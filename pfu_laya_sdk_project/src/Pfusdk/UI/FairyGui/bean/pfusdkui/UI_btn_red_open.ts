/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_btn_red_open extends fairygui.GComponent {

		public m_n2:fairygui.GImage;

		public static URL:string = "ui://xcy52l65f4q7d9";

		public static createInstance():UI_btn_red_open {
			return <UI_btn_red_open><any>(fairygui.UIPackage.createObject("pfusdkui","btn_red_open"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n2 = <fairygui.GImage><any>(this.getChild("n2"));
		}
	}
}