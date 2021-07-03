import decode from '@Utils/crypto';
import { createNotify, getExtURL, getSyncData } from '@Utils/chrome';
import { SyncKey } from '@Src/constants/local';
import { getCoinByPaltXHR } from '@Src/api';
import { PlatSearchDataType, SearchData } from '../../interface';

interface PlatStoreData {
	data: PlatSearchDataType;
	get: () => any;
	set: (d: { [key: string]: any[] }) => void;
}

type LoopFnType = (id: string, page: number, res: SearchData[]) => Promise<SearchData[]>;

const LOGO = getExtURL('./static/icons/icon.png');

const PlatStore: PlatStoreData = {
	data: {},
	get() {
		return this.data;
	},
	set(d) {
		console.log('平台数据录入中');
		this.data = { ...this.data, ...d };
	},
};

const loopPageData: LoopFnType = async (id, page = 1, res = []) => {
	const { code, timestamp } = decode();
	const {
		data: { list, total_page },
	} = await getCoinByPaltXHR({ code, timestamp, market_id: id, page, size: 30 });

	if (page === total_page) return res;

	return loopPageData(id, ++page, [...res, ...list]);
};

export const recurseFetchData = async () => {
	const syncData = await getSyncData(SyncKey.PlatCode);
	const idList = syncData[SyncKey.PlatCode];
	let i = 0;

	while (i < idList.length) {
		const list = await loopPageData(idList[i].id, 1, []);
		const marketCoin = (list as any[]).map(({ id, logo, market_name, pair, symbol, market_id }) => ({
			id,
			logo,
			marketName: market_name,
			pair,
			symbol,
			market_id,
		}));

		PlatStore.set({ [idList[i].id]: marketCoin });

		i++;
	}

	// 更新完毕
	const opts = {
		iconUrl: LOGO,
		message: '平台数据更新完毕',
		title: `"币"浏览器插件`,
		type: 'basic',
	};

	createNotify(opts);
};

export default PlatStore;
