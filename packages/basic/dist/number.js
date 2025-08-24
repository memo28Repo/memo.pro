import { Decimal as e } from "./node_modules/.pnpm/decimal.js@10.6.0/node_modules/decimal.js/decimal.js";
function u() {
  Number.prototype.eq = function(t) {
    if (Number.isNaN(this)) return !1;
    const r = typeof t;
    let n = t;
    return ["number", "string"].includes(r) ? r === "string" ? this.toString() === t : n === this : !1;
  }, Number.prototype.isEmpty = function() {
    return this === 0;
  }, Number.prototype.isNotEmpty = function() {
    return !this.isEmpty();
  }, Number.prototype.isZero = function() {
    return this === 0;
  }, Number.prototype.isNotZero = function() {
    return !this.isZero();
  }, Number.prototype.lessThan = function(t) {
    return new e(this.valueOf()).lessThan(t);
  }, Number.prototype.lessThanOrEqual = function(t) {
    return new e(this.valueOf()).lessThanOrEqualTo(t);
  }, Number.prototype.greaterThan = function(t) {
    return new e(this.valueOf()).greaterThan(t);
  }, Number.prototype.greaterThanOrEqual = function(t) {
    return new e(this.valueOf()).greaterThanOrEqualTo(t);
  }, Number.prototype.toDecimal = function() {
    return new e(this.valueOf());
  };
}
export {
  u as numberExtensions
};
