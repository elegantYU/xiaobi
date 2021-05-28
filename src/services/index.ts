// import localMap from './business/local';
import { getExtURL } from '@Src/utils/chrome';
import marketMap from './business/market';
import local from './business/local';
import news from './business/news';
import search from './business/search';
import notify from './business/notify';

import './alarm';
import './storage';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	const cmdMap = new Map([...marketMap, ...local, ...news, ...search, ...notify]);
	const { command, data } = msg;
	cmdMap.get(command)?.(sendResponse, data);

	return true;
});

const createWindow = () => {
	chrome.windows.create(
		{
			url: getExtURL('./index.html'),
			width: 500,
			height: 528,
			top: 200,
			left: 500,
			type: 'popup',
		},
		(e) => {
			if (e?.id) {
				chrome.windows.update(e.id, { focused: true });
			}
		},
	);
};

// 小窗模式
chrome.contextMenus.create({
	title: '小窗模式',
	contexts: ['browser_action'],
	onclick: createWindow,
});
