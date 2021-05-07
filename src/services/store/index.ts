/*
 * @Date: 2021-03-23 10:55:46
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-10 16:56:38
 * @Description: 缓存本地数据
 */
import { DefaultObject } from '@InterFace/index';

interface StoreType {
	bannerCoin: Array<number>;
	selfCoins: Array<any>;
	notifications: Array<any>;
	get: (key: string) => any;
	set: (key: string, value: any) => void;
	[key: string]: Array<any> | Function | DefaultObject;
}

const Store: StoreType = {
	bannerCoin: [6306516, 1334942, 821701822, 821698840], //	banner coin
	selfCoins: [], //	自选币
	notifications: [], //	通知管理
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
		} else if (Object.keys(value).length) {
			this[key] = { ...value };
		} else {
			this[key] = value;
		}
	},
};

export default Store;
