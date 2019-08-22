/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as cubismmotionqueuemanager } from './cubismmotionqueuemanager';
import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import CubismMotionQueueEntryHandle = cubismmotionqueuemanager.CubismMotionQueueEntryHandle;
import CubismModel = cubismmodel.CubismModel;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismMotionQueueManager = cubismmotionqueuemanager.CubismMotionQueueManager;

export namespace Live2DCubismFramework {
  /**
   * 运动管理
   *
   * 管理动作的类
   */
  export class CubismMotionManager extends CubismMotionQueueManager {

    public _currentPriority: number;   // 当前播放动作的优先级
    public _reservePriority: number;   // 要播放的动议的优先级。 播放期间变为0。 在单独的线程中加载运动文件时的功能。
    /**
     * 构造函数
     */
    public constructor() {
      super();
      this._currentPriority = 0;
      this._reservePriority = 0;
    }

    /**
     * 在播放期间获得动作优先级
     * @return  动作优先级
     */
    public getCurrentPriority(): number {
      return this._currentPriority;
    }

    /**
     * 获取保留动作的优先级。
     * @return  动作优先级
     */
    public getReservePriority(): number {
      return this._reservePriority;
    }

    /**
     * 设置保留动作的优先级。
     * @param   val     优先级
     */
    public setReservePriority(val: number): void {
      this._reservePriority = val;
    }

    /**
     * 设置优先级并开始运动。
     *
     * @param motion          运动
     * @param autoDelete      如果回放删除被捕获的动作实例，则为真
     * @param priority        优先
     * @return                返回已启动的运动的标识号。 在IsFinished（）的参数中使用，用于确定单个动作是否已结束。 无法启动时“-1”
     */
    public startMotionPriority(motion: ACubismMotion, autoDelete: boolean, priority: number): CubismMotionQueueEntryHandle {
      if (priority == this._reservePriority) {
        this._reservePriority = 0;  // 取消预订
      }

      this._currentPriority = priority;   // 设置播放时的动作优先级

      return super.startMotion(motion, autoDelete, this._userTimeSeconds);
    }

    public stopAllMotions() {
      this._reservePriority = 0;
      this._currentPriority = 0;
      super.stopAllMotions();
    }

    /**
     * 更新运动以反映模型中的参数值。
     *
     * @param model   目标模型
     * @param deltaTimeSeconds    达美时间[秒]
     * @return  true    已更新
     * @return  false   没有更新
     */
    public updateMotion(model: CubismModel, deltaTimeSeconds: number): boolean {
      this._userTimeSeconds += deltaTimeSeconds;

      const updated: boolean = super.doUpdateMotion(model, this._userTimeSeconds);

      if (this.isFinished()) {
        this._currentPriority = 0;  // 取消播放期间的动作优先级
      }

      return updated;
    }

    /**
     * 保留动议。
     *
     * @param   priority    优先
     * @return  true    能够预订
     * @return  false   无法预订
     */
    public reserveMotion(priority: number): boolean {
      if ((priority <= this._reservePriority) || (priority <= this._currentPriority)) {
        return false;
      }

      this._reservePriority = priority;

      return true;
    }
  }

}
