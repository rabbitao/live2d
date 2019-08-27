import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    /**
     * 用户数据界面
     *
     * 记录从Json读取的用户数据的结构
     */
    class CubismModelUserDataNode {
        targetType: CubismIdHandle;
        targetId: CubismIdHandle;
        value: csmString;
    }
    /**
     * 用户数据管理类
     *
     * 加载，管理，搜索界面和发布用户数据
     */
    class CubismModelUserData {
        /**
         * 创建实例
         *
         * @param buffer    加载userdata3.json的缓冲区
         * @param size      缓冲区大小
         * @return 创建实例
         */
        static create(buffer: ArrayBuffer, size: number): CubismModelUserData;
        /**
         * 销毁实例
         *
         * @param modelUserData 毁灭的实例
         */
        static delete(modelUserData: CubismModelUserData): void;
        private _userDataNodes;
        private _artMeshUserDataNode;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 获取ArtMesh用户数据列表
         *
         * @return 用户数据列表
         */
        getArtMeshUserDatas(): csmVector<CubismModelUserDataNode>;
        /**
         * userdata3.json解析
         *
         * @param buffer    读取userdata3.json的缓冲区
         * @param size      缓冲区大小
         */
        parseUserData(buffer: ArrayBuffer, size: number): void;
        /**
         * 析构函数等效处理
         *
         * 释放用户数据数组
         */
        release(): void;
    }
}
