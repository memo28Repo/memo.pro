/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:17:38
 * @LastEditTime: 2025-08-10 19:09:20
 * @Description: 消息构建器类，用于构建各种格式的通知消息
 * @FilePath: /memo28.pro.Repo/packages/notification/src/message/builder.ts
 */
import { MessageBuilderPayload } from './builderPayload';

/**
 * 消息构建器类
 * 继承自MessageBuilderPayload，提供消息构建的核心功能
 * 支持文本和Markdown格式的消息构建
 */
export class MessageBuilder extends MessageBuilderPayload {
    /**
     * 构造函数
     * 初始化消息构建器实例
     */
    constructor() {
        super();
    }

    /**
     * 创建一个新的消息构建器实例
     * @returns 新的MessageBuilder实例
     */
    static create(): MessageBuilder {
        return new MessageBuilder();
    }

    /**
     * 构建消息内容
     * 优先返回Markdown格式，如果没有则返回文本格式
     * @returns 构建的消息内容，如果没有内容则返回空字符串
     */
    build(): string {
        if (this.hasMarkdown()) {
            return this.getMarkdown();
        }
        if (this.hasText()) {
            return this.getText();
        }
        return '';
    }

    /**
     * 获取消息类型
     * @returns 消息类型：'markdown' | 'text' | 'empty'
     */
    getMessageType(): 'markdown' | 'text' | 'empty' {
        if (this.hasMarkdown()) {
            return 'markdown';
        }
        if (this.hasText()) {
            return 'text';
        }
        return 'empty';
    }

    /**
     * 检查是否有消息内容
     * @returns 如果有文本或Markdown内容则返回true
     */
    hasContent(): boolean {
        return this.hasText() || this.hasMarkdown();
    }

}
