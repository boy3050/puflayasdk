/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_BtnEnter extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_anniu_1:fairygui.GImage;
		public m_title:fairygui.GTextField;
		public m_toSmall:fairygui.Transition;
		public m_toNormal:fairygui.Transition;
		public m_tishi:fairygui.Transition;

		public static URL:string = "ui://xcy52l6510sdc5";

		public static createInstance():UI_BtnEnter {
			return <UI_BtnEnter><any>(fairygui.UIPackage.createObject("pfusdkui","BtnEnter"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_anniu_1 = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
			this.m_toSmall = this.getTransitionAt(0);
			this.m_toNormal = this.getTransitionAt(1);
			this.m_tishi = this.getTransitionAt(2);
		}
	}
}