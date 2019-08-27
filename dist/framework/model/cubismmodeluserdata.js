/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
import { Live2DCubismFramework as cubismmodeluserdatajson } from './cubismmodeluserdatajson';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
var CubismFramework = cubismframework.CubismFramework;
var csmVector = csmvector.csmVector;
var csmString = csmstring.csmString;
var CubismModelUserDataJson = cubismmodeluserdatajson.CubismModelUserDataJson;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var ArtMesh = 'ArtMesh';
    /**
     * 用户数据界面
     *
     * 记录从Json读取的用户数据的结构
     */
    var CubismModelUserDataNode = /** @class */ (function () {
        function CubismModelUserDataNode() {
            this.targetType = undefined; // 用户数据目标类型
            this.targetId = undefined; // 用户数据目标ID
            this.value = undefined; // 用户数据
        }
        return CubismModelUserDataNode;
    }());
    Live2DCubismFramework.CubismModelUserDataNode = CubismModelUserDataNode;
    /**
     * 用户数据管理类
     *
     * 加载，管理，搜索界面和发布用户数据
     */
    var CubismModelUserData = /** @class */ (function () {
        /**
         * 构造函数
         */
        function CubismModelUserData() {
            this._userDataNodes = new csmVector();
            this._artMeshUserDataNode = new csmVector();
        }
        /**
         * 创建实例
         *
         * @param buffer    加载userdata3.json的缓冲区
         * @param size      缓冲区大小
         * @return 创建实例
         */
        CubismModelUserData.create = function (buffer, size) {
            var ret = new CubismModelUserData();
            ret.parseUserData(buffer, size);
            return ret;
        };
        /**
         * 销毁实例
         *
         * @param modelUserData 毁灭的实例
         */
        CubismModelUserData.delete = function (modelUserData) {
            if (modelUserData != null) {
                modelUserData.release();
                modelUserData = null;
            }
        };
        /**
         * 获取ArtMesh用户数据列表
         *
         * @return 用户数据列表
         */
        CubismModelUserData.prototype.getArtMeshUserDatas = function () {
            return this._artMeshUserDataNode;
        };
        /**
         * userdata3.json解析
         *
         * @param buffer    读取userdata3.json的缓冲区
         * @param size      缓冲区大小
         */
        CubismModelUserData.prototype.parseUserData = function (buffer, size) {
            var json = new CubismModelUserDataJson(buffer, size);
            var typeOfArtMesh = CubismFramework.getIdManager().getId(ArtMesh);
            var nodeCount = json.getUserDataCount();
            for (var i = 0; i < nodeCount; i++) {
                var addNode = new CubismModelUserDataNode();
                addNode.targetId = json.getUserDataId(i);
                addNode.targetType = CubismFramework.getIdManager().getId(json.getUserDataTargetType(i));
                addNode.value = new csmString(json.getUserDataValue(i));
                this._userDataNodes.pushBack(addNode);
                if (addNode.targetType == typeOfArtMesh) {
                    this._artMeshUserDataNode.pushBack(addNode);
                }
            }
            json.release();
            json = void 0;
        };
        /**
         * 析构函数等效处理
         *
         * 释放用户数据数组
         */
        CubismModelUserData.prototype.release = function () {
            for (var i = 0; i < this._userDataNodes.getSize(); ++i) {
                this._userDataNodes.set(i, null);
            }
            this._userDataNodes = null;
        };
        return CubismModelUserData;
    }());
    Live2DCubismFramework.CubismModelUserData = CubismModelUserData;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
