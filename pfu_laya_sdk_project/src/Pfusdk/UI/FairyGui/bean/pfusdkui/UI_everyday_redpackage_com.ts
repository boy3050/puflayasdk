/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_everyday_redpackage_com extends fairygui.GComponent {

		public m_n22:fairygui.GGraph;
		public m_bg_loader:fairygui.GLoader;
		public m_n24:fairygui.GImage;
		public m_btn_double_btn:UI_red_everyday_double_btn;
		public m_btn_red_everyday_skip:UI_red_everyday_skip;
		public m_list_sex:fairygui.GList;
		public m_seven:UI_red_everyday_child_com;

		public static URL:string = "ui://xcy52l65f4q7de";

		public static createInstance():UI_everyday_redpackage_com {
			return <UI_everyday_redpackage_com><any>(fairygui.UIPackage.createObject("pfusdkui","everyday_redpackage_com"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n22 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_bg_loader = <fairygui.GLoader><any>(this.getChildAt(1));
			this.m_n24 = <fairygui.GImage><any>(this.getChildAt(2));
			this.m_btn_double_btn = <UI_red_everyday_double_btn><any>(this.getChildAt(3));
			this.m_btn_red_everyday_skip = <UI_red_everyday_skip><any>(this.getChildAt(4));
			this.m_list_sex = <fairygui.GList><any>(this.getChildAt(5));
			this.m_seven = <UI_red_everyday_child_com><any>(this.getChildAt(6));
		}
	}
}