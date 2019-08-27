import { Live2DCubismFramework as csmrect } from '../type/csmrectf';
import { Live2DCubismFramework as cubismrenderer } from './cubismrenderer';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import { Live2DCubismFramework as cubsimmatrix44 } from '../math/cubismmatrix44';
import { Live2DCubismFramework as csmmap } from '../type/csmmap';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import CubismMatrix44 = cubsimmatrix44.CubismMatrix44;
import csmRect = csmrect.csmRect;
import csmMap = csmmap.csmMap;
import csmVector = csmvector.csmVector;
import CubismModel = cubismmodel.CubismModel;
import CubismRenderer = cubismrenderer.CubismRenderer;
import CubismBlendMode = cubismrenderer.CubismBlendMode;
import CubismTextureColor = cubismrenderer.CubismTextureColor;
export declare namespace Live2DCubismFramework {
    /**
     * 执行剪贴蒙版处理的类
     */
    class CubismClippingManager_WebGL {
        _maskRenderTexture: WebGLFramebuffer;
        _colorBuffer: WebGLTexture;
        _currentFrameNo: number;
        _channelColors: csmVector<CubismTextureColor>;
        _maskTexture: CubismRenderTextureResource;
        _clippingContextListForMask: csmVector<CubismClippingContext>;
        _clippingContextListForDraw: csmVector<CubismClippingContext>;
        _clippingMaskBufferSize: number;
        gl: WebGLRenderingContext;
        private _tmpMatrix;
        private _tmpMatrixForMask;
        private _tmpMatrixForDraw;
        private _tmpBoundsOnModel;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 获取颜色通道（RGBA）标志
         * @param channelNo 颜色通道（RGBA）编号（0：R，1：G，2：B，3：Alpha)
         */
        getChannelFlagAsColor(channelNo: number): CubismTextureColor;
        /**
         * 获取临时渲染纹理的地址
         * 如果FrameBufferObject不存在，请创建一个新的
         *
         * @return 渲染纹理地址
         */
        getMaskRenderTexture(): WebGLFramebuffer;
        /**
         * 设置WebGL渲染上下文
         * @param gl WebGL渲染上下文
         */
        setGL(gl: WebGLRenderingContext): void;
        /**
         * 计算围绕要屏蔽的整个图形对象组的矩形（模型坐标系）
         * @param model 模型实例
         * @param clippingContext 剪切蒙版上下文
         */
        calcClippedDrawTotalBounds(model: CubismModel, clippingContext: CubismClippingContext): void;
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * Manager初始化过程
         * 注册使用剪贴蒙版的绘图对象
         * @param model 模型实例
         * @param drawableCount 绘图对象的数量
         * @param drawableMasks 屏蔽绘图对象的绘图对象索引列表
         * @param drawableCounts 屏蔽绘图对象的绘图对象数
         */
        initialize(model: CubismModel, drawableCount: number, drawableMasks: Int32Array[], drawableMaskCounts: Int32Array): void;
        /**
         * 创建剪辑上下文。 绘制模型时执行。
         * @param model 模型实例
         * @param renderer 渲染器实例
         */
        setupClippingContext(model: CubismModel, renderer: CubismRenderer_WebGL): void;
        /**
         * 检查你是否已经制作了面具
         * 如果是，则返回相应的剪贴蒙版实例
         * 如果未创建，则返回NULL
         * @param drawableMasks 屏蔽绘图对象的绘图对象列表
         * @param drawableMaskCounts 屏蔽绘图对象的绘图对象数
         * @return 如果存在相应的剪贴蒙版，则返回实例，否则返回NULL
         */
        findSameClip(drawableMasks: Int32Array, drawableMaskCounts: number): CubismClippingContext;
        /**
         * 用于放置剪切上下文的布局
         * 使用尽可能多的渲染纹理布置蒙版
         * 如果掩模组的数量是4或更少，则为RGBA的每个通道布置一个掩模，如果它是5或更大且6或更小，则RGBA被布置为2,2,1,1。
         *
         * @param usingClipCount 要放置的剪辑上下文的数量
         */
        setupLayoutBounds(usingClipCount: number): void;
        /**
         * 获取颜色缓冲
         * @return 颜色缓冲
         */
        getColorBuffer(): WebGLTexture;
        /**
         * 获取用于屏幕绘制的剪贴蒙版列表
         * @return 用于屏幕绘制的剪贴蒙版列表
         */
        getClippingContextListForDraw(): csmVector<CubismClippingContext>;
        /**
         * 设置剪切蒙版缓冲区的大小
         * @param size 剪切掩码缓冲区大小
         */
        setClippingMaskBufferSize(size: number): void;
        /**
         * 获取剪切蒙版缓冲区的大小
         * @return 剪切掩码缓冲区大小
         */
        getClippingMaskBufferSize(): number;
    }
    /**
     * 定义渲染纹理资源的结构
     * 与剪贴蒙版一起使用
     */
    class CubismRenderTextureResource {
        frameNo: number;
        texture: WebGLFramebuffer;
        /**
         * 带参数的构造函数
         * @param frameNo 渲染器帧号
         * @param texture 纹理地址
         */
        constructor(frameNo: number, texture: WebGLFramebuffer);
    }
    /**
     * 剪切蒙版上下文
     */
    class CubismClippingContext {
        _isUsing: boolean;
        readonly _clippingIdList: Int32Array;
        _clippingIdCount: number;
        _layoutChannelNo: number;
        _layoutBounds: csmRect;
        _allClippedDrawRect: csmRect;
        _matrixForMask: CubismMatrix44;
        _matrixForDraw: CubismMatrix44;
        _clippedDrawableIndexList: number[];
        private _owner;
        /**
         * 带参数的构造函数
         */
        constructor(manager: CubismClippingManager_WebGL, clippingDrawableIndices: Int32Array, clipCount: number);
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 添加剪裁到此蒙版的绘图对象
         *
         * @param drawableIndex 要添加到剪切目标的绘图对象的索引
         */
        addClippedDrawable(drawableIndex: number): void;
        /**
         * 获取管理此掩码的管理器实例
         * @return 剪辑管理器的一个实例
         */
        getClippingManager(): CubismClippingManager_WebGL;
        setGl(gl: WebGLRenderingContext): void;
    }
    /**
     * 用于生成/销毁WebGL着色器程序的类
     * 它是一个单例类，可以从CubismShader_WebGL.getInstance访问
     */
    class CubismShader_WebGL {
        /**
         * 获取实例（单例）
         * @return 实例
         */
        static getInstance(): CubismShader_WebGL;
        /**
         * 发布实例（单例）
         */
        static deleteInstance(): void;
        _shaderSets: csmVector<CubismShaderSet>;
        gl: WebGLRenderingContext;
        /**
         * 私有构造函数
         */
        private constructor();
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 运行一系列着色器程序设置
         * @param renderer 渲染器实例
         * @param textureId GPU纹理ID
         * @param vertexCount 多边形网格的顶点数
         * @param vertexArray 多边形网格的顶点数组
         * @param indexArray　索引缓冲区的顶点数组
         * @param uvArray uv阵列
         * @param opacity 不透明度
         * @param colorBlendMode 颜色混合类型
         * @param baseColor 基色
         * @param isPremultipliedAlpha 是否乘以alpha
         * @param matrix4x4 Model-View-Projection矩阵
         */
        setupShaderProgram(renderer: CubismRenderer_WebGL, textureId: WebGLTexture, vertexCount: number, vertexArray: Float32Array, indexArray: Uint16Array, uvArray: Float32Array, bufferData: {
            vertex: WebGLBuffer;
            uv: WebGLBuffer;
            index: WebGLBuffer;
        }, opacity: number, colorBlendMode: CubismBlendMode, baseColor: CubismTextureColor, isPremultipliedAlpha: boolean, matrix4x4: CubismMatrix44): void;
        /**
         * 释放着色器程序
         */
        releaseShaderProgram(): void;
        /**
         * 初始化着色器程序
         * @param vertShaderSrc 顶点着色器源
         * @param fragShaderSrc 片段着色器源
         */
        generateShaders(): void;
        /**
         * 加载着色器程序和返回地址
         * @param vertexShaderSource    顶点着色器源
         * @param fragmentShaderSource  片段着色器源
         * @return 着色器程序地址
         */
        loadShaderProgram(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram;
        /**
         * 编译着色器程序
         * @param shaderType 着色器类型（顶点/片段）
         * @param shaderSource 着色器源代码
         *
         * @return 编译着色器程序
         */
        compileShaderSource(shaderType: GLenum, shaderSource: string): WebGLProgram;
        setGl(gl: WebGLRenderingContext): void;
    }
    /**
     * CubismShader_WebGL的内部类
     */
    class CubismShaderSet {
        shaderProgram: WebGLProgram;
        attributePositionLocation: GLuint;
        attributeTexCoordLocation: GLuint;
        uniformMatrixLocation: WebGLUniformLocation;
        uniformClipMatrixLocation: WebGLUniformLocation;
        samplerTexture0Location: WebGLUniformLocation;
        samplerTexture1Location: WebGLUniformLocation;
        uniformBaseColorLocation: WebGLUniformLocation;
        uniformChannelFlagLocation: WebGLUniformLocation;
    }
    enum ShaderNames {
        ShaderNames_SetupMask = 0,
        ShaderNames_NormalPremultipliedAlpha = 1,
        ShaderNames_NormalMaskedPremultipliedAlpha = 2,
        ShaderNames_AddPremultipliedAlpha = 3,
        ShaderNames_AddMaskedPremultipledAlpha = 4,
        ShaderNames_MultPremultipliedAlpha = 5,
        ShaderNames_MultMaskedPremultipliedAlpha = 6
    }
    const vertexShaderSrcSetupMask: string;
    const fragmentShaderSrcsetupMask: string;
    const vertexShaderSrc: string;
    const vertexShaderSrcMasked: string;
    const fragmentShaderSrcPremultipliedAlpha: string;
    const fragmentShaderSrcMaskPremultipliedAlpha: string;
    /**
     * 实现WebGL绘图指令的类
     */
    class CubismRenderer_WebGL extends CubismRenderer {
        /**
         * 释放渲染器保留的静态资源
         * 免费的WebGL静态着色器程序
         */
        static doStaticRelease(): void;
        _textures: csmMap<number, WebGLTexture>;
        _sortedDrawableIndexList: csmVector<number>;
        _clippingManager: CubismClippingManager_WebGL;
        _clippingContextBufferForMask: CubismClippingContext;
        _clippingContextBufferForDraw: CubismClippingContext;
        firstDraw: boolean;
        _bufferData: {
            vertex: WebGLBuffer;
            uv: WebGLBuffer;
            index: WebGLBuffer;
        };
        gl: WebGLRenderingContext;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 执行渲染器初始化过程
         * 可以从传递给参数的模型中提取渲染器初始化处理所需的信息
         *
         * @param model 模型实例
         */
        initialize(model: CubismModel): void;
        /**
         * WebGL纹理绑定处理
         * 在CubismRenderer中设置纹理，并返回一个Index值，以便在CubismRenderer中引用图像
         * @param modelTextureNo 要设置的模型纹理编号
         * @param glTextureNo WebGL纹理编号
         */
        bindTexture(modelTextureNo: number, glTexture: WebGLTexture): void;
        /**
         * 获取绑定到WebGL的纹理列表
         * @return 纹理列表
         */
        getBindedTextures(): csmMap<number, WebGLTexture>;
        /**
         * 设置剪切蒙版缓冲区的大小
         * 处理成本很高，因为掩码的FrameBuffer被丢弃并重新创建。
         * @param size クリッピングマスクバッファのサイズ
         */
        setClippingMaskBufferSize(size: number): void;
        /**
         * 获取剪切蒙版缓冲区的大小
         * @return 剪切掩码缓冲区大小
         */
        getClippingMaskBufferSize(): number;
        /**
         * 析构函数等效处理
         */
        release(): void;
        /**
         * 绘制模型的实际过程
         */
        doDrawModel(): void;
        /**
         * [オーバーライド]
         * 绘制绘图对象（艺术网格）
         * 将多边形网格和纹理编号作为一组传递。
         * @param textureNo 要绘制的纹理编号
         * @param indexCount 绘图对象的索引值
         * @param vertexCount 多边形网格的顶点数
         * @param indexArray 多边形网格索引数组
         * @param vertexArray 多边形网格的顶点数组
         * @param uvArray uv阵列
         * @param opacity 不透明度
         * @param colorBlendMode 颜色组成类型
         */
        drawMesh(textureNo: number, indexCount: number, vertexCount: number, indexArray: Uint16Array, vertexArray: Float32Array, uvArray: Float32Array, opacity: number, colorBlendMode: CubismBlendMode): void;
        /**
         * 设置渲染状态
         * @param fbo 应用程序端指定的帧缓冲区
         * @param viewport 视口
         */
        setRenderState(fbo: WebGLFramebuffer, viewport: number[]): void;
        /**
         * 绘图开始时的附加处理
         * 在绘制模型之前实现剪切蒙版所需的处理
         */
        preDraw(): void;
        /**
         * 设置要在蒙版纹理上绘制的剪切上下文
         */
        setClippingContextBufferForMask(clip: CubismClippingContext): void;
        /**
         * 获取剪贴上下文以在蒙版纹理上绘制
         * @return 剪切上下文以在蒙版纹理上绘制
         */
        getClippingContextBufferForMask(): CubismClippingContext;
        /**
         * 设置要在屏幕上绘制的剪辑上下文
         */
        setClippingContextBufferForDraw(clip: CubismClippingContext): void;
        /**
         * 获取剪辑上下文以在屏幕上绘制
         * @return 要在屏幕上绘制的剪辑上下文
         */
        getClippingContextBufferForDraw(): CubismClippingContext;
        /**
         * gl设置
         */
        startUp(gl: WebGLRenderingContext): void;
    }
}
