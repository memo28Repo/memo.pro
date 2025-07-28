function n() {
  Number.prototype.eq = function(t) {
    const r = typeof t;
    let e = t;
    return ["number", "string"].includes(r) ? (r === "string" && (e = parseFloat(t)), e === this) : !1;
  }, Number.prototype.isEmpty = function() {
    return this === 0;
  }, Number.prototype.isNotEmpty = function() {
    return !this.isEmpty();
  }, Number.prototype.isZero = function() {
    return this === 0;
  }, Number.prototype.isNotZero = function() {
    return !this.isZero();
  }, Number.prototype.lessThan = function(t) {
    return this.valueOf() < t;
  }, Number.prototype.lessThanOrEqual = function(t) {
    return this.valueOf() <= t;
  }, Number.prototype.greaterThan = function(t) {
    return this.valueOf() > t;
  }, Number.prototype.greaterThanOrEqual = function(t) {
    return this.valueOf() >= t;
  };
}
export {
  n as numberExtensions
};
