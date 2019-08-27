/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
var ACubismMotion = acubismmotion.ACubismMotion;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * CubismMotionQueueManager中每个动作的管理类。
     */
    var CubismMotionQueueEntry = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismMotionQueueEntry() {
            this._autoDelete = false;
            this._motion = null;
            this._available = true;
            this._finished = false;
            this._started = false;
            this._startTimeSeconds = -1.0;
            this._fadeInStartTimeSeconds = 0.0;
            this._endTimeSeconds = -1.0;
            this._stateTimeSeconds = 0.0;
            this._stateWeight = 0.0;
            this._lastEventCheckSeconds = 0.0;
            this._motionQueueEntryHandle = this;
        }
        /**
         * 析构函数等效处理
         */
        CubismMotionQueueEntry.prototype.release = function () {
            if (this._autoDelete && this._motion) {
                ACubismMotion.delete(this._motion); //
            }
        };
        /**
         * 开始淡出
         * @param fadeOutSeconds 时间淡出[秒]
         * @param userTimeSeconds 增量时间的综合值[秒]
         */
        CubismMotionQueueEntry.prototype.startFadeout = function (fadeoutSeconds, userTimeSeconds) {
            var newEndTimeSeconds = userTimeSeconds + fadeoutSeconds;
            if (this._endTimeSeconds < 0.0 || newEndTimeSeconds < this._endTimeSeconds) {
                this._endTimeSeconds = newEndTimeSeconds;
            }
        };
        /**
         * 确认动作结束
         *
         * @return true 已经结束
         * @return false 没完
         */
        CubismMotionQueueEntry.prototype.isFinished = function () {
            return this._finished;
        };
        /**
         * 确认动作开始
         * @return true 动作开始了
         * @return false 没有开始
         */
        CubismMotionQueueEntry.prototype.isStarted = function () {
            return this._started;
        };
        /**
         * 获取动作开始时间
         * @return 动作开始时间[秒]
         */
        CubismMotionQueueEntry.prototype.getStartTime = function () {
            return this._startTimeSeconds;
        };
        /**
         * 获得淡入开始时间
         * @return 淡入开始时间[秒]
         */
        CubismMotionQueueEntry.prototype.getFadeInStartTime = function () {
            return this._fadeInStartTimeSeconds;
        };
        /**
         * 获得淡入结束时间
         * @return 获得淡入结束时间
         */
        CubismMotionQueueEntry.prototype.getEndTime = function () {
            return this._endTimeSeconds;
        };
        /**
         * 设置动作开始时间
         * @param startTime 动作开始时间
         */
        CubismMotionQueueEntry.prototype.setStartTime = function (startTime) {
            this._startTimeSeconds = startTime;
        };
        /**
         * 设置淡入开始时间
         * @param startTime 淡入开始时间[秒]
         */
        CubismMotionQueueEntry.prototype.setFadeInStartTime = function (startTime) {
            this._fadeInStartTimeSeconds = startTime;
        };
        /**
         * 设置淡入结束时间
         * @param endTime 淡入结束时间[秒]
         */
        CubismMotionQueueEntry.prototype.setEndTime = function (endTime) {
            this._endTimeSeconds = endTime;
        };
        /**
         * 设置动作结束
         * @param f true 是动议的结束
         */
        CubismMotionQueueEntry.prototype.setIsFinished = function (f) {
            this._finished = f;
        };
        /**
         * 动作开始设定
         * @param f 如果为true，则启动动作
         */
        CubismMotionQueueEntry.prototype.setIsStarted = function (f) {
            this._started = f;
        };
        /**
         * 检查运动的有效性
         * @return true 动作是有效的
         * @return false 动作已禁用
         */
        CubismMotionQueueEntry.prototype.isAvailable = function () {
            return this._available;
        };
        /**
         * 设定运动有效性
         * @param v true 有效
         */
        CubismMotionQueueEntry.prototype.setIsAvailable = function (v) {
            this._available = v;
        };
        /**
         * 设置动作状态
         * @param timeSeconds 当前时间[秒]
         * @param weight 动作权重
         */
        CubismMotionQueueEntry.prototype.setState = function (timeSeconds, weight) {
            this._stateTimeSeconds = timeSeconds;
            this._stateWeight = weight;
        };
        /**
         * 获取当前的动作时间
         * @return 当前动作时间[秒]
         */
        CubismMotionQueueEntry.prototype.getStateTime = function () {
            return this._stateTimeSeconds;
        };
        /**
         * 获取运动权重
         * @return 运动权重
         */
        CubismMotionQueueEntry.prototype.getStateWeight = function () {
            return this._stateWeight;
        };
        /**
         * 获取上次检查事件的时间
         *
         * @return 上次检查事件的时间[秒]
         */
        CubismMotionQueueEntry.prototype.getLastCheckEventTime = function () {
            return this._lastEventCheckSeconds;
        };
        /**
         * 设置上次检查事件的时间
         * @param checkTime 上次检查事件时间[秒]
         */
        CubismMotionQueueEntry.prototype.setLastCheckEventTime = function (checkTime) {
            this._lastEventCheckSeconds = checkTime;
        };
        return CubismMotionQueueEntry;
    }());
    Live2DCubismFramework.CubismMotionQueueEntry = CubismMotionQueueEntry;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
