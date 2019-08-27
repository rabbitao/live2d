import { Live2DCubismFramework as cubismmatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
import Csm_csmVector = csmvector.csmVector;
import Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import { LAppModel } from './lappmodel';
export declare let s_instance: LAppLive2DManager;
/**
 * 在示例应用程序中管理CubismModel的类
 * 模型生成和销毁，点击事件处理，模型切换。
 */
export declare class LAppLive2DManager {
    /**
     * 返回类的实例（单例）。
     * 如果尚未创建实例，则会在内部创建实例。
     *
     * @return 一个类的实例
     */
    static getInstance(): LAppLive2DManager;
    /**
     * 释放一个类的实例（单例）。
     */
    static releaseInstance(): void;
    _viewMatrix: Csm_CubismMatrix44;
    _models: Csm_csmVector<LAppModel>;
    _userModels: LAppModel[];
    /**
     * 构造函数
     */
    constructor();
    /**
     * 返回当前场景中保存的模型。
     *
     * @param no 模型列表索引值
     * @return 返回模型的实例。 如果索引值超出范围，则返回NULL。
     */
    getModel(nameOrIndex: string | number): LAppModel;
    /**
     * 释放当前场景中保存的所有模型
     */
    releaseAllModel(): void;
    /**
     * 拖动屏幕的时候
     *
     * @param x 屏幕的X坐标
     * @param y 屏幕的Y坐标
     */
    onDrag(x: number, y: number): void;
    /**
     * 点按屏幕的时候
     *
     * @param x 屏幕的X坐标
     * @param y 屏幕的Y坐标
     */
    onTap(x: number, y: number): void;
    /**
     * 更新屏幕时进行处理
     * 执行模型更新处理和绘图处理
     */
    onUpdate(): void;
    /**
     * 切换场景
     * 在示例应用程序中，切换模型集。
     */
    addModel(resource: {
        path: string;
        modelName: string;
    }): Promise<LAppModel | null>;
}
