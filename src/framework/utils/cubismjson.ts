/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as csmstring} from '../type/csmstring';
import {Live2DCubismFramework as csmmap} from '../type/csmmap';
import {Live2DCubismFramework as csmvector} from '../type/csmvector';
import {CubismLogInfo} from './cubismdebug';
import {strtod} from '../live2dcubismframework';
import csmVector = csmvector.csmVector;
import csmVector_iterator = csmvector.iterator;
import csmMap = csmmap.csmMap;
import csmMap_iterator = csmmap.iterator;
import csmString = csmstring.csmString;

export namespace Live2DCubismFramework {
    // StaticInitializeNotForClientCall()で初期化する
    const CSM_JSON_ERROR_TYPE_MISMATCH: string = 'Error: type mismatch';
    const CSM_JSON_ERROR_INDEX_OF_BOUNDS: string = 'Error: index out of bounds';


    /**
     * パースしたJSONエレメントの要素の基底クラス。
     */
    export abstract class Value {

        public static errorValue: Value;   // 一時的な返り値として返すエラー。 CubismFramework::Disposeするまではdeleteしない
        public static nullValue: Value;    // 一時的な返り値として返すNULL。   CubismFramework::Disposeするまではdeleteしない

        /**
         * 初期化用メソッド
         */
        public static staticInitializeNotForClientCall(): void {
            JsonBoolean.trueValue = new JsonBoolean(true);
            JsonBoolean.falseValue = new JsonBoolean(false);

            JsonError.errorValue = new JsonError('ERROR', true);
            this.nullValue = new JsonNullvalue();

            Value.s_dummyKeys = new csmVector<string>();
        }

        /**
         * リリース用メソッド
         */
        public static staticReleaseNotForClientCall(): void {
          JsonBoolean.trueValue = null as any;
          JsonBoolean.falseValue = null as any;
          JsonError.errorValue = null as any;
          Value.nullValue = null as any;
          Value.s_dummyKeys = null as any;

          JsonBoolean.trueValue = null as any;
          JsonBoolean.falseValue = null as any;
          JsonError.errorValue = null as any;
          Value.nullValue = null as any;
          Value.s_dummyKeys = null as any;
        }

        private static s_dummyKeys: csmVector<string>; // ダミーキー

      protected _stringBuffer: string = undefined as any; // 文字列バッファ
        /**
         * コンストラクタ
         */
        public constructor() {

        }

        /**
         * 要素を文字列型で返す(csmString型)
         */
        public abstract getString(defaultValue?: string, indent?: string): string;

        /**
         * 要素を文字列型で返す(string)
         */
        public getRawString(defaultValue?: string, indent?: string): string {
            return this.getString(defaultValue, indent);
        }

        /**
         * 要素を数値型で返す(number)
         */
        public toInt(defaultValue: number = 0): number {
            return defaultValue;
        }

        /**
         * 要素を数値型で返す(number)
         */
        public toFloat(defaultValue: number = 0): number {
            return defaultValue;
        }

        /**
         * 要素を真偽値で返す(boolean)
         */
        public toBoolean(defaultValue: boolean = false): boolean {
            return defaultValue;
        }

        /**
         * サイズを返す
         */
        public getSize(): number {
            return 0;
        }

        /**
         * 要素を配列で返す(Value[])
         */
      public getArray(defaultValue: Value[] = null as any): Value[] {
            return defaultValue;
        }

        /**
         * 要素をコンテナで返す(array)
         */
        public getVector(defaultValue?: csmVector<Value>): csmVector<Value> {
          return defaultValue as any;
        }

        /**
         * 要素をマップで返す(csmMap<csmString, Value>)
         */
        public getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value> {
          return defaultValue as any;
        }

        /**
         * 添字演算子[index]
         */
        public getValueByIndex(index: number): Value {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }

        /**
         * 添字演算子[string | csmString]
         */
        public getValueByString(s: string | csmString): Value {
            return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }

