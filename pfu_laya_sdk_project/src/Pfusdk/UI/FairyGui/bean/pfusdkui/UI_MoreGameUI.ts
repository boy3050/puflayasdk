/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_MoreGameUI extends fairygui.GComponent {

		public m_list_moregamebg:fairygui.GImage;
		public m_list_moregame:fairygui.GList;
		public m_list_moregameStr:fairygui.GImage;
		public m_boxList:fairygui.GGroup;
		public m_Btn_MoreGameLeft:UI_BtnMoregame;
		public m_Btn_MoreGameRight:UI_BtnMoregame;
		public m_n10:fairygui.GImage;
		public m_btn_left_click:UI_boxlist_left_btn;
		public m_list_moregame_left:fairygui.GList;
		public m_n13:fairygui.GImage;
		public m_boxList_left:fairygui.GGroup;
		public m_showLift:fairygui.Transition;
		public m_hideLift:fairygui.Transition;

		public static URL:string = "ui://xcy52l6510sdcb";

		public static createInstance():UI_MoreGameUI {
			return <UI_MoreGameUI><any>(fairygui.UIPackage.createObject("pfusdkui","MoreGameUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_list_moregamebg = <fairygui.GImage><any>(this.getChild("list_moregamebg"));
			this.m_list_moregame = <fairygui.GList><any>(this.getChild("list_moregame"));
			this.m_list_moregameStr = <fairygui.GImage><any>(this.getChild("list_moregameStr"));
			this.m_boxList = <fairygui.GGroup><any>(this.getChild("boxList"));
			this.m_Btn_MoreGameLeft = <UI_BtnMoregame><any>(this.getChild("Btn_MoreGameLeft"));
			this.m_Btn_MoreGameRight = <UI_BtnMoregame><any>(this.getChild("Btn_MoreGameRight"));
			this.m_n10 = <fairygui.GImage><any>(this.getChild("n10"));
			this.m_btn_left_click = <UI_boxlist_left_btn><any>(this.getChild("btn_left_click"));
			this.m_list_moregame_left = <fairygui.GList><any>(this.getChild("list_moregame_left"));
			this.m_n13 = <fairygui.GImage><any>(this.getChild("n13"));
			this.m_boxList_left = <fairygui.GGroup><any>(this.getChild("boxList_left"));
			this.m_showLift = this.getTransition("showLift");
			this.m_hideLift = this.getTransition("hideLift");
		}
	}
}