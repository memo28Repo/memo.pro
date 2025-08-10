export interface Message {
    type: string;
    content: string;
}
/**
 * 消息构建器载荷类
 * 用于构建和管理不同格式的消息内容，支持文本和Markdown格式
 */
export declare class MessageBuilderPayload {
    /**
     * 消息队列
     * @private
     */
    private messageList;
    /**
     * 设置文本消息内容
     * @param text - 文本消息内容
     * @returns 返回当前实例，支持链式调用
     */
    setText(text: string): this;
    /**
     * 设置Markdown消息内容
     * @param markdown - Markdown格式的消息内容
     * @returns 返回当前实例，支持链式调用
     */
    setMarkdown(markdown: string): this;
    /**
     * 获取所有消息
     * @returns 消息列表
     */
    getMessages(): Message[];
    /**
     * 获取文本消息列表
     * @returns 文本消息列表
     */
    getTextMessages(): Message[];
    /**
     * 获取Markdown消息列表
     * @returns Markdown消息列表
     */
    getMarkdownMessages(): Message[];
    /**
     * 检查是否有文本消息
     * @returns 如果有文本消息则返回true
     */
    hasText(): boolean;
    /**
     * 检查是否有Markdown消息
     * @returns 如果有Markdown消息则返回true
     */
    hasMarkdown(): boolean;
    /**
     * 获取第一条文本消息内容
     * @returns 第一条文本消息内容，如果没有则返回空字符串
     */
    getText(): string;
    /**
     * 获取第一条Markdown消息内容
     * @returns 第一条Markdown消息内容，如果没有则返回空字符串
     */
    getMarkdown(): string;
    /**
     * 清空所有消息
     * @returns 返回当前实例，支持链式调用
     */
    clear(): this;
    /**
     * 获取消息数量
     * @returns 消息数量
     */
    getMessageCount(): number;
}
//# sourceMappingURL=builderPayload.d.ts.map