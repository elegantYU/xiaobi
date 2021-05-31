import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { creaseState, themeState, NavMode, HomeTabState } from '@Const/setting';
import { setSettingSM } from '@Api/setting';
import { Context } from '@Src/context';
import { LocalKey } from '@Const/local';
import { setStorage, getStorage } from '@Src/utils/localStorage';

import Title from '@Components/setting/title';
import Operation from '@Components/setting/operation';
import RatioGroup from '@Components/setting/ratioGroup';
import Process from '@Components/setting/progress';

const WrapperUI = styled.div`
	width: 100%;
	height: auto;
`;

const Base = () => {
	const [homeTab, setHomeTab] = useState(getStorage(LocalKey.HomeTab) ?? 0);
	const { config, times, setTimes } = useContext(Context);

	const handleViewPortChange = (multi: number) => {
		setSettingSM({ ...config, viewport: multi });
		setTimes(times + 1);
	};

	const handleRatioChange = (value: any, key: string) => {
		setSettingSM({ ...config, [key]: value });
		setTimes(times + 1);
	};

	const handleHomeTabChange = (value: any, key: string) => {
		setHomeTab(value);
		setStorage(LocalKey.HomeTab, value);
	};

	return (
		<WrapperUI>
			<Title>基础配置</Title>
			<Operation title='涨跌颜色' desc='可以选择自己习惯的涨跌颜色'>
				<RatioGroup data={creaseState} active={config?.crease} field='crease' clickEvent={handleRatioChange} />
			</Operation>
			<Operation title='主题颜色' desc='选择喜欢的主题，或者跟随系统'>
				<RatioGroup data={themeState} active={config?.theme} field='theme' clickEvent={handleRatioChange} />
			</Operation>
			<Operation title='侧边导航' desc='可切换为图标模式，扩大页面的空间'>
				<RatioGroup data={NavMode} active={config?.nav} field='nav' clickEvent={handleRatioChange} />
			</Operation>
			<Operation title='窗口大小' desc='拖动调节窗口大小'>
				<Process value={config?.viewport || 0} changeEvent={handleViewPortChange} />
			</Operation>
			<Operation title='首页自定Tab' desc='选择首页默认类型'>
				<RatioGroup data={HomeTabState} active={homeTab} field={LocalKey.HomeTab} clickEvent={handleHomeTabChange} />
			</Operation>
		</WrapperUI>
	);
};

export default Base;
