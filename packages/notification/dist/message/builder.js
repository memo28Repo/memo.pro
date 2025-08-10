import { MessageBuilderPayload as e } from "./builderPayload.js";
class t extends e {
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
  static create() {
    return new t();
  }
  /**
   * 构建消息内容
   * 优先返回Markdown格式，如果没有则返回文本格式
   * @returns 构建的消息内容，如果没有内容则返回空字符串
   */
  build() {
    return this.hasMarkdown() ? this.getMarkdown() : this.hasText() ? this.getText() : "";
  }
  /**
   * 获取消息类型
   * @returns 消息类型：'markdown' | 'text' | 'empty'
   */
  getMessageType() {
    return this.hasMarkdown() ? "markdown" : this.hasText() ? "text" : "empty";
  }
  /**
   * 检查是否有消息内容
   * @returns 如果有文本或Markdown内容则返回true
   */
  hasContent() {
    return this.hasText() || this.hasMarkdown();
  }
}
export {
  t as MessageBuilder
};
