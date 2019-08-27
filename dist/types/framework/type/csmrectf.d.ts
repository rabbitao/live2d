export declare namespace Live2DCubismFramework {
    /**
     * 矩形形状（座標・長さはfloat値）を定義するクラス
     */
    class csmRect {
        x: number;
        y: number;
        width: number;
        height: number;
        /**
         * コンストラクタ
         * @param x 左端X座標
         * @param y 上端Y座標
         * @param w 幅
         * @param h 高さ
         */
        constructor(x?: number, y?: number, w?: number, h?: number);
        /**
         * 矩形中央のX座標を取得する
         */
        getCenterX(): number;
        /**
         * 矩形中央のY座標を取得する
         */
        getCenterY(): number;
        /**
         * 右側のX座標を取得する
         */
        getRight(): number;
        /**
         * 下端のY座標を取得する
         */
        getBottom(): number;
        /**
         * 矩形に値をセットする
         * @param r 矩形のインスタンス
         */
        setRect(r: csmRect): void;
        /**
         * 矩形中央を軸にして縦横を拡縮する
         * @param w 幅方向に拡縮する量
         * @param h 高さ方向に拡縮する量
         */
        expand(w: number, h: number): void;
    }
}
