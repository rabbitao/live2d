/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as acubismmotion } from './acubismmotion';
import { Live2DCubismFramework as cubismmotionqueueentry } from './cubismmotionqueueentry';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as cubismusermodel } from '../../framework/model/cubismusermodel';
import csmString = csmstring.csmString;
import CubismModel = cubismmodel.CubismModel;
import CubismUserModel = cubismusermodel.CubismUserModel;
import csmVector = csmvector.csmVector;
import iterator = csmvector.iterator;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import ACubismMotion = acubismmotion.ACubismMotion;

export namespace Live2DCubismFramework {
  /**
   * 管理动作播放
   *
   * 用于管理动作播放的类。 用于播放ACubismMotion的子类，例如CubismMotion动画。
   *
   * @note 如果在播放期间另一个动作是StartMotion（），则新动作将平滑地改变并且旧动作被中断。
   *       当面部表情的运动和身体的运动被分为运动时，
   *       使用多个CubismMotionQueueManager实例同时播放多个动作。
   */
  export class CubismMotionQueueManager {
    public _userTimeSeconds: number; // 增量时间的综合值[秒]

    public _motions: csmVector<CubismMotionQueueEntry>; // 运动
    public _eventCallBack: CubismMotionEventFunction; // 回调函数
    public _eventCustomData: any; // 数据返回回调
    /**
     * 构造函数
     */
    public constructor() {
      this._userTimeSeconds = 0.0;
      this._eventCallBack = null as any;
      this._eventCustomData = null;
      this._motions = new csmVector<CubismMotionQueueEntry>();
    }

    /**
     * 析构函数
     */
    public release(): void {
      for (let i: number = 0; i < this._motions.getSize(); ++i) {
        if (this._motions.at(i)) {
          this._motions.at(i).release();
          this._motions.set(i, void 0 as any);
          this._motions.set(i, null as any);
        }
      }

      this._motions = null as any;
    }

    /**
     * 开始指定的动作
     *
     * 开始指定的动作。 如果已存在相同类型的运动，请将结束标志设置为现有运动并开始淡出。
     *
     * @param   motion          动作开始
     * @param   autoDelete      如果已完成播放的动画实例已删除，则为True
     * @param   userTimeSeconds 增量时间的综合值[秒]
     * @return  返回usermodel对象
     */
    public startMotion(motion: ACubismMotion, autoDelete: boolean, userTimeSeconds: number, model: CubismUserModel, callback?: () => void): Promise<CubismUserModel> {
      return new Promise<CubismUserModel>((resolve) => {
        if (motion == null) {
          return model;
        }

        let motionQueueEntry: CubismMotionQueueEntry = null as any;

        // 如果已经有动作，则提高结束标志
        for (let i: number = 0; i < this._motions.getSize(); ++i) {
          motionQueueEntry = this._motions.at(i);
          if (motionQueueEntry == null) {
            continue;
          }

          motionQueueEntry.startFadeout(motionQueueEntry._motion.getFadeOutTime(), userTimeSeconds); // 开始和结束淡出
        }

        motionQueueEntry = new CubismMotionQueueEntry();　// 完成后丢弃
        motionQueueEntry._autoDelete = autoDelete;
        motionQueueEntry._motion = motion;

        this._motions.pushBack(motionQueueEntry);
        let time: number | null = 0;
        time = window.setInterval(() => {
          if (this.isFinished()) {
            clearInterval(time as number);
            time = null;
            if (Object.prototype.toString.call(callback) === '[object Function]') {
              (callback as (() => void))();
            }
            // resolve(motionQueueEntry._motionQueueEntryHandle, model);
            resolve(model);
          }
        }, 20);
      });
    }

    /**
     * 确认所有动作的结束
     * @return true 全部完成了
     * @return false 没完
     */
    public isFinished(): boolean {
      // ------- 执行的过程 -------
      // 如果已经有动作，则提高结束标志
      if (!this._motions) {
        return true;
      }
      for (let ite: iterator<CubismMotionQueueEntry> = this._motions.begin(); ite.notEqual(this._motions.end());) {
        let motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          ite = this._motions.erase(ite); // 删除
          continue;
        }

        const motion: ACubismMotion = motionQueueEntry._motion;

        if (motion == null) {
          motionQueueEntry.release();
          motionQueueEntry = void 0 as any;
          motionQueueEntry = null as any;
          ite = this._motions.erase(ite); // 删除
          continue;
        }

        // ----- 删除任何已完成的处理 ------
        if (!motionQueueEntry.isFinished()) {
          return false;
        } else {
          ite.preIncrement();
        }
      }
      return true;
    }

