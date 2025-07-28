/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:02:14
 * @LastEditTime: 2025-07-08 17:29:03
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/base.d.ts
 */

declare interface BaseFuncCall<T> {
    /**
     *
     * 对比值 是否相等
     *
     * @public
     */
    eq(val: T): boolean


    /**
     *
     * 对比当前值 是否为空
     * @public
     */
    isEmpty(): boolean

    /**
     * 值是否不为空
     *
     * @public
     */
    isNotEmpty(): boolean;

}


/**
 * 可比较接口 - 适用于可排序的类型
 */
declare interface Comparable<T> {
    /**
     * 是否大于目标值
     * @public
     */
    greaterThan(other: T): boolean;

    /**
     * 是否大于或等于目标值
     * @public
     */
    greaterThanOrEqual(other: T): boolean;

    /**
     * 是否小于目标值
     * @public
     */
    lessThan(other: T): boolean;

    /**
     * 是否小于或等于目标值
     * @public
     */
    lessThanOrEqual(other: T): boolean;
}

/**
 * 集合接口 - 适用于数组/集合类型
 * @public
 */
declare interface Collection<T> {
    /**
     * 是否包含目标元素
     * @public
     */
    contains(item: T): boolean;

    /**
     * 安全获取第一个元素
     * @public
     */
    firstOrNull(): T | null;

    /**
     * 安全获取最后一个元素
     * @public
     */
    lastOrNull(): T | null;
}
