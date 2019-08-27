/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/// <reference path="../../live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismrenderer } from '../rendering/cubismrenderer';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as csmmap } from '../type/csmmap';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { CSM_ASSERT } from '../utils/cubismdebug';
var CubismFramework = cubismframework.CubismFramework;
var CubismBlendMode = cubismrenderer.CubismBlendMode;
var csmVector = csmvector.csmVector;
var csmMap = csmmap.csmMap;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 模型
     *
     * 从Moc数据生成的模型类。
     */
    var CubismModel = /** @class */ (function () {
        /**
         * 构造函数
         * @param model 模型
         */
        function CubismModel(model) {
            this._model = model;
            this._parameterValues = null;
            this._parameterMaximumValues = null;
            this._parameterMinimumValues = null;
            this._partOpacities = null;
            this._savedParameters = new csmVector();
            this._parameterIds = new csmVector();
            this._drawableIds = new csmVector();
            this._partIds = new csmVector();
            this._notExistPartId = new csmMap();
            this._notExistParameterId = new csmMap();
            this._notExistParameterValues = new csmMap();
            this._notExistPartOpacities = new csmMap();
        }
        /**
         * 更新模型参数
         */
        CubismModel.prototype.update = function () {
            // Update model
            this._model.update();
            this._model.drawables.resetDynamicFlags();
        };
        /**
         * 获取画布的宽度
         */
        CubismModel.prototype.getCanvasWidth = function () {
            if (this._model == null) {
                return 0.0;
            }
            return this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit;
        };
        /**
         * 获得画布的高度
         */
        CubismModel.prototype.getCanvasHeight = function () {
            if (this._model == null) {
                return 0.0;
            }
            return this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit;
        };
        /**
         * 保存参数
         */
        CubismModel.prototype.saveParameters = function () {
            var parameterCount = this._model.parameters.count;
            var savedParameterCount = this._savedParameters.getSize();
            for (var i = 0; i < parameterCount; ++i) {
                if (i < savedParameterCount) {
                    this._savedParameters.set(i, this._parameterValues[i]);
                }
                else {
                    this._savedParameters.pushBack(this._parameterValues[i]);
                }
            }
        };
        /**
         * 获得模型
         */
        CubismModel.prototype.getModel = function () {
            return this._model;
        };
        /**
         * 获取部件索引
         * @param partId 部件ID
         * @return 部件索引
         */
        CubismModel.prototype.getPartIndex = function (partId) {
            var partIndex;
            var partCount = this._model.parts.count;
            for (partIndex = 0; partIndex < partCount; ++partIndex) {
                if (partId == this._partIds.at(partIndex)) {
                    return partIndex;
                }
            }
            // 如果模型中不存在，则在不存在的零件ID列表中搜索它并返回其索引
            if (this._notExistPartId.isExist(partId)) {
                return this._notExistPartId.getValue(partId);
            }
            // 如果不存在于不存在的零件ID列表中，则添加新元素
            partIndex = partCount + this._notExistPartId.getSize();
            this._notExistPartId.setValue(partId, partIndex);
            this._notExistPartOpacities.appendKey(partIndex);
            return partIndex;
        };
        /**
         * 获取零件数量
         * @return 零件数量
         */
        CubismModel.prototype.getPartCount = function () {
            var partCount = this._model.parts.count;
            return partCount;
        };
        /**
         * 设置零件的不透明度（索引）
         * @param partIndex 部分索引
         * @param opacity 不透明度
         */
        CubismModel.prototype.setPartOpacityByIndex = function (partIndex, opacity) {
            if (this._notExistPartOpacities.isExist(partIndex)) {
                this._notExistPartOpacities.setValue(partIndex, opacity);
                return;
            }
            // 索引范围检测
            CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
            this._partOpacities[partIndex] = opacity;
        };
        /**
         * 设置零件的不透明度（Id）
         * @param partId 部件ID
         * @param opacity 部件的不透明度
         */
        CubismModel.prototype.setPartOpacityById = function (partId, opacity) {
            // 虽然它是一种可以获取PartIndex以加速的机制，但是因为从外部设置时呼叫频率低所以没有必要
            var index = this.getPartIndex(partId);
            if (index < 0) {
                return; // 跳过，因为没有任何部件
            }
            this.setPartOpacityByIndex(index, opacity);
        };
        /**
         * 获得部分不透明度（指数）
         * @param partIndex 部分索引
         * @return 零件的不透明度
         */
        CubismModel.prototype.getPartOpacityByIndex = function (partIndex) {
            if (this._notExistPartOpacities.isExist(partIndex)) {
                // 对于模型中不存在的零件ID，从不存在的零件清单返回不透明度。
                return this._notExistPartOpacities.getValue(partIndex);
            }
            // 索引范围检测
            CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
            return this._partOpacities[partIndex];
        };
        /**
         * 获得部分不透明度（id）
         * @param partId 部分ID
         * @return 零件的不透明度
         */
        CubismModel.prototype.getPartOpacityById = function (partId) {
            // 虽然它是一种可以获取PartIndex以加速的机制，但是因为从外部设置时呼叫频率低所以没有必要
            var index = this.getPartIndex(partId);
            if (index < 0) {
                return 0; // 跳过，因为没有任何部分
            }
            return this.getPartOpacityByIndex(index);
        };
        /**
         * 获取参数索引
         * @param 参数ID
         * @return 参数索引
         */
        CubismModel.prototype.getParameterIndex = function (parameterId) {
            var parameterIndex;
            var idCount = this._model.parameters.count;
            for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
                if (parameterId != this._parameterIds.at(parameterIndex)) {
                    continue;
                }
                return parameterIndex;
            }
            // 如果模型中不存在，则搜索不存在的参数ID列表并返回其索引
            if (this._notExistParameterId.isExist(parameterId)) {
                return this._notExistParameterId.getValue(parameterId);
            }
            // 如果不存在于不存在的参数ID列表中，则添加新元素
            parameterIndex = this._model.parameters.count + this._notExistParameterId.getSize();
            this._notExistParameterId.setValue(parameterId, parameterIndex);
            this._notExistParameterValues.appendKey(parameterIndex);
            return parameterIndex;
        };
        /**
         * 获取参数数量
         * @return 参数数量
         */
        CubismModel.prototype.getParameterCount = function () {
            return this._model.parameters.count;
        };
        /**
         * 获取参数的最大值
         * @param parameterIndex 参数索引
         * @return 参数的最大值
         */
        CubismModel.prototype.getParameterMaximumValue = function (parameterIndex) {
            return this._model.parameters.maximumValues[parameterIndex];
        };
        /**
         * 获取参数的最小值
         * @param parameterIndex 参数索引
         * @return 参数的最小值
         */
        CubismModel.prototype.getParameterMinimumValue = function (parameterIndex) {
            return this._model.parameters.minimumValues[parameterIndex];
        };
        /**
         * 获取参数默认值
         * @param parameterIndex 参数索引
         * @return 参数默认值
         */
        CubismModel.prototype.getParameterDefaultValue = function (parameterIndex) {
            return this._model.parameters.defaultValues[parameterIndex];
        };
        /**
         * 获取参数值
         * @param parameterIndex    参数索引
         * @return 参数的值
         */
        CubismModel.prototype.getParameterValueByIndex = function (parameterIndex) {
            if (this._notExistParameterValues.isExist(parameterIndex)) {
                return this._notExistParameterValues.getValue(parameterIndex);
            }
            // 索引范围检测
            CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
            return this._parameterValues[parameterIndex];
        };
        /**
         * 获取参数值
         * @param parameterId    参数ID
         * @return 参数的值
         */
        CubismModel.prototype.getParameterValueById = function (parameterId) {
            // 高速化のためにparameterIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            var parameterIndex = this.getParameterIndex(parameterId);
            return this.getParameterValueByIndex(parameterIndex);
        };
        /**
         * 设置参数值
         * @param parameterIndex 参数索引
         * @param value 参数的值
         * @param weight 权重
         */
        CubismModel.prototype.setParameterValueByIndex = function (parameterIndex, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            if (this._notExistParameterValues.isExist(parameterIndex)) {
                this._notExistParameterValues.setValue(parameterIndex, (weight == 1)
                    ? value
                    : (this._notExistParameterValues.getValue(parameterIndex) * (1 - weight)) + (value * weight));
                return;
            }
            // 索引范围检测
            CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
            if (this._model.parameters.maximumValues[parameterIndex] < value) {
                value = this._model.parameters.maximumValues[parameterIndex];
            }
            if (this._model.parameters.minimumValues[parameterIndex] > value) {
                value = this._model.parameters.minimumValues[parameterIndex];
            }
            this._parameterValues[parameterIndex] = (weight == 1)
                ? value
                : this._parameterValues[parameterIndex] = (this._parameterValues[parameterIndex] * (1 - weight)) + (value * weight);
        };
        /**
         * 设置参数值
         * @param parameterId 参数ID
         * @param value 参数的值
         * @param weight 权重
         */
        CubismModel.prototype.setParameterValueById = function (parameterId, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            var index = this.getParameterIndex(parameterId);
            this.setParameterValueByIndex(index, value, weight);
        };
        /**
         * 参数值加法（索引）
         * @param parameterIndex 参数索引
         * @param value 要添加的值
         * @param weight 权重
         */
        CubismModel.prototype.addParameterValueByIndex = function (parameterIndex, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            this.setParameterValueByIndex(parameterIndex, (this.getParameterValueByIndex(parameterIndex) + (value * weight)));
        };
        /**
         * 添加参数值（id）
         * @param parameterId 参数ID
         * @param value 要添加的值
         * @param weight 权重
         */
        CubismModel.prototype.addParameterValueById = function (parameterId, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            var index = this.getParameterIndex(parameterId);
            this.addParameterValueByIndex(index, value, weight);
        };
        /**
         * 乘以参数值
         * @param parameterId 参数ID
         * @param value 要乘的值
         * @param weight 权重
         */
        CubismModel.prototype.multiplyParameterValueById = function (parameterId, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            var index = this.getParameterIndex(parameterId);
            this.multiplyParameterValueByIndex(index, value, weight);
        };
        /**
         * 乘以参数值
         * @param parameterIndex 参数索引
         * @param value　要乘的值
         * @param weight 权重
         */
        CubismModel.prototype.multiplyParameterValueByIndex = function (parameterIndex, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            this.setParameterValueByIndex(parameterIndex, (this.getParameterValueByIndex(parameterIndex) * (1.0 + (value - 1.0) * weight)));
        };
        /**
         * 获取Drawable索引
         * @param drawableId drawableId ID
         * @return Drawable索引
         */
        CubismModel.prototype.getDrawableIndex = function (drawableId) {
            var drawableCount = this._model.drawables.count;
            for (var drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
                if (this._drawableIds.at(drawableIndex) == drawableId) {
                    return drawableIndex;
                }
            }
            return -1;
        };
        /**
         * 获得可绘制的数量
         * @return 可绘制的数量
         */
        CubismModel.prototype.getDrawableCount = function () {
            var drawableCount = this._model.drawables.count;
            return drawableCount;
        };
        /**
         * 获取Drawable ID
         * @param drawableIndex Drawable索引
         * @return drawable ID
         */
        CubismModel.prototype.getDrawableId = function (drawableIndex) {
            var parameterIds = this._model.drawables.ids;
            return CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
        };
        /**
         * 获取Drawable的绘图顺序列表
         * @return 可绘制的绘图顺序列表
         */
        CubismModel.prototype.getDrawableRenderOrders = function () {
            var renderOrders = this._model.drawables.renderOrders;
            return renderOrders;
        };
        /**
         * 获取Drawable的纹理索引列表
         * @param drawableIndex Drawable索引
         * @return drawable的纹理索引列表
         */
        CubismModel.prototype.getDrawableTextureIndices = function (drawableIndex) {
            var textureIndices = this._model.drawables.textureIndices;
            return textureIndices[drawableIndex];
        };
        /**
         * 获取Drawable的VertexPositions的更改信息
         *
         * 获取最新的CubismModel.update函数中的Drawable顶点信息是否已更改。
         *
         * @param   drawableIndex   可绘制的索引
         * @retval  true    使用最新的CubismModel.update函数更改了可绘制的顶点信息
         * @retval  false   最新的CubismModel.update函数没有改变可绘制的顶点信息
         */
        CubismModel.prototype.getDrawableDynamicFlagVertexPositionsDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * 获取Drawable顶点索引的数量
         * @param drawableIndex 可绘制的索引
         * @return 可绘制的顶点索引数
         */
        CubismModel.prototype.getDrawableVertexIndexCount = function (drawableIndex) {
            var indexCounts = this._model.drawables.indexCounts;
            return indexCounts[drawableIndex];
        };
        /**
         * 获取Drawable的顶点数
         * @param drawableIndex 可绘制的索引
         * @return drawable中的顶点数
         */
        CubismModel.prototype.getDrawableVertexCount = function (drawableIndex) {
            var vertexCounts = this._model.drawables.vertexCounts;
            return vertexCounts[drawableIndex];
        };
        /**
         * 获取Drawable顶点列表
         * @param drawableIndex 可绘制的索引
         * @return drawable的顶点列表
         */
        CubismModel.prototype.getDrawableVertices = function (drawableIndex) {
            return this.getDrawableVertexPositions(drawableIndex);
        };
        /**
         * 获取Drawable的顶点索引列表
         * @param drarableIndex 可绘制的索引
         * @return drawable顶点索引列表
         */
        CubismModel.prototype.getDrawableVertexIndices = function (drawableIndex) {
            var indicesArray = this._model.drawables.indices;
            return indicesArray[drawableIndex];
        };
        /**
         * 获取Drawable顶点列表
         * @param drawableIndex 可绘制的索引
         * @return drawable的顶点列表
         */
        CubismModel.prototype.getDrawableVertexPositions = function (drawableIndex) {
            var verticesArray = this._model.drawables.vertexPositions;
            return verticesArray[drawableIndex];
        };
        /**
         * 获取可绘制顶点的UV列表
         * @param drawableIndex 可绘制的索引
         * @return 可绘制顶点UV列表
         */
        CubismModel.prototype.getDrawableVertexUvs = function (drawableIndex) {
            var uvsArray = this._model.drawables.vertexUvs;
            return uvsArray[drawableIndex];
        };
        /**
         * 获得Drawable的不透明度
         * @param drawableIndex 可绘制的索引
         * @return 可绘制的不透明度
         */
        CubismModel.prototype.getDrawableOpacity = function (drawableIndex) {
            var opacities = this._model.drawables.opacities;
            return opacities[drawableIndex];
        };
        /**
         * 可绘制的剔除信息获取
         * @param drawableIndex 可绘制的索引
         * @return 可绘制的剔除信息
         */
        CubismModel.prototype.getDrawableCulling = function (drawableIndex) {
            var constantFlags = this._model.drawables.constantFlags;
            return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
        };
        /**
         * 获得Drawable的混合模式
         * @param drawableIndex 可绘制的索引
         * @return 混合模式的drawable
         */
        CubismModel.prototype.getDrawableBlendMode = function (drawableIndex) {
            var constantFlags = this._model.drawables.constantFlags;
            return (Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex]))
                ? CubismBlendMode.CubismBlendMode_Additive
                : (Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex]))
                    ? CubismBlendMode.CubismBlendMode_Multiplicative
                    : CubismBlendMode.CubismBlendMode_Normal;
        };
        /**
         * 获取Drawable的剪贴蒙版列表
         * @return 可绘制的剪贴蒙版列表
         */
        CubismModel.prototype.getDrawableMasks = function () {
            var masks = this._model.drawables.masks;
            return masks;
        };
        /**
         * 获取可绘制剪切蒙版的数量列表
         * @return 可绘制剪切蒙版的数量列表
         */
        CubismModel.prototype.getDrawableMaskCounts = function () {
            var maskCounts = this._model.drawables.maskCounts;
            return maskCounts;
        };
        /**
         * 剪贴蒙版使用状态
         *
         * @return true 使用剪贴蒙版
         * @return false 不使用剪贴蒙版
         */
        CubismModel.prototype.isUsingMasking = function () {
            for (var d = 0; d < this._model.drawables.count; ++d) {
                if (this._model.drawables.maskCounts[d] <= 0) {
                    continue;
                }
                return true;
            }
            return false;
        };
        /**
         * 获取Drawable显示信息
         *
         * @param drawableIndex 可绘制的索引
         * @return true 显示Drawable
         * @return false Drawable是隐藏的
         */
        CubismModel.prototype.getDrawableDynamicFlagIsVisible = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
        };
        /**
         * 获取Drawable的DrawOrder的更改信息
         *
         * 获取最新的CubismModel.update函数中drawable的drawOrder是否已更改。
         * drawOrder是artMesh上指定的0到1000个信息
         * @param drawableIndex 可绘制的索引
         * @return true drawable的不透明度随最新的CubismModel.update函数而改变
         * @return false drawable的不透明度随着最新的CubismModel.update函数而改变
         */
        CubismModel.prototype.getDrawableDynamicFlagVisibilityDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * 获取Drawable不透明度的变化信息
         *
         * 获取是否使用最新的CubismModel.update函数更改了可绘制的不透明度
         *
         * @param drawableIndex 可绘制的索引
         * @return true drawable的不透明度随最新的CubismModel.update函数而改变
         * @return false 最新的CubismModel.update函数没有改变可绘制的不透明度
         */
        CubismModel.prototype.getDrawableDynamicFlagOpacityDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * 获取Drawable的图纸订单变更信息
         *
         * 使用最新的CubismModel.update函数获取Drawable的绘制顺序是否已更改。
         *
         * @param drawableIndex 可绘制的索引
         * @return true Drawable的绘制顺序随最新的CubismModel.update函数而改变
         * @return false Drawable的绘制顺序没有随最新的CubismModel.update函数而改变
         */
        CubismModel.prototype.getDrawableDynamicFlagRenderOrderDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * 加载保存的参数
         */
        CubismModel.prototype.loadParameters = function () {
            var parameterCount = this._model.parameters.count;
            var savedParameterCount = this._savedParameters.getSize();
            if (parameterCount > savedParameterCount) {
                parameterCount = savedParameterCount;
            }
            for (var i = 0; i < parameterCount; ++i) {
                this._parameterValues[i] = this._savedParameters.at(i);
            }
        };
        /**
         * 初始化
         */
        CubismModel.prototype.initialize = function () {
            CSM_ASSERT(this._model);
            this._parameterValues = this._model.parameters.values;
            this._partOpacities = this._model.parts.opacities;
            this._parameterMaximumValues = this._model.parameters.maximumValues;
            this._parameterMinimumValues = this._model.parameters.minimumValues;
            {
                var parameterIds = this._model.parameters.ids;
                var parameterCount = this._model.parameters.count;
                this._parameterIds.prepareCapacity(parameterCount);
                for (var i = 0; i < parameterCount; ++i) {
                    this._parameterIds.pushBack(CubismFramework.getIdManager().getId(parameterIds[i]));
                }
            }
            {
                var partIds = this._model.parts.ids;
                var partCount = this._model.parts.count;
                this._partIds.prepareCapacity(partCount);
                for (var i = 0; i < partCount; ++i) {
                    this._partIds.pushBack(CubismFramework.getIdManager().getId(partIds[i]));
                }
            }
            {
                var drawableIds = this._model.drawables.ids;
                var drawableCount = this._model.drawables.count;
                this._drawableIds.prepareCapacity(drawableCount);
                for (var i = 0; i < drawableCount; ++i) {
                    this._drawableIds.pushBack(CubismFramework.getIdManager().getId(drawableIds[i]));
                }
            }
        };
        /**
         * 析构函数
         */
        CubismModel.prototype.release = function () {
            this._model.release();
            this._model = null;
        };
        return CubismModel;
    }());
    Live2DCubismFramework.CubismModel = CubismModel;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
