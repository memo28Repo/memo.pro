mkdir etc

mkdir src

touch src/index.ts

# 初始化 package.json
pnpm init

# 初始化 tsconfig.json 文件
tsc --init


# 修改打包入口文
npm pkg set main='./lib/index.js'
npm pkg set module='./dist/index.js'
npm pkg set types='./lib/index.d.ts'

# 添加打包命令
npm pkg set scripts.build="tsc --project tsconfig.json && vite build"
npm pkg set scripts.build:watch="tsc --project tsconfig.json && vite build --watch"

# 打包 并 根据 API 生成文档
npm pkg set scripts.build:md="pnpm build && api-extractor run --local --verbose && sh mv.sh"

# 启动 vitest 只执行一次
npm pkg set scripts.test="vitest run"

# 启动 vitest watch 模式
npm pkg set scripts.test:watch="vitest"

# 启动 vitest 以 ui 模式运行
npm pkg set scripts.test:ui="vitest --ui"

# 将 包 link 到 pnpm store
npm pkg set scripts.links="pnpm link --global"

# 更新现在依赖
npm pkg set scripts.updateDep=""
