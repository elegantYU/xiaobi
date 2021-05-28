import Store from '@Services/store';
import { getSyncData, setSyncData, getManifest } from '@Utils/chrome';
import { SyncKey } from '@Const/local';

const { version } = getManifest();
const DefaultData = {
	[SyncKey.BannerCoins]: [6306516, 1334942, 821701822, 821698840],
	[SyncKey.Badge]: '6306516',
	[SyncKey.Settings]: {
		theme: 0, //	0 浅 1 深 2 跟随
		crease: 1, // 0 绿涨 1 红涨
		nav: 1, //	0 icon 1 text
		viewport: 1, //	默认 [0,1,2,3] => [0.9, 1, 1.1, 1.2]
		homeTab: 0, // 0 1 2 3
	},
};

// 弥补自己犯下的错，判断sign同步Store数据
const fixMyFault = async () => {
	const faultSign = await getSyncData(SyncKey.MyFault);

	if (faultSign) return;

	const selfCoins = Store.get('selfCoins');
	const follow = Store.get('follow');
	const notifications = Store.get('notifications');
	const needSyncData = {
		[SyncKey.Badge]: follow,
		[SyncKey.FollowCodes]: selfCoins,
		[SyncKey.Notifications]: notifications,
		[SyncKey.MyFault]: true,
	};

	await setSyncData(needSyncData);
};

// 添加默认值
const initSyncData = async () => {
	await setSyncData(DefaultData);

	if (version === '1.0.3') {
		fixMyFault();
	}
};

initSyncData();
