/*
 * @Date: 2021-05-12 13:45:24
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-12 17:01:30
 * @Description: 用户本地币种操作
 */
import { CMDS } from '@Const/commands';
import { sendMessage } from '@Utils/chrome';

// 切换自选
export const changeSelfState = (id: string | number) => sendMessage({ command: CMDS.CMD_TOGGLE_SELF, data: id });

// 切换特殊关注
export const changeFollowState = (id: string | number) => sendMessage({ command: CMDS.CMD_TOGGLE_FOLLOW, data: id });
