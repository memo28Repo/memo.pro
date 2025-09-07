/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 16:59:52
 * @LastEditTime: 2025-08-10 17:51:42
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/string.d.ts
 */

export interface StringExtensions extends BaseFuncCall<string>, Collection<string> {}

declare global {
    interface String extends StringExtensions {
    }

}

export { };