        /**
         * マップのキー一覧をコンテナで返す
         *
         * @return マップのキーの一覧
         */
        public getKeys(): csmVector<string> {
            return Value.s_dummyKeys;
        }

        /**
         * Valueの種類がエラー値ならtrue
         */
        public isError(): boolean {
            return false;
        }

        /**
         * Valueの種類がnullならtrue
         */
        public isNull(): boolean {
            return false;
        }

        /**
         * Valueの種類が真偽値ならtrue
         */
        public isBool(): boolean {
            return false;
        }

        /**
         * Valueの種類が数値型ならtrue
         */
        public isFloat(): boolean {
            return false;
        }

        /**
         * Valueの種類が文字列ならtrue
         */
        public isString(): boolean {
            return false;
        }

        /**
         * Valueの種類が配列ならtrue
         */
        public isArray(): boolean {
            return false;
        }

        /**
         * Valueの種類がマップ型ならtrue
         */
        public isMap(): boolean {
            return false;
        }

        /**
         * 引数の値と等しければtrue
         */
        public equals(value: csmString): boolean;
        public equals(value: string): boolean;
        public equals(value: number): boolean;
        public equals(value: boolean): boolean;
        public equals(value: any): boolean {
            return false;
        }

        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        public isStatic(): boolean {
            return false;
        }

        /**
         * Valueにエラー値をセットする
         */
        public setErrorNotForClientCall(errorStr: string): Value {
            return JsonError.errorValue;
        }
    }

    /**
     * Ascii文字のみ対応した最小限の軽量JSONパーサ。
     * 仕様はJSONのサブセットとなる。
     * 設定ファイル(model3.json)などのロード用
     *
     * [未対応項目]
     * ・日本語などの非ASCII文字
     * ・eによる指数表現
     */
    export class CubismJson {


        /**
         * バイトデータから直接ロードしてパースする
         *
         * @param buffer バッファ
         * @param size バッファサイズ
         * @return CubismJsonクラスのインスタンス。失敗したらNULL
         */
        public static create(buffer: ArrayBuffer, size: number) {
            const json = new CubismJson();
            const succeeded: boolean = json.parseBytes(buffer, size);

            if (!succeeded) {
                CubismJson.delete(json);
                return null;
            } else {
                return json;
            }
        }

        /**
         * パースしたJSONオブジェクトの解放処理
         *
         * @param instance CubismJsonクラスのインスタンス
         */
        public static delete(instance: CubismJson) {
          instance = null as any;
        }

        public _error: string;     // パース時のエラー
        public _lineCount: number; // エラー報告に用いる行数カウント
        public _root: Value;       // パースされたルート要素
        /**
         * コンストラクタ
         */
        public constructor(buffer?: ArrayBuffer, length?: number) {
          this._error = null as any;
            this._lineCount = 0;
          this._root = null as any;

            if (buffer != undefined) {
              this.parseBytes(buffer, length as any);
            }
        }

        /**
         * パースしたJSONのルート要素を返す
         */
        public getRoot(): Value {
            return this._root;
        }

        /**
         *  UnicodeのバイナリをStringに変換
         *
         * @param buffer 変換するバイナリデータ
         * @return 変換後の文字列
         */
        public arrayBufferToString(buffer: ArrayBuffer): string {
            const uint8Array: Uint8Array = new Uint8Array(buffer);
            let str: string = '';

            for (let i: number = 0, len: number = uint8Array.length; i < len; ++i) {
                str += ('%' + this.pad(uint8Array[i].toString(16)));
            }

            str = decodeURIComponent(str);
            return str;
        }

        /**
         * JSONのパースを実行する
         * @param buffer    パース対象のデータバイト
         * @param size      データバイトのサイズ
         * return true : 成功
         * return false: 失敗
         */
        public parseBytes(buffer: ArrayBuffer, size: number): boolean {
            const endPos: number[] = new Array(1); // 参照渡しにするため配列
            const decodeBuffer: string = this.arrayBufferToString(buffer);
          this._root = this.parseValue(decodeBuffer, size, 0, endPos) as any;

            if (this._error) {
                let strbuf: string = '\0';
                strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
                this._root = new JsonString(strbuf);

                CubismLogInfo('{0}', this._root.getRawString());
                return false;
            } else if (this._root == null) {
                this._root = new JsonError(new csmString(this._error), false); // rootは解放されるのでエラーオブジェクトを別途作成する
                return false;
            }
            return true;
        }

