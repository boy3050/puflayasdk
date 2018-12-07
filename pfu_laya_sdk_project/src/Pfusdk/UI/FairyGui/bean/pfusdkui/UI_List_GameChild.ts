/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_List_GameChild extends fairygui.GComponent {

		public m_icon:fairygui.GLoader;
		public m_n1:fairygui.GGraph;
		public m_n2:fairygui.GGraph;

		public static URL:string = "ui://xcy52l656o1rci";

		public static createInstance():UI_List_GameChild {
			return <UI_List_GameChild><any>(fairygui.UIPackage.createObject("pfusdkui","List_GameChild"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
			this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(1));
			this.m_n2 = <fairygui.GGraph><any>(this.getChildAt(2));
		}
	}
}