# Changelog

## 0.0.2

### Patch Changes

- 支持微信的推送

本文档记录了 @memo28.pro/notification 包的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 计划中的功能

- 飞书/Lark 插件支持
- 钉钉插件支持
- 邮件通知插件
- 消息模板系统
- 批量发送优化

## [0.0.1] - 2025-08-10

### 新增

- 🎉 初始版本发布
- ✨ 核心架构设计
  - `Core` 类：插件管理和消息分发
  - `MessageBuilder` 类：消息构建器，支持链式调用
  - `Base` 抽象类：插件基类
- 🔌 企业微信插件 (`Wxcom`)
  - 支持文本消息发送
  - 支持 Markdown 消息发送
  - 支持混合消息发送
  - 完整的错误处理
- 📝 消息类型支持
  - 文本消息 (`text`)
  - Markdown 消息 (`markdown`)
- 🛡️ 完整的 TypeScript 类型定义
- 🧪 全面的测试覆盖
  - 单元测试
  - 集成测试
  - API 测试
- 📚 完整的文档
  - README 使用指南
  - API 文档
  - 插件开发指南

### 技术特性

- 零依赖设计
- 插件化架构
- 链式 API 设计
- 异步消息发送
- 错误处理和重试机制
- 完整的 TypeScript 支持

### 开发工具

- Vitest 测试框架
- TypeScript 编译
- Vite 构建工具
- API Extractor 类型定义生成

[Unreleased]: https://github.com/memo28/memo28.pro.Repo/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/memo28/memo28.pro.Repo/releases/tag/v0.0.1
