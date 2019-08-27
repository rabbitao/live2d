/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { Live2DCubismFramework as cubismjson } from '../utils/cubismjson';
import { Live2DCubismFramework as cubismvector2 } from '../math/cubismvector2';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
var CubismFramework = cubismframework.CubismFramework;
var CubismVector2 = cubismvector2.CubismVector2;
var CubismJson = cubismjson.CubismJson;
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // JSON keys
    var Position = 'Position';
    var X = 'X';
    var Y = 'Y';
    var Angle = 'Angle';
    var Type = 'Type';
    var Id = 'Id';
    // Meta
    var Meta = 'Meta';
    var EffectiveForces = 'EffectiveForces';
    var TotalInputCount = 'TotalInputCount';
    var TotalOutputCount = 'TotalOutputCount';
    var PhysicsSettingCount = 'PhysicsSettingCount';
    var Gravity = 'Gravity';
    var Wind = 'Wind';
    var VertexCount = 'VertexCount';
    // PhysicsSettings
    var PhysicsSettings = 'PhysicsSettings';
    var Normalization = 'Normalization';
    var Minimum = 'Minimum';
    var Maximum = 'Maximum';
    var Default = 'Default';
    var Reflect = 'Reflect';
    var Weight = 'Weight';
    // Input
    var Input = 'Input';
    var Source = 'Source';
    // Output
    var Output = 'Output';
    var Scale = 'Scale';
    var VertexIndex = 'VertexIndex';
    var Destination = 'Destination';
    // Particle
    var Vertices = 'Vertices';
    var Mobility = 'Mobility';
    var Delay = 'Delay';
    var Radius = 'Radius';
    var Acceleration = 'Acceleration';
    /**
     * physics3.jsonのコンテナ。
     */
    var CubismPhysicsJson = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param buffer physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        function CubismPhysicsJson(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        CubismPhysicsJson.prototype.release = function () {
            CubismJson.delete(this._json);
        };
        /**
         * 重力の取得
         * @return 重力
         */
        CubismPhysicsJson.prototype.getGravity = function () {
            var ret = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(X).toFloat();
            ret.y = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(Y).toFloat();
            return ret;
        };
        /**
         * 風の取得
         * @return 風
         */
        CubismPhysicsJson.prototype.getWind = function () {
            var ret = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(X).toFloat();
            ret.y = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(Y).toFloat();
            return ret;
        };
        /**
         * 物理店の管理の個数の取得
         * @return 物理店の管理の個数
         */
        CubismPhysicsJson.prototype.getSubRigCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(PhysicsSettingCount).toInt();
        };
        /**
         * 入力の総合計の取得
         * @return 入力の総合計
         */
        CubismPhysicsJson.prototype.getTotalInputCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalInputCount).toInt();
        };
        /**
         * 出力の総合計の取得
         * @return 出力の総合計
         */
        CubismPhysicsJson.prototype.getTotalOutputCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalOutputCount).toInt();
        };
        /**
         * 物理点の個数の取得
         * @return 物理点の個数
         */
        CubismPhysicsJson.prototype.getVertexCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(VertexCount).toInt();
        };
        /**
         * 正規化された位置の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最小値
         */
        CubismPhysicsJson.prototype.getNormalizationPositionMinimumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Minimum).toFloat();
        };
        /**
         * 正規化された位置の最大値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最大値
         */
        CubismPhysicsJson.prototype.getNormalizationPositionMaximumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Maximum).toFloat();
        };
        /**
         * 正規化された位置のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置のデフォルト値
         */
        CubismPhysicsJson.prototype.getNormalizationPositionDefaultValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Default).toFloat();
        };
        /**
         * 正規化された角度の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度の最小値
         */
        CubismPhysicsJson.prototype.getNormalizationAngleMinimumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Minimum).toFloat();
        };
        /**
         * 正規化された角度の最大値の取得
         * @param physicsSettingIndex
         * @return 正規化された角度の最大値
         */
        CubismPhysicsJson.prototype.getNormalizationAngleMaximumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Maximum).toFloat();
        };
        /**
         * 正規化された角度のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度のデフォルト値
         */
        CubismPhysicsJson.prototype.getNormalizationAngleDefaultValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Default).toFloat();
        };
        /**
         * 入力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 入力の個数
         */
        CubismPhysicsJson.prototype.getInputCount = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getVector().getSize();
        };
        /**
         * 入力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の重み
         */
        CubismPhysicsJson.prototype.getInputWeight = function (physicsSettingIndex, inputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Weight).toFloat();
        };
        /**
         * 入力の反転の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の反転
         */
        CubismPhysicsJson.prototype.getInputReflect = function (physicsSettingIndex, inputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Reflect).toBoolean();
        };
        /**
         * 入力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の種類
         */
        CubismPhysicsJson.prototype.getInputType = function (physicsSettingIndex, inputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Type).getRawString();
        };
        /**
         * 入力元のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力元のID
         */
        CubismPhysicsJson.prototype.getInputSourceId = function (physicsSettingIndex, inputIndex) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Source).getValueByString(Id).getRawString());
        };
        /**
         * 出力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 出力の個数
         */
        CubismPhysicsJson.prototype.getOutputCount = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getVector().getSize();
        };
        /**
         * 出力の物理点のインデックスの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の物理点のインデックス
         */
        CubismPhysicsJson.prototype.getOutputVertexIndex = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(VertexIndex).toInt();
        };
        /**
         * 出力の角度のスケールを取得する
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の角度のスケール
         */
        CubismPhysicsJson.prototype.getOutputAngleScale = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Scale).toFloat();
        };
        /**
         * 出力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の重み
         */
        CubismPhysicsJson.prototype.getOutputWeight = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Weight).toFloat();
        };
        /**
         * 出力先のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex　出力のインデックス
         * @return 出力先のID
         */
        CubismPhysicsJson.prototype.getOutputDestinationId = function (physicsSettingIndex, outputIndex) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Destination).getValueByString(Id).getRawString());
        };
        /**
         * 出力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の種類
         */
        CubismPhysicsJson.prototype.getOutputType = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Type).getRawString();
        };
        /**
         * 出力の反転の取得
         * @param physicsSettingIndex 物理演算のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の反転
         */
        CubismPhysicsJson.prototype.getOutputReflect = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Reflect).toBoolean();
        };
        /**
         * 物理点の個数の取得
         * @param physicsSettingIndex 物理演算男設定のインデックス
         * @return 物理点の個数
         */
        CubismPhysicsJson.prototype.getParticleCount = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getVector().getSize();
        };
        /**
         * 物理点の動きやすさの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の動きやすさ
         */
        CubismPhysicsJson.prototype.getParticleMobility = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Mobility).toFloat();
        };
        /**
         * 物理点の遅れの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の遅れ
         */
        CubismPhysicsJson.prototype.getParticleDelay = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Delay).toFloat();
        };
        /**
         * 物理点の加速度の取得
         * @param physicsSettingIndex 物理演算の設定
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の加速度
         */
        CubismPhysicsJson.prototype.getParticleAcceleration = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Acceleration).toFloat();
        };
        /**
         * 物理点の距離の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の距離
         */
        CubismPhysicsJson.prototype.getParticleRadius = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Radius).toInt();
        };
        /**
         * 物理点の位置の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexInde 物理点のインデックス
         * @return 物理点の位置
         */
        CubismPhysicsJson.prototype.getParticlePosition = function (physicsSettingIndex, vertexIndex) {
            var ret = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(X).toFloat();
            ret.y = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(Y).toFloat();
            return ret;
        };
        return CubismPhysicsJson;
    }());
    Live2DCubismFramework.CubismPhysicsJson = CubismPhysicsJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
