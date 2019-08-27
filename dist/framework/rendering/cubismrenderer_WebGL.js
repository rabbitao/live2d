/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as csmrect } from '../type/csmrectf';
import { Live2DCubismFramework as cubismrenderer } from './cubismrenderer';
import { Live2DCubismFramework as cubsimmatrix44 } from '../math/cubismmatrix44';
import { Live2DCubismFramework as csmmap } from '../type/csmmap';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { CubismLogError } from '../utils/cubismdebug';
var Constant = cubismframework.Constant;
var CubismMatrix44 = cubsimmatrix44.CubismMatrix44;
var csmRect = csmrect.csmRect;
var csmMap = csmmap.csmMap;
var csmVector = csmvector.csmVector;
var CubismRenderer = cubismrenderer.CubismRenderer;
var CubismBlendMode = cubismrenderer.CubismBlendMode;
var CubismTextureColor = cubismrenderer.CubismTextureColor;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var ColorChannelCount = 4; // 1代表通道1,3代表RGB，4代表alpha
    var shaderCount = 7; // 着色器数量=蒙版生成+（正常+加法+乘法）*（不带蒙版的乘法alpha版本+带蒙版的乘法alpha版本）
    var s_instance;
    var s_viewport;
    var s_fbo;
    /**
     * 执行剪贴蒙版处理的类
     */
    var CubismClippingManager_WebGL = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismClippingManager_WebGL() {
            this.gl = null; // WebGL渲染上下文
            this._maskRenderTexture = null;
            this._colorBuffer = null;
            this._currentFrameNo = 0;
            this._clippingMaskBufferSize = 256;
            this._clippingContextListForMask = new csmVector();
            this._clippingContextListForDraw = new csmVector();
            this._channelColors = new csmVector();
            this._tmpBoundsOnModel = new csmRect();
            this._tmpMatrix = new CubismMatrix44();
            this._tmpMatrixForMask = new CubismMatrix44();
            this._tmpMatrixForDraw = new CubismMatrix44();
            this._maskTexture = null;
            var tmp = new CubismTextureColor();
            tmp.R = 1.0;
            tmp.G = 0.0;
            tmp.B = 0.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 1.0;
            tmp.B = 0.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 0.0;
            tmp.B = 1.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 0.0;
            tmp.B = 0.0;
            tmp.A = 1.0;
            this._channelColors.pushBack(tmp);
        }
        /**
         * 获取颜色通道（RGBA）标志
         * @param channelNo 颜色通道（RGBA）编号（0：R，1：G，2：B，3：Alpha)
         */
        CubismClippingManager_WebGL.prototype.getChannelFlagAsColor = function (channelNo) {
            return this._channelColors.at(channelNo);
        };
        /**
         * 获取临时渲染纹理的地址
         * 如果FrameBufferObject不存在，请创建一个新的
         *
         * @return 渲染纹理地址
         */
        CubismClippingManager_WebGL.prototype.getMaskRenderTexture = function () {
            var ret = 0;
            // 获取临时RenderTexture
            if (this._maskTexture && this._maskTexture.texture != 0) {
                this._maskTexture.frameNo = this._currentFrameNo;
                ret = this._maskTexture.texture;
            }
            if (ret == 0) {
                // 如果FrameBufferObject不存在，请创建一个新的
                // 获取剪辑缓冲区大小
                var size = this._clippingMaskBufferSize;
                this._colorBuffer = this.gl.createTexture();
                this.gl.bindTexture(this.gl.TEXTURE_2D, this._colorBuffer);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.bindTexture(this.gl.TEXTURE_2D, null);
                ret = this.gl.createFramebuffer();
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, ret);
                this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this._colorBuffer, 0);
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
                this._maskTexture = new CubismRenderTextureResource(this._currentFrameNo, ret);
            }
            return ret;
        };
        /**
         * 设置WebGL渲染上下文
         * @param gl WebGL渲染上下文
         */
        CubismClippingManager_WebGL.prototype.setGL = function (gl) {
            this.gl = gl;
        };
        /**
         * 计算围绕要屏蔽的整个图形对象组的矩形（模型坐标系）
         * @param model 模型实例
         * @param clippingContext 剪切蒙版上下文
         */
        CubismClippingManager_WebGL.prototype.calcClippedDrawTotalBounds = function (model, clippingContext) {
            // 要剪裁的蒙版的整个矩形（蒙版绘图对象）
            var clippedDrawTotalMinX = Number.MAX_VALUE;
            var clippedDrawTotalMinY = Number.MAX_VALUE;
            var clippedDrawTotalMaxX = Number.MIN_VALUE;
            var clippedDrawTotalMaxY = Number.MIN_VALUE;
            // 确定是否确实需要此掩码
            // 如果甚至可以使用一个使用此剪辑的“绘图对象”，则必须生成掩码
            var clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
            for (var clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
                // 找到要为使用蒙版的绘图对象绘制的矩形
                var drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
                var drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
                var drawableVertexes = model.getDrawableVertices(drawableIndex);
                var minX = Number.MAX_VALUE;
                var minY = Number.MAX_VALUE;
                var maxX = Number.MIN_VALUE;
                var maxY = Number.MIN_VALUE;
                var loop = drawableVertexCount * Constant.vertexStep;
                for (var pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
                    var x = drawableVertexes[pi];
                    var y = drawableVertexes[pi + 1];
                    if (x < minX) {
                        minX = x;
                    }
                    if (x > maxX) {
                        maxX = x;
                    }
                    if (y < minY) {
                        minY = y;
                    }
                    if (y > maxY) {
                        maxY = y;
                    }
                }
                // 跳过因为没有获得有效积分
                if (minX == Number.MAX_VALUE) {
                    continue;
                }
                // 　反映整个矩形
                if (minX < clippedDrawTotalMinX) {
                    clippedDrawTotalMinX = minX;
                }
                if (minY < clippedDrawTotalMinY) {
                    clippedDrawTotalMinY = minY;
                }
                if (maxX > clippedDrawTotalMaxX) {
                    clippedDrawTotalMaxX = maxX;
                }
                if (maxY > clippedDrawTotalMaxY) {
                    clippedDrawTotalMaxY = maxY;
                }
                if (clippedDrawTotalMinX == Number.MAX_VALUE) {
                    clippingContext._allClippedDrawRect.x = 0.0;
                    clippingContext._allClippedDrawRect.y = 0.0;
                    clippingContext._allClippedDrawRect.width = 0.0;
                    clippingContext._allClippedDrawRect.height = 0.0;
                    clippingContext._isUsing = false;
                }
                else {
                    clippingContext._isUsing = true;
                    var w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
                    var h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
                    clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
                    clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
                    clippingContext._allClippedDrawRect.width = w;
                    clippingContext._allClippedDrawRect.height = h;
                }
            }
        };
        /**
         * 析构函数等效处理
         */
        CubismClippingManager_WebGL.prototype.release = function () {
            for (var i = 0; i < this._clippingContextListForMask.getSize(); i++) {
                if (this._clippingContextListForMask.at(i)) {
                    this._clippingContextListForMask.at(i).release();
                    this._clippingContextListForMask.set(i, void 0);
                }
                this._clippingContextListForMask.set(i, null);
            }
            this._clippingContextListForMask = null;
            // _clippingContextListForDraw指向_clippingContextListForMask中的实例。 通过上述处理不需要对每个元素进行DELETE。
            for (var i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
                this._clippingContextListForDraw.set(i, null);
            }
            this._clippingContextListForDraw = null;
            if (this._maskTexture) {
                this.gl.deleteFramebuffer(this._maskTexture.texture);
                this._maskTexture = null;
            }
            for (var i = 0; i < this._channelColors.getSize(); i++) {
                this._channelColors.set(i, null);
            }
            this._channelColors = null;
            // 纹理释放
            this.gl.deleteTexture(this._colorBuffer);
            this._colorBuffer = null;
        };
        /**
         * Manager初始化过程
         * 注册使用剪贴蒙版的绘图对象
         * @param model 模型实例
         * @param drawableCount 绘图对象的数量
         * @param drawableMasks 屏蔽绘图对象的绘图对象索引列表
         * @param drawableCounts 屏蔽绘图对象的绘图对象数
         */
        CubismClippingManager_WebGL.prototype.initialize = function (model, drawableCount, drawableMasks, drawableMaskCounts) {
            // 注册所有使用剪贴蒙版的绘图对象
            // 剪切蒙版通常仅限于少数。
            for (var i = 0; i < drawableCount; i++) {
                if (drawableMaskCounts[i] <= 0) {
                    // 没有剪裁蒙版的艺术网（在很多情况下不使用）
                    this._clippingContextListForDraw.pushBack(null);
                    continue;
                }
                // 检查它是否与现有的ClipContext相同
                var clippingContext = this.findSameClip(drawableMasks[i], drawableMaskCounts[i]);
                if (clippingContext == null) {
                    // 如果不存在相同的掩码，则生成
                    clippingContext = new CubismClippingContext(this, drawableMasks[i], drawableMaskCounts[i]);
                    this._clippingContextListForMask.pushBack(clippingContext);
                }
                clippingContext.addClippedDrawable(i);
                this._clippingContextListForDraw.pushBack(clippingContext);
            }
        };
        /**
         * 创建剪辑上下文。 绘制模型时执行。
         * @param model 模型实例
         * @param renderer 渲染器实例
         */
        CubismClippingManager_WebGL.prototype.setupClippingContext = function (model, renderer) {
            this._currentFrameNo++;
            // 准备所有剪报
            // 使用相同的剪辑时（如果是多个剪辑，请设置一个剪辑）
            var usingClipCount = 0;
            for (var clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                // 关于一个剪贴蒙版
                var cc = this._clippingContextListForMask.at(clipIndex);
                // 计算包含使用此剪辑的整个图形对象组的矩形
                this.calcClippedDrawTotalBounds(model, cc);
                if (cc._isUsing) {
                    usingClipCount++; // 算在使用中
                }
            }
            // 面具创建过程
            if (usingClipCount > 0) {
                // 将视口设置为与生成的FrameBuffer大小相同
                this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
                // 使面具活跃
                this._maskRenderTexture = this.getMaskRenderTexture();
                // 绘制模型时，转换传递给DrawMeshNow（模型到世界坐标转换）
                var modelToWorldF = renderer.getMvpMatrix();
                renderer.preDraw(); // 清除缓冲区
                // 确定每个蒙版的布局
                this.setupLayoutBounds(usingClipCount);
                // ---------- 面具绘图过程 ----------
                // 将Mask的RenderTexture设置为活动状态
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTexture);
                // 清除面具
                // （临时规范）1是无效（未绘制）区域，0是有效（绘制）区域。 （着色器Cd * Cs用于创建值接近0的掩码。当应用1时，没有任何反应。）
                this.gl.clearColor(1.0, 1.0, 1.0, 0);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                // 实际上生成一个面具
                // 决定如何布局和绘制所有蒙版并将它们存储在ClipContext和ClippedDrawContext中
                for (var clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                    // --- 实际上画了一个面具 ---
                    var clipContext = this._clippingContextListForMask.at(clipIndex);
                    var allClipedDrawRect = clipContext._allClippedDrawRect; // 使用此蒙版的所有绘图对象的逻辑坐标上的边界矩形
                    var layoutBoundsOnTex01 = clipContext._layoutBounds; // 把面具放在这里
                    // 在模型坐标上使用具有适当边距的矩形
                    var MARGIN = 0.05;
                    this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                    this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, allClipedDrawRect.height * MARGIN);
                    // ########## 最初的最小尺寸是好的，而不使用整个分配区域
                    // 找到着色器的公式。 如果不考虑轮换：
                    // movePeriod' = movePeriod * scaleX + offX		  [[ movePeriod' = (movePeriod - tmpBoundsOnModel.movePeriod)*scale + layoutBoundsOnTex01.movePeriod ]]
                    var scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                    var scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                    // 查找生成掩码时要使用的矩阵
                    {
                        // 找到要传递到着色器的矩阵 <<<<<<<<<<<<<<<<<<<<<<<< 需要优化（可以通过反向计算简化
                        this._tmpMatrix.loadIdentity();
                        {
                            // 将layout0..1转换为-1..1
                            this._tmpMatrix.translateRelative(-1.0, -1.0);
                            this._tmpMatrix.scaleRelative(2.0, 2.0);
                        }
                        {
                            // view to layout0..1
                            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                            // new = [translate][scale][translate]
                        }
                        // tmpMatrixForMaskが計算結果
                        this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
                    }
                    // --------- 绘制时计算蒙版参考矩阵
                    {
                        // 找到要传递到着色器的矩阵 <<<<<<<<<<<<<<<<<<<<<<<< 需要优化（可以通过反向计算简化
                        this._tmpMatrix.loadIdentity();
                        {
                            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                            // new = [translate][scale][translate]
                        }
                        this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
                    }
                    clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
                    clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
                    var clipDrawCount = clipContext._clippingIdCount;
                    for (var i = 0; i < clipDrawCount; i++) {
                        var clipDrawIndex = clipContext._clippingIdList[i];
                        // 如果顶点信息尚未更新且不可靠，则传递绘图。
                        if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                            continue;
                        }
                        renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                        // 应用此特殊转换并绘制
                        // 频道也需要切换（A，R，G，B）
                        renderer.setClippingContextBufferForMask(clipContext);
                        renderer.drawMesh(model.getDrawableTextureIndices(clipDrawIndex), model.getDrawableVertexIndexCount(clipDrawIndex), model.getDrawableVertexCount(clipDrawIndex), model.getDrawableVertexIndices(clipDrawIndex), model.getDrawableVertices(clipDrawIndex), model.getDrawableVertexUvs(clipDrawIndex), model.getDrawableOpacity(clipDrawIndex), CubismBlendMode.CubismBlendMode_Normal);
                    }
                }
                // --- 后处理---
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo); // 返回绘图目标
                renderer.setClippingContextBufferForMask(null);
                this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
            }
        };
        /**
         * 检查你是否已经制作了面具
         * 如果是，则返回相应的剪贴蒙版实例
         * 如果未创建，则返回NULL
         * @param drawableMasks 屏蔽绘图对象的绘图对象列表
         * @param drawableMaskCounts 屏蔽绘图对象的绘图对象数
         * @return 如果存在相应的剪贴蒙版，则返回实例，否则返回NULL
         */
        CubismClippingManager_WebGL.prototype.findSameClip = function (drawableMasks, drawableMaskCounts) {
            // 检查它是否与创建的ClippingContext匹配
            for (var i = 0; i < this._clippingContextListForMask.getSize(); i++) {
                var clippingContext = this._clippingContextListForMask.at(i);
                var count = clippingContext._clippingIdCount;
                // 如果数量不同则不同
                if (count != drawableMaskCounts) {
                    continue;
                }
                var sameCount = 0;
                // 检查它们是否具有相同的ID。 由于数组的数量是相同的，如果匹配的数量相同，它将具有相同的东西
                for (var j = 0; j < count; j++) {
                    var clipId = clippingContext._clippingIdList[j];
                    for (var k = 0; k < count; k++) {
                        if (drawableMasks[k] == clipId) {
                            sameCount++;
                            break;
                        }
                    }
                }
                if (sameCount == count) {
                    return clippingContext;
                }
            }
            return null; // 找不到
        };
        /**
         * 用于放置剪切上下文的布局
         * 使用尽可能多的渲染纹理布置蒙版
         * 如果掩模组的数量是4或更少，则为RGBA的每个通道布置一个掩模，如果它是5或更大且6或更小，则RGBA被布置为2,2,1,1。
         *
         * @param usingClipCount 要放置的剪辑上下文的数量
         */
        CubismClippingManager_WebGL.prototype.setupLayoutBounds = function (usingClipCount) {
            // 使用尽可能多的RenderTexture布置遮罩
            // 如果掩模组的数量是4或更少，则为RGBA的每个通道布置一个掩模，并且如果它是5或更大且6或更小，则RGBA布置为2,2,1,1。
            // 按顺序使用RGBA
            var div = usingClipCount / ColorChannelCount; // 　基本掩模放在一个通道上
            var mod = usingClipCount % ColorChannelCount; // 逐个分配到此号码的频道
            // 向下舍入小数点
            div = ~~div;
            mod = ~~mod;
            // 准备每个RGBA通道（0：R，1：G，2：B，3：A）
            var curClipIndex = 0; // 按顺序排列
            for (var channelNo = 0; channelNo < ColorChannelCount; channelNo++) {
                // 在此频道上布置的号码
                var layoutCount = div + (channelNo < mod ? 1 : 0);
                // 决定如何分裂
                if (layoutCount == 0) {
                    // 什么都不做
                }
                else if (layoutCount == 1) {
                    // 按原样使用一切
                    var clipContext = this._clippingContextListForMask.at(curClipIndex++);
                    clipContext._layoutChannelNo = channelNo;
                    clipContext._layoutBounds.x = 0.0;
                    clipContext._layoutBounds.y = 0.0;
                    clipContext._layoutBounds.width = 1.0;
                    clipContext._layoutBounds.height = 1.0;
                }
                else if (layoutCount == 2) {
                    for (var i = 0; i < layoutCount; i++) {
                        var xpos = i % 2;
                        // 向下舍入小数点
                        xpos = ~~xpos;
                        var cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = 0.0;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 1.0;
                        // 分解并使用两种UV
                    }
                }
                else if (layoutCount <= 4) {
                    // 分为4部分
                    for (var i = 0; i < layoutCount; i++) {
                        var xpos = i % 2;
                        var ypos = i / 2;
                        // 向下舍入小数点
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        var cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = ypos * 0.5;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 0.5;
                    }
                }
                else if (layoutCount <= 9) {
                    // 分为9个部分
                    for (var i = 0; i < layoutCount; i++) {
                        var xpos = i % 3;
                        var ypos = i / 3;
                        // 向下舍入小数点
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        var cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos / 3.0;
                        cc._layoutBounds.y = ypos / 3.0;
                        cc._layoutBounds.width = 1.0 / 3.0;
                        cc._layoutBounds.height = 1.0 / 3.0;
                    }
                }
                else {
                    CubismLogError('not supported mask count : {0}', layoutCount);
                }
            }
        };
        /**
         * 获取颜色缓冲
         * @return 颜色缓冲
         */
        CubismClippingManager_WebGL.prototype.getColorBuffer = function () {
            return this._colorBuffer;
        };
        /**
         * 获取用于屏幕绘制的剪贴蒙版列表
         * @return 用于屏幕绘制的剪贴蒙版列表
         */
        CubismClippingManager_WebGL.prototype.getClippingContextListForDraw = function () {
            return this._clippingContextListForDraw;
        };
        /**
         * 设置剪切蒙版缓冲区的大小
         * @param size 剪切掩码缓冲区大小
         */
        CubismClippingManager_WebGL.prototype.setClippingMaskBufferSize = function (size) {
            this._clippingMaskBufferSize = size;
        };
        /**
         * 获取剪切蒙版缓冲区的大小
         * @return 剪切掩码缓冲区大小
         */
        CubismClippingManager_WebGL.prototype.getClippingMaskBufferSize = function () {
            return this._clippingMaskBufferSize;
        };
        return CubismClippingManager_WebGL;
    }());
    Live2DCubismFramework.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
    /**
     * 定义渲染纹理资源的结构
     * 与剪贴蒙版一起使用
     */
    var CubismRenderTextureResource = /** @class */ (function () {
        /**
         * 带参数的构造函数
         * @param frameNo 渲染器帧号
         * @param texture 纹理地址
         */
        function CubismRenderTextureResource(frameNo, texture) {
            this.frameNo = frameNo;
            this.texture = texture;
        }
        return CubismRenderTextureResource;
    }());
    Live2DCubismFramework.CubismRenderTextureResource = CubismRenderTextureResource;
    /**
     * 剪切蒙版上下文
     */
    var CubismClippingContext = /** @class */ (function () {
        /**
         * 带参数的构造函数
         */
        function CubismClippingContext(manager, clippingDrawableIndices, clipCount) {
            this._isUsing = undefined; // 如果当前绘图状态需要蒙版准备，则为真
            this._layoutChannelNo = undefined; // RGBA的哪个通道放置此剪辑（0：R，1：G，2：B，3：A）
            this._owner = manager;
            // 剪切的可绘制索引列表（=用于屏蔽）
            this._clippingIdList = clippingDrawableIndices;
            // 面具数量
            this._clippingIdCount = clipCount;
            this._allClippedDrawRect = new csmRect();
            this._layoutBounds = new csmRect();
            this._clippedDrawableIndexList = new Array();
            this._matrixForMask = new CubismMatrix44();
            this._matrixForDraw = new CubismMatrix44();
        }
        /**
         * 析构函数等效处理
         */
        CubismClippingContext.prototype.release = function () {
            if (this._layoutBounds != null) {
                this._layoutBounds = null;
            }
            if (this._allClippedDrawRect != null) {
                this._allClippedDrawRect = null;
            }
            if (this._clippedDrawableIndexList != null) {
                this._clippedDrawableIndexList = null;
            }
        };
        /**
         * 添加剪裁到此蒙版的绘图对象
         *
         * @param drawableIndex 要添加到剪切目标的绘图对象的索引
         */
        CubismClippingContext.prototype.addClippedDrawable = function (drawableIndex) {
            this._clippedDrawableIndexList.push(drawableIndex);
        };
        /**
         * 获取管理此掩码的管理器实例
         * @return 剪辑管理器的一个实例
         */
        CubismClippingContext.prototype.getClippingManager = function () {
            return this._owner;
        };
        CubismClippingContext.prototype.setGl = function (gl) {
            this._owner.setGL(gl);
        };
        return CubismClippingContext;
    }());
    Live2DCubismFramework.CubismClippingContext = CubismClippingContext;
    /**
     * 用于生成/销毁WebGL着色器程序的类
     * 它是一个单例类，可以从CubismShader_WebGL.getInstance访问
     */
    var CubismShader_WebGL = /** @class */ (function () {
        /**
         * 私有构造函数
         */
        function CubismShader_WebGL() {
            this.gl = undefined; // webgl上下文
            this._shaderSets = new csmVector();
        }
        /**
         * 获取实例（单例）
         * @return 实例
         */
        CubismShader_WebGL.getInstance = function () {
            if (s_instance == null) {
                s_instance = new CubismShader_WebGL();
                return s_instance;
            }
            return s_instance;
        };
        /**
         * 发布实例（单例）
         */
        CubismShader_WebGL.deleteInstance = function () {
            if (s_instance) {
                s_instance.release();
                s_instance = null;
            }
        };
        /**
         * 析构函数等效处理
         */
        CubismShader_WebGL.prototype.release = function () {
            this.releaseShaderProgram();
        };
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
        CubismShader_WebGL.prototype.setupShaderProgram = function (renderer, textureId, vertexCount, vertexArray, indexArray, uvArray, bufferData, opacity, colorBlendMode, baseColor, isPremultipliedAlpha, matrix4x4) {
            if (!isPremultipliedAlpha) {
                CubismLogError('NoPremultipliedAlpha is not allowed');
            }
            if (this._shaderSets.getSize() == 0) {
                this.generateShaders();
            }
            // Blending
            var SRC_COLOR;
            var DST_COLOR;
            var SRC_ALPHA;
            var DST_ALPHA;
            if (renderer.getClippingContextBufferForMask() != null) {
                var shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_SetupMask);
                this.gl.useProgram(shaderSet.shaderProgram);
                // 纹理设置
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
                this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
                // 顶点阵列设置（VBO）
                if (bufferData.vertex == null) {
                    bufferData.vertex = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
                this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
                // 纹理顶点设置
                if (bufferData.uv == null) {
                    bufferData.uv = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
                this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
                // 渠道
                var channelNo = renderer.getClippingContextBufferForMask()._layoutChannelNo;
                var colorChannel = renderer.getClippingContextBufferForMask().getClippingManager().getChannelFlagAsColor(channelNo);
                this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
                this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
                var rect = renderer.getClippingContextBufferForMask()._layoutBounds;
                this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2.0 - 1.0, rect.y * 2.0 - 1.0, rect.getRight() * 2.0 - 1.0, rect.getBottom() * 2.0 - 1.0);
                SRC_COLOR = this.gl.ZERO;
                DST_COLOR = this.gl.ONE_MINUS_SRC_COLOR;
                SRC_ALPHA = this.gl.ZERO;
                DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
            }
            else {
                var masked = renderer.getClippingContextBufferForDraw() != null; // この描画オブジェクトはマスク対象か
                var offset = (masked ? 1 : 0);
                var shaderSet = new CubismShaderSet();
                switch (colorBlendMode) {
                    case CubismBlendMode.CubismBlendMode_Normal:
                    default:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.ONE;
                        DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                        SRC_ALPHA = this.gl.ONE;
                        DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
                        break;
                    case CubismBlendMode.CubismBlendMode_Additive:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_AddPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.ONE;
                        DST_COLOR = this.gl.ONE;
                        SRC_ALPHA = this.gl.ZERO;
                        DST_ALPHA = this.gl.ONE;
                        break;
                    case CubismBlendMode.CubismBlendMode_Multiplicative:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_MultPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.DST_COLOR;
                        DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                        SRC_ALPHA = this.gl.ZERO;
                        DST_ALPHA = this.gl.ONE;
                        break;
                }
                this.gl.useProgram(shaderSet.shaderProgram);
                // 顶点数组设置
                if (bufferData.vertex == null) {
                    bufferData.vertex = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
                this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
                // 纹理顶点设置
                if (bufferData.uv == null) {
                    bufferData.uv = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
                this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
                if (masked) {
                    this.gl.activeTexture(this.gl.TEXTURE1);
                    var tex = renderer.getClippingContextBufferForDraw().getClippingManager().getColorBuffer();
                    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                    this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
                    // 设置矩阵以将视图坐标转换为ClippingContext坐标
                    this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray());
                    // 设置要使用的颜色通道
                    var channelNo = renderer.getClippingContextBufferForDraw()._layoutChannelNo;
                    var colorChannel = renderer.getClippingContextBufferForDraw().getClippingManager().getChannelFlagAsColor(channelNo);
                    this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
                }
                // 纹理设置
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
                this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
                // 协调转型
                this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
                this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.R, baseColor.G, baseColor.B, baseColor.A);
            }
            // 创建IBO并传输数据
            if (bufferData.index == null) {
                bufferData.index = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferData.index);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
            this.gl.blendFuncSeparate(SRC_COLOR, DST_COLOR, SRC_ALPHA, DST_ALPHA);
        };
        /**
         * 释放着色器程序
         */
        CubismShader_WebGL.prototype.releaseShaderProgram = function () {
            for (var i = 0; i < this._shaderSets.getSize(); i++) {
                this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
                this._shaderSets.at(i).shaderProgram = 0;
                this._shaderSets.set(i, void 0);
                this._shaderSets.set(i, null);
            }
        };
        /**
         * 初始化着色器程序
         * @param vertShaderSrc 顶点着色器源
         * @param fragShaderSrc 片段着色器源
         */
        CubismShader_WebGL.prototype.generateShaders = function () {
            for (var i = 0; i < shaderCount; i++) {
                this._shaderSets.pushBack(new CubismShaderSet());
            }
            this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrcSetupMask, Live2DCubismFramework.fragmentShaderSrcsetupMask);
            this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrc, Live2DCubismFramework.fragmentShaderSrcPremultipliedAlpha);
            this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrcMasked, Live2DCubismFramework.fragmentShaderSrcMaskPremultipliedAlpha);
            // 使用相同的着色器进行添加
            this._shaderSets.at(3).shaderProgram = this._shaderSets.at(1).shaderProgram;
            this._shaderSets.at(4).shaderProgram = this._shaderSets.at(2).shaderProgram;
            // 乘法也像往常一样使用相同的着色器
            this._shaderSets.at(5).shaderProgram = this._shaderSets.at(1).shaderProgram;
            this._shaderSets.at(6).shaderProgram = this._shaderSets.at(2).shaderProgram;
            // SetupMask
            this._shaderSets.at(0).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_position');
            this._shaderSets.at(0).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_texCoord');
            this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 's_texture0');
            this._shaderSets.at(0).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(0).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(0).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_baseColor');
            // 正常（PremultipliedAlpha）
            this._shaderSets.at(1).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_position');
            this._shaderSets.at(1).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_texCoord');
            this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 's_texture0');
            this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_matrix');
            this._shaderSets.at(1).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_baseColor');
            // 正常（剪切，预乘Alpha）
            this._shaderSets.at(2).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_position');
            this._shaderSets.at(2).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_texCoord');
            this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture0');
            this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture1');
            this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_matrix');
            this._shaderSets.at(2).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(2).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(2).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_baseColor');
            // 加法（PremultipliedAlpha）
            this._shaderSets.at(3).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_position');
            this._shaderSets.at(3).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_texCoord');
            this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture0');
            this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_matrix');
            this._shaderSets.at(3).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_baseColor');
            // 加法（clip，PremultipliedAlpha）
            this._shaderSets.at(4).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_position');
            this._shaderSets.at(4).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_texCoord');
            this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 's_texture0');
            this._shaderSets.at(4).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 's_texture1');
            this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_matrix');
            this._shaderSets.at(4).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(4).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(4).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_baseColor');
            // 乘法（PremultipliedAlpha）
            this._shaderSets.at(5).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_position');
            this._shaderSets.at(5).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_texCoord');
            this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture0');
            this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_matrix');
            this._shaderSets.at(5).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_baseColor');
            // 乘法（clip，PremultipliedAlpha）
            this._shaderSets.at(6).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_position');
            this._shaderSets.at(6).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_texCoord');
            this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture0');
            this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture1');
            this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_matrix');
            this._shaderSets.at(6).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(6).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(6).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_baseColor');
        };
        /**
         * 加载着色器程序和返回地址
         * @param vertexShaderSource    顶点着色器源
         * @param fragmentShaderSource  片段着色器源
         * @return 着色器程序地址
         */
        CubismShader_WebGL.prototype.loadShaderProgram = function (vertexShaderSource, fragmentShaderSource) {
            // Create Shader Program
            var shaderProgram = this.gl.createProgram();
            var vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
            if (!vertShader) {
                CubismLogError('Vertex shader compile error!');
                return 0;
            }
            var fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
            if (!fragShader) {
                CubismLogError('Vertex shader compile error!');
                return 0;
            }
            // Attach vertex shader to program
            this.gl.attachShader(shaderProgram, vertShader);
            // Attach fragment shader to program
            this.gl.attachShader(shaderProgram, fragShader);
            // link program
            this.gl.linkProgram(shaderProgram);
            var linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            // 如果链接失败，请删除着色器
            if (!linkStatus) {
                CubismLogError('Failed to link program: {0}', shaderProgram);
                this.gl.deleteShader(vertShader);
                vertShader = 0;
                this.gl.deleteShader(fragShader);
                fragShader = 0;
                if (shaderProgram) {
                    this.gl.deleteProgram(shaderProgram);
                    shaderProgram = 0;
                }
                return 0;
            }
            // Release vertex and fragment shaders.
            this.gl.deleteShader(vertShader);
            this.gl.deleteShader(fragShader);
            return shaderProgram;
        };
        /**
         * 编译着色器程序
         * @param shaderType 着色器类型（顶点/片段）
         * @param shaderSource 着色器源代码
         *
         * @return 编译着色器程序
         */
        CubismShader_WebGL.prototype.compileShaderSource = function (shaderType, shaderSource) {
            var source = shaderSource;
            var shader = this.gl.createShader(shaderType);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            if (!shader) {
                var log = this.gl.getShaderInfoLog(shader);
                CubismLogError('Shader compile log: {0} ', log);
            }
            var status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
            if (!status) {
                this.gl.deleteShader(shader);
                return null;
            }
            return shader;
        };
        CubismShader_WebGL.prototype.setGl = function (gl) {
            this.gl = gl;
        };
        return CubismShader_WebGL;
    }());
    Live2DCubismFramework.CubismShader_WebGL = CubismShader_WebGL;
    /**
     * CubismShader_WebGL的内部类
     */
    var CubismShaderSet = /** @class */ (function () {
        function CubismShaderSet() {
            this.shaderProgram = undefined; // 着色器程序地址
            this.attributePositionLocation = undefined; // 要传递给着色器程序的变量的地址（Position）
            this.attributeTexCoordLocation = undefined; // 要传递给着色器程序的变量的地址（TexCoord）
            this.uniformMatrixLocation = undefined; // 要传递给着色器程序的变量的地址（Matrix）
            this.uniformClipMatrixLocation = undefined; // 要传递给着色器程序的变量的地址（ClipMatrix）
            this.samplerTexture0Location = undefined; // 要传递给着色器程序的变量的地址（Texture0）
            this.samplerTexture1Location = undefined; // 要传递给着色器程序的变量的地址（Texture1）
            this.uniformBaseColorLocation = undefined; // 要传递给着色器程序的变量的地址（BaseColor）
            this.uniformChannelFlagLocation = undefined; // 要传递给着色器程序的变量的地址（ChannelFlag）
        }
        return CubismShaderSet;
    }());
    Live2DCubismFramework.CubismShaderSet = CubismShaderSet;
    var ShaderNames;
    (function (ShaderNames) {
        // SetupMask
        ShaderNames[ShaderNames["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
        // Normal
        ShaderNames[ShaderNames["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
        // Add
        ShaderNames[ShaderNames["ShaderNames_AddPremultipliedAlpha"] = 3] = "ShaderNames_AddPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipledAlpha"] = 4] = "ShaderNames_AddMaskedPremultipledAlpha";
        // Mult
        ShaderNames[ShaderNames["ShaderNames_MultPremultipliedAlpha"] = 5] = "ShaderNames_MultPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlpha"] = 6] = "ShaderNames_MultMaskedPremultipliedAlpha";
    })(ShaderNames = Live2DCubismFramework.ShaderNames || (Live2DCubismFramework.ShaderNames = {}));
    Live2DCubismFramework.vertexShaderSrcSetupMask = 'attribute vec4     a_position;' +
        'attribute vec2     a_texCoord;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_myPos;' +
        'uniform mat4       u_clipMatrix;' +
        'void main()' +
        '{' +
        '   gl_Position = u_clipMatrix * a_position;' +
        '   v_myPos = u_clipMatrix * a_position;' +
        '   v_texCoord = a_texCoord;' +
        '   v_texCoord.y = 1.0 - v_texCoord.y;' +
        '}';
    Live2DCubismFramework.fragmentShaderSrcsetupMask = 'precision mediump float;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_myPos;' +
        'uniform vec4       u_baseColor;' +
        'uniform vec4       u_channelFlag;' +
        'uniform sampler2D  s_texture0;' +
        'void main()' +
        '{' +
        '   float isInside = ' +
        '       step(u_baseColor.x, v_myPos.x/v_myPos.w)' +
        '       * step(u_baseColor.y, v_myPos.y/v_myPos.w)' +
        '       * step(v_myPos.x/v_myPos.w, u_baseColor.z)' +
        '       * step(v_myPos.y/v_myPos.w, u_baseColor.w);' +
        '   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;' +
        '}';
    // ----- 顶点着色器程序 -----
    // Normal & Add & Mult 共通
    Live2DCubismFramework.vertexShaderSrc = 'attribute vec4     a_position;' + // v.vertex
        'attribute vec2     a_texCoord;' + // v.texcoord
        'varying vec2       v_texCoord;' + // v2f.texcoord
        'uniform mat4       u_matrix;' +
        'void main()' +
        '{' +
        '   gl_Position = u_matrix * a_position;' +
        '   v_texCoord = a_texCoord;' +
        '   v_texCoord.y = 1.0 - v_texCoord.y;' +
        '}';
    // Normal & Add & Mult 共通（用于绘制剪切的对象）
    Live2DCubismFramework.vertexShaderSrcMasked = 'attribute vec4     a_position;' +
        'attribute vec2     a_texCoord;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_clipPos;' +
        'uniform mat4       u_matrix;' +
        'uniform mat4       u_clipMatrix;' +
        'void main()' +
        '{' +
        '   gl_Position = u_matrix * a_position;' +
        '   v_clipPos = u_clipMatrix * a_position;' +
        '   v_texCoord = a_texCoord;' +
        '   v_texCoord.y = 1.0 - v_texCoord.y;' +
        '}';
    // ----- 片段着色器程序 -----
    // Normal & Add & Mult 共通 （PremultipliedAlpha）
    Live2DCubismFramework.fragmentShaderSrcPremultipliedAlpha = 'precision mediump float;' +
        'varying vec2       v_texCoord;' + // v2f.texcoord
        'uniform vec4       u_baseColor;' +
        'uniform sampler2D  s_texture0;' + // _MainTex
        'void main()' +
        '{' +
        '   gl_FragColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;' +
        '}';
    // Normal （用于绘制剪切对象，也用作PremultipliedAlpha）
    Live2DCubismFramework.fragmentShaderSrcMaskPremultipliedAlpha = 'precision mediump float;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_clipPos;' +
        'uniform vec4       u_baseColor;' +
        'uniform vec4       u_channelFlag;' +
        'uniform sampler2D  s_texture0;' +
        'uniform sampler2D  s_texture1;' +
        'void main()' +
        '{' +
        '   vec4 col_formask = texture2D(s_texture0 , v_texCoord) * u_baseColor;' +
        '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
        '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
        '   col_formask = col_formask * maskVal;' +
        '   gl_FragColor = col_formask;' +
        '}';
    /**
     * 实现WebGL绘图指令的类
     */
    var CubismRenderer_WebGL = /** @class */ (function (_super) {
        __extends(CubismRenderer_WebGL, _super);
        /**
         * 构造函数
         */
        function CubismRenderer_WebGL() {
            var _this = _super.call(this) || this;
            _this.gl = undefined; // webgl上下文
            _this._clippingContextBufferForMask = null;
            _this._clippingContextBufferForDraw = null;
            _this._clippingManager = new CubismClippingManager_WebGL();
            _this.firstDraw = true;
            _this._textures = new csmMap();
            _this._sortedDrawableIndexList = new csmVector();
            _this._bufferData = {
                vertex: WebGLBuffer = null,
                uv: WebGLBuffer = null,
                index: WebGLBuffer = null,
            };
            // 保留纹理贴图的容量
            _this._textures.prepareCapacity(32, true);
            return _this;
        }
        /**
         * 释放渲染器保留的静态资源
         * 免费的WebGL静态着色器程序
         */
        CubismRenderer_WebGL.doStaticRelease = function () {
            CubismShader_WebGL.deleteInstance();
        };
        /**
         * 执行渲染器初始化过程
         * 可以从传递给参数的模型中提取渲染器初始化处理所需的信息
         *
         * @param model 模型实例
         */
        CubismRenderer_WebGL.prototype.initialize = function (model) {
            if (model.isUsingMasking()) {
                this._clippingManager = new CubismClippingManager_WebGL(); // 初始化剪切掩码缓冲区预处理方法
                this._clippingManager.initialize(model, model.getDrawableCount(), model.getDrawableMasks(), model.getDrawableMaskCounts());
            }
            this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);
            _super.prototype.initialize.call(this, model); // 调用父类处理
        };
        /**
         * WebGL纹理绑定处理
         * 在CubismRenderer中设置纹理，并返回一个Index值，以便在CubismRenderer中引用图像
         * @param modelTextureNo 要设置的模型纹理编号
         * @param glTextureNo WebGL纹理编号
         */
        CubismRenderer_WebGL.prototype.bindTexture = function (modelTextureNo, glTexture) {
            this._textures.setValue(modelTextureNo, glTexture);
        };
        /**
         * 获取绑定到WebGL的纹理列表
         * @return 纹理列表
         */
        CubismRenderer_WebGL.prototype.getBindedTextures = function () {
            return this._textures;
        };
        /**
         * 设置剪切蒙版缓冲区的大小
         * 处理成本很高，因为掩码的FrameBuffer被丢弃并重新创建。
         * @param size クリッピングマスクバッファのサイズ
         */
        CubismRenderer_WebGL.prototype.setClippingMaskBufferSize = function (size) {
            // 销毁并重新创建实例以更改FrameBuffer大小
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
            this._clippingManager = new CubismClippingManager_WebGL();
            this._clippingManager.setClippingMaskBufferSize(size);
            this._clippingManager.initialize(this.getModel(), this.getModel().getDrawableCount(), this.getModel().getDrawableMasks(), this.getModel().getDrawableMaskCounts());
        };
        /**
         * 获取剪切蒙版缓冲区的大小
         * @return 剪切掩码缓冲区大小
         */
        CubismRenderer_WebGL.prototype.getClippingMaskBufferSize = function () {
            return this._clippingManager.getClippingMaskBufferSize();
        };
        /**
         * 析构函数等效处理
         */
        CubismRenderer_WebGL.prototype.release = function () {
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
            this.gl.deleteBuffer(this._bufferData.vertex);
            this._bufferData.vertex = null;
            this.gl.deleteBuffer(this._bufferData.uv);
            this._bufferData.uv = null;
            this.gl.deleteBuffer(this._bufferData.index);
            this._bufferData.index = null;
            this._bufferData = null;
            this._textures = null;
        };
        /**
         * 绘制模型的实际过程
         */
        CubismRenderer_WebGL.prototype.doDrawModel = function () {
            // ------------ 剪切掩模/缓冲预处理方法 ------------
            if (this._clippingManager != null) {
                this.preDraw();
                this._clippingManager.setupClippingContext(this.getModel(), this);
            }
            // 请注意，即使在上述剪切过程中也会调用PreDraw一次！
            this.preDraw();
            var drawableCount = this.getModel().getDrawableCount();
            var renderOrder = this.getModel().getDrawableRenderOrders();
            // 按绘制顺序对索引排序
            for (var i = 0; i < drawableCount; ++i) {
                var order = renderOrder[i];
                this._sortedDrawableIndexList.set(order, i);
            }
            // 制图
            for (var i = 0; i < drawableCount; ++i) {
                var drawableIndex = this._sortedDrawableIndexList.at(i);
                // 如果未显示Drawable，请传递该过程
                if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
                    continue;
                }
                // 设置剪贴蒙版
                this.setClippingContextBufferForDraw((this._clippingManager != null)
                    ? (this._clippingManager.getClippingContextListForDraw()).at(drawableIndex)
                    : null);
                this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
                this.drawMesh(this.getModel().getDrawableTextureIndices(drawableIndex), this.getModel().getDrawableVertexIndexCount(drawableIndex), this.getModel().getDrawableVertexCount(drawableIndex), this.getModel().getDrawableVertexIndices(drawableIndex), this.getModel().getDrawableVertices(drawableIndex), this.getModel().getDrawableVertexUvs(drawableIndex), this.getModel().getDrawableOpacity(drawableIndex), this.getModel().getDrawableBlendMode(drawableIndex));
            }
        };
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
        CubismRenderer_WebGL.prototype.drawMesh = function (textureNo, indexCount, vertexCount, indexArray, vertexArray, uvArray, opacity, colorBlendMode) {
            // 启用/禁用背面绘图
            if (this.isCulling()) {
                this.gl.enable(this.gl.CULL_FACE);
            }
            else {
                this.gl.disable(this.gl.CULL_FACE);
            }
            this.gl.frontFace(this.gl.CCW); // Cubism3 OpenGL具有用于蒙版和艺术网格的CCW表面
            var modelColorRGBA = this.getModelColor();
            if (this.getClippingContextBufferForMask() == null) {
                modelColorRGBA.A *= opacity;
                if (this.isPremultipliedAlpha()) {
                    modelColorRGBA.R *= modelColorRGBA.A;
                    modelColorRGBA.G *= modelColorRGBA.A;
                    modelColorRGBA.B *= modelColorRGBA.A;
                }
            }
            var drawtexture; // 纹理传递到着色器
            // 从纹理贴图中获取绑定的纹理ID
            // 如果未绑定，请设置虚拟纹理ID
            if (this._textures.getValue(textureNo) != null) {
                drawtexture = this._textures.getValue(textureNo);
            }
            else {
                drawtexture = null;
            }
            CubismShader_WebGL.getInstance().setupShaderProgram(this, drawtexture, vertexCount, vertexArray, indexArray, uvArray, this._bufferData, opacity, colorBlendMode, modelColorRGBA, this.isPremultipliedAlpha(), this.getMvpMatrix());
            // 绘制多边形网格
            this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
            // 后处理
            this.gl.useProgram(null);
            this.setClippingContextBufferForDraw(null);
            this.setClippingContextBufferForMask(null);
        };
        /**
         * 设置渲染状态
         * @param fbo 应用程序端指定的帧缓冲区
         * @param viewport 视口
         */
        CubismRenderer_WebGL.prototype.setRenderState = function (fbo, viewport) {
            s_fbo = fbo;
            s_viewport = viewport;
        };
        /**
         * 绘图开始时的附加处理
         * 在绘制模型之前实现剪切蒙版所需的处理
         */
        CubismRenderer_WebGL.prototype.preDraw = function () {
            if (this.firstDraw) {
                this.firstDraw = false;
                // 启用扩展
                this._anisortopy = this.gl.getExtension('EXT_texture_filter_anisotropic') ||
                    this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                    this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
            }
            this.gl.disable(this.gl.SCISSOR_TEST);
            this.gl.disable(this.gl.STENCIL_TEST);
            this.gl.disable(this.gl.DEPTH_TEST);
            // 剔除（1.0beta3）
            this.gl.frontFace(this.gl.CW);
            this.gl.enable(this.gl.BLEND);
            this.gl.colorMask(true, true, true, true);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // 如果缓冲区先前已绑定，则必须销
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        };
        /**
         * 设置要在蒙版纹理上绘制的剪切上下文
         */
        CubismRenderer_WebGL.prototype.setClippingContextBufferForMask = function (clip) {
            this._clippingContextBufferForMask = clip;
        };
        /**
         * 获取剪贴上下文以在蒙版纹理上绘制
         * @return 剪切上下文以在蒙版纹理上绘制
         */
        CubismRenderer_WebGL.prototype.getClippingContextBufferForMask = function () {
            return this._clippingContextBufferForMask;
        };
        /**
         * 设置要在屏幕上绘制的剪辑上下文
         */
        CubismRenderer_WebGL.prototype.setClippingContextBufferForDraw = function (clip) {
            this._clippingContextBufferForDraw = clip;
        };
        /**
         * 获取剪辑上下文以在屏幕上绘制
         * @return 要在屏幕上绘制的剪辑上下文
         */
        CubismRenderer_WebGL.prototype.getClippingContextBufferForDraw = function () {
            return this._clippingContextBufferForDraw;
        };
        /**
         * gl设置
         */
        CubismRenderer_WebGL.prototype.startUp = function (gl) {
            this.gl = gl;
            this._clippingManager.setGL(gl);
            CubismShader_WebGL.getInstance().setGl(gl);
        };
        return CubismRenderer_WebGL;
    }(CubismRenderer));
    Live2DCubismFramework.CubismRenderer_WebGL = CubismRenderer_WebGL;
    /**
     * 释放渲染器保留的静态资源
     */
    CubismRenderer.staticRelease = function () {
        CubismRenderer_WebGL.doStaticRelease();
    };
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
