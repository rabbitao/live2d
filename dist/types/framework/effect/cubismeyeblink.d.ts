import { Live2DCubismFramework as csmvector } from '../type/csmvector';
import { Live2DCubismFramework as icubismmodelsetting } from '../icubismmodelsetting';
import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as cubismmodel } from '../model/cubismmodel';
import CubismModel = cubismmodel.CubismModel;
import CubismIdHandle = cubismid.CubismIdHandle;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
import csmVector = csmvector.csmVector;
export declare namespace Live2DCubismFramework {
    /**
     * 自動まばたき機能
     *
     * 自動まばたき機能を提供する。
     */
    class CubismEyeBlink {
        /**
         * IDで指定された目のパラメータが、0のときに閉じるなら true 、1の時に閉じるなら false 。
         */
        static readonly CloseIfZero: boolean;
        /**
         * インスタンスを作成する
         * @param modelSetting モデルの設定情報
         * @return 作成されたインスタンス
         * @note 引数がNULLの場合、パラメータIDが設定されていない空のインスタンスを作成する。
         */
        static create(modelSetting?: ICubismModelSetting): CubismEyeBlink;
        /**
         * インスタンスの破棄
         * @param eyeBlink 対象のCubismEyeBlink
         */
        static delete(eyeBlink: CubismEyeBlink): void;
        _blinkingState: number;
        _parameterIds: csmVector<CubismIdHandle>;
        _nextBlinkingTime: number;
        _stateStartTimeSeconds: number;
        _blinkingIntervalSeconds: number;
        _closingSeconds: number;
        _closedSeconds: number;
        _openingSeconds: number;
        _userTimeSeconds: number;
        /**
         * コンストラクタ
         * @param modelSetting モデルの設定情報
         */
        constructor(modelSetting: ICubismModelSetting);
        /**
         * まばたきの間隔の設定
         * @param blinkingInterval まばたきの間隔の時間[秒]
         */
        setBlinkingInterval(blinkingInterval: number): void;
        /**
         * まばたきのモーションの詳細設定
         * @param closing   まぶたを閉じる動作の所要時間[秒]
         * @param closed    まぶたを閉じている動作の所要時間[秒]
         * @param opening   まぶたを開く動作の所要時間[秒]
         */
        setBlinkingSetting(closing: number, closed: number, opening: number): void;
        /**
         * まばたきさせるパラメータIDのリストの設定
         * @param parameterIds パラメータのIDのリスト
         */
        setParameterIds(parameterIds: csmVector<CubismIdHandle>): void;
        /**
         * まばたきさせるパラメータIDのリストの取得
         * @return パラメータIDのリスト
         */
        getParameterIds(): csmVector<CubismIdHandle>;
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
        /**
         * 次の瞬きのタイミングの決定
         *
         * @return 次のまばたきを行う時刻[秒]
         */
        determinNextBlinkingTiming(): number;
    }
    /**
     * まばたきの状態
     *
     * まばたきの状態を表す列挙型
     */
    enum EyeState {
        EyeState_First = 0,
        EyeState_Interval = 1,
        EyeState_Closing = 2,
        EyeState_Closed = 3,
        EyeState_Opening = 4
    }
}
