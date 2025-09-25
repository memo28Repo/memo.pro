# @memo28.pro/basic

> 轻量却贴心的原型扩展合集，让字符串、数组、对象与数字处理像写伪代码一样顺滑。

## 📦 安装

```bash
npm install @memo28.pro/basic
# 或
pnpm add @memo28.pro/basic
# 或
yarn add @memo28.pro/basic
```

## 🚀 快速上手

```ts
import { stringExtensions, arrayExtensions, objectExtensions, numberExtensions } from '@memo28.pro/basic'

stringExtensions()
arrayExtensions()
objectExtensions()
numberExtensions()

// 现在原生类型已经拥有更多小帮手
'memo'.equalsIgnoreCase('MEMO') // true
[1, 2, 2, null].distinct().compact() // [1, 2]
(3.14159).roundTo(2) // 3.14
({ a: 1, b: 2 }).lastOrNull() // 2
```

## 🌟 为什么喜欢它

- **零心智负担**：方法命名向 Java/Kotlin 看齐，读起来就知道要干什么。
- **边界友好**：所有方法都有对应的 Vitest 覆盖，稀疏数组、NaN、Infinity 都被考虑在内。 【F:packages/basic/__test__/array.test.ts†L1-L158】【F:packages/basic/__test__/number.test.ts†L1-L158】【F:packages/basic/__test__/string.test.ts†L1-L118】
- **TypeScript 无缝衔接**：完整的 `.d.ts` 声明，编辑器联想一步到位。 【F:packages/basic/string.d.ts†L1-L41】【F:packages/basic/array.d.ts†L1-L21】【F:packages/basic/number.d.ts†L1-L37】

---

## 🔤 String 工具箱

### 常用判断
- `eq(value)`：字符串或数字值相等判断，自动处理数值转字符串。 【F:packages/basic/src/string.ts†L3-L15】
- `contains(value)`：判断是否包含指定内容，支持 number/boolean 等原始类型。 【F:packages/basic/src/string.ts†L17-L23】
- `equalsIgnoreCase(value)`：忽略大小写的等值比较。 【F:packages/basic/src/string.ts†L25-L31】
- `isEmpty()` / `isNotEmpty()`：零长度判断。 【F:packages/basic/src/string.ts†L33-L39】
- `isBlank()`：只要是空白字符统统算作空。 【F:packages/basic/src/string.ts†L41-L45】

### 查找与提取
- `count(value, allowOverlap = false)`：统计子串出现次数，可选重叠匹配。 【F:packages/basic/src/string.ts†L55-L70】
- `substringBefore(separator, missingValue?)`：拿到分隔符之前的部分，找不到时可返回兜底值。 【F:packages/basic/src/string.ts†L72-L84】
- `substringAfter(separator, missingValue = '')`：取分隔符之后的部分，支持自定义缺省内容。 【F:packages/basic/src/string.ts†L86-L97】
- `firstOrNull()` / `lastOrNull()`：不会抛错的安全访问。 【F:packages/basic/src/string.ts†L47-L53】

> 💡 **使用小贴士**：`count` 会自动把数字、布尔值转为字符串再统计，`allowOverlap` 适合处理 `aaa`.count('aa', true) 这样的场景。

---

## 📚 Array 工具箱

### 结构与筛选
- `eq(array)`：引用相等检查。 【F:packages/basic/src/array.ts†L3-L7】
- `isEmpty()` / `isNotEmpty()`：快速判空。 【F:packages/basic/src/array.ts†L9-L15】
- `contains(value)`：包含元素判断。 【F:packages/basic/src/array.ts†L17-L17】
- `compact()`：剔除 `null`/`undefined` 后返回新数组，对稀疏数组也能保持预期表现。 【F:packages/basic/src/array.ts†L39-L52】

### 去重与拆分
- `distinct()`：基于 `Set` 的去重，保持原始顺序。 【F:packages/basic/src/array.ts†L24-L29】
- `chunk(size)`：按照指定长度切片，非法尺寸会返回空数组。 【F:packages/basic/src/array.ts†L31-L38】
- `groupBy(iteratee)`：按键分组，支持 `null`/`undefined` 等特殊键值并抛出明确的错误提示。 【F:packages/basic/src/array.ts†L54-L73】
- `firstOrNull()` / `lastOrNull()`：首尾元素的安全读取。 【F:packages/basic/src/array.ts†L19-L23】

> 🧪 **测试看点**：`groupBy` 针对回调抛错、稀疏数组索引、`null` 键值等情况都有覆盖，放心在生产使用。 【F:packages/basic/__test__/array.test.ts†L61-L122】

---

## 🔢 Number 工具箱

### 基础判断
- `eq(value)`：支持数字与字符串比较，屏蔽 `NaN` 陷阱。 【F:packages/basic/src/number.ts†L13-L23】
- `isEmpty()` / `isNotEmpty()`、`isZero()` / `isNotZero()`：围绕零值的便捷判断。 【F:packages/basic/src/number.ts†L25-L35】
- `isEven()` / `isOdd()`：仅在有限整数范围内返回 `true`，避免浮点误判。 【F:packages/basic/src/number.ts†L149-L164】

### 精准比较（基于 Decimal.js）
- `lessThan(value)` / `lessThanOrEqual(value)`
- `greaterThan(value)` / `greaterThanOrEqual(value)`
- `toDecimal()`：拿到可链式调用的 `Decimal` 实例。 【F:packages/basic/src/number.ts†L37-L63】

### 区间与舍入
- `clamp(min, max)`：裁剪在闭区间内，自动处理无限大与大小写反转。 【F:packages/basic/src/number.ts†L65-L96】
- `isBetween(min, max, inclusive = true)`：可开可闭的区间判断。 【F:packages/basic/src/number.ts†L98-L132】
- `roundTo(precision = 0, mode = 'round')`：支持负精度与 `round` / `floor` / `ceil` 三种模式。 【F:packages/basic/src/number.ts†L134-L147】

> 🎯 **应用范例**：`(128).clamp(0, 100)` ➜ `100`，`(1234.5).roundTo(-2, 'floor')` ➜ `1200`，`(0.2 + 0.1).toDecimal().toNumber()` ➜ `0.3`。

---

## 🧰 Object 工具箱

- `eq(object)`：引用相等判断。 【F:packages/basic/src/object.ts†L1-L7】
- `isEmpty()` / `isNotEmpty()`：通过 `Reflect` 检查可枚举键。 【F:packages/basic/src/object.ts†L9-L19】
- `contains(key)`：兼容 Symbol 的键存在性检测。 【F:packages/basic/src/object.ts†L21-L26】
- `firstOrNull()` / `lastOrNull()`：返回首末可枚举属性的值，没有则为 `null`。 【F:packages/basic/src/object.ts†L28-L40】

> ⚠️ **使用前记得初始化**：所有扩展都通过函数注入原型，务必在应用入口调用对应的 `xxxExtensions()`。

---

## 🧪 测试

```bash
pnpm --filter @memo28.pro/basic test
```

Vitest 默认会输出覆盖率摘要，便于持续关注边界情况的守护。

## 🤝 贡献

- 提交前运行 `pnpm format` & `pnpm test`，保持代码整洁可靠。
- 欢迎通过 Issue 分享新的原型扩展灵感，或直接 PR 加入更多贴心方法！

## 📄 许可证

MIT

