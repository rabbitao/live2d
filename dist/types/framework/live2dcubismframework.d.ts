/// <reference path="../../../src/live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismidmanager } from './id/cubismidmanager';
import CubismIdManager = cubismidmanager.CubismIdManager;
export declare function strtod(s: string, endPtr: string[]): number;
export declare namespace Live2DCubismFramework {
    /**
     * 框架中使用的常量声明
     */
    namespace Constant {
        const vertexOffset: number;
        const vertexStep: number;
    }
    function csmDelete<T>(address: T): void;
    /**
     * Live2D Cubism3原创工作流程SDK的切入点
     * 在使用开始时调用CubismFramework.initialize（）并以CubismFramework.dispose（）结束。
     */
    class CubismFramework {
        /**
         * 启用Cubism Framework API。
         *  确保在执行API之前执行此功能。
         *  准备完成后，即使再次执行，也会跳过内部处理。
         *
         * @param    option      选项类实例
         *
         * @return   准备过程完成后返回true。
         */
        static startUp(option?: Option): boolean;
        /**
         * 清除StartUp（）初始化的CubismFramework的每个参数。
         * 重新使用已经Dispose（）的CubismFramework时请使用它。
         */
        static cleanUp(): void;
        /**
         * 初始化Cubism Framework中的资源并使模型可显示。<br>
         * 要再次initialize()，必须首先执行Dispose（）
         */
        static initialize(): void;
        /**
         * 释放Cubism Framework中的所有资源
         * 但是，不会释放外部保留的资源。
         * 必须妥善处理外部。
         */
        static dispose(): void;
        /**
         * 您是否准备好使用Cubism Framework API
         * @return 如果API可以使用，则返回true。
         */
        static isStarted(): boolean;
        /**
         * 是否已执行Cubism Framework资源初始化
         * @return 如果资源分配完成，则返回true
         */
        static isInitialized(): boolean;
        /**
         * 执行绑定到Core API的日志功能
         *
         * @praram message 消息日志
         */
        static coreLogFunction(message: string): void;
        /**
         * 返回当前日志输出级别设置的值。
         *
         * @return  当前日志输出级别设置值
         */
        static getLoggingLevel(): LogLevel;
        /**
         * 获取ID Manager的实例
         * @return CubismManager类的实例
         */
        static getIdManager(): CubismIdManager;
        /**
         * 用作静态类
         * 不要实例化
         */
        private constructor();
    }
}
export declare class Option {
    logFunction: Live2DCubismCore.csmLogFunction;
    loggingLevel: LogLevel;
}
/**
 * ログ出力のレベル
 */
export declare enum LogLevel {
    LogLevel_Verbose = 0,
    LogLevel_Debug = 1,
    LogLevel_Info = 2,
    LogLevel_Warning = 3,
    LogLevel_Error = 4,
    LogLevel_Off = 5
}
