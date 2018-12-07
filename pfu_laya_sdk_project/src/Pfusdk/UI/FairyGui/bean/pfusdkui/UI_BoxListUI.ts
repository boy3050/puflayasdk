/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_BoxListUI extends fairygui.GComponent {

		public m_n10:fairygui.GGraph;
		public m_n2:fairygui.GImage;
		public m_n1:fairygui.GImage;
		public m_n3:fairygui.GTextField;
		public m_List_game:fairygui.GList;
		public m_Btn_close:UI_BtnClose;
		public m_Img_banner:fairygui.GList;

		public static URL:string = "ui://xcy52l6510sdc1";

		public static createInstance():UI_BoxListUI {
			return <UI_BoxListUI><any>(fairygui.UIPackage.createObject("pfusdkui","BoxListUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n10 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_n2 = <fairygui.GImage><any>(this.getChildAt(1));
			this.m_n1 = <fairygui.GImage><any>(this.getChildAt(2));
			this.m_n3 = <fairygui.GTextField><any>(this.getChildAt(3));
			this.m_List_game = <fairygui.GList><any>(this.getChildAt(4));
			this.m_Btn_close = <UI_BtnClose><any>(this.getChildAt(5));
			this.m_Img_banner = <fairygui.GList><any>(this.getChildAt(6));
		}
	}
}