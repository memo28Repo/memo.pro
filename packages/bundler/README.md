# @memo28.pro/bundler

面向 Memo28 仓库的 tsdown 打包工具封装，提供中文日志、友好的预设与简单易懂的 API。

## 使用方式

```bash
pnpm memo-bundler --config memo-bundler.config.ts
```

或在配置文件中使用：

```ts
import {defineMemoConfig} from '@memo28.pro/bundler'

export default defineMemoConfig({
    preset: 'browser',
})
```

### 常用 CLI 参数

- `--preset`：打包预设，支持 `browser`、`node`、`universal`
- `--entry`：覆盖入口文件，可多次传入
- `--format`：指定输出格式，多个值用逗号分隔
- `--watch`：开启监听模式
- `--summary=false`：关闭完成提示

配置文件支持使用 TypeScript，并自动继承友好的默认值。
