/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/
import { LogLevel } from './framework/live2dcubismframework';
/**
 * 示例应用程序中使用的常量
 */
export var LAppDefine;
(function (LAppDefine) {
    // 画面
    LAppDefine.ViewMaxScale = 2.0;
    LAppDefine.ViewMinScale = 0.8;
    LAppDefine.ViewLogicalLeft = -1.0;
    LAppDefine.ViewLogicalRight = 1.0;
    LAppDefine.ViewLogicalMaxLeft = -2.0;
    LAppDefine.ViewLogicalMaxRight = 2.0;
    LAppDefine.ViewLogicalMaxBottom = -2.0;
    LAppDefine.ViewLogicalMaxTop = 2.0;
    // 相对路径
    LAppDefine.ResourcesPath = '/resource/';
    // 在模型后的背景图象文件
    LAppDefine.BackImageName = 'back_class_normal.png';
    // 齿轮
    LAppDefine.GearImageName = 'icon_gear.png';
    // 退出按钮
    LAppDefine.PowerImageName = 'CloseNormal.png';
    // 模型定义---------------------------------------------
    // 放置模型的目录名称数组
    // 确保目录名称与model3.json的名称匹配
    LAppDefine.ModelDir = [
        'Haru',
        'Hiyori',
        'momo',
        'Mark',
        'Natori',
    ];
    LAppDefine.ModelDirSize = LAppDefine.ModelDir.length;
    // 与外部定义文件（json）匹配
    LAppDefine.MotionGroupIdle = 'Idle'; // 待机
    LAppDefine.MotionGroupTapBody = 'TapBody'; // 拍打身体时
    LAppDefine.MotionGroupTapNose = 'TapNose'; // 拍打鼻子时
    LAppDefine.MotionGroupTapGem = 'TapGem'; // 拍打宝石时
    LAppDefine.MotionGroupTapFace = 'TapFace'; // 拍打脸时
    // 与外部定义文件（json）匹配
    LAppDefine.HitAreaNameHead = 'Head';
    LAppDefine.HitAreaNameFace = 'Face';
    LAppDefine.HitAreaNameBody = 'Body';
    LAppDefine.HitAreaNameNose = 'Nose';
    LAppDefine.HitAreaNameGem = 'Gem';
    // 运动优先级常数
    LAppDefine.PriorityNone = 0;
    LAppDefine.PriorityIdle = 1;
    LAppDefine.PriorityNormal = 2;
    LAppDefine.PriorityForce = 3;
    // 调试日志显示选项
    LAppDefine.DebugLogEnable = true;
    LAppDefine.DebugTouchLogEnable = false;
    LAppDefine.DebugMode = false;
    // Framework的日志级别设置输出
    LAppDefine.CubismLoggingLevel = LogLevel.LogLevel_Verbose;
})(LAppDefine || (LAppDefine = {}));
