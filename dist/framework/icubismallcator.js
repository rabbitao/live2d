/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 一个抽象内存分配的类
     *
     * 在平台端实现内存分配/释放处理
     * 从框架调用的接口
     */
    var ICubismAllocator = /** @class */ (function () {
        function ICubismAllocator() {
        }
        return ICubismAllocator;
    }());
    Live2DCubismFramework.ICubismAllocator = ICubismAllocator;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
