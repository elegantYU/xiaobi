/*
 * @Date: 2021-05-12 20:41:16
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-06-16 10:30:15
 * @Description: 轮询store通知，及插件badge轮询
 */
import {
	setBadgeBackground,
	setBadgeText,
	setBadgeTitle,
	createNotify,
	getExtURL,
	getSyncData,
	setSyncData,
	sendMessage,
} from '@Utils/chrome';
import { getDetailXHR } from '@Api/coin';
import { convertCNUnit, formatBadge } from '@Utils/index';
import { BackgroundCmdMap, BackgroundAsyncMethod, BadgeData } from '@InterFace/index';
import { SyncKey } from '@Const/local';
import decode from '@Utils/crypto';
import Saga from '@Utils/saga';
import { CMDS_PAGE, CMDS } from '@Src/constants/commands';

let lastStatus = false; //	上次百分比动态
const LOGO = getExtURL('./static/icons/icon.png');
const defaultSetting = {
	dataType: 'price',
	observe: false,
	viewType: true,
	speed: 5000,
};

// 获取和修改badge 设置
const setBadgeSetting: BackgroundAsyncMethod = async (send, d) => {
	await setSyncData({ [SyncKey.BadgeSetting]: d });
	send(1);
};
const getBadgeSetting: BackgroundAsyncMethod = async (send, d) => {
	const syncData = await getSyncData(SyncKey.BadgeSetting);
	const setting = syncData[SyncKey.BadgeSetting];

	send(setting || defaultSetting);
};

const badgeLoop = async () => {
	const syncData = await getSyncData(SyncKey.Badge);
	const badge = syncData[SyncKey.Badge];

	const { code, timestamp } = decode();
	const { data } = await getDetailXHR({ code, timestamp, currency_on_market_id: badge });

	return data;
};

const badgeSaga = new Saga(badgeLoop);
badgeSaga.time = 3000;
badgeSaga.start(async (data: any) => {
	const d = data?.[0] ?? data;

	if (!d) return;

	const syncData = await getSyncData([SyncKey.Settings, SyncKey.BadgeSetting]);
	const { crease } = syncData[SyncKey.Settings];
	const { dataType, observe, viewType } = syncData[SyncKey.BadgeSetting] || defaultSetting; //	badge配置
	const { percent_change_utc0, price_usd, pair, turnover_rate, alias, market_name, logo } = d;
	const status = percent_change_utc0 > 0;
	const up = crease ? '#c35466' : '#4aaa91';
	const down = crease ? '#4aaa91' : '#c35466';
	const color = status ? up : down;
	const title = `  特殊关注:
  ${pair}    ${convertCNUnit(price_usd).toString()}
  涨跌幅    ${percent_change_utc0}%
  换手率    ${turnover_rate}  `;

	const sendData: BadgeData = {
		logo,
		alias,
		pair,
		price: price_usd,
		percent: percent_change_utc0,
		turnover: turnover_rate,
		market: market_name,
	};
	const tempText = sendData[dataType];
	const realText = formatBadge(tempText, dataType, viewType)?.toString();

	if (observe && lastStatus !== status) {
		lastStatus = status;
		const notifyOpts: chrome.notifications.NotificationOptions = {
			iconUrl: LOGO,
			contextMessage: `${pair} = ${price_usd} USD`,
			message: `特殊关注：${pair} 正在${status ? '上涨' : '下跌'}!`,
			title: `"币"浏览器插件`,
			type: 'basic',
		};

		createNotify(notifyOpts);
	}

	sendMessage({ command: CMDS_PAGE.CMD_GET_BADGE, data: sendData });
	setBadgeBackground(color);
	setBadgeText(realText);
	setBadgeTitle(title);
});

export default [
	[CMDS.CMD_GET_BADGESETTING, (send) => getBadgeSetting(send)],
	[CMDS.CMD_SET_BADGESETTING, (send, d) => setBadgeSetting(send, d)],
] as BackgroundCmdMap;
