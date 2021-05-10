/*
 * @Date: 2021-04-01 14:42:00
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-10 16:19:48
 * @Description: 市场行情相关接口
 */
import {
	getFollowListXHR,
	getHotListXHR,
	getIncreaseListXHR,
	getDetailXHR,
	getKlineXHR,
	getTrendLineXHR,
} from '@Api/index';
import { BackgroundAsyncMethod, BackgroundCmdMap, BannerItem, TableList, SortData } from '@InterFace/index';
import Store from '@Services/store';
import { CMDS } from '@Const/commands';
import decode from '@Utils/crypto';
import { convertCNUnit } from '@Utils/index';

type SortList<T> = (sort: SortData, list: T[]) => T[];

const convertData = (list: any[], type?: string) =>
	list.map(
		({
			id,
			alias,
			anchor,
			currency,
			turnover_rate,
			price,
			percent_change_utc0,
			pair,
			legal_currency_price,
			volume_24h,
			price_usd,
			price_cny,
			com_id,
			market_id,
			currency_on_market_name,
			currency_on_market_id,
			high_24h,
			low_24h,
			logo,
			project_info,
		}) => ({
			id: type ? currency_on_market_id : id,
			alias,
			anchor,
			currency,
			pair,
			usd: convertCNUnit(price_usd),
			cny: convertCNUnit(legal_currency_price || price_cny),
			percent: percent_change_utc0,
			turnover: turnover_rate.replace('%', ''),
			volume: convertCNUnit(volume_24h),
			com_id,
			market_id,
			symbol: currency_on_market_name,
			high_24h: convertCNUnit(high_24h || 0),
			low_24h: convertCNUnit(low_24h || 0),
			logo,
			project_info,
		}),
	);

// 列表排序
const sortList: SortList<any> = ({ field, sort }, list) => {
	if (!sort) return list;

	if (field === 'currency') {
		return list.sort((a, b) => (sort === 1 ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])));
	}

	return list.sort((a, b) => (sort === 1 ? b[field] - a[field] : a[field] - b[field]));
};

// 关注榜
const getFollowList: BackgroundAsyncMethod = async (sendResponse, { field, sort }) => {
	const { code, timestamp } = decode();

	try {
		const {
			data: { list },
		} = await getFollowListXHR({ code, timestamp });
		const result: TableList[] = sortList({ field, sort }, convertData(list));
		sendResponse(result);
	} catch {
		sendResponse({ code: -1 });
	}
};

// 热搜榜
const getHotList: BackgroundAsyncMethod = async (sendResponse, { field, sort }) => {
	const { code, timestamp } = decode();

	try {
		const {
			data: { list },
		} = await getHotListXHR({ code, timestamp });
		const result: TableList[] = sortList({ field, sort }, convertData(list));
		sendResponse(result);
	} catch {
		sendResponse({ code: -1 });
	}
};

// 涨幅榜
const getIncreaseList: BackgroundAsyncMethod = async (sendResponse, { field, sort }) => {
	const { code, timestamp } = decode();

	try {
		const {
			data: { list },
		} = await getIncreaseListXHR({ code, timestamp });
		const result: TableList[] = sortList({ field, sort }, convertData(list));
		sendResponse(result);
	} catch {
		sendResponse({ code: -1 });
	}
};

// banner
const getBannerData: BackgroundAsyncMethod = async (sendResponse) => {
	const symbols = Store.get('bannerCoin') as number[];
	const { code, timestamp } = decode();

	Promise.all(symbols.map((id) => getDetailXHR({ code, timestamp, currency_on_market_id: id })))
		.then((_) => {
			const result: BannerItem[] = _.map(
				({ data: { alias, anchor, currency, percent_change_utc0, price, pair, legal_currency_price } }, i) => ({
					id: symbols[i],
					alias,
					anchor,
					currency,
					percent: percent_change_utc0,
					pair,
					cny: legal_currency_price,
					usd: price,
				}),
			);

			sendResponse(result);
		})
		.catch(() => {
			sendResponse({ code: -1 });
		});
};

// 自选列表
const getSelfCoinList: BackgroundAsyncMethod = async (sendResponse, data) => {
	const selfCoins = Store.get('selfCoins') as number[];
	const { code, timestamp } = decode();

	if (selfCoins.length === 0) {
		return sendResponse([]);
	}

	Promise.all(selfCoins.map((id) => getDetailXHR({ code, timestamp, currency_on_market_id: id })))
		.then((_) => {
			const result: TableList[] = data
				? sortList(
					data,
					convertData(
						_.map(({ data }) => data),
						'1',
					),
				  )
				: convertData(_.map(({ data }) => data));
			sendResponse(result);
		})
		.catch(() => {
			sendResponse({ code: -1 });
		});
};

// 自定义币种获取详情数据u
const getCustomDetail: BackgroundAsyncMethod = async (sendResponse, data) => {
	const { code, timestamp } = decode();
	const { data: res } = await getDetailXHR({ code, timestamp, currency_on_market_id: data });
	const result = convertData([res])[0];

	sendResponse(result);
};

// k line  ||  折线图
const getKlineData: BackgroundAsyncMethod = async (sendResponse, data: TableList) => {
	const { code, timestamp } = decode();
	const { market_id, com_id, symbol, period, anchor } = data;

	try {
		const {
			data: { kline },
		} = await getKlineXHR({ market_id, com_id, symbol, period, anchor, code, timestamp });

		if (kline.length > 0) {
			sendResponse({ kline, status: 0 });
		} else if (market_id) {
			// 折线图
			const {
				data: {
					kline1: { kline: line },
				},
			} = await getTrendLineXHR({ market_id, code, timestamp, period, trend_anchor: 'USD', com_ids: com_id });
			sendResponse({ kline: line, status: 1 });
		}
	} catch {
		sendResponse({ code: -1 });
	}
};

export default [
	[CMDS.CMD_SELFCOIN, (s, d) => getSelfCoinList(s, d)],
	[CMDS.CMD_FOLLOWLIST, (s, d) => getFollowList(s, d)],
	[CMDS.CMD_HOTLIST, (s, d) => getHotList(s, d)],
	[CMDS.CMD_INCREASELIST, (s, d) => getIncreaseList(s, d)],
	[CMDS.CMD_COINPAGE, (s) => getBannerData(s)],
	[CMDS.CMD_KLINE, (s, d) => getKlineData(s, d)],
	[CMDS.CMD_CUSTOMCOIN, (s, d) => getCustomDetail(s, d)],
] as BackgroundCmdMap;
