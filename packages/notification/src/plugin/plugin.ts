/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:05:09
 * @LastEditTime: 2025-07-28 18:27:36
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/notification/src/plugin/plugin.ts
 */

import { MessageBuilder } from "../message/builder";

export abstract class NotificationPlugin<P = string> {
    abstract webhook: string;
    abstract getWebhook(): string
    abstract setWebhook(webhook: string): this

    /**
     * 平台
     * @public
     */
    abstract platform: P
    abstract getPlatform(): P
    abstract setPlatform(platform: P): this


    abstract msgBuilder: MessageBuilder | null;
    abstract setMessageBulder(msgBuilder: MessageBuilder): this
    abstract getMessageBulder(): MessageBuilder | null
}


export class Base<P = string> extends NotificationPlugin<P> {
    webhook: string = '';
    platform: P;

    msgBuilder: MessageBuilder | null = null


    getWebhook(): string {
        return this.webhook;
    }
    setWebhook(webhook: string): this {
        this.webhook = webhook
        return this;
    }
    getPlatform(): P {
        return this.platform;
    }

    setPlatform(platform: P): this {
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