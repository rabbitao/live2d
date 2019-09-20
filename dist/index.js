import './core/live2dcubismcore.js';
import { LAppDelegate } from './lappdelegate';
import { LAppLive2DManager } from './lapplive2dmanager';
var live2d = /** @class */ (function () {
    function live2d() {
        this.live2dmanager = null;
    }
    live2d.prototype.initialize = function (config) {
        var lappdelegate = LAppDelegate.getInstance();
        if (lappdelegate.initialize(config) == false) {
            return null;
        }
        this.live2dmanager = LAppLive2DManager.getInstance();
        lappdelegate.run();
        return this.live2dmanager;
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
