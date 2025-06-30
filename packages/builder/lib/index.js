"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiFormatDtsPlugin = multiFormatDtsPlugin;
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
function multiFormatDtsPlugin(options = {}) {
    const { entry = 'src/index.ts', external = [], disableDts = false, tsconfigPath = 'tsconfig.json', dirs = {}, typescriptOptions = {}, dtsOptions = {} } = options;
    const { esm = 'dist', cjs = 'lib', types = 'dts' } = dirs;
    const resolvedEntry = (0, path_1.resolve)(process.cwd(), entry);
    const resolvedTsconfig = (0, path_1.resolve)(process.cwd(), tsconfigPath);
    const resolveDts = (0, path_1.resolve)(process.cwd(), types);
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
                    (0, plugin_typescript_1.default)(Object.assign(Object.assign({}, typescriptOptions), { tsconfig: resolvedTsconfig, compilerOptions: Object.assign({ module: 'esnext', declaration: false, emitDeclarationOnly: false, experimentalDecorators: true, emitDecoratorMetadata: true, target: "es2015" }, typescriptOptions === null || typescriptOptions === void 0 ? void 0 : typescriptOptions.compilerOptions), include: ['src/**/*.ts'], exclud: ['**/vite.config.*', '**/__tests__/**', '**/*.spec.ts', '**/*.test.ts'] }))
                ]
            };
            return config;
        },
        // 关键修复 5：构建后验证
        closeBundle() {
            const dtsPath = (0, path_1.resolve)(process.cwd(), types);
            if (fs_1.default.existsSync(dtsPath)) {
                console.log(`✅ 验证成功: DTS 目录包含 ${fs_1.default.readdirSync(dtsPath).length} 个文件`);
            }
            else {
                console.error(`❌ 严重错误: DTS 目录未生成`);
                // 尝试手动生成作为后备
            }
        }
    };
}
