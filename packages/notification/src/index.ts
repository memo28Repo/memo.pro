/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 17:35:26
 * @LastEditTime: 2025-08-10 19:14:37
 * @Description: notification包的主入口文件，导出所有核心类和功能
 * @FilePath: /memo28.pro.Repo/packages/notification/src/index.ts
 */

// 导出核心类
export { Core } from './core/core';
export { MessageBuilder } from './message/builder';
export { MessageBuilderPayload } from './message/builderPayload';

// 导出插件基类和具体实现
export { NotificationPlugin, Base } from './plugin/plugin';
export { Wxcom, platformWxCom } from './plugin/wxCom';

// 导出类型定义
export type { Message } from './message/builderPayload';

