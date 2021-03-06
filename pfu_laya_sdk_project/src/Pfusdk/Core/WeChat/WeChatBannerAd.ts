﻿namespace PFU {
	export enum BannerDirction {
		DOWN_CENTER = 0,
		TOP_CENTER = 1,
		CENTER = 2,
	}
	/*
	* name;
	*/
	export class WeChatBannerAd {

		private static instance: WeChatBannerAd;

		public static GetInstance(): WeChatBannerAd {
			if (!this.instance) {
				this.instance = new WeChatBannerAd();
			}
			return this.instance;
		}

		private _bannerAd;

		private _isReady: boolean = false;

		private _adId: string;
		private _bannerDir: BannerDirction;

		private static readonly SAVE_BEANNER_KEY = "s_banner_id";

		public static customWidth: number = 300;

		public static customMaxHeight: number;

		public Create(adId: string, dir: BannerDirction, fun: Function, cWidth?: number) {

			this._adId = adId;
			this._bannerDir = dir;

			let leftPos: number = 0;
			let topPos: number = 0;

			let adWidth = cWidth;
			if (adWidth == undefined || adWidth == void 0 || adWidth == null) {
				adWidth = laya.utils.Browser.clientWidth;
			}

			if (WeChatUtils.GetInstance().IsWeGame()) {
				if (typeof wx.createBannerAd === 'function') {
					this._bannerAd = wx.createBannerAd({
						adUnitId: adId,
						style: {
							left: leftPos,
							top: topPos,
							width: adWidth,
						}
					});

					this._bannerAd.onResize(res => {
						this._bannerAd.style.width = res.width;
						this._bannerAd.style.height = res.height;

						if (dir == BannerDirction.DOWN_CENTER) {

							if (WeChatBannerAd.customMaxHeight) {
								if (res.height > WeChatBannerAd.customMaxHeight) {
									var height = WeChatBannerAd.customMaxHeight;
									let width = height * res.width / res.height;
									this._bannerAd.style.width = width;
									this._bannerAd.style.height = height;
								}
							}

							leftPos = (laya.utils.Browser.clientWidth -this._bannerAd.style.width) / 2;
							let a = 0;
							if (Laya.Browser.onAndroid && (this.isQuanMian() || this.isLiuHai())) {
								a = 34;
							}
							topPos = laya.utils.Browser.clientHeight - this._bannerAd.style.height - a;
						}
						else if (dir == BannerDirction.CENTER) {

							leftPos = (laya.utils.Browser.clientWidth - res.width) / 2;
							topPos = (laya.utils.Browser.clientHeight - res.height) / 2;
						}

						this._bannerAd.style.left = leftPos;
						this._bannerAd.style.top = topPos;
					});

					this._bannerAd.onError(err => {
						console.log(err);
					});

					this._bannerAd.onLoad(() => {
						this._isReady = true;
						if (fun != null)
							fun();
					});
				}
			}
		}

		public IsReadyBanner() {
			if (!WeChatUtils.GetInstance().IsWeGame()) {
				return false;
			}

			if (this._bannerAd == null) {
				return false;
			}
			return true;
		}

		isQuanMian() {
			let sceneWidth = laya.utils.Browser.clientWidth;
			let sceneHeigth = laya.utils.Browser.clientHeight;
			let mScreenRatio = sceneHeigth / sceneWidth;

			return 1.789 < mScreenRatio && mScreenRatio < 19 / 9;
		}

		isLiuHai() {
			let sceneWidth = laya.utils.Browser.clientWidth;
			let sceneHeigth = laya.utils.Browser.clientHeight;
			let mScreenRatio = sceneHeigth / sceneWidth;
			return mScreenRatio >= 19 / 9;
		}

		public IsAllSceneOrLiuHaiScene() {
			if (this.isQuanMian()) {
				return true;
			}
			if (this.isLiuHai()) {
				return true;
			}

			return false;
		}


		//AddCode	

		//EndAddCode

		public Show() {
			if (this.IsReadyBanner()) {
				this._bannerAd.show();
			}
			else {
				this.Refresh(() => { }, null, WeChatBannerAd.customWidth);
			}
		}

		public Hide() {
			if (this.IsReadyBanner()) {
				this._bannerAd.hide();
			}
		}

		public Destroy() {
			if (this._bannerAd != null) {
				this._bannerAd.destroy();
			}
			this._isReady = false;
		}

		public Refresh(fun: Function, dir?: BannerDirction, adWidth?: number) {
			this.Destroy();
			let tempDir = dir;
			if (dir == undefined || dir == void 0 || dir == null) {
				tempDir = this._bannerDir;
			}
			this.Create(this._adId, tempDir, fun, adWidth);
		}

		public GetLastBannerDir() {
			return this._bannerDir;
		}

	}
}