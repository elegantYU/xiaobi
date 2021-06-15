/*
 * @Date: 2021-03-23 10:55:46
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-06-15 16:06:48
 * @Description: 不在缓存本地数据，管理所有订阅
 */
import type { Saga } from '@Utils/saga';
import { getSyncData } from '@Utils/chrome';
import { SyncKey } from '@Src/constants/local';
import { uniqueData } from '@Src/utils';
import { createCoinNotify } from '../business/notify';

interface ObserverType {
	list: { [key: string]: Saga };
	add: (uid: string, instance: Saga) => void;
	remove: (uid: string) => void;
	init: () => void;
}

const Observer: ObserverType = {
	list: {},
	add(uid, instance) {
		if (this.list[uid]) return;

		this.list[uid] = instance;

		console.log('thislist', this.list);
	},
	remove(uid) {
		this.list[uid].stop();
		delete this.list[uid];
	},
	async init() {
		// 装载syncStorage的通知数据和badge数据
		const syncData = await getSyncData(SyncKey.Notifications);
		const notify = syncData[SyncKey.Notifications];
		const notices = uniqueData(notify, 'id');

		notices.forEach((v) => {
			this.add(v.uid, createCoinNotify(v.id));
		});
	},
};

export default Observer;
