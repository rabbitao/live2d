import { Live2DCubismFramework as cubismid } from './framework/id/cubismid';
import { Live2DCubismFramework as cubismusermodel } from './framework/model/cubismusermodel';
import { Live2DCubismFramework as icubismmodelsetting } from './framework/icubismmodelsetting';
import { Live2DCubismFramework as acubismmotion } from './framework/motion/acubismmotion';
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
import { Live2DCubismFramework as csmmap } from './framework/type/csmmap';
import { Live2DCubismFramework as cubismmatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as csmstring } from './framework/type/csmstring';
import { Live2DCubismFramework as csmrect } from './framework/type/csmrectf';
import { Live2DCubismFramework as userMotionParam } from './framework/type/userMotionParam';
import csmRect = csmrect.csmRect;
import csmString = csmstring.csmString;
import CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import csmMap = csmmap.csmMap;
import csmVector = csmvector.csmVector;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismUserModel = cubismusermodel.CubismUserModel;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
import CubismMotionParam = userMotionParam.CubismMotionParam;
/**
 * 用户实际使用的模型的实现类<br>
 * 调用模型生成，功能组件生成，更新处理和呈现。
 */
export declare class LAppModel extends CubismUserModel {
    _modelSetting: ICubismModelSetting;
    _modelHomeDir: string;
    _modelTextures: string[];
    _userTimeSeconds: number;
    _eyeBlinkIds: csmVector<CubismIdHandle>;
    _lipSyncIds: csmVector<CubismIdHandle>;
    _motions: csmMap<string, ACubismMotion>;
    _expressions: csmMap<string, ACubismMotion>;
    _hitArea: csmVector<csmRect>;
    _userArea: csmVector<csmRect>;
    _idParamAngleX: CubismIdHandle;
    _idParamAngleY: CubismIdHandle;
    _idParamAngleZ: CubismIdHandle;
    _idParamEyeBallX: CubismIdHandle;
    _idParamEyeBallY: CubismIdHandle;
    _idParamBodyAngleX: CubismIdHandle;
    _state: number;
    _expressionCount: number;
    _textureCount: number;
    _motionCount: number;
    _allMotionCount: number;
    _modelResource: {
        path: string;
        modelName: string;
    };
    _mouthOpen: boolean;
    _mouthSpeed: number;
    _mouthSpeedCal: number;
    _mouthParamY: Array<number>;
    _mouthOpenIndex: number;
    _autoIdle: boolean;
    /**
     * 构造函数
     */
    constructor(resource: {
        path: string;
        modelName: string;
    });
    /**
     * model3.json从目录和文件路径生成模型
     * @param dir
     * @param fileName
     */
    loadAssets(dir: string, fileName: string, modelName: string, textures?: string[]): Promise<boolean>;
    /**
     * 重建渲染器
     */
    reloadRenderer(): void;
    /**
     * 更新
     */
    update(): void;
    /**
     * 开始播放参数指定的动作
     * @param group 运动组名称
     * @param no 组内的数字
     * @param priority 优先级
     * @return 返回已启动的运动的标识号。 用于isFinished（）的参数，用于确定单个动作是否已结束。 无法启动时返回[-1]
     */
    startMotion(motionParams?: CubismMotionParam): Promise<CubismUserModel>;
    /**
     * 开始播放随机选择的动作。
     * @param group 运动组名称
     * @param priority 优先级
     * @return 返回已启动的运动的标识号。 用于isFinished（）的参数，用于确定单个动作是否已结束。 当你无法开始时返回[-1]
     */
    startRandomMotion(group: string, priority?: number): Promise<CubismUserModel>;
    /**
     * 执行一组动作。
     */
    startMotionQueue(motions: CubismMotionParam[], clear?: boolean): Promise<CubismUserModel>;
    /**
     * 停止所有动作 清除动作队列 已执行的动作如果有回调函数依旧会执行.
     * @Param clear 是否清除画布内容
     */
    stopAllMotions(clear: boolean): Promise<void>;
    /**
    * 更改idle动作的名称.
    */
    replaceIdleMotion(groupName: string, execImmediately?: boolean): void;
    /**
    * 嘴巴进行说话动作.
    */
    mouthOpen(speed: any): void;
    mouthClose(): void;
    /**
    * 眼睛注视某个坐标点. 坐标以模型原点为(0,0)点进行象限分布.
    */
    lookAt(pointX: number, pointY: number): void;
    /**
     * 设置参数指定的面部表情运动
     *
     * @param expressionId 表达式动作ID
     */
    setExpression(expressionId: string): void;
    /**
     * 设置随机选择的面部表情动作
     */
    setRandomExpression(): void;
    /**
     * 接收事件解雇
     */
    motionEventFired(eventValue: csmString): void;
    /**
     * 打击判断测试
     * 从指定ID的顶点列表计算矩形，并确定坐标是否在矩形范围内。
     *
     * @param hitArenaName  用于测试命中判断的目标的ID
     * @param x             要判断的X坐标
     * @param y             要判断的Y坐标
     */
    hitTest(hitArenaName: string, x: number, y: number): boolean;
    /**
     * 从组名称批量加载运动数据。
     * 运动数据的名称是从ModelSetting内部获得的。
     *
     * @param group 动作数据组名称
     */
    preLoadMotionGroup(group: string): void;
    /**
     * 显示模型。
     * @Param {pointX: number, pointY: number} 出现的坐标
     */
    appear(param: {
        pointX: number;
        pointY: number;
        zIndex?: number;
    }): void;
    /**
     * 隐藏模型。
     */
    disappear(): void;
    /**
     * 模型显示状态。
     */
    getVisible(): boolean;
    /**
     * 释放所有运动数据。
     */
    releaseMotions(): void;
    /**
     * 释放所有面部表情数据。
     */
    releaseExpressions(): void;
    /**
     * 绘制模型的过程。 通过空间的View-Projection矩阵绘制模型。
     */
    doDraw(): void;
    /**
     * 清除画布
     */
    clear(): void;
    /**
     * 绘制模型的过程。 通过空间的View-Projection矩阵绘制模型。
     */
    draw(matrix: CubismMatrix44): void;
    private fetchFile;
    /**
     * 执行一组动作。
     */
    private executeMotionQueue;
    /**
     * 从model3.json中生成模型
     * 根据model3.json的描述生成模型生成，运动和物理操作等组件。
     *
     * @param setting ICubismModelSetting的一个实例
     */
    private setupModel;
    /**
     * 将纹理加载到纹理单元中
     */
    private setupTextures;
}
