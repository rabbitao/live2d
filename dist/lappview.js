/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
import { Live2DCubismFramework as cubismMatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as cubismviewmatrix } from './framework/math/cubismviewmatrix';
var Csm_CubismViewMatrix = cubismviewmatrix.CubismViewMatrix;
var Csm_CubismMatrix44 = cubismMatrix44.CubismMatrix44;
import { TouchManager } from './touchmanager';
import { LAppDefine } from './lappdefine';
import { LAppLive2DManager } from './lapplive2dmanager';
import { LAppDelegate, canvas, gl } from './lappdelegate';
import { LAppPal } from './lapppal';
/**
 * 页面视图。
 */
var LAppView = /** @class */ (function () {
    /**
     * 构造函数
     */
    function LAppView() {
        this._changeModel = false; // 模型切换标志
        this._isClick = false; // 点击
        this._programId = null;
        this._back = null;
        this._gear = null;
        // 与触摸相关的事件管理
        this._touchManager = new TouchManager();
        // 用于从设备坐标转换为屏幕坐标
        this._deviceToScreen = new Csm_CubismMatrix44();
        // 用于缩放屏幕显示和转换运动的矩阵
        this._viewMatrix = new Csm_CubismViewMatrix();
    }
    /**
     * 初始化。
     */
    LAppView.prototype.initialize = function () {
        var width, height;
        width = canvas.width;
        height = canvas.height;
        var ratio = height / width;
        var left = LAppDefine.ViewLogicalLeft;
        var right = LAppDefine.ViewLogicalRight;
        var bottom = -ratio;
        var top = ratio;
        this._viewMatrix.setScreenRect(left, right, bottom, top); // 与设备对应的屏幕范围。 X左边缘，X右边缘，Y底边缘，Y顶边缘
        var screenW = Math.abs(left - right);
        this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        // 设置显示范围
        this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale); // 最大缩放
        this._viewMatrix.setMinScale(LAppDefine.ViewMinScale); // 最小缩放
        // 可显示的最大范围
        this._viewMatrix.setMaxScreenRect(LAppDefine.ViewLogicalMaxLeft, LAppDefine.ViewLogicalMaxRight, LAppDefine.ViewLogicalMaxBottom, LAppDefine.ViewLogicalMaxTop);
    };
    /**
     * 释放
     */
    LAppView.prototype.release = function () {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        this._gear.release();
        this._gear = null;
        this._back.release();
        this._back = null;
        gl.deleteProgram(this._programId);
        this._programId = null;
    };
    /**
     * 绘制。
     */
    LAppView.prototype.render = function () {
        gl.useProgram(this._programId);
        // 背景图像
        // if (this._back) {
        //   this._back.render(this._programId);
        // }
        // 齿轮
        // if (this._gear) {
        //   this._gear.render(this._programId);
        // }
        gl.flush();
        var live2DManager = LAppLive2DManager.getInstance();
        live2DManager.onUpdate();
    };
    /**
     * 执行图像初始化。
     */
    LAppView.prototype.initializeSprite = function () {
        var width = canvas.width;
        var height = canvas.height;
        var textureManager = LAppDelegate.getInstance().getTextureManager();
        var resourcesPath = LAppDefine.ResourcesPath;
        var imageName = '';
        // 背景图像初始化
        // imageName = LAppDefine.BackImageName;
        // // 创建一个回调函数，因为它是异步的
        // const initBackGroundTexture = (textureInfo: TextureInfo): void => {
        //   const x: number = width * 0.5;
        //   const y: number = height * 0.5;
        //   const fwidth = textureInfo.width * 2.0;
        //   const fheight = height * 0.95;
        //   this._back = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        // };
        // textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initBackGroundTexture);
        // // 齿轮图像初始化
        // imageName = LAppDefine.GearImageName;
        // const initGearTexture = (textureInfo: TextureInfo): void => {
        //   const x = width - textureInfo.width * 0.5;
        //   const y = height - textureInfo.height * 0.5;
        //   const fwidth = textureInfo.width;
        //   const fheight = textureInfo.height;
        //   this._gear = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        // };
        // textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initGearTexture);
        // 创建着色器
        if (this._programId == null) {
            this._programId = LAppDelegate.getInstance().createShader();
        }
    };
    /**
     * 触摸时调用。
     *
     * @param pointX 屏幕X坐标
     * @param pointY 屏幕Y坐标
     */
    LAppView.prototype.onTouchesBegan = function (pointX, pointY) {
        this._touchManager.touchesBegan(pointX, pointY);
    };
    /**
     * 触摸移动时调用。
     *
     * @param pointX 屏幕X坐标
     * @param pointY 屏幕Y坐标
     */
    LAppView.prototype.onTouchesMoved = function (pointX, pointY) {
        var viewX = this.transformViewX(this._touchManager.getX());
        var viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(pointX, pointY);
        var live2DManager = LAppLive2DManager.getInstance();
        live2DManager.onDrag(viewX, viewY);
    };
    /**
     * 触摸完成后调用。
     *
     * @param pointX 屏幕X坐标
     * @param pointY 屏幕Y坐标
     */
    LAppView.prototype.onTouchesEnded = function (pointX, pointY) {
        // 触摸结束
        var live2DManager = LAppLive2DManager.getInstance();
        live2DManager.onDrag(0.0, 0.0);
        {
            // 单击
            var x = this._deviceToScreen.transformX(this._touchManager.getX()); // 获取逻辑坐标变换坐标。
            var y = this._deviceToScreen.transformY(this._touchManager.getY()); // 获取逻辑坐标变换坐标。
            if (LAppDefine.DebugTouchLogEnable) {
                LAppPal.printLog('[APP]touchesEnded x: {0} y: {1}', x, y);
            }
            live2DManager.onTap(x, y);
            // 敲击齿轮
            if (this._gear && this._gear.isHit(pointX, pointY)) {
                LAppPal.printLog('[APP]click gear x: {0} y: {1}', pointX, pointY);
                // live2DManager.nextScene();
            }
        }
    };
    /**
     * 将X坐标转换为View坐标。
     *
     * @param deviceX 设备X坐标
     */
    LAppView.prototype.transformViewX = function (deviceX) {
        var screenX = this._deviceToScreen.transformX(deviceX); // 获取逻辑坐标变换坐标。
        return this._viewMatrix.invertTransformX(screenX); // 放大，缩小和移动后的值
    };
    /**
     * 将Y坐标转换为View坐标。
     *
     * @param deviceY 设备Y坐标
     */
    LAppView.prototype.transformViewY = function (deviceY) {
        var screenY = this._deviceToScreen.transformY(deviceY); // 获取逻辑坐标变换坐标。
        return this._viewMatrix.invertTransformY(screenY);
    };
    /**
     * 将X坐标转换为屏幕坐标。
     * @param deviceX 设备X坐标
     */
    LAppView.prototype.transformScreenX = function (deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    };
    /**
     * 将Y坐标转换为屏幕坐标。
     *
     * @param deviceY 设备Y坐标
     */
    LAppView.prototype.transformScreenY = function (deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    };
    return LAppView;
}());
export { LAppView };
