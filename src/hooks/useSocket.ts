// @ts-nocheck
/*
 * @Date: 2021-03-15 09:52:15
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-17 10:07:05
 * @Description: websocket hooks
 */
import React, { useState, useEffect, useRef } from 'react';
import { convertCNUnit } from '@Utils/index';

const useSocket = ({ url, data }) => {
	const [wsData, setWsData] = useState({});
	const ws = useRef(null);

	const createWs = () => {
		if (!data || data.code || !data.length) return;

		ws.current = new WebSocket(url);
		ws.current.onopen = (e) => {
			ws.current?.send(
				JSON.stringify({
					event: 'ticker',
					params: {
						ids: data.map(({ id }) => id),
					},
				}),
			);
		};
		ws.current.onclose = (e) => {
			ws.current = null;
		};
		ws.current.onmessage = (e) => {
			const { data } = e;
			const d = JSON.parse(data);
			if (!d.msg) {
				const { tick } = d.data;
				const t = {
					id: tick.id,
					anchor: tick.anchor,
					usd: convertCNUnit(tick.price_usd),
					cny: convertCNUnit(tick.price_cny),
					percent: tick.percent_change_utc0,
					volume: convertCNUnit(tick.volume_24h),
				};

				setWsData(t);
			}
		};
	};

	useEffect(() => {
		createWs();
		return () => {
			ws.current?.close();
		};
	}, [url, data]);

	return {
		ws: ws.current,
		wsData,
	};
};

export default useSocket;
