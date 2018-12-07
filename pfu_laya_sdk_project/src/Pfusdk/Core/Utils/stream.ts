namespace PFU {


    let BIOSEXCEPTION_CODE = {
        none: 0,
        overflow: 1,
        buffererror: 2,
        paramerror: 3,
        nosupport: 4
    };

    class BiosException {
        private _cause;
        constructor(code) {
            this._cause = code;
        }
    }

    export class Bostream {

        private _iCurLength;
        private _iEndLength;
        private _bLittleEndian;
        private _arrBuffer: ArrayBuffer;
        private _dataView: DataView;

        constructor(nLength, bLittleEndian = false) {
            this._iCurLength = 0; // 当前已写入缓存区长度
            this._iEndLength = nLength;
            this._bLittleEndian = bLittleEndian;
            this._arrBuffer = new ArrayBuffer(nLength);
            this._dataView = new DataView(this._arrBuffer);
        }

        avail() {
            return 0 < (this._iEndLength - this._iCurLength)
        }

        resize(nLength) {
            if (this._iEndLength < nLength) {
                this._iEndLength = nLength;
                this._arrBuffer = new ArrayBuffer(nLength);
                let dataView = new DataView(this._arrBuffer);
                //dataView.set(this._dataView);

                this._dataView = dataView;
            }
            return this;
        }

        clear() {
            this._iCurLength = 0; // 当前已写入缓存区长度
        }

        writeFloat32(i) {
            if (this.avail()) {
                this._dataView.setFloat32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeFloat64(i) {
            if (this.avail()) {
                this._dataView.setFloat64(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 8;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeInt32(i) {
            if (this.avail()) {
                this._dataView.setInt32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeArray(arr) {
            if (!arr) return;
            let writeFunc = this.writeInt8;
            if (arr instanceof Int8Array) {
                writeFunc = this.writeInt8;
            } else if (arr instanceof Uint8Array) {
                writeFunc = this.writeUint8;
            } else if (arr instanceof Int16Array) {
                writeFunc = this.writeInt16;
            } else if (arr instanceof Uint16Array) {
                writeFunc = this.writeUint16;
            } else if (arr instanceof Int32Array) {
                writeFunc = this.writeInt32;
            } else if (arr instanceof Uint32Array) {
                writeFunc = this.writeUInt32;
            } else if (arr instanceof Float32Array) {
                writeFunc = this.writeFloat32;
            } else if (arr instanceof Float64Array) {
                writeFunc = this.writeFloat64;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.nosupport);
            }
            arr.forEach((v, i) => {
                writeFunc.apply(this, [v]);
            })
        }

        writeChar(c) {
            this.writeByte(c);
        }

        writeString(str) {
            for (var i = 0; i < str.length; i++)
                this.writeByte(str.charCodeAt(i));
        }

        writeByte(short) {
            this.writeInt8(short);
        }

        writeInt8(value) {
            if (this.avail()) {
                this._dataView.setInt8(this._iCurLength, value);
                this._iCurLength++;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeShort(short) {
            this.writeInt16(short);
        }

        writeInt16(value) {
            if (this.avail()) {
                this._dataView.setInt16(this._iCurLength, value);
                this._iCurLength += 2;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeUInt32(i) {
            if (this.avail()) {
                this._dataView.setUint32(this._iCurLength, i, this._bLittleEndian);
                this._iCurLength += 4;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeUChar(c) {
            this.writeByte(c);
        }

        writeUString(str) {
            for (var i = 0; i < str.length; i++)
                this.writeUByte(str.charCodeAt(i));
        }

        writeUByte(byte) {
            this.writeUint8(byte);
        }

        writeUint8(value) {
            if (this.avail()) {
                this._dataView.setUint8(this._iCurLength, value);
                this._iCurLength++;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        writeUShort(short) {
            this.writeUint16(short);
        }

        writeUint16(value) {
            if (this.avail()) {
                this._dataView.setUint16(this._iCurLength, value);
                this._iCurLength += 2;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
        }

        buffer() {
            return this._arrBuffer;
        }

        bufferToBlob() {
            return new Blob([this._arrBuffer]);
        }
    }

    class Biostream {
        private _iCurLength;
        private _iEndLength;
        private _bLittleEndian;
        private _dataView;
        constructor(pArrayBuffer, bLittleEndian = false) {
            if (pArrayBuffer && pArrayBuffer instanceof ArrayBuffer) {
                this._iCurLength = 0;
                this._iEndLength = pArrayBuffer.byteLength;
                this._bLittleEndian = bLittleEndian;
                this._dataView = new DataView(pArrayBuffer);
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.buffererror);
            }
        }

        avail() {
            return 0 < (this._iEndLength - this._iCurLength)
        }

        getAvailLength() {
            return this._iEndLength - this._iCurLength;
        }

        readFloat32() {
            if (this.avail()) {
                let i = this._dataView.getFloat32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readFloat64() {
            if (this.avail()) {
                let i = this._dataView.getFloat64(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 8;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readInt32() {
            if (this.avail()) {
                let i = this._dataView.getInt32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readUint32() {
            if (this.avail()) {
                let i = this._dataView.getUint32(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 4;
                return i;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readInt8() {
            if (this.avail()) {
                let b = this._dataView.getInt8(this._iCurLength);
                this._iCurLength++;
                return b;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readUInt8() {
            if (this.avail()) {
                let b = this._dataView.getUint8(this._iCurLength);
                this._iCurLength++;
                return b;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readByte() {
            return this.readInt8();
        }

        readUByte() {
            return this.readUInt8();
        }


        readInt16() {
            if (this.avail()) {
                let s = this._dataView.getInt16(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 2;
                return s;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readUint16() {
            if (this.avail()) {
                let s = this._dataView.getUint16(this._iCurLength, this._bLittleEndian);
                this._iCurLength += 2;
                return s;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.overflow);
            }
            //return 0;
        }

        readShort() {
            return this.readInt16();
        }

        readUShort() {
            return this.readUint16();
        }

        readArray(arrayConstructor, nLength) {
            nLength = nLength || this.getAvailLength();
            if (!arrayConstructor)
                throw new BiosException(BIOSEXCEPTION_CODE.paramerror);
            let readFunc;
            if (arrayConstructor == Int8Array) {
                readFunc = this.readInt8;
            } else if (arrayConstructor == Uint8Array) {
                readFunc = this.readUInt8;
            } else if (arrayConstructor == Int16Array) {
                readFunc = this.readInt16;
            } else if (arrayConstructor == Uint16Array) {
                readFunc = this.readUint16;
            } else if (arrayConstructor == Int32Array) {
                readFunc = this.readInt32;
            } else if (arrayConstructor == Uint32Array) {
                readFunc = this.readUint32;
            } else if (arrayConstructor == Float32Array) {
                readFunc = this.readFloat32;
            } else if (arrayConstructor == Float64Array) {
                readFunc = this.readFloat64;
            } else {
                throw new BiosException(BIOSEXCEPTION_CODE.nosupport);
            }
            let resultArr = new arrayConstructor(nLength);
            for (let i = 0; i < nLength; i++)
                resultArr[i] = readFunc.apply(this);
            return resultArr;
        }
    }
}