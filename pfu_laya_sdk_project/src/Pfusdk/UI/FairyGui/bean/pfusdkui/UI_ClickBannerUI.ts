/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_ClickBannerUI extends fairygui.GComponent {

		public m_n1:fairygui.GGraph;
		public m_loader:fairygui.GLoader;
		public m_cancel:UI_clickSkip;

		public static URL:string = "ui://xcy52l65sxe6cl";

		public static createInstance():UI_ClickBannerUI {
			return <UI_ClickBannerUI><any>(fairygui.UIPackage.createObject("pfusdkui","ClickBannerUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n1 = <fairygui.GGraph><any>(this.getChild("n1"));
			this.m_loader = <fairygui.GLoader><any>(this.getChild("loader"));
			this.m_cancel = <UI_clickSkip><any>(this.getChild("cancel"));
		}
	}
}