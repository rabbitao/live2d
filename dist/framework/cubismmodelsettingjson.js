/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Live2DCubismFramework as cubismframework } from './live2dcubismframework';
import { Live2DCubismFramework as icubismmodelsetting } from './icubismmodelsetting';
import { Live2DCubismFramework as cubismjson } from './utils/cubismjson';
import { Live2DCubismFramework as csmvector } from './type/csmvector';
var csmVector = csmvector.csmVector;
var CubismFramework = cubismframework.CubismFramework;
var CubismJson = cubismjson.CubismJson;
var ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * Model3Json键字符串
     */
    // JSON Keys
    var Version = 'Version';
    var FileReferences = 'FileReferences';
    var Groups = 'Groups';
    var Layout = 'Layout';
    var HitAreas = 'HitAreas';
    var Moc = 'Moc';
    var Textures = 'Textures';
    var Physics = 'Physics';
    var Pose = 'Pose';
    var Expressions = 'Expressions';
    var Motions = 'Motions';
    var UserData = 'UserData';
    var Name = 'Name';
    var FilePath = 'File';
    var Id = 'Id';
    var Ids = 'Ids';
    var Target = 'Target';
    // Motions
    var Idle = 'Idle';
    var TapBody = 'TapBody';
    var PinchIn = 'PinchIn';
    var PinchOut = 'PinchOut';
    var Shake = 'Shake';
    var FlickHead = 'FlickHead';
    var Parameter = 'Parameter';
    var SoundPath = 'Sound';
    var FadeInTime = 'FadeInTime';
    var FadeOutTime = 'FadeOutTime';
    // Layout
    var CenterX = 'CenterX';
    var CenterY = 'CenterY';
    var X = 'X';
    var Y = 'Y';
    var Width = 'Width';
    var Height = 'Height';
    var LipSync = 'LipSync';
    var EyeBlink = 'EyeBlink';
    var InitParameter = 'init_param';
    var InitPartsVisible = 'init_parts_visible';
    var Val = 'val';
    var FrequestNode;
    (function (FrequestNode) {
        FrequestNode[FrequestNode["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
        FrequestNode[FrequestNode["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
        FrequestNode[FrequestNode["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
        FrequestNode[FrequestNode["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
        FrequestNode[FrequestNode["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
        FrequestNode[FrequestNode["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
        FrequestNode[FrequestNode["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
        FrequestNode[FrequestNode["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas";
    })(FrequestNode || (FrequestNode = {}));
    /**
     * Model3Json分析器
     *
     * 解析model3.json文件并获取值
     */
    var CubismModelSettingJson = /** @class */ (function (_super) {
        __extends(CubismModelSettingJson, _super);
        /**
         * 带参数的构造函数
         *
         * @param buffer    将Model3Json读取为字节数组的数据缓冲区
         * @param size      Model3Json的数据大小
         */
        function CubismModelSettingJson(buffer, size) {
            var _this = _super.call(this) || this;
            _this._jsonValue = undefined;
            _this._json = CubismJson.create(buffer, size);
            if (_this._json) {
                _this._jsonValue = new csmVector();
                // 该顺序应与enum FrequestNode匹配
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(Groups));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Moc));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Motions));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Expressions));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Textures));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Physics));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Pose));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(HitAreas));
            }
            return _this;
        }
        /**
         * 释放
         */
        CubismModelSettingJson.prototype.release = function () {
            CubismJson.delete(this._json);
            this._jsonValue = null;
        };
        /**
         * 获取CubismJson对象
         *
         * @return CubismJson
         */
        CubismModelSettingJson.prototype.GetJson = function () {
            return this._json;
        };
        /**
         * 获取Moc文件的名称
         * @return Moc文件的名称
         */
        CubismModelSettingJson.prototype.getModelFileName = function () {
            if (!this.isExistModelFile()) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
        };
        /**
         * 获取模型使用的纹理数
         * @return 纹理数量
         */
        CubismModelSettingJson.prototype.getTextureCount = function () {
            if (!this.isExistTextureFiles()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
        };
        /**
         * 获取纹理所在目录的名称
         * @return 纹理所在目录的名称
         */
        CubismModelSettingJson.prototype.getTextureDirectory = function () {
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getRawString();
        };
        /**
         * 获取模型使用的纹理的名称
         * @param index 数组索引值
         * @return 纹理的名称
         */
        CubismModelSettingJson.prototype.getTextureFileName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getValueByIndex(index).getRawString();
        };
        /**
         * 获取为模型设置的命中判断次数
         * @return 为模型设置的命中判断数
         */
        CubismModelSettingJson.prototype.getHitAreasCount = function () {
            if (!this.isExistHitAreas()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
        };
        /**
         * 获取为命中判断设置的ID
         *
         * @param index 数组索引
         * @return 为命中判断设置的ID
         */
        CubismModelSettingJson.prototype.getHitAreaId = function (index) {
            return CubismFramework.getIdManager().getId(this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getValueByIndex(index).getValueByString(Id).getRawString());
        };
        /**
         * 获取为命中判断设置的名称
         * @param index 数组索引值
         * @return 为命中判断设置的名称
         */
        CubismModelSettingJson.prototype.getHitAreaName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getValueByIndex(index).getValueByString(Name).getRawString();
        };
        /**
         * 获取物理计算设置文件的名称
         * @return 物理计算设定文件的名称
         */
        CubismModelSettingJson.prototype.getPhysicsFileName = function () {
            if (!this.isExistPhysicsFile()) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
        };
        /**
         * 获取部件切换设置文件的名称
         * @return 部件切换设置文件的名称
         */
        CubismModelSettingJson.prototype.getPoseFileName = function () {
            if (!this.isExistPoseFile()) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
        };
        /**
         * 获取面部表情设置文件的数量
         * @return 面部表情设置文件的数量
         */
        CubismModelSettingJson.prototype.getExpressionCount = function () {
            if (!this.isExistExpressionFile()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
        };
        /**
         * 获取标识面部表情设置文件的名称（别名）
         * @param index 数组索引值
         * @return 面部表情名称
         */
        CubismModelSettingJson.prototype.getExpressionName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getValueByIndex(index).getValueByString(Name).getRawString();
        };
        /**
         * 获取面部表情设置文件的名称
         * @param index 数组索引值
         * @return 面部表情设置文件的名称
         */
        CubismModelSettingJson.prototype.getExpressionFileName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getValueByIndex(index).getValueByString(FilePath).getRawString();
        };
        /**
         * 获取运动组的数量
         * @return 运动组数量
         */
        CubismModelSettingJson.prototype.getMotionGroupCount = function () {
            if (!this.isExistMotionGroups()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getKeys().getSize();
        };
        /**
         * 获取运动组的名称
         * @param index 数组索引值
         * @return 运动组的名称
         */
        CubismModelSettingJson.prototype.getMotionGroupName = function (index) {
            if (!this.isExistMotionGroups()) {
                return null;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getKeys().at(index);
        };
        /**
         * 获取运动组中的运动次数
         * @param groupName 运动组的名称
         * @return 运动组数量
         */
        CubismModelSettingJson.prototype.getMotionCount = function (groupName) {
            if (!this.isExistMotionGroupName(groupName)) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getSize();
        };
        /**
         * 从组名和索引值中获取动作文件名
         * @param groupName 运动组的名称
         * @param index     数组索引值
         * @return 动画文件的名称
         */
        CubismModelSettingJson.prototype.getMotionFileName = function (groupName, index) {
            if (!this.isExistMotionGroupName(groupName)) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FilePath).getRawString();
        };
        /**
         * 获取与动作对应的声音文件的名称
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 声音文件的名称
         */
        CubismModelSettingJson.prototype.getMotionSoundFileName = function (groupName, index) {
            if (!this.isExistMotionSoundFile(groupName, index)) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(SoundPath).getRawString();
        };
        /**
         * 在动作开始时获得淡入处理时间
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 淡入处理时间[秒]
         */
        CubismModelSettingJson.prototype.getMotionFadeInTimeValue = function (groupName, index) {
            if (!this.isExistMotionFadeIn(groupName, index)) {
                return -1.0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeInTime).toFloat();
        };
        /**
         * 在运动结束时获得淡出处理时间
         * @param groupName 运动组的名称
         * @param index 数组索引值
         * @return 淡出处理时间[秒]
         */
        CubismModelSettingJson.prototype.getMotionFadeOutTimeValue = function (groupName, index) {
            if (!this.isExistMotionFadeOut(groupName, index)) {
                return -1.0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeOutTime).toFloat();
        };
        /**
         * 获取用户数据文件名
         * @return 用户数据文件名
         */
        CubismModelSettingJson.prototype.getUserDataFile = function () {
            if (!this.isExistUserDataFile()) {
                return '';
            }
            return this._json.getRoot().getValueByString(FileReferences).getValueByString(UserData).getRawString();
        };
        /**
         * 获取布局信息
         * @param outLayoutMap csmMap类实例
         * @return true 存在布局信息
         * @return false 不存在布局信息
         */
        CubismModelSettingJson.prototype.getLayoutMap = function (outLayoutMap) {
            // 如果访问了不存在的元素，则会发生错误，因此如果Value为null，则赋值为null
            var map = this._json.getRoot().getValueByString(Layout).getMap();
            if (map == null) {
                return false;
            }
            var ret = false;
            for (var ite = map.begin(); ite.notEqual(map.end()); ite.preIncrement()) {
                outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
                ret = true;
            }
            return ret;
        };
        /**
         * 获取与眼贴相关的参数数量
         * @return 与眼贴相关的参数数量
         */
        CubismModelSettingJson.prototype.getEyeBlinkParameterCount = function () {
            if (!this.isExistEyeBlinkParameters()) {
                return 0;
            }
            var num = 0;
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                    num = refI.getValueByString(Ids).getVector().getSize();
                    break;
                }
            }
            return num;
        };
        /**
         * 获取与眼贴相关的参数的ID
         * @param index 数组索引值
         * @return 参数ID
         */
        CubismModelSettingJson.prototype.getEyeBlinkParameterId = function (index) {
            if (!this.isExistEyeBlinkParameters()) {
                return null;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                    return CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
                }
            }
            return null;
        };
        /**
         * 获取与唇形同步相关的参数数量
         * @return 与唇形同步相关的参数数量
         */
        CubismModelSettingJson.prototype.getLipSyncParameterCount = function () {
            if (!this.isExistLipSyncParameters()) {
                return 0;
            }
            var num = 0;
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == LipSync) {
                    num = refI.getValueByString(Ids).getVector().getSize();
                    break;
                }
            }
            return num;
        };
        /**
         * 获取与唇形同步相关的参数ID
         * @param index 数组索引值
         * @return 参数ID
         */
        CubismModelSettingJson.prototype.getLipSyncParameterId = function (index) {
            if (!this.isExistLipSyncParameters()) {
                return null;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == LipSync) {
                    return CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
                }
            }
            return null;
        };
        /**
         * 检查模型文件密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistModelFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查纹理文件密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistTextureFiles = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查命中判断键是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistHitAreas = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查物理文件密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistPhysicsFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查暂停设置文件的密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistPoseFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查面部表情设置文件的键是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistExpressionFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Expressions);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查运动组密钥是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistMotionGroups = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查参数中指定的运动组的键是否存在
         * @param groupName  组名
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistMotionGroupName = function (groupName) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查与参数中指定的运动相对应的声音文件密钥是否存在
         * @param groupName  组名
         * @param index 数组索引值
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistMotionSoundFile = function (groupName, index) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(SoundPath);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查是否存在与参数中指定的运动相对应的淡入时间键
         * @param groupName  组名
         * @param index 数组索引值
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistMotionFadeIn = function (groupName, index) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeInTime);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查是否存在与参数中指定的运动相对应的淡出时间键
         * @param groupName  组名
         * @param index 数组索引值
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistMotionFadeOut = function (groupName, index) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeOutTime);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查UserData文件名是否存在
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistUserDataFile = function () {
            var node = this._json.getRoot().getValueByString(FileReferences).getValueByString(UserData);
            return !node.isNull() && !node.isError();
        };
        /**
         * 检查是否有与眼贴相关的参数
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistEyeBlinkParameters = function () {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() || this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
                return false;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
                if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i).getValueByString(Name).getRawString() == EyeBlink) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 检查是否存在与唇形同步相关的参数
         * @return true 密钥存在
         * @return false 密钥不存在
         */
        CubismModelSettingJson.prototype.isExistLipSyncParameters = function () {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() || this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
                return false;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
                if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i).getValueByString(Name).getRawString() == LipSync) {
                    return true;
                }
            }
            return false;
        };
        return CubismModelSettingJson;
    }(ICubismModelSetting));
    Live2DCubismFramework.CubismModelSettingJson = CubismModelSettingJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
