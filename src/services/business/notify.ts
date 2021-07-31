/*
 * @Date: 2021-03-24 21:46:01
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-06-17 21:42:24
 * @Description: 通知管理
 */
import { BackgroundAsyncMethod, BackgroundCmdMap, NoticeBlockType } from '@InterFace/index';
import { getDetailXHR } from '@Api/index';
import { CMDS } from '@Const/commands';
import { SyncKey } from '@Const/local';
import decode from '@Utils/crypto';
import { setSyncData, getSyncData, getExtURL, createNotify } from '@Utils/chrome';
import { convertCNUnit, isWindows } from '@Utils/index';
import Observer from '@Services/store';
import Saga from '@Utils/saga';

const LOGO = getExtURL('./static/icons/icon.png');

const loopFn = async (id: string) => {
	const { code, timestamp } = decode();
	return getDetailXHR({ code, timestamp, currency_on_market_id: id });
};
// 创建通知
export const createCoinNotify = (id: string) => {
	const noticeSaga = new Saga(() => loopFn(id));
	noticeSaga.start(async (data) => {
		const d = data?.[0] ?? data;

		if (!d) return;

		const syncData = await getSyncData(SyncKey.Notifications);
		const notices = syncData[SyncKey.Notifications];
		const { currency_on_market_id, logo, price_usd, symbol, pair, alias, market_name } = d;
		const currentLists = notices.filter(({ id }) => id == currency_on_market_id);
		const isWin = isWindows();

		currentLists.forEach((current) => {
			const { uid, rule, type, sound, compare, ignore } = current;
			const ctxMsg = `${pair} = ${price_usd} USD`;
			const msg = `通知规则：价格${compare ? '大于' : '小于'} ${rule}`;

			const options: chrome.notifications.NotificationOptions = {
				iconUrl: LOGO,
				contextMessage: isWin ? msg : ctxMsg,
				message: isWin ? ctxMsg : msg,
				title: `"币"浏览器插件`,
				type: 'basic',
			};

			if (!ignore) {
				let title;
				if (compare && price_usd > rule) {
					title = `${symbol} 正在上涨`;
				}
				if (!compare && price_usd < rule) {
					title = `${symbol} 正在上涨`;
				}
				if ((compare && price_usd > rule) || (!compare && price_usd < rule)) {
					options.title = title;
					createNotify(options);
					const newList = notices.map((v) => (v.uid === uid ? { ...v, ignore: true } : { ...v }));

					setSyncData({ [SyncKey.Notifications]: newList });
				}
			} else if ((compare && price_usd < rule) || (!compare && price_usd > rule)) {
				// 已通知过(上涨、下跌) 若价格(下跌、上涨) 则再次启用通知，等待下次价格变化
				const newList = notices.map((v) => (v.uid === uid ? { ...v, ignore: false } : { ...v }));

				setSyncData({ [SyncKey.Notifications]: newList });
			}
		});
	});

	return noticeSaga;
};

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

	//	取消订阅
	Observer.remove(data);

	send(true);
};

const addNotify: BackgroundAsyncMethod = async (send, data) => {
	const syncData = await getSyncData(SyncKey.Notifications);
	const notify = syncData[SyncKey.Notifications];
	notify.push(data);
	await setSyncData({ [SyncKey.Notifications]: notify });

	// 订阅通知
	Observer.add(data.id, createCoinNotify(data.id));

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
