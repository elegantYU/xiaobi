import { getFlashListXHR, getNewsListXHR, getCoinNewsXHR } from '@Api/news';
import { BackgroundAsyncMethod, BackgroundCmdMap, NewsData } from '@InterFace/index';
import { CMDS } from '@Const/commands';
import decode from '@Utils/crypto';
import { formatTime } from '@Utils/index';

const getNewsList: BackgroundAsyncMethod = async (sendResponse, data) => {
	const { code, timestamp } = decode();

	try {
		const {
			data: { list },
		} = await getNewsListXHR({ code, timestamp, news_category: data });

		const res: NewsData[] = (list as any[]).map(
			({ abstract, author, updated_at, photo_abstract, link, title, is_top }) => ({
				content: abstract,
				link,
				title,
				is_top,
				source_name: author,
				avatar: photo_abstract,
				time: formatTime(`${updated_at}000`, `{m}/{d} {h}:{i}`),
			}),
		);

		sendResponse(res);
	} catch {
		sendResponse({ code: -1 });
	}
};

const getFlashList: BackgroundAsyncMethod = async (sendResponse) => {
	const { code, timestamp } = decode();

	try {
		const {
			data: { list },
		} = await getFlashListXHR({ code, timestamp });

		const res: NewsData[] = (list as any[]).map(({ content, link, source_link, source_name, title, published_at }) => ({
			content,
			link,
			source_link,
			source_name,
			title,
			time: formatTime(`${published_at}000`, '{h}:{i}'),
		}));

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

		const res: NewsData[] = (list as any[]).map(({ photo_url, source, title, posted_at, abstract, link }) => ({
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
	[CMDS.CMD_NEWS, (send, data) => getNewsList(send, data)],
	[CMDS.CMD_NEWSFLASH, (send) => getFlashList(send)],
	[CMDS.CMD_COINNEWS, (send, data) => getCoinNews(send, data)],
] as BackgroundCmdMap;
