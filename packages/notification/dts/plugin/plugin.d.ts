import { MessageBuilder } from "../message/builder";
export declare abstract class NotificationPlugin {
    abstract webhook: string;
    abstract getWebhook(): string;
    abstract setWebhook(webhook: string): this;
    /**
     * 平台
     * @public
     */
    abstract platform: string;
    abstract getPlatform(): string;
    abstract setPlatform(platform: string): this;
    abstract msgBuilder: MessageBuilder | null;
    abstract setMessageBulder(msgBuilder: MessageBuilder): this;
    abstract getMessageBulder(): MessageBuilder | null;
}
export declare class Base extends NotificationPlugin {
    webhook: string;
    platform: string;
    msgBuilder: MessageBuilder | null;
    getWebhook(): string;
    setWebhook(webhook: string): this;
    getPlatform(): string;
    setPlatform(platform: string): this;
    setMessageBulder(msgBuilder: MessageBuilder): this;
    getMessageBulder(): MessageBuilder | null;
}
//# sourceMappingURL=plugin.d.ts.map