/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 呼吸功能
     *
     * 提供呼吸功能。
     */
    var CubismBreath = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismBreath() {
            this._breathParameters = undefined; // 与呼吸相关的参数列表
            this._currentTime = 0.0;
        }
        /**
         * 创建实例
         */
        CubismBreath.create = function () {
            return new CubismBreath();
        };
        /**
         * 销毁实例
         * @param instance CubismBreath目标
         */
        CubismBreath.delete = function (instance) {
            if (instance != null) {
                instance = null;
            }
        };
        /**
         * 连接呼吸参数
         * @param breathParameters 与呼吸相关的参数列表
         */
        CubismBreath.prototype.setParameters = function (breathParameters) {
            this._breathParameters = breathParameters;
        };
        /**
         * 获取与呼吸相关的参数
         * @return 与呼吸相关的参数列表
         */
        CubismBreath.prototype.getParameters = function () {
            return this._breathParameters;
        };
        /**
         * 更新模型参数
         * @param model 目标模型
         * @param deltaTimeSeconds 达美时间[秒]
         */
        CubismBreath.prototype.updateParameters = function (model, deltaTimeSeconds) {
            this._currentTime += deltaTimeSeconds;
            var t = this._currentTime * 2.0 * 3.14159;
            for (var i = 0; i < this._breathParameters.getSize(); ++i) {
                var data = this._breathParameters.at(i);
                model.addParameterValueById(data.parameterId, data.offset + (data.peak * Math.sin(t / data.cycle)), data.weight);
            }
        };
        return CubismBreath;
    }());
    Live2DCubismFramework.CubismBreath = CubismBreath;
    /**
     * 呼吸参数信息
     */
    var BreathParameterData = /** @class */ (function () {
        /**
         * 构造函数
         * @param parameterId   与呼吸相关的参数ID
         * @param offset        呼吸时的波浪偏移是正弦波
         * @param peak          呼吸时的波高是正弦波
         * @param cycle         呼吸时的波浪期是正弦波
         * @param weight        参数的权重
         */
        function BreathParameterData(parameterId, offset, peak, cycle, weight) {
            this.parameterId = (parameterId == undefined)
                ? null
                : parameterId;
            this.offset = (offset == undefined)
                ? 0.0
                : offset;
            this.peak = (peak == undefined)
                ? 0.0
                : peak;
            this.cycle = (cycle == undefined)
                ? 0.0
                : cycle;
            this.weight = (weight == undefined)
                ? 0.0
                : weight;
        }
        return BreathParameterData;
    }());
    Live2DCubismFramework.BreathParameterData = BreathParameterData;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
