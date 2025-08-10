import { MessageBuilder } from "../message/builder";
import { NotificationPlugin } from "../plugin/plugin";
export declare class Core {
    moduleList: NotificationPlugin[];
    registerModule(module: NotificationPlugin): void;
    getModuleList(): NotificationPlugin[];
    private checkModule;
    seed(messageBuilder: MessageBuilder): this;
}
//# sourceMappingURL=core.d.ts.map