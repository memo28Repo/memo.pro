import { PluginOption } from 'vite';
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
declare function multiFormatDtsPlugin(options?: MultiFormatDtsPluginOptions): PluginOption;
export { multiFormatDtsPlugin };
//# sourceMappingURL=index.d.ts.map