import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
import Csm_csmVector = csmvector.csmVector;
/**
 * 纹理管理类
 * 读取和管理图像的类。
 */
export declare class LAppTextureManager {
    _textures: Csm_csmVector<TextureInfo>;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 释放
     */
    release(): void;
    /**
     * 加载图片
     *
     * @param fileName 要加载的映像文件路径名
     * @param usePremultiply 是否启用Premult处理
     * @return 图像信息，读取失败时返回null
     */
    createTextureFromPngFile(fileName: string, usePremultiply: boolean, callback: any): void;
    /**
     * 图像释放
     *
     * 释放阵列中的所有图像。
     */
    releaseTextures(): void;
    /**
     * 图像释放
     *
     * 释放指定的纹理图像
     * @param texture 要释放的纹理
     */
    releaseTextureByTexture(texture: WebGLTexture): void;
    /**
     * 图像释放
     *
     * 释放具有指定名称的图像。
     * @param fileName 要释放的映像文件路径名
     */
    releaseTextureByFilePath(fileName: string): void;
}
/**
 * 图像信息结构
 */
export declare class TextureInfo {
    img: HTMLImageElement;
    id: WebGLTexture;
    width: number;
    height: number;
    usePremultply: boolean;
    fileName: string;
}
