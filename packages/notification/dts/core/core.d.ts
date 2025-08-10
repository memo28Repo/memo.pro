import { MessageBuilder } from "../message/builder";
import { NotificationPlugin } from "../plugin/plugin";
/**
 * 通知系统核心类
 * 负责管理通知插件和消息分发
 */
export declare class Core {
    /**
     * 注册的插件列表
     * @private
     */
    moduleList: NotificationPlugin[];
    /**
     * 注册通知插件
     * @param modules - 单个插件或插件数组
     * @returns 返回当前实例，支持链式调用
     */
    registerModule(modules: NotificationPlugin | NotificationPlugin[]): this;
    /**
     * 获取已注册的插件列表
     * @returns 插件列表
     */
    getModuleList(): NotificationPlugin[];
    /**
     * 检查插件配置是否完整
     * @param module - 要检查的插件
     * @returns [是否通过检查, 错误信息]
     * @private
     */
    private checkModule;
    /**
     * 为所有注册的插件设置消息构建器
     * @param messageBuilder - 消息构建器实例
     * @returns 返回当前实例，支持链式调用
     */
    seed(messageBuilder: MessageBuilder): this;
    /**
     * 发送消息到所有注册的插件
     * @returns Promise<boolean[]> 每个插件的发送结果
     */
    sendAll(): Promise<boolean[]>;
    /**
     * 清空所有注册的插件
     * @returns 返回当前实例，支持链式调用
     */
    clearModules(): this;
    /**
     * 获取注册的插件数量
     * @returns 插件数量
     */
    getModuleCount(): number;
}
//# sourceMappingURL=core.d.ts.map