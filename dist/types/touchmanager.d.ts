export declare class TouchManager {
    _startY: number;
    _startX: number;
    _lastX: number;
    _lastY: number;
    _lastX1: number;
    _lastY1: number;
    _lastX2: number;
    _lastY2: number;
    _lastTouchDistance: number;
    _deltaX: number;
    _deltaY: number;
    _scale: number;
    _touchSingle: boolean;
    _flipAvailable: boolean;
    /**
     * 构造函数
     */
    constructor();
    getCenterX(): number;
    getCenterY(): number;
    getDeltaX(): number;
    getDeltaY(): number;
    getStartX(): number;
    getStartY(): number;
    getScale(): number;
    getX(): number;
    getY(): number;
    getX1(): number;
    getY1(): number;
    getX2(): number;
    getY2(): number;
    isSingleTouch(): boolean;
    isFlickAvailable(): boolean;
    disableFlick(): void;
    /**
     * 触摸开始事件
     * @param deviceX 触摸屏幕的X值
     * @param deviceY 触摸屏幕的Y值
     */
    touchesBegan(deviceX: number, deviceY: number): void;
    /**
     * 拖动事件
     * @param deviceX 触摸屏幕的X值
     * @param deviceY 触摸屏幕的Y值
     */
    touchesMoved(deviceX: number, deviceY: number): void;
    /**
     * 距离计算
     * @return 移动距离
     */
    getFlickDistance(): number;
    /**
     * 找到从第1点到第2点的距离
     *
     * @param x1 第一个触摸屏幕的X值
     * @param y1 第一个触摸屏幕的Y值
     * @param x2 第二个触摸屏的X值
     * @param y2 第二个触摸屏的Y值
     */
    calculateDistance(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * 从第二值获得移动量。
     * 如果方向不同，则移动量为0。 如果方向相同，请参考具有较小绝对值的值。。
     *
     * @param v1 第一次移动量
     * @param v2 第二次移动量
     *
     * @return 较小的移动量
     */
    calculateMovingAmount(v1: number, v2: number): number;
}
