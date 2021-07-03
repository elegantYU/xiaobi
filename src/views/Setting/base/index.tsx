import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { creaseState, themeState, NavMode, HomeTabState } from '@Const/setting';
import { getAllConfigSM, setAllConfigSM, setSettingSM, updatePlatSM } from '@Api/setting';
import { Context } from '@Src/context';
import { LocalKey } from '@Const/local';
import { setStorage, getStorage } from '@Src/utils/localStorage';

import Title from '@Components/setting/title';
import Operation from '@Components/setting/operation';
import RatioGroup from '@Components/setting/ratioGroup';
import Process from '@Components/setting/progress';
import { RatioBtnUI, FileBtn } from '@Components/button';
import message from '@Src/components/message';

const WrapperUI = styled.div`
	width: 100%;
	height: auto;
	padding: 0 10px 10px;
	background-color: ${(p) => p.theme.panelBg};
`;

const CombinUI = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const LinkUI = styled.a`
	font-size: 14px;
	color: ${(p) => p.theme.ratioActiveBg};
`;

const downloadJSON = async () => {
	const json = await getAllConfigSM();
	const a = document.createElement('a');
	a.download = 'config.json';
	a.href = `data:text/plain,${json}`;
	a.click();
	a.remove();
};

const uploadJSON = async (data: any) => {
	await setAllConfigSM(data);
	message.info('同步成功 重启生效');
};

const handleUpdatePlat = () => updatePlatSM();

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
			<Operation title='数据同步' desc='下载配置数据到本地，或同步配置'>
				<CombinUI>
					<FileBtn changeEvent={uploadJSON}>上传配置</FileBtn>
					<RatioBtnUI className='active' onClick={downloadJSON}>
						下载配置
					</RatioBtnUI>
				</CombinUI>
			</Operation>
			<Operation title='页面上传配置' desc='主要用于解决火狐浏览器插件问题'>
				<LinkUI href='/option.html' target='_blank'>
					打开页面
				</LinkUI>
			</Operation>
			<Operation
				title='更新平台数据'
				desc='平台数据用于做币种搜索，数据更新一般需要 5 分钟左右。目前平台:火币、币安、Okex'
			>
				<RatioBtnUI className='active' onClick={handleUpdatePlat}>
					数据更新
				</RatioBtnUI>
			</Operation>
		</WrapperUI>
	);
};

export default Base;
