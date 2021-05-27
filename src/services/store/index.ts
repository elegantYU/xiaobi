/*
 * @Date: 2021-03-23 10:55:46
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-27 09:10:41
 * @Description: 缓存本地数据
 */
import { NoticeType } from '@InterFace/index';

interface StoreType {
	bannerCoin: number[];
	selfCoins: string[];
	notifications: NoticeType[];
	follow: string;
	noticeDelay: number;
	searchRecord: string[];
	settings: {
		theme: 0 | 1 | 2;
		crease: 0 | 1;
		nav: 0 | 1;
		viewport: 0 | 1 | 2 | 3;
	};
	get<K extends keyof StoreType>(key: K): StoreType[K];
	set<K extends keyof StoreType>(key: K, value: StoreType[K]): void;
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
		viewport: 1, //	默认 [0,1,2,3] => [0.9, 1, 1.1, 1.2]
	},
	searchRecord: [], //	搜索记录
	get(key) {
		return this[key];
	},
	set(key, value) {
		this[key] = value;
	},
};

export default Store;
