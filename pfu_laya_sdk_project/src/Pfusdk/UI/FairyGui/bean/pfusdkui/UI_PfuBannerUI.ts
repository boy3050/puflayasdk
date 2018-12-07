/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_PfuBannerUI extends fairygui.GComponent {

		public m_loader:fairygui.GLoader;

		public static URL:string = "ui://xcy52l6510sdc0";

		public static createInstance():UI_PfuBannerUI {
			return <UI_PfuBannerUI><any>(fairygui.UIPackage.createObject("pfusdkui","PfuBannerUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_loader = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}