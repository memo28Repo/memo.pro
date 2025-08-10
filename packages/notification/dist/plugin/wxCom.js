import { Base as o } from "./plugin.js";
const n = "wxcom";
class l extends o {
  /**
   * 构造函数
   * @param webhook - 企业微信机器人的webhook地址
   */
  constructor(e) {
    super(), this.platform = n, e && this.setWebhook(e);
  }
  /**
   * 从MessageBuilder构建企业微信消息格式
   * @param messageBuilder - 消息构建器实例
   * @returns 企业微信消息对象数组
   */
  buildWxComMessages(e) {
    const s = [], r = e.getMessages();
    for (const t of r)
      t.type === "text" ? s.push({
        msgtype: "text",
        text: {
          content: t.content
        }
      }) : t.type === "markdown" && s.push({
        msgtype: "markdown",
        markdown: {
          content: t.content
        }
      });
    return s;
  }
  /**
   * 发送消息到企业微信
   * 从msgBuilder获取消息内容并发送
   * @returns Promise<boolean> 发送结果
   */
  async send() {
    if (!this.webhook)
      return console.error("Webhook URL is required"), !1;
    if (!this.msgBuilder)
      return console.error("MessageBuilder is required"), !1;
    try {
      const e = this.buildWxComMessages(this.msgBuilder);
      return e.length === 0 ? (console.warn("No messages to send"), !0) : (await Promise.all(
        e.map((r) => this.sendSingleMessage(r))
      )).every((r) => r);
    } catch (e) {
      return console.error("Failed to send messages:", e), !1;
    }
  }
  /**
   * 发送单条消息
   * @param message - 企业微信消息对象
   * @returns Promise<boolean> 发送结果
   */
  async sendSingleMessage(e) {
    try {
      const s = await fetch(this.webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
      });
      if (!s.ok)
        return console.error(`HTTP error! status: ${s.status}`), !1;
      const r = await s.json();
      return r.errcode !== 0 ? (console.error("WeChat API error:", r.errmsg), !1) : !0;
    } catch (s) {
      return console.error("Network error:", s), !1;
    }
  }
}
export {
  l as Wxcom,
  n as platformWxCom
};
