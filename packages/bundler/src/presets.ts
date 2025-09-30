import type {Format, Options} from 'tsdown'

export type BundlerPreset = 'browser' | 'node' | 'universal'

interface PresetDetail {
    readonly name: string
    readonly defaults: Partial<Options>
}

const baseDefaults: Partial<Options> = {
    clean: true,
    dts: true,
    sourcemap: false,
    report: true,
    skipNodeModulesBundle: true,
    format: ['es', 'cjs'] as Format[],
    entry: './src/index.ts',
}

const presetMap: Record<BundlerPreset, PresetDetail> = {
    browser: {
        name: '浏览器库',
        defaults: {
            platform: 'browser',
            target: ['es2018', 'chrome80'],
            minify: true,
        },
    },
    node: {
        name: 'Node.js 库',
        defaults: {
            platform: 'node',
            target: ['node18'],
            minify: false,
        },
    },
    universal: {
        name: '通用库',
        defaults: {
            platform: 'neutral',
            target: ['es2018', 'node18'],
            minify: 'dce-only',
        },
    },
}

export function resolvePreset(preset?: BundlerPreset): PresetDetail {
    if (!preset) return presetMap.browser
    return presetMap[preset]
}

export function withBaseDefaults(options: Partial<Options>): Partial<Options> {
    return {
        ...baseDefaults,
        ...options,
        format: normalizeFormat(options.format ?? baseDefaults.format),
    }
}

function normalizeFormat(format?: Options['format']): Format[] | undefined {
    if (!format) return undefined
    if (Array.isArray(format)) return format as Format[]
    return [format as Format]
}
