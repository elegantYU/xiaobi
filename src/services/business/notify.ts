/*
 * @Date: 2021-03-24 21:46:01
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-31 11:23:41
 * @Description: 通知管理
 */
import { BackgroundAsyncMethod, BackgroundCmdMap, NoticeBlockType } from '@InterFace/index';
import { getDetailXHR } from '@Api/index';
import { CMDS } from '@Const/commands';
import { SyncKey } from '@Const/local';
import decode from '@Utils/crypto';
import { setSyncData, getSyncData } from '@Utils/chrome';
import { convertCNUnit } from '@Utils/index';

const getLocalNotify: BackgroundAsyncMethod = async (send) => {
	const syncData = await getSyncData(SyncKey.Notifications);
	const notify = syncData[SyncKey.Notifications];

	const blockList = notify.reduce((arr, item) => {
		const idx = arr.findIndex((v) => v.id === item.id);
		const curr = {
			uid: item.uid,
			rule: item.rule,
			create: item.create,
			type: item.type,
		};
		if (idx === -1) {
			arr.push({
				id: item.id,
				name: item.name,
				market: item.market,
				children: [curr],
			});
		} else {
			arr[idx].children.push(curr);
		}

		return arr;
	}, [] as NoticeBlockType[]);

	send(blockList);
};

const delNotify: BackgroundAsyncMethod = async (send, data) => {
	const syncData = await getSyncData(SyncKey.Notifications);
	const notify = syncData[SyncKey.Notifications];
	const idx = notify.findIndex(({ uid }) => uid === data);

	notify.splice(idx, 1);
	await setSyncData({ [SyncKey.Notifications]: notify });

	send(true);
};

const addNotify: BackgroundAsyncMethod = async (send, data) => {
	const syncData = await getSyncData(SyncKey.Notifications);
	const notify = syncData[SyncKey.Notifications];
	notify.push(data);
	await setSyncData({ [SyncKey.Notifications]: notify });

	send(true);
};

const getSingleInfo: BackgroundAsyncMethod = async (send, d) => {
	const { code, timestamp } = decode();
	const syncData = await getSyncData(SyncKey.Notifications);
	const notify = syncData[SyncKey.Notifications];
	const list = notify.filter((v) => v.id === d).reverse();

	try {
		const {
			data: { alias, anchor, currency, percent_change_utc0, price_usd, pair, legal_currency_price, market_name },
		} = await getDetailXHR({ currency_on_market_id: d, code, timestamp });
		const res = {
			alias,
			anchor,
			currency,
			percent: percent_change_utc0,
			pair,
			cny: convertCNUnit(legal_currency_price),
			usd: convertCNUnit(price_usd),
			market: market_name,
			list,
		};

		send(res);
	} catch {
		send({ list });
	}
};

export default [
	[CMDS.CMD_LOCALNOTICE, (send) => getLocalNotify(send)],
	[CMDS.CMD_DELNOTICE, (send, d) => delNotify(send, d)],
	[CMDS.CMD_ADDNOTICE, (send, d) => addNotify(send, d)],
	[CMDS.CMD_NOTICEINFO, (send, d) => getSingleInfo(send, d)],
] as BackgroundCmdMap;
