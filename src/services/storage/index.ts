import { getSyncData, setSyncData } from '@Utils/chrome';
import { SyncKey } from '@Const/local';
import Observer from '@Services/store';
import { recurseFetchData } from '../store/platData';
import { SyncDataType } from '../../interface';

const DefaultData = {
	[SyncKey.Badge]: '1334945',
	[SyncKey.BannerCoins]: [1334945, 1334942, 1430750, 821714640],
	[SyncKey.FollowCodes]: [],
	[SyncKey.Notifications]: [],
	[SyncKey.Settings]: {
		theme: 0, //	0 浅 1 深 2 跟随
		crease: 1, // 0 绿涨 1 红涨
		nav: 1, //	0 icon 1 text
		viewport: 1, //	默认 [0,1,2,3] => [0.9, 1, 1.1, 1.2]
		homeTab: 0, // 0 1 2 3
	},
	[SyncKey.PlatCode]: [
		{
			name: '火币',
			id: 108,
		},
		{ name: '币安', id: 338 },
		{ name: '欧易OKEx', id: 1324 },
	], //	火币、币安、okex
};

// 弥补自己犯下的错，判断sign同步Store数据
const fixMyFault = async () => {
	const syncData = await getSyncData(SyncKey.MyFault);

	if (syncData[SyncKey.MyFault]) return;

	const needSyncData = {
		[SyncKey.MyFault]: true,
	};

	await setSyncData({ ...DefaultData, ...needSyncData });
};

fixMyFault()
	.then((_) => {
		Observer.init();
	})
	.catch((error) => error);

// 强制用户配置更新
const forceUpdate: (key: keyof SyncDataType, value: any, version: string) => Promise<void> = async (
	key,
	value,
	version,
) => {
	const syncData = await getSyncData(null);
	const versionKey = `${version}_force`;
	const isUpdate = syncData[versionKey];

	if (isUpdate) return;

	await setSyncData({ [key]: value, versionKey: true });
};
// 1.2.3版本更新用户的 banner
forceUpdate(SyncKey.BannerCoins, DefaultData[SyncKey.BannerCoins], '1.2.3');
// 1.3.0版本更新用户的 platcode
forceUpdate(SyncKey.PlatCode, DefaultData[SyncKey.PlatCode], '1.3.0')
	.then((_) => recurseFetchData())
	.catch((error) => error);
