/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:02:22
 * @LastEditTime: 2025-08-10 19:13:36
 * @Description: 通知系统核心类，负责管理插件和消息分发
 * @FilePath: /memo28.pro.Repo/packages/notification/src/core/core.ts
 */

import { MessageBuilder } from "../message/builder";
import { NotificationPlugin } from "../plugin/plugin";

/**
 * 通知系统核心类
 * 负责管理通知插件和消息分发
 */
export class Core {
    /**
     * 注册的插件列表
     * @private
     */
    moduleList: NotificationPlugin[] = []

    /**
     * 注册通知插件
     * @param modules - 单个插件或插件数组
     * @returns 返回当前实例，支持链式调用
     */
    registerModule(modules: NotificationPlugin | NotificationPlugin[]): this {
        if (Array.isArray(modules)) {
            this.moduleList.push(...modules);
        } else {
            this.moduleList.push(modules);
        }
        return this;
    }

    /**
     * 获取已注册的插件列表
     * @returns 插件列表
     */
    getModuleList(): NotificationPlugin[] {
        return this.moduleList
    }

    /**
     * 检查插件配置是否完整
     * @param module - 要检查的插件
     * @returns [是否通过检查, 错误信息]
     * @private
     */
    private checkModule(module: NotificationPlugin): [boolean, string] {
        const builder = module.getMessageBulder()
        if (!builder) return [false, '缺少消息构建器']
        const pl = module.getPlatform()
        if (!pl) return [false, '缺少平台标识']
        const wh = module.getWebhook()
        if (!wh) return [false, '缺少Webhook地址']
        return [true, '']
    }

    /**
     * 为所有注册的插件设置消息构建器
     * @param messageBuilder - 消息构建器实例
     * @returns 返回当前实例，支持链式调用
     */
    seed(messageBuilder: MessageBuilder): this {
        this.moduleList.forEach((module) => {
            module.setMessageBulder(messageBuilder)
            const [isValid, errMsg] = this.checkModule(module)
            if (!isValid) {
                console.warn(`模块 ${module.getPlatform()} 配置检查失败: ${errMsg}`);
            } else {
                console.log(`模块 ${module.getPlatform()} 已就绪`);
            }
        });
        return this;
    }

    /**
     * 发送消息到所有注册的插件
     * @returns Promise<boolean[]> 每个插件的发送结果
     */
    async sendAll(): Promise<boolean[]> {
        const results: boolean[] = [];
        
        for (const module of this.moduleList) {
            try {
                // 检查插件是否有send方法
                if (typeof (module as any).send === 'function') {
                    const result = await (module as any).send();
                    results.push(result);
                } else {
                    console.warn(`模块 ${module.getPlatform()} 没有send方法`);
                    results.push(false);
                }
            } catch (error) {
                console.error(`模块 ${module.getPlatform()} 发送失败:`, error);
                results.push(false);
            }
        }
        
        return results;
    }

    /**
     * 清空所有注册的插件
     * @returns 返回当前实例，支持链式调用
     */
    clearModules(): this {
        this.moduleList = [];
        return this;
    }

    /**
     * 获取注册的插件数量
     * @returns 插件数量
     */
    getModuleCount(): number {
        return this.moduleList.length;
    }
}
