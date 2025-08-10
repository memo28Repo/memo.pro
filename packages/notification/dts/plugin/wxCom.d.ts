import { Base } from './plugin';
export declare const platformWxCom = "wxcom";
/**
 * 企业微信通知插件类
 * 继承自Base类，实现企业微信平台的消息发送功能
 * 支持文本和Markdown格式的消息发送
 */
export declare class Wxcom extends Base {
    /**
     * 平台标识
     */
    platform: string;
    /**
     * 构造函数
     * @param webhook - 企业微信机器人的webhook地址
     */
    constructor(webhook?: string);
    /**
     * 从MessageBuilder构建企业微信消息格式
     * @param messageBuilder - 消息构建器实例
     * @returns 企业微信消息对象数组
     */
    private buildWxComMessages;
    /**
     * 发送消息到企业微信
     * 从msgBuilder获取消息内容并发送
     * @returns Promise<boolean> 发送结果
     */
    send(): Promise<boolean>;
    /**
     * 发送单条消息
     * @param message - 企业微信消息对象
     * @returns Promise<boolean> 发送结果
     */
    private sendSingleMessage;
}
//# sourceMappingURL=wxCom.d.ts.map