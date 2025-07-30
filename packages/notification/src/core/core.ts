/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:02:22
 * @LastEditTime: 2025-07-28 18:37:21
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/notification/src/core/core.ts
 */

import {MessageBuilder} from "../message/builder";
import {NotificationPlugin} from "../plugin/plugin";

export class Core {


    moduleList: NotificationPlugin[] = []

    registerModule(module: NotificationPlugin) {
        this.moduleList.push(module)
    }


    getModuleList(): NotificationPlugin[] {
        return this.moduleList
    }


    private checkModule(mode: NotificationPlugin) {
        const builder = mode.getMessageBulder()
        if (!builder) return [false, '缺少消息构建器']
        const pl = mode.getPlatform()
        if (!pl) return [false, '缺少平台标识']
        const wh = mode.getWebhook()
        if (!wh) return [false, '缺少Webhook地址']
        return [true, '']
    }


    seed(messageBuilder: MessageBuilder) {
        this.moduleList.forEach((module) => {
            module.setMessageBulder(messageBuilder)
            const [err, errMsg] = this.checkModule(module)
            if (!err) console.log(errMsg)
            console.log(`模块 ${module.getPlatform()} 已注册`);
        });
        return this;
    }

}
