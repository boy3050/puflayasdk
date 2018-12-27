/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_List_GameChild_left extends fairygui.GComponent {

		public m_icon:fairygui.GLoader;
		public m_n1:fairygui.GGraph;
		public m_n2:fairygui.GGraph;

		public static URL:string = "ui://xcy52l65f4q7di";

		public static createInstance():UI_List_GameChild_left {
			return <UI_List_GameChild_left><any>(fairygui.UIPackage.createObject("pfusdkui","List_GameChild_left"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_icon = <fairygui.GLoader><any>(this.getChild("icon"));
			this.m_n1 = <fairygui.GGraph><any>(this.getChild("n1"));
			this.m_n2 = <fairygui.GGraph><any>(this.getChild("n2"));
		}
	}
}