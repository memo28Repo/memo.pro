/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:01:49
 * @LastEditTime: 2025-08-10 17:52:22
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/object.d.ts
 */


export interface ObjectExtensions extends BaseFuncCall<object>, Collection<PropertyKey> {
}

declare global {
    interface Object extends ObjectExtensions {
    }
}

export {}

