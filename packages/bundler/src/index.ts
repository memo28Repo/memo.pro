import {build, defineConfig, type LogLevel, type Options, type UserConfig} from 'tsdown'
import {performance} from 'node:perf_hooks'
import {resolve, join, dirname} from 'node:path'
import {pathToFileURL} from 'node:url'
import {mkdir, rm, writeFile} from 'node:fs/promises'

import {findNearestPackageName} from './fs'
import {createFriendlyLogger, formatDuration, normalizeLogLevel} from './logger'
import {resolvePreset, withBaseDefaults, type BundlerPreset} from './presets'

export interface MemoBundlerOptions extends Options {
    /**
     * 预设名称，决定默认平台、目标和压缩策略。
     */
    preset?: BundlerPreset
    /**
     * 是否输出打包摘要信息。
     * @default true
     */
    showSummary?: boolean
}

export type MemoBundlerConfig = MemoBundlerOptions | MemoBundlerOptions[]
export type MemoBundlerConfigLoader = MemoBundlerConfig | (() => MemoBundlerConfig | Promise<MemoBundlerConfig>)

export interface MemoResolvedConfig {
    options: Options
    meta: {
        showSummary: boolean
        presetLabel: string
    }
}

export interface ResolveOptions {
    cwd?: string
}

export function defineMemoConfig(config: MemoBundlerConfigLoader): MemoBundlerConfigLoader {
    return config
}

export async function resolveMemoConfigs(
    config: MemoBundlerConfigLoader,
    resolveOptions: ResolveOptions = {},
): Promise<MemoResolvedConfig[]> {
    const raw = typeof config === 'function' ? await config() : config
    const configs = Array.isArray(raw) ? raw : [raw]
    return configs.map((item) => normalizeOptions(item, resolveOptions))
}

export async function bundle(
    config: MemoBundlerConfigLoader,
    resolveOptions: ResolveOptions = {},
): Promise<void> {
    const configs = await resolveMemoConfigs(config, resolveOptions)

    for (const {options: current, meta} of configs) {
        const logger =
            current.customLogger ?? createFriendlyLogger(current.name, normalizeLogLevel(current.logLevel as LogLevel))
        current.customLogger = logger
        const startedAt = performance.now()
        const presetLabel = meta.presetLabel
        const formatLabel = Array.isArray(current.format) ? current.format.join(', ') : current.format ?? '默认'
        logger.info(`🚀 开始${presetLabel}流程，格式：${formatLabel}`)

        try {
            await build(defineConfig(current as UserConfig))
            const duration = performance.now() - startedAt
            if (meta.showSummary) {
                logger.success(`用时 ${formatDuration(duration)} 完成构建。`)
            }
        } catch (error) {
            logger.error(error instanceof Error ? error.message : String(error))
            throw error
        }
    }
}

function normalizeOptions(options: MemoBundlerOptions, resolveOptions: ResolveOptions): MemoResolvedConfig {
    const {preset, showSummary, ...rest} = options
    const presetDetail = resolvePreset(preset)
    const cwd = rest.cwd ?? resolveOptions.cwd ?? process.cwd()
    const packageName = rest.name ?? findNearestPackageName(cwd)
    const logLevel = normalizeLogLevel(rest.logLevel as LogLevel | undefined)

    const merged = {
        ...withBaseDefaults(presetDetail.defaults),
        ...rest,
    } satisfies Options

    if (!merged.name && packageName) merged.name = packageName
    if (!merged.entry) merged.entry = './src/index.ts'
    merged.logLevel = logLevel

    if (!merged.customLogger) {
        merged.customLogger = createFriendlyLogger(merged.name, merged.logLevel as LogLevel)
    }

    return {
        options: merged,
        meta: {
            showSummary: showSummary ?? true,
            presetLabel: presetDetail.name,
        },
    }
}

function describePlatform(platform: Options['platform']): string {
    switch (platform) {
        case 'browser':
            return '浏览器构建'
        case 'node':
            return 'Node.js 构建'
        case 'neutral':
            return '通用构建'
        default:
            return '打包'
    }
}

export async function loadConfigFromFile(path: string): Promise<MemoBundlerConfigLoader> {
    const absolute = resolve(process.cwd(), path)
    const ext = absolute.split('.').pop()?.toLowerCase()
    if (!ext) {
        throw new Error(`无法识别的配置文件：${path}`)
    }

    if (['ts', 'mts', 'cts', 'tsx'].includes(ext)) {
        const {build: esbuild} = await import('esbuild')
        const result = await esbuild({
            entryPoints: [absolute],
            bundle: true,
            platform: 'node',
            target: 'node18',
            format: 'esm',
            write: false,
            logLevel: 'silent',
            packages: 'external',
        })

        if (!result.outputFiles || result.outputFiles.length === 0) {
            throw new Error(`无法编译配置文件：${path}`)
        }

        const code = result.outputFiles[0].text
        const configDir = dirname(absolute)
        const cacheDir = join(configDir, '.memo-bundler')
        await mkdir(cacheDir, {recursive: true})
        const tempFile = join(cacheDir, `config-${Date.now()}-${Math.random().toString(16).slice(2)}.mjs`)
        await writeFile(tempFile, code, 'utf-8')
        const loaded = await import(pathToFileURL(tempFile).href)
        await rm(tempFile, {force: true})
        return (loaded.default ?? loaded.config ?? loaded) as MemoBundlerConfigLoader
    }

    const loaded = await import(pathToFileURL(absolute).href)
    return (loaded.default ?? loaded.config ?? loaded) as MemoBundlerConfigLoader
}

export function formatTargetSummary(options: Options): string {
    const formatLabel = Array.isArray(options.format) ? options.format.join(', ') : options.format
    const platform = describePlatform(options.platform)
    const entry = Array.isArray(options.entry) ? options.entry.join(', ') : options.entry
    return `${platform} | 格式: ${formatLabel ?? '默认'} | 入口: ${entry ?? 'src/index.ts'}`
}
