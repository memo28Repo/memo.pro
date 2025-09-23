# @memo28.pro/minio

> 面向 MinIO/S3 兼容对象存储的轻量上传 SDK，聚焦“日记”（Diary）式内容的直传流程与自动建桶体验。

该包抽象出一套 "上传器 (Uploader)" 协议，既可以直接复用内置的 `DirectUploader` 直连 MinIO，也可通过实现 `IDiaryUploader` 接口适配其他后端（HTTP API、云函数等）。`DiaryManager` 负责编排初始化、自动建桶与上传动作，确保调用方只需关注业务入参。

## ✨ 能力概览

- **自动建桶**：`automaticBucketBuilding` 会在上传前检测桶是否存在，不存在则自动创建。
- **多策略上传**：通过 `IDiaryUploader` 接口可无缝切换直传、API 代理等不同策略。
- **元数据支持**：`DiaryEntry` 支持附带 `ObjectMetaData`，方便记录自定义标签或 Content-Type。
- **错误语义化**：统一返回 `[ErrorsNewResult | null, Payload]`，兼容 `@memo28/utils` 的错误处理方式。

## 🧱 模块与职责

| 组件 | 说明 |
| --- | --- |
| `DiaryEntry` | 描述一条上传任务，包括标题、内容、桶配置、可选文件/文件路径与对象元数据。|
| `IDiaryUploader` | 上传器接口约束。定义 `init`、`automaticBucketBuilding`、`upload`、`list`、`get` 等能力。|
| `DirectUploader` | MinIO 官方 SDK 的薄封装，负责直传、自动建桶、文件/字符串上传。|
| `DiaryManager` | 对上传器的统一门面，提供依赖注入、初始化、上传等统一入口。|
| `ApiUploader` |（预留）HTTP API 代理实现，当前以注释形式展示实现思路，可按需补充。|

## 📁 目录结构

```
packages/minio
├── src
│   ├── core
│   │   ├── diaryEntry.ts       # 上传载荷定义
│   │   ├── iDiaryUploader.ts   # 上传器协议
│   │   ├── directUploader.ts   # MinIO 直传实现
│   │   ├── diaryManager.ts     # 管理器/门面
│   │   └── apiUploader.ts      # API 模式示例（待扩展）
│   └── index.ts                # 导出入口
├── __test__
│   └── diaryManager.test.ts    # Vitest 场景用例
└── tsconfig.json
```

## 🚀 快速上手

```ts
import { DiaryManager, DirectUploader, DiaryEntry } from '@memo28.pro/minio';

// 1. 初始化上传器
const uploader = new DirectUploader();
const manager = new DiaryManager(uploader);

manager.init({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'admin123',
});

// 2. 构建上传任务
const entry = new DiaryEntry(
  'report-2024-01-01.md',
  '# 周报内容',
  { bucketName: 'weekly-report', region: 'us-east-1' },
);

// 3. 自动建桶并上传
await manager.automaticBucketBuilding(entry.bucketOptions.bucketName);
const [err, result] = await manager.upload(entry);

if (err) {
  console.error('上传失败:', err.unWrap());
} else {
  console.log('上传成功:', result); // Partial<UploadedObjectInfo>
}
```

### 上传文件流

当需要上传本地文件时，可传入 `File`/`Blob` 对象及可选 `filePath`:

```ts
const file = new File([buffer], 'avatar.png');
const entry = new DiaryEntry(
  'avatar.png',
  '',
  { bucketName: 'user-asset' },
  file,
  undefined,
  { 'Content-Type': 'image/png' }
);
await manager.upload(entry);
```

## 🧪 开发与测试

```bash
pnpm install

# 类型编译 (tsc) + Vite 构建打包
pnpm --filter @memo28.pro/minio build

# 运行单元测试
pnpm --filter @memo28.pro/minio test
pnpm --filter @memo28.pro/minio test:watch
```

测试基于本地假定的 MinIO 配置（`127.0.0.1:9000`），请在需要时调整 `DiaryManager` 初始化参数，或在测试前启动本地 MinIO/Mock 服务。

## 🧩 自定义上传策略

实现 `IDiaryUploader` 便能扩展到任意后端：

```ts
import { IDiaryUploader, DiaryEntry } from '@memo28.pro/minio';
import { Errors } from '@memo28/utils';

class CloudFunctionUploader implements IDiaryUploader {
  constructor(private endpoint: string) {}

  async upload(entry: DiaryEntry) {
    const res = await fetch(`${this.endpoint}/upload`, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
    return res.ok
      ? [null, await res.json()]
      : [Errors.New(await res.text()), {}];
  }

  async list() { /* ... */ }
  async get(id: string) { /* ... */ }
}
```

将自定义上传器注入 `DiaryManager` 后即可使用，与内置实现共用调用链。

## ⚠️ 注意事项

- `automaticBucketBuilding` 使用 `bucketExists`/`makeBucket`，请确保调用方具备创建桶的权限。
- 在 Node 环境中使用 `File` 需借助 `undici`、`node-fetch` 等提供的 `File` polyfill。
- 返回值第二项为 `Partial<UploadedObjectInfo>`，如需完整响应可按需扩展 `DirectUploader`。

## 📄 许可证

本包遵循 ISC 许可证发布，欢迎按照业务需求扩展上传策略并提交 PR。
