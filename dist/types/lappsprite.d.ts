/**
 * 实现精灵的类
 *
 * 纹理ID，Rect管理
 */
export declare class LAppSprite {
    _texture: WebGLTexture;
    _vertexBuffer: WebGLBuffer;
    _uvBuffer: WebGLBuffer;
    _indexBuffer: WebGLBuffer;
    _rect: Rect;
    _positionLocation: number;
    _uvLocation: number;
    _textureLocation: WebGLUniformLocation;
    _positionArray: Float32Array;
    _uvArray: Float32Array;
    _indexArray: Uint16Array;
    _firstDraw: boolean;
    /**
     * 构造函数
     * @param x            x坐标
     * @param y            Y坐标
     * @param width        宽度
     * @param height       高度
     * @param textureId    纹理
     */
    constructor(x: number, y: number, width: number, height: number, textureId: WebGLTexture);
    /**
     * 释放。
     */
    release(): void;
    /**
     * 返回纹理
     */
    getTexture(): WebGLTexture;
    /**
     * 绘制
     * @param programId 着色器程序
     * @param canvas
     */
    render(programId: WebGLProgram): void;
    /**
     * 命中判定
     * @param pointX x座標
     * @param pointY y座標
     */
    isHit(pointX: number, pointY: number): boolean;
}
export declare class Rect {
    left: number;
    right: number;
    up: number;
    down: number;
}
