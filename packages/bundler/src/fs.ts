import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

export function findNearestPackageName(startDir: string): string | undefined {
    let current = startDir
    while (true) {
        const pkgPath = join(current, 'package.json')
        if (existsSync(pkgPath)) {
            try {
                const content = JSON.parse(readFileSync(pkgPath, 'utf-8'))
                if (typeof content.name === 'string' && content.name.length > 0) {
                    return content.name
                }
            } catch (error) {
                console.warn(`读取 ${pkgPath} 失败:`, error)
            }
        }
        const parent = dirname(current)
        if (parent === current) break
        current = parent
    }
    return undefined
}
