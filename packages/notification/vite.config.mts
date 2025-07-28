/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 17:24:00
 * @LastEditTime: 2025-07-28 17:36:20
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/notification/vite.config.mts
 */
/*
 * @Author: @memo28.repo
 * @Date: 2025-06-30 16:40:04
 * @LastEditTime: 2025-07-28 17:22:19
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/basic/vite.config.mts
 */

import { multiFormatDtsPlugin } from '@memo28.pro/builder'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        multiFormatDtsPlugin()
    ]
})