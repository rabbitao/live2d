/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
/**
 * 抽象平台依赖功能 Cubism Platform Abstraction Layer.
 *
 * 将与平台相关的功能放在一起，例如文件读取和时间采集。
 */
var LAppPal = /** @class */ (function () {
    function LAppPal() {
    }
    LAppPal.fetchFile = function (path, type) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', path, true);
            if (type) {
                request.responseType = type;
            }
            request.onload = function () {
                var options = {
                    status: request.status,
                    statusText: request.statusText,
                };
                if ((new RegExp('^file:\/\/\\S+')).test(window.location.href) && options.status === 0) {
                    options.status = 200;
                }
                var body = 'response' in request ? request.response : request.responseText;
                resolve(new Response(body, options));
            };
            request.onerror = function () {
                reject(new TypeError('Local request failed'));
            };
            request.send();
        });
    };
    /**
     * 将文件作为字节数据读取
     *
     * @param filePath 要读取的文件的路径
     * @return
     * {
     *      buffer,   字节数据读取
     *      size        文件大小
     * }
     */
    LAppPal.loadFileAsBytes = function (filePath, callback) {
        // filePath;//
        var path = filePath;
        var size = 0;
        this.fetchFile(path, 'arraybuffer').then(function (response) {
            return response.arrayBuffer();
        }).then(function (arrayBuffer) {
            size = arrayBuffer.byteLength;
            callback(arrayBuffer, size);
        });
    };
    /**
     * 释放字节数据
     * @param byteData 要释放的字节数据
     */
    LAppPal.releaseBytes = function (byteData) {
        byteData = void 0;
    };
    /**
     * 获取增量时间（与前一帧的差异)
     * @return 时间[ms]
     */
    LAppPal.getDeltaTime = function () {
        return this.s_deltaTime;
    };
    LAppPal.updateTime = function () {
        this.s_currentFrame = Date.now();
        this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000;
        this.s_lastFrame = this.s_currentFrame;
    };
    /**
     * 输出日志
     * @param format 格式化字符串
     * @param ... args（可变长度参数）字符串
     */
    LAppPal.printLog = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log(format.replace(/\{(\d+)\}/g, function (m, k) {
            return args[k];
        }));
    };
    /**
     * 输出消息
     * @param message 字符串
     */
    LAppPal.printMessage = function (message) {
        LAppPal.printLog(message);
    };
    LAppPal.lastUpdate = Date.now();
    LAppPal.s_currentFrame = 0.0;
    LAppPal.s_lastFrame = 0.0;
    LAppPal.s_deltaTime = 0.0;
    return LAppPal;
}());
export { LAppPal };
