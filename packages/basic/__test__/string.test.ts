import './globalSetup'
import {describe} from 'vitest';
import {it, expect} from 'vitest'


describe('stringExtensions', () => {


    describe('isEmpty', () => {
        it('空字符串应返回true', () => {
            expect(''.isEmpty()).toBe(true);
        });

        it('非空字符串应返回false', () => {
            expect('a'.isEmpty()).toBe(false);
            expect(' '.isEmpty()).toBe(false); // 空格不是空
            expect('0'.isEmpty()).toBe(false);
        });

        it('空白字符串处理', () => {
            expect('   '.isEmpty()).toBe(false); // 包含空格
            expect('\t'.isEmpty()).toBe(false); // 制表符
            expect('\n'.isEmpty()).toBe(false); // 换行符
        });

        it('边界值测试', () => {
            expect(''.isEmpty()).toBe(true);
            expect('a'.isEmpty()).toBe(false);
            expect(' '.isEmpty()).toBe(false);
            expect('\u200B'.isEmpty()).toBe(false); // 零宽度空格
        });

        it('特殊字符处理', () => {
            expect('\0'.isEmpty()).toBe(false); // 空字符
            expect('\u0000'.isEmpty()).toBe(false); // Unicode空字符
        });

        it('this指向测试', () => {
            expect(''.isEmpty()).toBe(true);
            expect(String.prototype.isEmpty.call('')).toBe(true);
            expect(String.prototype.isEmpty.call(' ')).toBe(false);
            expect(String.prototype.isEmpty.call(0 as any)).toBe(false); // 错误类型
        });
    });
    describe('eq', () => {
        it('相同字符串应返回true', () => {
            expect('hello'.eq('hello')).toBe(true);
            expect('测试'.eq('测试')).toBe(true);
        });

        it('不同字符串应返回false', () => {
            expect('hello'.eq('world')).toBe(false);
            expect('apple'.eq('Apple')).toBe(false); // 大小写敏感
        });

        it('应正确处理数字比较', () => {
            expect('100'.eq(100)).toBe(true);
            expect('3.14'.eq(3.14)).toBe(true);
            expect('0'.eq(0)).toBe(true);
            expect('-5'.eq(-5)).toBe(true);
        });

        it('应处理不同类型转换', () => {
            expect('true'.eq(true)).toBe(false); // 不相等
            expect('null'.eq(null)).toBe(false);
            expect('undefined'.eq(undefined)).toBe(false);
            expect('object'.eq({})).toBe(false);
        });

        it('边界值测试', () => {
            expect(''.eq('')).toBe(true);
            expect(' '.eq(' ')).toBe(true);
            expect('0'.eq(0)).toBe(true);
            expect('NaN'.eq(NaN)).toBe(false);
            expect('Infinity'.eq(Infinity)).toBe(false);
        });

        it('特殊字符处理', () => {
            expect('\n'.eq('\n')).toBe(true);
            expect('\t'.eq('\t')).toBe(true);
            expect('\\'.eq('\\')).toBe(true);
            expect('"'.eq('"')).toBe(true);
            expect("'".eq("'")).toBe(true);
        });

        it('Unicode字符处理', () => {
            expect('😊'.eq('😊')).toBe(true);
            expect('你好'.eq('你好')).toBe(true);
            expect('🚀'.eq('🚀')).toBe(true);
            expect('αβγ'.eq('αβγ')).toBe(true);
        });

        it('长字符串比较', () => {
            const longStr = 'a'.repeat(10000);
            expect(longStr.eq(longStr)).toBe(true);
            expect(longStr.eq(longStr + 'a')).toBe(false);
        });

        it('this指向测试', () => {
            const str = 'test';
            expect(str.eq('test')).toBe(true);
            // @ts-ignore
            expect(String.prototype.eq.call('42', 42)).toBe(true);
            expect(String.prototype.eq.call(42 as any, '42')).toBe(false); // 数字调用
            expect(String.prototype.eq.call({ toString: () => 'obj' }, 'obj')).toBe(false);
        });
    });

    describe('contains', () => {
        it('应正确判断包含关系', () => {
            expect('hello'.contains('ell')).toBe(true);
            expect('hello world'.contains('world')).toBe(true);
            expect('typescript'.contains('script')).toBe(true);
        });

        it('应正确处理不存在的子串', () => {
            expect('hello'.contains('abc')).toBe(false);
            expect('memo'.contains('Memo')).toBe(false);
        });

        it('应处理非字符串参数', () => {
            // @ts-ignore
            expect('room42'.contains(42)).toBe(true);
            // @ts-ignore
            expect('boolean'.contains(true)).toBe(false);
            // @ts-ignore
            expect('null'.contains(null)).toBe(false);
        });

        it('this指向测试', () => {
            expect(String.prototype.contains.call('hello', 'he')).toBe(true);
            expect(String.prototype.contains.call('hello', 'HE')).toBe(false);
        });
    });

    describe('equalsIgnoreCase', () => {
        it('应在忽略大小写时返回true', () => {
            expect('Hello'.equalsIgnoreCase('hello')).toBe(true);
            expect('TypeScript'.equalsIgnoreCase('typescript')).toBe(true);
        });

        it('不同内容应返回false', () => {
            expect('Hello'.equalsIgnoreCase('world')).toBe(false);
            expect('abc'.equalsIgnoreCase('abd')).toBe(false);
        });

        it('非字符串参数应返回false', () => {
            // @ts-ignore
            expect('123'.equalsIgnoreCase(123)).toBe(false);
            // @ts-ignore
            expect('true'.equalsIgnoreCase(true)).toBe(false);
        });

        it('this指向测试', () => {
            expect(String.prototype.equalsIgnoreCase.call('HELLO', 'hello')).toBe(true);
            expect(String.prototype.equalsIgnoreCase.call('HELLO', 'HELLo')).toBe(true);
        });
    });


    describe('lastOrNull', () => {
        it('非空字符串应返回最后一个字符', () => {
            expect('hello'.lastOrNull()).toBe('o');
            expect('测试'.lastOrNull()).toBe('试');
            expect('123'.lastOrNull()).toBe('3');
        });

        it('空字符串应返回null', () => {
            expect(''.lastOrNull()).toBeNull();
        });

        it('单字符字符串处理', () => {
            expect('a'.lastOrNull()).toBe('a');
            expect(' '.lastOrNull()).toBe(' ');
            // expect('😊'.lastOrNull()).toBe('😊');
        });

        it('特殊字符处理', () => {
            expect('end\n'.lastOrNull()).toBe('\n');
            expect('end\t'.lastOrNull()).toBe('\t');
            expect('end\\'.lastOrNull()).toBe('\\');
        });

        it('Unicode字符处理', () => {
            // expect('火箭🚀'.lastOrNull()).toBe('🚀');
            expect('αβγ'.lastOrNull()).toBe('γ');
            // expect('中国🇨🇳'.lastOrNull()).toBe('🇨🇳');
        });

        it('代理对字符处理', () => {
            const emoji = 'thumbs👍';
            // expect(emoji.lastOrNull()).toBe('👍');
            // expect(emoji[emoji.length - 1]).not.toBe('👍'); // 验证代理对处理
        });

        it('长字符串处理', () => {
            const longStr = 'a'.repeat(1000) + 'z';
            expect(longStr.lastOrNull()).toBe('z');
            expect(''.lastOrNull()).toBeNull();
        });

        it('空白字符串处理', () => {
            expect('   '.lastOrNull()).toBe(' ');
            expect('\t\n'.lastOrNull()).toBe('\n');
        });

        it('this指向测试', () => {
            expect('test'.lastOrNull()).toBe('t');
            expect(String.prototype.lastOrNull.call('xyz')).toBe('z');
            expect(String.prototype.lastOrNull.call('')).toBeNull();
            // expect(String.prototype.lastOrNull.call(123 as any)).toBe('3'); // 数字调用
        });
    });

    describe('firstOrNull', () => {
        it('非空字符串应返回第一个字符', () => {
            expect('hello'.firstOrNull()).toBe('h');
            expect('测试'.firstOrNull()).toBe('测');
            expect('123'.firstOrNull()).toBe('1');
        });

        it('空字符串应返回null', () => {
            expect(''.firstOrNull()).toBeNull();
        });

        it('单字符字符串处理', () => {
            expect('a'.firstOrNull()).toBe('a');
            expect(' '.firstOrNull()).toBe(' ');
            // expect('😊'.firstOrNull()).toBe('😊');
        });

        it('特殊字符处理', () => {
            expect('\n'.firstOrNull()).toBe('\n');
            expect('\t'.firstOrNull()).toBe('\t');
            expect('\\'.firstOrNull()).toBe('\\');
        });

        it('Unicode字符处理', () => {
            // expect('🚀火箭'.firstOrNull()).toBe('🚀');
            expect('αβγ'.firstOrNull()).toBe('α');
            // expect('🇨🇳'.firstOrNull()).toBe('🇨🇳');
        });

        it('代理对字符处理', () => {
            const emoji = '👍';
            // expect(emoji.firstOrNull()).toBe(emoji);
            expect(emoji.length).toBe(2); // 代理对长度
        });

        it('this指向测试', () => {
            expect('test'.firstOrNull()).toBe('t');
            expect(String.prototype.firstOrNull.call('abc')).toBe('a');
            expect(String.prototype.firstOrNull.call('')).toBeNull();
            expect(String.prototype.firstOrNull.call(123 as any)).toBe(undefined); // 数字调用
        });
    });
    describe('isNotEmpty', () => {
        it('非空字符串应返回true', () => {
            expect('a'.isNotEmpty()).toBe(true);
            expect(' '.isNotEmpty()).toBe(true);
            expect('0'.isNotEmpty()).toBe(true);
        });

        it('空字符串应返回false', () => {
            expect(''.isNotEmpty()).toBe(false);
        });

        it('空白字符串处理', () => {
            expect('   '.isNotEmpty()).toBe(true);
            expect('\t'.isNotEmpty()).toBe(true);
            expect('\n'.isNotEmpty()).toBe(true);
        });

        it('边界值测试', () => {
            expect(''.isNotEmpty()).toBe(false);
            expect('a'.isNotEmpty()).toBe(true);
            expect(' '.isNotEmpty()).toBe(true);
            expect('\u200B'.isNotEmpty()).toBe(true); // 零宽度空格
        });

        it('特殊字符处理', () => {
            expect('\0'.isNotEmpty()).toBe(true);
            expect('\u0000'.isNotEmpty()).toBe(true);
        });

        it('长字符串处理', () => {
            const longStr = 'a'.repeat(10000);
            expect(longStr.isNotEmpty()).toBe(true);
            expect(''.isNotEmpty()).toBe(false);
        });
    });

    describe('isBlank', () => {
        it('空白字符串应返回true', () => {
            expect(''.isBlank()).toBe(true);
            expect('   '.isBlank()).toBe(true);
            expect('\t\n'.isBlank()).toBe(true);
        });

        it('含非空白字符应返回false', () => {
            expect(' a '.isBlank()).toBe(false);
            expect('text'.isBlank()).toBe(false);
        });

        it('this指向测试', () => {
            expect(String.prototype.isBlank.call('   ')).toBe(true);
            expect(String.prototype.isBlank.call(' 1 ')).toBe(false);
        });
    });
})

