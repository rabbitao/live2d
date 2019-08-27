import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as cubismusermodel } from '../../framework/model/cubismusermodel';
import csmString = csmstring.csmString;
import CubismModel = cubismmodel.CubismModel;
import CubismUserModel = cubismusermodel.CubismUserModel;
import csmVector = csmvector.csmVector;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    /**
     * 管理动作播放
     *
     * 用于管理动作播放的类。 用于播放ACubismMotion的子类，例如CubismMotion动画。
     *
     * @note 如果在播放期间另一个动作是StartMotion（），则新动作将平滑地改变并且旧动作被中断。
     *       当面部表情的运动和身体的运动被分为运动时，
     *       使用多个CubismMotionQueueManager实例同时播放多个动作。
     */
    class CubismMotionQueueManager {
        _userTimeSeconds: number;
        _motions: csmVector<CubismMotionQueueEntry>;
        _eventCallBack: CubismMotionEventFunction;
        _eventCustomData: any;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 析构函数
         */
        release(): void;
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
        startMotion(motion: ACubismMotion, autoDelete: boolean, userTimeSeconds: number, model: CubismUserModel, callback?: () => void): Promise<CubismUserModel>;
        /**
         * 确认所有动作的结束
         * @return true 全部完成了
         * @return false 没完
         */
        isFinished(): boolean;
        /**
         * 确认指定动作的结束
         * @param motionQueueEntryNumber 动作识别号码
         * @return true 全部完成了
         * @return false 没完
         */
        isFinishedByHandle(motionQueueEntryNumber: CubismMotionQueueEntryHandle): boolean;
        /**
         * 停止所有动作
         */
        stopAllMotions(): void;
        /**
         * 获取指定的CubismMotionQueueEntry
    
         * @param   motionQueueEntryNumber  动作识别号码
         * @return  指定的CubismMotionQueueEntry
         * @return  找不到返回null
         */
        getCubismMotionQueueEntry(motionQueueEntryNumber: any): CubismMotionQueueEntry;
        /**
         * 注册回调以接收事件
         *
         * @param callback 回调函数
         * @param customData 数据返回回调
         */
        setEventCallback(callback: CubismMotionEventFunction, customData?: any): void;
        /**
         * 更新运动以反映模型中的参数值。
         *
         * @param   model   目标模型
         * @param   userTimeSeconds   增量时间的综合值[秒]
         * @return  true    参数值反映在模型中
         * @return  false   模型中没有反映参数值（运动无变化）
         */
        doUpdateMotion(model: CubismModel, userTimeSeconds: number): boolean;
    }
    /**
     * 定义事件回调函数
     *
     * 可以在事件回调中注册的函数类型信息
     * @param caller        重现已触发事件的CubismMotionQueueManager
     * @param eventValue    已触发事件的字符串数据
     * @param customData   注册期间指定的数据返回到回调
     */
    type CubismMotionEventFunction = (caller: CubismMotionQueueManager, eventValue: csmString, customData: any) => void;
    /**
     * 动作识别号码
     *
     * 运动识别号的定义
     */
    type CubismMotionQueueEntryHandle = any;
    const InvalidMotionQueueEntryHandleValue: CubismMotionQueueEntryHandle;
}
