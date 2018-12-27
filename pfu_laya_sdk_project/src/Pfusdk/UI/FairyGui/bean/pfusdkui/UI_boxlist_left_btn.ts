/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_boxlist_left_btn extends fairygui.GComponent {

		public m_n9:fairygui.GImage;

		public static URL:string = "ui://xcy52l65f4q7dj";

		public static createInstance():UI_boxlist_left_btn {
			return <UI_boxlist_left_btn><any>(fairygui.UIPackage.createObject("pfusdkui","boxlist_left_btn"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n9 = <fairygui.GImage><any>(this.getChild("n9"));
		}
	}
}