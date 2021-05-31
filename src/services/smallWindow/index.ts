/*
 * @Date: 2021-05-29 13:12:51
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-29 13:13:14
 * @Description: 小窗模式
 */
import { getExtURL } from '@Src/utils/chrome';

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
