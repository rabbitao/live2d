import { Live2DCubismFramework as cubismMatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as cubismviewmatrix } from './framework/math/cubismviewmatrix';
import Csm_CubismViewMatrix = cubismviewmatrix.CubismViewMatrix;
import Csm_CubismMatrix44 = cubismMatrix44.CubismMatrix44;
import { TouchManager } from './touchmanager';
import { LAppSprite } from './lappsprite';
/**
 * 页面视图。
 */
export declare class LAppView {
    _touchManager: TouchManager;
    _deviceToScreen: Csm_CubismMatrix44;
    _viewMatrix: Csm_CubismViewMatrix;
    _programId: WebGLProgram;
    _back: LAppSprite;
    _gear: LAppSprite;
    _changeModel: boolean;
    _isClick: boolean;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 初始化。
     */
    initialize(): void;
    /**
     * 释放
     */
    release(): void;
    /**
     * 绘制。
     */
    render(): void;
    /**
     * 执行图像初始化。
     */
    initializeSprite(): void;
    /**
     * 触摸时调用。
     *
     * @param pointX 屏幕X坐标
     * @param pointY 屏幕Y坐标
     */
    onTouchesBegan(pointX: number, pointY: number): void;
    /**
     * 触摸移动时调用。
     *
     * @param pointX 屏幕X坐标
     * @param pointY 屏幕Y坐标
     */
    onTouchesMoved(pointX: number, pointY: number): void;
    /**
     * 触摸完成后调用。
     *
     * @param pointX 屏幕X坐标
     * @param pointY 屏幕Y坐标
     */
    onTouchesEnded(pointX: number, pointY: number): void;
    /**
     * 将X坐标转换为View坐标。
     *
     * @param deviceX 设备X坐标
     */
    transformViewX(deviceX: number): number;
    /**
     * 将Y坐标转换为View坐标。
     *
     * @param deviceY 设备Y坐标
     */
    transformViewY(deviceY: number): number;
    /**
     * 将X坐标转换为屏幕坐标。
     * @param deviceX 设备X坐标
     */
    transformScreenX(deviceX: number): number;
    /**
     * 将Y坐标转换为屏幕坐标。
     *
     * @param deviceY 设备Y坐标
     */
    transformScreenY(deviceY: number): number;
}
