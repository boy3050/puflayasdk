/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module pfusdkui {

	export class UI_BannerImg extends fairygui.GComponent {

		public m_icon:fairygui.GLoader;

		public static URL:string = "ui://xcy52l6510sdc9";

		public static createInstance():UI_BannerImg {
			return <UI_BannerImg><any>(fairygui.UIPackage.createObject("pfusdkui","BannerImg"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}