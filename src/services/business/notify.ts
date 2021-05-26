/*
 * @Date: 2021-03-24 21:46:01
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-18 15:40:48
 * @Description: 通知管理
 */
import { BackgroundAsyncMethod, BackgroundCmdMap, NoticeType, NoticeBlockType } from '@InterFace/index';
import { getDetailXHR } from '@Api/index';
import { CMDS } from '@Const/commands';
import decode from '@Utils/crypto';
import { uniqueData, convertCNUnit } from '@Utils/index';
import Store from '../store';

const getLocalNotify: BackgroundAsyncMethod = async (send) => {
	// const { code, timestamp } = decode();
	const notify = Store.get('notifications');
	// const list = uniqueData(notify, 'id');

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
	const notify = Store.get('notifications');
	const idx = notify.findIndex(({ uid }) => uid === data);

	notify.splice(idx, 1);
	Store.set('notifications', notify);

	send(true);
};

const addNotify: BackgroundAsyncMethod = async (send, data) => {
	const notify = Store.get('notifications');
	notify.push(data);
	Store.set('notifications', notify);

	send(true);
};

const getSingleInfo: BackgroundAsyncMethod = async (send, d) => {
	const { code, timestamp } = decode();
	const notify = Store.get('notifications');
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
