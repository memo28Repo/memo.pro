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

    Number.prototype.toDecimal = function (this: Number) {
        return new Decimal(this.valueOf())
    }

    /**
     * 将当前数值限制在指定区间内
     */
    Number.prototype.clamp = function (this: Number, min: number, max: number) {
        let lower = Number(min)
        let upper = Number(max)
        if (Number.isNaN(lower) || Number.isNaN(upper)) return Number.NaN
        if (lower > upper) {
            [lower, upper] = [upper, lower]
        }

        const rawValue = this.valueOf()
        if (Number.isNaN(rawValue)) return Number.NaN

        if (Number.isFinite(lower) && Number.isFinite(upper) && Number.isFinite(rawValue)) {
            const value = new Decimal(rawValue)
            if (value.lessThan(lower)) return lower
            if (value.greaterThan(upper)) return upper
            return value.toNumber()
        }

        if (rawValue < lower) return lower
        if (rawValue > upper) return upper
        return rawValue
    }

    /**
     * 判断当前数值是否处于指定区间
     */
    Number.prototype.isBetween = function (this: Number, min: number, max: number, inclusive = true) {
        let lower = Number(min)
        let upper = Number(max)
        if (Number.isNaN(lower) || Number.isNaN(upper)) return false
        if (lower > upper) {
            [lower, upper] = [upper, lower]
        }

        const rawValue = this.valueOf()
        if (Number.isNaN(rawValue)) return false

        if (Number.isFinite(lower) && Number.isFinite(upper) && Number.isFinite(rawValue)) {
            const value = new Decimal(rawValue)
            if (inclusive) {
                return value.greaterThanOrEqualTo(lower) && value.lessThanOrEqualTo(upper)
            }
            return value.greaterThan(lower) && value.lessThan(upper)
        }

        if (inclusive) {
            return rawValue >= lower && rawValue <= upper
        }
        return rawValue > lower && rawValue < upper
    }

}