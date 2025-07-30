/*
 * @Author: @memo28.repo
 * @Date: 2025-07-28 18:09:51
 * @LastEditTime: 2025-07-28 18:28:21
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/notification/src/plugin/wxCom.ts
 */

import { Base } from './plugin';

type platformWxCom = 'wxcom';

/**
 * 企业微信
 */

export class Wxcom extends Base<platformWxCom> {
    platform: platformWxCom = 'wxcom';

    constructor() {
        super();
    }

}


