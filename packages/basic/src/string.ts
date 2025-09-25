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

    /**
     * 统计指定子串在当前字符串中出现的次数
     *
     * @param val 需要查找的子串，若为空则始终返回0
     * @param allowOverlap 是否允许重叠匹配
     */
    String.prototype.count = function (this: string, val: string | number | boolean, allowOverlap = false) {
        if (val === null || val === undefined) return 0
        const needle = typeof val === 'string' ? val : String(val)
        if (needle.length === 0) return 0

        const source = this.toString()
        let matches = 0
        let position = 0
        while (position <= source.length - needle.length) {
            const index = source.indexOf(needle, position)
            if (index === -1) break
            matches += 1
            position = index + (allowOverlap ? 1 : needle.length)
        }
        return matches
    }

    /**
     * 获取第一次出现分隔符之前的子串
     *
     * @param separator 分隔符，若为空则返回原始字符串
     * @param missingValue 当未找到分隔符时返回的值，默认返回原字符串
     */
    String.prototype.substringBefore = function (this: string, separator: unknown, missingValue?: string) {
        const source = this.toString()
        if (separator === null || separator === undefined) return source
        const token = String(separator)
        if (token.length === 0) return source
        const index = source.indexOf(token)
        if (index === -1) return missingValue !== undefined ? missingValue : source
        return source.slice(0, index)
    }

    /**
     * 获取第一次出现分隔符之后的子串
     *
     * @param separator 分隔符，若为空则返回missingValue
     * @param missingValue 当未找到分隔符时返回的值，默认返回空字符串
     */
    String.prototype.substringAfter = function (this: string, separator: unknown, missingValue = '') {
        const source = this.toString()
        if (separator === null || separator === undefined) return missingValue
        const token = String(separator)
        if (token.length === 0) return missingValue
        const index = source.indexOf(token)
        if (index === -1) return missingValue
        return source.slice(index + token.length)
    }
}