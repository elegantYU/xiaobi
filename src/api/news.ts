import xhr from '@Utils/fetch';
import { XHR, DefaultObject } from '@InterFace/index';
import { API_NEWS, API_NEWSFLASH, API_COINNEWS } from '@Const/api';

const params = {
	type: 1,
	tag: 'news',
	need_pagination: 1,
	page: 1,
	size: 20,
	platform: 'web_pc',
	v: '1.0.0',
	language: 'zh_CN',
	legal_currency: 'USD',
};

const flashParams = {
	last_id: 0,
	platform: 'web_pc',
	v: '1.0.0',
	language: 'zh_CN',
	legal_currency: 'USD',
};

export const getNewsListXHR: XHR<DefaultObject> = (data) =>
	xhr({
		method: 'GET',
		url: API_NEWS,
		params: { ...params, ...data },
	});

export const getFlashListXHR: XHR<DefaultObject> = (data) =>
	xhr({
		method: 'GET',
		url: API_NEWSFLASH,
		params: { ...flashParams, ...data },
	});

// 单个币种的新闻
export const getCoinNewsXHR: XHR<DefaultObject> = (data) =>
	xhr({
		method: 'GET',
		url: API_COINNEWS,
		params: { platform: 'web_pc', v: '1.0.0', language: 'zh_CN', entity: 'currency', legal_currency: 'USD', ...data },
	});
