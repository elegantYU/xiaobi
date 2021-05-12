/*
 * @Date: 2021-03-23 14:23:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-12 21:42:25
 * @Description: 从store获取数据
 */
import Store from '@Services/store';
import { BackgroundAsyncMethod, BackgroundCmdMap, NoticeType } from '@InterFace/index';
import { CMDS, CMDS_PAGE } from '@Const/commands';
import { sendMessage } from '@Utils/chrome';

// store获取Symbols，没有则请求
const getSetting: BackgroundAsyncMethod = async (sendResponse) => {
	const settings = Store.get('settings');

	return sendResponse(settings);
};

// 更新setting配置
const changeSetting: BackgroundAsyncMethod = async (sendResponse, data) => {
	Store.set('settings', { ...data });

	sendMessage({ command: CMDS_PAGE.CMD_GET_SETTING, data });
	sendResponse(true);
};

// 获取币种状态
const getCoinState: BackgroundAsyncMethod = async (send, id) => {
	const selfCoins = Store.get('selfCoins') as string[];
	const follow = Store.get('follow');
	const notices = Store.get('notifications') as NoticeType[];

	const res = {
		self: selfCoins.some((d) => d == id),
		follow: follow == id,
		notice: notices.some((d) => d.id == id),
	};

	send(res);
};

// 根据id判断是否是自选
const changeSelf: BackgroundAsyncMethod = async (send, id) => {
	const selfCoins = Store.get('selfCoins') as string[];
	const idx = selfCoins.findIndex((d) => d == id);

	if (idx !== -1) {
		selfCoins.splice(idx, 1);
	} else {
		selfCoins.push(id);
	}

	Store.set('selfCoins', selfCoins);

	send(true);
};
// 直接替换特殊关注
const changeFollow: BackgroundAsyncMethod = async (send, id) => {
	const follow = Store.get('follow');
	const res = follow === id ? '6306516' : id;

	Store.set('follow', res);

	send(true);
};

export default [
	[CMDS.CMD_SETTING, (send) => getSetting(send)],
	[CMDS.CMD_CHANGE_SETTING, (send, data) => changeSetting(send, data)],
	[CMDS.CMD_COINTSTATE, (send, data) => getCoinState(send, data)],
	[CMDS.CMD_TOGGLE_SELF, (send, id) => changeSelf(send, id)],
	[CMDS.CMD_TOGGLE_FOLLOW, (send, id) => changeFollow(send, id)],
] as BackgroundCmdMap;
