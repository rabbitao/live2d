/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
var Csm_csmVector = csmvector.csmVector;
import { gl } from './lappdelegate';
/**
 * 纹理管理类
 * 读取和管理图像的类。
 */
var LAppTextureManager = /** @class */ (function () {
    /**
     * 构造函数
     */
    function LAppTextureManager() {
        this._textures = new Csm_csmVector();
    }
    /**
     * 释放
     */
    LAppTextureManager.prototype.release = function () {
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    };
    /**
     * 加载图片
     *
     * @param fileName 要加载的映像文件路径名
     * @param usePremultiply 是否启用Premult处理
     * @return 图像信息，读取失败时返回null
     */
    LAppTextureManager.prototype.createTextureFromPngFile = function (fileName, usePremultiply, callback) {
        var _this = this;
        var _loop_1 = function (ite) {
            if (ite.ptr().fileName == fileName && ite.ptr().usePremultply == usePremultiply) {
                // 从第二次开始，使用缓存（无等待时间）
                ite.ptr().img.onload = function () {
                    callback(ite.ptr());
                };
                ite.ptr().img.src = fileName;
                return { value: void 0 };
            }
        };
        // 搜索已经加载的纹理
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            var state_1 = _loop_1(ite);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // 触发数据onload
        var img = new Image();
        img.onload = function () {
            // 创建纹理对象
            var tex = gl.createTexture();
            // 选择纹理
            gl.bindTexture(gl.TEXTURE_2D, tex);
            // 将像素写入纹理
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            // 执行Premult处理
            if (usePremultiply) {
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            }
            // 将像素写入纹理
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            // 生成mipmap
            gl.generateMipmap(gl.TEXTURE_2D);
            // 绑定纹理
            gl.bindTexture(gl.TEXTURE_2D, null);
            var textureInfo = new TextureInfo();
            if (textureInfo != null) {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                textureInfo.img = img;
                textureInfo.usePremultply = usePremultiply;
                _this._textures.pushBack(textureInfo);
            }
            callback(textureInfo);
        };
        img.src = fileName;
    };
    /**
     * 图像释放
     *
     * 释放阵列中的所有图像。
     */
    LAppTextureManager.prototype.releaseTextures = function () {
        for (var i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    };
    /**
     * 图像释放
     *
     * 释放指定的纹理图像
     * @param texture 要释放的纹理
     */
    LAppTextureManager.prototype.releaseTextureByTexture = function (texture) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    };
    /**
     * 图像释放
     *
     * 释放具有指定名称的图像。
     * @param fileName 要释放的映像文件路径名
     */
    LAppTextureManager.prototype.releaseTextureByFilePath = function (fileName) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    };
    return LAppTextureManager;
}());
export { LAppTextureManager };
/**
 * 图像信息结构
 */
var TextureInfo = /** @class */ (function () {
    function TextureInfo() {
        this.img = null; // 图片
        this.id = null; // 纹理
        this.width = 0; // 宽度
        this.height = 0; // 高度
        this.usePremultply = false; // 是否启用Premult处理
        this.fileName = ''; // 文件名
    }
    return TextureInfo;
}());
export { TextureInfo };
