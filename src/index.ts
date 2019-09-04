import './core/live2dcubismcore.js';
import { LAppDelegate } from './lappdelegate';
import { LAppLive2DManager } from './lapplive2dmanager';

class live2d {
  private live2dmanager: LAppLive2DManager | null = null;
  public initialize(config: { canvasId: string, width: number, height: number }): LAppLive2DManager | null {
    let lappdelegate = LAppDelegate.getInstance();
    if (lappdelegate.initialize(config) == false) {
      return null;
    }
    this.live2dmanager = LAppLive2DManager.getInstance();
    lappdelegate.run();
    return this.live2dmanager;
  }

  public release() {
    if (this.live2dmanager) {
      this.live2dmanager.releaseAllModel();
    }
    LAppDelegate.releaseInstance();
  }
}

export default new live2d();
