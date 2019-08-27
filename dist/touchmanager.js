/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
var TouchManager = /** @class */ (function () {
    /**
     * 构造函数
     */
    function TouchManager() {
        this._startX = 0.0;
        this._startY = 0.0;
        this._lastX = 0.0;
        this._lastY = 0.0;
        this._lastX1 = 0.0;
        this._lastY1 = 0.0;
        this._lastX2 = 0.0;
        this._lastY2 = 0.0;
        this._lastTouchDistance = 0.0;
        this._deltaX = 0.0;
        this._deltaY = 0.0;
        this._scale = 1.0;
        this._touchSingle = false;
        this._flipAvailable = false;
    }
    TouchManager.prototype.getCenterX = function () {
        return this._lastX;
    };
    TouchManager.prototype.getCenterY = function () {
        return this._lastY;
    };
    TouchManager.prototype.getDeltaX = function () {
        return this._deltaX;
    };
    TouchManager.prototype.getDeltaY = function () {
        return this._deltaY;
    };
    TouchManager.prototype.getStartX = function () {
        return this._startX;
    };
    TouchManager.prototype.getStartY = function () {
        return this._startY;
    };
    TouchManager.prototype.getScale = function () {
        return this._scale;
    };
    TouchManager.prototype.getX = function () {
        return this._lastX;
    };
    TouchManager.prototype.getY = function () {
        return this._lastY;
    };
    TouchManager.prototype.getX1 = function () {
        return this._lastX1;
    };
    TouchManager.prototype.getY1 = function () {
        return this._lastY1;
    };
    TouchManager.prototype.getX2 = function () {
        return this._lastX2;
    };
    TouchManager.prototype.getY2 = function () {
        return this._lastY2;
    };
    TouchManager.prototype.isSingleTouch = function () {
        return this._touchSingle;
    };
    TouchManager.prototype.isFlickAvailable = function () {
        return this._flipAvailable;
    };
    TouchManager.prototype.disableFlick = function () {
        this._flipAvailable = false;
    };
    /**
     * 触摸开始事件
     * @param deviceX 触摸屏幕的X值
     * @param deviceY 触摸屏幕的Y值
     */
    TouchManager.prototype.touchesBegan = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._startX = deviceX;
        this._startY = deviceY;
        this._lastTouchDistance = -1.0;
        this._flipAvailable = true;
        this._touchSingle = true;
    };
    /**
     * 拖动事件
     * @param deviceX 触摸屏幕的X值
     * @param deviceY 触摸屏幕的Y值
     */
    TouchManager.prototype.touchesMoved = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._lastTouchDistance = -1.0;
        this._touchSingle = true;
    };
    /**
     * 距离计算
     * @return 移动距离
     */
    TouchManager.prototype.getFlickDistance = function () {
        return this.calculateDistance(this._startX, this._startY, this._lastX, this._lastY);
    };
    /**
     * 找到从第1点到第2点的距离
     *
     * @param x1 第一个触摸屏幕的X值
     * @param y1 第一个触摸屏幕的Y值
     * @param x2 第二个触摸屏的X值
     * @param y2 第二个触摸屏的Y值
     */
    TouchManager.prototype.calculateDistance = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };
    /**
     * 从第二值获得移动量。
     * 如果方向不同，则移动量为0。 如果方向相同，请参考具有较小绝对值的值。。
     *
     * @param v1 第一次移动量
     * @param v2 第二次移动量
     *
     * @return 较小的移动量
     */
    TouchManager.prototype.calculateMovingAmount = function (v1, v2) {
        if ((v1 > 0.0) != (v2 > 0.0)) {
            return 0.0;
        }
        var sign = v1 > 0.0 ? 1.0 : -1.0;
        var absoluteValue1 = Math.abs(v1);
        var absoluteValue2 = Math.abs(v2);
        return sign * ((absoluteValue1 < absoluteValue2) ? absoluteValue1 : absoluteValue2);
    };
    return TouchManager;
}());
export { TouchManager };
