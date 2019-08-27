import { LogLevel } from '../live2dcubismframework';
export declare const CubismLogPrint: (level: LogLevel, fmt: string, args: any[]) => void;
export declare const CubismLogPrintIn: (level: LogLevel, fmt: string, args: any[]) => void;
export declare let CSM_ASSERT: (expr: any) => void;
export declare let CubismLogVerbose: (fmt: string, ...args: any[]) => void;
export declare let CubismLogDebug: (fmt: string, ...args: any[]) => void;
export declare let CubismLogInfo: (fmt: string, ...args: any[]) => void;
export declare let CubismLogWarning: (fmt: string, ...args: any[]) => void;
export declare let CubismLogError: (fmt: string, ...args: any[]) => void;
export declare namespace Live2DCubismFramework {
    /**
     * 用于调试的实用程序类。
     * 日志输出，字节转储等
     */
    class CubismDebug {
        /**
         * 输出日志。 在第一个参数中设置日志级别。
         * 如果它低于CubismFramework.initialize（）选项中设置的日志输出级别，它将不会输出到日志。
         *
         * @param logLevel 设置日志级别
         * @param format 格式化字符串
         * @param args 可变长度参数
         */
        static print(logLevel: LogLevel, format: string, args?: any[]): void;
        /**
         * 从数据中转储指定的长度。
         * 如果它低于CubismFramework.initialize（）选项中设置的日志输出级别，它将不会输出到日志。
         *
         * @param logLevel 设置日志级别
         * @param data 要转储的数据
         * @param length 转储的长度
         */
        static dumpBytes(logLevel: LogLevel, data: Uint8Array, length: number): void;
        /**
         * private 构造函数
         */
        private constructor();
    }
}
