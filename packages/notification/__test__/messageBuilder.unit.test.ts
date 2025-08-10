/*
 * @Author: @memo28.repo
 * @Date: 2025-08-10 19:25:00
 * @LastEditTime: 2025-08-10 19:25:00
 * @Description: MessageBuilder类的vitest单元测试
 * @FilePath: /memo28.pro.Repo/packages/notification/__test__/messageBuilder.unit.test.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { MessageBuilder, MessageBuilderPayload } from '../src/index';

/**
 * MessageBuilderPayload基础功能测试套件
 */
describe('MessageBuilderPayload', () => {
    let payload: MessageBuilderPayload;

    /**
     * 每个测试前重新创建实例
     */
    beforeEach(() => {
        payload = new MessageBuilderPayload();
    });

    /**
     * 测试实例创建
     */
    it('应该能够创建空的MessageBuilderPayload实例', () => {
        expect(payload).toBeInstanceOf(MessageBuilderPayload);
        expect(payload.getMessageCount()).toBe(0);
        expect(payload.hasText()).toBe(false);
        expect(payload.hasMarkdown()).toBe(false);
    });

    /**
     * 测试文本消息设置
     */
    it('应该能够设置文本消息', () => {
        payload.setText('测试文本消息');
        expect(payload.hasText()).toBe(true);
        expect(payload.getText()).toBe('测试文本消息');
        expect(payload.getMessageCount()).toBe(1);
    });

    /**
     * 测试Markdown消息设置
     */
    it('应该能够设置Markdown消息', () => {
        payload.setMarkdown('# 测试Markdown');
        expect(payload.hasMarkdown()).toBe(true);
        expect(payload.getMarkdown()).toBe('# 测试Markdown');
        expect(payload.getMessageCount()).toBe(1);
    });

    /**
     * 测试多条消息设置
     */
    it('应该能够设置多条消息', () => {
        payload.setText('文本1').setMarkdown('# Markdown1').setText('文本2');
        expect(payload.getMessageCount()).toBe(3);
        expect(payload.hasText()).toBe(true);
        expect(payload.hasMarkdown()).toBe(true);
    });

    /**
     * 测试消息列表获取
     */
    it('应该能够获取消息列表', () => {
        payload.setText('文本').setMarkdown('# MD');
        const messages = payload.getMessages();
        expect(messages).toHaveLength(2);
        expect(messages[0].type).toBe('text');
        expect(messages[1].type).toBe('markdown');
    });

    /**
     * 测试分类消息获取
     */
    it('应该能够获取分类消息', () => {
        payload.setText('文本1').setMarkdown('# MD1').setText('文本2');
        const textMessages = payload.getTextMessages();
        const markdownMessages = payload.getMarkdownMessages();
        expect(textMessages).toHaveLength(2);
        expect(markdownMessages).toHaveLength(1);
    });

    /**
     * 测试消息清空
     */
    it('应该能够清空消息', () => {
        payload.setText('文本').setMarkdown('# MD');
        payload.clear();
        expect(payload.getMessageCount()).toBe(0);
        expect(payload.hasText()).toBe(false);
        expect(payload.hasMarkdown()).toBe(false);
    });

    /**
     * 测试链式调用
     */
    it('应该支持链式调用', () => {
        const result = payload.setText('文本').setMarkdown('# MD').clear();
        expect(result).toBe(payload);
    });
});

/**
 * MessageBuilder扩展功能测试套件
 */
