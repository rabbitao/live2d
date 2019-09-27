/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismmath } from '../math/cubismmath';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { CSM_ASSERT } from '../utils/cubismdebug';
var csmVector = csmvector.csmVector;
var CubismMath = cubismmath.CubismMath;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 运动的抽象基类
     *
     * 运动的抽象基类。 使用MotionQueueManager管理动画播放。
     */
    var ACubismMotion = /** @class */ (function () {
        /**
         * 构造函数
         */
        function ACubismMotion() {
            this._fadeInSeconds = -1.0;
            this._fadeOutSeconds = -1.0;
            this._weight = 1.0;
            this._offsetSeconds = 0.0; // 播放开始时间
            this._firedEventValues = new csmVector();
            this._name = '';
        }
        /**
         * 销毁实例
         */
        ACubismMotion.delete = function (motion) {
            motion.release();
            motion = void 0;
            motion = null;
        };
        /**
         * 析构函数等效处理
         */
        ACubismMotion.prototype.release = function () {
            this._weight = 0.0;
        };
        /**
         * 模型参数
         * @param model 目标模型
         * @param motionQueueEntry 由CubismMotionQueueManager管理的动作
         * @param userTimeSeconds 增量时间的综合值[秒]
         */
        ACubismMotion.prototype.updateParameters = function (model, motionQueueEntry, userTimeSeconds) {
            if (!motionQueueEntry.isAvailable() || motionQueueEntry.isFinished()) {
                return;
            }
            if (!motionQueueEntry.isStarted()) {
                motionQueueEntry.setIsStarted(true);
                motionQueueEntry.setStartTime(userTimeSeconds - this._offsetSeconds); // 记录动作的开始时间
                motionQueueEntry.setFadeInStartTime(userTimeSeconds); // 淡入开始时间
                var duration = this.getDuration();
                if (motionQueueEntry.getEndTime() < 0) {
                    // 它可以设置为在开始之前结束。
                    motionQueueEntry.setEndTime((duration <= 0) ? -1 : motionQueueEntry.getStartTime() + duration);
                    // duration == -1 则循环
                }
            }
            var fadeWeight = 1; // 应用运动的权重
            // ---- 淡入/淡出处理 ----
            // 具有简单的正弦功能
            var fadeIn = this._fadeInSeconds == 0.0
                ? 1.0
                : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds);
            var fadeOut = (this._fadeOutSeconds == 0.0 || motionQueueEntry.getEndTime() < 0.0)
                ? 1.0
                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds);
            fadeWeight = fadeWeight * fadeIn * fadeOut;
            motionQueueEntry.setState(userTimeSeconds, fadeWeight);
            CSM_ASSERT(0.0 <= fadeWeight && fadeWeight <= 1.0);
            // ---- 遍历所有参数ID ----
            this.doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry);
            // 后处理
            // 结束时间后设置结束标志(CubismMotionQueueManager)
            if ((motionQueueEntry.getEndTime() > 0) && (motionQueueEntry.getEndTime() < userTimeSeconds)) {
                motionQueueEntry.setIsFinished(true); // 終了
            }
        };
        /**
         * 设置淡入时间
         * @param fadeInSeconds 淡入时间[秒]
         */
        ACubismMotion.prototype.setFadeInTime = function (fadeInSeconds) {
            this._fadeInSeconds = fadeInSeconds;
        };
        /**
         * 设置淡出时间
         * @param fadeOutSeconds 时间淡出[秒]
         */
        ACubismMotion.prototype.setFadeOutTime = function (fadeOutSeconds) {
            this._fadeOutSeconds = fadeOutSeconds;
        };
        /**
         * 取淡出时间
         * @return 时间淡出[秒]
         */
        ACubismMotion.prototype.getFadeOutTime = function () {
            return this._fadeOutSeconds;
        };
        /**
         * 取淡入时间
         * @return 淡入时间[秒]
         */
        ACubismMotion.prototype.getFadeInTime = function () {
            return this._fadeInSeconds;
        };
        /**
         * 设置应用运动的权重
         * @param weight 权重（0.0 - 1.0）
         */
        ACubismMotion.prototype.setWeight = function (weight) {
            this._weight = weight;
        };
        /**
         * 获得运动应用的权重
         * @return 权重（0.0 - 1.0）
         */
        ACubismMotion.prototype.getWeight = function () {
            return this._weight;
        };
        /**
         * 获得运动的长度
         * @return 动作长度[秒]
         *
         * @note 循环时为-1。
         *       如果它不是循环，则覆盖它
         *       如果该值为正，则在获得的时间结束。
         *       当“-1”时，除非有来自外部的停止命令，否则该过程不会结束。
         */
        ACubismMotion.prototype.getDuration = function () {
            return -1.0;
        };
        /**
         * 获取一个运动循环的长度
         * @return 运动循环长度[秒]
         *
         * @note 如果不循环，则返回与getDuration（）相同的值
         *       如果无法定义一个循环的长度（例如以编程方式继续移动的子类），则返回-1。
         */
        ACubismMotion.prototype.getLoopDuration = function () {
            return -1.0;
        };
        /**
         * 设置动作播放的开始时间
         * @param offsetSeconds 动作播放开始时间[秒]
         */
        ACubismMotion.prototype.setOffsetTime = function (offsetSeconds) {
            this._offsetSeconds = offsetSeconds;
        };
        /**
         * 更新模型参数
         *
         * 检查事件发生
         * 输入时间是被叫运动时间为0的秒数
         *
         * @param beforeCheckTimeSeconds 最后一次事件检查时间[秒]
         * @param motionTimeSeconds 当前播放时间[秒]
         */
        ACubismMotion.prototype.getFiredEvent = function (beforeCheckTimeSeconds, motionTimeSeconds) {
            return this._firedEventValues;
        };
        return ACubismMotion;
    }());
    Live2DCubismFramework.ACubismMotion = ACubismMotion;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
