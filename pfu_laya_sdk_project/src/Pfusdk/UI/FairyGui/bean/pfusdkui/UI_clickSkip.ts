/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_clickSkip extends fairygui.GComponent {

		public m_n9:fairygui.GImage;

		public static URL:string = "ui://xcy52l65sxe6cp";

		public static createInstance():UI_clickSkip {
			return <UI_clickSkip><any>(fairygui.UIPackage.createObject("pfusdkui","clickSkip"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n9 = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}