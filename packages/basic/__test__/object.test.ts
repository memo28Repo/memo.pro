import {describe} from 'vitest';
import './globalSetup'
import {it, expect} from 'vitest'


describe('object', () => {

    describe('lastOrNull', () => {
        it('应返回最后一个可枚举属性值', () => {
            const obj = {a: 1, b: 2, c: 3};
            expect(obj.lastOrNull()).toBe(3);
        });

        it('空对象应返回null', () => {
            expect({}.lastOrNull()).toBeNull();
            expect(Object.create(null)?.lastOrNull?.()).toBeUndefined();
        });

        it('应忽略Symbol属性', () => {
            const sym = Symbol('key');
            const obj = {a: 'first', [sym]: 'symbol value'};
            expect(obj.lastOrNull()).toBe('first'); // 只有一个可枚举属性
        });

        it('应遵循属性顺序', () => {
            // 数字键按数字顺序
            const numObj = {2: 'two', 1: 'one', 3: 'three', a: 'alpha'};
            expect(numObj.lastOrNull()).toBe('alpha');

            // 字符串键按创建顺序
            const strObj = {};
            strObj.a = 'first';
            strObj.z = 'last';
            expect(strObj.lastOrNull()).toBe('last');
        });

        it('应处理不可枚举属性', () => {
            const obj = {visible: 'value'};
            Object.defineProperty(obj, 'hidden', {
                value: 'secret',
                enumerable: false
            });
            expect(obj.lastOrNull()).toBe('value');
        });

        it('应处理数组', () => {
            expect([1, 2, 3].lastOrNull()).toBe(3);
            expect([].lastOrNull()).toBeNull();
        });

        it('应处理函数', () => {
            function test() {
            }

            test.a = 'first';
            test.b = 'last';
            expect(test.lastOrNull()).toBeNull();
        });

        it('边界值测试', () => {
            // 单属性对象
            const singleProp = {key: 'value'};
            expect(singleProp.lastOrNull()).toBe('value');

            // 只有Symbol属性的对象
            const symObj = {[Symbol('key1')]: 'val1', [Symbol('key2')]: 'val2'};
            expect(symObj.lastOrNull()).toBeNull();

            // 混合属性顺序
            const mixedObj = {
                10: 'ten',
                2: 'two',
                a: 'alpha',
                1: 'one'
            };
            // 期望顺序: 1, 2, 10, a
            expect(mixedObj.lastOrNull()).toBe('alpha');
        });

        it('this绑定应正确', () => {
            const obj = {a: 1, b: 2};
            expect(obj.lastOrNull()).toBe(2);
            expect(Object.prototype.lastOrNull.call({})).toBeNull();
            expect(Object.prototype.lastOrNull.call('test' as any)).toBe(null); // 字符串
        });
    });

    describe('firstOrNull', () => {
        it('应返回第一个可枚举属性值', () => {
            const obj = {a: 1, b: 2};
            expect(obj.firstOrNull()).toBe(1);
        });

        it('空对象应返回null', () => {
            expect({}.firstOrNull()).toBeNull();
            expect(Object.create(null)?.firstOrNull?.()).toBeUndefined();
        });

        it('应忽略Symbol属性', () => {
            const sym = Symbol('key');
            const obj = {[sym]: 'symbol value', a: 'string value'};
            expect(obj.firstOrNull()).toBe('string value');
        });

        it('应遵循属性顺序', () => {
            // 数字键按数字顺序
            const numObj = {2: 'two', 1: 'one', b: 'beta', a: 'alpha'};
            expect(numObj.firstOrNull()).toBe('one');

            // 字符串键按创建顺序
            const strObj = {};
            strObj.z = 'last';
            strObj.a = 'first';
            expect(strObj.firstOrNull()).toBe('last'); // 注意：创建顺序，不是字母顺序
        });

        it('应处理不可枚举属性', () => {
            const obj = {};
            Object.defineProperty(obj, 'hidden', {
                value: 'secret',
                enumerable: false
            });
            obj.visible = 'value';
            expect(obj.firstOrNull()).toBe('value');
        });

        it('应处理数组', () => {
            expect([1, 2, 3].firstOrNull()).toBe(1);
            expect([].firstOrNull()).toBeNull();
        });

        it('应处理函数', () => {
            function test() {
            }

            test.a = 'first';
            test.b = 'second';
            expect(test.firstOrNull()).toBeNull();
        });

        it('边界值测试', () => {
            // 只有Symbol属性的对象
            const symObj = {[Symbol('key')]: 'value'};
            expect(symObj.firstOrNull()).toBeNull();

            // 只有不可枚举属性的对象
            const nonEnumObj = {};
            Object.defineProperty(nonEnumObj, 'key', {
                value: 'value',
                enumerable: false
            });
            expect(nonEnumObj.firstOrNull()).toBeNull();

            // 原型链上的属性
            const protoObj = Object.create({inherited: 'value'});
            expect(protoObj.firstOrNull()).toBeNull();
        });

        it('this绑定应正确', () => {
            const obj = {a: 1};
            expect(obj.firstOrNull()).toBe(1);
            expect(Object.prototype.firstOrNull.call({})).toBeNull();
            expect(Object.prototype.firstOrNull.call('test' as any)).toBeNull(); // 字符串
        });
    });

    describe('contains', () => {
        it('应检测自身属性存在', () => {
            const obj = {a: 1, b: 2};
            expect(obj.contains('a')).toBe(true);
            expect(obj.contains('c')).toBe(false);
        });

        it('应检测Symbol属性', () => {
            const sym = Symbol('key');
            const obj = {[sym]: 'value'};
            expect(obj.contains(sym)).toBe(true);
            expect(obj.contains(Symbol('other'))).toBe(false);
        });

        it('不应忽略原型链属性', () => {
            const proto = {inherited: 'value'};
            const obj = Object.create(proto);
            obj.own = 'value';

            expect(obj.contains('own')).toBe(true);
            expect(obj.contains('inherited')).toBe(true);
        });

        it('应处理不可枚举属性', () => {
            const obj = {};
            Object.defineProperty(obj, 'hidden', {
                value: 'secret',
                enumerable: false
            });

            expect(obj.contains('hidden')).toBe(true);
        });

        it('应处理数组', () => {
            const arr = [1, 2, 3];
            expect(arr.contains('0')).toBe(false);
            expect(arr.contains('length')).toBe(false);
            expect(arr.contains('3')).toBe(false);
        });

        it('应处理函数', () => {
            function test() {
            }

            test.prop = 'value';
            expect(test.contains('prop')).toBe(false);
            expect(test.contains('name')).toBe(false);
            expect(test.contains('unknown')).toBe(false);
        });

        it('应处理日期对象', () => {
            const date = new Date();
            date.customProp = 'value';
            expect(date.contains('customProp')).toBe(true);
            expect(date.contains('getTime')).toBe(true); // 原型方法
        });

        it('应处理正则表达式', () => {
            const regex = /test/;
            regex.customProp = 'value';
            expect(regex.contains('customProp')).toBe(true);
            expect(regex.contains('test')).toBe(true);
        });

        it('边界值测试', () => {
            // 空键名
            const obj = {'': 'empty key'};
            expect(obj.contains('')).toBe(true);

            // 数字键名
            const numObj = {0: 'zero', 1: 'one'};
            expect(numObj.contains('0')).toBe(true);
            expect(numObj.contains(0 as any)).toBe(true); // 数字会被转换为字符串
            expect(numObj.contains(1)).toBe(true);

            // 非常规键名
            const weirdObj = {'\n': 'newline', '\0': 'null char'};
            expect(weirdObj.contains('\n')).toBe(true);
            expect(weirdObj.contains('\0')).toBe(true);
        });

        it('this绑定应正确', () => {
            const obj = {key: 'value'};
            expect(obj.contains('key')).toBe(true);
            expect(Object.prototype.contains.call(obj, 'key')).toBe(true);
            expect(Object.prototype.contains.call(42 as any, 'toString')).toBe(false); // 原始值
        });
    });


    describe('isNotEmpty', () => {
        it('非空对象应返回true', () => {
            expect({a: 1}.isNotEmpty()).toBe(true);
            expect({[Symbol()]: 'value'}.isNotEmpty()).toBe(true);
        });

        it('空对象应返回false', () => {
            expect({}.isNotEmpty()).toBe(false);
            expect(Object.create(null)?.isNotEmpty?.()).toBe(undefined);
        });

        it('应处理数组', () => {
            expect([1, 2].isNotEmpty()).toBe(true);
            expect([].isNotEmpty()).toBe(false);
        });

        it('应处理函数', () => {
            function test() {
            }

            test.property = 'value';
            expect(test.isNotEmpty()).toBe(true);
        });

        it('应处理日期对象', () => {
            const date = new Date();
            date.customProp = 'value';
            expect(date.isNotEmpty()).toBe(true);
        });

        it('应处理原型对象', () => {
            class Test {
                prop = 'value';
            }

            expect(new Test().isNotEmpty()).toBe(true);
        });

        it('应处理Symbol属性', () => {
            const sym = Symbol('key');
            const obj = {[sym]: 'value'};
            expect(obj.isNotEmpty()).toBe(true);
        });

        it('边界值测试', () => {
            // 只有不可枚举属性的对象
            const nonEnumObj = {};
            Object.defineProperty(nonEnumObj, 'key', {
                value: 'value',
                enumerable: false
            });
            expect(nonEnumObj.isNotEmpty()).toBe(false);

            // 原型链上的属性
            const protoObj = Object.create({inherited: 'value'});
            expect(protoObj.isNotEmpty()).toBe(false);
        });

        it('this绑定应正确', () => {
            expect({a: 1}.isNotEmpty()).toBe(true);
            expect(Object.prototype.isNotEmpty.call({})).toBe(false);
            expect(Object.prototype.isNotEmpty.call('test' as any)).toBe(true); // 原始值
        });
    });

    describe('isEmpty', () => {
        it('空对象应返回true', () => {
            expect({}.isEmpty()).toBe(true);
            expect(Object.create(null)?.isEmpty?.()).toBe(undefined);
        });

        it('非空对象应返回false', () => {
            expect({a: 1}.isEmpty()).toBe(false);
            expect({[Symbol()]: 'value'}.isEmpty()).toBe(false);
        });

        it('应忽略不可枚举属性', () => {
            const obj = {};
            Object.defineProperty(obj, 'hidden', {
                value: 'secret',
                enumerable: false
            });
            expect(obj.isEmpty()).toBe(true);
        });

        it('应处理数组', () => {
            expect([].isEmpty()).toBe(true);
            expect([1, 2].isEmpty()).toBe(false);
        });

        it('应处理函数', () => {
            function test() {
            }

            expect(test.isEmpty()).toBe(true);
        });

        it('应处理日期对象', () => {
            expect(new Date().isEmpty()).toBe(true);
        });

        it('应处理正则表达式', () => {
            expect(/test/.isEmpty()).toBe(true);
        });

        it('应处理原型对象', () => {
            class Test {
            }

            expect(Test.prototype.isEmpty()).toBe(true);
            const instance = new Test();
            expect(instance.isEmpty()).toBe(true);
        });

        it('边界值测试', () => {
            // 只有Symbol属性的对象
            const symObj = {[Symbol('key')]: 'value'};
            expect(symObj.isEmpty()).toBe(false);

            // 只有不可枚举属性的对象
            const nonEnumObj = {};
            Object.defineProperty(nonEnumObj, 'key', {
                value: 'value',
                enumerable: false
            });
            expect(nonEnumObj.isEmpty()).toBe(true);
        });

        it('this绑定应正确', () => {
            expect({}.isEmpty()).toBe(true);
            expect(Object.prototype.isEmpty.call({a: 1})).toBe(false);
            // expect(Object.prototype.isEmpty.call(42 as any)).toBe(false); // 原始值
        });
    });

    describe('eq', () => {
        it('相同引用应返回true', () => {
            const obj = {a: 1};
            expect(obj.eq(obj)).toBe(true);
        });

        it('不同引用应返回false', () => {
            const obj1 = {a: 1};
            const obj2 = {a: 1};
            expect(obj1.eq(obj2)).toBe(false);
        });

        it('应处理空对象', () => {
            const empty1 = {};
            const empty2 = {};
            expect(empty1.eq(empty1)).toBe(true);
            expect(empty1.eq(empty2)).toBe(false);
        });

        it('应处理嵌套对象', () => {
            const obj1 = {a: {b: 2}};
            const obj2 = {a: {b: 2}};
            expect(obj1.eq(obj1)).toBe(true);
            expect(obj1.eq(obj2)).toBe(false);
        });

        it('应处理数组', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [1, 2, 3];
            expect(arr1.eq(arr1)).toBe(true);
            expect(arr1.eq(arr2)).toBe(false);
        });

        it('应处理函数', () => {
            const func1 = () => {
            };
            const func2 = () => {
            };
            expect(func1.eq(func1)).toBe(true);
            expect(func1.eq(func2)).toBe(false);
        });

        it('应处理日期对象', () => {
            const date1 = new Date();
            const date2 = new Date(date1.getTime());
            expect(date1.eq(date1)).toBe(true);
            expect(date1.eq(date2)).toBe(false);
        });

        it('应处理正则表达式', () => {
            const regex1 = /test/gi;
            const regex2 = /test/gi;
            expect(regex1.eq(regex1)).toBe(true);
            expect(regex1.eq(regex2)).toBe(false);
        });

        it('应处理原型对象', () => {
            class Test {
            }

            const instance1 = new Test();
            const instance2 = new Test();
            expect(instance1.eq(instance1)).toBe(true);
            expect(instance1.eq(instance2)).toBe(false);
        });

        it('this绑定应正确', () => {
            const obj = {};
            expect(obj.eq(obj)).toBe(true);
            expect(Object.prototype.eq.call(obj, {})).toBe(false);
            // expect(Object.prototype.eq.call(42 as any, 42)).toBe(false); // 原始值
        });
    });
})