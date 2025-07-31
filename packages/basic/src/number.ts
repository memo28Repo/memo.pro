/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:26:29
 * @LastEditTime: 2025-07-08 17:40:09
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/src/number.ts
 */

import Decimal from 'decimal.js'


export function numberExtensions() {
    Number.prototype.eq = function (this: Number, val: number | string) {
        if (Number.isNaN(this)) return false;
        const typeofString = typeof val;

        let diffVal = val
        if (!['number', 'string'].includes(typeofString)) return false
        if (typeofString === 'string') {
            return this.toString() === val
        }
        return diffVal === this
    }

    Number.prototype.isEmpty = function (this: Number) {
        return this === 0
    }

    Number.prototype.isNotEmpty = function (this: Number) {
        return !this.isEmpty()
    }

    Number.prototype.isZero = function (this: Number) {
        return this === 0
    }

    Number.prototype.isNotZero = function (this: Number) {
        return !this.isZero()
    }

    Number.prototype.lessThan = function (this: Number, diff: number) {
        return new Decimal(this.valueOf()).lessThan(diff)
    }

    Number.prototype.lessThanOrEqual = function (this: Number, diff: number) {
        return new Decimal(this.valueOf()).lessThanOrEqualTo(diff)
    }

    Number.prototype.greaterThan = function (this: Number, diff: number) {
        return new Decimal(this.valueOf()).greaterThan(diff)
    }

    Number.prototype.greaterThanOrEqual = function (this: Number, diff: number) {
        return new Decimal(this.valueOf()).greaterThanOrEqualTo(diff)
    }

}