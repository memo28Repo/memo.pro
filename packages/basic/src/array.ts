export function arrayExtensions() {

    Array.prototype.eq = function (this: unknown[], val: unknown[]) {
        if (!Array.isArray(val)) return false
        return this === val
    }

    Array.prototype.isEmpty = function (this: unknown[]) {
        return this.length === 0
    }

    Array.prototype.isNotEmpty = function (this: unknown[]) {
        return !this.isEmpty()
    }

    Array.prototype.contains = function (this: unknown[], val: unknown) {
        return this.indexOf(val) !== -1
    }

    Array.prototype.firstOrNull = function (this: unknown[]) {
        return this.length > 0 ? this[0] : null
    }

    Array.prototype.lastOrNull = function (this: unknown[]) {
        return this.length > 0 ? this[this.length - 1] : null
    }

    /**
     * 返回去重后的新数组
     */
    Array.prototype.distinct = function <T>(this: T[]) {
        return Array.from(new Set(this))
    }

    /**
     * 将数组按照指定大小切分
     */
    Array.prototype.chunk = function <T>(this: T[], size: number) {
        if (!Number.isFinite(size) || size <= 0) return []
        const chunkSize = Math.floor(size)
        const result: T[][] = []
        for (let index = 0; index < this.length; index += chunkSize) {
            result.push(this.slice(index, index + chunkSize))
        }
        return result
    }


    /**
     * 返回移除 null/undefined 后的新数组
     */
    Array.prototype.compact = function <T>(this: T[]) {
        const result: T[] = []
        for (let index = 0; index < this.length; index++) {
            if (!Object.prototype.hasOwnProperty.call(this, index)) continue
            const value = this[index]
            if (value !== null && value !== undefined) {
                result.push(value)
            }
        }
        return result
    }

    /**
     * 依据迭代器返回的键对数组进行分组
     *
     * @param iteratee 用于生成分组键的函数
     */
    Array.prototype.groupBy = function <T, K>(this: T[], iteratee: (item: T, index: number, array: T[]) => K) {
        if (typeof iteratee !== 'function') {
            throw new TypeError('groupBy expects a function')
        }
        const groups: Record<string, T[]> = Object.create(null)
        for (let index = 0; index < this.length; index++) {
            if (!Object.prototype.hasOwnProperty.call(this, index)) continue
            const item = this[index]
            const key = iteratee(item, index, this)
            const normalizedKey = key === null ? 'null' : key === undefined ? 'undefined' : String(key)
            if (!Object.prototype.hasOwnProperty.call(groups, normalizedKey)) {
                groups[normalizedKey] = []
            }
            groups[normalizedKey].push(item)
        }
        return groups as Record<string, T[]>
    }

}
