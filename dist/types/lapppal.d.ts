/**
 * 抽象平台依赖功能 Cubism Platform Abstraction Layer.
 *
 * 将与平台相关的功能放在一起，例如文件读取和时间采集。
 */
export declare class LAppPal {
    static lastUpdate: number;
    static s_currentFrame: number;
    static s_lastFrame: number;
    static s_deltaTime: number;
    /**
     * 将文件作为字节数据读取
     *
     * @param filePath 要读取的文件的路径
     * @return
     * {
     *      buffer,   字节数据读取
     *      size        文件大小
     * }
     */
    static loadFileAsBytes(filePath: string, callback: any): void;
    /**
     * 释放字节数据
     * @param byteData 要释放的字节数据
     */
    static releaseBytes(byteData: ArrayBuffer): void;
    /**
     * 获取增量时间（与前一帧的差异)
     * @return 时间[ms]
     */
    static getDeltaTime(): number;
    static updateTime(): void;
    /**
     * 输出日志
     * @param format 格式化字符串
     * @param ... args（可变长度参数）字符串
     */
    static printLog(format: string, ...args: any[]): void;
    /**
     * 输出消息
     * @param message 字符串
     */
    static printMessage(message: string): void;
}
