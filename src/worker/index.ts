// // /*
// //  * @Date: 2021-03-17 10:08:25
// //  * @LastEditors: elegantYu
// //  * @LastEditTime: 2021-03-17 14:07:09
// //  * @Description: web worker做数据中间层 - 缓冲socket数据，避免频繁计算渲染阻塞主线程
// //  */
// import Pako from 'pako';
// import Socket from '@Utils/websocket';
// import { WorkerType } from '@Const/commands';
// import { DefaultObject, IndexCoinData, IndexData, IndexCoinOrigin } from '@InterFace/index';
// import { formatCoinCategory, concatData, matchCoinData, formatCoin, uniqueData } from '@Utils/index';

// declare function postMessage(message: any, transfer?: any[]): void;

// type WS = Socket | undefined;

// type StartWsFn = (w: WS, url: string, sub: DefaultObject) => void;

// // start & listen
// const startWs: StartWsFn = (w, url, sub) => {
// 	// w = new Socket(url, sub);
// };

// // close & destory
// const closeWs = (w: WS) => {
// 	// w && w.close();
// };

// addEventListener('message', ({ data }) => {
// 	const { url, sub, type } = data;
// 	let WS: WS;

// 	switch (type) {
// 		case WorkerType.Start:
// 			startWs(WS, url, sub);

// 			break;
// 		case WorkerType.Close:
// 			closeWs(WS);
// 			break;
// 		default:
// 			break;
// 	}
// });
