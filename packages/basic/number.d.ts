/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:01:30
 * @LastEditTime: 2025-07-08 17:38:52
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/number.d.ts
 */


export interface NumberExtensions extends BaseFuncCall<number>, Comparable<number> {
    /**
     *
     * 是否等于0
     *
     * @public
     */
    isZero(): boolean

    /**
     *
     * 是否不等于0
     * @public
     */
    isNotZero(): boolean

    toDecimal(): import('decimal.js').Decimal

    /**
     * 将当前数值限制在指定区间
     */
    clamp(min: number, max: number): number

    /**
     * 判断当前数值是否处于区间内
     */
    isBetween(min: number, max: number, inclusive?: boolean): boolean

    /**
     * 按指定精度舍入数值
     */
    roundTo(precision?: number, mode?: 'round' | 'floor' | 'ceil'): number

    /**
     * 判断是否为偶数
     */
    isEven(): boolean

    /**
     * 判断是否为奇数
     */
    isOdd(): boolean
}

declare global {
    interface Number extends NumberExtensions {
    }
}

export {}