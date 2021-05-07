/*
 * @Date: 2021-04-07 09:03:41
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-07 21:33:58
 * @Description: 主题色hook
 */
import React, { useState, useEffect } from 'react';
import useMessage from '@Src/hooks/useMessage';
import { CMDS } from '@Const/commands';
import { dark, light } from '@Styles/theme';
import { DefaultObject } from '@InterFace/index';

const useTheme = () => {
	const { data } = useMessage({ command: CMDS.CMD_SETTING });
	const [theme, setTheme] = useState<DefaultObject>(light);

	const getTheme = () => {
		const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (data) {
			return !data.theme ? light : data.theme === 1 ? dark : isDark ? dark : light;
		}
		return light;
	};

	const handleSetTheme = () => setTheme(getTheme());

	useEffect(() => {
		handleSetTheme();
		return () => {
			setTheme(light);
		};
	}, [data]);

	return {
		theme,
	};
};

export default useTheme;
