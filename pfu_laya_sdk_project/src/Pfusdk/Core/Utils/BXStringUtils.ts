namespace PFU {

    export class BXStringUtils {
        //AddCode	
    	
//EndAddCode
        public static FormatTimeByMMSS(time: number): string {
            let mm: number = Math.floor(time / 60.0);
            let ss: number = Math.floor(time % 60);

            let value: string = "";

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
        }

        /**
         * 按照{0} {1} {2} {x} 规则 替换字符串内容
         * @param list 
         * @param str 
         */
        public static ReplaceArray(list: Array<string>, str: string): string {
            let value = "" + str;
            for (let i = 0; i < list.length; i++) {
                value = value.replace("{" + i + "}", list[i]);
            }
            return value;
        }

        /**
         * 替换单个字符串
         * @param replaceStr 
         * @param str 
         */
        public static Replace(replaceStr: string, str: string): string {
            let array = [replaceStr];
            return BXStringUtils.ReplaceArray(array, str);
        }
    }
}