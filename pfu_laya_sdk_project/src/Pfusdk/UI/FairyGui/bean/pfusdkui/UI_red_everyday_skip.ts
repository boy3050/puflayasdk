/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_red_everyday_skip extends fairygui.GComponent {

		public m_n26:fairygui.GImage;

		public static URL:string = "ui://xcy52l65f4q7dd";

		public static createInstance():UI_red_everyday_skip {
			return <UI_red_everyday_skip><any>(fairygui.UIPackage.createObject("pfusdkui","red_everyday_skip"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n26 = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}