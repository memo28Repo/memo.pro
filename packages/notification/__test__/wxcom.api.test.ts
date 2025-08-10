/*
 * @Author: @memo28.repo
 * @Date: 2025-08-10 19:30:00
 * @LastEditTime: 2025-08-10 19:50:42
 * @Description: 企业微信插件API请求测试
 * @FilePath: /memo28.pro.Repo/packages/notification/__test__/wxcom.api.test.ts
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { webhooks } from "../ignoreConfig";
import { Core, MessageBuilder, Wxcom } from '../src/index';

// 真实的企业微信webhook地址
const REAL_WEBHOOK = webhooks;

/**
 * 企业微信插件API请求测试套件
 * 使用真实的webhook地址进行测试
 */
describe('企业微信插件API请求测试', () => {
    let core: Core;
    let msgBuilder: MessageBuilder;
    let wxcomPlugin: Wxcom;

    /**
     * 每个测试前重新创建实例
     */
    beforeEach(() => {
        core = new Core();
        msgBuilder = MessageBuilder.create();
        wxcomPlugin = new Wxcom(REAL_WEBHOOK);
    });

    /**
     * 测试文本消息发送
     */
    it('应该能够发送文本消息到企业微信', async () => {
        // 构建文本消息
        msgBuilder.setText('🚀 这是一条来自notification包的测试文本消息！\n\n测试时间: ' + new Date().toLocaleString());
        
        // 注册插件并播种消息
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息
        const result = await wxcomPlugin.send();
        
        // 验证发送结果
        expect(result).toBe(true);
    }, 10000); // 设置10秒超时

    /**
     * 测试Markdown消息发送
     */
    it('应该能够发送Markdown消息到企业微信', async () => {
        // 构建Markdown消息
        msgBuilder.setMarkdown(`# 📋 Notification包测试报告\n\n## 测试信息\n- **测试时间**: ${new Date().toLocaleString()}\n- **测试类型**: Markdown消息发送\n- **状态**: ✅ 正在测试\n\n## 功能特性\n1. 支持**粗体文本**\n2. 支持*斜体文本*\n3. 支持\`代码块\`\n4. 支持列表和链接\n\n> 这是一个引用块示例\n\n---\n\n**测试完成！** 🎉`);
        
        // 注册插件并播种消息
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息
        const result = await wxcomPlugin.send();
        
        // 验证发送结果
        expect(result).toBe(true);
    }, 10000);

    /**
     * 测试混合消息发送（文本+Markdown）
     */
    it('应该能够发送混合消息到企业微信', async () => {
        // 构建混合消息
        msgBuilder
            .setText('📢 第一条文本消息：基础通知')
            .setMarkdown('# 📊 第二条消息：Markdown格式\n\n**重要提醒**: 这是一条Markdown格式的消息')
            .setText('📝 第三条文本消息：补充说明\n\n测试时间: ' + new Date().toLocaleString());
        
        // 注册插件并播种消息
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息
        const result = await wxcomPlugin.send();
        
        // 验证发送结果
        expect(result).toBe(true);
        
        // 验证消息数量
        expect(msgBuilder.getMessageCount()).toBe(3);
    }, 15000); // 混合消息可能需要更长时间

    /**
     * 测试错误处理 - 无效webhook
     */
    it('应该正确处理无效的webhook地址', async () => {
        // 创建带有无效webhook的插件
        const invalidWxcomPlugin = new Wxcom('https://invalid-webhook-url.com/test');
        msgBuilder.setText('测试消息');
        
        // 注册插件并播种消息
        core.registerModule(invalidWxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息应该失败
        const result = await invalidWxcomPlugin.send();
        
        // 验证发送失败
        expect(result).toBe(false);
    }, 10000);

    /**
     * 测试错误处理 - 空消息
     */
    it('应该正确处理空消息发送', async () => {
        // 不设置任何消息内容
        
        // 注册插件但不播种消息
        core.registerModule(wxcomPlugin);
        
        // 发送空消息应该失败
        const result = await wxcomPlugin.send();
        
        // 验证发送失败
        expect(result).toBe(false);
    });

    /**
     * 测试webhook设置功能
     */
    it('应该能够动态设置webhook地址', async () => {
        // 创建不带webhook的插件
        const dynamicWxcomPlugin = new Wxcom();
        
        // 动态设置webhook
        dynamicWxcomPlugin.setWebhook(REAL_WEBHOOK);
        
        // 构建测试消息
        msgBuilder.setText('🔧 动态设置webhook测试消息\n\n测试时间: ' + new Date().toLocaleString());
        
        // 注册插件并播种消息
        core.registerModule(dynamicWxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息
        const result = await dynamicWxcomPlugin.send();
        
        // 验证发送结果
        expect(result).toBe(true);
    }, 10000);

    /**
     * 测试多插件并发发送
     */
    it('应该能够通过Core同时发送到多个相同插件实例', async () => {
        // 创建多个插件实例（模拟发送到不同群组）
        const wxcomPlugin1 = new Wxcom(REAL_WEBHOOK);
        const wxcomPlugin2 = new Wxcom(REAL_WEBHOOK);
        
        // 构建测试消息
        msgBuilder.setText('🔄 多插件并发测试\n\n这条消息将通过多个插件实例发送\n\n测试时间: ' + new Date().toLocaleString());
        
        // 注册多个插件
        core.registerModule([wxcomPlugin1, wxcomPlugin2]);
        core.seed(msgBuilder);
        
        // 验证插件数量
        expect(core.getModuleCount()).toBe(2);
        
        // 分别发送消息
        const result1 = await wxcomPlugin1.send();
        const result2 = await wxcomPlugin2.send();
        
        // 验证发送结果
        expect(result1).toBe(true);
        expect(result2).toBe(true);
    }, 15000);

    /**
     * 测试特殊字符和emoji处理
     */
    it('应该能够正确处理特殊字符和emoji', async () => {
        // 构建包含特殊字符的消息
        const specialMessage = `🎯 特殊字符测试\n\n` +
            `📝 中文字符: 你好世界！\n` +
            `🔤 英文字符: Hello World!\n` +
            `🔢 数字符号: 123456789\n` +
            `⚡ 特殊符号: !@#$%^&*()_+-={}[]|\\:;"'<>?,./ \n` +
            `🎨 Emoji表情: 🚀🎉💡🔥⭐🌟💯🎊🎈🎁\n` +
            `📅 测试时间: ${new Date().toLocaleString()}`;
        
        msgBuilder.setText(specialMessage);
        
        // 注册插件并播种消息
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息
        const result = await wxcomPlugin.send();
        
        // 验证发送结果
        expect(result).toBe(true);
    }, 10000);

    /**
     * 测试长消息处理
     */
    it('应该能够处理长消息内容', async () => {
        // 构建长消息
        let longMessage = '📚 长消息测试\n\n';
        for (let i = 1; i <= 50; i++) {
            longMessage += `${i}. 这是第${i}行测试内容，用于验证长消息的发送能力。\n`;
        }
        longMessage += `\n📅 测试时间: ${new Date().toLocaleString()}`;
        
        msgBuilder.setText(longMessage);
        
        // 注册插件并播种消息
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        // 发送消息
        const result = await wxcomPlugin.send();
        
        // 验证发送结果
        expect(result).toBe(true);
    }, 15000);
});

/**
 * 企业微信API响应测试套件
 */
describe('企业微信API响应测试', () => {
    /**
     * 测试API响应格式
     */
    it('应该能够正确解析企业微信API响应', async () => {
        // Mock fetch响应
        const mockResponse = {
            ok: true,
            json: async () => ({ errcode: 0, errmsg: 'ok' })
        };
        
        // 使用vi.fn()模拟fetch
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any);
        
        const wxcomPlugin = new Wxcom(REAL_WEBHOOK);
        const msgBuilder = MessageBuilder.create().setText('Mock测试消息');
        
        const core = new Core();
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        const result = await wxcomPlugin.send();
        
        expect(result).toBe(true);
        expect(fetchSpy).toHaveBeenCalledWith(
            REAL_WEBHOOK,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: expect.stringContaining('Mock测试消息')
            })
        );
        
        // 恢复原始fetch
        fetchSpy.mockRestore();
    });

    /**
     * 测试API错误响应处理
     */
    it('应该能够正确处理API错误响应', async () => {
        // Mock错误响应
        const mockErrorResponse = {
            ok: false,
            status: 400,
            json: async () => ({ errcode: 93017, errmsg: 'invalid json request' })
        };
        
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockErrorResponse as any);
        
        const wxcomPlugin = new Wxcom(REAL_WEBHOOK);
        const msgBuilder = MessageBuilder.create().setText('错误测试消息');
        
        const core = new Core();
        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);
        
        const result = await wxcomPlugin.send();
        
        expect(result).toBe(false);
        
        // 恢复原始fetch
        fetchSpy.mockRestore();
    });
});