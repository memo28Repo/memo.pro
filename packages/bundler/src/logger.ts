import type {Logger, LogLevel} from 'tsdown'
import pc from 'picocolors'

const LEVEL_WEIGHT: Record<LogLevel, number> = {
    silent: 0,
    error: 1,
    warn: 2,
    info: 3,
}

const levelKeys = Object.keys(LEVEL_WEIGHT) as LogLevel[]

export function normalizeLogLevel(level?: LogLevel): LogLevel {
    if (!level) return 'info'
    if (levelKeys.includes(level)) return level
    return 'info'
}

export function createFriendlyLogger(name?: string, level: LogLevel = 'info'): Logger {
    const warned = new Set<string>()
    let currentLevel = level
    const prefix = name ? pc.cyan(`[${name}]`) + ' ' : ''

    const output = (type: 'info' | 'warn' | 'error', text: string) => {
        if (LEVEL_WEIGHT[currentLevel] < LEVEL_WEIGHT[type]) return
        if (type === 'info') {
            console.log(text)
        } else if (type === 'warn') {
            console.warn(text)
        } else {
            console.error(text)
        }
    }

    return {
        get level() {
            return currentLevel
        },
        set level(val: LogLevel) {
            currentLevel = normalizeLogLevel(val)
        },
        info(...msgs: any[]) {
            const message = localizeMessage(formatMessage(msgs))
            output('info', `${pc.blue('ℹ️ 信息')} ${prefix}${message}`)
        },
        warn(...msgs: any[]) {
            const message = localizeMessage(formatMessage(msgs))
            warned.add(message)
            output('warn', `${pc.yellow('⚠️ 警告')} ${prefix}${message}`)
        },
        warnOnce(...msgs: any[]) {
            const message = localizeMessage(formatMessage(msgs))
            if (warned.has(message)) return
            warned.add(message)
            output('warn', `${pc.yellow('⚠️ 警告')} ${prefix}${message}`)
        },
        error(...msgs: any[]) {
            const message = localizeMessage(formatMessage(msgs))
            output('error', `${pc.red('❌ 错误')} ${prefix}${message}`)
        },
        success(...msgs: any[]) {
            const message = localizeMessage(formatMessage(msgs))
            output('info', `${pc.green('🎉 成功')} ${prefix}${message}`)
        },
    }
}

export function formatMessage(parts: any[]): string {
    return parts
        .flat()
        .filter((part) => part !== undefined && part !== null && part !== '')
        .map((part) => (typeof part === 'string' ? part : JSON.stringify(part)))
        .join(' ')
}

function localizeMessage(message: string): string {
    return message
        .replace(/\bentry:/, '入口:')
        .replace(/\btargets:/, '目标:')
        .replace(/\btsconfig:/, '使用的 tsconfig:')
        .replace(/\bBuild start\b/, '开始编译')
        .replace(/\bBuild complete in\b/, '编译完成，用时')
}

export function formatDuration(ms: number): string {
    if (ms < 1000) return `${ms.toFixed(0)}ms`
    const seconds = ms / 1000
    if (seconds < 60) return `${seconds.toFixed(2)}s`
    const minutes = Math.floor(seconds / 60)
    const remain = seconds % 60
    return `${minutes}分${remain.toFixed(2)}秒`
}
