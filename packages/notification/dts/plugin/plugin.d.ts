import { MessageBuilder } from "../message/builder";
export declare abstract class NotificationPlugin<P = string> {
    abstract webhook: string;
    abstract getWebhook(): string;
    abstract setWebhook(webhook: string): this;
    /**
     * 平台
     * @public
     */
    abstract platform: P;
    abstract getPlatform(): P;
    abstract setPlatform(platform: P): this;
    abstract msgBuilder: MessageBuilder | null;
    abstract setMessageBulder(msgBuilder: MessageBuilder): this;
    abstract getMessageBulder(): MessageBuilder | null;
}
export declare class Base<P = String> extends NotificationPlugin<P> {
    webhook: string;
    platform: P;
    msgBuilder: MessageBuilder | null;
    getWebhook(): string;
    setWebhook(webhook: string): this;
    getPlatform(): P;
    setPlatform(platform: P): this;
    setMessageBulder(msgBuilder: MessageBuilder): this;
    getMessageBulder(): MessageBuilder | null;
}
//# sourceMappingURL=plugin.d.ts.map