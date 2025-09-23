# memo.pro Monorepo

> A pnpm + Turbo workspace collecting TypeScript utilities for runtime ergonomics, object storage integrations, notification bots, and supporting playground apps.

## 🧭 Repository layout

```
.
├── packages/
│   ├── basic/           # 原生类型原型增强集合
│   ├── minio/           # MinIO/S3 上传 SDK（Diary workflow）
│   └── notification/    # 多渠道机器人通知插件框架
├── apps/
│   └── test/            # Vue 3 + TypeScript + Vite 示例应用
├── docs/                # 团队规范（分支、打包）
├── script/              # 辅助脚本
├── turbo.json           # Turbo 任务拓扑
└── pnpm-workspace.yaml  # Workspace 配置
```

每个包都内置了独立的 README，详述架构与扩展方式，便于快速定位可复用的能力。

## 📦 包概览

| 包 | 说明 | 快速入口 |
| --- | --- | --- |
| `@memo28.pro/basic` | 为 `String` / `Array` / `Object` / `Number` 提供显式注册的原型增强方法，覆盖空值判断、集合处理与 Decimal 精度比较。 | [packages/basic/README.md](packages/basic/README.md) |
| `@memo28.pro/minio` | 以 `DiaryManager` + `IDiaryUploader` 为核心的 MinIO/S3 上传层，支持自动建桶、元数据携带与自定义上传策略。 | [packages/minio/README.md](packages/minio/README.md) |
| `@memo28.pro/notification` | 插件化通知 SDK，结合 `Core`、`MessageBuilder`、`NotificationPlugin` 实现企业微信/飞书/钉钉等渠道的统一发送流程。 | [packages/notification/README.md](packages/notification/README.md) |

## 🚀 快速上手

### 先决条件

- Node.js >= 14（推荐 18 LTS）
- [pnpm](https://pnpm.io) 10.14.x（仓库通过 `packageManager` 字段锁定版本）

### 安装依赖

```bash
pnpm install
```

首次安装会自动启用 Husky 钩子并生成 `node_modules` 链接。

## 🔧 常用工作流

### 跨包任务（Turbo 驱动）

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 并行运行所有定义了 `dev` 脚本的包，适合联调或 demo 预览。 |
| `pnpm build` | 执行 `turbo run build` 构建所有包与应用。 |
| `pnpm build:pkg` | 仅构建 `packages/*` 下的库，输出 CJS/ESM。 |
| `pnpm preBuild` | 触发构建前置任务（例如生成类型或清理产物）。 |
| `pnpm build:watch` | 进入增量构建监听模式。 |
| `pnpm test` | 运行全量 Vitest 测试。 |
| `pnpm test:watch` | 在支持的包中监听测试。 |
| `pnpm lint` | 汇总执行各包的 Lint 任务。 |
| `pnpm format` | 使用 Prettier 重写所有 `ts/tsx/md` 文件。 |
| `pnpm updateDep` | 利用 Turbo 统一升级依赖。 |
| `pnpm build:api` | 构建产物并执行 API Extractor，输出类型报告。 |
| `pnpm build:md` | 编译包内 Markdown/文档资源。 |
| `pnpm ci:publish` | 通过 Changesets/pnpm 递归发布。 |
| `pnpm cz` | 使用自定义 Commitizen 适配器撰写规范化提交信息。 |

> 所有命令均定义在仓库根目录的 `package.json` 中，可通过 `--filter` 精准作用于单个包，例如 `pnpm --filter @memo28.pro/basic test`。

### 单包调试

1. 选择目标包并进入对应目录（或使用 `--filter`）。
2. 运行 `pnpm build`/`pnpm test` 等命令验证逻辑。
3. 参照包内 README 的「快速上手」「开发与测试」章节获取更细粒度的脚本。

## 🧪 质量与发布

- 所有库默认使用 [Vitest](https://vitest.dev/) 进行单元测试。
- 构建流程依赖 [tsdown](https://github.com/egoist/tsdown) 输出 CJS/ESM 双格式。
- API 变更可通过 `pnpm build:api` 生成的报告进行审查。
- 发布前建议执行 `pnpm lint && pnpm test && pnpm build`，再通过 Changesets 触发 `pnpm ci:publish`。

## 📚 补充文档

- [docs/branchManagement.md](docs/branchManagement.md)：分支管理与协作流程。
- [docs/packagingSpecification.md](docs/packagingSpecification.md)：包发布、版本号与目录规范。

## 🤝 贡献指南

1. Fork 仓库并创建特性分支（遵循 `docs/branchManagement.md` 建议）。
2. 使用 `pnpm cz` 帮助撰写符合 commitlint 规范的提交信息。
3. 提交 PR 前运行 `pnpm lint`, `pnpm test`, `pnpm build` 确认通过。
4. 在包内补充/更新 README 与测试用例，确保下次 AI 或开发者能迅速理解改动。

如有问题，可通过包内 issue 模板或在 PR 说明中补充上下文，维护者会协助 review。
