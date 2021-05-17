import { getFlashListXHR, getNewsListXHR, getCoinNewsXHR } from '@Api/news';
import { BackgroundAsyncMethod, BackgroundCmdMap, NewsData, NewsEventData } from '@InterFace/index';
import { CMDS } from '@Const/commands';
import decode from '@Utils/crypto';
import { formatTime } from '@Utils/index';

const getNewsList: BackgroundAsyncMethod = async (sendResponse, params) => {
	try {
		const {
			data: { list },
		} = await getNewsListXHR({ ...params });

		const res: { date: string; list: NewsEventData[] }[] = (list as any[])
			.map(({ object_id, published_at, title, operation_by, jump_url }) => ({
				id: object_id,
				title,
				author: operation_by,
				link: jump_url,
				time: formatTime(published_at, `{y}/{m}/{d} {h}:{i}:{s}`),
			}))
			.reduce((arr: any[], item) => {
				const f = '{m}/{d} 周{a}';
				const week = formatTime(item.time, f);

				const currIdx = arr.findIndex((v) => v.date === week);
				if (currIdx !== -1) {
					arr[currIdx].list.push(item);
					return [...arr];
				}

				return [...arr, { date: week, list: [item] }];
			}, []);

		sendResponse(res);
	} catch {
		sendResponse({ code: -1 });
	}
};

const getFlashList: BackgroundAsyncMethod = async (sendResponse, params) => {
	try {
		const { list } = await getFlashListXHR({ ...params });

		const res: { date: string; list: NewsData[] }[] = (list as any[]).map((d) => {
			const { date, lives } = d;
			return {
				date: formatTime(date, '{m}/{d} 周{a}'),
				list: (lives as any[]).map(
					({
						id,
						content,
						content_prefix,
						grade,
						link,
						created_at,
						attribute,
						up_counts,
						down_counts,
						comment_count,
						images,
					}) => ({
						id,
						title: content_prefix,
						content,
						origin: link,
						grade,
						images: (images as any[]).map((s) => s.url),
						upCount: up_counts,
						downCount: down_counts,
						commentCount: comment_count,
						link: `https://www.jinse.com/lives/${id}.html`,
						attribute,
						time: formatTime(`${created_at}000`, '{h}:{i}'),
					}),
				),
			};
		});

		sendResponse(res);
	} catch {
		sendResponse({ code: -1 });
	}
};

// 币种新闻转链
const convertLink = (link: string) => {
	const reg = /\?id=(.*)$/;
	const id = reg.exec(link)?.[1];

	return `https://www.mytokencap.com/news/${id}.html`;
};

const getCoinNews: BackgroundAsyncMethod = async (send, data) => {
	const { code, timestamp } = decode();

	try {
		const {
			data: { list },
		} = await getCoinNewsXHR({ code, timestamp, entity_id: data });

		const res: any[] = (list as any[]).map(({ photo_url, source, title, posted_at, abstract, link }) => ({
			content: abstract,
			link: convertLink(link),
			time: formatTime(`${posted_at}000`, '{m}/{d} {h}:{i}'),
			title,
			avatar: photo_url,
			source_name: source,
		}));

		send(res);
	} catch {
		send({ code: -1 });
	}
};

export default [
	[CMDS.CMD_NEWSEVENT, (send, data) => getNewsList(send, data)],
	[CMDS.CMD_NEWSFLASH, (send, data) => getFlashList(send, data)],
	[CMDS.CMD_COINNEWS, (send, data) => getCoinNews(send, data)],
] as BackgroundCmdMap;
