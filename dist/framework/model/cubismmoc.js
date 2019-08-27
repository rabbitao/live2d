/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/// <reference path="../../live2dcubismcore.d.ts" />
import { Live2DCubismFramework as cubismmodel } from './cubismmodel';
var CubismModel = cubismmodel.CubismModel;
import { CSM_ASSERT } from '../utils/cubismdebug';
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 管理Moc数据
     *
     * 管理Moc数据的类。
     */
    var CubismMoc = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismMoc(moc) {
            this._moc = moc;
            this._modelCount = 0;
        }
        /**
         * 创建Moc数据
         */
        CubismMoc.create = function (mocBytes) {
            var cubismMoc = null;
            var moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
            if (moc) {
                cubismMoc = new CubismMoc(moc);
            }
            return cubismMoc;
        };
        /**
         * 删除Moc数据
         *
         * 删除Moc数据
         */
        CubismMoc.delete = function (moc) {
            moc._moc._release();
            moc._moc = null;
            moc = null;
        };
        /**
         * 创建一个模型
         *
         * @return 从Moc数据创建的模型
         */
        CubismMoc.prototype.createModel = function () {
            var cubismModel = null;
            var model = Live2DCubismCore.Model.fromMoc(this._moc);
            if (model) {
                cubismModel = new CubismModel(model);
                cubismModel.initialize();
                ++this._modelCount;
            }
            return cubismModel;
        };
        /**
         * 删除模型
         */
        CubismMoc.prototype.deleteModel = function (model) {
            if (model != null) {
                model.release();
                model = null;
                --this._modelCount;
            }
        };
        /**
         * 析构函数等效处理
         */
        CubismMoc.prototype.release = function () {
            CSM_ASSERT(this._modelCount == 0);
            this._moc._release();
            this._moc = null;
        };
        return CubismMoc;
    }());
    Live2DCubismFramework.CubismMoc = CubismMoc;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
