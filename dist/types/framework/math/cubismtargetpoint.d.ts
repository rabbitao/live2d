export declare namespace Live2DCubismFramework {
    /**
     * 面部定向控制功能
     *
     * 提供面部方向控制功能的类
     */
    class CubismTargetPoint {
        private _faceTargetX;
        private _faceTargetY;
        private _faceX;
        private _faceY;
        private _faceVX;
        private _faceVY;
        private _lastTimeSeconds;
        private _userTimeSeconds;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 更新过程
         */
        update(deltaTimeSeconds: number): void;
        /**
         * 在X轴上获取面部方向值
         *
         * @return X轴面定向值（-1.0到1.0）
         */
        getX(): number;
        /**
         * 在Y轴上获取面部方向值
         *
         * @return Y轴面定向值（-1.0到1.0)
         */
        getY(): number;
        /**
         * 设置面部方向的目标值
         *
         * @param x X轴面定向值（-1.0到1.0）
         * @param y Y轴面定向值（-1.0到1.0）
         */
        set(x: number, y: number): void;
    }
}
