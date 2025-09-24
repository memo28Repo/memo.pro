# @memo28.pro/notification

[![npm version](https://badge.fury.io/js/@memo28.pro%2Fnotification.svg)](https://badge.fury.io/js/@memo28.pro%2Fnotification)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> 多渠道机器人通知的统一编排层，面向企业微信、飞书、钉钉等平台的插件化 TypeScript SDK。

该包提供一个极简但可扩展的通知流水线：使用 `MessageBuilder` 构造消息、在 `Core` 中注册插件、由插件完成 Webhook 发送。设计重点在于**强类型、插件隔离与发送流程调试友好**，方便在企业内部服务或 DevOps 流水线中快速集成。

## ✨ 核心特性

- 🔌 **插件化平台适配**：通过继承 `Base`/`NotificationPlugin` 实现不同平台的发送逻辑。
- 🧱 **消息构建 DSL**：`MessageBuilder` 支持文本与 Markdown，后续可按需扩展其他类型。
- 🔁 **链式操作体验**：注册插件、播种消息、触发发送全流程链式调用，适合脚本化集成。
- 🛡️ **类型安全**：所有公开 API 均为强类型定义，搭配 Vitest 用例保障运行时行为。

## 🧠 组件速览

| 组件 | 角色 | 关键方法 |
| ---- | ---- | -------- |
| `Core` | 管理插件的中枢，负责注册、配置校验与批量发送 | `registerModule()` · `seed()` · `sendAll()` |
| `MessageBuilder` | 消息构建器，基于 `MessageBuilderPayload` 提供 `setText`、`setMarkdown` 等链式 API | `create()` · `setText()` · `setMarkdown()` · `getMessages()` |
| `Base` (`NotificationPlugin`) | 插件基类，封装 webhook、平台标识与消息构建器注入逻辑 | `setWebhook()` · `setPlatform()` · `setMessageBulder()` |
| `Wxcom` | 企业微信实现示例，演示如何将 `MessageBuilder` 载荷转换为平台 API 需要的格式 | `send()` |

> 目录：`src/core`（核心流程）· `src/message`（消息 DSL）· `src/plugin`（插件与基类）。

## 📁 目录结构

```
packages/notification
├── src
│   ├── core/core.ts            # Core 类：插件注册、校验与批量发送
│   ├── message/builder.ts      # 消息构建器，继承 builderPayload
│   ├── message/builderPayload.ts
│   ├── plugin/plugin.ts        # 插件抽象与基础实现
│   └── plugin/wxCom.ts         # 企业微信插件示例
├── __test__                    # Vitest 测试
└── dist / tsdown.config.ts     # 构建输出与配置
```

## 🚀 快速开始

```ts
import { Core, MessageBuilder, Wxcom } from '@memo28.pro/notification';

const core = new Core();
const message = MessageBuilder.create()
  .setText('🚀 部署完成')
  .setMarkdown(`# 发布通知\\n- 版本: v1.0.0\\n- 状态: ✅`);

const wx = new Wxcom(process.env.WX_WEBHOOK!);

core.registerModule(wx)  // 支持传入数组注册多个插件
    .seed(message);       // 注入消息构建器（自动完成配置校验）

await core.sendAll();      // 逐个插件执行 send()
```

### 发送流程

1. **注册插件**：`registerModule` 接受单个或数组插件，内部统一维护 `moduleList`。
2. **播种消息**：`seed` 会将 `MessageBuilder` 注入插件并执行基础配置检查（Webhook、平台标识、消息构建器是否齐全）。
3. **执行发送**：调用 `sendAll` 时遍历插件，若插件实现 `send()` 即会被触发；失败会记录日志并返回 `false`。

## 🔌 扩展新平台

```ts
import { Base, MessageBuilderPayload } from '@memo28.pro/notification';

class MyPlatform extends Base {
  constructor(webhook: string) {
    super();
    this.setPlatform('my-platform');
    this.setWebhook(webhook);
  }

  async send(): Promise<boolean> {
    const payloads = this.getMessageBulder()?.getMessages() ?? [];
    const res = await fetch(this.getWebhook(), {
      method: 'POST',
      body: JSON.stringify(payloads),
    });
    return res.ok;
  }
}
```

实现要点：

- 保持 `setPlatform()` 返回唯一的平台标识，便于日志与监控；
- 在 `send()` 内使用 `MessageBuilderPayload` 输出的消息数组，可按类型拆分并适配目标 API；
- 如需额外配置（签名、代理等），可在插件构造函数中扩展参数并缓存到实例属性。

## 🧪 开发与测试

```bash
pnpm install

# 构建（通过 tsdown 输出 CJS + ESM）
pnpm --filter @memo28.pro/notification build

# 运行测试
pnpm --filter @memo28.pro/notification test
pnpm --filter @memo28.pro/notification test:watch
```

Vitest 测试覆盖消息构建、插件注入和发送流程的关键路径，可作为新增插件时的参考模版。

## 🛠️ 调试建议

- **Webhook 校验**：`Core.seed` 会输出缺失 Webhook 或平台标识的警告，可借此快速定位配置问题。
- **多渠道并发**：`core.sendAll()` 默认串行执行，如需并行可在业务侧自行 `Promise.all` 对插件逐个调用 `send()`。
- **网络调试**：`Wxcom.send()` 内部使用 `fetch`，可通过 `global.fetch = ...` 注入自定义实现或结合 Vite/Vitest 的 `vi.spyOn` 进行断言。

## 🤝 贡献指南

1. Fork 仓库并创建特性分支。
2. 为新增能力补充 Vitest 用例与类型声明。
3. 通过 `pnpm --filter @memo28.pro/notification build` 和 `test` 校验无误后提交 PR。

## 📄 许可证

本包以 ISC 协议开源，可自由在企业与个人项目中使用与修改。
