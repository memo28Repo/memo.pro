export function objectExtensions() {

    if (!Reflect.has(Object.prototype, 'eq')) {
        Object.prototype.eq = function (this: Object, val: object) {
            return this === val
        }
    }

    if (!Reflect.has(Object.prototype, 'isEmpty')) {
        Object.prototype.isEmpty = function (this: Object) {
            return Reflect.ownKeys(this).every(
                key => !this.propertyIsEnumerable(key)
            );
        }
    }

    if (!Reflect.has(Object.prototype, 'isNotEmpty')) {
        Object.prototype.isNotEmpty = function (this: Object) {
            return !this.isEmpty()
        }
    }


    if (!Reflect.has(Object.prototype, 'contains')) {
        Object.prototype.contains = function (this: Object, key: PropertyKey) {
            if (typeof this !== "object") return false
            return Reflect.has(this, key)
        }
    }

    if (!Reflect.has(Object.prototype, 'firstOrNull')) {
        Object.prototype.firstOrNull = function (this: Object) {
            if (this.isEmpty()) return null
            if (typeof this !== "object") return null
            const firstKey = Object.keys(this)?.[0]
            return Reflect.get(this, firstKey) || null
        }
    }

    if (!Reflect.has(Object.prototype, 'lastOrNull')) {
        Object.prototype.lastOrNull = function (this: Object) {
            if (this.isEmpty()) return null
            if (typeof this !== "object") return null
            const lastKey = Object.keys(this)
            return Reflect.get(this, lastKey[lastKey.length - 1]) || null
        }
    }


}