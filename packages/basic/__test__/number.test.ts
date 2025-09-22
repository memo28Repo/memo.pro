/*
 * @Author: @memo28.repo
 * @Date: 2025-07-08 17:33:20
 * @LastEditTime: 2025-07-08 17:37:32
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/__test__/number.test.ts
 */
import {describe} from 'vitest';
import './globalSetup'
import {it, expect} from 'vitest'



describe('numberExtensions', () => {

    describe('eq', () => {

        it('相同数值应返回true', () => {
            expect((5).eq(5)).toBe(true);
            expect((-0).eq(0)).toBe(true);
        });

        it('不同数值应返回false', () => {
            expect((10).eq(9.999)).toBe(false);
            expect((1e3).eq(1000.001)).toBe(false);
        });

        it('应正确处理字符串数值', () => {
            // @ts-ignore
            expect((100).eq('100')).toBe(true);
            // @ts-ignore
            expect((3.14).eq('3.14')).toBe(true);
            // @ts-ignore
            expect((0.1).eq('0.100')).toBe(false);
        });

        it('无效字符串应返回false', () => {
            // @ts-ignore
            expect((10).eq('10abc')).toBe(false);
            // @ts-ignore
            expect((5).eq('five')).toBe(false);
            // @ts-ignore
            expect((NaN).eq('NaN')).toBe(false);
        });

        it('非数值类型应返回false', () => {
            // @ts-ignore
            expect((0).eq(null)).toBe(false);
            // @ts-ignore
            expect((1).eq(undefined)).toBe(false);
            // @ts-ignore
            expect((2).eq(true)).toBe(false);
            // @ts-ignore
            expect((3).eq({})).toBe(false);
            // @ts-ignore
            expect((4).eq([])).toBe(false);
        });

        it('应正确处理边界值', () => {
            expect((Number.MAX_VALUE).eq(Number.MAX_VALUE)).toBe(true);
            expect((Number.MIN_VALUE).eq(Number.MIN_VALUE)).toBe(true);
            expect((Infinity).eq(Infinity)).toBe(true);
            expect((-Infinity).eq(-Infinity)).toBe(true);
            expect((Infinity).eq(-Infinity)).toBe(false);
        });

        it('NaN应始终返回false', () => {
            expect((NaN).eq(NaN)).toBe(false);
            expect((NaN).eq(0)).toBe(false);
            expect((NaN).eq(Infinity)).toBe(false);
        });

        it('应正确处理浮点数精度问题', () => {
            expect((0.1 + 0.2).eq(0.3)).toBe(false); // 0.30000000000000004
            expect((0.1 + 0.2).eq(0.30000000000000004)).toBe(true);
        });

        it('应正确处理大整数', () => {
            const bigInt = Number.MAX_SAFE_INTEGER;
            expect(bigInt.eq(bigInt)).toBe(true);
            expect(bigInt.eq(bigInt - 1)).toBe(false);
        });

        it('this绑定应正确', () => {
            const num = 42;
            expect(num.eq(42)).toBe(true);
            expect(Number.prototype.eq.call(42, 42)).toBe(true);
            expect(Number.prototype.eq.call('42' as any, 42)).toBe(false); // 错误类型
        });
    })


    describe('lessThan', () => {
        it('应正确比较数值', () => {
            expect((5).lessThan(10)).toBe(true);
            expect((10).lessThan(5)).toBe(false);
            expect((-5).lessThan(5)).toBe(true);
        });

        it('相等值应返回false', () => {
            expect((10).lessThan(10)).toBe(false);
            expect((-0).lessThan(0)).toBe(false);
        });

        it('应处理浮点数精度', () => {
            expect((0.1 + 0.2).lessThan(0.3)).toBe(false); // 0.30000000000000004
            expect((0.1 + 0.2).lessThan(0.30000000000000005)).toBe(false);
        });

        it('特殊数值应处理正确', () => {
            expect((Infinity).lessThan(Infinity)).toBe(false);
            expect((-Infinity).lessThan(Infinity)).toBe(true);
            expect((NaN).lessThan(0)).toBe(false);
            expect((0).lessThan(NaN)).toBe(false);
        });

        it('边界值测试', () => {
            expect((Number.MAX_VALUE).lessThan(Infinity)).toBe(true);
            expect((Number.MIN_VALUE).lessThan(0.000001)).toBe(true);
        });

        it('应防止隐式类型转换', () => {
            // @ts-ignore
            expect((10).lessThan('5')).toBe(false);
        });
    });


    describe('greaterThan', () => {
        it('应正确比较数值', () => {
            expect((10).greaterThan(5)).toBe(true);
            expect((5).greaterThan(10)).toBe(false);
            expect((5).greaterThan(-5)).toBe(true);
        });

        it('相等值应返回false', () => {
            expect((10).greaterThan(10)).toBe(false);
            expect((0).greaterThan(-0)).toBe(false);
        });

        it('应处理浮点数精度', () => {
            expect((0.3).greaterThan(0.1 + 0.2)).toBe(false);
            expect((0.1 + 0.2).greaterThan(0.3)).toBe(true);
        });

        it('特殊数值处理', () => {
            expect((Infinity).greaterThan(Number.MAX_VALUE)).toBe(true);
            expect((-Infinity).greaterThan(Number.MIN_SAFE_INTEGER)).toBe(false);
            expect((NaN).greaterThan(0)).toBe(false);
        });

        it('边界值测试', () => {
            expect((Number.MAX_VALUE).greaterThan(Number.MAX_VALUE - 1)).toBe(false);
            expect((Number.MIN_VALUE).greaterThan(0)).toBe(true);
            expect((0).greaterThan(Number.MIN_VALUE)).toBe(false);
        });
    });

    describe('lessThanOrEqual', () => {
        it('应正确比较数值', () => {
            expect((5).lessThanOrEqual(10)).toBe(true);
            expect((10).lessThanOrEqual(5)).toBe(false);
            expect((10).lessThanOrEqual(10)).toBe(true);
        });

        it('负数比较', () => {
            expect((-5).lessThanOrEqual(-3)).toBe(true);
            expect((-3).lessThanOrEqual(-5)).toBe(false);
        });

        it('应处理浮点数', () => {
            expect((0.1 + 0.2).lessThanOrEqual(0.3)).toBe(false); // 0.30000000000000004
            expect((0.3).lessThanOrEqual(0.1 + 0.2)).toBe(true);
        });

        it('特殊数值处理', () => {
            expect((Infinity).lessThanOrEqual(Infinity)).toBe(true);
            expect((-Infinity).lessThanOrEqual(Infinity)).toBe(true);
            expect((NaN).lessThanOrEqual(0)).toBe(false);
        });

        it('边界值测试', () => {
            expect((Number.MAX_VALUE).lessThanOrEqual(Number.MAX_VALUE)).toBe(true);
            expect((Number.MIN_VALUE).lessThanOrEqual(Number.MIN_VALUE)).toBe(true);
            expect((Number.MIN_VALUE).lessThanOrEqual(0)).toBe(false);
        });
    });

    describe('isNotZero', () => {
        it('非零值应返回true', () => {
            expect((1).isNotZero()).toBe(true);
            expect((-1).isNotZero()).toBe(true);
            expect((0.000001).isNotZero()).toBe(true);
        });

        it('0应返回false', () => {
            expect((0).isNotZero()).toBe(false);
            expect((-0).isNotZero()).toBe(false);
        });

        it('特殊数值应处理正确', () => {
            expect((NaN).isNotZero()).toBe(true);
            expect((Infinity).isNotZero()).toBe(true);
        });

        it('边界值测试', () => {
            expect((Number.MIN_VALUE).isNotZero()).toBe(true);
            expect((Number.EPSILON).isNotZero()).toBe(true);
        });
    });


    describe('isZero', () => {
        it('0应返回true', () => {
            expect((0).isZero()).toBe(true);
            expect((-0).isZero()).toBe(true);
        });

        it('非零值应返回false', () => {
            expect((0.000001).isZero()).toBe(false);
            expect((-0.000001).isZero()).toBe(false);
            expect((1e-10).isZero()).toBe(false);
        });

        it('特殊数值应处理正确', () => {
            expect((NaN).isZero()).toBe(false);
            expect((Infinity).isZero()).toBe(false);
        });

        it('边界值测试', () => {
            expect((Number.MIN_VALUE).isZero()).toBe(false); // 最小正数
            expect((Number.EPSILON).isZero()).toBe(false);
        });

        it('应区分0和接近0的值', () => {
            expect((1e-323).isZero()).toBe(false); // 接近最小值
            expect((0).isZero()).toBe(true);
        });
    });


    describe('isNotEmpty', () => {
        it('非零值应返回true', () => {
            expect((1).isNotEmpty()).toBe(true);
            expect((-1).isNotEmpty()).toBe(true);
            expect((0.000001).isNotEmpty()).toBe(true);
        });

        it('0应返回false', () => {
            expect((0).isNotEmpty()).toBe(false);
            expect((-0).isNotEmpty()).toBe(false);
        });

        it('特殊数值应处理正确', () => {
            expect((NaN).isNotEmpty()).toBe(true);
            expect((Infinity).isNotEmpty()).toBe(true);
            expect((-Infinity).isNotEmpty()).toBe(true);
        });

        it('边界值测试', () => {
            expect((Number.MIN_VALUE).isNotEmpty()).toBe(true);
            expect((Number.EPSILON).isNotEmpty()).toBe(true);
        });
    });

    describe('isEmpty', () => {
        it('0应返回true', () => {
            expect((0).isEmpty()).toBe(true);
            expect((-0).isEmpty()).toBe(true);
        });

        it('非零值应返回false', () => {
            expect((1).isEmpty()).toBe(false);
            expect((-1).isEmpty()).toBe(false);
            expect((0.000001).isEmpty()).toBe(false);
        });

        it('特殊数值应处理正确', () => {
            expect((NaN).isEmpty()).toBe(false);
            expect((Infinity).isEmpty()).toBe(false);
            expect((-Infinity).isEmpty()).toBe(false);
        });

        it('边界值测试', () => {
            expect((Number.MIN_VALUE).isEmpty()).toBe(false); // 最小正数
            expect((Number.EPSILON).isEmpty()).toBe(false);
        });

        it('this绑定应正确', () => {
            const num = 0;
            expect(num.isEmpty()).toBe(true);
            expect(Number.prototype.isEmpty.call(0)).toBe(true);
            expect(Number.prototype.isEmpty.call('0' as any)).toBe(false); // 错误类型
        });
    });

    describe('clamp', () => {
        it('应限制在区间内', () => {
            expect((5).clamp(1, 10)).toBe(5);
            expect((0).clamp(-5, 5)).toBe(0);
        });

        it('小于下限应返回下限', () => {
            expect((-10).clamp(-5, 5)).toBe(-5);
        });

        it('大于上限应返回上限', () => {
            expect((10).clamp(-5, 5)).toBe(5);
        });

        it('边界顺序可自动调整', () => {
            expect((2).clamp(5, 1)).toBe(2);
            expect((0).clamp(5, -5)).toBe(0);
        });

        it('NaN边界应返回NaN', () => {
            expect(Number.isNaN((1).clamp(NaN, 5))).toBe(true);
            expect(Number.isNaN((1).clamp(0, NaN))).toBe(true);
        });

        it('this为NaN应返回NaN', () => {
            expect(Number.isNaN((NaN).clamp(0, 1))).toBe(true);
        });

        it('应处理无穷值', () => {
            expect((Infinity).clamp(0, 10)).toBe(10);
            expect((-Infinity).clamp(-10, 10)).toBe(-10);
        });
    });

    describe('isBetween', () => {
        it('默认包含边界', () => {
            expect((5).isBetween(1, 10)).toBe(true);
            expect((1).isBetween(1, 10)).toBe(true);
            expect((10).isBetween(1, 10)).toBe(true);
        });

        it('非包含比较', () => {
            expect((5).isBetween(1, 10, false)).toBe(true);
            expect((1).isBetween(1, 10, false)).toBe(false);
            expect((10).isBetween(1, 10, false)).toBe(false);
        });

        it('边界顺序可调整', () => {
            expect((5).isBetween(10, 1)).toBe(true);
            expect((0).isBetween(5, -5)).toBe(true);
        });

        it('NaN应返回false', () => {
            expect((NaN).isBetween(0, 1)).toBe(false);
            expect((1).isBetween(NaN, 5)).toBe(false);
            expect((1).isBetween(0, NaN)).toBe(false);
        });

        it('应处理无穷值', () => {
            expect((Infinity).isBetween(0, Infinity)).toBe(true);
            expect((-Infinity).isBetween(-Infinity, 0)).toBe(true);
            expect((5).isBetween(-Infinity, Infinity, false)).toBe(true);
        });
    });
})




