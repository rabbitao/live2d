import './core/live2dcubismcore.js';
import { LAppDelegate } from './lappdelegate';
import { LAppLive2DManager } from './lapplive2dmanager';
var live2d = /** @class */ (function () {
    function live2d() {
        this.live2dmanager = null;
    }
    live2d.prototype.initialize = function (renderConfig) {
        this.live2dmanager = LAppLive2DManager.getInstance();
        if (this.live2dmanager.initDelegate(renderConfig)) {
            return this.live2dmanager;
        }
        throw new Error('live2d core 初始化失败');
    };
    live2d.prototype.release = function () {
        if (this.live2dmanager) {
            this.live2dmanager.releaseAllModel();
        }
        LAppDelegate.releaseInstance();
    };
    return live2d;
}());
export default live2d;
