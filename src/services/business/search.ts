/*
 * @Date: 2021-04-10 16:01:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-31 09:58:09
 * @Description: 搜索 添加 删除自选
 */
import { getSearchXHR } from '@Api/index';
import { BackgroundAsyncMethod, BackgroundCmdMap, SearchData } from '@InterFace/index';
import { CMDS } from '@Const/commands';
import { SyncKey } from '@Const/local';
import decode from '@Utils/crypto';
import { getSyncData, setSyncData } from '@Utils/chrome';

// 搜索币种
const getSearchData: BackgroundAsyncMethod = async (sendResponse, queryString) => {
	const syncData = await getSyncData(SyncKey.FollowCodes);
	const followCodes = syncData[SyncKey.FollowCodes];
	const { code, timestamp } = decode();

	if (!queryString) {
		return sendResponse('');
	}

	try {
		const {
			data: { pair },
		} = await getSearchXHR({ code, timestamp, queryString });

		const res: SearchData[] = (pair as any[]).map(({ id, logo, marketName, pair, symbol, market_id }) => {
			const active = followCodes.some((c) => c === id);
			return {
				id,
				logo,
				marketName,
				pair,
				symbol,
				active,
				market_id,
			};
		});

		sendResponse(res);
	} catch {
		sendResponse({ code: -1 });
	}
};

// 更改自选
const setSelfCoin: BackgroundAsyncMethod = async (sendResponse, d) => {
	const syncData = await getSyncData(SyncKey.FollowCodes);
	const followCodes = syncData[SyncKey.FollowCodes];

	if (d.active) {
		followCodes.push(d.id);
	} else {
		followCodes.splice(
			followCodes.findIndex((v) => v === d.id),
			1,
		);
	}

	await setSyncData({ [SyncKey.FollowCodes]: followCodes });

	sendResponse('');
};

export default [
	[CMDS.CMD_SEARCH, (s, d) => getSearchData(s, d)],
	[CMDS.CMD_CHANGE_SELFCOIN, (s, d) => setSelfCoin(s, d)],
] as BackgroundCmdMap;
