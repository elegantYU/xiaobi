import { DefaultObject } from '@InterFace/index';
import { dark, light, lightReverse, darkReverse } from '@Styles/theme';
import { getManifest } from './chrome';

type MatchCoinData<T, P extends keyof T> = (keys: string[], list: T[], key: P) => T[];

type UniqueData<T, P extends keyof T> = (arr: T[], key: P) => T[];

type ConvertCNUnit = (origin: string | number) => string | number;

// 币种过滤
export const coinTypeFilter = (s: string) => {
	const coinTypeReg = /(.*)(usdt|btc|husd|eth|ht|alts)$/;
	const valid = coinTypeReg.exec(s);

	return valid;
};

// 科学计数方式转正常
export const convertNumber: (num: number) => string | number = (num) => {
	if (Number.isNaN(num)) {
		return '';
	}

	const str = `${num}`;
	if (!/e/i.test(str)) {
		return num;
	}

	return num.toFixed(18).replace(/\.?0+$/, '');
};
// 传入一个对象数组及判断的属性名，返回去重数据
export const uniqueData: UniqueData<any, any> = (arr, key) => [
	...arr
		.reduce((map, item) => {
			if (!map.has(item[key])) {
				map.set(item[key], item);
			}
			return map;
		}, new Map())
		.values(),
];

// 中文单位数据换算
export const convertCNUnit: ConvertCNUnit = (origin) => {
	const ori = Number(origin);

	if (ori < 1) {
		return Number(ori.toFixed(10));
	}
	if (ori < 10) {
		return Number(ori.toFixed(6));
	}
	if (ori < 1000) {
		return Number(ori.toFixed(4));
	}
	if (ori < 1000000) {
		return Number(ori.toFixed(2));
	}
	if (ori < 100000000) {
		return `${Number((ori / 10000).toFixed(2))}万`;
	}
	return `${Number((ori / 100000000).toFixed(2))}亿`;
};

// 获取主题
export const matchTheme = ({ theme, crease }: DefaultObject) => {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (!theme) {
		return crease ? light : lightReverse;
	}
	if (theme === 1) {
		return crease ? dark : darkReverse;
	}

	return isDark ? (crease ? dark : darkReverse) : crease ? light : lightReverse;
};

// 时间转换
export const formatTime = (ts: number | string, cFormat?: string) => {
	if (typeof ts === 'string' && /^\d+$/.test(ts)) {
		ts = Number.parseInt(ts, 10);
	}
	if (typeof ts === 'number' && ts.toString().length === 10) {
		ts *= 1000;
	}

	const date = new Date(ts);

	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
	const formatObj: DefaultObject = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	};
	const time_str = format.replace(/{([adhimsy])+}/g, (_result, key) => {
		const value = formatObj[key];
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value];
		}
		return value.toString().padStart(2, '0');
	});
	return time_str;
};

// 获取数组指定字段最大值
export const findArrMax = (arr: any[], field: string) => {
	const temp = arr.slice(0);
	const result = temp.sort((a, b) => b[field] - a[field]);
	const max = +result[0][field];
	const min = +result[result.length - 1][field];

	return {
		max,
		min,
	};
};

// 获取query参数

export const getLocationQuery: (s: string) => DefaultObject = (search) =>
	[...new URLSearchParams(search.split('?')[1]).entries()].reduce(
		(kvs, [k, v]) => ({
			...kvs,
			[k]: v,
		}),
		{},
	);

// 比较是否需要更新公告
export const checkUpdate = () => {
	const { version } = getManifest();
	const res = localStorage.getItem(`version${version}`);

	return !!res;
};

//	控制body的zoom
export const changeViewPort = (multiple: number) => {
	const map = ['0.9', '1', '1.1', '1.2'];
	const res = map[multiple];

	document.body.style.zoom = res;
};
