import {describe, it, expect} from "vitest";
import './globalSetup'

describe('arrayExtensions', () => {

    describe('eq', () => {
        it('相同引用应返回true', () => {
            const arr = [1, 2, 3];
            expect(arr.eq(arr)).toBe(true);
        });

        it('不同引用应返回false', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [1, 2, 3];
            expect(arr1.eq(arr2)).toBe(false);
        });

        it('应处理空数组', () => {
            const empty1: any[] = [];
            const empty2: any[] = [];
            expect(empty1.eq(empty1)).toBe(true);
            expect(empty1.eq(empty2)).toBe(false);
        });

        it('应处理嵌套数组', () => {
            const arr1 = [[1], [2]];
            const arr2 = [[1], [2]];
            expect(arr1.eq(arr1)).toBe(true);
            expect(arr1.eq(arr2)).toBe(false);
        });

        it('应处理不同长度数组', () => {
            const arr1 = [1, 2];
            const arr2 = [1, 2, 3];
            expect(arr1.eq(arr2)).toBe(false);
        });

        it('应处理不同元素数组', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [1, 2, 4];
            expect(arr1.eq(arr2)).toBe(false);
        });

        it('应处理不同顺序数组', () => {
            const arr1 = [1, 2];
            const arr2 = [2, 1];
            expect(arr1.eq(arr2)).toBe(false);
        });

        it('应处理稀疏数组', () => {
            const sparse1 = [1, , 3]; // 注意: 中间是空槽
            const sparse2 = [1, , 3];
            expect(sparse1.eq(sparse1)).toBe(true);
            expect(sparse1.eq(sparse2)).toBe(false);
        });

        it('应处理类型化数组', () => {
            const typedArr = new Int32Array([1, 2, 3]);
            const normalArr = [1, 2, 3];
            expect(normalArr.eq(typedArr as any)).toBe(false);
        });

        it('this指向测试', () => {
            const arr = [1];
            expect(arr.eq([1])).toBe(false); // 不同引用
            expect(Array.prototype.eq.call(arr, arr)).toBe(true);
            expect(Array.prototype.eq.call('test' as any, 'test' as any)).toBe(false); // 非数组
        });
    })


})