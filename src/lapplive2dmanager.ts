/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import { Live2DCubismFramework as cubismmatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
import Csm_csmVector = csmvector.csmVector;
import Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;

import { LAppModel } from './lappmodel';
import { LAppDefine } from './lappdefine';
import { LAppPal } from './lapppal';
import { canvas } from './lappdelegate';


export let s_instance: LAppLive2DManager = null as any;

/**
 * 在示例应用程序中管理CubismModel的类
 * 模型生成和销毁，点击事件处理，模型切换。
 */
export class LAppLive2DManager {
  /**
   * 返回类的实例（单例）。
   * 如果尚未创建实例，则会在内部创建实例。
   *
   * @return 一个类的实例
   */
  public static getInstance(resource: { path: string, modelName: string }): LAppLive2DManager {
    if (s_instance == null) {
      s_instance = new LAppLive2DManager(resource);
    }

    return s_instance;
  }

  /**
   * 释放一个类的实例（单例）。
   */
  public static releaseInstance(): void {
    if (s_instance != null) {
      s_instance = void 0 as any;
    }

    s_instance = null as any;
  }

  public _viewMatrix: Csm_CubismMatrix44;    // 用于模型绘制的视图矩阵
  public _models: Csm_csmVector<LAppModel>;  // 模型实例容器

  /**
   * 构造函数
   */
  constructor(resource: {path: string, modelName: string}) {
    this._viewMatrix = new Csm_CubismMatrix44();
    this._models = new Csm_csmVector<LAppModel>();
    this.loadScene(resource);
  }

  /**
   * 返回当前场景中保存的模型。
   *
   * @param no 模型列表索引值
   * @return 返回模型的实例。 如果索引值超出范围，则返回NULL。
   */
  public getModel(no: number): LAppModel {
    if (no < this._models.getSize()) {
      return this._models.at(no);
    }

    return null as any;
  }

  /**
   * 释放当前场景中保存的所有模型
   */
  public releaseAllModel(): void {
    for (let i: number = 0; i < this._models.getSize(); i++) {
      this._models.at(i).release();
      this._models.set(i, null as any);
    }

    this._models.clear();
  }

  /**
   * 拖动屏幕的时候
   *
   * @param x 屏幕的X坐标
   * @param y 屏幕的Y坐标
   */
  public onDrag(x: number, y: number): void {
    for (let i: number = 0; i < this._models.getSize(); i++) {
      const model: LAppModel = this.getModel(i);
      if (model) {
        model.setDragging(x, y);
      }
    }
  }

  /**
   * 点按屏幕的时候
   *
   * @param x 屏幕的X坐标
   * @param y 屏幕的Y坐标
   */
  public onTap(x: number, y: number): void {
    if (LAppDefine.DebugLogEnable) {
      LAppPal.printLog('[APP]tap point: {x: {0} y: {1}}', x.toFixed(2), y.toFixed(2));
    }

    for (let i: number = 0; i < this._models.getSize(); i++) {
      if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
        if (LAppDefine.DebugLogEnable) {
          LAppPal.printLog('[APP]hit area: [{0}]', LAppDefine.HitAreaNameHead);
        }
        this._models.at(i).setRandomExpression();
      } else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
        if (LAppDefine.DebugLogEnable) {
          LAppPal.printLog('[APP]hit area: [{0}]', LAppDefine.HitAreaNameBody);
        }
        this._models.at(i).startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal);
      }
    }
  }

  /**
   * 更新屏幕时进行处理
   * 执行模型更新处理和绘图处理
   */
  public onUpdate(): void {
    let projection: Csm_CubismMatrix44 = new Csm_CubismMatrix44();

    let width: number, height: number;
    width = canvas.width;
    height = canvas.height;
    projection.scale(1.0, width / height);

    if (this._viewMatrix != null) {
      projection.multiplyByMatrix(this._viewMatrix);
    }

    const saveProjection: Csm_CubismMatrix44 = projection.clone();
    const modelCount: number = this._models.getSize();

    for (let i: number = 0; i < modelCount; ++i) {
      const model: LAppModel = this.getModel(i);
      projection = saveProjection.clone();

      model.update();
      model.draw(projection); // 投影更改，因为它是通过引用传递的。
    }
  }

  /**
   * 切换场景
   * 在示例应用程序中，切换模型集。
   */
  public loadScene(resource: { path: string, modelName: string }): void {
    if (LAppDefine.DebugLogEnable) {
      LAppPal.printLog('[APP]model {0}', resource.modelName);
    }
    resource.modelName += '.model3.json';

    this.releaseAllModel();
    this._models.pushBack(new LAppModel(resource));
    this._models.at(0).loadAssets(resource.path, resource.modelName);
    this._models.at(0).motionEventFired = () => {
      console.log('event call');
    };
    (window as any).model = this._models.at(0);
  }
}
