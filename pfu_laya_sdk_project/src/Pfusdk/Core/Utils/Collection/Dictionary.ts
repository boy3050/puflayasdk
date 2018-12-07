namespace PFU {
	/**
	 * 18/10/09 修改为js in 方式来修改链表， K:必须为string 或 number  V:必须为对象 
	 */
	export class Dictionary<K, V> extends IDictionary {

		constructor() {
			super();
		}

		public add(k: K, value: V) {
			let key = "" + k;
			if (!this.has(k)) {
				this._keys.push(k);
			}
			this._object[key] = value;
		}

		public get(k: K): V {
			if (this.has(k)) {
				let key = "" + k;
				return this._object[key];
			}
			return null;
		}

		public has(k: K) {
			let key = "" + k;
			return key in this._object;
		}

		public remove(k: K) {
			let key = "" + k;
			if (this.has(k)) {
				delete this._object[key];
			}
			var index = this._keys.indexOf(key);
			if (index != -1) {
				this._keys.splice(index, 1);
			}
		}

		public getKeyByIndex(index: number): K {
			let k: K = this._keys[index];
			return k;
		}

		public getValueByIndex(index:number):V
		{
			let key = this.getKeyByIndex(index);
			return this.get(key);
		}

		public containsKey(k: K): boolean {
			return this.has(k);
		}

		/**
		 * 效率低 慎用
		 * @param value 
		 */
		public containsValue(value: V): boolean {
			for(let key in this._object)
			{
				if(this._object[key] == value)
				{
					return true;
				}
			}
			return false;
		}

	}

}