/*
 * @Date: 2021-03-17 10:23:26
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-03-31 16:26:04
 * @Description: worker hooks
 */
import React, { useState, useEffect } from 'react';
import { DefaultObject } from '@InterFace/index';

interface Props {
	type: string;
	url: string;
	sub: Object;
	time?: number;
}

const useWorker = (props: Props) => {
	const [worker, setWorker] = useState<null | Worker>(null);
	const [workerData, setWorkerData] = useState<any>(null);

	const initWorker = () => {
		const js = chrome.runtime.getURL('static/js/worker.js');
		const w = new Worker(js);

		w.postMessage(props);

		w.onmessage = (d) => {
			console.log('主线程接收数据', d.data);
			setWorkerData(d.data);
		};

		w.onmessageerror = (e) => {
			console.log('worker接收数据出错', e);
		};

		w.onerror = (e) => {
			console.log('worker出错', e);
			terminate();
		};

		setWorker(w);
	};

	// 发送消息
	const postMsg = (msg: any) => worker?.postMessage(msg);

	// 关闭worker
	const terminate = () => {
		postMsg({ close: 1 });
		worker?.terminate();
		setWorker(null);
	};

	useEffect(() => {
		initWorker();

		return () => {
			console.log('关闭');
			terminate();
		};
	}, []);

	return {
		worker,
		workerData,
		postMsg,
		terminate,
	};
};

export default useWorker;
