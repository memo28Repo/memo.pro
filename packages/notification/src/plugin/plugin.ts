/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:05:09
 * @LastEditTime: 2025-08-10 19:12:31
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/notification/src/plugin/plugin.ts
 */

import { MessageBuilder } from "../message/builder";
import { platformWxCom } from "./wxCom";

export abstract class NotificationPlugin {
    abstract webhook: string;
    abstract getWebhook(): string
    abstract setWebhook(webhook: string): this

    /**
     * 平台
     * @public
     */
    abstract platform: string
    abstract getPlatform(): string
    abstract setPlatform(platform: string): this


    abstract msgBuilder: MessageBuilder | null;
    abstract setMessageBulder(msgBuilder: MessageBuilder): this
    abstract getMessageBulder(): MessageBuilder | null
}


export class Base extends NotificationPlugin {
    webhook: string = '';
    platform: string = '' ;

    msgBuilder: MessageBuilder | null = null


    getWebhook(): string {
        return this.webhook;
    }
    setWebhook(webhook: string): this {
        this.webhook = webhook
        return this;
    }
    getPlatform(): string {
        return this.platform;
    }

    setPlatform(platform: string): this {
        this.platform = platform
        return this;
    }

    setMessageBulder(msgBuilder: MessageBuilder): this {
        this.msgBuilder = msgBuilder
        return this;
    }

    getMessageBulder(): MessageBuilder | null {
        return this.msgBuilder
    }

}