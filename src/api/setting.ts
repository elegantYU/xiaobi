/*
 * @Date: 2021-04-07 15:43:44
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-06-02 10:09:40
 * @Description: 组件内请求
 */
import { CMDS } from '@Const/commands';
import { sendMessage } from '@Utils/chrome';
import { DefaultObject } from '@InterFace/index';

interface SelfChange {
	id: number;
	active: boolean;
}

// 修改配置
export const setSettingSM = (data: DefaultObject) => sendMessage({ command: CMDS.CMD_CHANGE_SETTING, data });

export const setSelfCoinSM = (data: SelfChange) => sendMessage({ command: CMDS.CMD_CHANGE_SELFCOIN, data });

// badge 配置
export const setBadgeSettingSM = (data: any) => sendMessage({ command: CMDS.CMD_SET_BADGESETTING, data });
