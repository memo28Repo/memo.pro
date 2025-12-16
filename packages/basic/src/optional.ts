/**
 * Optional 类的实现，借鉴了 Java Optional 的常见行为。
 *
 * - 通过 optionalExtensions 将 Optional 安装到全局，避免重复挂载。
 * - 若宿主环境已存在 Optional，会打印提示并复用原有实现。
 * - 所有方法都尽量保持无副作用，并在必要时抛出明确的错误，便于排查。
 */
export class Optional<T> {
    private static readonly EMPTY = new Optional<never>(undefined)

    private constructor(private readonly inner: T | null | undefined) {}

    /**
     * 创建一个不可为空的 Optional，如果传入 null/undefined 会抛出异常。
     */
    static of<T>(value: T): Optional<NonNullable<T>> {
        if (value === null || value === undefined) {
            throw new TypeError('Optional.of() 不接受 null 或 undefined 值')
        }
        return new Optional(value as NonNullable<T>)
    }

    /**
     * 创建一个允许为空的 Optional，传入 null/undefined 将得到 EMPTY 实例。
     */
    static ofNullable<T>(value: T): Optional<NonNullable<T>> {
        if (value === null || value === undefined) return Optional.empty()
        return new Optional(value as NonNullable<T>)
    }

    /**
     * 返回共享的空实例，减少对象创建开销。
     */
    static empty<T = never>(): Optional<T> {
        return Optional.EMPTY as Optional<T>
    }

    /**
     * 当前是否存在有效值。
     */
    isPresent(): this is Optional<NonNullable<T>> {
        return this.inner !== null && this.inner !== undefined
    }

    /**
     * 当前是否为空。
     */
    isEmpty(): boolean {
        return !this.isPresent()
    }

    /**
     * 直接获取值，若为空将抛出错误。
     */
    get(): T {
        if (!this.isPresent()) {
            throw new Error('Optional 为空，无法调用 get()')
        }
        return this.inner as T
    }

    /**
     * 当存在值时执行回调。
     */
    ifPresent(consumer: (value: T) => void): this {
        if (this.isPresent()) {
            consumer(this.inner as T)
        }
        return this
    }

    /**
     * 当存在值时执行 consumer，否则执行 emptyAction。
     */
    ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): this {
        if (this.isPresent()) {
            consumer(this.inner as T)
        } else {
            emptyAction()
        }
        return this
    }

    /**
     * 若当前为空直接返回自身；否则根据谓词过滤，条件不满足返回 EMPTY。
     */
    filter(predicate: (value: T) => boolean): Optional<T> {
        if (!this.isPresent()) return this
        return predicate(this.inner as T) ? this : Optional.empty()
    }

    /**
     * 映射值并包装为 Optional，映射结果为 null/undefined 时将返回 EMPTY。
     */
    map<U>(mapper: (value: T) => U): Optional<NonNullable<U>> {
        if (!this.isPresent()) return Optional.empty()
        return Optional.ofNullable(mapper(this.inner as T))
    }

    /**
     * 使用返回 Optional 的映射函数，便于串联多个 Optional 操作。
     */
    flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        if (!this.isPresent()) return Optional.empty()
        const result = mapper(this.inner as T)
        if (!(result instanceof Optional)) {
            throw new TypeError('flatMap 期望返回 Optional 实例')
        }
        return result
    }

    /**
     * 若存在值则返回该值，否则返回提供的默认值。
     */
    orElse(other: T): T {
        return this.isPresent() ? (this.inner as T) : other
    }

    /**
     * 若存在值则返回该值，否则调用 supplier 获取默认值。
     */
    orElseGet(supplier: () => T): T {
        return this.isPresent() ? (this.inner as T) : supplier()
    }

    /**
     * 若存在值则返回该值，否则抛出指定错误（或默认错误）。
     */
    orElseThrow(errorSupplier?: () => unknown): T {
        if (this.isPresent()) return this.inner as T
        if (errorSupplier) {
            const reason = errorSupplier()
            if (reason instanceof Error) throw reason
            throw new Error(String(reason))
        }
        throw new Error('Optional 为空，没有可用的值')
    }

    /**
     * 若为空则调用 supplier 返回新的 Optional，否则返回自身。
     */
    or(supplier: () => Optional<T>): Optional<T> {
        if (this.isPresent()) return this
        const fallback = supplier()
        if (!(fallback instanceof Optional)) {
            throw new TypeError('or 期望 supplier 返回 Optional 实例')
        }
        return fallback
    }

    /**
     * 将值转换为可空类型，便于与旧逻辑衔接。
     */
    toNullable(): T | null {
        return this.isPresent() ? (this.inner as T) : null
    }
}

/**
 * 将 Optional 安装到全局作用域，若已有实现则复用并输出提示。
 */
export function optionalExtensions() {
    const globalScope = globalThis as typeof globalThis & {Optional?: typeof Optional}

    if (Reflect.has(globalScope, 'Optional')) {
        console.warn('[basic] 检测到宿主已存在 Optional，将复用现有实现')
        return globalScope.Optional as typeof Optional
    }

    globalScope.Optional = Optional
    return Optional
}
