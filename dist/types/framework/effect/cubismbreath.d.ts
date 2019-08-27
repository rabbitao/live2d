import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismModel = cubismmodel.CubismModel;
import csmVector = csmvector.csmVector;
export declare namespace Live2DCubismFramework {
    /**
     * 呼吸功能
     *
     * 提供呼吸功能。
     */
    class CubismBreath {
        /**
         * 创建实例
         */
        static create(): CubismBreath;
        /**
         * 销毁实例
         * @param instance CubismBreath目标
         */
        static delete(instance: CubismBreath): void;
        _breathParameters: csmVector<BreathParameterData>;
        _currentTime: number;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 连接呼吸参数
         * @param breathParameters 与呼吸相关的参数列表
         */
        setParameters(breathParameters: csmVector<BreathParameterData>): void;
        /**
         * 获取与呼吸相关的参数
         * @return 与呼吸相关的参数列表
         */
        getParameters(): csmVector<BreathParameterData>;
        /**
         * 更新模型参数
         * @param model 目标模型
         * @param deltaTimeSeconds 达美时间[秒]
         */
        updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
    }
    /**
     * 呼吸参数信息
     */
    class BreathParameterData {
        parameterId: CubismIdHandle;
        offset: number;
        peak: number;
        cycle: number;
        weight: number;
        /**
         * 构造函数
         * @param parameterId   与呼吸相关的参数ID
         * @param offset        呼吸时的波浪偏移是正弦波
         * @param peak          呼吸时的波高是正弦波
         * @param cycle         呼吸时的波浪期是正弦波
         * @param weight        参数的权重
         */
        constructor(parameterId?: CubismIdHandle, offset?: number, peak?: number, cycle?: number, weight?: number);
    }
}
