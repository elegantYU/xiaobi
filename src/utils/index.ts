import { DefaultObject } from '@InterFace/index';
import { dark, light, lightReverse, darkReverse } from '@Styles/theme';
import { getManifest } from './chrome';
import { getStorage } from './localStorage';

declare const InstallTrigger: any;

type UniqueData<T, P extends keyof T> = (arr: T[], key: P) => T[];

type ConvertCNUnit = (origin: string | number) => string | number;

type AccuracyData = (num: string | number, bit: number) => string;

// 判断是什么浏览器
export const isFireFox = typeof InstallTrigger !== 'undefined';
export const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
// 判断操作系统
export const isWindows = () => {
	const agent = navigator.userAgent.toLowerCase();
	const version = ['win32', 'win64', 'wow32', 'wow64'];

	return version.some((v) => agent.includes(v));
};

// 数据完整且保留精度
export const accuracyData: AccuracyData = (num, bit) => {
	const n = +num;
	const m = 10 ** bit;

	return (Math.floor(n * m) / m).toFixed(bit);
};

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
	const ruleMap: [number, (n: number) => string | number][] = [
		[1, (n) => convertNumber(Number(accuracyData(n, 10)))],
		[10, (n) => convertNumber(Number(accuracyData(n, 6)))],
		[1000, (n) => convertNumber(Number(accuracyData(n, 4)))],
		[1000000, (n) => convertNumber(Number(accuracyData(n, 2)))],
		[100000000, (n) => `${Number(accuracyData(n / 10000, 2))}万`],
	];

	const current = ruleMap.find(([r]) => ori < r);

	if (current) {
		return current[1](ori);
	}

	return `${Number(accuracyData(ori / 100000000, 2))}亿`;
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

export const getLocationQuery: (s: string, k: string) => string = (search, key) =>
	new URLSearchParams(search.split('?')[1])?.get(key) ?? '';

// 比较是否需要更新公告
export const checkUpdate = () => {
	const { version } = getManifest();
	const res = getStorage(`version${version}`);

	return !!res;
};

//	控制body的zoom
export const changeViewPort = (multiple: number) => {
	const map = [0.9, 1, 1.1, 1.2];
	const res = map[multiple];
	const width = 500;
	const height = 500;

	if (isFireFox) {
		document.body.style.width = `${width * res}px`;
		document.body.style.height = `${height * res}px`;
		document.body.style.transform = `scale(${res}, ${res})`;
		document.body.style.transformOrigin = 'left top';
	} else {
		document.body.style.zoom = res.toString();
	}
};

const sliceStr = (n: string | number, l: number) => n.toString().slice(0, l);

// badge单位
export const formatBadge = (num: number | string, key: string, type: boolean) => {
	if (key === 'price') {
		if (!type) return sliceStr(num, 4);

		const rulesMap: [number, (n: number | string) => string][] = [
			[1, (n) => accuracyData(n, 3)],
			[10, (n) => accuracyData(n, 2)],
			[100, (n) => accuracyData(n, 1)],
			[10000, (n) => `${accuracyData(+n / 1000, 1)}k`],
			[100000, (n) => `${accuracyData(+n / 1000, 0)}k`],
			[1000000, (n) => `${accuracyData(+n / 10000, 1)}w`],
			[10000000, (n) => `${accuracyData(+n / 10000, 0)}w`],
		];

		const current = rulesMap.find(([r]) => num < r);
		if (current) {
			return current[1](num);
		}

		return '';
	}

	const str = sliceStr(num.toString().replace(/-|%/g, ''), 3);

	if (!type) return `${str}%`;

	return `${str}%`;
};

// 拼接交易所地址
export const composeLink: (c: any, a: number) => string = ({ market_name, currency, anchor }, id) => {
	const lowerCurrency = currency.toLowerCase();
	const lowerAnchor = anchor.toLowerCase();

	const marketMap: { [key: string]: string } = {
		'Huobi Korea': `https://www.hb.co.kr/zh-cn/exchange/${lowerCurrency}_${lowerAnchor}`,
		'Huobi Global': `https://www.huobi.com/zh-cn/exchange/${lowerCurrency}_${lowerAnchor}`,
		'Gate.io': `https://www.gate.io/trade/${currency}_${anchor}`,
		BCEX: `https://www.bcex.online/trade/${lowerCurrency}_${lowerAnchor}`,
		Liquid: `https://app.liquid.com/exchange/${currency}${anchor}`,
		Bitfinex: `https://trading.bitfinex.com/t/${currency}:${anchor}?type=exchange`,
		'Binance JEX': 'https://www.jex.com/cn/spot',
		SouthXchange: `https://main.southxchange.com/Market/Book/${currency}/${anchor}`,
		Binance: `https://www.binance.com/zh-CN/trade/${currency}_${anchor}?layout=pro&type=spot`,
		CoinEx: `https://www.coinex.com/info/${currency}`,
		BitZ: `https://www.bitz.com/exchange/${lowerCurrency}_${lowerAnchor}`,
		Kraken: `https://www.kraken.com/prices/${lowerCurrency}-bitcoin-price-chart/eur-euro?interval=1m`,
	};

	const mytokenLink = `https://www.mytokencap.com/currency/${currency}/${id}`;

	return marketMap[market_name] ?? mytokenLink;
};
