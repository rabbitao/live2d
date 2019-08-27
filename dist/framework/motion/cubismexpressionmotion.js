/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismjson } from '../utils/cubismjson';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
var csmVector = csmvector.csmVector;
var CubismFramework = cubismframework.CubismFramework;
var CubismJson = cubismjson.CubismJson;
var ACubismMotion = acubismmotion.ACubismMotion;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // exp3.json键和默认值
    var ExpressionKeyFadeIn = 'FadeInTime';
    var ExpressionKeyFadeOut = 'FadeOutTime';
    var ExpressionKeyParameters = 'Parameters';
    var ExpressionKeyId = 'Id';
    var ExpressionKeyValue = 'Value';
    var ExpressionKeyBlend = 'Blend';
    var BlendValueAdd = 'Add';
    var BlendValueMultiply = 'Multiply';
    var BlendValueOverwrite = 'Overwrite';
    var DefaultFadeTime = 1.0;
    /**
     * 面部运动
     *
     * 面部运动类
     */
    var CubismExpressionMotion = /** @class */ (function (_super) {
        __extends(CubismExpressionMotion, _super);
        /**
         * 构造函数
         */
        function CubismExpressionMotion() {
            var _this = _super.call(this) || this;
            _this._parameters = new csmVector();
            return _this;
        }
        /**
         * 创建一个实例。
         * @param buffer 读取exp文件的缓冲区
         * @param size 缓冲区大小
         * @return 创建的实例
         */
        CubismExpressionMotion.create = function (buffer, size) {
            var expression = new CubismExpressionMotion();
            var json = CubismJson.create(buffer, size);
            var root = json.getRoot();
            expression.setFadeInTime(root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime)); // 淡入
            expression.setFadeOutTime(root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime)); // 淡出
            // 关于每个参数
            var parameterCount = root.getValueByString(ExpressionKeyParameters).getSize();
            expression._parameters.prepareCapacity(parameterCount);
            for (var i = 0; i < parameterCount; ++i) {
                var param = root.getValueByString(ExpressionKeyParameters).getValueByIndex(i);
                var parameterId = CubismFramework.getIdManager().getId(param.getValueByString(ExpressionKeyId).getRawString()); // 参数ID
                var value = param.getValueByString(ExpressionKeyValue).toFloat(); // 値
                // 设定计算方法
                var blendType = void 0;
                if (param.getValueByString(ExpressionKeyBlend).isNull() || param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Add;
                }
                else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueMultiply) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
                }
                else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueOverwrite) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
                }
                else {
                    // 其他当设置了不在规格中的值时，可以通过设置添加模式来恢复
                    blendType = ExpressionBlendType.ExpressionBlendType_Add;
                }
                // 创建配置对象并将其添加到列表中
                var item = new ExpressionParameter();
                item.parameterId = parameterId;
                item.blendType = blendType;
                item.value = value;
                expression._parameters.pushBack(item);
            }
            CubismJson.delete(json); // 不再需要时删除JSON数据
            return expression;
        };
        /**
         * 执行模型参数更新
         * @param model 目标模型
         * @param userTimeSeconds 增量时间的综合值[秒]
         * @param weight 运动权重
         * @param motionQueueEntry 由CubismMotionQueueManager管理的动作
         */
        CubismExpressionMotion.prototype.doUpdateParameters = function (model, userTimeSeconds, weight, motionQueueEntry) {
            for (var i = 0; i < this._parameters.getSize(); ++i) {
                var parameter = this._parameters.at(i);
                switch (parameter.blendType) {
                    case ExpressionBlendType.ExpressionBlendType_Add: {
                        model.addParameterValueById(parameter.parameterId, parameter.value, weight);
                        break;
                    }
                    case ExpressionBlendType.ExpressionBlendType_Multiply: {
                        model.multiplyParameterValueById(parameter.parameterId, parameter.value, weight);
                        break;
                    }
                    case ExpressionBlendType.ExpressionBlendType_Overwrite: {
                        model.setParameterValueById(parameter.parameterId, parameter.value, weight);
                        break;
                    }
                    default:
                        // 如果设置的值不在规格中，则表示您已处于加法模式。
                        break;
                }
            }
        };
        return CubismExpressionMotion;
    }(ACubismMotion));
    Live2DCubismFramework.CubismExpressionMotion = CubismExpressionMotion;
    /**
     * 表达式参数值计算方法
     */
    var ExpressionBlendType;
    (function (ExpressionBlendType) {
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Add"] = 0] = "ExpressionBlendType_Add";
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Multiply"] = 1] = "ExpressionBlendType_Multiply";
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Overwrite"] = 2] = "ExpressionBlendType_Overwrite";
    })(ExpressionBlendType = Live2DCubismFramework.ExpressionBlendType || (Live2DCubismFramework.ExpressionBlendType = {}));
    /**
     * 表达参数信息
     */
    var ExpressionParameter = /** @class */ (function () {
        function ExpressionParameter() {
            this.parameterId = undefined; // 参数ID
            this.blendType = undefined; // 参数计算类型
            this.value = undefined; // 值
        }
        return ExpressionParameter;
    }());
    Live2DCubismFramework.ExpressionParameter = ExpressionParameter;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
