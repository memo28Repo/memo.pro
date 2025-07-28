function e() {
  Object.prototype.eq = function(t) {
    return this === t;
  }, Object.prototype.isEmpty = function() {
    return Object.keys(this).length === 0;
  }, Object.prototype.isNotEmpty = function() {
    return !this.isEmpty();
  }, Object.prototype.contains = function(t) {
    return Reflect.has(this, t);
  }, Object.prototype.firstOrNull = function() {
    if (this.isEmpty()) return null;
    const t = Object.keys(this)?.[0];
    return Reflect.get(this, t) || null;
  }, Object.prototype.lastOrNull = function() {
    if (this.isEmpty()) return null;
    const t = Object.keys(this);
    return Reflect.get(this, t[t.length - 1]) || null;
  };
}
export {
  e as objectExtensions
};
