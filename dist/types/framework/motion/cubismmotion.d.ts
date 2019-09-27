import { Live2DCubismFramework as cubismmotioninternal } from './cubismmotioninternal';
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismMotionData = cubismmotioninternal.CubismMotionData;
import CubismIdHandle = cubismid.CubismIdHandle;
import csmVector = csmvector.csmVector;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    /**
     * 运动类
     *
     * 运动类。
     */
    class CubismMotion extends ACubismMotion {
        /**
         * 创建一个实例
         *
         * @param buffer 缓冲区，其中加载了motion3.json
         * @param size 缓冲区大小
         * @return 创建的实例
         */
        static create(buffer: ArrayBuffer, size: number, name: string, priority: number): CubismMotion;
        _sourceFrameRate: number;
        _loopDurationSeconds: number;
        _isLoop: boolean;
        _isLoopFadeIn: boolean;
        _lastWeight: number;
        _motionData: CubismMotionData;
        _eyeBlinkParameterIds: csmVector<CubismIdHandle>;
        _lipSyncParameterIds: csmVector<CubismIdHandle>;
        _modelCurveIdEyeBlink: CubismIdHandle;
        _modelCurveIdLipSync: CubismIdHandle;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 执行模型参数更新
         * @param model             目标模型
         * @param userTimeSeconds   当前时间[秒]
         * @param fadeWeight        运动权重
         * @param motionQueueEntry  由CubismMotionQueueManager管理的动作
         */
        doUpdateParameters(model: CubismModel, userTimeSeconds: number, fadeWeight: number, motionQueueEntry: CubismMotionQueueEntry): void;
        /**
         * 设置循环信息
         * @param loop 循环信息
         */
        setIsLoop(loop: boolean): void;
        /**
         * 获取循环信息
         * @return true 要循环
         * @return false 不要循环
         */
        isLoop(): boolean;
        /**
         * 循环时设置淡入信息
         * @param loopFadeIn  循环时淡入信息
         */
        setIsLoopFadeIn(loopFadeIn: boolean): void;
        /**
         * 循环时获取淡入信息
         *
         * @return  true
         * @return  false
         */
        isLoopFadeIn(): boolean;
        /**
         * 得到动作的长度。
         *
         * @return  动作长度[秒]
         */
        getDuration(): number;
        /**
         * 获取运动循环的长度。
         *
         * @return  运动循环长度[秒]
         */
        getLoopDuration(): number;
        /**
         * 设置参数的淡入时间。
         *
         * @param parameterId     参数ID
         * @param value           淡入时间[秒]
         */
        setParameterFadeInTime(parameterId: CubismIdHandle, value: number): void;
        /**
        * 设置参数的淡出时间
        * @param parameterId     参数ID
        * @param value           时间淡出[秒]
        */
        setParameterFadeOutTime(parameterId: CubismIdHandle, value: number): void;
        /**
        * 获取参数的淡入时间
        * @param    parameterId     参数ID
        * @return   淡入时间[秒]
        */
        getParameterFadeInTime(parameterId: CubismIdHandle): number;
        /**
        * 获取参数的淡出时间
        *
        * @param   parameterId     参数ID
        * @return   时间淡出[秒]
        */
        getParameterFadeOutTime(parameterId: CubismIdHandle): number;
        /**
         * 设置应用自动效果的参数ID列表
         * @param eyeBlinkParameterIds    自动闪烁的参数ID列表
         * @param lipSyncParameterIds     应用唇形同步的参数ID列表
         */
        setEffectIds(eyeBlinkParameterIds: csmVector<CubismIdHandle>, lipSyncParameterIds: csmVector<CubismIdHandle>): void;
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 解析motion3.json。
         *
         * @param motionJson  缓冲区，其中加载了motion3.json
         * @param size        缓冲区大小
         */
        parse(motionJson: ArrayBuffer, size: number): void;
        /**
         * 更新模型参数
         *
         * 检查事件发生。
         * 输入时间是被叫运动时间为0的秒数。
         *
         * @param beforeCheckTimeSeconds   最后一次事件检查时间[秒]
         * @param motionTimeSeconds        当前播放时间[秒]
         */
        getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>;
    }
}
