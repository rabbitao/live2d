import { Live2DCubismFramework as cubismmotionmanager } from '../motion/cubismmotionmanager';
import { Live2DCubismFramework as cubismtargetpoint } from '../math/cubismtargetpoint';
import { Live2DCubismFramework as cubismmodelmatrix } from '../math/cubismmodelmatrix';
import { Live2DCubismFramework as cubismmoc } from './cubismmoc';
import { Live2DCubismFramework as cubismmodel } from './cubismmodel';
import { Live2DCubismFramework as acubismmotion } from '../motion/acubismmotion';
import { Live2DCubismFramework as cubismpose } from '../effect/cubismpose';
import { Live2DCubismFramework as cubismmodeluserdata } from './cubismmodeluserdata';
import { Live2DCubismFramework as cubismphysics } from '../physics/cubismphysics';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as userMotionParam } from '../type/userMotionParam';
import { Live2DCubismFramework as cubismmotionqueuemanager } from '../motion/cubismmotionqueuemanager';
import { Live2DCubismFramework as cubismbreath } from '../effect/cubismbreath';
import { Live2DCubismFramework as cubismeyeblink } from '../effect/cubismeyeblink';
import { Live2DCubismFramework as cubismrenderer_webgl } from '../rendering/cubismrenderer_WebGL';
import CubismRenderer_WebGL = cubismrenderer_webgl.CubismRenderer_WebGL;
import CubismEyeBlink = cubismeyeblink.CubismEyeBlink;
import CubismBreath = cubismbreath.CubismBreath;
import CubismMotionQueueManager = cubismmotionqueuemanager.CubismMotionQueueManager;
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismPhysics = cubismphysics.CubismPhysics;
import CubismModelUserData = cubismmodeluserdata.CubismModelUserData;
import CubismPose = cubismpose.CubismPose;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismModel = cubismmodel.CubismModel;
import CubismMoc = cubismmoc.CubismMoc;
import CubismModelMatrix = cubismmodelmatrix.CubismModelMatrix;
import CubismTargetPoint = cubismtargetpoint.CubismTargetPoint;
import CubismMotionManager = cubismmotionmanager.CubismMotionManager;
import CubismMotionParam = userMotionParam.CubismMotionParam;
export declare namespace Live2DCubismFramework {
    /**
     * 用户实际使用的模型
     *
     * 用户实际使用的模型的基类。 这是由用户继承和实现的。
     */
    class CubismUserModel {
        /**
         * 事件回调
         *
         * 回调以在CubismMotionQueueManager中注册事件。
         * 调用EventFired，CubismUserModel的继承目的地。
         *
         * @param caller 管理已触发事件的运动管理器，以进行比较
         * @param eventValue 已触发事件的字符串数据
         * @param customData 假设一个实例继承了CubismUserModel
         */
        static cubismDefaultMotionEventCallback(caller: CubismMotionQueueManager, eventValue: csmString, customData: CubismUserModel): void;
        _modelName: string;
        _motionIdleName: string;
        protected _moc: CubismMoc;
        protected _model: CubismModel;
        protected _modelClear: boolean;
        protected _motionManager: CubismMotionManager;
        protected _motionQueue: CubismMotionParam[];
        protected _expressionManager: CubismMotionManager;
        protected _eyeBlink: CubismEyeBlink;
        protected _breath: CubismBreath;
        protected _modelMatrix: CubismModelMatrix;
        protected _pose: CubismPose;
        protected _dragManager: CubismTargetPoint;
        protected _physics: CubismPhysics;
        protected _modelUserData: CubismModelUserData;
        protected _initialized: boolean;
        protected _updating: boolean;
        protected _opacity: number;
        protected _lipsync: boolean;
        protected _lastLipSyncValue: number;
        protected _lipsyncTrend: string;
        protected _dragX: number;
        protected _dragY: number;
        protected _accelerationX: number;
        protected _accelerationY: number;
        protected _accelerationZ: number;
        private _renderer;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 获取初始化状态
         *
         * 它被初始化了吗？
         *
         * @return true     已初始化
         * @return false    未初始化
         */
        isInitialized(): boolean;
        /**
         * 设置初始化状态
         *
         * 设置初始化状态
         *
         * @param v 初始化状态
         */
        setInitialized(v: boolean): void;
        /**
         * 获取更新状态
         *
         * 它更新了吗？
         *
         * @return true     已更新
         * @return false    未更新
         */
        isUpdating(): boolean;
        /**
         * 设置更新状态
         *
         * 设置更新状态
         *
         * @param v 更新状态
         */
        setUpdating(v: boolean): void;
        /**
         * 鼠标拖动信息设置
         * @param 拖动光标的X位置
         * @param 拖动光标的Y位置
         */
        setDragging(x: number, y: number): void;
        /**
         * 设置加速度信息
         * @param x X轴加速度
         * @param y Y轴加速度
         * @param z Z轴加速度
         */
        setAcceleration(x: number, y: number, z: number): void;
        /**
         * 获取模型矩阵
         * @return 模型矩阵
         */
        getModelMatrix(): CubismModelMatrix;
        /**
         * 设置不透明度
         * @param a 不透明度
         */
        setOpacity(a: number): void;
        /**
         * 获得不透明度
         * @return 不透明度
         */
        getOpacity(): number;
        /**
         * 加载模型数据
         *
         * @param buffer    读取moc3文件的缓冲区
         */
        loadModel(buffer: ArrayBuffer): void;
        /**
         * 加载运动数据
         * @param buffer 读取motion3.json文件的缓冲区
         * @param size 缓冲区大小
         * @param name 动议的名称
         * @return 运动课
         */
        loadMotion(buffer: ArrayBuffer, size: number, name: string, priority: number): ACubismMotion;
        /**
         * 加载面部表情数据
         * @param buffer 读取exp文件的缓冲区
         * @param size 缓冲区大小
         * @param name 面部表情名称
         */
        loadExpression(buffer: ArrayBuffer, size: number, name: string): ACubismMotion;
        /**
         * 读取pose数据
         * @param buffer 加载pose3.json的缓冲区
         * @param size 缓冲区大小
         */
        loadPose(buffer: ArrayBuffer, size: number): void;
        /**
         * 加载附加到模型的用户数据
         * @param buffer 读取userdata3.json的缓冲区
         * @param size 缓冲区大小
         */
        loadUserData(buffer: ArrayBuffer, size: number): void;
        /**
         * 读物理数据
         * @param buffer  加载physics3.json的缓冲区
         * @param size    缓冲区大小
         */
        loadPhysics(buffer: ArrayBuffer, size: number): void;
        /**
         * 得到命中判断
         * @param drawableId 要验证的Drawable的ID
         * @param pointX X位置
         * @param pointY Y位置
         * @return true 它已被打
         * @return false 没打
         */
        isHit(drawableId: CubismIdHandle, pointX: number, pointY: number): boolean;
        /**
         * 获得模型
         * @return 模型
         */
        getModel(): CubismModel;
        /**
         * 获取渲染器
         * @return 渲染器
         */
        getRenderer(): CubismRenderer_WebGL;
        /**
         * 创建渲染器并执行初始化
         */
        createRenderer(): void;
        /**
         * 渲染器释放
         */
        deleteRenderer(): void;
        /**
         * 事件发射时的标准处理
         *
         * 在播放处理期间发生事件时的处理。
         * 假设它被继承覆盖。
         * 如果未覆盖则记录输出。
         *
         * @param eventValue 已触发事件的字符串数据
         */
        motionEventFired(eventValue: csmString): void;
        /**
         * 处理等同于析构函数
         */
        release(): void;
    }
}
