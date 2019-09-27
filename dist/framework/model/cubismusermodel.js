/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as cubismmotionmanager } from '../motion/cubismmotionmanager';
import { Live2DCubismFramework as cubismtargetpoint } from '../math/cubismtargetpoint';
import { Live2DCubismFramework as cubismmodelmatrix } from '../math/cubismmodelmatrix';
import { Live2DCubismFramework as cubismmoc } from './cubismmoc';
import { Live2DCubismFramework as cubismmotion } from '../motion/cubismmotion';
import { Live2DCubismFramework as cubismexpressionmotion } from '../motion/cubismexpressionmotion';
import { Live2DCubismFramework as cubismpose } from '../effect/cubismpose';
import { Live2DCubismFramework as cubismmodeluserdata } from './cubismmodeluserdata';
import { Live2DCubismFramework as cubismphysics } from '../physics/cubismphysics';
import { Live2DCubismFramework as cubismbreath } from '../effect/cubismbreath';
import { Live2DCubismFramework as cubismeyeblink } from '../effect/cubismeyeblink';
import { Live2DCubismFramework as cubismrenderer_webgl } from '../rendering/cubismrenderer_WebGL';
import { CubismLogError, CubismLogInfo } from '../utils/cubismdebug';
var CubismRenderer_WebGL = cubismrenderer_webgl.CubismRenderer_WebGL;
var CubismEyeBlink = cubismeyeblink.CubismEyeBlink;
var CubismBreath = cubismbreath.CubismBreath;
var Constant = cubismframework.Constant;
var CubismPhysics = cubismphysics.CubismPhysics;
var CubismModelUserData = cubismmodeluserdata.CubismModelUserData;
var CubismPose = cubismpose.CubismPose;
var CubismExpressionMotion = cubismexpressionmotion.CubismExpressionMotion;
var CubismMotion = cubismmotion.CubismMotion;
var CubismMoc = cubismmoc.CubismMoc;
var CubismModelMatrix = cubismmodelmatrix.CubismModelMatrix;
var CubismTargetPoint = cubismtargetpoint.CubismTargetPoint;
var CubismMotionManager = cubismmotionmanager.CubismMotionManager;
import { LAppDefine } from '../../lappdefine';
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 用户实际使用的模型
     *
     * 用户实际使用的模型的基类。 这是由用户继承和实现的。
     */
    var CubismUserModel = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismUserModel() {
            // 初始化每个变量
            this._moc = null;
            this._model = null;
            this._motionManager = null;
            this._expressionManager = null;
            this._eyeBlink = null;
            this._breath = null;
            this._modelMatrix = null;
            this._pose = null;
            this._dragManager = null;
            this._physics = null;
            this._modelUserData = null;
            this._initialized = false;
            this._updating = false;
            this._opacity = 1.0;
            this._lipsync = true;
            this._lastLipSyncValue = 0.0;
            this._lipsyncTrend = 'increase';
            this._dragX = 0.0;
            this._dragY = 0.0;
            this._accelerationX = 0.0;
            this._accelerationY = 0.0;
            this._accelerationZ = 0.0;
            this._debugMode = false;
            this._renderer = null;
            this._motionQueue = [];
            this._motionIdleName = LAppDefine.MotionGroupIdle;
            this._modelClear = true;
            this._modelName = '';
            // 创建一个运动管理器
            this._motionManager = new CubismMotionManager();
            this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
            // 创建面部表情经理
            this._expressionManager = new CubismMotionManager();
            // 拖动动画
            this._dragManager = new CubismTargetPoint();
        }
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
        CubismUserModel.cubismDefaultMotionEventCallback = function (caller, eventValue, customData) {
            var model = customData;
            if (model != null) {
                model.motionEventFired(eventValue);
            }
        };
        /**
         * 获取初始化状态
         *
         * 它被初始化了吗？
         *
         * @return true     已初始化
         * @return false    未初始化
         */
        CubismUserModel.prototype.isInitialized = function () {
            return this._initialized;
        };
        /**
         * 设置初始化状态
         *
         * 设置初始化状态
         *
         * @param v 初始化状态
         */
        CubismUserModel.prototype.setInitialized = function (v) {
            this._initialized = v;
        };
        /**
         * 获取更新状态
         *
         * 它更新了吗？
         *
         * @return true     已更新
         * @return false    未更新
         */
        CubismUserModel.prototype.isUpdating = function () {
            return this._updating;
        };
        /**
         * 设置更新状态
         *
         * 设置更新状态
         *
         * @param v 更新状态
         */
        CubismUserModel.prototype.setUpdating = function (v) {
            this._updating = v;
        };
        /**
         * 鼠标拖动信息设置
         * @param 拖动光标的X位置
         * @param 拖动光标的Y位置
         */
        CubismUserModel.prototype.setDragging = function (x, y) {
            this._dragManager.set(x, y);
        };
        /**
         * 设置加速度信息
         * @param x X轴加速度
         * @param y Y轴加速度
         * @param z Z轴加速度
         */
        CubismUserModel.prototype.setAcceleration = function (x, y, z) {
            this._accelerationX = x;
            this._accelerationY = y;
            this._accelerationZ = z;
        };
        /**
         * 获取模型矩阵
         * @return 模型矩阵
         */
        CubismUserModel.prototype.getModelMatrix = function () {
            return this._modelMatrix;
        };
        /**
         * 设置不透明度
         * @param a 不透明度
         */
        CubismUserModel.prototype.setOpacity = function (a) {
            this._opacity = a;
        };
        /**
         * 获得不透明度
         * @return 不透明度
         */
        CubismUserModel.prototype.getOpacity = function () {
            return this._opacity;
        };
        /**
         * 加载模型数据
         *
         * @param buffer    读取moc3文件的缓冲区
         */
        CubismUserModel.prototype.loadModel = function (buffer) {
            this._moc = CubismMoc.create(buffer);
            this._model = this._moc.createModel();
            this._model.saveParameters();
            if ((this._moc == null) || (this._model == null)) {
                CubismLogError('Failed to CreateModel().');
                return;
            }
            this._modelMatrix = new CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
        };
        /**
         * 加载运动数据
         * @param buffer 读取motion3.json文件的缓冲区
         * @param size 缓冲区大小
         * @param name 动议的名称
         * @return 运动课
         */
        CubismUserModel.prototype.loadMotion = function (buffer, size, name, priority) {
            return CubismMotion.create(buffer, size, name, priority);
        };
        /**
         * 加载面部表情数据
         * @param buffer 读取exp文件的缓冲区
         * @param size 缓冲区大小
         * @param name 面部表情名称
         */
        CubismUserModel.prototype.loadExpression = function (buffer, size, name) {
            return CubismExpressionMotion.create(buffer, size);
        };
        /**
         * 读取pose数据
         * @param buffer 加载pose3.json的缓冲区
         * @param size 缓冲区大小
         */
        CubismUserModel.prototype.loadPose = function (buffer, size) {
            this._pose = CubismPose.create(buffer, size);
        };
        /**
         * 加载附加到模型的用户数据
         * @param buffer 读取userdata3.json的缓冲区
         * @param size 缓冲区大小
         */
        CubismUserModel.prototype.loadUserData = function (buffer, size) {
            this._modelUserData = CubismModelUserData.create(buffer, size);
        };
        /**
         * 读物理数据
         * @param buffer  加载physics3.json的缓冲区
         * @param size    缓冲区大小
         */
        CubismUserModel.prototype.loadPhysics = function (buffer, size) {
            this._physics = CubismPhysics.create(buffer, size);
        };
        /**
         * 得到命中判断
         * @param drawableId 要验证的Drawable的ID
         * @param pointX X位置
         * @param pointY Y位置
         * @return true 它已被打
         * @return false 没打
         */
        CubismUserModel.prototype.isHit = function (drawableId, pointX, pointY) {
            var drawIndex = this._model.getDrawableIndex(drawableId);
            if (drawIndex < 0) {
                return false; // 如果不存在则为false
            }
            var count = this._model.getDrawableVertexCount(drawIndex);
            var vertices = this._model.getDrawableVertices(drawIndex);
            var left = vertices[0];
            var right = vertices[0];
            var top = vertices[1];
            var bottom = vertices[1];
            for (var j = 1; j < count; ++j) {
                var x = vertices[Constant.vertexOffset + j * Constant.vertexStep];
                var y = vertices[Constant.vertexOffset + j * Constant.vertexStep + 1];
                if (x < left) {
                    left = x; // Min x
                }
                if (x > right) {
                    right = x; // Max x
                }
                if (y < top) {
                    top = y; // Min y
                }
                if (y > bottom) {
                    bottom = y; // Max y
                }
            }
            var tx = this._modelMatrix.invertTransformX(pointX);
            var ty = this._modelMatrix.invertTransformY(pointY);
            return ((left <= tx) && (tx <= right) && (top <= ty) && (ty <= bottom));
        };
        /**
         * 获得模型
         * @return 模型
         */
        CubismUserModel.prototype.getModel = function () {
            return this._model;
        };
        /**
         * 获取渲染器
         * @return 渲染器
         */
        CubismUserModel.prototype.getRenderer = function () {
            return this._renderer;
        };
        /**
         * 创建渲染器并执行初始化
         */
        CubismUserModel.prototype.createRenderer = function () {
            if (this._renderer) {
                this.deleteRenderer();
            }
            this._renderer = new CubismRenderer_WebGL();
            this._renderer.initialize(this._model);
        };
        /**
         * 渲染器释放
         */
        CubismUserModel.prototype.deleteRenderer = function () {
            if (this._renderer != null) {
                this._renderer.release();
                this._renderer = null;
            }
        };
        /**
         * 事件发射时的标准处理
         *
         * 在播放处理期间发生事件时的处理。
         * 假设它被继承覆盖。
         * 如果未覆盖则记录输出。
         *
         * @param eventValue 已触发事件的字符串数据
         */
        CubismUserModel.prototype.motionEventFired = function (eventValue) {
            CubismLogInfo('{0}', eventValue.s);
        };
        /**
         * 处理等同于析构函数
         */
        CubismUserModel.prototype.release = function () {
            if (this._motionManager != null) {
                this._motionManager.release();
                this._motionManager = null;
            }
            if (this._expressionManager != null) {
                this._expressionManager.release();
                this._expressionManager = null;
            }
            if (this._moc != null) {
                this._moc.deleteModel(this._model);
                this._moc.release();
                this._moc = null;
            }
            this._modelMatrix = null;
            CubismPose.delete(this._pose);
            CubismEyeBlink.delete(this._eyeBlink);
            CubismBreath.delete(this._breath);
            this._dragManager = null;
            CubismPhysics.delete(this._physics);
            CubismModelUserData.delete(this._modelUserData);
            this.deleteRenderer();
        };
        return CubismUserModel;
    }());
    Live2DCubismFramework.CubismUserModel = CubismUserModel;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
