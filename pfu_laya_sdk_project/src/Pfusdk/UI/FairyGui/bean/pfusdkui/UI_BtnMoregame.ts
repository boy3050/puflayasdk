/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_BtnMoregame extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_icon:fairygui.GLoader;
		public m_toSmall:fairygui.Transition;
		public m_toNormal:fairygui.Transition;

		public static URL:string = "ui://xcy52l6510sdcg";

		public static createInstance():UI_BtnMoregame {
			return <UI_BtnMoregame><any>(fairygui.UIPackage.createObject("pfusdkui","BtnMoregame"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
			this.m_toSmall = this.getTransitionAt(0);
			this.m_toNormal = this.getTransitionAt(1);
		}
	}
}