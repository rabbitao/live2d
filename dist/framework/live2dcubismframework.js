/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/// <reference path="../live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismjson } from './utils/cubismjson';
import { Live2DCubismFramework as cubismidmanager } from './id/cubismidmanager';
import { Live2DCubismFramework as cubismrenderer } from './rendering/cubismrenderer';
import { CubismLogInfo, CubismLogWarning, CSM_ASSERT } from './utils/cubismdebug';
var Value = cubismjson.Value;
var CubismIdManager = cubismidmanager.CubismIdManager;
var CubismRenderer = cubismrenderer.CubismRenderer;
export function strtod(s, endPtr) {
    var index = 0;
    for (var i = 1;; i++) {
        var testC = s.slice(i - 1, i);
        // 跳过，因为有可能是索引或减号
        if (testC == 'e' || testC == '-' || testC == 'E') {
            continue;
        }
        // 扩展字符串的范围
        var test = s.substring(0, i);
        var number = Number(test);
        if (isNaN(number)) {
            // 完成因为它不能再被识别为数值
            break;
        }
        // 最后，将索引存储为数值
        index = i;
    }
    var d = parseFloat(s); // 解析的号码
    if (isNaN(d)) {
        // 完成因为它不能再被识别为数值
        d = NaN;
    }
    endPtr[0] = s.slice(index); // 尾随字符串
    return d;
}
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // 初始化文件范围变量
    var s_isStarted = false;
    var s_isInitialized = false;
    var s_option = null;
    var s_cubismIdManager = null;
    /**
     * 框架中使用的常量声明
     */
    var Constant;
    (function (Constant) {
        Constant.vertexOffset = 0; // 网格顶点偏移值
        Constant.vertexStep = 2; // 网格顶点步长值
    })(Constant = Live2DCubismFramework.Constant || (Live2DCubismFramework.Constant = {}));
    function csmDelete(address) {
        if (!address) {
            return;
        }
        address = void 0;
    }
    Live2DCubismFramework.csmDelete = csmDelete;
    /**
     * Live2D Cubism3原创工作流程SDK的切入点
     * 在使用开始时调用CubismFramework.initialize（）并以CubismFramework.dispose（）结束。
     */
    var CubismFramework = /** @class */ (function () {
        /**
         * 用作静态类
         * 不要实例化
         */
        function CubismFramework() {
        }
        /**
         * 启用Cubism Framework API。
         *  确保在执行API之前执行此功能。
         *  准备完成后，即使再次执行，也会跳过内部处理。
         *
         * @param    option      选项类实例
         *
         * @return   准备过程完成后返回true。
         */
        CubismFramework.startUp = function (option) {
            if (option === void 0) { option = null; }
            if (s_isStarted) {
                CubismLogInfo('CubismFramework.startUp() is already done.');
                return s_isStarted;
            }
            s_option = option;
            if (s_option != null) {
                Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
            }
            s_isStarted = true;
            // 显示Live2D Cubism Core版本信息
            if (s_isStarted) {
                var version = Live2DCubismCore.Version.csmGetVersion();
                var major = ((version & 0xFF000000) >> 24);
                var minor = ((version & 0x00FF0000) >> 16);
                var patch = ((version & 0x0000FFFF));
                var versionNumber = version;
                CubismLogInfo("Live2D Cubism Core version: {0}.{1}.{2} ({3})", ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
            }
            CubismLogInfo('CubismFramework.startUp() is complete.');
            return s_isStarted;
        };
        /**
         * 清除StartUp（）初始化的CubismFramework的每个参数。
         * 重新使用已经Dispose（）的CubismFramework时请使用它。
         */
        CubismFramework.cleanUp = function () {
            s_isStarted = false;
            s_isInitialized = false;
            s_option = null;
            s_cubismIdManager = null;
        };
        /**
         * 初始化Cubism Framework中的资源并使模型可显示。<br>
         * 要再次initialize()，必须首先执行Dispose（）
         */
        CubismFramework.initialize = function () {
            CSM_ASSERT(s_isStarted);
            if (!s_isStarted) {
                CubismLogWarning('CubismFramework is not started.');
                return;
            }
            // --- 使用s_isInitialized进行连续初始化保护 ---
            // 确保不会持续分配资源。
            // 要再次初initialize()，必须首先执行Dispose（）
            if (s_isInitialized) {
                CubismLogWarning('CubismFramework.initialize() skipped, already initialized.');
                return;
            }
            // ---- static 初始化 ----
            Value.staticInitializeNotForClientCall();
            s_cubismIdManager = new CubismIdManager();
            s_isInitialized = true;
            CubismLogInfo('CubismFramework.initialize() is complete.');
        };
        /**
         * 释放Cubism Framework中的所有资源
         * 但是，不会释放外部保留的资源。
         * 必须妥善处理外部。
         */
        CubismFramework.dispose = function () {
            CSM_ASSERT(s_isStarted);
            if (!s_isStarted) {
                CubismLogWarning('CubismFramework is not started.');
                return;
            }
            // --- 由s_isInitialized判定是否未执行过初始化 ---
            // 要dispose（），首先需要执行initialize（）。
            if (!s_isInitialized) {
                CubismLogWarning('CubismFramework.dispose() skipped, not initialized.');
                return;
            }
            Value.staticReleaseNotForClientCall();
            s_cubismIdManager.release();
            s_cubismIdManager = null;
            // 释放渲染器静态资源（着色器程序等）
            CubismRenderer.staticRelease();
            s_isInitialized = false;
            CubismLogInfo('CubismFramework.dispose() is complete.');
        };
        /**
         * 您是否准备好使用Cubism Framework API
         * @return 如果API可以使用，则返回true。
         */
        CubismFramework.isStarted = function () {
            return s_isStarted;
        };
        /**
         * 是否已执行Cubism Framework资源初始化
         * @return 如果资源分配完成，则返回true
         */
        CubismFramework.isInitialized = function () {
            return s_isInitialized;
        };
        /**
         * 执行绑定到Core API的日志功能
         *
         * @praram message 消息日志
         */
        CubismFramework.coreLogFunction = function (message) {
            // Return if logging not possible.
            if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
                return;
            }
            Live2DCubismCore.Logging.csmGetLogFunction()(message);
        };
        /**
         * 返回当前日志输出级别设置的值。
         *
         * @return  当前日志输出级别设置值
         */
        CubismFramework.getLoggingLevel = function () {
            if (s_option != null) {
                return s_option.loggingLevel;
            }
            return LogLevel.LogLevel_Off;
        };
        /**
         * 获取ID Manager的实例
         * @return CubismManager类的实例
         */
        CubismFramework.getIdManager = function () {
            return s_cubismIdManager;
        };
        return CubismFramework;
    }());
    Live2DCubismFramework.CubismFramework = CubismFramework;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
var Option = /** @class */ (function () {
    function Option() {
        this.logFunction = undefined; // 日志输出的函数对象
        this.loggingLevel = undefined; // 设置日志输出级别
    }
    return Option;
}());
export { Option };
/**
 * ログ出力のレベル
 */
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
    LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
    LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
    LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
    LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
    LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off";
})(LogLevel || (LogLevel = {}));
