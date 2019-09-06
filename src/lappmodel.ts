/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import { Live2DCubismFramework as live2dcubismframework } from './framework/live2dcubismframework';
import { Live2DCubismFramework as cubismid } from './framework/id/cubismid';
import { Live2DCubismFramework as cubismusermodel } from './framework/model/cubismusermodel';
import { Live2DCubismFramework as icubismmodelsetting } from './framework/icubismmodelsetting';
import { Live2DCubismFramework as cubismmodelsettingjson } from './framework/cubismmodelsettingjson';
import { Live2DCubismFramework as cubismdefaultparameterid } from './framework/cubismdefaultparameterid';
import { Live2DCubismFramework as acubismmotion } from './framework/motion/acubismmotion';
import { Live2DCubismFramework as cubismeyeblink } from './framework/effect/cubismeyeblink';
import { Live2DCubismFramework as cubismbreath } from './framework/effect/cubismbreath';
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
import { Live2DCubismFramework as csmmap } from './framework/type/csmmap';
import { Live2DCubismFramework as cubismmatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as cubismstring } from './framework/utils/cubismstring';
import { Live2DCubismFramework as cubismmotion } from './framework/motion/cubismmotion';
import { Live2DCubismFramework as cubismmotionqueuemanager } from './framework/motion/cubismmotionqueuemanager';
import { Live2DCubismFramework as csmstring } from './framework/type/csmstring';
import { Live2DCubismFramework as csmrect } from './framework/type/csmrectf';
import { Live2DCubismFramework as userMotionParam } from './framework/type/userMotionParam';
import { CubismLogInfo } from './framework/utils/cubismdebug';
import csmRect = csmrect.csmRect;
import csmString = csmstring.csmString;
import InvalidMotionQueueEntryHandleValue = cubismmotionqueuemanager.InvalidMotionQueueEntryHandleValue;
import CubismMotionQueueEntryHandle = cubismmotionqueuemanager.CubismMotionQueueEntryHandle;
import CubismMotion = cubismmotion.CubismMotion;
import CubismString = cubismstring.CubismString;
import CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import csmMap = csmmap.csmMap;
import csmVector = csmvector.csmVector;
import CubismBreath = cubismbreath.CubismBreath;
import BreathParameterData = cubismbreath.BreathParameterData;
import CubismEyeBlink = cubismeyeblink.CubismEyeBlink;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismFramework = live2dcubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismUserModel = cubismusermodel.CubismUserModel;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
import CubismModelSettingJson = cubismmodelsettingjson.CubismModelSettingJson;
import CubismDefaultParameterId = cubismdefaultparameterid;
import CubismMotionParam = userMotionParam.CubismMotionParam;

import { LAppDefine } from './lappdefine';
import { LAppPal } from './lapppal';
import { gl, canvas, frameBuffer, LAppDelegate } from './lappdelegate';
import { TextureInfo } from './lapptexturemanager';
import { LAppView } from './lappview';
import 'whatwg-fetch';

function createBuffer(path: string, callBack: any): void {
  LAppPal.loadFileAsBytes(path, callBack);
}

function deleteBuffer(buffer: ArrayBuffer, path: string = '') {
  LAppPal.releaseBytes(buffer);
}

enum LoadStep {
  LoadAssets,
  LoadModel,
  WaitLoadModel,
  LoadExpression,
  WaitLoadExpression,
  LoadPhysics,
  WaitLoadPhysics,
  LoadPose,
  WaitLoadPose,
  SetupEyeBlink,
  SetupBreath,
  LoadUserData,
  WaitLoadUserData,
  SetupEyeBlinkIds,
  SetupLipSyncIds,
  SetupLayout,
  LoadMotion,
  WaitLoadMotion,
  CompleteInitialize,
  CompleteSetupModel,
  LoadTexture,
  WaitLoadTexture,
  CompleteSetup,
}

/**
 * 用户实际使用的模型的实现类<br>
 * 调用模型生成，功能组件生成，更新处理和呈现。
 */
export class LAppModel extends CubismUserModel {

  public _modelSetting: ICubismModelSetting;      // 模型设定信息
  public _modelHomeDir: string;      // 放置模型设置的目录
  public _modelTextures: string[];   // 用户指定的模型纹理
  public _userTimeSeconds: number;   // 增量时间的综合值[秒]

