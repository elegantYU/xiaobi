// 基础类型
export interface DefaultObject {
	[key: string]: any;
}

// ——————————————
// banner background 返回数据
export interface BannerItem {
	id?: number;
	alias: string;
	anchor: string;
	currency: string;
	percent: number;
	pair: string;
	cny: number | string;
	usd: number | string;
}

// table list 数据
export interface TableList extends BannerItem {
	turnover?: string;
	volume?: string | number;
	market_id?: string;
	com_id?: string;
	symbol?: string;
	high_24h?: string | number;
	low_24h?: string | number;
	logo?: string;
	[key: string]: any;
}

// 首页tab数据格式
export interface TabItem {
	command: string;
	name: string;
	active: boolean;
}
// 新闻数据tab格式
export interface NewsTabItem {
	command: string | number;
	name: string;
	active: boolean;
	params: DefaultObject;
}

// 快讯数据格式
export interface NewsData {
	id: string;
	title: string;
	content?: string;
	origin: string;
	time: string;
	grade: number;
	images?: any[];
	upCount?: number;
	downCount?: number;
	commentCount?: number;
	link: string;
	attribute?: string; //	置顶
}

// 大事件快讯
export interface NewsEventData {
	id: string;
	time: string;
	title: string;
	author?: string;
	link: string;
}

// 单个基金相关资讯

export interface CoinNewsData {
	avatar: string;
	title: string;
	content?: string;
	time: string;
	link: string;
}

// 搜索结果数据
export interface SearchData {
	id: number;
	logo?: string;
	marketName: string;
	pair: string;
	active: boolean;
	symbol: string;
	market_id?: number;
	[key: string]: any;
}

// store 保存通知数据格式
export interface NoticeType {
	id: string;
	uid: string;
	name: string;
	type: 'price' | 'turnover' | string;
	rule: number | string;
	create: number | string;
	market: string;
	sound?: boolean;
	compare?: boolean; //	大于还是小于关系 true > false <
	ignore?: boolean; //	取消提醒
}

// 格式化后Notice数组
export interface NoticeBlockType {
	id: string;
	name: string;
	market: string;
	price?: string | number;
	children: Array<{
		uid: string;
		type: 'price' | 'turnover' | string;
		rule: number | string;
		sound?: boolean;
		create: number | string;
	}>;
}

// 排序格式
export interface SortData {
	field: 'currency' | 'volume' | 'usd' | 'turnover' | 'percent' | string;
	sort: 0 | 1 | 2 | number;
}

// badge send to popup
export interface BadgeData {
	alias: string;
	pair: string;
	price: number;
	percent: number;
	turnover: string;
	market: string;
	logo?: string;
}

// background sendResponse
export type BackgroundAsyncMethod = (sendResponse: (arg?: any) => void, data?: any) => Promise<any>;
// background export map
export type BackgroundCmdMap = [string, BackgroundAsyncMethod][];

// 页面监听指令
export type PageAsyncMethod = (data?: any) => void;

// 请求方法
export type XHR<T> = (params: T) => Promise<any>;

export type SettingType = {
	theme: 0 | 1 | 2;
	crease: 0 | 2;
	nav: 0 | 1;
	viewport: 0 | 1 | 2 | 3;
	homeTab: 0 | 1 | 2 | 3;
};

export type BadgeSettingType = {
	dataType: 'price' | 'percent' | 'turnover';
	observe: boolean;
	viewType: boolean; //	true 格式化后数据
	speed: number;
};

// Sync key 数据结构
export type SyncDataType = {
	MyFault: boolean;
	BannerCoins: number[];
	Badge: string;
	Notifications: NoticeType[];
	FollowCodes: string[];
	Settings: SettingType;
	BadgeSetting: BadgeSettingType;
	PlatCode: { name: string; id: string }[];
	[key: string]: any;
};

// plat search data type
export type PlatSearchDataType = { [key: string]: SearchData[] };
