/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:01:43
 * @LastEditTime: 2025-07-08 17:01:44
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/array.d.ts
 */


export interface ArrayExtensions<T> extends BaseFuncCall<T[]>, Collection<T> {
    /**
     * 获取去重后的数组
     */
    distinct(): T[];

    /**
     * 按指定大小分组
     */
    chunk(size: number): T[][];
}

declare global {
    interface Array<T> extends ArrayExtensions<T> {
    }
}

export {}