  public _eyeBlinkIds: csmVector<CubismIdHandle>;  // 模型中设置的闪烁功能的参数ID
  public _lipSyncIds: csmVector<CubismIdHandle>;   // 模型中设置的唇形同步功能的参数ID

  public _motions: csmMap<string, ACubismMotion>;        // 加载动作列表
  public _expressions: csmMap<string, ACubismMotion>;    // 加载的面部表情列表

  public _hitArea: csmVector<csmRect>;
  public _userArea: csmVector<csmRect>;

  public _idParamAngleX: CubismIdHandle;     // 参数ID: ParamAngleX
  public _idParamAngleY: CubismIdHandle;     // 参数ID: ParamAngleY
  public _idParamAngleZ: CubismIdHandle;     // 参数ID: ParamAngleZ
  public _idParamEyeBallX: CubismIdHandle;   // 参数ID: ParamEyeBallX
  public _idParamEyeBallY: CubismIdHandle;   // 参数ID: ParamEyeBAllY
  public _idParamBodyAngleX: CubismIdHandle; // 参数ID: ParamBodyAngleX

  public _state: number; // 用于当前状态管理
  public _expressionCount: number; // 面部数据计数
  public _textureCount: number;   // 纹理计数
  public _motionCount: number;   // 动作数据计数
  public _allMotionCount: number; // 动作总数
  public _modelResource: { path: string, modelName: string }; // 模型资源
  public _mouseOpen: boolean; // 是否张嘴


