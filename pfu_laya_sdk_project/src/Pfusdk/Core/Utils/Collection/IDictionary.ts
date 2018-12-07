namespace PFU {

	export class IDictionary {
		protected _object = {};
		//原型Key数组
		protected _keys = new Array();
		constructor() {
		}
		public add(key, value) {

		}
		public get(key): any {

		}
		public get Keys() { return this._keys; }
		public get count() { return this._keys.length; }


		public clear() {
			delete this._object;
			this._object = {};
			this._keys.length = 0;
		}

	}
}
