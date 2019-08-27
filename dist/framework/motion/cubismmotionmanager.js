/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Live2DCubismFramework as cubismmotionqueuemanager } from './cubismmotionqueuemanager';
var CubismMotionQueueManager = cubismmotionqueuemanager.CubismMotionQueueManager;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 运动管理
     *
     * 管理动作的类
     */
    var CubismMotionManager = /** @class */ (function (_super) {
        __extends(CubismMotionManager, _super);
        /**
         * 构造函数
         */
        function CubismMotionManager() {
            var _this = _super.call(this) || this;
            _this._currentPriority = 0;
            _this._reservePriority = 0;
            return _this;
        }
        /**
         * 在播放期间获得动作优先级
         * @return  动作优先级
         */
        CubismMotionManager.prototype.getCurrentPriority = function () {
            return this._currentPriority;
        };
        /**
         * 获取保留动作的优先级。
         * @return  动作优先级
         */
        CubismMotionManager.prototype.getReservePriority = function () {
            return this._reservePriority;
        };
        /**
         * 设置保留动作的优先级。
         * @param   val     优先级
         */
        CubismMotionManager.prototype.setReservePriority = function (val) {
            this._reservePriority = val;
        };
        /**
         * 设置优先级并开始运动。
         *
         * @param motion          运动
         * @param autoDelete      如果回放删除被捕获的动作实例，则为真
         * @param priority        优先
         * @return                返回已启动的运动的标识号。 在IsFinished（）的参数中使用，用于确定单个动作是否已结束。 无法启动时“-1”
         */
        CubismMotionManager.prototype.startMotionPriority = function (motion, autoDelete, priority, model, callback) {
            if (priority == this._reservePriority) {
                this._reservePriority = 0; // 取消预订
            }
            this._currentPriority = priority; // 设置播放时的动作优先级
            return _super.prototype.startMotion.call(this, motion, autoDelete, this._userTimeSeconds, model, callback);
        };
        CubismMotionManager.prototype.stopAllMotions = function () {
            this._reservePriority = 0;
            this._currentPriority = 0;
            _super.prototype.stopAllMotions.call(this);
        };
        /**
         * 更新运动以反映模型中的参数值。
         *
         * @param model   目标模型
         * @param deltaTimeSeconds    达美时间[秒]
         * @return  true    已更新
         * @return  false   没有更新
         */
        CubismMotionManager.prototype.updateMotion = function (model, deltaTimeSeconds) {
            this._userTimeSeconds += deltaTimeSeconds;
            var updated = _super.prototype.doUpdateMotion.call(this, model, this._userTimeSeconds);
            if (this.isFinished()) {
                this._currentPriority = 0; // 取消播放期间的动作优先级
            }
            return updated;
        };
        /**
         * 保留动议。
         *
         * @param   priority    优先
         * @return  true    能够预订
         * @return  false   无法预订
         */
        CubismMotionManager.prototype.reserveMotion = function (priority) {
            if ((priority <= this._reservePriority) || (priority <= this._currentPriority)) {
                return false;
            }
            this._reservePriority = priority;
            return true;
        };
        return CubismMotionManager;
    }(CubismMotionQueueManager));
    Live2DCubismFramework.CubismMotionManager = CubismMotionManager;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
