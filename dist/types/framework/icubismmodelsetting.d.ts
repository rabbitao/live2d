import { Live2DCubismFramework as cubismid } from './id/cubismid';
import { Live2DCubismFramework as csmmap } from './type/csmmap';
import csmMap = csmmap.csmMap;
import CubismIdHandle = cubismid.CubismIdHandle;
export declare namespace Live2DCubismFramework {
    /**
     * 一个纯虚拟类，用于声明处理模型设置信息的函数。
     *
     * 通过继承此类，它将成为处理模型设置信息的类。
     */
    abstract class ICubismModelSetting {
        /**
         * 获取Moc文件的名称
         * @return Moc文件的名称
         */
        abstract getModelFileName(): string;
        /**
         * 获取模型使用的纹理数
         * 纹理数量
         */
        abstract getTextureCount(): number;
        /**
         * 获取纹理所在目录的名称
         * @return 纹理所在目录的名称
         */
        abstract getTextureDirectory(): string;
        /**
         * 获取模型使用的纹理的名称
         * @param index 数组索引值
         * @return 纹理的名称
         */
        abstract getTextureFileName(index: number): string;
        /**
         * 获取为模型设置的命中判断次数
         * @return 为模型设置的命中判断数
         */
        abstract getHitAreasCount(): number;
        /**
         * 获取为命中判断设置的ID
         *
         * @param index 数组索引值
         * @return 为命中判断设置的ID
         */
        abstract getHitAreaId(index: number): CubismIdHandle;
        /**
         * 获取为命中判断设置的名称
         * @param index 数组索引值
         * @return 命中判断设置的名称
         */
        abstract getHitAreaName(index: number): string;
        /**
         * 获取物理计算设置文件的名称
         * @return 物理计算设置文件的名称
         */
        abstract getPhysicsFileName(): string;
        /**
         * 获取部件切换设置文件的名称
         * @return 部件切换设置文件的名称
         */
        abstract getPoseFileName(): string;
        /**
         * 获取面部表情设置文件的数量
         * @return 面部表情设置文件的数量
         */
        abstract getExpressionCount(): number;
        /**
         * 获取标识面部表情设置文件的名称（别名）
         * @param index 数组索引值
         * @return 面部表情名称
         */
        abstract getExpressionName(index: number): string;
        /**
         * 获取面部表情设置文件的名称
         * @param index 数组索引值
         * @return 面部表情设置文件的名称
         */
        abstract getExpressionFileName(index: number): string;
        /**
         * 获取运动组的数量
         * @return 运动组数量
         */
        abstract getMotionGroupCount(): number;
        /**
         * 获取运动组的名称
         * @param index 数组索引值
         * @return 运动组的名称
         */
        abstract getMotionGroupName(index: number): string;
        /**
         * 获取运动组中的运动次数
         * @param groupName 运动组的名称
         * @return 运动组数量
         */
        abstract getMotionCount(groupName: string): number;
        /**
         * 从组名和索引值中获取动作文件名
         * @param groupName 运动组的名称
         * @param index     数组索引值
         * @return 动画文件的名称
         */
        abstract getMotionFileName(groupName: string, index: number): string;
        /**
         * 获取与动作对应的声音文件的名称
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 声音文件的名称
         */
        abstract getMotionSoundFileName(groupName: string, index: number): string;
        /**
         * 在动作开始时获得淡入处理时间
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 淡入处理时间[秒]
         */
        abstract getMotionFadeInTimeValue(groupName: string, index: number): number;
        /**
         * 在运动结束时获得淡出处理时间
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 淡出处理时间[秒]
         */
        abstract getMotionFadeOutTimeValue(groupName: string, index: number): number;
        /**
         * 获取用户数据文件名
         * @return 用户数据文件名
         */
        abstract getUserDataFile(): string;
        /**
         * 获取布局信息
         * @param outLayoutMap csmMap类实例
         * @return true 存在布局信息
         * @return false 布局信息不存在
         */
        abstract getLayoutMap(outLayoutMap: csmMap<string, number>): boolean;
        /**
         * 获取与眼贴相关的参数数量
         * @return 与眼贴相关的参数数量
         */
        abstract getEyeBlinkParameterCount(): number;
        /**
         * 获取与眼贴相关的参数的ID
         * @param index 数组索引值
         * @return 参数ID
         */
        abstract getEyeBlinkParameterId(index: number): CubismIdHandle;
        /**
         * 获取与唇形同步相关的参数数量
         * @return 与唇形同步相关的参数数量
         */
        abstract getLipSyncParameterCount(): number;
        /**
         * 获取与唇形同步相关的参数id
         * @param index 数组索引值
         * @return 参数ID
         */
        abstract getLipSyncParameterId(index: number): CubismIdHandle;
    }
}
