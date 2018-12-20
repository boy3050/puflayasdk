/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_red_TiXian extends fairygui.GComponent {

		public m_n21:fairygui.GTextField;

		public static URL:string = "ui://xcy52l65f4q7d8";

		public static createInstance():UI_red_TiXian {
			return <UI_red_TiXian><any>(fairygui.UIPackage.createObject("pfusdkui","red_TiXian"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n21 = <fairygui.GTextField><any>(this.getChildAt(0));
		}
	}
}