  /**
   * 构造函数
   */
  public constructor(resource: { path: string, modelName: string }) {
    super();
    this._modelResource = resource;
    this._modelSetting = null as any;
    this._modelHomeDir = null as any;
    this._userTimeSeconds = 0.0;

    this._eyeBlinkIds = new csmVector<CubismIdHandle>();
    this._lipSyncIds = new csmVector<CubismIdHandle>();

    this._motions = new csmMap<string, ACubismMotion>();
    this._expressions = new csmMap<string, ACubismMotion>();

    this._hitArea = new csmVector<csmRect>();
    this._userArea = new csmVector<csmRect>();

    this._idParamAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleX);
    this._idParamAngleY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleY);
    this._idParamAngleZ = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleZ);
    this._idParamEyeBallX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallX);
    this._idParamEyeBallY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallY);
    this._idParamBodyAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBodyAngleX);

    this._state = LoadStep.LoadAssets;
    this._expressionCount = 0;
    this._textureCount = 0;
    this._motionCount = 0;
    this._allMotionCount = 0;
    this._mouseOpen = false;
    this._modelTextures = [];
  }
  /**
   * model3.json从目录和文件路径生成模型
   * @param dir
   * @param fileName
   */
  public loadAssets(dir: string, fileName: string, modelName: string, textures?: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._modelHomeDir = dir;
      this._modelName = modelName;
      this._modelTextures = textures || [];
      const path: string = dir + fileName;
      fetch(path).then(
        (response) => {
          return response.arrayBuffer();
        },
      ).then(
        (arrayBuffer) => {
          const buffer: ArrayBuffer = arrayBuffer;
          const size = buffer.byteLength;
          const setting: ICubismModelSetting = new CubismModelSettingJson(buffer, size);

          // 更新状态
          this._state = LoadStep.LoadModel;

          // 保存结果
          this.setupModel(setting).then(() => {
            resolve(true);
          }).catch(() => {
            reject();
          });
        },
      );
    });
  }

  /**
   * 重建渲染器
   */
  public reloadRenderer(): void {
    this.deleteRenderer();
    this.createRenderer();
    this.setupTextures();
  }

  /**
   * 更新
   */
  public update(): void {
    if (this._state != LoadStep.CompleteSetup || this._modelClear) { return; }

    const deltaTimeSeconds: number = LAppPal.getDeltaTime();
    this._userTimeSeconds += deltaTimeSeconds;


    this._dragManager.update(deltaTimeSeconds);
    this._dragX = this._dragManager.getX();
    this._dragY = this._dragManager.getY();

    // 参数是否通过动作更新
    let motionUpdated = false;

    // --------------------------------------------------------------------------
    this._model.loadParameters();   // 加载上次保存的状态
    if (this._motionManager.isFinished()) {
      // 如果没有动作播放，则从待机动作中随机播放
      this.startRandomMotion(this._motionIdleName, LAppDefine.PriorityIdle);

    } else {
      motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);    // 更新动作
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
    this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30);  // 添加-30到30之间的值
    this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
    this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);

    // 通过拖动调整身体方向
    this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10);  // 添加介于-10和10之间的值

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
      let value: number = this._lastLipSyncValue;
      let trend = this._lipsyncTrend;
      for (let i: number = 0; i < this._lipSyncIds.getSize(); ++i) {
        if (trend === 'increase') {
          value = value + 0.05;
          if (value >= 1) {
            value = 1;
            this._lipsyncTrend = 'reduce';
          }
        } else {
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
  }

  /**
   * 开始播放参数指定的动作
   * @param group 运动组名称
   * @param no 组内的数字
   * @param priority 优先级
   * @return 返回已启动的运动的标识号。 用于isFinished（）的参数，用于确定单个动作是否已结束。 无法启动时返回[-1]
   */
  public startMotion(motionParams: CubismMotionParam = {groupName: '', no: 0, priority: 2}): Promise<CubismUserModel> {
    // this._modelClear = false;
    motionParams.no = motionParams.no || 0;
    motionParams.priority = motionParams.priority || 2;
    if (motionParams.priority == LAppDefine.PriorityForce) {
      this._motionManager.setReservePriority(motionParams.priority);
    } else if (!this._motionManager.reserveMotion(motionParams.priority)) {
      if (this._debugMode) {
        LAppPal.printLog('[APP]can\'t start motion.');
      }
      return new Promise<CubismUserModel>((reslove, reject) => {
        reject('[APP]can\'t start motion. code: ' + InvalidMotionQueueEntryHandleValue);
      });
    }

    const fileName: string = this._modelSetting.getMotionFileName(motionParams.groupName, motionParams.no);

    // ex) idle_0
    const name: string = CubismString.getFormatedString('{0}_{1}', motionParams.groupName, motionParams.no);
    let motion: CubismMotion = this._motions.getValue(name) as CubismMotion;
    let autoDelete: boolean = false;

    if (motion == null) {
      let path: string = fileName;
      path = this._modelHomeDir + path;

      fetch(path).then(
        (response) => {
          return response.arrayBuffer();
        },
      ).then(
        (arrayBuffer) => {
          const buffer: ArrayBuffer = arrayBuffer;
          const size = buffer.byteLength;

          motion = this.loadMotion(buffer, size, null as any) as CubismMotion;
          let fadeTime: number = motionParams.fadeInTime || this._modelSetting.getMotionFadeInTimeValue(motionParams.groupName, motionParams.no);

          if (fadeTime >= 0.0) {
            motion.setFadeInTime(fadeTime);
          }

          fadeTime = motionParams.fadeOutTime || this._modelSetting.getMotionFadeOutTimeValue(motionParams.groupName, motionParams.no);
          if (fadeTime >= 0.0) {
            motion.setFadeOutTime(fadeTime);
          }

          motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
          autoDelete = true;  // 完成后从内存中删除

          deleteBuffer(buffer, path);
        },
      );
    }

    if (this._debugMode) {
      LAppPal.printLog('[APP]start motion: [{0}_{1}', motionParams.groupName, motionParams.no);
    }
    if (motion == null) {
      return new Promise<CubismUserModel>((reslove, reject) => {
        reject('没有可执行的motion');
      });
    }
    return this._motionManager.startMotionPriority(motion, autoDelete, motionParams.priority, this, motionParams.callback);
  }

  /**
   * 开始播放随机选择的动作。
   * @param group 运动组名称
   * @param priority 优先级
   * @return 返回已启动的运动的标识号。 用于isFinished（）的参数，用于确定单个动作是否已结束。 当你无法开始时返回[-1]
   */
  public startRandomMotion(group: string, priority?: number): Promise<CubismUserModel> {
    if (this._modelSetting.getMotionCount(group) == 0) {
      return InvalidMotionQueueEntryHandleValue;
    }
    priority = priority || 2;
    const no: number = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));

    return this.startMotion({groupName: group, no, priority});
  }

  /**
   * 执行一组动作。
   */
  public startMotionQueue(motions: CubismMotionParam[], clear: boolean = false): Promise<CubismUserModel> {
    return new Promise((resolve) => {
      if (clear) {
        this._motionQueue = [];
        this._motionQueue = motions;
      } else {
        this._motionQueue = this._motionQueue.concat(motions);
      }
      this.executeMotionQueue();
      let timer: number | null = 0;
      timer = window.setInterval(() => {
        if (this._motionQueue.length === 0) {
          resolve(this);
          clearInterval(timer as number);
          timer = null;
        }
      }, 50);
    });
  }

  /**
   * 停止所有动作 清除动作队列 已执行的动作如果有回调函数依旧会执行.
   * @Param clear 是否清除画布内容
   */
  public stopAllMotions(clear: boolean) {
    this._motionQueue = [];
    this._motionManager.stopAllMotions();
    if (clear) {
      this.clear();
    }
  }

  /**
  * 更改idle动作的名称.
  */
  public replaceIdleMotion(groupName: string) {
    this._motionManager.stopAllMotions();
    this._motionIdleName = groupName;
    this.startRandomMotion(this._motionIdleName, LAppDefine.PriorityIdle);
  }

  /**
  * 嘴巴进行说话动作.
  */
  public mouthOpen() {
    this._mouseOpen = true;
  }

  public mouthClose() {
    this._mouseOpen = false;
  }

  /**
  * 眼睛注视某个坐标点. 坐标以模型原点为(0,0)点进行象限分布.
  */
  public lookAt(pointX: number, pointY: number) {

    const rect = canvas.getBoundingClientRect();
    const posX = pointX - rect.left;
    const posY = pointY - rect.top;
    this._dragManager.set(posX, posY);
  }

  /**
   * 设置参数指定的面部表情运动
   *
   * @param expressionId 表达式动作ID
   */
  public setExpression(expressionId: string): void {
    const motion: ACubismMotion = this._expressions.getValue(expressionId);

    if (this._debugMode) {
      LAppPal.printLog('[APP]expression: [{0}]', expressionId);
    }
    if (motion != null) {
      this._expressionManager.startMotionPriority(motion, false, LAppDefine.PriorityForce, this);
    } else {
      if (this._debugMode) {
        LAppPal.printLog('[APP]expression[{0}] is null', expressionId);
      }
    }
  }

  /**
   * 设置随机选择的面部表情动作
   */
  public setRandomExpression(): void {
    if (this._expressions.getSize() == 0) {
      return;
    }

    const no: number = Math.floor(Math.random() * this._expressions.getSize());

    for (let i: number = 0; i < this._expressions.getSize(); i++) {
      if (i == no) {
        const name: string = this._expressions._keyValues[i].first;
        this.setExpression(name);
        return;
      }
    }
  }

  /**
   * 接收事件解雇
   */
  public motionEventFired(eventValue: csmString): void {
    CubismLogInfo('{0} is fired on LAppModel!!', eventValue.s);
  }

  /**
   * 打击判断测试
   * 从指定ID的顶点列表计算矩形，并确定坐标是否在矩形范围内。
   *
   * @param hitArenaName  用于测试命中判断的目标的ID
   * @param x             要判断的X坐标
   * @param y             要判断的Y坐标
   */
  public hitTest(hitArenaName: string, x: number, y: number): boolean {
    // 透明时没有命中判断。
    if (this._opacity < 1) {
      return false;
    }

    const count: number = this._modelSetting.getHitAreasCount();
    for (let i: number = 0; i < count; i++) {
      if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
        const drawId: CubismIdHandle = this._modelSetting.getHitAreaId(i);
        return this.isHit(drawId, x, y);
      }
    }

    return false;
  }

  /**
   * 从组名称批量加载运动数据。
   * 运动数据的名称是从ModelSetting内部获得的。
   *
   * @param group 动作数据组名称
   */
  public preLoadMotionGroup(group: string): void {
    for (let i: number = 0; i < this._modelSetting.getMotionCount(group); i++) {
      // ex) idle_0
      const name: string = CubismString.getFormatedString('{0}_{1}', group, i);
      let path = this._modelSetting.getMotionFileName(group, i);
      path = this._modelHomeDir + path;

      if (this._debugMode) {
        LAppPal.printLog('[APP]load motion: {0} => [{1}_{2}]', path, group, i);
      }

      fetch(path).then(
        (response) => {
          return response.arrayBuffer();
        },
      ).then(
        (arrayBuffer) => {
          const buffer: ArrayBuffer = arrayBuffer;
          const size = buffer.byteLength;

          const tmpMotion: CubismMotion = this.loadMotion(buffer, size, name) as CubismMotion;

          let fadeTime = this._modelSetting.getMotionFadeInTimeValue(group, i);
          if (fadeTime >= 0.0) {
            tmpMotion.setFadeInTime(fadeTime);
          }

          fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, i);
          if (fadeTime >= 0.0) {
            tmpMotion.setFadeOutTime(fadeTime);
          }
          tmpMotion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);

          if (this._motions.getValue(name) != null) {
            ACubismMotion.delete(this._motions.getValue(name));
          }

          this._motions.setValue(name, tmpMotion);

          deleteBuffer(buffer, path);

          this._motionCount++;
          if (this._motionCount >= this._allMotionCount) {
            this._state = LoadStep.LoadTexture;

            // 停止所有动作
            this._motionManager.stopAllMotions();

            this._updating = false;
            this._initialized = true;

            this.createRenderer();
            this.setupTextures();
            this.getRenderer().startUp(gl);
          }
        },
      );
    }
  }

  /**
   * 显示模型。
   * @Param {pointX: number, pointY: number} 出现的坐标
   */
  public appear(param: { pointX: number, pointY: number, zIndex?: number}): void {
    if (param.pointY) {
      canvas.style.top = param.pointY + 'px';
    }
    if (param.pointX) {
      canvas.style.left = param.pointX + 'px';
    }
    if (param.zIndex) {
      canvas.style.zIndex = param.zIndex.toString();
    }

    this._modelClear = false;
  }

  /**
   * 隐藏模型。
   */
  public disappear(): void {
    this._modelClear = true;
  }

  /**
   * 释放所有运动数据。
   */
  public releaseMotions(): void {
    this._motions.clear();
  }

  /**
   * 释放所有面部表情数据。
   */
  public releaseExpressions(): void {
    this._expressions.clear();
  }

  /**
   * 绘制模型的过程。 通过空间的View-Projection矩阵绘制模型。
   */
  public doDraw(): void {
    if (this._model == null || this._modelClear) { return; }

    // 画布大小
    const viewport: number[] = [
      0,
      0,
      canvas.width,
      canvas.height,
    ];

    this.getRenderer().setRenderState(frameBuffer, viewport);
    this.getRenderer().drawModel();
  }

  /**
   * 清除画布
   */
  public clear() {
    this._modelClear = true;
    gl.clearColor(1, 1, 1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  /**
   * 绘制模型的过程。 通过空间的View-Projection矩阵绘制模型。
   */
  public draw(matrix: CubismMatrix44): void {
    if (this._model == null) {
      return;
    }

    // 每次阅读后
    if (this._state == LoadStep.CompleteSetup) {
      matrix.multiplyByMatrix(this._modelMatrix);

      this.getRenderer().setMvpMatrix(matrix);

      this.doDraw();
    }
  }
  /**
   * 执行一组动作。
   */
  private executeMotionQueue() {
    if (this._motionQueue.length <= 0) {
      return;
    }

    this.startMotion(this._motionQueue[0]).then(() => {
      this._motionQueue.shift();
      this.executeMotionQueue();
    });
  }

  /**
   * 从model3.json中生成模型
   * 根据model3.json的描述生成模型生成，运动和物理操作等组件。
   *
   * @param setting ICubismModelSetting的一个实例
   */
  private setupModel(setting: ICubismModelSetting): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._updating = true;
      this._initialized = false;

      this._modelSetting = setting;

      let buffer: ArrayBuffer;
      let size: number;

      // CubismModel
      if (this._modelSetting.getModelFileName() != '') {
        let path: string = this._modelSetting.getModelFileName();
        path = this._modelHomeDir + path;

        fetch(path).then(
          (response) => {
            return response.arrayBuffer();
          },
        ).then(
          (arrayBuffer) => {
            buffer = arrayBuffer;
            this.loadModel(buffer);
            deleteBuffer(buffer, path);
            this._state = LoadStep.LoadExpression;

            // callback
            loadCubismExpression();
          },
        );

        this._state = LoadStep.WaitLoadModel;
      } else {
        LAppPal.printLog('Model data does not exist.');
        reject();
      }

      // Expression
      const loadCubismExpression = () => {
        if (this._modelSetting.getExpressionCount() > 0) {
          const count: number = this._modelSetting.getExpressionCount();

          for (let i: number = 0; i < count; i++) {
            const name: string = this._modelSetting.getExpressionName(i);
            let path: string = this._modelSetting.getExpressionFileName(i);
            path = this._modelHomeDir + path;

            fetch(path).then(
              (response) => {
                return response.arrayBuffer();
              },
            ).then(
              (arrayBuffer) => {
                const buffer: ArrayBuffer = arrayBuffer;
                const size: number = buffer.byteLength;

                const motion: ACubismMotion = this.loadExpression(buffer, size, name);

                if (this._expressions.getValue(name) != null) {
                  ACubismMotion.delete(this._expressions.getValue(name));
                  this._expressions.setValue(name, null as any);
                }

                this._expressions.setValue(name, motion);

                deleteBuffer(buffer, path);

                this._expressionCount++;

                if (this._expressionCount >= count) {
                  this._state = LoadStep.LoadPhysics;

                  // callback
                  loadCubismPhysics();
                }
              },
            );
          }
          this._state = LoadStep.WaitLoadExpression;
        } else {
          this._state = LoadStep.LoadPhysics;

          // callback
          loadCubismPhysics();
        }
      };

      // Physics
      const loadCubismPhysics = () => {
        if (this._modelSetting.getPhysicsFileName() != '') {
          let path: string = this._modelSetting.getPhysicsFileName();
          path = this._modelHomeDir + path;

          fetch(path).then(
            (response) => {
              return response.arrayBuffer();
            },
          ).then(
            (arrayBuffer) => {
              const buffer: ArrayBuffer = arrayBuffer;
              const size: number = buffer.byteLength;

              this.loadPhysics(buffer, size);
              deleteBuffer(buffer, path);

              this._state = LoadStep.LoadPose;

              // callback
              loadCubismPose();
            },
          );
          this._state = LoadStep.WaitLoadPhysics;
        } else {
          this._state = LoadStep.LoadPose;

          // callback
          loadCubismPose();
        }
      };

      // Pose
      const loadCubismPose = () => {
        if (this._modelSetting.getPoseFileName() != '') {
          let path: string = this._modelSetting.getPoseFileName();
          path = this._modelHomeDir + path;

          fetch(path).then(
            (response) => {
              return response.arrayBuffer();
            },
          ).then(
            (arrayBuffer) => {
              const buffer: ArrayBuffer = arrayBuffer;
              const size: number = buffer.byteLength;

              this.loadPose(buffer, size);
              deleteBuffer(buffer, path);

              this._state = LoadStep.SetupEyeBlink;

              // callback
              setupEyeBlink();
            },
          );
          this._state = LoadStep.WaitLoadPose;
        } else {
          this._state = LoadStep.SetupEyeBlink;

          // callback
          setupEyeBlink();
        }
      };

      // EyeBlink
      const setupEyeBlink = () => {
        if (this._modelSetting.getEyeBlinkParameterCount() > 0) {
          this._eyeBlink = CubismEyeBlink.create(this._modelSetting);
          this._state = LoadStep.SetupBreath;

        }

        // callback
        setupBreath();
      };

      // Breath
      const setupBreath = () => {
        this._breath = CubismBreath.create();

        const breathParameters: csmVector<BreathParameterData> = new csmVector();
        breathParameters.pushBack(new BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
        breathParameters.pushBack(new BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
        breathParameters.pushBack(new BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
        breathParameters.pushBack(new BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
        breathParameters.pushBack(new BreathParameterData(CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBreath), 0.0, 0.5, 3.2345, 0.5));

        this._breath.setParameters(breathParameters);
        this._state = LoadStep.LoadUserData;

        // callback
        loadUserData();
      };

      // UserData
      const loadUserData = () => {
        if (this._modelSetting.getUserDataFile() != '') {
          let path: string = this._modelSetting.getUserDataFile();
          path = this._modelHomeDir + path;

          fetch(path).then(
            (response) => {
              return response.arrayBuffer();
            },
          ).then(
            (arrayBuffer) => {
              const buffer: ArrayBuffer = arrayBuffer;
              const size: number = buffer.byteLength;

              this.loadUserData(buffer, size);
              deleteBuffer(buffer, path);

              this._state = LoadStep.SetupEyeBlinkIds;

              // callback
              setupEyeBlinkIds();
            },
          );

          this._state = LoadStep.WaitLoadUserData;
        } else {
          this._state = LoadStep.SetupEyeBlinkIds;

          // callback
          setupEyeBlinkIds();
        }
      };

      // EyeBlinkIds
      const setupEyeBlinkIds = () => {
        const eyeBlinkIdCount: number = this._modelSetting.getEyeBlinkParameterCount();

        for (let i: number = 0; i < eyeBlinkIdCount; ++i) {
          this._eyeBlinkIds.pushBack(this._modelSetting.getEyeBlinkParameterId(i));
        }

        this._state = LoadStep.SetupLipSyncIds;

        // callback
        setupLipSyncIds();
      };

      // LipSyncIds
      const setupLipSyncIds = () => {
        const lipSyncIdCount = this._modelSetting.getLipSyncParameterCount();

        for (let i: number = 0; i < lipSyncIdCount; ++i) {
          this._lipSyncIds.pushBack(this._modelSetting.getLipSyncParameterId(i));
        }
        this._state = LoadStep.SetupLayout;

        // callback
        setupLayout();
      };

      // Layout
      const setupLayout = () => {
        const layout: csmMap<string, number> = new csmMap<string, number>();
        this._modelSetting.getLayoutMap(layout);
        this._modelMatrix.setupFromLayout(layout);
        this._state = LoadStep.LoadMotion;

        // callback
        loadCubismMotion();
      };

      // Motion
      const loadCubismMotion = () => {
        this._state = LoadStep.WaitLoadMotion;
        this._model.saveParameters();
        this._allMotionCount = 0;
        this._motionCount = 0;
        const group: string[] = [];

        const motionGroupCount: number = this._modelSetting.getMotionGroupCount();

        // 找出动作的总数
        for (let i: number = 0; i < motionGroupCount; i++) {
          group[i] = this._modelSetting.getMotionGroupName(i);
          this._allMotionCount += this._modelSetting.getMotionCount(group[i]);
        }

        // 加载动作
        for (let i: number = 0; i < motionGroupCount; i++) {
          this.preLoadMotionGroup(group[i]);
        }

        // 没有动作的时候
        if (motionGroupCount == 0) {
          this._state = LoadStep.LoadTexture;

          // 停止所有动作
          this._motionManager.stopAllMotions();

          this._updating = false;
          this._initialized = true;

          this.createRenderer();
          this.setupTextures();
          this.getRenderer().startUp(gl);
        }
        resolve(true);
      };
    });
  }

  /**
   * 将纹理加载到纹理单元中
   */
  private setupTextures(): void {
    // Typescript使用premultipliedAlpha来改善iPhone上的alpha质量
    const usePremultiply: boolean = true;

    if (this._state == LoadStep.LoadTexture) {
      // 用于纹理阅读
      const textureCount: number = this._modelSetting.getTextureCount();

      for (let modelTextureNumber = 0; modelTextureNumber < textureCount; modelTextureNumber++) {
        let modelTextureName = this._modelSetting.getTextureFileName(modelTextureNumber);
        // 如果纹理名称是空字符，请跳过加载/绑定过程
        if (modelTextureName == '') {
          console.log('getTextureFileName null');
          continue;
        }
        // 如果用户指定了纹理名称 则只加载用户指定的纹理
        if (this._modelTextures.length > 0) {
          if (!this._modelTextures.includes(modelTextureName)) {
            continue;
          }
        }

        // 将纹理加载到WebGL纹理单元中
        let texturePath = modelTextureName;
        texturePath = this._modelHomeDir + texturePath;

        // 加载完成后调用的回调函数
        const onLoad = (textureInfo: TextureInfo): void => {
          this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);

          this._textureCount++;

          if (this._textureCount >= textureCount) {
            // 加载完成
            this._state = LoadStep.CompleteSetup;
          }
        };

        // 阅读
        LAppDelegate.getInstance().getTextureManager().createTextureFromPngFile(texturePath, usePremultiply, onLoad);
        this.getRenderer().setIsPremultipliedAlpha(usePremultiply);
      }

      this._state = LoadStep.WaitLoadTexture;
    }
  }
}