describe('MessageBuilder', () => {
    let builder: MessageBuilder;

    /**
     * 每个测试前重新创建实例
     */
    beforeEach(() => {
        builder = new MessageBuilder();
    });

    /**
     * 测试实例创建
     */
    it('应该能够创建MessageBuilder实例', () => {
        expect(builder).toBeInstanceOf(MessageBuilder);
        expect(builder).toBeInstanceOf(MessageBuilderPayload);
    });

    /**
     * 测试静态create方法
     */
    it('静态create方法应该返回MessageBuilder实例', () => {
        const createdBuilder = MessageBuilder.create();
        expect(createdBuilder).toBeInstanceOf(MessageBuilder);
    });

    /**
     * 测试build方法 - 优先Markdown
     */
    it('build方法应该优先返回Markdown内容', () => {
        builder.setText('文本消息').setMarkdown('# Markdown消息');
        const result = builder.build();
        expect(result).toBe('# Markdown消息');
    });

    /**
     * 测试build方法 - 仅文本
     */
    it('build方法应该在没有Markdown时返回文本内容', () => {
        builder.setText('仅文本消息');
        const result = builder.build();
        expect(result).toBe('仅文本消息');
    });

    /**
     * 测试build方法 - 空内容
     */
    it('build方法应该在空内容时返回空字符串', () => {
        const result = builder.build();
        expect(result).toBe('');
    });

    /**
     * 测试getMessageType方法
     */
    it('getMessageType方法应该返回正确的消息类型', () => {
        const builder1 = new MessageBuilder().setMarkdown('# MD');
        const builder2 = new MessageBuilder().setText('文本');
        const builder3 = new MessageBuilder();
        const builder4 = new MessageBuilder().setText('文本').setMarkdown('# MD');
        
        expect(builder1.getMessageType()).toBe('markdown');
        expect(builder2.getMessageType()).toBe('text');
        expect(builder3.getMessageType()).toBe('empty');
        expect(builder4.getMessageType()).toBe('markdown'); // 优先返回markdown
    });

    /**
     * 测试hasContent方法
     */
    it('hasContent方法应该正确检查是否有内容', () => {
        const builder1 = new MessageBuilder();
        const builder2 = new MessageBuilder().setText('文本');
        const builder3 = new MessageBuilder().setMarkdown('# MD');
        const builder4 = new MessageBuilder().setText('文本').setMarkdown('# MD');
        
        expect(builder1.hasContent()).toBe(false);
        expect(builder2.hasContent()).toBe(true);
        expect(builder3.hasContent()).toBe(true);
        expect(builder4.hasContent()).toBe(true);
    });
});

/**
 * 边界情况测试套件
 */
describe('MessageBuilder 边界情况', () => {
    let builder: MessageBuilder;

    /**
     * 每个测试前重新创建实例
     */
    beforeEach(() => {
        builder = new MessageBuilder();
    });

    /**
     * 测试空字符串消息
     */
    it('应该正确处理空字符串消息', () => {
        builder.setText('').setMarkdown('');
        expect(builder.hasText()).toBe(true);
        expect(builder.hasMarkdown()).toBe(true);
        expect(builder.getText()).toBe('');
        expect(builder.getMarkdown()).toBe('');
    });

    /**
     * 测试特殊字符消息
     */
    it('应该正确处理特殊字符消息', () => {
        const specialText = '特殊字符: !@#$%^&*()_+-={}[]|\\:;"<>?,./';
        const specialMarkdown = '# 特殊字符\n\n**粗体** *斜体* `代码`';
        builder.setText(specialText).setMarkdown(specialMarkdown);
        expect(builder.getText()).toBe(specialText);
        expect(builder.getMarkdown()).toBe(specialMarkdown);
    });

    /**
     * 测试长文本消息
     */
    it('应该正确处理长文本消息', () => {
        const longText = 'A'.repeat(10000);
        builder.setText(longText);
        expect(builder.getText()).toBe(longText);
        expect(builder.getText().length).toBe(10000);
    });

    /**
     * 测试多次设置同类型消息
     */
    it('应该正确处理多次设置同类型消息', () => {
        builder.setText('文本1').setText('文本2').setText('文本3');
        expect(builder.getMessageCount()).toBe(3);
        expect(builder.getText()).toBe('文本1'); // 返回第一条文本消息
        const textMessages = builder.getTextMessages();
        expect(textMessages).toHaveLength(3);
        expect(textMessages[2].content).toBe('文本3');
    });
});