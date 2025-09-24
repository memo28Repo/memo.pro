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


    describe('distinct', () => {
        it('应去除重复元素', () => {
            expect([1, 1, 2, 3].distinct()).toEqual([1, 2, 3]);
            expect(['a', 'a', 'b'].distinct()).toEqual(['a', 'b']);
        });

        it('应保持首次出现的顺序', () => {
            expect([1, 2, 1, 3].distinct()).toEqual([1, 2, 3]);
        });

        it('引用类型元素应按引用比较', () => {
            const obj = { id: 1 };
            const arr = [obj, { id: 1 }, obj];
            const distinct = arr.distinct();
            expect(distinct).toEqual([obj, { id: 1 }]);
            expect(distinct[0]).toBe(obj);
            expect(distinct[1]).toBe(arr[1]);
        });

        it('this指向测试', () => {
            const result = Array.prototype.distinct.call([1, 1, 2]);
            expect(result).toEqual([1, 2]);
        });
    });

    describe('chunk', () => {
        it('应按照指定大小分组', () => {
            expect([1, 2, 3, 4].chunk(2)).toEqual([[1, 2], [3, 4]]);
            expect([1, 2, 3, 4, 5].chunk(2)).toEqual([[1, 2], [3, 4], [5]]);
        });

        it('小数大小应向下取整', () => {
            expect([1, 2, 3].chunk(1.8)).toEqual([[1], [2], [3]]);
        });

        it('非正数大小应返回空数组', () => {
            expect([1, 2, 3].chunk(0)).toEqual([]);
            expect([1, 2, 3].chunk(-1)).toEqual([]);
        });

        it('this指向测试', () => {
            const result = Array.prototype.chunk.call([1, 2, 3, 4], 3);
            expect(result).toEqual([[1, 2, 3], [4]]);
        });
    });


    describe('compact', () => {
        it('应移除null和undefined', () => {
            expect([1, null, 2, undefined, 3].compact()).toEqual([1, 2, 3]);
        });

        it('应保留其他假值', () => {
            expect([0, false, '', NaN].compact()).toEqual([0, false, '', NaN]);
        });

        it('应处理稀疏数组', () => {
            const sparse = [1, , 3, null];
            expect(sparse.compact()).toEqual([1, 3]);
        });

        it('this指向测试', () => {
            const result = Array.prototype.compact.call([null, 1, undefined, 2]);
            expect(result).toEqual([1, 2]);
        });
    });

    describe('groupBy', () => {
        it('应根据回调结果分组', () => {
            const grouped = ['apple', 'art', 'banana'].groupBy(item => item[0]);
            expect(grouped).toEqual({ a: ['apple', 'art'], b: ['banana'] });
        });

        it('应支持数字键', () => {
            const grouped = [1, 2, 3, 4, 5].groupBy(num => num % 2);
            expect(grouped).toEqual({ '0': [2, 4], '1': [1, 3, 5] });
        });

        it('应处理空数组', () => {
            const grouped: Record<string, unknown[]> = [].groupBy(() => 'key');
            expect(grouped).toEqual({});
            expect(Object.getPrototypeOf(grouped)).toBe(null);
        });

        it('应处理空值键', () => {
            const grouped = [null, undefined, 'value'].groupBy(item => item as any);
            expect(grouped).toEqual({ null: [null], undefined: [undefined], value: ['value'] });
        });

        it('this指向测试', () => {
            const result = Array.prototype.groupBy.call(['foo', 'bar'], (item: string) => item.length);
            expect(result).toEqual({ '3': ['foo', 'bar'] });
        });

        it('无效迭代器应抛出异常', () => {
            expect(() => {
                // @ts-ignore
                [1, 2, 3].groupBy(null);
            }).toThrowError(TypeError);
        });
    });



})