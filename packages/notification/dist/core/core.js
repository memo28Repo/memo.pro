class l {
  constructor() {
    this.moduleList = [];
  }
  /**
   * 注册通知插件
   * @param modules - 单个插件或插件数组
   * @returns 返回当前实例，支持链式调用
   */
  registerModule(e) {
    return Array.isArray(e) ? this.moduleList.push(...e) : this.moduleList.push(e), this;
  }
  /**
   * 获取已注册的插件列表
   * @returns 插件列表
   */
  getModuleList() {
    return this.moduleList;
  }
  /**
   * 检查插件配置是否完整
   * @param module - 要检查的插件
   * @returns [是否通过检查, 错误信息]
   * @private
   */
  checkModule(e) {
    return e.getMessageBulder() ? e.getPlatform() ? e.getWebhook() ? [!0, ""] : [!1, "缺少Webhook地址"] : [!1, "缺少平台标识"] : [!1, "缺少消息构建器"];
  }
  /**
   * 为所有注册的插件设置消息构建器
   * @param messageBuilder - 消息构建器实例
   * @returns 返回当前实例，支持链式调用
   */
  seed(e) {
    return this.moduleList.forEach((t) => {
      t.setMessageBulder(e);
      const [s, r] = this.checkModule(t);
      s ? console.log(`模块 ${t.getPlatform()} 已就绪`) : console.warn(`模块 ${t.getPlatform()} 配置检查失败: ${r}`);
    }), this;
  }
  /**
   * 发送消息到所有注册的插件
   * @returns Promise<boolean[]> 每个插件的发送结果
   */
  async sendAll() {
    const e = [];
    for (const t of this.moduleList)
      try {
        if (typeof t.send == "function") {
          const s = await t.send();
          e.push(s);
        } else
          console.warn(`模块 ${t.getPlatform()} 没有send方法`), e.push(!1);
      } catch (s) {
        console.error(`模块 ${t.getPlatform()} 发送失败:`, s), e.push(!1);
      }
    return e;
  }
  /**
   * 清空所有注册的插件
   * @returns 返回当前实例，支持链式调用
   */
  clearModules() {
    return this.moduleList = [], this;
  }
  /**
   * 获取注册的插件数量
   * @returns 插件数量
   */
  getModuleCount() {
    return this.moduleList.length;
  }
}
export {
  l as Core
};
