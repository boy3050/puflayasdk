var PFU;
(function (PFU) {
    var BIOSEXCEPTION_CODE = {
        none: 0,
        overflow: 1,
        buffererror: 2,
        paramerror: 3,
        nosupport: 4
    };
    var BiosException = (function () {
        function BiosException(code) {
            this._cause = code;
        }
        return BiosException;
    }());
    var Bostream = (function () {
        function Bostream(nLength, bLittleEndian) {
            if (bLittleEndian === void 0) { bLittleEndian = false; }
            this._iCurLength = 0; // 当前已写入缓存区长度
            this._iEndLength = nLength;
            this._bLittleEndian = bLittleEndian;
            this._arrBuffer = new ArrayBuffer(nLength);
            this._dataView = new DataView(this._arrBuffer);
        }
        Bostream.prototype.avail = function () {
            return 0 < (this._iEndLength - this._iCurLength);
        };
        Bostream.prototype.resize = function (nLength) {
            if (this._iEndLength < nLength) {
                this._iEndLength = nLength;
                this._arrBuffer = new ArrayBuffer(nLength);
                var dataView = new DataView(this._arrBuffer);
                //dataView.set(this._dataView);
                this._dataView = dataView;
            }
            return this;
        };
        Bostream.prototype.clear = function () {
            this._iCurLength = 0; // 当前已写入缓存区长度
        };
        Bostream.prototype.writeFloat32 = function (i) {
            if (this.avail()) {
                this._dataView.setFloat32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeFloat64 = function (i) {
            if (this.avail()) {
                this._dataView.setFloat64(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 8;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeInt32 = function (i) {
            if (this.avail()) {
                this._dataView.setInt32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeArray = function (arr) {
            var _this = this;
            if (!arr)
                return;
            var writeFunc = this.writeInt8;
            if (arr instanceof Int8Array) {
                writeFunc = this.writeInt8;
            }
            else if (arr instanceof Uint8Array) {
                writeFunc = this.writeUint8;
            }
            else if (arr instanceof Int16Array) {
                writeFunc = this.writeInt16;
            }
            else if (arr instanceof Uint16Array) {
                writeFunc = this.writeUint16;
            }
            else if (arr instanceof Int32Array) {
                writeFunc = this.writeInt32;
            }
            else if (arr instanceof Uint32Array) {
                writeFunc = this.writeUInt32;
            }
            else if (arr instanceof Float32Array) {
                writeFunc = this.writeFloat32;
            }
            else if (arr instanceof Float64Array) {
                writeFunc = this.writeFloat64;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.nosupport);
            }
            arr.forEach(function (v, i) {
                writeFunc.apply(_this, [v]);
            });
        };
        Bostream.prototype.writeChar = function (c) {
            this.writeByte(c);
        };
        Bostream.prototype.writeString = function (str) {
            for (var i = 0; i < str.length; i++)
                this.writeByte(str.charCodeAt(i));
        };
        Bostream.prototype.writeByte = function (short) {
            this.writeInt8(short);
        };
        Bostream.prototype.writeInt8 = function (value) {
            if (this.avail()) {
                this._dataView.setInt8(this._iCurLength, value);
                this._iCurLength++;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeShort = function (short) {
            this.writeInt16(short);
        };
        Bostream.prototype.writeInt16 = function (value) {
            if (this.avail()) {
                this._dataView.setInt16(this._iCurLength, value);
                this._iCurLength += 2;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeUInt32 = function (i) {
            if (this.avail()) {
                this._dataView.setUint32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeUChar = function (c) {
            this.writeByte(c);
        };
        Bostream.prototype.writeUString = function (str) {
            for (var i = 0; i < str.length; i++)
                this.writeUByte(str.charCodeAt(i));
        };
        Bostream.prototype.writeUByte = function (byte) {
            this.writeUint8(byte);
        };
        Bostream.prototype.writeUint8 = function (value) {
            if (this.avail()) {
                this._dataView.setUint8(this._iCurLength, value);
                this._iCurLength++;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.writeUShort = function (short) {
            this.writeUint16(short);
        };
        Bostream.prototype.writeUint16 = function (value) {
            if (this.avail()) {
                this._dataView.setUint16(this._iCurLength, value);
                this._iCurLength += 2;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        };
        Bostream.prototype.buffer = function () {
            return this._arrBuffer;
        };
        Bostream.prototype.bufferToBlob = function () {
            return new Blob([this._arrBuffer]);
        };
        return Bostream;
    }());
    PFU.Bostream = Bostream;
    var Biostream = (function () {
        function Biostream(pArrayBuffer, bLittleEndian) {
            if (bLittleEndian === void 0) { bLittleEndian = false; }
            if (pArrayBuffer && pArrayBuffer instanceof ArrayBuffer) {
                this._iCurLength = 0;
                this._iEndLength = pArrayBuffer.byteLength;
                this._bLittleEndian = bLittleEndian;
                this._dataView = new DataView(pArrayBuffer);
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.buffererror);
            }
        }
        Biostream.prototype.avail = function () {
            return 0 < (this._iEndLength - this._iCurLength);
        };
        Biostream.prototype.getAvailLength = function () {
            return this._iEndLength - this._iCurLength;
        };
        Biostream.prototype.readFloat32 = function () {
            if (this.avail()) {
                var i = this._dataView.getFloat32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readFloat64 = function () {
            if (this.avail()) {
                var i = this._dataView.getFloat64(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 8;
                return i;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readInt32 = function () {
            if (this.avail()) {
                var i = this._dataView.getInt32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readUint32 = function () {
            if (this.avail()) {
                var i = this._dataView.getUint32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readInt8 = function () {
            if (this.avail()) {
                var b = this._dataView.getInt8(this._iCurLength);
                this._iCurLength++;
                return b;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readUInt8 = function () {
            if (this.avail()) {
                var b = this._dataView.getUint8(this._iCurLength);
                this._iCurLength++;
                return b;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readByte = function () {
            return this.readInt8();
        };
        Biostream.prototype.readUByte = function () {
            return this.readUInt8();
        };
        Biostream.prototype.readInt16 = function () {
            if (this.avail()) {
                var s = this._dataView.getInt16(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 2;
                return s;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readUint16 = function () {
            if (this.avail()) {
                var s = this._dataView.getUint16(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 2;
                return s;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        };
        Biostream.prototype.readShort = function () {
            return this.readInt16();
        };
        Biostream.prototype.readUShort = function () {
            return this.readUint16();
        };
        Biostream.prototype.readArray = function (arrayConstructor, nLength) {
            nLength = nLength || this.getAvailLength();
            if (!arrayConstructor)
                throw new BiosException(BIOSEXCEPTION_CODE.paramerror);
            var readFunc;
            if (arrayConstructor == Int8Array) {
                readFunc = this.readInt8;
            }
            else if (arrayConstructor == Uint8Array) {
                readFunc = this.readUInt8;
            }
            else if (arrayConstructor == Int16Array) {
                readFunc = this.readInt16;
            }
            else if (arrayConstructor == Uint16Array) {
                readFunc = this.readUint16;
            }
            else if (arrayConstructor == Int32Array) {
                readFunc = this.readInt32;
            }
            else if (arrayConstructor == Uint32Array) {
                readFunc = this.readUint32;
            }
            else if (arrayConstructor == Float32Array) {
                readFunc = this.readFloat32;
            }
            else if (arrayConstructor == Float64Array) {
                readFunc = this.readFloat64;
            }
            else {
                throw new BiosException(BIOSEXCEPTION_CODE.nosupport);
            }
            var resultArr = new arrayConstructor(nLength);
            for (var i = 0; i < nLength; i++)
                resultArr[i] = readFunc.apply(this);
            return resultArr;
        };
        return Biostream;
    }());
})(PFU || (PFU = {}));
//# sourceMappingURL=stream.js.map