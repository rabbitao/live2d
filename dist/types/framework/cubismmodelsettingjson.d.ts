import { Live2DCubismFramework as icubismmodelsetting } from './icubismmodelsetting';
import { Live2DCubismFramework as cubismid } from './id/cubismid';
import { Live2DCubismFramework as cubismjson } from './utils/cubismjson';
import { Live2DCubismFramework as csmmap } from './type/csmmap';
import csmMap = csmmap.csmMap;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismJson = cubismjson.CubismJson;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
export declare namespace Live2DCubismFramework {
    /**
     * Model3Json分析器
     *
     * 解析model3.json文件并获取值
     */
    class CubismModelSettingJson extends ICubismModelSetting {
        private _json;
        private _jsonValue;
        /**
         * 带参数的构造函数
         *
         * @param buffer    将Model3Json读取为字节数组的数据缓冲区
         * @param size      Model3Json的数据大小
         */
        constructor(buffer: ArrayBuffer, size: number);
        /**
         * 释放
         */
        release(): void;
        /**
         * 获取CubismJson对象
         *
         * @return CubismJson
         */
        GetJson(): CubismJson;
        /**
         * 获取Moc文件的名称
         * @return Moc文件的名称
         */
        getModelFileName(): string;
        /**
         * 获取模型使用的纹理数
         * @return 纹理数量
         */
        getTextureCount(): number;
        /**
         * 获取纹理所在目录的名称
         * @return 纹理所在目录的名称
         */
        getTextureDirectory(): string;
        /**
         * 获取模型使用的纹理的名称
         * @param index 数组索引值
         * @return 纹理的名称
         */
        getTextureFileName(index: number): string;
        /**
         * 获取为模型设置的命中判断次数
         * @return 为模型设置的命中判断数
         */
        getHitAreasCount(): number;
        /**
         * 获取为命中判断设置的ID
         *
         * @param index 数组索引
         * @return 为命中判断设置的ID
         */
        getHitAreaId(index: number): CubismIdHandle;
        /**
         * 获取为命中判断设置的名称
         * @param index 数组索引值
         * @return 为命中判断设置的名称
         */
        getHitAreaName(index: number): string;
        /**
         * 获取物理计算设置文件的名称
         * @return 物理计算设定文件的名称
         */
        getPhysicsFileName(): string;
        /**
         * 获取部件切换设置文件的名称
         * @return 部件切换设置文件的名称
         */
        getPoseFileName(): string;
        /**
         * 获取面部表情设置文件的数量
         * @return 面部表情设置文件的数量
         */
        getExpressionCount(): number;
        /**
         * 获取标识面部表情设置文件的名称（别名）
         * @param index 数组索引值
         * @return 面部表情名称
         */
        getExpressionName(index: number): string;
        /**
         * 获取面部表情设置文件的名称
         * @param index 数组索引值
         * @return 面部表情设置文件的名称
         */
        getExpressionFileName(index: number): string;
        /**
         * 获取运动组的数量
         * @return 运动组数量
         */
        getMotionGroupCount(): number;
        /**
         * 获取运动组的名称
         * @param index 数组索引值
         * @return 运动组的名称
         */
        getMotionGroupName(index: number): string;
        /**
         * 获取运动组中的运动次数
         * @param groupName 运动组的名称
         * @return 运动组数量
         */
        getMotionCount(groupName: string): number;
        /**
         * 从组名和索引值中获取动作文件名
         * @param groupName 运动组的名称
         * @param index     数组索引值
         * @return 动画文件的名称
         */
        getMotionFileName(groupName: string, index: number): string;
        /**
         * 获取与动作对应的声音文件的名称
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 声音文件的名称
         */
        getMotionSoundFileName(groupName: string, index: number): string;
        /**
         * 在动作开始时获得淡入处理时间
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 淡入处理时间[秒]
         */
        getMotionFadeInTimeValue(groupName: string, index: number): number;
        /**
         * 在运动结束时获得淡出处理时间
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 淡出处理时间[秒]
         */
        getMotionFadeOutTimeValue(groupName: string, index: number): number;
        /**
         * 获取用户数据文件名
         * @return 用户数据文件名
         */
        getUserDataFile(): string;
        /**
         * 获取布局信息
         * @param outLayoutMap csmMap类实例
         * @return true 存在布局信息
         * @return false 不存在布局信息
         */
        getLayoutMap(outLayoutMap: csmMap<string, number>): boolean;
        /**
         * 获取与眼贴相关的参数数量
         * @return 与眼贴相关的参数数量
         */
        getEyeBlinkParameterCount(): number;
        /**
         * 获取与眼贴相关的参数的ID
         * @param index 数组索引值
         * @return 参数ID
         */
        getEyeBlinkParameterId(index: number): CubismIdHandle;
        /**
         * 获取与唇形同步相关的参数数量
         * @return 与唇形同步相关的参数数量
         */
        getLipSyncParameterCount(): number;
        /**
         * 获取与唇形同步相关的参数ID
         * @param index 数组索引值
         * @return 参数ID
         */
        getLipSyncParameterId(index: number): CubismIdHandle;
        /**
         * 检查模型文件密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistModelFile;
        /**
         * 检查纹理文件密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistTextureFiles;
        /**
         * 检查命中判断键是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistHitAreas;
        /**
         * 检查物理文件密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistPhysicsFile;
        /**
         * 检查暂停设置文件的密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistPoseFile;
        /**
         * 检查面部表情设置文件的键是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistExpressionFile;
        /**
         * 检查运动组密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistMotionGroups;
        /**
         * 检查参数中指定的运动组的键是否存在
         * @param groupName  组名
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistMotionGroupName;
        /**
         * 检查与参数中指定的运动相对应的声音文件密钥是否存在
         * @param groupName  组名
         * @param index 数组索引值
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistMotionSoundFile;
        /**
         * 检查是否存在与参数中指定的运动相对应的淡入时间键
         * @param groupName  组名
         * @param index 数组索引值
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistMotionFadeIn;
        /**
         * 检查是否存在与参数中指定的运动相对应的淡出时间键
         * @param groupName  组名
         * @param index 数组索引值
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistMotionFadeOut;
        /**
         * 检查UserData文件名是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistUserDataFile;
        /**
         * 检查是否有与眼贴相关的参数
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistEyeBlinkParameters;
        /**
         * 检查是否存在与唇形同步相关的参数
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        private isExistLipSyncParameters;
    }
}