        /**
         * パース時のエラー値を返す
         */
        public getParseError(): string {
            return this._error;
        }

        /**
         * ルート要素の次の要素がファイルの終端だったらtrueを返す
         */
        public checkEndOfFile(): boolean {
            return this._root.getArray()[1].equals('EOF');
        }

        /**
         * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
         * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
         *
         * @param   buffer      JSONエレメントのバッファ
         * @param   length      パースする長さ
         * @param   begin       パースを開始する位置
         * @param   outEndPos   パース終了時の位置
         * @return      パースから取得したValueオブジェクト
         */
        protected parseValue(buffer: string, length: number, begin: number, outEndPos: number[]) {
            if (this._error) {    return null; }

          let o: Value = null as any;
            let i: number = begin;
            let f: number;

            for (; i < length; i++) {
                const c: string = buffer[i];
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
                        const afterString: string[] = new Array(1); // 参照渡しにするため
                        f = strtod(buffer.slice(i), afterString);
                        outEndPos[0] = buffer.indexOf(afterString[0]);
                        return new JsonFloat(f);
                    }
                case '\"':
                    return new JsonString(this.parseString(buffer, length, i + 1, outEndPos)); // \"の次の文字から
                case '[':
                    o = this.parseArray(buffer, length, i + 1, outEndPos);
                    return o;
                case '{':
                    o = this.parseObject(buffer, length, i + 1, outEndPos);
                    return o;
                case 'n': // null以外にない
                    if (i + 3 < length) {
                        o = new JsonNullvalue();    // 解放できるようにする
                        outEndPos[0] = i + 4;
                    } else {
                        this._error = 'parse null';
                    }
                    return o;
                case 't': // true以外にない
                    if (i + 3 < length) {
                        o = JsonBoolean.trueValue;
                        outEndPos[0] = i + 4;
                    } else {
                        this._error = 'parse true';
                    }
                    return o;
                case 'f': // false以外にない
                    if (i + 4 < length) {
                        o = JsonBoolean.falseValue;
                        outEndPos[0] = i + 5;
                    } else {
                        this._error = 'illegal \',\' position';
                    }
                    return o;
                case ',': // Array separator
                    this._error = 'illegal \',\' position';
                    return null;
                case ']': // 不正な｝だがスキップする。配列の最後に不要な , があると思われる
                    outEndPos[0] = i;  // 同じ文字を再処理
                    return null;
                case '\n':
                    this._lineCount++;
                case ' ':
                case '\t':
                case '\r':
                default: // スキップ
                    break;
                }
            }

