function e() {
  Object.prototype.eq = function(t) {
    return this === t;
  }, Object.prototype.isEmpty = function() {
    return Reflect.ownKeys(this).every(
      (t) => !this.propertyIsEnumerable(t)
    );
  }, Object.prototype.isNotEmpty = function() {
    return !this.isEmpty();
  }, Object.prototype.contains = function(t) {
    return typeof this != "object" ? !1 : Reflect.has(this, t);
  }, Object.prototype.firstOrNull = function() {
    if (this.isEmpty() || typeof this != "object") return null;
    const t = Object.keys(this)?.[0];
    return Reflect.get(this, t) || null;
  }, Object.prototype.lastOrNull = function() {
    if (this.isEmpty() || typeof this != "object") return null;
    const t = Object.keys(this);
    return Reflect.get(this, t[t.length - 1]) || null;
  };
}
export {
  e as objectExtensions
};
