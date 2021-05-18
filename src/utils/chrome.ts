/*
 * @Date: 2021-03-23 14:37:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-18 14:47:04
 * @Description: chrome api 封装
 */
import { DefaultObject } from '@InterFace/index';

type SendMessage = (params: { command: string; data?: DefaultObject | string | number | null }) => Promise<any>;

type CreateNotify = (options: chrome.notifications.NotificationOptions) => Promise<string>;

type SetBadgeText = (text: string) => Promise<void>;

type SetBadgeColor = (color: string) => Promise<void>;

export const sendMessage: SendMessage = ({ command, data = null }) =>
	new Promise((resolve) => {
		chrome.runtime.sendMessage({ command, data }, (res) => {
			console.log('sendMessage res', command, data, res, chrome.runtime.lastError);
			resolve(res);
		});
	});

export const createNotify: CreateNotify = (options) =>
	new Promise((resolve) => {
		chrome.notifications.create('', options, resolve);
	});

export const setBadgeText: SetBadgeText = (text) =>
	new Promise((resolve) => {
		chrome.browserAction.setBadgeText({ text }, resolve);
	});

export const setBadgeBackground: SetBadgeColor = async (color) =>
	new Promise((resolve) => {
		chrome.browserAction.setBadgeBackgroundColor({ color }, resolve);
	});

export const getExtURL = (path: string) => chrome.runtime.getURL(path);
