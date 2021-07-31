/*
 * @Date: 2021-04-10 16:01:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-07-04 15:23:03
 * @Description: 搜索 添加 删除自选
 */
import { getSearchXHR } from '@Api/index';
import { BackgroundAsyncMethod, BackgroundCmdMap, PlatSearchDataType, SearchData } from '@InterFace/index';
import { CMDS } from '@Const/commands';
import { SyncKey } from '@Const/local';
import decode from '@Utils/crypto';
import { getSyncData, setSyncData } from '@Utils/chrome';
import PlatStore, { recurseFetchData } from '../store/platData';

// 搜索币种
const getSearchData: BackgroundAsyncMethod = async (sendResponse, queryString) => {
	const syncData = await getSyncData(null);
	const followCodes = syncData[SyncKey.FollowCodes];
	const platforms = syncData[SyncKey.PlatCode];
	const { code, timestamp } = decode();
	const platList = PlatStore.get();
	const upperQuery = queryString.toUpperCase();

	if (!queryString) {
		return sendResponse('');
	}

	const platSearchRes: PlatSearchDataType = platforms.reduce((obj, { id, name }) => {
		const d = platList[id] as any[];
		const res: SearchData[] = d
			.filter((v) => v.pair.includes(upperQuery))
			.map((v) => {
				const active = followCodes.some((c) => c == v.id);
				return { ...v, active };
			});

		return { ...obj, [name]: res };
	}, {});

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

		platSearchRes.MyToken = res;

		sendResponse(platSearchRes);
	} catch {
		sendResponse(platSearchRes);
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

// 平台币种
const getPlatCoinData: BackgroundAsyncMethod = async (send, data) => {
	await recurseFetchData();
	send(true);
};

export default [
	[CMDS.CMD_SEARCH, (s, d) => getSearchData(s, d)],
	[CMDS.CMD_CHANGE_SELFCOIN, (s, d) => setSelfCoin(s, d)],
	[CMDS.CMD_PLATCOIN, (s, d) => getPlatCoinData(s, d)],
] as BackgroundCmdMap;
