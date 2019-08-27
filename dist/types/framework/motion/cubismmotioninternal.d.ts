import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    /**
     * @brief 运动曲线类型
     *
  * 运动曲线类型。
     */
    enum CubismMotionCurveTarget {
        CubismMotionCurveTarget_Model = 0,
        CubismMotionCurveTarget_Parameter = 1,
        CubismMotionCurveTarget_PartOpacity = 2
    }
    /**
     * @brief 运动曲线段类型
     *
     * 运动曲线段类型。
     */
    enum CubismMotionSegmentType {
        CubismMotionSegmentType_Linear = 0,
        CubismMotionSegmentType_Bezier = 1,
        CubismMotionSegmentType_Stepped = 2,
        CubismMotionSegmentType_InverseStepped = 3
    }
    /**
     * @brief 运动曲线控制点
     *
     * 运动曲线控制点。
     */
    class CubismMotionPoint {
        time: number;
        value: number;
    }
    /**
     * 运动曲线段评估功能
     *
     * @param   points      运动曲线控制点列表
     * @param   time        评估时间[秒]
     */
    type csmMotionSegmentEvaluationFunction = (points: CubismMotionPoint[], time: number) => number;
    /**
     * @brief 运动曲线段
     *
     * 运动曲线段
     */
    class CubismMotionSegment {
        evaluate: csmMotionSegmentEvaluationFunction;
        basePointIndex: number;
        segmentType: number;
        /**
         * @brief 构造函数
         *
         * 构造函数。
         */
        constructor();
    }
    /**
     * @brief 运动曲线
     *
     * 运动曲线。
     */
    class CubismMotionCurve {
        type: CubismMotionCurveTarget;
        id: CubismIdHandle;
        segmentCount: number;
        baseSegmentIndex: number;
        fadeInTime: number;
        fadeOutTime: number;
        constructor();
    }
    /**
    * 事件。
    */
    class CubismMotionEvent {
        fireTime: number;
        value: csmString;
    }
    /**
     * @brief 动作数据
     *
     * 动作数据。
     */
    class CubismMotionData {
        duration: number;
        loop: boolean;
        curveCount: number;
        eventCount: number;
        fps: number;
        curves: csmVector<CubismMotionCurve>;
        segments: csmVector<CubismMotionSegment>;
        points: csmVector<CubismMotionPoint>;
        events: csmVector<CubismMotionEvent>;
        constructor();
    }
}
