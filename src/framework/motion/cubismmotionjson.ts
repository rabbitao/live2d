/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as cubismjson} from '../utils/cubismjson';
import {Live2DCubismFramework as cubismid} from '../id/cubismid';
import {Live2DCubismFramework as cubismframework} from '../live2dcubismframework';
import {Live2DCubismFramework as csmstring} from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismFramework = cubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismJson = cubismjson.CubismJson;

export namespace Live2DCubismFramework {
    // JSON keys
    const Meta: string = 'Meta';
    const Duration: string = 'Duration';
    const Loop: string = 'Loop';
    const CurveCount: string = 'CurveCount';
    const Fps: string = 'Fps';
    const TotalSegmentCount: string = 'TotalSegmentCount';
    const TotalPointCount: string = 'TotalPointCount';
    const Curves: string = 'Curves';
    const Target: string = 'Target';
    const Id: string = 'Id';
    const FadeInTime: string = 'FadeInTime';
    const FadeOutTime: string = 'FadeOutTime';
    const Segments: string = 'Segments';
    const UserData: string = 'UserData';
    const UserDataCount: string = 'UserDataCount';
    const TotalUserDataSize: string = 'TotalUserDataSize';
    const Time: string = 'Time';
    const Value: string = 'Value';

    /**
     * motion3.jsonのコンテナ。
     */
    export class CubismMotionJson {

        public _json: CubismJson;  // motion3.jsonのデータ
        /**
         * コンストラクタ
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        public constructor(buffer: ArrayBuffer, size: number) {
          this._json = CubismJson.create(buffer, size) as any;
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void {
            CubismJson.delete(this._json);
        }

        /**
         * モーションの長さを取得する
         * @return モーションの長さ[秒]
         */
        public getMotionDuration(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Duration).toFloat();
        }

        /**
         * モーションのループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        public isMotionLoop(): boolean {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Loop).toBoolean();
        }

        /**
         * モーションカーブの個数の取得
         * @return モーションカーブの個数
         */
        public getMotionCurveCount(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(CurveCount).toInt();
        }

        /**
         * モーションのフレームレートの取得
         * @return フレームレート[FPS]
         */
        public getMotionFps(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Fps).toFloat();
        }

        /**
         * モーションのセグメントの総合計の取得
         * @return モーションのセグメントの取得
         */
        public getMotionTotalSegmentCount(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalSegmentCount).toInt();
        }

        /**
         * モーションのカーブの制御店の総合計の取得
         * @return モーションのカーブの制御点の総合計
         */
        public getMotionTotalPointCount(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalPointCount).toInt();
        }

        /**
         * モーションのフェードイン時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        public isExistMotionFadeInTime(): boolean {
            return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).isNull();
        }

        /**
         * モーションのフェードアウト時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        public isExistMotionFadeOutTime(): boolean {
            return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).isNull();
        }

        /**
         * モーションのフェードイン時間の取得
         * @return フェードイン時間[秒]
         */
        public getMotionFadeInTime(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).toFloat();
        }

        /**
         * モーションのフェードアウト時間の取得
         * @return フェードアウト時間[秒]
         */
        public getMotionFadeOutTime(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).toFloat();
        }

        /**
         * モーションのカーブの種類の取得
         * @param curveIndex カーブのインデックス
         * @return カーブの種類
         */
        public getMotionCurveTarget(curveIndex: number): string {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Target).getRawString();
        }

        /**
         * モーションのカーブのIDの取得
         * @param curveIndex カーブのインデックス
         * @return カーブのID
         */
        public getMotionCurveId(curveIndex: number): CubismIdHandle {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Id).getRawString());
        }

        /**
         * モーションのカーブのフェードイン時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        public isExistMotionCurveFadeInTime(curveIndex: number): boolean {
            return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).isNull();
        }

        /**
         * モーションのカーブのフェードアウト時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        public isExistMotionCurveFadeOutTime(curveIndex: number): boolean {
            return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).isNull();
        }

        /**
         * モーションのカーブのフェードイン時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードイン時間[秒]
         */
        public getMotionCurveFadeInTime(curveIndex: number): number {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).toFloat();
        }

        /**
         * モーションのカーブのフェードアウト時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードアウト時間[秒]
         */
        public getMotionCurveFadeOutTime(curveIndex: number): number {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).toFloat();
        }

        /**
         * モーションのカーブのセグメントの個数を取得する
         * @param curveIndex カーブのインデックス
         * @return モーションのカーブのセグメントの個数
         */
        public getMotionCurveSegmentCount(curveIndex: number): number {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getVector().getSize();
        }

        /**
         * モーションのカーブのセグメントの値の取得
         * @param curveIndex カーブのインデックス
         * @param segmentIndex セグメントのインデックス
         * @return セグメントの値
         */
        public getMotionCurveSegment(curveIndex: number, segmentIndex: number): number {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getValueByIndex(segmentIndex).toFloat();
        }

        /**
         * イベントの個数の取得
         * @return イベントの個数
         */
        public getEventCount(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        }

        /**
         *  イベントの総文字数の取得
         * @return イベントの総文字数
         */
        public getTotalEventValueSize(): number {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        }

        /**
         * イベントの時間の取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの時間[秒]
         */
        public getEventTime(userDataIndex: number): number {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Time).toInt();
        }

        /**
         * イベントの取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの文字列
         */
        public getEventValue(userDataIndex: number): csmString {
            return new csmString(this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Value).getRawString());
        }
    }
}
