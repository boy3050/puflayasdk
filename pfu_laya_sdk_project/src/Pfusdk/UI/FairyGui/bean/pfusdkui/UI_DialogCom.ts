/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_DialogCom extends fairygui.GComponent {

		public m_n4:fairygui.GGraph;
		public m_tiptext:fairygui.GTextField;

		public static URL:string = "ui://xcy52l65jkohck";

		public static createInstance():UI_DialogCom {
			return <UI_DialogCom><any>(fairygui.UIPackage.createObject("pfusdkui","DialogCom"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n4 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_tiptext = <fairygui.GTextField><any>(this.getChildAt(1));
		}
	}
}