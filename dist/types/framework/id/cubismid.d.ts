import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
export declare namespace Live2DCubismFramework {
    /**
     * パラメータ名・パーツ名・Drawable名を保持
     *
     * パラメータ名・パーツ名・Drawable名を保持するクラス。
     */
    class CubismId {
        private _id;
        /**
         * コンストラクタ
         */
        constructor(id: string | csmString);
        /**
         * ID名を取得する
         */
        getString(): csmString;
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        isEqual(c: string | csmString | CubismId): boolean;
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        isNotEqual(c: string | csmString | CubismId): boolean;
    }
    type CubismIdHandle = CubismId;
}
