import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useMessage from '@Src/hooks/useMessage';
import { NewsType, CMDS } from '@Const/commands';
import { NewsTabItem } from '@InterFace/index';

import Head from '@Components/news/head';
import List from '@Components/news/list';
import Error from '@Components/error';

interface CmdParams {
	command: any;
	data?: any;
}

const WrapperUI = styled.div`
	height: 500px;
	overflow: hidden;
	background-color: ${(p) => p.theme.panelBg};
`;

const tabList: NewsTabItem[] = [
	{ command: CMDS.CMD_NEWSFLASH, name: '快讯', active: true },
	{ command: NewsType.HighLight, name: '要闻', active: false },
	{ command: NewsType.Market, name: '行情', active: false },
	{ command: NewsType.DeFi, name: 'DeFi', active: false },
	{ command: NewsType.NFT, name: 'NFT', active: false },
	{ command: NewsType.Mining, name: '矿业', active: false },
	{ command: NewsType.Entry, name: '入门', active: false },
];

const News = () => {
	const [tabData, setTabData] = useState(tabList);
	const [tabIndex, setTabIndex] = useState(0);
	const [command, setCommand] = useState<CmdParams>({ command: CMDS.CMD_NEWSFLASH });
	const { data: request } = useMessage(command);
	const [tableData, setTableData] = useState<any>(request);

	const handleClick = (idx: number) => {
		const temp = tabData.map((v, i) => ({ ...v, active: false }));
		temp[idx].active = true;

		const cmd = !idx ? { command: temp[idx].command } : { command: CMDS.CMD_NEWS, data: temp[idx].command };

		setTabData(temp);
		setTabIndex(idx);
		setCommand(cmd);
	};

	const renderListJSX = () => {
		if (request && request.code) {
			return <Error />;
		} else {
			return <List data={tableData} idx={tabIndex} />;
		}
	};

	useEffect(() => {
		setTableData(null);
	}, [tabIndex]);

	useEffect(() => {
		request && setTableData(request);
	}, [request]);

	return (
		<WrapperUI>
			<Head data={tabData} idx={tabIndex} clickEvent={handleClick}></Head>
			{renderListJSX()}
		</WrapperUI>
	);
};

export default News;
