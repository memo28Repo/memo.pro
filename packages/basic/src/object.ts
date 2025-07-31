export function objectExtensions() {

    Object.prototype.eq = function (this: Object, val: object) {
        return this === val
    }

    Object.prototype.isEmpty = function (this: Object) {
        return Reflect.ownKeys(this).every(
            key => !this.propertyIsEnumerable(key)
        );
    }


    Object.prototype.isNotEmpty = function (this: Object) {
        return !this.isEmpty()
    }

    Object.prototype.contains = function (this: Object, key: PropertyKey) {
        if (typeof this !== "object") return false
        return Reflect.has(this, key)
    }

    Object.prototype.firstOrNull = function (this: Object) {
        if (this.isEmpty()) return null
        if (typeof this !== "object") return null
        const firstKey = Object.keys(this)?.[0]
        return Reflect.get(this, firstKey) || null
    }

    Object.prototype.lastOrNull = function (this: Object) {
        if (this.isEmpty()) return null
        if (typeof this !== "object") return null
        const lastKey = Object.keys(this)
        return Reflect.get(this, lastKey[lastKey.length - 1]) || null
    }

}