            this._error = 'illegal end of value';
            return null;
        }

        /**
         * 次の「"」までの文字列をパースする。
         *
         * @param   string  ->  パース対象の文字列
         * @param   length  ->  パースする長さ
         * @param   begin   ->  パースを開始する位置
         * @param  outEndPos   ->  パース終了時の位置
         * @return      パースした文F字列要素
         */
        protected parseString(string: string, length: number, begin: number, outEndPos: number[]): string {
          if (this._error) { return null as any; }

            let i = begin;
            let c: string, c2: string;
            const ret: csmString = new csmString('');
            let bufStart: number = begin; // sbufに登録されていない文字の開始位置

            for (; i < length; i++) {
                c = string[i];

                switch (c) {
                case '\"': {
                        outEndPos[0] = i + 1;  // ”の次の文字
                        ret.append(string.slice(bufStart), (i - bufStart)); // 前の文字までを登録する
                        return ret.s;
                    }
                case '//': {
                        i++; // ２文字をセットで扱う

                        if (i - 1 > bufStart) {
                            ret.append(string.slice(bufStart), (i - bufStart)); // 前の文字までを登録する
                        }
                        bufStart = i + 1; // エスケープ（２文字)の次の文字から

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
                        } else {
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
          return null as any;
        }

        /**
         * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
         *
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        protected parseObject(buffer: string, length: number, begin: number, outEndPos: number[]): Value {
          if (this._error) { return null as any; }
            const ret: JsonMap = new JsonMap();

            // Key: Value
            let key: string = '';
            let i: number = begin;
            let c: string = '';
            const localRetEndPos2: number[] = Array(1);
            let ok: boolean = false;

            // , が続く限りループ
            for (; i < length; i++) {
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];

                    switch (c) {
                    case '\"':
                        key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                        if (this._error) {
                          return null as any;
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
                        break;  // スキップする文字
                    }
                }
                if (!ok) {
                    this._error = 'key not found';
                  return null as any;
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
                        break;  // スキップする文字
                    }
                }

                if (!ok) {
                    this._error = '\':\' not found';
                  return null as any;
                }

                // 値をチェック
              const value: Value = this.parseValue(buffer, length, i, localRetEndPos2) as any;
                if (this._error) {
                  return null as any;
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
                        break;  // スキップ
                    }
                }
            }

            this._error = 'illegal end of perseObject';
          return null as any;
        }

        /**
         * 次の「"」までの文字列をパースする。
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        protected parseArray(buffer: string, length: number, begin: number, outEndPos: number[]): Value {
          if (this._error) { return null as any; }
            let ret: JsonArray = new JsonArray();

            // key : value
            let i: number = begin;
            let c: string;
            const localRetEndpos2: number[] = new Array(1);

            // , が続く限りループ
            for (; i < length; i++) {
                // : をチェック
              const value: Value = this.parseValue(buffer, length, i, localRetEndpos2) as any;

                if (this._error) {
                  return null as any;
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

          ret = void 0 as any;
            this._error = 'illegal end of parseObject';
          return null as any;
        }

        /**
         * エンコード、パディング
         */
        private pad(n: string): string {
            return n.length < 2
                ? '0' + n
                : n;
        }    }

    /**
     * パースしたJSONの要素をfloat値として扱う
     */
    export class JsonFloat extends Value {

        private _value: number; // JSON要素の値
        /**
         * コンストラクタ
         */
        constructor(v: number) {
            super();

            this._value = v;
        }

        /**
         * Valueの種類が数値型ならtrue
         */
        public isFloat(): boolean {
            return true;
        }

        /**
         * 要素を文字列で返す(csmString型)
         */
        public getString(defaultValue: string, indent: string): string {
            const strbuf: string = '\0';
            this._value = parseFloat(strbuf);
            this._stringBuffer = strbuf;

            return this._stringBuffer;
        }

        /**
         * 要素を数値型で返す(number)
         */
        public toInt(defaultValue: number = 0): number {
            return parseInt(this._value.toString());
        }

        /**
         * 要素を数値型で返す(number)
         */
        public toFloat(defaultValue: number = 0.0): number {
            return this._value;
        }

        /**
         * 引数の値と等しければtrue
         */
        public equals(value: csmString): boolean;
        public equals(value: string): boolean;
        public equals(value: number): boolean;
        public equals(value: boolean): boolean;
        public equals(value: any): boolean {
            if ('number' === typeof(value)) {
                // int
                if (Math.round(value)) {
                    return false;
                } else {
                    return value == this._value;
                }
            }
            return false;
        }
    }

    /**
     * パースしたJSONの要素を真偽値として扱う
     */
    export class JsonBoolean extends Value {

        public static trueValue: JsonBoolean;  // true
        public static falseValue: JsonBoolean; // false

        private _boolValue: boolean; // JSON要素の値

        /**
         * 引数付きコンストラクタ
         */
        public constructor(v: boolean) {
            super();

            this._boolValue = v;
        }

        /**
         * Valueの種類が真偽値ならtrue
         */
        public isBool(): boolean {
            return true;
        }

        /**
         * 要素を真偽値で返す(boolean)
         */
        public toBoolean(defaultValue: boolean = false): boolean {
            return this._boolValue;
        }

        /**
         * 要素を文字列で返す(csmString型)
         */
        public getString(defaultValue: string, indent: string): string {
            this._stringBuffer = this._boolValue
                    ? 'true'
                    : 'false';

            return this._stringBuffer;
        }

        /**
         * 引数の値と等しければtrue
         */
        public equals(value: csmString): boolean;
        public equals(value: string): boolean;
        public equals(value: number): boolean;
        public equals(value: boolean): boolean;
        public equals(value: any): boolean {
            if ('boolean' === typeof(value)) {
                return value == this._boolValue;
            }
            return false;
        }

        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        public isStatic(): boolean {
            return true;
        }
    }

    /**
     * パースしたJSONの要素を文字列として扱う
     */
    export class JsonString extends Value {
        /**
         * 引数付きコンストラクタ
         */
        public constructor(s: string);
        public constructor(s: csmString)
        public constructor(s: any) {
            super();

            if ('string' === typeof(s)) {
                this._stringBuffer = s;
            }

            if (s instanceof csmString) {
                this._stringBuffer = s.s;
            }
        }

        /**
         * Valueの種類が文字列ならtrue
         */
        public isString(): boolean {
            return true;
        }

        /**
         * 要素を文字列で返す(csmString型)
         */
        public getString(defaultValue: string, indent: string): string {
            return this._stringBuffer;
        }

        /**
         * 引数の値と等しければtrue
         */
        public equals(value: csmString): boolean;
        public equals(value: string): boolean;
        public equals(value: number): boolean;
        public equals(value: boolean): boolean;
        public equals(value: any): boolean {
            if ('string' === typeof(value)) {
                return this._stringBuffer == value;
            }

            if (value instanceof csmString) {
                return (this._stringBuffer == value.s);
            }

            return false;
        }
    }

    /**
     * JSONパース時のエラー結果。文字列型のようにふるまう
     */
    export class JsonError extends JsonString {


        protected _isStatic: boolean; // 静的なValueかどうか

        /**
         * 引数付きコンストラクタ
         */
        public constructor(s: csmString|string, isStatic: boolean) {
            if ('string' === typeof(s)) {
                super(s);
            } else {
                super(s);
            }
            this._isStatic = isStatic;
        }
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        public isStatic(): boolean {
            return this._isStatic;
        }

        /**
         * エラー情報をセットする
         */
        public setErrorNotForClientCall(s: string): Value {
            this._stringBuffer = s;
            return this;
        }

        /**
         * Valueの種類がエラー値ならtrue
         */
        public isError(): boolean {
            return true;
        }
    }

    /**
     * パースしたJSONの要素をNULL値として持つ
     */
    export class JsonNullvalue extends Value {

        /**
         * コンストラクタ
         */
        public constructor() {
            super();

            this._stringBuffer = 'NullValue';
        }
        /**
         * Valueの種類がNULL値ならtrue
         */
        public isNull(): boolean {
            return true;
        }

        /**
         * 要素を文字列で返す(csmString型)
         */
        public getString(defaultValue: string, indent: string): string {
            return this._stringBuffer;
        }

        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        public isStatic(): boolean {
            return true;
        }

    }

    /**
     * パースしたJSONの要素を配列として持つ
     */
    export class JsonArray extends Value {

        private _array: csmVector<Value>; // JSON要素の値
        /**
         * コンストラクタ
         */
        public constructor() {
            super();
            this._array = new csmVector<Value>();
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void {
            for (const ite: csmVector_iterator<Value> = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
                let v: Value = ite.ptr();

                if (v && !v.isStatic()) {
                  v = void 0 as any;
                  v = null as any;
                }
            }
        }

        /**
         * Valueの種類が配列ならtrue
         */
        public isArray(): boolean {
            return true;
        }

        /**
         * 添字演算子[index]
         */
        public getValueByIndex(index: number): Value {
            if (index < 0 || this._array.getSize() <= index) {
                return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
            }

            const v: Value = this._array.at(index);

            if (v == null) {
                return Value.nullValue;
            }

            return v;
        }

        /**
         * 添字演算子[string | csmString]
         */
        public getValueByString(s: string | csmString): Value {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }

        /**
         * 要素を文字列で返す(csmString型)
         */
        public getString(defaultValue: string, indent: string): string {
            const stringBuffer: string = indent + '[\n';

            for (const ite: csmVector_iterator<Value> = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
                const v: Value = ite.ptr();
                this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
            }

            this._stringBuffer = stringBuffer + indent + ']\n';

            return this._stringBuffer;
        }

        /**
         * 配列要素を追加する
         * @param v 追加する要素
         */
        public add(v: Value): void {
            this._array.pushBack(v);
        }

        /**
         * 要素をコンテナで返す(csmVector<Value>)
         */
      public getVector(defaultValue: csmVector<Value> = null as any): csmVector<Value> {
            return this._array;
        }

        /**
         * 要素の数を返す
         */
        public getSize(): number {
            return this._array.getSize();
        }
    }

    /**
     * パースしたJSONの要素をマップとして持つ
     */
    export class JsonMap extends Value {


        private _map: csmMap<string, Value>;   // JSON要素の値
      private _keys: csmVector<string> = undefined as any;               // JSON要素の値
        /**
         * コンストラクタ
         */
        public constructor() {
            super();
            this._map = new csmMap<string, Value>();
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void {
            const ite: csmMap_iterator<string, Value> = this._map.begin();

            while (ite.notEqual(this._map.end())) {
                let v: Value = ite.ptr().second;

                if (v && !v.isStatic()) {
                  v = void 0 as any;
                  v = null as any;
                }

                ite.preIncrement();
            }
        }

        /**
         * Valueの値がMap型ならtrue
         */
        public isMap(): boolean {
            return true;
        }

        /**
         * 添字演算子[string | csmString]
         */
        public getValueByString(s: string | csmString): Value {
            if (s instanceof csmString) {
                const ret: Value = this._map.getValue(s.s);
                if (ret == null) {
                    return Value.nullValue;
                }
                return ret;
            }

            for (const iter: csmMap_iterator<string, Value> = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
                if (iter.ptr().first == s) {
                    if (iter.ptr().second == null) {
                        return Value.nullValue;
                    }
                    return iter.ptr().second;
                }
            }

            return Value.nullValue;
        }

        /**
         * 添字演算子[index]
         */
        public getValueByIndex(index: number): Value {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }

        /**
         * 要素を文字列で返す(csmString型)
         */
        public getString(defaultValue: string, indent: string) {
            this._stringBuffer = indent + '{\n';

            const ite: csmMap_iterator<string, Value> = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                const key = ite.ptr().first;
                const v: Value = ite.ptr().second;

                this._stringBuffer += indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
                ite.preIncrement();
            }

            this._stringBuffer += indent + '}\n';

            return this._stringBuffer;
        }

        /**
         * 要素をMap型で返す
         */
        public getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value> {
            return this._map;
        }

        /**
         * Mapに要素を追加する
         */
        public put(key: string, v: Value): void {
            this._map.setValue(key, v);
        }

        /**
         * Mapからキーのリストを取得する
         */
        public getKeys(): csmVector<string> {
            if (!this._keys) {
                this._keys = new csmVector<string>();

                const ite: csmMap_iterator<string, Value> = this._map.begin();

                while (ite.notEqual(this._map.end())) {
                    const key: string = ite.ptr().first;
                    this._keys.pushBack(key);
                    ite.preIncrement();
                }
            }
            return this._keys;
        }

        /**
         * Mapの要素数を取得する
         */
        public getSize(): number {
            return this._keys.getSize();
        }
    }
}
