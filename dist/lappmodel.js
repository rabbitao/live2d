/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Live2DCubismFramework as live2dcubismframework } from './framework/live2dcubismframework';
import { Live2DCubismFramework as cubismusermodel } from './framework/model/cubismusermodel';
import { Live2DCubismFramework as cubismmodelsettingjson } from './framework/cubismmodelsettingjson';
import { Live2DCubismFramework as cubismdefaultparameterid } from './framework/cubismdefaultparameterid';
import { Live2DCubismFramework as acubismmotion } from './framework/motion/acubismmotion';
import { Live2DCubismFramework as cubismeyeblink } from './framework/effect/cubismeyeblink';
import { Live2DCubismFramework as cubismbreath } from './framework/effect/cubismbreath';
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
import { Live2DCubismFramework as csmmap } from './framework/type/csmmap';
import { Live2DCubismFramework as cubismstring } from './framework/utils/cubismstring';
import { Live2DCubismFramework as cubismmotionqueuemanager } from './framework/motion/cubismmotionqueuemanager';
import { CubismLogInfo } from './framework/utils/cubismdebug';
var InvalidMotionQueueEntryHandleValue = cubismmotionqueuemanager.InvalidMotionQueueEntryHandleValue;
var CubismString = cubismstring.CubismString;
var csmMap = csmmap.csmMap;
var csmVector = csmvector.csmVector;
var CubismBreath = cubismbreath.CubismBreath;
var BreathParameterData = cubismbreath.BreathParameterData;
var CubismEyeBlink = cubismeyeblink.CubismEyeBlink;
var ACubismMotion = acubismmotion.ACubismMotion;
var CubismFramework = live2dcubismframework.CubismFramework;
var CubismUserModel = cubismusermodel.CubismUserModel;
var CubismModelSettingJson = cubismmodelsettingjson.CubismModelSettingJson;
var CubismDefaultParameterId = cubismdefaultparameterid;
import { LAppDefine } from './lappdefine';
import { LAppPal } from './lapppal';
import { gl, canvas, frameBuffer, LAppDelegate } from './lappdelegate';
import 'whatwg-fetch';
function createBuffer(path, callBack) {
    LAppPal.loadFileAsBytes(path, callBack);
}
function deleteBuffer(buffer, path) {
    if (path === void 0) { path = ''; }
    LAppPal.releaseBytes(buffer);
}
var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["LoadAssets"] = 0] = "LoadAssets";
    LoadStep[LoadStep["LoadModel"] = 1] = "LoadModel";
    LoadStep[LoadStep["WaitLoadModel"] = 2] = "WaitLoadModel";
    LoadStep[LoadStep["LoadExpression"] = 3] = "LoadExpression";
    LoadStep[LoadStep["WaitLoadExpression"] = 4] = "WaitLoadExpression";
    LoadStep[LoadStep["LoadPhysics"] = 5] = "LoadPhysics";
    LoadStep[LoadStep["WaitLoadPhysics"] = 6] = "WaitLoadPhysics";
    LoadStep[LoadStep["LoadPose"] = 7] = "LoadPose";
    LoadStep[LoadStep["WaitLoadPose"] = 8] = "WaitLoadPose";
    LoadStep[LoadStep["SetupEyeBlink"] = 9] = "SetupEyeBlink";
    LoadStep[LoadStep["SetupBreath"] = 10] = "SetupBreath";
    LoadStep[LoadStep["LoadUserData"] = 11] = "LoadUserData";
    LoadStep[LoadStep["WaitLoadUserData"] = 12] = "WaitLoadUserData";
    LoadStep[LoadStep["SetupEyeBlinkIds"] = 13] = "SetupEyeBlinkIds";
    LoadStep[LoadStep["SetupLipSyncIds"] = 14] = "SetupLipSyncIds";
    LoadStep[LoadStep["SetupLayout"] = 15] = "SetupLayout";
    LoadStep[LoadStep["LoadMotion"] = 16] = "LoadMotion";
    LoadStep[LoadStep["WaitLoadMotion"] = 17] = "WaitLoadMotion";
    LoadStep[LoadStep["CompleteInitialize"] = 18] = "CompleteInitialize";
    LoadStep[LoadStep["CompleteSetupModel"] = 19] = "CompleteSetupModel";
    LoadStep[LoadStep["LoadTexture"] = 20] = "LoadTexture";
    LoadStep[LoadStep["WaitLoadTexture"] = 21] = "WaitLoadTexture";
    LoadStep[LoadStep["CompleteSetup"] = 22] = "CompleteSetup";
})(LoadStep || (LoadStep = {}));
/**
 * 用户实际使用的模型的实现类<br>
 * 调用模型生成，功能组件生成，更新处理和呈现。
 */
