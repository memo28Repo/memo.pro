import {defineConfig} from 'tsdown'

export default defineConfig({
    entry: ['./src/index.ts', './src/cli.ts'],
    format: ['cjs', 'es'],
    platform: 'node',
    dts: true,
    clean: true,
    sourcemap: false,
    skipNodeModulesBundle: true,
    tsconfig: './tsconfig.json',
})
