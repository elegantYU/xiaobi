import xhr from '@Utils/fetch';
import { XHR, DefaultObject } from '@InterFace/index';
import { API_NEWS, API_NEWSFLASH, API_COINNEWS } from '@Const/api';

export const getNewsListXHR: XHR<DefaultObject> = (data) =>
	xhr({
		method: 'GET',
		url: API_NEWS,
		params: { limit: 20, module_type: 2, ...data },
	});

export const getFlashListXHR: XHR<DefaultObject> = (data) =>
	xhr({
		method: 'GET',
		url: API_NEWSFLASH,
		params: { limit: '20', reading: false, source: 'web', flag: 'down', ...data },
	});

// 单个币种的新闻
export const getCoinNewsXHR: XHR<DefaultObject> = (data) =>
	xhr({
		method: 'GET',
		url: API_COINNEWS,
		params: { platform: 'web_pc', v: '1.0.0', language: 'zh_CN', entity: 'currency', legal_currency: 'USD', ...data },
	});
