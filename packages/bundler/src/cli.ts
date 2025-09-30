#!/usr/bin/env node
import {existsSync} from 'node:fs'
import {resolve} from 'node:path'
import mri from 'mri'
import pc from 'picocolors'

import type {LogLevel} from 'tsdown'

import {
    bundle,
    loadConfigFromFile,
    type MemoBundlerConfigLoader,
    type MemoBundlerOptions,
    type ResolveOptions,
} from './index'

async function main() {
    const argv = mri(process.argv.slice(2), {
        alias: {
            c: 'config',
            p: 'preset',
            w: 'watch',
            h: 'help',
        },
        default: {
            config: 'memo-bundler.config.ts',
        },
    })

    if (argv.help) {
        printHelp()
        return
    }

    const cwd = process.cwd()
    const resolveOptions: ResolveOptions = {cwd}
    let loader: MemoBundlerConfigLoader | undefined
    const configOption = argv.config
    if (configOption !== false && configOption !== 'false' && typeof configOption !== 'undefined') {
        const configPath = typeof configOption === 'string' ? configOption : String(configOption)
        const absolute = resolve(cwd, configPath)
        if (existsSync(absolute)) {
            loader = await loadConfigFromFile(absolute)
        } else {
            console.warn(pc.yellow(`⚠️ 未找到配置文件 ${configPath}，将仅使用命令行参数。`))
        }
    }

    const overrides = createOptionsFromArgs(argv)
    const mergedLoader = mergeConfigLoader(loader, overrides)

    try {
        await bundle(mergedLoader, resolveOptions)
    } catch (error) {
        console.error(pc.red(`❌ 打包失败：${error instanceof Error ? error.message : String(error)}`))
        process.exitCode = 1
    }
}

function createOptionsFromArgs(argv: mri.Arguments): Partial<MemoBundlerOptions> {
    const preset = parsePreset(argv.preset ?? argv.p)
    const entry = toArray(argv.entry)
    const format = toArray(argv.format).map((value) => value.replace('esm', 'es'))
    const target = toArray(argv.target)

    const options: Partial<MemoBundlerOptions> = {
        preset,
        entry: entry.length > 0 ? entry : undefined,
        format: format.length > 0 ? (format as MemoBundlerOptions['format']) : undefined,
        platform: parseString(argv.platform),
        minify: parseMinify(argv.minify),
        sourcemap: parseOptionalBoolean(argv.sourcemap),
        outDir: parseString(argv.outDir),
        name: parseString(argv.name),
        logLevel: parseLogLevel(argv.logLevel),
        target: target.length > 0 ? target : undefined,
        watch: parseWatch(argv.watch),
        dts: parseOptionalBoolean(argv.dts),
        clean: parseOptionalBoolean(argv.clean),
        report: parseOptionalBoolean(argv.report),
        showSummary: parseOptionalBoolean(argv.summary),
    }

    return filterUndefined(options)
}

function mergeConfigLoader(
    loader: MemoBundlerConfigLoader | undefined,
    overrides: Partial<MemoBundlerOptions>,
): MemoBundlerConfigLoader | undefined {
    if (!loader) {
        const hasOverrides = Object.keys(overrides).length > 0
        return hasOverrides ? overrides : {}
    }

    if (Object.keys(overrides).length === 0) return loader

    if (typeof loader === 'function') {
        return async () => mergeConfig(await loader(), overrides)
    }

    return mergeConfig(loader, overrides)
}

function mergeConfig(
    config: MemoBundlerOptions | MemoBundlerOptions[],
    overrides: Partial<MemoBundlerOptions>,
): MemoBundlerOptions | MemoBundlerOptions[] {
    if (Array.isArray(config)) {
        return config.map((item) => mergeSingle(item, overrides))
    }
    return mergeSingle(config, overrides)
}

function mergeSingle(
    base: MemoBundlerOptions,
    overrides: Partial<MemoBundlerOptions>,
): MemoBundlerOptions {
    const merged: MemoBundlerOptions = {...base}
    for (const [key, value] of Object.entries(overrides) as [keyof MemoBundlerOptions, any][]) {
        if (value === undefined) continue
        ;(merged as any)[key] = value
    }
    return merged
}

function parseString(value: unknown): string | undefined {
    if (typeof value === 'string' && value.length > 0) return value
    return undefined
}

function parseLogLevel(value: unknown): LogLevel | undefined {
    if (typeof value !== 'string') return undefined
    const normalized = value.toLowerCase()
    if (normalized === 'info' || normalized === 'warn' || normalized === 'error' || normalized === 'silent') {
        return normalized
    }
    return undefined
}

function parseOptionalBoolean(value: unknown): boolean | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
    }
    return undefined
}

function parseMinify(value: unknown): MemoBundlerOptions['minify'] | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
        return value
    }
    return undefined
}

function parsePreset(value: unknown): MemoBundlerOptions['preset'] | undefined {
    if (typeof value !== 'string') return undefined
    const normalized = value.toLowerCase()
    if (normalized === 'browser' || normalized === 'node' || normalized === 'universal') {
        return normalized
    }
    return undefined
}

function parseWatch(value: unknown): MemoBundlerOptions['watch'] {
    if (value === undefined) return undefined
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') {
        if (value === 'false') return false
        if (value === 'true') return true
        return value
    }
    if (Array.isArray(value)) return value as string[]
    return undefined
}

function toArray(value: unknown): string[] {
    if (value === undefined) return []
    if (Array.isArray(value)) return value.flatMap((item) => item.toString().split(',').filter(Boolean))
    if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean)
    return [String(value)]
}

function filterUndefined<T extends Record<string, any>>(input: T): T {
    const entries = Object.entries(input).filter(([, value]) => value !== undefined)
    return Object.fromEntries(entries) as T
}

function printHelp() {
    console.log(`使用方式：
  pnpm memo-bundler [选项]

常用选项：
  -c, --config <文件>   指定配置文件，默认为 memo-bundler.config.ts
  -p, --preset <名称>   选择预设（browser | node | universal）
  --entry <文件>        指定入口文件，可多次使用
  --format <格式>       输出格式，多个值用逗号分隔
  --watch               监听模式
  --summary <布尔值>    是否打印摘要信息
  -h, --help            查看帮助
`)
}

main()
