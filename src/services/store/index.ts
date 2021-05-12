/*
 * @Date: 2021-03-23 10:55:46
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-12 21:42:34
 * @Description: 缓存本地数据
 */
import { DefaultObject, NoticeType } from '@InterFace/index';

type Params = 'bannerCoin' | 'selfCoins' | 'notifications' | 'follow' | 'settings' | 'noticeDelay';

interface StoreType {
	bannerCoin: Array<number>;
	selfCoins: Array<any>;
	notifications: Array<NoticeType>;
	get: (key: Params) => any;
	set: (key: Params, value: any) => void;
	[key: string]: Array<any> | DefaultObject | string | number;
}

const Store: StoreType = {
	bannerCoin: [6306516, 1334942, 821701822, 821698840], //	banner coin
	selfCoins: [], //	自选币
	follow: '6306516', //	特殊关注
	notifications: [], //	通知管理
	noticeDelay: 5000, //	通知间隔
	settings: {
		theme: 0, //	0 浅 1 深 2 跟随
		crease: 1, // 0 绿涨 1 红涨
		nav: 1, //	0 icon 1 text
	},
	searchRecord: [], //	搜索记录
	get(key: string) {
		return this[key];
	},
	set(key, value) {
		if (Array.isArray(value)) {
			this[key] = [...value];
		} else if (Object.keys(value).length > 0) {
			this[key] = { ...value };
		} else {
			this[key] = value;
		}
	},
};

export default Store;
