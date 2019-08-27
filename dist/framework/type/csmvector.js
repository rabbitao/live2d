/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
export var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 矢量类型（变量序列类型）
     */
    var csmVector = /** @class */ (function () {
        /**
         * 带参数的构造函数
         * @param iniitalCapacity 初始化后的容量。 数据大小为_capacity * sizeof（T）
         * @param zeroClear 如果为true，则填充初始化时保留的区域为0
         */
        function csmVector(initialCapacity) {
            if (initialCapacity === void 0) { initialCapacity = 0; }
            if (initialCapacity < 1) {
                this._ptr = new Array();
                this._capacity = 0;
                this._size = 0;
            }
            else {
                this._ptr = new Array(initialCapacity);
                this._capacity = initialCapacity;
                this._size = 0;
            }
        }
        /**
         * 返回索引指定的元素
         */
        csmVector.prototype.at = function (index) {
            return this._ptr[index];
        };
        /**
         * 要素をセット
         * @param index 将元素设置为的索引
         * @param value 要设置的元素
         */
        csmVector.prototype.set = function (index, value) {
            this._ptr[index] = value;
        };
        /**
         * 拿一个容器
         */
        csmVector.prototype.get = function (offset) {
            if (offset === void 0) { offset = 0; }
            var ret = new Array();
            for (var i = offset; i < this._size; i++) {
                ret.push(this._ptr[i]);
            }
            return ret;
        };
        /**
         * pushBack处理，向容器添加新元素
         * @param value PushBack流程要添加的值
         */
        csmVector.prototype.pushBack = function (value) {
            if (this._size >= this._capacity) {
                this.prepareCapacity(this._capacity == 0 ? csmVector.s_defaultSize : this._capacity * 2);
            }
            this._ptr[this._size++] = value;
        };
        /**
         * 释放容器的所有元素
         */
        csmVector.prototype.clear = function () {
            this._ptr.length = 0;
            this._size = 0;
        };
        /**
         * 返回容器中的元素数
         * @return 容器中的元素数
         */
        csmVector.prototype.getSize = function () {
            return this._size;
        };
        /**
         * 对容器的所有元素执行替换处理
         * @param newSize 分配过程后的大小
         * @param value 要分配给元素的值
         */
        csmVector.prototype.assign = function (newSize, value) {
            var curSize = this._size;
            if (curSize < newSize) {
                this.prepareCapacity(newSize); // capacity更新
            }
            for (var i = 0; i < newSize; i++) {
                this._ptr[i] = value;
            }
            this._size = newSize;
        };
        /**
         * 更改大小
         */
        csmVector.prototype.resize = function (newSize, value) {
            this.updateSize(newSize, value, true);
        };
        /**
         * 更改大小
         */
        csmVector.prototype.updateSize = function (newSize, value, callPlacementNew) {
            if (value === void 0) { value = null; }
            if (callPlacementNew === void 0) { callPlacementNew = true; }
            var curSize = this._size;
            if (curSize < newSize) {
                this.prepareCapacity(newSize); // capacity更新
                if (callPlacementNew) {
                    for (var i = this._size; i < newSize; i++) {
                        if (typeof value == 'function') {
                            this._ptr[i] = JSON.parse(JSON.stringify(new value()));
                        }
                        else {
                            this._ptr[i] = value;
                        }
                    }
                }
                else {
                    for (var i = this._size; i < newSize; i++) {
                        this._ptr[i] = value;
                    }
                }
            }
            else {
                // newSize <= this._size
                // ---
                var sub = this._size - newSize;
                this._ptr.splice(this._size - sub, sub); // 丢弃因为没有必要
            }
            this._size = newSize;
        };
        /**
         * 将容器元素插入容器中
         * @param position 插入位置
         * @param begin　容器的起始位置要插入
         * @param end 要插入的容器的最终位置
         */
        csmVector.prototype.insert = function (position, begin, end) {
            var dstSi = position._index;
            var srcSi = begin._index;
            var srcEi = end._index;
            var addCount = srcEi - srcSi;
            this.prepareCapacity(this._size + addCount);
            // 通过转移现有数据来插入来创建差距
            var addSize = this._size - dstSi;
            if (addSize > 0) {
                for (var i = 0; i < addSize; i++) {
                    this._ptr.splice(dstSi + i, 0, null);
                }
            }
            for (var i = srcSi; i < srcEi; i++, dstSi++) {
                this._ptr[dstSi] = begin._vector._ptr[i];
            }
            this._size = this._size + addCount;
        };
        /**
         * 从容器中删除索引指定的元素
         * @param index 指数值
         * @return true 执行删除
         * @return false 超出范围
         */
        csmVector.prototype.remove = function (index) {
            if (index < 0 || this._size <= index) {
                return false; // 超出范围
            }
            this._ptr.splice(index, 1);
            --this._size;
            return true;
        };
        /**
         * 从容器中删除元素并移动其他元素
         * @param ite 要删除的元素
         */
        csmVector.prototype.erase = function (ite) {
            var index = ite._index;
            if (index < 0 || this._size <= index) {
                return ite; // 超出范围
            }
            // 删除
            this._ptr.splice(index, 1);
            --this._size;
            var ite2 = new iterator(this, index); // 结束
            return ite2;
        };
        /**
         * 确保集装箱容量
         * @param newSize 新产能。 如果参数值小于当前大小，则不执行任何操作。
         */
        csmVector.prototype.prepareCapacity = function (newSize) {
            if (newSize > this._capacity) {
                if (this._capacity == 0) {
                    this._ptr = new Array(newSize);
                    this._capacity = newSize;
                }
                else {
                    this._ptr.length = newSize;
                    this._capacity = newSize;
                }
            }
        };
        /**
         * 返回容器的第一个元素
         */
        csmVector.prototype.begin = function () {
            var ite = (this._size == 0)
                ? this.end()
                : new iterator(this, 0);
            return ite;
        };
        /**
         * 返回容器的终端元素
         */
        csmVector.prototype.end = function () {
            var ite = new iterator(this, this._size);
            return ite;
        };
        csmVector.prototype.getOffset = function (offset) {
            var newVector = new csmVector();
            newVector._ptr = this.get(offset);
            newVector._size = this.get(offset).length;
            newVector._capacity = this.get(offset).length;
            return newVector;
        };
        csmVector.s_defaultSize = 10; // 容器初始化的默认大小
        return csmVector;
    }());
    Live2DCubismFramework.csmVector = csmVector;
    var iterator = /** @class */ (function () {
        /**
         * 构造函数
         */
        function iterator(v, index) {
            this._vector = (v != undefined) ? v : null;
            this._index = (index != undefined) ? index : 0;
        }
        /**
         * 换人
         */
        iterator.prototype.set = function (ite) {
            this._index = ite._index;
            this._vector = ite._vector;
            return this;
        };
        /**
         * 前缀++操作
         */
        iterator.prototype.preIncrement = function () {
            ++this._index;
            return this;
        };
        /**
         * 前言 -- 操作
         */
        iterator.prototype.preDecrement = function () {
            --this._index;
            return this;
        };
        /**
         * Postfix ++运算符
         */
        iterator.prototype.increment = function () {
            var iteold = new iterator(this._vector, this._index++);
            this._vector = iteold._vector;
            this._index = iteold._index;
            return this;
        };
        /**
         * 後置き--演算子
         */
        iterator.prototype.decrement = function () {
            var iteold = new iterator(this._vector, this._index--); // 古い値を保存
            this._vector = iteold._vector;
            this._index = iteold._index;
            return this;
        };
        /**
         * ptr
         */
        iterator.prototype.ptr = function () {
            return this._vector._ptr[this._index];
        };
        /**
         * =运算符重载
         */
        iterator.prototype.substitution = function (ite) {
            this._index = ite._index;
            this._vector = ite._vector;
            return this;
        };
        /**
         * ！=运算符重载
         */
        iterator.prototype.notEqual = function (ite) {
            return (this._index != ite._index) || (this._vector != ite._vector);
        };
        return iterator;
    }());
    Live2DCubismFramework.iterator = iterator;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
