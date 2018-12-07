/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_MoreGameUI extends fairygui.GComponent {

		public m_list_moregamebg:fairygui.GImage;
		public m_list_moregame:fairygui.GList;
		public m_list_moregameStr:fairygui.GImage;
		public m_boxList:fairygui.GGroup;
		public m_Btn_MoreGameLeft:UI_BtnMoregame;
		public m_Btn_MoreGameRight:UI_BtnMoregame;

		public static URL:string = "ui://xcy52l6510sdcb";

		public static createInstance():UI_MoreGameUI {
			return <UI_MoreGameUI><any>(fairygui.UIPackage.createObject("pfusdkui","MoreGameUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_list_moregamebg = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_list_moregame = <fairygui.GList><any>(this.getChildAt(1));
			this.m_list_moregameStr = <fairygui.GImage><any>(this.getChildAt(2));
			this.m_boxList = <fairygui.GGroup><any>(this.getChildAt(3));
			this.m_Btn_MoreGameLeft = <UI_BtnMoregame><any>(this.getChildAt(4));
			this.m_Btn_MoreGameRight = <UI_BtnMoregame><any>(this.getChildAt(5));
		}
	}
}