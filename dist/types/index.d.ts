import './core/live2dcubismcore.js';
import { LAppLive2DManager } from './lapplive2dmanager';
declare class live2d {
    private live2dmanager;
    initialize(renderConfig?: {
        efficient: boolean;
        fps?: number;
    }): LAppLive2DManager | null;
    release(): void;
}
export default live2d;
