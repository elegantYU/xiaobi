/*
 * @Date: 2021-04-10 16:01:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-28 22:12:13
 * @Description: 搜索 添加 删除自选
 */
import { getSearchXHR } from '@Api/index';
import { BackgroundAsyncMethod, BackgroundCmdMap, SearchData } from '@InterFace/index';
import Store from '@Services/store';
import { CMDS } from '@Const/commands';
import decode from '@Utils/crypto';

// 搜索币种
const getSearchData: BackgroundAsyncMethod = async (sendResponse, queryString) => {
	const selfCoins = Store.get('selfCoins') as number[];
	const { code, timestamp } = decode();

	if (!queryString) {
		return sendResponse('');
	}

	try {
		const {
			data: { pair },
		} = await getSearchXHR({ code, timestamp, queryString });

		const res: SearchData[] = (pair as any[]).map(({ id, logo, marketName, pair, symbol, market_id }) => {
			const active = selfCoins.some((c) => c === id);
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
	const selfCoins = Store.get('selfCoins') as number[];

	if (d.active) {
		selfCoins.push(d.id);
	} else {
		selfCoins.splice(
			selfCoins.findIndex((v) => v === d.id),
			1,
		);
	}

	Store.set('selfCoins', selfCoins);

	sendResponse('');
};

export default [
	[CMDS.CMD_SEARCH, (s, d) => getSearchData(s, d)],
	[CMDS.CMD_CHANGE_SELFCOIN, (s, d) => setSelfCoin(s, d)],
] as BackgroundCmdMap;
