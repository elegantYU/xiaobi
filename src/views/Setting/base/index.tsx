import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { creaseState, themeState, NavMode } from '@Const/setting';
import { CMDS } from '@Const/commands';
import useMessage from '@Src/hooks/useMessage';
import { setSettingSM } from '@Api/setting';
import { Context } from '@Src/context/index';

import Title from '@Components/setting/title';
import Operation from '@Components/setting/operation';
import RatioGroup from '@Components/setting/ratioGroup';

const WrapperUI = styled.div`
	width: 100%;
	height: auto;
`;

const Base = () => {
	const { data } = useMessage({ command: CMDS.CMD_SETTING });
	const { setConfig } = useContext(Context);
	const [crease, setCrease] = useState(0);
	const [theme, setTheme] = useState(1);
	const [nav, setNav] = useState(1);

	const handleCreaseClick = (value: any) => {
		setCrease(value);
		setSettingSM({ ...data, crease: value });
	};

	const handleThemeClick = (value: any) => {
		setTheme(value);
		setSettingSM({ ...data, theme: value });
	};

	const handleNavClick = (value: any) => {
		setNav(value);
		setConfig({ ...data, nav: value });
		setSettingSM({ ...data, nav: value });
	};

	useEffect(() => {
		if (data) {
			setCrease(data.crease);
			setTheme(data.theme);
			setNav(data.nav);
		}
	}, [data]);

	return (
		<WrapperUI>
			<Title>基础配置</Title>
			<Operation title='涨跌颜色' desc='可以选择自己习惯的涨跌颜色'>
				<RatioGroup data={creaseState} active={crease} clickEvent={handleCreaseClick}></RatioGroup>
			</Operation>
			<Operation title='主题颜色' desc='选择喜欢的主题，或者跟随系统'>
				<RatioGroup data={themeState} active={theme} clickEvent={handleThemeClick}></RatioGroup>
			</Operation>
			<Operation title='侧边导航' desc='可切换为图标模式，扩大页面的空间'>
				<RatioGroup data={NavMode} active={nav} clickEvent={handleNavClick}></RatioGroup>
			</Operation>
		</WrapperUI>
	);
};

export default Base;
