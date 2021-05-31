/*
 * @Date: 2021-03-23 15:38:36
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-16 13:25:30
 * @Description: chrome sendMessage
 */
import { useState, useEffect } from 'react';
import { sendMessage } from '@Utils/chrome';

interface Props {
	command: string;
	data?: any;
}

const useMessage = ({ command, data }: Props) => {
	const [response, setResponse] = useState<any>(null);

	const fetchData = async () => {
		const res = await sendMessage({ command, data });
		if (res && res.code) {
			setResponse({ code: -1 });
		} else {
			setResponse(res);
		}
	};

	useEffect(() => {
		fetchData();
	}, [command, data]);

	return {
		data: response,
	};
};

export default useMessage;
