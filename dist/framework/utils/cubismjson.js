/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmmap } from '../type/csmmap';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { CubismLogInfo } from './cubismdebug';
import { strtod } from '../live2dcubismframework';
var csmVector = csmvector.csmVector;
var csmMap = csmmap.csmMap;
var csmString = csmstring.csmString;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // 使用StaticInitializeNotForClientCall（）初始化
    var CSM_JSON_ERROR_TYPE_MISMATCH = 'Error: type mismatch';
    var CSM_JSON_ERROR_INDEX_OF_BOUNDS = 'Error: index out of bounds';
    /**
     * 已解析的JSON元素元素的基类。
     */
    var Value = /** @class */ (function () {
        /**
         * 构造函数
         */
        function Value() {
            this._stringBuffer = undefined; // 字符串缓冲区
        }
        /**
         * 初始化方法
         */
        Value.staticInitializeNotForClientCall = function () {
            JsonBoolean.trueValue = new JsonBoolean(true);
            JsonBoolean.falseValue = new JsonBoolean(false);
            JsonError.errorValue = new JsonError('ERROR', true);
            this.nullValue = new JsonNullvalue();
            Value.s_dummyKeys = new csmVector();
        };
        /**
         * 发布方式
         */
        Value.staticReleaseNotForClientCall = function () {
            JsonBoolean.trueValue = null;
            JsonBoolean.falseValue = null;
            JsonError.errorValue = null;
            Value.nullValue = null;
            Value.s_dummyKeys = null;
            JsonBoolean.trueValue = null;
            JsonBoolean.falseValue = null;
            JsonError.errorValue = null;
            Value.nullValue = null;
            Value.s_dummyKeys = null;
        };
        /**
         * 以字符串形式返回元素(string)
         */
        Value.prototype.getRawString = function (defaultValue, indent) {
            return this.getString(defaultValue, indent);
        };
        /**
         * 以数字类型返回元素(number)
         */
        Value.prototype.toInt = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            return defaultValue;
        };
        /**
         * 以数字类型返回元素(number)
         */
        Value.prototype.toFloat = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            return defaultValue;
        };
        /**
         * 以布尔值的形式返回元素(boolean)
         */
        Value.prototype.toBoolean = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = false; }
            return defaultValue;
        };
        /**
         * 返回大小
         */
        Value.prototype.getSize = function () {
            return 0;
        };
        /**
         * 返回元素数组(Value[])
         */
        Value.prototype.getArray = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return defaultValue;
        };
        /**
         * 返回容器中的元素(array)
         */
        Value.prototype.getVector = function (defaultValue) {
            return defaultValue;
        };
        /**
         * 将元素作为map返回(csmMap<csmString, Value>)
         */
        Value.prototype.getMap = function (defaultValue) {
            return defaultValue;
        };
        /**
         * getValueByIndex[index]
         */
        Value.prototype.getValueByIndex = function (index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * getValueByString[string | csmString]
         */
        Value.prototype.getValueByString = function (s) {
            return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * 返回容器中的映射键列表
         *
         * @return 键列表
         */
        Value.prototype.getKeys = function () {
            return Value.s_dummyKeys;
        };
        /**
         * 如果值类型是错误值，则为True
         */
        Value.prototype.isError = function () {
            return false;
        };
        /**
         * Valueの種類がnullならtrue
         */
        Value.prototype.isNull = function () {
            return false;
        };
        /**
         * Valueの種類が真偽値ならtrue
         */
        Value.prototype.isBool = function () {
            return false;
        };
        /**
         * Valueの種類が数値型ならtrue
         */
        Value.prototype.isFloat = function () {
            return false;
        };
        /**
         * Valueの種類が文字列ならtrue
         */
        Value.prototype.isString = function () {
            return false;
        };
        /**
         * Valueの種類が配列ならtrue
         */
        Value.prototype.isArray = function () {
            return false;
        };
        /**
         * Valueの種類がマップ型ならtrue
         */
        Value.prototype.isMap = function () {
            return false;
        };
        Value.prototype.equals = function (value) {
            return false;
        };
        /**
         * 如果值的值为静态，则为true，如果为静态，则不释放
         */
        Value.prototype.isStatic = function () {
            return false;
        };
        /**
         * 将错误值设置为Value
         */
        Value.prototype.setErrorNotForClientCall = function (errorStr) {
            return JsonError.errorValue;
        };
        return Value;
    }());
    Live2DCubismFramework.Value = Value;
    /**
     * 最小的轻量级JSON解析器，仅支持Ascii字符。
     * 规范是JSON的子集。
     * 用于加载配置文件（model3.json）
     *
     * [不支持的项目]
     * ・非ASCII字符，如日语
     * ・e的指数表达式
     */
    var CubismJson = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismJson(buffer, length) {
            this._error = null;
            this._lineCount = 0;
            this._root = null;
            if (buffer != undefined) {
                this.parseBytes(buffer, length);
            }
        }
        /**
         * 直接从字节数据加载并解析
         *
         * @param buffer
         * @param size
         * @return CubismJson类的一个实例。 失败时为NULL
         */
        CubismJson.create = function (buffer, size) {
            var json = new CubismJson();
            var succeeded = json.parseBytes(buffer, size);
            if (!succeeded) {
                CubismJson.delete(json);
                return null;
            }
            else {
                return json;
            }
        };
        /**
         * 释放已解析的JSON对象的处理
         *
         * @param instance CubismJson类的实例
         */
        CubismJson.delete = function (instance) {
            instance = null;
        };
        /**
         * 返回已解析的JSON的根元素
         */
        CubismJson.prototype.getRoot = function () {
            return this._root;
        };
        /**
         *  将Unicode二进制转换为String
         *
         * @param buffer 要转换的二进制数据
         * @return 转换后的字符串
         */
        CubismJson.prototype.arrayBufferToString = function (buffer) {
            var uint8Array = new Uint8Array(buffer);
            var str = '';
            for (var i = 0, len = uint8Array.length; i < len; ++i) {
                str += ('%' + this.pad(uint8Array[i].toString(16)));
            }
            str = decodeURIComponent(str);
            return str;
        };
        /**
         * 执行JSON解析
         * @param buffer    要解析的数据字节
         * @param size      数据字节大小
         * return true : 成功
         * return false: 失敗
         */
        CubismJson.prototype.parseBytes = function (buffer, size) {
            var endPos = new Array(1); // 要通过引用传递的数组
            var decodeBuffer = this.arrayBufferToString(buffer);
            this._root = this.parseValue(decodeBuffer, size, 0, endPos);
            if (this._error) {
                var strbuf = '\0';
                strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
                this._root = new JsonString(strbuf);
                CubismLogInfo('{0}', this._root.getRawString());
                return false;
            }
            else if (this._root == null) {
                this._root = new JsonError(new csmString(this._error), false); // 由于root已释放，因此请单独创建一个错误对象
                return false;
            }
            return true;
        };
        /**
         * 解析时返回错误值
         */
        CubismJson.prototype.getParseError = function () {
            return this._error;
        };
        /**
         * 如果根元素后面的元素是文件的末尾，则返回true
         */
        CubismJson.prototype.checkEndOfFile = function () {
            return this._root.getArray()[1].equals('EOF');
        };
        /**
         * 从JSON元素解析值（float，String，Value *，Array，null，true，false）
         * 根据元素格式在内部调用ParseString（），ParseObject（），ParseArray（）
         *
         * @param   buffer      JSON元素缓冲区
         * @param   length      要解析的长度
         * @param   begin       开始解析的位置
         * @param   outEndPos   解析结束时的位置
         * @return      从透视图获得的值对象
         */
        CubismJson.prototype.parseValue = function (buffer, length, begin, outEndPos) {
            if (this._error) {
                return null;
            }
            var o = null;
            var i = begin;
            var f;
            for (; i < length; i++) {
                var c = buffer[i];
                switch (c) {
                    case '-':
                    case '.':
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9': {
                        var afterString = new Array(1); // 通过引用传递
                        f = strtod(buffer.slice(i), afterString);
                        outEndPos[0] = buffer.indexOf(afterString[0]);
                        return new JsonFloat(f);
                    }
                    case '\"':
                        return new JsonString(this.parseString(buffer, length, i + 1, outEndPos)); // 从“\”之后的字符
                    case '[':
                        o = this.parseArray(buffer, length, i + 1, outEndPos);
                        return o;
                    case '{':
                        o = this.parseObject(buffer, length, i + 1, outEndPos);
                        return o;
                    case 'n': // 不是null
                        if (i + 3 < length) {
                            o = new JsonNullvalue(); // 能够释放
                            outEndPos[0] = i + 4;
                        }
                        else {
                            this._error = 'parse null';
                        }
                        return o;
                    case 't': // 不是true
                        if (i + 3 < length) {
                            o = JsonBoolean.trueValue;
                            outEndPos[0] = i + 4;
                        }
                        else {
                            this._error = 'parse true';
                        }
                        return o;
                    case 'f': // 不是false
                        if (i + 4 < length) {
                            o = JsonBoolean.falseValue;
                            outEndPos[0] = i + 5;
                        }
                        else {
                            this._error = 'illegal \',\' position';
                        }
                        return o;
                    case ',': // Array separator
                        this._error = 'illegal \',\' position';
                        return null;
                    case ']': // 非法}但跳过。 数组的末尾似乎没有必要
                        outEndPos[0] = i; // 重新处理相同的字符
                        return null;
                    case '\n':
                        this._lineCount++;
                    case ' ':
                    case '\t':
                    case '\r':
                    default:
                        break;
                }
            }
            this._error = 'illegal end of value';
            return null;
        };
        /**
         * 将字符串解析为下一个「"」
         *
         * @param   string  ->  要解析的字符串
         * @param   length  ->  要解析的长度
         * @param   begin   ->  开始解析的位置
         * @param  outEndPos   ->  解析结束时的位置
         * @return      解析句子F字符串元素
         */
        CubismJson.prototype.parseString = function (string, length, begin, outEndPos) {
            if (this._error) {
                return null;
            }
            var i = begin;
            var c, c2;
            var ret = new csmString('');
            var bufStart = begin; // 未在sbuf中注册的角色的起始位置
            for (; i < length; i++) {
                c = string[i];
                switch (c) {
                    case '\"': {
                        outEndPos[0] = i + 1; // "之后的下一个角色
                        ret.append(string.slice(bufStart), (i - bufStart)); // 注册前一个字符
                        return ret.s;
                    }
                    case '//': {
                        i++; // 处理两个字符作为一组
                        if (i - 1 > bufStart) {
                            ret.append(string.slice(bufStart), (i - bufStart)); // 注册前一个字符
                        }
                        bufStart = i + 1; // 从逃脱后的角色（2个字符
                        if (i < length) {
                            c2 = string[i];
                            switch (c2) {
                                case '\\':
                                    ret.expansion(1, '\\');
                                    break;
                                case '\"':
                                    ret.expansion(1, '\"');
                                    break;
                                case '/':
                                    ret.expansion(1, '/');
                                    break;
                                case 'b':
                                    ret.expansion(1, '\b');
                                    break;
                                case 'f':
                                    ret.expansion(1, '\f');
                                    break;
                                case 'n':
                                    ret.expansion(1, '\n');
                                    break;
                                case 'r':
                                    ret.expansion(1, '\r');
                                    break;
                                case 't':
                                    ret.expansion(1, '\t');
                                    break;
                                case 'u':
                                    this._error = 'parse string/unicord escape not supported';
                                    break;
                                default:
                                    break;
                            }
                        }
                        else {
                            this._error = 'parse string/escape error';
                        }
                    }
                    default:
                        {
                            break;
                        }
                }
            }
            this._error = 'parse string/illegal end';
            return null;
        };
        /**
         * 解析JSON对象元素并返回Value对象
         *
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        CubismJson.prototype.parseObject = function (buffer, length, begin, outEndPos) {
            if (this._error) {
                return null;
            }
            var ret = new JsonMap();
            // Key: Value
            var key = '';
            var i = begin;
            var c = '';
            var localRetEndPos2 = Array(1);
            var ok = false;
            // , が続く限りループ
            for (; i < length; i++) {
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case '\"':
                            key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                            if (this._error) {
                                return null;
                            }
                            i = localRetEndPos2[0];
                            ok = true;
                            break FOR_LOOP; // -- loopから出る
                        case '}': // 閉じカッコ
                            outEndPos[0] = i + 1;
                            return ret; // 空
                        case ':':
                            this._error = 'illegal \':\' position';
                            break;
                        case '\n':
                            this._lineCount++;
                        default:
                            break; // スキップする文字
                    }
                }
                if (!ok) {
                    this._error = 'key not found';
                    return null;
                }
                ok = false;
                // : をチェック
                FOR_LOOP2: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ':':
                            ok = true;
                            i++;
                            break FOR_LOOP2;
                        case '}':
                            this._error = 'illegal \'}\' position';
                            break;
                        case '\n': this._lineCount++;
                        // case ' ': case '\t' : case '\r':
                        default:
                            break; // スキップする文字
                    }
                }
                if (!ok) {
                    this._error = '\':\' not found';
                    return null;
                }
                // 値をチェック
                var value = this.parseValue(buffer, length, i, localRetEndPos2);
                if (this._error) {
                    return null;
                }
                i = localRetEndPos2[0];
                // ret.put(key, value);
                ret.put(key, value);
                FOR_LOOP3: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ',':
                            break FOR_LOOP3;
                        case '}':
                            outEndPos[0] = i + 1;
                            return ret; // 正常終了
                        case '\n':
                            this._lineCount++;
                        default:
                            break; // スキップ
                    }
                }
            }
            this._error = 'illegal end of perseObject';
            return null;
        };
        /**
         * 将字符串解析为下一个「"」
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        CubismJson.prototype.parseArray = function (buffer, length, begin, outEndPos) {
            if (this._error) {
                return null;
            }
            var ret = new JsonArray();
            // key : value
            var i = begin;
            var c;
            var localRetEndpos2 = new Array(1);
            // , が続く限りループ
            for (; i < length; i++) {
                // : をチェック
                var value = this.parseValue(buffer, length, i, localRetEndpos2);
                if (this._error) {
                    return null;
                }
                i = localRetEndpos2[0];
                if (value) {
                    ret.add(value);
                }
                // FOR_LOOP3:
                // boolean breakflag = false;
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ',':
                            // breakflag = true;
                            // break; // 次のKEY, VAlUEへ
                            break FOR_LOOP;
                        case ']':
                            outEndPos[0] = i + 1;
                            return ret; // 終了
                        case '\n':
                            ++this._lineCount;
                        // case ' ': case '\t': case '\r':
                        default:
                            break; // スキップ
                    }
                }
            }
            ret = void 0;
            this._error = 'illegal end of parseObject';
            return null;
        };
        /**
         * 编码，填充
         */
        CubismJson.prototype.pad = function (n) {
            return n.length < 2
                ? '0' + n
                : n;
        };
        return CubismJson;
    }());
    Live2DCubismFramework.CubismJson = CubismJson;
    /**
     * 将解析的JSON元素视为浮点值
     */
    var JsonFloat = /** @class */ (function (_super) {
        __extends(JsonFloat, _super);
        /**
         * 构造函数
         */
        function JsonFloat(v) {
            var _this = _super.call(this) || this;
            _this._value = v;
            return _this;
        }
        /**
         * 如果值类型是数字，则为True
         */
        JsonFloat.prototype.isFloat = function () {
            return true;
        };
        /**
         * 以字符串形式返回元素（csmString类型）
         */
        JsonFloat.prototype.getString = function (defaultValue, indent) {
            var strbuf = '\0';
            this._value = parseFloat(strbuf);
            this._stringBuffer = strbuf;
            return this._stringBuffer;
        };
        /**
         * 以数字类型（number）返回元素
         */
        JsonFloat.prototype.toInt = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            return parseInt(this._value.toString());
        };
        /**
         * 以数字类型（number）返回元素
         */
        JsonFloat.prototype.toFloat = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0.0; }
            return this._value;
        };
        JsonFloat.prototype.equals = function (value) {
            if ('number' === typeof (value)) {
                // int
                if (Math.round(value)) {
                    return false;
                }
                else {
                    return value == this._value;
                }
            }
            return false;
        };
        return JsonFloat;
    }(Value));
    Live2DCubismFramework.JsonFloat = JsonFloat;
    /**
     * 将解析的JSON元素视为布尔值
     */
    var JsonBoolean = /** @class */ (function (_super) {
        __extends(JsonBoolean, _super);
        /**
         * 引数付きコンストラクタ
         */
        function JsonBoolean(v) {
            var _this = _super.call(this) || this;
            _this._boolValue = v;
            return _this;
        }
        /**
         * Valueの種類が真偽値ならtrue
         */
        JsonBoolean.prototype.isBool = function () {
            return true;
        };
        /**
         * 要素を真偽値で返す(boolean)
         */
        JsonBoolean.prototype.toBoolean = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = false; }
            return this._boolValue;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonBoolean.prototype.getString = function (defaultValue, indent) {
            this._stringBuffer = this._boolValue
                ? 'true'
                : 'false';
            return this._stringBuffer;
        };
        JsonBoolean.prototype.equals = function (value) {
            if ('boolean' === typeof (value)) {
                return value == this._boolValue;
            }
            return false;
        };
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        JsonBoolean.prototype.isStatic = function () {
            return true;
        };
        return JsonBoolean;
    }(Value));
    Live2DCubismFramework.JsonBoolean = JsonBoolean;
    /**
     * 将解析的JSON元素视为字符串
     */
    var JsonString = /** @class */ (function (_super) {
        __extends(JsonString, _super);
        function JsonString(s) {
            var _this = _super.call(this) || this;
            if ('string' === typeof (s)) {
                _this._stringBuffer = s;
            }
            if (s instanceof csmString) {
                _this._stringBuffer = s.s;
            }
            return _this;
        }
        /**
         * Valueの種類が文字列ならtrue
         */
        JsonString.prototype.isString = function () {
            return true;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonString.prototype.getString = function (defaultValue, indent) {
            return this._stringBuffer;
        };
        JsonString.prototype.equals = function (value) {
            if ('string' === typeof (value)) {
                return this._stringBuffer == value;
            }
            if (value instanceof csmString) {
                return (this._stringBuffer == value.s);
            }
            return false;
        };
        return JsonString;
    }(Value));
    Live2DCubismFramework.JsonString = JsonString;
    /**
     * JSON解析期间的错误结果。 像字符串类型一样
     */
    var JsonError = /** @class */ (function (_super) {
        __extends(JsonError, _super);
        /**
         * 引数付きコンストラクタ
         */
        function JsonError(s, isStatic) {
            var _this = this;
            if ('string' === typeof (s)) {
                _this = _super.call(this, s) || this;
            }
            else {
                _this = _super.call(this, s) || this;
            }
            _this._isStatic = isStatic;
            return _this;
        }
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        JsonError.prototype.isStatic = function () {
            return this._isStatic;
        };
        /**
         * エラー情報をセットする
         */
        JsonError.prototype.setErrorNotForClientCall = function (s) {
            this._stringBuffer = s;
            return this;
        };
        /**
         * Valueの種類がエラー値ならtrue
         */
        JsonError.prototype.isError = function () {
            return true;
        };
        return JsonError;
    }(JsonString));
    Live2DCubismFramework.JsonError = JsonError;
    /**
     * 将解析的JSON元素作为空值
     */
    var JsonNullvalue = /** @class */ (function (_super) {
        __extends(JsonNullvalue, _super);
        /**
         * コンストラクタ
         */
        function JsonNullvalue() {
            var _this = _super.call(this) || this;
            _this._stringBuffer = 'NullValue';
            return _this;
        }
        /**
         * Valueの種類がNULL値ならtrue
         */
        JsonNullvalue.prototype.isNull = function () {
            return true;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonNullvalue.prototype.getString = function (defaultValue, indent) {
            return this._stringBuffer;
        };
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        JsonNullvalue.prototype.isStatic = function () {
            return true;
        };
        return JsonNullvalue;
    }(Value));
    Live2DCubismFramework.JsonNullvalue = JsonNullvalue;
    /**
     * 将解析后的JSON元素作为array
     */
    var JsonArray = /** @class */ (function (_super) {
        __extends(JsonArray, _super);
        /**
         * コンストラクタ
         */
        function JsonArray() {
            var _this = _super.call(this) || this;
            _this._array = new csmVector();
            return _this;
        }
        /**
         * デストラクタ相当の処理
         */
        JsonArray.prototype.release = function () {
            for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
                var v = ite.ptr();
                if (v && !v.isStatic()) {
                    v = void 0;
                    v = null;
                }
            }
        };
        /**
         * Valueの種類が配列ならtrue
         */
        JsonArray.prototype.isArray = function () {
            return true;
        };
        /**
         * 添字演算子[index]
         */
        JsonArray.prototype.getValueByIndex = function (index) {
            if (index < 0 || this._array.getSize() <= index) {
                return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
            }
            var v = this._array.at(index);
            if (v == null) {
                return Value.nullValue;
            }
            return v;
        };
        /**
         * 添字演算子[string | csmString]
         */
        JsonArray.prototype.getValueByString = function (s) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonArray.prototype.getString = function (defaultValue, indent) {
            var stringBuffer = indent + '[\n';
            for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
                var v = ite.ptr();
                this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
            }
            this._stringBuffer = stringBuffer + indent + ']\n';
            return this._stringBuffer;
        };
        /**
         * 配列要素を追加する
         * @param v 追加する要素
         */
        JsonArray.prototype.add = function (v) {
            this._array.pushBack(v);
        };
        /**
         * 要素をコンテナで返す(csmVector<Value>)
         */
        JsonArray.prototype.getVector = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return this._array;
        };
        /**
         * 要素の数を返す
         */
        JsonArray.prototype.getSize = function () {
            return this._array.getSize();
        };
        return JsonArray;
    }(Value));
    Live2DCubismFramework.JsonArray = JsonArray;
    /**
     * 将解析后的JSON元素作为map
     */
    var JsonMap = /** @class */ (function (_super) {
        __extends(JsonMap, _super);
        /**
         * コンストラクタ
         */
        function JsonMap() {
            var _this = _super.call(this) || this;
            _this._keys = undefined; // JSON要素の値
            _this._map = new csmMap();
            return _this;
        }
        /**
         * デストラクタ相当の処理
         */
        JsonMap.prototype.release = function () {
            var ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                var v = ite.ptr().second;
                if (v && !v.isStatic()) {
                    v = void 0;
                    v = null;
                }
                ite.preIncrement();
            }
        };
        /**
         * Valueの値がMap型ならtrue
         */
        JsonMap.prototype.isMap = function () {
            return true;
        };
        /**
         * 添字演算子[string | csmString]
         */
        JsonMap.prototype.getValueByString = function (s) {
            if (s instanceof csmString) {
                var ret = this._map.getValue(s.s);
                if (ret == null) {
                    return Value.nullValue;
                }
                return ret;
            }
            for (var iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
                if (iter.ptr().first == s) {
                    if (iter.ptr().second == null) {
                        return Value.nullValue;
                    }
                    return iter.ptr().second;
                }
            }
            return Value.nullValue;
        };
        /**
         * 添字演算子[index]
         */
        JsonMap.prototype.getValueByIndex = function (index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonMap.prototype.getString = function (defaultValue, indent) {
            this._stringBuffer = indent + '{\n';
            var ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                var key = ite.ptr().first;
                var v = ite.ptr().second;
                this._stringBuffer += indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
                ite.preIncrement();
            }
            this._stringBuffer += indent + '}\n';
            return this._stringBuffer;
        };
        /**
         * 要素をMap型で返す
         */
        JsonMap.prototype.getMap = function (defaultValue) {
            return this._map;
        };
        /**
         * Mapに要素を追加する
         */
        JsonMap.prototype.put = function (key, v) {
            this._map.setValue(key, v);
        };
        /**
         * Mapからキーのリストを取得する
         */
        JsonMap.prototype.getKeys = function () {
            if (!this._keys) {
                this._keys = new csmVector();
                var ite = this._map.begin();
                while (ite.notEqual(this._map.end())) {
                    var key = ite.ptr().first;
                    this._keys.pushBack(key);
                    ite.preIncrement();
                }
            }
            return this._keys;
        };
        /**
         * Mapの要素数を取得する
         */
        JsonMap.prototype.getSize = function () {
            return this._keys.getSize();
        };
        return JsonMap;
    }(Value));
    Live2DCubismFramework.JsonMap = JsonMap;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
