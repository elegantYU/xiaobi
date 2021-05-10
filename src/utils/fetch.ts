/*
 * @Date: 2021-03-15 09:29:20
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-10 16:20:39
 * @Description: fetch 封装
 */
import { DefaultObject } from '@InterFace/index';

interface API {
	'https://www.huobi.com/-/x/pro/v2/beta/common/symbols': { data: Array<any>; status: string };
}

type Options = {
	method: 'GET' | 'POST' | 'DELETE' | 'PUT';
	url: string;
	params?: any;
	headers?: DefaultObject;
	type?: 'json' | 'text';
};

const xhr = (options: Options) => {
	const { method, url, params, headers, type } = options;

	const opt: RequestInit =
		method !== 'GET'
			? {
				method,
				body: params,
				headers: new Headers(headers),
			  }
			: {};
	const api =
		method === 'GET'
			? `${url}?${
				params
					? Object.keys(params)
						.map((k) => `${k}=${params[k]}`)
						.join('&')
					: ''
			  }`
			: url;

	return fetch(api, opt).then((_) => {
		if (type === 'text') return _.text();
		return _.json();
	});
};

export default xhr;
