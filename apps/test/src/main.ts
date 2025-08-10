/*
 * @Author: @memo28.repo
 * @Date: 2025-07-30 20:13:06
 * @LastEditTime: 2025-08-10 17:25:34
 * @Description: 
 * @FilePath: /memo28.pro.Repo/apps/test/src/main.ts
 */
import { arrayExtensions, numberExtensions, objectExtensions, stringExtensions } from '@memo28.pro/basic'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

arrayExtensions()
stringExtensions()
numberExtensions()
objectExtensions()


createApp(App).mount('#app')
