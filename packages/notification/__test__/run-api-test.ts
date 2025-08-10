/*
 * @Author: @memo28.repo
 * @Date: 2025-08-10 19:35:00
 * @LastEditTime: 2025-08-10 19:47:38
 * @Description: 企业微信API测试运行脚本
 * @FilePath: /memo28.pro.Repo/packages/notification/__test__/run-api-test.ts
 */

import { webhooks } from "../ignoreConfig";
import { Core, MessageBuilder, Wxcom } from '../src/index';

// 真实的企业微信webhook地址
const REAL_WEBHOOK = webhooks;

/**
 * 简单的API测试运行器
 */
class WxcomApiTestRunner {
    private testCount = 0;
    private passedCount = 0;
    private failedCount = 0;

    /**
     * 运行单个测试
     * @param testName - 测试名称
     * @param testFn - 测试函数
     */
    private async runTest(testName: string, testFn: () => Promise<void>): Promise<void> {
        this.testCount++;
        try {
            console.log(`🧪 正在运行: ${testName}`);
            await testFn();
            console.log(`✅ 通过: ${testName}`);
            this.passedCount++;
        } catch (error) {
            console.log(`❌ 失败: ${testName}`);
            console.log(`   错误: ${error}`);
            this.failedCount++;
        }
        console.log(''); // 空行分隔
    }

    /**
     * 测试文本消息发送
     */
    private async testTextMessage(): Promise<void> {
        const core = new Core();
        const msgBuilder = MessageBuilder.create();
        const wxcomPlugin = new Wxcom(REAL_WEBHOOK);

        msgBuilder.setText(`🚀 API测试 - 文本消息\n\n测试时间: ${new Date().toLocaleString()}\n状态: 正在测试文本消息发送功能`);

        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);

        const result = await wxcomPlugin.send();

        if (!result) {
            throw new Error('文本消息发送失败');
        }
    }

    /**
     * 测试Markdown消息发送
     */
    private async testMarkdownMessage(): Promise<void> {
        const core = new Core();
        const msgBuilder = MessageBuilder.create();
        const wxcomPlugin = new Wxcom(REAL_WEBHOOK);

        msgBuilder.setMarkdown(`# 📋 API测试 - Markdown消息\n\n## 测试信息\n- **测试时间**: ${new Date().toLocaleString()}\n- **测试类型**: Markdown消息发送\n- **状态**: ✅ 正在测试\n\n## 功能验证\n1. **粗体文本** ✓\n2. *斜体文本* ✓\n3. \`代码块\` ✓\n4. 列表功能 ✓\n\n> 这是一个引用块示例\n\n---\n\n**测试完成！** 🎉`);

        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);

        const result = await wxcomPlugin.send();

        if (!result) {
            throw new Error('Markdown消息发送失败');
        }
    }

    /**
     * 测试混合消息发送
     */
    private async testMixedMessages(): Promise<void> {
        const core = new Core();
        const msgBuilder = MessageBuilder.create();
        const wxcomPlugin = new Wxcom(REAL_WEBHOOK);

        msgBuilder
            .setText('📢 API测试 - 混合消息 (第1条)')
            .setMarkdown('# 📊 API测试 - 混合消息 (第2条)\n\n**这是Markdown格式的消息**')
            .setText(`📝 API测试 - 混合消息 (第3条)\n\n测试时间: ${new Date().toLocaleString()}`);

        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);

        const result = await wxcomPlugin.send();

        if (!result) {
            throw new Error('混合消息发送失败');
        }

        if (msgBuilder.getMessageCount() !== 3) {
            throw new Error(`期望3条消息，实际${msgBuilder.getMessageCount()}条`);
        }
    }

    /**
     * 测试特殊字符处理
     */
    private async testSpecialCharacters(): Promise<void> {
        const core = new Core();
        const msgBuilder = MessageBuilder.create();
        const wxcomPlugin = new Wxcom(REAL_WEBHOOK);

        const specialMessage = `🎯 API测试 - 特殊字符\n\n` +
            `📝 中文: 你好世界！\n` +
            `🔤 English: Hello World!\n` +
            `🔢 Numbers: 123456789\n` +
            `⚡ Symbols: !@#$%^&*()_+-={}[]|\\:;"'<>?,./ \n` +
            `🎨 Emoji: 🚀🎉💡🔥⭐🌟💯🎊🎈🎁\n` +
            `📅 Time: ${new Date().toLocaleString()}`;

        msgBuilder.setText(specialMessage);

        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);

        const result = await wxcomPlugin.send();

        if (!result) {
            throw new Error('特殊字符消息发送失败');
        }
    }

    /**
     * 测试错误处理
     */
    private async testErrorHandling(): Promise<void> {
        const core = new Core();
        const msgBuilder = MessageBuilder.create();
        const wxcomPlugin = new Wxcom('https://invalid-webhook-url.com/test');

        msgBuilder.setText('这是一条测试错误处理的消息');

        core.registerModule(wxcomPlugin);
        core.seed(msgBuilder);

        const result = await wxcomPlugin.send();

        if (result) {
            throw new Error('期望发送失败，但实际成功了');
        }

        console.log('   ℹ️  错误处理测试通过：无效webhook正确返回失败');
    }

    /**
     * 运行所有API测试
     */
    async runAllTests(): Promise<void> {
        console.log('🚀 开始运行企业微信API测试\n');
        console.log(`📡 使用Webhook: ${REAL_WEBHOOK}\n`);

        await this.runTest('文本消息发送测试', () => this.testTextMessage());

        // 等待1秒避免频率限制
        await new Promise(resolve => setTimeout(resolve, 1000));

        await this.runTest('Markdown消息发送测试', () => this.testMarkdownMessage());

        // 等待1秒避免频率限制
        await new Promise(resolve => setTimeout(resolve, 1000));

        await this.runTest('混合消息发送测试', () => this.testMixedMessages());

        // 等待1秒避免频率限制
        await new Promise(resolve => setTimeout(resolve, 1000));

        await this.runTest('特殊字符处理测试', () => this.testSpecialCharacters());

        // 等待1秒避免频率限制
        await new Promise(resolve => setTimeout(resolve, 1000));

        await this.runTest('错误处理测试', () => this.testErrorHandling());

        this.printSummary();
    }

    /**
     * 打印测试结果摘要
     */
    private printSummary(): void {
        console.log('📊 测试结果摘要:');
        console.log(`总测试数: ${this.testCount}`);
        console.log(`通过: ${this.passedCount}`);
        console.log(`失败: ${this.failedCount}`);
        console.log(`成功率: ${((this.passedCount / this.testCount) * 100).toFixed(2)}%`);

        if (this.failedCount === 0) {
            console.log('\n🎉 所有API测试通过！企业微信插件工作正常。');
        } else {
            console.log('\n⚠️  部分API测试失败，请检查网络连接和webhook配置。');
        }
    }
}

/**
 * 主函数：运行API测试
 */
async function main() {
    const testRunner = new WxcomApiTestRunner();

    try {
        await testRunner.runAllTests();
    } catch (error) {
        console.error('❌ 测试运行器发生错误:', error);
    }
}

// 如果直接运行此文件，则执行测试
main();

// 导出测试运行器
export { WxcomApiTestRunner };
