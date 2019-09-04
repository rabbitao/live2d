import { Option as Csm_Option } from './framework/live2dcubismframework';
import { LAppView } from './lappview';
import { LAppTextureManager } from './lapptexturemanager';
export declare let canvas: HTMLCanvasElement;
export declare let s_instance: LAppDelegate;
export declare let gl: WebGLRenderingContext;
export declare let frameBuffer: WebGLFramebuffer;
/**
 * 应用类。
 * 管理Cubism3。
 */
export declare class LAppDelegate {
    /**
     * 返回类的实例（单例）。
     * 如果尚未创建实例，则会在内部创建实例。
     *
     * @return 一个类的实例
     */
    static getInstance(): LAppDelegate;
    /**
     * 释放一个类的实例（单例）。
     */
    static releaseInstance(): void;
    _cubismOption: Csm_Option;
    _view: LAppView;
    _captured: boolean;
    _mouseX: number;
    _mouseY: number;
    _isEnd: boolean;
    _textureManager: LAppTextureManager;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 初始化您需要的APP。
     */
    initialize(config: {
        canvasId: string;
        width: number;
        height: number;
    }): boolean;
    /**
     * 释放。
     */
    release(): void;
    /**
     * 执行过程。
     */
    run(): void;
    /**
     * 注册着色器。
     */
    createShader(): WebGLProgram;
    /**
     * 获取查看信息。
     */
    getView(): LAppView;
    getTextureManager(): LAppTextureManager;
    /**
     * Cubism3初始化
     */
    initializeCubism(): void;
}
