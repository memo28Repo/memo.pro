# memo.pro

## 简介
memo.pro 是一个基于 pnpm Workspace 搭建的 monorepo，集中维护常用的工具库与服务集成能力，帮助在不同项目中复用通用能力并保持一致的工程化体验。仓库通过 Turbo 构建/测试流水线管理各个包，并要求 Node.js 14 及以上环境运行。 【F:package.json†L5-L25】【F:package.json†L35-L47】

## 功能包

### `@memo28.pro/basic`
原生对象增强工具集，为 `String`、`Array`、`Number` 等基础类型注入常用方法，提供接近 Java/ Kotlin 的便捷开发体验：

- 字符串扩展包含等值判断、模糊查询、大小写无关比较、空白判断、统计出现次数以及基于分隔符的子串获取等能力。 【F:packages/basic/src/string.ts†L1-L108】
- 数组扩展提供判空、去重、分片、压缩空位/空值，以及按照回调结果分组的工具方法。 【F:packages/basic/src/array.ts†L1-L84】
- 数值扩展基于 `decimal.js` 提供高精度比较、区间裁剪、范围判断、灵活的舍入模式及奇偶校验等函数。 【F:packages/basic/src/number.ts†L1-L170】
- 所有扩展方法均配套 Vitest 单元测试，覆盖典型与边界输入（如稀疏数组、重叠子串、NaN/Infinity 等），便于在实际项目中放心启用。 【F:packages/basic/__test__/array.test.ts†L1-L158】【F:packages/basic/__test__/number.test.ts†L1-L158】【F:packages/basic/__test__/string.test.ts†L1-L118】

常用脚本：`pnpm --filter @memo28.pro/basic test` 运行单元测试，`pnpm --filter @memo28.pro/basic build` 产出 CJS/ESM 双格式构建产物。 【F:packages/basic/package.json†L2-L17】

### `@memo28.pro/minio`
封装 MinIO 文件上传场景，抽象统一的 `IDiaryUploader` 接口与条目模型，帮助快速接入不同的存储实现：

- `DiaryEntry` 描述上传任务的标题、内容、桶配置、可选文件路径与元数据。 【F:packages/minio/src/core/diaryEntry.ts†L5-L18】
- `IDiaryUploader` 约束了初始化、自动建桶、上传、列举与获取详情等核心能力，便于替换不同实现。 【F:packages/minio/src/core/iDiaryUploader.ts†L1-L38】
- 默认的 `DiaryManager` 作为门面，在外部与具体上传器之间转发调用；`DirectUploader` 则直接使用 MinIO 客户端处理建桶、对象上传与异常返回。 【F:packages/minio/src/core/diaryManager.ts†L6-L28】【F:packages/minio/src/core/directUploader.ts†L1-L66】
- 包内脚本支持通过 `tsc` 与 `vite` 构建，同时依赖官方 `minio` SDK 与内部 `@memo28/utils` 错误封装。 【F:packages/minio/package.json†L6-L24】

### `@memo28.pro/notification`
企业级消息通知 SDK，面向企业微信、Webhook 等多渠道推送场景，提供 CJS/ESM 构建、自动文档生成与发布前校验脚本，方便在多平台项目中复用。 【F:packages/notification/package.json†L1-L65】

## 开发指南
1. 安装依赖：`pnpm install`（仓库已声明使用 pnpm 10.x 管理依赖）。 【F:package.json†L47-L47】
2. 本地开发：使用 `pnpm dev` 触发 Turbo 并行开发任务；如需针对包构建，可执行 `pnpm build:pkg`。 【F:package.json†L19-L20】【F:package.json†L13-L15】
3. 运行测试：在根目录执行 `pnpm test` 调用 Turbo 聚合各包测试，或按需使用 `pnpm --filter <package> test`。 【F:package.json†L19-L20】【F:packages/basic/package.json†L2-L17】
4. 其他常用命令：`pnpm lint` 统一代码规范，`pnpm format` 通过 Prettier 批量格式化 Markdown / TypeScript 文件。 【F:package.json†L21-L22】

## 贡献说明
- 首次提交前运行 `pnpm format` 与 `pnpm test`，确保格式与测试通过。
- 使用仓库提供的 commit 工具（`pnpm cz`）生成规范化提交信息。 【F:package.json†L23-L23】
- 如需发布 API 文档，可执行 `pnpm build:md` 生成 Markdown 文档并调用 API Extractor。 【F:package.json†L10-L11】【F:package.json†L24-L25】

欢迎根据业务需求在各包中扩展更多实用方法，并在对应测试目录补充覆盖，保持工具库的可靠性与一致性。
