/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/* THIS FILE WAS AUTO-GENERATED. ALL CHANGES WILL BE LOST UPON RE-GENERATION. */
var Live2DCubismCore;
(function (Live2DCubismCore) {
    /**
     * Emscripten Cubism Core module.
     *
     * This module is governed by the Live2D Proprietary Software license
     * that can be found at http://live2d.com/eula/live2d-proprietary-software-license-agreement_en.html.
     */
    var _em_module = (function () {
        var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
        return (function (_em_module) {
            _em_module = _em_module || {};
            var Module = typeof _em_module !== "undefined" ? _em_module : {};
            var moduleOverrides = {};
            var key;
            for (key in Module) {
                if (Module.hasOwnProperty(key)) {
                    moduleOverrides[key] = Module[key];
                }
            }
            Module["arguments"] = [];
            Module["thisProgram"] = "./this.program";
            Module["quit"] = function (status, toThrow) { throw toThrow; };
            Module["preRun"] = [];
            Module["postRun"] = [];
            var ENVIRONMENT_IS_WEB = false;
            var ENVIRONMENT_IS_WORKER = false;
            var ENVIRONMENT_IS_NODE = false;
            var ENVIRONMENT_IS_SHELL = false;
            ENVIRONMENT_IS_WEB = typeof window === "object";
            ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
            ENVIRONMENT_IS_NODE = typeof process === "object" && typeof require === "function" && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
            ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
            var scriptDirectory = "";
            function locateFile(path) { if (Module["locateFile"]) {
                return Module["locateFile"](path, scriptDirectory);
            }
            else {
                return scriptDirectory + path;
            } }
            if (ENVIRONMENT_IS_NODE) {
                scriptDirectory = __dirname + "/";
                var nodeFS;
                var nodePath;
                Module["read"] = function shell_read(filename, binary) { var ret; ret = tryParseAsDataURI(filename); if (!ret) {
                    if (!nodeFS)
                        nodeFS = require("fs");
                    if (!nodePath)
                        nodePath = require("path");
                    filename = nodePath["normalize"](filename);
                    ret = nodeFS["readFileSync"](filename);
                } return binary ? ret : ret.toString(); };
                Module["readBinary"] = function readBinary(filename) { var ret = Module["read"](filename, true); if (!ret.buffer) {
                    ret = new Uint8Array(ret);
                } assert(ret.buffer); return ret; };
                if (process["argv"].length > 1) {
                    Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
                }
                Module["arguments"] = process["argv"].slice(2);
                process["on"]("uncaughtException", function (ex) { if (!(ex instanceof ExitStatus)) {
                    throw ex;
                } });
                process["on"]("unhandledRejection", abort);
                Module["quit"] = function (status) { process["exit"](status); };
                Module["inspect"] = function () { return "[Emscripten Module object]"; };
            }
            else if (ENVIRONMENT_IS_SHELL) {
                if (typeof read != "undefined") {
                    Module["read"] = function shell_read(f) { var data = tryParseAsDataURI(f); if (data) {
                        return intArrayToString(data);
                    } return read(f); };
                }
                Module["readBinary"] = function readBinary(f) { var data; data = tryParseAsDataURI(f); if (data) {
                    return data;
                } if (typeof readbuffer === "function") {
                    return new Uint8Array(readbuffer(f));
                } data = read(f, "binary"); assert(typeof data === "object"); return data; };
                if (typeof scriptArgs != "undefined") {
                    Module["arguments"] = scriptArgs;
                }
                else if (typeof arguments != "undefined") {
                    Module["arguments"] = arguments;
                }
                if (typeof quit === "function") {
                    Module["quit"] = function (status) { quit(status); };
                }
            }
            else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
                if (ENVIRONMENT_IS_WORKER) {
                    scriptDirectory = self.location.href;
                }
                else if (document.currentScript) {
                    scriptDirectory = document.currentScript.src;
                }
                if (_scriptDir) {
                    scriptDirectory = _scriptDir;
                }
                if (scriptDirectory.indexOf("blob:") !== 0) {
                    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
                }
                else {
                    scriptDirectory = "";
                }
                Module["read"] = function shell_read(url) { try {
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    return xhr.responseText;
                }
                catch (err) {
                    var data = tryParseAsDataURI(url);
                    if (data) {
                        return intArrayToString(data);
                    }
                    throw err;
                } };
                if (ENVIRONMENT_IS_WORKER) {
                    Module["readBinary"] = function readBinary(url) { try {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response);
                    }
                    catch (err) {
                        var data = tryParseAsDataURI(url);
                        if (data) {
                            return data;
                        }
                        throw err;
                    } };
                }
                Module["readAsync"] = function readAsync(url, onload, onerror) { var xhr = new XMLHttpRequest; xhr.open("GET", url, true); xhr.responseType = "arraybuffer"; xhr.onload = function xhr_onload() { if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                } var data = tryParseAsDataURI(url); if (data) {
                    onload(data.buffer);
                    return;
                } onerror(); }; xhr.onerror = onerror; xhr.send(null); };
                Module["setWindowTitle"] = function (title) { document.title = title; };
            }
            else { }
            var out = Module["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
            var err = Module["printErr"] || (typeof printErr !== "undefined" ? printErr : typeof console !== "undefined" && console.warn.bind(console) || out);
            for (key in moduleOverrides) {
                if (moduleOverrides.hasOwnProperty(key)) {
                    Module[key] = moduleOverrides[key];
                }
            }
            moduleOverrides = undefined;
            var STACK_ALIGN = 16;
            function dynamicAlloc(size) { var ret = HEAP32[DYNAMICTOP_PTR >> 2]; var end = ret + size + 15 & -16; if (end <= _emscripten_get_heap_size()) {
                HEAP32[DYNAMICTOP_PTR >> 2] = end;
            }
            else {
                var success = _emscripten_resize_heap(end);
                if (!success)
                    return 0;
            } return ret; }
            function getNativeTypeSize(type) { switch (type) {
                case "i1":
                case "i8": return 1;
                case "i16": return 2;
                case "i32": return 4;
                case "i64": return 8;
                case "float": return 4;
                case "double": return 8;
                default: {
                    if (type[type.length - 1] === "*") {
                        return 4;
                    }
                    else if (type[0] === "i") {
                        var bits = parseInt(type.substr(1));
                        assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
                        return bits / 8;
                    }
                    else {
                        return 0;
                    }
                }
            } }
            function warnOnce(text) { if (!warnOnce.shown)
                warnOnce.shown = {}; if (!warnOnce.shown[text]) {
                warnOnce.shown[text] = 1;
                err(text);
            } }
            var jsCallStartIndex = 1;
            var functionPointers = new Array(1);
            function addFunction(func, sig) { var base = 0; for (var i = base; i < base + 1; i++) {
                if (!functionPointers[i]) {
                    functionPointers[i] = func;
                    return jsCallStartIndex + i;
                }
            } throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."; }
            var funcWrappers = {};
            function dynCall(sig, ptr, args) { if (args && args.length) {
                return Module["dynCall_" + sig].apply(null, [ptr].concat(args));
            }
            else {
                return Module["dynCall_" + sig].call(null, ptr);
            } }
            var tempRet0 = 0;
            var setTempRet0 = function (value) { tempRet0 = value; };
            var getTempRet0 = function () { return tempRet0; };
            var GLOBAL_BASE = 8;
            var ABORT = false;
            var EXITSTATUS = 0;
            function assert(condition, text) { if (!condition) {
                abort("Assertion failed: " + text);
            } }
            function getCFunc(ident) { var func = Module["_" + ident]; assert(func, "Cannot call unknown function " + ident + ", make sure it is exported"); return func; }
            function ccall(ident, returnType, argTypes, args, opts) { var toC = { "string": function (str) { var ret = 0; if (str !== null && str !== undefined && str !== 0) {
                    var len = (str.length << 2) + 1;
                    ret = stackAlloc(len);
                    stringToUTF8(str, ret, len);
                } return ret; }, "array": function (arr) { var ret = stackAlloc(arr.length); writeArrayToMemory(arr, ret); return ret; } }; function convertReturnValue(ret) { if (returnType === "string")
                return UTF8ToString(ret); if (returnType === "boolean")
                return Boolean(ret); return ret; } var func = getCFunc(ident); var cArgs = []; var stack = 0; if (args) {
                for (var i = 0; i < args.length; i++) {
                    var converter = toC[argTypes[i]];
                    if (converter) {
                        if (stack === 0)
                            stack = stackSave();
                        cArgs[i] = converter(args[i]);
                    }
                    else {
                        cArgs[i] = args[i];
                    }
                }
            } var ret = func.apply(null, cArgs); ret = convertReturnValue(ret); if (stack !== 0)
                stackRestore(stack); return ret; }
            function setValue(ptr, value, type, noSafe) { type = type || "i8"; if (type.charAt(type.length - 1) === "*")
                type = "i32"; switch (type) {
                case "i1":
                    HEAP8[ptr >> 0] = value;
                    break;
                case "i8":
                    HEAP8[ptr >> 0] = value;
                    break;
                case "i16":
                    HEAP16[ptr >> 1] = value;
                    break;
                case "i32":
                    HEAP32[ptr >> 2] = value;
                    break;
                case "i64":
                    tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= +1 ? tempDouble > +0 ? (Math_min(+Math_floor(tempDouble / +4294967296), +4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / +4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
                    break;
                case "float":
                    HEAPF32[ptr >> 2] = value;
                    break;
                case "double":
                    HEAPF64[ptr >> 3] = value;
                    break;
                default: abort("invalid type for setValue: " + type);
            } }
            var ALLOC_NONE = 3;
            var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
            function UTF8ArrayToString(u8Array, idx, maxBytesToRead) { var endIdx = idx + maxBytesToRead; var endPtr = idx; while (u8Array[endPtr] && !(endPtr >= endIdx))
                ++endPtr; if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
                return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
            }
            else {
                var str = "";
                while (idx < endPtr) {
                    var u0 = u8Array[idx++];
                    if (!(u0 & 128)) {
                        str += String.fromCharCode(u0);
                        continue;
                    }
                    var u1 = u8Array[idx++] & 63;
                    if ((u0 & 224) == 192) {
                        str += String.fromCharCode((u0 & 31) << 6 | u1);
                        continue;
                    }
                    var u2 = u8Array[idx++] & 63;
                    if ((u0 & 240) == 224) {
                        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
                    }
                    else {
                        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
                    }
                    if (u0 < 65536) {
                        str += String.fromCharCode(u0);
                    }
                    else {
                        var ch = u0 - 65536;
                        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                    }
                }
            } return str; }
            function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""; }
            function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) { if (!(maxBytesToWrite > 0))
                return 0; var startIdx = outIdx; var endIdx = outIdx + maxBytesToWrite - 1; for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343) {
                    var u1 = str.charCodeAt(++i);
                    u = 65536 + ((u & 1023) << 10) | u1 & 1023;
                }
                if (u <= 127) {
                    if (outIdx >= endIdx)
                        break;
                    outU8Array[outIdx++] = u;
                }
                else if (u <= 2047) {
                    if (outIdx + 1 >= endIdx)
                        break;
                    outU8Array[outIdx++] = 192 | u >> 6;
                    outU8Array[outIdx++] = 128 | u & 63;
                }
                else if (u <= 65535) {
                    if (outIdx + 2 >= endIdx)
                        break;
                    outU8Array[outIdx++] = 224 | u >> 12;
                    outU8Array[outIdx++] = 128 | u >> 6 & 63;
                    outU8Array[outIdx++] = 128 | u & 63;
                }
                else {
                    if (outIdx + 3 >= endIdx)
                        break;
                    outU8Array[outIdx++] = 240 | u >> 18;
                    outU8Array[outIdx++] = 128 | u >> 12 & 63;
                    outU8Array[outIdx++] = 128 | u >> 6 & 63;
                    outU8Array[outIdx++] = 128 | u & 63;
                }
            } outU8Array[outIdx] = 0; return outIdx - startIdx; }
            function stringToUTF8(str, outPtr, maxBytesToWrite) { return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite); }
            function lengthBytesUTF8(str) { var len = 0; for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343)
                    u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
                if (u <= 127)
                    ++len;
                else if (u <= 2047)
                    len += 2;
                else if (u <= 65535)
                    len += 3;
                else
                    len += 4;
            } return len; }
            var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
            function writeArrayToMemory(array, buffer) { HEAP8.set(array, buffer); }
            function writeAsciiToMemory(str, buffer, dontAddNull) { for (var i = 0; i < str.length; ++i) {
                HEAP8[buffer++ >> 0] = str.charCodeAt(i);
            } if (!dontAddNull)
                HEAP8[buffer >> 0] = 0; }
            function demangle(func) { return func; }
            function demangleAll(text) { var regex = /__Z[\w\d_]+/g; return text.replace(regex, function (x) { var y = demangle(x); return x === y ? x : y + " [" + x + "]"; }); }
            function jsStackTrace() { var err = new Error; if (!err.stack) {
                try {
                    throw new Error(0);
                }
                catch (e) {
                    err = e;
                }
                if (!err.stack) {
                    return "(no stack trace available)";
                }
            } return err.stack.toString(); }
            function alignUp(x, multiple) { if (x % multiple > 0) {
                x += multiple - x % multiple;
            } return x; }
            var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
            function updateGlobalBufferViews() { Module["HEAP8"] = HEAP8 = new Int8Array(buffer); Module["HEAP16"] = HEAP16 = new Int16Array(buffer); Module["HEAP32"] = HEAP32 = new Int32Array(buffer); Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer); Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer); Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer); Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer); Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer); }
            var STACK_BASE = 4368, DYNAMIC_BASE = 5247248, DYNAMICTOP_PTR = 4112;
            var TOTAL_STACK = 5242880;
            var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
            if (INITIAL_TOTAL_MEMORY < TOTAL_STACK)
                err("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
            if (Module["buffer"]) {
                buffer = Module["buffer"];
            }
            else {
                {
                    buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
                }
            }
            updateGlobalBufferViews();
            HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
            function callRuntimeCallbacks(callbacks) { while (callbacks.length > 0) {
                var callback = callbacks.shift();
                if (typeof callback == "function") {
                    callback();
                    continue;
                }
                var func = callback.func;
                if (typeof func === "number") {
                    if (callback.arg === undefined) {
                        Module["dynCall_v"](func);
                    }
                    else {
                        Module["dynCall_vi"](func, callback.arg);
                    }
                }
                else {
                    func(callback.arg === undefined ? null : callback.arg);
                }
            } }
            var __ATPRERUN__ = [];
            var __ATINIT__ = [];
            var __ATMAIN__ = [];
            var __ATPOSTRUN__ = [];
            var runtimeInitialized = false;
            var runtimeExited = false;
            function preRun() { if (Module["preRun"]) {
                if (typeof Module["preRun"] == "function")
                    Module["preRun"] = [Module["preRun"]];
                while (Module["preRun"].length) {
                    addOnPreRun(Module["preRun"].shift());
                }
            } callRuntimeCallbacks(__ATPRERUN__); }
            function ensureInitRuntime() { if (runtimeInitialized)
                return; runtimeInitialized = true; callRuntimeCallbacks(__ATINIT__); }
            function preMain() { callRuntimeCallbacks(__ATMAIN__); }
            function exitRuntime() { runtimeExited = true; }
            function postRun() { if (Module["postRun"]) {
                if (typeof Module["postRun"] == "function")
                    Module["postRun"] = [Module["postRun"]];
                while (Module["postRun"].length) {
                    addOnPostRun(Module["postRun"].shift());
                }
            } callRuntimeCallbacks(__ATPOSTRUN__); }
            function addOnPreRun(cb) { __ATPRERUN__.unshift(cb); }
            function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb); }
            if (!Math.imul || Math.imul(4294967295, 5) !== -5)
                Math.imul = function imul(a, b) { var ah = a >>> 16; var al = a & 65535; var bh = b >>> 16; var bl = b & 65535; return al * bl + (ah * bl + al * bh << 16) | 0; };
            if (!Math.clz32)
                Math.clz32 = function (x) { var n = 32; var y = x >> 16; if (y) {
                    n -= 16;
                    x = y;
                } y = x >> 8; if (y) {
                    n -= 8;
                    x = y;
                } y = x >> 4; if (y) {
                    n -= 4;
                    x = y;
                } y = x >> 2; if (y) {
                    n -= 2;
                    x = y;
                } y = x >> 1; if (y)
                    return n - 2; return n - x; };
            if (!Math.trunc)
                Math.trunc = function (x) { return x < 0 ? Math.ceil(x) : Math.floor(x); };
            var Math_abs = Math.abs;
            var Math_ceil = Math.ceil;
            var Math_floor = Math.floor;
            var Math_min = Math.min;
            var runDependencies = 0;
            var runDependencyWatcher = null;
            var dependenciesFulfilled = null;
            function addRunDependency(id) { runDependencies++; if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            } }
            function removeRunDependency(id) { runDependencies--; if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            } if (runDependencies == 0) {
                if (runDependencyWatcher !== null) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null;
                }
                if (dependenciesFulfilled) {
                    var callback = dependenciesFulfilled;
                    dependenciesFulfilled = null;
                    callback();
                }
            } }
            Module["preloadedImages"] = {};
            Module["preloadedAudios"] = {};
            var memoryInitializer = null;
            var dataURIPrefix = "data:application/octet-stream;base64,";
            function isDataURI(filename) { return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0; }
            memoryInitializer = "data:application/octet-stream;base64,AAAAAAAAAAARAAoAERERAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABEADwoREREDCgcAARMJCwsAAAkGCwAACwAGEQAAABEREQAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAARAAoKERERAAoAAAIACQsAAAAJAAsAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAA0AAAAEDQAAAAAJDgAAAAAADgAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAPAAAAAA8AAAAACRAAAAAAABAAABAAABIAAAASEhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAABISEgAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAAAAAAAAAAAAAoAAAAACgAAAAAJCwAAAAAACwAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAwAAAAACQwAAAAAAAwAAAwAADAxMjM0NTY3ODlBQkNERUb0AQAABQAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAC4CQAAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACv////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAW0NTTV0gW0VdSW5pdGlhbGl6ZURlZm9ybWVycygpOiBVbmtub3duIERlZm9ybWVyIFR5cGUuCgBMaXZlMkQgQ3ViaXNtIFNESyBDb3JlIFZlcnNpb24gJWQuJWQuJWQATU9DMwBbQ1NNXSBbRV1jc21SZXZpdmVNb2NJblBsYWNlIGlzIGZhaWxlZC4gQ29ycnVwdGVkICBtb2MzIGZpbGUuCgBbQ1NNXSBbRV1jc21SZXZpdmVNb2NJblBsYWNlIGlzIGZhaWxlZC4gVGhlIENvcmUgdW5zdXBwb3J0IGxhdGVyIHRoYW4gbW9jMyB2ZXI6WyVkXS4gVGhpcyBtb2MzIHZlciBpcyBbJWRdLgoAW0NTTV0gW0VdJXM6ICVzCgAiYWRkcmVzcyIgaXMgbnVsbC4AY3NtUmV2aXZlTW9jSW5QbGFjZQAiYWRkcmVzcyIgYWxpZ25tZW50IGlzIGludmFsaWQuACJzaXplIiBpcyBpbnZhbGlkLgBjc21SZWFkQ2FudmFzSW5mbwAibW9kZWwiIGlzIGludmFsaWQuACJvdXRTaXplSW5QaXhlbHMiIGlzIG51bGwuACJvdXRPcmlnaW5JblBpeGVscyIgaXMgbnVsbC4AIm91dFBpeGVsc1BlclVuaXQiIGlzIG51bGwuAGNzbUdldFNpemVvZk1vZGVsACJtb2MiIGlzIGludmFsaWQuAGNzbUluaXRpYWxpemVNb2RlbEluUGxhY2UAInNpemUiIGlzIGludmFsaWQAY3NtVXBkYXRlTW9kZWwAY3NtR2V0UGFyYW1ldGVyQ291bnQAY3NtR2V0UGFyYW1ldGVySWRzAGNzbUdldFBhcmFtZXRlck1pbmltdW1WYWx1ZXMAY3NtR2V0UGFyYW1ldGVyTWF4aW11bVZhbHVlcwBjc21HZXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzAGNzbUdldFBhcmFtZXRlclZhbHVlcwBjc21HZXRQYXJ0Q291bnQAY3NtR2V0UGFydElkcwBjc21HZXRQYXJ0T3BhY2l0aWVzAGNzbUdldFBhcnRQYXJlbnRQYXJ0SW5kaWNlcwBjc21HZXREcmF3YWJsZUNvdW50AGNzbUdldERyYXdhYmxlSWRzAGNzbUdldERyYXdhYmxlQ29uc3RhbnRGbGFncwBjc21HZXREcmF3YWJsZUR5bmFtaWNGbGFncwBjc21HZXREcmF3YWJsZVRleHR1cmVJbmRpY2VzAGNzbUdldERyYXdhYmxlRHJhd09yZGVycwBjc21HZXREcmF3YWJsZVJlbmRlck9yZGVycwBjc21HZXREcmF3YWJsZU9wYWNpdGllcwBjc21HZXREcmF3YWJsZU1hc2tDb3VudHMAY3NtR2V0RHJhd2FibGVNYXNrcwBjc21HZXREcmF3YWJsZVZlcnRleENvdW50cwBjc21HZXREcmF3YWJsZVZlcnRleFBvc2l0aW9ucwBjc21HZXREcmF3YWJsZVZlcnRleFV2cwBjc21HZXREcmF3YWJsZUluZGV4Q291bnRzAGNzbUdldERyYXdhYmxlSW5kaWNlcwBjc21SZXNldERyYXdhYmxlRHluYW1pY0ZsYWdzAFtDU01dIFtFXVdhcnBEZWZvcm1lcjo6VHJhbnNmb3JtVGFyZ2V0KCkgZXJyb3IuIFslZF0gcDAxPSglLjRmICwgJS40ZikKAFtDU01dIFtXXVJvdGF0aW9uRGVmb3JtZXI6IE5vdCBmb3VuZCB0cmFuc2Zvcm1lZCBEaXJlY3Rpb24uCgBbQ1NNXSBbRV1VcGRhdGVEZWZvcm1lckhpZXJhcmNoeSgpOiBVbmtub3duIERlZm9ybWVyIFR5cGUuCgAlcwoALSsgICAwWDB4AChudWxsKQAtMFgrMFggMFgtMHgrMHggMHgAaW5mAElORgBuYW4ATkFOAC4=";
            var tempDoublePtr = 4352;
            var SYSCALLS = { buffers: [null, [], []], printChar: function (stream, curr) { var buffer = SYSCALLS.buffers[stream]; if (curr === 0 || curr === 10) {
                    (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
                    buffer.length = 0;
                }
                else {
                    buffer.push(curr);
                } }, varargs: 0, get: function (varargs) { SYSCALLS.varargs += 4; var ret = HEAP32[SYSCALLS.varargs - 4 >> 2]; return ret; }, getStr: function () { var ret = UTF8ToString(SYSCALLS.get()); return ret; }, get64: function () { var low = SYSCALLS.get(), high = SYSCALLS.get(); return low; }, getZero: function () { SYSCALLS.get(); } };
            function ___syscall140(which, varargs) { SYSCALLS.varargs = varargs; try {
                var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
                var offset = offset_low;
                FS.llseek(stream, offset, whence);
                HEAP32[result >> 2] = stream.position;
                if (stream.getdents && offset === 0 && whence === 0)
                    stream.getdents = null;
                return 0;
            }
            catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            } }
            function flush_NO_FILESYSTEM() { var fflush = Module["_fflush"]; if (fflush)
                fflush(0); var buffers = SYSCALLS.buffers; if (buffers[1].length)
                SYSCALLS.printChar(1, 10); if (buffers[2].length)
                SYSCALLS.printChar(2, 10); }
            function ___syscall146(which, varargs) { SYSCALLS.varargs = varargs; try {
                var stream = SYSCALLS.get(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = HEAP32[iov + i * 8 >> 2];
                    var len = HEAP32[iov + (i * 8 + 4) >> 2];
                    for (var j = 0; j < len; j++) {
                        SYSCALLS.printChar(stream, HEAPU8[ptr + j]);
                    }
                    ret += len;
                }
                return ret;
            }
            catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            } }
            function ___syscall54(which, varargs) { SYSCALLS.varargs = varargs; try {
                return 0;
            }
            catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            } }
            function ___syscall6(which, varargs) { SYSCALLS.varargs = varargs; try {
                var stream = SYSCALLS.getStreamFromFD();
                FS.close(stream);
                return 0;
            }
            catch (e) {
                if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                    abort(e);
                return -e.errno;
            } }
            function _emscripten_get_heap_size() { return HEAP8.length; }
            function abortOnCannotGrowMemory(requestedSize) { abort("OOM"); }
            function emscripten_realloc_buffer(size) { try {
                var newBuffer = new ArrayBuffer(size);
                if (newBuffer.byteLength != size)
                    return false;
                new Int8Array(newBuffer).set(HEAP8);
            }
            catch (e) {
                return false;
            } Module["_emscripten_replace_memory"](newBuffer); HEAP8 = new Int8Array(newBuffer); HEAP16 = new Int16Array(newBuffer); HEAP32 = new Int32Array(newBuffer); HEAPU8 = new Uint8Array(newBuffer); HEAPU16 = new Uint16Array(newBuffer); HEAPU32 = new Uint32Array(newBuffer); HEAPF32 = new Float32Array(newBuffer); HEAPF64 = new Float64Array(newBuffer); buffer = newBuffer; return newBuffer; }
            function _emscripten_resize_heap(requestedSize) { var oldSize = _emscripten_get_heap_size(); var PAGE_MULTIPLE = 16777216; var LIMIT = 2147483648 - PAGE_MULTIPLE; if (requestedSize > LIMIT) {
                return false;
            } var MIN_TOTAL_MEMORY = 16777216; var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY); while (newSize < requestedSize) {
                if (newSize <= 536870912) {
                    newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
                }
                else {
                    newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
                }
            } var replacement = emscripten_realloc_buffer(newSize); if (!replacement || replacement.byteLength != newSize) {
                return false;
            } updateGlobalBufferViews(); return true; }
            function _emscripten_memcpy_big(dest, src, num) { HEAPU8.set(HEAPU8.subarray(src, src + num), dest); }
            function ___setErrNo(value) { if (Module["___errno_location"])
                HEAP32[Module["___errno_location"]() >> 2] = value; return value; }
            var ASSERTIONS = false;
            function intArrayToString(array) { var ret = []; for (var i = 0; i < array.length; i++) {
                var chr = array[i];
                if (chr > 255) {
                    if (ASSERTIONS) {
                        assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
                    }
                    chr &= 255;
                }
                ret.push(String.fromCharCode(chr));
            } return ret.join(""); }
            var decodeBase64 = typeof atob === "function" ? atob : function (input) { var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; var output = ""; var chr1, chr2, chr3; var enc1, enc2, enc3, enc4; var i = 0; input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            } while (i < input.length); return output; };
            function intArrayFromBase64(s) { if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
                var buf;
                try {
                    buf = Buffer.from(s, "base64");
                }
                catch (_) {
                    buf = new Buffer(s, "base64");
                }
                return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
            } try {
                var decoded = decodeBase64(s);
                var bytes = new Uint8Array(decoded.length);
                for (var i = 0; i < decoded.length; ++i) {
                    bytes[i] = decoded.charCodeAt(i);
                }
                return bytes;
            }
            catch (_) {
                throw new Error("Converting base64 string to bytes failed.");
            } }
            function tryParseAsDataURI(filename) { if (!isDataURI(filename)) {
                return;
            } return intArrayFromBase64(filename.slice(dataURIPrefix.length)); }
            function jsCall_ii(index, a1) { return functionPointers[index](a1); }
            function jsCall_iiii(index, a1, a2, a3) { return functionPointers[index](a1, a2, a3); }
            function jsCall_vi(index, a1) { functionPointers[index](a1); }
            function jsCall_viii(index, a1, a2, a3) { functionPointers[index](a1, a2, a3); }
            function jsCall_viiii(index, a1, a2, a3, a4) { functionPointers[index](a1, a2, a3, a4); }
            var asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Float32Array": Float32Array, "Float64Array": Float64Array };
            var asmLibraryArg = { "a": abort, "b": setTempRet0, "c": getTempRet0, "d": jsCall_ii, "e": jsCall_iiii, "f": jsCall_vi, "g": jsCall_viii, "h": jsCall_viiii, "i": ___setErrNo, "j": ___syscall140, "k": ___syscall146, "l": ___syscall54, "m": ___syscall6, "n": _emscripten_get_heap_size, "o": _emscripten_memcpy_big, "p": _emscripten_resize_heap, "q": abortOnCannotGrowMemory, "r": emscripten_realloc_buffer, "s": flush_NO_FILESYSTEM, "t": tempDoublePtr, "u": DYNAMICTOP_PTR }; // EMSCRIPTEN_START_ASM
            var asm = ( /** @suppress {uselessCode} */function (global, env, buffer) {
                "almost asm";
                var a = new global.Int8Array(buffer), b = new global.Int16Array(buffer), c = new global.Int32Array(buffer), d = new global.Uint8Array(buffer), e = new global.Uint16Array(buffer), f = new global.Float32Array(buffer), g = new global.Float64Array(buffer), h = env.t | 0, i = env.u | 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0.0, r = global.Math.floor, s = global.Math.pow, t = global.Math.cos, u = global.Math.sin, v = global.Math.atan2, w = global.Math.imul, x = global.Math.clz32, y = env.a, z = env.b, A = env.c, B = env.d, C = env.e, D = env.f, E = env.g, F = env.h, G = env.i, H = env.j, I = env.k, J = env.l, K = env.m, L = env.n, M = env.o, N = env.p, O = env.q, P = env.r, Q = env.s, R = 4368, S = 5247248, T = 0.0;
                function U(newBuffer) { a = new Int8Array(newBuffer); d = new Uint8Array(newBuffer); b = new Int16Array(newBuffer); e = new Uint16Array(newBuffer); c = new Int32Array(newBuffer); f = new Float32Array(newBuffer); g = new Float64Array(newBuffer); buffer = newBuffer; return true; }
                // EMSCRIPTEN_START_FUNCS
                function _(a) { a = a | 0; var b = 0; b = R; R = R + a | 0; R = R + 15 & -16; return b | 0; }
                function $() { return R | 0; }
                function aa(a) { a = a | 0; R = a; }
                function ba(a, b) { a = a | 0; b = b | 0; R = a; S = b; }
                function ca(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, g = 0, h = 0; h = R; R = R + 272 | 0; e = h + 16 | 0; f = h; if (0 <= a >>> 0 ? (g = ia() | 0, g | 0) : 0) {
                    c[f >> 2] = d;
                    zb(e, 256, b, f) | 0;
                    X[g & 1](e);
                } R = h; return; }
                function da(a) { a = a | 0; var b = 0, d = 0, e = 0; d = R; R = R + 320 | 0; e = d + 4 | 0; b = d; gc(e | 0, 0, 308) | 0; ea(a + 704 | 0, e, b); R = d; return c[b >> 2] | 0; }
                function ea(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0; c[b >> 2] = 384; n = c[a >> 2] | 0; i = c[n >> 2] | 0; if ((i | 0) > 0) {
                    g = c[a + 296 >> 2] | 0;
                    h = c[a + 16 >> 2] | 0;
                    e = 0;
                    f = 0;
                    do {
                        e = (1 << c[g + (c[h + (f << 2) >> 2] << 2) >> 2]) + e | 0;
                        f = f + 1 | 0;
                    } while ((f | 0) != (i | 0));
                    e = e << 2;
                }
                else
                    e = 0; c[b + 4 >> 2] = i << 3; c[b + 8 >> 2] = c[n >> 2] << 2; c[b + 12 >> 2] = c[n >> 2] << 2; c[b + 16 >> 2] = c[n >> 2] << 2; c[b + 20 >> 2] = c[n >> 2] << 2; c[b + 24 >> 2] = c[n >> 2] << 2; c[b + 28 >> 2] = c[n >> 2] << 2; c[b + 32 >> 2] = e; c[b + 36 >> 2] = e; c[b + 40 >> 2] = e; m = n + 8 | 0; h = c[m >> 2] | 0; if ((h | 0) > 0) {
                    i = c[a + 88 >> 2] | 0;
                    j = c[a + 296 >> 2] | 0;
                    k = c[a + 76 >> 2] | 0;
                    f = 0;
                    g = 0;
                    l = 0;
                    e = 0;
                    do {
                        o = c[i + (f << 2) >> 2] | 0;
                        g = (g | 0) < (o | 0) ? o : g;
                        e = ((o << 3) + 15 & -16) + e | 0;
                        l = (1 << c[j + (c[k + (f << 2) >> 2] << 2) >> 2]) + l | 0;
                        f = f + 1 | 0;
                    } while ((f | 0) != (h | 0));
                    g = g << 3;
                    f = l << 2;
                }
                else {
                    g = 0;
                    f = 0;
                    e = 0;
                } i = n + 4 | 0; c[b + 44 >> 2] = c[i >> 2] << 5; c[b + 48 >> 2] = (c[m >> 2] | 0) * 24; j = n + 12 | 0; c[b + 52 >> 2] = c[j >> 2] << 5; c[b + 56 >> 2] = c[i >> 2] << 2; c[b + 60 >> 2] = c[m >> 2] << 2; c[b + 64 >> 2] = c[j >> 2] << 2; c[b + 68 >> 2] = c[i >> 2] << 2; c[b + 72 >> 2] = c[i >> 2] << 2; c[b + 76 >> 2] = e; c[b + 80 >> 2] = c[m >> 2] << 2; c[b + 84 >> 2] = c[m >> 2] << 2; c[b + 88 >> 2] = f; c[b + 92 >> 2] = f; c[b + 96 >> 2] = f; c[b + 100 >> 2] = f; c[b + 104 >> 2] = g; i = c[j >> 2] | 0; if ((i | 0) > 0) {
                    g = c[a + 296 >> 2] | 0;
                    h = c[a + 100 >> 2] | 0;
                    e = 0;
                    f = 0;
                    do {
                        f = (1 << c[g + (c[h + (e << 2) >> 2] << 2) >> 2]) + f | 0;
                        e = e + 1 | 0;
                    } while ((e | 0) != (i | 0));
                    e = f << 2;
                }
                else
                    e = 0; c[b + 108 >> 2] = i << 2; c[b + 112 >> 2] = c[j >> 2] << 2; c[b + 116 >> 2] = e; c[b + 120 >> 2] = e; c[b + 124 >> 2] = e; c[b + 128 >> 2] = e; c[b + 132 >> 2] = e; c[b + 136 >> 2] = e; c[b + 140 >> 2] = e; c[b + 144 >> 2] = e; c[b + 148 >> 2] = e; c[b + 152 >> 2] = e; c[b + 156 >> 2] = e; l = n + 16 | 0; m = c[l >> 2] | 0; if ((m | 0) > 0) {
                    h = c[a + 172 >> 2] | 0;
                    i = c[a + 296 >> 2] | 0;
                    j = c[a + 136 >> 2] | 0;
                    f = 0;
                    k = 0;
                    e = 0;
                    g = 0;
                    do {
                        o = c[h + (g << 2) >> 2] | 0;
                        f = (f | 0) < (o | 0) ? o : f;
                        e = ((o << 3) + 15 & -16) + e | 0;
                        k = (1 << c[i + (c[j + (g << 2) >> 2] << 2) >> 2]) + k | 0;
                        g = g + 1 | 0;
                    } while ((g | 0) != (m | 0));
                    g = f << 3;
                    f = k << 2;
                }
                else {
                    g = 0;
                    f = 0;
                    e = 0;
                } c[b + 160 >> 2] = m << 4; c[b + 164 >> 2] = c[l >> 2] << 2; c[b + 168 >> 2] = c[l >> 2]; c[b + 172 >> 2] = c[l >> 2] << 2; c[b + 176 >> 2] = c[l >> 2] << 2; c[b + 180 >> 2] = c[l >> 2] << 2; c[b + 184 >> 2] = e; c[b + 188 >> 2] = c[l >> 2] << 2; c[b + 192 >> 2] = c[l >> 2] << 2; c[b + 196 >> 2] = c[l >> 2] << 2; c[b + 200 >> 2] = c[l >> 2] << 2; c[b + 204 >> 2] = c[l >> 2] << 2; c[b + 208 >> 2] = c[l >> 2] << 2; c[b + 212 >> 2] = f; c[b + 216 >> 2] = f; c[b + 220 >> 2] = f; c[b + 224 >> 2] = f; c[b + 228 >> 2] = f; c[b + 232 >> 2] = f; c[b + 236 >> 2] = g; h = n + 20 | 0; c[b + 240 >> 2] = (c[h >> 2] | 0) * 40; c[b + 244 >> 2] = c[h >> 2] << 2; c[b + 248 >> 2] = (c[n + 52 >> 2] | 0) * 28; h = c[n + 48 >> 2] | 0; if ((h | 0) > 0) {
                    g = c[a + 296 >> 2] | 0;
                    e = 0;
                    f = 0;
                    do {
                        e = (1 << c[g + (f << 2) >> 2]) + e | 0;
                        f = f + 1 | 0;
                    } while ((f | 0) != (h | 0));
                    e = e << 2;
                }
                else
                    e = 0; c[b + 252 >> 2] = h * 36; c[b + 256 >> 2] = e; c[b + 260 >> 2] = e; g = n + 72 | 0; c[b + 264 >> 2] = (c[g >> 2] | 0) * 28; g = c[g >> 2] | 0; if ((g | 0) > 0) {
                    h = c[a + 328 >> 2] | 0;
                    i = c[a + 336 >> 2] | 0;
                    j = c[a + 340 >> 2] | 0;
                    e = 0;
                    k = 0;
                    f = 0;
                    do {
                        o = c[h + (f << 2) >> 2] | 0;
                        e = (e | 0) < (o | 0) ? o : e;
                        o = (c[i + (f << 2) >> 2] | 0) - (c[j + (f << 2) >> 2] | 0) | 0;
                        k = (k | 0) > (o | 0) ? k : o + 1 | 0;
                        f = f + 1 | 0;
                    } while ((f | 0) != (g | 0));
                    f = e << 2;
                    e = k << 2;
                }
                else {
                    f = 0;
                    e = 0;
                } c[b + 268 >> 2] = c[n + 76 >> 2] << 4; c[b + 272 >> 2] = e; c[b + 276 >> 2] = f; c[b + 280 >> 2] = e; i = n + 80 | 0; j = c[i >> 2] | 0; if ((j | 0) > 0) {
                    h = c[a + 296 >> 2] | 0;
                    g = c[a + 364 >> 2] | 0;
                    e = 0;
                    f = 0;
                    do {
                        e = (1 << c[h + (c[g + (f << 2) >> 2] << 2) >> 2]) + e | 0;
                        f = f + 1 | 0;
                    } while ((f | 0) != (j | 0));
                    e = e << 2;
                }
                else
                    e = 0; c[b + 284 >> 2] = j * 24; c[b + 288 >> 2] = c[i >> 2] << 2; c[b + 292 >> 2] = c[i >> 2] << 2; c[b + 296 >> 2] = e; c[b + 300 >> 2] = e; c[b + 304 >> 2] = e; c[b >> 2] = 0; e = 1; f = 384; do {
                    o = (c[b + (e << 2) >> 2] | 0) + 15 & -16;
                    c[b + (e << 2) >> 2] = f;
                    f = o + f | 0;
                    e = e + 1 | 0;
                } while ((e | 0) != 77); c[d >> 2] = f; return; }
                function fa(b, e, g) { b = b | 0; e = e | 0; g = g | 0; var h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0.0, N = 0, O = 0; K = R; R = R + 320 | 0; y = K; r = K + 8 | 0; h = K + 4 | 0; o = b + 704 | 0; gc(r | 0, 0, 308) | 0; ea(o, r, h); h = c[h >> 2] | 0; if (h >>> 0 > g >>> 0) {
                    b = 0;
                    R = K;
                    return b | 0;
                } gc(e | 0, 0, h | 0) | 0; J = e + (c[r >> 2] | 0) | 0; u = J + 8 | 0; c[u >> 2] = e + (c[r + 4 >> 2] | 0); c[J + 36 >> 2] = e + (c[r + 8 >> 2] | 0); c[J + 44 >> 2] = e + (c[r + 12 >> 2] | 0); c[J + 48 >> 2] = e + (c[r + 16 >> 2] | 0); v = J + 52 | 0; c[v >> 2] = e + (c[r + 20 >> 2] | 0); w = J + 12 | 0; c[w >> 2] = e + (c[r + 24 >> 2] | 0); c[J + 16 >> 2] = e + (c[r + 28 >> 2] | 0); c[J + 20 >> 2] = e + (c[r + 32 >> 2] | 0); c[J + 28 >> 2] = e + (c[r + 36 >> 2] | 0); c[J + 32 >> 2] = e + (c[r + 40 >> 2] | 0); j = c[o >> 2] | 0; x = J + 60 | 0; c[x >> 2] = e + (c[r + 44 >> 2] | 0); i = e + (c[r + 48 >> 2] | 0) | 0; z = J + 68 | 0; c[z >> 2] = i; B = J + 76 | 0; c[B >> 2] = e + (c[r + 52 >> 2] | 0); c[J + 168 >> 2] = e + (c[r + 56 >> 2] | 0); c[J + 172 >> 2] = e + (c[r + 60 >> 2] | 0); c[J + 176 >> 2] = e + (c[r + 64 >> 2] | 0); c[J + 192 >> 2] = e + (c[r + 68 >> 2] | 0); c[J + 196 >> 2] = e + (c[r + 72 >> 2] | 0); j = c[j + 8 >> 2] | 0; if ((j | 0) > 0) {
                    k = c[b + 792 >> 2] | 0;
                    g = e + (c[r + 76 >> 2] | 0) | 0;
                    h = 0;
                    while (1) {
                        c[i + (h * 24 | 0) + 20 >> 2] = g;
                        l = h + 1 | 0;
                        if ((l | 0) == (j | 0))
                            break;
                        else {
                            g = g + ((c[k + (h << 2) >> 2] << 3) + 15 & -16) | 0;
                            h = l;
                        }
                    }
                } A = J + 80 | 0; c[A >> 2] = e + (c[r + 80 >> 2] | 0); c[J + 84 >> 2] = e + (c[r + 84 >> 2] | 0); c[J + 88 >> 2] = e + (c[r + 88 >> 2] | 0); c[J + 96 >> 2] = e + (c[r + 92 >> 2] | 0); c[J + 100 >> 2] = e + (c[r + 96 >> 2] | 0); c[J + 104 >> 2] = e + (c[r + 100 >> 2] | 0); c[J + 108 >> 2] = e + (c[r + 104 >> 2] | 0); C = J + 112 | 0; c[C >> 2] = e + (c[r + 108 >> 2] | 0); c[J + 116 >> 2] = e + (c[r + 112 >> 2] | 0); c[J + 120 >> 2] = e + (c[r + 116 >> 2] | 0); c[J + 128 >> 2] = e + (c[r + 120 >> 2] | 0); c[J + 132 >> 2] = e + (c[r + 124 >> 2] | 0); c[J + 136 >> 2] = e + (c[r + 128 >> 2] | 0); c[J + 140 >> 2] = e + (c[r + 132 >> 2] | 0); c[J + 144 >> 2] = e + (c[r + 136 >> 2] | 0); c[J + 148 >> 2] = e + (c[r + 140 >> 2] | 0); c[J + 152 >> 2] = e + (c[r + 144 >> 2] | 0); c[J + 156 >> 2] = e + (c[r + 148 >> 2] | 0); c[J + 160 >> 2] = e + (c[r + 152 >> 2] | 0); c[J + 164 >> 2] = e + (c[r + 156 >> 2] | 0); k = c[o >> 2] | 0; F = J + 204 | 0; c[F >> 2] = e + (c[r + 160 >> 2] | 0); c[J + 248 >> 2] = e + (c[r + 164 >> 2] | 0); c[J + 260 >> 2] = e + (c[r + 168 >> 2] | 0); c[J + 264 >> 2] = e + (c[r + 172 >> 2] | 0); c[J + 268 >> 2] = e + (c[r + 176 >> 2] | 0); g = e + (c[r + 180 >> 2] | 0) | 0; j = J + 272 | 0; c[j >> 2] = g; k = c[k + 16 >> 2] | 0; if ((k | 0) > 0 ? (m = e + (c[r + 184 >> 2] | 0) | 0, n = b + 876 | 0, c[g >> 2] = m, (k | 0) != 1) : 0) {
                    h = m;
                    g = 0;
                    i = 1;
                    while (1) {
                        h = h + ((c[(c[n >> 2] | 0) + (g << 2) >> 2] << 3) + 15 & -16) | 0;
                        c[(c[j >> 2] | 0) + (i << 2) >> 2] = h;
                        g = i + 1 | 0;
                        if ((g | 0) >= (k | 0))
                            break;
                        else {
                            I = i;
                            i = g;
                            g = I;
                        }
                    }
                } c[J + 276 >> 2] = e + (c[r + 188 >> 2] | 0); c[J + 280 >> 2] = e + (c[r + 192 >> 2] | 0); c[J + 284 >> 2] = e + (c[r + 196 >> 2] | 0); c[J + 288 >> 2] = e + (c[r + 200 >> 2] | 0); E = J + 208 | 0; c[E >> 2] = e + (c[r + 204 >> 2] | 0); c[J + 212 >> 2] = e + (c[r + 208 >> 2] | 0); c[J + 216 >> 2] = e + (c[r + 212 >> 2] | 0); c[J + 224 >> 2] = e + (c[r + 216 >> 2] | 0); c[J + 228 >> 2] = e + (c[r + 220 >> 2] | 0); c[J + 232 >> 2] = e + (c[r + 224 >> 2] | 0); c[J + 236 >> 2] = e + (c[r + 228 >> 2] | 0); c[J + 240 >> 2] = e + (c[r + 232 >> 2] | 0); c[J + 244 >> 2] = e + (c[r + 236 >> 2] | 0); q = c[r + 244 >> 2] | 0; n = J + 296 | 0; c[n >> 2] = e + (c[r + 240 >> 2] | 0); p = J + 300 | 0; c[p >> 2] = e + q; q = J + 308 | 0; c[q >> 2] = e + (c[r + 248 >> 2] | 0); g = c[r + 256 >> 2] | 0; h = c[r + 260 >> 2] | 0; l = c[o >> 2] | 0; k = e + (c[r + 252 >> 2] | 0) | 0; I = J + 316 | 0; c[I >> 2] = k; l = c[l + 48 >> 2] | 0; if ((l | 0) > 0) {
                    m = c[b + 1e3 >> 2] | 0;
                    j = 0;
                    i = e + g | 0;
                    g = e + h | 0;
                    while (1) {
                        c[k + (j * 36 | 0) + 16 >> 2] = i;
                        c[k + (j * 36 | 0) + 20 >> 2] = g;
                        h = 1 << c[m + (j << 2) >> 2];
                        j = j + 1 | 0;
                        if ((j | 0) == (l | 0))
                            break;
                        else {
                            i = i + (h << 2) | 0;
                            g = g + (h << 2) | 0;
                        }
                    }
                } j = c[o >> 2] | 0; i = e + (c[r + 264 >> 2] | 0) | 0; D = J + 324 | 0; c[D >> 2] = i; j = c[j + 72 >> 2] | 0; if ((j | 0) > 0) {
                    k = c[b + 1032 >> 2] | 0;
                    g = e + (c[r + 268 >> 2] | 0) | 0;
                    h = 0;
                    while (1) {
                        c[i + (h * 28 | 0) + 12 >> 2] = g;
                        l = h + 1 | 0;
                        if ((l | 0) == (j | 0))
                            break;
                        else {
                            g = g + (c[k + (h << 2) >> 2] << 4) | 0;
                            h = l;
                        }
                    }
                } c[J + 328 >> 2] = e + (c[r + 272 >> 2] | 0); c[J + 332 >> 2] = e + (c[r + 276 >> 2] | 0); c[J + 336 >> 2] = e + (c[r + 280 >> 2] | 0); G = J + 344 | 0; c[G >> 2] = e + (c[r + 284 >> 2] | 0); H = J + 348 | 0; c[H >> 2] = e + (c[r + 288 >> 2] | 0); c[J + 352 >> 2] = e + (c[r + 292 >> 2] | 0); c[J + 356 >> 2] = e + (c[r + 296 >> 2] | 0); c[J + 364 >> 2] = e + (c[r + 300 >> 2] | 0); c[J + 368 >> 2] = e + (c[r + 304 >> 2] | 0); c[J + 376 >> 2] = 1; c[J + 380 >> 2] = a[(c[b + 708 >> 2] | 0) + 20 >> 0] & 1; t = b + 704 | 0; r = c[t >> 2] | 0; g = c[r + 20 >> 2] | 0; c[J + 292 >> 2] = g; if ((g | 0) > 0) {
                    i = c[n >> 2] | 0;
                    j = c[b + 912 >> 2] | 0;
                    k = c[b + 908 >> 2] | 0;
                    l = c[b + 920 >> 2] | 0;
                    e = c[b + 916 >> 2] | 0;
                    m = c[b + 924 >> 2] | 0;
                    n = c[b + 928 >> 2] | 0;
                    o = c[b + 932 >> 2] | 0;
                    h = g;
                    do {
                        L = h;
                        h = h + -1 | 0;
                        N = j + (h << 2) | 0;
                        c[i + (h * 40 | 0) >> 2] = c[N >> 2];
                        O = k + (h << 2) | 0;
                        c[i + (h * 40 | 0) + 4 >> 2] = c[O >> 2];
                        f[i + (h * 40 | 0) + 8 >> 2] = +f[O >> 2] - +f[N >> 2];
                        c[i + (h * 40 | 0) + 12 >> 2] = c[l + (h << 2) >> 2];
                        c[i + (h * 40 | 0) + 32 >> 2] = c[e + (h << 2) >> 2];
                        M = +s(.10000000149011612, +(+(c[m + (h << 2) >> 2] | 0)));
                        f[i + (h * 40 | 0) + 16 >> 2] = M;
                        f[i + (h * 40 | 0) + 20 >> 2] = M * 1.5;
                        c[i + (h * 40 | 0) + 24 >> 2] = c[n + (h << 2) >> 2];
                        c[i + (h * 40 | 0) + 28 >> 2] = c[o + (h << 2) >> 2];
                        c[i + (h * 40 | 0) + 36 >> 2] = 1;
                    } while ((L | 0) > 1);
                    h = c[p >> 2] | 0;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        c[h + (g << 2) >> 2] = c[e + (g << 2) >> 2];
                    } while ((O | 0) > 1);
                } g = c[r + 52 >> 2] | 0; c[J + 304 >> 2] = g; if ((g | 0) > 0) {
                    h = c[q >> 2] | 0;
                    i = c[b + 1008 >> 2] | 0;
                    j = c[b + 1012 >> 2] | 0;
                    k = c[b + 1004 >> 2] | 0;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        c[h + (g * 28 | 0) >> 2] = c[i + (g << 2) >> 2];
                        c[h + (g * 28 | 0) + 4 >> 2] = j + (c[k + (g << 2) >> 2] << 2);
                        f[h + (g * 28 | 0) + 12 >> 2] = 0.0;
                        c[h + (g * 28 | 0) + 20 >> 2] = 1;
                        c[h + (g * 28 | 0) + 24 >> 2] = 1;
                    } while ((O | 0) > 1);
                } g = c[r + 48 >> 2] | 0; c[J + 312 >> 2] = g; if ((g | 0) > 0) {
                    h = c[I >> 2] | 0;
                    i = c[b + 1e3 >> 2] | 0;
                    j = c[b + 992 >> 2] | 0;
                    k = c[b + 996 >> 2] | 0;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        N = c[i + (g << 2) >> 2] | 0;
                        c[h + (g * 36 | 0) >> 2] = N;
                        c[h + (g * 36 | 0) + 4 >> 2] = 1 << N;
                        c[h + (g * 36 | 0) + 12 >> 2] = j + (c[k + (g << 2) >> 2] << 2);
                        c[h + (g * 36 | 0) + 24 >> 2] = 1;
                        c[h + (g * 36 | 0) + 28 >> 2] = 1;
                    } while ((O | 0) > 1);
                } h = c[r >> 2] | 0; c[J + 4 >> 2] = h; n = c[b + 720 >> 2] | 0; c[J + 40 >> 2] = n; if ((h | 0) > 0) {
                    j = c[u >> 2] | 0;
                    k = c[b + 740 >> 2] | 0;
                    l = c[b + 736 >> 2] | 0;
                    m = c[b + 732 >> 2] | 0;
                    i = c[v >> 2] | 0;
                    g = h;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        c[j + (g << 3) >> 2] = c[k + (g << 2) >> 2];
                        c[j + (g << 3) + 4 >> 2] = c[l + (g << 2) >> 2];
                        f[i + (g << 2) >> 2] = c[m + (g << 2) >> 2] | 0 ? 1.0 : 0.0;
                    } while ((O | 0) > 1);
                    j = c[I >> 2] | 0;
                    i = c[w >> 2] | 0;
                    g = 0;
                    do {
                        O = h;
                        h = h + -1 | 0;
                        N = c[j + ((c[n + (h << 2) >> 2] | 0) * 36 | 0) + 4 >> 2] | 0;
                        c[i + (h << 2) >> 2] = N;
                        g = N + g | 0;
                    } while ((O | 0) > 1);
                }
                else
                    g = 0; c[J + 24 >> 2] = g; g = c[r + 4 >> 2] | 0; c[J + 56 >> 2] = g; c[J + 180 >> 2] = c[b + 752 >> 2]; e = J + 184 | 0; c[e >> 2] = c[b + 780 >> 2]; p = J + 188 | 0; c[p >> 2] = c[b + 804 >> 2]; if ((g | 0) > 0) {
                    k = b + 764 | 0;
                    l = b + 768 | 0;
                    m = b + 772 | 0;
                    n = b + 776 | 0;
                    o = b + 760 | 0;
                    do {
                        h = g;
                        g = g + -1 | 0;
                        i = c[x >> 2] | 0;
                        c[i + (g << 5) >> 2] = c[(c[k >> 2] | 0) + (g << 2) >> 2];
                        c[i + (g << 5) + 4 >> 2] = c[(c[l >> 2] | 0) + (g << 2) >> 2];
                        O = c[(c[m >> 2] | 0) + (g << 2) >> 2] | 0;
                        c[i + (g << 5) + 8 >> 2] = O;
                        j = c[(c[n >> 2] | 0) + (g << 2) >> 2] | 0;
                        c[i + (g << 5) + 12 >> 2] = j;
                        c[i + (g << 5) + 28 >> 2] = c[(c[o >> 2] | 0) + (g << 2) >> 2];
                        switch (O | 0) {
                            case 0: {
                                c[i + (g << 5) + 16 >> 2] = 2;
                                c[i + (g << 5) + 20 >> 2] = 2;
                                c[i + (g << 5) + 24 >> 2] = (c[z >> 2] | 0) + (j * 24 | 0);
                                break;
                            }
                            case 1: {
                                c[i + (g << 5) + 16 >> 2] = 3;
                                c[i + (g << 5) + 20 >> 2] = 3;
                                c[i + (g << 5) + 24 >> 2] = (c[B >> 2] | 0) + (j << 5);
                                break;
                            }
                            default: ca(4, 992, y);
                        }
                    } while ((h | 0) > 1);
                    y = c[t >> 2] | 0;
                }
                else
                    y = r; n = c[y + 8 >> 2] | 0; c[J + 64 >> 2] = n; g = n + -1 | 0; m = (n | 0) > 0; if (m) {
                    i = c[z >> 2] | 0;
                    j = c[b + 796 >> 2] | 0;
                    k = c[b + 800 >> 2] | 0;
                    l = c[b + 792 >> 2] | 0;
                    if ((d[b + 4 >> 0] | 0) > 1) {
                        h = c[b + 1108 >> 2] | 0;
                        while (1) {
                            c[i + (g * 24 | 0) >> 2] = c[j + (g << 2) >> 2];
                            c[i + (g * 24 | 0) + 4 >> 2] = c[k + (g << 2) >> 2];
                            c[i + (g * 24 | 0) + 12 >> 2] = c[l + (g << 2) >> 2];
                            c[i + (g * 24 | 0) + 8 >> 2] = c[h + (g << 2) >> 2];
                            if ((g | 0) > 0)
                                g = g + -1 | 0;
                            else
                                break;
                        }
                    }
                    else
                        while (1) {
                            c[i + (g * 24 | 0) >> 2] = c[j + (g << 2) >> 2];
                            c[i + (g * 24 | 0) + 4 >> 2] = c[k + (g << 2) >> 2];
                            c[i + (g * 24 | 0) + 12 >> 2] = c[l + (g << 2) >> 2];
                            c[i + (g * 24 | 0) + 8 >> 2] = 0;
                            if ((g | 0) > 0)
                                g = g + -1 | 0;
                            else
                                break;
                        }
                } h = c[y + 12 >> 2] | 0; l = J + 72 | 0; c[l >> 2] = h; if ((h | 0) > 0) {
                    i = c[B >> 2] | 0;
                    j = c[b + 816 >> 2] | 0;
                    g = h;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        c[i + (g << 5) >> 2] = c[j + (g << 2) >> 2];
                    } while ((O | 0) > 1);
                } if (m) {
                    k = c[I >> 2] | 0;
                    j = c[e >> 2] | 0;
                    i = c[A >> 2] | 0;
                    g = 0;
                    h = n;
                    do {
                        O = h;
                        h = h + -1 | 0;
                        N = c[k + ((c[j + (h << 2) >> 2] | 0) * 36 | 0) + 4 >> 2] | 0;
                        c[i + (h << 2) >> 2] = N;
                        g = N + g | 0;
                    } while ((O | 0) > 1);
                    h = c[l >> 2] | 0;
                }
                else
                    g = 0; c[J + 92 >> 2] = g; if ((h | 0) > 0) {
                    k = c[I >> 2] | 0;
                    j = c[p >> 2] | 0;
                    i = c[C >> 2] | 0;
                    g = 0;
                    do {
                        O = h;
                        h = h + -1 | 0;
                        N = c[k + ((c[j + (h << 2) >> 2] | 0) * 36 | 0) + 4 >> 2] | 0;
                        c[i + (h << 2) >> 2] = N;
                        g = N + g | 0;
                    } while ((O | 0) > 1);
                }
                else
                    g = 0; c[J + 124 >> 2] = g; h = c[y + 16 >> 2] | 0; c[J + 200 >> 2] = h; n = c[b + 840 >> 2] | 0; c[J + 252 >> 2] = n; if ((h | 0) > 0) {
                    i = c[F >> 2] | 0;
                    j = c[b + 860 >> 2] | 0;
                    k = c[b + 864 >> 2] | 0;
                    l = c[b + 876 >> 2] | 0;
                    m = c[b + 856 >> 2] | 0;
                    g = h;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        c[i + (g << 4) >> 2] = c[j + (g << 2) >> 2];
                        c[i + (g << 4) + 4 >> 2] = c[k + (g << 2) >> 2];
                        c[i + (g << 4) + 12 >> 2] = c[l + (g << 2) >> 2];
                        c[i + (g << 4) + 8 >> 2] = c[m + (g << 2) >> 2];
                    } while ((O | 0) > 1);
                    j = c[I >> 2] | 0;
                    i = c[E >> 2] | 0;
                    g = 0;
                    do {
                        O = h;
                        h = h + -1 | 0;
                        N = c[j + ((c[n + (h << 2) >> 2] | 0) * 36 | 0) + 4 >> 2] | 0;
                        c[i + (h << 2) >> 2] = N;
                        g = N + g | 0;
                    } while ((O | 0) > 1);
                }
                else
                    g = 0; c[J + 220 >> 2] = g; x = c[y + 72 >> 2] | 0; c[J + 320 >> 2] = x; if ((x | 0) > 0) {
                    i = c[D >> 2] | 0;
                    j = c[b + 1032 >> 2] | 0;
                    k = c[b + 1036 >> 2] | 0;
                    l = c[b + 1040 >> 2] | 0;
                    m = c[b + 1044 >> 2] | 0;
                    n = c[b + 1028 >> 2] | 0;
                    o = b + 1052 | 0;
                    e = b + 1048 | 0;
                    p = b + 1056 | 0;
                    g = 0;
                    do {
                        q = c[j + (g << 2) >> 2] | 0;
                        c[i + (g * 28 | 0) + 4 >> 2] = q;
                        c[i + (g * 28 | 0) >> 2] = c[k + (g << 2) >> 2];
                        O = c[l + (g << 2) >> 2] | 0;
                        c[i + (g * 28 | 0) + 16 >> 2] = O;
                        r = c[m + (g << 2) >> 2] | 0;
                        c[i + (g * 28 | 0) + 20 >> 2] = r;
                        c[i + (g * 28 | 0) + 24 >> 2] = O + 1 - r;
                        c[i + (g * 28 | 0) + 8 >> 2] = 0;
                        r = c[n + (g << 2) >> 2] | 0;
                        if ((q | 0) > 0) {
                            t = c[i + (g * 28 | 0) + 12 >> 2] | 0;
                            u = c[o >> 2] | 0;
                            v = c[e >> 2] | 0;
                            w = c[p >> 2] | 0;
                            h = 0;
                            do {
                                O = h + r | 0;
                                c[t + (h << 4) + 4 >> 2] = c[u + (O << 2) >> 2];
                                c[t + (h << 4) >> 2] = c[v + (O << 2) >> 2];
                                c[t + (h << 4) + 8 >> 2] = c[w + (O << 2) >> 2];
                                c[t + (h << 4) + 12 >> 2] = 0;
                                h = h + 1 | 0;
                            } while ((h | 0) != (q | 0));
                        }
                        g = g + 1 | 0;
                    } while ((g | 0) != (x | 0));
                } g = c[y + 80 >> 2] | 0; o = J + 340 | 0; c[o >> 2] = g; e = c[b + 1068 >> 2] | 0; c[J + 372 >> 2] = e; if ((g | 0) > 0) {
                    h = c[G >> 2] | 0;
                    i = c[b + 1080 >> 2] | 0;
                    j = c[b + 1084 >> 2] | 0;
                    k = c[b + 1092 >> 2] | 0;
                    l = c[b + 1096 >> 2] | 0;
                    m = c[b + 1088 >> 2] | 0;
                    n = c[b + 1100 >> 2] | 0;
                    do {
                        O = g;
                        g = g + -1 | 0;
                        c[h + (g * 24 | 0) >> 2] = c[i + (g << 2) >> 2];
                        c[h + (g * 24 | 0) + 4 >> 2] = c[j + (g << 2) >> 2];
                        c[h + (g * 24 | 0) + 8 >> 2] = c[k + (g << 2) >> 2];
                        N = c[m + (g << 2) >> 2] | 0;
                        c[h + (g * 24 | 0) + 12 >> 2] = l + (N << 2);
                        c[h + (g * 24 | 0) + 16 >> 2] = n + (N << 1);
                    } while ((O | 0) > 1);
                    h = c[o >> 2] | 0;
                    if ((h | 0) > 0) {
                        j = c[I >> 2] | 0;
                        i = c[H >> 2] | 0;
                        g = 0;
                        do {
                            O = h;
                            h = h + -1 | 0;
                            N = c[j + ((c[e + (h << 2) >> 2] | 0) * 36 | 0) + 4 >> 2] | 0;
                            c[i + (h << 2) >> 2] = N;
                            g = N + g | 0;
                        } while ((O | 0) > 1);
                    }
                    else
                        g = 0;
                }
                else
                    g = 0; c[J + 360 >> 2] = g; c[J >> 2] = b; eb(J); O = J; R = K; return O | 0; }
                function ga(d, e) { d = d | 0; e = e | 0; var g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0; t = R; R = R + 32 | 0; g = t + 24 | 0; h = t; c[h >> 2] = 3; c[h + 4 >> 2] = 3; c[h + 8 >> 2] = 1; fb(1048, h); h = Qa() | 0; if (xb(d, 1088, 4) | 0) {
                    ca(4, 1093, t + 16 | 0);
                    s = 0;
                    R = t;
                    return s | 0;
                } k = d + 4 | 0; e = a[k >> 0] | 0; if ((e & 255) > 2) {
                    c[g >> 2] = 2;
                    c[g + 4 >> 2] = e & 255;
                    ca(4, 1156, g);
                    s = 0;
                    R = t;
                    return s | 0;
                } e = d + 5 | 0; j = ((a[e >> 0] | 0) == 0 | 0) != (h | 0); if (j) {
                    s = d + 64 | 0;
                    Ra(k, 1);
                    Sa(s, 4, 160);
                    a[e >> 0] = (h | 0) == 0 & 1;
                    e = s;
                }
                else
                    e = d + 64 | 0; i = d + 704 | 0; h = i; g = 102; while (1) {
                    g = g + -1 | 0;
                    c[h >> 2] = d + (c[e >> 2] | 0);
                    if (!g)
                        break;
                    else {
                        h = h + 4 | 0;
                        e = e + 4 | 0;
                    }
                } if (j ? (s = a[k >> 0] | 0, Sa(c[i >> 2] | 0, 4, 32), r = d + 708 | 0, Ra(c[r >> 2] | 0, 4), Ra((c[r >> 2] | 0) + 4 | 0, 4), Ra((c[r >> 2] | 0) + 8 | 0, 4), Ra((c[r >> 2] | 0) + 12 | 0, 4), Ra((c[r >> 2] | 0) + 16 | 0, 4), Ra((c[r >> 2] | 0) + 20 | 0, 1), Sa(c[d + 720 >> 2] | 0, 4, c[c[i >> 2] >> 2] | 0), Sa(c[d + 724 >> 2] | 0, 4, c[c[i >> 2] >> 2] | 0), Sa(c[d + 728 >> 2] | 0, 4, c[c[i >> 2] >> 2] | 0), Sa(c[d + 732 >> 2] | 0, 4, c[c[i >> 2] >> 2] | 0), Sa(c[d + 736 >> 2] | 0, 4, c[c[i >> 2] >> 2] | 0), Sa(c[d + 740 >> 2] | 0, 4, c[c[i >> 2] >> 2] | 0), Sa(c[d + 752 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 756 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 760 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 764 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 768 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 772 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 776 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 4 >> 2] | 0), Sa(c[d + 780 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0), Sa(c[d + 784 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0), Sa(c[d + 788 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0), Sa(c[d + 792 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0), Sa(c[d + 796 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0), Sa(c[d + 800 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0), Sa(c[d + 804 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 12 >> 2] | 0), Sa(c[d + 808 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 12 >> 2] | 0), Sa(c[d + 812 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 12 >> 2] | 0), Sa(c[d + 816 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 12 >> 2] | 0), Sa(c[d + 840 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 844 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 848 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 852 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 856 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 860 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 864 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 868 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 872 >> 2] | 0, 1, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 876 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 880 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 884 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 888 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 892 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 896 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 16 >> 2] | 0), Sa(c[d + 908 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 912 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 916 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 920 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 924 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 928 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 932 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 20 >> 2] | 0), Sa(c[d + 936 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 24 >> 2] | 0), Sa(c[d + 940 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 28 >> 2] | 0), Sa(c[d + 944 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 28 >> 2] | 0), Sa(c[d + 948 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 952 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 956 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 960 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 964 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 968 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 972 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 32 >> 2] | 0), Sa(c[d + 976 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 36 >> 2] | 0), Sa(c[d + 980 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 36 >> 2] | 0), Sa(c[d + 984 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 36 >> 2] | 0), Sa(c[d + 988 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 40 >> 2] | 0), Sa(c[d + 992 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 44 >> 2] | 0), Sa(c[d + 996 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 48 >> 2] | 0), Sa(c[d + 1e3 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 48 >> 2] | 0), Sa(c[d + 1004 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 52 >> 2] | 0), Sa(c[d + 1008 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 52 >> 2] | 0), Sa(c[d + 1012 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 56 >> 2] | 0), Sa(c[d + 1016 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 60 >> 2] | 0), Sa(c[d + 1020 >> 2] | 0, 2, c[(c[i >> 2] | 0) + 64 >> 2] | 0), Sa(c[d + 1024 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 68 >> 2] | 0), Sa(c[d + 1028 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 72 >> 2] | 0), Sa(c[d + 1032 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 72 >> 2] | 0), Sa(c[d + 1036 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 72 >> 2] | 0), Sa(c[d + 1040 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 72 >> 2] | 0), Sa(c[d + 1044 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 72 >> 2] | 0), Sa(c[d + 1048 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 76 >> 2] | 0), Sa(c[d + 1052 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 76 >> 2] | 0), Sa(c[d + 1056 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 76 >> 2] | 0), Sa(c[d + 1068 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1072 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1076 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1080 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1084 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1088 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1092 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 80 >> 2] | 0), Sa(c[d + 1096 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 84 >> 2] | 0), Sa(c[d + 1100 >> 2] | 0, 2, c[(c[i >> 2] | 0) + 84 >> 2] | 0), Sa(c[d + 1104 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 88 >> 2] | 0), (s & 255) > 1) : 0) {
                    Sa(c[d + 1108 >> 2] | 0, 4, c[(c[i >> 2] | 0) + 8 >> 2] | 0);
                    s = i;
                }
                else
                    s = i; Ta(); e = c[s >> 2] | 0; if ((c[e >> 2] | 0) > 0) {
                    h = d + 716 | 0;
                    i = d + 712 | 0;
                    g = 0;
                    do {
                        c[(c[i >> 2] | 0) + (g << 2) >> 2] = (c[h >> 2] | 0) + (g << 6);
                        g = g + 1 | 0;
                        e = c[s >> 2] | 0;
                    } while ((g | 0) < (c[e >> 2] | 0));
                } if ((c[e + 4 >> 2] | 0) > 0) {
                    h = d + 748 | 0;
                    i = d + 744 | 0;
                    g = 0;
                    do {
                        c[(c[i >> 2] | 0) + (g << 2) >> 2] = (c[h >> 2] | 0) + (g << 6);
                        g = g + 1 | 0;
                        e = c[s >> 2] | 0;
                    } while ((g | 0) < (c[e + 4 >> 2] | 0));
                } if ((c[e + 16 >> 2] | 0) > 0) {
                    h = d + 836 | 0;
                    i = d + 820 | 0;
                    j = d + 1016 | 0;
                    k = d + 880 | 0;
                    l = d + 824 | 0;
                    m = d + 1020 | 0;
                    n = d + 884 | 0;
                    o = d + 828 | 0;
                    p = d + 1024 | 0;
                    q = d + 892 | 0;
                    r = d + 832 | 0;
                    g = 0;
                    do {
                        c[(c[i >> 2] | 0) + (g << 2) >> 2] = (c[h >> 2] | 0) + (g << 6);
                        c[(c[l >> 2] | 0) + (g << 2) >> 2] = (c[j >> 2] | 0) + (c[(c[k >> 2] | 0) + (g << 2) >> 2] << 2);
                        c[(c[o >> 2] | 0) + (g << 2) >> 2] = (c[m >> 2] | 0) + (c[(c[n >> 2] | 0) + (g << 2) >> 2] << 1);
                        c[(c[r >> 2] | 0) + (g << 2) >> 2] = (c[p >> 2] | 0) + (c[(c[q >> 2] | 0) + (g << 2) >> 2] << 2);
                        g = g + 1 | 0;
                        e = c[s >> 2] | 0;
                    } while ((g | 0) < (c[e + 16 >> 2] | 0));
                } if ((c[e + 20 >> 2] | 0) > 0) {
                    h = d + 904 | 0;
                    i = d + 900 | 0;
                    g = 0;
                    do {
                        c[(c[i >> 2] | 0) + (g << 2) >> 2] = (c[h >> 2] | 0) + (g << 6);
                        g = g + 1 | 0;
                        e = c[s >> 2] | 0;
                    } while ((g | 0) < (c[e + 20 >> 2] | 0));
                } if ((c[e + 80 >> 2] | 0) > 0) {
                    h = d + 1064 | 0;
                    i = d + 1060 | 0;
                    g = 0;
                    do {
                        c[(c[i >> 2] | 0) + (g << 2) >> 2] = (c[h >> 2] | 0) + (g << 6);
                        g = g + 1 | 0;
                        e = c[s >> 2] | 0;
                    } while ((g | 0) < (c[e + 80 >> 2] | 0));
                } if (a[(c[d + 708 >> 2] | 0) + 20 >> 0] & 1) {
                    s = d;
                    R = t;
                    return s | 0;
                } m = c[e + 16 >> 2] | 0; if ((m | 0) <= 0) {
                    s = d;
                    R = t;
                    return s | 0;
                } h = c[d + 1020 >> 2] | 0; i = c[d + 884 >> 2] | 0; j = c[d + 888 >> 2] | 0; g = 0; do {
                    k = h + (c[i + (g << 2) >> 2] << 1) | 0;
                    s = c[j + (g << 2) >> 2] | 0;
                    l = s + -1 | 0;
                    if ((s | 0) > 1) {
                        e = 0;
                        do {
                            q = k + (e << 1) | 0;
                            r = b[q >> 1] | 0;
                            s = k + (e + 2 << 1) | 0;
                            b[q >> 1] = b[s >> 1] | 0;
                            b[s >> 1] = r;
                            e = e + 3 | 0;
                        } while ((e | 0) < (l | 0));
                    }
                    g = g + 1 | 0;
                } while ((g | 0) != (m | 0)); h = c[d + 1016 >> 2] | 0; i = c[d + 880 >> 2] | 0; j = c[d + 876 >> 2] | 0; g = 0; do {
                    e = h + (c[i + (g << 2) >> 2] << 2) | 0;
                    s = c[j + (g << 2) >> 2] << 1;
                    k = e + (s << 2) | 0;
                    if ((s | 0) > 1) {
                        e = e + 4 | 0;
                        do {
                            f[e >> 2] = 1.0 - +f[e >> 2];
                            e = e + 8 | 0;
                        } while (e >>> 0 < k >>> 0);
                    }
                    g = g + 1 | 0;
                } while ((g | 0) != (m | 0)); R = t; return d | 0; }
                function ha() { return 50528257; }
                function ia() { return c[880] | 0; }
                function ja(a) { a = a | 0; c[880] = a; return; }
                function ka(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0, g = 0; g = R; R = R + 32 | 0; f = g + 16 | 0; e = g + 8 | 0; d = g; if (!a) {
                    c[d >> 2] = 1301;
                    c[d + 4 >> 2] = 1282;
                    ca(4, 1265, d);
                    f = 0;
                    R = g;
                    return f | 0;
                } d = a; if ((d + 63 & -64 | 0) != (d | 0)) {
                    c[e >> 2] = 1301;
                    c[e + 4 >> 2] = 1321;
                    ca(4, 1265, e);
                    f = 0;
                    R = g;
                    return f | 0;
                } if (b | 0 ? (b + 63 & -64 | 0) == (b | 0) : 0) {
                    f = ga(a, b) | 0;
                    R = g;
                    return f | 0;
                } c[f >> 2] = 1301; c[f + 4 >> 2] = 1353; ca(4, 1265, f); f = 0; R = g; return f | 0; }
                function la(a, b, d, e) { a = a | 0; b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, i = 0, j = 0; j = R; R = R + 32 | 0; g = j + 24 | 0; i = j + 16 | 0; h = j + 8 | 0; f = j; if (!a) {
                    c[f >> 2] = 1372;
                    c[f + 4 >> 2] = 1390;
                    ca(4, 1265, f);
                    R = j;
                    return;
                } if (!b) {
                    c[h >> 2] = 1372;
                    c[h + 4 >> 2] = 1410;
                    ca(4, 1265, h);
                    R = j;
                    return;
                } if (!d) {
                    c[i >> 2] = 1372;
                    c[i + 4 >> 2] = 1437;
                    ca(4, 1265, i);
                    R = j;
                    return;
                } if (!e) {
                    c[g >> 2] = 1372;
                    c[g + 4 >> 2] = 1466;
                    ca(4, 1265, g);
                    R = j;
                    return;
                }
                else {
                    i = c[(c[a >> 2] | 0) + 708 >> 2] | 0;
                    c[b >> 2] = c[i + 12 >> 2];
                    c[b + 4 >> 2] = c[i + 16 >> 2];
                    c[d >> 2] = c[i + 4 >> 2];
                    c[d + 4 >> 2] = c[i + 8 >> 2];
                    c[e >> 2] = c[i >> 2];
                    R = j;
                    return;
                } }
                function ma(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1494;
                    c[b + 4 >> 2] = 1512;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = da(a) | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function na(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, g = 0, h = 0, i = 0; i = R; R = R + 32 | 0; h = i + 24 | 0; g = i + 16 | 0; f = i + 8 | 0; e = i; if (!a) {
                    c[e >> 2] = 1530;
                    c[e + 4 >> 2] = 1512;
                    ca(4, 1265, e);
                    h = 0;
                    R = i;
                    return h | 0;
                } if (!b) {
                    c[f >> 2] = 1530;
                    c[f + 4 >> 2] = 1282;
                    ca(4, 1265, f);
                    h = 0;
                    R = i;
                    return h | 0;
                } f = b; if ((f + 15 & -16 | 0) != (f | 0)) {
                    c[g >> 2] = 1530;
                    c[g + 4 >> 2] = 1321;
                    ca(4, 1265, g);
                    h = 0;
                    R = i;
                    return h | 0;
                } a = fa(a, b, d) | 0; if (!a) {
                    c[h >> 2] = 1530;
                    c[h + 4 >> 2] = 1556;
                    ca(4, 1265, h);
                    h = 0;
                    R = i;
                    return h | 0;
                }
                else {
                    h = a;
                    R = i;
                    return h | 0;
                } return 0; }
                function oa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1574;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    R = d;
                    return;
                }
                else {
                    eb(a);
                    R = d;
                    return;
                } }
                function pa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1589;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = -1;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 292 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function qa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1610;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 900 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function ra(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1629;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 912 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function sa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1658;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 908 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function ta(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1687;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 916 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function ua(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1716;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 300 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function va(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1738;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = -1;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 4 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function wa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1754;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 712 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function xa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1768;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 52 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function ya(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1788;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 740 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function za(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1816;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = -1;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 200 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Aa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1836;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 820 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ba(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1854;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 872 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ca(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1882;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 260 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Da(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1909;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 868 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ea(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1938;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 268 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Fa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1963;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 264 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ga(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 1990;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 276 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ha(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2014;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 896 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ia(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2039;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 832 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ja(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2059;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 876 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ka(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2086;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[a + 272 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function La(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2116;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 824 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Ma(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2140;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 888 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Na(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2166;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    b = 0;
                    R = d;
                    return b | 0;
                }
                else {
                    b = c[(c[a >> 2] | 0) + 828 >> 2] | 0;
                    R = d;
                    return b | 0;
                } return 0; }
                function Oa(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; if (!a) {
                    c[b >> 2] = 2188;
                    c[b + 4 >> 2] = 1390;
                    ca(4, 1265, b);
                    R = d;
                    return;
                }
                else {
                    c[a + 256 >> 2] = 1;
                    R = d;
                    return;
                } }
                function Pa(a, b) { a = a | 0; b = b | 0; var c = 0.0; c = +v(+(+f[a + 4 >> 2]), +(+f[a >> 2])); c = c - +v(+(+f[b + 4 >> 2]), +(+f[b >> 2])); if (c < -3.1415927410125732)
                    do
                        c = c + 6.2831854820251465;
                    while (c < -3.1415927410125732); if (!(c > 3.1415927410125732))
                    return +c; do
                    c = c + -6.2831854820251465;
                while (c > 3.1415927410125732); return +c; }
                function Qa() { return 1; }
                function Ra(b, c) { b = b | 0; c = c | 0; var d = 0; c = b + c + -1 | 0; if (c >>> 0 <= b >>> 0)
                    return; do {
                    d = a[b >> 0] | 0;
                    a[b >> 0] = a[c >> 0] | 0;
                    b = b + 1 | 0;
                    a[c >> 0] = d;
                    c = c + -1 | 0;
                } while (c >>> 0 > b >>> 0); return; }
                function Sa(b, c, d) { b = b | 0; c = c | 0; d = d | 0; var e = 0, f = 0, g = 0; if (!d)
                    return; do {
                    d = d + -1 | 0;
                    e = b;
                    b = b + c | 0;
                    f = b + -1 | 0;
                    if (f >>> 0 > e >>> 0)
                        do {
                            g = a[e >> 0] | 0;
                            a[e >> 0] = a[f >> 0] | 0;
                            e = e + 1 | 0;
                            a[f >> 0] = g;
                            f = f + -1 | 0;
                        } while (f >>> 0 > e >>> 0);
                } while ((d | 0) != 0); return; }
                function Ta() { return; }
                function Ua(a) { a = a | 0; var b = 0, d = 0, e = 0, g = 0, h = 0, i = 0.0, j = 0, k = 0, l = 0, m = 0, n = 0; n = c[a + 4 >> 2] | 0; j = c[a + 36 >> 2] | 0; g = c[a + 24 >> 2] | 0; if ((g | 0) > 0) {
                    h = c[a + 28 >> 2] | 0;
                    d = c[a + 20 >> 2] | 0;
                    e = c[a + 32 >> 2] | 0;
                    b = 0;
                    do {
                        f[e + (b << 2) >> 2] = +f[h + (b << 2) >> 2] * +f[d + (b << 2) >> 2];
                        b = b + 1 | 0;
                    } while ((b | 0) != (g | 0));
                } if ((n | 0) <= 0)
                    return; k = c[a + 12 >> 2] | 0; l = a + 16 | 0; m = a + 44 | 0; a = a + 32 | 0; h = 0; g = 0; while (1) {
                    if (c[j >> 2] | 0) {
                        e = c[(c[l >> 2] | 0) + (h << 2) >> 2] | 0;
                        d = e + g | 0;
                        if ((e | 0) > 0) {
                            e = c[a >> 2] | 0;
                            i = 0.0;
                            b = g;
                            do {
                                i = i + +f[e + (b << 2) >> 2];
                                b = b + 1 | 0;
                            } while ((b | 0) < (d | 0));
                        }
                        else
                            i = 0.0;
                        c[(c[m >> 2] | 0) + (h << 2) >> 2] = ~~(i + 1.0000000474974513e-03);
                    }
                    g = (c[k + (h << 2) >> 2] | 0) + g | 0;
                    h = h + 1 | 0;
                    if ((h | 0) == (n | 0))
                        break;
                    else
                        j = j + 4 | 0;
                } return; }
                function Va(a) { a = a | 0; var b = 0, d = 0, e = 0, g = 0, h = 0, i = 0.0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0; w = c[a + 68 >> 2] | 0; x = c[a + 64 >> 2] | 0; j = c[a + 172 >> 2] | 0; h = c[a + 92 >> 2] | 0; if ((h | 0) > 0) {
                    d = c[a + 96 >> 2] | 0;
                    e = c[a + 88 >> 2] | 0;
                    g = c[a + 104 >> 2] | 0;
                    b = 0;
                    do {
                        f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                        b = b + 1 | 0;
                    } while ((b | 0) != (h | 0));
                } if ((x | 0) <= 0)
                    return; r = c[a + 80 >> 2] | 0; s = a + 84 | 0; t = a + 104 | 0; u = a + 108 | 0; v = a + 100 | 0; q = a + 88 | 0; p = 0; n = 0; while (1) {
                    if (c[j >> 2] | 0) {
                        e = c[(c[s >> 2] | 0) + (p << 2) >> 2] | 0;
                        o = e + n | 0;
                        e = (e | 0) > 0;
                        if (e) {
                            d = c[t >> 2] | 0;
                            b = n;
                            i = 0.0;
                            do {
                                i = i + +f[d + (b << 2) >> 2];
                                b = b + 1 | 0;
                            } while ((b | 0) < (o | 0));
                        }
                        else
                            i = 0.0;
                        f[w + (p * 24 | 0) + 16 >> 2] = i;
                        b = c[w + (p * 24 | 0) + 12 >> 2] | 0;
                        m = b << 1;
                        b = (b | 0) > 0;
                        if (b)
                            gc(c[w + (p * 24 | 0) + 20 >> 2] | 0, 0, ((m | 0) > 1 ? m : 1) << 2 | 0) | 0;
                        if (e & b) {
                            h = c[v >> 2] | 0;
                            a = c[q >> 2] | 0;
                            k = c[u >> 2] | 0;
                            l = c[w + (p * 24 | 0) + 20 >> 2] | 0;
                            g = n;
                            do {
                                d = c[h + (g << 2) >> 2] | 0;
                                e = a + (g << 2) | 0;
                                b = 0;
                                do {
                                    f[k + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) < (m | 0));
                                b = 0;
                                do {
                                    e = l + (b << 2) | 0;
                                    f[e >> 2] = +f[k + (b << 2) >> 2] + +f[e >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) < (m | 0));
                                g = g + 1 | 0;
                            } while ((g | 0) < (o | 0));
                        }
                    }
                    n = (c[r + (p << 2) >> 2] | 0) + n | 0;
                    p = p + 1 | 0;
                    if ((p | 0) == (x | 0))
                        break;
                    else
                        j = j + 4 | 0;
                } return; }
                function Wa(a) { a = a | 0; var b = 0, d = 0, e = 0, g = 0, h = 0.0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0; s = c[a + 76 >> 2] | 0; t = c[a + 72 >> 2] | 0; r = c[a + 176 >> 2] | 0; j = c[a + 124 >> 2] | 0; i = (j | 0) > 0; if (i) {
                    d = c[a + 128 >> 2] | 0;
                    e = c[a + 120 >> 2] | 0;
                    g = c[a + 148 >> 2] | 0;
                    b = 0;
                    do {
                        f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                        b = b + 1 | 0;
                    } while ((b | 0) != (j | 0));
                    if (i) {
                        d = c[a + 132 >> 2] | 0;
                        e = c[a + 120 >> 2] | 0;
                        g = c[a + 152 >> 2] | 0;
                        b = 0;
                        do {
                            f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                            b = b + 1 | 0;
                        } while ((b | 0) != (j | 0));
                        if (i) {
                            d = c[a + 136 >> 2] | 0;
                            e = c[a + 120 >> 2] | 0;
                            g = c[a + 156 >> 2] | 0;
                            b = 0;
                            do {
                                f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                                b = b + 1 | 0;
                            } while ((b | 0) != (j | 0));
                            if (i) {
                                d = c[a + 140 >> 2] | 0;
                                e = c[a + 120 >> 2] | 0;
                                g = c[a + 160 >> 2] | 0;
                                b = 0;
                                do {
                                    f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) != (j | 0));
                                if (i) {
                                    d = c[a + 144 >> 2] | 0;
                                    e = c[a + 120 >> 2] | 0;
                                    g = c[a + 164 >> 2] | 0;
                                    b = 0;
                                    do {
                                        f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                                        b = b + 1 | 0;
                                    } while ((b | 0) != (j | 0));
                                }
                            }
                        }
                    }
                } if ((t | 0) <= 0)
                    return; l = c[a + 112 >> 2] | 0; m = a + 116 | 0; n = a + 164 | 0; o = a + 160 | 0; p = a + 156 | 0; q = a + 152 | 0; k = a + 148 | 0; a = 0; i = r; j = 0; while (1) {
                    if (c[i >> 2] | 0) {
                        e = c[(c[m >> 2] | 0) + (a << 2) >> 2] | 0;
                        g = e + j | 0;
                        e = (e | 0) > 0;
                        if (e) {
                            d = c[k >> 2] | 0;
                            b = j;
                            h = 0.0;
                            do {
                                h = h + +f[d + (b << 2) >> 2];
                                b = b + 1 | 0;
                            } while ((b | 0) < (g | 0));
                            f[s + (a << 5) + 4 >> 2] = h;
                            if (e) {
                                d = c[q >> 2] | 0;
                                b = j;
                                h = 0.0;
                                do {
                                    h = h + +f[d + (b << 2) >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) < (g | 0));
                                f[s + (a << 5) + 20 >> 2] = h;
                                if (e) {
                                    d = c[p >> 2] | 0;
                                    b = j;
                                    h = 0.0;
                                    do {
                                        h = h + +f[d + (b << 2) >> 2];
                                        b = b + 1 | 0;
                                    } while ((b | 0) < (g | 0));
                                    f[s + (a << 5) + 12 >> 2] = h;
                                    if (e) {
                                        d = c[o >> 2] | 0;
                                        b = j;
                                        h = 0.0;
                                        do {
                                            h = h + +f[d + (b << 2) >> 2];
                                            b = b + 1 | 0;
                                        } while ((b | 0) < (g | 0));
                                        f[s + (a << 5) + 16 >> 2] = h;
                                        if (e) {
                                            d = c[n >> 2] | 0;
                                            h = 0.0;
                                            b = j;
                                            do {
                                                h = h + +f[d + (b << 2) >> 2];
                                                b = b + 1 | 0;
                                            } while ((b | 0) < (g | 0));
                                        }
                                        else
                                            h = 0.0;
                                    }
                                    else
                                        u = 34;
                                }
                                else
                                    u = 30;
                            }
                            else
                                u = 26;
                        }
                        else {
                            f[s + (a << 5) + 4 >> 2] = 0.0;
                            u = 26;
                        }
                        if ((u | 0) == 26) {
                            f[s + (a << 5) + 20 >> 2] = 0.0;
                            u = 30;
                        }
                        if ((u | 0) == 30) {
                            f[s + (a << 5) + 12 >> 2] = 0.0;
                            u = 34;
                        }
                        if ((u | 0) == 34) {
                            u = 0;
                            f[s + (a << 5) + 16 >> 2] = 0.0;
                            h = 0.0;
                        }
                        f[s + (a << 5) + 8 >> 2] = h;
                    }
                    j = (c[l + (a << 2) >> 2] | 0) + j | 0;
                    a = a + 1 | 0;
                    if ((a | 0) == (t | 0))
                        break;
                    else
                        i = i + 4 | 0;
                } return; }
                function Xa(a) { a = a | 0; var b = 0, d = 0, e = 0, g = 0, h = 0, i = 0, j = 0.0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0; A = c[a + 204 >> 2] | 0; B = c[a + 200 >> 2] | 0; k = c[a + 248 >> 2] | 0; i = c[a + 220 >> 2] | 0; h = (i | 0) > 0; if (h) {
                    d = c[a + 224 >> 2] | 0;
                    e = c[a + 216 >> 2] | 0;
                    g = c[a + 236 >> 2] | 0;
                    b = 0;
                    do {
                        f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                        b = b + 1 | 0;
                    } while ((b | 0) != (i | 0));
                    if (h) {
                        d = c[a + 228 >> 2] | 0;
                        e = c[a + 216 >> 2] | 0;
                        g = c[a + 240 >> 2] | 0;
                        b = 0;
                        do {
                            f[g + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e + (b << 2) >> 2];
                            b = b + 1 | 0;
                        } while ((b | 0) != (i | 0));
                    }
                } if ((B | 0) <= 0)
                    return; r = c[a + 208 >> 2] | 0; s = a + 212 | 0; t = a + 236 | 0; u = a + 276 | 0; v = a + 240 | 0; w = a + 268 | 0; x = a + 272 | 0; y = a + 244 | 0; z = a + 232 | 0; q = a + 216 | 0; p = 0; n = 0; while (1) {
                    if (c[k >> 2] | 0) {
                        e = c[(c[s >> 2] | 0) + (p << 2) >> 2] | 0;
                        o = e + n | 0;
                        e = (e | 0) > 0;
                        if (e) {
                            d = c[t >> 2] | 0;
                            b = n;
                            j = 0.0;
                            do {
                                j = j + +f[d + (b << 2) >> 2];
                                b = b + 1 | 0;
                            } while ((b | 0) < (o | 0));
                            f[(c[u >> 2] | 0) + (p << 2) >> 2] = j;
                            if (e) {
                                d = c[v >> 2] | 0;
                                b = n;
                                j = 0.0;
                                do {
                                    j = j + +f[d + (b << 2) >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) < (o | 0));
                            }
                            else
                                j = 0.0;
                        }
                        else {
                            f[(c[u >> 2] | 0) + (p << 2) >> 2] = 0.0;
                            j = 0.0;
                        }
                        c[(c[w >> 2] | 0) + (p << 2) >> 2] = ~~(j + 1.0000000474974513e-03);
                        b = c[A + (p << 4) + 12 >> 2] | 0;
                        l = b << 1;
                        m = c[(c[x >> 2] | 0) + (p << 2) >> 2] | 0;
                        b = (b | 0) > 0;
                        if (b)
                            gc(m | 0, 0, ((l | 0) > 1 ? l : 1) << 2 | 0) | 0;
                        if (e & b) {
                            h = c[z >> 2] | 0;
                            i = c[q >> 2] | 0;
                            a = c[y >> 2] | 0;
                            g = n;
                            do {
                                d = c[h + (g << 2) >> 2] | 0;
                                e = i + (g << 2) | 0;
                                b = 0;
                                do {
                                    f[a + (b << 2) >> 2] = +f[d + (b << 2) >> 2] * +f[e >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) < (l | 0));
                                b = 0;
                                do {
                                    e = m + (b << 2) | 0;
                                    f[e >> 2] = +f[a + (b << 2) >> 2] + +f[e >> 2];
                                    b = b + 1 | 0;
                                } while ((b | 0) < (l | 0));
                                g = g + 1 | 0;
                            } while ((g | 0) < (o | 0));
                        }
                    }
                    n = (c[r + (p << 2) >> 2] | 0) + n | 0;
                    p = p + 1 | 0;
                    if ((p | 0) == (B | 0))
                        break;
                    else
                        k = k + 4 | 0;
                } return; }
                function Ya(a, b, d, e) { a = a | 0; b = b | 0; d = d | 0; e = e | 0; var h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0, o = 0.0, p = 0.0, q = 0, r = 0.0, s = 0.0, t = 0.0, u = 0.0, v = 0, x = 0.0, y = 0.0, z = 0.0, A = 0.0, B = 0.0, C = 0, D = 0.0, E = 0.0, F = 0.0, G = 0.0, H = 0.0, I = 0.0, J = 0.0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0.0, Y = 0.0, Z = 0, _ = 0, $ = 0, aa = 0, ba = 0, da = 0, ea = 0.0, fa = 0.0; da = R; R = R + 32 | 0; ba = da; Z = c[a + 20 >> 2] | 0; _ = c[a + 4 >> 2] | 0; $ = c[a >> 2] | 0; aa = _ + 1 | 0; if ((e | 0) <= 0) {
                    R = da;
                    return;
                } X = +(_ | 0); Y = +($ | 0); L = (c[a + 8 >> 2] | 0) == 0; M = Z + (_ << 3) | 0; N = w($, aa) | 0; O = Z + (N << 3) | 0; U = N + _ | 0; P = Z + (U << 3) | 0; Q = Z + 4 | 0; S = Z + (_ << 3) + 4 | 0; T = Z + (N << 3) + 4 | 0; U = Z + (U << 3) + 4 | 0; V = _ + -1 | 0; W = $ + -1 | 0; C = 0; K = 0; s = 0.0; t = 0.0; h = 0.0; i = 0.0; A = 0.0; y = 0.0; x = 0.0; j = 0.0; G = 0.0; H = 0.0; I = 0.0; J = 0.0; u = 0.0; r = 0.0; D = 0.0; l = 0.0; while (1) {
                    m = +f[b + (K << 3) >> 2];
                    z = +f[b + (K << 3) + 4 >> 2];
                    k = X * m;
                    B = Y * z;
                    q = !(m >= 1.0);
                    v = !(z >= 1.0);
                    do
                        if (v & (q & (!(m < 0.0) & !(z < 0.0)))) {
                            v = ~~k;
                            a = ~~B;
                            q = (w(a, aa) | 0) + v | 0;
                            j = k - +(v | 0);
                            z = B - +(a | 0);
                            a = q + aa | 0;
                            v = q + 1 | 0;
                            p = 1.0 - j;
                            k = +f[Z + (a << 3) + 4 >> 2];
                            m = +f[Z + (a << 3) >> 2];
                            l = +f[Z + (v << 3) + 4 >> 2];
                            n = +f[Z + (v << 3) >> 2];
                            if (!L) {
                                B = 1.0 - z;
                                v = a + 1 | 0;
                                f[d + (K << 3) >> 2] = z * (j * +f[Z + (v << 3) >> 2]) + (z * (p * m) + (B * (j * n) + B * (p * +f[Z + (q << 3) >> 2])));
                                B = z * (j * +f[Z + (v << 3) + 4 >> 2]) + (z * (p * k) + (B * (j * l) + B * (p * +f[Z + (q << 3) + 4 >> 2])));
                                n = G;
                                o = H;
                                m = I;
                                k = J;
                                p = D;
                                l = z;
                                break;
                            }
                            if (!(j + z <= 1.0)) {
                                v = a + 1 | 0;
                                F = j + -1.0 + z;
                                E = 1.0 - z;
                                o = p * k + F * +f[Z + (v << 3) + 4 >> 2];
                                l = E * l;
                                k = E * n + (p * m + F * +f[Z + (v << 3) >> 2]);
                            }
                            else {
                                F = p - z;
                                o = j * l + F * +f[Z + (q << 3) + 4 >> 2];
                                l = z * k;
                                k = z * m + (j * n + F * +f[Z + (q << 3) >> 2]);
                            }
                            f[d + (K << 3) >> 2] = k;
                            B = l + o;
                            n = G;
                            o = H;
                            m = I;
                            k = J;
                            p = D;
                            l = z;
                        }
                        else {
                            if (!C) {
                                fa = +f[Z >> 2];
                                ea = +f[M >> 2];
                                n = +f[O >> 2];
                                u = +f[P >> 2];
                                o = +f[Q >> 2];
                                x = +f[S >> 2];
                                y = +f[T >> 2];
                                D = +f[U >> 2];
                                F = u - fa;
                                p = D - o;
                                E = ea - n;
                                r = x - y;
                                C = 1;
                                A = (F - E) * .5;
                                E = (E + F) * .5;
                                F = (fa + ea + n + u) * .25 - F * .5;
                                u = (p - r) * .5;
                                r = (r + p) * .5;
                                p = (o + x + y + D) * .25 - p * .5;
                            }
                            else {
                                E = y;
                                F = x;
                                p = D;
                            }
                            do
                                if (z < 3.0 & (m > -2.0 & m < 3.0 & z > -2.0)) {
                                    a = z <= 0.0;
                                    do
                                        if (!(m <= 0.0))
                                            if (q) {
                                                if (a) {
                                                    q = ~~k;
                                                    q = (q | 0) == (_ | 0) ? V : q;
                                                    j = +(q | 0);
                                                    l = j / X;
                                                    v = q + 1 | 0;
                                                    n = +(v | 0) / X;
                                                    t = A * 2.0;
                                                    m = u * 2.0;
                                                    s = l * E + F - t;
                                                    t = n * E + F - t;
                                                    h = +f[Z + (q << 3) >> 2];
                                                    i = +f[Z + (v << 3) >> 2];
                                                    j = k - j;
                                                    n = n * r + p - m;
                                                    o = +f[Z + (q << 3) + 4 >> 2];
                                                    m = l * r + p - m;
                                                    k = +f[Z + (v << 3) + 4 >> 2];
                                                    l = (z + 2.0) * .5;
                                                    break;
                                                }
                                                if (v) {
                                                    c[ba >> 2] = K;
                                                    g[ba + 8 >> 3] = m;
                                                    g[ba + 16 >> 3] = z;
                                                    ca(4, 2217, ba);
                                                    n = G;
                                                    o = H;
                                                    m = I;
                                                    k = J;
                                                    break;
                                                }
                                                else {
                                                    v = ~~k;
                                                    v = (v | 0) == (_ | 0) ? V : v;
                                                    j = +(v | 0);
                                                    o = j / X;
                                                    q = v + 1 | 0;
                                                    l = +(q | 0) / X;
                                                    v = v + N | 0;
                                                    q = q + N | 0;
                                                    i = A * 3.0;
                                                    fa = u * 3.0;
                                                    s = +f[Z + (v << 3) >> 2];
                                                    t = +f[Z + (q << 3) >> 2];
                                                    h = i + (o * E + F);
                                                    i = i + (l * E + F);
                                                    j = k - j;
                                                    n = +f[Z + (q << 3) + 4 >> 2];
                                                    o = fa + (o * r + p);
                                                    m = +f[Z + (v << 3) + 4 >> 2];
                                                    k = fa + (l * r + p);
                                                    l = (z + -1.0) * .5;
                                                    break;
                                                }
                                            }
                                            else {
                                                k = r * 3.0 + p;
                                                i = E * 3.0 + F;
                                                j = (m + -1.0) * .5;
                                                if (a) {
                                                    t = A * 2.0;
                                                    m = u * 2.0;
                                                    s = E + F - t;
                                                    t = i - t;
                                                    h = +f[M >> 2];
                                                    n = k - m;
                                                    o = +f[S >> 2];
                                                    m = r + p - m;
                                                    l = (z + 2.0) * .5;
                                                    break;
                                                }
                                                if (v) {
                                                    v = ~~B;
                                                    v = (v | 0) == ($ | 0) ? W : v;
                                                    l = +(v | 0);
                                                    n = l / Y;
                                                    q = v + 1 | 0;
                                                    fa = +(q | 0) / Y;
                                                    v = (w(v, aa) | 0) + _ | 0;
                                                    q = (w(q, aa) | 0) + _ | 0;
                                                    s = +f[Z + (v << 3) >> 2];
                                                    t = n * A + i;
                                                    h = +f[Z + (q << 3) >> 2];
                                                    i = fa * A + i;
                                                    n = n * u + k;
                                                    o = +f[Z + (q << 3) + 4 >> 2];
                                                    m = +f[Z + (v << 3) + 4 >> 2];
                                                    k = fa * u + k;
                                                    l = B - l;
                                                    break;
                                                }
                                                else {
                                                    n = A * 3.0;
                                                    l = u * 3.0;
                                                    s = +f[P >> 2];
                                                    t = A + i;
                                                    h = n + (E + F);
                                                    i = n + i;
                                                    n = u + k;
                                                    o = l + (r + p);
                                                    m = +f[U >> 2];
                                                    k = l + k;
                                                    l = (z + -1.0) * .5;
                                                    break;
                                                }
                                            }
                                        else {
                                            k = p - r * 2.0;
                                            h = F - E * 2.0;
                                            j = (m + 2.0) * .5;
                                            if (a) {
                                                t = A * 2.0;
                                                m = u * 2.0;
                                                s = h - t;
                                                t = F - t;
                                                i = +f[Z >> 2];
                                                n = p - m;
                                                o = k;
                                                m = k - m;
                                                k = +f[Q >> 2];
                                                l = (z + 2.0) * .5;
                                                break;
                                            }
                                            if (v) {
                                                q = ~~B;
                                                q = (q | 0) == ($ | 0) ? W : q;
                                                l = +(q | 0);
                                                m = l / Y;
                                                v = q + 1 | 0;
                                                o = +(v | 0) / Y;
                                                q = w(q, aa) | 0;
                                                v = w(v, aa) | 0;
                                                s = m * A + h;
                                                t = +f[Z + (q << 3) >> 2];
                                                h = o * A + h;
                                                i = +f[Z + (v << 3) >> 2];
                                                n = +f[Z + (q << 3) + 4 >> 2];
                                                o = o * u + k;
                                                m = m * u + k;
                                                k = +f[Z + (v << 3) + 4 >> 2];
                                                l = B - l;
                                                break;
                                            }
                                            else {
                                                i = A * 3.0;
                                                l = u * 3.0;
                                                s = A + h;
                                                t = +f[O >> 2];
                                                h = i + h;
                                                i = i + F;
                                                n = +f[T >> 2];
                                                o = l + k;
                                                m = u + k;
                                                k = l + p;
                                                l = (z + -1.0) * .5;
                                                break;
                                            }
                                        }
                                    while (0);
                                    if (!(j + l <= 1.0)) {
                                        y = 1.0 - j;
                                        x = 1.0 - l;
                                        f[d + (K << 3) >> 2] = i + (h - i) * y + (t - i) * x;
                                        y = k + (o - k) * y;
                                        x = (n - k) * x;
                                        break;
                                    }
                                    else {
                                        f[d + (K << 3) >> 2] = s + (t - s) * j + (h - s) * l;
                                        y = m + (n - m) * j;
                                        x = (o - m) * l;
                                        break;
                                    }
                                }
                                else {
                                    f[d + (K << 3) >> 2] = z * A + (m * E + F);
                                    y = m * r + p;
                                    x = z * u;
                                    n = G;
                                    o = H;
                                    m = I;
                                    k = J;
                                }
                            while (0);
                            B = x + y;
                            y = E;
                            x = F;
                        }
                    while (0);
                    f[d + (K << 3) + 4 >> 2] = B;
                    K = K + 1 | 0;
                    if ((K | 0) == (e | 0))
                        break;
                    else {
                        G = n;
                        H = o;
                        I = m;
                        J = k;
                        D = p;
                    }
                } R = da; return; }
                function Za(a, b, d, e) { a = a | 0; b = b | 0; d = d | 0; e = e | 0; var g = 0.0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0.0; l = (+f[a >> 2] + +f[a + 20 >> 2]) * 3.1415927410125732 / 180.0; i = +u(+l); l = +t(+l); g = +f[a + 8 >> 2]; j = c[a + 24 >> 2] | 0 ? -1.0 : 1.0; k = c[a + 28 >> 2] | 0 ? -1.0 : 1.0; l = l * g; h = l * j; g = i * g; i = g * k; j = g * j; k = l * k; l = +f[a + 12 >> 2]; g = +f[a + 16 >> 2]; if ((e | 0) <= 0)
                    return; a = 0; do {
                    n = +f[b + (a << 3) >> 2];
                    m = +f[b + (a << 3) + 4 >> 2];
                    f[d + (a << 3) >> 2] = l + (h * n - i * m);
                    f[d + (a << 3) + 4 >> 2] = g + (j * n + k * m);
                    a = a + 1 | 0;
                } while ((a | 0) != (e | 0)); return; }
                function _a(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, g = 0, h = 0, i = 0, j = 0; g = c[a + 24 >> 2] | 0; h = c[d + 136 >> 2] | 0; i = c[d + 140 >> 2] | 0; e = a + 4 | 0; a = c[e >> 2] | 0; if ((a | 0) == -1) {
                    c[h + (b << 2) >> 2] = c[g + 16 >> 2];
                    f[i + (b << 2) >> 2] = 1.0;
                    return;
                }
                else {
                    j = c[d + 4 >> 2] | 0;
                    d = c[g + 20 >> 2] | 0;
                    Z[c[j + (a << 5) + 20 >> 2] & 3](c[j + (a << 5) + 24 >> 2] | 0, d, d, c[g + 12 >> 2] | 0);
                    d = c[e >> 2] | 0;
                    f[h + (b << 2) >> 2] = +f[g + 16 >> 2] * +f[h + (d << 2) >> 2];
                    c[i + (b << 2) >> 2] = c[i + (d << 2) >> 2];
                    return;
                } }
                function $a(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0.0, g = 0.0, h = 0.0, i = 0, j = 0, k = 0, l = 0.0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0.0, F = 0.0; D = R; R = R + 64 | 0; C = D + 24 | 0; s = D + 16 | 0; t = D + 56 | 0; y = D + 8 | 0; u = D + 48 | 0; z = D + 40 | 0; A = D + 32 | 0; B = D; v = c[a + 24 >> 2] | 0; w = c[d + 136 >> 2] | 0; x = c[d + 140 >> 2] | 0; r = a + 4 | 0; a = c[r >> 2] | 0; if ((a | 0) == -1) {
                    c[w + (b << 2) >> 2] = c[v + 4 >> 2];
                    c[x + (b << 2) >> 2] = c[v + 8 >> 2];
                    R = D;
                    return;
                } m = c[d + 4 >> 2] | 0; n = v + 12 | 0; k = c[n >> 2] | 0; c[z >> 2] = k; o = z + 4 | 0; p = v + 16 | 0; q = c[p >> 2] | 0; c[o >> 2] = q; f[A >> 2] = 0.0; l = (c[m + (a << 5) + 8 >> 2] | 0) == 1 ? -10.0 : -.10000000149011612; f[A + 4 >> 2] = l; c[s >> 2] = k; k = s + 4 | 0; c[k >> 2] = q; q = m + (a << 5) + 20 | 0; m = m + (a << 5) + 24 | 0; Z[c[q >> 2] & 3](c[m >> 2] | 0, s, t, 1); a = u + 4 | 0; d = t + 4 | 0; i = y + 4 | 0; h = 1.0; j = 9; while (1) {
                    e = h * 0.0;
                    f[u >> 2] = e + +f[s >> 2];
                    g = l * h;
                    f[a >> 2] = g + +f[k >> 2];
                    Z[c[q >> 2] & 3](c[m >> 2] | 0, u, y, 1);
                    F = +f[y >> 2] - +f[t >> 2];
                    f[y >> 2] = F;
                    E = +f[i >> 2] - +f[d >> 2];
                    f[i >> 2] = E;
                    if (F != 0.0 | E != 0.0) {
                        a = 5;
                        break;
                    }
                    f[u >> 2] = +f[s >> 2] - e;
                    f[a >> 2] = +f[k >> 2] - g;
                    Z[c[q >> 2] & 3](c[m >> 2] | 0, u, y, 1);
                    e = +f[y >> 2] - +f[t >> 2];
                    f[y >> 2] = e;
                    g = +f[i >> 2] - +f[d >> 2];
                    f[i >> 2] = g;
                    if (e != 0.0 | g != 0.0) {
                        a = 7;
                        break;
                    }
                    if (!j) {
                        a = 9;
                        break;
                    }
                    else {
                        h = h * .10000000149011612;
                        j = j + -1 | 0;
                    }
                } if ((a | 0) == 5) {
                    u = y;
                    y = c[u + 4 >> 2] | 0;
                    C = B;
                    c[C >> 2] = c[u >> 2];
                    c[C + 4 >> 2] = y;
                }
                else if ((a | 0) == 7) {
                    f[B >> 2] = -e;
                    f[B + 4 >> 2] = -g;
                }
                else if ((a | 0) == 9)
                    ca(3, 2289, C); F = +Pa(A, B) * 180.0 / 3.1415927410125732; Z[c[q >> 2] & 3](c[m >> 2] | 0, z, z, 1); c[n >> 2] = c[z >> 2]; c[p >> 2] = c[o >> 2]; B = v + 20 | 0; f[B >> 2] = +f[B >> 2] - F; B = c[r >> 2] | 0; f[w + (b << 2) >> 2] = +f[v + 4 >> 2] * +f[w + (B << 2) >> 2]; C = v + 8 | 0; F = +f[C >> 2] * +f[x + (B << 2) >> 2]; f[x + (b << 2) >> 2] = F; f[C >> 2] = F; R = D; return; }
                function ab(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0; b = c[a >> 2] | 0; n = c[a + 316 >> 2] | 0; r = c[b + 1072 >> 2] | 0; t = c[a + 340 >> 2] | 0; if ((t | 0) <= 0)
                    return; k = a + 356 | 0; l = a + 364 | 0; i = b + 1104 | 0; j = a + 352 | 0; e = c[a + 372 >> 2] | 0; f = 0; g = 0; while (1) {
                    h = c[e >> 2] | 0;
                    b = n + (h * 36 | 0) + 24 | 0;
                    if (!((c[b >> 2] | 0) == 0 ? !(c[n + (h * 36 | 0) + 28 >> 2] | 0) : 0))
                        u = 6;
                    if (((u | 0) == 6 ? (u = 0, c[(c[j >> 2] | 0) + (g << 2) >> 2] = c[n + (h * 36 | 0) + 8 >> 2], c[b >> 2] | 0) : 0) ? (m = c[r + (g << 2) >> 2] | 0, o = c[n + (h * 36 | 0) + 16 >> 2] | 0, d = c[n + (h * 36 | 0) + 8 >> 2] | 0, p = o + (d << 2) | 0, (d | 0) > 0) : 0) {
                        d = c[i >> 2] | 0;
                        b = (c[l >> 2] | 0) + (f << 2) | 0;
                        a = o;
                        while (1) {
                            c[b >> 2] = c[d + ((c[a >> 2] | 0) + m << 2) >> 2];
                            a = a + 4 | 0;
                            if (a >>> 0 >= p >>> 0)
                                break;
                            else
                                b = b + 4 | 0;
                        }
                    }
                    if (c[n + (h * 36 | 0) + 28 >> 2] | 0 ? (q = c[n + (h * 36 | 0) + 20 >> 2] | 0, d = c[n + (h * 36 | 0) + 8 >> 2] | 0, s = q + (d << 2) | 0, (d | 0) > 0) : 0) {
                        b = q;
                        a = (c[k >> 2] | 0) + (f << 2) | 0;
                        while (1) {
                            c[a >> 2] = c[b >> 2];
                            b = b + 4 | 0;
                            if (b >>> 0 >= s >>> 0)
                                break;
                            else
                                a = a + 4 | 0;
                        }
                    }
                    g = g + 1 | 0;
                    if ((g | 0) == (t | 0))
                        break;
                    else {
                        e = e + 4 | 0;
                        f = (c[n + (h * 36 | 0) + 4 >> 2] | 0) + f | 0;
                    }
                } return; }
                function bb(a) { a = a | 0; var b = 0, d = 0, e = 0, g = 0, h = 0, i = 0.0, j = 0, k = 0, l = 0, m = 0; m = c[a + 340 >> 2] | 0; e = c[a + 360 >> 2] | 0; if ((e | 0) > 0) {
                    g = c[a + 364 >> 2] | 0;
                    h = c[a + 356 >> 2] | 0;
                    d = c[a + 368 >> 2] | 0;
                    b = 0;
                    do {
                        f[d + (b << 2) >> 2] = +f[g + (b << 2) >> 2] * +f[h + (b << 2) >> 2];
                        b = b + 1 | 0;
                    } while ((b | 0) != (e | 0));
                } if ((m | 0) <= 0)
                    return; j = c[a + 352 >> 2] | 0; k = c[a + 344 >> 2] | 0; l = c[a + 348 >> 2] | 0; a = a + 368 | 0; g = 0; h = 0; do {
                    e = c[j + (g << 2) >> 2] | 0;
                    d = e + h | 0;
                    if ((e | 0) > 0) {
                        e = c[a >> 2] | 0;
                        i = 0.0;
                        b = h;
                        do {
                            i = i + +f[e + (b << 2) >> 2];
                            b = b + 1 | 0;
                        } while ((b | 0) < (d | 0));
                    }
                    else
                        i = 0.0;
                    f[k + (g * 24 | 0) + 20 >> 2] = i;
                    h = (c[l + (g << 2) >> 2] | 0) + h | 0;
                    g = g + 1 | 0;
                } while ((g | 0) != (m | 0)); return; }
                function cb(a) { a = a | 0; var b = 0, d = 0, g = 0, h = 0, i = 0, j = 0, k = 0.0, l = 0, m = 0, n = 0, o = 0.0, p = 0.0, q = 0.0, r = 0, s = 0.0, t = 0.0, u = 0, v = 0.0, w = 0; b = c[a + 344 >> 2] | 0; l = c[a + 340 >> 2] | 0; m = b + (l * 24 | 0) | 0; if ((l | 0) <= 0)
                    return; l = c[a + 272 >> 2] | 0; do {
                    d = c[b + 8 >> 2] | 0;
                    g = c[l + (c[b >> 2] << 2) >> 2] | 0;
                    h = c[l + (c[b + 4 >> 2] << 2) >> 2] | 0;
                    i = c[b + 12 >> 2] | 0;
                    j = c[b + 16 >> 2] | 0;
                    k = +f[b + 20 >> 2];
                    if ((d | 0) > 0) {
                        a = 0;
                        do {
                            n = a | 1;
                            v = +f[i + (a << 2) >> 2];
                            q = +f[i + (n << 2) >> 2];
                            u = (e[j + (a << 1) >> 1] | 0) << 1 & 65534;
                            w = g + (u << 2) | 0;
                            t = +f[w >> 2];
                            u = g + ((u | 1) << 2) | 0;
                            p = +f[u >> 2];
                            n = (e[j + (n << 1) >> 1] | 0) << 1 & 65534;
                            r = h + (n << 2) | 0;
                            s = +f[r >> 2];
                            n = h + ((n | 1) << 2) | 0;
                            o = +f[n >> 2];
                            f[w >> 2] = t + k * (v * (s - t));
                            f[u >> 2] = p + k * (v * (o - p));
                            f[r >> 2] = s + k * (q * (t - s));
                            f[n >> 2] = o + k * (q * (p - o));
                            a = a + 2 | 0;
                        } while ((a | 0) < (d | 0));
                    }
                    b = b + 24 | 0;
                } while (b >>> 0 < m >>> 0); return; }
                function db(a) { a = a | 0; var b = 0, d = 0, e = 0, g = 0, h = 0, i = 0, j = 0; if (c[a + 380 >> 2] | 0)
                    return; b = c[a + 204 >> 2] | 0; e = c[a + 200 >> 2] | 0; i = b + (e << 4) | 0; if ((e | 0) <= 0)
                    return; e = c[a + 248 >> 2] | 0; d = c[a + 272 >> 2] | 0; a = b; while (1) {
                    if (c[e >> 2] | 0 ? (g = c[d >> 2] | 0, h = c[a + 12 >> 2] << 1, (h | 0) > 1) : 0) {
                        b = 1;
                        do {
                            j = g + (b << 2) | 0;
                            f[j >> 2] = -+f[j >> 2];
                            b = b + 2 | 0;
                        } while ((b | 0) < (h | 0));
                    }
                    a = a + 16 | 0;
                    if (a >>> 0 >= i >>> 0)
                        break;
                    else {
                        e = e + 4 | 0;
                        d = d + 4 | 0;
                    }
                } return; }
                function eb(b) { b = b | 0; var e = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0.0, s = 0, t = 0, u = 0, v = 0, x = 0, y = 0, z = 0, A = 0, B = 0.0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, S = 0, T = 0, U = 0.0, V = 0.0, W = 0.0, X = 0, _ = 0, $ = 0, aa = 0, ba = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0, qa = 0, ra = 0.0, sa = 0, ta = 0, ua = 0, va = 0; ua = R; R = R + 16 | 0; K = ua; ta = b + 256 | 0; if (c[ta >> 2] | 0) {
                    qa = c[b + 200 >> 2] << 2;
                    fc(c[b + 280 >> 2] | 0, c[b + 264 >> 2] | 0, qa | 0) | 0;
                    fc(c[b + 284 >> 2] | 0, c[b + 268 >> 2] | 0, qa | 0) | 0;
                    fc(c[b + 288 >> 2] | 0, c[b + 276 >> 2] | 0, qa | 0) | 0;
                } j = c[b + 292 >> 2] | 0; l = c[b + 296 >> 2] | 0; u = l + (j * 40 | 0) | 0; j = (j | 0) > 0; if (j) {
                    h = c[b + 300 >> 2] | 0;
                    i = l;
                    while (1) {
                        q = +f[h >> 2];
                        k = (c[i + 12 >> 2] | 0) == 0;
                        if (k) {
                            V = +f[i >> 2];
                            W = +f[i + 4 >> 2];
                            q = q < V ? V : q > W ? W : q;
                        }
                        else {
                            W = +f[i + 8 >> 2];
                            V = +f[i >> 2];
                            q = (q - V) / W;
                            q = V + W * (q - +(~~+r(+q) | 0));
                        }
                        e = i + 32 | 0;
                        g = i + 36 | 0;
                        if (+f[e >> 2] != q) {
                            c[g >> 2] = 1;
                            f[e >> 2] = q;
                        }
                        else
                            c[g >> 2] = 0;
                        if (k)
                            f[h >> 2] = q;
                        i = i + 40 | 0;
                        if (i >>> 0 >= u >>> 0)
                            break;
                        else
                            h = h + 4 | 0;
                    }
                    if (j) {
                        p = b + 376 | 0;
                        x = c[p >> 2] | 0;
                        s = c[b + 308 >> 2] | 0;
                        t = (x | 0) == 0;
                        while (1) {
                            U = +f[l + 32 >> 2];
                            V = +f[l + 16 >> 2];
                            W = +f[l + 20 >> 2];
                            e = s + ((c[l + 24 >> 2] | 0) * 28 | 0) | 0;
                            qa = c[l + 28 >> 2] | 0;
                            o = e + (qa * 28 | 0) | 0;
                            a: do
                                if ((qa | 0) > 0) {
                                    if (!t)
                                        while (1) {
                                            j = c[e >> 2] | 0;
                                            do
                                                if ((j | 0) >= 1) {
                                                    h = c[e + 4 >> 2] | 0;
                                                    B = +f[h >> 2];
                                                    q = B - V;
                                                    if ((j | 0) == 1) {
                                                        i = !(U < V + B) | !(q < U);
                                                        j = 0;
                                                        q = 0.0;
                                                        ja = 55;
                                                        break;
                                                    }
                                                    if (U < q) {
                                                        g = 1;
                                                        q = 0.0;
                                                        n = 0;
                                                        h = e + 16 | 0;
                                                        ja = 57;
                                                        break;
                                                    }
                                                    if (!(U < V + B)) {
                                                        g = 1;
                                                        while (1) {
                                                            q = +f[h + (g << 2) >> 2];
                                                            if (U < V + q) {
                                                                ja = 50;
                                                                break;
                                                            }
                                                            g = g + 1 | 0;
                                                            if ((g | 0) < (j | 0))
                                                                B = q;
                                                            else {
                                                                h = 1;
                                                                g = 0;
                                                                q = 0.0;
                                                                break;
                                                            }
                                                        }
                                                        if ((ja | 0) == 50)
                                                            if (!(q - V < U)) {
                                                                g = g + -1 | 0;
                                                                q = q - B;
                                                                if (q < W) {
                                                                    h = 0;
                                                                    q = 0.0;
                                                                }
                                                                else {
                                                                    h = 0;
                                                                    q = (U - B) / q;
                                                                }
                                                            }
                                                            else {
                                                                h = 0;
                                                                q = 0.0;
                                                            }
                                                        i = h;
                                                        j = h ? j + -1 | 0 : g;
                                                        q = h ? 0.0 : q;
                                                        ja = 55;
                                                    }
                                                    else {
                                                        i = 0;
                                                        j = 0;
                                                        q = 0.0;
                                                        ja = 55;
                                                    }
                                                }
                                                else {
                                                    i = 0;
                                                    j = 0;
                                                    q = 0.0;
                                                    ja = 55;
                                                }
                                            while (0);
                                            if ((ja | 0) == 55) {
                                                ja = 0;
                                                g = i & 1;
                                                h = e + 16 | 0;
                                                if (i | (c[h >> 2] | 0) == 0) {
                                                    n = j;
                                                    ja = 57;
                                                }
                                                else {
                                                    i = 1;
                                                    n = j;
                                                    m = e + 12 | 0;
                                                    k = e + 8 | 0;
                                                    j = 1;
                                                }
                                            }
                                            if ((ja | 0) == 57) {
                                                ja = 0;
                                                m = e + 12 | 0;
                                                B = +f[m >> 2];
                                                qa = B != q;
                                                j = qa & 1;
                                                k = e + 8 | 0;
                                                i = (c[k >> 2] | 0) != (n | 0);
                                                if (qa)
                                                    i = q == 0.0 | B == 0.0 | i;
                                            }
                                            c[e + 24 >> 2] = j;
                                            c[e + 20 >> 2] = i & 1;
                                            f[m >> 2] = q;
                                            c[k >> 2] = n;
                                            c[h >> 2] = g;
                                            e = e + 28 | 0;
                                            if (e >>> 0 >= o >>> 0)
                                                break a;
                                        }
                                    if (!(c[l + 36 >> 2] | 0))
                                        while (1) {
                                            c[e + 24 >> 2] = 0;
                                            c[e + 20 >> 2] = 0;
                                            e = e + 28 | 0;
                                            if (e >>> 0 >= o >>> 0)
                                                break a;
                                        }
                                    do {
                                        j = c[e >> 2] | 0;
                                        do
                                            if ((j | 0) >= 1) {
                                                h = c[e + 4 >> 2] | 0;
                                                B = +f[h >> 2];
                                                q = B - V;
                                                if ((j | 0) == 1) {
                                                    i = !(U < V + B) | !(q < U);
                                                    j = 0;
                                                    q = 0.0;
                                                    ja = 37;
                                                    break;
                                                }
                                                if (U < q) {
                                                    g = 1;
                                                    q = 0.0;
                                                    n = 0;
                                                    h = e + 16 | 0;
                                                    ja = 39;
                                                    break;
                                                }
                                                if (!(U < V + B)) {
                                                    g = 1;
                                                    while (1) {
                                                        q = +f[h + (g << 2) >> 2];
                                                        if (U < V + q) {
                                                            ja = 31;
                                                            break;
                                                        }
                                                        g = g + 1 | 0;
                                                        if ((g | 0) < (j | 0))
                                                            B = q;
                                                        else {
                                                            h = 1;
                                                            g = 0;
                                                            q = 0.0;
                                                            break;
                                                        }
                                                    }
                                                    if ((ja | 0) == 31)
                                                        if (!(q - V < U)) {
                                                            g = g + -1 | 0;
                                                            q = q - B;
                                                            if (q < W) {
                                                                h = 0;
                                                                q = 0.0;
                                                            }
                                                            else {
                                                                h = 0;
                                                                q = (U - B) / q;
                                                            }
                                                        }
                                                        else {
                                                            h = 0;
                                                            q = 0.0;
                                                        }
                                                    i = h;
                                                    j = h ? j + -1 | 0 : g;
                                                    q = h ? 0.0 : q;
                                                    ja = 37;
                                                }
                                                else {
                                                    i = 0;
                                                    j = 0;
                                                    q = 0.0;
                                                    ja = 37;
                                                }
                                            }
                                            else {
                                                i = 0;
                                                j = 0;
                                                q = 0.0;
                                                ja = 37;
                                            }
                                        while (0);
                                        if ((ja | 0) == 37) {
                                            ja = 0;
                                            g = i & 1;
                                            h = e + 16 | 0;
                                            if (i | (c[h >> 2] | 0) == 0) {
                                                n = j;
                                                ja = 39;
                                            }
                                            else {
                                                i = 1;
                                                n = j;
                                                m = e + 12 | 0;
                                                k = e + 8 | 0;
                                                j = 1;
                                            }
                                        }
                                        if ((ja | 0) == 39) {
                                            ja = 0;
                                            m = e + 12 | 0;
                                            B = +f[m >> 2];
                                            qa = B != q;
                                            j = qa & 1;
                                            k = e + 8 | 0;
                                            i = (c[k >> 2] | 0) != (n | 0);
                                            if (qa)
                                                i = q == 0.0 | B == 0.0 | i;
                                        }
                                        c[e + 24 >> 2] = j;
                                        c[e + 20 >> 2] = i & 1;
                                        f[m >> 2] = q;
                                        c[k >> 2] = n;
                                        c[h >> 2] = g;
                                        e = e + 28 | 0;
                                    } while (e >>> 0 < o >>> 0);
                                }
                            while (0);
                            l = l + 40 | 0;
                            if (l >>> 0 >= u >>> 0) {
                                qa = p;
                                break;
                            }
                        }
                    }
                    else
                        ja = 15;
                }
                else
                    ja = 15; if ((ja | 0) == 15) {
                    x = b + 376 | 0;
                    qa = x;
                    x = c[x >> 2] | 0;
                } fa = b + 316 | 0; e = c[fa >> 2] | 0; ea = c[b + 312 >> 2] | 0; v = e + (ea * 36 | 0) | 0; if ((ea | 0) > 0) {
                    u = b + 308 | 0;
                    y = (x | 0) == 0;
                    do {
                        s = c[u >> 2] | 0;
                        n = c[e + 12 >> 2] | 0;
                        l = c[e >> 2] | 0;
                        t = n + (l << 2) | 0;
                        b: do
                            if ((l | 0) > 0) {
                                j = 0;
                                k = n;
                                g = 0;
                                h = 0;
                                while (1) {
                                    i = c[k >> 2] | 0;
                                    if (c[s + (i * 28 | 0) + 16 >> 2] | 0) {
                                        i = 0;
                                        g = 0;
                                        h = 1;
                                        break b;
                                    }
                                    if (!j)
                                        j = c[s + (i * 28 | 0) + 24 >> 2] | 0;
                                    if (!h)
                                        h = c[s + (i * 28 | 0) + 20 >> 2] | 0;
                                    g = (+f[s + (i * 28 | 0) + 12 >> 2] != 0.0 & 1) + g | 0;
                                    k = k + 4 | 0;
                                    if (k >>> 0 >= t >>> 0) {
                                        k = g;
                                        ja = 71;
                                        break;
                                    }
                                }
                            }
                            else {
                                j = 0;
                                k = 0;
                                h = 0;
                                ja = 71;
                            }
                        while (0);
                        c: do
                            if ((ja | 0) == 71) {
                                ja = 0;
                                g = y ? h : 1;
                                i = y ? j : 1;
                                if ((h | x | j | 0) != 0 ? (z = 1 << k, c[e + 8 >> 2] = z, A = c[e + 16 >> 2] | 0, C = c[e + 20 >> 2] | 0, D = A + (z << 2) | 0, (k | 0) != 31) : 0) {
                                    j = A + 4 | 0;
                                    gc(A | 0, 0, (D >>> 0 > j >>> 0 ? D : j) + ~A + 4 & -4 | 0) | 0;
                                    j = C + (z << 2) | 0;
                                    h = C;
                                    do {
                                        f[h >> 2] = 1.0;
                                        h = h + 4 | 0;
                                    } while (h >>> 0 < j >>> 0);
                                    if ((l | 0) >= 1) {
                                        if (!k) {
                                            j = n;
                                            k = 1;
                                            while (1) {
                                                l = c[j >> 2] | 0;
                                                q = +f[s + (l * 28 | 0) + 12 >> 2];
                                                m = w(c[s + (l * 28 | 0) + 8 >> 2] | 0, k) | 0;
                                                if (q == 0.0) {
                                                    h = 0;
                                                    do {
                                                        ea = A + (h << 2) | 0;
                                                        c[ea >> 2] = (c[ea >> 2] | 0) + m;
                                                        h = h + 1 | 0;
                                                    } while ((h | 0) != (z | 0));
                                                }
                                                else {
                                                    c[A >> 2] = (c[A >> 2] | 0) + m;
                                                    f[C >> 2] = (1.0 - q) * +f[C >> 2];
                                                }
                                                j = j + 4 | 0;
                                                k = w(c[s + (l * 28 | 0) >> 2] | 0, k) | 0;
                                                if (j >>> 0 >= t >>> 0) {
                                                    h = 0;
                                                    break c;
                                                }
                                            }
                                        }
                                        o = 1;
                                        h = 1;
                                        do {
                                            p = c[n >> 2] | 0;
                                            l = s + (p * 28 | 0) + 12 | 0;
                                            q = +f[l >> 2];
                                            j = c[s + (p * 28 | 0) + 8 >> 2] | 0;
                                            m = w(j, o) | 0;
                                            if (q == 0.0) {
                                                j = 0;
                                                do {
                                                    ea = A + (j << 2) | 0;
                                                    c[ea >> 2] = (c[ea >> 2] | 0) + m;
                                                    j = j + 1 | 0;
                                                } while ((j | 0) != (z | 0));
                                            }
                                            else {
                                                k = w(j + 1 | 0, o) | 0;
                                                c[A >> 2] = (c[A >> 2] | 0) + m;
                                                f[C >> 2] = (1.0 - q) * +f[C >> 2];
                                                j = 1;
                                                do {
                                                    W = +f[l >> 2];
                                                    da = (j & h | 0) != 0;
                                                    ea = A + (j << 2) | 0;
                                                    c[ea >> 2] = (da ? k : m) + (c[ea >> 2] | 0);
                                                    ea = C + (j << 2) | 0;
                                                    f[ea >> 2] = (da ? W : 1.0 - W) * +f[ea >> 2];
                                                    j = j + 1 | 0;
                                                } while ((j | 0) != (z | 0));
                                                h = h << 1;
                                            }
                                            n = n + 4 | 0;
                                            o = w(c[s + (p * 28 | 0) >> 2] | 0, o) | 0;
                                        } while (n >>> 0 < t >>> 0);
                                        h = 0;
                                    }
                                    else
                                        h = 0;
                                }
                                else
                                    h = 0;
                            }
                        while (0);
                        c[e + 28 >> 2] = i;
                        c[e + 24 >> 2] = g;
                        c[e + 32 >> 2] = h;
                        e = e + 36 | 0;
                    } while (e >>> 0 < v >>> 0);
                } da = b + 4 | 0; h = c[da >> 2] | 0; ea = b + 52 | 0; e = c[ea >> 2] | 0; g = e + (h << 2) | 0; j = (h | 0) > 0; if (j) {
                    do {
                        W = +f[e >> 2];
                        f[e >> 2] = W < 0.0 ? 0.0 : W > 1.0 ? 1.0 : W;
                        e = e + 4 | 0;
                    } while (e >>> 0 < g >>> 0);
                    g = b + 8 | 0;
                    i = c[g >> 2] | 0;
                    l = i + (h << 3) | 0;
                    m = c[fa >> 2] | 0;
                    e = b + 36 | 0;
                    n = c[e >> 2] | 0;
                    if (j) {
                        h = c[b + 40 >> 2] | 0;
                        j = n;
                        while (1) {
                            do
                                if (!(c[i + 4 >> 2] | 0))
                                    k = 0;
                                else {
                                    ba = c[i >> 2] | 0;
                                    if ((ba | 0) != -1 ? (c[n + (ba << 2) >> 2] | 0) == 0 : 0) {
                                        k = 0;
                                        break;
                                    }
                                    k = (c[m + ((c[h >> 2] | 0) * 36 | 0) + 32 >> 2] | 0) == 0;
                                }
                            while (0);
                            c[j >> 2] = k & 1;
                            i = i + 8 | 0;
                            if (i >>> 0 >= l >>> 0)
                                break;
                            else {
                                h = h + 4 | 0;
                                j = j + 4 | 0;
                            }
                        }
                        s = c[fa >> 2] | 0;
                        t = c[da >> 2] | 0;
                        h = c[b >> 2] | 0;
                        u = c[h + 724 >> 2] | 0;
                        if ((t | 0) > 0) {
                            v = b + 20 | 0;
                            x = b + 28 | 0;
                            n = h + 936 | 0;
                            o = b + 16 | 0;
                            k = c[b + 40 >> 2] | 0;
                            l = 0;
                            m = 0;
                            while (1) {
                                p = c[k >> 2] | 0;
                                h = s + (p * 36 | 0) + 24 | 0;
                                if (!((c[h >> 2] | 0) == 0 ? !(c[s + (p * 36 | 0) + 28 >> 2] | 0) : 0))
                                    ja = 108;
                                if (((ja | 0) == 108 ? (ja = 0, E = s + (p * 36 | 0) + 8 | 0, c[(c[o >> 2] | 0) + (m << 2) >> 2] = c[E >> 2], c[h >> 2] | 0) : 0) ? (F = c[u + (m << 2) >> 2] | 0, G = c[s + (p * 36 | 0) + 16 >> 2] | 0, ba = c[E >> 2] | 0, H = G + (ba << 2) | 0, (ba | 0) > 0) : 0) {
                                    j = c[n >> 2] | 0;
                                    h = (c[x >> 2] | 0) + (l << 2) | 0;
                                    i = G;
                                    while (1) {
                                        c[h >> 2] = c[j + ((c[i >> 2] | 0) + F << 2) >> 2];
                                        i = i + 4 | 0;
                                        if (i >>> 0 >= H >>> 0)
                                            break;
                                        else
                                            h = h + 4 | 0;
                                    }
                                }
                                if (c[s + (p * 36 | 0) + 28 >> 2] | 0 ? (I = c[s + (p * 36 | 0) + 20 >> 2] | 0, ba = c[s + (p * 36 | 0) + 8 >> 2] | 0, J = I + (ba << 2) | 0, (ba | 0) > 0) : 0) {
                                    h = I;
                                    i = (c[v >> 2] | 0) + (l << 2) | 0;
                                    while (1) {
                                        c[i >> 2] = c[h >> 2];
                                        h = h + 4 | 0;
                                        if (h >>> 0 >= J >>> 0)
                                            break;
                                        else
                                            i = i + 4 | 0;
                                    }
                                }
                                m = m + 1 | 0;
                                if ((m | 0) == (t | 0)) {
                                    ba = e;
                                    X = b;
                                    _ = g;
                                    break;
                                }
                                else {
                                    k = k + 4 | 0;
                                    l = (c[s + (p * 36 | 0) + 4 >> 2] | 0) + l | 0;
                                }
                            }
                        }
                        else {
                            ba = e;
                            X = b;
                            _ = g;
                        }
                    }
                    else
                        ja = 103;
                }
                else {
                    e = b + 36 | 0;
                    g = b + 8 | 0;
                    ja = 103;
                } if ((ja | 0) == 103) {
                    ba = e;
                    X = b;
                    _ = g;
                } Ua(b); aa = b + 60 | 0; e = c[aa >> 2] | 0; T = c[b + 56 >> 2] | 0; j = e + (T << 5) | 0; k = c[fa >> 2] | 0; l = c[ba >> 2] | 0; $ = b + 168 | 0; m = c[$ >> 2] | 0; n = c[b + 172 >> 2] | 0; o = c[b + 176 >> 2] | 0; if ((T | 0) > 0) {
                    h = c[b + 180 >> 2] | 0;
                    i = m;
                    while (1) {
                        do
                            if (!(c[e + 28 >> 2] | 0))
                                g = 0;
                            else {
                                T = c[e >> 2] | 0;
                                if ((T | 0) != -1 ? (c[l + (T << 2) >> 2] | 0) == 0 : 0) {
                                    g = 0;
                                    break;
                                }
                                T = c[e + 4 >> 2] | 0;
                                if ((T | 0) != -1 ? (c[m + (T << 2) >> 2] | 0) == 0 : 0) {
                                    g = 0;
                                    break;
                                }
                                g = (c[k + ((c[h >> 2] | 0) * 36 | 0) + 32 >> 2] | 0) == 0;
                            }
                        while (0);
                        g = g & 1;
                        c[i >> 2] = g;
                        switch (c[e + 8 >> 2] | 0) {
                            case 0: {
                                c[n + (c[e + 12 >> 2] << 2) >> 2] = g;
                                break;
                            }
                            case 1: {
                                c[o + (c[e + 12 >> 2] << 2) >> 2] = g;
                                break;
                            }
                            default: ca(4, 2350, K);
                        }
                        e = e + 32 | 0;
                        if (e >>> 0 >= j >>> 0)
                            break;
                        else {
                            h = h + 4 | 0;
                            i = i + 4 | 0;
                        }
                    }
                    k = c[fa >> 2] | 0;
                } e = c[X >> 2] | 0; p = c[e + 784 >> 2] | 0; s = c[b + 64 >> 2] | 0; t = c[e + 988 >> 2] | 0; if ((s | 0) > 0) {
                    u = b + 88 | 0;
                    v = b + 100 | 0;
                    x = b + 96 | 0;
                    y = e + 944 | 0;
                    m = e + 940 | 0;
                    n = b + 84 | 0;
                    i = 0;
                    j = 0;
                    l = c[b + 184 >> 2] | 0;
                    while (1) {
                        o = c[l >> 2] | 0;
                        e = k + (o * 36 | 0) + 24 | 0;
                        if (!((c[e >> 2] | 0) == 0 ? !(c[k + (o * 36 | 0) + 28 >> 2] | 0) : 0))
                            ja = 135;
                        if (((ja | 0) == 135 ? (ja = 0, L = k + (o * 36 | 0) + 8 | 0, c[(c[n >> 2] | 0) + (j << 2) >> 2] = c[L >> 2], c[e >> 2] | 0) : 0) ? (M = c[p + (j << 2) >> 2] | 0, N = c[k + (o * 36 | 0) + 16 >> 2] | 0, T = c[L >> 2] | 0, O = N + (T << 2) | 0, (T | 0) > 0) : 0) {
                            e = N;
                            g = (c[x >> 2] | 0) + (i << 2) | 0;
                            h = (c[v >> 2] | 0) + (i << 2) | 0;
                            while (1) {
                                T = (c[e >> 2] | 0) + M | 0;
                                c[h >> 2] = t + (c[(c[y >> 2] | 0) + (T << 2) >> 2] << 2);
                                c[g >> 2] = c[(c[m >> 2] | 0) + (T << 2) >> 2];
                                e = e + 4 | 0;
                                if (e >>> 0 >= O >>> 0)
                                    break;
                                else {
                                    g = g + 4 | 0;
                                    h = h + 4 | 0;
                                }
                            }
                        }
                        if (c[k + (o * 36 | 0) + 28 >> 2] | 0 ? (P = c[k + (o * 36 | 0) + 20 >> 2] | 0, T = c[k + (o * 36 | 0) + 8 >> 2] | 0, Q = P + (T << 2) | 0, (T | 0) > 0) : 0) {
                            e = P;
                            g = (c[u >> 2] | 0) + (i << 2) | 0;
                            while (1) {
                                c[g >> 2] = c[e >> 2];
                                e = e + 4 | 0;
                                if (e >>> 0 >= Q >>> 0)
                                    break;
                                else
                                    g = g + 4 | 0;
                            }
                        }
                        j = j + 1 | 0;
                        if ((j | 0) == (s | 0))
                            break;
                        else {
                            i = (c[k + (o * 36 | 0) + 4 >> 2] | 0) + i | 0;
                            l = l + 4 | 0;
                        }
                    }
                    e = c[X >> 2] | 0;
                    k = c[fa >> 2] | 0;
                } E = c[e + 808 >> 2] | 0; F = c[b + 72 >> 2] | 0; G = c[b + 76 >> 2] | 0; if ((F | 0) > 0) {
                    H = b + 120 | 0;
                    I = b + 132 | 0;
                    J = b + 136 | 0;
                    K = b + 140 | 0;
                    L = b + 144 | 0;
                    M = b + 128 | 0;
                    N = e + 968 | 0;
                    O = e + 972 | 0;
                    P = e + 952 | 0;
                    Q = e + 956 | 0;
                    S = e + 960 | 0;
                    T = e + 964 | 0;
                    A = e + 948 | 0;
                    C = b + 116 | 0;
                    x = c[b + 188 >> 2] | 0;
                    y = 0;
                    z = 0;
                    while (1) {
                        D = c[x >> 2] | 0;
                        e = k + (D * 36 | 0) + 24 | 0;
                        if (!((c[e >> 2] | 0) == 0 ? !(c[k + (D * 36 | 0) + 28 >> 2] | 0) : 0))
                            ja = 149;
                        if ((ja | 0) == 149 ? (ja = 0, ga = k + (D * 36 | 0) + 8 | 0, c[(c[C >> 2] | 0) + (z << 2) >> 2] = c[ga >> 2], c[e >> 2] | 0) : 0) {
                            m = c[E + (z << 2) >> 2] | 0;
                            n = c[k + (D * 36 | 0) + 16 >> 2] | 0;
                            v = c[ga >> 2] | 0;
                            o = n + (v << 2) | 0;
                            if ((v | 0) > 0) {
                                p = c[P >> 2] | 0;
                                s = c[Q >> 2] | 0;
                                t = c[S >> 2] | 0;
                                u = c[T >> 2] | 0;
                                v = c[A >> 2] | 0;
                                e = (c[M >> 2] | 0) + (y << 2) | 0;
                                g = (c[L >> 2] | 0) + (y << 2) | 0;
                                h = (c[K >> 2] | 0) + (y << 2) | 0;
                                i = (c[J >> 2] | 0) + (y << 2) | 0;
                                j = (c[I >> 2] | 0) + (y << 2) | 0;
                                l = n;
                                while (1) {
                                    va = (c[l >> 2] | 0) + m | 0;
                                    c[j >> 2] = c[p + (va << 2) >> 2];
                                    c[i >> 2] = c[s + (va << 2) >> 2];
                                    c[h >> 2] = c[t + (va << 2) >> 2];
                                    c[g >> 2] = c[u + (va << 2) >> 2];
                                    c[e >> 2] = c[v + (va << 2) >> 2];
                                    l = l + 4 | 0;
                                    if (l >>> 0 >= o >>> 0)
                                        break;
                                    else {
                                        e = e + 4 | 0;
                                        g = g + 4 | 0;
                                        h = h + 4 | 0;
                                        i = i + 4 | 0;
                                        j = j + 4 | 0;
                                    }
                                }
                            }
                            va = (c[n >> 2] | 0) + m | 0;
                            c[G + (z << 5) + 24 >> 2] = c[(c[N >> 2] | 0) + (va << 2) >> 2];
                            c[G + (z << 5) + 28 >> 2] = c[(c[O >> 2] | 0) + (va << 2) >> 2];
                        }
                        if (c[k + (D * 36 | 0) + 28 >> 2] | 0 ? (ha = c[k + (D * 36 | 0) + 20 >> 2] | 0, va = c[k + (D * 36 | 0) + 8 >> 2] | 0, ia = ha + (va << 2) | 0, (va | 0) > 0) : 0) {
                            e = ha;
                            g = (c[H >> 2] | 0) + (y << 2) | 0;
                            while (1) {
                                c[g >> 2] = c[e >> 2];
                                e = e + 4 | 0;
                                if (e >>> 0 >= ia >>> 0)
                                    break;
                                else
                                    g = g + 4 | 0;
                            }
                        }
                        z = z + 1 | 0;
                        if ((z | 0) == (F | 0))
                            break;
                        else {
                            x = x + 4 | 0;
                            y = (c[k + (D * 36 | 0) + 4 >> 2] | 0) + y | 0;
                        }
                    }
                } Va(b); Wa(b); D = b + 204 | 0; e = c[D >> 2] | 0; E = b + 200 | 0; va = c[E >> 2] | 0; l = e + (va << 4) | 0; C = c[fa >> 2] | 0; j = c[ba >> 2] | 0; k = c[$ >> 2] | 0; if ((va | 0) > 0) {
                    g = c[b + 252 >> 2] | 0;
                    h = c[b + 248 >> 2] | 0;
                    while (1) {
                        do
                            if (!(c[e + 8 >> 2] | 0))
                                i = 0;
                            else {
                                va = c[e >> 2] | 0;
                                if ((va | 0) != -1 ? (c[j + (va << 2) >> 2] | 0) == 0 : 0) {
                                    i = 0;
                                    break;
                                }
                                va = c[e + 4 >> 2] | 0;
                                if ((va | 0) != -1 ? (c[k + (va << 2) >> 2] | 0) == 0 : 0) {
                                    i = 0;
                                    break;
                                }
                                i = (c[C + ((c[g >> 2] | 0) * 36 | 0) + 32 >> 2] | 0) == 0;
                            }
                        while (0);
                        c[h >> 2] = i & 1;
                        e = e + 16 | 0;
                        if (e >>> 0 >= l >>> 0)
                            break;
                        else {
                            g = g + 4 | 0;
                            h = h + 4 | 0;
                        }
                    }
                    A = c[E >> 2] | 0;
                    e = c[X >> 2] | 0;
                    p = c[e + 844 >> 2] | 0;
                    s = c[e + 988 >> 2] | 0;
                    if ((A | 0) > 0) {
                        t = b + 216 | 0;
                        u = b + 232 | 0;
                        v = b + 224 | 0;
                        x = b + 228 | 0;
                        y = e + 984 | 0;
                        z = e + 976 | 0;
                        m = e + 980 | 0;
                        n = b + 212 | 0;
                        j = c[b + 252 >> 2] | 0;
                        k = 0;
                        l = 0;
                        while (1) {
                            o = c[j >> 2] | 0;
                            e = C + (o * 36 | 0) + 24 | 0;
                            if (!((c[e >> 2] | 0) == 0 ? !(c[C + (o * 36 | 0) + 28 >> 2] | 0) : 0))
                                ja = 172;
                            if (((ja | 0) == 172 ? (ja = 0, ka = C + (o * 36 | 0) + 8 | 0, c[(c[n >> 2] | 0) + (l << 2) >> 2] = c[ka >> 2], c[e >> 2] | 0) : 0) ? (la = c[p + (l << 2) >> 2] | 0, ma = c[C + (o * 36 | 0) + 16 >> 2] | 0, va = c[ka >> 2] | 0, na = ma + (va << 2) | 0, (va | 0) > 0) : 0) {
                                e = (c[x >> 2] | 0) + (k << 2) | 0;
                                g = (c[v >> 2] | 0) + (k << 2) | 0;
                                h = (c[u >> 2] | 0) + (k << 2) | 0;
                                i = ma;
                                while (1) {
                                    va = (c[i >> 2] | 0) + la | 0;
                                    c[h >> 2] = s + (c[(c[y >> 2] | 0) + (va << 2) >> 2] << 2);
                                    c[g >> 2] = c[(c[z >> 2] | 0) + (va << 2) >> 2];
                                    c[e >> 2] = c[(c[m >> 2] | 0) + (va << 2) >> 2];
                                    i = i + 4 | 0;
                                    if (i >>> 0 >= na >>> 0)
                                        break;
                                    else {
                                        e = e + 4 | 0;
                                        g = g + 4 | 0;
                                        h = h + 4 | 0;
                                    }
                                }
                            }
                            if (c[C + (o * 36 | 0) + 28 >> 2] | 0 ? (oa = c[C + (o * 36 | 0) + 20 >> 2] | 0, va = c[C + (o * 36 | 0) + 8 >> 2] | 0, pa = oa + (va << 2) | 0, (va | 0) > 0) : 0) {
                                e = oa;
                                g = (c[t >> 2] | 0) + (k << 2) | 0;
                                while (1) {
                                    c[g >> 2] = c[e >> 2];
                                    e = e + 4 | 0;
                                    if (e >>> 0 >= pa >>> 0)
                                        break;
                                    else
                                        g = g + 4 | 0;
                                }
                            }
                            l = l + 1 | 0;
                            if ((l | 0) == (A | 0))
                                break;
                            else {
                                j = j + 4 | 0;
                                k = (c[C + (o * 36 | 0) + 4 >> 2] | 0) + k | 0;
                            }
                        }
                    }
                } Xa(b); ab(b); bb(b); e = c[_ >> 2] | 0; va = c[da >> 2] | 0; j = e + (va << 3) | 0; k = b + 48 | 0; o = c[k >> 2] | 0; if ((va | 0) > 0) {
                    g = c[ea >> 2] | 0;
                    h = c[ba >> 2] | 0;
                    i = o;
                    while (1) {
                        if (c[h >> 2] | 0 ? (ra = +f[g >> 2], f[i >> 2] = ra, sa = c[e >> 2] | 0, (sa | 0) != -1) : 0)
                            f[i >> 2] = ra * +f[o + (sa << 2) >> 2];
                        e = e + 8 | 0;
                        if (e >>> 0 >= j >>> 0)
                            break;
                        else {
                            g = g + 4 | 0;
                            h = h + 4 | 0;
                            i = i + 4 | 0;
                        }
                    }
                } i = b + 56 | 0; j = c[i >> 2] | 0; if ((j | 0) > 0) {
                    e = c[$ >> 2] | 0;
                    g = c[aa >> 2] | 0;
                    h = 0;
                    while (1) {
                        if (c[e >> 2] | 0)
                            Y[c[g + 16 >> 2] & 3](g, h, i);
                        h = h + 1 | 0;
                        if ((h | 0) == (j | 0))
                            break;
                        else {
                            e = e + 4 | 0;
                            g = g + 32 | 0;
                        }
                    }
                    o = c[k >> 2] | 0;
                } e = c[D >> 2] | 0; va = c[E >> 2] | 0; m = e + (va << 4) | 0; n = c[b + 192 >> 2] | 0; k = c[aa >> 2] | 0; if ((va | 0) > 0) {
                    l = b + 248 | 0;
                    h = c[l >> 2] | 0;
                    i = c[b + 276 >> 2] | 0;
                    j = c[b + 272 >> 2] | 0;
                    while (1) {
                        if (c[h >> 2] | 0) {
                            g = c[e >> 2] | 0;
                            if ((g | 0) != -1)
                                f[i >> 2] = +f[o + (g << 2) >> 2] * +f[i >> 2];
                            g = c[e + 4 >> 2] | 0;
                            if ((g | 0) != -1) {
                                f[i >> 2] = +f[n + (g << 2) >> 2] * +f[i >> 2];
                                va = c[j >> 2] | 0;
                                Z[c[k + (g << 5) + 20 >> 2] & 3](c[k + (g << 5) + 24 >> 2] | 0, va, va, c[e + 12 >> 2] | 0);
                            }
                        }
                        e = e + 16 | 0;
                        if (e >>> 0 >= m >>> 0)
                            break;
                        else {
                            h = h + 4 | 0;
                            i = i + 4 | 0;
                            j = j + 4 | 0;
                        }
                    }
                }
                else
                    l = b + 248 | 0; cb(b); db(b); z = c[b + 320 >> 2] | 0; A = c[b + 324 >> 2] | 0; o = A + (z * 28 | 0) | 0; C = b + 268 | 0; h = c[C >> 2] | 0; p = c[b + 44 >> 2] | 0; j = c[ba >> 2] | 0; g = c[l >> 2] | 0; if ((z | 0) > 0) {
                    i = A;
                    do {
                        k = c[i + 4 >> 2] | 0;
                        if ((k | 0) > 0) {
                            m = c[i + 12 >> 2] | 0;
                            n = i + 20 | 0;
                            e = 0;
                            do {
                                va = c[m + (e << 4) + 4 >> 2] | 0;
                                sa = (c[m + (e << 4) >> 2] | 0) == 1;
                                c[m + (e << 4) + 12 >> 2] = c[((c[(sa ? j : g) + (va << 2) >> 2] | 0) == 0 ? n : (sa ? p : h) + (va << 2) | 0) >> 2];
                                e = e + 1 | 0;
                            } while ((e | 0) != (k | 0));
                        }
                        i = i + 28 | 0;
                    } while (i >>> 0 < o >>> 0);
                    t = c[b + 264 >> 2] | 0;
                    u = b + 328 | 0;
                    v = b + 336 | 0;
                    x = b + 332 | 0;
                    s = 0;
                    do {
                        y = A + (s * 28 | 0) + 24 | 0;
                        if ((c[y >> 2] | 0) > 0) {
                            i = c[u >> 2] | 0;
                            e = 0;
                            do {
                                c[i + (e << 2) >> 2] = -1;
                                e = e + 1 | 0;
                                j = c[y >> 2] | 0;
                            } while ((e | 0) < (j | 0));
                            if ((j | 0) > 0) {
                                i = c[v >> 2] | 0;
                                e = 0;
                                do {
                                    c[i + (e << 2) >> 2] = -1;
                                    e = e + 1 | 0;
                                } while ((e | 0) < (c[y >> 2] | 0));
                            }
                        }
                        m = A + (s * 28 | 0) + 4 | 0;
                        if ((c[m >> 2] | 0) > 0) {
                            i = c[x >> 2] | 0;
                            e = 0;
                            do {
                                c[i + (e << 2) >> 2] = -1;
                                e = e + 1 | 0;
                                j = c[m >> 2] | 0;
                            } while ((e | 0) < (j | 0));
                            if ((j | 0) > 0) {
                                k = A + (s * 28 | 0) + 20 | 0;
                                i = c[A + (s * 28 | 0) + 12 >> 2] | 0;
                                j = c[v >> 2] | 0;
                                e = 0;
                                do {
                                    pa = (c[i + (e << 4) + 12 >> 2] | 0) - (c[k >> 2] | 0) | 0;
                                    va = j + (pa << 2) | 0;
                                    sa = c[va >> 2] | 0;
                                    oa = (sa | 0) == -1;
                                    c[(c[(oa ? u : x) >> 2] | 0) + ((oa ? pa : sa) << 2) >> 2] = e;
                                    c[va >> 2] = e;
                                    e = e + 1 | 0;
                                } while ((e | 0) < (c[m >> 2] | 0));
                            }
                        }
                        e = c[y >> 2] | 0;
                        if ((e | 0) > 0) {
                            o = c[u >> 2] | 0;
                            p = A + (s * 28 | 0) + 12 | 0;
                            n = 0;
                            i = c[A + (s * 28 | 0) + 8 >> 2] | 0;
                            do {
                                j = c[o + (n << 2) >> 2] | 0;
                                if ((j | 0) != -1) {
                                    k = c[p >> 2] | 0;
                                    m = c[x >> 2] | 0;
                                    do {
                                        if ((c[k + (j << 4) >> 2] | 0) == 1) {
                                            e = c[k + (j << 4) + 8 >> 2] | 0;
                                            c[A + (e * 28 | 0) + 8 >> 2] = i;
                                            e = c[A + (e * 28 | 0) >> 2] | 0;
                                        }
                                        else {
                                            c[t + (c[k + (j << 4) + 4 >> 2] << 2) >> 2] = i;
                                            e = 1;
                                        }
                                        i = e + i | 0;
                                        va = j;
                                        j = c[m + (j << 2) >> 2] | 0;
                                    } while (!((j | 0) <= (va | 0) | (j | 0) == -1));
                                    e = c[y >> 2] | 0;
                                }
                                n = n + 1 | 0;
                            } while ((n | 0) < (e | 0));
                        }
                        s = s + 1 | 0;
                    } while ((s | 0) != (z | 0));
                } p = c[E >> 2] | 0; if (c[qa >> 2] | 0) {
                    c[ta >> 2] = 0;
                    if ((p | 0) <= 0) {
                        c[qa >> 2] = 0;
                        R = ua;
                        return;
                    }
                    i = b + 260 | 0;
                    h = b + 276 | 0;
                    e = 0;
                    while (1) {
                        if ((c[g + (e << 2) >> 2] | 0) != 0 ? +f[(c[h >> 2] | 0) + (e << 2) >> 2] != 0.0 : 0)
                            g = 63;
                        else
                            g = 62;
                        a[(c[i >> 2] | 0) + e >> 0] = g;
                        e = e + 1 | 0;
                        if ((e | 0) == (p | 0))
                            break;
                        g = c[l >> 2] | 0;
                    }
                    c[qa >> 2] = 0;
                    R = ua;
                    return;
                } if (c[ta >> 2] | 0) {
                    c[ta >> 2] = 0;
                    if ((p | 0) <= 0) {
                        c[qa >> 2] = 0;
                        R = ua;
                        return;
                    }
                    j = b + 260 | 0;
                    k = b + 276 | 0;
                    m = b + 288 | 0;
                    n = b + 284 | 0;
                    o = b + 264 | 0;
                    i = b + 280 | 0;
                    e = 0;
                    while (1) {
                        ta = (c[g + (e << 2) >> 2] | 0) == 0;
                        ra = +f[(c[k >> 2] | 0) + (e << 2) >> 2];
                        b = ra != 0.0 & (ta ^ 1) & 1;
                        va = (c[j >> 2] | 0) + e | 0;
                        b = (a[va >> 0] & 1) == b << 24 >> 24 ? b : b | 2;
                        b = ra != +f[(c[m >> 2] | 0) + (e << 2) >> 2] ? b | 4 : b;
                        b = (c[h + (e << 2) >> 2] | 0) == (c[(c[n >> 2] | 0) + (e << 2) >> 2] | 0) ? b : b | 8;
                        b = (c[(c[o >> 2] | 0) + (e << 2) >> 2] | 0) == (c[(c[i >> 2] | 0) + (e << 2) >> 2] | 0) ? b : b | 16;
                        a[va >> 0] = ta ? b : b | 32;
                        e = e + 1 | 0;
                        if ((e | 0) == (p | 0))
                            break;
                        g = c[l >> 2] | 0;
                        h = c[C >> 2] | 0;
                    }
                    c[qa >> 2] = 0;
                    R = ua;
                    return;
                } if ((p | 0) <= 0) {
                    c[qa >> 2] = 0;
                    R = ua;
                    return;
                } k = b + 260 | 0; j = b + 276 | 0; e = 0; while (1) {
                    i = (c[k >> 2] | 0) + e | 0;
                    h = d[i >> 0] | 0;
                    if ((c[g + (e << 2) >> 2] | 0) != 0 ? +f[(c[j >> 2] | 0) + (e << 2) >> 2] != 0.0 : 0)
                        g = h | 1;
                    else
                        g = h & 254;
                    a[i >> 0] = g;
                    e = e + 1 | 0;
                    if ((e | 0) == (p | 0))
                        break;
                    g = c[l >> 2] | 0;
                } c[qa >> 2] = 0; R = ua; return; }
                function fb(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0; d = R; R = R + 272 | 0; e = d + 16 | 0; f = d; c[f >> 2] = b; zb(e, 256, a, f) | 0; gb(e); R = d; return; }
                function gb(a) { a = a | 0; var b = 0, d = 0, e = 0; b = R; R = R + 16 | 0; d = b; e = c[124] | 0; c[d >> 2] = a; Xb(e, 2410, d) | 0; R = b; return; }
                function hb(a) { a = a | 0; var b = 0, d = 0; d = R; R = R + 16 | 0; b = d; pb(b, 64, a) | 0; R = d; return c[b >> 2] | 0; }
                function ib(a) { a = a | 0; var b = 0, d = 0, e = 0; e = R; R = R + 16 | 0; d = e; if ((a | 0) != 0 ? (b = ma(a) | 0, (pb(d, 16, b) | 0) == 0) : 0) {
                    a = na(a, c[d >> 2] | 0, b) | 0;
                    if (!a) {
                        mb(c[d >> 2] | 0);
                        a = 0;
                    }
                }
                else
                    a = 0; R = e; return a | 0; }
                function jb(a) { a = a | 0; return lb(a) | 0; }
                function kb(a) { a = a | 0; mb(a); return; }
                function lb(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0; w = R; R = R + 16 | 0; n = w; do
                    if (a >>> 0 < 245) {
                        k = a >>> 0 < 11 ? 16 : a + 11 & -8;
                        a = 3 ? k >>> 3 : k;
                        m = c[881] | 0;
                        d = a ? m >>> a : m;
                        if (d & 3 | 0) {
                            b = (d & 1 ^ 1) + a | 0;
                            a = 3564 + (b << 1 << 2) | 0;
                            d = a + 8 | 0;
                            e = c[d >> 2] | 0;
                            f = e + 8 | 0;
                            g = c[f >> 2] | 0;
                            if ((g | 0) == (a | 0))
                                c[881] = m & ~(1 << b);
                            else {
                                c[g + 12 >> 2] = a;
                                c[d >> 2] = g;
                            }
                            v = b << 3;
                            c[e + 4 >> 2] = v | 3;
                            v = e + v + 4 | 0;
                            c[v >> 2] = c[v >> 2] | 1;
                            v = f;
                            R = w;
                            return v | 0;
                        }
                        l = c[883] | 0;
                        if (k >>> 0 > l >>> 0) {
                            if (d | 0) {
                                e = 2 << a;
                                e = d << a & (e | 0 - e);
                                e = (e & 0 - e) + -1 | 0;
                                i = (12 ? e >>> 12 : e) & 16;
                                e = i ? e >>> i : e;
                                d = (5 ? e >>> 5 : e) & 8;
                                e = d ? e >>> d : e;
                                g = (2 ? e >>> 2 : e) & 4;
                                e = g ? e >>> g : e;
                                a = (1 ? e >>> 1 : e) & 2;
                                e = a ? e >>> a : e;
                                b = (1 ? e >>> 1 : e) & 1;
                                e = (d | i | g | a | b) + (b ? e >>> b : e) | 0;
                                b = 3564 + (e << 1 << 2) | 0;
                                a = b + 8 | 0;
                                g = c[a >> 2] | 0;
                                i = g + 8 | 0;
                                d = c[i >> 2] | 0;
                                if ((d | 0) == (b | 0)) {
                                    a = m & ~(1 << e);
                                    c[881] = a;
                                }
                                else {
                                    c[d + 12 >> 2] = b;
                                    c[a >> 2] = d;
                                    a = m;
                                }
                                v = e << 3;
                                h = v - k | 0;
                                c[g + 4 >> 2] = k | 3;
                                f = g + k | 0;
                                c[f + 4 >> 2] = h | 1;
                                c[g + v >> 2] = h;
                                if (l | 0) {
                                    e = c[886] | 0;
                                    b = 3 ? l >>> 3 : l;
                                    d = 3564 + (b << 1 << 2) | 0;
                                    b = 1 << b;
                                    if (!(a & b)) {
                                        c[881] = a | b;
                                        b = d;
                                        a = d + 8 | 0;
                                    }
                                    else {
                                        a = d + 8 | 0;
                                        b = c[a >> 2] | 0;
                                    }
                                    c[a >> 2] = e;
                                    c[b + 12 >> 2] = e;
                                    c[e + 8 >> 2] = b;
                                    c[e + 12 >> 2] = d;
                                }
                                c[883] = h;
                                c[886] = f;
                                v = i;
                                R = w;
                                return v | 0;
                            }
                            g = c[882] | 0;
                            if (g) {
                                j = (g & 0 - g) + -1 | 0;
                                f = (12 ? j >>> 12 : j) & 16;
                                j = f ? j >>> f : j;
                                e = (5 ? j >>> 5 : j) & 8;
                                j = e ? j >>> e : j;
                                h = (2 ? j >>> 2 : j) & 4;
                                j = h ? j >>> h : j;
                                i = (1 ? j >>> 1 : j) & 2;
                                j = i ? j >>> i : j;
                                d = (1 ? j >>> 1 : j) & 1;
                                j = c[3828 + ((e | f | h | i | d) + (d ? j >>> d : j) << 2) >> 2] | 0;
                                d = j;
                                i = j;
                                j = (c[j + 4 >> 2] & -8) - k | 0;
                                while (1) {
                                    a = c[d + 16 >> 2] | 0;
                                    if (!a) {
                                        a = c[d + 20 >> 2] | 0;
                                        if (!a)
                                            break;
                                    }
                                    h = (c[a + 4 >> 2] & -8) - k | 0;
                                    f = h >>> 0 < j >>> 0;
                                    d = a;
                                    i = f ? a : i;
                                    j = f ? h : j;
                                }
                                h = i + k | 0;
                                if (h >>> 0 > i >>> 0) {
                                    f = c[i + 24 >> 2] | 0;
                                    b = c[i + 12 >> 2] | 0;
                                    do
                                        if ((b | 0) == (i | 0)) {
                                            a = i + 20 | 0;
                                            b = c[a >> 2] | 0;
                                            if (!b) {
                                                a = i + 16 | 0;
                                                b = c[a >> 2] | 0;
                                                if (!b) {
                                                    d = 0;
                                                    break;
                                                }
                                            }
                                            while (1) {
                                                e = b + 20 | 0;
                                                d = c[e >> 2] | 0;
                                                if (!d) {
                                                    e = b + 16 | 0;
                                                    d = c[e >> 2] | 0;
                                                    if (!d)
                                                        break;
                                                    else {
                                                        b = d;
                                                        a = e;
                                                    }
                                                }
                                                else {
                                                    b = d;
                                                    a = e;
                                                }
                                            }
                                            c[a >> 2] = 0;
                                            d = b;
                                        }
                                        else {
                                            d = c[i + 8 >> 2] | 0;
                                            c[d + 12 >> 2] = b;
                                            c[b + 8 >> 2] = d;
                                            d = b;
                                        }
                                    while (0);
                                    do
                                        if (f | 0) {
                                            b = c[i + 28 >> 2] | 0;
                                            a = 3828 + (b << 2) | 0;
                                            if ((i | 0) == (c[a >> 2] | 0)) {
                                                c[a >> 2] = d;
                                                if (!d) {
                                                    c[882] = g & ~(1 << b);
                                                    break;
                                                }
                                            }
                                            else {
                                                v = f + 16 | 0;
                                                c[((c[v >> 2] | 0) == (i | 0) ? v : f + 20 | 0) >> 2] = d;
                                                if (!d)
                                                    break;
                                            }
                                            c[d + 24 >> 2] = f;
                                            b = c[i + 16 >> 2] | 0;
                                            if (b | 0) {
                                                c[d + 16 >> 2] = b;
                                                c[b + 24 >> 2] = d;
                                            }
                                            b = c[i + 20 >> 2] | 0;
                                            if (b | 0) {
                                                c[d + 20 >> 2] = b;
                                                c[b + 24 >> 2] = d;
                                            }
                                        }
                                    while (0);
                                    if (j >>> 0 < 16) {
                                        v = j + k | 0;
                                        c[i + 4 >> 2] = v | 3;
                                        v = i + v + 4 | 0;
                                        c[v >> 2] = c[v >> 2] | 1;
                                    }
                                    else {
                                        c[i + 4 >> 2] = k | 3;
                                        c[h + 4 >> 2] = j | 1;
                                        c[h + j >> 2] = j;
                                        if (l | 0) {
                                            e = c[886] | 0;
                                            b = 3 ? l >>> 3 : l;
                                            d = 3564 + (b << 1 << 2) | 0;
                                            b = 1 << b;
                                            if (!(b & m)) {
                                                c[881] = b | m;
                                                b = d;
                                                a = d + 8 | 0;
                                            }
                                            else {
                                                a = d + 8 | 0;
                                                b = c[a >> 2] | 0;
                                            }
                                            c[a >> 2] = e;
                                            c[b + 12 >> 2] = e;
                                            c[e + 8 >> 2] = b;
                                            c[e + 12 >> 2] = d;
                                        }
                                        c[883] = j;
                                        c[886] = h;
                                    }
                                    v = i + 8 | 0;
                                    R = w;
                                    return v | 0;
                                }
                                else
                                    m = k;
                            }
                            else
                                m = k;
                        }
                        else
                            m = k;
                    }
                    else if (a >>> 0 <= 4294967231) {
                        a = a + 11 | 0;
                        k = a & -8;
                        e = c[882] | 0;
                        if (e) {
                            f = 0 - k | 0;
                            a = 8 ? a >>> 8 : a;
                            if (a)
                                if (k >>> 0 > 16777215)
                                    j = 31;
                                else {
                                    m = a + 1048320 | 0;
                                    m = (16 ? m >>> 16 : m) & 8;
                                    j = a << m;
                                    i = j + 520192 | 0;
                                    i = (16 ? i >>> 16 : i) & 4;
                                    j = j << i;
                                    q = j + 245760 | 0;
                                    q = (16 ? q >>> 16 : q) & 2;
                                    j = j << q;
                                    j = 14 - (i | m | q) + (15 ? j >>> 15 : j) | 0;
                                    q = j + 7 | 0;
                                    j = (q ? k >>> q : k) & 1 | j << 1;
                                }
                            else
                                j = 0;
                            d = c[3828 + (j << 2) >> 2] | 0;
                            a: do
                                if (!d) {
                                    d = 0;
                                    a = 0;
                                    q = 61;
                                }
                                else {
                                    a = 0;
                                    i = k << ((j | 0) == 31 ? 0 : 25 - (1 ? j >>> 1 : j) | 0);
                                    g = 0;
                                    while (1) {
                                        h = (c[d + 4 >> 2] & -8) - k | 0;
                                        if (h >>> 0 < f >>> 0)
                                            if (!h) {
                                                a = d;
                                                f = 0;
                                                q = 65;
                                                break a;
                                            }
                                            else {
                                                a = d;
                                                f = h;
                                            }
                                        q = c[d + 20 >> 2] | 0;
                                        d = c[d + 16 + ((31 ? i >>> 31 : i) << 2) >> 2] | 0;
                                        g = (q | 0) == 0 | (q | 0) == (d | 0) ? g : q;
                                        if (!d) {
                                            d = g;
                                            q = 61;
                                            break;
                                        }
                                        else
                                            i = i << 1;
                                    }
                                }
                            while (0);
                            if ((q | 0) == 61) {
                                if ((d | 0) == 0 & (a | 0) == 0) {
                                    a = 2 << j;
                                    a = (a | 0 - a) & e;
                                    if (!a) {
                                        m = k;
                                        break;
                                    }
                                    d = (a & 0 - a) + -1 | 0;
                                    h = (12 ? d >>> 12 : d) & 16;
                                    d = h ? d >>> h : d;
                                    g = (5 ? d >>> 5 : d) & 8;
                                    d = g ? d >>> g : d;
                                    i = (2 ? d >>> 2 : d) & 4;
                                    d = i ? d >>> i : d;
                                    j = (1 ? d >>> 1 : d) & 2;
                                    d = j ? d >>> j : d;
                                    m = (1 ? d >>> 1 : d) & 1;
                                    a = 0;
                                    d = c[3828 + ((g | h | i | j | m) + (m ? d >>> m : d) << 2) >> 2] | 0;
                                }
                                if (!d) {
                                    i = a;
                                    h = f;
                                }
                                else
                                    q = 65;
                            }
                            if ((q | 0) == 65) {
                                g = d;
                                while (1) {
                                    m = (c[g + 4 >> 2] & -8) - k | 0;
                                    d = m >>> 0 < f >>> 0;
                                    f = d ? m : f;
                                    a = d ? g : a;
                                    d = c[g + 16 >> 2] | 0;
                                    if (!d)
                                        d = c[g + 20 >> 2] | 0;
                                    if (!d) {
                                        i = a;
                                        h = f;
                                        break;
                                    }
                                    else
                                        g = d;
                                }
                            }
                            if (((i | 0) != 0 ? h >>> 0 < ((c[883] | 0) - k | 0) >>> 0 : 0) ? (l = i + k | 0, l >>> 0 > i >>> 0) : 0) {
                                g = c[i + 24 >> 2] | 0;
                                b = c[i + 12 >> 2] | 0;
                                do
                                    if ((b | 0) == (i | 0)) {
                                        a = i + 20 | 0;
                                        b = c[a >> 2] | 0;
                                        if (!b) {
                                            a = i + 16 | 0;
                                            b = c[a >> 2] | 0;
                                            if (!b) {
                                                b = 0;
                                                break;
                                            }
                                        }
                                        while (1) {
                                            f = b + 20 | 0;
                                            d = c[f >> 2] | 0;
                                            if (!d) {
                                                f = b + 16 | 0;
                                                d = c[f >> 2] | 0;
                                                if (!d)
                                                    break;
                                                else {
                                                    b = d;
                                                    a = f;
                                                }
                                            }
                                            else {
                                                b = d;
                                                a = f;
                                            }
                                        }
                                        c[a >> 2] = 0;
                                    }
                                    else {
                                        v = c[i + 8 >> 2] | 0;
                                        c[v + 12 >> 2] = b;
                                        c[b + 8 >> 2] = v;
                                    }
                                while (0);
                                do
                                    if (g) {
                                        a = c[i + 28 >> 2] | 0;
                                        d = 3828 + (a << 2) | 0;
                                        if ((i | 0) == (c[d >> 2] | 0)) {
                                            c[d >> 2] = b;
                                            if (!b) {
                                                e = e & ~(1 << a);
                                                c[882] = e;
                                                break;
                                            }
                                        }
                                        else {
                                            v = g + 16 | 0;
                                            c[((c[v >> 2] | 0) == (i | 0) ? v : g + 20 | 0) >> 2] = b;
                                            if (!b)
                                                break;
                                        }
                                        c[b + 24 >> 2] = g;
                                        a = c[i + 16 >> 2] | 0;
                                        if (a | 0) {
                                            c[b + 16 >> 2] = a;
                                            c[a + 24 >> 2] = b;
                                        }
                                        a = c[i + 20 >> 2] | 0;
                                        if (a) {
                                            c[b + 20 >> 2] = a;
                                            c[a + 24 >> 2] = b;
                                        }
                                    }
                                while (0);
                                b: do
                                    if (h >>> 0 < 16) {
                                        v = h + k | 0;
                                        c[i + 4 >> 2] = v | 3;
                                        v = i + v + 4 | 0;
                                        c[v >> 2] = c[v >> 2] | 1;
                                    }
                                    else {
                                        c[i + 4 >> 2] = k | 3;
                                        c[l + 4 >> 2] = h | 1;
                                        c[l + h >> 2] = h;
                                        b = 3 ? h >>> 3 : h;
                                        if (h >>> 0 < 256) {
                                            d = 3564 + (b << 1 << 2) | 0;
                                            a = c[881] | 0;
                                            b = 1 << b;
                                            if (!(a & b)) {
                                                c[881] = a | b;
                                                b = d;
                                                a = d + 8 | 0;
                                            }
                                            else {
                                                a = d + 8 | 0;
                                                b = c[a >> 2] | 0;
                                            }
                                            c[a >> 2] = l;
                                            c[b + 12 >> 2] = l;
                                            c[l + 8 >> 2] = b;
                                            c[l + 12 >> 2] = d;
                                            break;
                                        }
                                        b = 8 ? h >>> 8 : h;
                                        if (b)
                                            if (h >>> 0 > 16777215)
                                                d = 31;
                                            else {
                                                u = b + 1048320 | 0;
                                                u = (16 ? u >>> 16 : u) & 8;
                                                d = b << u;
                                                t = d + 520192 | 0;
                                                t = (16 ? t >>> 16 : t) & 4;
                                                d = d << t;
                                                v = d + 245760 | 0;
                                                v = (16 ? v >>> 16 : v) & 2;
                                                d = d << v;
                                                d = 14 - (t | u | v) + (15 ? d >>> 15 : d) | 0;
                                                v = d + 7 | 0;
                                                d = (v ? h >>> v : h) & 1 | d << 1;
                                            }
                                        else
                                            d = 0;
                                        b = 3828 + (d << 2) | 0;
                                        c[l + 28 >> 2] = d;
                                        a = l + 16 | 0;
                                        c[a + 4 >> 2] = 0;
                                        c[a >> 2] = 0;
                                        a = 1 << d;
                                        if (!(e & a)) {
                                            c[882] = e | a;
                                            c[b >> 2] = l;
                                            c[l + 24 >> 2] = b;
                                            c[l + 12 >> 2] = l;
                                            c[l + 8 >> 2] = l;
                                            break;
                                        }
                                        b = c[b >> 2] | 0;
                                        c: do
                                            if ((c[b + 4 >> 2] & -8 | 0) != (h | 0)) {
                                                e = h << ((d | 0) == 31 ? 0 : 25 - (1 ? d >>> 1 : d) | 0);
                                                while (1) {
                                                    d = b + 16 + ((31 ? e >>> 31 : e) << 2) | 0;
                                                    a = c[d >> 2] | 0;
                                                    if (!a)
                                                        break;
                                                    if ((c[a + 4 >> 2] & -8 | 0) == (h | 0)) {
                                                        b = a;
                                                        break c;
                                                    }
                                                    else {
                                                        e = e << 1;
                                                        b = a;
                                                    }
                                                }
                                                c[d >> 2] = l;
                                                c[l + 24 >> 2] = b;
                                                c[l + 12 >> 2] = l;
                                                c[l + 8 >> 2] = l;
                                                break b;
                                            }
                                        while (0);
                                        u = b + 8 | 0;
                                        v = c[u >> 2] | 0;
                                        c[v + 12 >> 2] = l;
                                        c[u >> 2] = l;
                                        c[l + 8 >> 2] = v;
                                        c[l + 12 >> 2] = b;
                                        c[l + 24 >> 2] = 0;
                                    }
                                while (0);
                                v = i + 8 | 0;
                                R = w;
                                return v | 0;
                            }
                            else
                                m = k;
                        }
                        else
                            m = k;
                    }
                    else
                        m = -1;
                while (0); d = c[883] | 0; if (d >>> 0 >= m >>> 0) {
                    b = d - m | 0;
                    a = c[886] | 0;
                    if (b >>> 0 > 15) {
                        v = a + m | 0;
                        c[886] = v;
                        c[883] = b;
                        c[v + 4 >> 2] = b | 1;
                        c[a + d >> 2] = b;
                        c[a + 4 >> 2] = m | 3;
                    }
                    else {
                        c[883] = 0;
                        c[886] = 0;
                        c[a + 4 >> 2] = d | 3;
                        v = a + d + 4 | 0;
                        c[v >> 2] = c[v >> 2] | 1;
                    }
                    v = a + 8 | 0;
                    R = w;
                    return v | 0;
                } h = c[884] | 0; if (h >>> 0 > m >>> 0) {
                    t = h - m | 0;
                    c[884] = t;
                    v = c[887] | 0;
                    u = v + m | 0;
                    c[887] = u;
                    c[u + 4 >> 2] = t | 1;
                    c[v + 4 >> 2] = m | 3;
                    v = v + 8 | 0;
                    R = w;
                    return v | 0;
                } if (!(c[999] | 0)) {
                    c[1001] = 4096;
                    c[1e3] = 4096;
                    c[1002] = -1;
                    c[1003] = -1;
                    c[1004] = 0;
                    c[992] = 0;
                    c[999] = n & -16 ^ 1431655768;
                    a = 4096;
                }
                else
                    a = c[1001] | 0; i = m + 48 | 0; j = m + 47 | 0; g = a + j | 0; f = 0 - a | 0; k = g & f; if (k >>> 0 <= m >>> 0) {
                    v = 0;
                    R = w;
                    return v | 0;
                } a = c[991] | 0; if (a | 0 ? (l = c[989] | 0, n = l + k | 0, n >>> 0 <= l >>> 0 | n >>> 0 > a >>> 0) : 0) {
                    v = 0;
                    R = w;
                    return v | 0;
                } d: do
                    if (!(c[992] & 4)) {
                        d = c[887] | 0;
                        e: do
                            if (d) {
                                e = 3972;
                                while (1) {
                                    n = c[e >> 2] | 0;
                                    if (n >>> 0 <= d >>> 0 ? (n + (c[e + 4 >> 2] | 0) | 0) >>> 0 > d >>> 0 : 0)
                                        break;
                                    a = c[e + 8 >> 2] | 0;
                                    if (!a) {
                                        q = 128;
                                        break e;
                                    }
                                    else
                                        e = a;
                                }
                                b = g - h & f;
                                if (b >>> 0 < 2147483647) {
                                    a = hc(b | 0) | 0;
                                    if ((a | 0) == ((c[e >> 2] | 0) + (c[e + 4 >> 2] | 0) | 0)) {
                                        if ((a | 0) != (-1 | 0)) {
                                            h = b;
                                            g = a;
                                            q = 145;
                                            break d;
                                        }
                                    }
                                    else {
                                        e = a;
                                        q = 136;
                                    }
                                }
                                else
                                    b = 0;
                            }
                            else
                                q = 128;
                        while (0);
                        do
                            if ((q | 0) == 128) {
                                d = hc(0) | 0;
                                if ((d | 0) != (-1 | 0) ? (b = d, o = c[1e3] | 0, p = o + -1 | 0, b = ((p & b | 0) == 0 ? 0 : (p + b & 0 - o) - b | 0) + k | 0, o = c[989] | 0, p = b + o | 0, b >>> 0 > m >>> 0 & b >>> 0 < 2147483647) : 0) {
                                    n = c[991] | 0;
                                    if (n | 0 ? p >>> 0 <= o >>> 0 | p >>> 0 > n >>> 0 : 0) {
                                        b = 0;
                                        break;
                                    }
                                    a = hc(b | 0) | 0;
                                    if ((a | 0) == (d | 0)) {
                                        h = b;
                                        g = d;
                                        q = 145;
                                        break d;
                                    }
                                    else {
                                        e = a;
                                        q = 136;
                                    }
                                }
                                else
                                    b = 0;
                            }
                        while (0);
                        do
                            if ((q | 0) == 136) {
                                d = 0 - b | 0;
                                if (!(i >>> 0 > b >>> 0 & (b >>> 0 < 2147483647 & (e | 0) != (-1 | 0))))
                                    if ((e | 0) == (-1 | 0)) {
                                        b = 0;
                                        break;
                                    }
                                    else {
                                        h = b;
                                        g = e;
                                        q = 145;
                                        break d;
                                    }
                                a = c[1001] | 0;
                                a = j - b + a & 0 - a;
                                if (a >>> 0 >= 2147483647) {
                                    h = b;
                                    g = e;
                                    q = 145;
                                    break d;
                                }
                                if ((hc(a | 0) | 0) == (-1 | 0)) {
                                    hc(d | 0) | 0;
                                    b = 0;
                                    break;
                                }
                                else {
                                    h = a + b | 0;
                                    g = e;
                                    q = 145;
                                    break d;
                                }
                            }
                        while (0);
                        c[992] = c[992] | 4;
                        q = 143;
                    }
                    else {
                        b = 0;
                        q = 143;
                    }
                while (0); if (((q | 0) == 143 ? k >>> 0 < 2147483647 : 0) ? (t = hc(k | 0) | 0, p = hc(0) | 0, r = p - t | 0, s = r >>> 0 > (m + 40 | 0) >>> 0, !((t | 0) == (-1 | 0) | s ^ 1 | t >>> 0 < p >>> 0 & ((t | 0) != (-1 | 0) & (p | 0) != (-1 | 0)) ^ 1)) : 0) {
                    h = s ? r : b;
                    g = t;
                    q = 145;
                } if ((q | 0) == 145) {
                    b = (c[989] | 0) + h | 0;
                    c[989] = b;
                    if (b >>> 0 > (c[990] | 0) >>> 0)
                        c[990] = b;
                    j = c[887] | 0;
                    f: do
                        if (j) {
                            b = 3972;
                            while (1) {
                                a = c[b >> 2] | 0;
                                d = c[b + 4 >> 2] | 0;
                                if ((g | 0) == (a + d | 0)) {
                                    q = 154;
                                    break;
                                }
                                e = c[b + 8 >> 2] | 0;
                                if (!e)
                                    break;
                                else
                                    b = e;
                            }
                            if (((q | 0) == 154 ? (u = b + 4 | 0, (c[b + 12 >> 2] & 8 | 0) == 0) : 0) ? g >>> 0 > j >>> 0 & a >>> 0 <= j >>> 0 : 0) {
                                c[u >> 2] = d + h;
                                v = (c[884] | 0) + h | 0;
                                t = j + 8 | 0;
                                t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;
                                u = j + t | 0;
                                t = v - t | 0;
                                c[887] = u;
                                c[884] = t;
                                c[u + 4 >> 2] = t | 1;
                                c[j + v + 4 >> 2] = 40;
                                c[888] = c[1003];
                                break;
                            }
                            if (g >>> 0 < (c[885] | 0) >>> 0)
                                c[885] = g;
                            d = g + h | 0;
                            b = 3972;
                            while (1) {
                                if ((c[b >> 2] | 0) == (d | 0)) {
                                    q = 162;
                                    break;
                                }
                                a = c[b + 8 >> 2] | 0;
                                if (!a)
                                    break;
                                else
                                    b = a;
                            }
                            if ((q | 0) == 162 ? (c[b + 12 >> 2] & 8 | 0) == 0 : 0) {
                                c[b >> 2] = g;
                                l = b + 4 | 0;
                                c[l >> 2] = (c[l >> 2] | 0) + h;
                                l = g + 8 | 0;
                                l = g + ((l & 7 | 0) == 0 ? 0 : 0 - l & 7) | 0;
                                b = d + 8 | 0;
                                b = d + ((b & 7 | 0) == 0 ? 0 : 0 - b & 7) | 0;
                                k = l + m | 0;
                                i = b - l - m | 0;
                                c[l + 4 >> 2] = m | 3;
                                g: do
                                    if ((j | 0) == (b | 0)) {
                                        v = (c[884] | 0) + i | 0;
                                        c[884] = v;
                                        c[887] = k;
                                        c[k + 4 >> 2] = v | 1;
                                    }
                                    else {
                                        if ((c[886] | 0) == (b | 0)) {
                                            v = (c[883] | 0) + i | 0;
                                            c[883] = v;
                                            c[886] = k;
                                            c[k + 4 >> 2] = v | 1;
                                            c[k + v >> 2] = v;
                                            break;
                                        }
                                        a = c[b + 4 >> 2] | 0;
                                        if ((a & 3 | 0) == 1) {
                                            h = a & -8;
                                            e = 3 ? a >>> 3 : a;
                                            h: do
                                                if (a >>> 0 < 256) {
                                                    a = c[b + 8 >> 2] | 0;
                                                    d = c[b + 12 >> 2] | 0;
                                                    if ((d | 0) == (a | 0)) {
                                                        c[881] = c[881] & ~(1 << e);
                                                        break;
                                                    }
                                                    else {
                                                        c[a + 12 >> 2] = d;
                                                        c[d + 8 >> 2] = a;
                                                        break;
                                                    }
                                                }
                                                else {
                                                    g = c[b + 24 >> 2] | 0;
                                                    a = c[b + 12 >> 2] | 0;
                                                    do
                                                        if ((a | 0) == (b | 0)) {
                                                            d = b + 16 | 0;
                                                            e = d + 4 | 0;
                                                            a = c[e >> 2] | 0;
                                                            if (!a) {
                                                                a = c[d >> 2] | 0;
                                                                if (!a) {
                                                                    a = 0;
                                                                    break;
                                                                }
                                                            }
                                                            else
                                                                d = e;
                                                            while (1) {
                                                                f = a + 20 | 0;
                                                                e = c[f >> 2] | 0;
                                                                if (!e) {
                                                                    f = a + 16 | 0;
                                                                    e = c[f >> 2] | 0;
                                                                    if (!e)
                                                                        break;
                                                                    else {
                                                                        a = e;
                                                                        d = f;
                                                                    }
                                                                }
                                                                else {
                                                                    a = e;
                                                                    d = f;
                                                                }
                                                            }
                                                            c[d >> 2] = 0;
                                                        }
                                                        else {
                                                            v = c[b + 8 >> 2] | 0;
                                                            c[v + 12 >> 2] = a;
                                                            c[a + 8 >> 2] = v;
                                                        }
                                                    while (0);
                                                    if (!g)
                                                        break;
                                                    d = c[b + 28 >> 2] | 0;
                                                    e = 3828 + (d << 2) | 0;
                                                    do
                                                        if ((c[e >> 2] | 0) != (b | 0)) {
                                                            v = g + 16 | 0;
                                                            c[((c[v >> 2] | 0) == (b | 0) ? v : g + 20 | 0) >> 2] = a;
                                                            if (!a)
                                                                break h;
                                                        }
                                                        else {
                                                            c[e >> 2] = a;
                                                            if (a | 0)
                                                                break;
                                                            c[882] = c[882] & ~(1 << d);
                                                            break h;
                                                        }
                                                    while (0);
                                                    c[a + 24 >> 2] = g;
                                                    d = b + 16 | 0;
                                                    e = c[d >> 2] | 0;
                                                    if (e | 0) {
                                                        c[a + 16 >> 2] = e;
                                                        c[e + 24 >> 2] = a;
                                                    }
                                                    d = c[d + 4 >> 2] | 0;
                                                    if (!d)
                                                        break;
                                                    c[a + 20 >> 2] = d;
                                                    c[d + 24 >> 2] = a;
                                                }
                                            while (0);
                                            b = b + h | 0;
                                            f = h + i | 0;
                                        }
                                        else
                                            f = i;
                                        b = b + 4 | 0;
                                        c[b >> 2] = c[b >> 2] & -2;
                                        c[k + 4 >> 2] = f | 1;
                                        c[k + f >> 2] = f;
                                        b = 3 ? f >>> 3 : f;
                                        if (f >>> 0 < 256) {
                                            d = 3564 + (b << 1 << 2) | 0;
                                            a = c[881] | 0;
                                            b = 1 << b;
                                            if (!(a & b)) {
                                                c[881] = a | b;
                                                b = d;
                                                a = d + 8 | 0;
                                            }
                                            else {
                                                a = d + 8 | 0;
                                                b = c[a >> 2] | 0;
                                            }
                                            c[a >> 2] = k;
                                            c[b + 12 >> 2] = k;
                                            c[k + 8 >> 2] = b;
                                            c[k + 12 >> 2] = d;
                                            break;
                                        }
                                        b = 8 ? f >>> 8 : f;
                                        do
                                            if (!b)
                                                e = 0;
                                            else {
                                                if (f >>> 0 > 16777215) {
                                                    e = 31;
                                                    break;
                                                }
                                                u = b + 1048320 | 0;
                                                u = (16 ? u >>> 16 : u) & 8;
                                                e = b << u;
                                                t = e + 520192 | 0;
                                                t = (16 ? t >>> 16 : t) & 4;
                                                e = e << t;
                                                v = e + 245760 | 0;
                                                v = (16 ? v >>> 16 : v) & 2;
                                                e = e << v;
                                                e = 14 - (t | u | v) + (15 ? e >>> 15 : e) | 0;
                                                v = e + 7 | 0;
                                                e = (v ? f >>> v : f) & 1 | e << 1;
                                            }
                                        while (0);
                                        b = 3828 + (e << 2) | 0;
                                        c[k + 28 >> 2] = e;
                                        a = k + 16 | 0;
                                        c[a + 4 >> 2] = 0;
                                        c[a >> 2] = 0;
                                        a = c[882] | 0;
                                        d = 1 << e;
                                        if (!(a & d)) {
                                            c[882] = a | d;
                                            c[b >> 2] = k;
                                            c[k + 24 >> 2] = b;
                                            c[k + 12 >> 2] = k;
                                            c[k + 8 >> 2] = k;
                                            break;
                                        }
                                        b = c[b >> 2] | 0;
                                        i: do
                                            if ((c[b + 4 >> 2] & -8 | 0) != (f | 0)) {
                                                e = f << ((e | 0) == 31 ? 0 : 25 - (1 ? e >>> 1 : e) | 0);
                                                while (1) {
                                                    d = b + 16 + ((31 ? e >>> 31 : e) << 2) | 0;
                                                    a = c[d >> 2] | 0;
                                                    if (!a)
                                                        break;
                                                    if ((c[a + 4 >> 2] & -8 | 0) == (f | 0)) {
                                                        b = a;
                                                        break i;
                                                    }
                                                    else {
                                                        e = e << 1;
                                                        b = a;
                                                    }
                                                }
                                                c[d >> 2] = k;
                                                c[k + 24 >> 2] = b;
                                                c[k + 12 >> 2] = k;
                                                c[k + 8 >> 2] = k;
                                                break g;
                                            }
                                        while (0);
                                        u = b + 8 | 0;
                                        v = c[u >> 2] | 0;
                                        c[v + 12 >> 2] = k;
                                        c[u >> 2] = k;
                                        c[k + 8 >> 2] = v;
                                        c[k + 12 >> 2] = b;
                                        c[k + 24 >> 2] = 0;
                                    }
                                while (0);
                                v = l + 8 | 0;
                                R = w;
                                return v | 0;
                            }
                            b = 3972;
                            while (1) {
                                a = c[b >> 2] | 0;
                                if (a >>> 0 <= j >>> 0 ? (v = a + (c[b + 4 >> 2] | 0) | 0, v >>> 0 > j >>> 0) : 0)
                                    break;
                                b = c[b + 8 >> 2] | 0;
                            }
                            f = v + -47 | 0;
                            a = f + 8 | 0;
                            a = f + ((a & 7 | 0) == 0 ? 0 : 0 - a & 7) | 0;
                            f = j + 16 | 0;
                            a = a >>> 0 < f >>> 0 ? j : a;
                            b = a + 8 | 0;
                            d = h + -40 | 0;
                            t = g + 8 | 0;
                            t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;
                            u = g + t | 0;
                            t = d - t | 0;
                            c[887] = u;
                            c[884] = t;
                            c[u + 4 >> 2] = t | 1;
                            c[g + d + 4 >> 2] = 40;
                            c[888] = c[1003];
                            d = a + 4 | 0;
                            c[d >> 2] = 27;
                            c[b >> 2] = c[993];
                            c[b + 4 >> 2] = c[994];
                            c[b + 8 >> 2] = c[995];
                            c[b + 12 >> 2] = c[996];
                            c[993] = g;
                            c[994] = h;
                            c[996] = 0;
                            c[995] = b;
                            b = a + 24 | 0;
                            do {
                                u = b;
                                b = b + 4 | 0;
                                c[b >> 2] = 7;
                            } while ((u + 8 | 0) >>> 0 < v >>> 0);
                            if ((a | 0) != (j | 0)) {
                                g = a - j | 0;
                                c[d >> 2] = c[d >> 2] & -2;
                                c[j + 4 >> 2] = g | 1;
                                c[a >> 2] = g;
                                b = 3 ? g >>> 3 : g;
                                if (g >>> 0 < 256) {
                                    d = 3564 + (b << 1 << 2) | 0;
                                    a = c[881] | 0;
                                    b = 1 << b;
                                    if (!(a & b)) {
                                        c[881] = a | b;
                                        b = d;
                                        a = d + 8 | 0;
                                    }
                                    else {
                                        a = d + 8 | 0;
                                        b = c[a >> 2] | 0;
                                    }
                                    c[a >> 2] = j;
                                    c[b + 12 >> 2] = j;
                                    c[j + 8 >> 2] = b;
                                    c[j + 12 >> 2] = d;
                                    break;
                                }
                                b = 8 ? g >>> 8 : g;
                                if (b)
                                    if (g >>> 0 > 16777215)
                                        e = 31;
                                    else {
                                        u = b + 1048320 | 0;
                                        u = (16 ? u >>> 16 : u) & 8;
                                        e = b << u;
                                        t = e + 520192 | 0;
                                        t = (16 ? t >>> 16 : t) & 4;
                                        e = e << t;
                                        v = e + 245760 | 0;
                                        v = (16 ? v >>> 16 : v) & 2;
                                        e = e << v;
                                        e = 14 - (t | u | v) + (15 ? e >>> 15 : e) | 0;
                                        v = e + 7 | 0;
                                        e = (v ? g >>> v : g) & 1 | e << 1;
                                    }
                                else
                                    e = 0;
                                d = 3828 + (e << 2) | 0;
                                c[j + 28 >> 2] = e;
                                c[j + 20 >> 2] = 0;
                                c[f >> 2] = 0;
                                b = c[882] | 0;
                                a = 1 << e;
                                if (!(b & a)) {
                                    c[882] = b | a;
                                    c[d >> 2] = j;
                                    c[j + 24 >> 2] = d;
                                    c[j + 12 >> 2] = j;
                                    c[j + 8 >> 2] = j;
                                    break;
                                }
                                b = c[d >> 2] | 0;
                                j: do
                                    if ((c[b + 4 >> 2] & -8 | 0) != (g | 0)) {
                                        e = g << ((e | 0) == 31 ? 0 : 25 - (1 ? e >>> 1 : e) | 0);
                                        while (1) {
                                            d = b + 16 + ((31 ? e >>> 31 : e) << 2) | 0;
                                            a = c[d >> 2] | 0;
                                            if (!a)
                                                break;
                                            if ((c[a + 4 >> 2] & -8 | 0) == (g | 0)) {
                                                b = a;
                                                break j;
                                            }
                                            else {
                                                e = e << 1;
                                                b = a;
                                            }
                                        }
                                        c[d >> 2] = j;
                                        c[j + 24 >> 2] = b;
                                        c[j + 12 >> 2] = j;
                                        c[j + 8 >> 2] = j;
                                        break f;
                                    }
                                while (0);
                                u = b + 8 | 0;
                                v = c[u >> 2] | 0;
                                c[v + 12 >> 2] = j;
                                c[u >> 2] = j;
                                c[j + 8 >> 2] = v;
                                c[j + 12 >> 2] = b;
                                c[j + 24 >> 2] = 0;
                            }
                        }
                        else {
                            v = c[885] | 0;
                            if ((v | 0) == 0 | g >>> 0 < v >>> 0)
                                c[885] = g;
                            c[993] = g;
                            c[994] = h;
                            c[996] = 0;
                            c[890] = c[999];
                            c[889] = -1;
                            c[894] = 3564;
                            c[893] = 3564;
                            c[896] = 3572;
                            c[895] = 3572;
                            c[898] = 3580;
                            c[897] = 3580;
                            c[900] = 3588;
                            c[899] = 3588;
                            c[902] = 3596;
                            c[901] = 3596;
                            c[904] = 3604;
                            c[903] = 3604;
                            c[906] = 3612;
                            c[905] = 3612;
                            c[908] = 3620;
                            c[907] = 3620;
                            c[910] = 3628;
                            c[909] = 3628;
                            c[912] = 3636;
                            c[911] = 3636;
                            c[914] = 3644;
                            c[913] = 3644;
                            c[916] = 3652;
                            c[915] = 3652;
                            c[918] = 3660;
                            c[917] = 3660;
                            c[920] = 3668;
                            c[919] = 3668;
                            c[922] = 3676;
                            c[921] = 3676;
                            c[924] = 3684;
                            c[923] = 3684;
                            c[926] = 3692;
                            c[925] = 3692;
                            c[928] = 3700;
                            c[927] = 3700;
                            c[930] = 3708;
                            c[929] = 3708;
                            c[932] = 3716;
                            c[931] = 3716;
                            c[934] = 3724;
                            c[933] = 3724;
                            c[936] = 3732;
                            c[935] = 3732;
                            c[938] = 3740;
                            c[937] = 3740;
                            c[940] = 3748;
                            c[939] = 3748;
                            c[942] = 3756;
                            c[941] = 3756;
                            c[944] = 3764;
                            c[943] = 3764;
                            c[946] = 3772;
                            c[945] = 3772;
                            c[948] = 3780;
                            c[947] = 3780;
                            c[950] = 3788;
                            c[949] = 3788;
                            c[952] = 3796;
                            c[951] = 3796;
                            c[954] = 3804;
                            c[953] = 3804;
                            c[956] = 3812;
                            c[955] = 3812;
                            v = h + -40 | 0;
                            t = g + 8 | 0;
                            t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;
                            u = g + t | 0;
                            t = v - t | 0;
                            c[887] = u;
                            c[884] = t;
                            c[u + 4 >> 2] = t | 1;
                            c[g + v + 4 >> 2] = 40;
                            c[888] = c[1003];
                        }
                    while (0);
                    b = c[884] | 0;
                    if (b >>> 0 > m >>> 0) {
                        t = b - m | 0;
                        c[884] = t;
                        v = c[887] | 0;
                        u = v + m | 0;
                        c[887] = u;
                        c[u + 4 >> 2] = t | 1;
                        c[v + 4 >> 2] = m | 3;
                        v = v + 8 | 0;
                        R = w;
                        return v | 0;
                    }
                } v = ub() | 0; c[v >> 2] = 12; v = 0; R = w; return v | 0; }
                function mb(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0; if (!a)
                    return; d = a + -8 | 0; f = c[885] | 0; a = c[a + -4 >> 2] | 0; b = a & -8; j = d + b | 0; do
                    if (!(a & 1)) {
                        e = c[d >> 2] | 0;
                        if (!(a & 3))
                            return;
                        h = d + (0 - e) | 0;
                        g = e + b | 0;
                        if (h >>> 0 < f >>> 0)
                            return;
                        if ((c[886] | 0) == (h | 0)) {
                            a = j + 4 | 0;
                            b = c[a >> 2] | 0;
                            if ((b & 3 | 0) != 3) {
                                i = h;
                                b = g;
                                break;
                            }
                            c[883] = g;
                            c[a >> 2] = b & -2;
                            c[h + 4 >> 2] = g | 1;
                            c[h + g >> 2] = g;
                            return;
                        }
                        d = 3 ? e >>> 3 : e;
                        if (e >>> 0 < 256) {
                            a = c[h + 8 >> 2] | 0;
                            b = c[h + 12 >> 2] | 0;
                            if ((b | 0) == (a | 0)) {
                                c[881] = c[881] & ~(1 << d);
                                i = h;
                                b = g;
                                break;
                            }
                            else {
                                c[a + 12 >> 2] = b;
                                c[b + 8 >> 2] = a;
                                i = h;
                                b = g;
                                break;
                            }
                        }
                        f = c[h + 24 >> 2] | 0;
                        a = c[h + 12 >> 2] | 0;
                        do
                            if ((a | 0) == (h | 0)) {
                                b = h + 16 | 0;
                                d = b + 4 | 0;
                                a = c[d >> 2] | 0;
                                if (!a) {
                                    a = c[b >> 2] | 0;
                                    if (!a) {
                                        a = 0;
                                        break;
                                    }
                                }
                                else
                                    b = d;
                                while (1) {
                                    e = a + 20 | 0;
                                    d = c[e >> 2] | 0;
                                    if (!d) {
                                        e = a + 16 | 0;
                                        d = c[e >> 2] | 0;
                                        if (!d)
                                            break;
                                        else {
                                            a = d;
                                            b = e;
                                        }
                                    }
                                    else {
                                        a = d;
                                        b = e;
                                    }
                                }
                                c[b >> 2] = 0;
                            }
                            else {
                                i = c[h + 8 >> 2] | 0;
                                c[i + 12 >> 2] = a;
                                c[a + 8 >> 2] = i;
                            }
                        while (0);
                        if (f) {
                            b = c[h + 28 >> 2] | 0;
                            d = 3828 + (b << 2) | 0;
                            if ((c[d >> 2] | 0) == (h | 0)) {
                                c[d >> 2] = a;
                                if (!a) {
                                    c[882] = c[882] & ~(1 << b);
                                    i = h;
                                    b = g;
                                    break;
                                }
                            }
                            else {
                                i = f + 16 | 0;
                                c[((c[i >> 2] | 0) == (h | 0) ? i : f + 20 | 0) >> 2] = a;
                                if (!a) {
                                    i = h;
                                    b = g;
                                    break;
                                }
                            }
                            c[a + 24 >> 2] = f;
                            b = h + 16 | 0;
                            d = c[b >> 2] | 0;
                            if (d | 0) {
                                c[a + 16 >> 2] = d;
                                c[d + 24 >> 2] = a;
                            }
                            b = c[b + 4 >> 2] | 0;
                            if (b) {
                                c[a + 20 >> 2] = b;
                                c[b + 24 >> 2] = a;
                                i = h;
                                b = g;
                            }
                            else {
                                i = h;
                                b = g;
                            }
                        }
                        else {
                            i = h;
                            b = g;
                        }
                    }
                    else {
                        i = d;
                        h = d;
                    }
                while (0); if (h >>> 0 >= j >>> 0)
                    return; a = j + 4 | 0; e = c[a >> 2] | 0; if (!(e & 1))
                    return; if (!(e & 2)) {
                    if ((c[887] | 0) == (j | 0)) {
                        j = (c[884] | 0) + b | 0;
                        c[884] = j;
                        c[887] = i;
                        c[i + 4 >> 2] = j | 1;
                        if ((i | 0) != (c[886] | 0))
                            return;
                        c[886] = 0;
                        c[883] = 0;
                        return;
                    }
                    if ((c[886] | 0) == (j | 0)) {
                        j = (c[883] | 0) + b | 0;
                        c[883] = j;
                        c[886] = h;
                        c[i + 4 >> 2] = j | 1;
                        c[h + j >> 2] = j;
                        return;
                    }
                    f = (e & -8) + b | 0;
                    d = 3 ? e >>> 3 : e;
                    do
                        if (e >>> 0 < 256) {
                            b = c[j + 8 >> 2] | 0;
                            a = c[j + 12 >> 2] | 0;
                            if ((a | 0) == (b | 0)) {
                                c[881] = c[881] & ~(1 << d);
                                break;
                            }
                            else {
                                c[b + 12 >> 2] = a;
                                c[a + 8 >> 2] = b;
                                break;
                            }
                        }
                        else {
                            g = c[j + 24 >> 2] | 0;
                            a = c[j + 12 >> 2] | 0;
                            do
                                if ((a | 0) == (j | 0)) {
                                    b = j + 16 | 0;
                                    d = b + 4 | 0;
                                    a = c[d >> 2] | 0;
                                    if (!a) {
                                        a = c[b >> 2] | 0;
                                        if (!a) {
                                            d = 0;
                                            break;
                                        }
                                    }
                                    else
                                        b = d;
                                    while (1) {
                                        e = a + 20 | 0;
                                        d = c[e >> 2] | 0;
                                        if (!d) {
                                            e = a + 16 | 0;
                                            d = c[e >> 2] | 0;
                                            if (!d)
                                                break;
                                            else {
                                                a = d;
                                                b = e;
                                            }
                                        }
                                        else {
                                            a = d;
                                            b = e;
                                        }
                                    }
                                    c[b >> 2] = 0;
                                    d = a;
                                }
                                else {
                                    d = c[j + 8 >> 2] | 0;
                                    c[d + 12 >> 2] = a;
                                    c[a + 8 >> 2] = d;
                                    d = a;
                                }
                            while (0);
                            if (g | 0) {
                                a = c[j + 28 >> 2] | 0;
                                b = 3828 + (a << 2) | 0;
                                if ((c[b >> 2] | 0) == (j | 0)) {
                                    c[b >> 2] = d;
                                    if (!d) {
                                        c[882] = c[882] & ~(1 << a);
                                        break;
                                    }
                                }
                                else {
                                    e = g + 16 | 0;
                                    c[((c[e >> 2] | 0) == (j | 0) ? e : g + 20 | 0) >> 2] = d;
                                    if (!d)
                                        break;
                                }
                                c[d + 24 >> 2] = g;
                                a = j + 16 | 0;
                                b = c[a >> 2] | 0;
                                if (b | 0) {
                                    c[d + 16 >> 2] = b;
                                    c[b + 24 >> 2] = d;
                                }
                                a = c[a + 4 >> 2] | 0;
                                if (a | 0) {
                                    c[d + 20 >> 2] = a;
                                    c[a + 24 >> 2] = d;
                                }
                            }
                        }
                    while (0);
                    c[i + 4 >> 2] = f | 1;
                    c[h + f >> 2] = f;
                    if ((i | 0) == (c[886] | 0)) {
                        c[883] = f;
                        return;
                    }
                }
                else {
                    c[a >> 2] = e & -2;
                    c[i + 4 >> 2] = b | 1;
                    c[h + b >> 2] = b;
                    f = b;
                } a = 3 ? f >>> 3 : f; if (f >>> 0 < 256) {
                    d = 3564 + (a << 1 << 2) | 0;
                    b = c[881] | 0;
                    a = 1 << a;
                    if (!(b & a)) {
                        c[881] = b | a;
                        a = d;
                        b = d + 8 | 0;
                    }
                    else {
                        b = d + 8 | 0;
                        a = c[b >> 2] | 0;
                    }
                    c[b >> 2] = i;
                    c[a + 12 >> 2] = i;
                    c[i + 8 >> 2] = a;
                    c[i + 12 >> 2] = d;
                    return;
                } a = 8 ? f >>> 8 : f; if (a)
                    if (f >>> 0 > 16777215)
                        e = 31;
                    else {
                        h = a + 1048320 | 0;
                        h = (16 ? h >>> 16 : h) & 8;
                        e = a << h;
                        g = e + 520192 | 0;
                        g = (16 ? g >>> 16 : g) & 4;
                        e = e << g;
                        j = e + 245760 | 0;
                        j = (16 ? j >>> 16 : j) & 2;
                        e = e << j;
                        e = 14 - (g | h | j) + (15 ? e >>> 15 : e) | 0;
                        j = e + 7 | 0;
                        e = (j ? f >>> j : f) & 1 | e << 1;
                    }
                else
                    e = 0; a = 3828 + (e << 2) | 0; c[i + 28 >> 2] = e; c[i + 20 >> 2] = 0; c[i + 16 >> 2] = 0; b = c[882] | 0; d = 1 << e; a: do
                    if (!(b & d)) {
                        c[882] = b | d;
                        c[a >> 2] = i;
                        c[i + 24 >> 2] = a;
                        c[i + 12 >> 2] = i;
                        c[i + 8 >> 2] = i;
                    }
                    else {
                        a = c[a >> 2] | 0;
                        b: do
                            if ((c[a + 4 >> 2] & -8 | 0) != (f | 0)) {
                                e = f << ((e | 0) == 31 ? 0 : 25 - (1 ? e >>> 1 : e) | 0);
                                while (1) {
                                    d = a + 16 + ((31 ? e >>> 31 : e) << 2) | 0;
                                    b = c[d >> 2] | 0;
                                    if (!b)
                                        break;
                                    if ((c[b + 4 >> 2] & -8 | 0) == (f | 0)) {
                                        a = b;
                                        break b;
                                    }
                                    else {
                                        e = e << 1;
                                        a = b;
                                    }
                                }
                                c[d >> 2] = i;
                                c[i + 24 >> 2] = a;
                                c[i + 12 >> 2] = i;
                                c[i + 8 >> 2] = i;
                                break a;
                            }
                        while (0);
                        h = a + 8 | 0;
                        j = c[h >> 2] | 0;
                        c[j + 12 >> 2] = i;
                        c[h >> 2] = i;
                        c[i + 8 >> 2] = j;
                        c[i + 12 >> 2] = a;
                        c[i + 24 >> 2] = 0;
                    }
                while (0); j = (c[889] | 0) + -1 | 0; c[889] = j; if (j | 0)
                    return; a = 3980; while (1) {
                    a = c[a >> 2] | 0;
                    if (!a)
                        break;
                    else
                        a = a + 8 | 0;
                } c[889] = -1; return; }
                function nb(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0; i = a + b | 0; d = c[a + 4 >> 2] | 0; do
                    if (!(d & 1)) {
                        f = c[a >> 2] | 0;
                        if (!(d & 3))
                            return;
                        h = a + (0 - f) | 0;
                        b = f + b | 0;
                        if ((c[886] | 0) == (h | 0)) {
                            a = i + 4 | 0;
                            d = c[a >> 2] | 0;
                            if ((d & 3 | 0) != 3)
                                break;
                            c[883] = b;
                            c[a >> 2] = d & -2;
                            c[h + 4 >> 2] = b | 1;
                            c[i >> 2] = b;
                            return;
                        }
                        e = 3 ? f >>> 3 : f;
                        if (f >>> 0 < 256) {
                            a = c[h + 8 >> 2] | 0;
                            d = c[h + 12 >> 2] | 0;
                            if ((d | 0) == (a | 0)) {
                                c[881] = c[881] & ~(1 << e);
                                break;
                            }
                            else {
                                c[a + 12 >> 2] = d;
                                c[d + 8 >> 2] = a;
                                break;
                            }
                        }
                        g = c[h + 24 >> 2] | 0;
                        a = c[h + 12 >> 2] | 0;
                        do
                            if ((a | 0) == (h | 0)) {
                                d = h + 16 | 0;
                                e = d + 4 | 0;
                                a = c[e >> 2] | 0;
                                if (!a) {
                                    a = c[d >> 2] | 0;
                                    if (!a) {
                                        a = 0;
                                        break;
                                    }
                                }
                                else
                                    d = e;
                                while (1) {
                                    f = a + 20 | 0;
                                    e = c[f >> 2] | 0;
                                    if (!e) {
                                        f = a + 16 | 0;
                                        e = c[f >> 2] | 0;
                                        if (!e)
                                            break;
                                        else {
                                            a = e;
                                            d = f;
                                        }
                                    }
                                    else {
                                        a = e;
                                        d = f;
                                    }
                                }
                                c[d >> 2] = 0;
                            }
                            else {
                                f = c[h + 8 >> 2] | 0;
                                c[f + 12 >> 2] = a;
                                c[a + 8 >> 2] = f;
                            }
                        while (0);
                        if (g) {
                            d = c[h + 28 >> 2] | 0;
                            e = 3828 + (d << 2) | 0;
                            if ((c[e >> 2] | 0) == (h | 0)) {
                                c[e >> 2] = a;
                                if (!a) {
                                    c[882] = c[882] & ~(1 << d);
                                    break;
                                }
                            }
                            else {
                                f = g + 16 | 0;
                                c[((c[f >> 2] | 0) == (h | 0) ? f : g + 20 | 0) >> 2] = a;
                                if (!a)
                                    break;
                            }
                            c[a + 24 >> 2] = g;
                            d = h + 16 | 0;
                            e = c[d >> 2] | 0;
                            if (e | 0) {
                                c[a + 16 >> 2] = e;
                                c[e + 24 >> 2] = a;
                            }
                            d = c[d + 4 >> 2] | 0;
                            if (d) {
                                c[a + 20 >> 2] = d;
                                c[d + 24 >> 2] = a;
                            }
                        }
                    }
                    else
                        h = a;
                while (0); a = i + 4 | 0; e = c[a >> 2] | 0; if (!(e & 2)) {
                    if ((c[887] | 0) == (i | 0)) {
                        i = (c[884] | 0) + b | 0;
                        c[884] = i;
                        c[887] = h;
                        c[h + 4 >> 2] = i | 1;
                        if ((h | 0) != (c[886] | 0))
                            return;
                        c[886] = 0;
                        c[883] = 0;
                        return;
                    }
                    if ((c[886] | 0) == (i | 0)) {
                        i = (c[883] | 0) + b | 0;
                        c[883] = i;
                        c[886] = h;
                        c[h + 4 >> 2] = i | 1;
                        c[h + i >> 2] = i;
                        return;
                    }
                    f = (e & -8) + b | 0;
                    d = 3 ? e >>> 3 : e;
                    do
                        if (e >>> 0 < 256) {
                            a = c[i + 8 >> 2] | 0;
                            b = c[i + 12 >> 2] | 0;
                            if ((b | 0) == (a | 0)) {
                                c[881] = c[881] & ~(1 << d);
                                break;
                            }
                            else {
                                c[a + 12 >> 2] = b;
                                c[b + 8 >> 2] = a;
                                break;
                            }
                        }
                        else {
                            g = c[i + 24 >> 2] | 0;
                            b = c[i + 12 >> 2] | 0;
                            do
                                if ((b | 0) == (i | 0)) {
                                    a = i + 16 | 0;
                                    d = a + 4 | 0;
                                    b = c[d >> 2] | 0;
                                    if (!b) {
                                        b = c[a >> 2] | 0;
                                        if (!b) {
                                            d = 0;
                                            break;
                                        }
                                    }
                                    else
                                        a = d;
                                    while (1) {
                                        e = b + 20 | 0;
                                        d = c[e >> 2] | 0;
                                        if (!d) {
                                            e = b + 16 | 0;
                                            d = c[e >> 2] | 0;
                                            if (!d)
                                                break;
                                            else {
                                                b = d;
                                                a = e;
                                            }
                                        }
                                        else {
                                            b = d;
                                            a = e;
                                        }
                                    }
                                    c[a >> 2] = 0;
                                    d = b;
                                }
                                else {
                                    d = c[i + 8 >> 2] | 0;
                                    c[d + 12 >> 2] = b;
                                    c[b + 8 >> 2] = d;
                                    d = b;
                                }
                            while (0);
                            if (g | 0) {
                                b = c[i + 28 >> 2] | 0;
                                a = 3828 + (b << 2) | 0;
                                if ((c[a >> 2] | 0) == (i | 0)) {
                                    c[a >> 2] = d;
                                    if (!d) {
                                        c[882] = c[882] & ~(1 << b);
                                        break;
                                    }
                                }
                                else {
                                    e = g + 16 | 0;
                                    c[((c[e >> 2] | 0) == (i | 0) ? e : g + 20 | 0) >> 2] = d;
                                    if (!d)
                                        break;
                                }
                                c[d + 24 >> 2] = g;
                                b = i + 16 | 0;
                                a = c[b >> 2] | 0;
                                if (a | 0) {
                                    c[d + 16 >> 2] = a;
                                    c[a + 24 >> 2] = d;
                                }
                                b = c[b + 4 >> 2] | 0;
                                if (b | 0) {
                                    c[d + 20 >> 2] = b;
                                    c[b + 24 >> 2] = d;
                                }
                            }
                        }
                    while (0);
                    c[h + 4 >> 2] = f | 1;
                    c[h + f >> 2] = f;
                    if ((h | 0) == (c[886] | 0)) {
                        c[883] = f;
                        return;
                    }
                }
                else {
                    c[a >> 2] = e & -2;
                    c[h + 4 >> 2] = b | 1;
                    c[h + b >> 2] = b;
                    f = b;
                } b = 3 ? f >>> 3 : f; if (f >>> 0 < 256) {
                    d = 3564 + (b << 1 << 2) | 0;
                    a = c[881] | 0;
                    b = 1 << b;
                    if (!(a & b)) {
                        c[881] = a | b;
                        b = d;
                        a = d + 8 | 0;
                    }
                    else {
                        a = d + 8 | 0;
                        b = c[a >> 2] | 0;
                    }
                    c[a >> 2] = h;
                    c[b + 12 >> 2] = h;
                    c[h + 8 >> 2] = b;
                    c[h + 12 >> 2] = d;
                    return;
                } b = 8 ? f >>> 8 : f; if (b)
                    if (f >>> 0 > 16777215)
                        e = 31;
                    else {
                        g = b + 1048320 | 0;
                        g = (16 ? g >>> 16 : g) & 8;
                        e = b << g;
                        d = e + 520192 | 0;
                        d = (16 ? d >>> 16 : d) & 4;
                        e = e << d;
                        i = e + 245760 | 0;
                        i = (16 ? i >>> 16 : i) & 2;
                        e = e << i;
                        e = 14 - (d | g | i) + (15 ? e >>> 15 : e) | 0;
                        i = e + 7 | 0;
                        e = (i ? f >>> i : f) & 1 | e << 1;
                    }
                else
                    e = 0; b = 3828 + (e << 2) | 0; c[h + 28 >> 2] = e; c[h + 20 >> 2] = 0; c[h + 16 >> 2] = 0; a = c[882] | 0; d = 1 << e; if (!(a & d)) {
                    c[882] = a | d;
                    c[b >> 2] = h;
                    c[h + 24 >> 2] = b;
                    c[h + 12 >> 2] = h;
                    c[h + 8 >> 2] = h;
                    return;
                } b = c[b >> 2] | 0; a: do
                    if ((c[b + 4 >> 2] & -8 | 0) != (f | 0)) {
                        e = f << ((e | 0) == 31 ? 0 : 25 - (1 ? e >>> 1 : e) | 0);
                        while (1) {
                            d = b + 16 + ((31 ? e >>> 31 : e) << 2) | 0;
                            a = c[d >> 2] | 0;
                            if (!a)
                                break;
                            if ((c[a + 4 >> 2] & -8 | 0) == (f | 0)) {
                                b = a;
                                break a;
                            }
                            else {
                                e = e << 1;
                                b = a;
                            }
                        }
                        c[d >> 2] = h;
                        c[h + 24 >> 2] = b;
                        c[h + 12 >> 2] = h;
                        c[h + 8 >> 2] = h;
                        return;
                    }
                while (0); g = b + 8 | 0; i = c[g >> 2] | 0; c[i + 12 >> 2] = h; c[g >> 2] = h; c[h + 8 >> 2] = i; c[h + 12 >> 2] = b; c[h + 24 >> 2] = 0; return; }
                function ob(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0; d = a >>> 0 > 16 ? a : 16; if (!(d + -1 & d))
                    a = d;
                else {
                    a = 16;
                    while (1)
                        if (a >>> 0 < d >>> 0)
                            a = a << 1;
                        else
                            break;
                } if ((-64 - a | 0) >>> 0 <= b >>> 0) {
                    h = ub() | 0;
                    c[h >> 2] = 12;
                    h = 0;
                    return h | 0;
                } g = b >>> 0 < 11 ? 16 : b + 11 & -8; d = lb(g + 12 + a | 0) | 0; if (!d) {
                    h = 0;
                    return h | 0;
                } f = d + -8 | 0; do
                    if (a + -1 & d) {
                        e = (d + a + -1 & 0 - a) + -8 | 0;
                        b = f;
                        e = (e - b | 0) >>> 0 > 15 ? e : e + a | 0;
                        b = e - b | 0;
                        a = d + -4 | 0;
                        i = c[a >> 2] | 0;
                        d = (i & -8) - b | 0;
                        if (!(i & 3)) {
                            c[e >> 2] = (c[f >> 2] | 0) + b;
                            c[e + 4 >> 2] = d;
                            a = e;
                            b = e;
                            break;
                        }
                        else {
                            i = e + 4 | 0;
                            c[i >> 2] = d | c[i >> 2] & 1 | 2;
                            d = e + d + 4 | 0;
                            c[d >> 2] = c[d >> 2] | 1;
                            c[a >> 2] = b | c[a >> 2] & 1 | 2;
                            c[i >> 2] = c[i >> 2] | 1;
                            nb(f, b);
                            a = e;
                            b = e;
                            break;
                        }
                    }
                    else {
                        a = f;
                        b = f;
                    }
                while (0); a = a + 4 | 0; d = c[a >> 2] | 0; if (d & 3 | 0 ? (h = d & -8, h >>> 0 > (g + 16 | 0) >>> 0) : 0) {
                    i = h - g | 0;
                    f = b + g | 0;
                    c[a >> 2] = g | d & 1 | 2;
                    c[f + 4 >> 2] = i | 3;
                    h = b + h + 4 | 0;
                    c[h >> 2] = c[h >> 2] | 1;
                    nb(f, i);
                } i = b + 8 | 0; return i | 0; }
                function pb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0; do
                    if ((b | 0) != 8) {
                        e = 2 ? b >>> 2 : b;
                        if ((b & 3 | 0) != 0 | (e | 0) == 0) {
                            a = 22;
                            return a | 0;
                        }
                        if (e + 1073741823 & e | 0) {
                            a = 22;
                            return a | 0;
                        }
                        if ((-64 - b | 0) >>> 0 < d >>> 0) {
                            a = 12;
                            return a | 0;
                        }
                        else {
                            b = ob(b >>> 0 > 16 ? b : 16, d) | 0;
                            break;
                        }
                    }
                    else
                        b = lb(d) | 0;
                while (0); if (!b) {
                    a = 12;
                    return a | 0;
                } c[a >> 2] = b; a = 0; return a | 0; }
                function qb(a) { a = a | 0; var b = 0, d = 0; b = R; R = R + 16 | 0; d = b; a = vb(c[a + 60 >> 2] | 0) | 0; c[d >> 2] = a; a = tb(K(6, d | 0) | 0) | 0; R = b; return a | 0; }
                function rb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0; m = R; R = R + 48 | 0; k = m + 32 | 0; g = m + 16 | 0; f = m; i = a + 28 | 0; e = c[i >> 2] | 0; c[f >> 2] = e; j = a + 20 | 0; e = (c[j >> 2] | 0) - e | 0; c[f + 4 >> 2] = e; c[f + 8 >> 2] = b; c[f + 12 >> 2] = d; e = e + d | 0; h = a + 60 | 0; c[g >> 2] = c[h >> 2]; c[g + 4 >> 2] = f; c[g + 8 >> 2] = 2; g = tb(I(146, g | 0) | 0) | 0; a: do
                    if ((e | 0) != (g | 0)) {
                        b = 2;
                        while (1) {
                            if ((g | 0) < 0)
                                break;
                            e = e - g | 0;
                            o = c[f + 4 >> 2] | 0;
                            n = g >>> 0 > o >>> 0;
                            f = n ? f + 8 | 0 : f;
                            b = b + (n << 31 >> 31) | 0;
                            o = g - (n ? o : 0) | 0;
                            c[f >> 2] = (c[f >> 2] | 0) + o;
                            n = f + 4 | 0;
                            c[n >> 2] = (c[n >> 2] | 0) - o;
                            c[k >> 2] = c[h >> 2];
                            c[k + 4 >> 2] = f;
                            c[k + 8 >> 2] = b;
                            g = tb(I(146, k | 0) | 0) | 0;
                            if ((e | 0) == (g | 0)) {
                                l = 3;
                                break a;
                            }
                        }
                        c[a + 16 >> 2] = 0;
                        c[i >> 2] = 0;
                        c[j >> 2] = 0;
                        c[a >> 2] = c[a >> 2] | 32;
                        if ((b | 0) == 2)
                            d = 0;
                        else
                            d = d - (c[f + 4 >> 2] | 0) | 0;
                    }
                    else
                        l = 3;
                while (0); if ((l | 0) == 3) {
                    o = c[a + 44 >> 2] | 0;
                    c[a + 16 >> 2] = o + (c[a + 48 >> 2] | 0);
                    c[i >> 2] = o;
                    c[j >> 2] = o;
                } R = m; return d | 0; }
                function sb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, g = 0; f = R; R = R + 32 | 0; g = f; e = f + 20 | 0; c[g >> 2] = c[a + 60 >> 2]; c[g + 4 >> 2] = 0; c[g + 8 >> 2] = b; c[g + 12 >> 2] = e; c[g + 16 >> 2] = d; if ((tb(H(140, g | 0) | 0) | 0) < 0) {
                    c[e >> 2] = -1;
                    a = -1;
                }
                else
                    a = c[e >> 2] | 0; R = f; return a | 0; }
                function tb(a) { a = a | 0; var b = 0; if (a >>> 0 > 4294963200) {
                    b = ub() | 0;
                    c[b >> 2] = 0 - a;
                    a = -1;
                } return a | 0; }
                function ub() { return 4084; }
                function vb(a) { a = a | 0; return a | 0; }
                function wb(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0; g = R; R = R + 32 | 0; f = g; c[b + 36 >> 2] = 5; if ((c[b >> 2] & 64 | 0) == 0 ? (c[f >> 2] = c[b + 60 >> 2], c[f + 4 >> 2] = 21523, c[f + 8 >> 2] = g + 16, J(54, f | 0) | 0) : 0)
                    a[b + 75 >> 0] = -1; f = rb(b, d, e) | 0; R = g; return f | 0; }
                function xb(b, c, e) { b = b | 0; c = c | 0; e = e | 0; var f = 0, g = 0; if (!e)
                    f = 0;
                else {
                    f = a[b >> 0] | 0;
                    a: do
                        if (!(f << 24 >> 24))
                            f = 0;
                        else
                            while (1) {
                                e = e + -1 | 0;
                                g = a[c >> 0] | 0;
                                if (!(f << 24 >> 24 == g << 24 >> 24 & ((e | 0) != 0 & g << 24 >> 24 != 0)))
                                    break a;
                                b = b + 1 | 0;
                                c = c + 1 | 0;
                                f = a[b >> 0] | 0;
                                if (!(f << 24 >> 24)) {
                                    f = 0;
                                    break;
                                }
                            }
                    while (0);
                    f = (f & 255) - (d[c >> 0] | 0) | 0;
                } return f | 0; }
                function yb(a) { a = a | 0; return (a + -48 | 0) >>> 0 < 10 | 0; }
                function zb(b, d, e, f) { b = b | 0; d = d | 0; e = e | 0; f = f | 0; var g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0; m = R; R = R + 128 | 0; g = m + 124 | 0; l = m; h = l; i = 624; j = h + 124 | 0; do {
                    c[h >> 2] = c[i >> 2];
                    h = h + 4 | 0;
                    i = i + 4 | 0;
                } while ((h | 0) < (j | 0)); if ((d + -1 | 0) >>> 0 > 2147483646)
                    if (!d) {
                        b = g;
                        d = 1;
                        k = 4;
                    }
                    else {
                        d = ub() | 0;
                        c[d >> 2] = 75;
                        d = -1;
                    }
                else
                    k = 4; if ((k | 0) == 4) {
                    k = -2 - b | 0;
                    k = d >>> 0 > k >>> 0 ? k : d;
                    c[l + 48 >> 2] = k;
                    g = l + 20 | 0;
                    c[g >> 2] = b;
                    c[l + 44 >> 2] = b;
                    d = b + k | 0;
                    b = l + 16 | 0;
                    c[b >> 2] = d;
                    c[l + 28 >> 2] = d;
                    d = Ab(l, e, f) | 0;
                    if (k) {
                        l = c[g >> 2] | 0;
                        a[l + (((l | 0) == (c[b >> 2] | 0)) << 31 >> 31) >> 0] = 0;
                    }
                } R = m; return d | 0; }
                function Ab(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0; r = R; R = R + 224 | 0; m = r + 208 | 0; o = r + 160 | 0; p = r + 80 | 0; q = r; f = o; g = f + 40 | 0; do {
                    c[f >> 2] = 0;
                    f = f + 4 | 0;
                } while ((f | 0) < (g | 0)); c[m >> 2] = c[e >> 2]; if ((Bb(0, d, m, p, o) | 0) < 0)
                    e = -1;
                else {
                    if ((c[b + 76 >> 2] | 0) > -1)
                        n = Cb(b) | 0;
                    else
                        n = 0;
                    e = c[b >> 2] | 0;
                    l = e & 32;
                    if ((a[b + 74 >> 0] | 0) < 1)
                        c[b >> 2] = e & -33;
                    f = b + 48 | 0;
                    if (!(c[f >> 2] | 0)) {
                        g = b + 44 | 0;
                        h = c[g >> 2] | 0;
                        c[g >> 2] = q;
                        i = b + 28 | 0;
                        c[i >> 2] = q;
                        j = b + 20 | 0;
                        c[j >> 2] = q;
                        c[f >> 2] = 80;
                        k = b + 16 | 0;
                        c[k >> 2] = q + 80;
                        e = Bb(b, d, m, p, o) | 0;
                        if (h) {
                            W[c[b + 36 >> 2] & 7](b, 0, 0) | 0;
                            e = (c[j >> 2] | 0) == 0 ? -1 : e;
                            c[g >> 2] = h;
                            c[f >> 2] = 0;
                            c[k >> 2] = 0;
                            c[i >> 2] = 0;
                            c[j >> 2] = 0;
                        }
                    }
                    else
                        e = Bb(b, d, m, p, o) | 0;
                    f = c[b >> 2] | 0;
                    c[b >> 2] = f | l;
                    if (n | 0)
                        Db(b);
                    e = (f & 32 | 0) == 0 ? e : -1;
                } R = r; return e | 0; }
                function Bb(d, e, f, h, i) { d = d | 0; e = e | 0; f = f | 0; h = h | 0; i = i | 0; var j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0; H = R; R = R + 64 | 0; C = H + 56 | 0; D = H + 40 | 0; y = H; F = H + 48 | 0; G = H + 60 | 0; c[C >> 2] = e; v = (d | 0) != 0; w = y + 40 | 0; x = w; y = y + 39 | 0; z = F + 4 | 0; j = 0; e = 0; l = 0; a: while (1) {
                    do {
                        do
                            if ((e | 0) > -1)
                                if ((j | 0) > (2147483647 - e | 0)) {
                                    e = ub() | 0;
                                    c[e >> 2] = 75;
                                    e = -1;
                                    break;
                                }
                                else {
                                    e = j + e | 0;
                                    break;
                                }
                        while (0);
                        p = c[C >> 2] | 0;
                        j = a[p >> 0] | 0;
                        if (!(j << 24 >> 24)) {
                            u = 92;
                            break a;
                        }
                        k = p;
                        b: while (1) {
                            switch (j << 24 >> 24) {
                                case 37: {
                                    u = 10;
                                    break b;
                                }
                                case 0: {
                                    j = k;
                                    break b;
                                }
                                default: { }
                            }
                            t = k + 1 | 0;
                            c[C >> 2] = t;
                            j = a[t >> 0] | 0;
                            k = t;
                        }
                        c: do
                            if ((u | 0) == 10) {
                                u = 0;
                                j = k;
                                do {
                                    if ((a[k + 1 >> 0] | 0) != 37)
                                        break c;
                                    j = j + 1 | 0;
                                    k = k + 2 | 0;
                                    c[C >> 2] = k;
                                } while ((a[k >> 0] | 0) == 37);
                            }
                        while (0);
                        j = j - p | 0;
                        if (v)
                            Eb(d, p, j);
                    } while ((j | 0) != 0);
                    t = (yb(a[(c[C >> 2] | 0) + 1 >> 0] | 0) | 0) == 0;
                    k = c[C >> 2] | 0;
                    if (!t ? (a[k + 2 >> 0] | 0) == 36 : 0) {
                        r = (a[k + 1 >> 0] | 0) + -48 | 0;
                        n = 1;
                        j = 3;
                    }
                    else {
                        r = -1;
                        n = l;
                        j = 1;
                    }
                    j = k + j | 0;
                    c[C >> 2] = j;
                    k = a[j >> 0] | 0;
                    l = (k << 24 >> 24) + -32 | 0;
                    if (l >>> 0 > 31 | (1 << l & 75913 | 0) == 0)
                        m = 0;
                    else {
                        m = 0;
                        do {
                            m = 1 << l | m;
                            j = j + 1 | 0;
                            c[C >> 2] = j;
                            k = a[j >> 0] | 0;
                            l = (k << 24 >> 24) + -32 | 0;
                        } while (!(l >>> 0 > 31 | (1 << l & 75913 | 0) == 0));
                    }
                    if (k << 24 >> 24 == 42) {
                        if ((yb(a[j + 1 >> 0] | 0) | 0) != 0 ? (E = c[C >> 2] | 0, (a[E + 2 >> 0] | 0) == 36) : 0) {
                            j = E + 1 | 0;
                            c[i + ((a[j >> 0] | 0) + -48 << 2) >> 2] = 10;
                            j = c[h + ((a[j >> 0] | 0) + -48 << 3) >> 2] | 0;
                            l = 1;
                            k = E + 3 | 0;
                        }
                        else {
                            if (n | 0) {
                                e = -1;
                                break;
                            }
                            if (v) {
                                t = (c[f >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                j = c[t >> 2] | 0;
                                c[f >> 2] = t + 4;
                            }
                            else
                                j = 0;
                            l = 0;
                            k = (c[C >> 2] | 0) + 1 | 0;
                        }
                        c[C >> 2] = k;
                        t = (j | 0) < 0;
                        s = t ? 0 - j | 0 : j;
                        m = t ? m | 8192 : m;
                        t = l;
                    }
                    else {
                        j = Fb(C) | 0;
                        if ((j | 0) < 0) {
                            e = -1;
                            break;
                        }
                        s = j;
                        t = n;
                        k = c[C >> 2] | 0;
                    }
                    do
                        if ((a[k >> 0] | 0) == 46) {
                            j = k + 1 | 0;
                            if ((a[j >> 0] | 0) != 42) {
                                c[C >> 2] = j;
                                j = Fb(C) | 0;
                                k = c[C >> 2] | 0;
                                break;
                            }
                            if (yb(a[k + 2 >> 0] | 0) | 0 ? (B = c[C >> 2] | 0, (a[B + 3 >> 0] | 0) == 36) : 0) {
                                j = B + 2 | 0;
                                c[i + ((a[j >> 0] | 0) + -48 << 2) >> 2] = 10;
                                j = c[h + ((a[j >> 0] | 0) + -48 << 3) >> 2] | 0;
                                k = B + 4 | 0;
                                c[C >> 2] = k;
                                break;
                            }
                            if (t | 0) {
                                e = -1;
                                break a;
                            }
                            if (v) {
                                q = (c[f >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                j = c[q >> 2] | 0;
                                c[f >> 2] = q + 4;
                            }
                            else
                                j = 0;
                            k = (c[C >> 2] | 0) + 2 | 0;
                            c[C >> 2] = k;
                        }
                        else
                            j = -1;
                    while (0);
                    q = 0;
                    while (1) {
                        if (((a[k >> 0] | 0) + -65 | 0) >>> 0 > 57) {
                            e = -1;
                            break a;
                        }
                        l = k;
                        k = k + 1 | 0;
                        c[C >> 2] = k;
                        l = a[(a[l >> 0] | 0) + -65 + (16 + (q * 58 | 0)) >> 0] | 0;
                        n = l & 255;
                        if ((n + -1 | 0) >>> 0 >= 8)
                            break;
                        else
                            q = n;
                    }
                    if (!(l << 24 >> 24)) {
                        e = -1;
                        break;
                    }
                    o = (r | 0) > -1;
                    do
                        if (l << 24 >> 24 == 19)
                            if (o) {
                                e = -1;
                                break a;
                            }
                            else
                                u = 54;
                        else {
                            if (o) {
                                c[i + (r << 2) >> 2] = n;
                                o = h + (r << 3) | 0;
                                r = c[o + 4 >> 2] | 0;
                                u = D;
                                c[u >> 2] = c[o >> 2];
                                c[u + 4 >> 2] = r;
                                u = 54;
                                break;
                            }
                            if (!v) {
                                e = 0;
                                break a;
                            }
                            Gb(D, n, f);
                            k = c[C >> 2] | 0;
                            u = 55;
                        }
                    while (0);
                    if ((u | 0) == 54) {
                        u = 0;
                        if (v)
                            u = 55;
                        else
                            j = 0;
                    }
                    d: do
                        if ((u | 0) == 55) {
                            u = 0;
                            k = a[k + -1 >> 0] | 0;
                            k = (q | 0) != 0 & (k & 15 | 0) == 3 ? k & -33 : k;
                            o = m & -65537;
                            r = (m & 8192 | 0) == 0 ? m : o;
                            e: do
                                switch (k | 0) {
                                    case 110: switch ((q & 255) << 24 >> 24) {
                                        case 0: {
                                            c[c[D >> 2] >> 2] = e;
                                            j = 0;
                                            break d;
                                        }
                                        case 1: {
                                            c[c[D >> 2] >> 2] = e;
                                            j = 0;
                                            break d;
                                        }
                                        case 2: {
                                            j = c[D >> 2] | 0;
                                            c[j >> 2] = e;
                                            c[j + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
                                            j = 0;
                                            break d;
                                        }
                                        case 3: {
                                            b[c[D >> 2] >> 1] = e;
                                            j = 0;
                                            break d;
                                        }
                                        case 4: {
                                            a[c[D >> 2] >> 0] = e;
                                            j = 0;
                                            break d;
                                        }
                                        case 6: {
                                            c[c[D >> 2] >> 2] = e;
                                            j = 0;
                                            break d;
                                        }
                                        case 7: {
                                            j = c[D >> 2] | 0;
                                            c[j >> 2] = e;
                                            c[j + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
                                            j = 0;
                                            break d;
                                        }
                                        default: {
                                            j = 0;
                                            break d;
                                        }
                                    }
                                    case 112: {
                                        k = 120;
                                        j = j >>> 0 > 8 ? j : 8;
                                        l = r | 8;
                                        u = 67;
                                        break;
                                    }
                                    case 88:
                                    case 120: {
                                        l = r;
                                        u = 67;
                                        break;
                                    }
                                    case 111: {
                                        l = D;
                                        k = c[l >> 2] | 0;
                                        l = c[l + 4 >> 2] | 0;
                                        p = Ib(k, l, w) | 0;
                                        o = x - p | 0;
                                        m = 0;
                                        n = 2414;
                                        j = (r & 8 | 0) == 0 | (j | 0) > (o | 0) ? j : o + 1 | 0;
                                        o = r;
                                        u = 73;
                                        break;
                                    }
                                    case 105:
                                    case 100: {
                                        l = D;
                                        k = c[l >> 2] | 0;
                                        l = c[l + 4 >> 2] | 0;
                                        if ((l | 0) < 0) {
                                            k = $b(0, 0, k | 0, l | 0) | 0;
                                            l = A() | 0;
                                            m = D;
                                            c[m >> 2] = k;
                                            c[m + 4 >> 2] = l;
                                            m = 1;
                                            n = 2414;
                                            u = 72;
                                            break e;
                                        }
                                        else {
                                            m = (r & 2049 | 0) != 0 & 1;
                                            n = (r & 2048 | 0) == 0 ? ((r & 1 | 0) == 0 ? 2414 : 2416) : 2415;
                                            u = 72;
                                            break e;
                                        }
                                    }
                                    case 117: {
                                        l = D;
                                        m = 0;
                                        n = 2414;
                                        k = c[l >> 2] | 0;
                                        l = c[l + 4 >> 2] | 0;
                                        u = 72;
                                        break;
                                    }
                                    case 99: {
                                        a[y >> 0] = c[D >> 2];
                                        p = y;
                                        m = 0;
                                        n = 2414;
                                        l = 1;
                                        k = o;
                                        j = x;
                                        break;
                                    }
                                    case 115: {
                                        q = c[D >> 2] | 0;
                                        q = (q | 0) == 0 ? 2424 : q;
                                        r = Kb(q, 0, j) | 0;
                                        I = (r | 0) == 0;
                                        p = q;
                                        m = 0;
                                        n = 2414;
                                        l = I ? j : r - q | 0;
                                        k = o;
                                        j = I ? q + j | 0 : r;
                                        break;
                                    }
                                    case 67: {
                                        c[F >> 2] = c[D >> 2];
                                        c[z >> 2] = 0;
                                        c[D >> 2] = F;
                                        n = -1;
                                        u = 79;
                                        break;
                                    }
                                    case 83: {
                                        if (!j) {
                                            Lb(d, 32, s, 0, r);
                                            j = 0;
                                            u = 89;
                                        }
                                        else {
                                            n = j;
                                            u = 79;
                                        }
                                        break;
                                    }
                                    case 65:
                                    case 71:
                                    case 70:
                                    case 69:
                                    case 97:
                                    case 103:
                                    case 102:
                                    case 101: {
                                        j = Nb(d, +g[D >> 3], s, j, r, k) | 0;
                                        break d;
                                    }
                                    default: {
                                        m = 0;
                                        n = 2414;
                                        l = j;
                                        k = r;
                                        j = x;
                                    }
                                }
                            while (0);
                            f: do
                                if ((u | 0) == 67) {
                                    I = D;
                                    r = c[I >> 2] | 0;
                                    I = c[I + 4 >> 2] | 0;
                                    p = Hb(r, I, w, k & 32) | 0;
                                    n = (l & 8 | 0) == 0 | (r | 0) == 0 & (I | 0) == 0;
                                    m = n ? 0 : 2;
                                    n = n ? 2414 : 2414 + (4 ? k >>> 4 : k) | 0;
                                    o = l;
                                    k = r;
                                    l = I;
                                    u = 73;
                                }
                                else if ((u | 0) == 72) {
                                    p = Jb(k, l, w) | 0;
                                    o = r;
                                    u = 73;
                                }
                                else if ((u | 0) == 79) {
                                    u = 0;
                                    m = c[D >> 2] | 0;
                                    j = 0;
                                    while (1) {
                                        k = c[m >> 2] | 0;
                                        if (!k)
                                            break;
                                        k = Mb(G, k) | 0;
                                        l = (k | 0) < 0;
                                        if (l | k >>> 0 > (n - j | 0) >>> 0) {
                                            u = 83;
                                            break;
                                        }
                                        j = k + j | 0;
                                        if (n >>> 0 > j >>> 0)
                                            m = m + 4 | 0;
                                        else
                                            break;
                                    }
                                    if ((u | 0) == 83) {
                                        u = 0;
                                        if (l) {
                                            e = -1;
                                            break a;
                                        }
                                    }
                                    Lb(d, 32, s, j, r);
                                    if (!j) {
                                        j = 0;
                                        u = 89;
                                    }
                                    else {
                                        l = c[D >> 2] | 0;
                                        m = 0;
                                        while (1) {
                                            k = c[l >> 2] | 0;
                                            if (!k) {
                                                u = 89;
                                                break f;
                                            }
                                            k = Mb(G, k) | 0;
                                            m = k + m | 0;
                                            if ((m | 0) > (j | 0)) {
                                                u = 89;
                                                break f;
                                            }
                                            Eb(d, G, k);
                                            if (m >>> 0 >= j >>> 0) {
                                                u = 89;
                                                break;
                                            }
                                            else
                                                l = l + 4 | 0;
                                        }
                                    }
                                }
                            while (0);
                            if ((u | 0) == 73) {
                                u = 0;
                                l = (k | 0) != 0 | (l | 0) != 0;
                                k = (j | 0) != 0 | l;
                                l = x - p + ((l ^ 1) & 1) | 0;
                                p = k ? p : w;
                                l = k ? ((j | 0) > (l | 0) ? j : l) : 0;
                                k = (j | 0) > -1 ? o & -65537 : o;
                                j = x;
                            }
                            else if ((u | 0) == 89) {
                                u = 0;
                                Lb(d, 32, s, j, r ^ 8192);
                                j = (s | 0) > (j | 0) ? s : j;
                                break;
                            }
                            r = j - p | 0;
                            q = (l | 0) < (r | 0) ? r : l;
                            I = q + m | 0;
                            j = (s | 0) < (I | 0) ? I : s;
                            Lb(d, 32, j, I, k);
                            Eb(d, n, m);
                            Lb(d, 48, j, I, k ^ 65536);
                            Lb(d, 48, q, r, 0);
                            Eb(d, p, r);
                            Lb(d, 32, j, I, k ^ 8192);
                        }
                    while (0);
                    l = t;
                } g: do
                    if ((u | 0) == 92)
                        if (!d)
                            if (!l)
                                e = 0;
                            else {
                                e = 1;
                                while (1) {
                                    j = c[i + (e << 2) >> 2] | 0;
                                    if (!j)
                                        break;
                                    Gb(h + (e << 3) | 0, j, f);
                                    e = e + 1 | 0;
                                    if (e >>> 0 >= 10) {
                                        e = 1;
                                        break g;
                                    }
                                }
                                while (1) {
                                    if (c[i + (e << 2) >> 2] | 0) {
                                        e = -1;
                                        break g;
                                    }
                                    e = e + 1 | 0;
                                    if (e >>> 0 >= 10) {
                                        e = 1;
                                        break;
                                    }
                                }
                            }
                while (0); R = H; return e | 0; }
                function Cb(a) { a = a | 0; return 1; }
                function Db(a) { a = a | 0; return; }
                function Eb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; if (!(c[a >> 2] & 32))
                    Ub(b, d, a) | 0; return; }
                function Fb(b) { b = b | 0; var d = 0, e = 0; if (!(yb(a[c[b >> 2] >> 0] | 0) | 0))
                    d = 0;
                else {
                    d = 0;
                    do {
                        e = c[b >> 2] | 0;
                        d = (d * 10 | 0) + -48 + (a[e >> 0] | 0) | 0;
                        e = e + 1 | 0;
                        c[b >> 2] = e;
                    } while ((yb(a[e >> 0] | 0) | 0) != 0);
                } return d | 0; }
                function Gb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, h = 0.0; a: do
                    if (b >>> 0 <= 20)
                        do
                            switch (b | 0) {
                                case 9: {
                                    e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    b = c[e >> 2] | 0;
                                    c[d >> 2] = e + 4;
                                    c[a >> 2] = b;
                                    break a;
                                }
                                case 10: {
                                    e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    b = c[e >> 2] | 0;
                                    c[d >> 2] = e + 4;
                                    e = a;
                                    c[e >> 2] = b;
                                    c[e + 4 >> 2] = ((b | 0) < 0) << 31 >> 31;
                                    break a;
                                }
                                case 11: {
                                    e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    b = c[e >> 2] | 0;
                                    c[d >> 2] = e + 4;
                                    e = a;
                                    c[e >> 2] = b;
                                    c[e + 4 >> 2] = 0;
                                    break a;
                                }
                                case 12: {
                                    e = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
                                    b = e;
                                    f = c[b >> 2] | 0;
                                    b = c[b + 4 >> 2] | 0;
                                    c[d >> 2] = e + 8;
                                    e = a;
                                    c[e >> 2] = f;
                                    c[e + 4 >> 2] = b;
                                    break a;
                                }
                                case 13: {
                                    f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    e = c[f >> 2] | 0;
                                    c[d >> 2] = f + 4;
                                    e = (e & 65535) << 16 >> 16;
                                    f = a;
                                    c[f >> 2] = e;
                                    c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
                                    break a;
                                }
                                case 14: {
                                    f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    e = c[f >> 2] | 0;
                                    c[d >> 2] = f + 4;
                                    f = a;
                                    c[f >> 2] = e & 65535;
                                    c[f + 4 >> 2] = 0;
                                    break a;
                                }
                                case 15: {
                                    f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    e = c[f >> 2] | 0;
                                    c[d >> 2] = f + 4;
                                    e = (e & 255) << 24 >> 24;
                                    f = a;
                                    c[f >> 2] = e;
                                    c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
                                    break a;
                                }
                                case 16: {
                                    f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);
                                    e = c[f >> 2] | 0;
                                    c[d >> 2] = f + 4;
                                    f = a;
                                    c[f >> 2] = e & 255;
                                    c[f + 4 >> 2] = 0;
                                    break a;
                                }
                                case 17: {
                                    f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
                                    h = +g[f >> 3];
                                    c[d >> 2] = f + 8;
                                    g[a >> 3] = h;
                                    break a;
                                }
                                case 18: {
                                    f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);
                                    h = +g[f >> 3];
                                    c[d >> 2] = f + 8;
                                    g[a >> 3] = h;
                                    break a;
                                }
                                default: break a;
                            }
                        while (0);
                while (0); return; }
                function Hb(b, c, e, f) { b = b | 0; c = c | 0; e = e | 0; f = f | 0; if (!((b | 0) == 0 & (c | 0) == 0))
                    do {
                        e = e + -1 | 0;
                        a[e >> 0] = d[480 + (b & 15) >> 0] | 0 | f;
                        b = dc(b | 0, c | 0, 4) | 0;
                        c = A() | 0;
                    } while (!((b | 0) == 0 & (c | 0) == 0)); return e | 0; }
                function Ib(b, c, d) { b = b | 0; c = c | 0; d = d | 0; if (!((b | 0) == 0 & (c | 0) == 0))
                    do {
                        d = d + -1 | 0;
                        a[d >> 0] = b & 7 | 48;
                        b = dc(b | 0, c | 0, 3) | 0;
                        c = A() | 0;
                    } while (!((b | 0) == 0 & (c | 0) == 0)); return d | 0; }
                function Jb(b, c, d) { b = b | 0; c = c | 0; d = d | 0; var e = 0, f = 0, g = 0; if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295) {
                    do {
                        e = b;
                        b = cc(b | 0, c | 0, 10, 0) | 0;
                        f = c;
                        c = A() | 0;
                        g = Zb(b | 0, c | 0, 10, 0) | 0;
                        g = $b(e | 0, f | 0, g | 0, A() | 0) | 0;
                        A() | 0;
                        d = d + -1 | 0;
                        a[d >> 0] = g & 255 | 48;
                    } while (f >>> 0 > 9 | (f | 0) == 9 & e >>> 0 > 4294967295);
                    c = b;
                }
                else
                    c = b; if (c)
                    do {
                        g = c;
                        c = (c >>> 0) / 10 | 0;
                        d = d + -1 | 0;
                        a[d >> 0] = g - (c * 10 | 0) | 48;
                    } while (g >>> 0 >= 10); return d | 0; }
                function Kb(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, i = 0; h = d & 255; f = (e | 0) != 0; a: do
                    if (f & (b & 3 | 0) != 0) {
                        g = d & 255;
                        while (1) {
                            if ((a[b >> 0] | 0) == g << 24 >> 24) {
                                i = 6;
                                break a;
                            }
                            b = b + 1 | 0;
                            e = e + -1 | 0;
                            f = (e | 0) != 0;
                            if (!(f & (b & 3 | 0) != 0)) {
                                i = 5;
                                break;
                            }
                        }
                    }
                    else
                        i = 5;
                while (0); if ((i | 0) == 5)
                    if (f)
                        i = 6;
                    else
                        i = 16; b: do
                    if ((i | 0) == 6) {
                        g = d & 255;
                        if ((a[b >> 0] | 0) == g << 24 >> 24)
                            if (!e) {
                                i = 16;
                                break;
                            }
                            else
                                break;
                        f = w(h, 16843009) | 0;
                        c: do
                            if (e >>> 0 > 3)
                                while (1) {
                                    h = c[b >> 2] ^ f;
                                    if ((h & -2139062144 ^ -2139062144) & h + -16843009 | 0)
                                        break c;
                                    b = b + 4 | 0;
                                    e = e + -4 | 0;
                                    if (e >>> 0 <= 3) {
                                        i = 11;
                                        break;
                                    }
                                }
                            else
                                i = 11;
                        while (0);
                        if ((i | 0) == 11)
                            if (!e) {
                                i = 16;
                                break;
                            }
                        while (1) {
                            if ((a[b >> 0] | 0) == g << 24 >> 24)
                                break b;
                            e = e + -1 | 0;
                            if (!e) {
                                i = 16;
                                break;
                            }
                            else
                                b = b + 1 | 0;
                        }
                    }
                while (0); if ((i | 0) == 16)
                    b = 0; return b | 0; }
                function Lb(a, b, c, d, e) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; e = e | 0; var f = 0, g = 0; g = R; R = R + 256 | 0; f = g; if ((c | 0) > (d | 0) & (e & 73728 | 0) == 0) {
                    e = c - d | 0;
                    gc(f | 0, b << 24 >> 24 | 0, (e >>> 0 < 256 ? e : 256) | 0) | 0;
                    if (e >>> 0 > 255) {
                        b = c - d | 0;
                        do {
                            Eb(a, f, 256);
                            e = e + -256 | 0;
                        } while (e >>> 0 > 255);
                        e = b & 255;
                    }
                    Eb(a, f, e);
                } R = g; return; }
                function Mb(a, b) { a = a | 0; b = b | 0; if (!a)
                    a = 0;
                else
                    a = Rb(a, b, 0) | 0; return a | 0; }
                function Nb(b, e, f, g, h, i) { b = b | 0; e = +e; f = f | 0; g = g | 0; h = h | 0; i = i | 0; var j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0.0, r = 0, s = 0, t = 0, u = 0, v = 0, x = 0, y = 0, z = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0; H = R; R = R + 560 | 0; l = H + 32 | 0; u = H + 536 | 0; G = H; F = G; m = H + 540 | 0; c[u >> 2] = 0; E = m + 12 | 0; Ob(e) | 0; j = A() | 0; if ((j | 0) < 0) {
                    e = -e;
                    Ob(e) | 0;
                    D = 1;
                    C = 2431;
                    j = A() | 0;
                }
                else {
                    D = (h & 2049 | 0) != 0 & 1;
                    C = (h & 2048 | 0) == 0 ? ((h & 1 | 0) == 0 ? 2432 : 2437) : 2434;
                } do
                    if (0 == 0 & (j & 2146435072 | 0) == 2146435072) {
                        G = (i & 32 | 0) != 0;
                        j = D + 3 | 0;
                        Lb(b, 32, f, j, h & -65537);
                        Eb(b, C, D);
                        Eb(b, e != e | 0.0 != 0.0 ? (G ? 2458 : 2462) : G ? 2450 : 2454, 3);
                        Lb(b, 32, f, j, h ^ 8192);
                    }
                    else {
                        q = +Pb(e, u) * 2.0;
                        j = q != 0.0;
                        if (j)
                            c[u >> 2] = (c[u >> 2] | 0) + -1;
                        t = i | 32;
                        if ((t | 0) == 97) {
                            o = i & 32;
                            r = (o | 0) == 0 ? C : C + 9 | 0;
                            p = D | 2;
                            j = 12 - g | 0;
                            do
                                if (!(g >>> 0 > 11 | (j | 0) == 0)) {
                                    e = 8.0;
                                    do {
                                        j = j + -1 | 0;
                                        e = e * 16.0;
                                    } while ((j | 0) != 0);
                                    if ((a[r >> 0] | 0) == 45) {
                                        e = -(e + (-q - e));
                                        break;
                                    }
                                    else {
                                        e = q + e - e;
                                        break;
                                    }
                                }
                                else
                                    e = q;
                            while (0);
                            k = c[u >> 2] | 0;
                            j = (k | 0) < 0 ? 0 - k | 0 : k;
                            j = Jb(j, ((j | 0) < 0) << 31 >> 31, E) | 0;
                            if ((j | 0) == (E | 0)) {
                                j = m + 11 | 0;
                                a[j >> 0] = 48;
                            }
                            a[j + -1 >> 0] = ((31 ? k >> 31 : k) & 2) + 43;
                            n = j + -2 | 0;
                            a[n >> 0] = i + 15;
                            k = (g | 0) < 1;
                            l = (h & 8 | 0) == 0;
                            m = G;
                            do {
                                D = ~~e;
                                j = m + 1 | 0;
                                a[m >> 0] = o | d[480 + D >> 0];
                                e = (e - +(D | 0)) * 16.0;
                                if ((j - F | 0) == 1 ? !(l & (k & e == 0.0)) : 0) {
                                    a[j >> 0] = 46;
                                    m = m + 2 | 0;
                                }
                                else
                                    m = j;
                            } while (e != 0.0);
                            if ((g | 0) != 0 ? (-2 - F + m | 0) < (g | 0) : 0) {
                                k = E;
                                l = n;
                                j = g + 2 + k - l | 0;
                            }
                            else {
                                k = E;
                                l = n;
                                j = k - F - l + m | 0;
                            }
                            E = j + p | 0;
                            Lb(b, 32, f, E, h);
                            Eb(b, r, p);
                            Lb(b, 48, f, E, h ^ 65536);
                            F = m - F | 0;
                            Eb(b, G, F);
                            G = k - l | 0;
                            Lb(b, 48, j - (F + G) | 0, 0, 0);
                            Eb(b, n, G);
                            Lb(b, 32, f, E, h ^ 8192);
                            j = E;
                            break;
                        }
                        k = (g | 0) < 0 ? 6 : g;
                        if (j) {
                            j = (c[u >> 2] | 0) + -28 | 0;
                            c[u >> 2] = j;
                            e = q * 268435456.0;
                        }
                        else {
                            e = q;
                            j = c[u >> 2] | 0;
                        }
                        B = (j | 0) < 0 ? l : l + 288 | 0;
                        l = B;
                        do {
                            y = ~~e >>> 0;
                            c[l >> 2] = y;
                            l = l + 4 | 0;
                            e = (e - +(y >>> 0)) * 1.0e9;
                        } while (e != 0.0);
                        y = B;
                        if ((j | 0) > 0) {
                            o = B;
                            while (1) {
                                n = (j | 0) < 29 ? j : 29;
                                j = l + -4 | 0;
                                if (j >>> 0 >= o >>> 0) {
                                    m = 0;
                                    do {
                                        s = ec(c[j >> 2] | 0, 0, n | 0) | 0;
                                        s = _b(s | 0, A() | 0, m | 0, 0) | 0;
                                        v = A() | 0;
                                        m = cc(s | 0, v | 0, 1e9, 0) | 0;
                                        x = Zb(m | 0, A() | 0, 1e9, 0) | 0;
                                        x = $b(s | 0, v | 0, x | 0, A() | 0) | 0;
                                        A() | 0;
                                        c[j >> 2] = x;
                                        j = j + -4 | 0;
                                    } while (j >>> 0 >= o >>> 0);
                                    if (m) {
                                        x = o + -4 | 0;
                                        c[x >> 2] = m;
                                        m = x;
                                    }
                                    else
                                        m = o;
                                }
                                else
                                    m = o;
                                a: do
                                    if (l >>> 0 > m >>> 0) {
                                        j = l;
                                        while (1) {
                                            l = j + -4 | 0;
                                            if (c[l >> 2] | 0) {
                                                l = j;
                                                break a;
                                            }
                                            if (l >>> 0 > m >>> 0)
                                                j = l;
                                            else
                                                break;
                                        }
                                    }
                                while (0);
                                j = (c[u >> 2] | 0) - n | 0;
                                c[u >> 2] = j;
                                if ((j | 0) > 0)
                                    o = m;
                                else
                                    break;
                            }
                        }
                        else
                            m = B;
                        if ((j | 0) < 0) {
                            g = ((k + 25 | 0) / 9 | 0) + 1 | 0;
                            s = (t | 0) == 102;
                            do {
                                r = 0 - j | 0;
                                r = (r | 0) < 9 ? r : 9;
                                if (m >>> 0 < l >>> 0) {
                                    n = (1 << r) + -1 | 0;
                                    o = r ? 1e9 >>> r : 1e9;
                                    p = 0;
                                    j = m;
                                    do {
                                        x = c[j >> 2] | 0;
                                        c[j >> 2] = (r ? x >>> r : x) + p;
                                        p = w(x & n, o) | 0;
                                        j = j + 4 | 0;
                                    } while (j >>> 0 < l >>> 0);
                                    m = (c[m >> 2] | 0) == 0 ? m + 4 | 0 : m;
                                    if (p) {
                                        c[l >> 2] = p;
                                        l = l + 4 | 0;
                                    }
                                }
                                else
                                    m = (c[m >> 2] | 0) == 0 ? m + 4 | 0 : m;
                                j = s ? B : m;
                                x = l - j | 0;
                                l = ((2 ? x >> 2 : x) | 0) > (g | 0) ? j + (g << 2) | 0 : l;
                                j = (c[u >> 2] | 0) + r | 0;
                                c[u >> 2] = j;
                            } while ((j | 0) < 0);
                            s = m;
                        }
                        else
                            s = m;
                        if (s >>> 0 < l >>> 0) {
                            j = y - s | 0;
                            j = (2 ? j >> 2 : j) * 9 | 0;
                            n = c[s >> 2] | 0;
                            if (n >>> 0 >= 10) {
                                m = 10;
                                do {
                                    m = m * 10 | 0;
                                    j = j + 1 | 0;
                                } while (n >>> 0 >= m >>> 0);
                            }
                        }
                        else
                            j = 0;
                        v = (t | 0) == 103;
                        x = (k | 0) != 0;
                        m = k - ((t | 0) == 102 ? 0 : j) + ((x & v) << 31 >> 31) | 0;
                        u = l - y | 0;
                        if ((m | 0) < (((2 ? u >> 2 : u) * 9 | 0) + -9 | 0)) {
                            u = m + 9216 | 0;
                            m = (u | 0) / 9 | 0;
                            g = B + 4 + (m + -1024 << 2) | 0;
                            m = u - (m * 9 | 0) | 0;
                            if ((m | 0) < 8) {
                                n = 10;
                                while (1) {
                                    n = n * 10 | 0;
                                    if ((m | 0) < 7)
                                        m = m + 1 | 0;
                                    else
                                        break;
                                }
                            }
                            else
                                n = 10;
                            p = c[g >> 2] | 0;
                            m = (p >>> 0) / (n >>> 0) | 0;
                            r = p - (w(m, n) | 0) | 0;
                            o = (g + 4 | 0) == (l | 0);
                            if (!(o & (r | 0) == 0)) {
                                q = (m & 1 | 0) == 0 ? 9007199254740992.0 : 9007199254740994.0;
                                u = 1 ? n >>> 1 : n;
                                e = r >>> 0 < u >>> 0 ? .5 : o & (r | 0) == (u | 0) ? 1.0 : 1.5;
                                if (D) {
                                    u = (a[C >> 0] | 0) == 45;
                                    e = u ? -e : e;
                                    q = u ? -q : q;
                                }
                                m = p - r | 0;
                                c[g >> 2] = m;
                                if (q + e != q) {
                                    u = m + n | 0;
                                    c[g >> 2] = u;
                                    if (u >>> 0 > 999999999) {
                                        n = g;
                                        j = s;
                                        while (1) {
                                            m = n + -4 | 0;
                                            c[n >> 2] = 0;
                                            if (m >>> 0 < j >>> 0) {
                                                j = j + -4 | 0;
                                                c[j >> 2] = 0;
                                            }
                                            u = (c[m >> 2] | 0) + 1 | 0;
                                            c[m >> 2] = u;
                                            if (u >>> 0 > 999999999)
                                                n = m;
                                            else {
                                                n = j;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        m = g;
                                        n = s;
                                    }
                                    j = y - n | 0;
                                    j = (2 ? j >> 2 : j) * 9 | 0;
                                    p = c[n >> 2] | 0;
                                    if (p >>> 0 >= 10) {
                                        o = 10;
                                        do {
                                            o = o * 10 | 0;
                                            j = j + 1 | 0;
                                        } while (p >>> 0 >= o >>> 0);
                                    }
                                }
                                else {
                                    m = g;
                                    n = s;
                                }
                            }
                            else {
                                m = g;
                                n = s;
                            }
                            u = m + 4 | 0;
                            l = l >>> 0 > u >>> 0 ? u : l;
                        }
                        else
                            n = s;
                        g = 0 - j | 0;
                        b: do
                            if (l >>> 0 > n >>> 0)
                                while (1) {
                                    m = l + -4 | 0;
                                    if (c[m >> 2] | 0) {
                                        u = l;
                                        t = 1;
                                        break b;
                                    }
                                    if (m >>> 0 > n >>> 0)
                                        l = m;
                                    else {
                                        u = m;
                                        t = 0;
                                        break;
                                    }
                                }
                            else {
                                u = l;
                                t = 0;
                            }
                        while (0);
                        do
                            if (v) {
                                k = k + ((x ^ 1) & 1) | 0;
                                if ((k | 0) > (j | 0) & (j | 0) > -5) {
                                    o = i + -1 | 0;
                                    k = k + -1 - j | 0;
                                }
                                else {
                                    o = i + -2 | 0;
                                    k = k + -1 | 0;
                                }
                                if (!(h & 8)) {
                                    if (t ? (z = c[u + -4 >> 2] | 0, (z | 0) != 0) : 0)
                                        if (!((z >>> 0) % 10 | 0)) {
                                            m = 0;
                                            l = 10;
                                            do {
                                                l = l * 10 | 0;
                                                m = m + 1 | 0;
                                            } while (!((z >>> 0) % (l >>> 0) | 0 | 0));
                                        }
                                        else
                                            m = 0;
                                    else
                                        m = 9;
                                    l = u - y | 0;
                                    l = ((2 ? l >> 2 : l) * 9 | 0) + -9 | 0;
                                    if ((o | 32 | 0) == 102) {
                                        i = l - m | 0;
                                        i = (i | 0) > 0 ? i : 0;
                                        k = (k | 0) < (i | 0) ? k : i;
                                        break;
                                    }
                                    else {
                                        i = l + j - m | 0;
                                        i = (i | 0) > 0 ? i : 0;
                                        k = (k | 0) < (i | 0) ? k : i;
                                        break;
                                    }
                                }
                            }
                            else
                                o = i;
                        while (0);
                        s = (k | 0) != 0;
                        p = s ? 1 : (3 ? h >>> 3 : h) & 1;
                        r = (o | 32 | 0) == 102;
                        if (r) {
                            v = 0;
                            j = (j | 0) > 0 ? j : 0;
                        }
                        else {
                            l = (j | 0) < 0 ? g : j;
                            l = Jb(l, ((l | 0) < 0) << 31 >> 31, E) | 0;
                            m = E;
                            if ((m - l | 0) < 2)
                                do {
                                    l = l + -1 | 0;
                                    a[l >> 0] = 48;
                                } while ((m - l | 0) < 2);
                            a[l + -1 >> 0] = ((31 ? j >> 31 : j) & 2) + 43;
                            j = l + -2 | 0;
                            a[j >> 0] = o;
                            v = j;
                            j = m - j | 0;
                        }
                        j = D + 1 + k + p + j | 0;
                        Lb(b, 32, f, j, h);
                        Eb(b, C, D);
                        Lb(b, 48, f, j, h ^ 65536);
                        if (r) {
                            p = n >>> 0 > B >>> 0 ? B : n;
                            r = G + 9 | 0;
                            n = r;
                            o = G + 8 | 0;
                            m = p;
                            do {
                                l = Jb(c[m >> 2] | 0, 0, r) | 0;
                                if ((m | 0) == (p | 0)) {
                                    if ((l | 0) == (r | 0)) {
                                        a[o >> 0] = 48;
                                        l = o;
                                    }
                                }
                                else if (l >>> 0 > G >>> 0) {
                                    gc(G | 0, 48, l - F | 0) | 0;
                                    do
                                        l = l + -1 | 0;
                                    while (l >>> 0 > G >>> 0);
                                }
                                Eb(b, l, n - l | 0);
                                m = m + 4 | 0;
                            } while (m >>> 0 <= B >>> 0);
                            if (!((h & 8 | 0) == 0 & (s ^ 1)))
                                Eb(b, 2466, 1);
                            if (m >>> 0 < u >>> 0 & (k | 0) > 0)
                                while (1) {
                                    l = Jb(c[m >> 2] | 0, 0, r) | 0;
                                    if (l >>> 0 > G >>> 0) {
                                        gc(G | 0, 48, l - F | 0) | 0;
                                        do
                                            l = l + -1 | 0;
                                        while (l >>> 0 > G >>> 0);
                                    }
                                    Eb(b, l, (k | 0) < 9 ? k : 9);
                                    m = m + 4 | 0;
                                    l = k + -9 | 0;
                                    if (!(m >>> 0 < u >>> 0 & (k | 0) > 9)) {
                                        k = l;
                                        break;
                                    }
                                    else
                                        k = l;
                                }
                            Lb(b, 48, k + 9 | 0, 9, 0);
                        }
                        else {
                            u = t ? u : n + 4 | 0;
                            if (n >>> 0 < u >>> 0 & (k | 0) > -1) {
                                g = G + 9 | 0;
                                s = (h & 8 | 0) == 0;
                                t = g;
                                p = 0 - F | 0;
                                r = G + 8 | 0;
                                o = n;
                                do {
                                    l = Jb(c[o >> 2] | 0, 0, g) | 0;
                                    if ((l | 0) == (g | 0)) {
                                        a[r >> 0] = 48;
                                        l = r;
                                    }
                                    do
                                        if ((o | 0) == (n | 0)) {
                                            m = l + 1 | 0;
                                            Eb(b, l, 1);
                                            if (s & (k | 0) < 1) {
                                                l = m;
                                                break;
                                            }
                                            Eb(b, 2466, 1);
                                            l = m;
                                        }
                                        else {
                                            if (l >>> 0 <= G >>> 0)
                                                break;
                                            gc(G | 0, 48, l + p | 0) | 0;
                                            do
                                                l = l + -1 | 0;
                                            while (l >>> 0 > G >>> 0);
                                        }
                                    while (0);
                                    F = t - l | 0;
                                    Eb(b, l, (k | 0) > (F | 0) ? F : k);
                                    k = k - F | 0;
                                    o = o + 4 | 0;
                                } while (o >>> 0 < u >>> 0 & (k | 0) > -1);
                            }
                            Lb(b, 48, k + 18 | 0, 18, 0);
                            Eb(b, v, E - v | 0);
                        }
                        Lb(b, 32, f, j, h ^ 8192);
                    }
                while (0); R = H; return ((j | 0) < (f | 0) ? f : j) | 0; }
                function Ob(a) { a = +a; var b = 0; g[h >> 3] = a; b = c[h >> 2] | 0; z(c[h + 4 >> 2] | 0); return b | 0; }
                function Pb(a, b) { a = +a; b = b | 0; return +(+Qb(a, b)); }
                function Qb(a, b) { a = +a; b = b | 0; var d = 0, e = 0, f = 0; g[h >> 3] = a; d = c[h >> 2] | 0; e = c[h + 4 >> 2] | 0; f = dc(d | 0, e | 0, 52) | 0; A() | 0; switch (f & 2047) {
                    case 0: {
                        if (a != 0.0) {
                            a = +Qb(a * 18446744073709551616.0, b);
                            d = (c[b >> 2] | 0) + -64 | 0;
                        }
                        else
                            d = 0;
                        c[b >> 2] = d;
                        break;
                    }
                    case 2047: break;
                    default: {
                        c[b >> 2] = (f & 2047) + -1022;
                        c[h >> 2] = d;
                        c[h + 4 >> 2] = e & -2146435073 | 1071644672;
                        a = +g[h >> 3];
                    }
                } return +a; }
                function Rb(b, d, e) { b = b | 0; d = d | 0; e = e | 0; do
                    if (b) {
                        if (d >>> 0 < 128) {
                            a[b >> 0] = d;
                            b = 1;
                            break;
                        }
                        e = (Sb() | 0) + 188 | 0;
                        if (!(c[c[e >> 2] >> 2] | 0))
                            if ((d & -128 | 0) == 57216) {
                                a[b >> 0] = d;
                                b = 1;
                                break;
                            }
                            else {
                                b = ub() | 0;
                                c[b >> 2] = 84;
                                b = -1;
                                break;
                            }
                        if (d >>> 0 < 2048) {
                            a[b >> 0] = (6 ? d >>> 6 : d) | 192;
                            a[b + 1 >> 0] = d & 63 | 128;
                            b = 2;
                            break;
                        }
                        if (d >>> 0 < 55296 | (d & -8192 | 0) == 57344) {
                            a[b >> 0] = (12 ? d >>> 12 : d) | 224;
                            a[b + 1 >> 0] = (6 ? d >>> 6 : d) & 63 | 128;
                            a[b + 2 >> 0] = d & 63 | 128;
                            b = 3;
                            break;
                        }
                        if ((d + -65536 | 0) >>> 0 < 1048576) {
                            a[b >> 0] = (18 ? d >>> 18 : d) | 240;
                            a[b + 1 >> 0] = (12 ? d >>> 12 : d) & 63 | 128;
                            a[b + 2 >> 0] = (6 ? d >>> 6 : d) & 63 | 128;
                            a[b + 3 >> 0] = d & 63 | 128;
                            b = 4;
                            break;
                        }
                        else {
                            b = ub() | 0;
                            c[b >> 2] = 84;
                            b = -1;
                            break;
                        }
                    }
                    else
                        b = 1;
                while (0); return b | 0; }
                function Sb() { return Tb() | 0; }
                function Tb() { return 748; }
                function Ub(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, i = 0, j = 0; f = e + 16 | 0; g = c[f >> 2] | 0; if (!g)
                    if (!(Vb(e) | 0)) {
                        g = c[f >> 2] | 0;
                        h = 5;
                    }
                    else
                        f = 0;
                else
                    h = 5; a: do
                    if ((h | 0) == 5) {
                        j = e + 20 | 0;
                        i = c[j >> 2] | 0;
                        f = i;
                        if ((g - i | 0) >>> 0 < d >>> 0) {
                            f = W[c[e + 36 >> 2] & 7](e, b, d) | 0;
                            break;
                        }
                        b: do
                            if ((a[e + 75 >> 0] | 0) < 0 | (d | 0) == 0) {
                                h = 0;
                                g = b;
                            }
                            else {
                                i = d;
                                while (1) {
                                    g = i + -1 | 0;
                                    if ((a[b + g >> 0] | 0) == 10)
                                        break;
                                    if (!g) {
                                        h = 0;
                                        g = b;
                                        break b;
                                    }
                                    else
                                        i = g;
                                }
                                f = W[c[e + 36 >> 2] & 7](e, b, i) | 0;
                                if (f >>> 0 < i >>> 0)
                                    break a;
                                h = i;
                                g = b + i | 0;
                                d = d - i | 0;
                                f = c[j >> 2] | 0;
                            }
                        while (0);
                        fc(f | 0, g | 0, d | 0) | 0;
                        c[j >> 2] = (c[j >> 2] | 0) + d;
                        f = h + d | 0;
                    }
                while (0); return f | 0; }
                function Vb(b) { b = b | 0; var d = 0, e = 0; d = b + 74 | 0; e = a[d >> 0] | 0; a[d >> 0] = e + 255 | e; d = c[b >> 2] | 0; if (!(d & 8)) {
                    c[b + 8 >> 2] = 0;
                    c[b + 4 >> 2] = 0;
                    e = c[b + 44 >> 2] | 0;
                    c[b + 28 >> 2] = e;
                    c[b + 20 >> 2] = e;
                    c[b + 16 >> 2] = e + (c[b + 48 >> 2] | 0);
                    b = 0;
                }
                else {
                    c[b >> 2] = d | 32;
                    b = -1;
                } return b | 0; }
                function Wb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0; e = a + 20 | 0; f = c[e >> 2] | 0; a = (c[a + 16 >> 2] | 0) - f | 0; a = a >>> 0 > d >>> 0 ? d : a; fc(f | 0, b | 0, a | 0) | 0; c[e >> 2] = (c[e >> 2] | 0) + a; return d | 0; }
                function Xb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0; e = R; R = R + 16 | 0; f = e; c[f >> 2] = d; d = Ab(a, b, f) | 0; R = e; return d | 0; }
                function Yb(a, b) { a = a | 0; b = b | 0; var c = 0, d = 0, e = 0, f = 0; f = a & 65535; e = b & 65535; c = w(e, f) | 0; d = a >>> 16; a = (c >>> 16) + (w(e, d) | 0) | 0; e = b >>> 16; b = w(e, f) | 0; return (z((a >>> 16) + (w(e, d) | 0) + (((a & 65535) + b | 0) >>> 16) | 0), a + b << 16 | c & 65535 | 0) | 0; }
                function Zb(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; var e = 0, f = 0; e = a; f = c; c = Yb(e, f) | 0; a = A() | 0; return (z((w(b, f) | 0) + (w(d, e) | 0) + a | a & 0 | 0), c | 0 | 0) | 0; }
                function _b(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; c = a + c >>> 0; return (z(b + d + (c >>> 0 < a >>> 0 | 0) >>> 0 | 0), c | 0) | 0; }
                function $b(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0; return (z(d | 0), a - c >>> 0 | 0) | 0; }
                function ac(a) { a = a | 0; return (a ? 31 - (x(a ^ a - 1) | 0) | 0 : 32) | 0; }
                function bc(a, b, d, e, f) { a = a | 0; b = b | 0; d = d | 0; e = e | 0; f = f | 0; var g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0; l = a; j = b; k = j; h = d; n = e; i = n; if (!k) {
                    g = (f | 0) != 0;
                    if (!i) {
                        if (g) {
                            c[f >> 2] = (l >>> 0) % (h >>> 0);
                            c[f + 4 >> 2] = 0;
                        }
                        n = 0;
                        f = (l >>> 0) / (h >>> 0) >>> 0;
                        return (z(n | 0), f) | 0;
                    }
                    else {
                        if (!g) {
                            n = 0;
                            f = 0;
                            return (z(n | 0), f) | 0;
                        }
                        c[f >> 2] = a | 0;
                        c[f + 4 >> 2] = b & 0;
                        n = 0;
                        f = 0;
                        return (z(n | 0), f) | 0;
                    }
                } g = (i | 0) == 0; do
                    if (h) {
                        if (!g) {
                            g = (x(i | 0) | 0) - (x(k | 0) | 0) | 0;
                            if (g >>> 0 <= 31) {
                                m = g + 1 | 0;
                                i = 31 - g | 0;
                                b = g - 31 >> 31;
                                h = m;
                                a = l >>> (m >>> 0) & b | k << i;
                                b = k >>> (m >>> 0) & b;
                                g = 0;
                                i = l << i;
                                break;
                            }
                            if (!f) {
                                n = 0;
                                f = 0;
                                return (z(n | 0), f) | 0;
                            }
                            c[f >> 2] = a | 0;
                            c[f + 4 >> 2] = j | b & 0;
                            n = 0;
                            f = 0;
                            return (z(n | 0), f) | 0;
                        }
                        g = h - 1 | 0;
                        if (g & h | 0) {
                            i = (x(h | 0) | 0) + 33 - (x(k | 0) | 0) | 0;
                            p = 64 - i | 0;
                            m = 32 - i | 0;
                            j = m >> 31;
                            o = i - 32 | 0;
                            b = o >> 31;
                            h = i;
                            a = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & b;
                            b = b & k >>> (i >>> 0);
                            g = l << p & j;
                            i = (k << p | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
                            break;
                        }
                        if (f | 0) {
                            c[f >> 2] = g & l;
                            c[f + 4 >> 2] = 0;
                        }
                        if ((h | 0) == 1) {
                            o = j | b & 0;
                            p = a | 0 | 0;
                            return (z(o | 0), p) | 0;
                        }
                        else {
                            p = ac(h | 0) | 0;
                            o = k >>> (p >>> 0) | 0;
                            p = k << 32 - p | l >>> (p >>> 0) | 0;
                            return (z(o | 0), p) | 0;
                        }
                    }
                    else {
                        if (g) {
                            if (f | 0) {
                                c[f >> 2] = (k >>> 0) % (h >>> 0);
                                c[f + 4 >> 2] = 0;
                            }
                            o = 0;
                            p = (k >>> 0) / (h >>> 0) >>> 0;
                            return (z(o | 0), p) | 0;
                        }
                        if (!l) {
                            if (f | 0) {
                                c[f >> 2] = 0;
                                c[f + 4 >> 2] = (k >>> 0) % (i >>> 0);
                            }
                            o = 0;
                            p = (k >>> 0) / (i >>> 0) >>> 0;
                            return (z(o | 0), p) | 0;
                        }
                        g = i - 1 | 0;
                        if (!(g & i)) {
                            if (f | 0) {
                                c[f >> 2] = a | 0;
                                c[f + 4 >> 2] = g & k | b & 0;
                            }
                            o = 0;
                            p = k >>> ((ac(i | 0) | 0) >>> 0);
                            return (z(o | 0), p) | 0;
                        }
                        g = (x(i | 0) | 0) - (x(k | 0) | 0) | 0;
                        if (g >>> 0 <= 30) {
                            b = g + 1 | 0;
                            i = 31 - g | 0;
                            h = b;
                            a = k << i | l >>> (b >>> 0);
                            b = k >>> (b >>> 0);
                            g = 0;
                            i = l << i;
                            break;
                        }
                        if (!f) {
                            o = 0;
                            p = 0;
                            return (z(o | 0), p) | 0;
                        }
                        c[f >> 2] = a | 0;
                        c[f + 4 >> 2] = j | b & 0;
                        o = 0;
                        p = 0;
                        return (z(o | 0), p) | 0;
                    }
                while (0); if (!h) {
                    k = i;
                    j = 0;
                    i = 0;
                }
                else {
                    m = d | 0 | 0;
                    l = n | e & 0;
                    k = _b(m | 0, l | 0, -1, -1) | 0;
                    d = A() | 0;
                    j = i;
                    i = 0;
                    do {
                        e = j;
                        j = g >>> 31 | j << 1;
                        g = i | g << 1;
                        e = a << 1 | e >>> 31 | 0;
                        n = a >>> 31 | b << 1 | 0;
                        $b(k | 0, d | 0, e | 0, n | 0) | 0;
                        p = A() | 0;
                        o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
                        i = o & 1;
                        a = $b(e | 0, n | 0, o & m | 0, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l | 0) | 0;
                        b = A() | 0;
                        h = h - 1 | 0;
                    } while ((h | 0) != 0);
                    k = j;
                    j = 0;
                } h = 0; if (f | 0) {
                    c[f >> 2] = a;
                    c[f + 4 >> 2] = b;
                } o = (g | 0) >>> 31 | (k | h) << 1 | (h << 1 | g >>> 31) & 0 | j; p = (g << 1 | 0 >>> 31) & -2 | i; return (z(o | 0), p) | 0; }
                function cc(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; return bc(a, b, c, d, 0) | 0; }
                function dc(a, b, c) { a = a | 0; b = b | 0; c = c | 0; if ((c | 0) < 32) {
                    z(b >>> c | 0);
                    return a >>> c | (b & (1 << c) - 1) << 32 - c;
                } z(0); return b >>> c - 32 | 0; }
                function ec(a, b, c) { a = a | 0; b = b | 0; c = c | 0; if ((c | 0) < 32) {
                    z(b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c | 0);
                    return a << c;
                } z(a << c - 32 | 0); return 0; }
                function fc(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0; if ((e | 0) >= 8192) {
                    M(b | 0, d | 0, e | 0) | 0;
                    return b | 0;
                } h = b | 0; g = b + e | 0; if ((b & 3) == (d & 3)) {
                    while (b & 3) {
                        if (!e)
                            return h | 0;
                        a[b >> 0] = a[d >> 0] | 0;
                        b = b + 1 | 0;
                        d = d + 1 | 0;
                        e = e - 1 | 0;
                    }
                    e = g & -4 | 0;
                    f = e - 64 | 0;
                    while ((b | 0) <= (f | 0)) {
                        c[b >> 2] = c[d >> 2];
                        c[b + 4 >> 2] = c[d + 4 >> 2];
                        c[b + 8 >> 2] = c[d + 8 >> 2];
                        c[b + 12 >> 2] = c[d + 12 >> 2];
                        c[b + 16 >> 2] = c[d + 16 >> 2];
                        c[b + 20 >> 2] = c[d + 20 >> 2];
                        c[b + 24 >> 2] = c[d + 24 >> 2];
                        c[b + 28 >> 2] = c[d + 28 >> 2];
                        c[b + 32 >> 2] = c[d + 32 >> 2];
                        c[b + 36 >> 2] = c[d + 36 >> 2];
                        c[b + 40 >> 2] = c[d + 40 >> 2];
                        c[b + 44 >> 2] = c[d + 44 >> 2];
                        c[b + 48 >> 2] = c[d + 48 >> 2];
                        c[b + 52 >> 2] = c[d + 52 >> 2];
                        c[b + 56 >> 2] = c[d + 56 >> 2];
                        c[b + 60 >> 2] = c[d + 60 >> 2];
                        b = b + 64 | 0;
                        d = d + 64 | 0;
                    }
                    while ((b | 0) < (e | 0)) {
                        c[b >> 2] = c[d >> 2];
                        b = b + 4 | 0;
                        d = d + 4 | 0;
                    }
                }
                else {
                    e = g - 4 | 0;
                    while ((b | 0) < (e | 0)) {
                        a[b >> 0] = a[d >> 0] | 0;
                        a[b + 1 >> 0] = a[d + 1 >> 0] | 0;
                        a[b + 2 >> 0] = a[d + 2 >> 0] | 0;
                        a[b + 3 >> 0] = a[d + 3 >> 0] | 0;
                        b = b + 4 | 0;
                        d = d + 4 | 0;
                    }
                } while ((b | 0) < (g | 0)) {
                    a[b >> 0] = a[d >> 0] | 0;
                    b = b + 1 | 0;
                    d = d + 1 | 0;
                } return h | 0; }
                function gc(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, i = 0; h = b + e | 0; d = d & 255; if ((e | 0) >= 67) {
                    while (b & 3) {
                        a[b >> 0] = d;
                        b = b + 1 | 0;
                    }
                    f = h & -4 | 0;
                    i = d | d << 8 | d << 16 | d << 24;
                    g = f - 64 | 0;
                    while ((b | 0) <= (g | 0)) {
                        c[b >> 2] = i;
                        c[b + 4 >> 2] = i;
                        c[b + 8 >> 2] = i;
                        c[b + 12 >> 2] = i;
                        c[b + 16 >> 2] = i;
                        c[b + 20 >> 2] = i;
                        c[b + 24 >> 2] = i;
                        c[b + 28 >> 2] = i;
                        c[b + 32 >> 2] = i;
                        c[b + 36 >> 2] = i;
                        c[b + 40 >> 2] = i;
                        c[b + 44 >> 2] = i;
                        c[b + 48 >> 2] = i;
                        c[b + 52 >> 2] = i;
                        c[b + 56 >> 2] = i;
                        c[b + 60 >> 2] = i;
                        b = b + 64 | 0;
                    }
                    while ((b | 0) < (f | 0)) {
                        c[b >> 2] = i;
                        b = b + 4 | 0;
                    }
                } while ((b | 0) < (h | 0)) {
                    a[b >> 0] = d;
                    b = b + 1 | 0;
                } return h - e | 0; }
                function hc(a) { a = a | 0; var b = 0, d = 0; d = c[i >> 2] | 0; b = d + a | 0; if ((a | 0) > 0 & (b | 0) < (d | 0) | (b | 0) < 0) {
                    O(b | 0) | 0;
                    G(12);
                    return -1;
                } if ((b | 0) > (L() | 0) ? (N(b | 0) | 0) == 0 : 0) {
                    G(12);
                    return -1;
                } c[i >> 2] = b; return d | 0; }
                function ic(a, b) { a = a | 0; b = b | 0; return V[a & 3](b | 0) | 0; }
                function jc(a) { a = a | 0; return B(0, a | 0) | 0; }
                function kc(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; return W[a & 7](b | 0, c | 0, d | 0) | 0; }
                function lc(a, b, c) { a = a | 0; b = b | 0; c = c | 0; return C(0, a | 0, b | 0, c | 0) | 0; }
                function mc(a, b) { a = a | 0; b = b | 0; X[a & 1](b | 0); }
                function nc(a) { a = a | 0; D(0, a | 0); }
                function oc(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; Y[a & 3](b | 0, c | 0, d | 0); }
                function pc(a, b, c) { a = a | 0; b = b | 0; c = c | 0; E(0, a | 0, b | 0, c | 0); }
                function qc(a, b, c, d, e) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; e = e | 0; Z[a & 3](b | 0, c | 0, d | 0, e | 0); }
                function rc(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; F(0, a | 0, b | 0, c | 0, d | 0); }
                function sc(a) { a = a | 0; y(0); return 0; }
                function tc(a, b, c) { a = a | 0; b = b | 0; c = c | 0; y(1); return 0; }
                function uc(a) { a = a | 0; y(2); }
                function vc(a, b, c) { a = a | 0; b = b | 0; c = c | 0; y(3); }
                function wc(a, b, c, d) { a = a | 0; b = b | 0; c = c | 0; d = d | 0; y(4); }
                // EMSCRIPTEN_END_FUNCS
                var V = [sc, jc, qb, sc];
                var W = [tc, lc, wb, sb, Wb, rb, tc, tc];
                var X = [uc, nc];
                var Y = [vc, pc, _a, $a];
                var Z = [wc, rc, Ya, Za];
                return { ___errno_location: ub, ___muldi3: Zb, ___udivdi3: cc, _bitshift64Lshr: dc, _bitshift64Shl: ec, _csmFree: kb, _csmGetDrawableConstantFlags: Ba, _csmGetDrawableCount: za, _csmGetDrawableDrawOrders: Ea, _csmGetDrawableDynamicFlags: Ca, _csmGetDrawableIds: Aa, _csmGetDrawableIndexCounts: Ma, _csmGetDrawableIndices: Na, _csmGetDrawableMaskCounts: Ha, _csmGetDrawableMasks: Ia, _csmGetDrawableOpacities: Ga, _csmGetDrawableRenderOrders: Fa, _csmGetDrawableTextureIndices: Da, _csmGetDrawableVertexCounts: Ja, _csmGetDrawableVertexPositions: Ka, _csmGetDrawableVertexUvs: La, _csmGetParameterCount: pa, _csmGetParameterDefaultValues: ta, _csmGetParameterIds: qa, _csmGetParameterMaximumValues: sa, _csmGetParameterMinimumValues: ra, _csmGetParameterValues: ua, _csmGetPartCount: va, _csmGetPartIds: wa, _csmGetPartOpacities: xa, _csmGetPartParentPartIndices: ya, _csmGetSizeofModel: ma, _csmGetVersion: ha, _csmInitializeModelInPlace: na, _csmMalloc: jb, _csmMallocMoc: hb, _csmMallocModelAndInitialize: ib, _csmReadCanvasInfo: la, _csmResetDrawableDynamicFlags: Oa, _csmReviveMocInPlace: ka, _csmSetLogFunction: ja, _csmUpdateModel: oa, _emscripten_replace_memory: U, _free: mb, _i64Add: _b, _i64Subtract: $b, _malloc: lb, _memcpy: fc, _memset: gc, _sbrk: hc, dynCall_ii: ic, dynCall_iiii: kc, dynCall_vi: mc, dynCall_viii: oc, dynCall_viiii: qc, establishStackSpace: ba, stackAlloc: _, stackRestore: aa, stackSave: $ };
            })(asmGlobalArg, asmLibraryArg, buffer);
            var ___errno_location = Module["___errno_location"] = asm["___errno_location"];
            var ___muldi3 = Module["___muldi3"] = asm["___muldi3"];
            var ___udivdi3 = Module["___udivdi3"] = asm["___udivdi3"];
            var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
            var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
            var _csmFree = Module["_csmFree"] = asm["_csmFree"];
            var _csmGetDrawableConstantFlags = Module["_csmGetDrawableConstantFlags"] = asm["_csmGetDrawableConstantFlags"];
            var _csmGetDrawableCount = Module["_csmGetDrawableCount"] = asm["_csmGetDrawableCount"];
            var _csmGetDrawableDrawOrders = Module["_csmGetDrawableDrawOrders"] = asm["_csmGetDrawableDrawOrders"];
            var _csmGetDrawableDynamicFlags = Module["_csmGetDrawableDynamicFlags"] = asm["_csmGetDrawableDynamicFlags"];
            var _csmGetDrawableIds = Module["_csmGetDrawableIds"] = asm["_csmGetDrawableIds"];
            var _csmGetDrawableIndexCounts = Module["_csmGetDrawableIndexCounts"] = asm["_csmGetDrawableIndexCounts"];
            var _csmGetDrawableIndices = Module["_csmGetDrawableIndices"] = asm["_csmGetDrawableIndices"];
            var _csmGetDrawableMaskCounts = Module["_csmGetDrawableMaskCounts"] = asm["_csmGetDrawableMaskCounts"];
            var _csmGetDrawableMasks = Module["_csmGetDrawableMasks"] = asm["_csmGetDrawableMasks"];
            var _csmGetDrawableOpacities = Module["_csmGetDrawableOpacities"] = asm["_csmGetDrawableOpacities"];
            var _csmGetDrawableRenderOrders = Module["_csmGetDrawableRenderOrders"] = asm["_csmGetDrawableRenderOrders"];
            var _csmGetDrawableTextureIndices = Module["_csmGetDrawableTextureIndices"] = asm["_csmGetDrawableTextureIndices"];
            var _csmGetDrawableVertexCounts = Module["_csmGetDrawableVertexCounts"] = asm["_csmGetDrawableVertexCounts"];
            var _csmGetDrawableVertexPositions = Module["_csmGetDrawableVertexPositions"] = asm["_csmGetDrawableVertexPositions"];
            var _csmGetDrawableVertexUvs = Module["_csmGetDrawableVertexUvs"] = asm["_csmGetDrawableVertexUvs"];
            var _csmGetParameterCount = Module["_csmGetParameterCount"] = asm["_csmGetParameterCount"];
            var _csmGetParameterDefaultValues = Module["_csmGetParameterDefaultValues"] = asm["_csmGetParameterDefaultValues"];
            var _csmGetParameterIds = Module["_csmGetParameterIds"] = asm["_csmGetParameterIds"];
            var _csmGetParameterMaximumValues = Module["_csmGetParameterMaximumValues"] = asm["_csmGetParameterMaximumValues"];
            var _csmGetParameterMinimumValues = Module["_csmGetParameterMinimumValues"] = asm["_csmGetParameterMinimumValues"];
            var _csmGetParameterValues = Module["_csmGetParameterValues"] = asm["_csmGetParameterValues"];
            var _csmGetPartCount = Module["_csmGetPartCount"] = asm["_csmGetPartCount"];
            var _csmGetPartIds = Module["_csmGetPartIds"] = asm["_csmGetPartIds"];
            var _csmGetPartOpacities = Module["_csmGetPartOpacities"] = asm["_csmGetPartOpacities"];
            var _csmGetPartParentPartIndices = Module["_csmGetPartParentPartIndices"] = asm["_csmGetPartParentPartIndices"];
            var _csmGetSizeofModel = Module["_csmGetSizeofModel"] = asm["_csmGetSizeofModel"];
            var _csmGetVersion = Module["_csmGetVersion"] = asm["_csmGetVersion"];
            var _csmInitializeModelInPlace = Module["_csmInitializeModelInPlace"] = asm["_csmInitializeModelInPlace"];
            var _csmMalloc = Module["_csmMalloc"] = asm["_csmMalloc"];
            var _csmMallocMoc = Module["_csmMallocMoc"] = asm["_csmMallocMoc"];
            var _csmMallocModelAndInitialize = Module["_csmMallocModelAndInitialize"] = asm["_csmMallocModelAndInitialize"];
            var _csmReadCanvasInfo = Module["_csmReadCanvasInfo"] = asm["_csmReadCanvasInfo"];
            var _csmResetDrawableDynamicFlags = Module["_csmResetDrawableDynamicFlags"] = asm["_csmResetDrawableDynamicFlags"];
            var _csmReviveMocInPlace = Module["_csmReviveMocInPlace"] = asm["_csmReviveMocInPlace"];
            var _csmSetLogFunction = Module["_csmSetLogFunction"] = asm["_csmSetLogFunction"];
            var _csmUpdateModel = Module["_csmUpdateModel"] = asm["_csmUpdateModel"];
            var _emscripten_replace_memory = Module["_emscripten_replace_memory"] = asm["_emscripten_replace_memory"];
            var _free = Module["_free"] = asm["_free"];
            var _i64Add = Module["_i64Add"] = asm["_i64Add"];
            var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
            var _malloc = Module["_malloc"] = asm["_malloc"];
            var _memcpy = Module["_memcpy"] = asm["_memcpy"];
            var _memset = Module["_memset"] = asm["_memset"];
            var _sbrk = Module["_sbrk"] = asm["_sbrk"];
            var establishStackSpace = Module["establishStackSpace"] = asm["establishStackSpace"];
            var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
            var stackRestore = Module["stackRestore"] = asm["stackRestore"];
            var stackSave = Module["stackSave"] = asm["stackSave"];
            var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
            var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
            var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
            var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
            var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];
            Module["asm"] = asm;
            Module["ccall"] = ccall;
            Module["UTF8ToString"] = UTF8ToString;
            Module["addFunction"] = addFunction;
            if (memoryInitializer) {
                if (!isDataURI(memoryInitializer)) {
                    memoryInitializer = locateFile(memoryInitializer);
                }
                if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
                    var data = Module["readBinary"](memoryInitializer);
                    HEAPU8.set(data, GLOBAL_BASE);
                }
                else {
                    addRunDependency("memory initializer");
                    var applyMemoryInitializer = function (data) { if (data.byteLength)
                        data = new Uint8Array(data); HEAPU8.set(data, GLOBAL_BASE); if (Module["memoryInitializerRequest"])
                        delete Module["memoryInitializerRequest"].response; removeRunDependency("memory initializer"); };
                    var doBrowserLoad = function () { Module["readAsync"](memoryInitializer, applyMemoryInitializer, function () { throw "could not load memory initializer " + memoryInitializer; }); };
                    var memoryInitializerBytes = tryParseAsDataURI(memoryInitializer);
                    if (memoryInitializerBytes) {
                        applyMemoryInitializer(memoryInitializerBytes.buffer);
                    }
                    else if (Module["memoryInitializerRequest"]) {
                        var useRequest = function () { var request = Module["memoryInitializerRequest"]; var response = request.response; if (request.status !== 200 && request.status !== 0) {
                            var data = tryParseAsDataURI(Module["memoryInitializerRequestURL"]);
                            if (data) {
                                response = data.buffer;
                            }
                            else {
                                console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + request.status + ", retrying " + memoryInitializer);
                                doBrowserLoad();
                                return;
                            }
                        } applyMemoryInitializer(response); };
                        if (Module["memoryInitializerRequest"].response) {
                            setTimeout(useRequest, 0);
                        }
                        else {
                            Module["memoryInitializerRequest"].addEventListener("load", useRequest);
                        }
                    }
                    else {
                        doBrowserLoad();
                    }
                }
            }
            Module["then"] = function (func) { if (Module["calledRun"]) {
                func(Module);
            }
            else {
                var old = Module["onRuntimeInitialized"];
                Module["onRuntimeInitialized"] = function () { if (old)
                    old(); func(Module); };
            } return Module; };
            function ExitStatus(status) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + status + ")"; this.status = status; }
            ExitStatus.prototype = new Error;
            ExitStatus.prototype.constructor = ExitStatus;
            dependenciesFulfilled = function runCaller() { if (!Module["calledRun"])
                run(); if (!Module["calledRun"])
                dependenciesFulfilled = runCaller; };
            function run(args) { args = args || Module["arguments"]; if (runDependencies > 0) {
                return;
            } preRun(); if (runDependencies > 0)
                return; if (Module["calledRun"])
                return; function doRun() { if (Module["calledRun"])
                return; Module["calledRun"] = true; if (ABORT)
                return; ensureInitRuntime(); preMain(); if (Module["onRuntimeInitialized"])
                Module["onRuntimeInitialized"](); postRun(); } if (Module["setStatus"]) {
                Module["setStatus"]("Running...");
                setTimeout(function () { setTimeout(function () { Module["setStatus"](""); }, 1); doRun(); }, 1);
            }
            else {
                doRun();
            } }
            Module["run"] = run;
            function abort(what) { if (Module["onAbort"]) {
                Module["onAbort"](what);
            } if (what !== undefined) {
                out(what);
                err(what);
                what = JSON.stringify(what);
            }
            else {
                what = "";
            } ABORT = true; EXITSTATUS = 1; throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info."; }
            Module["abort"] = abort;
            if (Module["preInit"]) {
                if (typeof Module["preInit"] == "function")
                    Module["preInit"] = [Module["preInit"]];
                while (Module["preInit"].length > 0) {
                    Module["preInit"].pop()();
                }
            }
            Module["noExitRuntime"] = true;
            run();
            return _em_module;
        });
    })();
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = _em_module;
    else if (typeof define === 'function' && define['amd'])
        define([], function () { return _em_module; });
    else if (typeof exports === 'object')
        exports["_em_module"] = _em_module;
    var _em = _em_module();
    /** C calls. */
    var _csm = /** @class */ (function () {
        function _csm() {
        }
        _csm.getVersion = function () {
            return _em.ccall("csmGetVersion", "number", [], []);
        };
        _csm.getSizeofModel = function (moc) {
            return _em.ccall("csmGetSizeofModel", "number", ["number"], [moc]);
        };
        _csm.reviveMocInPlace = function (memory, mocSize) {
            return _em.ccall("csmReviveMocInPlace", "number", ["number", "number"], [memory, mocSize]);
        };
        _csm.initializeModelInPlace = function (moc, memory, modelSize) {
            return _em.ccall("csmInitializeModelInPlace", "number", ["number", "number", "number"], [moc, memory, modelSize]);
        };
        _csm.getParameterCount = function (model) {
            return _em.ccall("csmGetParameterCount", "number", ["number"], [model]);
        };
        _csm.getParameterIds = function (model) {
            return _em.ccall("csmGetParameterIds", "number", ["number"], [model]);
        };
        _csm.getParameterMinimumValues = function (model) {
            return _em.ccall("csmGetParameterMinimumValues", "number", ["number"], [model]);
        };
        _csm.getParameterMaximumValues = function (model) {
            return _em.ccall("csmGetParameterMaximumValues", "number", ["number"], [model]);
        };
        _csm.getParameterDefaultValues = function (model) {
            return _em.ccall("csmGetParameterDefaultValues", "number", ["number"], [model]);
        };
        _csm.getParameterValues = function (model) {
            return _em.ccall("csmGetParameterValues", "number", ["number"], [model]);
        };
        _csm.getPartCount = function (model) {
            return _em.ccall("csmGetPartCount", "number", ["number"], [model]);
        };
        _csm.getPartIds = function (model) {
            return _em.ccall("csmGetPartIds", "number", ["number"], [model]);
        };
        _csm.getPartOpacities = function (model) {
            return _em.ccall("csmGetPartOpacities", "number", ["number"], [model]);
        };
        _csm.getPartParentPartIndices = function (model) {
            return _em.ccall("csmGetPartParentPartIndices", "number", ["number"], [model]);
        };
        _csm.getDrawableCount = function (model) {
            return _em.ccall("csmGetDrawableCount", "number", ["number"], [model]);
        };
        _csm.getDrawableIds = function (model) {
            return _em.ccall("csmGetDrawableIds", "number", ["number"], [model]);
        };
        _csm.getDrawableConstantFlags = function (model) {
            return _em.ccall("csmGetDrawableConstantFlags", "number", ["number"], [model]);
        };
        _csm.getDrawableDynamicFlags = function (model) {
            return _em.ccall("csmGetDrawableDynamicFlags", "number", ["number"], [model]);
        };
        _csm.getDrawableTextureIndices = function (model) {
            return _em.ccall("csmGetDrawableTextureIndices", "number", ["number"], [model]);
        };
        _csm.getDrawableDrawOrders = function (model) {
            return _em.ccall("csmGetDrawableDrawOrders", "number", ["number"], [model]);
        };
        _csm.getDrawableRenderOrders = function (model) {
            return _em.ccall("csmGetDrawableRenderOrders", "number", ["number"], [model]);
        };
        _csm.getDrawableOpacities = function (model) {
            return _em.ccall("csmGetDrawableOpacities", "number", ["number"], [model]);
        };
        _csm.getDrawableMaskCounts = function (model) {
            return _em.ccall("csmGetDrawableMaskCounts", "number", ["number"], [model]);
        };
        _csm.getDrawableMasks = function (model) {
            return _em.ccall("csmGetDrawableMasks", "number", ["number"], [model]);
        };
        _csm.getDrawableVertexCounts = function (model) {
            return _em.ccall("csmGetDrawableVertexCounts", "number", ["number"], [model]);
        };
        _csm.getDrawableVertexPositions = function (model) {
            return _em.ccall("csmGetDrawableVertexPositions", "number", ["number"], [model]);
        };
        _csm.getDrawableVertexUvs = function (model) {
            return _em.ccall("csmGetDrawableVertexUvs", "number", ["number"], [model]);
        };
        _csm.getDrawableIndexCounts = function (model) {
            return _em.ccall("csmGetDrawableIndexCounts", "number", ["number"], [model]);
        };
        _csm.getDrawableIndices = function (model) {
            return _em.ccall("csmGetDrawableIndices", "number", ["number"], [model]);
        };
        _csm.mallocMoc = function (mocSize) {
            return _em.ccall("csmMallocMoc", "number", ["number"], [mocSize]);
        };
        _csm.mallocModelAndInitialize = function (moc) {
            return _em.ccall("csmMallocModelAndInitialize", "number", ["number"], [moc]);
        };
        _csm.malloc = function (size) {
            return _em.ccall("csmMalloc", "number", ["number"], [size]);
        };
        _csm.setLogFunction = function (handler) {
            _em.ccall("csmSetLogFunction", null, ["number"], [handler]);
        };
        _csm.updateModel = function (model) {
            _em.ccall("csmUpdateModel", null, ["number"], [model]);
        };
        _csm.readCanvasInfo = function (model, outSizeInPixels, outOriginInPixels, outPixelsPerUnit) {
            _em.ccall("csmReadCanvasInfo", null, ["number", "number", "number", "number"], [model, outSizeInPixels, outOriginInPixels, outPixelsPerUnit]);
        };
        _csm.resetDrawableDynamicFlags = function (model) {
            _em.ccall("csmResetDrawableDynamicFlags", null, ["number"], [model]);
        };
        _csm.free = function (memory) {
            _em.ccall("csmFree", null, ["number"], [memory]);
        };
        return _csm;
    }());
    ;
    /** Cubism version. */
    var Version = /** @class */ (function () {
        function Version() {
        }
        /**
         * Queries Core version.
         *
         * @return Core version.
         */
        Version.csmGetVersion = function () {
            return _csm.getVersion();
        };
        return Version;
    }());
    Live2DCubismCore.Version = Version;
    /** Cubism logging. */
    var Logging = /** @class */ (function () {
        function Logging() {
        }
        /**
         * Sets log handler.
         *
         * @param handler  Handler to use.
         */
        Logging.csmSetLogFunction = function (handler) {
            // Cache log handler.
            Logging.logFunction = handler;
            // Wrap function to pointer.
            var pointer = _em.addFunction(Logging.wrapLogFunction, 'vi');
            // Sets log handler.
            _csm.setLogFunction(pointer);
        };
        /**
         * Queries log handler.
         *
         * @return Log handler.
         */
        Logging.csmGetLogFunction = function () {
            return Logging.logFunction;
        };
        /**
         * Wrap log function.
         *
         * @param messagePtr number
         *
         * @return string
         */
        Logging.wrapLogFunction = function (messagePtr) {
            // Pointer to string.
            var messageStr = _em.UTF8ToString(messagePtr);
            // Run log function.
            Logging.logFunction(messageStr);
        };
        return Logging;
    }());
    Live2DCubismCore.Logging = Logging;
    /** Cubism moc. */
    var Moc = /** @class */ (function () {
        /**
         * Initializes instance.
         *
         * @param mocBytes Moc bytes.
         */
        function Moc(mocBytes) {
            // Allocate memory.
            var memory = _csm.mallocMoc(mocBytes.byteLength);
            if (!memory) {
                return;
            }
            // Initialize memory.
            var destination = new Uint8Array(_em.HEAPU8.buffer, memory, mocBytes.byteLength);
            destination.set(new Uint8Array(mocBytes));
            // Revive moc.
            this._ptr = _csm.reviveMocInPlace(memory, mocBytes.byteLength);
            if (!this._ptr) {
                _csm.free(memory);
            }
        }
        /** Creates [[Moc]] from [[ArrayBuffer]].
         *
         * @param buffer Array buffer
         *
         * @return [[Moc]] on success; [[null]] otherwise.
         */
        Moc.fromArrayBuffer = function (buffer) {
            if (!buffer) {
                return null;
            }
            var moc = new Moc(buffer);
            return (moc._ptr)
                ? moc
                : null;
        };
        /** Releases instance. */
        Moc.prototype._release = function () {
            _csm.free(this._ptr);
            this._ptr = 0;
        };
        return Moc;
    }());
    Live2DCubismCore.Moc = Moc;
    /** Cubism model. */
    var Model = /** @class */ (function () {
        /**
         * Initializes instance.
         *
         * @param moc Moc
         */
        function Model(moc) {
            this._ptr = _csm.mallocModelAndInitialize(moc._ptr);
            if (!this._ptr) {
                return;
            }
            this.parameters = new Parameters(this._ptr);
            this.parts = new Parts(this._ptr);
            this.drawables = new Drawables(this._ptr);
            this.canvasinfo = new CanvasInfo(this._ptr);
        }
        /**
         * Creates [[Model]] from [[Moc]].
         *
         * @param moc Moc
         *
         * @return [[Model]] on success; [[null]] otherwise.
         */
        Model.fromMoc = function (moc) {
            var model = new Model(moc);
            return (model._ptr)
                ? model
                : null;
        };
        /** Updates instance. */
        Model.prototype.update = function () {
            _csm.updateModel(this._ptr);
        };
        /** Releases instance. */
        Model.prototype.release = function () {
            _csm.free(this._ptr);
            this._ptr = 0;
        };
        return Model;
    }());
    Live2DCubismCore.Model = Model;
    /** Canvas information interface. */
    var CanvasInfo = /** @class */ (function () {
        /**
         * Initializes instance.
         *
         * @param modelPtr Native model pointer.
         */
        function CanvasInfo(modelPtr) {
            if (!modelPtr) {
                return;
            }
            // Preserve the pointer ant heap for get data throw args.
            var _canvasSize_data = new Float32Array(2);
            var _canvasSize_nDataBytes = _canvasSize_data.length * _canvasSize_data.BYTES_PER_ELEMENT;
            var _canvasSize_dataPtr = _csm.malloc(_canvasSize_nDataBytes);
            var _canvasSize_dataHeap = new Uint8Array(_em.HEAPU8.buffer, _canvasSize_dataPtr, _canvasSize_nDataBytes);
            _canvasSize_dataHeap.set(new Uint8Array(_canvasSize_data.buffer));
            var _canvasOrigin_data = new Float32Array(2);
            var _canvasOrigin_nDataBytes = _canvasOrigin_data.length * _canvasOrigin_data.BYTES_PER_ELEMENT;
            var _canvasOrigin_dataPtr = _csm.malloc(_canvasOrigin_nDataBytes);
            var _canvasOrigin_dataHeap = new Uint8Array(_em.HEAPU8.buffer, _canvasOrigin_dataPtr, _canvasOrigin_nDataBytes);
            _canvasOrigin_dataHeap.set(new Uint8Array(_canvasOrigin_data.buffer));
            var _canvasPPU_data = new Float32Array(1);
            var _canvasPPU_nDataBytes = _canvasPPU_data.length * _canvasPPU_data.BYTES_PER_ELEMENT;
            var _canvasPPU_dataPtr = _csm.malloc(_canvasPPU_nDataBytes);
            var _canvasPPU_dataHeap = new Uint8Array(_em.HEAPU8.buffer, _canvasPPU_dataPtr, _canvasPPU_nDataBytes);
            _canvasPPU_dataHeap.set(new Uint8Array(_canvasPPU_data.buffer));
            // Call function and get result
            _csm.readCanvasInfo(modelPtr, _canvasSize_dataHeap.byteOffset, _canvasOrigin_dataHeap.byteOffset, _canvasPPU_dataHeap.byteOffset);
            _canvasSize_data = new Float32Array(_canvasSize_dataHeap.buffer, _canvasSize_dataHeap.byteOffset, _canvasSize_dataHeap.length);
            _canvasOrigin_data = new Float32Array(_canvasOrigin_dataHeap.buffer, _canvasOrigin_dataHeap.byteOffset, _canvasOrigin_dataHeap.length);
            _canvasPPU_data = new Float32Array(_canvasPPU_dataHeap.buffer, _canvasPPU_dataHeap.byteOffset, _canvasPPU_dataHeap.length);
            this.CanvasWidth = _canvasSize_data[0];
            this.CanvasHeight = _canvasSize_data[1];
            this.CanvasOriginX = _canvasOrigin_data[0];
            this.CanvasOriginY = _canvasOrigin_data[1];
            this.PixelsPerUnit = _canvasPPU_data[0];
            // Free heap memory
            _csm.free(_canvasSize_dataHeap.byteOffset);
            _csm.free(_canvasOrigin_dataHeap.byteOffset);
            _csm.free(_canvasPPU_dataHeap.byteOffset);
        }
        return CanvasInfo;
    }());
    Live2DCubismCore.CanvasInfo = CanvasInfo;
    /** Cubism model parameters */
    var Parameters = /** @class */ (function () {
        /**
         * Initializes instance.
         *
         * @param modelPtr Native model.
         */
        function Parameters(modelPtr) {
            var length = 0;
            this.count = _csm.getParameterCount(modelPtr);
            length = _csm.getParameterCount(modelPtr);
            this.ids = new Array(length);
            var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getParameterIds(modelPtr), length);
            for (var i = 0; i < _ids.length; i++) {
                this.ids[i] = _em.UTF8ToString(_ids[i]);
            }
            length = _csm.getParameterCount(modelPtr);
            this.minimumValues = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterMinimumValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.maximumValues = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterMaximumValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.defaultValues = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterDefaultValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.values = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterValues(modelPtr), length);
        }
        return Parameters;
    }());
    Live2DCubismCore.Parameters = Parameters;
    /** Cubism model parts */
    var Parts = /** @class */ (function () {
        /**
         * Initializes instance.
         *
         * @param modelPtr Native model.
         */
        function Parts(modelPtr) {
            var length = 0;
            this.count = _csm.getPartCount(modelPtr);
            length = _csm.getPartCount(modelPtr);
            this.ids = new Array(length);
            var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getPartIds(modelPtr), length);
            for (var i = 0; i < _ids.length; i++) {
                this.ids[i] = _em.UTF8ToString(_ids[i]);
            }
            length = _csm.getPartCount(modelPtr);
            this.opacities = new Float32Array(_em.HEAPF32.buffer, _csm.getPartOpacities(modelPtr), length);
            length = _csm.getPartCount(modelPtr);
            this.parentIndices = new Int32Array(_em.HEAP32.buffer, _csm.getPartParentPartIndices(modelPtr), length);
        }
        return Parts;
    }());
    Live2DCubismCore.Parts = Parts;
    /** Cubism model drawables */
    var Drawables = /** @class */ (function () {
        /**
         * Initializes instance.
         *
         * @param modelPtr Native model.
         */
        function Drawables(modelPtr) {
            this._modelPtr = modelPtr;
            var length = 0;
            var length2 = null;
            this.count = _csm.getDrawableCount(modelPtr);
            length = _csm.getDrawableCount(modelPtr);
            this.ids = new Array(length);
            var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableIds(modelPtr), length);
            for (var i = 0; i < _ids.length; i++) {
                this.ids[i] = _em.UTF8ToString(_ids[i]);
            }
            length = _csm.getDrawableCount(modelPtr);
            this.constantFlags = new Uint8Array(_em.HEAPU8.buffer, _csm.getDrawableConstantFlags(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.dynamicFlags = new Uint8Array(_em.HEAPU8.buffer, _csm.getDrawableDynamicFlags(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.textureIndices = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableTextureIndices(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.drawOrders = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableDrawOrders(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.renderOrders = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableRenderOrders(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.opacities = new Float32Array(_em.HEAPF32.buffer, _csm.getDrawableOpacities(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.maskCounts = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableMaskCounts(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.vertexCounts = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.indexCounts = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableIndexCounts(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableMaskCounts(modelPtr), length);
            this.masks = new Array(length);
            var _masks = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableMasks(modelPtr), length);
            for (var i = 0; i < _masks.length; i++) {
                this.masks[i] = new Int32Array(_em.HEAP32.buffer, _masks[i], length2[i]);
            }
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
            this.vertexPositions = new Array(length);
            var _vertexPositions = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableVertexPositions(modelPtr), length);
            for (var i = 0; i < _vertexPositions.length; i++) {
                this.vertexPositions[i] = new Float32Array(_em.HEAPF32.buffer, _vertexPositions[i], length2[i] * 2);
            }
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
            this.vertexUvs = new Array(length);
            var _vertexUvs = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableVertexUvs(modelPtr), length);
            for (var i = 0; i < _vertexUvs.length; i++) {
                this.vertexUvs[i] = new Float32Array(_em.HEAPF32.buffer, _vertexUvs[i], length2[i] * 2);
            }
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableIndexCounts(modelPtr), length);
            this.indices = new Array(length);
            var _indices = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableIndices(modelPtr), length);
            for (var i = 0; i < _indices.length; i++) {
                this.indices[i] = new Uint16Array(_em.HEAPU16.buffer, _indices[i], length2[i]);
            }
        }
        /** Resets all dynamic drawable flags.. */
        Drawables.prototype.resetDynamicFlags = function () {
            _csm.resetDrawableDynamicFlags(this._modelPtr);
        };
        return Drawables;
    }());
    Live2DCubismCore.Drawables = Drawables;
    /** Utility functions. */
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasBlendAdditiveBit = function (bitfield) {
            return (bitfield & (1 << 0)) == (1 << 0);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasBlendMultiplicativeBit = function (bitfield) {
            return (bitfield & (1 << 1)) == (1 << 1);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasIsDoubleSidedBit = function (bitfield) {
            return (bitfield & (1 << 2)) == (1 << 2);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasIsVisibleBit = function (bitfield) {
            return (bitfield & (1 << 0)) == (1 << 0);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasVisibilityDidChangeBit = function (bitfield) {
            return (bitfield & (1 << 1)) == (1 << 1);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasOpacityDidChangeBit = function (bitfield) {
            return (bitfield & (1 << 2)) == (1 << 2);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasDrawOrderDidChangeBit = function (bitfield) {
            return (bitfield & (1 << 3)) == (1 << 3);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasRenderOrderDidChangeBit = function (bitfield) {
            return (bitfield & (1 << 4)) == (1 << 4);
        };
        /**
         * Checks whether flag is set in bitfield.
         *
         * @param bitfield Bitfield to query against.
         *
         * @return [[true]] if bit set; [[false]] otherwise
        */
        Utils.hasVertexPositionsDidChangeBit = function (bitfield) {
            return (bitfield & (1 << 5)) == (1 << 5);
        };
        return Utils;
    }());
    Live2DCubismCore.Utils = Utils;
    window.Live2DCubismCore = Live2DCubismCore;
})(Live2DCubismCore || (Live2DCubismCore = {}));
//# sourceMappingURL=live2dcubismcore.js.map
