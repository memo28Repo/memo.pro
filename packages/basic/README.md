# @memo28.pro/basic

一个强大的 JavaScript/TypeScript 原型扩展库，为原生类型提供便捷的扩展方法。

## 📦 安装

```bash
npm install @memo28.pro/basic
# 或
pnpm add @memo28.pro/basic
# 或
yarn add @memo28.pro/basic
```

## 🚀 快速开始

```typescript
import { stringExtensions, arrayExtensions, objectExtensions, numberExtensions } from '@memo28.pro/basic';

// 初始化扩展方法
stringExtensions();
arrayExtensions();
objectExtensions();
numberExtensions();

// 现在可以使用扩展方法了
console.log('hello'.isEmpty()); // false
console.log([1, 2, 3].firstOrNull()); // 1
console.log({a: 1, b: 2}.lastOrNull()); // 2
console.log((5).greaterThan(3)); // true
```

## 📚 API 文档

### String 扩展

#### 基础方法

- **`eq(val: string | number): boolean`** - 比较字符串是否相等
- **`isEmpty(): boolean`** - 检查字符串是否为空
- **`isNotEmpty(): boolean`** - 检查字符串是否不为空
- **`firstOrNull(): string | null`** - 安全获取第一个字符
- **`lastOrNull(): string | null`** - 安全获取最后一个字符

#### 使用示例

```typescript
// 字符串比较
'hello'.eq('hello'); // true
'123'.eq(123); // true

// 空值检查
''.isEmpty(); // true
'hello'.isNotEmpty(); // true

// 安全访问
'hello'.firstOrNull(); // 'h'
''.firstOrNull(); // null
'world'.lastOrNull(); // 'd'
```

### Array 扩展

#### 基础方法

- **`eq(val: unknown[]): boolean`** - 比较数组引用是否相等
- **`isEmpty(): boolean`** - 检查数组是否为空
- **`isNotEmpty(): boolean`** - 检查数组是否不为空
- **`contains(val: unknown): boolean`** - 检查数组是否包含指定元素
- **`firstOrNull(): T | null`** - 安全获取第一个元素
- **`lastOrNull(): T | null`** - 安全获取最后一个元素

#### 使用示例

```typescript
const arr = [1, 2, 3];

// 引用比较
arr.eq(arr); // true
arr.eq([1, 2, 3]); // false (不同引用)

// 空值检查
[].isEmpty(); // true
[1, 2, 3].isNotEmpty(); // true

// 包含检查
[1, 2, 3].contains(2); // true
[1, 2, 3].contains(4); // false

// 安全访问
[1, 2, 3].firstOrNull(); // 1
[].firstOrNull(); // null
[1, 2, 3].lastOrNull(); // 3
```

### Object 扩展

#### 基础方法

- **`eq(val: object): boolean`** - 比较对象引用是否相等
- **`isEmpty(): boolean`** - 检查对象是否为空（无可枚举属性）
- **`isNotEmpty(): boolean`** - 检查对象是否不为空
- **`contains(key: PropertyKey): boolean`** - 检查对象是否包含指定属性
- **`firstOrNull(): any | null`** - 安全获取第一个可枚举属性值
- **`lastOrNull(): any | null`** - 安全获取最后一个可枚举属性值

#### 使用示例

```typescript
const obj = { a: 1, b: 2, c: 3 };

// 引用比较
obj.eq(obj); // true
obj.eq({ a: 1, b: 2, c: 3 }); // false (不同引用)

// 空值检查
{}.isEmpty(); // true
{ a: 1 }.isNotEmpty(); // true

// 属性检查
obj.contains('a'); // true
obj.contains('d'); // false

// 安全访问
obj.firstOrNull(); // 1
{}.firstOrNull(); // null
obj.lastOrNull(); // 3
```

### Number 扩展

#### 基础方法

- **`eq(val: number | string): boolean`** - 比较数值是否相等
- **`isEmpty(): boolean`** - 检查数值是否为 0
- **`isNotEmpty(): boolean`** - 检查数值是否不为 0
- **`isZero(): boolean`** - 检查数值是否为 0
- **`isNotZero(): boolean`** - 检查数值是否不为 0

#### 比较方法（基于 Decimal.js 精确计算）

- **`lessThan(diff: number): boolean`** - 小于比较
- **`lessThanOrEqual(diff: number): boolean`** - 小于等于比较
- **`greaterThan(diff: number): boolean`** - 大于比较
- **`greaterThanOrEqual(diff: number): boolean`** - 大于等于比较

#### 使用示例

```typescript
// 数值比较
(5).eq(5); // true
(5).eq('5'); // true

// 零值检查
(0).isEmpty(); // true
(0).isZero(); // true
(5).isNotZero(); // true

// 精确比较（避免浮点数精度问题）
(0.1).greaterThan(0.09); // true
(0.2).lessThanOrEqual(0.3); // true
(1.5).greaterThanOrEqual(1.5); // true
```

## 🏗️ 类型接口

### BaseFuncCall<T>

所有扩展类型的基础接口：

```typescript
interface BaseFuncCall<T> {
  eq(val: T): boolean;
  isEmpty(): boolean;
  isNotEmpty(): boolean;
}
```

### Collection<T>

集合类型接口（String, Array, Object）：

```typescript
interface Collection<T> {
  contains(item: T): boolean;
  firstOrNull(): T | null;
  lastOrNull(): T | null;
}
```

### Comparable<T>

可比较类型接口（Number）：

```typescript
interface Comparable<T> {
  greaterThan(other: T): boolean;
  greaterThanOrEqual(other: T): boolean;
  lessThan(other: T): boolean;
  lessThanOrEqual(other: T): boolean;
}
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 监听模式
pnpm test:watch

# UI 模式
pnpm test:ui
```

## 📝 注意事项

1. **原型扩展**：此库通过扩展原生类型的原型来提供功能，请确保在项目初始化时调用相应的扩展函数。

2. **类型安全**：所有扩展方法都提供了完整的 TypeScript 类型定义。

3. **精确计算**：Number 扩展的比较方法使用 Decimal.js 来避免浮点数精度问题。

4. **引用比较**：`eq` 方法对于对象和数组进行的是引用比较，而不是深度比较。

5. **空值安全**：`firstOrNull` 和 `lastOrNull` 方法在无法获取值时返回 `null`，避免抛出异常。

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

- 作者：@memo28.repo
- 项目地址：[GitHub](https://github.com/memo28-space-org/memo28.pro.Repo)