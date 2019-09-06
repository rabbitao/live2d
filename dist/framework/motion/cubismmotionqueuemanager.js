/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
var csmVector = csmvector.csmVector;
var CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 管理动作播放
     *
     * 用于管理动作播放的类。 用于播放ACubismMotion的子类，例如CubismMotion动画。
     *
     * @note 如果在播放期间另一个动作是StartMotion（），则新动作将平滑地改变并且旧动作被中断。
     *       当面部表情的运动和身体的运动被分为运动时，
     *       使用多个CubismMotionQueueManager实例同时播放多个动作。
     */
    var CubismMotionQueueManager = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismMotionQueueManager() {
            this._userTimeSeconds = 0.0;
            this._eventCallBack = null;
            this._eventCustomData = null;
            this._motions = new csmVector();
        }
        /**
         * 析构函数
         */
        CubismMotionQueueManager.prototype.release = function () {
            for (var i = 0; i < this._motions.getSize(); ++i) {
                if (this._motions.at(i)) {
                    this._motions.at(i).release();
                    this._motions.set(i, void 0);
                    this._motions.set(i, null);
                }
            }
            this._motions = null;
        };
        /**
         * 开始指定的动作
         *
         * 开始指定的动作。 如果已存在相同类型的运动，请将结束标志设置为现有运动并开始淡出。
         *
         * @param   motion          动作开始
         * @param   autoDelete      如果已完成播放的动画实例已删除，则为True
         * @param   userTimeSeconds 增量时间的综合值[秒]
         * @return  返回usermodel对象
         */
        CubismMotionQueueManager.prototype.startMotion = function (motion, autoDelete, userTimeSeconds, model, callback) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (motion == null) {
                    return model;
                }
                var motionQueueEntry = null;
                // 如果已经有动作，则提高结束标志
                for (var i = 0; i < _this._motions.getSize(); ++i) {
                    motionQueueEntry = _this._motions.at(i);
                    if (motionQueueEntry == null) {
                        continue;
                    }
                    motionQueueEntry.startFadeout(motionQueueEntry._motion.getFadeOutTime(), userTimeSeconds); // 开始和结束淡出
                }
                motionQueueEntry = new CubismMotionQueueEntry(); // 完成后丢弃
                motionQueueEntry._autoDelete = autoDelete;
                motionQueueEntry._motion = motion;
                _this._motions.pushBack(motionQueueEntry);
                var timer = 0;
                var timeCount = new Date().getTime();
                timer = window.setInterval(function () {
                    if (_this.isFinished()) {
                        window.clearInterval(timer);
                        timer = null;
                        if (Object.prototype.toString.call(callback) === '[object Function]') {
                            callback();
                        }
                        // resolve(motionQueueEntry._motionQueueEntryHandle, model);
                        resolve(model);
                    }
                    else {
                        var now = new Date().getTime();
                        if (now - timeCount >= 30000) {
                            _this._currentPriority = 0;
                            reject(new Error('动画执行超时(30s)'));
                        }
                    }
                }, 20);
            });
        };
        /**
         * 确认所有动作的结束
         * @return true 全部完成了
         * @return false 没完
         */
        CubismMotionQueueManager.prototype.isFinished = function () {
            // ------- 执行的过程 -------
            // 如果已经有动作，则提高结束标志
            if (!this._motions) {
                return true;
            }
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite); // 删除
                    continue;
                }
                var motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 删除
                    continue;
                }
                // ----- 删除任何已完成的处理 ------
                if (!motionQueueEntry.isFinished()) {
                    return false;
                }
                else {
                    ite.preIncrement();
                }
            }
            return true;
        };
        /**
         * 确认指定动作的结束
         * @param motionQueueEntryNumber 动作识别号码
         * @return true 全部完成了
         * @return false 没完
         */
        CubismMotionQueueManager.prototype.isFinishedByHandle = function (motionQueueEntryNumber) {
            // 如果已经有动作，则提高结束标志
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber && !motionQueueEntry.isFinished()) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 停止所有动作
         */
        CubismMotionQueueManager.prototype.stopAllMotions = function () {
            // ------- 它执行的过程 -------
            // 如果已经有动作，则提高结束标志
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite);
                    continue;
                }
                // ----- 删除任何已完成的处理 ------
                motionQueueEntry.release();
                motionQueueEntry = void 0;
                motionQueueEntry = null;
                ite = this._motions.erase(ite); // 删除
            }
        };
        /**
         * 获取指定的CubismMotionQueueEntry
    
         * @param   motionQueueEntryNumber  动作识别号码
         * @return  指定的CubismMotionQueueEntry
         * @return  找不到返回null
         */
        CubismMotionQueueManager.prototype.getCubismMotionQueueEntry = function (motionQueueEntryNumber) {
            // ------- 执行过程 -------
            // 如果已经有动作，则提高结束标志
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
                    return motionQueueEntry;
                }
            }
            return null;
        };
        /**
         * 注册回调以接收事件
         *
         * @param callback 回调函数
         * @param customData 数据返回回调
         */
        CubismMotionQueueManager.prototype.setEventCallback = function (callback, customData) {
            if (customData === void 0) { customData = null; }
            this._eventCallBack = callback;
            this._eventCustomData = customData;
        };
        /**
         * 更新运动以反映模型中的参数值。
         *
         * @param   model   目标模型
         * @param   userTimeSeconds   增量时间的综合值[秒]
         * @return  true    参数值反映在模型中
         * @return  false   模型中没有反映参数值（运动无变化）
         */
        CubismMotionQueueManager.prototype.doUpdateMotion = function (model, userTimeSeconds) {
            var updated = false;
            // ------- 执行的过程 --------
            // 如果已经有动作，则提高结束标志
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite); // 删除
                    continue;
                }
                var motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 删除
                    continue;
                }
                motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
                updated = true;
                // ------ 检查用户触发的事件 ----
                var firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventTime() - motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
                for (var i = 0; i < firedList.getSize(); ++i) {
                    this._eventCallBack(this, firedList.at(i), this._eventCustomData);
                }
                motionQueueEntry.setLastCheckEventTime(userTimeSeconds);
                // ------ 删除任何已完成的处理 ------
                if (motionQueueEntry.isFinished()) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 删除
                }
                else {
                    ite.preIncrement();
                }
            }
            return updated;
        };
        return CubismMotionQueueManager;
    }());
    Live2DCubismFramework.CubismMotionQueueManager = CubismMotionQueueManager;
    Live2DCubismFramework.InvalidMotionQueueEntryHandleValue = -1;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
