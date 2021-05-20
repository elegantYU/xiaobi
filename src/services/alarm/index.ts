/*
 * @Date: 2021-05-12 20:41:16
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-20 22:39:14
 * @Description: 轮询store通知，及插件badge轮询
 */
import Store from '@Services/store';
import { setBadgeBackground, setBadgeText, createNotify, getExtURL } from '@Utils/chrome';
import { getDetailXHR } from '@Api/coin';
import { convertCNUnit, uniqueData } from '@Utils/index';
import decode from '@Utils/crypto';
import Saga from '@Utils/saga';
import { NoticeType } from '@InterFace/index';

const delay = Store.get('noticeDelay');
const LOGO = getExtURL('./static/icons/icon.png');

const badgeLoop = async () => {
	const id = Store.get('follow');
	const { code, timestamp } = decode();
	const { data } = await getDetailXHR({ code, timestamp, currency_on_market_id: id });

	return data;
};

const badgeSaga = new (Saga as any)(badgeLoop);
badgeSaga.start((d: any) => {
	if (!d) return;

	const { crease } = Store.get('settings');
	const { percent_change_utc0, price_usd } = d;
	const status = percent_change_utc0 > 0;
	const up = crease ? '#c35466' : '#4aaa91';
	const down = crease ? '#4aaa91' : '#c35466';
	const color = status ? up : down;

	setBadgeBackground(color);
	setBadgeText(convertCNUnit(price_usd).toString());
}, delay);

const noticeLoop = async () => {
	const { code, timestamp } = decode();
	const notices = Store.get('notifications') as any[];

	if (notices.length === 0) return false;

	const list = uniqueData(notices, 'id');
	return Promise.all(list.map((v) => getDetailXHR({ code, timestamp, currency_on_market_id: v.id })));
};

const noticeSaga = new (Saga as any)(noticeLoop);
noticeSaga.start((d: any) => {
	if (!d) return;
	const notices = Store.get('notifications') as NoticeType[];

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
					message: '',
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