    /**
     * 确认指定动作的结束
     * @param motionQueueEntryNumber 动作识别号码
     * @return true 全部完成了
     * @return false 没完
     */
    public isFinishedByHandle(motionQueueEntryNumber: CubismMotionQueueEntryHandle): boolean {
      // 如果已经有动作，则提高结束标志
      for (const ite: iterator<CubismMotionQueueEntry> = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
        const motionQueueEntry: CubismMotionQueueEntry = ite.ptr();
        if (motionQueueEntry == null) {
          continue;
        }

        if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber && !motionQueueEntry.isFinished()) {
          return false;
        }
      }
      return true;
    }

    /**
     * 停止所有动作
     */
    public stopAllMotions(): void {
      // ------- 它执行的过程 -------
      // 如果已经有动作，则提高结束标志

      for (let ite: iterator<CubismMotionQueueEntry> = this._motions.begin(); ite.notEqual(this._motions.end());) {
        let motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          ite = this._motions.erase(ite);

          continue;
        }

        // ----- 删除任何已完成的处理 ------
        motionQueueEntry.release();
        motionQueueEntry = void 0 as any;
        motionQueueEntry = null as any;
        ite = this._motions.erase(ite); // 删除
      }
    }

    /**
     * 获取指定的CubismMotionQueueEntry

     * @param   motionQueueEntryNumber  动作识别号码
     * @return  指定的CubismMotionQueueEntry
     * @return  找不到返回null
     */
    public getCubismMotionQueueEntry(motionQueueEntryNumber: any): CubismMotionQueueEntry {
      // ------- 执行过程 -------
      // 如果已经有动作，则提高结束标志
      for (const ite: iterator<CubismMotionQueueEntry> = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
        const motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          continue;
        }

        if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
          return motionQueueEntry;
        }
      }

      return null as any;
    }

    /**
     * 注册回调以接收事件
     *
     * @param callback 回调函数
     * @param customData 数据返回回调
     */
    public setEventCallback(callback: CubismMotionEventFunction, customData: any = null): void {
      this._eventCallBack = callback;
      this._eventCustomData = customData;
    }

    /**
     * 更新运动以反映模型中的参数值。
     *
     * @param   model   目标模型
     * @param   userTimeSeconds   增量时间的综合值[秒]
     * @return  true    参数值反映在模型中
     * @return  false   模型中没有反映参数值（运动无变化）
     */
    public doUpdateMotion(model: CubismModel, userTimeSeconds: number): boolean {
      let updated: boolean = false;
      // ------- 执行的过程 --------
      // 如果已经有动作，则提高结束标志

      for (let ite: iterator<CubismMotionQueueEntry> = this._motions.begin(); ite.notEqual(this._motions.end());) {
        let motionQueueEntry: CubismMotionQueueEntry = ite.ptr();

        if (motionQueueEntry == null) {
          ite = this._motions.erase(ite); // 删除
          continue;
        }

        const motion: ACubismMotion = motionQueueEntry._motion;

        if (motion == null) {
          motionQueueEntry.release();
          motionQueueEntry = void 0 as any;
          motionQueueEntry = null as any;
          ite = this._motions.erase(ite); // 删除

          continue;
        }

        motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
        updated = true;

        // ------ 检查用户触发的事件 ----
        const firedList: csmVector<csmString> = motion.getFiredEvent(
          motionQueueEntry.getLastCheckEventTime() - motionQueueEntry.getStartTime(),
          userTimeSeconds - motionQueueEntry.getStartTime(),
        );

        for (let i: number = 0; i < firedList.getSize(); ++i) {
          this._eventCallBack(this, firedList.at(i), this._eventCustomData);
        }

        motionQueueEntry.setLastCheckEventTime(userTimeSeconds);

        // ------ 删除任何已完成的处理 ------
        if (motionQueueEntry.isFinished()) {
          motionQueueEntry.release();
          motionQueueEntry = void 0 as any;
          motionQueueEntry = null as any;
          ite = this._motions.erase(ite); // 删除
        } else {
          ite.preIncrement();
        }
      }

      return updated;
    }
  }


  /**
   * 定义事件回调函数
   *
   * 可以在事件回调中注册的函数类型信息
   * @param caller        重现已触发事件的CubismMotionQueueManager
   * @param eventValue    已触发事件的字符串数据
   * @param customData   注册期间指定的数据返回到回调
   */
  export type CubismMotionEventFunction = (
    caller: CubismMotionQueueManager,
    eventValue: csmString,
    customData: any,
  ) => void;

  /**
   * 动作识别号码
   *
   * 运动识别号的定义
   */
  export declare type CubismMotionQueueEntryHandle = any;
  export const InvalidMotionQueueEntryHandleValue: CubismMotionQueueEntryHandle = -1;
}
