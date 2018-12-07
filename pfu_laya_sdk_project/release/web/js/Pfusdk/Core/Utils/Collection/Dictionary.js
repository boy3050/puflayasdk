var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PFU;
(function (PFU) {
    /**
     * 18/10/09 修改为js in 方式来修改链表， K:必须为string 或 number  V:必须为对象
     */
    var Dictionary = (function (_super) {
        __extends(Dictionary, _super);
        function Dictionary() {
            return _super.call(this) || this;
        }
        Dictionary.prototype.add = function (k, value) {
            var key = "" + k;
            if (!this.has(k)) {
                this._keys.push(k);
            }
            this._object[key] = value;
        };
        Dictionary.prototype.get = function (k) {
            if (this.has(k)) {
                var key = "" + k;
                return this._object[key];
            }
            return null;
        };
        Dictionary.prototype.has = function (k) {
            var key = "" + k;
            return key in this._object;
        };
        Dictionary.prototype.remove = function (k) {
            var key = "" + k;
            if (this.has(k)) {
                delete this._object[key];
            }
            var index = this._keys.indexOf(key);
            if (index != -1) {
                this._keys.splice(index, 1);
            }
        };
        Dictionary.prototype.getKeyByIndex = function (index) {
            var k = this._keys[index];
            return k;
        };
        Dictionary.prototype.getValueByIndex = function (index) {
            var key = this.getKeyByIndex(index);
            return this.get(key);
        };
        Dictionary.prototype.containsKey = function (k) {
            return this.has(k);
        };
        /**
         * 效率低 慎用
         * @param value
         */
        Dictionary.prototype.containsValue = function (value) {
            for (var key in this._object) {
                if (this._object[key] == value) {
                    return true;
                }
            }
            return false;
        };
        return Dictionary;
    }(PFU.IDictionary));
    PFU.Dictionary = Dictionary;
})(PFU || (PFU = {}));
//# sourceMappingURL=Dictionary.js.map