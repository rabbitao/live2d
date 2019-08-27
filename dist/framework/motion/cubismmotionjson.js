/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismjson } from '../utils/cubismjson';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
var csmString = csmstring.csmString;
var CubismFramework = cubismframework.CubismFramework;
var CubismJson = cubismjson.CubismJson;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // JSON keys
    var Meta = 'Meta';
    var Duration = 'Duration';
    var Loop = 'Loop';
    var CurveCount = 'CurveCount';
    var Fps = 'Fps';
    var TotalSegmentCount = 'TotalSegmentCount';
    var TotalPointCount = 'TotalPointCount';
    var Curves = 'Curves';
    var Target = 'Target';
    var Id = 'Id';
    var FadeInTime = 'FadeInTime';
    var FadeOutTime = 'FadeOutTime';
    var Segments = 'Segments';
    var UserData = 'UserData';
    var UserDataCount = 'UserDataCount';
    var TotalUserDataSize = 'TotalUserDataSize';
    var Time = 'Time';
    var Value = 'Value';
    /**
     * motion3.json的容器。
     */
    var CubismMotionJson = /** @class */ (function () {
        /**
         * 构造函数
         * @param buffer 缓冲区，其中加载了motion3.json
         * @param size 缓冲区大小
         */
        function CubismMotionJson(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * 析构函数等效处理
         */
        CubismMotionJson.prototype.release = function () {
            CubismJson.delete(this._json);
        };
        /**
         * 得到动作的长度
         * @return 动作长度[秒]
         */
        CubismMotionJson.prototype.getMotionDuration = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Duration).toFloat();
        };
        /**
         * 获取运动循环信息
         * @return true 循環
         * @return false 不循環
         */
        CubismMotionJson.prototype.isMotionLoop = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Loop).toBoolean();
        };
        /**
         * 获取运动曲线的数量
         * @return 运动曲线数量
         */
        CubismMotionJson.prototype.getMotionCurveCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(CurveCount).toInt();
        };
        /**
         * 获取帧速率
         * @return 帧率[FPS]
         */
        CubismMotionJson.prototype.getMotionFps = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Fps).toFloat();
        };
        /**
         * 获得动作片段的总计
         * @return 得到一段动作
         */
        CubismMotionJson.prototype.getMotionTotalSegmentCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalSegmentCount).toInt();
        };
        /**
         * 获得运动曲线的控制点总数
         * @return 运动曲线的控制点总数
         */
        CubismMotionJson.prototype.getMotionTotalPointCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalPointCount).toInt();
        };
        /**
         * 运动淡入时间的存在
         * @return true 存在
         * @return false 不存在
         */
        CubismMotionJson.prototype.isExistMotionFadeInTime = function () {
            return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).isNull();
        };
        /**
         * 运动淡出时间的存在
         * @return true 存在
         * @return false 不存在
         */
        CubismMotionJson.prototype.isExistMotionFadeOutTime = function () {
            return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).isNull();
        };
        /**
         * 获取动画淡入时间
         * @return 淡入时间[秒]
         */
        CubismMotionJson.prototype.getMotionFadeInTime = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).toFloat();
        };
        /**
         * 获得动作淡出时间
         * @return 淡出时间[秒]
         */
        CubismMotionJson.prototype.getMotionFadeOutTime = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).toFloat();
        };
        /**
         * 获取运动曲线类型
         * @param curveIndex 曲线指数
         * @return 曲线类型
         */
        CubismMotionJson.prototype.getMotionCurveTarget = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Target).getRawString();
        };
        /**
         * 获取运动曲线ID
         * @param curveIndex 曲线索引
         * @return 曲线的ID
         */
        CubismMotionJson.prototype.getMotionCurveId = function (curveIndex) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Id).getRawString());
        };
        /**
         * 存在运动曲线淡入时间
         * @param curveIndex 曲线索引
         * @return true 存在
         * @return false 不存在
         */
        CubismMotionJson.prototype.isExistMotionCurveFadeInTime = function (curveIndex) {
            return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).isNull();
        };
        /**
         * 存在运动曲线淡出时间
         * @param curveIndex 曲线索引
         * @return true 存在
         * @return false 不存在
         */
        CubismMotionJson.prototype.isExistMotionCurveFadeOutTime = function (curveIndex) {
            return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).isNull();
        };
        /**
         * 获得运动曲线的淡入时间
         * @param curveIndex 曲线索引
         * @return 淡入时间[秒]
         */
        CubismMotionJson.prototype.getMotionCurveFadeInTime = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).toFloat();
        };
        /**
         * 获得运动曲线的淡出时间
         * @param curveIndex 曲线索引
         * @return 淡出时间[秒]
         */
        CubismMotionJson.prototype.getMotionCurveFadeOutTime = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).toFloat();
        };
        /**
         * 获取运动曲线的分段数
         * @param curveIndex 曲线索引
         * @return 运动曲线段数
         */
        CubismMotionJson.prototype.getMotionCurveSegmentCount = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getVector().getSize();
        };
        /**
         * 获取运动曲线的分段值
         * @param curveIndex 曲线索引
         * @param segmentIndex 细分指数
         * @return 细分值
         */
        CubismMotionJson.prototype.getMotionCurveSegment = function (curveIndex, segmentIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getValueByIndex(segmentIndex).toFloat();
        };
        /**
         * 获取事件数量
         * @return 事件数量
         */
        CubismMotionJson.prototype.getEventCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        };
        /**
         *  获取活动的总字符数
         * @return 事件中的字符总数
         */
        CubismMotionJson.prototype.getTotalEventValueSize = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        };
        /**
         * 获取活动时间
         * @param userDataIndex 事件索引
         * @return 活动时间[秒]
         */
        CubismMotionJson.prototype.getEventTime = function (userDataIndex) {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Time).toInt();
        };
        /**
         * 获得活动
         * @param userDataIndex 事件索引
         * @return 事件字符串
         */
        CubismMotionJson.prototype.getEventValue = function (userDataIndex) {
            return new csmString(this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Value).getRawString());
        };
        return CubismMotionJson;
    }());
    Live2DCubismFramework.CubismMotionJson = CubismMotionJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
