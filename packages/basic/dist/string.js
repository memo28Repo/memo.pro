function r() {
  String.prototype.eq = function(t) {
    const n = typeof t;
    let i = t;
    return ["string", "number"].includes(n) ? n === "number" ? Number.isNaN(t) || t === 1 / 0 ? !1 : this === `${t}` : i === this : !1;
  }, String.prototype.isEmpty = function() {
    return this.length === 0;
  }, String.prototype.isNotEmpty = function() {
    return !this.isEmpty();
  }, String.prototype.firstOrNull = function() {
    return this.isEmpty() ? null : this[0];
  }, String.prototype.lastOrNull = function() {
    return this.isEmpty() ? null : this[this.length - 1];
  };
}
export {
  r as stringExtensions
};
