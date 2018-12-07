var PFU;
(function (PFU) {
    var IDictionary = (function () {
        function IDictionary() {
            this._object = {};
            //原型Key数组
            this._keys = new Array();
        }
        IDictionary.prototype.add = function (key, value) {
        };
        IDictionary.prototype.get = function (key) {
        };
        Object.defineProperty(IDictionary.prototype, "Keys", {
            get: function () { return this._keys; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IDictionary.prototype, "count", {
            get: function () { return this._keys.length; },
            enumerable: true,
            configurable: true
        });
        IDictionary.prototype.clear = function () {
            delete this._object;
            this._object = {};
            this._keys.length = 0;
        };
        return IDictionary;
    }());
    PFU.IDictionary = IDictionary;
})(PFU || (PFU = {}));
//# sourceMappingURL=IDictionary.js.map