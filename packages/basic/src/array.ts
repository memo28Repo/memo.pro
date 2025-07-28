export function arrayExtensions() {

    Array.prototype.eq = function (this: unknown[], val: unknown[]) {
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
}
