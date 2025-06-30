import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import { resolve } from 'path';
import { PluginOption, UserConfig } from 'vite';

export interface MultiFormatDtsPluginOptions {
  /** 入口文件路径 (默认: 'src/index.ts') */
  entry?: string;
  /** 外部依赖模块 (默认: ['decimal.js', ...]) */
  external?: string[];
  /** 是否禁用 dts 类型生成 (默认: false) */
  disableDts?: boolean;
  /** tsconfig.json 路径 (默认: 'tsconfig.json') */
  tsconfigPath?: string;
  /** 输出目录结构配置 */
  dirs?: {
    /** ESM 输出目录 (默认: 'dist') */
    esm?: string;
    /** CJS 输出目录 (默认: 'lib') */
    cjs?: string;
    /** 类型声明输出目录 (默认: 'dts') */
    types?: string;
  };
  /** 传递给 @rollup/plugin-typescript 的额外选项 */
  typescriptOptions?: Record<string, any>;
  /** 传递给 vite-plugin-dts 的额外选项 */
  dtsOptions?: Record<string, any>;
}

function multiFormatDtsPlugin(
  options: MultiFormatDtsPluginOptions = {}
): PluginOption {
  const {
    entry = 'src/index.ts',
    external = [],
    disableDts = false,
    tsconfigPath = 'tsconfig.json',
    dirs = {},
    typescriptOptions = {},
    dtsOptions = {}
  } = options;

  const {
    esm = 'dist',
    cjs = 'lib',
    types = 'dts'
  } = dirs;

  const resolvedEntry = resolve(process.cwd(), entry);
  const resolvedTsconfig = resolve(process.cwd(), tsconfigPath);

  const resolveDts = resolve(process.cwd(), types);
  return {
    name: '@memo28.pro/vite-plugin-multi-format-dts',
    config(): UserConfig {
      const config: UserConfig = {
        build: {
          outDir: 'multi',
          lib: {
            entry: resolvedEntry,
            formats: ['es', 'cjs']
          },
          rollupOptions: {
            external,
            output: [
              {
                format: 'es',
                dir: esm,
                entryFileNames: '[name].js',
                preserveModules: true,
                preserveModulesRoot: 'src',
                generatedCode: { constBindings: true }
              },
              {
                format: 'cjs',
                dir: cjs,
                entryFileNames: '[name].js',
                preserveModulesRoot: 'src',
                preserveModules: true,
                exports: 'named',
                generatedCode: { constBindings: true }
              }
            ]
          }
        },
        plugins: [
          typescript({
            ...typescriptOptions,
            tsconfig: resolvedTsconfig,
            compilerOptions: {
              module: 'esnext',
              declaration: false,
              emitDeclarationOnly: false,
              experimentalDecorators: true,
              emitDecoratorMetadata: true,
              target: "es2015",
              ...typescriptOptions?.compilerOptions
            },
            include: ['src/**/*.ts'],
            exclud: ['**/vite.config.*', '**/__tests__/**', '**/*.spec.ts', '**/*.test.ts']
          })
        ]
      };

      return config;
    },
    // 关键修复 5：构建后验证
    closeBundle() {
      const dtsPath = resolve(process.cwd(), types);
      if (fs.existsSync(dtsPath)) {
        console.log(`✅ 验证成功: DTS 目录包含 ${fs.readdirSync(dtsPath).length} 个文件`);
      } else {
        console.error(`❌ 严重错误: DTS 目录未生成`);
        // 尝试手动生成作为后备
      }
    }
  };
}

export {
  multiFormatDtsPlugin
};
