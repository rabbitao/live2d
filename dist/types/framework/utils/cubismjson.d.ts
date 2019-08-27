import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmmap } from '../type/csmmap';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmMap = csmmap.csmMap;
import csmString = csmstring.csmString;
export declare namespace Live2DCubismFramework {
    /**
     * 已解析的JSON元素元素的基类。
     */
    abstract class Value {
        static errorValue: Value;
        static nullValue: Value;
        /**
         * 初始化方法
         */
        static staticInitializeNotForClientCall(): void;
        /**
         * 发布方式
         */
        static staticReleaseNotForClientCall(): void;
        private static s_dummyKeys;
        protected _stringBuffer: string;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 以字符串形式返回元素(csmString型)
         */
        abstract getString(defaultValue?: string, indent?: string): string;
        /**
         * 以字符串形式返回元素(string)
         */
        getRawString(defaultValue?: string, indent?: string): string;
        /**
         * 以数字类型返回元素(number)
         */
        toInt(defaultValue?: number): number;
        /**
         * 以数字类型返回元素(number)
         */
        toFloat(defaultValue?: number): number;
        /**
         * 以布尔值的形式返回元素(boolean)
         */
        toBoolean(defaultValue?: boolean): boolean;
        /**
         * 返回大小
         */
        getSize(): number;
        /**
         * 返回元素数组(Value[])
         */
        getArray(defaultValue?: Value[]): Value[];
        /**
         * 返回容器中的元素(array)
         */
        getVector(defaultValue?: csmVector<Value>): csmVector<Value>;
        /**
         * 将元素作为map返回(csmMap<csmString, Value>)
         */
        getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value>;
        /**
         * getValueByIndex[index]
         */
        getValueByIndex(index: number): Value;
        /**
         * getValueByString[string | csmString]
         */
        getValueByString(s: string | csmString): Value;
        /**
         * 返回容器中的映射键列表
         *
         * @return 键列表
         */
        getKeys(): csmVector<string>;
        /**
         * 如果值类型是错误值，则为True
         */
        isError(): boolean;
        /**
         * Valueの種類がnullならtrue
         */
        isNull(): boolean;
        /**
         * Valueの種類が真偽値ならtrue
         */
        isBool(): boolean;
        /**
         * Valueの種類が数値型ならtrue
         */
        isFloat(): boolean;
        /**
         * Valueの種類が文字列ならtrue
         */
        isString(): boolean;
        /**
         * Valueの種類が配列ならtrue
         */
        isArray(): boolean;
        /**
         * Valueの種類がマップ型ならtrue
         */
        isMap(): boolean;
        /**
         * 如果参数的值相等，则为True
         */
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
        /**
         * 如果值的值为静态，则为true，如果为静态，则不释放
         */
        isStatic(): boolean;
        /**
         * 将错误值设置为Value
         */
        setErrorNotForClientCall(errorStr: string): Value;
    }
    /**
     * 最小的轻量级JSON解析器，仅支持Ascii字符。
     * 规范是JSON的子集。
     * 用于加载配置文件（model3.json）
     *
     * [不支持的项目]
     * ・非ASCII字符，如日语
     * ・e的指数表达式
     */
    class CubismJson {
        /**
         * 直接从字节数据加载并解析
         *
         * @param buffer
         * @param size
         * @return CubismJson类的一个实例。 失败时为NULL
         */
        static create(buffer: ArrayBuffer, size: number): CubismJson;
        /**
         * 释放已解析的JSON对象的处理
         *
         * @param instance CubismJson类的实例
         */
        static delete(instance: CubismJson): void;
        _error: string;
        _lineCount: number;
        _root: Value;
        /**
         * 构造函数
         */
        constructor(buffer?: ArrayBuffer, length?: number);
        /**
         * 返回已解析的JSON的根元素
         */
        getRoot(): Value;
        /**
         *  将Unicode二进制转换为String
         *
         * @param buffer 要转换的二进制数据
         * @return 转换后的字符串
         */
        arrayBufferToString(buffer: ArrayBuffer): string;
        /**
         * 执行JSON解析
         * @param buffer    要解析的数据字节
         * @param size      数据字节大小
         * return true : 成功
         * return false: 失敗
         */
        parseBytes(buffer: ArrayBuffer, size: number): boolean;
        /**
         * 解析时返回错误值
         */
        getParseError(): string;
        /**
         * 如果根元素后面的元素是文件的末尾，则返回true
         */
        checkEndOfFile(): boolean;
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
        protected parseValue(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
        /**
         * 将字符串解析为下一个「"」
         *
         * @param   string  ->  要解析的字符串
         * @param   length  ->  要解析的长度
         * @param   begin   ->  开始解析的位置
         * @param  outEndPos   ->  解析结束时的位置
         * @return      解析句子F字符串元素
         */
        protected parseString(string: string, length: number, begin: number, outEndPos: number[]): string;
        /**
         * 解析JSON对象元素并返回Value对象
         *
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        protected parseObject(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
        /**
         * 将字符串解析为下一个「"」
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        protected parseArray(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
        /**
         * 编码，填充
         */
        private pad;
    }
    /**
     * 将解析的JSON元素视为浮点值
     */
    class JsonFloat extends Value {
        private _value;
        /**
         * 构造函数
         */
        constructor(v: number);
        /**
         * 如果值类型是数字，则为True
         */
        isFloat(): boolean;
        /**
         * 以字符串形式返回元素（csmString类型）
         */
        getString(defaultValue: string, indent: string): string;
        /**
         * 以数字类型（number）返回元素
         */
        toInt(defaultValue?: number): number;
        /**
         * 以数字类型（number）返回元素
         */
        toFloat(defaultValue?: number): number;
        /**
         * 如果参数的值相等，则为True
         */
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
    }
    /**
     * 将解析的JSON元素视为布尔值
     */
    class JsonBoolean extends Value {
        static trueValue: JsonBoolean;
        static falseValue: JsonBoolean;
        private _boolValue;
        /**
         * 引数付きコンストラクタ
         */
        constructor(v: boolean);
        /**
         * Valueの種類が真偽値ならtrue
         */
        isBool(): boolean;
        /**
         * 要素を真偽値で返す(boolean)
         */
        toBoolean(defaultValue?: boolean): boolean;
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue: string, indent: string): string;
        /**
         * 引数の値と等しければtrue
         */
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        isStatic(): boolean;
    }
    /**
     * 将解析的JSON元素视为字符串
     */
    class JsonString extends Value {
        /**
         * 引数付きコンストラクタ
         */
        constructor(s: string);
        constructor(s: csmString);
        /**
         * Valueの種類が文字列ならtrue
         */
        isString(): boolean;
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue: string, indent: string): string;
        /**
         * 引数の値と等しければtrue
         */
        equals(value: csmString): boolean;
        equals(value: string): boolean;
        equals(value: number): boolean;
        equals(value: boolean): boolean;
    }
    /**
     * JSON解析期间的错误结果。 像字符串类型一样
     */
    class JsonError extends JsonString {
        protected _isStatic: boolean;
        /**
         * 引数付きコンストラクタ
         */
        constructor(s: csmString | string, isStatic: boolean);
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        isStatic(): boolean;
        /**
         * エラー情報をセットする
         */
        setErrorNotForClientCall(s: string): Value;
        /**
         * Valueの種類がエラー値ならtrue
         */
        isError(): boolean;
    }
    /**
     * 将解析的JSON元素作为空值
     */
    class JsonNullvalue extends Value {
        /**
         * コンストラクタ
         */
        constructor();
        /**
         * Valueの種類がNULL値ならtrue
         */
        isNull(): boolean;
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue: string, indent: string): string;
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        isStatic(): boolean;
    }
    /**
     * 将解析后的JSON元素作为array
     */
    class JsonArray extends Value {
        private _array;
        /**
         * コンストラクタ
         */
        constructor();
        /**
         * デストラクタ相当の処理
         */
        release(): void;
        /**
         * Valueの種類が配列ならtrue
         */
        isArray(): boolean;
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index: number): Value;
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s: string | csmString): Value;
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue: string, indent: string): string;
        /**
         * 配列要素を追加する
         * @param v 追加する要素
         */
        add(v: Value): void;
        /**
         * 要素をコンテナで返す(csmVector<Value>)
         */
        getVector(defaultValue?: csmVector<Value>): csmVector<Value>;
        /**
         * 要素の数を返す
         */
        getSize(): number;
    }
    /**
     * 将解析后的JSON元素作为map
     */
    class JsonMap extends Value {
        private _map;
        private _keys;
        /**
         * コンストラクタ
         */
        constructor();
        /**
         * デストラクタ相当の処理
         */
        release(): void;
        /**
         * Valueの値がMap型ならtrue
         */
        isMap(): boolean;
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s: string | csmString): Value;
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index: number): Value;
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue: string, indent: string): string;
        /**
         * 要素をMap型で返す
         */
        getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value>;
        /**
         * Mapに要素を追加する
         */
        put(key: string, v: Value): void;
        /**
         * Mapからキーのリストを取得する
         */
        getKeys(): csmVector<string>;
        /**
         * Mapの要素数を取得する
         */
        getSize(): number;
    }
}
