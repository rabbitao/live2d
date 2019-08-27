import { Live2DCubismFramework as cubismjson } from '../utils/cubismjson';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismJson = cubismjson.CubismJson;
export declare namespace Live2DCubismFramework {
    /**
     * motion3.json的容器。
     */
    class CubismMotionJson {
        _json: CubismJson;
        /**
         * 构造函数
         * @param buffer 缓冲区，其中加载了motion3.json
         * @param size 缓冲区大小
         */
        constructor(buffer: ArrayBuffer, size: number);
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 得到动作的长度
         * @return 动作长度[秒]
         */
        getMotionDuration(): number;
        /**
         * 获取运动循环信息
         * @return true 循環
         * @return false 不循環
         */
        isMotionLoop(): boolean;
        /**
         * 获取运动曲线的数量
         * @return 运动曲线数量
         */
        getMotionCurveCount(): number;
        /**
         * 获取帧速率
         * @return 帧率[FPS]
         */
        getMotionFps(): number;
        /**
         * 获得动作片段的总计
         * @return 得到一段动作
         */
        getMotionTotalSegmentCount(): number;
        /**
         * 获得运动曲线的控制点总数
         * @return 运动曲线的控制点总数
         */
        getMotionTotalPointCount(): number;
        /**
         * 运动淡入时间的存在
         * @return true 存在
         * @return false 不存在
         */
        isExistMotionFadeInTime(): boolean;
        /**
         * 运动淡出时间的存在
         * @return true 存在
         * @return false 不存在
         */
        isExistMotionFadeOutTime(): boolean;
        /**
         * 获取动画淡入时间
         * @return 淡入时间[秒]
         */
        getMotionFadeInTime(): number;
        /**
         * 获得动作淡出时间
         * @return 淡出时间[秒]
         */
        getMotionFadeOutTime(): number;
        /**
         * 获取运动曲线类型
         * @param curveIndex 曲线指数
         * @return 曲线类型
         */
        getMotionCurveTarget(curveIndex: number): string;
        /**
         * 获取运动曲线ID
         * @param curveIndex 曲线索引
         * @return 曲线的ID
         */
        getMotionCurveId(curveIndex: number): CubismIdHandle;
        /**
         * 存在运动曲线淡入时间
         * @param curveIndex 曲线索引
         * @return true 存在
         * @return false 不存在
         */
        isExistMotionCurveFadeInTime(curveIndex: number): boolean;
        /**
         * 存在运动曲线淡出时间
         * @param curveIndex 曲线索引
         * @return true 存在
         * @return false 不存在
         */
        isExistMotionCurveFadeOutTime(curveIndex: number): boolean;
        /**
         * 获得运动曲线的淡入时间
         * @param curveIndex 曲线索引
         * @return 淡入时间[秒]
         */
        getMotionCurveFadeInTime(curveIndex: number): number;
        /**
         * 获得运动曲线的淡出时间
         * @param curveIndex 曲线索引
         * @return 淡出时间[秒]
         */
        getMotionCurveFadeOutTime(curveIndex: number): number;
        /**
         * 获取运动曲线的分段数
         * @param curveIndex 曲线索引
         * @return 运动曲线段数
         */
        getMotionCurveSegmentCount(curveIndex: number): number;
        /**
         * 获取运动曲线的分段值
         * @param curveIndex 曲线索引
         * @param segmentIndex 细分指数
         * @return 细分值
         */
        getMotionCurveSegment(curveIndex: number, segmentIndex: number): number;
        /**
         * 获取事件数量
         * @return 事件数量
         */
        getEventCount(): number;
        /**
         *  获取活动的总字符数
         * @return 事件中的字符总数
         */
        getTotalEventValueSize(): number;
        /**
         * 获取活动时间
         * @param userDataIndex 事件索引
         * @return 活动时间[秒]
         */
        getEventTime(userDataIndex: number): number;
        /**
         * 获得活动
         * @param userDataIndex 事件索引
         * @return 事件字符串
         */
        getEventValue(userDataIndex: number): csmString;
    }
}
