/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_AwardRedPackage_com extends fairygui.GComponent {

		public m_n8:fairygui.GGraph;
		public m_bg_loader:fairygui.GLoader;
		public m_btn_close:UI_redpackageClose;
		public m_n15:fairygui.GTextField;
		public m_moneyNum:fairygui.GTextField;
		public m_n19:fairygui.GTextField;
		public m_n20:fairygui.GTextField;
		public m_btn_tixian:UI_red_TiXian;
		public m_n23:fairygui.GTextField;
		public m_allMoney:fairygui.GTextField;
		public m_n25:fairygui.GTextField;
		public m_n26:fairygui.GTextField;

		public static URL:string = "ui://xcy52l65h5hmdk";

		public static createInstance():UI_AwardRedPackage_com {
			return <UI_AwardRedPackage_com><any>(fairygui.UIPackage.createObject("pfusdkui","AwardRedPackage_com"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n8 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_bg_loader = <fairygui.GLoader><any>(this.getChildAt(1));
			this.m_btn_close = <UI_redpackageClose><any>(this.getChildAt(2));
			this.m_n15 = <fairygui.GTextField><any>(this.getChildAt(3));
			this.m_moneyNum = <fairygui.GTextField><any>(this.getChildAt(4));
			this.m_n19 = <fairygui.GTextField><any>(this.getChildAt(5));
			this.m_n20 = <fairygui.GTextField><any>(this.getChildAt(6));
			this.m_btn_tixian = <UI_red_TiXian><any>(this.getChildAt(7));
			this.m_n23 = <fairygui.GTextField><any>(this.getChildAt(8));
			this.m_allMoney = <fairygui.GTextField><any>(this.getChildAt(9));
			this.m_n25 = <fairygui.GTextField><any>(this.getChildAt(10));
			this.m_n26 = <fairygui.GTextField><any>(this.getChildAt(11));
		}
	}
}