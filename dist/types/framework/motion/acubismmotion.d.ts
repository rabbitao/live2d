import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
export declare namespace Live2DCubismFramework {
    /**
     * 运动的抽象基类
     *
     * 运动的抽象基类。 使用MotionQueueManager管理动画播放。
     */
    abstract class ACubismMotion {
        /**
         * 销毁实例
         */
        static delete(motion: ACubismMotion): void;
        _fadeInSeconds: number;
        _fadeOutSeconds: number;
        _weight: number;
        _offsetSeconds: number;
        _name: string;
        _firedEventValues: csmVector<csmString>;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 模型参数
         * @param model 目标模型
         * @param motionQueueEntry 由CubismMotionQueueManager管理的动作
         * @param userTimeSeconds 增量时间的综合值[秒]
         */
        updateParameters(model: CubismModel, motionQueueEntry: CubismMotionQueueEntry, userTimeSeconds: number): void;
        /**
         * 设置淡入时间
         * @param fadeInSeconds 淡入时间[秒]
         */
        setFadeInTime(fadeInSeconds: number): void;
        /**
         * 设置淡出时间
         * @param fadeOutSeconds 时间淡出[秒]
         */
        setFadeOutTime(fadeOutSeconds: number): void;
        /**
         * 取淡出时间
         * @return 时间淡出[秒]
         */
        getFadeOutTime(): number;
        /**
         * 取淡入时间
         * @return 淡入时间[秒]
         */
        getFadeInTime(): number;
        /**
         * 设置应用运动的权重
         * @param weight 权重（0.0 - 1.0）
         */
        setWeight(weight: number): void;
        /**
         * 获得运动应用的权重
         * @return 权重（0.0 - 1.0）
         */
        getWeight(): number;
        /**
         * 获得运动的长度
         * @return 动作长度[秒]
         *
         * @note 循环时为-1。
         *       如果它不是循环，则覆盖它
         *       如果该值为正，则在获得的时间结束。
         *       当“-1”时，除非有来自外部的停止命令，否则该过程不会结束。
         */
        getDuration(): number;
        /**
         * 获取一个运动循环的长度
         * @return 运动循环长度[秒]
         *
         * @note 如果不循环，则返回与getDuration（）相同的值
         *       如果无法定义一个循环的长度（例如以编程方式继续移动的子类），则返回-1。
         */
        getLoopDuration(): number;
        /**
         * 设置动作播放的开始时间
         * @param offsetSeconds 动作播放开始时间[秒]
         */
        setOffsetTime(offsetSeconds: number): void;
        /**
         * 更新模型参数
         *
         * 检查事件发生
         * 输入时间是被叫运动时间为0的秒数
         *
         * @param beforeCheckTimeSeconds 最后一次事件检查时间[秒]
         * @param motionTimeSeconds 当前播放时间[秒]
         */
        getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>;
        /**
         * 更新运动以反映模型中的参数值
         * @param model 目标模型
         * @param userTimeSeconds 增量时间的综合值[秒]
         * @param weight 运动权重
         * @param motionQueueEntry 由CubismMotionQueueManager管理的动作
         * @return true参数值反映在模型中
         * @return false模型中没有反映参数值（运动无变化）
         */
        abstract doUpdateParameters(model: CubismModel, userTimeSeconds: number, weight: number, motionQueueEntry: CubismMotionQueueEntry): void;
    }
}
