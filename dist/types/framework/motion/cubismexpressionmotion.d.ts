import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismModel = cubismmodel.CubismModel;
import CubismIdHandle = cubismid.CubismIdHandle;
import ACubismMotion = acubismmotion.ACubismMotion;
export declare namespace Live2DCubismFramework {
    /**
     * 面部运动
     *
     * 面部运动类
     */
    class CubismExpressionMotion extends ACubismMotion {
        /**
         * 创建一个实例。
         * @param buffer 读取exp文件的缓冲区
         * @param size 缓冲区大小
         * @return 创建的实例
         */
        static create(buffer: ArrayBuffer, size: number): CubismExpressionMotion;
        _parameters: csmVector<ExpressionParameter>;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 执行模型参数更新
         * @param model 目标模型
         * @param userTimeSeconds 增量时间的综合值[秒]
         * @param weight 运动权重
         * @param motionQueueEntry 由CubismMotionQueueManager管理的动作
         */
        doUpdateParameters(model: CubismModel, userTimeSeconds: number, weight: number, motionQueueEntry: CubismMotionQueueEntry): void;
    }
    /**
     * 表达式参数值计算方法
     */
    enum ExpressionBlendType {
        ExpressionBlendType_Add = 0,
        ExpressionBlendType_Multiply = 1,
        ExpressionBlendType_Overwrite = 2
    }
    /**
     * 表达参数信息
     */
    class ExpressionParameter {
        parameterId: CubismIdHandle;
        blendType: ExpressionBlendType;
        value: number;
    }
}
