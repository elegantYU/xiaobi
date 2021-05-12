/*
 * @Date: 2021-04-07 15:43:44
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-12 13:44:56
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
