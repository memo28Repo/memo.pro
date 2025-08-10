/*
 * @Author: @memo28.repo
 * @Date: 2025-08-10 18:55:21
 * @LastEditTime: 2025-08-10 19:08:37
 * @Description: 消息构建器载荷类，用于构建不同格式的消息内容
 * @FilePath: /memo28.pro.Repo/packages/notification/src/message/builderPayload.ts
 */

export interface Message {
    type: string,
    content: string

}

/**
 * 消息构建器载荷类
 * 用于构建和管理不同格式的消息内容，支持文本和Markdown格式
 */
export class MessageBuilderPayload {
    /**
     * 消息队列
     * @private
     */
    private messageList: Message[] = []

    /**
     * 设置文本消息内容
     * @param text - 文本消息内容
     * @returns 返回当前实例，支持链式调用
     */
    setText(text: string): this {
        this.messageList.push({
            type: "text",
            content: text
        })
        return this;
    }

    /**
     * 设置Markdown消息内容
     * @param markdown - Markdown格式的消息内容
     * @returns 返回当前实例，支持链式调用
     */
    setMarkdown(markdown: string): this {
        this.messageList.push({
            type: "markdown",
            content: markdown
        })
        return this;
    }

    /**
     * 获取所有消息
     * @returns 消息列表
     */
    getMessages(): Message[] {
        return [...this.messageList];
    }

    /**
     * 获取文本消息列表
     * @returns 文本消息列表
     */
    getTextMessages(): Message[] {
        return this.messageList.filter(msg => msg.type === 'text');
    }

    /**
     * 获取Markdown消息列表
     * @returns Markdown消息列表
     */
    getMarkdownMessages(): Message[] {
        return this.messageList.filter(msg => msg.type === 'markdown');
    }

    /**
     * 检查是否有文本消息
     * @returns 如果有文本消息则返回true
     */
    hasText(): boolean {
        return this.messageList.some(msg => msg.type === 'text');
    }

    /**
     * 检查是否有Markdown消息
     * @returns 如果有Markdown消息则返回true
     */
    hasMarkdown(): boolean {
        return this.messageList.some(msg => msg.type === 'markdown');
    }

    /**
     * 获取第一条文本消息内容
     * @returns 第一条文本消息内容，如果没有则返回空字符串
     */
    getText(): string {
        const textMsg = this.messageList.find(msg => msg.type === 'text');
        return textMsg ? textMsg.content : '';
    }

    /**
     * 获取第一条Markdown消息内容
     * @returns 第一条Markdown消息内容，如果没有则返回空字符串
     */
    getMarkdown(): string {
        const markdownMsg = this.messageList.find(msg => msg.type === 'markdown');
        return markdownMsg ? markdownMsg.content : '';
    }

    /**
     * 清空所有消息
     * @returns 返回当前实例，支持链式调用
     */
    clear(): this {
        this.messageList = [];
        return this;
    }

    /**
     * 获取消息数量
     * @returns 消息数量
     */
    getMessageCount(): number {
        return this.messageList.length;
    }

}