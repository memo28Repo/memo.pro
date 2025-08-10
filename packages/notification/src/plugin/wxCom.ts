/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:09:51
 * @LastEditTime: 2025-08-10 19:33:41
 * @Description: 企业微信消息发送插件，支持text和markdown格式消息发送
 * @FilePath: /memo28.pro.Repo/packages/notification/src/plugin/wxCom.ts
 */

import { MessageBuilder } from '../message/builder';
import { Base } from './plugin';

export const platformWxCom = 'wxcom';

/**
 * 企业微信消息发送接口
 */
interface WxComTextMessage {
    msgtype: 'text';
    text: {
        content: string;
    };
}

/**
 * 企业微信Markdown消息发送接口
 */
interface WxComMarkdownMessage {
    msgtype: 'markdown';
    markdown: {
        content: string;
    };
}

type WxComMessage = WxComTextMessage | WxComMarkdownMessage;

/**
 * 企业微信通知插件类
 * 继承自Base类，实现企业微信平台的消息发送功能
 * 支持文本和Markdown格式的消息发送
 */
export class Wxcom extends Base {
    /**
     * 平台标识
     */
    platform: string = platformWxCom;

    /**
     * 构造函数
     * @param webhook - 企业微信机器人的webhook地址
     */
    constructor(webhook?: string) {
        super();
        if (webhook) {
            this.setWebhook(webhook);
        }
    }

    

    /**
     * 从MessageBuilder构建企业微信消息格式
     * @param messageBuilder - 消息构建器实例
     * @returns 企业微信消息对象数组
     */
    private buildWxComMessages(messageBuilder: MessageBuilder): WxComMessage[] {
        const messages: WxComMessage[] = [];
        const allMessages = messageBuilder.getMessages();
        
        for (const message of allMessages) {
            if (message.type === 'text') {
                messages.push({
                    msgtype: 'text',
                    text: {
                        content: message.content
                    }
                });
            } else if (message.type === 'markdown') {
                messages.push({
                    msgtype: 'markdown',
                    markdown: {
                        content: message.content
                    }
                });
            }
        }
        
        return messages;
    }

    /**
     * 发送消息到企业微信
     * 从msgBuilder获取消息内容并发送
     * @returns Promise<boolean> 发送结果
     */
    async send(): Promise<boolean> {
        if (!this.webhook) {
            console.error('Webhook URL is required');
            return false;
        }

        if (!this.msgBuilder) {
            console.error('MessageBuilder is required');
            return false;
        }

        try {
            const messages = this.buildWxComMessages(this.msgBuilder);
            
            if (messages.length === 0) {
                console.warn('No messages to send');
                return true;
            }

            // 发送所有消息
            const results = await Promise.all(
                messages.map(message => this.sendSingleMessage(message))
            );

            return results.every(result => result);
        } catch (error) {
            console.error('Failed to send messages:', error);
            return false;
        }
    }

    /**
     * 发送单条消息
     * @param message - 企业微信消息对象
     * @returns Promise<boolean> 发送结果
     */
    private async sendSingleMessage(message: WxComMessage): Promise<boolean> {
        try {
            const response = await fetch(this.webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                return false;
            }

            const result = await response.json();
            if (result.errcode !== 0) {
                console.error('WeChat API error:', result.errmsg);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Network error:', error);
            return false;
        }
    }
}