var LAppModel = /** @class */ (function (_super) {
    __extends(LAppModel, _super);
    /**
     * 构造函数
     */
    function LAppModel(resource) {
        var _this = _super.call(this) || this;
        _this._modelResource = resource;
        _this._modelSetting = null;
        _this._modelHomeDir = null;
        _this._userTimeSeconds = 0.0;
        _this._eyeBlinkIds = new csmVector();
        _this._lipSyncIds = new csmVector();
        _this._motions = new csmMap();
        _this._expressions = new csmMap();
        _this._hitArea = new csmVector();
        _this._userArea = new csmVector();
        _this._idParamAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleX);
        _this._idParamAngleY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleY);
        _this._idParamAngleZ = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleZ);
        _this._idParamEyeBallX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallX);
        _this._idParamEyeBallY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallY);
        _this._idParamBodyAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBodyAngleX);
        _this._state = LoadStep.LoadAssets;
        _this._expressionCount = 0;
        _this._textureCount = 0;
        _this._motionCount = 0;
        _this._allMotionCount = 0;
        _this._mouseOpen = false;
        _this._autoIdle = true;
        _this._modelTextures = [];
        return _this;
    }
    /**
     * model3.json从目录和文件路径生成模型
     * @param dir
     * @param fileName
     */
    LAppModel.prototype.loadAssets = function (dir, fileName, modelName, textures) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._modelHomeDir = dir;
            _this._modelName = modelName;
            _this._modelTextures = textures || [];
            var path = dir + fileName;
            fetch(path).then(function (response) {
                return response.arrayBuffer();
            }).then(function (arrayBuffer) {
                var buffer = arrayBuffer;
                var size = buffer.byteLength;
                var setting = new CubismModelSettingJson(buffer, size);
                // 更新状态
                _this._state = LoadStep.LoadModel;
                // 保存结果
                _this.setupModel(setting).then(function () {
                    resolve(true);
                }).catch(function () {
                    reject();
                });
            });
        });
    };
    /**
     * 重建渲染器
     */
    LAppModel.prototype.reloadRenderer = function () {
        this.deleteRenderer();
        this.createRenderer();
        this.setupTextures();
    };
    /**
     * 更新
     */
    LAppModel.prototype.update = function () {
        if (this._state != LoadStep.CompleteSetup || this._modelClear) {
            return;
        }
        var deltaTimeSeconds = LAppPal.getDeltaTime();
        this._userTimeSeconds += deltaTimeSeconds;
        this._dragManager.update(deltaTimeSeconds);
        this._dragX = this._dragManager.getX();
        this._dragY = this._dragManager.getY();
        // 参数是否通过动作更新
        var motionUpdated = false;
        // --------------------------------------------------------------------------
        this._model.loadParameters(); // 加载上次保存的状态
        if (this._motionManager.isFinished() && this._autoIdle) {
            // 如果没有动作播放，则从待机动作中随机播放
            this.startRandomMotion(this._motionIdleName, LAppDefine.PriorityIdle);
        }
        else {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds); // 更新动作
        }
        this._model.saveParameters(); // 状態保存
        // --------------------------------------------------------------------------
        // 眨眼
        if (!motionUpdated) {
            if (this._eyeBlink != null) {
                // 没有主动作更新时
                this._eyeBlink.updateParameters(this._model, deltaTimeSeconds); // 眼贴
            }
        }
        if (this._expressionManager != null) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds); // 带表达式的参数更新（相对更改）
        }
        // 拖动改变
        // 通过拖动调整面部方向
        this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30); // 添加-30到30之间的值
        this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
        this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);
        // 通过拖动调整身体方向
        this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10); // 添加介于-10和10之间的值
        // 通过拖动调整眼睛方向
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX); // 添加介于-1和1之间的值
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);
        // 呼吸
        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }
        // 物理演算設定
        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }
        // 唇形同步设置
        if (this._lipsync && this._mouseOpen) {
            // const value: number = 0;  // 当实时执行唇形同步时，从系统获取音量并输入0到1之间的值
            // for (let i: number = 0; i < this._lipSyncIds.getSize(); ++i) {
            //   this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
            // }
            var value = this._lastLipSyncValue;
            var trend = this._lipsyncTrend;
            for (var i = 0; i < this._lipSyncIds.getSize(); ++i) {
                if (trend === 'increase') {
                    value = value + 0.05;
                    if (value >= 1) {
                        value = 1;
                        this._lipsyncTrend = 'reduce';
                    }
                }
                else {
                    value = value - 0.05;
                    if (value <= 0) {
                        value = 0;
                        this._lipsyncTrend = 'increase';
                    }
                }
                this._lastLipSyncValue = value;
                this._model.addParameterValueById(this._lipSyncIds.at(i), value, 1);
            }
        }
        // 姿势设置
        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }
        this._model.update();
    };
    /**
     * 开始播放参数指定的动作
     * @param group 运动组名称
     * @param no 组内的数字
     * @param priority 优先级
     * @return 返回已启动的运动的标识号。 用于isFinished（）的参数，用于确定单个动作是否已结束。 无法启动时返回[-1]
     */
    LAppModel.prototype.startMotion = function (motionParams) {
        var _this = this;
        if (motionParams === void 0) { motionParams = { groupName: '', no: 0, priority: 2 }; }
        this._modelClear = false;
        motionParams.no = motionParams.no || 0;
        motionParams.priority = motionParams.priority || 2;
        if (Object.prototype.toString.call(motionParams.autoIdle) === '[object Boolean]') {
            this._autoIdle = motionParams.autoIdle;
        }
        if (motionParams.priority == LAppDefine.PriorityForce) {
            this._motionManager.setReservePriority(motionParams.priority);
        }
        else if (!this._motionManager.reserveMotion(motionParams.priority)) {
            if (this._debugMode) {
                LAppPal.printLog('[APP]can\'t start motion.');
            }
            return new Promise(function (reslove, reject) {
                reject(new Error('[APP]can\'t start motion. code: ' + InvalidMotionQueueEntryHandleValue));
            });
        }
        var fileName = this._modelSetting.getMotionFileName(motionParams.groupName, motionParams.no);
        // ex) idle_0
        var name = CubismString.getFormatedString('{0}_{1}', motionParams.groupName, motionParams.no);
        var motion = this._motions.getValue(name);
        var autoDelete = false;
        if (motion == null) {
            var path_1 = fileName;
            path_1 = this._modelHomeDir + path_1;
            fetch(path_1).then(function (response) {
                return response.arrayBuffer();
            }).then(function (arrayBuffer) {
                var buffer = arrayBuffer;
                var size = buffer.byteLength;
                motion = _this.loadMotion(buffer, size, null);
                var fadeTime = motionParams.fadeInTime || _this._modelSetting.getMotionFadeInTimeValue(motionParams.groupName, motionParams.no);
                if (fadeTime >= 0.0) {
                    motion.setFadeInTime(fadeTime);
                }
                fadeTime = motionParams.fadeOutTime || _this._modelSetting.getMotionFadeOutTimeValue(motionParams.groupName, motionParams.no);
                if (fadeTime >= 0.0) {
                    motion.setFadeOutTime(fadeTime);
                }
                motion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                autoDelete = true; // 完成后从内存中删除
                deleteBuffer(buffer, path_1);
            });
        }
        if (this._debugMode) {
            LAppPal.printLog('[APP]start motion: [{0}_{1}', motionParams.groupName, motionParams.no);
        }
        if (motion == null) {
            return new Promise(function (reslove, reject) {
                reject(new Error('没有可执行的motion'));
            });
        }
        return this._motionManager.startMotionPriority(motion, autoDelete, motionParams.priority, this, motionParams.callback);
    };
    /**
     * 开始播放随机选择的动作。
     * @param group 运动组名称
     * @param priority 优先级
     * @return 返回已启动的运动的标识号。 用于isFinished（）的参数，用于确定单个动作是否已结束。 当你无法开始时返回[-1]
     */
    LAppModel.prototype.startRandomMotion = function (group, priority) {
        if (this._modelSetting.getMotionCount(group) == 0) {
            return InvalidMotionQueueEntryHandleValue;
        }
        priority = priority || 2;
        var no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        return this.startMotion({ groupName: group, no: no, priority: priority });
    };
    /**
     * 执行一组动作。
     */
    LAppModel.prototype.startMotionQueue = function (motions, clear) {
        var _this = this;
        if (clear === void 0) { clear = false; }
        return new Promise(function (resolve) {
            if (clear) {
                _this._motionQueue = [];
                _this._motionQueue = motions;
            }
            else {
                _this._motionQueue = _this._motionQueue.concat(motions);
            }
            _this.executeMotionQueue();
            var timer = 0;
            timer = window.setInterval(function () {
                if (_this._motionQueue.length === 0) {
                    resolve(_this);
                    window.clearInterval(timer);
                    timer = null;
                }
            }, 50);
        });
    };
    /**
     * 停止所有动作 清除动作队列 已执行的动作如果有回调函数依旧会执行.
     * @Param clear 是否清除画布内容
     */
    LAppModel.prototype.stopAllMotions = function (clear) {
        this._motionQueue = [];
        this._motionManager.stopAllMotions();
        if (clear) {
            this.clear();
        }
    };
    /**
    * 更改idle动作的名称.
    */
    LAppModel.prototype.replaceIdleMotion = function (groupName) {
        this._motionManager.stopAllMotions();
        this._motionIdleName = groupName;
        this.startRandomMotion(this._motionIdleName, LAppDefine.PriorityIdle);
    };
    /**
    * 嘴巴进行说话动作.
    */
    LAppModel.prototype.mouthOpen = function () {
        this._mouseOpen = true;
    };
    LAppModel.prototype.mouthClose = function () {
        this._mouseOpen = false;
    };
    /**
    * 眼睛注视某个坐标点. 坐标以模型原点为(0,0)点进行象限分布.
    */
    LAppModel.prototype.lookAt = function (pointX, pointY) {
        var rect = canvas.getBoundingClientRect();
        var posX = pointX - rect.left;
        var posY = pointY - rect.top;
        this._dragManager.set(posX, posY);
    };
    /**
     * 设置参数指定的面部表情运动
     *
     * @param expressionId 表达式动作ID
     */
    LAppModel.prototype.setExpression = function (expressionId) {
        var motion = this._expressions.getValue(expressionId);
        if (this._debugMode) {
            LAppPal.printLog('[APP]expression: [{0}]', expressionId);
        }
        if (motion != null) {
            this._expressionManager.startMotionPriority(motion, false, LAppDefine.PriorityForce, this);
        }
        else {
            if (this._debugMode) {
                LAppPal.printLog('[APP]expression[{0}] is null', expressionId);
            }
        }
    };
    /**
     * 设置随机选择的面部表情动作
     */
    LAppModel.prototype.setRandomExpression = function () {
        if (this._expressions.getSize() == 0) {
            return;
        }
        var no = Math.floor(Math.random() * this._expressions.getSize());
        for (var i = 0; i < this._expressions.getSize(); i++) {
            if (i == no) {
                var name_1 = this._expressions._keyValues[i].first;
                this.setExpression(name_1);
                return;
            }
        }
    };
    /**
     * 接收事件解雇
     */
    LAppModel.prototype.motionEventFired = function (eventValue) {
        CubismLogInfo('{0} is fired on LAppModel!!', eventValue.s);
    };
    /**
     * 打击判断测试
     * 从指定ID的顶点列表计算矩形，并确定坐标是否在矩形范围内。
     *
     * @param hitArenaName  用于测试命中判断的目标的ID
     * @param x             要判断的X坐标
     * @param y             要判断的Y坐标
     */
    LAppModel.prototype.hitTest = function (hitArenaName, x, y) {
        // 透明时没有命中判断。
        if (this._opacity < 1) {
            return false;
        }
        var count = this._modelSetting.getHitAreasCount();
        for (var i = 0; i < count; i++) {
            if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
                var drawId = this._modelSetting.getHitAreaId(i);
                return this.isHit(drawId, x, y);
            }
        }
        return false;
    };
    /**
     * 从组名称批量加载运动数据。
     * 运动数据的名称是从ModelSetting内部获得的。
     *
     * @param group 动作数据组名称
     */
    LAppModel.prototype.preLoadMotionGroup = function (group) {
        var _this = this;
        var _loop_1 = function (i) {
            // ex) idle_0
            var name_2 = CubismString.getFormatedString('{0}_{1}', group, i);
            var path = this_1._modelSetting.getMotionFileName(group, i);
            path = this_1._modelHomeDir + path;
            if (this_1._debugMode) {
                LAppPal.printLog('[APP]load motion: {0} => [{1}_{2}]', path, group, i);
            }
            fetch(path).then(function (response) {
                return response.arrayBuffer();
            }).then(function (arrayBuffer) {
                var buffer = arrayBuffer;
                var size = buffer.byteLength;
                var tmpMotion = _this.loadMotion(buffer, size, name_2);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeOutTime(fadeTime);
                }
                tmpMotion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                if (_this._motions.getValue(name_2) != null) {
                    ACubismMotion.delete(_this._motions.getValue(name_2));
                }
                _this._motions.setValue(name_2, tmpMotion);
                deleteBuffer(buffer, path);
                _this._motionCount++;
                if (_this._motionCount >= _this._allMotionCount) {
                    _this._state = LoadStep.LoadTexture;
                    // 停止所有动作
                    _this._motionManager.stopAllMotions();
                    _this._updating = false;
                    _this._initialized = true;
                    _this.createRenderer();
                    _this.setupTextures();
                    _this.getRenderer().startUp(gl);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._modelSetting.getMotionCount(group); i++) {
            _loop_1(i);
        }
    };
    /**
     * 显示模型。
     * @Param {pointX: number, pointY: number} 出现的坐标
     */
    LAppModel.prototype.appear = function (param) {
        if (param && param.pointY) {
            canvas.style.top = param.pointY + 'px';
        }
        if (param && param.pointX) {
            canvas.style.left = param.pointX + 'px';
        }
        if (param && param.zIndex) {
            canvas.style.zIndex = param.zIndex.toString();
        }
        this._modelClear = false;
    };
    /**
     * 隐藏模型。
     */
    LAppModel.prototype.disappear = function () {
        this._modelClear = true;
    };
    /**
     * 释放所有运动数据。
     */
    LAppModel.prototype.releaseMotions = function () {
        this._motions.clear();
    };
    /**
     * 释放所有面部表情数据。
     */
    LAppModel.prototype.releaseExpressions = function () {
        this._expressions.clear();
    };
    /**
     * 绘制模型的过程。 通过空间的View-Projection矩阵绘制模型。
     */
    LAppModel.prototype.doDraw = function () {
        if (this._model == null || this._modelClear) {
            return;
        }
        // 画布大小
        var viewport = [
            0,
            0,
            canvas.width,
            canvas.height,
        ];
        this.getRenderer().setRenderState(frameBuffer, viewport);
        this.getRenderer().drawModel();
    };
    /**
     * 清除画布
     */
    LAppModel.prototype.clear = function () {
        this._modelClear = true;
        gl.clearColor(1, 1, 1, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    /**
     * 绘制模型的过程。 通过空间的View-Projection矩阵绘制模型。
     */
    LAppModel.prototype.draw = function (matrix) {
        if (this._model == null) {
            return;
        }
        // 每次阅读后
        if (this._state == LoadStep.CompleteSetup) {
            matrix.multiplyByMatrix(this._modelMatrix);
            this.getRenderer().setMvpMatrix(matrix);
            this.doDraw();
        }
    };
    /**
     * 执行一组动作。
     */
    LAppModel.prototype.executeMotionQueue = function () {
        var _this = this;
        if (this._motionQueue.length <= 0) {
            return;
        }
        this.startMotion(this._motionQueue[0]).then(function () {
            _this._motionQueue.shift();
            _this.executeMotionQueue();
        }).catch(function (e) {
            console.error('[APP]当前动作无效.', _this._motionQueue[0], e);
            _this._motionQueue.shift();
            _this.executeMotionQueue();
        });
    };
    /**
     * 从model3.json中生成模型
     * 根据model3.json的描述生成模型生成，运动和物理操作等组件。
     *
     * @param setting ICubismModelSetting的一个实例
     */
    LAppModel.prototype.setupModel = function (setting) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._updating = true;
            _this._initialized = false;
            _this._modelSetting = setting;
            var buffer;
            var size;
            // CubismModel
            if (_this._modelSetting.getModelFileName() != '') {
                var path_2 = _this._modelSetting.getModelFileName();
                path_2 = _this._modelHomeDir + path_2;
                fetch(path_2).then(function (response) {
                    return response.arrayBuffer();
                }).then(function (arrayBuffer) {
                    buffer = arrayBuffer;
                    _this.loadModel(buffer);
                    deleteBuffer(buffer, path_2);
                    _this._state = LoadStep.LoadExpression;
                    // callback
                    loadCubismExpression();
                });
                _this._state = LoadStep.WaitLoadModel;
            }
            else {
                LAppPal.printLog('Model data does not exist.');
                reject();
            }
            // Expression
            var loadCubismExpression = function () {
                if (_this._modelSetting.getExpressionCount() > 0) {
                    var count_1 = _this._modelSetting.getExpressionCount();
                    var _loop_2 = function (i) {
                        var name_3 = _this._modelSetting.getExpressionName(i);
                        var path = _this._modelSetting.getExpressionFileName(i);
                        path = _this._modelHomeDir + path;
                        fetch(path).then(function (response) {
                            return response.arrayBuffer();
                        }).then(function (arrayBuffer) {
                            var buffer = arrayBuffer;
                            var size = buffer.byteLength;
                            var motion = _this.loadExpression(buffer, size, name_3);
                            if (_this._expressions.getValue(name_3) != null) {
                                ACubismMotion.delete(_this._expressions.getValue(name_3));
                                _this._expressions.setValue(name_3, null);
                            }
                            _this._expressions.setValue(name_3, motion);
                            deleteBuffer(buffer, path);
                            _this._expressionCount++;
                            if (_this._expressionCount >= count_1) {
                                _this._state = LoadStep.LoadPhysics;
                                // callback
                                loadCubismPhysics();
                            }
                        });
                    };
                    for (var i = 0; i < count_1; i++) {
                        _loop_2(i);
                    }
                    _this._state = LoadStep.WaitLoadExpression;
                }
                else {
                    _this._state = LoadStep.LoadPhysics;
                    // callback
                    loadCubismPhysics();
                }
            };
            // Physics
            var loadCubismPhysics = function () {
                if (_this._modelSetting.getPhysicsFileName() != '') {
                    var path_3 = _this._modelSetting.getPhysicsFileName();
                    path_3 = _this._modelHomeDir + path_3;
                    fetch(path_3).then(function (response) {
                        return response.arrayBuffer();
                    }).then(function (arrayBuffer) {
                        var buffer = arrayBuffer;
                        var size = buffer.byteLength;
                        _this.loadPhysics(buffer, size);
                        deleteBuffer(buffer, path_3);
                        _this._state = LoadStep.LoadPose;
                        // callback
                        loadCubismPose();
                    });
                    _this._state = LoadStep.WaitLoadPhysics;
                }
                else {
                    _this._state = LoadStep.LoadPose;
                    // callback
                    loadCubismPose();
                }
            };
            // Pose
            var loadCubismPose = function () {
                if (_this._modelSetting.getPoseFileName() != '') {
                    var path_4 = _this._modelSetting.getPoseFileName();
                    path_4 = _this._modelHomeDir + path_4;
                    fetch(path_4).then(function (response) {
                        return response.arrayBuffer();
                    }).then(function (arrayBuffer) {
                        var buffer = arrayBuffer;
                        var size = buffer.byteLength;
                        _this.loadPose(buffer, size);
                        deleteBuffer(buffer, path_4);
                        _this._state = LoadStep.SetupEyeBlink;
                        // callback
                        setupEyeBlink();
                    });
                    _this._state = LoadStep.WaitLoadPose;
                }
                else {
                    _this._state = LoadStep.SetupEyeBlink;
                    // callback
                    setupEyeBlink();
                }
            };
            // EyeBlink
            var setupEyeBlink = function () {
                if (_this._modelSetting.getEyeBlinkParameterCount() > 0) {
                    _this._eyeBlink = CubismEyeBlink.create(_this._modelSetting);
                    _this._state = LoadStep.SetupBreath;
                }
                // callback
                setupBreath();
            };
            // Breath
            var setupBreath = function () {
                _this._breath = CubismBreath.create();
                var breathParameters = new csmVector();
                breathParameters.pushBack(new BreathParameterData(_this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
                breathParameters.pushBack(new BreathParameterData(_this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
                breathParameters.pushBack(new BreathParameterData(_this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
                breathParameters.pushBack(new BreathParameterData(_this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
                breathParameters.pushBack(new BreathParameterData(CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBreath), 0.0, 0.5, 3.2345, 0.5));
                _this._breath.setParameters(breathParameters);
                _this._state = LoadStep.LoadUserData;
                // callback
                loadUserData();
            };
            // UserData
            var loadUserData = function () {
                if (_this._modelSetting.getUserDataFile() != '') {
                    var path_5 = _this._modelSetting.getUserDataFile();
                    path_5 = _this._modelHomeDir + path_5;
                    fetch(path_5).then(function (response) {
                        return response.arrayBuffer();
                    }).then(function (arrayBuffer) {
                        var buffer = arrayBuffer;
                        var size = buffer.byteLength;
                        _this.loadUserData(buffer, size);
                        deleteBuffer(buffer, path_5);
                        _this._state = LoadStep.SetupEyeBlinkIds;
                        // callback
                        setupEyeBlinkIds();
                    });
                    _this._state = LoadStep.WaitLoadUserData;
                }
                else {
                    _this._state = LoadStep.SetupEyeBlinkIds;
                    // callback
                    setupEyeBlinkIds();
                }
            };
            // EyeBlinkIds
            var setupEyeBlinkIds = function () {
                var eyeBlinkIdCount = _this._modelSetting.getEyeBlinkParameterCount();
                for (var i = 0; i < eyeBlinkIdCount; ++i) {
                    _this._eyeBlinkIds.pushBack(_this._modelSetting.getEyeBlinkParameterId(i));
                }
                _this._state = LoadStep.SetupLipSyncIds;
                // callback
                setupLipSyncIds();
            };
            // LipSyncIds
            var setupLipSyncIds = function () {
                var lipSyncIdCount = _this._modelSetting.getLipSyncParameterCount();
                for (var i = 0; i < lipSyncIdCount; ++i) {
                    _this._lipSyncIds.pushBack(_this._modelSetting.getLipSyncParameterId(i));
                }
                _this._state = LoadStep.SetupLayout;
                // callback
                setupLayout();
            };
            // Layout
            var setupLayout = function () {
                var layout = new csmMap();
                _this._modelSetting.getLayoutMap(layout);
                _this._modelMatrix.setupFromLayout(layout);
                _this._state = LoadStep.LoadMotion;
                // callback
                loadCubismMotion();
            };
            // Motion
            var loadCubismMotion = function () {
                _this._state = LoadStep.WaitLoadMotion;
                _this._model.saveParameters();
                _this._allMotionCount = 0;
                _this._motionCount = 0;
                var group = [];
                var motionGroupCount = _this._modelSetting.getMotionGroupCount();
                // 找出动作的总数
                for (var i = 0; i < motionGroupCount; i++) {
                    group[i] = _this._modelSetting.getMotionGroupName(i);
                    _this._allMotionCount += _this._modelSetting.getMotionCount(group[i]);
                }
                // 加载动作
                for (var i = 0; i < motionGroupCount; i++) {
                    _this.preLoadMotionGroup(group[i]);
                }
                // 没有动作的时候
                if (motionGroupCount == 0) {
                    _this._state = LoadStep.LoadTexture;
                    // 停止所有动作
                    _this._motionManager.stopAllMotions();
                    _this._updating = false;
                    _this._initialized = true;
                    _this.createRenderer();
                    _this.setupTextures();
                    _this.getRenderer().startUp(gl);
                }
                resolve(true);
            };
        });
    };
    /**
     * 将纹理加载到纹理单元中
     */
    LAppModel.prototype.setupTextures = function () {
        var _this = this;
        // Typescript使用premultipliedAlpha来改善iPhone上的alpha质量
        var usePremultiply = true;
        if (this._state == LoadStep.LoadTexture) {
            // 用于纹理阅读
            var textureCount_1 = this._modelSetting.getTextureCount();
            var _loop_3 = function (modelTextureNumber) {
                var modelTextureName = this_2._modelSetting.getTextureFileName(modelTextureNumber);
                // 如果纹理名称是空字符，请跳过加载/绑定过程
                if (modelTextureName == '') {
                    console.log('getTextureFileName null');
                    return "continue";
                }
                // 如果用户指定了纹理名称 则只加载用户指定的纹理
                if (this_2._modelTextures.length > 0) {
                    if (!this_2._modelTextures.includes(modelTextureName)) {
                        return "continue";
                    }
                }
                // 将纹理加载到WebGL纹理单元中
                var texturePath = modelTextureName;
                texturePath = this_2._modelHomeDir + texturePath;
                // 加载完成后调用的回调函数
                var onLoad = function (textureInfo) {
                    _this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
                    _this._textureCount++;
                    if (_this._textureCount >= textureCount_1) {
                        // 加载完成
                        _this._state = LoadStep.CompleteSetup;
                    }
                };
                // 阅读
                LAppDelegate.getInstance().getTextureManager().createTextureFromPngFile(texturePath, usePremultiply, onLoad);
                this_2.getRenderer().setIsPremultipliedAlpha(usePremultiply);
            };
            var this_2 = this;
            for (var modelTextureNumber = 0; modelTextureNumber < textureCount_1; modelTextureNumber++) {
                _loop_3(modelTextureNumber);
            }
            this._state = LoadStep.WaitLoadTexture;
        }
    };
    return LAppModel;
}(CubismUserModel));
export { LAppModel };
