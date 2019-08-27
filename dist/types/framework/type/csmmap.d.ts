export declare namespace Live2DCubismFramework {
    /**
     * Key-Valueのペアを定義するクラス
     * csmMapクラスの内部データで使用する。
     */
    class csmPair<_KeyT, _ValT> {
        first: _KeyT;
        second: _ValT;
        /**
         * コンストラクタ
         * @param key Keyとしてセットする値
         * @param value Valueとしてセットする値
         */
        constructor(key?: _KeyT, value?: _ValT);
    }
    /**
     * マップ型
     */
    class csmMap<_KeyT, _ValT> {
        static readonly DefaultSize = 10;
        _keyValues: Array<csmPair<_KeyT, _ValT>>;
        _dummyValue: _ValT;
        _size: number;
        /**
         * 引数付きコンストラクタ
         * @param size 初期化時点で確保するサイズ
         */
        constructor(size?: number);
        /**
         * デストラクタ
         */
        release(): void;
        /**
         * キーを追加する
         * @param key 新たに追加するキー
         */
        appendKey(key: _KeyT): void;
        /**
         * 添字演算子[key]のオーバーロード(get)
         * @param key 添字から特定されるValue値
         */
        getValue(key: _KeyT): _ValT;
        /**
         * 添字演算子[key]のオーバーロード(set)
         * @param key 添字から特定されるValue値
         * @param value 代入するValue値
         */
        setValue(key: _KeyT, value: _ValT): void;
        /**
         * 引数で渡したKeyを持つ要素が存在するか
         * @param key 存在を確認するkey
         * @return true 引数で渡したkeyを持つ要素が存在する
         * @return false 引数で渡したkeyを持つ要素が存在しない
         */
        isExist(key: _KeyT): boolean;
        /**
         * keyValueのポインタを全て解放する
         */
        clear(): void;
        /**
         * コンテナのサイズを取得する
         *
         * @return コンテナのサイズ
         */
        getSize(): number;
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない。
         * @param fitToSize trueなら指定したサイズに合わせる。falseならサイズを2倍確保しておく。
         */
        prepareCapacity(newSize: number, fitToSize: boolean): void;
        /**
         * コンテナの先頭要素を返す
         */
        begin(): iterator<_KeyT, _ValT>;
        /**
         * コンテナの終端要素を返す
         */
        end(): iterator<_KeyT, _ValT>;
        /**
         * コンテナから要素を削除する
         *
         * @param ite 削除する要素
         */
        erase(ite: iterator<_KeyT, _ValT>): iterator<_KeyT, _ValT>;
        /**
         * コンテナの値を32ビット符号付き整数型でダンプする
         */
        dumpAsInt(): void;
    }
    /**
     * csmMap<T>のイテレータ
     */
    class iterator<_KeyT, _ValT> {
        _index: number;
        _map: csmMap<_KeyT, _ValT>;
        /**
         * コンストラクタ
         */
        constructor(v?: csmMap<_KeyT, _ValT>, idx?: number);
        /**
         * =演算子のオーバーロード
         */
        set(ite: iterator<_KeyT, _ValT>): iterator<_KeyT, _ValT>;
        /**
         * 前置き++演算子のオーバーロード
         */
        preIncrement(): iterator<_KeyT, _ValT>;
        /**
         * 前置き--演算子のオーバーロード
         */
        preDecrement(): iterator<_KeyT, _ValT>;
        /**
         * 後置き++演算子のオーバーロード
         */
        increment(): iterator<_KeyT, _ValT>;
        /**
         * 後置き--演算子のオーバーロード
         */
        decrement(): iterator<_KeyT, _ValT>;
        /**
         * *演算子のオーバーロード
         */
        ptr(): csmPair<_KeyT, _ValT>;
        /**
         * !=演算
         */
        notEqual(ite: iterator<_KeyT, _ValT>): boolean;
    }
}
