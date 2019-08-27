/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismmath } from './cubismmath';
var CubismMath = cubismmath.CubismMath;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var FrameRate = 30;
    var Epsilon = 0.01;
    /**
     * 面部定向控制功能
     *
     * 提供面部方向控制功能的类
     */
    var CubismTargetPoint = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismTargetPoint() {
            this._faceTargetX = 0.0;
            this._faceTargetY = 0.0;
            this._faceX = 0.0;
            this._faceY = 0.0;
            this._faceVX = 0.0;
            this._faceVY = 0.0;
            this._lastTimeSeconds = 0.0;
            this._userTimeSeconds = 0.0;
        }
        /**
         * 更新过程
         */
        CubismTargetPoint.prototype.update = function (deltaTimeSeconds) {
            // 添加增量时间
            this._userTimeSeconds += deltaTimeSeconds;
            // 从一侧到另一侧摆动颈部时的平均速度是第二速度。 考虑加速度和减速度，使最大速度加倍
            // 从中心（0.0）左右摆动（+ -1.0)
            var faceParamMaxV = 40.0 / 10.0; // 在7.5秒内移动40分钟（5.3 / sc）
            var maxV = faceParamMaxV * 1.0 / FrameRate; // 每帧可以更改的最大速度
            if (this._lastTimeSeconds == 0.0) {
                this._lastTimeSeconds = this._userTimeSeconds;
                return;
            }
            var deltaTimeWeight = (this._userTimeSeconds - this._lastTimeSeconds) * FrameRate;
            this._lastTimeSeconds = this._userTimeSeconds;
            // 是时候达到最高速度了
            var timeToMaxSpeed = 0.15;
            var frameToMaxSpeed = timeToMaxSpeed * FrameRate; // sec * frame/sec
            var maxA = deltaTimeWeight * maxV / frameToMaxSpeed; // 每帧加速度
            // 目标方向是（dx，dy）方向的矢量
            var dx = this._faceTargetX - this._faceX;
            var dy = this._faceTargetY - this._faceY;
            if (CubismMath.abs(dx) <= Epsilon && CubismMath.abs(dy) <= Epsilon) {
                return; // 没有变化
            }
            // 如果大于最大速度，则降低速度
            var d = CubismMath.sqrt((dx * dx) + (dy * dy));
            // 行进方向上的最大速度矢量
            var vx = maxV * dx / d;
            var vy = maxV * dy / d;
            // 找到从当前速度到新速度的变化（加速度）
            var ax = vx - this._faceVX;
            var ay = vy - this._faceVY;
            var a = CubismMath.sqrt((ax * ax) + (ay * ay));
            // 加速时
            if (a < -maxA || a > maxA) {
                ax *= maxA / a;
                ay *= maxA / a;
            }
            // 将加速度添加到原始速度以获得新速度
            this._faceVX += ax;
            this._faceVY += ay;
            // 处理在接近目标方向时平滑减速
            // 从距离和速度之间的关系可以停止在设定的加速度
            // 计算现在可以采取的最大速度，并在超过该速度时降低速度
            // ※最初，人类可以通过肌肉力量调整力（加速度），因此它们具有更高的自由度，但是简单的处理就足够了。
            {
                // 加速度，速度和距离的关系表达式
                //            2  6           2               3
                //      sqrt(a  t  + 16 a h t  - 8 a h) - a t
                // v = --------------------------------------
                //                    2
                //                 4 t  - 2
                // (t=1)
                // 	在时间t，加速度和速度被预先设置为1/60（帧速率，无单位）。
                // 	我们认为，可以删除t = 1（*未经验证）
                var maxV_1 = 0.5 * (CubismMath.sqrt((maxA * maxA) + 16.0 * maxA * d - 8.0 * maxA * d) - maxA);
                var curV = CubismMath.sqrt((this._faceVX * this._faceVX) + (this._faceVY * this._faceVY));
                if (curV > maxV_1) {
                    // 如果当前速度>最大速度，则减速到最大速度
                    this._faceVX *= maxV_1 / curV;
                    this._faceVY *= maxV_1 / curV;
                }
            }
            this._faceX += this._faceVX;
            this._faceY += this._faceVY;
        };
        /**
         * 在X轴上获取面部方向值
         *
         * @return X轴面定向值（-1.0到1.0）
         */
        CubismTargetPoint.prototype.getX = function () {
            return this._faceX;
        };
        /**
         * 在Y轴上获取面部方向值
         *
         * @return Y轴面定向值（-1.0到1.0)
         */
        CubismTargetPoint.prototype.getY = function () {
            return this._faceY;
        };
        /**
         * 设置面部方向的目标值
         *
         * @param x X轴面定向值（-1.0到1.0）
         * @param y Y轴面定向值（-1.0到1.0）
         */
        CubismTargetPoint.prototype.set = function (x, y) {
            this._faceTargetX = x;
            this._faceTargetY = y;
        };
        return CubismTargetPoint;
    }());
    Live2DCubismFramework.CubismTargetPoint = CubismTargetPoint;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
