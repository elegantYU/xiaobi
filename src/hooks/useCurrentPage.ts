/*
 * @Date: 2021-03-15 10:09:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-05-31 09:56:55
 * @Description: 判断是否离开当前页面
 */
import { useEffect, useState } from 'react';

const useCurrentPage = () => {
	const [isCurrent, setCurrent] = useState(true);
	const checkCurrentPage = () => {
		const { visibilityState } = document;
		setCurrent(visibilityState === 'visible');
	};

	useEffect(() => {
		document.addEventListener('visibilitychange', checkCurrentPage);
		return () => {
			document.removeEventListener('visibilitychange', checkCurrentPage);
		};
	}, []);

	return { isCurrent };
};

export default useCurrentPage;
