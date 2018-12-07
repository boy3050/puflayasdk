var PFU;
(function (PFU) {
    var BXStringUtils = (function () {
        function BXStringUtils() {
        }
        //AddCode	
        //EndAddCode
        BXStringUtils.FormatTimeByMMSS = function (time) {
            var mm = Math.floor(time / 60.0);
            var ss = Math.floor(time % 60);
            var value = "";
            if (mm < 10) {
                value += "0" + mm;
            }
            else {
                value += mm;
            }
            value += ":";
            if (ss < 10) {
                value += "0" + ss;
            }
            else {
                value += ss;
            }
            return value;
        };
        /**
         * 按照{0} {1} {2} {x} 规则 替换字符串内容
         * @param list
         * @param str
         */
        BXStringUtils.ReplaceArray = function (list, str) {
            var value = "" + str;
            for (var i = 0; i < list.length; i++) {
                value = value.replace("{" + i + "}", list[i]);
            }
            return value;
        };
        /**
         * 替换单个字符串
         * @param replaceStr
         * @param str
         */
        BXStringUtils.Replace = function (replaceStr, str) {
            var array = [replaceStr];
            return BXStringUtils.ReplaceArray(array, str);
        };
        return BXStringUtils;
    }());
    PFU.BXStringUtils = BXStringUtils;
})(PFU || (PFU = {}));
//# sourceMappingURL=BXStringUtils.js.map