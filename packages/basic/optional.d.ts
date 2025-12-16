export declare class Optional<T> {
    private readonly inner;
    private static readonly EMPTY;
    private constructor();
    /**
     * 创建一个不可为空的 Optional，如果传入 null/undefined 会抛出异常。
     */
    static of<T>(value: T): Optional<NonNullable<T>>;
    /**
     * 创建一个允许为空的 Optional，传入 null/undefined 将得到 EMPTY 实例。
     */
    static ofNullable<T>(value: T): Optional<NonNullable<T>>;
    /**
     * 返回共享的空实例，减少对象创建开销。
     */
    static empty<T = never>(): Optional<T>;
    /**
     * 当前是否存在有效值。
     */
    isPresent(): this is Optional<NonNullable<T>>;
    /**
     * 当前是否为空。
     */
    isEmpty(): boolean;
    /**
     * 直接获取值，若为空将抛出错误。
     */
    get(): T;
    /**
     * 当存在值时执行回调。
     */
    ifPresent(consumer: (value: T) => void): this;
    /**
     * 当存在值时执行 consumer，否则执行 emptyAction。
     */
    ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): this;
    /**
     * 若当前为空直接返回自身；否则根据谓词过滤，条件不满足返回 EMPTY。
     */
    filter(predicate: (value: T) => boolean): Optional<T>;
    /**
     * 映射值并包装为 Optional，映射结果为 null/undefined 时将返回 EMPTY。
     */
    map<U>(mapper: (value: T) => U): Optional<NonNullable<U>>;
    /**
     * 使用返回 Optional 的映射函数，便于串联多个 Optional 操作。
     */
    flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U>;
    /**
     * 若存在值则返回该值，否则返回提供的默认值。
     */
    orElse(other: T): T;
    /**
     * 若存在值则返回该值，否则调用 supplier 获取默认值。
     */
    orElseGet(supplier: () => T): T;
    /**
     * 若存在值则返回该值，否则抛出指定错误（或默认错误）。
     */
    orElseThrow(errorSupplier?: () => unknown): T;
    /**
     * 若为空则调用 supplier 返回新的 Optional，否则返回自身。
     */
    or(supplier: () => Optional<T>): Optional<T>;
    /**
     * 将值转换为可空类型，便于与旧逻辑衔接。
     */
    toNullable(): T | null;
}
export declare function optionalExtensions(): typeof Optional;

declare global {
    // 使用 var 以便与浏览器 / Node 的全局对象兼容
    var Optional: typeof Optional | undefined;
}

export {}
