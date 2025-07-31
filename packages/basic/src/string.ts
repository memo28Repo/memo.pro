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

    String.prototype.isEmpty = function () {
        return this.length === 0
    }

    String.prototype.isNotEmpty = function () {
        return !this.isEmpty()
    }

    String.prototype.firstOrNull = function () {
        return this.isEmpty() ? null : this[0]
    }

    String.prototype.lastOrNull = function () {
        return this.isEmpty() ? null : this[this.length - 1]
    }
}