/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_List_Child extends fairygui.GComponent {

		public m_n0:fairygui.GImage;
		public m_n7:fairygui.GImage;
		public m_Text_name:fairygui.GTextField;
		public m_Text_message:fairygui.GTextField;
		public m_icon:fairygui.GLoader;
		public m_1:fairygui.GTextField;
		public m_Text_name2:fairygui.GTextField;
		public m_btn_start:UI_BtnEnter;

		public static URL:string = "ui://xcy52l6510sdc4";

		public static createInstance():UI_List_Child {
			return <UI_List_Child><any>(fairygui.UIPackage.createObject("pfusdkui","List_Child"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_n7 = <fairygui.GImage><any>(this.getChildAt(1));
			this.m_Text_name = <fairygui.GTextField><any>(this.getChildAt(2));
			this.m_Text_message = <fairygui.GTextField><any>(this.getChildAt(3));
			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(4));
			this.m_1 = <fairygui.GTextField><any>(this.getChildAt(5));
			this.m_Text_name2 = <fairygui.GTextField><any>(this.getChildAt(6));
			this.m_btn_start = <UI_BtnEnter><any>(this.getChildAt(7));
		}
	}
}