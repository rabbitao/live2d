/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismframework, LogLevel } from '../live2dcubismframework';
import { CSM_LOG_LEVEL, CSM_LOG_LEVEL_VERBOSE, CSM_LOG_LEVEL_DEBUG, CSM_LOG_LEVEL_INFO, CSM_LOG_LEVEL_WARNING, CSM_LOG_LEVEL_ERROR } from '../cubismframeworkconfig';
export var CubismLogPrint = function (level, fmt, args) {
    Live2DCubismFramework.CubismDebug.print(level, '[CSM]' + fmt, args);
};
export var CubismLogPrintIn = function (level, fmt, args) {
    CubismLogPrint(level, fmt + '\n', args);
};
export var CSM_ASSERT = function (expr) {
    console.assert(expr);
};
export var CubismLogVerbose = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
export var CubismLogDebug = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
export var CubismLogInfo = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
export var CubismLogWarning = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
export var CubismLogError = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
if (CSM_LOG_LEVEL <= CSM_LOG_LEVEL_VERBOSE) {
    CubismLogVerbose = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Verbose, '[V]' + fmt, args);
    };
    CubismLogDebug = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Debug, '[D]' + fmt, args);
    };
    CubismLogInfo = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_DEBUG) {
    CubismLogDebug = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Debug, '[D]' + fmt, args);
    };
    CubismLogInfo = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_INFO) {
    CubismLogInfo = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_WARNING) {
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_ERROR) {
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
// ------------ LIVE2D NAMESPACE ------------
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 用于调试的实用程序类。
     * 日志输出，字节转储等
     */
    var CubismDebug = /** @class */ (function () {
        /**
         * private 构造函数
         */
        function CubismDebug() {
        }
        /**
         * 输出日志。 在第一个参数中设置日志级别。
         * 如果它低于CubismFramework.initialize（）选项中设置的日志输出级别，它将不会输出到日志。
         *
         * @param logLevel 设置日志级别
         * @param format 格式化字符串
         * @param args 可变长度参数
         */
        CubismDebug.print = function (logLevel, format, args) {
            // 如果选项中设置的日志输出级别低于此值，不会记录
            if (logLevel < cubismframework.CubismFramework.getLoggingLevel()) {
                return;
            }
            var logPrint = cubismframework.CubismFramework.coreLogFunction;
            if (!logPrint) {
                return;
            }
            var buffer = format.replace(/\{(\d+)\}/g, function (m, k) {
                return args[k];
            });
            logPrint(buffer);
        };
        /**
         * 从数据中转储指定的长度。
         * 如果它低于CubismFramework.initialize（）选项中设置的日志输出级别，它将不会输出到日志。
         *
         * @param logLevel 设置日志级别
         * @param data 要转储的数据
         * @param length 转储的长度
         */
        CubismDebug.dumpBytes = function (logLevel, data, length) {
            for (var i = 0; i < length; i++) {
                if (i % 16 == 0 && i > 0) {
                    this.print(logLevel, '\n');
                }
                else if (i % 8 == 0 && i > 0) {
                    this.print(logLevel, '  ');
                }
                this.print(logLevel, '{0} ', [(data[i] & 0xFF)]);
            }
            this.print(logLevel, '\n');
        };
        return CubismDebug;
    }());
    Live2DCubismFramework.CubismDebug = CubismDebug;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
// ------------ LIVE2D NAMESPACE ------------
