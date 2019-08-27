/// <reference path="../../../../src/live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismmodel } from './cubismmodel';
import CubismModel = cubismmodel.CubismModel;
export declare namespace Live2DCubismFramework {
    /**
     * 管理Moc数据
     *
     * 管理Moc数据的类。
     */
    class CubismMoc {
        /**
         * 创建Moc数据
         */
        static create(mocBytes: ArrayBuffer): CubismMoc;
        /**
         * 删除Moc数据
         *
         * 删除Moc数据
         */
        static delete(moc: CubismMoc): void;
        _moc: Live2DCubismCore.Moc;
        _modelCount: number;
        /**
         * 构造函数
         */
        private constructor();
        /**
         * 创建一个模型
         *
         * @return 从Moc数据创建的模型
         */
        createModel(): CubismModel;
        /**
         * 删除模型
         */
        deleteModel(model: CubismModel): void;
        /**
         * 析构函数等效处理
         */
        release(): void;
    }
}
