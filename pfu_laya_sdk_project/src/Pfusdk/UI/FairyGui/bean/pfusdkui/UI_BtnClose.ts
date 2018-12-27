/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_BtnClose extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_anniu_1:fairygui.GImage;
		public m_toSmall:fairygui.Transition;
		public m_toNormal:fairygui.Transition;
		public m_tishi:fairygui.Transition;

		public static URL:string = "ui://xcy52l6510sdc7";

		public static createInstance():UI_BtnClose {
			return <UI_BtnClose><any>(fairygui.UIPackage.createObject("pfusdkui","BtnClose"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getController("button");
			this.m_anniu_1 = <fairygui.GImage><any>(this.getChild("anniu_1"));
			this.m_toSmall = this.getTransition("toSmall");
			this.m_toNormal = this.getTransition("toNormal");
			this.m_tishi = this.getTransition("tishi");
		}
	}
}