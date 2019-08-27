import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    class CubismModelUserDataJson {
        private _json;
        /**
         * 构造函数
         * @param buffer    读取userdata3.json的缓冲区
         * @param size      缓冲区大小
         */
        constructor(buffer: ArrayBuffer, size: number);
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 获取用户数据
         * @return 用户数据的数量
         */
        getUserDataCount(): number;
        /**
         * 获取用户数据字符串的总数
         *
         * @return 用户数据字符串的总数
         */
        getTotalUserDataSize(): number;
        /**
         * 获取用户数据类型
         *
         * @return 用户数据类型
         */
        getUserDataTargetType(i: number): string;
        /**
         * 获取用户数据目标ID
         *
         * @param i 索引
         * @return 用户数据目标ID
         */
        getUserDataId(i: number): CubismIdHandle;
        /**
         * 获取用户数据字符串
         *
         * @param i 索引
         * @return 用户数据
         */
        getUserDataValue(i: number): string;
    }
}
