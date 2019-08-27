/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismjson } from '../utils/cubismjson';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
var CubismFramework = cubismframework.CubismFramework;
var CubismJson = cubismjson.CubismJson;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var Meta = 'Meta';
    var UserDataCount = 'UserDataCount';
    var TotalUserDataSize = 'TotalUserDataSize';
    var UserData = 'UserData';
    var Target = 'Target';
    var Id = 'Id';
    var Value = 'Value';
    var CubismModelUserDataJson = /** @class */ (function () {
        /**
         * 构造函数
         * @param buffer    读取userdata3.json的缓冲区
         * @param size      缓冲区大小
         */
        function CubismModelUserDataJson(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * 析构函数等效处理
         */
        CubismModelUserDataJson.prototype.release = function () {
            CubismJson.delete(this._json);
        };
        /**
         * 获取用户数据
         * @return 用户数据的数量
         */
        CubismModelUserDataJson.prototype.getUserDataCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        };
        /**
         * 获取用户数据字符串的总数
         *
         * @return 用户数据字符串的总数
         */
        CubismModelUserDataJson.prototype.getTotalUserDataSize = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        };
        /**
         * 获取用户数据类型
         *
         * @return 用户数据类型
         */
        CubismModelUserDataJson.prototype.getUserDataTargetType = function (i) {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Target).getRawString();
        };
        /**
         * 获取用户数据目标ID
         *
         * @param i 索引
         * @return 用户数据目标ID
         */
        CubismModelUserDataJson.prototype.getUserDataId = function (i) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Id).getRawString());
        };
        /**
         * 获取用户数据字符串
         *
         * @param i 索引
         * @return 用户数据
         */
        CubismModelUserDataJson.prototype.getUserDataValue = function (i) {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Value).getRawString();
        };
        return CubismModelUserDataJson;
    }());
    Live2DCubismFramework.CubismModelUserDataJson = CubismModelUserDataJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
