import { MessageBuilderPayload } from './builderPayload';
/**
 * 消息构建器类
 * 继承自MessageBuilderPayload，提供消息构建的核心功能
 * 支持文本和Markdown格式的消息构建
 */
export declare class MessageBuilder extends MessageBuilderPayload {
    /**
     * 构造函数
     * 初始化消息构建器实例
     */
    constructor();
    /**
     * 创建一个新的消息构建器实例
     * @returns 新的MessageBuilder实例
     */
    static create(): MessageBuilder;
    /**
     * 构建消息内容
     * 优先返回Markdown格式，如果没有则返回文本格式
     * @returns 构建的消息内容，如果没有内容则返回空字符串
     */
    build(): string;
    /**
     * 获取消息类型
     * @returns 消息类型：'markdown' | 'text' | 'empty'
     */
    getMessageType(): 'markdown' | 'text' | 'empty';
    /**
     * 检查是否有消息内容
     * @returns 如果有文本或Markdown内容则返回true
     */
    hasContent(): boolean;
}
//# sourceMappingURL=builder.d.ts.map