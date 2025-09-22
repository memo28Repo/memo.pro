export function stringExtensions() {

    String.prototype.eq = function (this: string, val: string | number) {
        const typeofString = typeof val;
        let diff = val
        if (!['string', 'number'].includes(typeofString)) return false
        if (typeofString === 'number') {
            if (Number.isNaN(val)) return false
            if (Infinity === val) return false
            return this === `${val}`
        }
        return diff === this
    }

    /**
     * 判断当前字符串是否包含给定的子串
     */
    String.prototype.contains = function (this: string, val: string | number | boolean) {
        if (val === null || val === undefined) return false
        const compare = typeof val === 'string' ? val : String(val)
        return this.indexOf(compare) !== -1
    }

    /**
     * 忽略大小写判断两个字符串是否相等
     */
    String.prototype.equalsIgnoreCase = function (this: string, val: unknown) {
        if (typeof val !== 'string') return false
        return this.toLocaleLowerCase() === val.toLocaleLowerCase()
    }

    String.prototype.isEmpty = function () {
        return this.length === 0
    }

    String.prototype.isNotEmpty = function () {
        return !this.isEmpty()
    }

    /**
     * 判断字符串是否由空白字符组成
     */
    String.prototype.isBlank = function () {
        return this.trim().length === 0
    }

    String.prototype.firstOrNull = function () {
        return this.isEmpty() ? null : this[0]
    }

    String.prototype.lastOrNull = function () {
        return this.isEmpty() ? null : this[this.length - 1]
    }
}