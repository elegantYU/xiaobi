import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { creaseState, themeState, NavMode } from '@Const/setting';
import { setSettingSM } from '@Api/setting';
import { Context } from '@Src/context';

import Title from '@Components/setting/title';
import Operation from '@Components/setting/operation';
import RatioGroup from '@Components/setting/ratioGroup';
import Process from '@Components/setting/progress';

const WrapperUI = styled.div`
	width: 100%;
	height: auto;
`;

const Base = () => {
	const { config, times, setTimes } = useContext(Context);

	const handleCreaseClick = (value: any) => {
		setSettingSM({ ...config, crease: value });
		setTimes(times + 1);
	};

	const handleThemeClick = (value: any) => {
		setSettingSM({ ...config, theme: value });
		setTimes(times + 1);
	};

	const handleNavClick = (value: any) => {
		setSettingSM({ ...config, nav: value });
		setTimes(times + 1);
	};

	const handleViewPortChange = (multi: number) => {
		setSettingSM({ ...config, viewport: multi });
		setTimes(times + 1);
	};

	return (
		<WrapperUI>
			<Title>基础配置</Title>
			<Operation title='涨跌颜色' desc='可以选择自己习惯的涨跌颜色'>
				<RatioGroup data={creaseState} active={config?.crease} clickEvent={handleCreaseClick} />
			</Operation>
			<Operation title='主题颜色' desc='选择喜欢的主题，或者跟随系统'>
				<RatioGroup data={themeState} active={config?.theme} clickEvent={handleThemeClick} />
			</Operation>
			<Operation title='侧边导航' desc='可切换为图标模式，扩大页面的空间'>
				<RatioGroup data={NavMode} active={config?.nav} clickEvent={handleNavClick} />
			</Operation>
			<Operation title='窗口大小' desc='拖动调节窗口大小'>
				<Process value={config?.viewport || 0} changeEvent={handleViewPortChange} />
			</Operation>
		</WrapperUI>
	);
};

export default Base;
