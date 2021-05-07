/*
 * @Date: 2021-03-23 14:23:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-22 22:00:08
 * @Description: 从store获取数据
 */
import Store from '@Services/store';
import { BackgroundAsyncMethod, BackgroundCmdMap } from '@InterFace/index';
import { CMDS, CMDS_PAGE } from '@Const/commands';

// store获取Symbols，没有则请求
const getSetting: BackgroundAsyncMethod = async (sendResponse) => {
	const settings = Store.get('settings');

	return sendResponse(settings);
};

// 更新setting配置
const changeSetting: BackgroundAsyncMethod = async (sendResponse, data) => {
	Store.set('settings', { ...data });

	chrome.runtime.sendMessage({ command: CMDS_PAGE.CMD_GET_SETTING, data });
	sendResponse(true);
};

export default [
	[CMDS.CMD_SETTING, (send) => getSetting(send)],
	[CMDS.CMD_CHANGE_SETTING, (send, data) => changeSetting(send, data)],
] as BackgroundCmdMap;
