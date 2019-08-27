/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
import { Live2DCubismFramework as cubismmatrix44 } from './framework/math/cubismmatrix44';
import { Live2DCubismFramework as csmvector } from './framework/type/csmvector';
var Csm_csmVector = csmvector.csmVector;
var Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import { LAppModel } from './lappmodel';
import { LAppDefine } from './lappdefine';
import { LAppPal } from './lapppal';
import { canvas } from './lappdelegate';
export var s_instance = null;
/**
 * 在示例应用程序中管理CubismModel的类
 * 模型生成和销毁，点击事件处理，模型切换。
 */
var LAppLive2DManager = /** @class */ (function () {
    /**
     * 构造函数
     */
    function LAppLive2DManager() {
        this._viewMatrix = new Csm_CubismMatrix44();
        this._models = new Csm_csmVector();
        this._userModels = [];
    }
    /**
     * 返回类的实例（单例）。
     * 如果尚未创建实例，则会在内部创建实例。
     *
     * @return 一个类的实例
     */
    LAppLive2DManager.getInstance = function () {
        if (s_instance == null) {
            s_instance = new LAppLive2DManager();
        }
        return s_instance;
    };
    /**
     * 释放一个类的实例（单例）。
     */
    LAppLive2DManager.releaseInstance = function () {
        if (s_instance != null) {
            s_instance = void 0;
        }
        s_instance = null;
    };
    /**
     * 返回当前场景中保存的模型。
     *
     * @param no 模型列表索引值
     * @return 返回模型的实例。 如果索引值超出范围，则返回NULL。
     */
    LAppLive2DManager.prototype.getModel = function (nameOrIndex) {
        if (typeof (nameOrIndex) === 'number' && nameOrIndex < this._models.getSize()) {
            return this._models.at(nameOrIndex);
        }
        else {
            for (var i = 0; i < this._models.getSize(); i++) {
                if (this._models.at(i)._modelName === nameOrIndex) {
                    return this._models.at(i);
                }
            }
        }
        return null;
    };
    /**
     * 释放当前场景中保存的所有模型
     */
    LAppLive2DManager.prototype.releaseAllModel = function () {
        for (var i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    };
    /**
     * 拖动屏幕的时候
     *
     * @param x 屏幕的X坐标
     * @param y 屏幕的Y坐标
     */
    LAppLive2DManager.prototype.onDrag = function (x, y) {
        for (var i = 0; i < this._models.getSize(); i++) {
            var model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    };
    /**
     * 点按屏幕的时候
     *
     * @param x 屏幕的X坐标
     * @param y 屏幕的Y坐标
     */
    LAppLive2DManager.prototype.onTap = function (x, y) {
        if (LAppDefine.DebugLogEnable) {
            LAppPal.printLog('[APP]tap point: {x: {0} y: {1}}', x.toFixed(2), y.toFixed(2));
        }
        for (var i = 0; i < this._models.getSize(); i++) {
            if (this._models.at(i).hitTest(LAppDefine.HitAreaNameNose, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    LAppPal.printLog('[APP]hit area: [{0}]', LAppDefine.HitAreaNameNose);
                }
                this._models.at(i).startRandomMotion(LAppDefine.MotionGroupTapNose, LAppDefine.PriorityNormal);
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameGem, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    LAppPal.printLog('[APP]hit area: [{0}]', LAppDefine.HitAreaNameGem);
                }
                this._models.at(i).startRandomMotion(LAppDefine.MotionGroupTapGem, LAppDefine.PriorityNormal);
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    LAppPal.printLog('[APP]hit area: [{0}]', LAppDefine.HitAreaNameHead);
                }
                this._models.at(i).setRandomExpression();
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    LAppPal.printLog('[APP]hit area: [{0}]', LAppDefine.HitAreaNameBody);
                }
                this._models.at(i).startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal);
            }
        }
    };
    /**
     * 更新屏幕时进行处理
     * 执行模型更新处理和绘图处理
     */
    LAppLive2DManager.prototype.onUpdate = function () {
        var projection = new Csm_CubismMatrix44();
        var width, height;
        width = canvas.width;
        height = canvas.height;
        projection.scale(1.0, width / height);
        if (this._viewMatrix != null) {
            projection.multiplyByMatrix(this._viewMatrix);
        }
        var saveProjection = projection.clone();
        var modelCount = this._models.getSize();
        for (var i = 0; i < modelCount; ++i) {
            var model = this.getModel(i);
            projection = saveProjection.clone();
            model.update();
            model.draw(projection); // 投影更改，因为它是通过引用传递的。
        }
    };
    /**
     * 切换场景
     * 在示例应用程序中，切换模型集。
     */
    LAppLive2DManager.prototype.addModel = function (resource) {
        var _this = this;
        return new Promise(function (resolve) {
            if (LAppDefine.DebugLogEnable) {
                LAppPal.printLog('[APP]model {0}', resource.modelName);
            }
            var modelFileName = resource.modelName + '.model3.json';
            // this.releaseAllModel();
            var mdl = _this.getModel(resource.modelName);
            if (mdl) {
                resolve(mdl);
            }
            var newModel = new LAppModel(resource);
            _this._models.pushBack(newModel);
            newModel.loadAssets(resource.path, modelFileName, resource.modelName).then(function () {
                resolve(newModel);
            }).catch(function () {
                resolve(null);
            });
        });
    };
    return LAppLive2DManager;
}());
export { LAppLive2DManager };
