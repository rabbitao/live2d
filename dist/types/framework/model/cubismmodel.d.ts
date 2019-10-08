/// <reference types="src/live2dcubismcore" />
import { Live2DCubismFramework as cubismrenderer } from '../rendering/cubismrenderer';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import CubismBlendMode = cubismrenderer.CubismBlendMode;
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    /**
     * 模型
     *
     * 从Moc数据生成的模型类。
     */
    class CubismModel {
        private _notExistPartOpacities;
        private _notExistPartId;
        private _notExistParameterValues;
        private _notExistParameterId;
        private _savedParameters;
        private _model;
        private _parameterValues;
        private _parameterMaximumValues;
        private _parameterMinimumValues;
        private _partOpacities;
        private _parameterIds;
        private _partIds;
        private _drawableIds;
        /**
         * 构造函数
         * @param model 模型
         */
        constructor(model: Live2DCubismCore.Model);
        /**
         * 更新模型参数
         */
        update(): void;
        /**
         * 获取画布的宽度
         */
        getCanvasWidth(): number;
        /**
         * 获得画布的高度
         */
        getCanvasHeight(): number;
        /**
         * 保存参数
         */
        saveParameters(): void;
        /**
         * 获得模型
         */
        getModel(): Live2DCubismCore.Model;
        /**
         * 获取部件索引
         * @param partId 部件ID
         * @return 部件索引
         */
        getPartIndex(partId: CubismIdHandle): number;
        /**
         * 获取零件数量
         * @return 零件数量
         */
        getPartCount(): number;
        /**
         * 设置零件的不透明度（索引）
         * @param partIndex 部分索引
         * @param opacity 不透明度
         */
        setPartOpacityByIndex(partIndex: number, opacity: number): void;
        /**
         * 设置零件的不透明度（Id）
         * @param partId 部件ID
         * @param opacity 部件的不透明度
         */
        setPartOpacityById(partId: CubismIdHandle, opacity: number): void;
        /**
         * 获得部分不透明度（指数）
         * @param partIndex 部分索引
         * @return 零件的不透明度
         */
        getPartOpacityByIndex(partIndex: number): number;
        /**
         * 获得部分不透明度（id）
         * @param partId 部分ID
         * @return 零件的不透明度
         */
        getPartOpacityById(partId: CubismIdHandle): number;
        /**
         * 获取参数索引
         * @param 参数ID
         * @return 参数索引
         */
        getParameterIndex(parameterId: CubismIdHandle): number;
        /**
         * 获取参数数量
         * @return 参数数量
         */
        getParameterCount(): number;
        /**
         * 获取参数的最大值
         * @param parameterIndex 参数索引
         * @return 参数的最大值
         */
        getParameterMaximumValue(parameterIndex: number): number;
        /**
         * 获取参数的最小值
         * @param parameterIndex 参数索引
         * @return 参数的最小值
         */
        getParameterMinimumValue(parameterIndex: number): number;
        /**
         * 获取参数默认值
         * @param parameterIndex 参数索引
         * @return 参数默认值
         */
        getParameterDefaultValue(parameterIndex: number): number;
        /**
         * 获取参数值
         * @param parameterIndex    参数索引
         * @return 参数的值
         */
        getParameterValueByIndex(parameterIndex: number): number;
        /**
         * 获取参数值
         * @param parameterId    参数ID
         * @return 参数的值
         */
        getParameterValueById(parameterId: CubismIdHandle): number;
        /**
         * 设置参数值
         * @param parameterIndex 参数索引
         * @param value 参数的值
         * @param weight 权重
         */
        setParameterValueByIndex(parameterIndex: number, value: number, weight?: number): void;
        /**
         * 设置参数值
         * @param parameterId 参数ID
         * @param value 参数的值
         * @param weight 权重
         */
        setParameterValueById(parameterId: CubismIdHandle, value: number, weight?: number): void;
        /**
         * 参数值加法（索引）
         * @param parameterIndex 参数索引
         * @param value 要添加的值
         * @param weight 权重
         */
        addParameterValueByIndex(parameterIndex: number, value: number, weight?: number): void;
        /**
         * 添加参数值（id）
         * @param parameterId 参数ID
         * @param value 要添加的值
         * @param weight 权重
         */
        addParameterValueById(parameterId: any, value: number, weight?: number): void;
        /**
         * 乘以参数值
         * @param parameterId 参数ID
         * @param value 要乘的值
         * @param weight 权重
         */
        multiplyParameterValueById(parameterId: CubismIdHandle, value: number, weight?: number): void;
        /**
         * 乘以参数值
         * @param parameterIndex 参数索引
         * @param value　要乘的值
         * @param weight 权重
         */
        multiplyParameterValueByIndex(parameterIndex: number, value: number, weight?: number): void;
        /**
         * 获取Drawable索引
         * @param drawableId drawableId ID
         * @return Drawable索引
         */
        getDrawableIndex(drawableId: CubismIdHandle): number;
        /**
         * 获得可绘制的数量
         * @return 可绘制的数量
         */
        getDrawableCount(): number;
        /**
         * 获取Drawable ID
         * @param drawableIndex Drawable索引
         * @return drawable ID
         */
        getDrawableId(drawableIndex: number): CubismIdHandle;
        /**
         * 获取Drawable的绘图顺序列表
         * @return 可绘制的绘图顺序列表
         */
        getDrawableRenderOrders(): Int32Array;
        /**
         * 获取Drawable的纹理索引列表
         * @param drawableIndex Drawable索引
         * @return drawable的纹理索引列表
         */
        getDrawableTextureIndices(drawableIndex: number): number;
        /**
         * 获取Drawable的VertexPositions的更改信息
         *
         * 获取最新的CubismModel.update函数中的Drawable顶点信息是否已更改。
         *
         * @param   drawableIndex   可绘制的索引
         * @retval  true    使用最新的CubismModel.update函数更改了可绘制的顶点信息
         * @retval  false   最新的CubismModel.update函数没有改变可绘制的顶点信息
         */
        getDrawableDynamicFlagVertexPositionsDidChange(drawableIndex: number): boolean;
        /**
         * 获取Drawable顶点索引的数量
         * @param drawableIndex 可绘制的索引
         * @return 可绘制的顶点索引数
         */
        getDrawableVertexIndexCount(drawableIndex: number): number;
        /**
         * 获取Drawable的顶点数
         * @param drawableIndex 可绘制的索引
         * @return drawable中的顶点数
         */
        getDrawableVertexCount(drawableIndex: number): number;
        /**
         * 获取Drawable顶点列表
         * @param drawableIndex 可绘制的索引
         * @return drawable的顶点列表
         */
        getDrawableVertices(drawableIndex: number): Float32Array;
        /**
         * 获取Drawable的顶点索引列表
         * @param drarableIndex 可绘制的索引
         * @return drawable顶点索引列表
         */
        getDrawableVertexIndices(drawableIndex: number): Uint16Array;
        /**
         * 获取Drawable顶点列表
         * @param drawableIndex 可绘制的索引
         * @return drawable的顶点列表
         */
        getDrawableVertexPositions(drawableIndex: number): Float32Array;
        /**
         * 获取可绘制顶点的UV列表
         * @param drawableIndex 可绘制的索引
         * @return 可绘制顶点UV列表
         */
        getDrawableVertexUvs(drawableIndex: number): Float32Array;
        /**
         * 获得Drawable的不透明度
         * @param drawableIndex 可绘制的索引
         * @return 可绘制的不透明度
         */
        getDrawableOpacity(drawableIndex: number): number;
        /**
         * 可绘制的剔除信息获取
         * @param drawableIndex 可绘制的索引
         * @return 可绘制的剔除信息
         */
        getDrawableCulling(drawableIndex: number): boolean;
        /**
         * 获得Drawable的混合模式
         * @param drawableIndex 可绘制的索引
         * @return 混合模式的drawable
         */
        getDrawableBlendMode(drawableIndex: number): CubismBlendMode;
        /**
         * 获取Drawable的剪贴蒙版列表
         * @return 可绘制的剪贴蒙版列表
         */
        getDrawableMasks(): Int32Array[];
        /**
         * 获取可绘制剪切蒙版的数量列表
         * @return 可绘制剪切蒙版的数量列表
         */
        getDrawableMaskCounts(): Int32Array;
        /**
         * 剪贴蒙版使用状态
         *
         * @return true 使用剪贴蒙版
         * @return false 不使用剪贴蒙版
         */
        isUsingMasking(): boolean;
        /**
         * 获取Drawable显示信息
         *
         * @param drawableIndex 可绘制的索引
         * @return true 显示Drawable
         * @return false Drawable是隐藏的
         */
        getDrawableDynamicFlagIsVisible(drawableIndex: number): boolean;
        /**
         * 获取Drawable的DrawOrder的更改信息
         *
         * 获取最新的CubismModel.update函数中drawable的drawOrder是否已更改。
         * drawOrder是artMesh上指定的0到1000个信息
         * @param drawableIndex 可绘制的索引
         * @return true drawable的不透明度随最新的CubismModel.update函数而改变
         * @return false drawable的不透明度随着最新的CubismModel.update函数而改变
         */
        getDrawableDynamicFlagVisibilityDidChange(drawableIndex: number): boolean;
        /**
         * 获取Drawable不透明度的变化信息
         *
         * 获取是否使用最新的CubismModel.update函数更改了可绘制的不透明度
         *
         * @param drawableIndex 可绘制的索引
         * @return true drawable的不透明度随最新的CubismModel.update函数而改变
         * @return false 最新的CubismModel.update函数没有改变可绘制的不透明度
         */
        getDrawableDynamicFlagOpacityDidChange(drawableIndex: number): boolean;
        /**
         * 获取Drawable的图纸订单变更信息
         *
         * 使用最新的CubismModel.update函数获取Drawable的绘制顺序是否已更改。
         *
         * @param drawableIndex 可绘制的索引
         * @return true Drawable的绘制顺序随最新的CubismModel.update函数而改变
         * @return false Drawable的绘制顺序没有随最新的CubismModel.update函数而改变
         */
        getDrawableDynamicFlagRenderOrderDidChange(drawableIndex: number): boolean;
        /**
         * 加载保存的参数
         */
        loadParameters(): void;
        /**
         * 初始化
         */
        initialize(): void;
        /**
         * 析构函数
         */
        release(): void;
    }
}
