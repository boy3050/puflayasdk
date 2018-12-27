/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_TiXianRedPackage_com extends fairygui.GComponent {

		public m_n8:fairygui.GGraph;
		public m_bg_loader:fairygui.GLoader;
		public m_btn_close:UI_redpackageClose;
		public m_n15:fairygui.GTextField;
		public m_n16:fairygui.GTextField;
		public m_moneyNum:fairygui.GTextField;
		public m_n18:fairygui.GTextField;
		public m_n19:fairygui.GTextField;
		public m_n20:fairygui.GTextField;
		public m_btn_tixian:UI_red_TiXian;

		public static URL:string = "ui://xcy52l65f4q7da";

		public static createInstance():UI_TiXianRedPackage_com {
			return <UI_TiXianRedPackage_com><any>(fairygui.UIPackage.createObject("pfusdkui","TiXianRedPackage_com"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n8 = <fairygui.GGraph><any>(this.getChild("n8"));
			this.m_bg_loader = <fairygui.GLoader><any>(this.getChild("bg_loader"));
			this.m_btn_close = <UI_redpackageClose><any>(this.getChild("btn_close"));
			this.m_n15 = <fairygui.GTextField><any>(this.getChild("n15"));
			this.m_n16 = <fairygui.GTextField><any>(this.getChild("n16"));
			this.m_moneyNum = <fairygui.GTextField><any>(this.getChild("moneyNum"));
			this.m_n18 = <fairygui.GTextField><any>(this.getChild("n18"));
			this.m_n19 = <fairygui.GTextField><any>(this.getChild("n19"));
			this.m_n20 = <fairygui.GTextField><any>(this.getChild("n20"));
			this.m_btn_tixian = <UI_red_TiXian><any>(this.getChild("btn_tixian"));
		}
	}
}