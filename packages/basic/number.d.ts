/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:01:30
 * @LastEditTime: 2025-07-08 17:38:52
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/number.d.ts
 */


declare interface Number extends BaseFuncCall<number>, Comparable<number> {
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

}