/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_red_everyday_double_btn extends fairygui.GComponent {

		public m_n25:fairygui.GImage;

		public static URL:string = "ui://xcy52l65f4q7dc";

		public static createInstance():UI_red_everyday_double_btn {
			return <UI_red_everyday_double_btn><any>(fairygui.UIPackage.createObject("pfusdkui","red_everyday_double_btn"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n25 = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}