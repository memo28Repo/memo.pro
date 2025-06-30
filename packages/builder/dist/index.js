import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import { resolve } from 'path';
function multiFormatDtsPlugin(options = {}) {
    const { entry = 'src/index.ts', external = [], disableDts = false, tsconfigPath = 'tsconfig.json', dirs = {}, typescriptOptions = {}, dtsOptions = {} } = options;
    const { esm = 'dist', cjs = 'lib', types = 'dts' } = dirs;
    const resolvedEntry = resolve(process.cwd(), entry);
    const resolvedTsconfig = resolve(process.cwd(), tsconfigPath);
    const resolveDts = resolve(process.cwd(), types);
    return {
        name: '@memo28.pro/vite-plugin-multi-format-dts',
        config() {
            const config = {
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
                    typescript(Object.assign(Object.assign({}, typescriptOptions), { tsconfig: resolvedTsconfig, compilerOptions: Object.assign({ module: 'esnext', declaration: false, emitDeclarationOnly: false, experimentalDecorators: true, emitDecoratorMetadata: true, target: "es2015" }, typescriptOptions === null || typescriptOptions === void 0 ? void 0 : typescriptOptions.compilerOptions), include: ['src/**/*.ts'], exclud: ['**/vite.config.*', '**/__tests__/**', '**/*.spec.ts', '**/*.test.ts'] }))
                ]
            };
            return config;
        },
        // 关键修复 5：构建后验证
        closeBundle() {
            const dtsPath = resolve(process.cwd(), types);
            if (fs.existsSync(dtsPath)) {
                console.log(`✅ 验证成功: DTS 目录包含 ${fs.readdirSync(dtsPath).length} 个文件`);
            }
            else {
                console.error(`❌ 严重错误: DTS 目录未生成`);
                // 尝试手动生成作为后备
            }
        }
    };
}
export { multiFormatDtsPlugin };
