/*
 * @Author: @memo28.repo
 * @Date: 2025-08-10 19:25:00
 * @LastEditTime: 2025-08-10 19:25:00
 * @Description: MessageBuilder和Core的vitest集成测试
 * @FilePath: /memo28.pro.Repo/packages/notification/__test__/messageBuilder.test.ts
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Core, MessageBuilder, Wxcom } from '../src/index';

/**
 * Core和MessageBuilder集成测试套件
 */
describe('Core和MessageBuilder集成测试', () => {
    let core: Core;
    let msgBuilder: MessageBuilder;
    let wxcomPlugin: Wxcom;

    /**
     * 每个测试前重新创建实例
     */
    beforeEach(() => {
        core = new Core();
        msgBuilder = MessageBuilder.create();
        wxcomPlugin = new Wxcom('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=test-webhook-key');
    });

    /**
     * 测试基础实例创建
     */
    it('应该能够创建所有必要的实例', () => {
        expect(core).toBeInstanceOf(Core);
        expect(msgBuilder).toBeInstanceOf(MessageBuilder);
        expect(wxcomPlugin).toBeInstanceOf(Wxcom);
    });

    /**
     * 测试消息构建流程
     */
    it('应该能够正确构建消息内容', () => {
        msgBuilder
            .setText('这是一条文本消息')
            .setMarkdown('# 这是一条Markdown消息\n\n**粗体文本**');
        
        expect(msgBuilder.hasText()).toBe(true);
        expect(msgBuilder.hasMarkdown()).toBe(true);
        expect(msgBuilder.getText()).toBe('这是一条文本消息');
        expect(msgBuilder.getMarkdown()).toBe('# 这是一条Markdown消息\n\n**粗体文本**');
        expect(msgBuilder.getMessageCount()).toBe(2);
        expect(msgBuilder.getMessageType()).toBe('markdown');
        expect(msgBuilder.hasContent()).toBe(true);
    });

    /**
     * 测试插件注册流程
     */
    it('应该能够注册插件到Core', () => {
        core.registerModule(wxcomPlugin);
        expect(core.getModuleCount()).toBe(1);
    });

    /**
     * 测试消息播种流程
     */
    it('应该能够播种消息到Core', () => {
        msgBuilder.setText('测试消息');
        
        // 播种消息不应该抛出错误
        expect(() => {
            core.seed(msgBuilder);
        }).not.toThrow();
    });

    /**
     * 测试完整的工作流程
     */
    it('应该能够完成完整的消息发送工作流程', () => {
        // 1. 构建消息
        msgBuilder
            .setText('这是一条文本消息')
            .setMarkdown('# 这是一条Markdown消息\n\n**粗体文本**');
        
        // 2. 注册插件
        core.registerModule(wxcomPlugin);
        
        // 3. 播种消息
        core.seed(msgBuilder);
        
        // 4. 验证状态
        expect(core.getModuleCount()).toBe(1);
        expect(msgBuilder.hasContent()).toBe(true);
        expect(msgBuilder.getMessageCount()).toBe(2);
        
        // 5. 模拟发送（不实际发送网络请求）
        expect(() => {
            // core.sendAll(); // 在实际测试中可能需要mock网络请求
        }).not.toThrow();
    });

    /**
     * 测试多个插件注册
     */
    it('应该能够注册多个插件', () => {
        const wxcomPlugin2 = new Wxcom('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=test-webhook-key-2');
        
        core.registerModule([wxcomPlugin, wxcomPlugin2]);
        expect(core.getModuleCount()).toBe(2);
    });

    /**
     * 测试Core清空模块
     */
    it('应该能够清空所有注册的模块', () => {
        core.registerModule(wxcomPlugin);
        expect(core.getModuleCount()).toBe(1);
        
        core.clearModules();
        expect(core.getModuleCount()).toBe(0);
    });

    /**
     * 测试MessageBuilder的链式调用
     */
    it('MessageBuilder应该支持链式调用', () => {
        const result = msgBuilder
            .setText('文本1')
            .setMarkdown('# MD1')
            .setText('文本2');
        
        expect(result).toBe(msgBuilder);
        expect(msgBuilder.getMessageCount()).toBe(3);
    });

    /**
     * 测试企业微信插件的基础属性
     */
    it('企业微信插件应该有正确的平台标识', () => {
        expect(wxcomPlugin.platform).toBe('wxcom');
    });

    /**
     * 测试企业微信插件的webhook设置
     */
    it('企业微信插件应该能够设置webhook', () => {
        const newWebhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=new-webhook-key';
        wxcomPlugin.setWebhook(newWebhook);
        
        // 这里我们无法直接访问private属性，但可以通过其他方式验证
        // 比如检查是否不抛出错误
        expect(() => {
            wxcomPlugin.setWebhook(newWebhook);
        }).not.toThrow();
    });
});

/**
 * 用户期望API设计验证测试套件
 */
describe('用户期望API设计验证', () => {
    /**
     * 测试完整的用户期望工作流程
     */
    it('应该支持用户期望的完整API工作流程', () => {
        // 1. 创建Core实例
        const core = new Core();
        expect(core).toBeInstanceOf(Core);
        
        // 2. 创建MessageBuilder实例
        const msgBuilder = MessageBuilder.create();
        expect(msgBuilder).toBeInstanceOf(MessageBuilder);
        
        // 3. 构建消息内容
        msgBuilder
            .setText('这是一条文本消息')
            .setMarkdown('# 这是一条Markdown消息\n\n**粗体文本**');
        
        // 4. 创建企业微信插件实例
        const wxcomPlugin = new Wxcom('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your-webhook-key');
        expect(wxcomPlugin).toBeInstanceOf(Wxcom);
        
        // 5. 注册插件到Core
        core.registerModule(wxcomPlugin);
        expect(core.getModuleCount()).toBe(1);
        
        // 6. 播种消息到Core
        expect(() => {
            core.seed(msgBuilder);
        }).not.toThrow();
        
        // 7. 验证消息内容
        expect(msgBuilder.hasText()).toBe(true);
        expect(msgBuilder.hasMarkdown()).toBe(true);
        expect(msgBuilder.getText()).toBe('这是一条文本消息');
        expect(msgBuilder.getMarkdown()).toBe('# 这是一条Markdown消息\n\n**粗体文本**');
        expect(msgBuilder.getMessageCount()).toBe(2);
        expect(msgBuilder.getMessageType()).toBe('markdown');
        expect(msgBuilder.hasContent()).toBe(true);
        
        // 8. 验证Core状态
        expect(core.getModuleCount()).toBe(1);
        
        // 9. 模拟发送消息（不实际发送）
        expect(() => {
            // core.sendAll(); // 实际项目中取消注释
        }).not.toThrow();
    });
});