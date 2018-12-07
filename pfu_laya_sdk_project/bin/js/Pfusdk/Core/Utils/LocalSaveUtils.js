var PFU;
(function (PFU) {
    var LocalSaveUtils = (function () {
        function LocalSaveUtils() {
        }
        LocalSaveUtils.GetJsonObject = function (key) {
            var json = Laya.LocalStorage.getJSON(key);
            if (json != null && json != "") {
                return JSON.parse(json);
            }
            return null;
        };
        //AddCode	
        //EndAddCode
        LocalSaveUtils.SaveJsonObject = function (key, obj) {
            Laya.LocalStorage.setJSON(key, JSON.stringify(obj));
        };
        LocalSaveUtils.RemoveKey = function (key) {
            Laya.LocalStorage.removeItem(key);
        };
        LocalSaveUtils.GetItem = function (key) {
            return Laya.LocalStorage.getItem(key);
        };
        LocalSaveUtils.SaveItem = function (key, value) {
            Laya.LocalStorage.setItem(key, value);
        };
        return LocalSaveUtils;
    }());
    PFU.LocalSaveUtils = LocalSaveUtils;
})(PFU || (PFU = {}));
//# sourceMappingURL=LocalSaveUtils.js.map