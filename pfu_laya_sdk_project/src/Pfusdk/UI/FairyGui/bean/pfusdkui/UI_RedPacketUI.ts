/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_RedPacketUI extends fairygui.GComponent {

		public m_btn_redpackageicon:UI_redpackage_icon;
		public m_com_openredpackage:UI_OpenRedPackage_com;
		public m_com_tixianredpackage:UI_TiXianRedPackage_com;
		public m_com_everyday:UI_everyday_redpackage_com;
		public m_com_awradredpackage:UI_AwardRedPackage_com;

		public static URL:string = "ui://xcy52l65f4q7cr";

		public static createInstance():UI_RedPacketUI {
			return <UI_RedPacketUI><any>(fairygui.UIPackage.createObject("pfusdkui","RedPacketUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_btn_redpackageicon = <UI_redpackage_icon><any>(this.getChildAt(0));
			this.m_com_openredpackage = <UI_OpenRedPackage_com><any>(this.getChildAt(1));
			this.m_com_tixianredpackage = <UI_TiXianRedPackage_com><any>(this.getChildAt(2));
			this.m_com_everyday = <UI_everyday_redpackage_com><any>(this.getChildAt(3));
			this.m_com_awradredpackage = <UI_AwardRedPackage_com><any>(this.getChildAt(4));
		}
	}
}