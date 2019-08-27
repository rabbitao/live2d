import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmotionqueuemanager } from './cubismmotionqueuemanager';
import CubismMotionQueueEntryHandle = cubismmotionqueuemanager.CubismMotionQueueEntryHandle;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    /**
     * CubismMotionQueueManager中每个动作的管理类。
     */
    class CubismMotionQueueEntry {
        _autoDelete: boolean;
        _motion: ACubismMotion;
        _available: boolean;
        _finished: boolean;
        _started: boolean;
        _startTimeSeconds: number;
        _fadeInStartTimeSeconds: number;
        _endTimeSeconds: number;
        _stateTimeSeconds: number;
        _stateWeight: number;
        _lastEventCheckSeconds: number;
        _motionQueueEntryHandle: CubismMotionQueueEntryHandle;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 开始淡出
         * @param fadeOutSeconds 时间淡出[秒]
         * @param userTimeSeconds 增量时间的综合值[秒]
         */
        startFadeout(fadeoutSeconds: number, userTimeSeconds: number): void;
        /**
         * 确认动作结束
         *
         * @return true 已经结束
         * @return false 没完
         */
        isFinished(): boolean;
        /**
         * 确认动作开始
         * @return true 动作开始了
         * @return false 没有开始
         */
        isStarted(): boolean;
        /**
         * 获取动作开始时间
         * @return 动作开始时间[秒]
         */
        getStartTime(): number;
        /**
         * 获得淡入开始时间
         * @return 淡入开始时间[秒]
         */
        getFadeInStartTime(): number;
        /**
         * 获得淡入结束时间
         * @return 获得淡入结束时间
         */
        getEndTime(): number;
        /**
         * 设置动作开始时间
         * @param startTime 动作开始时间
         */
        setStartTime(startTime: number): void;
        /**
         * 设置淡入开始时间
         * @param startTime 淡入开始时间[秒]
         */
        setFadeInStartTime(startTime: number): void;
        /**
         * 设置淡入结束时间
         * @param endTime 淡入结束时间[秒]
         */
        setEndTime(endTime: number): void;
        /**
         * 设置动作结束
         * @param f true 是动议的结束
         */
        setIsFinished(f: boolean): void;
        /**
         * 动作开始设定
         * @param f 如果为true，则启动动作
         */
        setIsStarted(f: boolean): void;
        /**
         * 检查运动的有效性
         * @return true 动作是有效的
         * @return false 动作已禁用
         */
        isAvailable(): boolean;
        /**
         * 设定运动有效性
         * @param v true 有效
         */
        setIsAvailable(v: boolean): void;
        /**
         * 设置动作状态
         * @param timeSeconds 当前时间[秒]
         * @param weight 动作权重
         */
        setState(timeSeconds: number, weight: number): void;
        /**
         * 获取当前的动作时间
         * @return 当前动作时间[秒]
         */
        getStateTime(): number;
        /**
         * 获取运动权重
         * @return 运动权重
         */
        getStateWeight(): number;
        /**
         * 获取上次检查事件的时间
         *
         * @return 上次检查事件的时间[秒]
         */
        getLastCheckEventTime(): number;
        /**
         * 设置上次检查事件的时间
         * @param checkTime 上次检查事件时间[秒]
         */
        setLastCheckEventTime(checkTime: number): void;
    }
}
