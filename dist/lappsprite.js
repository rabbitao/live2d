/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
import { gl, canvas } from './lappdelegate';
/**
 * 实现精灵的类
 *
 * 纹理ID，Rect管理
 */
var LAppSprite = /** @class */ (function () {
    /**
     * 构造函数
     * @param x            x坐标
     * @param y            Y坐标
     * @param width        宽度
     * @param height       高度
     * @param textureId    纹理
     */
    function LAppSprite(x, y, width, height, textureId) {
        this._rect = new Rect();
        this._rect.left = (x - width * 0.5);
        this._rect.right = (x + width * 0.5);
        this._rect.up = (y + height * 0.5);
        this._rect.down = (y - height * 0.5);
        this._texture = textureId;
        this._vertexBuffer = null;
        this._uvBuffer = null;
        this._indexBuffer = null;
        this._positionLocation = null;
        this._uvLocation = null;
        this._textureLocation = null;
        this._positionArray = null;
        this._uvArray = null;
        this._indexArray = null;
        this._firstDraw = true;
    }
    /**
     * 释放。
     */
    LAppSprite.prototype.release = function () {
        this._rect = null;
        gl.deleteTexture(this._texture);
        this._texture = null;
        gl.deleteBuffer(this._uvBuffer);
        this._uvBuffer = null;
        gl.deleteBuffer(this._vertexBuffer);
        this._vertexBuffer = null;
        gl.deleteBuffer(this._indexBuffer);
        this._indexBuffer = null;
    };
    /**
     * 返回纹理
     */
    LAppSprite.prototype.getTexture = function () {
        return this._texture;
    };
    /**
     * 绘制
     * @param programId 着色器程序
     * @param canvas
     */
    LAppSprite.prototype.render = function (programId) {
        if (this._texture == null) {
            // 加载尚未完成
            return;
        }
        // 第一次绘制时
        if (this._firstDraw) {
            // 获取attribute
            this._positionLocation = gl.getAttribLocation(programId, 'position');
            gl.enableVertexAttribArray(this._positionLocation);
            this._uvLocation = gl.getAttribLocation(programId, 'uv');
            gl.enableVertexAttribArray(this._uvLocation);
            // 获取uniform
            this._textureLocation = gl.getUniformLocation(programId, 'texture');
            // uniform注册属性
            gl.uniform1i(this._textureLocation, 0);
            // uv缓冲区，坐标初始化
            {
                this._uvArray = new Float32Array([
                    1.0, 0.0,
                    0.0, 0.0,
                    0.0, 1.0,
                    1.0, 1.0,
                ]);
                // 创建uv缓冲区
                this._uvBuffer = gl.createBuffer();
            }
            // 顶点缓冲区，坐标初始化
            {
                var maxWidth = canvas.width;
                var maxHeight = canvas.height;
                // 顶点数据
                this._positionArray = new Float32Array([
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
                ]);
                // 创建顶点缓冲区
                this._vertexBuffer = gl.createBuffer();
            }
            // 顶点索引缓冲区，初始化
            {
                // 索引数据
                this._indexArray = new Uint16Array([
                    0, 1, 2,
                    3, 2, 0,
                ]);
                // 创建索引缓冲区
                this._indexBuffer = gl.createBuffer();
            }
            this._firstDraw = false;
        }
        // UV坐标注册
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._uvArray, gl.STATIC_DRAW);
        // 注册attribute属性
        gl.vertexAttribPointer(this._uvLocation, 2, gl.FLOAT, false, 0, 0);
        // 注册顶点坐标
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._positionArray, gl.STATIC_DRAW);
        // 注册attribute属性
        gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
        // 创建顶点索引
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexArray, gl.DYNAMIC_DRAW);
        // 绘制模型
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.drawElements(gl.TRIANGLES, this._indexArray.length, gl.UNSIGNED_SHORT, 0);
    };
    /**
     * 命中判定
     * @param pointX x座標
     * @param pointY y座標
     */
    LAppSprite.prototype.isHit = function (pointX, pointY) {
        // 获取屏幕大小。
        var maxWidth, maxHeight;
        maxWidth = canvas.width;
        maxHeight = canvas.height;
        // 需要转换Y坐标
        var y = maxHeight - pointY;
        return (pointX >= this._rect.left && pointX <= this._rect.right && y <= this._rect.up && y >= this._rect.down);
    };
    return LAppSprite;
}());
export { LAppSprite };
var Rect = /** @class */ (function () {
    function Rect() {
        this.left = 0; // 左侧
        this.right = 0; // 右侧
        this.up = 0; // 上侧
        this.down = 0; // 下侧
    }
    return Rect;
}());
export { Rect };
