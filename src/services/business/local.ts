/*
 * @Date: 2021-03-23 14:23:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-28 11:01:39
 * @Description: 从store获取数据
 */
import { BackgroundAsyncMethod, BackgroundCmdMap } from '@InterFace/index';
import { CMDS, CMDS_PAGE } from '@Const/commands';
import { SyncKey } from '@Const/local';
import { sendMessage, getSyncData, setSyncData } from '@Utils/chrome';

// store获取Symbols，没有则请求
const getSetting: BackgroundAsyncMethod = async (sendResponse) => {
	const settings = await getSyncData(SyncKey.Settings);

	return sendResponse(settings);
};

// 更新setting配置
const changeSetting: BackgroundAsyncMethod = async (sendResponse, data) => {
	const params = {
		[SyncKey.Settings]: data,
	};
	await setSyncData(params);

	sendMessage({ command: CMDS_PAGE.CMD_GET_SETTING, data });
	sendResponse(true);
};

// 获取币种状态
const getCoinState: BackgroundAsyncMethod = async (send, id) => {
	const followCodes = (await getSyncData(SyncKey.FollowCodes)) as any[];
	const badge = await getSyncData(SyncKey.Badge);
	const notices = (await getSyncData(SyncKey.Notifications)) as any[];

	const res = {
		self: followCodes.some((d) => d == id),
		follow: badge == id,
		notice: notices.some((d) => d.id == id),
	};

	send(res);
};

// 根据id判断是否是自选
const changeSelf: BackgroundAsyncMethod = async (send, id) => {
	const followCodes = (await getSyncData(SyncKey.FollowCodes)) as any[];
	const idx = followCodes.findIndex((d) => d == id);

	if (idx !== -1) {
		followCodes.splice(idx, 1);
	} else {
		followCodes.push(id);
	}

	await setSyncData({ [SyncKey.FollowCodes]: followCodes });

	send(true);
};
// 直接替换特殊关注
const changeFollow: BackgroundAsyncMethod = async (send, id) => {
	const badge = await getSyncData(SyncKey.Badge);
	const res = badge == id ? '6306516' : id;

	await setSyncData({ [SyncKey.Badge]: res });

	send(true);
};

export default [
	[CMDS.CMD_SETTING, (send) => getSetting(send)],
	[CMDS.CMD_CHANGE_SETTING, (send, data) => changeSetting(send, data)],
	[CMDS.CMD_COINTSTATE, (send, data) => getCoinState(send, data)],
	[CMDS.CMD_TOGGLE_SELF, (send, id) => changeSelf(send, id)],
	[CMDS.CMD_TOGGLE_FOLLOW, (send, id) => changeFollow(send, id)],
] as BackgroundCmdMap;
