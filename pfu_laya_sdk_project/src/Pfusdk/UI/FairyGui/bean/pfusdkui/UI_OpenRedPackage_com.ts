/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_OpenRedPackage_com extends fairygui.GComponent {

		public m_n0:fairygui.GGraph;
		public m_bg_loader:fairygui.GLoader;
		public m_btn_red_open:UI_btn_red_open;
		public m_n3:fairygui.GTextField;
		public m_n4:fairygui.GTextField;
		public m_voidStr:fairygui.GTextField;
		public m_openredtip2:fairygui.GTextField;
		public m_n7:fairygui.GTextField;
		public m_btn_close:UI_redpackageClose;

		public static URL:string = "ui://xcy52l65f4q7d6";

		public static createInstance():UI_OpenRedPackage_com {
			return <UI_OpenRedPackage_com><any>(fairygui.UIPackage.createObject("pfusdkui","OpenRedPackage_com"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_bg_loader = <fairygui.GLoader><any>(this.getChildAt(1));
			this.m_btn_red_open = <UI_btn_red_open><any>(this.getChildAt(2));
			this.m_n3 = <fairygui.GTextField><any>(this.getChildAt(3));
			this.m_n4 = <fairygui.GTextField><any>(this.getChildAt(4));
			this.m_voidStr = <fairygui.GTextField><any>(this.getChildAt(5));
			this.m_openredtip2 = <fairygui.GTextField><any>(this.getChildAt(6));
			this.m_n7 = <fairygui.GTextField><any>(this.getChildAt(7));
			this.m_btn_close = <UI_redpackageClose><any>(this.getChildAt(8));
		}
	}
}