// 基础类型
export interface DefaultObject {
	[key: string]: any;
}

export interface IndexCoinOrigin {
	a: number;
	h: number;
	l: number;
	o: number;
	r: number;
	s: string;
	v: number;
	c: number;
	co: number;
}

// 首页币种列表数据
export interface IndexCoinData {
	amount: number | string; //	24H总量
	open: number | string; //	开盘价格
	high: number | string; //	最高价
	low: number | string; //	最低价
	rate: number | string; //	涨幅
	symbol: string; //	币名
	value: number | string; //	成交额
	close: number | string; //	收盘价
	count: number | string; //	交易笔数
	type: string; //	币种
}

// 首页worker返回信息
export interface IndexData {
	topData: IndexCoinData[];
	rateData: (IndexCoinData | null)[];
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
// 新闻数据格式
export interface NewsTabItem {
	command: string | number;
	name: string;
	active: boolean;
}

// 快讯数据格式
export interface NewsData {
	title: string;
	content?: string;
	link: string;
	source_link?: string;
	source_name?: string;
	time: string;
	avatar?: string;
	is_top?: 0 | 1; //	置顶
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
	name: string;
	type: 'price' | 'turnover' | string;
	rule: number;
	create: string;
}

// 排序格式
export interface SortData {
	field: 'currency' | 'volume' | 'usd' | 'turnover' | 'percent' | string;
	sort: 0 | 1 | 2 | number;
}

// background sendResponse
export type BackgroundAsyncMethod = (sendResponse: (arg?: any) => void, data?: any) => Promise<any>;
// background export map
export type BackgroundCmdMap = [string, BackgroundAsyncMethod][];

// 页面监听指令
export type PageAsyncMethod = (data?: any) => void;
export type PageCmdMap = [string, PageAsyncMethod][];

// 请求方法
export type XHR<T> = (params: T) => Promise<any>;
