import { Live2DCubismFramework as cubismmotionqueuemanager } from './cubismmotionqueuemanager';
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubismusermodel } from '../../framework/model/cubismusermodel';
import CubismModel = cubismmodel.CubismModel;
import CubismUserModel = cubismusermodel.CubismUserModel;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismMotionQueueManager = cubismmotionqueuemanager.CubismMotionQueueManager;
export declare namespace Live2DCubismFramework {
    /**
     * 运动管理
     *
     * 管理动作的类
     */
    class CubismMotionManager extends CubismMotionQueueManager {
        /**
         * 构造函数
         */
        constructor();
        /**
         * 在播放期间获得动作优先级
         * @return  动作优先级
         */
        getCurrentPriority(): number;
        /**
         * 获取保留动作的优先级。
         * @return  动作优先级
         */
        getReservePriority(): number;
        /**
         * 设置保留动作的优先级。
         * @param   val     优先级
         */
        setReservePriority(val: number): void;
        /**
         * 设置优先级并开始运动。
         *
         * @param motion          运动
         * @param autoDelete      如果回放删除被捕获的动作实例，则为真
         * @param priority        优先
         * @return                返回已启动的运动的标识号。 在IsFinished（）的参数中使用，用于确定单个动作是否已结束。 无法启动时“-1”
         */
        startMotionPriority(motion: ACubismMotion, autoDelete: boolean, priority: number, model: CubismUserModel, callback?: () => void): Promise<CubismUserModel>;
        stopAllMotions(): void;
        /**
         * 更新运动以反映模型中的参数值。
         *
         * @param model   目标模型
         * @param deltaTimeSeconds    达美时间[秒]
         * @return  true    已更新
         * @return  false   没有更新
         */
        updateMotion(model: CubismModel, deltaTimeSeconds: number): boolean;
        /**
         * 保留动议。
         *
         * @param   priority    优先
         * @return  true    能够预订
         * @return  false   无法预订
         */
        reserveMotion(priority: number): boolean;
    }
}
