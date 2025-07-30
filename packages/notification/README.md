<!--
 * @Author: @memo28.repo
 * @Date: 2025-07-28 17:57:19
 * @LastEditTime: 2025-07-28 17:57:21
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/notification/README.md
-->

graph TD
    A[Core SDK] --> B[Plugin Adapter]
    B --> C[WeCom Plugin]
    B --> D[Lark/Feishu Plugin]
    B --> E[Custom Plugin]
    A --> F[Message Builder]
    A --> G[Token Manager]
    A --> H[Error Handler]
