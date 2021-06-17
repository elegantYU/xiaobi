/*
 * @Date: 2021-03-23 14:23:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-06-16 15:50:09
 * @Description: 从store获取数据
 */
import { BackgroundAsyncMethod, BackgroundCmdMap } from '@InterFace/index';
import { CMDS, CMDS_PAGE } from '@Const/commands';
import { SyncKey } from '@Const/local';
import { sendMessage, getSyncData, setSyncData } from '@Utils/chrome';

// store获取Symbols，没有则请求
const getSetting: BackgroundAsyncMethod = async (sendResponse) => {
	const syncData = await getSyncData(SyncKey.Settings);

	return sendResponse(syncData[SyncKey.Settings]);
};

// 更新setting配置
const changeSetting: BackgroundAsyncMethod = async (sendResponse, data) => {
	await setSyncData({ [SyncKey.Settings]: data });

	sendMessage({ command: CMDS_PAGE.CMD_GET_SETTING, data });
	sendResponse(true);
};

// 获取币种状态
const getCoinState: BackgroundAsyncMethod = async (send, id) => {
	const syncData = await getSyncData([SyncKey.FollowCodes, SyncKey.Badge, SyncKey.Notifications]);
	const followCodes = syncData[SyncKey.FollowCodes];
	const badge = syncData[SyncKey.Badge];
	const notices = syncData[SyncKey.Notifications];

	const res = {
		self: followCodes.some((d) => d == id),
		follow: badge == id,
		notice: notices.some((d) => d.id == id),
	};

	send(res);
};

// 根据id判断是否是自选
const changeSelf: BackgroundAsyncMethod = async (send, id) => {
	const syncData = await getSyncData(SyncKey.FollowCodes);
	const followCodes = syncData[SyncKey.FollowCodes];
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
	const res = badge[SyncKey.Badge] == id ? '6306516' : id;

	await setSyncData({ [SyncKey.Badge]: res });

	send(true);
};

// 下载配置
const downloadData: BackgroundAsyncMethod = async (send) => {
	const syncData = await getSyncData(null);
	send(JSON.stringify(syncData));
};
const uploadData: BackgroundAsyncMethod = async (send, data) => {
	await setSyncData(data);
	send(true);
};

export default [
	[CMDS.CMD_SETTING, (send) => getSetting(send)],
	[CMDS.CMD_CHANGE_SETTING, (send, data) => changeSetting(send, data)],
	[CMDS.CMD_COINTSTATE, (send, data) => getCoinState(send, data)],
	[CMDS.CMD_TOGGLE_SELF, (send, id) => changeSelf(send, id)],
	[CMDS.CMD_TOGGLE_FOLLOW, (send, id) => changeFollow(send, id)],
	[CMDS.CMD_DOWNLOAD_CONFIG, (send) => downloadData(send)],
	[CMDS.CMD_UPLOAD_CONFIG, (send, d) => uploadData(send, d)],
] as BackgroundCmdMap;
