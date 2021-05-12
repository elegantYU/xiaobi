/*
 * @Date: 2021-05-12 20:41:16
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-12 23:14:49
 * @Description: 轮询store通知，及插件badge轮询
 */
import Store from '@Services/store';
import { setBadgeBackground, setBadgeText, createNotify } from '@Utils/chrome';
import { getDetailXHR } from '@Api/coin';
import { convertCNUnit, uniqueData } from '@Utils/index';
import decode from '@Utils/crypto';
import Saga from '@Utils/saga';

const delay = Store.get('noticeDelay');

const badgeLoop = async () => {
	const id = Store.get('follow');
	const { code, timestamp } = decode();
	const { data } = await getDetailXHR({ code, timestamp, currency_on_market_id: id });

	return data;
};

const noticeLoop = async () => {
	const notices = Store.get('notifications');

	if (notices.length === 0) return false;

	const list = uniqueData(notices, 'id');
	return Promise.all(list.map((v) => getDetailXHR(v.id)));
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

const noticeSaga = new (Saga as any)(noticeLoop);
noticeSaga.start((d: any) => {
	if (!d) return;
	console.log('object');
}, delay);
