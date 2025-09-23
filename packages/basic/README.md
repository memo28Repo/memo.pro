# @memo28.pro/basic

> 原生 `String`、`Array`、`Object` 与 `Number` 的原型增强合集，提供一致的空值、安全访问与数值比较体验。

`@memo28.pro/basic` 通过可选的初始化函数为常用原生类型注入一组经过类型定义约束的实用方法。所有扩展都以 "少即是多" 为原则：避免污染命名空间、保持易读的调用方式，并在需要数值精度时由 `decimal.js` 提供支撑。

## 🎯 能力一览

| 领域        | 能力聚焦 | 代表方法 |
| ----------- | -------- | -------- |
| 字符串 (String) | 空/空白判断、忽略大小写比较、安全访问 | `isEmpty()` · `isBlank()` · `equalsIgnoreCase()` · `firstOrNull()` |
| 数组 (Array)    | 集合判空、包含判断、去重与切片       | `contains()` · `distinct()` · `chunk()` |
| 对象 (Object)   | 空对象检测、安全取值、键存在性检查   | `isEmpty()` · `contains()` · `lastOrNull()` |
| 数值 (Number)   | 可靠比较、区间约束、Decimal 精度包装 | `greaterThan()` · `isBetween()` · `clamp()` · `toDecimal()` |

> 所有扩展方法都配套 `.d.ts` 声明文件 (`array.d.ts`、`number.d.ts` …)，确保在 TypeScript 项目中拥有完整的智能提示与类型检查体验。

## 🧠 工作原理

1. **显式引导**：使用者需主动调用 `stringExtensions()`、`arrayExtensions()`、`objectExtensions()`、`numberExtensions()` 等初始化函数，避免在未知上下文中静默扩展原型。
2. **最小侵入**：每个扩展方法在挂载前都会先检查原型链，防止与宿主环境已有实现发生冲突。
3. **数值可靠性**：所有比较相关方法内部统一通过 `Decimal` 封装浮点运算，既保证跨平台一致性，又保持返回布尔值的轻量接口。

## 📁 目录结构

```
packages/basic
├── src
│   ├── array.ts        # Array 原型扩展
│   ├── number.ts       # Number 原型扩展（Decimal 支持）
│   ├── object.ts       # Object 原型扩展（键与可枚举检查）
│   └── string.ts       # String 原型扩展
├── *.d.ts              # 各原型扩展的类型声明文件
├── __test__            # Vitest 单元测试
└── tsdown.config.ts    # tsdown 构建配置
```

## 🚀 快速上手

```ts
import {
  stringExtensions,
  arrayExtensions,
  objectExtensions,
  numberExtensions,
} from '@memo28.pro/basic';

// 在程序入口初始化（只需调用一次）
stringExtensions();
arrayExtensions();
objectExtensions();
numberExtensions();

'  '.isBlank();            // true
[1, 1, 2].distinct();      // [1, 2]
({ a: 1 }).contains('a');  // true
(0.1).greaterThan(0.09);   // true（Decimal 支持）
```

### 常用模式

- **安全访问**：通过 `firstOrNull()` / `lastOrNull()` 系列避免访问空集合抛错。
- **语义化比较**：`isBetween()`、`clamp()` 帮助明确边界约束；`equalsIgnoreCase()` 面向用户输入。
- **集合工具链**：`distinct()` 与 `chunk(size)` 组合实现快速数据预处理。

## 🧪 开发与测试

```bash
# 在 monorepo 根目录执行
pnpm install

# 仅构建本包（CJS + ESM 输出在 dist/）
pnpm --filter @memo28.pro/basic build

# 运行/监听单元测试
pnpm --filter @memo28.pro/basic test
pnpm --filter @memo28.pro/basic test:watch
```

测试基于 [Vitest](https://vitest.dev/)，覆盖常见空值、比较与边界场景。构建工具使用 [tsdown](https://github.com/egoist/tsdown)，默认输出 CommonJS 与 ESM 双格式。

## 🔌 与其他包协作

- 作为多个项目的基础运行时补充模块使用，可在 `packages/*` 或应用层统一初始化。
- 若搭配服务端渲染或外部 SDK，请确保仅初始化一次，避免重复挂载导致的性能损耗。

## 🧱 扩展注意事项

- **命名约束**：在自定义扩展中遵循已有命名约定（`isXxx`、`firstOrNull` 等），便于搜索与阅读。
- **幂等设计**：扩展函数内部使用 `Reflect.has` 检查，新增方法时应保持这种幂等策略。
- **类型声明同步**：新增方法后务必同步更新对应的 `*.d.ts` 文件与测试用例。

## 📄 许可证

本包基于 [ISC](https://opensource.org/licenses/ISC) 许可证发布。

如需了解更高层的使用案例，可参考 monorepo 内其他包对本模块的依赖方式。
