/**
* name
*/
var PFU;
(function (PFU) {
    var BXRandom = (function () {
        function BXRandom() {
        }
        BXRandom.Get = function () {
            if (this.random == null) {
                this.random = new BXRandom();
            }
            return this.random;
        };
        //AddCode
        //EndAddCode
        /**
         * 产生下一个随机值(整数)
         * @param min 随机范围最小值
         * @param max 随机范围最大值
         * @return 随机值
         */
        BXRandom.prototype.nextInt = function (start, end) {
            return Math.floor(Math.random() * (end - start) + start);
        };
        /**
         * 产生下一个随机值(浮点数)
         * @param min 随机范围最小值
         * @param max 随机范围最大值
         * @return 随机值
        */
        BXRandom.prototype.nextFloat = function (start, end) {
            return Math.random() * (end - start) + start;
        };
        return BXRandom;
    }());
    BXRandom.random = null;
    PFU.BXRandom = BXRandom;
    var BXRandomUtils = (function () {
        function BXRandomUtils() {
        }
        BXRandomUtils.RandomPropIndex = function (odds) {
            var a = 0;
            for (var i = 0; i < odds.length; i++) {
                a += odds[i];
            }
            var v = BXRandom.Get().nextInt(0, a);
            a = 0;
            for (var i = 0; i < odds.length; i++) {
                a += odds[i];
                if (v < a) {
                    return i;
                }
            }
            return -1;
        };
        return BXRandomUtils;
    }());
    PFU.BXRandomUtils = BXRandomUtils;
})(PFU || (PFU = {}));
//# sourceMappingURL=BXRandom.js.map