class r {
  constructor() {
    this.messageList = [];
  }
  /**
   * 设置文本消息内容
   * @param text - 文本消息内容
   * @returns 返回当前实例，支持链式调用
   */
  setText(t) {
    return this.messageList.push({
      type: "text",
      content: t
    }), this;
  }
  /**
   * 设置Markdown消息内容
   * @param markdown - Markdown格式的消息内容
   * @returns 返回当前实例，支持链式调用
   */
  setMarkdown(t) {
    return this.messageList.push({
      type: "markdown",
      content: t
    }), this;
  }
  /**
   * 获取所有消息
   * @returns 消息列表
   */
  getMessages() {
    return [...this.messageList];
  }
  /**
   * 获取文本消息列表
   * @returns 文本消息列表
   */
  getTextMessages() {
    return this.messageList.filter((t) => t.type === "text");
  }
  /**
   * 获取Markdown消息列表
   * @returns Markdown消息列表
   */
  getMarkdownMessages() {
    return this.messageList.filter((t) => t.type === "markdown");
  }
  /**
   * 检查是否有文本消息
   * @returns 如果有文本消息则返回true
   */
  hasText() {
    return this.messageList.some((t) => t.type === "text");
  }
  /**
   * 检查是否有Markdown消息
   * @returns 如果有Markdown消息则返回true
   */
  hasMarkdown() {
    return this.messageList.some((t) => t.type === "markdown");
  }
  /**
   * 获取第一条文本消息内容
   * @returns 第一条文本消息内容，如果没有则返回空字符串
   */
  getText() {
    const t = this.messageList.find((e) => e.type === "text");
    return t ? t.content : "";
  }
  /**
   * 获取第一条Markdown消息内容
   * @returns 第一条Markdown消息内容，如果没有则返回空字符串
   */
  getMarkdown() {
    const t = this.messageList.find((e) => e.type === "markdown");
    return t ? t.content : "";
  }
  /**
   * 清空所有消息
   * @returns 返回当前实例，支持链式调用
   */
  clear() {
    return this.messageList = [], this;
  }
  /**
   * 获取消息数量
   * @returns 消息数量
   */
  getMessageCount() {
    return this.messageList.length;
  }
}
export {
  r as MessageBuilderPayload
};
