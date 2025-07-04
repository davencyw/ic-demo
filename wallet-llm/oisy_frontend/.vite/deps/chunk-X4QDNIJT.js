var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE2, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE2 ? nBytes - 1 : 0;
      var d = isLE2 ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value3, offset, isLE2, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE2 ? 0 : nBytes - 1;
      var d = isLE2 ? 1 : -1;
      var s = value3 < 0 || value3 === 0 && 1 / value3 < 0 ? 1 : 0;
      value3 = Math.abs(value3);
      if (isNaN(value3) || value3 === Infinity) {
        m = isNaN(value3) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value3) / Math.LN2);
        if (value3 * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value3 += rt / c;
        } else {
          value3 += rt * Math.pow(2, 1 - eBias);
        }
        if (value3 * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value3 * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value3 * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/borc/node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/borc/node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value3, encodingOrOffset, length) {
      if (typeof value3 === "string") {
        return fromString(value3, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value3)) {
        return fromArrayView(value3);
      }
      if (value3 == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value3
        );
      }
      if (isInstance(value3, ArrayBuffer) || value3 && isInstance(value3.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value3, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value3, SharedArrayBuffer) || value3 && isInstance(value3.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value3, encodingOrOffset, length);
      }
      if (typeof value3 === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      var valueOf = value3.valueOf && value3.valueOf();
      if (valueOf != null && valueOf !== value3) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      var b = fromObject(value3);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value3[Symbol.toPrimitive] === "function") {
        return Buffer2.from(
          value3[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value3
      );
    }
    Buffer2.from = function(value3, encodingOrOffset, length) {
      return from(value3, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      var buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare2(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat3(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            Buffer2.from(buf).copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes2(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value3, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value3 > max || value3 < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE2(value3, offset, byteLength2, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value3, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value3 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value3 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value3, offset, byteLength2, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value3, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value3 & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value3 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 1, 255, 0);
      this[offset] = value3 & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 2, 65535, 0);
      this[offset] = value3 & 255;
      this[offset + 1] = value3 >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 2, 65535, 0);
      this[offset] = value3 >>> 8;
      this[offset + 1] = value3 & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 4, 4294967295, 0);
      this[offset + 3] = value3 >>> 24;
      this[offset + 2] = value3 >>> 16;
      this[offset + 1] = value3 >>> 8;
      this[offset] = value3 & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 4, 4294967295, 0);
      this[offset] = value3 >>> 24;
      this[offset + 1] = value3 >>> 16;
      this[offset + 2] = value3 >>> 8;
      this[offset + 3] = value3 & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE2(value3, offset, byteLength2, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value3, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value3 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value3 < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value3 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value3, offset, byteLength2, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value3, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value3 & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value3 < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value3 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 1, 127, -128);
      if (value3 < 0) value3 = 255 + value3 + 1;
      this[offset] = value3 & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 2, 32767, -32768);
      this[offset] = value3 & 255;
      this[offset + 1] = value3 >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 2, 32767, -32768);
      this[offset] = value3 >>> 8;
      this[offset + 1] = value3 & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 4, 2147483647, -2147483648);
      this[offset] = value3 & 255;
      this[offset + 1] = value3 >>> 8;
      this[offset + 2] = value3 >>> 16;
      this[offset + 3] = value3 >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value3, offset, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value3, offset, 4, 2147483647, -2147483648);
      if (value3 < 0) value3 = 4294967295 + value3 + 1;
      this[offset] = value3 >>> 24;
      this[offset + 1] = value3 >>> 16;
      this[offset + 2] = value3 >>> 8;
      this[offset + 3] = value3 & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value3, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value3, offset, littleEndian, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value3, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value3, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value3, offset, noAssert) {
      return writeFloat(this, value3, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value3, offset, noAssert) {
      return writeFloat(this, value3, offset, false, noAssert);
    };
    function writeDouble(buf, value3, offset, littleEndian, noAssert) {
      value3 = +value3;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value3, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value3, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value3, offset, noAssert) {
      return writeDouble(this, value3, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value3, offset, noAssert) {
      return writeDouble(this, value3, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      var alphabet2 = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet2[i] + alphabet2[j];
        }
      }
      return table;
    }();
  }
});

// node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
  "node_modules/bignumber.js/bignumber.js"(exports, module) {
    (function(globalObject) {
      "use strict";
      var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          // non-breaking space
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v, b) {
          var alphabet2, c, caseChanged, e, i, isNum, len, str, x = this;
          if (!(x instanceof BigNumber2)) return new BigNumber2(v, b);
          if (b == null) {
            if (v && v._isBigNumber === true) {
              x.s = v.s;
              if (!v.c || v.e > MAX_EXP) {
                x.c = x.e = null;
              } else if (v.e < MIN_EXP) {
                x.c = [x.e = 0];
              } else {
                x.e = v.e;
                x.c = v.c.slice();
              }
              return;
            }
            if ((isNum = typeof v == "number") && v * 0 == 0) {
              x.s = 1 / v < 0 ? (v = -v, -1) : 1;
              if (v === ~~v) {
                for (e = 0, i = v; i >= 10; i /= 10, e++) ;
                if (e > MAX_EXP) {
                  x.c = x.e = null;
                } else {
                  x.e = e;
                  x.c = [v];
                }
                return;
              }
              str = String(v);
            } else {
              if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
              x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e < 0) e = i;
              e += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e < 0) {
              e = str.length;
            }
          } else {
            intCheck(b, 2, ALPHABET.length, "Base");
            if (b == 10 && alphabetHasNormalDecimalDigits) {
              x = new BigNumber2(v);
              return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
            }
            str = String(v);
            if (isNum = typeof v == "number") {
              if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
              x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v);
              }
            } else {
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet2 = ALPHABET.slice(0, b);
            e = i = 0;
            for (len = str.length; i < len; i++) {
              if (alphabet2.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e) {
                    e = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e = 0;
                    continue;
                  }
                }
                return parseNumeric(x, String(v), isNum, b);
              }
            }
            isNum = false;
            str = convertBase(str, b, 10, x.s);
            if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
            else e = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++) ;
          for (len = str.length; str.charCodeAt(--len) === 48; ) ;
          if (str = str.slice(i, ++len)) {
            len -= i;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
              throw Error(tooManyDigits + x.s * v);
            }
            if ((e = e - i - 1) > MAX_EXP) {
              x.c = x.e = null;
            } else if (e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = e;
              x.c = [];
              i = (e + 1) % LOG_BASE;
              if (e < 0) i += LOG_BASE;
              if (i < len) {
                if (i) x.c.push(+str.slice(0, i));
                for (len -= LOG_BASE; i < len; ) {
                  x.c.push(+str.slice(i, i += LOG_BASE));
                }
                i = LOG_BASE - (str = str.slice(i)).length;
              } else {
                i -= len;
              }
              for (; i--; str += "0") ;
              x.c.push(+str);
            }
          } else {
            x.c = [x.e = 0];
          }
        }
        BigNumber2.clone = clone;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                DECIMAL_PLACES = v;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v = obj[p];
                intCheck(v, 0, 8, p);
                ROUNDING_MODE = v;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, 0, p);
                  intCheck(v[1], 0, MAX, p);
                  TO_EXP_NEG = v[0];
                  TO_EXP_POS = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, -1, p);
                  intCheck(v[1], 1, MAX, p);
                  MIN_EXP = v[0];
                  MAX_EXP = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  if (v) {
                    MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v = obj[p];
                if (v === !!v) {
                  if (v) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v;
                    } else {
                      CRYPTO = !v;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v = obj[p];
                intCheck(v, 0, 9, p);
                MODULO_MODE = v;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                POW_PRECISION = v;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v = obj[p];
                if (typeof v == "object") FORMAT = v;
                else throw Error(bignumberError + p + " not an object: " + v);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v = obj[p];
                if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                  alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
                  ALPHABET = v;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v) {
          if (!v || v._isBigNumber !== true) return false;
          if (!BigNumber2.DEBUG) return true;
          var i, n, c = v.c, e = v.e, s = v.s;
          out: if ({}.toString.call(c) == "[object Array]") {
            if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
              if (c[0] === 0) {
                if (e === 0 && c.length === 1) return true;
                break out;
              }
              i = (e + 1) % LOG_BASE;
              if (i < 1) i += LOG_BASE;
              if (String(c[0]).length == i) {
                for (i = 0; i < c.length; i++) {
                  n = c[i];
                  if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
                }
                if (n !== 0) return true;
              }
            }
          } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
            return true;
          }
          throw Error(bignumberError + "Invalid BigNumber: " + v);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, -1);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, 1);
        };
        BigNumber2.random = function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
            if (dp == null) dp = DECIMAL_PLACES;
            else intCheck(dp, 0, MAX);
            k = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k *= 2));
                for (; i < k; ) {
                  v = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v >= 9e15) {
                    b = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b[0];
                    a[i + 1] = b[1];
                  } else {
                    c.push(v % 1e14);
                    i += 2;
                  }
                }
                i = k / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k *= 7);
                for (; i < k; ) {
                  v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v % 1e14);
                    i += 7;
                  }
                }
                i = k / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k; ) {
                v = random53bitInt();
                if (v < 9e15) c[i++] = v % 1e14;
              }
            }
            k = c[--i];
            dp %= LOG_BASE;
            if (k && dp) {
              v = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k / v) * v;
            }
            for (; c[i] === 0; c.pop(), i--) ;
            if (i < 0) {
              c = [e = 0];
            } else {
              for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
              for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
              if (i < LOG_BASE) e -= LOG_BASE - i;
            }
            rand.e = e;
            rand.c = c;
            return rand;
          };
        }();
        BigNumber2.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i < args.length; ) sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = /* @__PURE__ */ function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet2) {
            var j, arr = [0], arrL, i = 0, len = str.length;
            for (; i < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
              arr[0] += alphabet2.indexOf(str.charAt(i++));
              for (j = 0; j < arr.length; j++) {
                if (arr[j] > baseOut - 1) {
                  if (arr[j + 1] == null) arr[j + 1] = 0;
                  arr[j + 1] += arr[j] / baseOut | 0;
                  arr[j] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet2, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i >= 0) {
              k = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber2(baseIn);
              x = y.pow(str.length - i);
              POW_PRECISION = k;
              y.c = toBaseOut(
                toFixedPoint(coeffToString(x.c), x.e, "0"),
                10,
                baseOut,
                decimal
              );
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet2 = ALPHABET, decimal) : (alphabet2 = decimal, ALPHABET));
            e = k = xc.length;
            for (; xc[--k] == 0; xc.pop()) ;
            if (!xc[0]) return alphabet2.charAt(0);
            if (i < 0) {
              --e;
            } else {
              x.c = xc;
              x.e = e;
              x.s = sign;
              x = div(x, y, dp, rm, baseOut);
              xc = x.c;
              r = x.r;
              e = x.e;
            }
            d = e + dp + 1;
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;
            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r ? toFixedPoint(alphabet2.charAt(1), -dp, alphabet2.charAt(0)) : alphabet2.charAt(0);
            } else {
              xc.length = d;
              if (r) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k = xc.length; !xc[--k]; ) ;
              for (i = 0, str = ""; i <= k; str += alphabet2.charAt(xc[i++])) ;
              str = toFixedPoint(str, e, alphabet2.charAt(0));
            }
            return str;
          };
        }();
        div = /* @__PURE__ */ function() {
          function multiply(x, k, base) {
            var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
            for (x = x.slice(); i--; ) {
              xlo = x[i] % SQRT_BASE;
              xhi = x[i] / SQRT_BASE | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
              x[i] = temp % base;
            }
            if (carry) x = [carry].concat(x);
            return x;
          }
          function compare3(a, b, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  cmp = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a, b, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
          }
          return function(x, y, dp, rm, base) {
            var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                // Return NaN if either NaN, or both Infinity or 0.
                !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                  // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                  xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                )
              );
            }
            q = new BigNumber2(s);
            qc = q.c = [];
            e = x.e - y.e;
            s = dp + e + 1;
            if (!base) {
              base = BASE;
              e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++) ;
            if (yc[i] > (xc[i] || 0)) e--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0) ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2) yc0++;
              do {
                n = 0;
                cmp = compare3(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base) n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare3(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL) prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare3(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0]) qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
              round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
            } else {
              q.e = e;
              q.r = +more;
            }
            return q;
          };
        }();
        function format(n, i, rm, id) {
          var c0, e, ne, len, str;
          if (rm == null) rm = ROUNDING_MODE;
          else intCheck(rm, 0, 8);
          if (!n.c) return n.toString();
          c0 = n.c[0];
          ne = n.e;
          if (i == null) {
            str = coeffToString(n.c);
            str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
          } else {
            n = round(new BigNumber2(n), i, rm);
            e = n.e;
            str = coeffToString(n.c);
            len = str.length;
            if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
              for (; len < i; str += "0", len++) ;
              str = toExponential(str, e);
            } else {
              i -= ne;
              str = toFixedPoint(str, e, "0");
              if (e + 1 > len) {
                if (--i > 0) for (str += "."; i--; str += "0") ;
              } else {
                i += e - len;
                if (i > 0) {
                  if (e + 1 == len) str += ".";
                  for (; i--; str += "0") ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, n) {
          var k, y, i = 1, x = new BigNumber2(args[0]);
          for (; i < args.length; i++) {
            y = new BigNumber2(args[i]);
            if (!y.s || (k = compare2(x, y)) === n || k === 0 && x.s === n) {
              x = y;
            }
          }
          return x;
        }
        function normalise(n, c, e) {
          var i = 1, j = c.length;
          for (; !c[--j]; c.pop()) ;
          for (j = c[0]; j >= 10; j /= 10, i++) ;
          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }
          return n;
        }
        parseNumeric = /* @__PURE__ */ function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x, str, isNum, b) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b || b == base ? p1 : m;
                });
                if (b) {
                  base = b;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s) return new BigNumber2(s, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
              }
              x.s = null;
            }
            x.c = x.e = null;
          };
        }();
        function round(x, sd, rm, r) {
          var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
              i = sd - d;
              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                n = xc[ni = 0];
                rd = mathfloor(n / pows10[d - j - 1] % 10);
              } else {
                ni = mathceil((i + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0)) ;
                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k = xc[ni];
                  for (d = 1; k >= 10; k /= 10, d++) ;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + d;
                  rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
                }
              }
              r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x.e = -sd || 0;
                } else {
                  xc[0] = x.e = 0;
                }
                return x;
              }
              if (i == 0) {
                xc.length = ni;
                k = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k = pows10[LOG_BASE - i];
                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
                    j = xc[0] += k;
                    for (k = 1; j >= 10; j /= 10, k++) ;
                    if (i != k) {
                      x.e++;
                      if (xc[0] == BASE) xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k;
                    if (xc[ni] != BASE) break;
                    xc[ni--] = 0;
                    k = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop()) ;
            }
            if (x.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (x.e < MIN_EXP) {
              x.c = [x.e = 0];
            }
          }
          return x;
        }
        function valueOf(n) {
          var str, e = n.e;
          if (e === null) return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
          return n.s < 0 ? "-" + str : str;
        }
        P.absoluteValue = P.abs = function() {
          var x = new BigNumber2(this);
          if (x.s < 0) x.s = 1;
          return x;
        };
        P.comparedTo = function(y, b) {
          return compare2(this, new BigNumber2(y, b));
        };
        P.decimalPlaces = P.dp = function(dp, rm) {
          var c, n, v, x = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            return round(new BigNumber2(x), dp + x.e + 1, rm);
          }
          if (!(c = x.c)) return null;
          n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
          if (n < 0) n = 0;
          return n;
        };
        P.dividedBy = P.div = function(y, b) {
          return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P.dividedToIntegerBy = P.idiv = function(y, b) {
          return div(this, new BigNumber2(y, b), 0, 1);
        };
        P.exponentiatedBy = P.pow = function(n, m) {
          var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
          n = new BigNumber2(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
          }
          if (m != null) m = new BigNumber2(m);
          nIsBig = n.e > 14;
          if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
            return m ? y.mod(m) : y;
          }
          nIsNeg = n.s < 0;
          if (m) {
            if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
            isModExp = !nIsNeg && x.isInteger() && m.isInteger();
            if (isModExp) x = x.mod(m);
          } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
            k = x.s < 0 && isOdd(n) ? -0 : 0;
            if (x.e > -1) k = 1 / k;
            return new BigNumber2(nIsNeg ? 1 / k : k);
          } else if (POW_PRECISION) {
            k = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg) n.s = 1;
            nIsOdd = isOdd(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x);
              if (!y.c) break;
              if (k) {
                if (y.c.length > k) y.c.length = k;
              } else if (isModExp) {
                y = y.mod(m);
              }
            }
            if (i) {
              i = mathfloor(i / 2);
              if (i === 0) break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd(n);
              } else {
                i = +valueOf(n);
                if (i === 0) break;
                nIsOdd = i % 2;
              }
            }
            x = x.times(x);
            if (k) {
              if (x.c && x.c.length > k) x.c.length = k;
            } else if (isModExp) {
              x = x.mod(m);
            }
          }
          if (isModExp) return y;
          if (nIsNeg) y = ONE.div(y);
          return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P.integerValue = function(rm) {
          var n = new BigNumber2(this);
          if (rm == null) rm = ROUNDING_MODE;
          else intCheck(rm, 0, 8);
          return round(n, n.e + 1, rm);
        };
        P.isEqualTo = P.eq = function(y, b) {
          return compare2(this, new BigNumber2(y, b)) === 0;
        };
        P.isFinite = function() {
          return !!this.c;
        };
        P.isGreaterThan = P.gt = function(y, b) {
          return compare2(this, new BigNumber2(y, b)) > 0;
        };
        P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
          return (b = compare2(this, new BigNumber2(y, b))) === 1 || b === 0;
        };
        P.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P.isLessThan = P.lt = function(y, b) {
          return compare2(this, new BigNumber2(y, b)) < 0;
        };
        P.isLessThanOrEqualTo = P.lte = function(y, b) {
          return (b = compare2(this, new BigNumber2(y, b))) === -1 || b === 0;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = function() {
          return this.s < 0;
        };
        P.isPositive = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P.minus = function(y, b) {
          var i, j, t, xLTy, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b) return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.plus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
                // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                ROUNDING_MODE == 3 ? -0 : 0
              ));
            }
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b = a; b--; t.push(0)) ;
            t.reverse();
          } else {
            j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
            for (a = b = 0; b < j; b++) {
              if (xc[b] != yc[b]) {
                xLTy = xc[b] < yc[b];
                break;
              }
            }
          }
          if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
          }
          b = (j = yc.length) - (i = xc.length);
          if (b > 0) for (; b--; xc[i++] = 0) ;
          b = BASE - 1;
          for (; j > a; ) {
            if (xc[--j] < yc[j]) {
              for (i = j; i && !xc[--i]; xc[i] = b) ;
              --xc[i];
              xc[j] += BASE;
            }
            xc[j] -= yc[j];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P.modulo = P.mod = function(y, b) {
          var q, s, x = this;
          y = new BigNumber2(y, b);
          if (!x.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y.c || x.c && !x.c[0]) {
            return new BigNumber2(x);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q = div(x, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div(x, y, 0, MODULO_MODE);
          }
          y = x.minus(q.times(y));
          if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
          return y;
        };
        P.multipliedBy = P.times = function(y, b) {
          var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i = xcL;
            xcL = ycL;
            ycL = i;
          }
          for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k = xcL, j = i + k; j > i; ) {
              xlo = xc[--k] % sqrtBase;
              xhi = xc[k] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j--] = xlo % base;
            }
            zc[j] = c;
          }
          if (c) {
            ++e;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e);
        };
        P.negated = function() {
          var x = new BigNumber2(this);
          x.s = -x.s || null;
          return x;
        };
        P.plus = function(y, b) {
          var t, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b) return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.minus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc) return new BigNumber2(a / 0);
            if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0)) ;
            t.reverse();
          }
          a = xc.length;
          b = yc.length;
          if (a - b < 0) {
            t = yc;
            yc = xc;
            xc = t;
            b = a;
          }
          for (a = 0; b; ) {
            a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
            xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P.precision = P.sd = function(sd, rm) {
          var c, n, v, x = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            return round(new BigNumber2(x), sd, rm);
          }
          if (!(c = x.c)) return null;
          v = c.length - 1;
          n = v * LOG_BASE + 1;
          if (v = c[v]) {
            for (; v % 10 == 0; v /= 10, n--) ;
            for (v = c[0]; v >= 10; v /= 10, n++) ;
          }
          if (sd && x.e + 1 > n) n = x.e + 1;
          return n;
        };
        P.shiftedBy = function(k) {
          intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k);
        };
        P.squareRoot = P.sqrt = function() {
          var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0) n += "0";
            s = Math.sqrt(+n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
            if (s == 1 / 0) {
              n = "5e" + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e;
            }
            r = new BigNumber2(n);
          } else {
            r = new BigNumber2(s + "");
          }
          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3) s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div(x, t, dp, 1)));
              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                if (r.e < e) --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        P.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P.toFormat = function(dp, rm, format2) {
          var str, x = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x.toFixed(dp, rm);
          if (x.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i = g1;
              g1 = g2;
              g2 = i;
              len -= i;
            }
            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
              if (isNeg) intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P.toFraction = function(md) {
          var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
          if (md != null) {
            n = new BigNumber2(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc) return new BigNumber2(x);
          d = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s = coeffToString(xc);
          e = d.e = s.length - x.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber2(s);
          n0.c[0] = 0;
          for (; ; ) {
            q = div(n, d, 0, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.comparedTo(md) == 1) break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q.times(d2 = n1));
            n0 = d2;
            d = n.minus(q.times(d2 = d));
            n = d2;
          }
          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          e = e * 2;
          r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
            div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P.toNumber = function() {
          return +valueOf(this);
        };
        P.toPrecision = function(sd, rm) {
          if (sd != null) intCheck(sd, 1, MAX);
          return format(this, sd, rm, 2);
        };
        P.toString = function(b) {
          var str, n = this, s = n.s, e = n.e;
          if (e === null) {
            if (s) {
              str = "Infinity";
              if (s < 0) str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b == null) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
            } else if (b === 10 && alphabetHasNormalDecimalDigits) {
              n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n.c), n.e, "0");
            } else {
              intCheck(b, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
            }
            if (s < 0 && n.c[0]) str = "-" + str;
          }
          return str;
        };
        P.valueOf = P.toJSON = function() {
          return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null) BigNumber2.set(configObject);
        return BigNumber2;
      }
      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      function coeffToString(a) {
        var s, z, i = 1, j = a.length, r = a[0] + "";
        for (; i < j; ) {
          s = a[i++] + "";
          z = LOG_BASE - s.length;
          for (; z--; s = "0" + s) ;
          r += s;
        }
        for (j = r.length; r.charCodeAt(--j) === 48; ) ;
        return r.slice(0, j + 1 || 1);
      }
      function compare2(x, y) {
        var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
        if (!i || !j) return null;
        a = xc && !xc[0];
        b = yc && !yc[0];
        if (a || b) return a ? b ? 0 : -j : i;
        if (i != j) return i;
        a = i < 0;
        b = k == l;
        if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
        if (!b) return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
        return k == l ? 0 : k > l ^ a ? 1 : -1;
      }
      function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      function isOdd(n) {
        var k = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
      }
      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
      }
      function toFixedPoint(str, e, z) {
        var len, zs;
        if (e < 0) {
          for (zs = z + "."; ++e; zs += z) ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e > len) {
            for (zs = z, e -= len; --e; zs += z) ;
            str += zs;
          } else if (e < len) {
            str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        return str;
      }
      BigNumber = clone();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(exports);
  }
});

// node_modules/borc/src/decoder.asm.js
var require_decoder_asm = __commonJS({
  "node_modules/borc/src/decoder.asm.js"(exports, module) {
    module.exports = function decodeAsm(stdlib, foreign, buffer) {
      ;
      var heap = new stdlib.Uint8Array(buffer);
      var pushInt = foreign.pushInt;
      var pushInt32 = foreign.pushInt32;
      var pushInt32Neg = foreign.pushInt32Neg;
      var pushInt64 = foreign.pushInt64;
      var pushInt64Neg = foreign.pushInt64Neg;
      var pushFloat = foreign.pushFloat;
      var pushFloatSingle = foreign.pushFloatSingle;
      var pushFloatDouble = foreign.pushFloatDouble;
      var pushTrue = foreign.pushTrue;
      var pushFalse = foreign.pushFalse;
      var pushUndefined = foreign.pushUndefined;
      var pushNull = foreign.pushNull;
      var pushInfinity = foreign.pushInfinity;
      var pushInfinityNeg = foreign.pushInfinityNeg;
      var pushNaN = foreign.pushNaN;
      var pushNaNNeg = foreign.pushNaNNeg;
      var pushArrayStart = foreign.pushArrayStart;
      var pushArrayStartFixed = foreign.pushArrayStartFixed;
      var pushArrayStartFixed32 = foreign.pushArrayStartFixed32;
      var pushArrayStartFixed64 = foreign.pushArrayStartFixed64;
      var pushObjectStart = foreign.pushObjectStart;
      var pushObjectStartFixed = foreign.pushObjectStartFixed;
      var pushObjectStartFixed32 = foreign.pushObjectStartFixed32;
      var pushObjectStartFixed64 = foreign.pushObjectStartFixed64;
      var pushByteString = foreign.pushByteString;
      var pushByteStringStart = foreign.pushByteStringStart;
      var pushUtf8String = foreign.pushUtf8String;
      var pushUtf8StringStart = foreign.pushUtf8StringStart;
      var pushSimpleUnassigned = foreign.pushSimpleUnassigned;
      var pushTagStart = foreign.pushTagStart;
      var pushTagStart4 = foreign.pushTagStart4;
      var pushTagStart8 = foreign.pushTagStart8;
      var pushTagUnassigned = foreign.pushTagUnassigned;
      var pushBreak = foreign.pushBreak;
      var pow = stdlib.Math.pow;
      var offset = 0;
      var inputLength = 0;
      var code = 0;
      function parse(input) {
        input = input | 0;
        offset = 0;
        inputLength = input;
        while ((offset | 0) < (inputLength | 0)) {
          code = jumpTable[heap[offset] & 255](heap[offset] | 0) | 0;
          if ((code | 0) > 0) {
            break;
          }
        }
        return code | 0;
      }
      function checkOffset(n) {
        n = n | 0;
        if (((offset | 0) + (n | 0) | 0) < (inputLength | 0)) {
          return 0;
        }
        return 1;
      }
      function readUInt16(n) {
        n = n | 0;
        return heap[n | 0] << 8 | heap[n + 1 | 0] | 0;
      }
      function readUInt32(n) {
        n = n | 0;
        return heap[n | 0] << 24 | heap[n + 1 | 0] << 16 | heap[n + 2 | 0] << 8 | heap[n + 3 | 0] | 0;
      }
      function INT_P(octet) {
        octet = octet | 0;
        pushInt(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function UINT_P_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushInt(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function UINT_P_16(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushInt(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function UINT_P_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushInt32(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function UINT_P_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushInt64(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function INT_N(octet) {
        octet = octet | 0;
        pushInt(-1 - (octet - 32 | 0) | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function UINT_N_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushInt(
          -1 - (heap[offset + 1 | 0] | 0) | 0
        );
        offset = offset + 2 | 0;
        return 0;
      }
      function UINT_N_16(octet) {
        octet = octet | 0;
        var val = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        val = readUInt16(offset + 1 | 0) | 0;
        pushInt(-1 - (val | 0) | 0);
        offset = offset + 3 | 0;
        return 0;
      }
      function UINT_N_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushInt32Neg(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function UINT_N_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushInt64Neg(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function BYTE_STRING(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var step = 0;
        step = octet - 64 | 0;
        if (checkOffset(step | 0) | 0) {
          return 1;
        }
        start = offset + 1 | 0;
        end = (offset + 1 | 0) + (step | 0) | 0;
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_8(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        length = heap[offset + 1 | 0] | 0;
        start = offset + 2 | 0;
        end = (offset + 2 | 0) + (length | 0) | 0;
        if (checkOffset(length + 1 | 0) | 0) {
          return 1;
        }
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_16(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        length = readUInt16(offset + 1 | 0) | 0;
        start = offset + 3 | 0;
        end = (offset + 3 | 0) + (length | 0) | 0;
        if (checkOffset(length + 2 | 0) | 0) {
          return 1;
        }
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_32(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        length = readUInt32(offset + 1 | 0) | 0;
        start = offset + 5 | 0;
        end = (offset + 5 | 0) + (length | 0) | 0;
        if (checkOffset(length + 4 | 0) | 0) {
          return 1;
        }
        pushByteString(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function BYTE_STRING_64(octet) {
        octet = octet | 0;
        return 1;
      }
      function BYTE_STRING_BREAK(octet) {
        octet = octet | 0;
        pushByteStringStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function UTF8_STRING(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var step = 0;
        step = octet - 96 | 0;
        if (checkOffset(step | 0) | 0) {
          return 1;
        }
        start = offset + 1 | 0;
        end = (offset + 1 | 0) + (step | 0) | 0;
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_8(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        length = heap[offset + 1 | 0] | 0;
        start = offset + 2 | 0;
        end = (offset + 2 | 0) + (length | 0) | 0;
        if (checkOffset(length + 1 | 0) | 0) {
          return 1;
        }
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_16(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        length = readUInt16(offset + 1 | 0) | 0;
        start = offset + 3 | 0;
        end = (offset + 3 | 0) + (length | 0) | 0;
        if (checkOffset(length + 2 | 0) | 0) {
          return 1;
        }
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_32(octet) {
        octet = octet | 0;
        var start = 0;
        var end = 0;
        var length = 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        length = readUInt32(offset + 1 | 0) | 0;
        start = offset + 5 | 0;
        end = (offset + 5 | 0) + (length | 0) | 0;
        if (checkOffset(length + 4 | 0) | 0) {
          return 1;
        }
        pushUtf8String(start | 0, end | 0);
        offset = end | 0;
        return 0;
      }
      function UTF8_STRING_64(octet) {
        octet = octet | 0;
        return 1;
      }
      function UTF8_STRING_BREAK(octet) {
        octet = octet | 0;
        pushUtf8StringStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function ARRAY(octet) {
        octet = octet | 0;
        pushArrayStartFixed(octet - 128 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function ARRAY_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushArrayStartFixed(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function ARRAY_16(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushArrayStartFixed(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function ARRAY_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushArrayStartFixed32(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function ARRAY_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushArrayStartFixed64(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function ARRAY_BREAK(octet) {
        octet = octet | 0;
        pushArrayStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function MAP(octet) {
        octet = octet | 0;
        var step = 0;
        step = octet - 160 | 0;
        if (checkOffset(step | 0) | 0) {
          return 1;
        }
        pushObjectStartFixed(step | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function MAP_8(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushObjectStartFixed(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function MAP_16(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushObjectStartFixed(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function MAP_32(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushObjectStartFixed32(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function MAP_64(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushObjectStartFixed64(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function MAP_BREAK(octet) {
        octet = octet | 0;
        pushObjectStart();
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_KNOWN(octet) {
        octet = octet | 0;
        pushTagStart(octet - 192 | 0 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BIGNUM_POS(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BIGNUM_NEG(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_FRAC(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BIGNUM_FLOAT(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_UNASSIGNED(octet) {
        octet = octet | 0;
        pushTagStart(octet - 192 | 0 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BASE64_URL(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BASE64(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_BASE16(octet) {
        octet = octet | 0;
        pushTagStart(octet | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function TAG_MORE_1(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushTagStart(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function TAG_MORE_2(octet) {
        octet = octet | 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        pushTagStart(
          readUInt16(offset + 1 | 0) | 0
        );
        offset = offset + 3 | 0;
        return 0;
      }
      function TAG_MORE_4(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushTagStart4(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function TAG_MORE_8(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushTagStart8(
          readUInt16(offset + 1 | 0) | 0,
          readUInt16(offset + 3 | 0) | 0,
          readUInt16(offset + 5 | 0) | 0,
          readUInt16(offset + 7 | 0) | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function SIMPLE_UNASSIGNED(octet) {
        octet = octet | 0;
        pushSimpleUnassigned((octet | 0) - 224 | 0);
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_FALSE(octet) {
        octet = octet | 0;
        pushFalse();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_TRUE(octet) {
        octet = octet | 0;
        pushTrue();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_NULL(octet) {
        octet = octet | 0;
        pushNull();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_UNDEFINED(octet) {
        octet = octet | 0;
        pushUndefined();
        offset = offset + 1 | 0;
        return 0;
      }
      function SIMPLE_BYTE(octet) {
        octet = octet | 0;
        if (checkOffset(1) | 0) {
          return 1;
        }
        pushSimpleUnassigned(heap[offset + 1 | 0] | 0);
        offset = offset + 2 | 0;
        return 0;
      }
      function SIMPLE_FLOAT_HALF(octet) {
        octet = octet | 0;
        var f = 0;
        var g = 0;
        var sign = 1;
        var exp = 0;
        var mant = 0;
        var r = 0;
        if (checkOffset(2) | 0) {
          return 1;
        }
        f = heap[offset + 1 | 0] | 0;
        g = heap[offset + 2 | 0] | 0;
        if ((f | 0) & 128) {
          sign = -1;
        }
        exp = +(((f | 0) & 124) >> 2);
        mant = +(((f | 0) & 3) << 8 | g);
        if (+exp == 0) {
          pushFloat(+(+sign * 5960464477539063e-23 * +mant));
        } else if (+exp == 31) {
          if (+sign == 1) {
            if (+mant > 0) {
              pushNaN();
            } else {
              pushInfinity();
            }
          } else {
            if (+mant > 0) {
              pushNaNNeg();
            } else {
              pushInfinityNeg();
            }
          }
        } else {
          pushFloat(+(+sign * pow(2, +(+exp - 25)) * +(1024 + mant)));
        }
        offset = offset + 3 | 0;
        return 0;
      }
      function SIMPLE_FLOAT_SINGLE(octet) {
        octet = octet | 0;
        if (checkOffset(4) | 0) {
          return 1;
        }
        pushFloatSingle(
          heap[offset + 1 | 0] | 0,
          heap[offset + 2 | 0] | 0,
          heap[offset + 3 | 0] | 0,
          heap[offset + 4 | 0] | 0
        );
        offset = offset + 5 | 0;
        return 0;
      }
      function SIMPLE_FLOAT_DOUBLE(octet) {
        octet = octet | 0;
        if (checkOffset(8) | 0) {
          return 1;
        }
        pushFloatDouble(
          heap[offset + 1 | 0] | 0,
          heap[offset + 2 | 0] | 0,
          heap[offset + 3 | 0] | 0,
          heap[offset + 4 | 0] | 0,
          heap[offset + 5 | 0] | 0,
          heap[offset + 6 | 0] | 0,
          heap[offset + 7 | 0] | 0,
          heap[offset + 8 | 0] | 0
        );
        offset = offset + 9 | 0;
        return 0;
      }
      function ERROR(octet) {
        octet = octet | 0;
        return 1;
      }
      function BREAK(octet) {
        octet = octet | 0;
        pushBreak();
        offset = offset + 1 | 0;
        return 0;
      }
      var jumpTable = [
        // Integer 0x00..0x17 (0..23)
        INT_P,
        // 0x00
        INT_P,
        // 0x01
        INT_P,
        // 0x02
        INT_P,
        // 0x03
        INT_P,
        // 0x04
        INT_P,
        // 0x05
        INT_P,
        // 0x06
        INT_P,
        // 0x07
        INT_P,
        // 0x08
        INT_P,
        // 0x09
        INT_P,
        // 0x0A
        INT_P,
        // 0x0B
        INT_P,
        // 0x0C
        INT_P,
        // 0x0D
        INT_P,
        // 0x0E
        INT_P,
        // 0x0F
        INT_P,
        // 0x10
        INT_P,
        // 0x11
        INT_P,
        // 0x12
        INT_P,
        // 0x13
        INT_P,
        // 0x14
        INT_P,
        // 0x15
        INT_P,
        // 0x16
        INT_P,
        // 0x17
        // Unsigned integer (one-byte uint8_t follows)
        UINT_P_8,
        // 0x18
        // Unsigned integer (two-byte uint16_t follows)
        UINT_P_16,
        // 0x19
        // Unsigned integer (four-byte uint32_t follows)
        UINT_P_32,
        // 0x1a
        // Unsigned integer (eight-byte uint64_t follows)
        UINT_P_64,
        // 0x1b
        ERROR,
        // 0x1c
        ERROR,
        // 0x1d
        ERROR,
        // 0x1e
        ERROR,
        // 0x1f
        // Negative integer -1-0x00..-1-0x17 (-1..-24)
        INT_N,
        // 0x20
        INT_N,
        // 0x21
        INT_N,
        // 0x22
        INT_N,
        // 0x23
        INT_N,
        // 0x24
        INT_N,
        // 0x25
        INT_N,
        // 0x26
        INT_N,
        // 0x27
        INT_N,
        // 0x28
        INT_N,
        // 0x29
        INT_N,
        // 0x2A
        INT_N,
        // 0x2B
        INT_N,
        // 0x2C
        INT_N,
        // 0x2D
        INT_N,
        // 0x2E
        INT_N,
        // 0x2F
        INT_N,
        // 0x30
        INT_N,
        // 0x31
        INT_N,
        // 0x32
        INT_N,
        // 0x33
        INT_N,
        // 0x34
        INT_N,
        // 0x35
        INT_N,
        // 0x36
        INT_N,
        // 0x37
        // Negative integer -1-n (one-byte uint8_t for n follows)
        UINT_N_8,
        // 0x38
        // Negative integer -1-n (two-byte uint16_t for n follows)
        UINT_N_16,
        // 0x39
        // Negative integer -1-n (four-byte uint32_t for nfollows)
        UINT_N_32,
        // 0x3a
        // Negative integer -1-n (eight-byte uint64_t for n follows)
        UINT_N_64,
        // 0x3b
        ERROR,
        // 0x3c
        ERROR,
        // 0x3d
        ERROR,
        // 0x3e
        ERROR,
        // 0x3f
        // byte string (0x00..0x17 bytes follow)
        BYTE_STRING,
        // 0x40
        BYTE_STRING,
        // 0x41
        BYTE_STRING,
        // 0x42
        BYTE_STRING,
        // 0x43
        BYTE_STRING,
        // 0x44
        BYTE_STRING,
        // 0x45
        BYTE_STRING,
        // 0x46
        BYTE_STRING,
        // 0x47
        BYTE_STRING,
        // 0x48
        BYTE_STRING,
        // 0x49
        BYTE_STRING,
        // 0x4A
        BYTE_STRING,
        // 0x4B
        BYTE_STRING,
        // 0x4C
        BYTE_STRING,
        // 0x4D
        BYTE_STRING,
        // 0x4E
        BYTE_STRING,
        // 0x4F
        BYTE_STRING,
        // 0x50
        BYTE_STRING,
        // 0x51
        BYTE_STRING,
        // 0x52
        BYTE_STRING,
        // 0x53
        BYTE_STRING,
        // 0x54
        BYTE_STRING,
        // 0x55
        BYTE_STRING,
        // 0x56
        BYTE_STRING,
        // 0x57
        // byte string (one-byte uint8_t for n, and then n bytes follow)
        BYTE_STRING_8,
        // 0x58
        // byte string (two-byte uint16_t for n, and then n bytes follow)
        BYTE_STRING_16,
        // 0x59
        // byte string (four-byte uint32_t for n, and then n bytes follow)
        BYTE_STRING_32,
        // 0x5a
        // byte string (eight-byte uint64_t for n, and then n bytes follow)
        BYTE_STRING_64,
        // 0x5b
        ERROR,
        // 0x5c
        ERROR,
        // 0x5d
        ERROR,
        // 0x5e
        // byte string, byte strings follow, terminated by "break"
        BYTE_STRING_BREAK,
        // 0x5f
        // UTF-8 string (0x00..0x17 bytes follow)
        UTF8_STRING,
        // 0x60
        UTF8_STRING,
        // 0x61
        UTF8_STRING,
        // 0x62
        UTF8_STRING,
        // 0x63
        UTF8_STRING,
        // 0x64
        UTF8_STRING,
        // 0x65
        UTF8_STRING,
        // 0x66
        UTF8_STRING,
        // 0x67
        UTF8_STRING,
        // 0x68
        UTF8_STRING,
        // 0x69
        UTF8_STRING,
        // 0x6A
        UTF8_STRING,
        // 0x6B
        UTF8_STRING,
        // 0x6C
        UTF8_STRING,
        // 0x6D
        UTF8_STRING,
        // 0x6E
        UTF8_STRING,
        // 0x6F
        UTF8_STRING,
        // 0x70
        UTF8_STRING,
        // 0x71
        UTF8_STRING,
        // 0x72
        UTF8_STRING,
        // 0x73
        UTF8_STRING,
        // 0x74
        UTF8_STRING,
        // 0x75
        UTF8_STRING,
        // 0x76
        UTF8_STRING,
        // 0x77
        // UTF-8 string (one-byte uint8_t for n, and then n bytes follow)
        UTF8_STRING_8,
        // 0x78
        // UTF-8 string (two-byte uint16_t for n, and then n bytes follow)
        UTF8_STRING_16,
        // 0x79
        // UTF-8 string (four-byte uint32_t for n, and then n bytes follow)
        UTF8_STRING_32,
        // 0x7a
        // UTF-8 string (eight-byte uint64_t for n, and then n bytes follow)
        UTF8_STRING_64,
        // 0x7b
        // UTF-8 string, UTF-8 strings follow, terminated by "break"
        ERROR,
        // 0x7c
        ERROR,
        // 0x7d
        ERROR,
        // 0x7e
        UTF8_STRING_BREAK,
        // 0x7f
        // array (0x00..0x17 data items follow)
        ARRAY,
        // 0x80
        ARRAY,
        // 0x81
        ARRAY,
        // 0x82
        ARRAY,
        // 0x83
        ARRAY,
        // 0x84
        ARRAY,
        // 0x85
        ARRAY,
        // 0x86
        ARRAY,
        // 0x87
        ARRAY,
        // 0x88
        ARRAY,
        // 0x89
        ARRAY,
        // 0x8A
        ARRAY,
        // 0x8B
        ARRAY,
        // 0x8C
        ARRAY,
        // 0x8D
        ARRAY,
        // 0x8E
        ARRAY,
        // 0x8F
        ARRAY,
        // 0x90
        ARRAY,
        // 0x91
        ARRAY,
        // 0x92
        ARRAY,
        // 0x93
        ARRAY,
        // 0x94
        ARRAY,
        // 0x95
        ARRAY,
        // 0x96
        ARRAY,
        // 0x97
        // array (one-byte uint8_t fo, and then n data items follow)
        ARRAY_8,
        // 0x98
        // array (two-byte uint16_t for n, and then n data items follow)
        ARRAY_16,
        // 0x99
        // array (four-byte uint32_t for n, and then n data items follow)
        ARRAY_32,
        // 0x9a
        // array (eight-byte uint64_t for n, and then n data items follow)
        ARRAY_64,
        // 0x9b
        // array, data items follow, terminated by "break"
        ERROR,
        // 0x9c
        ERROR,
        // 0x9d
        ERROR,
        // 0x9e
        ARRAY_BREAK,
        // 0x9f
        // map (0x00..0x17 pairs of data items follow)
        MAP,
        // 0xa0
        MAP,
        // 0xa1
        MAP,
        // 0xa2
        MAP,
        // 0xa3
        MAP,
        // 0xa4
        MAP,
        // 0xa5
        MAP,
        // 0xa6
        MAP,
        // 0xa7
        MAP,
        // 0xa8
        MAP,
        // 0xa9
        MAP,
        // 0xaA
        MAP,
        // 0xaB
        MAP,
        // 0xaC
        MAP,
        // 0xaD
        MAP,
        // 0xaE
        MAP,
        // 0xaF
        MAP,
        // 0xb0
        MAP,
        // 0xb1
        MAP,
        // 0xb2
        MAP,
        // 0xb3
        MAP,
        // 0xb4
        MAP,
        // 0xb5
        MAP,
        // 0xb6
        MAP,
        // 0xb7
        // map (one-byte uint8_t for n, and then n pairs of data items follow)
        MAP_8,
        // 0xb8
        // map (two-byte uint16_t for n, and then n pairs of data items follow)
        MAP_16,
        // 0xb9
        // map (four-byte uint32_t for n, and then n pairs of data items follow)
        MAP_32,
        // 0xba
        // map (eight-byte uint64_t for n, and then n pairs of data items follow)
        MAP_64,
        // 0xbb
        ERROR,
        // 0xbc
        ERROR,
        // 0xbd
        ERROR,
        // 0xbe
        // map, pairs of data items follow, terminated by "break"
        MAP_BREAK,
        // 0xbf
        // Text-based date/time (data item follows; see Section 2.4.1)
        TAG_KNOWN,
        // 0xc0
        // Epoch-based date/time (data item follows; see Section 2.4.1)
        TAG_KNOWN,
        // 0xc1
        // Positive bignum (data item "byte string" follows)
        TAG_KNOWN,
        // 0xc2
        // Negative bignum (data item "byte string" follows)
        TAG_KNOWN,
        // 0xc3
        // Decimal Fraction (data item "array" follows; see Section 2.4.3)
        TAG_KNOWN,
        // 0xc4
        // Bigfloat (data item "array" follows; see Section 2.4.3)
        TAG_KNOWN,
        // 0xc5
        // (tagged item)
        TAG_UNASSIGNED,
        // 0xc6
        TAG_UNASSIGNED,
        // 0xc7
        TAG_UNASSIGNED,
        // 0xc8
        TAG_UNASSIGNED,
        // 0xc9
        TAG_UNASSIGNED,
        // 0xca
        TAG_UNASSIGNED,
        // 0xcb
        TAG_UNASSIGNED,
        // 0xcc
        TAG_UNASSIGNED,
        // 0xcd
        TAG_UNASSIGNED,
        // 0xce
        TAG_UNASSIGNED,
        // 0xcf
        TAG_UNASSIGNED,
        // 0xd0
        TAG_UNASSIGNED,
        // 0xd1
        TAG_UNASSIGNED,
        // 0xd2
        TAG_UNASSIGNED,
        // 0xd3
        TAG_UNASSIGNED,
        // 0xd4
        // Expected Conversion (data item follows; see Section 2.4.4.2)
        TAG_UNASSIGNED,
        // 0xd5
        TAG_UNASSIGNED,
        // 0xd6
        TAG_UNASSIGNED,
        // 0xd7
        // (more tagged items, 1/2/4/8 bytes and then a data item follow)
        TAG_MORE_1,
        // 0xd8
        TAG_MORE_2,
        // 0xd9
        TAG_MORE_4,
        // 0xda
        TAG_MORE_8,
        // 0xdb
        ERROR,
        // 0xdc
        ERROR,
        // 0xdd
        ERROR,
        // 0xde
        ERROR,
        // 0xdf
        // (simple value)
        SIMPLE_UNASSIGNED,
        // 0xe0
        SIMPLE_UNASSIGNED,
        // 0xe1
        SIMPLE_UNASSIGNED,
        // 0xe2
        SIMPLE_UNASSIGNED,
        // 0xe3
        SIMPLE_UNASSIGNED,
        // 0xe4
        SIMPLE_UNASSIGNED,
        // 0xe5
        SIMPLE_UNASSIGNED,
        // 0xe6
        SIMPLE_UNASSIGNED,
        // 0xe7
        SIMPLE_UNASSIGNED,
        // 0xe8
        SIMPLE_UNASSIGNED,
        // 0xe9
        SIMPLE_UNASSIGNED,
        // 0xea
        SIMPLE_UNASSIGNED,
        // 0xeb
        SIMPLE_UNASSIGNED,
        // 0xec
        SIMPLE_UNASSIGNED,
        // 0xed
        SIMPLE_UNASSIGNED,
        // 0xee
        SIMPLE_UNASSIGNED,
        // 0xef
        SIMPLE_UNASSIGNED,
        // 0xf0
        SIMPLE_UNASSIGNED,
        // 0xf1
        SIMPLE_UNASSIGNED,
        // 0xf2
        SIMPLE_UNASSIGNED,
        // 0xf3
        // False
        SIMPLE_FALSE,
        // 0xf4
        // True
        SIMPLE_TRUE,
        // 0xf5
        // Null
        SIMPLE_NULL,
        // 0xf6
        // Undefined
        SIMPLE_UNDEFINED,
        // 0xf7
        // (simple value, one byte follows)
        SIMPLE_BYTE,
        // 0xf8
        // Half-Precision Float (two-byte IEEE 754)
        SIMPLE_FLOAT_HALF,
        // 0xf9
        // Single-Precision Float (four-byte IEEE 754)
        SIMPLE_FLOAT_SINGLE,
        // 0xfa
        // Double-Precision Float (eight-byte IEEE 754)
        SIMPLE_FLOAT_DOUBLE,
        // 0xfb
        ERROR,
        // 0xfc
        ERROR,
        // 0xfd
        ERROR,
        // 0xfe
        // "break" stop code
        BREAK
        // 0xff
      ];
      return {
        parse
      };
    };
  }
});

// node_modules/borc/src/constants.js
var require_constants = __commonJS({
  "node_modules/borc/src/constants.js"(exports) {
    "use strict";
    var Bignumber = require_bignumber().BigNumber;
    exports.MT = {
      POS_INT: 0,
      NEG_INT: 1,
      BYTE_STRING: 2,
      UTF8_STRING: 3,
      ARRAY: 4,
      MAP: 5,
      TAG: 6,
      SIMPLE_FLOAT: 7
    };
    exports.TAG = {
      DATE_STRING: 0,
      DATE_EPOCH: 1,
      POS_BIGINT: 2,
      NEG_BIGINT: 3,
      DECIMAL_FRAC: 4,
      BIGFLOAT: 5,
      BASE64URL_EXPECTED: 21,
      BASE64_EXPECTED: 22,
      BASE16_EXPECTED: 23,
      CBOR: 24,
      URI: 32,
      BASE64URL: 33,
      BASE64: 34,
      REGEXP: 35,
      MIME: 36
    };
    exports.NUMBYTES = {
      ZERO: 0,
      ONE: 24,
      TWO: 25,
      FOUR: 26,
      EIGHT: 27,
      INDEFINITE: 31
    };
    exports.SIMPLE = {
      FALSE: 20,
      TRUE: 21,
      NULL: 22,
      UNDEFINED: 23
    };
    exports.SYMS = {
      NULL: Symbol("null"),
      UNDEFINED: Symbol("undef"),
      PARENT: Symbol("parent"),
      BREAK: Symbol("break"),
      STREAM: Symbol("stream")
    };
    exports.SHIFT32 = Math.pow(2, 32);
    exports.SHIFT16 = Math.pow(2, 16);
    exports.MAX_SAFE_HIGH = 2097151;
    exports.NEG_ONE = new Bignumber(-1);
    exports.TEN = new Bignumber(10);
    exports.TWO = new Bignumber(2);
    exports.PARENT = {
      ARRAY: 0,
      OBJECT: 1,
      MAP: 2,
      TAG: 3,
      BYTE_STRING: 4,
      UTF8_STRING: 5
    };
  }
});

// node_modules/borc/src/utils.js
var require_utils = __commonJS({
  "node_modules/borc/src/utils.js"(exports) {
    "use strict";
    var { Buffer: Buffer2 } = require_buffer();
    var Bignumber = require_bignumber().BigNumber;
    var constants = require_constants();
    var SHIFT32 = constants.SHIFT32;
    var SHIFT16 = constants.SHIFT16;
    var MAX_SAFE_HIGH = 2097151;
    exports.parseHalf = function parseHalf(buf) {
      var exp, mant, sign;
      sign = buf[0] & 128 ? -1 : 1;
      exp = (buf[0] & 124) >> 2;
      mant = (buf[0] & 3) << 8 | buf[1];
      if (!exp) {
        return sign * 5960464477539063e-23 * mant;
      } else if (exp === 31) {
        return sign * (mant ? 0 / 0 : Infinity);
      } else {
        return sign * Math.pow(2, exp - 25) * (1024 + mant);
      }
    };
    function toHex2(n) {
      if (n < 16) {
        return "0" + n.toString(16);
      }
      return n.toString(16);
    }
    exports.arrayBufferToBignumber = function(buf) {
      const len = buf.byteLength;
      let res = "";
      for (let i = 0; i < len; i++) {
        res += toHex2(buf[i]);
      }
      return new Bignumber(res, 16);
    };
    exports.buildMap = (obj) => {
      const res = /* @__PURE__ */ new Map();
      const keys = Object.keys(obj);
      const length = keys.length;
      for (let i = 0; i < length; i++) {
        res.set(keys[i], obj[keys[i]]);
      }
      return res;
    };
    exports.buildInt32 = (f, g) => {
      return f * SHIFT16 + g;
    };
    exports.buildInt64 = (f1, f2, g1, g2) => {
      const f = exports.buildInt32(f1, f2);
      const g = exports.buildInt32(g1, g2);
      if (f > MAX_SAFE_HIGH) {
        return new Bignumber(f).times(SHIFT32).plus(g);
      } else {
        return f * SHIFT32 + g;
      }
    };
    exports.writeHalf = function writeHalf(buf, half) {
      const u32 = Buffer2.allocUnsafe(4);
      u32.writeFloatBE(half, 0);
      const u = u32.readUInt32BE(0);
      if ((u & 8191) !== 0) {
        return false;
      }
      var s16 = u >> 16 & 32768;
      const exp = u >> 23 & 255;
      const mant = u & 8388607;
      if (exp >= 113 && exp <= 142) {
        s16 += (exp - 112 << 10) + (mant >> 13);
      } else if (exp >= 103 && exp < 113) {
        if (mant & (1 << 126 - exp) - 1) {
          return false;
        }
        s16 += mant + 8388608 >> 126 - exp;
      } else {
        return false;
      }
      buf.writeUInt16BE(s16, 0);
      return true;
    };
    exports.keySorter = function(a, b) {
      var lenA = a[0].byteLength;
      var lenB = b[0].byteLength;
      if (lenA > lenB) {
        return 1;
      }
      if (lenB > lenA) {
        return -1;
      }
      return a[0].compare(b[0]);
    };
    exports.isNegativeZero = (x) => {
      return x === 0 && 1 / x < 0;
    };
    exports.nextPowerOf2 = (n) => {
      let count = 0;
      if (n && !(n & n - 1)) {
        return n;
      }
      while (n !== 0) {
        n >>= 1;
        count += 1;
      }
      return 1 << count;
    };
  }
});

// node_modules/borc/src/simple.js
var require_simple = __commonJS({
  "node_modules/borc/src/simple.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var MT = constants.MT;
    var SIMPLE = constants.SIMPLE;
    var SYMS = constants.SYMS;
    var Simple = class _Simple {
      /**
       * Creates an instance of Simple.
       *
       * @param {integer} value - the simple value's integer value
       */
      constructor(value3) {
        if (typeof value3 !== "number") {
          throw new Error("Invalid Simple type: " + typeof value3);
        }
        if (value3 < 0 || value3 > 255 || (value3 | 0) !== value3) {
          throw new Error("value must be a small positive integer: " + value3);
        }
        this.value = value3;
      }
      /**
       * Debug string for simple value
       *
       * @returns {string} simple(value)
       */
      toString() {
        return "simple(" + this.value + ")";
      }
      /**
       * Debug string for simple value
       *
       * @returns {string} simple(value)
       */
      inspect() {
        return "simple(" + this.value + ")";
      }
      /**
       * Push the simple value onto the CBOR stream
       *
       * @param {cbor.Encoder} gen The generator to push onto
       * @returns {number}
       */
      encodeCBOR(gen) {
        return gen._pushInt(this.value, MT.SIMPLE_FLOAT);
      }
      /**
       * Is the given object a Simple?
       *
       * @param {any} obj - object to test
       * @returns {bool} - is it Simple?
       */
      static isSimple(obj) {
        return obj instanceof _Simple;
      }
      /**
       * Decode from the CBOR additional information into a JavaScript value.
       * If the CBOR item has no parent, return a "safe" symbol instead of
       * `null` or `undefined`, so that the value can be passed through a
       * stream in object mode.
       *
       * @param {Number} val - the CBOR additional info to convert
       * @param {bool} hasParent - Does the CBOR item have a parent?
       * @returns {(null|undefined|Boolean|Symbol)} - the decoded value
       */
      static decode(val, hasParent) {
        if (hasParent == null) {
          hasParent = true;
        }
        switch (val) {
          case SIMPLE.FALSE:
            return false;
          case SIMPLE.TRUE:
            return true;
          case SIMPLE.NULL:
            if (hasParent) {
              return null;
            } else {
              return SYMS.NULL;
            }
          case SIMPLE.UNDEFINED:
            if (hasParent) {
              return void 0;
            } else {
              return SYMS.UNDEFINED;
            }
          case -1:
            if (!hasParent) {
              throw new Error("Invalid BREAK");
            }
            return SYMS.BREAK;
          default:
            return new _Simple(val);
        }
      }
    };
    module.exports = Simple;
  }
});

// node_modules/borc/src/tagged.js
var require_tagged = __commonJS({
  "node_modules/borc/src/tagged.js"(exports, module) {
    "use strict";
    var Tagged = class _Tagged {
      /**
       * Creates an instance of Tagged.
       *
       * @param {Number} tag - the number of the tag
       * @param {any} value - the value inside the tag
       * @param {Error} err - the error that was thrown parsing the tag, or null
       */
      constructor(tag, value3, err) {
        this.tag = tag;
        this.value = value3;
        this.err = err;
        if (typeof this.tag !== "number") {
          throw new Error("Invalid tag type (" + typeof this.tag + ")");
        }
        if (this.tag < 0 || (this.tag | 0) !== this.tag) {
          throw new Error("Tag must be a positive integer: " + this.tag);
        }
      }
      /**
       * Convert to a String
       *
       * @returns {String} string of the form '1(2)'
       */
      toString() {
        return `${this.tag}(${JSON.stringify(this.value)})`;
      }
      /**
       * Push the simple value onto the CBOR stream
       *
       * @param {cbor.Encoder} gen The generator to push onto
       * @returns {number}
       */
      encodeCBOR(gen) {
        gen._pushTag(this.tag);
        return gen.pushAny(this.value);
      }
      /**
       * If we have a converter for this type, do the conversion.  Some converters
       * are built-in.  Additional ones can be passed in.  If you want to remove
       * a built-in converter, pass a converter in whose value is 'null' instead
       * of a function.
       *
       * @param {Object} converters - keys in the object are a tag number, the value
       *   is a function that takes the decoded CBOR and returns a JavaScript value
       *   of the appropriate type.  Throw an exception in the function on errors.
       * @returns {any} - the converted item
       */
      convert(converters) {
        var er, f;
        f = converters != null ? converters[this.tag] : void 0;
        if (typeof f !== "function") {
          f = _Tagged["_tag" + this.tag];
          if (typeof f !== "function") {
            return this;
          }
        }
        try {
          return f.call(_Tagged, this.value);
        } catch (error) {
          er = error;
          this.err = er;
          return this;
        }
      }
    };
    module.exports = Tagged;
  }
});

// node_modules/iso-url/src/url-browser.js
var require_url_browser = __commonJS({
  "node_modules/iso-url/src/url-browser.js"(exports, module) {
    "use strict";
    var defaultBase = self.location ? self.location.protocol + "//" + self.location.host : "";
    var URL2 = self.URL;
    var URLWithLegacySupport = class {
      constructor(url = "", base = defaultBase) {
        this.super = new URL2(url, base);
        this.path = this.pathname + this.search;
        this.auth = this.username && this.password ? this.username + ":" + this.password : null;
        this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null;
      }
      get hash() {
        return this.super.hash;
      }
      get host() {
        return this.super.host;
      }
      get hostname() {
        return this.super.hostname;
      }
      get href() {
        return this.super.href;
      }
      get origin() {
        return this.super.origin;
      }
      get password() {
        return this.super.password;
      }
      get pathname() {
        return this.super.pathname;
      }
      get port() {
        return this.super.port;
      }
      get protocol() {
        return this.super.protocol;
      }
      get search() {
        return this.super.search;
      }
      get searchParams() {
        return this.super.searchParams;
      }
      get username() {
        return this.super.username;
      }
      set hash(hash2) {
        this.super.hash = hash2;
      }
      set host(host) {
        this.super.host = host;
      }
      set hostname(hostname) {
        this.super.hostname = hostname;
      }
      set href(href) {
        this.super.href = href;
      }
      set origin(origin) {
        this.super.origin = origin;
      }
      set password(password) {
        this.super.password = password;
      }
      set pathname(pathname) {
        this.super.pathname = pathname;
      }
      set port(port) {
        this.super.port = port;
      }
      set protocol(protocol) {
        this.super.protocol = protocol;
      }
      set search(search) {
        this.super.search = search;
      }
      set searchParams(searchParams) {
        this.super.searchParams = searchParams;
      }
      set username(username) {
        this.super.username = username;
      }
      createObjectURL(o) {
        return this.super.createObjectURL(o);
      }
      revokeObjectURL(o) {
        this.super.revokeObjectURL(o);
      }
      toJSON() {
        return this.super.toJSON();
      }
      toString() {
        return this.super.toString();
      }
      format() {
        return this.toString();
      }
    };
    function format(obj) {
      if (typeof obj === "string") {
        const url = new URL2(obj);
        return url.toString();
      }
      if (!(obj instanceof URL2)) {
        const userPass = obj.username && obj.password ? `${obj.username}:${obj.password}@` : "";
        const auth = obj.auth ? obj.auth + "@" : "";
        const port = obj.port ? ":" + obj.port : "";
        const protocol = obj.protocol ? obj.protocol + "//" : "";
        const host = obj.host || "";
        const hostname = obj.hostname || "";
        const search = obj.search || (obj.query ? "?" + obj.query : "");
        const hash2 = obj.hash || "";
        const pathname = obj.pathname || "";
        const path = obj.path || pathname + search;
        return `${protocol}${userPass || auth}${host || hostname + port}${path}${hash2}`;
      }
    }
    module.exports = {
      URLWithLegacySupport,
      URLSearchParams: self.URLSearchParams,
      defaultBase,
      format
    };
  }
});

// node_modules/iso-url/src/relative.js
var require_relative = __commonJS({
  "node_modules/iso-url/src/relative.js"(exports, module) {
    "use strict";
    var { URLWithLegacySupport, format } = require_url_browser();
    module.exports = (url, location = {}, protocolMap = {}, defaultProtocol) => {
      let protocol = location.protocol ? location.protocol.replace(":", "") : "http";
      protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ":";
      let urlParsed;
      try {
        urlParsed = new URLWithLegacySupport(url);
      } catch (err) {
        urlParsed = {};
      }
      const base = Object.assign({}, location, {
        protocol: protocol || urlParsed.protocol,
        host: location.host || urlParsed.host
      });
      return new URLWithLegacySupport(url, format(base)).toString();
    };
  }
});

// node_modules/iso-url/index.js
var require_iso_url = __commonJS({
  "node_modules/iso-url/index.js"(exports, module) {
    "use strict";
    var {
      URLWithLegacySupport,
      format,
      URLSearchParams,
      defaultBase
    } = require_url_browser();
    var relative = require_relative();
    module.exports = {
      URL: URLWithLegacySupport,
      URLSearchParams,
      format,
      relative,
      defaultBase
    };
  }
});

// node_modules/borc/src/decoder.js
var require_decoder = __commonJS({
  "node_modules/borc/src/decoder.js"(exports, module) {
    "use strict";
    var { Buffer: Buffer2 } = require_buffer();
    var ieee754 = require_ieee754();
    var Bignumber = require_bignumber().BigNumber;
    var parser = require_decoder_asm();
    var utils = require_utils();
    var c = require_constants();
    var Simple = require_simple();
    var Tagged = require_tagged();
    var { URL: URL2 } = require_iso_url();
    var Decoder = class _Decoder {
      /**
       * @param {Object} [opts={}]
       * @param {number} [opts.size=65536] - Size of the allocated heap.
       */
      constructor(opts) {
        opts = opts || {};
        if (!opts.size || opts.size < 65536) {
          opts.size = 65536;
        } else {
          opts.size = utils.nextPowerOf2(opts.size);
        }
        this._heap = new ArrayBuffer(opts.size);
        this._heap8 = new Uint8Array(this._heap);
        this._buffer = Buffer2.from(this._heap);
        this._reset();
        this._knownTags = Object.assign({
          0: (val) => new Date(val),
          1: (val) => new Date(val * 1e3),
          2: (val) => utils.arrayBufferToBignumber(val),
          3: (val) => c.NEG_ONE.minus(utils.arrayBufferToBignumber(val)),
          4: (v) => {
            return c.TEN.pow(v[0]).times(v[1]);
          },
          5: (v) => {
            return c.TWO.pow(v[0]).times(v[1]);
          },
          32: (val) => new URL2(val),
          35: (val) => new RegExp(val)
        }, opts.tags);
        this.parser = parser(global, {
          // eslint-disable-next-line no-console
          log: console.log.bind(console),
          pushInt: this.pushInt.bind(this),
          pushInt32: this.pushInt32.bind(this),
          pushInt32Neg: this.pushInt32Neg.bind(this),
          pushInt64: this.pushInt64.bind(this),
          pushInt64Neg: this.pushInt64Neg.bind(this),
          pushFloat: this.pushFloat.bind(this),
          pushFloatSingle: this.pushFloatSingle.bind(this),
          pushFloatDouble: this.pushFloatDouble.bind(this),
          pushTrue: this.pushTrue.bind(this),
          pushFalse: this.pushFalse.bind(this),
          pushUndefined: this.pushUndefined.bind(this),
          pushNull: this.pushNull.bind(this),
          pushInfinity: this.pushInfinity.bind(this),
          pushInfinityNeg: this.pushInfinityNeg.bind(this),
          pushNaN: this.pushNaN.bind(this),
          pushNaNNeg: this.pushNaNNeg.bind(this),
          pushArrayStart: this.pushArrayStart.bind(this),
          pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
          pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
          pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
          pushObjectStart: this.pushObjectStart.bind(this),
          pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
          pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
          pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
          pushByteString: this.pushByteString.bind(this),
          pushByteStringStart: this.pushByteStringStart.bind(this),
          pushUtf8String: this.pushUtf8String.bind(this),
          pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
          pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
          pushTagUnassigned: this.pushTagUnassigned.bind(this),
          pushTagStart: this.pushTagStart.bind(this),
          pushTagStart4: this.pushTagStart4.bind(this),
          pushTagStart8: this.pushTagStart8.bind(this),
          pushBreak: this.pushBreak.bind(this)
        }, this._heap);
      }
      get _depth() {
        return this._parents.length;
      }
      get _currentParent() {
        return this._parents[this._depth - 1];
      }
      get _ref() {
        return this._currentParent.ref;
      }
      // Finish the current parent
      _closeParent() {
        var p = this._parents.pop();
        if (p.length > 0) {
          throw new Error(`Missing ${p.length} elements`);
        }
        switch (p.type) {
          case c.PARENT.TAG:
            this._push(
              this.createTag(p.ref[0], p.ref[1])
            );
            break;
          case c.PARENT.BYTE_STRING:
            this._push(this.createByteString(p.ref, p.length));
            break;
          case c.PARENT.UTF8_STRING:
            this._push(this.createUtf8String(p.ref, p.length));
            break;
          case c.PARENT.MAP:
            if (p.values % 2 > 0) {
              throw new Error("Odd number of elements in the map");
            }
            this._push(this.createMap(p.ref, p.length));
            break;
          case c.PARENT.OBJECT:
            if (p.values % 2 > 0) {
              throw new Error("Odd number of elements in the map");
            }
            this._push(this.createObject(p.ref, p.length));
            break;
          case c.PARENT.ARRAY:
            this._push(this.createArray(p.ref, p.length));
            break;
          default:
            break;
        }
        if (this._currentParent && this._currentParent.type === c.PARENT.TAG) {
          this._dec();
        }
      }
      // Reduce the expected length of the current parent by one
      _dec() {
        const p = this._currentParent;
        if (p.length < 0) {
          return;
        }
        p.length--;
        if (p.length === 0) {
          this._closeParent();
        }
      }
      // Push any value to the current parent
      _push(val, hasChildren) {
        const p = this._currentParent;
        p.values++;
        switch (p.type) {
          case c.PARENT.ARRAY:
          case c.PARENT.BYTE_STRING:
          case c.PARENT.UTF8_STRING:
            if (p.length > -1) {
              this._ref[this._ref.length - p.length] = val;
            } else {
              this._ref.push(val);
            }
            this._dec();
            break;
          case c.PARENT.OBJECT:
            if (p.tmpKey != null) {
              this._ref[p.tmpKey] = val;
              p.tmpKey = null;
              this._dec();
            } else {
              p.tmpKey = val;
              if (typeof p.tmpKey !== "string") {
                p.type = c.PARENT.MAP;
                p.ref = utils.buildMap(p.ref);
              }
            }
            break;
          case c.PARENT.MAP:
            if (p.tmpKey != null) {
              this._ref.set(p.tmpKey, val);
              p.tmpKey = null;
              this._dec();
            } else {
              p.tmpKey = val;
            }
            break;
          case c.PARENT.TAG:
            this._ref.push(val);
            if (!hasChildren) {
              this._dec();
            }
            break;
          default:
            throw new Error("Unknown parent type");
        }
      }
      // Create a new parent in the parents list
      _createParent(obj, type, len) {
        this._parents[this._depth] = {
          type,
          length: len,
          ref: obj,
          values: 0,
          tmpKey: null
        };
      }
      // Reset all state back to the beginning, also used for initiatlization
      _reset() {
        this._res = [];
        this._parents = [{
          type: c.PARENT.ARRAY,
          length: -1,
          ref: this._res,
          values: 0,
          tmpKey: null
        }];
      }
      // -- Interface to customize deoding behaviour
      createTag(tagNumber, value3) {
        const typ = this._knownTags[tagNumber];
        if (!typ) {
          return new Tagged(tagNumber, value3);
        }
        return typ(value3);
      }
      createMap(obj, len) {
        return obj;
      }
      createObject(obj, len) {
        return obj;
      }
      createArray(arr, len) {
        return arr;
      }
      createByteString(raw, len) {
        return Buffer2.concat(raw);
      }
      createByteStringFromHeap(start, end) {
        if (start === end) {
          return Buffer2.alloc(0);
        }
        return Buffer2.from(this._heap.slice(start, end));
      }
      createInt(val) {
        return val;
      }
      createInt32(f, g) {
        return utils.buildInt32(f, g);
      }
      createInt64(f1, f2, g1, g2) {
        return utils.buildInt64(f1, f2, g1, g2);
      }
      createFloat(val) {
        return val;
      }
      createFloatSingle(a, b, c2, d) {
        return ieee754.read([a, b, c2, d], 0, false, 23, 4);
      }
      createFloatDouble(a, b, c2, d, e, f, g, h) {
        return ieee754.read([a, b, c2, d, e, f, g, h], 0, false, 52, 8);
      }
      createInt32Neg(f, g) {
        return -1 - utils.buildInt32(f, g);
      }
      createInt64Neg(f1, f2, g1, g2) {
        const f = utils.buildInt32(f1, f2);
        const g = utils.buildInt32(g1, g2);
        if (f > c.MAX_SAFE_HIGH) {
          return c.NEG_ONE.minus(new Bignumber(f).times(c.SHIFT32).plus(g));
        }
        return -1 - (f * c.SHIFT32 + g);
      }
      createTrue() {
        return true;
      }
      createFalse() {
        return false;
      }
      createNull() {
        return null;
      }
      createUndefined() {
        return void 0;
      }
      createInfinity() {
        return Infinity;
      }
      createInfinityNeg() {
        return -Infinity;
      }
      createNaN() {
        return NaN;
      }
      createNaNNeg() {
        return NaN;
      }
      createUtf8String(raw, len) {
        return raw.join("");
      }
      createUtf8StringFromHeap(start, end) {
        if (start === end) {
          return "";
        }
        return this._buffer.toString("utf8", start, end);
      }
      createSimpleUnassigned(val) {
        return new Simple(val);
      }
      // -- Interface for decoder.asm.js
      pushInt(val) {
        this._push(this.createInt(val));
      }
      pushInt32(f, g) {
        this._push(this.createInt32(f, g));
      }
      pushInt64(f1, f2, g1, g2) {
        this._push(this.createInt64(f1, f2, g1, g2));
      }
      pushFloat(val) {
        this._push(this.createFloat(val));
      }
      pushFloatSingle(a, b, c2, d) {
        this._push(this.createFloatSingle(a, b, c2, d));
      }
      pushFloatDouble(a, b, c2, d, e, f, g, h) {
        this._push(this.createFloatDouble(a, b, c2, d, e, f, g, h));
      }
      pushInt32Neg(f, g) {
        this._push(this.createInt32Neg(f, g));
      }
      pushInt64Neg(f1, f2, g1, g2) {
        this._push(this.createInt64Neg(f1, f2, g1, g2));
      }
      pushTrue() {
        this._push(this.createTrue());
      }
      pushFalse() {
        this._push(this.createFalse());
      }
      pushNull() {
        this._push(this.createNull());
      }
      pushUndefined() {
        this._push(this.createUndefined());
      }
      pushInfinity() {
        this._push(this.createInfinity());
      }
      pushInfinityNeg() {
        this._push(this.createInfinityNeg());
      }
      pushNaN() {
        this._push(this.createNaN());
      }
      pushNaNNeg() {
        this._push(this.createNaNNeg());
      }
      pushArrayStart() {
        this._createParent([], c.PARENT.ARRAY, -1);
      }
      pushArrayStartFixed(len) {
        this._createArrayStartFixed(len);
      }
      pushArrayStartFixed32(len1, len2) {
        const len = utils.buildInt32(len1, len2);
        this._createArrayStartFixed(len);
      }
      pushArrayStartFixed64(len1, len2, len3, len4) {
        const len = utils.buildInt64(len1, len2, len3, len4);
        this._createArrayStartFixed(len);
      }
      pushObjectStart() {
        this._createObjectStartFixed(-1);
      }
      pushObjectStartFixed(len) {
        this._createObjectStartFixed(len);
      }
      pushObjectStartFixed32(len1, len2) {
        const len = utils.buildInt32(len1, len2);
        this._createObjectStartFixed(len);
      }
      pushObjectStartFixed64(len1, len2, len3, len4) {
        const len = utils.buildInt64(len1, len2, len3, len4);
        this._createObjectStartFixed(len);
      }
      pushByteStringStart() {
        this._parents[this._depth] = {
          type: c.PARENT.BYTE_STRING,
          length: -1,
          ref: [],
          values: 0,
          tmpKey: null
        };
      }
      pushByteString(start, end) {
        this._push(this.createByteStringFromHeap(start, end));
      }
      pushUtf8StringStart() {
        this._parents[this._depth] = {
          type: c.PARENT.UTF8_STRING,
          length: -1,
          ref: [],
          values: 0,
          tmpKey: null
        };
      }
      pushUtf8String(start, end) {
        this._push(this.createUtf8StringFromHeap(start, end));
      }
      pushSimpleUnassigned(val) {
        this._push(this.createSimpleUnassigned(val));
      }
      pushTagStart(tag) {
        this._parents[this._depth] = {
          type: c.PARENT.TAG,
          length: 1,
          ref: [tag]
        };
      }
      pushTagStart4(f, g) {
        this.pushTagStart(utils.buildInt32(f, g));
      }
      pushTagStart8(f1, f2, g1, g2) {
        this.pushTagStart(utils.buildInt64(f1, f2, g1, g2));
      }
      pushTagUnassigned(tagNumber) {
        this._push(this.createTag(tagNumber));
      }
      pushBreak() {
        if (this._currentParent.length > -1) {
          throw new Error("Unexpected break");
        }
        this._closeParent();
      }
      _createObjectStartFixed(len) {
        if (len === 0) {
          this._push(this.createObject({}));
          return;
        }
        this._createParent({}, c.PARENT.OBJECT, len);
      }
      _createArrayStartFixed(len) {
        if (len === 0) {
          this._push(this.createArray([]));
          return;
        }
        this._createParent(new Array(len), c.PARENT.ARRAY, len);
      }
      _decode(input) {
        if (input.byteLength === 0) {
          throw new Error("Input too short");
        }
        this._reset();
        this._heap8.set(input);
        const code = this.parser.parse(input.byteLength);
        if (this._depth > 1) {
          while (this._currentParent.length === 0) {
            this._closeParent();
          }
          if (this._depth > 1) {
            throw new Error("Undeterminated nesting");
          }
        }
        if (code > 0) {
          throw new Error("Failed to parse");
        }
        if (this._res.length === 0) {
          throw new Error("No valid result");
        }
      }
      // -- Public Interface
      decodeFirst(input) {
        this._decode(input);
        return this._res[0];
      }
      decodeAll(input) {
        this._decode(input);
        return this._res;
      }
      /**
       * Decode the first cbor object.
       *
       * @param {Buffer|string} input
       * @param {string} [enc='hex'] - Encoding used if a string is passed.
       * @returns {*}
       */
      static decode(input, enc) {
        if (typeof input === "string") {
          input = Buffer2.from(input, enc || "hex");
        }
        const dec = new _Decoder({ size: input.length });
        return dec.decodeFirst(input);
      }
      /**
       * Decode all cbor objects.
       *
       * @param {Buffer|string} input
       * @param {string} [enc='hex'] - Encoding used if a string is passed.
       * @returns {Array<*>}
       */
      static decodeAll(input, enc) {
        if (typeof input === "string") {
          input = Buffer2.from(input, enc || "hex");
        }
        const dec = new _Decoder({ size: input.length });
        return dec.decodeAll(input);
      }
    };
    Decoder.decodeFirst = Decoder.decode;
    module.exports = Decoder;
  }
});

// node_modules/borc/src/diagnose.js
var require_diagnose = __commonJS({
  "node_modules/borc/src/diagnose.js"(exports, module) {
    "use strict";
    var { Buffer: Buffer2 } = require_buffer();
    var Decoder = require_decoder();
    var utils = require_utils();
    var Diagnose = class _Diagnose extends Decoder {
      createTag(tagNumber, value3) {
        return `${tagNumber}(${value3})`;
      }
      createInt(val) {
        return super.createInt(val).toString();
      }
      createInt32(f, g) {
        return super.createInt32(f, g).toString();
      }
      createInt64(f1, f2, g1, g2) {
        return super.createInt64(f1, f2, g1, g2).toString();
      }
      createInt32Neg(f, g) {
        return super.createInt32Neg(f, g).toString();
      }
      createInt64Neg(f1, f2, g1, g2) {
        return super.createInt64Neg(f1, f2, g1, g2).toString();
      }
      createTrue() {
        return "true";
      }
      createFalse() {
        return "false";
      }
      createFloat(val) {
        const fl = super.createFloat(val);
        if (utils.isNegativeZero(val)) {
          return "-0_1";
        }
        return `${fl}_1`;
      }
      createFloatSingle(a, b, c, d) {
        const fl = super.createFloatSingle(a, b, c, d);
        return `${fl}_2`;
      }
      createFloatDouble(a, b, c, d, e, f, g, h) {
        const fl = super.createFloatDouble(a, b, c, d, e, f, g, h);
        return `${fl}_3`;
      }
      createByteString(raw, len) {
        const val = raw.join(", ");
        if (len === -1) {
          return `(_ ${val})`;
        }
        return `h'${val}`;
      }
      createByteStringFromHeap(start, end) {
        const val = Buffer2.from(
          super.createByteStringFromHeap(start, end)
        ).toString("hex");
        return `h'${val}'`;
      }
      createInfinity() {
        return "Infinity_1";
      }
      createInfinityNeg() {
        return "-Infinity_1";
      }
      createNaN() {
        return "NaN_1";
      }
      createNaNNeg() {
        return "-NaN_1";
      }
      createNull() {
        return "null";
      }
      createUndefined() {
        return "undefined";
      }
      createSimpleUnassigned(val) {
        return `simple(${val})`;
      }
      createArray(arr, len) {
        const val = super.createArray(arr, len);
        if (len === -1) {
          return `[_ ${val.join(", ")}]`;
        }
        return `[${val.join(", ")}]`;
      }
      createMap(map, len) {
        const val = super.createMap(map);
        const list = Array.from(val.keys()).reduce(collectObject(val), "");
        if (len === -1) {
          return `{_ ${list}}`;
        }
        return `{${list}}`;
      }
      createObject(obj, len) {
        const val = super.createObject(obj);
        const map = Object.keys(val).reduce(collectObject(val), "");
        if (len === -1) {
          return `{_ ${map}}`;
        }
        return `{${map}}`;
      }
      createUtf8String(raw, len) {
        const val = raw.join(", ");
        if (len === -1) {
          return `(_ ${val})`;
        }
        return `"${val}"`;
      }
      createUtf8StringFromHeap(start, end) {
        const val = Buffer2.from(
          super.createUtf8StringFromHeap(start, end)
        ).toString("utf8");
        return `"${val}"`;
      }
      static diagnose(input, enc) {
        if (typeof input === "string") {
          input = Buffer2.from(input, enc || "hex");
        }
        const dec = new _Diagnose();
        return dec.decodeFirst(input);
      }
    };
    module.exports = Diagnose;
    function collectObject(val) {
      return (acc, key) => {
        if (acc) {
          return `${acc}, ${key}: ${val[key]}`;
        }
        return `${key}: ${val[key]}`;
      };
    }
  }
});

// node_modules/borc/src/encoder.js
var require_encoder = __commonJS({
  "node_modules/borc/src/encoder.js"(exports, module) {
    "use strict";
    var { Buffer: Buffer2 } = require_buffer();
    var { URL: URL2 } = require_iso_url();
    var Bignumber = require_bignumber().BigNumber;
    var utils = require_utils();
    var constants = require_constants();
    var MT = constants.MT;
    var NUMBYTES = constants.NUMBYTES;
    var SHIFT32 = constants.SHIFT32;
    var SYMS = constants.SYMS;
    var TAG = constants.TAG;
    var HALF = constants.MT.SIMPLE_FLOAT << 5 | constants.NUMBYTES.TWO;
    var FLOAT = constants.MT.SIMPLE_FLOAT << 5 | constants.NUMBYTES.FOUR;
    var DOUBLE = constants.MT.SIMPLE_FLOAT << 5 | constants.NUMBYTES.EIGHT;
    var TRUE = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.TRUE;
    var FALSE = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.FALSE;
    var UNDEFINED = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.UNDEFINED;
    var NULL = constants.MT.SIMPLE_FLOAT << 5 | constants.SIMPLE.NULL;
    var MAXINT_BN = new Bignumber("0x20000000000000");
    var BUF_NAN = Buffer2.from("f97e00", "hex");
    var BUF_INF_NEG = Buffer2.from("f9fc00", "hex");
    var BUF_INF_POS = Buffer2.from("f97c00", "hex");
    function toType(obj) {
      return {}.toString.call(obj).slice(8, -1);
    }
    var Encoder = class _Encoder {
      /**
       * @param {Object} [options={}]
       * @param {function(Buffer)} options.stream
       */
      constructor(options) {
        options = options || {};
        this.streaming = typeof options.stream === "function";
        this.onData = options.stream;
        this.semanticTypes = [
          [URL2, this._pushUrl],
          [Bignumber, this._pushBigNumber]
        ];
        const addTypes = options.genTypes || [];
        const len = addTypes.length;
        for (let i = 0; i < len; i++) {
          this.addSemanticType(
            addTypes[i][0],
            addTypes[i][1]
          );
        }
        this._reset();
      }
      addSemanticType(type, fun) {
        const len = this.semanticTypes.length;
        for (let i = 0; i < len; i++) {
          const typ = this.semanticTypes[i][0];
          if (typ === type) {
            const old = this.semanticTypes[i][1];
            this.semanticTypes[i][1] = fun;
            return old;
          }
        }
        this.semanticTypes.push([type, fun]);
        return null;
      }
      push(val) {
        if (!val) {
          return true;
        }
        this.result[this.offset] = val;
        this.resultMethod[this.offset] = 0;
        this.resultLength[this.offset] = val.length;
        this.offset++;
        if (this.streaming) {
          this.onData(this.finalize());
        }
        return true;
      }
      pushWrite(val, method, len) {
        this.result[this.offset] = val;
        this.resultMethod[this.offset] = method;
        this.resultLength[this.offset] = len;
        this.offset++;
        if (this.streaming) {
          this.onData(this.finalize());
        }
        return true;
      }
      _pushUInt8(val) {
        return this.pushWrite(val, 1, 1);
      }
      _pushUInt16BE(val) {
        return this.pushWrite(val, 2, 2);
      }
      _pushUInt32BE(val) {
        return this.pushWrite(val, 3, 4);
      }
      _pushDoubleBE(val) {
        return this.pushWrite(val, 4, 8);
      }
      _pushNaN() {
        return this.push(BUF_NAN);
      }
      _pushInfinity(obj) {
        const half = obj < 0 ? BUF_INF_NEG : BUF_INF_POS;
        return this.push(half);
      }
      _pushFloat(obj) {
        const b2 = Buffer2.allocUnsafe(2);
        if (utils.writeHalf(b2, obj)) {
          if (utils.parseHalf(b2) === obj) {
            return this._pushUInt8(HALF) && this.push(b2);
          }
        }
        const b4 = Buffer2.allocUnsafe(4);
        b4.writeFloatBE(obj, 0);
        if (b4.readFloatBE(0) === obj) {
          return this._pushUInt8(FLOAT) && this.push(b4);
        }
        return this._pushUInt8(DOUBLE) && this._pushDoubleBE(obj);
      }
      _pushInt(obj, mt, orig) {
        const m = mt << 5;
        if (obj < 24) {
          return this._pushUInt8(m | obj);
        }
        if (obj <= 255) {
          return this._pushUInt8(m | NUMBYTES.ONE) && this._pushUInt8(obj);
        }
        if (obj <= 65535) {
          return this._pushUInt8(m | NUMBYTES.TWO) && this._pushUInt16BE(obj);
        }
        if (obj <= 4294967295) {
          return this._pushUInt8(m | NUMBYTES.FOUR) && this._pushUInt32BE(obj);
        }
        if (obj <= Number.MAX_SAFE_INTEGER) {
          return this._pushUInt8(m | NUMBYTES.EIGHT) && this._pushUInt32BE(Math.floor(obj / SHIFT32)) && this._pushUInt32BE(obj % SHIFT32);
        }
        if (mt === MT.NEG_INT) {
          return this._pushFloat(orig);
        }
        return this._pushFloat(obj);
      }
      _pushIntNum(obj) {
        if (obj < 0) {
          return this._pushInt(-obj - 1, MT.NEG_INT, obj);
        } else {
          return this._pushInt(obj, MT.POS_INT);
        }
      }
      _pushNumber(obj) {
        switch (false) {
          case obj === obj:
            return this._pushNaN(obj);
          case isFinite(obj):
            return this._pushInfinity(obj);
          case obj % 1 !== 0:
            return this._pushIntNum(obj);
          default:
            return this._pushFloat(obj);
        }
      }
      _pushString(obj) {
        const len = Buffer2.byteLength(obj, "utf8");
        return this._pushInt(len, MT.UTF8_STRING) && this.pushWrite(obj, 5, len);
      }
      _pushBoolean(obj) {
        return this._pushUInt8(obj ? TRUE : FALSE);
      }
      _pushUndefined(obj) {
        return this._pushUInt8(UNDEFINED);
      }
      _pushArray(gen, obj) {
        const len = obj.length;
        if (!gen._pushInt(len, MT.ARRAY)) {
          return false;
        }
        for (let j = 0; j < len; j++) {
          if (!gen.pushAny(obj[j])) {
            return false;
          }
        }
        return true;
      }
      _pushTag(tag) {
        return this._pushInt(tag, MT.TAG);
      }
      _pushDate(gen, obj) {
        return gen._pushTag(TAG.DATE_EPOCH) && gen.pushAny(Math.round(obj / 1e3));
      }
      _pushBuffer(gen, obj) {
        return gen._pushInt(obj.length, MT.BYTE_STRING) && gen.push(obj);
      }
      _pushNoFilter(gen, obj) {
        return gen._pushBuffer(gen, obj.slice());
      }
      _pushRegexp(gen, obj) {
        return gen._pushTag(TAG.REGEXP) && gen.pushAny(obj.source);
      }
      _pushSet(gen, obj) {
        if (!gen._pushInt(obj.size, MT.ARRAY)) {
          return false;
        }
        for (const x of obj) {
          if (!gen.pushAny(x)) {
            return false;
          }
        }
        return true;
      }
      _pushUrl(gen, obj) {
        return gen._pushTag(TAG.URI) && gen.pushAny(obj.format());
      }
      _pushBigint(obj) {
        let tag = TAG.POS_BIGINT;
        if (obj.isNegative()) {
          obj = obj.negated().minus(1);
          tag = TAG.NEG_BIGINT;
        }
        let str = obj.toString(16);
        if (str.length % 2) {
          str = "0" + str;
        }
        const buf = Buffer2.from(str, "hex");
        return this._pushTag(tag) && this._pushBuffer(this, buf);
      }
      _pushBigNumber(gen, obj) {
        if (obj.isNaN()) {
          return gen._pushNaN();
        }
        if (!obj.isFinite()) {
          return gen._pushInfinity(obj.isNegative() ? -Infinity : Infinity);
        }
        if (obj.isInteger()) {
          return gen._pushBigint(obj);
        }
        if (!(gen._pushTag(TAG.DECIMAL_FRAC) && gen._pushInt(2, MT.ARRAY))) {
          return false;
        }
        const dec = obj.decimalPlaces();
        const slide = obj.multipliedBy(new Bignumber(10).pow(dec));
        if (!gen._pushIntNum(-dec)) {
          return false;
        }
        if (slide.abs().isLessThan(MAXINT_BN)) {
          return gen._pushIntNum(slide.toNumber());
        } else {
          return gen._pushBigint(slide);
        }
      }
      _pushMap(gen, obj) {
        if (!gen._pushInt(obj.size, MT.MAP)) {
          return false;
        }
        return this._pushRawMap(
          obj.size,
          Array.from(obj)
        );
      }
      _pushObject(obj) {
        if (!obj) {
          return this._pushUInt8(NULL);
        }
        var len = this.semanticTypes.length;
        for (var i = 0; i < len; i++) {
          if (obj instanceof this.semanticTypes[i][0]) {
            return this.semanticTypes[i][1].call(obj, this, obj);
          }
        }
        var f = obj.encodeCBOR;
        if (typeof f === "function") {
          return f.call(obj, this);
        }
        var keys = Object.keys(obj);
        var keyLength = keys.length;
        if (!this._pushInt(keyLength, MT.MAP)) {
          return false;
        }
        return this._pushRawMap(
          keyLength,
          keys.map((k) => [k, obj[k]])
        );
      }
      _pushRawMap(len, map) {
        map = map.map(function(a) {
          a[0] = _Encoder.encode(a[0]);
          return a;
        }).sort(utils.keySorter);
        for (var j = 0; j < len; j++) {
          if (!this.push(map[j][0])) {
            return false;
          }
          if (!this.pushAny(map[j][1])) {
            return false;
          }
        }
        return true;
      }
      /**
       * Alias for `.pushAny`
       *
       * @param {*} obj
       * @returns {boolean} true on success
       */
      write(obj) {
        return this.pushAny(obj);
      }
      /**
       * Push any supported type onto the encoded stream
       *
       * @param {any} obj
       * @returns {boolean} true on success
       */
      pushAny(obj) {
        var typ = toType(obj);
        switch (typ) {
          case "Number":
            return this._pushNumber(obj);
          case "String":
            return this._pushString(obj);
          case "Boolean":
            return this._pushBoolean(obj);
          case "Object":
            return this._pushObject(obj);
          case "Array":
            return this._pushArray(this, obj);
          case "Uint8Array":
            return this._pushBuffer(this, Buffer2.isBuffer(obj) ? obj : Buffer2.from(obj));
          case "Null":
            return this._pushUInt8(NULL);
          case "Undefined":
            return this._pushUndefined(obj);
          case "Map":
            return this._pushMap(this, obj);
          case "Set":
            return this._pushSet(this, obj);
          case "URL":
            return this._pushUrl(this, obj);
          case "BigNumber":
            return this._pushBigNumber(this, obj);
          case "Date":
            return this._pushDate(this, obj);
          case "RegExp":
            return this._pushRegexp(this, obj);
          case "Symbol":
            switch (obj) {
              case SYMS.NULL:
                return this._pushObject(null);
              case SYMS.UNDEFINED:
                return this._pushUndefined(void 0);
              default:
                throw new Error("Unknown symbol: " + obj.toString());
            }
          default:
            throw new Error("Unknown type: " + typeof obj + ", " + (obj ? obj.toString() : ""));
        }
      }
      finalize() {
        if (this.offset === 0) {
          return null;
        }
        var result = this.result;
        var resultLength = this.resultLength;
        var resultMethod = this.resultMethod;
        var offset = this.offset;
        var size = 0;
        var i = 0;
        for (; i < offset; i++) {
          size += resultLength[i];
        }
        var res = Buffer2.allocUnsafe(size);
        var index = 0;
        var length = 0;
        for (i = 0; i < offset; i++) {
          length = resultLength[i];
          switch (resultMethod[i]) {
            case 0:
              result[i].copy(res, index);
              break;
            case 1:
              res.writeUInt8(result[i], index, true);
              break;
            case 2:
              res.writeUInt16BE(result[i], index, true);
              break;
            case 3:
              res.writeUInt32BE(result[i], index, true);
              break;
            case 4:
              res.writeDoubleBE(result[i], index, true);
              break;
            case 5:
              res.write(result[i], index, length, "utf8");
              break;
            default:
              throw new Error("unkown method");
          }
          index += length;
        }
        var tmp = res;
        this._reset();
        return tmp;
      }
      _reset() {
        this.result = [];
        this.resultMethod = [];
        this.resultLength = [];
        this.offset = 0;
      }
      /**
       * Encode the given value
       * @param {*} o
       * @returns {Buffer}
       */
      static encode(o) {
        const enc = new _Encoder();
        const ret = enc.pushAny(o);
        if (!ret) {
          throw new Error("Failed to encode input");
        }
        return enc.finalize();
      }
    };
    module.exports = Encoder;
  }
});

// node_modules/borc/src/index.js
var require_src = __commonJS({
  "node_modules/borc/src/index.js"(exports) {
    "use strict";
    exports.Diagnose = require_diagnose();
    exports.Decoder = require_decoder();
    exports.Encoder = require_encoder();
    exports.Simple = require_simple();
    exports.Tagged = require_tagged();
    exports.decodeAll = exports.Decoder.decodeAll;
    exports.decodeFirst = exports.Decoder.decodeFirst;
    exports.diagnose = exports.Diagnose.diagnose;
    exports.encode = exports.Encoder.encode;
    exports.decode = exports.Decoder.decode;
    exports.leveldb = {
      decode: exports.Decoder.decodeAll,
      encode: exports.Encoder.encode,
      buffer: true,
      name: "cbor"
    };
  }
});

// node_modules/simple-cbor/src/value.js
var require_value = __commonJS({
  "node_modules/simple-cbor/src/value.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MAX_U64_NUMBER = 9007199254740992;
    function _concat(a, ...args) {
      const newBuffer = new Uint8Array(a.byteLength + args.reduce((acc, b) => acc + b.byteLength, 0));
      newBuffer.set(new Uint8Array(a), 0);
      let i = a.byteLength;
      for (const b of args) {
        newBuffer.set(new Uint8Array(b), i);
        i += b.byteLength;
      }
      return newBuffer.buffer;
    }
    function _serializeValue(major, minor, value3) {
      value3 = value3.replace(/[^0-9a-fA-F]/g, "");
      const length = 2 ** (minor - 24);
      value3 = value3.slice(-length * 2).padStart(length * 2, "0");
      const bytes2 = [(major << 5) + minor].concat(value3.match(/../g).map((byte) => parseInt(byte, 16)));
      return new Uint8Array(bytes2).buffer;
    }
    function _serializeNumber(major, value3) {
      if (value3 < 24) {
        return new Uint8Array([(major << 5) + value3]).buffer;
      } else {
        const minor = value3 <= 255 ? 24 : value3 <= 65535 ? 25 : value3 <= 4294967295 ? 26 : 27;
        return _serializeValue(major, minor, value3.toString(16));
      }
    }
    function _serializeString(str) {
      const utf8 = [];
      for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 128) {
          utf8.push(charcode);
        } else if (charcode < 2048) {
          utf8.push(192 | charcode >> 6, 128 | charcode & 63);
        } else if (charcode < 55296 || charcode >= 57344) {
          utf8.push(224 | charcode >> 12, 128 | charcode >> 6 & 63, 128 | charcode & 63);
        } else {
          i++;
          charcode = (charcode & 1023) << 10 | str.charCodeAt(i) & 1023;
          utf8.push(240 | charcode >> 18, 128 | charcode >> 12 & 63, 128 | charcode >> 6 & 63, 128 | charcode & 63);
        }
      }
      return _concat(new Uint8Array(_serializeNumber(3, str.length)), new Uint8Array(utf8));
    }
    function tagged(tag, value3) {
      if (tag == 14277111) {
        return _concat(new Uint8Array([217, 217, 247]), value3);
      }
      if (tag < 24) {
        return _concat(new Uint8Array([(6 << 5) + tag]), value3);
      } else {
        const minor = tag <= 255 ? 24 : tag <= 65535 ? 25 : tag <= 4294967295 ? 26 : 27;
        const length = 2 ** (minor - 24);
        const value4 = tag.toString(16).slice(-length * 2).padStart(length * 2, "0");
        const bytes2 = [(6 << 5) + minor].concat(value4.match(/../g).map((byte) => parseInt(byte, 16)));
        return new Uint8Array(bytes2).buffer;
      }
    }
    exports.tagged = tagged;
    function raw(bytes2) {
      return new Uint8Array(bytes2).buffer;
    }
    exports.raw = raw;
    function uSmall(n) {
      if (isNaN(n)) {
        throw new RangeError("Invalid number.");
      }
      n = Math.min(Math.max(0, n), 23);
      const bytes2 = [(0 << 5) + n];
      return new Uint8Array(bytes2).buffer;
    }
    exports.uSmall = uSmall;
    function u8(u82, radix) {
      u82 = parseInt("" + u82, radix);
      if (isNaN(u82)) {
        throw new RangeError("Invalid number.");
      }
      u82 = Math.min(Math.max(0, u82), 255);
      u82 = u82.toString(16);
      return _serializeValue(0, 24, u82);
    }
    exports.u8 = u8;
    function u16(u162, radix) {
      u162 = parseInt("" + u162, radix);
      if (isNaN(u162)) {
        throw new RangeError("Invalid number.");
      }
      u162 = Math.min(Math.max(0, u162), 65535);
      u162 = u162.toString(16);
      return _serializeValue(0, 25, u162);
    }
    exports.u16 = u16;
    function u32(u322, radix) {
      u322 = parseInt("" + u322, radix);
      if (isNaN(u322)) {
        throw new RangeError("Invalid number.");
      }
      u322 = Math.min(Math.max(0, u322), 4294967295);
      u322 = u322.toString(16);
      return _serializeValue(0, 26, u322);
    }
    exports.u32 = u32;
    function u64(u642, radix) {
      if (typeof u642 == "string" && radix == 16) {
        if (u642.match(/[^0-9a-fA-F]/)) {
          throw new RangeError("Invalid number.");
        }
        return _serializeValue(0, 27, u642);
      }
      u642 = parseInt("" + u642, radix);
      if (isNaN(u642)) {
        throw new RangeError("Invalid number.");
      }
      u642 = Math.min(Math.max(0, u642), MAX_U64_NUMBER);
      u642 = u642.toString(16);
      return _serializeValue(0, 27, u642);
    }
    exports.u64 = u64;
    function iSmall(n) {
      if (isNaN(n)) {
        throw new RangeError("Invalid number.");
      }
      if (n === 0) {
        return uSmall(0);
      }
      n = Math.min(Math.max(0, -n), 24) - 1;
      const bytes2 = [(1 << 5) + n];
      return new Uint8Array(bytes2).buffer;
    }
    exports.iSmall = iSmall;
    function i8(i82, radix) {
      i82 = parseInt("" + i82, radix);
      if (isNaN(i82)) {
        throw new RangeError("Invalid number.");
      }
      i82 = Math.min(Math.max(0, -i82 - 1), 255);
      i82 = i82.toString(16);
      return _serializeValue(1, 24, i82);
    }
    exports.i8 = i8;
    function i16(i162, radix) {
      i162 = parseInt("" + i162, radix);
      if (isNaN(i162)) {
        throw new RangeError("Invalid number.");
      }
      i162 = Math.min(Math.max(0, -i162 - 1), 65535);
      i162 = i162.toString(16);
      return _serializeValue(1, 25, i162);
    }
    exports.i16 = i16;
    function i32(i322, radix) {
      i322 = parseInt("" + i322, radix);
      if (isNaN(i322)) {
        throw new RangeError("Invalid number.");
      }
      i322 = Math.min(Math.max(0, -i322 - 1), 4294967295);
      i322 = i322.toString(16);
      return _serializeValue(1, 26, i322);
    }
    exports.i32 = i32;
    function i64(i642, radix) {
      if (typeof i642 == "string" && radix == 16) {
        if (i642.startsWith("-")) {
          i642 = i642.slice(1);
        } else {
          i642 = "0";
        }
        if (i642.match(/[^0-9a-fA-F]/) || i642.length > 16) {
          throw new RangeError("Invalid number.");
        }
        let done = false;
        let newI64 = i642.split("").reduceRight((acc, x) => {
          if (done) {
            return x + acc;
          }
          let n = parseInt(x, 16) - 1;
          if (n >= 0) {
            done = true;
            return n.toString(16) + acc;
          } else {
            return "f" + acc;
          }
        }, "");
        if (!done) {
          return u64(0);
        }
        return _serializeValue(1, 27, newI64);
      }
      i642 = parseInt("" + i642, radix);
      if (isNaN(i642)) {
        throw new RangeError("Invalid number.");
      }
      i642 = Math.min(Math.max(0, -i642 - 1), 9007199254740992);
      i642 = i642.toString(16);
      return _serializeValue(1, 27, i642);
    }
    exports.i64 = i64;
    function number(n) {
      if (n >= 0) {
        if (n < 24) {
          return uSmall(n);
        } else if (n <= 255) {
          return u8(n);
        } else if (n <= 65535) {
          return u16(n);
        } else if (n <= 4294967295) {
          return u32(n);
        } else {
          return u64(n);
        }
      } else {
        if (n >= -24) {
          return iSmall(n);
        } else if (n >= -255) {
          return i8(n);
        } else if (n >= -65535) {
          return i16(n);
        } else if (n >= -4294967295) {
          return i32(n);
        } else {
          return i64(n);
        }
      }
    }
    exports.number = number;
    function bytes(bytes2) {
      return _concat(_serializeNumber(2, bytes2.byteLength), bytes2);
    }
    exports.bytes = bytes;
    function string(str) {
      return _serializeString(str);
    }
    exports.string = string;
    function array(items) {
      return _concat(_serializeNumber(4, items.length), ...items);
    }
    exports.array = array;
    function map(items, stable = false) {
      if (!(items instanceof Map)) {
        items = new Map(Object.entries(items));
      }
      let entries = Array.from(items.entries());
      if (stable) {
        entries = entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
      }
      return _concat(_serializeNumber(5, items.size), ...entries.map(([k, v]) => _concat(_serializeString(k), v)));
    }
    exports.map = map;
    function singleFloat(f) {
      const single = new Float32Array([f]);
      return _concat(new Uint8Array([(7 << 5) + 26]), new Uint8Array(single.buffer));
    }
    exports.singleFloat = singleFloat;
    function doubleFloat(f) {
      const single = new Float64Array([f]);
      return _concat(new Uint8Array([(7 << 5) + 27]), new Uint8Array(single.buffer));
    }
    exports.doubleFloat = doubleFloat;
    function bool(v) {
      return v ? true_() : false_();
    }
    exports.bool = bool;
    function true_() {
      return raw(new Uint8Array([(7 << 5) + 21]));
    }
    exports.true_ = true_;
    function false_() {
      return raw(new Uint8Array([(7 << 5) + 20]));
    }
    exports.false_ = false_;
    function null_() {
      return raw(new Uint8Array([(7 << 5) + 22]));
    }
    exports.null_ = null_;
    function undefined_() {
      return raw(new Uint8Array([(7 << 5) + 23]));
    }
    exports.undefined_ = undefined_;
  }
});

// node_modules/simple-cbor/src/serializer.js
var require_serializer = __commonJS({
  "node_modules/simple-cbor/src/serializer.js"(exports) {
    "use strict";
    var __importStar = exports && exports.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule) return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2) if (Object.hasOwnProperty.call(mod2, k)) result[k] = mod2[k];
      }
      result["default"] = mod2;
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var cbor3 = __importStar(require_value());
    var BufferClasses = [
      ArrayBuffer,
      Uint8Array,
      Uint16Array,
      Uint32Array,
      Int8Array,
      Int16Array,
      Int32Array,
      Float32Array,
      Float64Array
    ];
    var JsonDefaultCborEncoder = class {
      // @param _serializer The CBOR Serializer to use.
      // @param _stable Whether or not keys from objects should be sorted (stable). This is
      //     particularly useful when testing encodings between JSON objects.
      constructor(_serializer, _stable = false) {
        this._serializer = _serializer;
        this._stable = _stable;
        this.name = "jsonDefault";
        this.priority = -100;
      }
      match(value3) {
        return ["undefined", "boolean", "number", "string", "object"].indexOf(typeof value3) != -1;
      }
      encode(value3) {
        switch (typeof value3) {
          case "undefined":
            return cbor3.undefined_();
          case "boolean":
            return cbor3.bool(value3);
          case "number":
            if (Math.floor(value3) === value3) {
              return cbor3.number(value3);
            } else {
              return cbor3.doubleFloat(value3);
            }
          case "string":
            return cbor3.string(value3);
          case "object":
            if (value3 === null) {
              return cbor3.null_();
            } else if (Array.isArray(value3)) {
              return cbor3.array(value3.map((x) => this._serializer.serializeValue(x)));
            } else if (BufferClasses.find((x) => value3 instanceof x)) {
              return cbor3.bytes(value3.buffer);
            } else if (Object.getOwnPropertyNames(value3).indexOf("toJSON") !== -1) {
              return this.encode(value3.toJSON());
            } else if (value3 instanceof Map) {
              const m = /* @__PURE__ */ new Map();
              for (const [key, item] of value3.entries()) {
                m.set(key, this._serializer.serializeValue(item));
              }
              return cbor3.map(m, this._stable);
            } else {
              const m = /* @__PURE__ */ new Map();
              for (const [key, item] of Object.entries(value3)) {
                m.set(key, this._serializer.serializeValue(item));
              }
              return cbor3.map(m, this._stable);
            }
          default:
            throw new Error("Invalid value.");
        }
      }
    };
    exports.JsonDefaultCborEncoder = JsonDefaultCborEncoder;
    var ToCborEncoder = class {
      constructor() {
        this.name = "cborEncoder";
        this.priority = -90;
      }
      match(value3) {
        return typeof value3 == "object" && typeof value3["toCBOR"] == "function";
      }
      encode(value3) {
        return value3.toCBOR();
      }
    };
    exports.ToCborEncoder = ToCborEncoder;
    var CborSerializer = class {
      constructor() {
        this._encoders = /* @__PURE__ */ new Set();
      }
      static withDefaultEncoders(stable = false) {
        const s = new this();
        s.addEncoder(new JsonDefaultCborEncoder(s, stable));
        s.addEncoder(new ToCborEncoder());
        return s;
      }
      removeEncoder(name) {
        for (const encoder of this._encoders.values()) {
          if (encoder.name == name) {
            this._encoders.delete(encoder);
          }
        }
      }
      addEncoder(encoder) {
        this._encoders.add(encoder);
      }
      getEncoderFor(value3) {
        let chosenEncoder = null;
        for (const encoder of this._encoders) {
          if (!chosenEncoder || encoder.priority > chosenEncoder.priority) {
            if (encoder.match(value3)) {
              chosenEncoder = encoder;
            }
          }
        }
        if (chosenEncoder === null) {
          throw new Error("Could not find an encoder for value.");
        }
        return chosenEncoder;
      }
      serializeValue(value3) {
        return this.getEncoderFor(value3).encode(value3);
      }
      serialize(value3) {
        return this.serializeValue(value3);
      }
    };
    exports.CborSerializer = CborSerializer;
    var SelfDescribeCborSerializer2 = class extends CborSerializer {
      serialize(value3) {
        return cbor3.raw(new Uint8Array([
          // Self describe CBOR.
          ...new Uint8Array([217, 217, 247]),
          ...new Uint8Array(super.serializeValue(value3))
        ]));
      }
    };
    exports.SelfDescribeCborSerializer = SelfDescribeCborSerializer2;
  }
});

// node_modules/simple-cbor/src/index.js
var require_src2 = __commonJS({
  "node_modules/simple-cbor/src/index.js"(exports) {
    "use strict";
    function __export2(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var __importStar = exports && exports.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule) return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2) if (Object.hasOwnProperty.call(mod2, k)) result[k] = mod2[k];
      }
      result["default"] = mod2;
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __export2(require_serializer());
    var value3 = __importStar(require_value());
    exports.value = value3;
  }
});

// node_modules/@dfinity/agent/lib/esm/canisterStatus/index.js
var canisterStatus_exports = {};
__export(canisterStatus_exports, {
  CustomPath: () => CustomPath,
  encodePath: () => encodePath,
  fetchNodeKeys: () => fetchNodeKeys,
  request: () => request
});

// node_modules/@dfinity/principal/lib/esm/utils/base32.js
var alphabet = "abcdefghijklmnopqrstuvwxyz234567";
var lookupTable = /* @__PURE__ */ Object.create(null);
for (let i = 0; i < alphabet.length; i++) {
  lookupTable[alphabet[i]] = i;
}
lookupTable["0"] = lookupTable.o;
lookupTable["1"] = lookupTable.i;
function encode(input) {
  let skip = 0;
  let bits = 0;
  let output = "";
  function encodeByte(byte) {
    if (skip < 0) {
      bits |= byte >> -skip;
    } else {
      bits = byte << skip & 248;
    }
    if (skip > 3) {
      skip -= 8;
      return 1;
    }
    if (skip < 4) {
      output += alphabet[bits >> 3];
      skip += 5;
    }
    return 0;
  }
  for (let i = 0; i < input.length; ) {
    i += encodeByte(input[i]);
  }
  return output + (skip < 0 ? alphabet[bits >> 3] : "");
}
function decode(input) {
  let skip = 0;
  let byte = 0;
  const output = new Uint8Array(input.length * 4 / 3 | 0);
  let o = 0;
  function decodeChar(char) {
    let val = lookupTable[char.toLowerCase()];
    if (val === void 0) {
      throw new Error(`Invalid character: ${JSON.stringify(char)}`);
    }
    val <<= 3;
    byte |= val >>> skip;
    skip += 5;
    if (skip >= 8) {
      output[o++] = byte;
      skip -= 8;
      if (skip > 0) {
        byte = val << 5 - skip & 255;
      } else {
        byte = 0;
      }
    }
  }
  for (const c of input) {
    decodeChar(c);
  }
  return output.slice(0, o);
}

// node_modules/@dfinity/principal/lib/esm/utils/getCrc.js
var lookUpTable = new Uint32Array([
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
]);
function getCrc32(buf) {
  const b = new Uint8Array(buf);
  let crc = -1;
  for (let i = 0; i < b.length; i++) {
    const byte = b[i];
    const t = (byte ^ crc) & 255;
    crc = lookUpTable[t] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}

// node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var hasHexBuiltin = (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto2 && typeof crypto2.randomBytes === "function") {
    return Uint8Array.from(crypto2.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value3, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value3, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value3 >> _32n2 & _u32_max);
  const wl = Number(value3 & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA224_IV = Uint32Array.from([
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
]);
var SHA384_IV = Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]);
var SHA512_IV = Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = BigInt(2 ** 32 - 1);
var _32n = BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

// node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var SHA224 = class extends SHA256 {
  constructor() {
    super(28);
    this.A = SHA224_IV[0] | 0;
    this.B = SHA224_IV[1] | 0;
    this.C = SHA224_IV[2] | 0;
    this.D = SHA224_IV[3] | 0;
    this.E = SHA224_IV[4] | 0;
    this.F = SHA224_IV[5] | 0;
    this.G = SHA224_IV[6] | 0;
    this.H = SHA224_IV[7] | 0;
  }
};
var K512 = (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_Kh = (() => K512[0])();
var SHA512_Kl = (() => K512[1])();
var SHA512_W_H = new Uint32Array(80);
var SHA512_W_L = new Uint32Array(80);
var SHA512 = class extends HashMD {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var SHA384 = class extends SHA512 {
  constructor() {
    super(48);
    this.Ah = SHA384_IV[0] | 0;
    this.Al = SHA384_IV[1] | 0;
    this.Bh = SHA384_IV[2] | 0;
    this.Bl = SHA384_IV[3] | 0;
    this.Ch = SHA384_IV[4] | 0;
    this.Cl = SHA384_IV[5] | 0;
    this.Dh = SHA384_IV[6] | 0;
    this.Dl = SHA384_IV[7] | 0;
    this.Eh = SHA384_IV[8] | 0;
    this.El = SHA384_IV[9] | 0;
    this.Fh = SHA384_IV[10] | 0;
    this.Fl = SHA384_IV[11] | 0;
    this.Gh = SHA384_IV[12] | 0;
    this.Gl = SHA384_IV[13] | 0;
    this.Hh = SHA384_IV[14] | 0;
    this.Hl = SHA384_IV[15] | 0;
  }
};
var T224_IV = Uint32Array.from([
  2352822216,
  424955298,
  1944164710,
  2312950998,
  502970286,
  855612546,
  1738396948,
  1479516111,
  258812777,
  2077511080,
  2011393907,
  79989058,
  1067287976,
  1780299464,
  286451373,
  2446758561
]);
var T256_IV = Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
var SHA512_224 = class extends SHA512 {
  constructor() {
    super(28);
    this.Ah = T224_IV[0] | 0;
    this.Al = T224_IV[1] | 0;
    this.Bh = T224_IV[2] | 0;
    this.Bl = T224_IV[3] | 0;
    this.Ch = T224_IV[4] | 0;
    this.Cl = T224_IV[5] | 0;
    this.Dh = T224_IV[6] | 0;
    this.Dl = T224_IV[7] | 0;
    this.Eh = T224_IV[8] | 0;
    this.El = T224_IV[9] | 0;
    this.Fh = T224_IV[10] | 0;
    this.Fl = T224_IV[11] | 0;
    this.Gh = T224_IV[12] | 0;
    this.Gl = T224_IV[13] | 0;
    this.Hh = T224_IV[14] | 0;
    this.Hl = T224_IV[15] | 0;
  }
};
var SHA512_256 = class extends SHA512 {
  constructor() {
    super(32);
    this.Ah = T256_IV[0] | 0;
    this.Al = T256_IV[1] | 0;
    this.Bh = T256_IV[2] | 0;
    this.Bl = T256_IV[3] | 0;
    this.Ch = T256_IV[4] | 0;
    this.Cl = T256_IV[5] | 0;
    this.Dh = T256_IV[6] | 0;
    this.Dl = T256_IV[7] | 0;
    this.Eh = T256_IV[8] | 0;
    this.El = T256_IV[9] | 0;
    this.Fh = T256_IV[10] | 0;
    this.Fl = T256_IV[11] | 0;
    this.Gh = T256_IV[12] | 0;
    this.Gl = T256_IV[13] | 0;
    this.Hh = T256_IV[14] | 0;
    this.Hl = T256_IV[15] | 0;
  }
};
var sha256 = createHasher(() => new SHA256());
var sha224 = createHasher(() => new SHA224());
var sha512 = createHasher(() => new SHA512());
var sha384 = createHasher(() => new SHA384());
var sha512_256 = createHasher(() => new SHA512_256());
var sha512_224 = createHasher(() => new SHA512_224());

// node_modules/@noble/hashes/esm/sha256.js
var sha2562 = sha256;
var sha2242 = sha224;

// node_modules/@dfinity/principal/lib/esm/utils/sha224.js
function sha2243(data) {
  return sha2242.create().update(new Uint8Array(data)).digest();
}

// node_modules/@dfinity/principal/lib/esm/index.js
var JSON_KEY_PRINCIPAL = "__principal__";
var SELF_AUTHENTICATING_SUFFIX = 2;
var ANONYMOUS_SUFFIX = 4;
var MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR = "aaaaa-aa";
var fromHexString = (hexString) => {
  var _a2;
  return new Uint8Array(((_a2 = hexString.match(/.{1,2}/g)) !== null && _a2 !== void 0 ? _a2 : []).map((byte) => parseInt(byte, 16)));
};
var toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
var Principal = class _Principal {
  constructor(_arr) {
    this._arr = _arr;
    this._isPrincipal = true;
  }
  static anonymous() {
    return new this(new Uint8Array([ANONYMOUS_SUFFIX]));
  }
  /**
   * Utility method, returning the principal representing the management canister, decoded from the hex string `'aaaaa-aa'`
   * @returns {Principal} principal of the management canister
   */
  static managementCanister() {
    return this.fromText(MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR);
  }
  static selfAuthenticating(publicKey) {
    const sha = sha2243(publicKey);
    return new this(new Uint8Array([...sha, SELF_AUTHENTICATING_SUFFIX]));
  }
  static from(other) {
    if (typeof other === "string") {
      return _Principal.fromText(other);
    } else if (Object.getPrototypeOf(other) === Uint8Array.prototype) {
      return new _Principal(other);
    } else if (typeof other === "object" && other !== null && other._isPrincipal === true) {
      return new _Principal(other._arr);
    }
    throw new Error(`Impossible to convert ${JSON.stringify(other)} to Principal.`);
  }
  static fromHex(hex) {
    return new this(fromHexString(hex));
  }
  static fromText(text) {
    let maybePrincipal = text;
    if (text.includes(JSON_KEY_PRINCIPAL)) {
      const obj = JSON.parse(text);
      if (JSON_KEY_PRINCIPAL in obj) {
        maybePrincipal = obj[JSON_KEY_PRINCIPAL];
      }
    }
    const canisterIdNoDash = maybePrincipal.toLowerCase().replace(/-/g, "");
    let arr = decode(canisterIdNoDash);
    arr = arr.slice(4, arr.length);
    const principal = new this(arr);
    if (principal.toText() !== maybePrincipal) {
      throw new Error(`Principal "${principal.toText()}" does not have a valid checksum (original value "${maybePrincipal}" may not be a valid Principal ID).`);
    }
    return principal;
  }
  static fromUint8Array(arr) {
    return new this(arr);
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === ANONYMOUS_SUFFIX;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return toHexString(this._arr).toUpperCase();
  }
  toText() {
    const checksumArrayBuf = new ArrayBuffer(4);
    const view = new DataView(checksumArrayBuf);
    view.setUint32(0, getCrc32(this._arr));
    const checksum = new Uint8Array(checksumArrayBuf);
    const bytes = Uint8Array.from(this._arr);
    const array = new Uint8Array([...checksum, ...bytes]);
    const result = encode(array);
    const matches = result.match(/.{1,5}/g);
    if (!matches) {
      throw new Error();
    }
    return matches.join("-");
  }
  toString() {
    return this.toText();
  }
  /**
   * Serializes to JSON
   * @returns {JsonnablePrincipal} a JSON object with a single key, {@link JSON_KEY_PRINCIPAL}, whose value is the principal as a string
   */
  toJSON() {
    return { [JSON_KEY_PRINCIPAL]: this.toText() };
  }
  /**
   * Utility method taking a Principal to compare against. Used for determining canister ranges in certificate verification
   * @param {Principal} other - a {@link Principal} to compare
   * @returns {'lt' | 'eq' | 'gt'} `'lt' | 'eq' | 'gt'` a string, representing less than, equal to, or greater than
   */
  compareTo(other) {
    for (let i = 0; i < Math.min(this._arr.length, other._arr.length); i++) {
      if (this._arr[i] < other._arr[i])
        return "lt";
      else if (this._arr[i] > other._arr[i])
        return "gt";
    }
    if (this._arr.length < other._arr.length)
      return "lt";
    if (this._arr.length > other._arr.length)
      return "gt";
    return "eq";
  }
  /**
   * Utility method checking whether a provided Principal is less than or equal to the current one using the {@link Principal.compareTo} method
   * @param other a {@link Principal} to compare
   * @returns {boolean} boolean
   */
  ltEq(other) {
    const cmp = this.compareTo(other);
    return cmp == "lt" || cmp == "eq";
  }
  /**
   * Utility method checking whether a provided Principal is greater than or equal to the current one using the {@link Principal.compareTo} method
   * @param other a {@link Principal} to compare
   * @returns {boolean} boolean
   */
  gtEq(other) {
    const cmp = this.compareTo(other);
    return cmp == "gt" || cmp == "eq";
  }
};

// node_modules/@dfinity/agent/lib/esm/agent/api.js
var ReplicaRejectCode;
(function(ReplicaRejectCode2) {
  ReplicaRejectCode2[ReplicaRejectCode2["SysFatal"] = 1] = "SysFatal";
  ReplicaRejectCode2[ReplicaRejectCode2["SysTransient"] = 2] = "SysTransient";
  ReplicaRejectCode2[ReplicaRejectCode2["DestinationInvalid"] = 3] = "DestinationInvalid";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterReject"] = 4] = "CanisterReject";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (ReplicaRejectCode = {}));

// node_modules/@dfinity/agent/lib/esm/utils/buffer.js
function concat(...buffers) {
  const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index = 0;
  for (const b of buffers) {
    result.set(new Uint8Array(b), index);
    index += b.byteLength;
  }
  return result.buffer;
}
function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
var hexRe = new RegExp(/^[0-9a-fA-F]+$/);
function fromHex(hex) {
  if (!hexRe.test(hex)) {
    throw new Error("Invalid hexadecimal string.");
  }
  const buffer = [...hex].reduce((acc, curr, i) => {
    acc[i / 2 | 0] = (acc[i / 2 | 0] || "") + curr;
    return acc;
  }, []).map((x) => Number.parseInt(x, 16));
  return new Uint8Array(buffer).buffer;
}
function compare(b1, b2) {
  if (b1.byteLength !== b2.byteLength) {
    return b1.byteLength - b2.byteLength;
  }
  const u1 = new Uint8Array(b1);
  const u2 = new Uint8Array(b2);
  for (let i = 0; i < u1.length; i++) {
    if (u1[i] !== u2[i]) {
      return u1[i] - u2[i];
    }
  }
  return 0;
}
function bufEquals(b1, b2) {
  return compare(b1, b2) === 0;
}
function uint8ToBuf(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength).buffer;
}
function bufFromBufLike(bufLike) {
  if (bufLike instanceof Uint8Array) {
    return uint8ToBuf(bufLike);
  }
  if (bufLike instanceof ArrayBuffer) {
    return bufLike;
  }
  if (Array.isArray(bufLike)) {
    return uint8ToBuf(new Uint8Array(bufLike));
  }
  if ("buffer" in bufLike) {
    return bufFromBufLike(bufLike.buffer);
  }
  return uint8ToBuf(new Uint8Array(bufLike));
}

// node_modules/@dfinity/agent/lib/esm/errors.js
var AgentError = class _AgentError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "AgentError";
    this.__proto__ = _AgentError.prototype;
    Object.setPrototypeOf(this, _AgentError.prototype);
  }
};

// node_modules/@dfinity/agent/lib/esm/cbor.js
var cbor_exports = {};
__export(cbor_exports, {
  CborTag: () => CborTag,
  decode: () => decode2,
  encode: () => encode2
});
var import_borc = __toESM(require_src());
var cbor = __toESM(require_src2());
var import_simple_cbor = __toESM(require_src2());
var PrincipalEncoder = class {
  get name() {
    return "Principal";
  }
  get priority() {
    return 0;
  }
  match(value3) {
    return value3 && value3._isPrincipal === true;
  }
  encode(v) {
    return cbor.value.bytes(v.toUint8Array());
  }
};
var BufferEncoder = class {
  get name() {
    return "Buffer";
  }
  get priority() {
    return 1;
  }
  match(value3) {
    return value3 instanceof ArrayBuffer || ArrayBuffer.isView(value3);
  }
  encode(v) {
    return cbor.value.bytes(new Uint8Array(v));
  }
};
var BigIntEncoder = class {
  get name() {
    return "BigInt";
  }
  get priority() {
    return 1;
  }
  match(value3) {
    return typeof value3 === `bigint`;
  }
  encode(v) {
    if (v > BigInt(0)) {
      return cbor.value.tagged(2, cbor.value.bytes(fromHex(v.toString(16))));
    } else {
      return cbor.value.tagged(3, cbor.value.bytes(fromHex((BigInt("-1") * v).toString(16))));
    }
  }
};
var serializer = import_simple_cbor.SelfDescribeCborSerializer.withDefaultEncoders(true);
serializer.addEncoder(new PrincipalEncoder());
serializer.addEncoder(new BufferEncoder());
serializer.addEncoder(new BigIntEncoder());
var CborTag;
(function(CborTag2) {
  CborTag2[CborTag2["Uint64LittleEndian"] = 71] = "Uint64LittleEndian";
  CborTag2[CborTag2["Semantic"] = 55799] = "Semantic";
})(CborTag || (CborTag = {}));
function encode2(value3) {
  return serializer.serialize(value3);
}
function decodePositiveBigInt(buf) {
  const len = buf.byteLength;
  let res = BigInt(0);
  for (let i = 0; i < len; i++) {
    res = res * BigInt(256) + BigInt(buf[i]);
  }
  return res;
}
var Uint8ArrayDecoder = class extends import_borc.default.Decoder {
  createByteString(raw) {
    return concat(...raw);
  }
  createByteStringFromHeap(start, end) {
    if (start === end) {
      return new ArrayBuffer(0);
    }
    return new Uint8Array(this._heap.slice(start, end));
  }
};
function decode2(input) {
  const buffer = new Uint8Array(input);
  const decoder = new Uint8ArrayDecoder({
    size: buffer.byteLength,
    tags: {
      // Override tags 2 and 3 for BigInt support (borc supports only BigNumber).
      2: (val) => decodePositiveBigInt(val),
      3: (val) => -decodePositiveBigInt(val),
      [CborTag.Semantic]: (value3) => value3
    }
  });
  try {
    return decoder.decodeFirst(buffer);
  } catch (e) {
    throw new Error(`Failed to decode CBOR: ${e}, input: ${toHex(buffer)}`);
  }
}

// node_modules/@dfinity/candid/lib/esm/idl.js
var idl_exports = {};
__export(idl_exports, {
  Bool: () => Bool,
  BoolClass: () => BoolClass,
  ConstructType: () => ConstructType,
  Empty: () => Empty,
  EmptyClass: () => EmptyClass,
  FixedIntClass: () => FixedIntClass,
  FixedNatClass: () => FixedNatClass,
  Float32: () => Float32,
  Float64: () => Float64,
  FloatClass: () => FloatClass,
  Func: () => Func,
  FuncClass: () => FuncClass,
  Int: () => Int,
  Int16: () => Int16,
  Int32: () => Int32,
  Int64: () => Int64,
  Int8: () => Int8,
  IntClass: () => IntClass,
  Nat: () => Nat,
  Nat16: () => Nat16,
  Nat32: () => Nat32,
  Nat64: () => Nat64,
  Nat8: () => Nat8,
  NatClass: () => NatClass,
  Null: () => Null,
  NullClass: () => NullClass,
  Opt: () => Opt,
  OptClass: () => OptClass,
  PrimitiveType: () => PrimitiveType,
  Principal: () => Principal2,
  PrincipalClass: () => PrincipalClass,
  Rec: () => Rec,
  RecClass: () => RecClass,
  Record: () => Record,
  RecordClass: () => RecordClass,
  Reserved: () => Reserved,
  ReservedClass: () => ReservedClass,
  Service: () => Service,
  ServiceClass: () => ServiceClass,
  Text: () => Text,
  TextClass: () => TextClass,
  Tuple: () => Tuple,
  TupleClass: () => TupleClass,
  Type: () => Type,
  Unknown: () => Unknown,
  UnknownClass: () => UnknownClass,
  Variant: () => Variant,
  VariantClass: () => VariantClass,
  Vec: () => Vec,
  VecClass: () => VecClass,
  Visitor: () => Visitor,
  decode: () => decode3,
  encode: () => encode3
});

// node_modules/@dfinity/candid/lib/esm/utils/buffer.js
function concat2(...buffers) {
  const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index = 0;
  for (const b of buffers) {
    result.set(new Uint8Array(b), index);
    index += b.byteLength;
  }
  return result;
}
var PipeArrayBuffer = class {
  /**
   * Creates a new instance of a pipe
   * @param buffer an optional buffer to start with
   * @param length an optional amount of bytes to use for the length.
   */
  constructor(buffer, length = (buffer === null || buffer === void 0 ? void 0 : buffer.byteLength) || 0) {
    this._buffer = bufFromBufLike2(buffer || new ArrayBuffer(0));
    this._view = new Uint8Array(this._buffer, 0, length);
  }
  /**
   * Save a checkpoint of the reading view (for backtracking)
   */
  save() {
    return this._view;
  }
  /**
   * Restore a checkpoint of the reading view (for backtracking)
   * @param checkPoint a previously saved checkpoint
   */
  restore(checkPoint) {
    this._view = checkPoint;
  }
  get buffer() {
    return bufFromBufLike2(this._view.slice());
  }
  get byteLength() {
    return this._view.byteLength;
  }
  /**
   * Read `num` number of bytes from the front of the pipe.
   * @param num The number of bytes to read.
   */
  read(num) {
    const result = this._view.subarray(0, num);
    this._view = this._view.subarray(num);
    return result.slice().buffer;
  }
  readUint8() {
    const result = this._view[0];
    this._view = this._view.subarray(1);
    return result;
  }
  /**
   * Write a buffer to the end of the pipe.
   * @param buf The bytes to write.
   */
  write(buf) {
    const b = new Uint8Array(buf);
    const offset = this._view.byteLength;
    if (this._view.byteOffset + this._view.byteLength + b.byteLength >= this._buffer.byteLength) {
      this.alloc(b.byteLength);
    } else {
      this._view = new Uint8Array(this._buffer, this._view.byteOffset, this._view.byteLength + b.byteLength);
    }
    this._view.set(b, offset);
  }
  /**
   * Whether or not there is more data to read from the buffer
   */
  get end() {
    return this._view.byteLength === 0;
  }
  /**
   * Allocate a fixed amount of memory in the buffer. This does not affect the view.
   * @param amount A number of bytes to add to the buffer.
   */
  alloc(amount) {
    const b = new ArrayBuffer((this._buffer.byteLength + amount) * 1.2 | 0);
    const v = new Uint8Array(b, 0, this._view.byteLength + amount);
    v.set(this._view);
    this._buffer = b;
    this._view = v;
  }
};
function uint8ToBuf2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength).buffer;
}
function bufFromBufLike2(bufLike) {
  if (bufLike instanceof Uint8Array) {
    return uint8ToBuf2(bufLike);
  }
  if (bufLike instanceof ArrayBuffer) {
    return bufLike;
  }
  if (Array.isArray(bufLike)) {
    return uint8ToBuf2(new Uint8Array(bufLike));
  }
  if ("buffer" in bufLike) {
    return bufFromBufLike2(bufLike.buffer);
  }
  return uint8ToBuf2(new Uint8Array(bufLike));
}

// node_modules/@dfinity/candid/lib/esm/utils/hash.js
function idlHash(s) {
  const utf8encoder = new TextEncoder();
  const array = utf8encoder.encode(s);
  let h = 0;
  for (const c of array) {
    h = (h * 223 + c) % 2 ** 32;
  }
  return h;
}
function idlLabelToId(label) {
  if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
    const num = +label.slice(1, -1);
    if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) {
      return num;
    }
  }
  return idlHash(label);
}

// node_modules/@dfinity/candid/lib/esm/utils/leb128.js
function eob() {
  throw new Error("unexpected end of buffer");
}
function safeRead(pipe, num) {
  if (pipe.byteLength < num) {
    eob();
  }
  return pipe.read(num);
}
function safeReadUint8(pipe) {
  const byte = pipe.readUint8();
  if (byte === void 0) {
    eob();
  }
  return byte;
}
function lebEncode(value3) {
  if (typeof value3 === "number") {
    value3 = BigInt(value3);
  }
  if (value3 < BigInt(0)) {
    throw new Error("Cannot leb encode negative values.");
  }
  const byteLength = (value3 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value3)))) + 1;
  const pipe = new PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
  while (true) {
    const i = Number(value3 & BigInt(127));
    value3 /= BigInt(128);
    if (value3 === BigInt(0)) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  return pipe.buffer;
}
function lebDecode(pipe) {
  let weight = BigInt(1);
  let value3 = BigInt(0);
  let byte;
  do {
    byte = safeReadUint8(pipe);
    value3 += BigInt(byte & 127).valueOf() * weight;
    weight *= BigInt(128);
  } while (byte >= 128);
  return value3;
}
function slebEncode(value3) {
  if (typeof value3 === "number") {
    value3 = BigInt(value3);
  }
  const isNeg = value3 < BigInt(0);
  if (isNeg) {
    value3 = -value3 - BigInt(1);
  }
  const byteLength = (value3 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value3)))) + 1;
  const pipe = new PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
  while (true) {
    const i = getLowerBytes(value3);
    value3 /= BigInt(128);
    if (isNeg && value3 === BigInt(0) && (i & 64) !== 0 || !isNeg && value3 === BigInt(0) && (i & 64) === 0) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  function getLowerBytes(num) {
    const bytes = num % BigInt(128);
    if (isNeg) {
      return Number(BigInt(128) - bytes - BigInt(1));
    } else {
      return Number(bytes);
    }
  }
  return pipe.buffer;
}
function slebDecode(pipe) {
  const pipeView = new Uint8Array(pipe.buffer);
  let len = 0;
  for (; len < pipeView.byteLength; len++) {
    if (pipeView[len] < 128) {
      if ((pipeView[len] & 64) === 0) {
        return lebDecode(pipe);
      }
      break;
    }
  }
  const bytes = new Uint8Array(safeRead(pipe, len + 1));
  let value3 = BigInt(0);
  for (let i = bytes.byteLength - 1; i >= 0; i--) {
    value3 = value3 * BigInt(128) + BigInt(128 - (bytes[i] & 127) - 1);
  }
  return -value3 - BigInt(1);
}
function writeUIntLE(value3, byteLength) {
  if (BigInt(value3) < BigInt(0)) {
    throw new Error("Cannot write negative values.");
  }
  return writeIntLE(value3, byteLength);
}
function writeIntLE(value3, byteLength) {
  value3 = BigInt(value3);
  const pipe = new PipeArrayBuffer(new ArrayBuffer(Math.min(1, byteLength)), 0);
  let i = 0;
  let mul = BigInt(256);
  let sub = BigInt(0);
  let byte = Number(value3 % mul);
  pipe.write(new Uint8Array([byte]));
  while (++i < byteLength) {
    if (value3 < 0 && sub === BigInt(0) && byte !== 0) {
      sub = BigInt(1);
    }
    byte = Number((value3 / mul - sub) % BigInt(256));
    pipe.write(new Uint8Array([byte]));
    mul *= BigInt(256);
  }
  return pipe.buffer;
}
function readUIntLE(pipe, byteLength) {
  let val = BigInt(safeReadUint8(pipe));
  let mul = BigInt(1);
  let i = 0;
  while (++i < byteLength) {
    mul *= BigInt(256);
    const byte = BigInt(safeReadUint8(pipe));
    val = val + mul * byte;
  }
  return val;
}
function readIntLE(pipe, byteLength) {
  let val = readUIntLE(pipe, byteLength);
  const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
  if (val >= mul) {
    val -= mul * BigInt(2);
  }
  return val;
}

// node_modules/@dfinity/candid/lib/esm/utils/bigint-math.js
function iexp2(n) {
  const nBig = BigInt(n);
  if (n < 0) {
    throw new RangeError("Input must be non-negative");
  }
  return BigInt(1) << nBig;
}

// node_modules/@dfinity/candid/lib/esm/idl.js
var magicNumber = "DIDL";
var toReadableString_max = 400;
function zipWith(xs, ys, f) {
  return xs.map((x, i) => f(x, ys[i]));
}
var TypeTable = class {
  constructor() {
    this._typs = [];
    this._idx = /* @__PURE__ */ new Map();
  }
  has(obj) {
    return this._idx.has(obj.name);
  }
  add(type, buf) {
    const idx = this._typs.length;
    this._idx.set(type.name, idx);
    this._typs.push(buf);
  }
  merge(obj, knot) {
    const idx = this._idx.get(obj.name);
    const knotIdx = this._idx.get(knot);
    if (idx === void 0) {
      throw new Error("Missing type index for " + obj);
    }
    if (knotIdx === void 0) {
      throw new Error("Missing type index for " + knot);
    }
    this._typs[idx] = this._typs[knotIdx];
    this._typs.splice(knotIdx, 1);
    this._idx.delete(knot);
  }
  encode() {
    const len = lebEncode(this._typs.length);
    const buf = concat2(...this._typs);
    return concat2(len, buf);
  }
  indexOf(typeName) {
    if (!this._idx.has(typeName)) {
      throw new Error("Missing type index for " + typeName);
    }
    return slebEncode(this._idx.get(typeName) || 0);
  }
};
var Visitor = class {
  visitType(t, data) {
    throw new Error("Not implemented");
  }
  visitPrimitive(t, data) {
    return this.visitType(t, data);
  }
  visitEmpty(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitBool(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitNull(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitReserved(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitText(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitNumber(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitInt(t, data) {
    return this.visitNumber(t, data);
  }
  visitNat(t, data) {
    return this.visitNumber(t, data);
  }
  visitFloat(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitFixedInt(t, data) {
    return this.visitNumber(t, data);
  }
  visitFixedNat(t, data) {
    return this.visitNumber(t, data);
  }
  visitPrincipal(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitConstruct(t, data) {
    return this.visitType(t, data);
  }
  visitVec(t, ty, data) {
    return this.visitConstruct(t, data);
  }
  visitOpt(t, ty, data) {
    return this.visitConstruct(t, data);
  }
  visitRecord(t, fields, data) {
    return this.visitConstruct(t, data);
  }
  visitTuple(t, components, data) {
    const fields = components.map((ty, i) => [`_${i}_`, ty]);
    return this.visitRecord(t, fields, data);
  }
  visitVariant(t, fields, data) {
    return this.visitConstruct(t, data);
  }
  visitRec(t, ty, data) {
    return this.visitConstruct(ty, data);
  }
  visitFunc(t, data) {
    return this.visitConstruct(t, data);
  }
  visitService(t, data) {
    return this.visitConstruct(t, data);
  }
};
var Type = class {
  /* Display type name */
  display() {
    return this.name;
  }
  valueToString(x) {
    return toReadableString(x);
  }
  /* Implement `T` in the IDL spec, only needed for non-primitive types */
  buildTypeTable(typeTable) {
    if (!typeTable.has(this)) {
      this._buildTypeTableImpl(typeTable);
    }
  }
};
var PrimitiveType = class extends Type {
  checkType(t) {
    if (this.name !== t.name) {
      throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
    }
    return t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _buildTypeTableImpl(typeTable) {
    return;
  }
};
var ConstructType = class extends Type {
  checkType(t) {
    if (t instanceof RecClass) {
      const ty = t.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      }
      return ty;
    }
    throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
  }
  encodeType(typeTable) {
    return typeTable.indexOf(this.name);
  }
};
var EmptyClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitEmpty(this, d);
  }
  covariant(x) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue() {
    throw new Error("Empty cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Empty cannot appear as a value");
  }
  encodeType() {
    return slebEncode(
      -17
      /* IDLTypeIds.Empty */
    );
  }
  decodeValue() {
    throw new Error("Empty cannot appear as an output");
  }
  get name() {
    return "empty";
  }
};
var UnknownClass = class extends Type {
  checkType(t) {
    throw new Error("Method not implemented for unknown.");
  }
  accept(v, d) {
    throw v.visitType(this, d);
  }
  covariant(x) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue() {
    throw new Error("Unknown cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Unknown cannot appear as a value");
  }
  encodeType() {
    throw new Error("Unknown cannot be serialized");
  }
  decodeValue(b, t) {
    let decodedValue = t.decodeValue(b, t);
    if (Object(decodedValue) !== decodedValue) {
      decodedValue = Object(decodedValue);
    }
    let typeFunc;
    if (t instanceof RecClass) {
      typeFunc = () => t.getType();
    } else {
      typeFunc = () => t;
    }
    Object.defineProperty(decodedValue, "type", {
      value: typeFunc,
      writable: true,
      enumerable: false,
      configurable: true
    });
    return decodedValue;
  }
  _buildTypeTableImpl() {
    throw new Error("Unknown cannot be serialized");
  }
  get name() {
    return "Unknown";
  }
};
var BoolClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitBool(this, d);
  }
  covariant(x) {
    if (typeof x === "boolean")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    return new Uint8Array([x ? 1 : 0]);
  }
  encodeType() {
    return slebEncode(
      -2
      /* IDLTypeIds.Bool */
    );
  }
  decodeValue(b, t) {
    this.checkType(t);
    switch (safeReadUint8(b)) {
      case 0:
        return false;
      case 1:
        return true;
      default:
        throw new Error("Boolean value out of range");
    }
  }
  get name() {
    return "bool";
  }
};
var NullClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitNull(this, d);
  }
  covariant(x) {
    if (x === null)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return slebEncode(
      -1
      /* IDLTypeIds.Null */
    );
  }
  decodeValue(b, t) {
    this.checkType(t);
    return null;
  }
  get name() {
    return "null";
  }
};
var ReservedClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitReserved(this, d);
  }
  covariant(x) {
    return true;
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return slebEncode(
      -16
      /* IDLTypeIds.Reserved */
    );
  }
  decodeValue(b, t) {
    if (t.name !== this.name) {
      t.decodeValue(b, t);
    }
    return null;
  }
  get name() {
    return "reserved";
  }
};
var TextClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitText(this, d);
  }
  covariant(x) {
    if (typeof x === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const buf = new TextEncoder().encode(x);
    const len = lebEncode(buf.byteLength);
    return concat2(len, buf);
  }
  encodeType() {
    return slebEncode(
      -15
      /* IDLTypeIds.Text */
    );
  }
  decodeValue(b, t) {
    this.checkType(t);
    const len = lebDecode(b);
    const buf = safeRead(b, Number(len));
    const decoder = new TextDecoder("utf8", { fatal: true });
    return decoder.decode(buf);
  }
  get name() {
    return "text";
  }
  valueToString(x) {
    return '"' + x + '"';
  }
};
var IntClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitInt(this, d);
  }
  covariant(x) {
    if (typeof x === "bigint" || Number.isInteger(x))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    return slebEncode(x);
  }
  encodeType() {
    return slebEncode(
      -4
      /* IDLTypeIds.Int */
    );
  }
  decodeValue(b, t) {
    this.checkType(t);
    return slebDecode(b);
  }
  get name() {
    return "int";
  }
  valueToString(x) {
    return x.toString();
  }
};
var NatClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitNat(this, d);
  }
  covariant(x) {
    if (typeof x === "bigint" && x >= BigInt(0) || Number.isInteger(x) && x >= 0)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    return lebEncode(x);
  }
  encodeType() {
    return slebEncode(
      -3
      /* IDLTypeIds.Nat */
    );
  }
  decodeValue(b, t) {
    this.checkType(t);
    return lebDecode(b);
  }
  get name() {
    return "nat";
  }
  valueToString(x) {
    return x.toString();
  }
};
var FloatClass = class extends PrimitiveType {
  constructor(_bits) {
    super();
    this._bits = _bits;
    if (_bits !== 32 && _bits !== 64) {
      throw new Error("not a valid float type");
    }
  }
  accept(v, d) {
    return v.visitFloat(this, d);
  }
  covariant(x) {
    if (typeof x === "number" || x instanceof Number)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const buf = new ArrayBuffer(this._bits / 8);
    const view = new DataView(buf);
    if (this._bits === 32) {
      view.setFloat32(0, x, true);
    } else {
      view.setFloat64(0, x, true);
    }
    return buf;
  }
  encodeType() {
    const opcode = this._bits === 32 ? -13 : -14;
    return slebEncode(opcode);
  }
  decodeValue(b, t) {
    this.checkType(t);
    const bytes = safeRead(b, this._bits / 8);
    const view = new DataView(bytes);
    if (this._bits === 32) {
      return view.getFloat32(0, true);
    } else {
      return view.getFloat64(0, true);
    }
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(x) {
    return x.toString();
  }
};
var FixedIntClass = class extends PrimitiveType {
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v, d) {
    return v.visitFixedInt(this, d);
  }
  covariant(x) {
    const min = iexp2(this._bits - 1) * BigInt(-1);
    const max = iexp2(this._bits - 1) - BigInt(1);
    let ok = false;
    if (typeof x === "bigint") {
      ok = x >= min && x <= max;
    } else if (Number.isInteger(x)) {
      const v = BigInt(x);
      ok = v >= min && v <= max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    return writeIntLE(x, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-9 - offset);
  }
  decodeValue(b, t) {
    this.checkType(t);
    const num = readIntLE(b, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(x) {
    return x.toString();
  }
};
var FixedNatClass = class extends PrimitiveType {
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v, d) {
    return v.visitFixedNat(this, d);
  }
  covariant(x) {
    const max = iexp2(this._bits);
    let ok = false;
    if (typeof x === "bigint" && x >= BigInt(0)) {
      ok = x < max;
    } else if (Number.isInteger(x) && x >= 0) {
      const v = BigInt(x);
      ok = v < max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    return writeUIntLE(x, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-5 - offset);
  }
  decodeValue(b, t) {
    this.checkType(t);
    const num = readUIntLE(b, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(x) {
    return x.toString();
  }
};
var VecClass = class _VecClass extends ConstructType {
  constructor(_type) {
    super();
    this._type = _type;
    this._blobOptimization = false;
    if (_type instanceof FixedNatClass && _type._bits === 8) {
      this._blobOptimization = true;
    }
  }
  accept(v, d) {
    return v.visitVec(this, this._type, d);
  }
  covariant(x) {
    const bits = this._type instanceof FixedNatClass ? this._type._bits : this._type instanceof FixedIntClass ? this._type._bits : 0;
    if (ArrayBuffer.isView(x) && bits == x.BYTES_PER_ELEMENT * 8 || Array.isArray(x) && x.every((v, idx) => {
      try {
        return this._type.covariant(v);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${idx} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const len = lebEncode(x.length);
    if (this._blobOptimization) {
      return concat2(len, new Uint8Array(x));
    }
    if (ArrayBuffer.isView(x)) {
      return concat2(len, new Uint8Array(x.buffer));
    }
    const buf = new PipeArrayBuffer(new ArrayBuffer(len.byteLength + x.length), 0);
    buf.write(len);
    for (const d of x) {
      const encoded = this._type.encodeValue(d);
      buf.write(new Uint8Array(encoded));
    }
    return buf.buffer;
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(
      -19
      /* IDLTypeIds.Vector */
    );
    const buffer = this._type.encodeType(typeTable);
    typeTable.add(this, concat2(opCode, buffer));
  }
  decodeValue(b, t) {
    const vec = this.checkType(t);
    if (!(vec instanceof _VecClass)) {
      throw new Error("Not a vector type");
    }
    const len = Number(lebDecode(b));
    if (this._type instanceof FixedNatClass) {
      if (this._type._bits == 8) {
        return new Uint8Array(b.read(len));
      }
      if (this._type._bits == 16) {
        return new Uint16Array(b.read(len * 2));
      }
      if (this._type._bits == 32) {
        return new Uint32Array(b.read(len * 4));
      }
      if (this._type._bits == 64) {
        return new BigUint64Array(b.read(len * 8));
      }
    }
    if (this._type instanceof FixedIntClass) {
      if (this._type._bits == 8) {
        return new Int8Array(b.read(len));
      }
      if (this._type._bits == 16) {
        return new Int16Array(b.read(len * 2));
      }
      if (this._type._bits == 32) {
        return new Int32Array(b.read(len * 4));
      }
      if (this._type._bits == 64) {
        return new BigInt64Array(b.read(len * 8));
      }
    }
    const rets = [];
    for (let i = 0; i < len; i++) {
      rets.push(this._type.decodeValue(b, vec._type));
    }
    return rets;
  }
  get name() {
    return `vec ${this._type.name}`;
  }
  display() {
    return `vec ${this._type.display()}`;
  }
  valueToString(x) {
    const elements = x.map((e) => this._type.valueToString(e));
    return "vec {" + elements.join("; ") + "}";
  }
};
var OptClass = class _OptClass extends ConstructType {
  constructor(_type) {
    super();
    this._type = _type;
  }
  accept(v, d) {
    return v.visitOpt(this, this._type, d);
  }
  covariant(x) {
    try {
      if (Array.isArray(x) && (x.length === 0 || x.length === 1 && this._type.covariant(x[0])))
        return true;
    } catch (e) {
      throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)} 

-> ${e.message}`);
    }
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    if (x.length === 0) {
      return new Uint8Array([0]);
    } else {
      return concat2(new Uint8Array([1]), this._type.encodeValue(x[0]));
    }
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(
      -18
      /* IDLTypeIds.Opt */
    );
    const buffer = this._type.encodeType(typeTable);
    typeTable.add(this, concat2(opCode, buffer));
  }
  decodeValue(b, t) {
    if (t instanceof NullClass) {
      return [];
    }
    if (t instanceof ReservedClass) {
      return [];
    }
    let wireType = t;
    if (t instanceof RecClass) {
      const ty = t.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      } else
        wireType = ty;
    }
    if (wireType instanceof _OptClass) {
      switch (safeReadUint8(b)) {
        case 0:
          return [];
        case 1: {
          const checkpoint = b.save();
          try {
            const v = this._type.decodeValue(b, wireType._type);
            return [v];
          } catch (e) {
            b.restore(checkpoint);
            const skipped = wireType._type.decodeValue(b, wireType._type);
            return [];
          }
        }
        default:
          throw new Error("Not an option value");
      }
    } else if (this._type instanceof NullClass || this._type instanceof _OptClass || this._type instanceof ReservedClass) {
      const skipped = wireType.decodeValue(b, wireType);
      return [];
    } else {
      const checkpoint = b.save();
      try {
        const v = this._type.decodeValue(b, t);
        return [v];
      } catch (e) {
        b.restore(checkpoint);
        const skipped = wireType.decodeValue(b, t);
        return [];
      }
    }
  }
  get name() {
    return `opt ${this._type.name}`;
  }
  display() {
    return `opt ${this._type.display()}`;
  }
  valueToString(x) {
    if (x.length === 0) {
      return "null";
    } else {
      return `opt ${this._type.valueToString(x[0])}`;
    }
  }
};
var RecordClass = class _RecordClass extends ConstructType {
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a, b) => idlLabelToId(a[0]) - idlLabelToId(b[0]));
  }
  accept(v, d) {
    return v.visitRecord(this, this._fields, d);
  }
  tryAsTuple() {
    const res = [];
    for (let i = 0; i < this._fields.length; i++) {
      const [key, type] = this._fields[i];
      if (key !== `_${i}_`) {
        return null;
      }
      res.push(type);
    }
    return res;
  }
  covariant(x) {
    if (typeof x === "object" && this._fields.every(([k, t]) => {
      if (!x.hasOwnProperty(k)) {
        throw new Error(`Record is missing key "${k}".`);
      }
      try {
        return t.covariant(x[k]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

field ${k} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const values = this._fields.map(([key]) => x[key]);
    const bufs = zipWith(this._fields, values, ([, c], d) => c.encodeValue(d));
    return concat2(...bufs);
  }
  _buildTypeTableImpl(T) {
    this._fields.forEach(([_, value3]) => value3.buildTypeTable(T));
    const opCode = slebEncode(
      -20
      /* IDLTypeIds.Record */
    );
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value3]) => concat2(lebEncode(idlLabelToId(key)), value3.encodeType(T)));
    T.add(this, concat2(opCode, len, concat2(...fields)));
  }
  decodeValue(b, t) {
    const record = this.checkType(t);
    if (!(record instanceof _RecordClass)) {
      throw new Error("Not a record type");
    }
    const x = {};
    let expectedRecordIdx = 0;
    let actualRecordIdx = 0;
    while (actualRecordIdx < record._fields.length) {
      const [hash2, type] = record._fields[actualRecordIdx];
      if (expectedRecordIdx >= this._fields.length) {
        type.decodeValue(b, type);
        actualRecordIdx++;
        continue;
      }
      const [expectKey, expectType] = this._fields[expectedRecordIdx];
      const expectedId = idlLabelToId(this._fields[expectedRecordIdx][0]);
      const actualId = idlLabelToId(hash2);
      if (expectedId === actualId) {
        x[expectKey] = expectType.decodeValue(b, type);
        expectedRecordIdx++;
        actualRecordIdx++;
      } else if (actualId > expectedId) {
        if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
          x[expectKey] = [];
          expectedRecordIdx++;
        } else {
          throw new Error("Cannot find required field " + expectKey);
        }
      } else {
        type.decodeValue(b, type);
        actualRecordIdx++;
      }
    }
    for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) {
      if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
        x[expectKey] = [];
      } else {
        throw new Error("Cannot find required field " + expectKey);
      }
    }
    return x;
  }
  get name() {
    const fields = this._fields.map(([key, value3]) => key + ":" + value3.name);
    return `record {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, value3]) => key + ":" + value3.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(x) {
    const values = this._fields.map(([key]) => x[key]);
    const fields = zipWith(this._fields, values, ([k, c], d) => k + "=" + c.valueToString(d));
    return `record {${fields.join("; ")}}`;
  }
};
var TupleClass = class _TupleClass extends RecordClass {
  constructor(_components) {
    const x = {};
    _components.forEach((e, i) => x["_" + i + "_"] = e);
    super(x);
    this._components = _components;
  }
  accept(v, d) {
    return v.visitTuple(this, this._components, d);
  }
  covariant(x) {
    if (Array.isArray(x) && x.length >= this._fields.length && this._components.every((t, i) => {
      try {
        return t.covariant(x[i]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const bufs = zipWith(this._components, x, (c, d) => c.encodeValue(d));
    return concat2(...bufs);
  }
  decodeValue(b, t) {
    const tuple = this.checkType(t);
    if (!(tuple instanceof _TupleClass)) {
      throw new Error("not a tuple type");
    }
    if (tuple._components.length < this._components.length) {
      throw new Error("tuple mismatch");
    }
    const res = [];
    for (const [i, wireType] of tuple._components.entries()) {
      if (i >= this._components.length) {
        wireType.decodeValue(b, wireType);
      } else {
        res.push(this._components[i].decodeValue(b, wireType));
      }
    }
    return res;
  }
  display() {
    const fields = this._components.map((value3) => value3.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(values) {
    const fields = zipWith(this._components, values, (c, d) => c.valueToString(d));
    return `record {${fields.join("; ")}}`;
  }
};
var VariantClass = class _VariantClass extends ConstructType {
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a, b) => idlLabelToId(a[0]) - idlLabelToId(b[0]));
  }
  accept(v, d) {
    return v.visitVariant(this, this._fields, d);
  }
  covariant(x) {
    if (typeof x === "object" && Object.entries(x).length === 1 && this._fields.every(([k, v]) => {
      try {
        return !x.hasOwnProperty(k) || v.covariant(x[k]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

variant ${k} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    for (let i = 0; i < this._fields.length; i++) {
      const [name, type] = this._fields[i];
      if (x.hasOwnProperty(name)) {
        const idx = lebEncode(i);
        const buf = type.encodeValue(x[name]);
        return concat2(idx, buf);
      }
    }
    throw Error("Variant has no data: " + x);
  }
  _buildTypeTableImpl(typeTable) {
    this._fields.forEach(([, type]) => {
      type.buildTypeTable(typeTable);
    });
    const opCode = slebEncode(
      -21
      /* IDLTypeIds.Variant */
    );
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value3]) => concat2(lebEncode(idlLabelToId(key)), value3.encodeType(typeTable)));
    typeTable.add(this, concat2(opCode, len, ...fields));
  }
  decodeValue(b, t) {
    const variant = this.checkType(t);
    if (!(variant instanceof _VariantClass)) {
      throw new Error("Not a variant type");
    }
    const idx = Number(lebDecode(b));
    if (idx >= variant._fields.length) {
      throw Error("Invalid variant index: " + idx);
    }
    const [wireHash, wireType] = variant._fields[idx];
    for (const [key, expectType] of this._fields) {
      if (idlLabelToId(wireHash) === idlLabelToId(key)) {
        const value3 = expectType.decodeValue(b, wireType);
        return { [key]: value3 };
      }
    }
    throw new Error("Cannot find field hash " + wireHash);
  }
  get name() {
    const fields = this._fields.map(([key, type]) => key + ":" + type.name);
    return `variant {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`));
    return `variant {${fields.join("; ")}}`;
  }
  valueToString(x) {
    for (const [name, type] of this._fields) {
      if (x.hasOwnProperty(name)) {
        const value3 = type.valueToString(x[name]);
        if (value3 === "null") {
          return `variant {${name}}`;
        } else {
          return `variant {${name}=${value3}}`;
        }
      }
    }
    throw new Error("Variant has no data: " + x);
  }
};
var RecClass = class _RecClass extends ConstructType {
  constructor() {
    super(...arguments);
    this._id = _RecClass._counter++;
    this._type = void 0;
  }
  accept(v, d) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return v.visitRec(this, this._type, d);
  }
  fill(t) {
    this._type = t;
  }
  getType() {
    return this._type;
  }
  covariant(x) {
    if (this._type ? this._type.covariant(x) : false)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.encodeValue(x);
  }
  _buildTypeTableImpl(typeTable) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    typeTable.add(this, new Uint8Array([]));
    this._type.buildTypeTable(typeTable);
    typeTable.merge(this, this._type.name);
  }
  decodeValue(b, t) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.decodeValue(b, t);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(x) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.valueToString(x);
  }
};
RecClass._counter = 0;
function decodePrincipalId(b) {
  const x = safeReadUint8(b);
  if (x !== 1) {
    throw new Error("Cannot decode principal");
  }
  const len = Number(lebDecode(b));
  return Principal.fromUint8Array(new Uint8Array(safeRead(b, len)));
}
var PrincipalClass = class extends PrimitiveType {
  accept(v, d) {
    return v.visitPrincipal(this, d);
  }
  covariant(x) {
    if (x && x._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const buf = x.toUint8Array();
    const len = lebEncode(buf.byteLength);
    return concat2(new Uint8Array([1]), len, buf);
  }
  encodeType() {
    return slebEncode(
      -24
      /* IDLTypeIds.Principal */
    );
  }
  decodeValue(b, t) {
    this.checkType(t);
    return decodePrincipalId(b);
  }
  get name() {
    return "principal";
  }
  valueToString(x) {
    return `${this.name} "${x.toText()}"`;
  }
};
var FuncClass = class extends ConstructType {
  constructor(argTypes, retTypes, annotations = []) {
    super();
    this.argTypes = argTypes;
    this.retTypes = retTypes;
    this.annotations = annotations;
  }
  static argsToString(types, v) {
    if (types.length !== v.length) {
      throw new Error("arity mismatch");
    }
    return "(" + types.map((t, i) => t.valueToString(v[i])).join(", ") + ")";
  }
  accept(v, d) {
    return v.visitFunc(this, d);
  }
  covariant(x) {
    if (Array.isArray(x) && x.length === 2 && x[0] && x[0]._isPrincipal && typeof x[1] === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue([principal, methodName]) {
    const buf = principal.toUint8Array();
    const len = lebEncode(buf.byteLength);
    const canister = concat2(new Uint8Array([1]), len, buf);
    const method = new TextEncoder().encode(methodName);
    const methodLen = lebEncode(method.byteLength);
    return concat2(new Uint8Array([1]), canister, methodLen, method);
  }
  _buildTypeTableImpl(T) {
    this.argTypes.forEach((arg) => arg.buildTypeTable(T));
    this.retTypes.forEach((arg) => arg.buildTypeTable(T));
    const opCode = slebEncode(
      -22
      /* IDLTypeIds.Func */
    );
    const argLen = lebEncode(this.argTypes.length);
    const args = concat2(...this.argTypes.map((arg) => arg.encodeType(T)));
    const retLen = lebEncode(this.retTypes.length);
    const rets = concat2(...this.retTypes.map((arg) => arg.encodeType(T)));
    const annLen = lebEncode(this.annotations.length);
    const anns = concat2(...this.annotations.map((a) => this.encodeAnnotation(a)));
    T.add(this, concat2(opCode, argLen, args, retLen, rets, annLen, anns));
  }
  decodeValue(b) {
    const x = safeReadUint8(b);
    if (x !== 1) {
      throw new Error("Cannot decode function reference");
    }
    const canister = decodePrincipalId(b);
    const mLen = Number(lebDecode(b));
    const buf = safeRead(b, mLen);
    const decoder = new TextDecoder("utf8", { fatal: true });
    const method = decoder.decode(buf);
    return [canister, method];
  }
  get name() {
    const args = this.argTypes.map((arg) => arg.name).join(", ");
    const rets = this.retTypes.map((arg) => arg.name).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) -> (${rets})${annon}`;
  }
  valueToString([principal, str]) {
    return `func "${principal.toText()}".${str}`;
  }
  display() {
    const args = this.argTypes.map((arg) => arg.display()).join(", ");
    const rets = this.retTypes.map((arg) => arg.display()).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) → (${rets})${annon}`;
  }
  encodeAnnotation(ann) {
    if (ann === "query") {
      return new Uint8Array([1]);
    } else if (ann === "oneway") {
      return new Uint8Array([2]);
    } else if (ann === "composite_query") {
      return new Uint8Array([3]);
    } else {
      throw new Error("Illegal function annotation");
    }
  }
};
var ServiceClass = class extends ConstructType {
  constructor(fields) {
    super();
    this._fields = Object.entries(fields).sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });
  }
  accept(v, d) {
    return v.visitService(this, d);
  }
  covariant(x) {
    if (x && x._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
  }
  encodeValue(x) {
    const buf = x.toUint8Array();
    const len = lebEncode(buf.length);
    return concat2(new Uint8Array([1]), len, buf);
  }
  _buildTypeTableImpl(T) {
    this._fields.forEach(([_, func]) => func.buildTypeTable(T));
    const opCode = slebEncode(
      -23
      /* IDLTypeIds.Service */
    );
    const len = lebEncode(this._fields.length);
    const meths = this._fields.map(([label, func]) => {
      const labelBuf = new TextEncoder().encode(label);
      const labelLen = lebEncode(labelBuf.length);
      return concat2(labelLen, labelBuf, func.encodeType(T));
    });
    T.add(this, concat2(opCode, len, ...meths));
  }
  decodeValue(b) {
    return decodePrincipalId(b);
  }
  get name() {
    const fields = this._fields.map(([key, value3]) => key + ":" + value3.name);
    return `service {${fields.join("; ")}}`;
  }
  valueToString(x) {
    return `service "${x.toText()}"`;
  }
};
function toReadableString(x) {
  const str = JSON.stringify(x, (_key, value3) => typeof value3 === "bigint" ? `BigInt(${value3})` : value3);
  return str && str.length > toReadableString_max ? str.substring(0, toReadableString_max - 3) + "..." : str;
}
function encode3(argTypes, args) {
  if (args.length < argTypes.length) {
    throw Error("Wrong number of message arguments");
  }
  const typeTable = new TypeTable();
  argTypes.forEach((t) => t.buildTypeTable(typeTable));
  const magic = new TextEncoder().encode(magicNumber);
  const table = typeTable.encode();
  const len = lebEncode(args.length);
  const typs = concat2(...argTypes.map((t) => t.encodeType(typeTable)));
  const vals = concat2(...zipWith(argTypes, args, (t, x) => {
    try {
      t.covariant(x);
    } catch (e) {
      const err = new Error(e.message + "\n\n");
      throw err;
    }
    return t.encodeValue(x);
  }));
  return concat2(magic, table, len, typs, vals);
}
function decode3(retTypes, bytes) {
  const b = new PipeArrayBuffer(bytes);
  if (bytes.byteLength < magicNumber.length) {
    throw new Error("Message length smaller than magic number");
  }
  const magicBuffer = safeRead(b, magicNumber.length);
  const magic = new TextDecoder().decode(magicBuffer);
  if (magic !== magicNumber) {
    throw new Error("Wrong magic number: " + JSON.stringify(magic));
  }
  function readTypeTable(pipe) {
    const typeTable = [];
    const len = Number(lebDecode(pipe));
    for (let i = 0; i < len; i++) {
      const ty = Number(slebDecode(pipe));
      switch (ty) {
        case -18:
        case -19: {
          const t = Number(slebDecode(pipe));
          typeTable.push([ty, t]);
          break;
        }
        case -20:
        case -21: {
          const fields = [];
          let objectLength = Number(lebDecode(pipe));
          let prevHash;
          while (objectLength--) {
            const hash2 = Number(lebDecode(pipe));
            if (hash2 >= Math.pow(2, 32)) {
              throw new Error("field id out of 32-bit range");
            }
            if (typeof prevHash === "number" && prevHash >= hash2) {
              throw new Error("field id collision or not sorted");
            }
            prevHash = hash2;
            const t = Number(slebDecode(pipe));
            fields.push([hash2, t]);
          }
          typeTable.push([ty, fields]);
          break;
        }
        case -22: {
          const args = [];
          let argLength = Number(lebDecode(pipe));
          while (argLength--) {
            args.push(Number(slebDecode(pipe)));
          }
          const returnValues = [];
          let returnValuesLength = Number(lebDecode(pipe));
          while (returnValuesLength--) {
            returnValues.push(Number(slebDecode(pipe)));
          }
          const annotations = [];
          let annotationLength = Number(lebDecode(pipe));
          while (annotationLength--) {
            const annotation = Number(lebDecode(pipe));
            switch (annotation) {
              case 1: {
                annotations.push("query");
                break;
              }
              case 2: {
                annotations.push("oneway");
                break;
              }
              case 3: {
                annotations.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          }
          typeTable.push([ty, [args, returnValues, annotations]]);
          break;
        }
        case -23: {
          let servLength = Number(lebDecode(pipe));
          const methods = [];
          while (servLength--) {
            const nameLength = Number(lebDecode(pipe));
            const funcName = new TextDecoder().decode(safeRead(pipe, nameLength));
            const funcType = slebDecode(pipe);
            methods.push([funcName, funcType]);
          }
          typeTable.push([ty, methods]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + ty);
      }
    }
    const rawList = [];
    const length = Number(lebDecode(pipe));
    for (let i = 0; i < length; i++) {
      rawList.push(Number(slebDecode(pipe)));
    }
    return [typeTable, rawList];
  }
  const [rawTable, rawTypes] = readTypeTable(b);
  if (rawTypes.length < retTypes.length) {
    throw new Error("Wrong number of return values");
  }
  const table = rawTable.map((_) => Rec());
  function getType(t) {
    if (t < -24) {
      throw new Error("future value not supported");
    }
    if (t < 0) {
      switch (t) {
        case -1:
          return Null;
        case -2:
          return Bool;
        case -3:
          return Nat;
        case -4:
          return Int;
        case -5:
          return Nat8;
        case -6:
          return Nat16;
        case -7:
          return Nat32;
        case -8:
          return Nat64;
        case -9:
          return Int8;
        case -10:
          return Int16;
        case -11:
          return Int32;
        case -12:
          return Int64;
        case -13:
          return Float32;
        case -14:
          return Float64;
        case -15:
          return Text;
        case -16:
          return Reserved;
        case -17:
          return Empty;
        case -24:
          return Principal2;
        default:
          throw new Error("Illegal op_code: " + t);
      }
    }
    if (t >= rawTable.length) {
      throw new Error("type index out of range");
    }
    return table[t];
  }
  function buildType(entry) {
    switch (entry[0]) {
      case -19: {
        const ty = getType(entry[1]);
        return Vec(ty);
      }
      case -18: {
        const ty = getType(entry[1]);
        return Opt(ty);
      }
      case -20: {
        const fields = {};
        for (const [hash2, ty] of entry[1]) {
          const name = `_${hash2}_`;
          fields[name] = getType(ty);
        }
        const record = Record(fields);
        const tuple = record.tryAsTuple();
        if (Array.isArray(tuple)) {
          return Tuple(...tuple);
        } else {
          return record;
        }
      }
      case -21: {
        const fields = {};
        for (const [hash2, ty] of entry[1]) {
          const name = `_${hash2}_`;
          fields[name] = getType(ty);
        }
        return Variant(fields);
      }
      case -22: {
        const [args, returnValues, annotations] = entry[1];
        return Func(args.map((t) => getType(t)), returnValues.map((t) => getType(t)), annotations);
      }
      case -23: {
        const rec = {};
        const methods = entry[1];
        for (const [name, typeRef] of methods) {
          let type = getType(typeRef);
          if (type instanceof RecClass) {
            type = type.getType();
          }
          if (!(type instanceof FuncClass)) {
            throw new Error("Illegal service definition: services can only contain functions");
          }
          rec[name] = type;
        }
        return Service(rec);
      }
      default:
        throw new Error("Illegal op_code: " + entry[0]);
    }
  }
  rawTable.forEach((entry, i) => {
    if (entry[0] === -22) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  rawTable.forEach((entry, i) => {
    if (entry[0] !== -22) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  const types = rawTypes.map((t) => getType(t));
  const output = retTypes.map((t, i) => {
    return t.decodeValue(b, types[i]);
  });
  for (let ind = retTypes.length; ind < types.length; ind++) {
    types[ind].decodeValue(b, types[ind]);
  }
  if (b.byteLength > 0) {
    throw new Error("decode: Left-over bytes");
  }
  return output;
}
var Empty = new EmptyClass();
var Reserved = new ReservedClass();
var Unknown = new UnknownClass();
var Bool = new BoolClass();
var Null = new NullClass();
var Text = new TextClass();
var Int = new IntClass();
var Nat = new NatClass();
var Float32 = new FloatClass(32);
var Float64 = new FloatClass(64);
var Int8 = new FixedIntClass(8);
var Int16 = new FixedIntClass(16);
var Int32 = new FixedIntClass(32);
var Int64 = new FixedIntClass(64);
var Nat8 = new FixedNatClass(8);
var Nat16 = new FixedNatClass(16);
var Nat32 = new FixedNatClass(32);
var Nat64 = new FixedNatClass(64);
var Principal2 = new PrincipalClass();
function Tuple(...types) {
  return new TupleClass(types);
}
function Vec(t) {
  return new VecClass(t);
}
function Opt(t) {
  return new OptClass(t);
}
function Record(t) {
  return new RecordClass(t);
}
function Variant(fields) {
  return new VariantClass(fields);
}
function Rec() {
  return new RecClass();
}
function Func(args, ret, annotations = []) {
  return new FuncClass(args, ret, annotations);
}
function Service(t) {
  return new ServiceClass(t);
}

// node_modules/@dfinity/agent/lib/esm/request_id.js
var import_borc2 = __toESM(require_src());
function hash(data) {
  return uint8ToBuf(sha2562.create().update(new Uint8Array(data)).digest());
}
function hashValue(value3) {
  if (value3 instanceof import_borc2.default.Tagged) {
    return hashValue(value3.value);
  } else if (typeof value3 === "string") {
    return hashString(value3);
  } else if (typeof value3 === "number") {
    return hash(lebEncode(value3));
  } else if (value3 instanceof ArrayBuffer || ArrayBuffer.isView(value3)) {
    return hash(value3);
  } else if (Array.isArray(value3)) {
    const vals = value3.map(hashValue);
    return hash(concat(...vals));
  } else if (value3 && typeof value3 === "object" && value3._isPrincipal) {
    return hash(value3.toUint8Array());
  } else if (typeof value3 === "object" && value3 !== null && typeof value3.toHash === "function") {
    return hashValue(value3.toHash());
  } else if (typeof value3 === "object") {
    return hashOfMap(value3);
  } else if (typeof value3 === "bigint") {
    return hash(lebEncode(value3));
  }
  throw Object.assign(new Error(`Attempt to hash a value of unsupported type: ${value3}`), {
    // include so logs/callers can understand the confusing value.
    // (when stringified in error message, prototype info is lost)
    value: value3
  });
}
var hashString = (value3) => {
  const encoded = new TextEncoder().encode(value3);
  return hash(encoded);
};
function requestIdOf(request2) {
  return hashOfMap(request2);
}
function hashOfMap(map) {
  const hashed = Object.entries(map).filter(([, value3]) => value3 !== void 0).map(([key, value3]) => {
    const hashedKey = hashString(key);
    const hashedValue = hashValue(value3);
    return [hashedKey, hashedValue];
  });
  const traversed = hashed;
  const sorted = traversed.sort(([k1], [k2]) => {
    return compare(k1, k2);
  });
  const concatenated = concat(...sorted.map((x) => concat(...x)));
  const result = hash(concatenated);
  return result;
}

// node_modules/@noble/curves/esm/utils.js
var _0n = BigInt(0);
var _1n = BigInt(1);
function abool(title, value3) {
  if (typeof value3 !== "boolean")
    throw new Error(title + " boolean expected, got " + value3);
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
var isPosBig = (n) => typeof n === "bigint" && _0n <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n; n >>= _1n, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n;
}
var bitMask = (n) => (_1n << BigInt(n)) - _1n;
function isHash(val) {
  return typeof val === "function" && Number.isSafeInteger(val.outputLen);
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k, v]) => checkField(k, v, false));
  Object.entries(optFields).forEach(([k, v]) => checkField(k, v, true));
}
var notImplemented = () => {
  throw new Error("not implemented");
};
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var _5n = BigInt(5);
var _8n = BigInt(8);
function mod(a, b) {
  const result = a % b;
  return result >= _0n2 ? result : b + result;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n2)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n2)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a !== _0n2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function sqrt3mod4(Fp4, n) {
  const p1div4 = (Fp4.ORDER + _1n2) / _4n;
  const root = Fp4.pow(n, p1div4);
  if (!Fp4.eql(Fp4.sqr(root), n))
    throw new Error("Cannot find square root");
  return root;
}
function sqrt5mod8(Fp4, n) {
  const p5div8 = (Fp4.ORDER - _5n) / _8n;
  const n2 = Fp4.mul(n, _2n);
  const v = Fp4.pow(n2, p5div8);
  const nv = Fp4.mul(n, v);
  const i = Fp4.mul(Fp4.mul(nv, _2n), v);
  const root = Fp4.mul(nv, Fp4.sub(i, Fp4.ONE));
  if (!Fp4.eql(Fp4.sqr(root), n))
    throw new Error("Cannot find square root");
  return root;
}
function tonelliShanks(P) {
  if (P < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n2;
  let S = 0;
  while (Q % _2n === _0n2) {
    Q /= _2n;
    S++;
  }
  let Z = _2n;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n2) / _2n;
  return function tonelliSlow(Fp4, n) {
    if (Fp4.is0(n))
      return n;
    if (FpLegendre(Fp4, n) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c = Fp4.mul(Fp4.ONE, cc);
    let t = Fp4.pow(n, Q);
    let R = Fp4.pow(n, Q1div2);
    while (!Fp4.eql(t, Fp4.ONE)) {
      if (Fp4.is0(t))
        return Fp4.ZERO;
      let i = 1;
      let t_tmp = Fp4.sqr(t);
      while (!Fp4.eql(t_tmp, Fp4.ONE)) {
        i++;
        t_tmp = Fp4.sqr(t_tmp);
        if (i === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n2 << BigInt(M - i - 1);
      const b = Fp4.pow(c, exponent);
      M = i;
      c = Fp4.sqr(b);
      t = Fp4.mul(t, c);
      R = Fp4.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n)
    return sqrt3mod4;
  if (P % _8n === _5n)
    return sqrt5mod8;
  return tonelliShanks(P);
}
var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n2) === _1n2;
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow(Fp4, num, power) {
  if (power < _0n2)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n2)
    return Fp4.ONE;
  if (power === _1n2)
    return num;
  let p = Fp4.ONE;
  let d = num;
  while (power > _0n2) {
    if (power & _1n2)
      p = Fp4.mul(p, d);
    d = Fp4.sqr(d);
    power >>= _1n2;
  }
  return p;
}
function FpInvertBatch(Fp4, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp4.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp4.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp4.mul(acc, num);
  }, Fp4.ONE);
  const invertedAcc = Fp4.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp4.is0(num))
      return acc;
    inverted[i] = Fp4.mul(acc, inverted[i]);
    return Fp4.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp4, n) {
  const p1mod2 = (Fp4.ORDER - _1n2) / _2n;
  const powered = Fp4.pow(n, p1mod2);
  const yes = Fp4.eql(powered, Fp4.ONE);
  const zero = Fp4.eql(powered, Fp4.ZERO);
  const no = Fp4.eql(powered, Fp4.neg(Fp4.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLenOrOpts, isLE2 = false, opts = {}) {
  if (ORDER <= _0n2)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE2)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE2 = _opts.isLE;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE: isLE2,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n2,
    // is valid and invertible
    isValidNot0: (num) => !f.is0(num) && f.isValid(num),
    isOdd: (num) => (num & _1n2) === _1n2,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: _sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b, c) => c ? b : a
  });
  return Object.freeze(f);
}
function FpSqrtEven(Fp4, elm) {
  if (!Fp4.isOdd)
    throw new Error("Field doesn't have isOdd");
  const root = Fp4.sqrt(elm);
  return Fp4.isOdd(root) ? Fp4.neg(root) : root;
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n2) + _1n2;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// node_modules/@noble/curves/esm/abstract/curve.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c, property, points) {
  const getz = property === "pz" ? (p) => p.pz : (p) => p.ez;
  const toInv = FpInvertBatch(c.Fp, points.map(getz));
  const affined = points.map((p, i) => p.toAffine(toInv[i]));
  return affined.map(c.fromAffine);
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n3;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function assert0(n) {
  if (n !== _0n3)
    throw new Error("invalid wNAF");
}
function wNAF(c, bits) {
  return {
    constTimeNegate: negateCt,
    hasPrecomputes(elm) {
      return getW(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n, p = c.ZERO) {
      let d = elm;
      while (n > _0n3) {
        if (n & _1n3)
          p = p.add(d);
        d = d.double();
        n >>= _1n3;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = calcWOpts(W, bits);
      const points = [];
      let p = elm;
      let base = p;
      for (let window2 = 0; window2 < windows; window2++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      let p = c.ZERO;
      let f = c.BASE;
      const wo = calcWOpts(W, bits);
      for (let window2 = 0; window2 < wo.windows; window2++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window2, wo);
        n = nextN;
        if (isZero) {
          f = f.add(negateCt(isNegF, precomputes[offsetF]));
        } else {
          p = p.add(negateCt(isNeg, precomputes[offset]));
        }
      }
      assert0(n);
      return { p, f };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
      const wo = calcWOpts(W, bits);
      for (let window2 = 0; window2 < wo.windows; window2++) {
        if (n === _0n3)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets(n, window2, wo);
        n = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      assert0(n);
      return acc;
    },
    getPrecomputes(W, P, transform) {
      let comp = pointPrecomputes.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1) {
          if (typeof transform === "function")
            comp = transform(comp);
          pointPrecomputes.set(P, comp);
        }
      }
      return comp;
    },
    wNAFCached(P, n, transform) {
      const W = getW(P);
      return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
    },
    wNAFCachedUnsafe(P, n, transform, prev) {
      const W = getW(P);
      if (W === 1)
        return this.unsafeLadder(P, n, prev);
      return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P, W) {
      validateW(W, bits);
      pointWindowSizes.set(P, W);
      pointPrecomputes.delete(P);
    }
  };
}
function mulEndoUnsafe(c, point, k1, k2) {
  let acc = point;
  let p1 = c.ZERO;
  let p2 = c.ZERO;
  while (k1 > _0n3 || k2 > _0n3) {
    if (k1 & _1n3)
      p1 = p1.add(acc);
    if (k2 & _1n3)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n3;
    k2 >>= _1n3;
  }
  return { p1, p2 };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function createField(order, field) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order);
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}) {
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p of ["p", "n", "h"]) {
    const val = CURVE[p];
    if (!(typeof val === "bigint" && val > _0n3))
      throw new Error(`CURVE.${p} must be positive bigint`);
  }
  const Fp4 = createField(CURVE.p, curveOpts.Fp);
  const Fn = createField(CURVE.n, curveOpts.Fn);
  const _b2 = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b2];
  for (const p of params) {
    if (!Fp4.isValid(CURVE[p]))
      throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
  }
  return { Fp: Fp4, Fn };
}

// node_modules/@noble/curves/esm/abstract/hash-to-curve.js
var os2ip = bytesToNumberBE;
function i2osp(value3, length) {
  anum(value3);
  anum(length);
  if (value3 < 0 || value3 >= 1 << 8 * length)
    throw new Error("invalid I2OSP input: " + value3);
  const res = Array.from({ length }).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    res[i] = value3 & 255;
    value3 >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a, b) {
  const arr = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    arr[i] = a[i] ^ b[i];
  }
  return arr;
}
function anum(item) {
  if (!Number.isSafeInteger(item))
    throw new Error("number expected");
}
function expand_message_xmd(msg, DST, lenInBytes, H) {
  abytes(msg);
  abytes(DST);
  anum(lenInBytes);
  if (DST.length > 255)
    DST = H(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (lenInBytes > 65535 || ell > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b = new Array(ell);
  const b_0 = H(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b[0] = H(concatBytes(b_0, i2osp(1, 1), DST_prime));
  for (let i = 1; i <= ell; i++) {
    const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
    b[i] = H(concatBytes(...args));
  }
  const pseudo_random_bytes = concatBytes(...b);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k, H) {
  abytes(msg);
  abytes(DST);
  anum(lenInBytes);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k / 8);
    DST = H.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  _validateObject(options, {
    p: "bigint",
    m: "number",
    k: "number",
    hash: "function"
  });
  const { p, k, m, hash: hash2, expand, DST: _DST } = options;
  if (!isBytes(_DST) && typeof _DST !== "string")
    throw new Error("DST must be string or uint8array");
  if (!isHash(options.hash))
    throw new Error("expected valid hash");
  abytes(msg);
  anum(count);
  const DST = typeof _DST === "string" ? utf8ToBytes(_DST) : _DST;
  const log2p = p.toString(2).length;
  const L = Math.ceil((log2p + k) / 8);
  const len_in_bytes = count * m * L;
  let prb;
  if (expand === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash2);
  } else if (expand === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k, hash2);
  } else if (expand === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u = new Array(count);
  for (let i = 0; i < count; i++) {
    const e = new Array(m);
    for (let j = 0; j < m; j++) {
      const elm_offset = L * (j + i * m);
      const tv = prb.subarray(elm_offset, elm_offset + L);
      e[j] = mod(os2ip(tv), p);
    }
    u[i] = e;
  }
  return u;
}
function isogenyMap(field, map) {
  const coeff = map.map((i) => Array.from(i).reverse());
  return (x, y) => {
    const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
    const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
    x = field.mul(xn, xd_inv);
    y = field.mul(y, field.mul(yn, yd_inv));
    return { x, y };
  };
}
function createHasher2(Point, mapToCurve, defaults) {
  if (typeof mapToCurve !== "function")
    throw new Error("mapToCurve() must be defined");
  function map(num) {
    return Point.fromAffine(mapToCurve(num));
  }
  function clear(initial) {
    const P = initial.clearCofactor();
    if (P.equals(Point.ZERO))
      return Point.ZERO;
    P.assertValidity();
    return P;
  }
  return {
    defaults,
    hashToCurve(msg, options) {
      const dst = defaults.DST ? defaults.DST : {};
      const opts = Object.assign({}, defaults, dst, options);
      const u = hash_to_field(msg, 2, opts);
      const u0 = map(u[0]);
      const u1 = map(u[1]);
      return clear(u0.add(u1));
    },
    encodeToCurve(msg, options) {
      const dst = defaults.encodeDST ? defaults.encodeDST : {};
      const opts = Object.assign({}, defaults, dst, options);
      const u = hash_to_field(msg, 1, opts);
      return clear(map(u[0]));
    },
    /** See {@link H2CHasher} */
    mapToCurve(scalars) {
      if (!Array.isArray(scalars))
        throw new Error("expected array of bigints");
      for (const i of scalars)
        if (typeof i !== "bigint")
          throw new Error("expected array of bigints");
      return clear(map(scalars));
    }
  };
}

// node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash2, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash2);
    const key = toBytes(_key);
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash2.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean(pad);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
hmac.create = (hash2, key) => new HMAC(hash2, key);

// node_modules/@noble/curves/esm/abstract/weierstrass.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n2 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function _legacyHelperEquat(Fp4, a, b) {
  function weierstrassEquation(x) {
    const x2 = Fp4.sqr(x);
    const x3 = Fp4.mul(x2, x);
    return Fp4.add(Fp4.add(x3, Fp4.mul(x, a)), b);
  }
  return weierstrassEquation;
}
function _legacyHelperNormPriv(Fn, allowedPrivateKeyLengths, wrapPrivateKey) {
  const { BYTES: expected } = Fn;
  function normPrivateKeyToScalar(key) {
    let num;
    if (typeof key === "bigint") {
      num = key;
    } else {
      let bytes = ensureBytes("private key", key);
      if (allowedPrivateKeyLengths) {
        if (!allowedPrivateKeyLengths.includes(bytes.length * 2))
          throw new Error("invalid private key");
        const padded = new Uint8Array(expected);
        padded.set(bytes, padded.length - bytes.length);
        bytes = padded;
      }
      try {
        num = Fn.fromBytes(bytes);
      } catch (error) {
        throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
      }
    }
    if (wrapPrivateKey)
      num = Fn.create(num);
    if (!Fn.isValidNot0(num))
      throw new Error("invalid private key: out of range [1..N-1]");
    return num;
  }
  return normPrivateKeyToScalar;
}
function weierstrassN(CURVE, curveOpts = {}) {
  const { Fp: Fp4, Fn } = _createCurveFields("weierstrass", CURVE, curveOpts);
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(curveOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo } = curveOpts;
  if (endo) {
    if (!Fp4.is0(CURVE.a) || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    }
  }
  function assertCompressionIsSupported() {
    if (!Fp4.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x, y } = point.toAffine();
    const bx = Fp4.toBytes(x);
    abool("isCompressed", isCompressed);
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp4.isOdd(y);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp4.toBytes(y));
    }
  }
  function pointFromBytes(bytes) {
    abytes(bytes);
    const L = Fp4.BYTES;
    const LC = L + 1;
    const LU = 2 * L + 1;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === LC && (head === 2 || head === 3)) {
      const x = Fp4.fromBytes(tail);
      if (!Fp4.isValid(x))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x);
      let y;
      try {
        y = Fp4.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp4.isOdd(y);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd)
        y = Fp4.neg(y);
      return { x, y };
    } else if (length === LU && head === 4) {
      const x = Fp4.fromBytes(tail.subarray(L * 0, L * 1));
      const y = Fp4.fromBytes(tail.subarray(L * 1, L * 2));
      if (!isValidXY(x, y))
        throw new Error("bad point: is not on curve");
      return { x, y };
    } else {
      throw new Error(`bad point: got length ${length}, expected compressed=${LC} or uncompressed=${LU}`);
    }
  }
  const toBytes2 = curveOpts.toBytes || pointToBytes;
  const fromBytes = curveOpts.fromBytes || pointFromBytes;
  const weierstrassEquation = _legacyHelperEquat(Fp4, CURVE.a, CURVE.b);
  function isValidXY(x, y) {
    const left = Fp4.sqr(y);
    const right = weierstrassEquation(x);
    return Fp4.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp4.mul(Fp4.pow(CURVE.a, _3n2), _4n2);
  const _27b2 = Fp4.mul(Fp4.sqr(CURVE.b), BigInt(27));
  if (Fp4.is0(Fp4.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp4.isValid(n) || banZero && Fp4.is0(n))
      throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { px: x, py: y, pz: z } = p;
    if (Fp4.eql(z, Fp4.ONE))
      return { x, y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp4.ONE : Fp4.inv(z);
    const ax = Fp4.mul(x, iz);
    const ay = Fp4.mul(y, iz);
    const zz = Fp4.mul(z, iz);
    if (is0)
      return { x: Fp4.ZERO, y: Fp4.ZERO };
    if (!Fp4.eql(zz, Fp4.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (curveOpts.allowInfinityPoint && !Fp4.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp4.isValid(x) || !Fp4.isValid(y))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp4.mul(k2p.px, endoBeta), k2p.py, k2p.pz);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(px, py, pz) {
      this.px = acoord("x", px);
      this.py = acoord("y", py, true);
      this.pz = acoord("z", pz);
      Object.freeze(this);
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp4.isValid(x) || !Fp4.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp4.is0(x) && Fp4.is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp4.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(points) {
      return normalizeZ(Point, "pz", points);
    }
    static fromBytes(bytes) {
      abytes(bytes);
      return Point.fromHex(bytes);
    }
    /** Converts hash string or Uint8Array to Point. */
    static fromHex(hex) {
      const P = Point.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    /** Multiplies generator point by privateKey. */
    static fromPrivateKey(privateKey) {
      const normPrivateKeyToScalar = _legacyHelperNormPriv(Fn, curveOpts.allowedPrivateKeyLengths, curveOpts.wrapPrivateKey);
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    /** Multiscalar Multiplication */
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.setWindowSize(this, windowSize);
      if (!isLazy)
        this.multiply(_3n2);
      return this;
    }
    /** "Private method", don't use it directly */
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (!Fp4.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp4.isOdd(y);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp4.eql(Fp4.mul(X1, Z2), Fp4.mul(X2, Z1));
      const U2 = Fp4.eql(Fp4.mul(Y1, Z2), Fp4.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.px, Fp4.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp4.mul(b, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp4.ZERO, Y3 = Fp4.ZERO, Z3 = Fp4.ZERO;
      let t0 = Fp4.mul(X1, X1);
      let t1 = Fp4.mul(Y1, Y1);
      let t2 = Fp4.mul(Z1, Z1);
      let t3 = Fp4.mul(X1, Y1);
      t3 = Fp4.add(t3, t3);
      Z3 = Fp4.mul(X1, Z1);
      Z3 = Fp4.add(Z3, Z3);
      X3 = Fp4.mul(a, Z3);
      Y3 = Fp4.mul(b3, t2);
      Y3 = Fp4.add(X3, Y3);
      X3 = Fp4.sub(t1, Y3);
      Y3 = Fp4.add(t1, Y3);
      Y3 = Fp4.mul(X3, Y3);
      X3 = Fp4.mul(t3, X3);
      Z3 = Fp4.mul(b3, Z3);
      t2 = Fp4.mul(a, t2);
      t3 = Fp4.sub(t0, t2);
      t3 = Fp4.mul(a, t3);
      t3 = Fp4.add(t3, Z3);
      Z3 = Fp4.add(t0, t0);
      t0 = Fp4.add(Z3, t0);
      t0 = Fp4.add(t0, t2);
      t0 = Fp4.mul(t0, t3);
      Y3 = Fp4.add(Y3, t0);
      t2 = Fp4.mul(Y1, Z1);
      t2 = Fp4.add(t2, t2);
      t0 = Fp4.mul(t2, t3);
      X3 = Fp4.sub(X3, t0);
      Z3 = Fp4.mul(t2, t1);
      Z3 = Fp4.add(Z3, Z3);
      Z3 = Fp4.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp4.ZERO, Y3 = Fp4.ZERO, Z3 = Fp4.ZERO;
      const a = CURVE.a;
      const b3 = Fp4.mul(CURVE.b, _3n2);
      let t0 = Fp4.mul(X1, X2);
      let t1 = Fp4.mul(Y1, Y2);
      let t2 = Fp4.mul(Z1, Z2);
      let t3 = Fp4.add(X1, Y1);
      let t4 = Fp4.add(X2, Y2);
      t3 = Fp4.mul(t3, t4);
      t4 = Fp4.add(t0, t1);
      t3 = Fp4.sub(t3, t4);
      t4 = Fp4.add(X1, Z1);
      let t5 = Fp4.add(X2, Z2);
      t4 = Fp4.mul(t4, t5);
      t5 = Fp4.add(t0, t2);
      t4 = Fp4.sub(t4, t5);
      t5 = Fp4.add(Y1, Z1);
      X3 = Fp4.add(Y2, Z2);
      t5 = Fp4.mul(t5, X3);
      X3 = Fp4.add(t1, t2);
      t5 = Fp4.sub(t5, X3);
      Z3 = Fp4.mul(a, t4);
      X3 = Fp4.mul(b3, t2);
      Z3 = Fp4.add(X3, Z3);
      X3 = Fp4.sub(t1, Z3);
      Z3 = Fp4.add(t1, Z3);
      Y3 = Fp4.mul(X3, Z3);
      t1 = Fp4.add(t0, t0);
      t1 = Fp4.add(t1, t0);
      t2 = Fp4.mul(a, t2);
      t4 = Fp4.mul(b3, t4);
      t1 = Fp4.add(t1, t2);
      t2 = Fp4.sub(t0, t2);
      t2 = Fp4.mul(a, t2);
      t4 = Fp4.add(t4, t2);
      t0 = Fp4.mul(t1, t4);
      Y3 = Fp4.add(Y3, t0);
      t0 = Fp4.mul(t5, t4);
      X3 = Fp4.mul(t3, X3);
      X3 = Fp4.sub(X3, t0);
      t0 = Fp4.mul(t3, t1);
      Z3 = Fp4.mul(t5, Z3);
      Z3 = Fp4.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = curveOpts;
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n) => wnaf.wNAFCached(this, n, Point.normalizeZ);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p, f } = mul(scalar);
        point = p;
        fake = f;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = curveOpts;
      const p = this;
      if (!Fn.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n4 || p.is0())
        return Point.ZERO;
      if (sc === _1n4)
        return p;
      if (wnaf.hasPrecomputes(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
        const { p1, p2 } = mulEndoUnsafe(Point, p, k1, k2);
        return finishEndo(endo2.beta, p1, p2, k1neg, k2neg);
      } else {
        return wnaf.wNAFCachedUnsafe(p, sc);
      }
    }
    multiplyAndAddUnsafe(Q, a, b) {
      const sum = this.multiplyUnsafe(a).add(Q.multiplyUnsafe(b));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = curveOpts;
      if (cofactor === _1n4)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.wNAFCachedUnsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = curveOpts;
      if (cofactor === _1n4)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    toBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes2(Point, this, isCompressed);
    }
    /** @deprecated use `toBytes` */
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp4.ONE);
  Point.ZERO = new Point(Fp4.ZERO, Fp4.ONE, Fp4.ZERO);
  Point.Fp = Fp4;
  Point.Fn = Fn;
  const bits = Fn.BITS;
  const wnaf = wNAF(Point, curveOpts.endo ? Math.ceil(bits / 2) : bits);
  return Point;
}
function weierstrassPoints(c) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
  const Point = weierstrassN(CURVE, curveOpts);
  return _weierstrass_new_output_to_legacy(c, Point);
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function _weierstrass_legacy_opts_to_new(c) {
  const CURVE = {
    a: c.a,
    b: c.b,
    p: c.Fp.ORDER,
    n: c.n,
    h: c.h,
    Gx: c.Gx,
    Gy: c.Gy
  };
  const Fp4 = c.Fp;
  const Fn = Field(CURVE.n, c.nBitLength);
  const curveOpts = {
    Fp: Fp4,
    Fn,
    allowedPrivateKeyLengths: c.allowedPrivateKeyLengths,
    allowInfinityPoint: c.allowInfinityPoint,
    endo: c.endo,
    wrapPrivateKey: c.wrapPrivateKey,
    isTorsionFree: c.isTorsionFree,
    clearCofactor: c.clearCofactor,
    fromBytes: c.fromBytes,
    toBytes: c.toBytes
  };
  return { CURVE, curveOpts };
}
function _weierstrass_new_output_to_legacy(c, Point) {
  const { Fp: Fp4, Fn } = Point;
  function isWithinCurveOrder(num) {
    return inRange(num, _1n4, Fn.ORDER);
  }
  const weierstrassEquation = _legacyHelperEquat(Fp4, c.a, c.b);
  const normPrivateKeyToScalar = _legacyHelperNormPriv(Fn, c.allowedPrivateKeyLengths, c.wrapPrivateKey);
  return Object.assign({}, {
    CURVE: c,
    Point,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  });
}
function SWUFpSqrtRatio(Fp4, Z) {
  const q = Fp4.ORDER;
  let l = _0n4;
  for (let o = q - _1n4; o % _2n2 === _0n4; o /= _2n2)
    l += _1n4;
  const c1 = l;
  const _2n_pow_c1_1 = _2n2 << c1 - _1n4 - _1n4;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n2;
  const c2 = (q - _1n4) / _2n_pow_c1;
  const c3 = (c2 - _1n4) / _2n2;
  const c4 = _2n_pow_c1 - _1n4;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp4.pow(Z, c2);
  const c7 = Fp4.pow(Z, (c2 + _1n4) / _2n2);
  let sqrtRatio = (u, v) => {
    let tv1 = c6;
    let tv2 = Fp4.pow(v, c4);
    let tv3 = Fp4.sqr(tv2);
    tv3 = Fp4.mul(tv3, v);
    let tv5 = Fp4.mul(u, tv3);
    tv5 = Fp4.pow(tv5, c3);
    tv5 = Fp4.mul(tv5, tv2);
    tv2 = Fp4.mul(tv5, v);
    tv3 = Fp4.mul(tv5, u);
    let tv4 = Fp4.mul(tv3, tv2);
    tv5 = Fp4.pow(tv4, c5);
    let isQR = Fp4.eql(tv5, Fp4.ONE);
    tv2 = Fp4.mul(tv3, c7);
    tv5 = Fp4.mul(tv4, tv1);
    tv3 = Fp4.cmov(tv2, tv3, isQR);
    tv4 = Fp4.cmov(tv5, tv4, isQR);
    for (let i = c1; i > _1n4; i--) {
      let tv52 = i - _2n2;
      tv52 = _2n2 << tv52 - _1n4;
      let tvv5 = Fp4.pow(tv4, tv52);
      const e1 = Fp4.eql(tvv5, Fp4.ONE);
      tv2 = Fp4.mul(tv3, tv1);
      tv1 = Fp4.mul(tv1, tv1);
      tvv5 = Fp4.mul(tv4, tv1);
      tv3 = Fp4.cmov(tv2, tv3, e1);
      tv4 = Fp4.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp4.ORDER % _4n2 === _3n2) {
    const c12 = (Fp4.ORDER - _3n2) / _4n2;
    const c22 = Fp4.sqrt(Fp4.neg(Z));
    sqrtRatio = (u, v) => {
      let tv1 = Fp4.sqr(v);
      const tv2 = Fp4.mul(u, v);
      tv1 = Fp4.mul(tv1, tv2);
      let y1 = Fp4.pow(tv1, c12);
      y1 = Fp4.mul(y1, tv2);
      const y2 = Fp4.mul(y1, c22);
      const tv3 = Fp4.mul(Fp4.sqr(y1), v);
      const isQR = Fp4.eql(tv3, u);
      let y = Fp4.cmov(y2, y1, isQR);
      return { isValid: isQR, value: y };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp4, opts) {
  validateField(Fp4);
  const { A, B, Z } = opts;
  if (!Fp4.isValid(A) || !Fp4.isValid(B) || !Fp4.isValid(Z))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp4, Z);
  if (!Fp4.isOdd)
    throw new Error("Field does not have .isOdd()");
  return (u) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
    tv1 = Fp4.sqr(u);
    tv1 = Fp4.mul(tv1, Z);
    tv2 = Fp4.sqr(tv1);
    tv2 = Fp4.add(tv2, tv1);
    tv3 = Fp4.add(tv2, Fp4.ONE);
    tv3 = Fp4.mul(tv3, B);
    tv4 = Fp4.cmov(Z, Fp4.neg(tv2), !Fp4.eql(tv2, Fp4.ZERO));
    tv4 = Fp4.mul(tv4, A);
    tv2 = Fp4.sqr(tv3);
    tv6 = Fp4.sqr(tv4);
    tv5 = Fp4.mul(tv6, A);
    tv2 = Fp4.add(tv2, tv5);
    tv2 = Fp4.mul(tv2, tv3);
    tv6 = Fp4.mul(tv6, tv4);
    tv5 = Fp4.mul(tv6, B);
    tv2 = Fp4.add(tv2, tv5);
    x = Fp4.mul(tv1, tv3);
    const { isValid, value: value3 } = sqrtRatio(tv2, tv6);
    y = Fp4.mul(tv1, u);
    y = Fp4.mul(y, value3);
    x = Fp4.cmov(x, tv3, isValid);
    y = Fp4.cmov(y, value3, isValid);
    const e1 = Fp4.isOdd(u) === Fp4.isOdd(y);
    y = Fp4.cmov(Fp4.neg(y), y, e1);
    const tv4_inv = FpInvertBatch(Fp4, [tv4], true)[0];
    x = Fp4.mul(x, tv4_inv);
    return { x, y };
  };
}

// node_modules/@noble/curves/esm/abstract/bls.js
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n3 = BigInt(2);
var _3n3 = BigInt(3);
function NAfDecomposition(a) {
  const res = [];
  for (; a > _1n5; a >>= _1n5) {
    if ((a & _1n5) === _0n5)
      res.unshift(0);
    else if ((a & _3n3) === _3n3) {
      res.unshift(-1);
      a += _1n5;
    } else
      res.unshift(1);
  }
  return res;
}
function bls(CURVE) {
  const { Fp: Fp4, Fr, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 } = CURVE.fields;
  const BLS_X_IS_NEGATIVE = CURVE.params.xNegative;
  const TWIST = CURVE.params.twistType;
  const G1_ = weierstrassPoints(CURVE.G1);
  const G1 = Object.assign(G1_, createHasher2(G1_.Point, CURVE.G1.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G1.htfDefaults
  }));
  const G2_ = weierstrassPoints(CURVE.G2);
  const G2 = Object.assign(G2_, createHasher2(G2_.Point, CURVE.G2.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G2.htfDefaults
  }));
  let lineFunction;
  if (TWIST === "multiplicative") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul014(f, c0, Fp22.mul(c1, Px), Fp22.mul(c2, Py));
  } else if (TWIST === "divisive") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul034(f, Fp22.mul(c2, Py), Fp22.mul(c1, Px), c0);
  } else
    throw new Error("bls: unknown twist type");
  const Fp2div2 = Fp22.div(Fp22.ONE, Fp22.mul(Fp22.ONE, _2n3));
  function pointDouble(ell, Rx, Ry, Rz) {
    const t0 = Fp22.sqr(Ry);
    const t1 = Fp22.sqr(Rz);
    const t2 = Fp22.mulByB(Fp22.mul(t1, _3n3));
    const t3 = Fp22.mul(t2, _3n3);
    const t4 = Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(Ry, Rz)), t1), t0);
    const c0 = Fp22.sub(t2, t0);
    const c1 = Fp22.mul(Fp22.sqr(Rx), _3n3);
    const c2 = Fp22.neg(t4);
    ell.push([c0, c1, c2]);
    Rx = Fp22.mul(Fp22.mul(Fp22.mul(Fp22.sub(t0, t3), Rx), Ry), Fp2div2);
    Ry = Fp22.sub(Fp22.sqr(Fp22.mul(Fp22.add(t0, t3), Fp2div2)), Fp22.mul(Fp22.sqr(t2), _3n3));
    Rz = Fp22.mul(t0, t4);
    return { Rx, Ry, Rz };
  }
  function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
    const t0 = Fp22.sub(Ry, Fp22.mul(Qy, Rz));
    const t1 = Fp22.sub(Rx, Fp22.mul(Qx, Rz));
    const c0 = Fp22.sub(Fp22.mul(t0, Qx), Fp22.mul(t1, Qy));
    const c1 = Fp22.neg(t0);
    const c2 = t1;
    ell.push([c0, c1, c2]);
    const t2 = Fp22.sqr(t1);
    const t3 = Fp22.mul(t2, t1);
    const t4 = Fp22.mul(t2, Rx);
    const t5 = Fp22.add(Fp22.sub(t3, Fp22.mul(t4, _2n3)), Fp22.mul(Fp22.sqr(t0), Rz));
    Rx = Fp22.mul(t1, t5);
    Ry = Fp22.sub(Fp22.mul(Fp22.sub(t4, t5), t0), Fp22.mul(t3, Ry));
    Rz = Fp22.mul(Rz, t3);
    return { Rx, Ry, Rz };
  }
  const ATE_NAF = NAfDecomposition(CURVE.params.ateLoopSize);
  const calcPairingPrecomputes = memoized((point) => {
    const p = point;
    const { x, y } = p.toAffine();
    const Qx = x, Qy = y, negQy = Fp22.neg(y);
    let Rx = Qx, Ry = Qy, Rz = Fp22.ONE;
    const ell = [];
    for (const bit of ATE_NAF) {
      const cur = [];
      ({ Rx, Ry, Rz } = pointDouble(cur, Rx, Ry, Rz));
      if (bit)
        ({ Rx, Ry, Rz } = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
      ell.push(cur);
    }
    if (CURVE.postPrecompute) {
      const last = ell[ell.length - 1];
      CURVE.postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
    }
    return ell;
  });
  function millerLoopBatch(pairs, withFinalExponent = false) {
    let f12 = Fp122.ONE;
    if (pairs.length) {
      const ellLen = pairs[0][0].length;
      for (let i = 0; i < ellLen; i++) {
        f12 = Fp122.sqr(f12);
        for (const [ell, Px, Py] of pairs) {
          for (const [c0, c1, c2] of ell[i])
            f12 = lineFunction(c0, c1, c2, f12, Px, Py);
        }
      }
    }
    if (BLS_X_IS_NEGATIVE)
      f12 = Fp122.conjugate(f12);
    return withFinalExponent ? Fp122.finalExponentiate(f12) : f12;
  }
  function pairingBatch(pairs, withFinalExponent = true) {
    const res = [];
    normalizeZ(G1.Point, "pz", pairs.map(({ g1 }) => g1));
    normalizeZ(G2.Point, "pz", pairs.map(({ g2 }) => g2));
    for (const { g1, g2 } of pairs) {
      if (g1.is0() || g2.is0())
        throw new Error("pairing is not available for ZERO point");
      g1.assertValidity();
      g2.assertValidity();
      const Qa = g1.toAffine();
      res.push([calcPairingPrecomputes(g2), Qa.x, Qa.y]);
    }
    return millerLoopBatch(res, withFinalExponent);
  }
  function pairing(Q, P, withFinalExponent = true) {
    return pairingBatch([{ g1: Q, g2: P }], withFinalExponent);
  }
  const rand = CURVE.randomBytes || randomBytes;
  const utils = {
    randomPrivateKey: () => {
      const length = getMinHashLength(Fr.ORDER);
      return mapHashToField(rand(length), Fr.ORDER);
    },
    calcPairingPrecomputes
  };
  function aNonEmpty(arr) {
    if (!Array.isArray(arr) || arr.length === 0)
      throw new Error("expected non-empty array");
  }
  function normP1(point) {
    return point instanceof G1.Point ? point : G1.Point.fromHex(point);
  }
  function normP2(point) {
    return point instanceof G2.Point ? point : Signature.fromHex(point);
  }
  function createBls(PubCurve, SigCurve) {
    function normPub(point) {
      return point instanceof PubCurve.Point ? point : PubCurve.Point.fromHex(point);
    }
    function normSig(point) {
      return point instanceof SigCurve.Point ? point : SigCurve.Point.fromHex(point);
    }
    function amsg(m) {
      if (!(m instanceof SigCurve.Point))
        throw new Error(`expected valid message hashed to ${isLongSigs ? "G2" : "G1"} curve`);
      return m;
    }
    const isLongSigs = SigCurve.Point.Fp.BYTES > PubCurve.Point.Fp.BYTES;
    return {
      // P = pk x G
      getPublicKey(privateKey) {
        return PubCurve.Point.fromPrivateKey(privateKey);
      },
      // S = pk x H(m)
      sign(message, privateKey, unusedArg) {
        if (unusedArg != null)
          throw new Error("sign() expects 2 arguments");
        amsg(message).assertValidity();
        return message.multiply(PubCurve.normPrivateKeyToScalar(privateKey));
      },
      // Checks if pairing of public key & hash is equal to pairing of generator & signature.
      // e(P, H(m)) == e(G, S)
      // e(S, G) == e(H(m), P)
      verify(signature, message, publicKey, unusedArg) {
        if (unusedArg != null)
          throw new Error("verify() expects 3 arguments");
        signature = normSig(signature);
        publicKey = normPub(publicKey);
        const P = publicKey.negate();
        const G = PubCurve.Point.BASE;
        const Hm = amsg(message);
        const S = signature;
        const exp_ = isLongSigs ? [
          { g1: P, g2: Hm },
          { g1: G, g2: S }
        ] : [
          { g1: Hm, g2: P },
          { g1: S, g2: G }
        ];
        const exp = pairingBatch(exp_);
        return Fp122.eql(exp, Fp122.ONE);
      },
      // Adds a bunch of public key points together.
      // pk1 + pk2 + pk3 = pkA
      aggregatePublicKeys(publicKeys) {
        aNonEmpty(publicKeys);
        publicKeys = publicKeys.map((pub) => normPub(pub));
        const agg = publicKeys.reduce((sum, p) => sum.add(p), PubCurve.Point.ZERO);
        agg.assertValidity();
        return agg;
      },
      // Adds a bunch of signature points together.
      // pk1 + pk2 + pk3 = pkA
      aggregateSignatures(signatures) {
        aNonEmpty(signatures);
        signatures = signatures.map((sig) => normSig(sig));
        const agg = signatures.reduce((sum, s) => sum.add(s), SigCurve.Point.ZERO);
        agg.assertValidity();
        return agg;
      },
      hash(messageBytes, DST) {
        abytes(messageBytes);
        const opts = DST ? { DST } : void 0;
        return SigCurve.hashToCurve(messageBytes, opts);
      },
      // @ts-ignore
      Signature: isLongSigs ? CURVE.G2.Signature : CURVE.G1.ShortSignature
    };
  }
  const longSignatures = createBls(G1, G2);
  const shortSignatures = createBls(G2, G1);
  const { ShortSignature } = CURVE.G1;
  const { Signature } = CURVE.G2;
  function normP1Hash(point, htfOpts) {
    return point instanceof G1.Point ? point : shortSignatures.hash(ensureBytes("point", point), htfOpts == null ? void 0 : htfOpts.DST);
  }
  function normP2Hash(point, htfOpts) {
    return point instanceof G2.Point ? point : longSignatures.hash(ensureBytes("point", point), htfOpts == null ? void 0 : htfOpts.DST);
  }
  function getPublicKey(privateKey) {
    return longSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function getPublicKeyForShortSignatures(privateKey) {
    return shortSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function sign(message, privateKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    const S = longSignatures.sign(Hm, privateKey);
    return message instanceof G2.Point ? S : Signature.toBytes(S);
  }
  function signShortSignature(message, privateKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    const S = shortSignatures.sign(Hm, privateKey);
    return message instanceof G1.Point ? S : ShortSignature.toBytes(S);
  }
  function verify2(signature, message, publicKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    return longSignatures.verify(signature, Hm, publicKey);
  }
  function verifyShortSignature(signature, message, publicKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    return shortSignatures.verify(signature, Hm, publicKey);
  }
  function aggregatePublicKeys(publicKeys) {
    const agg = longSignatures.aggregatePublicKeys(publicKeys);
    return publicKeys[0] instanceof G1.Point ? agg : agg.toBytes(true);
  }
  function aggregateSignatures(signatures) {
    const agg = longSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G2.Point ? agg : Signature.toBytes(agg);
  }
  function aggregateShortSignatures(signatures) {
    const agg = shortSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G1.Point ? agg : ShortSignature.toBytes(agg);
  }
  function verifyBatch(signature, messages, publicKeys, htfOpts) {
    aNonEmpty(messages);
    if (publicKeys.length !== messages.length)
      throw new Error("amount of public keys and messages should be equal");
    const sig = normP2(signature);
    const nMessages = messages.map((i) => normP2Hash(i, htfOpts));
    const nPublicKeys = publicKeys.map(normP1);
    const messagePubKeyMap = /* @__PURE__ */ new Map();
    for (let i = 0; i < nPublicKeys.length; i++) {
      const pub = nPublicKeys[i];
      const msg = nMessages[i];
      let keys = messagePubKeyMap.get(msg);
      if (keys === void 0) {
        keys = [];
        messagePubKeyMap.set(msg, keys);
      }
      keys.push(pub);
    }
    const paired = [];
    try {
      for (const [msg, keys] of messagePubKeyMap) {
        const groupPublicKey = keys.reduce((acc, msg2) => acc.add(msg2));
        paired.push({ g1: groupPublicKey, g2: msg });
      }
      paired.push({ g1: G1.Point.BASE.negate(), g2: sig });
      return Fp122.eql(pairingBatch(paired), Fp122.ONE);
    } catch {
      return false;
    }
  }
  G1.Point.BASE.precompute(4);
  return {
    longSignatures,
    shortSignatures,
    millerLoopBatch,
    pairing,
    pairingBatch,
    // TODO!!!
    verifyBatch,
    curves: {
      G1: G1_.Point,
      G2: G2_.Point
    },
    fields: {
      Fr,
      Fp: Fp4,
      Fp2: Fp22,
      Fp6: Fp62,
      Fp12: Fp122
    },
    params: {
      ateLoopSize: CURVE.params.ateLoopSize,
      twistType: CURVE.params.twistType,
      // deprecated
      r: CURVE.params.r,
      G1b: CURVE.G1.b,
      G2b: CURVE.G2.b
    },
    utils,
    // deprecated
    getPublicKey,
    getPublicKeyForShortSignatures,
    sign,
    signShortSignature,
    verify: verify2,
    verifyShortSignature,
    aggregatePublicKeys,
    aggregateSignatures,
    aggregateShortSignatures,
    G1,
    G2,
    Signature,
    ShortSignature
  };
}

// node_modules/@noble/curves/esm/abstract/tower.js
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n4 = BigInt(2);
var _3n4 = BigInt(3);
function calcFrobeniusCoefficients(Fp4, nonResidue, modulus, degree, num = 1, divisor) {
  const _divisor = BigInt(divisor === void 0 ? degree : divisor);
  const towerModulus = modulus ** BigInt(degree);
  const res = [];
  for (let i = 0; i < num; i++) {
    const a = BigInt(i + 1);
    const powers = [];
    for (let j = 0, qPower = _1n6; j < degree; j++) {
      const power = (a * qPower - a) / _divisor % towerModulus;
      powers.push(Fp4.pow(nonResidue, power));
      qPower *= modulus;
    }
    res.push(powers);
  }
  return res;
}
function psiFrobenius(Fp4, Fp22, base) {
  const PSI_X = Fp22.pow(base, (Fp4.ORDER - _1n6) / _3n4);
  const PSI_Y = Fp22.pow(base, (Fp4.ORDER - _1n6) / _2n4);
  function psi(x, y) {
    const x2 = Fp22.mul(Fp22.frobeniusMap(x, 1), PSI_X);
    const y2 = Fp22.mul(Fp22.frobeniusMap(y, 1), PSI_Y);
    return [x2, y2];
  }
  const PSI2_X = Fp22.pow(base, (Fp4.ORDER ** _2n4 - _1n6) / _3n4);
  const PSI2_Y = Fp22.pow(base, (Fp4.ORDER ** _2n4 - _1n6) / _2n4);
  if (!Fp22.eql(PSI2_Y, Fp22.neg(Fp22.ONE)))
    throw new Error("psiFrobenius: PSI2_Y!==-1");
  function psi2(x, y) {
    return [Fp22.mul(x, PSI2_X), Fp22.neg(y)];
  }
  const mapAffine = (fn) => (c, P) => {
    const affine = P.toAffine();
    const p = fn(affine.x, affine.y);
    return c.fromAffine({ x: p[0], y: p[1] });
  };
  const G2psi3 = mapAffine(psi);
  const G2psi22 = mapAffine(psi2);
  return { psi, psi2, G2psi: G2psi3, G2psi2: G2psi22, PSI_X, PSI_Y, PSI2_X, PSI2_Y };
}
function tower12(opts) {
  const { ORDER } = opts;
  const Fp4 = Field(ORDER);
  const FpNONRESIDUE = Fp4.create(opts.NONRESIDUE || BigInt(-1));
  const Fpdiv2 = Fp4.div(Fp4.ONE, _2n4);
  const FP2_FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp4, FpNONRESIDUE, Fp4.ORDER, 2)[0];
  const Fp2Add = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp4.add(c0, r0),
    c1: Fp4.add(c1, r1)
  });
  const Fp2Subtract = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp4.sub(c0, r0),
    c1: Fp4.sub(c1, r1)
  });
  const Fp2Multiply = ({ c0, c1 }, rhs) => {
    if (typeof rhs === "bigint")
      return { c0: Fp4.mul(c0, rhs), c1: Fp4.mul(c1, rhs) };
    const { c0: r0, c1: r1 } = rhs;
    let t1 = Fp4.mul(c0, r0);
    let t2 = Fp4.mul(c1, r1);
    const o0 = Fp4.sub(t1, t2);
    const o1 = Fp4.sub(Fp4.mul(Fp4.add(c0, c1), Fp4.add(r0, r1)), Fp4.add(t1, t2));
    return { c0: o0, c1: o1 };
  };
  const Fp2Square = ({ c0, c1 }) => {
    const a = Fp4.add(c0, c1);
    const b = Fp4.sub(c0, c1);
    const c = Fp4.add(c0, c0);
    return { c0: Fp4.mul(a, b), c1: Fp4.mul(c, c1) };
  };
  const Fp2fromBigTuple = (tuple) => {
    if (tuple.length !== 2)
      throw new Error("invalid tuple");
    const fps = tuple.map((n) => Fp4.create(n));
    return { c0: fps[0], c1: fps[1] };
  };
  function isValidC(num, ORDER2) {
    return typeof num === "bigint" && _0n6 <= num && num < ORDER2;
  }
  const FP2_ORDER = ORDER * ORDER;
  const Fp2Nonresidue = Fp2fromBigTuple(opts.FP2_NONRESIDUE);
  const Fp22 = {
    ORDER: FP2_ORDER,
    isLE: Fp4.isLE,
    NONRESIDUE: Fp2Nonresidue,
    BITS: bitLen(FP2_ORDER),
    BYTES: Math.ceil(bitLen(FP2_ORDER) / 8),
    MASK: bitMask(bitLen(FP2_ORDER)),
    ZERO: { c0: Fp4.ZERO, c1: Fp4.ZERO },
    ONE: { c0: Fp4.ONE, c1: Fp4.ZERO },
    create: (num) => num,
    isValid: ({ c0, c1 }) => isValidC(c0, FP2_ORDER) && isValidC(c1, FP2_ORDER),
    is0: ({ c0, c1 }) => Fp4.is0(c0) && Fp4.is0(c1),
    isValidNot0: (num) => !Fp22.is0(num) && Fp22.isValid(num),
    eql: ({ c0, c1 }, { c0: r0, c1: r1 }) => Fp4.eql(c0, r0) && Fp4.eql(c1, r1),
    neg: ({ c0, c1 }) => ({ c0: Fp4.neg(c0), c1: Fp4.neg(c1) }),
    pow: (num, power) => FpPow(Fp22, num, power),
    invertBatch: (nums) => FpInvertBatch(Fp22, nums),
    // Normalized
    add: Fp2Add,
    sub: Fp2Subtract,
    mul: Fp2Multiply,
    sqr: Fp2Square,
    // NonNormalized stuff
    addN: Fp2Add,
    subN: Fp2Subtract,
    mulN: Fp2Multiply,
    sqrN: Fp2Square,
    // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
    div: (lhs, rhs) => Fp22.mul(lhs, typeof rhs === "bigint" ? Fp4.inv(Fp4.create(rhs)) : Fp22.inv(rhs)),
    inv: ({ c0: a, c1: b }) => {
      const factor = Fp4.inv(Fp4.create(a * a + b * b));
      return { c0: Fp4.mul(factor, Fp4.create(a)), c1: Fp4.mul(factor, Fp4.create(-b)) };
    },
    sqrt: (num) => {
      if (opts.Fp2sqrt)
        return opts.Fp2sqrt(num);
      const { c0, c1 } = num;
      if (Fp4.is0(c1)) {
        if (FpLegendre(Fp4, c0) === 1)
          return Fp22.create({ c0: Fp4.sqrt(c0), c1: Fp4.ZERO });
        else
          return Fp22.create({ c0: Fp4.ZERO, c1: Fp4.sqrt(Fp4.div(c0, FpNONRESIDUE)) });
      }
      const a = Fp4.sqrt(Fp4.sub(Fp4.sqr(c0), Fp4.mul(Fp4.sqr(c1), FpNONRESIDUE)));
      let d = Fp4.mul(Fp4.add(a, c0), Fpdiv2);
      const legendre = FpLegendre(Fp4, d);
      if (legendre === -1)
        d = Fp4.sub(d, a);
      const a0 = Fp4.sqrt(d);
      const candidateSqrt = Fp22.create({ c0: a0, c1: Fp4.div(Fp4.mul(c1, Fpdiv2), a0) });
      if (!Fp22.eql(Fp22.sqr(candidateSqrt), num))
        throw new Error("Cannot find square root");
      const x1 = candidateSqrt;
      const x2 = Fp22.neg(x1);
      const { re: re1, im: im1 } = Fp22.reim(x1);
      const { re: re2, im: im2 } = Fp22.reim(x2);
      if (im1 > im2 || im1 === im2 && re1 > re2)
        return x1;
      return x2;
    },
    // Same as sgn0_m_eq_2 in RFC 9380
    isOdd: (x) => {
      const { re: x0, im: x1 } = Fp22.reim(x);
      const sign_0 = x0 % _2n4;
      const zero_0 = x0 === _0n6;
      const sign_1 = x1 % _2n4;
      return BigInt(sign_0 || zero_0 && sign_1) == _1n6;
    },
    // Bytes util
    fromBytes(b) {
      if (b.length !== Fp22.BYTES)
        throw new Error("fromBytes invalid length=" + b.length);
      return { c0: Fp4.fromBytes(b.subarray(0, Fp4.BYTES)), c1: Fp4.fromBytes(b.subarray(Fp4.BYTES)) };
    },
    toBytes: ({ c0, c1 }) => concatBytes(Fp4.toBytes(c0), Fp4.toBytes(c1)),
    cmov: ({ c0, c1 }, { c0: r0, c1: r1 }, c) => ({
      c0: Fp4.cmov(c0, r0, c),
      c1: Fp4.cmov(c1, r1, c)
    }),
    reim: ({ c0, c1 }) => ({ re: c0, im: c1 }),
    // multiply by u + 1
    mulByNonresidue: ({ c0, c1 }) => Fp22.mul({ c0, c1 }, Fp2Nonresidue),
    mulByB: opts.Fp2mulByB,
    fromBigTuple: Fp2fromBigTuple,
    frobeniusMap: ({ c0, c1 }, power) => ({
      c0,
      c1: Fp4.mul(c1, FP2_FROBENIUS_COEFFICIENTS[power % 2])
    })
  };
  const Fp6Add = ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => ({
    c0: Fp22.add(c0, r0),
    c1: Fp22.add(c1, r1),
    c2: Fp22.add(c2, r2)
  });
  const Fp6Subtract = ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => ({
    c0: Fp22.sub(c0, r0),
    c1: Fp22.sub(c1, r1),
    c2: Fp22.sub(c2, r2)
  });
  const Fp6Multiply = ({ c0, c1, c2 }, rhs) => {
    if (typeof rhs === "bigint") {
      return {
        c0: Fp22.mul(c0, rhs),
        c1: Fp22.mul(c1, rhs),
        c2: Fp22.mul(c2, rhs)
      };
    }
    const { c0: r0, c1: r1, c2: r2 } = rhs;
    const t0 = Fp22.mul(c0, r0);
    const t1 = Fp22.mul(c1, r1);
    const t2 = Fp22.mul(c2, r2);
    return {
      // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
      c0: Fp22.add(t0, Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), Fp22.add(r1, r2)), Fp22.add(t1, t2)))),
      // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
      c1: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c1), Fp22.add(r0, r1)), Fp22.add(t0, t1)), Fp22.mulByNonresidue(t2)),
      // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
      c2: Fp22.sub(Fp22.add(t1, Fp22.mul(Fp22.add(c0, c2), Fp22.add(r0, r2))), Fp22.add(t0, t2))
    };
  };
  const Fp6Square = ({ c0, c1, c2 }) => {
    let t0 = Fp22.sqr(c0);
    let t1 = Fp22.mul(Fp22.mul(c0, c1), _2n4);
    let t3 = Fp22.mul(Fp22.mul(c1, c2), _2n4);
    let t4 = Fp22.sqr(c2);
    return {
      c0: Fp22.add(Fp22.mulByNonresidue(t3), t0),
      // T3 * (u + 1) + T0
      c1: Fp22.add(Fp22.mulByNonresidue(t4), t1),
      // T4 * (u + 1) + T1
      // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
      c2: Fp22.sub(Fp22.sub(Fp22.add(Fp22.add(t1, Fp22.sqr(Fp22.add(Fp22.sub(c0, c1), c2))), t3), t0), t4)
    };
  };
  const [FP6_FROBENIUS_COEFFICIENTS_1, FP6_FROBENIUS_COEFFICIENTS_2] = calcFrobeniusCoefficients(Fp22, Fp2Nonresidue, Fp4.ORDER, 6, 2, 3);
  const Fp62 = {
    ORDER: Fp22.ORDER,
    // TODO: unused, but need to verify
    isLE: Fp22.isLE,
    BITS: 3 * Fp22.BITS,
    BYTES: 3 * Fp22.BYTES,
    MASK: bitMask(3 * Fp22.BITS),
    ZERO: { c0: Fp22.ZERO, c1: Fp22.ZERO, c2: Fp22.ZERO },
    ONE: { c0: Fp22.ONE, c1: Fp22.ZERO, c2: Fp22.ZERO },
    create: (num) => num,
    isValid: ({ c0, c1, c2 }) => Fp22.isValid(c0) && Fp22.isValid(c1) && Fp22.isValid(c2),
    is0: ({ c0, c1, c2 }) => Fp22.is0(c0) && Fp22.is0(c1) && Fp22.is0(c2),
    isValidNot0: (num) => !Fp62.is0(num) && Fp62.isValid(num),
    neg: ({ c0, c1, c2 }) => ({ c0: Fp22.neg(c0), c1: Fp22.neg(c1), c2: Fp22.neg(c2) }),
    eql: ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => Fp22.eql(c0, r0) && Fp22.eql(c1, r1) && Fp22.eql(c2, r2),
    sqrt: notImplemented,
    // Do we need division by bigint at all? Should be done via order:
    div: (lhs, rhs) => Fp62.mul(lhs, typeof rhs === "bigint" ? Fp4.inv(Fp4.create(rhs)) : Fp62.inv(rhs)),
    pow: (num, power) => FpPow(Fp62, num, power),
    invertBatch: (nums) => FpInvertBatch(Fp62, nums),
    // Normalized
    add: Fp6Add,
    sub: Fp6Subtract,
    mul: Fp6Multiply,
    sqr: Fp6Square,
    // NonNormalized stuff
    addN: Fp6Add,
    subN: Fp6Subtract,
    mulN: Fp6Multiply,
    sqrN: Fp6Square,
    inv: ({ c0, c1, c2 }) => {
      let t0 = Fp22.sub(Fp22.sqr(c0), Fp22.mulByNonresidue(Fp22.mul(c2, c1)));
      let t1 = Fp22.sub(Fp22.mulByNonresidue(Fp22.sqr(c2)), Fp22.mul(c0, c1));
      let t2 = Fp22.sub(Fp22.sqr(c1), Fp22.mul(c0, c2));
      let t4 = Fp22.inv(Fp22.add(Fp22.mulByNonresidue(Fp22.add(Fp22.mul(c2, t1), Fp22.mul(c1, t2))), Fp22.mul(c0, t0)));
      return { c0: Fp22.mul(t4, t0), c1: Fp22.mul(t4, t1), c2: Fp22.mul(t4, t2) };
    },
    // Bytes utils
    fromBytes: (b) => {
      if (b.length !== Fp62.BYTES)
        throw new Error("fromBytes invalid length=" + b.length);
      return {
        c0: Fp22.fromBytes(b.subarray(0, Fp22.BYTES)),
        c1: Fp22.fromBytes(b.subarray(Fp22.BYTES, 2 * Fp22.BYTES)),
        c2: Fp22.fromBytes(b.subarray(2 * Fp22.BYTES))
      };
    },
    toBytes: ({ c0, c1, c2 }) => concatBytes(Fp22.toBytes(c0), Fp22.toBytes(c1), Fp22.toBytes(c2)),
    cmov: ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c) => ({
      c0: Fp22.cmov(c0, r0, c),
      c1: Fp22.cmov(c1, r1, c),
      c2: Fp22.cmov(c2, r2, c)
    }),
    fromBigSix: (t) => {
      if (!Array.isArray(t) || t.length !== 6)
        throw new Error("invalid Fp6 usage");
      return {
        c0: Fp22.fromBigTuple(t.slice(0, 2)),
        c1: Fp22.fromBigTuple(t.slice(2, 4)),
        c2: Fp22.fromBigTuple(t.slice(4, 6))
      };
    },
    frobeniusMap: ({ c0, c1, c2 }, power) => ({
      c0: Fp22.frobeniusMap(c0, power),
      c1: Fp22.mul(Fp22.frobeniusMap(c1, power), FP6_FROBENIUS_COEFFICIENTS_1[power % 6]),
      c2: Fp22.mul(Fp22.frobeniusMap(c2, power), FP6_FROBENIUS_COEFFICIENTS_2[power % 6])
    }),
    mulByFp2: ({ c0, c1, c2 }, rhs) => ({
      c0: Fp22.mul(c0, rhs),
      c1: Fp22.mul(c1, rhs),
      c2: Fp22.mul(c2, rhs)
    }),
    mulByNonresidue: ({ c0, c1, c2 }) => ({ c0: Fp22.mulByNonresidue(c2), c1: c0, c2: c1 }),
    // Sparse multiplication
    mul1: ({ c0, c1, c2 }, b1) => ({
      c0: Fp22.mulByNonresidue(Fp22.mul(c2, b1)),
      c1: Fp22.mul(c0, b1),
      c2: Fp22.mul(c1, b1)
    }),
    // Sparse multiplication
    mul01({ c0, c1, c2 }, b0, b1) {
      let t0 = Fp22.mul(c0, b0);
      let t1 = Fp22.mul(c1, b1);
      return {
        // ((c1 + c2) * b1 - T1) * (u + 1) + T0
        c0: Fp22.add(Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), b1), t1)), t0),
        // (b0 + b1) * (c0 + c1) - T0 - T1
        c1: Fp22.sub(Fp22.sub(Fp22.mul(Fp22.add(b0, b1), Fp22.add(c0, c1)), t0), t1),
        // (c0 + c2) * b0 - T0 + T1
        c2: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c2), b0), t0), t1)
      };
    }
  };
  const FP12_FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp22, Fp2Nonresidue, Fp4.ORDER, 12, 1, 6)[0];
  const Fp12Add = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp62.add(c0, r0),
    c1: Fp62.add(c1, r1)
  });
  const Fp12Subtract = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp62.sub(c0, r0),
    c1: Fp62.sub(c1, r1)
  });
  const Fp12Multiply = ({ c0, c1 }, rhs) => {
    if (typeof rhs === "bigint")
      return { c0: Fp62.mul(c0, rhs), c1: Fp62.mul(c1, rhs) };
    let { c0: r0, c1: r1 } = rhs;
    let t1 = Fp62.mul(c0, r0);
    let t2 = Fp62.mul(c1, r1);
    return {
      c0: Fp62.add(t1, Fp62.mulByNonresidue(t2)),
      // T1 + T2 * v
      // (c0 + c1) * (r0 + r1) - (T1 + T2)
      c1: Fp62.sub(Fp62.mul(Fp62.add(c0, c1), Fp62.add(r0, r1)), Fp62.add(t1, t2))
    };
  };
  const Fp12Square = ({ c0, c1 }) => {
    let ab = Fp62.mul(c0, c1);
    return {
      // (c1 * v + c0) * (c0 + c1) - AB - AB * v
      c0: Fp62.sub(Fp62.sub(Fp62.mul(Fp62.add(Fp62.mulByNonresidue(c1), c0), Fp62.add(c0, c1)), ab), Fp62.mulByNonresidue(ab)),
      c1: Fp62.add(ab, ab)
    };
  };
  function Fp4Square2(a, b) {
    const a2 = Fp22.sqr(a);
    const b2 = Fp22.sqr(b);
    return {
      first: Fp22.add(Fp22.mulByNonresidue(b2), a2),
      // b² * Nonresidue + a²
      second: Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(a, b)), a2), b2)
      // (a + b)² - a² - b²
    };
  }
  const Fp122 = {
    ORDER: Fp22.ORDER,
    // TODO: unused, but need to verify
    isLE: Fp62.isLE,
    BITS: 2 * Fp62.BITS,
    BYTES: 2 * Fp62.BYTES,
    MASK: bitMask(2 * Fp62.BITS),
    ZERO: { c0: Fp62.ZERO, c1: Fp62.ZERO },
    ONE: { c0: Fp62.ONE, c1: Fp62.ZERO },
    create: (num) => num,
    isValid: ({ c0, c1 }) => Fp62.isValid(c0) && Fp62.isValid(c1),
    is0: ({ c0, c1 }) => Fp62.is0(c0) && Fp62.is0(c1),
    isValidNot0: (num) => !Fp122.is0(num) && Fp122.isValid(num),
    neg: ({ c0, c1 }) => ({ c0: Fp62.neg(c0), c1: Fp62.neg(c1) }),
    eql: ({ c0, c1 }, { c0: r0, c1: r1 }) => Fp62.eql(c0, r0) && Fp62.eql(c1, r1),
    sqrt: notImplemented,
    inv: ({ c0, c1 }) => {
      let t = Fp62.inv(Fp62.sub(Fp62.sqr(c0), Fp62.mulByNonresidue(Fp62.sqr(c1))));
      return { c0: Fp62.mul(c0, t), c1: Fp62.neg(Fp62.mul(c1, t)) };
    },
    div: (lhs, rhs) => Fp122.mul(lhs, typeof rhs === "bigint" ? Fp4.inv(Fp4.create(rhs)) : Fp122.inv(rhs)),
    pow: (num, power) => FpPow(Fp122, num, power),
    invertBatch: (nums) => FpInvertBatch(Fp122, nums),
    // Normalized
    add: Fp12Add,
    sub: Fp12Subtract,
    mul: Fp12Multiply,
    sqr: Fp12Square,
    // NonNormalized stuff
    addN: Fp12Add,
    subN: Fp12Subtract,
    mulN: Fp12Multiply,
    sqrN: Fp12Square,
    // Bytes utils
    fromBytes: (b) => {
      if (b.length !== Fp122.BYTES)
        throw new Error("fromBytes invalid length=" + b.length);
      return {
        c0: Fp62.fromBytes(b.subarray(0, Fp62.BYTES)),
        c1: Fp62.fromBytes(b.subarray(Fp62.BYTES))
      };
    },
    toBytes: ({ c0, c1 }) => concatBytes(Fp62.toBytes(c0), Fp62.toBytes(c1)),
    cmov: ({ c0, c1 }, { c0: r0, c1: r1 }, c) => ({
      c0: Fp62.cmov(c0, r0, c),
      c1: Fp62.cmov(c1, r1, c)
    }),
    // Utils
    // toString() {
    //   return '' + 'Fp12(' + this.c0 + this.c1 + '* w');
    // },
    // fromTuple(c: [Fp6, Fp6]) {
    //   return new Fp12(...c);
    // }
    fromBigTwelve: (t) => ({
      c0: Fp62.fromBigSix(t.slice(0, 6)),
      c1: Fp62.fromBigSix(t.slice(6, 12))
    }),
    // Raises to q**i -th power
    frobeniusMap(lhs, power) {
      const { c0, c1, c2 } = Fp62.frobeniusMap(lhs.c1, power);
      const coeff = FP12_FROBENIUS_COEFFICIENTS[power % 12];
      return {
        c0: Fp62.frobeniusMap(lhs.c0, power),
        c1: Fp62.create({
          c0: Fp22.mul(c0, coeff),
          c1: Fp22.mul(c1, coeff),
          c2: Fp22.mul(c2, coeff)
        })
      };
    },
    mulByFp2: ({ c0, c1 }, rhs) => ({
      c0: Fp62.mulByFp2(c0, rhs),
      c1: Fp62.mulByFp2(c1, rhs)
    }),
    conjugate: ({ c0, c1 }) => ({ c0, c1: Fp62.neg(c1) }),
    // Sparse multiplication
    mul014: ({ c0, c1 }, o0, o1, o4) => {
      let t0 = Fp62.mul01(c0, o0, o1);
      let t1 = Fp62.mul1(c1, o4);
      return {
        c0: Fp62.add(Fp62.mulByNonresidue(t1), t0),
        // T1 * v + T0
        // (c1 + c0) * [o0, o1+o4] - T0 - T1
        c1: Fp62.sub(Fp62.sub(Fp62.mul01(Fp62.add(c1, c0), o0, Fp22.add(o1, o4)), t0), t1)
      };
    },
    mul034: ({ c0, c1 }, o0, o3, o4) => {
      const a = Fp62.create({
        c0: Fp22.mul(c0.c0, o0),
        c1: Fp22.mul(c0.c1, o0),
        c2: Fp22.mul(c0.c2, o0)
      });
      const b = Fp62.mul01(c1, o3, o4);
      const e = Fp62.mul01(Fp62.add(c0, c1), Fp22.add(o0, o3), o4);
      return {
        c0: Fp62.add(Fp62.mulByNonresidue(b), a),
        c1: Fp62.sub(e, Fp62.add(a, b))
      };
    },
    // A cyclotomic group is a subgroup of Fp^n defined by
    //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
    // The result of any pairing is in a cyclotomic subgroup
    // https://eprint.iacr.org/2009/565.pdf
    _cyclotomicSquare: opts.Fp12cyclotomicSquare,
    _cyclotomicExp: opts.Fp12cyclotomicExp,
    // https://eprint.iacr.org/2010/354.pdf
    // https://eprint.iacr.org/2009/565.pdf
    finalExponentiate: opts.Fp12finalExponentiate
  };
  return { Fp: Fp4, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122, Fp4Square: Fp4Square2 };
}

// node_modules/@noble/curves/esm/bls12-381.js
var _0n7 = BigInt(0);
var _1n7 = BigInt(1);
var _2n5 = BigInt(2);
var _3n5 = BigInt(3);
var _4n3 = BigInt(4);
var BLS_X = BigInt("0xd201000000010000");
var BLS_X_LEN = bitLen(BLS_X);
var bls12_381_CURVE_G1 = {
  p: BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"),
  n: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"),
  h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
  a: _0n7,
  b: _4n3,
  Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
  Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1")
};
var bls12_381_Fr = Field(bls12_381_CURVE_G1.n);
var { Fp, Fp2, Fp6, Fp4Square, Fp12 } = tower12({
  // Order of Fp
  ORDER: bls12_381_CURVE_G1.p,
  // Finite extension field over irreducible polynominal.
  // Fp(u) / (u² - β) where β = -1
  FP2_NONRESIDUE: [_1n7, _1n7],
  Fp2mulByB: ({ c0, c1 }) => {
    const t0 = Fp.mul(c0, _4n3);
    const t1 = Fp.mul(c1, _4n3);
    return { c0: Fp.sub(t0, t1), c1: Fp.add(t0, t1) };
  },
  // Fp12
  // A cyclotomic group is a subgroup of Fp^n defined by
  //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
  // The result of any pairing is in a cyclotomic subgroup
  // https://eprint.iacr.org/2009/565.pdf
  Fp12cyclotomicSquare: ({ c0, c1 }) => {
    const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
    const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
    const { first: t3, second: t4 } = Fp4Square(c0c0, c1c1);
    const { first: t5, second: t6 } = Fp4Square(c1c0, c0c2);
    const { first: t7, second: t8 } = Fp4Square(c0c1, c1c2);
    const t9 = Fp2.mulByNonresidue(t8);
    return {
      c0: Fp6.create({
        c0: Fp2.add(Fp2.mul(Fp2.sub(t3, c0c0), _2n5), t3),
        // 2 * (T3 - c0c0)  + T3
        c1: Fp2.add(Fp2.mul(Fp2.sub(t5, c0c1), _2n5), t5),
        // 2 * (T5 - c0c1)  + T5
        c2: Fp2.add(Fp2.mul(Fp2.sub(t7, c0c2), _2n5), t7)
      }),
      // 2 * (T7 - c0c2)  + T7
      c1: Fp6.create({
        c0: Fp2.add(Fp2.mul(Fp2.add(t9, c1c0), _2n5), t9),
        // 2 * (T9 + c1c0) + T9
        c1: Fp2.add(Fp2.mul(Fp2.add(t4, c1c1), _2n5), t4),
        // 2 * (T4 + c1c1) + T4
        c2: Fp2.add(Fp2.mul(Fp2.add(t6, c1c2), _2n5), t6)
      })
    };
  },
  Fp12cyclotomicExp(num, n) {
    let z = Fp12.ONE;
    for (let i = BLS_X_LEN - 1; i >= 0; i--) {
      z = Fp12._cyclotomicSquare(z);
      if (bitGet(n, i))
        z = Fp12.mul(z, num);
    }
    return z;
  },
  // https://eprint.iacr.org/2010/354.pdf
  // https://eprint.iacr.org/2009/565.pdf
  Fp12finalExponentiate: (num) => {
    const x = BLS_X;
    const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
    const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
    const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x));
    const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
    const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x));
    const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x));
    const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x)), Fp12._cyclotomicSquare(t2));
    const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x));
    const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
    const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
    const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
    const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
    return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
  }
});
var { G2psi, G2psi2 } = psiFrobenius(Fp, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
var htfDefaults = Object.freeze({
  DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  p: Fp.ORDER,
  m: 2,
  k: 128,
  expand: "xmd",
  hash: sha256
});
var bls12_381_CURVE_G2 = {
  p: Fp2.ORDER,
  n: bls12_381_CURVE_G1.n,
  h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
  a: Fp2.ZERO,
  b: Fp2.fromBigTuple([_4n3, _4n3]),
  Gx: Fp2.fromBigTuple([
    BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"),
    BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")
  ]),
  Gy: Fp2.fromBigTuple([
    BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"),
    BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")
  ])
};
var COMPZERO = setMask(Fp.toBytes(_0n7), { infinity: true, compressed: true });
function parseMask(bytes) {
  bytes = bytes.slice();
  const mask = bytes[0] & 224;
  const compressed = !!(mask >> 7 & 1);
  const infinity = !!(mask >> 6 & 1);
  const sort = !!(mask >> 5 & 1);
  bytes[0] &= 31;
  return { compressed, infinity, sort, value: bytes };
}
function setMask(bytes, mask) {
  if (bytes[0] & 224)
    throw new Error("setMask: non-empty mask");
  if (mask.compressed)
    bytes[0] |= 128;
  if (mask.infinity)
    bytes[0] |= 64;
  if (mask.sort)
    bytes[0] |= 32;
  return bytes;
}
function pointG1ToBytes(_c, point, isComp) {
  const { BYTES: L, ORDER: P } = Fp;
  const is0 = point.is0();
  const { x, y } = point.toAffine();
  if (isComp) {
    if (is0)
      return COMPZERO.slice();
    const sort = Boolean(y * _2n5 / P);
    return setMask(numberToBytesBE(x, L), { compressed: true, sort });
  } else {
    if (is0) {
      return concatBytes(Uint8Array.of(64), new Uint8Array(2 * L - 1));
    } else {
      return concatBytes(numberToBytesBE(x, L), numberToBytesBE(y, L));
    }
  }
}
function signatureG1ToBytes(point) {
  point.assertValidity();
  const { BYTES: L, ORDER: P } = Fp;
  const { x, y } = point.toAffine();
  if (point.is0())
    return COMPZERO.slice();
  const sort = Boolean(y * _2n5 / P);
  return setMask(numberToBytesBE(x, L), { compressed: true, sort });
}
function pointG1FromBytes(bytes) {
  const { compressed, infinity, sort, value: value3 } = parseMask(bytes);
  const { BYTES: L, ORDER: P } = Fp;
  if (value3.length === 48 && compressed) {
    const compressedValue = bytesToNumberBE(value3);
    const x = Fp.create(compressedValue & Fp.MASK);
    if (infinity) {
      if (x !== _0n7)
        throw new Error("invalid G1 point: non-empty, at infinity, with compression");
      return { x: _0n7, y: _0n7 };
    }
    const right = Fp.add(Fp.pow(x, _3n5), Fp.create(bls12_381_CURVE_G1.b));
    let y = Fp.sqrt(right);
    if (!y)
      throw new Error("invalid G1 point: compressed point");
    if (y * _2n5 / P !== BigInt(sort))
      y = Fp.neg(y);
    return { x: Fp.create(x), y: Fp.create(y) };
  } else if (value3.length === 96 && !compressed) {
    const x = bytesToNumberBE(value3.subarray(0, L));
    const y = bytesToNumberBE(value3.subarray(L));
    if (infinity) {
      if (x !== _0n7 || y !== _0n7)
        throw new Error("G1: non-empty point at infinity");
      return bls12_381.G1.Point.ZERO.toAffine();
    }
    return { x: Fp.create(x), y: Fp.create(y) };
  } else {
    throw new Error("invalid G1 point: expected 48/96 bytes");
  }
}
function signatureG1FromBytes(hex) {
  const { infinity, sort, value: value3 } = parseMask(ensureBytes("signatureHex", hex, 48));
  const P = Fp.ORDER;
  const Point = bls12_381.G1.Point;
  const compressedValue = bytesToNumberBE(value3);
  if (infinity)
    return Point.ZERO;
  const x = Fp.create(compressedValue & Fp.MASK);
  const right = Fp.add(Fp.pow(x, _3n5), Fp.create(bls12_381_CURVE_G1.b));
  let y = Fp.sqrt(right);
  if (!y)
    throw new Error("invalid G1 point: compressed");
  const aflag = BigInt(sort);
  if (y * _2n5 / P !== aflag)
    y = Fp.neg(y);
  const point = Point.fromAffine({ x, y });
  point.assertValidity();
  return point;
}
function pointG2ToBytes(_c, point, isComp) {
  const { BYTES: L, ORDER: P } = Fp;
  const is0 = point.is0();
  const { x, y } = point.toAffine();
  if (isComp) {
    if (is0)
      return concatBytes(COMPZERO, numberToBytesBE(_0n7, L));
    const flag = Boolean(y.c1 === _0n7 ? y.c0 * _2n5 / P : y.c1 * _2n5 / P);
    return concatBytes(setMask(numberToBytesBE(x.c1, L), { compressed: true, sort: flag }), numberToBytesBE(x.c0, L));
  } else {
    if (is0)
      return concatBytes(Uint8Array.of(64), new Uint8Array(4 * L - 1));
    const { re: x0, im: x1 } = Fp2.reim(x);
    const { re: y0, im: y1 } = Fp2.reim(y);
    return concatBytes(numberToBytesBE(x1, L), numberToBytesBE(x0, L), numberToBytesBE(y1, L), numberToBytesBE(y0, L));
  }
}
function signatureG2ToBytes(point) {
  point.assertValidity();
  const { BYTES: L } = Fp;
  if (point.is0())
    return concatBytes(COMPZERO, numberToBytesBE(_0n7, L));
  const { x, y } = point.toAffine();
  const { re: x0, im: x1 } = Fp2.reim(x);
  const { re: y0, im: y1 } = Fp2.reim(y);
  const tmp = y1 > _0n7 ? y1 * _2n5 : y0 * _2n5;
  const sort = Boolean(tmp / Fp.ORDER & _1n7);
  const z2 = x0;
  return concatBytes(setMask(numberToBytesBE(x1, L), { sort, compressed: true }), numberToBytesBE(z2, L));
}
function pointG2FromBytes(bytes) {
  const { BYTES: L, ORDER: P } = Fp;
  const { compressed, infinity, sort, value: value3 } = parseMask(bytes);
  if (!compressed && !infinity && sort || // 00100000
  !compressed && infinity && sort || // 01100000
  sort && infinity && compressed) {
    throw new Error("invalid encoding flag: " + (bytes[0] & 224));
  }
  const slc = (b, from, to) => bytesToNumberBE(b.slice(from, to));
  if (value3.length === 96 && compressed) {
    if (infinity) {
      if (value3.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
        throw new Error("invalid G2 point: compressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x_1 = slc(value3, 0, L);
    const x_0 = slc(value3, L, 2 * L);
    const x = Fp2.create({ c0: Fp.create(x_0), c1: Fp.create(x_1) });
    const right = Fp2.add(Fp2.pow(x, _3n5), bls12_381_CURVE_G2.b);
    let y = Fp2.sqrt(right);
    const Y_bit = y.c1 === _0n7 ? y.c0 * _2n5 / P : y.c1 * _2n5 / P ? _1n7 : _0n7;
    y = sort && Y_bit > 0 ? y : Fp2.neg(y);
    return { x, y };
  } else if (value3.length === 192 && !compressed) {
    if (infinity) {
      if (value3.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
        throw new Error("invalid G2 point: uncompressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x1 = slc(value3, 0 * L, 1 * L);
    const x0 = slc(value3, 1 * L, 2 * L);
    const y1 = slc(value3, 2 * L, 3 * L);
    const y0 = slc(value3, 3 * L, 4 * L);
    return { x: Fp2.fromBigTuple([x0, x1]), y: Fp2.fromBigTuple([y0, y1]) };
  } else {
    throw new Error("invalid G2 point: expected 96/192 bytes");
  }
}
function signatureG2FromBytes(hex) {
  const { ORDER: P } = Fp;
  const { infinity, sort, value: value3 } = parseMask(ensureBytes("signatureHex", hex));
  const Point = bls12_381.G2.Point;
  const half = value3.length / 2;
  if (half !== 48 && half !== 96)
    throw new Error("invalid compressed signature length, expected 96/192 bytes");
  const z1 = bytesToNumberBE(value3.slice(0, half));
  const z2 = bytesToNumberBE(value3.slice(half));
  if (infinity)
    return Point.ZERO;
  const x1 = Fp.create(z1 & Fp.MASK);
  const x2 = Fp.create(z2);
  const x = Fp2.create({ c0: x2, c1: x1 });
  const y2 = Fp2.add(Fp2.pow(x, _3n5), bls12_381_CURVE_G2.b);
  let y = Fp2.sqrt(y2);
  if (!y)
    throw new Error("Failed to find a square root");
  const { re: y0, im: y1 } = Fp2.reim(y);
  const aflag1 = BigInt(sort);
  const isGreater = y1 > _0n7 && y1 * _2n5 / P !== aflag1;
  const is0 = y1 === _0n7 && y0 * _2n5 / P !== aflag1;
  if (isGreater || is0)
    y = Fp2.neg(y);
  const point = Point.fromAffine({ x, y });
  point.assertValidity();
  return point;
}
var bls12_381 = bls({
  // Fields
  fields: {
    Fp,
    Fp2,
    Fp6,
    Fp12,
    Fr: bls12_381_Fr
  },
  // G1: y² = x³ + 4
  G1: {
    ...bls12_381_CURVE_G1,
    Fp,
    htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    isTorsionFree: (c, point) => {
      const beta = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
      const phi = new c(Fp.mul(point.px, beta), point.py, point.pz);
      const xP = point.multiplyUnsafe(BLS_X).negate();
      const u2P = xP.multiplyUnsafe(BLS_X);
      return u2P.equals(phi);
    },
    // Clear cofactor of G1
    // https://eprint.iacr.org/2019/403
    clearCofactor: (_c, point) => {
      return point.multiplyUnsafe(BLS_X).add(point);
    },
    mapToCurve: mapToG1,
    fromBytes: pointG1FromBytes,
    toBytes: pointG1ToBytes,
    ShortSignature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG1FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG1FromBytes(hex);
      },
      toBytes(point) {
        return signatureG1ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG1ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG1ToBytes(point));
      }
    }
  },
  G2: {
    ...bls12_381_CURVE_G2,
    Fp: Fp2,
    // https://datatracker.ietf.org/doc/html/rfc9380#name-clearing-the-cofactor
    // https://datatracker.ietf.org/doc/html/rfc9380#name-cofactor-clearing-for-bls12
    hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
    htfDefaults: { ...htfDefaults },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    mapToCurve: mapToG2,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    // Older version: https://eprint.iacr.org/2019/814.pdf
    isTorsionFree: (c, P) => {
      return P.multiplyUnsafe(BLS_X).negate().equals(G2psi(c, P));
    },
    // Maps the point into the prime-order subgroup G2.
    // clear_cofactor_bls12381_g2 from RFC 9380.
    // https://eprint.iacr.org/2017/419.pdf
    // prettier-ignore
    clearCofactor: (c, P) => {
      const x = BLS_X;
      let t1 = P.multiplyUnsafe(x).negate();
      let t2 = G2psi(c, P);
      let t3 = P.double();
      t3 = G2psi2(c, t3);
      t3 = t3.subtract(t2);
      t2 = t1.add(t2);
      t2 = t2.multiplyUnsafe(x).negate();
      t3 = t3.add(t2);
      t3 = t3.subtract(t1);
      const Q = t3.subtract(P);
      return Q;
    },
    fromBytes: pointG2FromBytes,
    toBytes: pointG2ToBytes,
    Signature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG2FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG2FromBytes(hex);
      },
      toBytes(point) {
        return signatureG2ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG2ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG2ToBytes(point));
      }
    }
  },
  params: {
    ateLoopSize: BLS_X,
    // The BLS parameter x for BLS12-381
    r: bls12_381_CURVE_G1.n,
    // order; z⁴ − z² + 1; CURVE.n from other curves
    xNegative: true,
    twistType: "multiplicative"
  },
  htfDefaults,
  hash: sha256
});
var isogenyMapG2 = isogenyMap(Fp2, [
  // xNum
  [
    [
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
    ],
    [
      "0x0",
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
    ],
    [
      "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
      "0x0"
    ]
  ],
  // xDen
  [
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
    ],
    [
      "0xc",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ],
  // yNum
  [
    [
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
    ],
    [
      "0x0",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
    ],
    [
      "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
      "0x0"
    ]
  ],
  // yDen
  [
    [
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
    ],
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
    ],
    [
      "0x12",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ]
].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt)))));
var isogenyMapG1 = isogenyMap(Fp, [
  // xNum
  [
    "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
    "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
    "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
    "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
    "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
    "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
    "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
    "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
    "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
    "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
    "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
    "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
  ],
  // xDen
  [
    "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
    "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
    "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
    "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
    "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
    "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
    "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
    "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
    "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
    "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ],
  // yNum
  [
    "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
    "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
    "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
    "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
    "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
    "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
    "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
    "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
    "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
    "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
    "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
    "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
    "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
    "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
    "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
    "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
  ],
  // yDen
  [
    "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
    "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
    "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
    "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
    "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
    "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
    "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
    "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
    "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
    "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
    "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
    "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
    "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
    "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
    "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ]
].map((i) => i.map((j) => BigInt(j))));
var G1_SWU = mapToCurveSimpleSWU(Fp, {
  A: Fp.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
  B: Fp.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
  Z: Fp.create(BigInt(11))
});
var G2_SWU = mapToCurveSimpleSWU(Fp2, {
  A: Fp2.create({ c0: Fp.create(_0n7), c1: Fp.create(BigInt(240)) }),
  // A' = 240 * I
  B: Fp2.create({ c0: Fp.create(BigInt(1012)), c1: Fp.create(BigInt(1012)) }),
  // B' = 1012 * (1 + I)
  Z: Fp2.create({ c0: Fp.create(BigInt(-2)), c1: Fp.create(BigInt(-1)) })
  // Z: -(2 + I)
});
function mapToG1(scalars) {
  const { x, y } = G1_SWU(Fp.create(scalars[0]));
  return isogenyMapG1(x, y);
}
function mapToG2(scalars) {
  const { x, y } = G2_SWU(Fp2.fromBigTuple(scalars));
  return isogenyMapG2(x, y);
}

// node_modules/@dfinity/agent/lib/esm/utils/bls.js
var verify;
function blsVerify(pk, sig, msg) {
  const primaryKey = typeof pk === "string" ? pk : toHex(pk);
  const signature = typeof sig === "string" ? sig : toHex(sig);
  const message = typeof msg === "string" ? msg : toHex(msg);
  return bls12_381.verifyShortSignature(signature, message, primaryKey);
}

// node_modules/@dfinity/agent/lib/esm/utils/leb.js
var decodeLeb128 = (buf) => {
  return lebDecode(new PipeArrayBuffer(buf));
};
var decodeTime = (buf) => {
  const decoded = decodeLeb128(buf);
  return new Date(Number(decoded) / 1e6);
};

// node_modules/@dfinity/agent/lib/esm/auth.js
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var domainSeparator = new TextEncoder().encode("\nic-request");
var SignIdentity = class {
  /**
   * Get the principal represented by this identity. Normally should be a
   * `Principal.selfAuthenticating()`.
   */
  getPrincipal() {
    if (!this._principal) {
      this._principal = Principal.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
    }
    return this._principal;
  }
  /**
   * Transform a request into a signed version of the request. This is done last
   * after the transforms on the body of a request. The returned object can be
   * anything, but must be serializable to CBOR.
   * @param request - internet computer request to transform
   */
  async transformRequest(request2) {
    const { body } = request2, fields = __rest(request2, ["body"]);
    const requestId = requestIdOf(body);
    return Object.assign(Object.assign({}, fields), { body: {
      content: body,
      sender_pubkey: this.getPublicKey().toDer(),
      sender_sig: await this.sign(concat(domainSeparator, requestId))
    } });
  }
};
var AnonymousIdentity = class {
  getPrincipal() {
    return Principal.anonymous();
  }
  async transformRequest(request2) {
    return Object.assign(Object.assign({}, request2), { body: { content: request2.body } });
  }
};
function createIdentityDescriptor(identity) {
  const identityIndicator = "getPublicKey" in identity ? { type: "PublicKeyIdentity", publicKey: toHex(identity.getPublicKey().toDer()) } : { type: "AnonymousIdentity" };
  return identityIndicator;
}

// node_modules/@dfinity/agent/lib/esm/agent/http/transforms.js
var cbor2 = __toESM(require_src2());

// node_modules/@dfinity/agent/lib/esm/utils/random.js
var randomNumber = () => {
  if (typeof window !== "undefined" && !!window.crypto && !!window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.randomInt) {
    return crypto.randomInt(0, 4294967295);
  }
  return Math.floor(Math.random() * 4294967295);
};

// node_modules/@dfinity/agent/lib/esm/agent/http/types.js
var SubmitRequestType;
(function(SubmitRequestType2) {
  SubmitRequestType2["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
function makeNonce() {
  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);
  const rand1 = randomNumber();
  const rand2 = randomNumber();
  const rand3 = randomNumber();
  const rand4 = randomNumber();
  view.setUint32(0, rand1);
  view.setUint32(4, rand2);
  view.setUint32(8, rand3);
  view.setUint32(12, rand4);
  return buffer;
}

// node_modules/@dfinity/agent/lib/esm/agent/http/transforms.js
var NANOSECONDS_PER_MILLISECONDS = BigInt(1e6);
var REPLICA_PERMITTED_DRIFT_MILLISECONDS = 60 * 1e3;
var Expiry = class {
  constructor(deltaInMSec) {
    if (deltaInMSec < 90 * 1e3) {
      const raw_value2 = BigInt(Date.now() + deltaInMSec) * NANOSECONDS_PER_MILLISECONDS;
      const ingress_as_seconds2 = raw_value2 / BigInt(1e9);
      this._value = ingress_as_seconds2 * BigInt(1e9);
      return;
    }
    const raw_value = BigInt(Math.floor(Date.now() + deltaInMSec - REPLICA_PERMITTED_DRIFT_MILLISECONDS)) * NANOSECONDS_PER_MILLISECONDS;
    const ingress_as_seconds = raw_value / BigInt(1e9);
    const ingress_as_minutes = ingress_as_seconds / BigInt(60);
    const rounded_down_nanos = ingress_as_minutes * BigInt(60) * BigInt(1e9);
    this._value = rounded_down_nanos;
  }
  toCBOR() {
    return cbor2.value.u64(this._value.toString(16), 16);
  }
  toHash() {
    return lebEncode(this._value);
  }
};
function makeNonceTransform(nonceFn = makeNonce) {
  return async (request2) => {
    const headers = request2.request.headers;
    request2.request.headers = headers;
    if (request2.endpoint === "call") {
      request2.body.nonce = nonceFn();
    }
  };
}
function makeExpiryTransform(delayInMilliseconds) {
  return async (request2) => {
    request2.body.ingress_expiry = new Expiry(delayInMilliseconds);
  };
}
function httpHeadersTransform(headers) {
  const headerFields = [];
  headers.forEach((value3, key) => {
    headerFields.push([key, value3]);
  });
  return headerFields;
}

// node_modules/@dfinity/agent/lib/esm/agent/http/errors.js
var AgentHTTPResponseError = class extends AgentError {
  constructor(message, response) {
    super(message);
    this.response = response;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var AgentCallError = class extends AgentError {
  constructor(message, response, requestId, senderPubkey, senderSig, ingressExpiry) {
    super(message);
    this.response = response;
    this.requestId = requestId;
    this.senderPubkey = senderPubkey;
    this.senderSig = senderSig;
    this.ingressExpiry = ingressExpiry;
    this.name = "AgentCallError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var AgentQueryError = class extends AgentError {
  constructor(message, response, requestId, senderPubkey, senderSig, ingressExpiry) {
    super(message);
    this.response = response;
    this.requestId = requestId;
    this.senderPubkey = senderPubkey;
    this.senderSig = senderSig;
    this.ingressExpiry = ingressExpiry;
    this.name = "AgentQueryError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var AgentReadStateError = class extends AgentError {
  constructor(message, response, requestId, senderPubkey, senderSig, ingressExpiry) {
    super(message);
    this.response = response;
    this.requestId = requestId;
    this.senderPubkey = senderPubkey;
    this.senderSig = senderSig;
    this.ingressExpiry = ingressExpiry;
    this.name = "AgentReadStateError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// node_modules/@noble/curves/esm/abstract/edwards.js
var _0n8 = BigInt(0);
var _1n8 = BigInt(1);
var _2n6 = BigInt(2);
var _8n2 = BigInt(8);
var VERIFY_DEFAULT = { zip215: true };
function isEdValidXY(Fp4, CURVE, x, y) {
  const x2 = Fp4.sqr(x);
  const y2 = Fp4.sqr(y);
  const left = Fp4.add(Fp4.mul(CURVE.a, x2), y2);
  const right = Fp4.add(Fp4.ONE, Fp4.mul(CURVE.d, Fp4.mul(x2, y2)));
  return Fp4.eql(left, right);
}
function edwards(CURVE, curveOpts = {}) {
  const { Fp: Fp4, Fn } = _createCurveFields("edwards", CURVE, curveOpts);
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(curveOpts, {}, { uvRatio: "function" });
  const MASK = _2n6 << BigInt(Fn.BYTES * 8) - _1n8;
  const modP = (n) => Fp4.create(n);
  const uvRatio2 = curveOpts.uvRatio || ((u, v) => {
    try {
      return { isValid: true, value: Fp4.sqrt(Fp4.div(u, v)) };
    } catch (e) {
      return { isValid: false, value: _0n8 };
    }
  });
  if (!isEdValidXY(Fp4, CURVE, CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  function acoord(title, n, banZero = false) {
    const min = banZero ? _1n8 : _0n8;
    aInRange("coordinate " + title, n, min, MASK);
    return n;
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { ex: x, ey: y, ez: z } = p;
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? _8n2 : Fp4.inv(z);
    const ax = modP(x * iz);
    const ay = modP(y * iz);
    const zz = modP(z * iz);
    if (is0)
      return { x: _0n8, y: _1n8 };
    if (zz !== _1n8)
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    const { a, d } = CURVE;
    if (p.is0())
      throw new Error("bad point: ZERO");
    const { ex: X, ey: Y, ez: Z, et: T } = p;
    const X2 = modP(X * X);
    const Y2 = modP(Y * Y);
    const Z2 = modP(Z * Z);
    const Z4 = modP(Z2 * Z2);
    const aX2 = modP(X2 * a);
    const left = modP(Z2 * modP(aX2 + Y2));
    const right = modP(Z4 + modP(d * modP(X2 * Y2)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X * Y);
    const ZT = modP(Z * T);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(ex, ey, ez, et) {
      this.ex = acoord("x", ex);
      this.ey = acoord("y", ey);
      this.ez = acoord("z", ez, true);
      this.et = acoord("t", et);
      Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(p) {
      if (p instanceof Point)
        throw new Error("extended point not allowed");
      const { x, y } = p || {};
      acoord("x", x);
      acoord("y", y);
      return new Point(x, y, _1n8, modP(x * y));
    }
    static normalizeZ(points) {
      return normalizeZ(Point, "ez", points);
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    precompute(windowSize = 8, isLazy = true) {
      wnaf.setWindowSize(this, windowSize);
      if (!isLazy)
        this.multiply(_2n6);
      return this;
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const { ex: X2, ey: Y2, ez: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.ex), this.ey, this.ez, modP(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const A = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n6 * modP(Z1 * Z1));
      const D = modP(a * A);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A - B);
      const G = D + B;
      const F = G - C;
      const H = D - B;
      const X3 = modP(E * F);
      const Y3 = modP(G * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a, d } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
      const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
      const A = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d * T2);
      const D = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
      const F = D - C;
      const G = D + C;
      const H = modP(B - a * A);
      const X3 = modP(E * F);
      const Y3 = modP(G * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    // Constant-time multiplication.
    multiply(scalar) {
      const n = scalar;
      aInRange("scalar", n, _1n8, CURVE_ORDER);
      const { p, f } = wnaf.wNAFCached(this, n, Point.normalizeZ);
      return Point.normalizeZ([p, f])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      const n = scalar;
      aInRange("scalar", n, _0n8, CURVE_ORDER);
      if (n === _0n8)
        return Point.ZERO;
      if (this.is0() || n === _1n8)
        return this;
      return wnaf.wNAFCachedUnsafe(this, n, Point.normalizeZ, acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.wNAFCachedUnsafe(this, CURVE_ORDER).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    clearCofactor() {
      if (cofactor === _1n8)
        return this;
      return this.multiplyUnsafe(cofactor);
    }
    static fromBytes(bytes, zip215 = false) {
      abytes(bytes);
      return this.fromHex(bytes, zip215);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(hex, zip215 = false) {
      const { d, a } = CURVE;
      const len = Fp4.BYTES;
      hex = ensureBytes("pointHex", hex, len);
      abool("zip215", zip215);
      const normed = hex.slice();
      const lastByte = hex[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE(normed);
      const max = zip215 ? MASK : Fp4.ORDER;
      aInRange("pointHex.y", y, _0n8, max);
      const y2 = modP(y * y);
      const u = modP(y2 - _1n8);
      const v = modP(d * y2 - a);
      let { isValid, value: x } = uvRatio2(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & _1n8) === _1n8;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x === _0n8 && isLastByteOdd)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x = modP(-x);
      return Point.fromAffine({ x, y });
    }
    static fromPrivateScalar(scalar) {
      return Point.BASE.multiply(scalar);
    }
    toBytes() {
      const { x, y } = this.toAffine();
      const bytes = numberToBytesLE(y, Fp4.BYTES);
      bytes[bytes.length - 1] |= x & _1n8 ? 128 : 0;
      return bytes;
    }
    /** @deprecated use `toBytes` */
    toRawBytes() {
      return this.toBytes();
    }
    toHex() {
      return bytesToHex(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n8, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n8, _1n8, _1n8, _0n8);
  Point.Fp = Fp4;
  Point.Fn = Fn;
  const wnaf = wNAF(Point, Fn.BYTES * 8);
  return Point;
}
function eddsa(Point, eddsaOpts) {
  _validateObject(eddsaOpts, {
    hash: "function"
  }, {
    adjustScalarBytes: "function",
    randomBytes: "function",
    domain: "function",
    prehash: "function",
    mapToCurve: "function"
  });
  const { prehash, hash: cHash } = eddsaOpts;
  const { BASE: G, Fp: Fp4, Fn } = Point;
  const CURVE_ORDER = Fn.ORDER;
  const randomBytes_ = eddsaOpts.randomBytes || randomBytes;
  const adjustScalarBytes2 = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
  const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
    abool("phflag", phflag);
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function modN(a) {
    return Fn.create(a);
  }
  function modN_LE(hash2) {
    return modN(bytesToNumberLE(hash2));
  }
  function getPrivateScalar(key) {
    const len = Fp4.BYTES;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(key) {
    const { head, prefix, scalar } = getPrivateScalar(key);
    const point = G.multiply(scalar);
    const pointBytes = point.toBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(privKey) {
    return getExtendedPublicKey(privKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign(msg, privKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = G.multiply(r).toBytes();
    const k = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = modN(r + k * scalar);
    aInRange("signature.s", s, _0n8, CURVE_ORDER);
    const L = Fp4.BYTES;
    const res = concatBytes(R, numberToBytesLE(s, L));
    return ensureBytes("result", res, L * 2);
  }
  const verifyOpts = VERIFY_DEFAULT;
  function verify2(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = Fp4.BYTES;
    sig = ensureBytes("signature", sig, 2 * len);
    msg = ensureBytes("message", msg);
    publicKey = ensureBytes("publicKey", publicKey, len);
    if (zip215 !== void 0)
      abool("zip215", zip215);
    if (prehash)
      msg = prehash(msg);
    const s = bytesToNumberLE(sig.slice(len, 2 * len));
    let A, R, SB;
    try {
      A = Point.fromHex(publicKey, zip215);
      R = Point.fromHex(sig.slice(0, len), zip215);
      SB = G.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = hashDomainToScalar(context, R.toBytes(), A.toBytes(), msg);
    const RkA = R.add(A.multiplyUnsafe(k));
    return RkA.subtract(SB).clearCofactor().is0();
  }
  G.precompute(8);
  const utils = {
    getExtendedPublicKey,
    /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
    randomPrivateKey: () => randomBytes_(Fp4.BYTES),
    /**
     * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
     * values. This slows down first getPublicKey() by milliseconds (see Speed section),
     * but allows to speed-up subsequent getPublicKey() calls up to 20x.
     * @param windowSize 2, 4, 8, 16
     */
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return { getPublicKey, sign, verify: verify2, utils, Point };
}
function _eddsa_legacy_opts_to_new(c) {
  const CURVE = {
    a: c.a,
    d: c.d,
    p: c.Fp.ORDER,
    n: c.n,
    h: c.h,
    Gx: c.Gx,
    Gy: c.Gy
  };
  const Fp4 = c.Fp;
  const Fn = Field(CURVE.n, c.nBitLength, true);
  const curveOpts = { Fp: Fp4, Fn, uvRatio: c.uvRatio };
  const eddsaOpts = {
    hash: c.hash,
    randomBytes: c.randomBytes,
    adjustScalarBytes: c.adjustScalarBytes,
    domain: c.domain,
    prehash: c.prehash,
    mapToCurve: c.mapToCurve
  };
  return { CURVE, curveOpts, eddsaOpts };
}
function _eddsa_new_output_to_legacy(c, eddsa2) {
  const legacy = Object.assign({}, eddsa2, { ExtendedPoint: eddsa2.Point, CURVE: c });
  return legacy;
}
function twistedEdwards(c) {
  const { CURVE, curveOpts, eddsaOpts } = _eddsa_legacy_opts_to_new(c);
  const Point = edwards(CURVE, curveOpts);
  const EDDSA = eddsa(Point, eddsaOpts);
  return _eddsa_new_output_to_legacy(c, EDDSA);
}

// node_modules/@noble/curves/esm/abstract/montgomery.js
var _0n9 = BigInt(0);
var _1n9 = BigInt(1);
var _2n7 = BigInt(2);
function validateOpts(curve) {
  _validateObject(curve, {
    adjustScalarBytes: "function",
    powPminus2: "function"
  });
  return Object.freeze({ ...curve });
}
function montgomery(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { P, type, adjustScalarBytes: adjustScalarBytes2, powPminus2, randomBytes: rand } = CURVE;
  const is25519 = type === "x25519";
  if (!is25519 && type !== "x448")
    throw new Error("invalid type");
  const randomBytes_ = rand || randomBytes;
  const montgomeryBits = is25519 ? 255 : 448;
  const fieldLen = is25519 ? 32 : 56;
  const Gu = is25519 ? BigInt(9) : BigInt(5);
  const a24 = is25519 ? BigInt(121665) : BigInt(39081);
  const minScalar = is25519 ? _2n7 ** BigInt(254) : _2n7 ** BigInt(447);
  const maxAdded = is25519 ? BigInt(8) * _2n7 ** BigInt(251) - _1n9 : BigInt(4) * _2n7 ** BigInt(445) - _1n9;
  const maxScalar = minScalar + maxAdded + _1n9;
  const modP = (n) => mod(n, P);
  const GuBytes = encodeU(Gu);
  function encodeU(u) {
    return numberToBytesLE(modP(u), fieldLen);
  }
  function decodeU(u) {
    const _u = ensureBytes("u coordinate", u, fieldLen);
    if (is25519)
      _u[31] &= 127;
    return modP(bytesToNumberLE(_u));
  }
  function decodeScalar(scalar) {
    return bytesToNumberLE(adjustScalarBytes2(ensureBytes("scalar", scalar, fieldLen)));
  }
  function scalarMult(scalar, u) {
    const pu = montgomeryLadder(decodeU(u), decodeScalar(scalar));
    if (pu === _0n9)
      throw new Error("invalid private or public key received");
    return encodeU(pu);
  }
  function scalarMultBase(scalar) {
    return scalarMult(scalar, GuBytes);
  }
  function cswap(swap, x_2, x_3) {
    const dummy = modP(swap * (x_2 - x_3));
    x_2 = modP(x_2 - dummy);
    x_3 = modP(x_3 + dummy);
    return { x_2, x_3 };
  }
  function montgomeryLadder(u, scalar) {
    aInRange("u", u, _0n9, P);
    aInRange("scalar", scalar, minScalar, maxScalar);
    const k = scalar;
    const x_1 = u;
    let x_2 = _1n9;
    let z_2 = _0n9;
    let x_3 = u;
    let z_3 = _1n9;
    let swap = _0n9;
    for (let t = BigInt(montgomeryBits - 1); t >= _0n9; t--) {
      const k_t = k >> t & _1n9;
      swap ^= k_t;
      ({ x_2, x_3 } = cswap(swap, x_2, x_3));
      ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
      swap = k_t;
      const A = x_2 + z_2;
      const AA = modP(A * A);
      const B = x_2 - z_2;
      const BB = modP(B * B);
      const E = AA - BB;
      const C = x_3 + z_3;
      const D = x_3 - z_3;
      const DA = modP(D * A);
      const CB = modP(C * B);
      const dacb = DA + CB;
      const da_cb = DA - CB;
      x_3 = modP(dacb * dacb);
      z_3 = modP(x_1 * modP(da_cb * da_cb));
      x_2 = modP(AA * BB);
      z_2 = modP(E * (AA + modP(a24 * E)));
    }
    ({ x_2, x_3 } = cswap(swap, x_2, x_3));
    ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
    const z2 = powPminus2(z_2);
    return modP(x_2 * z2);
  }
  return {
    scalarMult,
    scalarMultBase,
    getSharedSecret: (privateKey, publicKey) => scalarMult(privateKey, publicKey),
    getPublicKey: (privateKey) => scalarMultBase(privateKey),
    utils: { randomPrivateKey: () => randomBytes_(fieldLen) },
    GuBytes: GuBytes.slice()
  };
}

// node_modules/@noble/curves/esm/ed25519.js
var _0n10 = BigInt(0);
var _1n10 = BigInt(1);
var _2n8 = BigInt(2);
var _3n6 = BigInt(3);
var _5n2 = BigInt(5);
var _8n3 = BigInt(8);
var ed25519_CURVE = {
  p: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: _8n3,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
};
function ed25519_pow_2_252_3(x) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P = ed25519_CURVE.p;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, _2n8, P) * b2 % P;
  const b5 = pow2(b4, _1n10, P) * x % P;
  const b10 = pow2(b5, _5n2, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n8, P) * x % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
var ED25519_SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v) {
  const P = ed25519_CURVE.p;
  const v3 = mod(v * v * v, P);
  const v7 = mod(v3 * v3 * v, P);
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod(u * v3 * pow, P);
  const vx2 = mod(v * x * x, P);
  const root1 = x;
  const root2 = mod(x * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (isNegativeLE(x, P))
    x = mod(-x, P);
  return { isValid: useRoot1 || useRoot2, value: x };
}
var Fp3 = (() => Field(ed25519_CURVE.p, void 0, true))();
var ed25519Defaults = (() => ({
  ...ed25519_CURVE,
  Fp: Fp3,
  hash: sha512,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
var ed25519 = (() => twistedEdwards(ed25519Defaults))();
function ed25519_domain(data, ctx, phflag) {
  if (ctx.length > 255)
    throw new Error("Context is too big");
  return concatBytes(utf8ToBytes("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
}
var ed25519ctx = (() => twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain
}))();
var ed25519ph = (() => twistedEdwards(Object.assign({}, ed25519Defaults, {
  domain: ed25519_domain,
  prehash: sha512
})))();
var x25519 = (() => {
  const P = ed25519_CURVE.p;
  return montgomery({
    P,
    type: "x25519",
    powPminus2: (x) => {
      const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
      return mod(pow2(pow_p_5_8, _3n6, P) * b2, P);
    },
    adjustScalarBytes
  });
})();
var ELL2_C1 = (() => (Fp3.ORDER + _3n6) / _8n3)();
var ELL2_C2 = (() => Fp3.pow(_2n8, ELL2_C1))();
var ELL2_C3 = (() => Fp3.sqrt(Fp3.neg(Fp3.ONE)))();
function map_to_curve_elligator2_curve25519(u) {
  const ELL2_C4 = (Fp3.ORDER - _5n2) / _8n3;
  const ELL2_J = BigInt(486662);
  let tv1 = Fp3.sqr(u);
  tv1 = Fp3.mul(tv1, _2n8);
  let xd = Fp3.add(tv1, Fp3.ONE);
  let x1n = Fp3.neg(ELL2_J);
  let tv2 = Fp3.sqr(xd);
  let gxd = Fp3.mul(tv2, xd);
  let gx1 = Fp3.mul(tv1, ELL2_J);
  gx1 = Fp3.mul(gx1, x1n);
  gx1 = Fp3.add(gx1, tv2);
  gx1 = Fp3.mul(gx1, x1n);
  let tv3 = Fp3.sqr(gxd);
  tv2 = Fp3.sqr(tv3);
  tv3 = Fp3.mul(tv3, gxd);
  tv3 = Fp3.mul(tv3, gx1);
  tv2 = Fp3.mul(tv2, tv3);
  let y11 = Fp3.pow(tv2, ELL2_C4);
  y11 = Fp3.mul(y11, tv3);
  let y12 = Fp3.mul(y11, ELL2_C3);
  tv2 = Fp3.sqr(y11);
  tv2 = Fp3.mul(tv2, gxd);
  let e1 = Fp3.eql(tv2, gx1);
  let y1 = Fp3.cmov(y12, y11, e1);
  let x2n = Fp3.mul(x1n, tv1);
  let y21 = Fp3.mul(y11, u);
  y21 = Fp3.mul(y21, ELL2_C2);
  let y22 = Fp3.mul(y21, ELL2_C3);
  let gx2 = Fp3.mul(gx1, tv1);
  tv2 = Fp3.sqr(y21);
  tv2 = Fp3.mul(tv2, gxd);
  let e2 = Fp3.eql(tv2, gx2);
  let y2 = Fp3.cmov(y22, y21, e2);
  tv2 = Fp3.sqr(y1);
  tv2 = Fp3.mul(tv2, gxd);
  let e3 = Fp3.eql(tv2, gx1);
  let xn = Fp3.cmov(x2n, x1n, e3);
  let y = Fp3.cmov(y2, y1, e3);
  let e4 = Fp3.isOdd(y);
  y = Fp3.cmov(y, Fp3.neg(y), e3 !== e4);
  return { xMn: xn, xMd: xd, yMn: y, yMd: _1n10 };
}
var ELL2_C1_EDWARDS = (() => FpSqrtEven(Fp3, Fp3.neg(BigInt(486664))))();
function map_to_curve_elligator2_edwards25519(u) {
  const { xMn, xMd, yMn, yMd } = map_to_curve_elligator2_curve25519(u);
  let xn = Fp3.mul(xMn, yMd);
  xn = Fp3.mul(xn, ELL2_C1_EDWARDS);
  let xd = Fp3.mul(xMd, yMn);
  let yn = Fp3.sub(xMn, xMd);
  let yd = Fp3.add(xMn, xMd);
  let tv1 = Fp3.mul(xd, yd);
  let e = Fp3.eql(tv1, Fp3.ZERO);
  xn = Fp3.cmov(xn, Fp3.ZERO, e);
  xd = Fp3.cmov(xd, Fp3.ONE, e);
  yn = Fp3.cmov(yn, Fp3.ONE, e);
  yd = Fp3.cmov(yd, Fp3.ONE, e);
  const [xd_inv, yd_inv] = FpInvertBatch(Fp3, [xd, yd], true);
  return { x: Fp3.mul(xn, xd_inv), y: Fp3.mul(yn, yd_inv) };
}
var ed25519_hasher = (() => createHasher2(ed25519.Point, (scalars) => map_to_curve_elligator2_edwards25519(scalars[0]), {
  DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
  encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
  p: Fp3.ORDER,
  m: 1,
  k: 128,
  expand: "xmd",
  hash: sha512
}))();
var hashToCurve = (() => ed25519_hasher.hashToCurve)();
var encodeToCurve = (() => ed25519_hasher.encodeToCurve)();
function aristp(other) {
  if (!(other instanceof RistPoint))
    throw new Error("RistrettoPoint expected");
}
var SQRT_M1 = ED25519_SQRT_M1;
var SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var invertSqrt = (number) => uvRatio(_1n10, number);
var MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var bytes255ToNumberLE = (bytes) => ed25519.CURVE.Fp.create(bytesToNumberLE(bytes) & MAX_255B);
function calcElligatorRistrettoMap(r0) {
  const { d } = ed25519.CURVE;
  const P = ed25519.CURVE.Fp.ORDER;
  const mod2 = ed25519.CURVE.Fp.create;
  const r = mod2(SQRT_M1 * r0 * r0);
  const Ns = mod2((r + _1n10) * ONE_MINUS_D_SQ);
  let c = BigInt(-1);
  const D = mod2((c - d * r) * mod2(r + d));
  let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
  let s_ = mod2(s * r0);
  if (!isNegativeLE(s_, P))
    s_ = mod2(-s_);
  if (!Ns_D_is_sq)
    s = s_;
  if (!Ns_D_is_sq)
    c = r;
  const Nt = mod2(c * (r - _1n10) * D_MINUS_ONE_SQ - D);
  const s2 = s * s;
  const W0 = mod2((s + s) * D);
  const W1 = mod2(Nt * SQRT_AD_MINUS_ONE);
  const W2 = mod2(_1n10 - s2);
  const W3 = mod2(_1n10 + s2);
  return new ed25519.Point(mod2(W0 * W3), mod2(W2 * W1), mod2(W1 * W3), mod2(W0 * W2));
}
var RistPoint = class _RistPoint {
  // Private property to discourage combining ExtendedPoint + RistrettoPoint
  // Always use Ristretto encoding/decoding instead.
  constructor(ep) {
    this.ep = ep;
  }
  static fromAffine(ap) {
    return new _RistPoint(ed25519.Point.fromAffine(ap));
  }
  /**
   * Takes uniform output of 64-byte hash function like sha512 and converts it to `RistrettoPoint`.
   * The hash-to-group operation applies Elligator twice and adds the results.
   * **Note:** this is one-way map, there is no conversion from point to hash.
   * Described in [RFC9380](https://www.rfc-editor.org/rfc/rfc9380#appendix-B) and on
   * the [website](https://ristretto.group/formulas/elligator.html).
   * @param hex 64-byte output of a hash function
   */
  static hashToCurve(hex) {
    hex = ensureBytes("ristrettoHash", hex, 64);
    const r1 = bytes255ToNumberLE(hex.slice(0, 32));
    const R1 = calcElligatorRistrettoMap(r1);
    const r2 = bytes255ToNumberLE(hex.slice(32, 64));
    const R2 = calcElligatorRistrettoMap(r2);
    return new _RistPoint(R1.add(R2));
  }
  static fromBytes(bytes) {
    abytes(bytes);
    return this.fromHex(bytes);
  }
  /**
   * Converts ristretto-encoded string to ristretto point.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
   * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
   */
  static fromHex(hex) {
    hex = ensureBytes("ristrettoHex", hex, 32);
    const { a, d } = ed25519.CURVE;
    const P = Fp3.ORDER;
    const mod2 = Fp3.create;
    const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
    const s = bytes255ToNumberLE(hex);
    if (!equalBytes(numberToBytesLE(s, 32), hex) || isNegativeLE(s, P))
      throw new Error(emsg);
    const s2 = mod2(s * s);
    const u1 = mod2(_1n10 + a * s2);
    const u2 = mod2(_1n10 - a * s2);
    const u1_2 = mod2(u1 * u1);
    const u2_2 = mod2(u2 * u2);
    const v = mod2(a * d * u1_2 - u2_2);
    const { isValid, value: I } = invertSqrt(mod2(v * u2_2));
    const Dx = mod2(I * u2);
    const Dy = mod2(I * Dx * v);
    let x = mod2((s + s) * Dx);
    if (isNegativeLE(x, P))
      x = mod2(-x);
    const y = mod2(u1 * Dy);
    const t = mod2(x * y);
    if (!isValid || isNegativeLE(t, P) || y === _0n10)
      throw new Error(emsg);
    return new _RistPoint(new ed25519.Point(x, y, _1n10, t));
  }
  static msm(points, scalars) {
    const Fn = Field(ed25519.CURVE.n, ed25519.CURVE.nBitLength);
    return pippenger(_RistPoint, Fn, points, scalars);
  }
  /**
   * Encodes ristretto point to Uint8Array.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
   */
  toBytes() {
    let { ex: x, ey: y, ez: z, et: t } = this.ep;
    const P = Fp3.ORDER;
    const mod2 = Fp3.create;
    const u1 = mod2(mod2(z + y) * mod2(z - y));
    const u2 = mod2(x * y);
    const u2sq = mod2(u2 * u2);
    const { value: invsqrt } = invertSqrt(mod2(u1 * u2sq));
    const D1 = mod2(invsqrt * u1);
    const D2 = mod2(invsqrt * u2);
    const zInv = mod2(D1 * D2 * t);
    let D;
    if (isNegativeLE(t * zInv, P)) {
      let _x = mod2(y * SQRT_M1);
      let _y = mod2(x * SQRT_M1);
      x = _x;
      y = _y;
      D = mod2(D1 * INVSQRT_A_MINUS_D);
    } else {
      D = D2;
    }
    if (isNegativeLE(x * zInv, P))
      y = mod2(-y);
    let s = mod2((z - y) * D);
    if (isNegativeLE(s, P))
      s = mod2(-s);
    return numberToBytesLE(s, 32);
  }
  /** @deprecated use `toBytes` */
  toRawBytes() {
    return this.toBytes();
  }
  toHex() {
    return bytesToHex(this.toBytes());
  }
  toString() {
    return this.toHex();
  }
  /**
   * Compares two Ristretto points.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
   */
  equals(other) {
    aristp(other);
    const { ex: X1, ey: Y1 } = this.ep;
    const { ex: X2, ey: Y2 } = other.ep;
    const mod2 = Fp3.create;
    const one = mod2(X1 * Y2) === mod2(Y1 * X2);
    const two = mod2(Y1 * Y2) === mod2(X1 * X2);
    return one || two;
  }
  add(other) {
    aristp(other);
    return new _RistPoint(this.ep.add(other.ep));
  }
  subtract(other) {
    aristp(other);
    return new _RistPoint(this.ep.subtract(other.ep));
  }
  multiply(scalar) {
    return new _RistPoint(this.ep.multiply(scalar));
  }
  multiplyUnsafe(scalar) {
    return new _RistPoint(this.ep.multiplyUnsafe(scalar));
  }
  double() {
    return new _RistPoint(this.ep.double());
  }
  negate() {
    return new _RistPoint(this.ep.negate());
  }
};
var RistrettoPoint = (() => {
  if (!RistPoint.BASE)
    RistPoint.BASE = new RistPoint(ed25519.Point.BASE);
  if (!RistPoint.ZERO)
    RistPoint.ZERO = new RistPoint(ed25519.Point.ZERO);
  return RistPoint;
})();

// node_modules/@dfinity/agent/lib/esm/utils/expirableMap.js
var __classPrivateFieldSet = function(receiver, state, value3, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value3) : f ? f.value = value3 : state.set(receiver, value3), value3;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExpirableMap_inner;
var _ExpirableMap_expirationTime;
var _a;
var _b;
var ExpirableMap = class {
  /**
   * Create a new ExpirableMap.
   * @param {ExpirableMapOptions<any, any>} options - options for the map.
   * @param {Iterable<[any, any]>} options.source - an optional source of entries to initialize the map with.
   * @param {number} options.expirationTime - the time in milliseconds after which entries will expire.
   */
  constructor(options = {}) {
    _ExpirableMap_inner.set(this, void 0);
    _ExpirableMap_expirationTime.set(this, void 0);
    this[_a] = this.entries.bind(this);
    this[_b] = "ExpirableMap";
    const { source = [], expirationTime = 10 * 60 * 1e3 } = options;
    const currentTime = Date.now();
    __classPrivateFieldSet(this, _ExpirableMap_inner, new Map([...source].map(([key, value3]) => [key, { value: value3, timestamp: currentTime }])), "f");
    __classPrivateFieldSet(this, _ExpirableMap_expirationTime, expirationTime, "f");
  }
  /**
   * Prune removes all expired entries.
   */
  prune() {
    const currentTime = Date.now();
    for (const [key, entry] of __classPrivateFieldGet(this, _ExpirableMap_inner, "f").entries()) {
      if (currentTime - entry.timestamp > __classPrivateFieldGet(this, _ExpirableMap_expirationTime, "f")) {
        __classPrivateFieldGet(this, _ExpirableMap_inner, "f").delete(key);
      }
    }
    return this;
  }
  // Implementing the Map interface
  /**
   * Set the value for the given key. Prunes expired entries.
   * @param key for the entry
   * @param value of the entry
   * @returns this
   */
  set(key, value3) {
    this.prune();
    const entry = {
      value: value3,
      timestamp: Date.now()
    };
    __classPrivateFieldGet(this, _ExpirableMap_inner, "f").set(key, entry);
    return this;
  }
  /**
   * Get the value associated with the key, if it exists and has not expired.
   * @param key K
   * @returns the value associated with the key, or undefined if the key is not present or has expired.
   */
  get(key) {
    const entry = __classPrivateFieldGet(this, _ExpirableMap_inner, "f").get(key);
    if (entry === void 0) {
      return void 0;
    }
    if (Date.now() - entry.timestamp > __classPrivateFieldGet(this, _ExpirableMap_expirationTime, "f")) {
      __classPrivateFieldGet(this, _ExpirableMap_inner, "f").delete(key);
      return void 0;
    }
    return entry.value;
  }
  /**
   * Clear all entries.
   */
  clear() {
    __classPrivateFieldGet(this, _ExpirableMap_inner, "f").clear();
  }
  /**
   * Entries returns the entries of the map, without the expiration time.
   * @returns an iterator over the entries of the map.
   */
  entries() {
    const iterator = __classPrivateFieldGet(this, _ExpirableMap_inner, "f").entries();
    const generator = function* () {
      for (const [key, value3] of iterator) {
        yield [key, value3.value];
      }
    };
    return generator();
  }
  /**
   * Values returns the values of the map, without the expiration time.
   * @returns an iterator over the values of the map.
   */
  values() {
    const iterator = __classPrivateFieldGet(this, _ExpirableMap_inner, "f").values();
    const generator = function* () {
      for (const value3 of iterator) {
        yield value3.value;
      }
    };
    return generator();
  }
  /**
   * Keys returns the keys of the map
   * @returns an iterator over the keys of the map.
   */
  keys() {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").keys();
  }
  /**
   * forEach calls the callbackfn on each entry of the map.
   * @param callbackfn to call on each entry
   * @param thisArg to use as this when calling the callbackfn
   */
  forEach(callbackfn, thisArg) {
    for (const [key, value3] of __classPrivateFieldGet(this, _ExpirableMap_inner, "f").entries()) {
      callbackfn.call(thisArg, value3.value, key, this);
    }
  }
  /**
   * has returns true if the key exists and has not expired.
   * @param key K
   * @returns true if the key exists and has not expired.
   */
  has(key) {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").has(key);
  }
  /**
   * delete the entry for the given key.
   * @param key K
   * @returns true if the key existed and has been deleted.
   */
  delete(key) {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").delete(key);
  }
  /**
   * get size of the map.
   * @returns the size of the map.
   */
  get size() {
    return __classPrivateFieldGet(this, _ExpirableMap_inner, "f").size;
  }
};
_ExpirableMap_inner = /* @__PURE__ */ new WeakMap(), _ExpirableMap_expirationTime = /* @__PURE__ */ new WeakMap(), _a = Symbol.iterator, _b = Symbol.toStringTag;

// node_modules/@dfinity/agent/lib/esm/der.js
var encodeLenBytes = (len) => {
  if (len <= 127) {
    return 1;
  } else if (len <= 255) {
    return 2;
  } else if (len <= 65535) {
    return 3;
  } else if (len <= 16777215) {
    return 4;
  } else {
    throw new Error("Length too long (> 4 bytes)");
  }
};
var encodeLen = (buf, offset, len) => {
  if (len <= 127) {
    buf[offset] = len;
    return 1;
  } else if (len <= 255) {
    buf[offset] = 129;
    buf[offset + 1] = len;
    return 2;
  } else if (len <= 65535) {
    buf[offset] = 130;
    buf[offset + 1] = len >> 8;
    buf[offset + 2] = len;
    return 3;
  } else if (len <= 16777215) {
    buf[offset] = 131;
    buf[offset + 1] = len >> 16;
    buf[offset + 2] = len >> 8;
    buf[offset + 3] = len;
    return 4;
  } else {
    throw new Error("Length too long (> 4 bytes)");
  }
};
var decodeLenBytes = (buf, offset) => {
  if (buf[offset] < 128)
    return 1;
  if (buf[offset] === 128)
    throw new Error("Invalid length 0");
  if (buf[offset] === 129)
    return 2;
  if (buf[offset] === 130)
    return 3;
  if (buf[offset] === 131)
    return 4;
  throw new Error("Length too long (> 4 bytes)");
};
var decodeLen = (buf, offset) => {
  const lenBytes = decodeLenBytes(buf, offset);
  if (lenBytes === 1)
    return buf[offset];
  else if (lenBytes === 2)
    return buf[offset + 1];
  else if (lenBytes === 3)
    return (buf[offset + 1] << 8) + buf[offset + 2];
  else if (lenBytes === 4)
    return (buf[offset + 1] << 16) + (buf[offset + 2] << 8) + buf[offset + 3];
  throw new Error("Length too long (> 4 bytes)");
};
var DER_COSE_OID = Uint8Array.from([
  ...[48, 12],
  ...[6, 10],
  ...[43, 6, 1, 4, 1, 131, 184, 67, 1, 1]
  // DER encoded COSE
]);
var ED25519_OID = Uint8Array.from([
  ...[48, 5],
  ...[6, 3],
  ...[43, 101, 112]
  // id-Ed25519 OID
]);
var SECP256K1_OID = Uint8Array.from([
  ...[48, 16],
  ...[6, 7],
  ...[42, 134, 72, 206, 61, 2, 1],
  ...[6, 5],
  ...[43, 129, 4, 0, 10]
  // OID secp256k1
]);
function wrapDER(payload, oid) {
  const bitStringHeaderLength = 2 + encodeLenBytes(payload.byteLength + 1);
  const len = oid.byteLength + bitStringHeaderLength + payload.byteLength;
  let offset = 0;
  const buf = new Uint8Array(1 + encodeLenBytes(len) + len);
  buf[offset++] = 48;
  offset += encodeLen(buf, offset, len);
  buf.set(oid, offset);
  offset += oid.byteLength;
  buf[offset++] = 3;
  offset += encodeLen(buf, offset, payload.byteLength + 1);
  buf[offset++] = 0;
  buf.set(new Uint8Array(payload), offset);
  return buf;
}
var unwrapDER = (derEncoded, oid) => {
  let offset = 0;
  const expect = (n, msg) => {
    if (buf[offset++] !== n) {
      throw new Error("Expected: " + msg);
    }
  };
  const buf = new Uint8Array(derEncoded);
  expect(48, "sequence");
  offset += decodeLenBytes(buf, offset);
  if (!bufEquals(buf.slice(offset, offset + oid.byteLength), oid)) {
    throw new Error("Not the expected OID.");
  }
  offset += oid.byteLength;
  expect(3, "bit string");
  const payloadLen = decodeLen(buf, offset) - 1;
  offset += decodeLenBytes(buf, offset);
  expect(0, "0 padding");
  const result = buf.slice(offset);
  if (payloadLen !== result.length) {
    throw new Error(`DER payload mismatch: Expected length ${payloadLen} actual length ${result.length}`);
  }
  return result;
};

// node_modules/@dfinity/agent/lib/esm/public_key.js
var __classPrivateFieldSet2 = function(receiver, state, value3, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value3) : f ? f.value = value3 : state.set(receiver, value3), value3;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ed25519PublicKey_rawKey;
var _Ed25519PublicKey_derKey;
var Ed25519PublicKey = class _Ed25519PublicKey {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    _Ed25519PublicKey_rawKey.set(this, void 0);
    _Ed25519PublicKey_derKey.set(this, void 0);
    if (key.byteLength !== _Ed25519PublicKey.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    __classPrivateFieldSet2(this, _Ed25519PublicKey_rawKey, key, "f");
    __classPrivateFieldSet2(this, _Ed25519PublicKey_derKey, _Ed25519PublicKey.derEncode(key), "f");
  }
  static from(key) {
    return this.fromDer(key.toDer());
  }
  static fromRaw(rawKey) {
    return new _Ed25519PublicKey(rawKey);
  }
  static fromDer(derKey) {
    return new _Ed25519PublicKey(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    return wrapDER(publicKey, ED25519_OID).buffer;
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    return unwrapped;
  }
  get rawKey() {
    return __classPrivateFieldGet2(this, _Ed25519PublicKey_rawKey, "f");
  }
  get derKey() {
    return __classPrivateFieldGet2(this, _Ed25519PublicKey_derKey, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
_Ed25519PublicKey_rawKey = /* @__PURE__ */ new WeakMap(), _Ed25519PublicKey_derKey = /* @__PURE__ */ new WeakMap();
Ed25519PublicKey.RAW_KEY_LENGTH = 32;

// node_modules/@dfinity/agent/lib/esm/observable.js
var Observable = class {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data, ...rest) {
    this.observers.forEach((observer) => observer(data, ...rest));
  }
};
var ObservableLog = class extends Observable {
  constructor() {
    super();
  }
  print(message, ...rest) {
    this.notify({ message, level: "info" }, ...rest);
  }
  warn(message, ...rest) {
    this.notify({ message, level: "warn" }, ...rest);
  }
  error(message, error, ...rest) {
    this.notify({ message, level: "error", error }, ...rest);
  }
};

// node_modules/@dfinity/agent/lib/esm/polling/backoff.js
var __classPrivateFieldSet3 = function(receiver, state, value3, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value3) : f ? f.value = value3 : state.set(receiver, value3), value3;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExponentialBackoff_currentInterval;
var _ExponentialBackoff_randomizationFactor;
var _ExponentialBackoff_multiplier;
var _ExponentialBackoff_maxInterval;
var _ExponentialBackoff_startTime;
var _ExponentialBackoff_maxElapsedTime;
var _ExponentialBackoff_maxIterations;
var _ExponentialBackoff_date;
var _ExponentialBackoff_count;
var RANDOMIZATION_FACTOR = 0.5;
var MULTIPLIER = 1.5;
var INITIAL_INTERVAL_MSEC = 500;
var MAX_INTERVAL_MSEC = 6e4;
var MAX_ELAPSED_TIME_MSEC = 9e5;
var MAX_ITERATIONS = 10;
var ExponentialBackoff = class _ExponentialBackoff {
  constructor(options = _ExponentialBackoff.default) {
    _ExponentialBackoff_currentInterval.set(this, void 0);
    _ExponentialBackoff_randomizationFactor.set(this, void 0);
    _ExponentialBackoff_multiplier.set(this, void 0);
    _ExponentialBackoff_maxInterval.set(this, void 0);
    _ExponentialBackoff_startTime.set(this, void 0);
    _ExponentialBackoff_maxElapsedTime.set(this, void 0);
    _ExponentialBackoff_maxIterations.set(this, void 0);
    _ExponentialBackoff_date.set(this, void 0);
    _ExponentialBackoff_count.set(this, 0);
    const { initialInterval = INITIAL_INTERVAL_MSEC, randomizationFactor = RANDOMIZATION_FACTOR, multiplier = MULTIPLIER, maxInterval = MAX_INTERVAL_MSEC, maxElapsedTime = MAX_ELAPSED_TIME_MSEC, maxIterations = MAX_ITERATIONS, date = Date } = options;
    __classPrivateFieldSet3(this, _ExponentialBackoff_currentInterval, initialInterval, "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_randomizationFactor, randomizationFactor, "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_multiplier, multiplier, "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_maxInterval, maxInterval, "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_date, date, "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_startTime, date.now(), "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_maxElapsedTime, maxElapsedTime, "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_maxIterations, maxIterations, "f");
  }
  get ellapsedTimeInMsec() {
    return __classPrivateFieldGet3(this, _ExponentialBackoff_date, "f").now() - __classPrivateFieldGet3(this, _ExponentialBackoff_startTime, "f");
  }
  get currentInterval() {
    return __classPrivateFieldGet3(this, _ExponentialBackoff_currentInterval, "f");
  }
  get count() {
    return __classPrivateFieldGet3(this, _ExponentialBackoff_count, "f");
  }
  get randomValueFromInterval() {
    const delta = __classPrivateFieldGet3(this, _ExponentialBackoff_randomizationFactor, "f") * __classPrivateFieldGet3(this, _ExponentialBackoff_currentInterval, "f");
    const min = __classPrivateFieldGet3(this, _ExponentialBackoff_currentInterval, "f") - delta;
    const max = __classPrivateFieldGet3(this, _ExponentialBackoff_currentInterval, "f") + delta;
    return Math.random() * (max - min) + min;
  }
  incrementCurrentInterval() {
    var _a2;
    __classPrivateFieldSet3(this, _ExponentialBackoff_currentInterval, Math.min(__classPrivateFieldGet3(this, _ExponentialBackoff_currentInterval, "f") * __classPrivateFieldGet3(this, _ExponentialBackoff_multiplier, "f"), __classPrivateFieldGet3(this, _ExponentialBackoff_maxInterval, "f")), "f");
    __classPrivateFieldSet3(this, _ExponentialBackoff_count, (_a2 = __classPrivateFieldGet3(this, _ExponentialBackoff_count, "f"), _a2++, _a2), "f");
    return __classPrivateFieldGet3(this, _ExponentialBackoff_currentInterval, "f");
  }
  next() {
    if (this.ellapsedTimeInMsec >= __classPrivateFieldGet3(this, _ExponentialBackoff_maxElapsedTime, "f") || __classPrivateFieldGet3(this, _ExponentialBackoff_count, "f") >= __classPrivateFieldGet3(this, _ExponentialBackoff_maxIterations, "f")) {
      return null;
    } else {
      this.incrementCurrentInterval();
      return this.randomValueFromInterval;
    }
  }
};
_ExponentialBackoff_currentInterval = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_randomizationFactor = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_multiplier = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_maxInterval = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_startTime = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_maxElapsedTime = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_maxIterations = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_date = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_count = /* @__PURE__ */ new WeakMap();
ExponentialBackoff.default = {
  initialInterval: INITIAL_INTERVAL_MSEC,
  randomizationFactor: RANDOMIZATION_FACTOR,
  multiplier: MULTIPLIER,
  maxInterval: MAX_INTERVAL_MSEC,
  // 1 minute
  maxElapsedTime: MAX_ELAPSED_TIME_MSEC,
  maxIterations: MAX_ITERATIONS,
  date: Date
};

// node_modules/@dfinity/agent/lib/esm/agent/http/index.js
var __classPrivateFieldSet4 = function(receiver, state, value3, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value3) : f ? f.value = value3 : state.set(receiver, value3), value3;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HttpAgent_instances;
var _HttpAgent_rootKeyPromise;
var _HttpAgent_shouldFetchRootKey;
var _HttpAgent_identity;
var _HttpAgent_fetch;
var _HttpAgent_fetchOptions;
var _HttpAgent_callOptions;
var _HttpAgent_timeDiffMsecs;
var _HttpAgent_credentials;
var _HttpAgent_retryTimes;
var _HttpAgent_backoffStrategy;
var _HttpAgent_maxIngressExpiryInMinutes;
var _HttpAgent_waterMark;
var _HttpAgent_queryPipeline;
var _HttpAgent_updatePipeline;
var _HttpAgent_subnetKeys;
var _HttpAgent_verifyQuerySignatures;
var _HttpAgent_requestAndRetryQuery;
var _HttpAgent_requestAndRetry;
var _HttpAgent_verifyQueryResponse;
var _HttpAgent_rootKeyGuard;
var RequestStatusResponseStatus;
(function(RequestStatusResponseStatus2) {
  RequestStatusResponseStatus2["Received"] = "received";
  RequestStatusResponseStatus2["Processing"] = "processing";
  RequestStatusResponseStatus2["Replied"] = "replied";
  RequestStatusResponseStatus2["Rejected"] = "rejected";
  RequestStatusResponseStatus2["Unknown"] = "unknown";
  RequestStatusResponseStatus2["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
var MINUTE_TO_MSECS = 60 * 1e3;
var IC_ROOT_KEY = "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae";
var MANAGEMENT_CANISTER_ID = "aaaaa-aa";
var IC0_DOMAIN = "ic0.app";
var IC0_SUB_DOMAIN = ".ic0.app";
var ICP0_DOMAIN = "icp0.io";
var ICP0_SUB_DOMAIN = ".icp0.io";
var ICP_API_DOMAIN = "icp-api.io";
var ICP_API_SUB_DOMAIN = ".icp-api.io";
var HttpDefaultFetchError = class extends AgentError {
  constructor(message) {
    super(message);
    this.message = message;
  }
};
var IdentityInvalidError = class extends AgentError {
  constructor(message) {
    super(message);
    this.message = message;
  }
};
function getDefaultFetch() {
  let defaultFetch;
  if (typeof window !== "undefined") {
    if (window.fetch) {
      defaultFetch = window.fetch.bind(window);
    } else {
      throw new HttpDefaultFetchError("Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present.");
    }
  } else if (typeof global !== "undefined") {
    if (global.fetch) {
      defaultFetch = global.fetch.bind(global);
    } else {
      throw new HttpDefaultFetchError("Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available.");
    }
  } else if (typeof self !== "undefined") {
    if (self.fetch) {
      defaultFetch = self.fetch.bind(self);
    }
  }
  if (defaultFetch) {
    return defaultFetch;
  }
  throw new HttpDefaultFetchError("Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context.");
}
function determineHost(configuredHost) {
  let host;
  if (configuredHost !== void 0) {
    if (!configuredHost.match(/^[a-z]+:/) && typeof window !== "undefined") {
      host = new URL(window.location.protocol + "//" + configuredHost);
    } else {
      host = new URL(configuredHost);
    }
  } else {
    const knownHosts = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"];
    const remoteHosts = [".github.dev", ".gitpod.io"];
    const location = typeof window !== "undefined" ? window.location : void 0;
    const hostname = location === null || location === void 0 ? void 0 : location.hostname;
    let knownHost;
    if (hostname && typeof hostname === "string") {
      if (remoteHosts.some((host2) => hostname.endsWith(host2))) {
        knownHost = hostname;
      } else {
        knownHost = knownHosts.find((host2) => hostname.endsWith(host2));
      }
    }
    if (location && knownHost) {
      host = new URL(`${location.protocol}//${knownHost}${location.port ? ":" + location.port : ""}`);
    } else {
      host = new URL("https://icp-api.io");
    }
  }
  return host.toString();
}
var HttpAgent = class _HttpAgent {
  /**
   * @param options - Options for the HttpAgent
   * @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
   */
  constructor(options = {}) {
    var _a2, _b2;
    _HttpAgent_instances.add(this);
    _HttpAgent_rootKeyPromise.set(this, null);
    _HttpAgent_shouldFetchRootKey.set(this, false);
    _HttpAgent_identity.set(this, void 0);
    _HttpAgent_fetch.set(this, void 0);
    _HttpAgent_fetchOptions.set(this, void 0);
    _HttpAgent_callOptions.set(this, void 0);
    _HttpAgent_timeDiffMsecs.set(this, 0);
    _HttpAgent_credentials.set(this, void 0);
    _HttpAgent_retryTimes.set(this, void 0);
    _HttpAgent_backoffStrategy.set(this, void 0);
    _HttpAgent_maxIngressExpiryInMinutes.set(this, void 0);
    this._isAgent = true;
    this.config = {};
    _HttpAgent_waterMark.set(this, 0);
    this.log = new ObservableLog();
    _HttpAgent_queryPipeline.set(this, []);
    _HttpAgent_updatePipeline.set(this, []);
    _HttpAgent_subnetKeys.set(this, new ExpirableMap({
      expirationTime: 5 * 60 * 1e3
      // 5 minutes
    }));
    _HttpAgent_verifyQuerySignatures.set(this, true);
    _HttpAgent_verifyQueryResponse.set(this, (queryResponse, subnetStatus) => {
      if (__classPrivateFieldGet4(this, _HttpAgent_verifyQuerySignatures, "f") === false) {
        return queryResponse;
      }
      if (!subnetStatus) {
        throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
      }
      const { status, signatures = [], requestId } = queryResponse;
      const domainSeparator2 = bufFromBufLike(new TextEncoder().encode("\vic-response"));
      for (const sig of signatures) {
        const { timestamp, identity } = sig;
        const nodeId = Principal.fromUint8Array(identity).toText();
        let hash2;
        if (status === "replied") {
          const { reply } = queryResponse;
          hash2 = hashOfMap({
            status,
            reply,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else if (status === "rejected") {
          const { reject_code, reject_message, error_code } = queryResponse;
          hash2 = hashOfMap({
            status,
            reject_code,
            reject_message,
            error_code,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else {
          throw new Error(`Unknown status: ${status}`);
        }
        const separatorWithHash = concat(domainSeparator2, bufFromBufLike(new Uint8Array(hash2)));
        const pubKey = subnetStatus === null || subnetStatus === void 0 ? void 0 : subnetStatus.nodeKeys.get(nodeId);
        if (!pubKey) {
          throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
        }
        const rawKey = Ed25519PublicKey.fromDer(pubKey).rawKey;
        const valid = ed25519.verify(sig.signature, new Uint8Array(separatorWithHash), new Uint8Array(rawKey));
        if (valid)
          return queryResponse;
        throw new CertificateVerificationError(`Invalid signature from replica ${nodeId} signed query.`);
      }
      return queryResponse;
    });
    this.config = options;
    __classPrivateFieldSet4(this, _HttpAgent_fetch, options.fetch || getDefaultFetch() || fetch.bind(global), "f");
    __classPrivateFieldSet4(this, _HttpAgent_fetchOptions, options.fetchOptions, "f");
    __classPrivateFieldSet4(this, _HttpAgent_callOptions, options.callOptions, "f");
    __classPrivateFieldSet4(this, _HttpAgent_shouldFetchRootKey, (_a2 = options.shouldFetchRootKey) !== null && _a2 !== void 0 ? _a2 : false, "f");
    if (options.rootKey) {
      this.rootKey = options.rootKey;
    } else if (__classPrivateFieldGet4(this, _HttpAgent_shouldFetchRootKey, "f")) {
      this.rootKey = null;
    } else {
      this.rootKey = fromHex(IC_ROOT_KEY);
    }
    const host = determineHost(options.host);
    this.host = new URL(host);
    if (options.verifyQuerySignatures !== void 0) {
      __classPrivateFieldSet4(this, _HttpAgent_verifyQuerySignatures, options.verifyQuerySignatures, "f");
    }
    __classPrivateFieldSet4(this, _HttpAgent_retryTimes, (_b2 = options.retryTimes) !== null && _b2 !== void 0 ? _b2 : 3, "f");
    const defaultBackoffFactory = () => new ExponentialBackoff({
      maxIterations: __classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")
    });
    __classPrivateFieldSet4(this, _HttpAgent_backoffStrategy, options.backoffStrategy || defaultBackoffFactory, "f");
    if (this.host.hostname.endsWith(IC0_SUB_DOMAIN)) {
      this.host.hostname = IC0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP0_SUB_DOMAIN)) {
      this.host.hostname = ICP0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP_API_SUB_DOMAIN)) {
      this.host.hostname = ICP_API_DOMAIN;
    }
    if (options.credentials) {
      const { name, password } = options.credentials;
      __classPrivateFieldSet4(this, _HttpAgent_credentials, `${name}${password ? ":" + password : ""}`, "f");
    }
    __classPrivateFieldSet4(this, _HttpAgent_identity, Promise.resolve(options.identity || new AnonymousIdentity()), "f");
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes > 5) {
      throw new AgentError(`The maximum ingress expiry time is 5 minutes. Provided ingress expiry time is ${options.ingressExpiryInMinutes} minutes.`);
    }
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes <= 0) {
      throw new AgentError(`Ingress expiry time must be greater than 0. Provided ingress expiry time is ${options.ingressExpiryInMinutes} minutes.`);
    }
    __classPrivateFieldSet4(this, _HttpAgent_maxIngressExpiryInMinutes, options.ingressExpiryInMinutes || 5, "f");
    this.addTransform("update", makeNonceTransform(makeNonce));
    if (options.useQueryNonces) {
      this.addTransform("query", makeNonceTransform(makeNonce));
    }
    if (options.logToConsole) {
      this.log.subscribe((log) => {
        if (log.level === "error") {
          console.error(log.message);
        } else if (log.level === "warn") {
          console.warn(log.message);
        } else {
          console.log(log.message);
        }
      });
    }
  }
  get waterMark() {
    return __classPrivateFieldGet4(this, _HttpAgent_waterMark, "f");
  }
  static createSync(options = {}) {
    return new this(Object.assign({}, options));
  }
  static async create(options = {
    shouldFetchRootKey: false
  }) {
    const agent = _HttpAgent.createSync(options);
    const initPromises = [agent.syncTime()];
    if (agent.host.toString() !== "https://icp-api.io" && options.shouldFetchRootKey) {
      initPromises.push(agent.fetchRootKey());
    }
    await Promise.all(initPromises);
    return agent;
  }
  static async from(agent) {
    var _a2;
    try {
      if ("config" in agent) {
        return await _HttpAgent.create(agent.config);
      }
      return await _HttpAgent.create({
        fetch: agent._fetch,
        fetchOptions: agent._fetchOptions,
        callOptions: agent._callOptions,
        host: agent._host.toString(),
        identity: (_a2 = agent._identity) !== null && _a2 !== void 0 ? _a2 : void 0
      });
    } catch (_b2) {
      throw new AgentError("Failed to create agent from provided agent");
    }
  }
  isLocal() {
    const hostname = this.host.hostname;
    return hostname === "127.0.0.1" || hostname.endsWith("127.0.0.1");
  }
  addTransform(type, fn, priority = fn.priority || 0) {
    if (type === "update") {
      const i = __classPrivateFieldGet4(this, _HttpAgent_updatePipeline, "f").findIndex((x) => (x.priority || 0) < priority);
      __classPrivateFieldGet4(this, _HttpAgent_updatePipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet4(this, _HttpAgent_updatePipeline, "f").length, 0, Object.assign(fn, { priority }));
    } else if (type === "query") {
      const i = __classPrivateFieldGet4(this, _HttpAgent_queryPipeline, "f").findIndex((x) => (x.priority || 0) < priority);
      __classPrivateFieldGet4(this, _HttpAgent_queryPipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet4(this, _HttpAgent_queryPipeline, "f").length, 0, Object.assign(fn, { priority }));
    }
  }
  async getPrincipal() {
    if (!__classPrivateFieldGet4(this, _HttpAgent_identity, "f")) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    return (await __classPrivateFieldGet4(this, _HttpAgent_identity, "f")).getPrincipal();
  }
  /**
   * Makes a call to a canister method.
   * @param canisterId - The ID of the canister to call. Can be a Principal or a string.
   * @param options - Options for the call.
   * @param options.methodName - The name of the method to call.
   * @param options.arg - The argument to pass to the method, as an ArrayBuffer.
   * @param options.effectiveCanisterId - (Optional) The effective canister ID, if different from the target canister ID.
   * @param options.callSync - (Optional) Whether to use synchronous call mode. Defaults to true.
   * @param options.nonce - (Optional) A unique nonce for the request. If provided, it will override any nonce set by transforms.
   * @param identity - (Optional) The identity to use for the call. If not provided, the agent's current identity will be used.
   * @returns A promise that resolves to the response of the call, including the request ID and response details.
   */
  async call(canisterId, options, identity) {
    var _a2, _b2;
    await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const callSync = (_a2 = options.callSync) !== null && _a2 !== void 0 ? _a2 : true;
    const id = await (identity !== void 0 ? await identity : await __classPrivateFieldGet4(this, _HttpAgent_identity, "f"));
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const canister = Principal.from(canisterId);
    const ecid = options.effectiveCanisterId ? Principal.from(options.effectiveCanisterId) : canister;
    const sender = id.getPrincipal() || Principal.anonymous();
    let ingress_expiry = new Expiry(__classPrivateFieldGet4(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS);
    if (Math.abs(__classPrivateFieldGet4(this, _HttpAgent_timeDiffMsecs, "f")) > 1e3 * 30) {
      ingress_expiry = new Expiry(__classPrivateFieldGet4(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS + __classPrivateFieldGet4(this, _HttpAgent_timeDiffMsecs, "f"));
    }
    const submit = {
      request_type: SubmitRequestType.Call,
      canister_id: canister,
      method_name: options.methodName,
      arg: options.arg,
      sender,
      ingress_expiry
    };
    let transformedRequest = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, __classPrivateFieldGet4(this, _HttpAgent_credentials, "f") ? { Authorization: "Basic " + btoa(__classPrivateFieldGet4(this, _HttpAgent_credentials, "f")) } : {})
      },
      endpoint: "call",
      body: submit
    });
    let nonce;
    if (options === null || options === void 0 ? void 0 : options.nonce) {
      nonce = toNonce(options.nonce);
    } else if (transformedRequest.body.nonce) {
      nonce = toNonce(transformedRequest.body.nonce);
    } else {
      nonce = void 0;
    }
    submit.nonce = nonce;
    function toNonce(buf) {
      return new Uint8Array(buf);
    }
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode2(transformedRequest.body);
    const backoff = __classPrivateFieldGet4(this, _HttpAgent_backoffStrategy, "f").call(this);
    const requestId = requestIdOf(submit);
    try {
      const requestSync = () => {
        this.log.print(`fetching "/api/v3/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __classPrivateFieldGet4(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v3/canister/${ecid.toText()}/call`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet4(this, _HttpAgent_callOptions, "f")), transformedRequest.request), { body }));
      };
      const requestAsync = () => {
        this.log.print(`fetching "/api/v2/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __classPrivateFieldGet4(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/canister/${ecid.toText()}/call`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet4(this, _HttpAgent_callOptions, "f")), transformedRequest.request), { body }));
      };
      const request2 = __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
        request: callSync ? requestSync : requestAsync,
        backoff,
        tries: 0
      });
      const response = await request2;
      const responseBuffer = await response.arrayBuffer();
      const responseBody = response.status === 200 && responseBuffer.byteLength > 0 ? decode2(responseBuffer) : null;
      if (responseBody && "certificate" in responseBody) {
        const time = await this.parseTimeFromResponse({
          certificate: responseBody.certificate
        });
        __classPrivateFieldSet4(this, _HttpAgent_waterMark, time, "f");
      }
      return {
        requestId,
        response: {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
          headers: httpHeadersTransform(response.headers)
        },
        requestDetails: submit
      };
    } catch (error) {
      if (error.message.includes("v3 api not supported.")) {
        this.log.warn("v3 api not supported. Fall back to v2");
        return this.call(canisterId, Object.assign(Object.assign({}, options), {
          // disable v3 api
          callSync: false
        }), identity);
      }
      const message = `Error while making call: ${(_b2 = error.message) !== null && _b2 !== void 0 ? _b2 : String(error)}`;
      const callError = new AgentCallError(message, error, toHex(requestId), toHex(transformedRequest.body.sender_pubkey), toHex(transformedRequest.body.sender_sig), String(transformedRequest.body.content.ingress_expiry["_value"]));
      this.log.error(message, callError);
      throw callError;
    }
  }
  async query(canisterId, fields, identity) {
    var _a2, _b2, _c, _d;
    await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const backoff = __classPrivateFieldGet4(this, _HttpAgent_backoffStrategy, "f").call(this);
    const ecid = fields.effectiveCanisterId ? Principal.from(fields.effectiveCanisterId) : Principal.from(canisterId);
    this.log.print(`ecid ${ecid.toString()}`);
    this.log.print(`canisterId ${canisterId.toString()}`);
    let transformedRequest = void 0;
    let queryResult;
    const id = await (identity !== void 0 ? identity : __classPrivateFieldGet4(this, _HttpAgent_identity, "f"));
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const canister = Principal.from(canisterId);
    const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal.anonymous();
    const request2 = {
      request_type: "query",
      canister_id: canister,
      method_name: fields.methodName,
      arg: fields.arg,
      sender,
      ingress_expiry: new Expiry(__classPrivateFieldGet4(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS)
    };
    const requestId = requestIdOf(request2);
    transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, __classPrivateFieldGet4(this, _HttpAgent_credentials, "f") ? { Authorization: "Basic " + btoa(__classPrivateFieldGet4(this, _HttpAgent_credentials, "f")) } : {})
      },
      endpoint: "read",
      body: request2
    });
    transformedRequest = await (id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest));
    const body = encode2(transformedRequest.body);
    const args = {
      canister: canister.toText(),
      ecid,
      transformedRequest,
      body,
      requestId,
      backoff,
      tries: 0
    };
    const makeQuery = async () => {
      return {
        requestDetails: request2,
        query: await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery).call(this, args)
      };
    };
    const getSubnetStatus = async () => {
      if (!__classPrivateFieldGet4(this, _HttpAgent_verifyQuerySignatures, "f")) {
        return void 0;
      }
      const subnetStatus = __classPrivateFieldGet4(this, _HttpAgent_subnetKeys, "f").get(ecid.toString());
      if (subnetStatus) {
        return subnetStatus;
      }
      await this.fetchSubnetKeys(ecid.toString());
      return __classPrivateFieldGet4(this, _HttpAgent_subnetKeys, "f").get(ecid.toString());
    };
    try {
      const [_queryResult, subnetStatus] = await Promise.all([makeQuery(), getSubnetStatus()]);
      queryResult = _queryResult;
      const { requestDetails, query } = queryResult;
      const queryWithDetails = Object.assign(Object.assign({}, query), { requestDetails });
      this.log.print("Query response:", queryWithDetails);
      if (!__classPrivateFieldGet4(this, _HttpAgent_verifyQuerySignatures, "f")) {
        return queryWithDetails;
      }
      try {
        return __classPrivateFieldGet4(this, _HttpAgent_verifyQueryResponse, "f").call(this, queryWithDetails, subnetStatus);
      } catch (_e) {
        this.log.warn("Query response verification failed. Retrying with fresh subnet keys.");
        __classPrivateFieldGet4(this, _HttpAgent_subnetKeys, "f").delete(canisterId.toString());
        await this.fetchSubnetKeys(ecid.toString());
        const updatedSubnetStatus = __classPrivateFieldGet4(this, _HttpAgent_subnetKeys, "f").get(canisterId.toString());
        if (!updatedSubnetStatus) {
          throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
        }
        return __classPrivateFieldGet4(this, _HttpAgent_verifyQueryResponse, "f").call(this, queryWithDetails, updatedSubnetStatus);
      }
    } catch (error) {
      const message = `Error while making call: ${(_a2 = error.message) !== null && _a2 !== void 0 ? _a2 : String(error)}`;
      const queryError = new AgentQueryError(message, error, String(requestId), toHex((_b2 = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _b2 === void 0 ? void 0 : _b2.sender_pubkey), toHex((_c = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _c === void 0 ? void 0 : _c.sender_sig), String((_d = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _d === void 0 ? void 0 : _d.content.ingress_expiry["_value"]));
      this.log.error(message, queryError);
      throw queryError;
    }
  }
  async createReadStateRequest(fields, identity) {
    await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const id = await (identity !== void 0 ? await identity : await __classPrivateFieldGet4(this, _HttpAgent_identity, "f"));
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal.anonymous();
    const transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, __classPrivateFieldGet4(this, _HttpAgent_credentials, "f") ? { Authorization: "Basic " + btoa(__classPrivateFieldGet4(this, _HttpAgent_credentials, "f")) } : {})
      },
      endpoint: "read_state",
      body: {
        request_type: "read_state",
        paths: fields.paths,
        sender,
        ingress_expiry: new Expiry(__classPrivateFieldGet4(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS)
      }
    });
    return id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest);
  }
  async readState(canisterId, fields, identity, request2) {
    var _a2, _b2, _c, _d;
    function getRequestId(fields2) {
      for (const path of fields2.paths) {
        const [pathName, value3] = path;
        const request_status = bufFromBufLike(new TextEncoder().encode("request_status"));
        if (bufEquals(pathName, request_status)) {
          return value3;
        }
      }
    }
    const requestId = getRequestId(fields);
    await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const canister = typeof canisterId === "string" ? Principal.fromText(canisterId) : canisterId;
    const transformedRequest = request2 !== null && request2 !== void 0 ? request2 : await this.createReadStateRequest(fields, identity);
    const body = encode2(transformedRequest.body);
    this.log.print(`fetching "/api/v2/canister/${canister}/read_state" with request:`, transformedRequest);
    const backoff = __classPrivateFieldGet4(this, _HttpAgent_backoffStrategy, "f").call(this);
    try {
      const response = await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
        request: () => __classPrivateFieldGet4(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/canister/${canister.toString()}/read_state`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet4(this, _HttpAgent_fetchOptions, "f")), transformedRequest.request), { body })),
        backoff,
        tries: 0
      });
      if (!response.ok) {
        throw new Error(`Server returned an error:
  Code: ${response.status} (${response.statusText})
  Body: ${await response.text()}
`);
      }
      const decodedResponse = decode2(await response.arrayBuffer());
      this.log.print("Read state response:", decodedResponse);
      const parsedTime = await this.parseTimeFromResponse(decodedResponse);
      if (parsedTime > 0) {
        this.log.print("Read state response time:", parsedTime);
        __classPrivateFieldSet4(this, _HttpAgent_waterMark, parsedTime, "f");
      }
      return decodedResponse;
    } catch (error) {
      const message = `Caught exception while attempting to read state: ${(_a2 = error.message) !== null && _a2 !== void 0 ? _a2 : String(error)}`;
      const readStateError = new AgentReadStateError(message, error, String(requestId), toHex((_b2 = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _b2 === void 0 ? void 0 : _b2.sender_pubkey), toHex((_c = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _c === void 0 ? void 0 : _c.sender_sig), String((_d = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _d === void 0 ? void 0 : _d.content.ingress_expiry["_value"]));
      this.log.error(message, readStateError);
      throw readStateError;
    }
  }
  async parseTimeFromResponse(response) {
    let tree;
    if (response.certificate) {
      const decoded = decode2(response.certificate);
      if (decoded && "tree" in decoded) {
        tree = decoded.tree;
      } else {
        throw new Error("Could not decode time from response");
      }
      const timeLookup = lookup_path(["time"], tree);
      if (timeLookup.status !== LookupStatus.Found) {
        throw new Error("Time was not found in the response or was not in its expected format.");
      }
      if (!(timeLookup.value instanceof ArrayBuffer) && !ArrayBuffer.isView(timeLookup)) {
        throw new Error("Time was not found in the response or was not in its expected format.");
      }
      const date = decodeTime(bufFromBufLike(timeLookup.value));
      this.log.print("Time from response:", date);
      this.log.print("Time from response in milliseconds:", Number(date));
      return Number(date);
    } else {
      this.log.warn("No certificate found in response");
    }
    return 0;
  }
  /**
   * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
   * @param {Principal} canisterId - Pass a canister ID if you need to sync the time with a particular replica. Uses the management canister by default
   */
  async syncTime(canisterId) {
    await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const CanisterStatus = await import("./canisterStatus-R2DEOBKU.js");
    const callTime = Date.now();
    try {
      if (!canisterId) {
        this.log.print("Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai");
      }
      const anonymousAgent = _HttpAgent.createSync({
        identity: new AnonymousIdentity(),
        host: this.host.toString(),
        fetch: __classPrivateFieldGet4(this, _HttpAgent_fetch, "f"),
        retryTimes: 0
      });
      const status = await CanisterStatus.request({
        // Fall back with canisterId of the ICP Ledger
        canisterId: canisterId !== null && canisterId !== void 0 ? canisterId : Principal.from("ryjl3-tyaaa-aaaaa-aaaba-cai"),
        agent: anonymousAgent,
        paths: ["time"]
      });
      const replicaTime = status.get("time");
      if (replicaTime) {
        __classPrivateFieldSet4(this, _HttpAgent_timeDiffMsecs, Number(replicaTime) - Number(callTime), "f");
        this.log.notify({
          message: `Syncing time: offset of ${__classPrivateFieldGet4(this, _HttpAgent_timeDiffMsecs, "f")}`,
          level: "info"
        });
      }
    } catch (error) {
      this.log.error("Caught exception while attempting to sync time", error);
    }
  }
  async status() {
    const headers = __classPrivateFieldGet4(this, _HttpAgent_credentials, "f") ? {
      Authorization: "Basic " + btoa(__classPrivateFieldGet4(this, _HttpAgent_credentials, "f"))
    } : {};
    this.log.print(`fetching "/api/v2/status"`);
    const backoff = __classPrivateFieldGet4(this, _HttpAgent_backoffStrategy, "f").call(this);
    const response = await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
      backoff,
      request: () => __classPrivateFieldGet4(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/status`, this.host), Object.assign({ headers }, __classPrivateFieldGet4(this, _HttpAgent_fetchOptions, "f"))),
      tries: 0
    });
    return decode2(await response.arrayBuffer());
  }
  async fetchRootKey() {
    let result;
    if (__classPrivateFieldGet4(this, _HttpAgent_rootKeyPromise, "f")) {
      result = await __classPrivateFieldGet4(this, _HttpAgent_rootKeyPromise, "f");
    } else {
      __classPrivateFieldSet4(this, _HttpAgent_rootKeyPromise, new Promise((resolve, reject) => {
        this.status().then((value3) => {
          const rootKey = value3.root_key;
          this.rootKey = rootKey;
          resolve(rootKey);
        }).catch(reject);
      }), "f");
      result = await __classPrivateFieldGet4(this, _HttpAgent_rootKeyPromise, "f");
    }
    __classPrivateFieldSet4(this, _HttpAgent_rootKeyPromise, null, "f");
    return result;
  }
  invalidateIdentity() {
    __classPrivateFieldSet4(this, _HttpAgent_identity, null, "f");
  }
  replaceIdentity(identity) {
    __classPrivateFieldSet4(this, _HttpAgent_identity, Promise.resolve(identity), "f");
  }
  async fetchSubnetKeys(canisterId) {
    await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const effectiveCanisterId = Principal.from(canisterId);
    const response = await request({
      canisterId: effectiveCanisterId,
      paths: ["subnet"],
      agent: this
    });
    const subnetResponse = response.get("subnet");
    if (subnetResponse && typeof subnetResponse === "object" && "nodeKeys" in subnetResponse) {
      __classPrivateFieldGet4(this, _HttpAgent_subnetKeys, "f").set(effectiveCanisterId.toText(), subnetResponse);
      return subnetResponse;
    }
    return void 0;
  }
  _transform(request2) {
    let p = Promise.resolve(request2);
    if (request2.endpoint === "call") {
      for (const fn of __classPrivateFieldGet4(this, _HttpAgent_updatePipeline, "f")) {
        p = p.then((r) => fn(r).then((r2) => r2 || r));
      }
    } else {
      for (const fn of __classPrivateFieldGet4(this, _HttpAgent_queryPipeline, "f")) {
        p = p.then((r) => fn(r).then((r2) => r2 || r));
      }
    }
    return p;
  }
};
_HttpAgent_rootKeyPromise = /* @__PURE__ */ new WeakMap(), _HttpAgent_shouldFetchRootKey = /* @__PURE__ */ new WeakMap(), _HttpAgent_identity = /* @__PURE__ */ new WeakMap(), _HttpAgent_fetch = /* @__PURE__ */ new WeakMap(), _HttpAgent_fetchOptions = /* @__PURE__ */ new WeakMap(), _HttpAgent_callOptions = /* @__PURE__ */ new WeakMap(), _HttpAgent_timeDiffMsecs = /* @__PURE__ */ new WeakMap(), _HttpAgent_credentials = /* @__PURE__ */ new WeakMap(), _HttpAgent_retryTimes = /* @__PURE__ */ new WeakMap(), _HttpAgent_backoffStrategy = /* @__PURE__ */ new WeakMap(), _HttpAgent_maxIngressExpiryInMinutes = /* @__PURE__ */ new WeakMap(), _HttpAgent_waterMark = /* @__PURE__ */ new WeakMap(), _HttpAgent_queryPipeline = /* @__PURE__ */ new WeakMap(), _HttpAgent_updatePipeline = /* @__PURE__ */ new WeakMap(), _HttpAgent_subnetKeys = /* @__PURE__ */ new WeakMap(), _HttpAgent_verifyQuerySignatures = /* @__PURE__ */ new WeakMap(), _HttpAgent_verifyQueryResponse = /* @__PURE__ */ new WeakMap(), _HttpAgent_instances = /* @__PURE__ */ new WeakSet(), _HttpAgent_requestAndRetryQuery = async function _HttpAgent_requestAndRetryQuery2(args) {
  var _a2, _b2;
  const { ecid, transformedRequest, body, requestId, backoff, tries } = args;
  const delay = tries === 0 ? 0 : backoff.next();
  this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with tries:`, {
    tries,
    backoff,
    delay
  });
  if (delay === null) {
    throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  try {
    this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with request:`, transformedRequest);
    const fetchResponse = await __classPrivateFieldGet4(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/canister/${ecid.toString()}/query`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet4(this, _HttpAgent_fetchOptions, "f")), transformedRequest.request), { body }));
    if (fetchResponse.status === 200) {
      const queryResponse = decode2(await fetchResponse.arrayBuffer());
      response = Object.assign(Object.assign({}, queryResponse), { httpDetails: {
        ok: fetchResponse.ok,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: httpHeadersTransform(fetchResponse.headers)
      }, requestId });
    } else {
      throw new AgentHTTPResponseError(`Gateway returned an error:
  Code: ${fetchResponse.status} (${fetchResponse.statusText})
  Body: ${await fetchResponse.text()}
`, {
        ok: fetchResponse.ok,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: httpHeadersTransform(fetchResponse.headers)
      });
    }
  } catch (error) {
    if (tries < __classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")) {
      this.log.warn(`Caught exception while attempting to make query:
  ${error}
  Retrying query.`);
      return await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery2).call(this, Object.assign(Object.assign({}, args), { tries: tries + 1 }));
    }
    throw error;
  }
  const timestamp = (_b2 = (_a2 = response.signatures) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b2 === void 0 ? void 0 : _b2.timestamp;
  if (!__classPrivateFieldGet4(this, _HttpAgent_verifyQuerySignatures, "f")) {
    return response;
  }
  if (!timestamp) {
    throw new Error("Timestamp not found in query response. This suggests a malformed or malicious response.");
  }
  const timeStampInMs = Number(BigInt(timestamp) / BigInt(1e6));
  this.log.print("watermark and timestamp", {
    waterMark: this.waterMark,
    timestamp: timeStampInMs
  });
  if (Number(this.waterMark) > timeStampInMs) {
    const error = new AgentError("Timestamp is below the watermark. Retrying query.");
    this.log.error("Timestamp is below", error, {
      timestamp,
      waterMark: this.waterMark
    });
    if (tries < __classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")) {
      return await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery2).call(this, Object.assign(Object.assign({}, args), { tries: tries + 1 }));
    }
    {
      throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
    }
  }
  return response;
}, _HttpAgent_requestAndRetry = async function _HttpAgent_requestAndRetry2(args) {
  const { request: request2, backoff, tries } = args;
  const delay = tries === 0 ? 0 : backoff.next();
  if (delay === null) {
    throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  try {
    response = await request2();
  } catch (error) {
    if (__classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f") > tries) {
      this.log.warn(`Caught exception while attempting to make request:
  ${error}
  Retrying request.`);
      return await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry2).call(this, { request: request2, backoff, tries: tries + 1 });
    }
    throw error;
  }
  if (response.ok) {
    return response;
  }
  const responseText = await response.clone().text();
  const errorMessage = `Server returned an error:
  Code: ${response.status} (${response.statusText})
  Body: ${responseText}
`;
  if (response.status === 404 && response.url.includes("api/v3")) {
    throw new AgentHTTPResponseError("v3 api not supported. Fall back to v2", {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: httpHeadersTransform(response.headers)
    });
  }
  if (tries < __classPrivateFieldGet4(this, _HttpAgent_retryTimes, "f")) {
    return await __classPrivateFieldGet4(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry2).call(this, { request: request2, backoff, tries: tries + 1 });
  }
  throw new AgentHTTPResponseError(errorMessage, {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers: httpHeadersTransform(response.headers)
  });
}, _HttpAgent_rootKeyGuard = async function _HttpAgent_rootKeyGuard2() {
  if (this.rootKey) {
    return;
  } else if (this.rootKey === null && __classPrivateFieldGet4(this, _HttpAgent_shouldFetchRootKey, "f")) {
    await this.fetchRootKey();
  } else {
    throw new AgentError(`Invalid root key detected. The root key for this agent is ${this.rootKey} and the shouldFetchRootKey value is set to ${__classPrivateFieldGet4(this, _HttpAgent_shouldFetchRootKey, "f")}. The root key should only be unknown if you are in local development. Otherwise you should avoid fetching and use the default IC Root Key or the known root key of your environment.`);
  }
};

// node_modules/@dfinity/agent/lib/esm/agent/proxy.js
var ProxyMessageKind;
(function(ProxyMessageKind2) {
  ProxyMessageKind2["Error"] = "err";
  ProxyMessageKind2["GetPrincipal"] = "gp";
  ProxyMessageKind2["GetPrincipalResponse"] = "gpr";
  ProxyMessageKind2["Query"] = "q";
  ProxyMessageKind2["QueryResponse"] = "qr";
  ProxyMessageKind2["Call"] = "c";
  ProxyMessageKind2["CallResponse"] = "cr";
  ProxyMessageKind2["ReadState"] = "rs";
  ProxyMessageKind2["ReadStateResponse"] = "rsr";
  ProxyMessageKind2["Status"] = "s";
  ProxyMessageKind2["StatusResponse"] = "sr";
})(ProxyMessageKind || (ProxyMessageKind = {}));
var ProxyStubAgent = class {
  constructor(_frontend, _agent) {
    this._frontend = _frontend;
    this._agent = _agent;
  }
  onmessage(msg) {
    switch (msg.type) {
      case ProxyMessageKind.GetPrincipal:
        this._agent.getPrincipal().then((response) => {
          this._frontend({
            id: msg.id,
            type: ProxyMessageKind.GetPrincipalResponse,
            response: response.toText()
          });
        });
        break;
      case ProxyMessageKind.Query:
        this._agent.query(...msg.args).then((response) => {
          this._frontend({
            id: msg.id,
            type: ProxyMessageKind.QueryResponse,
            response
          });
        });
        break;
      case ProxyMessageKind.Call:
        this._agent.call(...msg.args).then((response) => {
          this._frontend({
            id: msg.id,
            type: ProxyMessageKind.CallResponse,
            response
          });
        });
        break;
      case ProxyMessageKind.ReadState:
        this._agent.readState(...msg.args).then((response) => {
          this._frontend({
            id: msg.id,
            type: ProxyMessageKind.ReadStateResponse,
            response
          });
        });
        break;
      case ProxyMessageKind.Status:
        this._agent.status().then((response) => {
          this._frontend({
            id: msg.id,
            type: ProxyMessageKind.StatusResponse,
            response
          });
        });
        break;
      default:
        throw new Error(`Invalid message received: ${JSON.stringify(msg)}`);
    }
  }
};
var ProxyAgent = class {
  constructor(_backend) {
    this._backend = _backend;
    this._nextId = 0;
    this._pendingCalls = /* @__PURE__ */ new Map();
    this.rootKey = null;
  }
  onmessage(msg) {
    const id = msg.id;
    const maybePromise = this._pendingCalls.get(id);
    if (!maybePromise) {
      throw new Error("A proxy get the same message twice...");
    }
    this._pendingCalls.delete(id);
    const [resolve, reject] = maybePromise;
    switch (msg.type) {
      case ProxyMessageKind.Error:
        return reject(msg.error);
      case ProxyMessageKind.GetPrincipalResponse:
      case ProxyMessageKind.CallResponse:
      case ProxyMessageKind.QueryResponse:
      case ProxyMessageKind.ReadStateResponse:
      case ProxyMessageKind.StatusResponse:
        return resolve(msg.response);
      default:
        throw new Error(`Invalid message being sent to ProxyAgent: ${JSON.stringify(msg)}`);
    }
  }
  async getPrincipal() {
    return this._sendAndWait({
      id: this._nextId++,
      type: ProxyMessageKind.GetPrincipal
    }).then((principal) => {
      if (typeof principal !== "string") {
        throw new Error("Invalid principal received.");
      }
      return Principal.fromText(principal);
    });
  }
  readState(canisterId, fields) {
    return this._sendAndWait({
      id: this._nextId++,
      type: ProxyMessageKind.ReadState,
      args: [canisterId.toString(), fields]
    });
  }
  call(canisterId, fields) {
    return this._sendAndWait({
      id: this._nextId++,
      type: ProxyMessageKind.Call,
      args: [canisterId.toString(), fields]
    });
  }
  status() {
    return this._sendAndWait({
      id: this._nextId++,
      type: ProxyMessageKind.Status
    });
  }
  query(canisterId, fields) {
    return this._sendAndWait({
      id: this._nextId++,
      type: ProxyMessageKind.Query,
      args: [canisterId.toString(), fields]
    });
  }
  async _sendAndWait(msg) {
    return new Promise((resolve, reject) => {
      this._pendingCalls.set(msg.id, [resolve, reject]);
      this._backend(msg);
    });
  }
  async fetchRootKey() {
    const rootKey = (await this.status()).root_key;
    this.rootKey = rootKey;
    return rootKey;
  }
};

// node_modules/@dfinity/agent/lib/esm/agent/index.js
function getDefaultAgent() {
  const agent = typeof window === "undefined" ? typeof global === "undefined" ? typeof self === "undefined" ? void 0 : self.ic.agent : global.ic.agent : window.ic.agent;
  if (!agent) {
    throw new Error("No Agent could be found.");
  }
  return agent;
}

// node_modules/@dfinity/agent/lib/esm/certificate.js
var __classPrivateFieldSet5 = function(receiver, state, value3, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value3) : f ? f.value = value3 : state.set(receiver, value3), value3;
};
var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Certificate_disableTimeVerification;
var CertificateVerificationError = class extends AgentError {
  constructor(reason) {
    super(`Invalid certificate: ${reason}`);
  }
};
var NodeType;
(function(NodeType2) {
  NodeType2[NodeType2["Empty"] = 0] = "Empty";
  NodeType2[NodeType2["Fork"] = 1] = "Fork";
  NodeType2[NodeType2["Labeled"] = 2] = "Labeled";
  NodeType2[NodeType2["Leaf"] = 3] = "Leaf";
  NodeType2[NodeType2["Pruned"] = 4] = "Pruned";
})(NodeType || (NodeType = {}));
function hashTreeToString(tree) {
  const indent = (s) => s.split("\n").map((x) => "  " + x).join("\n");
  function labelToString(label) {
    const decoder = new TextDecoder(void 0, { fatal: true });
    try {
      return JSON.stringify(decoder.decode(label));
    } catch (e) {
      return `data(...${label.byteLength} bytes)`;
    }
  }
  switch (tree[0]) {
    case NodeType.Empty:
      return "()";
    case NodeType.Fork: {
      if (tree[1] instanceof Array && tree[2] instanceof ArrayBuffer) {
        const left = hashTreeToString(tree[1]);
        const right = hashTreeToString(tree[2]);
        return `sub(
 left:
${indent(left)}
---
 right:
${indent(right)}
)`;
      } else {
        throw new Error("Invalid tree structure for fork");
      }
    }
    case NodeType.Labeled: {
      if (tree[1] instanceof ArrayBuffer && tree[2] instanceof ArrayBuffer) {
        const label = labelToString(tree[1]);
        const sub = hashTreeToString(tree[2]);
        return `label(
 label:
${indent(label)}
 sub:
${indent(sub)}
)`;
      } else {
        throw new Error("Invalid tree structure for labeled");
      }
    }
    case NodeType.Leaf: {
      if (!tree[1]) {
        throw new Error("Invalid tree structure for leaf");
      } else if (Array.isArray(tree[1])) {
        return JSON.stringify(tree[1]);
      }
      return `leaf(...${tree[1].byteLength} bytes)`;
    }
    case NodeType.Pruned: {
      if (!tree[1]) {
        throw new Error("Invalid tree structure for pruned");
      } else if (Array.isArray(tree[1])) {
        return JSON.stringify(tree[1]);
      }
      return `pruned(${toHex(new Uint8Array(tree[1]))}`;
    }
    default: {
      return `unknown(${JSON.stringify(tree[0])})`;
    }
  }
}
function isBufferGreaterThan(a, b) {
  const a8 = new Uint8Array(a);
  const b8 = new Uint8Array(b);
  for (let i = 0; i < a8.length; i++) {
    if (a8[i] > b8[i]) {
      return true;
    }
  }
  return false;
}
var Certificate = class _Certificate {
  constructor(certificate, _rootKey, _canisterId, _blsVerify, _maxAgeInMinutes = 5, disableTimeVerification = false) {
    this._rootKey = _rootKey;
    this._canisterId = _canisterId;
    this._blsVerify = _blsVerify;
    this._maxAgeInMinutes = _maxAgeInMinutes;
    _Certificate_disableTimeVerification.set(this, false);
    __classPrivateFieldSet5(this, _Certificate_disableTimeVerification, disableTimeVerification, "f");
    this.cert = decode2(new Uint8Array(certificate));
  }
  /**
   * Create a new instance of a certificate, automatically verifying it. Throws a
   * CertificateVerificationError if the certificate cannot be verified.
   * @constructs  Certificate
   * @param {CreateCertificateOptions} options {@link CreateCertificateOptions}
   * @param {ArrayBuffer} options.certificate The bytes of the certificate
   * @param {ArrayBuffer} options.rootKey The root key to verify against
   * @param {Principal} options.canisterId The effective or signing canister ID
   * @param {number} options.maxAgeInMinutes The maximum age of the certificate in minutes. Default is 5 minutes.
   * @throws {CertificateVerificationError}
   */
  static async create(options) {
    const cert = _Certificate.createUnverified(options);
    await cert.verify();
    return cert;
  }
  static createUnverified(options) {
    let blsVerify2 = options.blsVerify;
    if (!blsVerify2) {
      blsVerify2 = blsVerify;
    }
    return new _Certificate(options.certificate, options.rootKey, options.canisterId, blsVerify2, options.maxAgeInMinutes, options.disableTimeVerification);
  }
  lookup(path) {
    return lookup_path(path, this.cert.tree);
  }
  lookup_label(label) {
    return this.lookup([label]);
  }
  async verify() {
    const rootHash = await reconstruct(this.cert.tree);
    const derKey = await this._checkDelegationAndGetKey(this.cert.delegation);
    const sig = this.cert.signature;
    const key = extractDER(derKey);
    const msg = concat(domain_sep("ic-state-root"), rootHash);
    let sigVer = false;
    const lookupTime = lookupResultToBuffer(this.lookup(["time"]));
    if (!lookupTime) {
      throw new CertificateVerificationError("Certificate does not contain a time");
    }
    if (!__classPrivateFieldGet5(this, _Certificate_disableTimeVerification, "f")) {
      const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
      const MAX_AGE_IN_MSEC = this._maxAgeInMinutes * 60 * 1e3;
      const now = Date.now();
      const earliestCertificateTime = now - MAX_AGE_IN_MSEC;
      const fiveMinutesFromNow = now + FIVE_MINUTES_IN_MSEC;
      const certTime = decodeTime(lookupTime);
      if (certTime.getTime() < earliestCertificateTime) {
        throw new CertificateVerificationError(`Certificate is signed more than ${this._maxAgeInMinutes} minutes in the past. Certificate time: ` + certTime.toISOString() + " Current time: " + new Date(now).toISOString());
      } else if (certTime.getTime() > fiveMinutesFromNow) {
        throw new CertificateVerificationError("Certificate is signed more than 5 minutes in the future. Certificate time: " + certTime.toISOString() + " Current time: " + new Date(now).toISOString());
      }
    }
    try {
      sigVer = await this._blsVerify(new Uint8Array(key), new Uint8Array(sig), new Uint8Array(msg));
    } catch (err) {
      sigVer = false;
    }
    if (!sigVer) {
      throw new CertificateVerificationError("Signature verification failed");
    }
  }
  async _checkDelegationAndGetKey(d) {
    if (!d) {
      return this._rootKey;
    }
    const cert = await _Certificate.createUnverified({
      certificate: d.certificate,
      rootKey: this._rootKey,
      canisterId: this._canisterId,
      blsVerify: this._blsVerify,
      // Do not check max age for delegation certificates
      maxAgeInMinutes: Infinity
    });
    if (cert.cert.delegation) {
      throw new CertificateVerificationError("Delegation certificates cannot be nested");
    }
    await cert.verify();
    if (this._canisterId.toString() !== MANAGEMENT_CANISTER_ID) {
      const canisterInRange = check_canister_ranges({
        canisterId: this._canisterId,
        subnetId: Principal.fromUint8Array(new Uint8Array(d.subnet_id)),
        tree: cert.cert.tree
      });
      if (!canisterInRange) {
        throw new CertificateVerificationError(`Canister ${this._canisterId} not in range of delegations for subnet 0x${toHex(d.subnet_id)}`);
      }
    }
    const publicKeyLookup = lookupResultToBuffer(cert.lookup(["subnet", d.subnet_id, "public_key"]));
    if (!publicKeyLookup) {
      throw new Error(`Could not find subnet key for subnet 0x${toHex(d.subnet_id)}`);
    }
    return publicKeyLookup;
  }
};
_Certificate_disableTimeVerification = /* @__PURE__ */ new WeakMap();
var DER_PREFIX = fromHex("308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100");
var KEY_LENGTH = 96;
function extractDER(buf) {
  const expectedLength = DER_PREFIX.byteLength + KEY_LENGTH;
  if (buf.byteLength !== expectedLength) {
    throw new TypeError(`BLS DER-encoded public key must be ${expectedLength} bytes long`);
  }
  const prefix = buf.slice(0, DER_PREFIX.byteLength);
  if (!bufEquals(prefix, DER_PREFIX)) {
    throw new TypeError(`BLS DER-encoded public key is invalid. Expect the following prefix: ${DER_PREFIX}, but get ${prefix}`);
  }
  return buf.slice(DER_PREFIX.byteLength);
}
function lookupResultToBuffer(result) {
  if (result.status !== LookupStatus.Found) {
    return void 0;
  }
  if (result.value instanceof ArrayBuffer) {
    return result.value;
  }
  if (result.value instanceof Uint8Array) {
    return result.value.buffer;
  }
  return void 0;
}
async function reconstruct(t) {
  switch (t[0]) {
    case NodeType.Empty:
      return hash(domain_sep("ic-hashtree-empty"));
    case NodeType.Pruned:
      return t[1];
    case NodeType.Leaf:
      return hash(concat(domain_sep("ic-hashtree-leaf"), t[1]));
    case NodeType.Labeled:
      return hash(concat(domain_sep("ic-hashtree-labeled"), t[1], await reconstruct(t[2])));
    case NodeType.Fork:
      return hash(concat(domain_sep("ic-hashtree-fork"), await reconstruct(t[1]), await reconstruct(t[2])));
    default:
      throw new Error("unreachable");
  }
}
function domain_sep(s) {
  const len = new Uint8Array([s.length]);
  const str = new TextEncoder().encode(s);
  return concat(len, str);
}
var LookupStatus;
(function(LookupStatus2) {
  LookupStatus2["Unknown"] = "unknown";
  LookupStatus2["Absent"] = "absent";
  LookupStatus2["Found"] = "found";
})(LookupStatus || (LookupStatus = {}));
var LabelLookupStatus;
(function(LabelLookupStatus2) {
  LabelLookupStatus2["Less"] = "less";
  LabelLookupStatus2["Greater"] = "greater";
})(LabelLookupStatus || (LabelLookupStatus = {}));
function lookup_path(path, tree) {
  if (path.length === 0) {
    switch (tree[0]) {
      case NodeType.Leaf: {
        if (!tree[1]) {
          throw new Error("Invalid tree structure for leaf");
        }
        if (tree[1] instanceof ArrayBuffer) {
          return {
            status: LookupStatus.Found,
            value: tree[1]
          };
        }
        if (tree[1] instanceof Uint8Array) {
          return {
            status: LookupStatus.Found,
            value: tree[1].buffer
          };
        }
        return {
          status: LookupStatus.Found,
          value: tree[1]
        };
      }
      default: {
        return {
          status: LookupStatus.Found,
          value: tree
        };
      }
    }
  }
  const label = typeof path[0] === "string" ? new TextEncoder().encode(path[0]) : path[0];
  const lookupResult = find_label(label, tree);
  switch (lookupResult.status) {
    case LookupStatus.Found: {
      return lookup_path(path.slice(1), lookupResult.value);
    }
    case LabelLookupStatus.Greater:
    case LabelLookupStatus.Less: {
      return {
        status: LookupStatus.Absent
      };
    }
    default: {
      return lookupResult;
    }
  }
}
function flatten_forks(t) {
  switch (t[0]) {
    case NodeType.Empty:
      return [];
    case NodeType.Fork:
      return flatten_forks(t[1]).concat(flatten_forks(t[2]));
    default:
      return [t];
  }
}
function find_label(label, tree) {
  switch (tree[0]) {
    case NodeType.Labeled:
      if (isBufferGreaterThan(label, tree[1])) {
        return {
          status: LabelLookupStatus.Greater
        };
      }
      if (bufEquals(label, tree[1])) {
        return {
          status: LookupStatus.Found,
          value: tree[2]
        };
      }
      return {
        status: LabelLookupStatus.Less
      };
    case NodeType.Fork:
      const leftLookupResult = find_label(label, tree[1]);
      switch (leftLookupResult.status) {
        case LabelLookupStatus.Greater: {
          const rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LabelLookupStatus.Less) {
            return {
              status: LookupStatus.Absent
            };
          }
          return rightLookupResult;
        }
        case LookupStatus.Unknown: {
          let rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LabelLookupStatus.Less) {
            return {
              status: LookupStatus.Unknown
            };
          }
          return rightLookupResult;
        }
        default: {
          return leftLookupResult;
        }
      }
    case NodeType.Pruned:
      return {
        status: LookupStatus.Unknown
      };
    default:
      return {
        status: LookupStatus.Absent
      };
  }
}
function check_canister_ranges(params) {
  const { canisterId, subnetId, tree } = params;
  const rangeLookup = lookup_path(["subnet", subnetId.toUint8Array(), "canister_ranges"], tree);
  if (rangeLookup.status !== LookupStatus.Found || !(rangeLookup.value instanceof ArrayBuffer)) {
    throw new Error(`Could not find canister ranges for subnet ${subnetId}`);
  }
  const ranges_arr = decode2(rangeLookup.value);
  const ranges = ranges_arr.map((v) => [
    Principal.fromUint8Array(v[0]),
    Principal.fromUint8Array(v[1])
  ]);
  const canisterInRange = ranges.some((r) => r[0].ltEq(canisterId) && r[1].gtEq(canisterId));
  return canisterInRange;
}

// node_modules/@dfinity/agent/lib/esm/canisterStatus/index.js
var CustomPath = class {
  constructor(key, path, decodeStrategy) {
    this.key = key;
    this.path = path;
    this.decodeStrategy = decodeStrategy;
  }
};
var request = async (options) => {
  const { agent, paths } = options;
  const canisterId = Principal.from(options.canisterId);
  const uniquePaths = [...new Set(paths)];
  const encodedPaths = uniquePaths.map((path) => {
    return encodePath(path, canisterId);
  });
  const status = /* @__PURE__ */ new Map();
  const promises = uniquePaths.map((path, index) => {
    return (async () => {
      var _a2;
      try {
        const response = await agent.readState(canisterId, {
          paths: [encodedPaths[index]]
        });
        if (agent.rootKey == null) {
          throw new Error("Agent is missing root key");
        }
        const cert = await Certificate.create({
          certificate: response.certificate,
          rootKey: agent.rootKey,
          canisterId,
          disableTimeVerification: true
        });
        const lookup = (cert2, path3) => {
          if (path3 === "subnet") {
            if (agent.rootKey == null) {
              throw new Error("Agent is missing root key");
            }
            const data2 = fetchNodeKeys(response.certificate, canisterId, agent.rootKey);
            return {
              path: path3,
              data: data2
            };
          } else {
            return {
              path: path3,
              data: lookupResultToBuffer(cert2.lookup(encodePath(path3, canisterId)))
            };
          }
        };
        const { path: path2, data } = lookup(cert, uniquePaths[index]);
        if (!data) {
          console.warn(`Expected to find result for path ${path2}, but instead found nothing.`);
          if (typeof path2 === "string") {
            status.set(path2, null);
          } else {
            status.set(path2.key, null);
          }
        } else {
          switch (path2) {
            case "time": {
              status.set(path2, decodeTime(data));
              break;
            }
            case "controllers": {
              status.set(path2, decodeControllers(data));
              break;
            }
            case "module_hash": {
              status.set(path2, decodeHex(data));
              break;
            }
            case "subnet": {
              status.set(path2, data);
              break;
            }
            case "candid": {
              status.set(path2, new TextDecoder().decode(data));
              break;
            }
            default: {
              if (typeof path2 !== "string" && "key" in path2 && "path" in path2) {
                switch (path2.decodeStrategy) {
                  case "raw":
                    status.set(path2.key, data);
                    break;
                  case "leb128": {
                    status.set(path2.key, decodeLeb128(data));
                    break;
                  }
                  case "cbor": {
                    status.set(path2.key, decodeCbor(data));
                    break;
                  }
                  case "hex": {
                    status.set(path2.key, decodeHex(data));
                    break;
                  }
                  case "utf-8": {
                    status.set(path2.key, decodeUtf8(data));
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        if ((_a2 = error === null || error === void 0 ? void 0 : error.message) === null || _a2 === void 0 ? void 0 : _a2.includes("Invalid certificate")) {
          throw new AgentError(error.message);
        }
        if (typeof path !== "string" && "key" in path && "path" in path) {
          status.set(path.key, null);
        } else {
          status.set(path, null);
        }
        console.group();
        console.warn(`Expected to find result for path ${path}, but instead found nothing.`);
        console.warn(error);
        console.groupEnd();
      }
    })();
  });
  await Promise.all(promises);
  return status;
};
var fetchNodeKeys = (certificate, canisterId, root_key) => {
  if (!canisterId._isPrincipal) {
    throw new Error("Invalid canisterId");
  }
  const cert = decode2(new Uint8Array(certificate));
  const tree = cert.tree;
  let delegation = cert.delegation;
  let subnetId;
  if (delegation && delegation.subnet_id) {
    subnetId = Principal.fromUint8Array(new Uint8Array(delegation.subnet_id));
  } else if (!delegation && typeof root_key !== "undefined") {
    subnetId = Principal.selfAuthenticating(new Uint8Array(root_key));
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new ArrayBuffer(0)
    };
  } else {
    subnetId = Principal.selfAuthenticating(Principal.fromText("tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe").toUint8Array());
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new ArrayBuffer(0)
    };
  }
  const canisterInRange = check_canister_ranges({ canisterId, subnetId, tree });
  if (!canisterInRange) {
    throw new Error("Canister not in range");
  }
  const subnetLookupResult = lookup_path(["subnet", delegation.subnet_id, "node"], tree);
  if (subnetLookupResult.status !== LookupStatus.Found) {
    throw new Error("Node not found");
  }
  if (subnetLookupResult.value instanceof ArrayBuffer) {
    throw new Error("Invalid node tree");
  }
  const nodeForks = flatten_forks(subnetLookupResult.value);
  const nodeKeys = /* @__PURE__ */ new Map();
  nodeForks.forEach((fork) => {
    const node_id = Principal.from(new Uint8Array(fork[1])).toText();
    const publicKeyLookupResult = lookup_path(["public_key"], fork[2]);
    if (publicKeyLookupResult.status !== LookupStatus.Found) {
      throw new Error("Public key not found");
    }
    const derEncodedPublicKey = publicKeyLookupResult.value;
    if (derEncodedPublicKey.byteLength !== 44) {
      throw new Error("Invalid public key length");
    } else {
      nodeKeys.set(node_id, derEncodedPublicKey);
    }
  });
  return {
    subnetId: Principal.fromUint8Array(new Uint8Array(delegation.subnet_id)).toText(),
    nodeKeys
  };
};
var encodePath = (path, canisterId) => {
  const encoder = new TextEncoder();
  const encode4 = (arg) => {
    return new DataView(encoder.encode(arg).buffer).buffer;
  };
  const canisterBuffer = new DataView(canisterId.toUint8Array().buffer).buffer;
  switch (path) {
    case "time":
      return [encode4("time")];
    case "controllers":
      return [encode4("canister"), canisterBuffer, encode4("controllers")];
    case "module_hash":
      return [encode4("canister"), canisterBuffer, encode4("module_hash")];
    case "subnet":
      return [encode4("subnet")];
    case "candid":
      return [encode4("canister"), canisterBuffer, encode4("metadata"), encode4("candid:service")];
    default: {
      if ("key" in path && "path" in path) {
        if (typeof path["path"] === "string" || path["path"] instanceof ArrayBuffer) {
          const metaPath = path.path;
          const encoded = typeof metaPath === "string" ? encode4(metaPath) : metaPath;
          return [encode4("canister"), canisterBuffer, encode4("metadata"), encoded];
        } else {
          return path["path"];
        }
      }
    }
  }
  throw new Error(`An unexpeected error was encountered while encoding your path for canister status. Please ensure that your path, ${path} was formatted correctly.`);
};
var decodeHex = (buf) => {
  return toHex(buf);
};
var decodeCbor = (buf) => {
  return decode2(buf);
};
var decodeUtf8 = (buf) => {
  return new TextDecoder().decode(buf);
};
var decodeControllers = (buf) => {
  const controllersRaw = decodeCbor(buf);
  return controllersRaw.map((buf2) => {
    return Principal.fromUint8Array(new Uint8Array(buf2));
  });
};

export {
  __commonJS,
  __export,
  __toESM,
  require_base64_js,
  require_ieee754,
  ReplicaRejectCode,
  Principal,
  concat,
  toHex,
  fromHex,
  compare,
  bufEquals,
  uint8ToBuf,
  bufFromBufLike,
  AgentError,
  bufFromBufLike2,
  idl_exports,
  hash,
  hashValue,
  requestIdOf,
  hashOfMap,
  SignIdentity,
  AnonymousIdentity,
  createIdentityDescriptor,
  cbor_exports,
  randomNumber,
  SubmitRequestType,
  makeNonce,
  Expiry,
  makeNonceTransform,
  makeExpiryTransform,
  httpHeadersTransform,
  AgentHTTPResponseError,
  AgentCallError,
  AgentQueryError,
  AgentReadStateError,
  verify,
  blsVerify,
  CertificateVerificationError,
  NodeType,
  hashTreeToString,
  Certificate,
  lookupResultToBuffer,
  reconstruct,
  LookupStatus,
  lookup_path,
  flatten_forks,
  find_label,
  check_canister_ranges,
  CustomPath,
  request,
  fetchNodeKeys,
  encodePath,
  canisterStatus_exports,
  encodeLenBytes,
  encodeLen,
  decodeLenBytes,
  decodeLen,
  DER_COSE_OID,
  ED25519_OID,
  SECP256K1_OID,
  wrapDER,
  unwrapDER,
  Ed25519PublicKey,
  Observable,
  ObservableLog,
  RequestStatusResponseStatus,
  IC_ROOT_KEY,
  MANAGEMENT_CANISTER_ID,
  IdentityInvalidError,
  HttpAgent,
  ProxyMessageKind,
  ProxyStubAgent,
  ProxyAgent,
  getDefaultAgent
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/bls.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/tower.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/bls12-381.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=chunk-X4QDNIJT.js.map
