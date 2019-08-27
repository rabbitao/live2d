import './core/live2dcubismcore.js';
import { LAppLive2DManager } from './lapplive2dmanager';
declare class live2d {
    private live2dmanager;
    initialize(config: {
        width: number;
        height: number;
    }): LAppLive2DManager | null;
    release(): void;
}
declare const _default: live2d;
export default _default;
