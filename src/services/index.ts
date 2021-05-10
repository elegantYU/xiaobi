// import localMap from './business/local';
import marketMap from './business/market';
import local from './business/local';
import news from './business/news';
import search from './business/search';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	const cmdMap = new Map([...marketMap, ...local, ...news, ...search]);
	const { command, data } = msg;
	cmdMap.get(command)?.(sendResponse, data);

	return true;
});
