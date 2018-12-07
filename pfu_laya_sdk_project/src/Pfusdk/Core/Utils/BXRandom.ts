/**
* name 
*/
namespace PFU {
	export class BXRandom {

		private static random: BXRandom = null;

		public static Get(): BXRandom {
			if (this.random == null) {
				this.random = new BXRandom();
			}
			return this.random;
		}

		constructor() {

		}
		//AddCode
		//EndAddCode
		/**
		 * 产生下一个随机值(整数)
		 * @param min 随机范围最小值
		 * @param max 随机范围最大值
		 * @return 随机值
		 */
		public nextInt(start: number, end: number): number {
			return Math.floor(Math.random() * (end - start) + start);
		}

		/**
		 * 产生下一个随机值(浮点数)
		 * @param min 随机范围最小值
		 * @param max 随机范围最大值
		 * @return 随机值
		*/
		public nextFloat(start: number, end: number): number {
			return Math.random() * (end - start) + start;
		}
	}

	export class BXRandomUtils {
		public static RandomPropIndex(odds: Array<number>): number {
			let a = 0;
			for (let i = 0; i < odds.length; i++) {
				a += odds[i];
			}
			let v = BXRandom.Get().nextInt(0, a);
			a = 0;
			for (let i = 0; i < odds.length; i++) {
				a += odds[i];
				if (v < a) {
					return i;
				}
			}
			return -1;
		}
	}
}