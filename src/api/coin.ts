/*
 * @Date: 2021-03-23 10:50:12
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-07-02 20:50:29
 * @Description: 火币相关接口
 */
import xhr from '@Utils/fetch';
import { XHR, DefaultObject } from '@InterFace/index';
import {
	API_INDEX,
	SUB_INDEX_HOT,
	SUB_INDEX_WATCH,
	SUB_INDEX_MARKET,
	API_RATE,
	API_DETAIL,
	API_SEARCH,
	API_KLINE,
	API_TRENDLINE,
	API_PLATCOIN,
} from '@Const/api';

const defaultParams = {
	platform: 'web_pc',
	v: '1.0.0',
};

const listParams = {
	page: 1,
	size: 50,
	language: 'zh_CN',
};

// 获取所有币种 关注榜
export const getFollowListXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_INDEX,
		params: { ...defaultParams, ...listParams, subject: SUB_INDEX_WATCH, ...params },
	});

// 热搜榜
export const getHotListXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_INDEX,
		params: { ...defaultParams, ...listParams, subject: SUB_INDEX_HOT, ...params },
	});

// 涨幅榜
export const getIncreaseListXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_RATE,
		params: {
			...defaultParams,
			...listParams,
			subject: SUB_INDEX_MARKET,
			...params,
			sort: 'percent_change_utc0',
			direction: 'desc',
		},
	});

// coin详情
export const getDetailXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_DETAIL,
		params: { ...defaultParams, legal_currency: 'CNY', ...params },
	});

// coin 页面
export const getCoinIndexXHR: XHR<number> = (id) =>
	xhr({
		method: 'GET',
		url: `https://www.mytokencap.com/currency/eth/${id}`,
		type: 'text',
		params: { legal_currency: 'CNY' },
	});

// 搜索coin
export const getSearchXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_SEARCH,
		params: { ...defaultParams, category: 'all', language: 'zh_CN', legal_currency: 'USD', ...params },
	});

// k线图
export const getKlineXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_KLINE,
		params: { ...defaultParams, limit: 10, language: 'zh_CN', legal_currency: 'CNY', ...params },
	});

// 折线图
export const getTrendLineXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_TRENDLINE,
		params: { ...defaultParams, limit: 96, language: 'zh_CN', legal_currency: 'CNY', ...params },
	});

// 根据平台获取币种
export const getCoinByPaltXHR: XHR<DefaultObject> = (params) =>
	xhr({
		method: 'GET',
		url: API_PLATCOIN,
		params: { ...defaultParams, ...params, language: 'zh_CN', legal_currency: 'USD', need_pagination: 1 },
	});
