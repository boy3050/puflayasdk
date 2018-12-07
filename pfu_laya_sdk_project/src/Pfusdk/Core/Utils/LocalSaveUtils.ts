namespace PFU {
    export class LocalSaveUtils {

        public static GetJsonObject(key: string): any {
            let json: string = Laya.LocalStorage.getJSON(key);
            if (json != null && json != "") {
                return JSON.parse(json);
            }
            return null;
        }
        //AddCode	

        //EndAddCode
        public static SaveJsonObject(key: string, obj: any) {
            Laya.LocalStorage.setJSON(key, JSON.stringify(obj))
        }

        public static RemoveKey(key: string) {
            Laya.LocalStorage.removeItem(key);
        }

        public static GetItem(key: string):string {
            return Laya.LocalStorage.getItem(key);
        }

        public static SaveItem(key: string, value: string) {
            Laya.LocalStorage.setItem(key, value);
        }
    }
}