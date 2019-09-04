/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as live2dcubismframework, Option as Csm_Option } from './framework/live2dcubismframework';
import { Live2DCubismFramework as cubismmatrix44 } from './framework/math/cubismmatrix44';
var Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;
var Csm_CubismFramework = live2dcubismframework.CubismFramework;
import { LAppView } from './lappview';
import { LAppPal } from './lapppal';
import { LAppTextureManager } from './lapptexturemanager';
import { LAppLive2DManager } from './lapplive2dmanager';
import { LAppDefine } from './lappdefine';
export var canvas = null;
export var s_instance = null;
export var gl = null;
export var frameBuffer = null;
/**
 * 应用类。
 * 管理Cubism3。
 */
var LAppDelegate = /** @class */ (function () {
    /**
     * 构造函数
     */
    function LAppDelegate() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._cubismOption = new Csm_Option();
        this._view = new LAppView();
        this._textureManager = new LAppTextureManager();
    }
    /**
     * 返回类的实例（单例）。
     * 如果尚未创建实例，则会在内部创建实例。
     *
     * @return 一个类的实例
     */
    LAppDelegate.getInstance = function () {
        if (s_instance == null) {
            s_instance = new LAppDelegate();
        }
        return s_instance;
    };
    /**
     * 释放一个类的实例（单例）。
     */
    LAppDelegate.releaseInstance = function () {
        if (s_instance != null) {
            s_instance.release();
        }
        s_instance = null;
    };
    /**
     * 初始化您需要的APP。
     */
    LAppDelegate.prototype.initialize = function (config) {
        var _this = this;
        // 创建html元素
        var wrap = document.getElementById('live2d-core-wrap');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.id = 'live2d-core-wrap';
            wrap.style.position = 'absolute';
            wrap.style.width = '100%';
            wrap.style.height = '100%';
            wrap.style.top = '0px';
            wrap.style.left = '0px';
            canvas = document.createElement('canvas');
            canvas.id = 'live2d-core-canvas';
            canvas.style.position = 'absolute';
            canvas.style.left = '0px';
            canvas.style.top = '0px';
            canvas.setAttribute('width', config.width.toString());
            canvas.setAttribute('height', config.height.toString());
            wrap.appendChild(canvas);
            document.body.appendChild(wrap);
        }
        // 获得画布
        canvas = document.getElementById('live2d-core-canvas');
        // 初始化gl上下文
        gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) || canvas.getContext('experimental-webgl');
        if (!gl) {
            alert('WebGL无法初始化。 浏览器似乎不支持');
            gl = null;
            // gl初始化失敗
            return false;
        }
        if (!frameBuffer) {
            frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        }
        // 透明度设置
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        var supportTouch = 'ontouchend' in canvas;
        if (supportTouch) {
            // 与触摸相关的回调函数注册
            /**
            * 触摸时调用。
            */
            canvas.ontouchstart = function (e) {
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                _this._captured = true;
                var posX = e.changedTouches[0].pageX;
                var posY = e.changedTouches[0].pageY;
                _this._view.onTouchesBegan(posX, posY);
            };
            /*
            * 触摸移动时调用。
            */
            canvas.ontouchmove = function (e) {
                if (!_this._captured) {
                    return;
                }
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                var rect = e.target.getBoundingClientRect();
                var posX = e.changedTouches[0].clientX - rect.left;
                var posY = e.changedTouches[0].clientY - rect.top;
                _this._view.onTouchesMoved(posX, posY);
            };
            /*
            * 触摸完成时调用。
            */
            canvas.ontouchend = function (e) {
                _this._captured = false;
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                var rect = e.target.getBoundingClientRect();
                var posX = e.changedTouches[0].clientX - rect.left;
                var posY = e.changedTouches[0].clientY - rect.top;
                _this._view.onTouchesEnded(posX, posY);
            };
            /*
          * 取消触摸。
          */
            canvas.ontouchcancel = function (e) {
                _this._captured = false;
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                var rect = e.target.getBoundingClientRect();
                var posX = e.changedTouches[0].clientX - rect.left;
                var posY = e.changedTouches[0].clientY - rect.top;
                _this._view.onTouchesEnded(posX, posY);
            };
        }
        else {
            // 注册鼠标相关的回调函数
            canvas.onmousedown = function (e) {
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                _this._captured = true;
                var posX = e.pageX;
                var posY = e.pageY;
                _this._view.onTouchesBegan(posX, posY);
            };
            canvas.onmousemove = function (e) {
                if (!_this._captured) {
                    return;
                }
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                var rect = e.target.getBoundingClientRect();
                var posX = e.clientX - rect.left;
                var posY = e.clientY - rect.top;
                _this._view.onTouchesMoved(posX, posY);
            };
            canvas.onmouseup = function (e) {
                _this._captured = false;
                if (!_this._view) {
                    LAppPal.printLog('view notfound');
                    return;
                }
                var rect = e.target.getBoundingClientRect();
                var posX = e.clientX - rect.left;
                var posY = e.clientY - rect.top;
                _this._view.onTouchesEnded(posX, posY);
            };
        }
        // AppView初始化
        this._view.initialize();
        // Cubism3初始化
        this.initializeCubism();
        return true;
    };
    /**
     * 释放。
     */
    LAppDelegate.prototype.release = function () {
        this._textureManager.release();
        this._textureManager = null;
        this._view.release();
        this._view = null;
        // 释放资源
        LAppLive2DManager.releaseInstance();
        // Cubism3释放
        Csm_CubismFramework.dispose();
    };
    /**
     * 执行过程。
     */
    LAppDelegate.prototype.run = function () {
        var _this = this;
        // 主循环
        var loop = function () {
            // 检查实例
            if (s_instance == null) {
                return;
            }
            // 时间更新
            LAppPal.updateTime();
            // 屏幕初始化
            gl.clearColor(1, 1, 1, 0);
            // 启用深度测试
            gl.enable(gl.DEPTH_TEST);
            // 附近的物体遮挡了远处的物体
            gl.depthFunc(gl.LEQUAL);
            // 清除颜色缓冲区和深度缓冲区
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.clearDepth(1.0);
            // 透明度设置
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            // 绘图更新
            _this._view.render();
            // 递归调用循环
            requestAnimationFrame(loop);
        };
        loop();
    };
    /**
     * 注册着色器。
     */
    LAppDelegate.prototype.createShader = function () {
        // 顶点着色器编译
        var vertexShaderId = gl.createShader(gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            LAppPal.printLog('failed to create vertexShader');
            return null;
        }
        var vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        gl.shaderSource(vertexShaderId, vertexShader);
        gl.compileShader(vertexShaderId);
        // 片段着色器编译
        var fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            LAppPal.printLog('failed to create fragmentShader');
            return null;
        }
        var fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        gl.shaderSource(fragmentShaderId, fragmentShader);
        gl.compileShader(fragmentShaderId);
        // 创建程序对象
        var programId = gl.createProgram();
        gl.attachShader(programId, vertexShaderId);
        gl.attachShader(programId, fragmentShaderId);
        gl.deleteShader(vertexShaderId);
        gl.deleteShader(fragmentShaderId);
        // 链接
        gl.linkProgram(programId);
        gl.useProgram(programId);
        return programId;
    };
    /**
     * 获取查看信息。
     */
    LAppDelegate.prototype.getView = function () {
        return this._view;
    };
    LAppDelegate.prototype.getTextureManager = function () {
        return this._textureManager;
    };
    /**
     * Cubism3初始化
     */
    LAppDelegate.prototype.initializeCubism = function () {
        // setup cubism
        this._cubismOption.logFunction = LAppPal.printMessage;
        this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
        Csm_CubismFramework.startUp(this._cubismOption);
        // initialize cubism
        Csm_CubismFramework.initialize();
        // default proj
        var projection = new Csm_CubismMatrix44();
        LAppPal.updateTime();
        this._view.initializeSprite();
    };
    return LAppDelegate;
}());
export { LAppDelegate };
