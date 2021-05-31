/*
 * @Date: 2021-03-15 09:29:20
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-31 09:58:20
 * @Description: fetch 封装
 */
import { DefaultObject } from '@InterFace/index';

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
