/*
 * @Date: 2021-05-12 20:41:16
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-27 14:44:40
 * @Description: 轮询store通知，及插件badge轮询
 */
import Store from '@Services/store';
import { setBadgeBackground, setBadgeText, setBadgeTitle, createNotify, getExtURL } from '@Utils/chrome';
import { getDetailXHR } from '@Api/coin';
import { convertCNUnit, uniqueData, formatBadge } from '@Utils/index';
import decode from '@Utils/crypto';
import Saga from '@Utils/saga';

const delay = Store.get('noticeDelay');
const LOGO = getExtURL('./static/icons/icon.png');

const badgeLoop = async () => {
	const id = Store.get('follow');
	const { code, timestamp } = decode();
	const { data } = await getDetailXHR({ code, timestamp, currency_on_market_id: id });

	return data;
};

const badgeSaga = new Saga(badgeLoop);
badgeSaga.start((data: any) => {
	const d = data?.[0] ?? data;

	if (!d) return;

	const { crease } = Store.get('settings');
	const { percent_change_utc0, price_usd, pair } = d;
	const status = percent_change_utc0 > 0;
	const up = crease ? '#c35466' : '#4aaa91';
	const down = crease ? '#4aaa91' : '#c35466';
	const color = status ? up : down;
	const title = `  特殊关注:
  ${pair}    ${convertCNUnit(price_usd).toString()}  `;

	setBadgeBackground(color);
	setBadgeText(formatBadge(price_usd));
	setBadgeTitle(title);
}, delay);

const noticeLoop = async () => {
	const { code, timestamp } = decode();
	const notices = Store.get('notifications');

	if (notices.length === 0) return false;

	const list = uniqueData(notices, 'id');
	return Promise.all(list.map((v) => getDetailXHR({ code, timestamp, currency_on_market_id: v.id })));
};

const noticeSaga = new Saga(noticeLoop);
noticeSaga.start((data: any) => {
	const d = data?.[0] ?? data;

	if (!d) return;
	const notices = Store.get('notifications');

	(d as any[]).forEach(
		({ data: { currency_on_market_id, logo, price_usd, price_display_cny, symbol, pair, alias, market_name } }) => {
			const currentLists = notices.filter(({ id }) => id == currency_on_market_id);

			if (currentLists.length === 0) return;

			currentLists.forEach((current) => {
				const { uid, rule, type, sound, compare, ignore } = current;
				const options: chrome.notifications.NotificationOptions = {
					iconUrl: LOGO,
					// imageUrl: logo,
					contextMessage: `${pair} = ${price_usd} USD`,
					message: `通知规则：价格${compare ? '大于' : '小于'} ${rule}`,
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
						Store.set('notifications', newList);
					}
				} else if ((compare && price_usd < rule) || (!compare && price_usd > rule)) {
					// 已通知过(上涨、下跌) 若价格(下跌、上涨) 则再次启用通知，等待下次价格变化
					const newList = notices.map((v) => (v.uid === uid ? { ...v, ignore: false } : { ...v }));
					Store.set('notifications', newList);
				}
			});
		},
	);
}, delay);
