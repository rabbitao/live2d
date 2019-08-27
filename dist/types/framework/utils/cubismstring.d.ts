export declare namespace Live2DCubismFramework {
    class CubismString {
        /**
         * 获取应用了标准输出格式的字符串。
         * @param format    标准输出格式字符串
         * @param ...args   要传递给格式字符串的字符串
         * @return 应用格式的字符串
         */
        static getFormatedString(format: string, ...args: any[]): string;
        /**
         * 返回文本是否以startWord开头
         * @param test 要检查的字符串
         * @param startWord 要比较的字符串
         * @return true text以startWord开头
         * @return false text不以startWord开头
         */
        static isStartWith(text: string, startWord: string): boolean;
        /**
         * position位置の文字から数字を解析する。
         *
         * @param string 字符串
         * @param length 字符串长度
         * @param position 要分析的文字的位置
         * @param outEndPos 如果未读取任何字符，则输入错误值（-1）。
         * @return 解析結果の数値
         */
        static stringToFloat(string: string, length: number, position: number, outEndPos: number[]): number;
        /**
         * 创建无法调用构造函数的静态类
         */
        private constructor();
    }
}
