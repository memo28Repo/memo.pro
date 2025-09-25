/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 16:59:52
 * @LastEditTime: 2025-08-10 17:51:42
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/string.d.ts
 */

export interface StringExtensions extends BaseFuncCall<string>, Collection<string> {
    /**
     * 判断是否包含指定子串
     */
    contains(substring: string): boolean;

    /**
     * 忽略大小写比较字符串是否相等
     */
    equalsIgnoreCase(val: string): boolean;

    /**
     * 判断字符串是否为空白
     */
    isBlank(): boolean;


    /**
     * 统计指定子串出现的次数
     */
    count(substring: string, allowOverlap?: boolean): number;

    /**
     * 获取第一次出现分隔符之前的内容
     */
    substringBefore(separator: string, missingValue?: string): string;

    /**
     * 获取第一次出现分隔符之后的内容
     */
    substringAfter(separator: string, missingValue?: string): string;

}

declare global {
    interface String extends StringExtensions {
    }

}

export { };
