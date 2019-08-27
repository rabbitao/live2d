export declare namespace Live2DCubismFramework {
    /**
     * 矢量类型（变量序列类型）
     */
    class csmVector<T> {
        static readonly s_defaultSize = 10;
        _ptr: T[];
        _size: number;
        _capacity: number;
        /**
         * 带参数的构造函数
         * @param iniitalCapacity 初始化后的容量。 数据大小为_capacity * sizeof（T）
         * @param zeroClear 如果为true，则填充初始化时保留的区域为0
         */
        constructor(initialCapacity?: number);
        /**
         * 返回索引指定的元素
         */
        at(index: number): T;
        /**
         * 要素をセット
         * @param index 将元素设置为的索引
         * @param value 要设置的元素
         */
        set(index: number, value: T): void;
        /**
         * 拿一个容器
         */
        get(offset?: number): T[];
        /**
         * pushBack处理，向容器添加新元素
         * @param value PushBack流程要添加的值
         */
        pushBack(value: T): void;
        /**
         * 释放容器的所有元素
         */
        clear(): void;
        /**
         * 返回容器中的元素数
         * @return 容器中的元素数
         */
        getSize(): number;
        /**
         * 对容器的所有元素执行替换处理
         * @param newSize 分配过程后的大小
         * @param value 要分配给元素的值
         */
        assign(newSize: number, value: T): void;
        /**
         * 更改大小
         */
        resize(newSize: number, value: T): void;
        /**
         * 更改大小
         */
        updateSize(newSize: number, value?: any, callPlacementNew?: boolean): void;
        /**
         * 将容器元素插入容器中
         * @param position 插入位置
         * @param begin　容器的起始位置要插入
         * @param end 要插入的容器的最终位置
         */
        insert(position: iterator<T>, begin: iterator<T>, end: iterator<T>): void;
        /**
         * 从容器中删除索引指定的元素
         * @param index 指数值
         * @return true 执行删除
         * @return false 超出范围
         */
        remove(index: number): boolean;
        /**
         * 从容器中删除元素并移动其他元素
         * @param ite 要删除的元素
         */
        erase(ite: iterator<T>): iterator<T>;
        /**
         * 确保集装箱容量
         * @param newSize 新产能。 如果参数值小于当前大小，则不执行任何操作。
         */
        prepareCapacity(newSize: number): void;
        /**
         * 返回容器的第一个元素
         */
        begin(): iterator<T>;
        /**
         * 返回容器的终端元素
         */
        end(): iterator<T>;
        getOffset(offset: number): csmVector<T>;
    }
    class iterator<T> {
        _index: number;
        _vector: csmVector<T>;
        /**
         * 构造函数
         */
        constructor(v?: csmVector<T>, index?: number);
        /**
         * 换人
         */
        set(ite: iterator<T>): iterator<T>;
        /**
         * 前缀++操作
         */
        preIncrement(): iterator<T>;
        /**
         * 前言 -- 操作
         */
        preDecrement(): iterator<T>;
        /**
         * Postfix ++运算符
         */
        increment(): iterator<T>;
        /**
         * 後置き--演算子
         */
        decrement(): iterator<T>;
        /**
         * ptr
         */
        ptr(): T;
        /**
         * =运算符重载
         */
        substitution(ite: iterator<T>): iterator<T>;
        /**
         * ！=运算符重载
         */
        notEqual(ite: iterator<T>): boolean;
    }
}
