import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import useMessage from '@Src/hooks/useMessage';
import { NewsType, CMDS } from '@Const/commands';
import { NewsTabItem } from '@InterFace/index';

import Head from '@Components/news/head';
import List from '@Components/news/list';
import Error from '@Components/error';
import debounce from 'lodash.debounce';

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
	{ command: CMDS.CMD_NEWSFLASH, name: '全部', active: true, params: { category: 0 } },
	{ command: CMDS.CMD_NEWSEVENT, name: '大事件', active: false, params: {} },
	{ command: CMDS.CMD_NEWSFLASH, name: '精选', active: false, params: { category: 1 } },
	{ command: CMDS.CMD_NEWSFLASH, name: '数据', active: false, params: { category: 2 } },
	{ command: CMDS.CMD_NEWSFLASH, name: '解盘', active: false, params: { category: 3 } },
	{ command: CMDS.CMD_NEWSFLASH, name: '公告', active: false, params: { category: 4 } },
	{ command: CMDS.CMD_NEWSFLASH, name: '项目', active: false, params: { category: 5 } },
];

// 拼接数据
const composeData = (curr: any[], next: any[]) => {
	if (!curr?.length) return next;

	const res = next.reduce((arr, item) => {
		const d = item.date;
		const ld = arr[arr.length - 1].date;

		if (ld === d) {
			arr[arr.length - 1].list.push(...item.list);
			return arr;
		}

		return [...arr, item];
	}, curr);

	return res;
};

const News = () => {
	const [tabData, setTabData] = useState(tabList);
	const [tabIndex, setTabIndex] = useState(0);
	const [page, setPage] = useState(1); //	大事件的分页
	const [command, setCommand] = useState<CmdParams>({ command: CMDS.CMD_NEWSFLASH, data: { category: 0 } });
	const { data: request } = useMessage(command);
	const [tableData, setTableData] = useState<any>(request);
	const scrollEl = useRef<HTMLDivElement>(null);

	const handleClick = (idx: number) => {
		const temp = tabData.map((v, i) => ({ ...v, active: false }));
		const { command: cmd, params } = temp[idx];
		temp[idx].active = true;

		const execution = { command: cmd, data: idx === 1 ? { ...params, page: 1 } : { ...params, id: 0 } };

		scrollEl.current?.scrollTo({ top: 0, behavior: 'smooth' });

		setTabData(temp);
		setTabIndex(idx);
		setCommand(execution);
		setPage(1);
	};

	const loadNextPage = useCallback(
		debounce(() => {
			if (!tableData) return;

			let nextParam;

			if (tabIndex !== 1) {
				const l = tableData[tableData.length - 1];
				const lid = l.list[l.list.length - 1].id;

				nextParam = lid;
			} else {
				nextParam = page + 1;
				setPage(page + 1);
			}

			const { command: cmd, params } = tabData[tabIndex];
			const execution = {
				command: cmd,
				data: tabIndex === 1 ? { ...params, page: nextParam } : { ...params, id: nextParam },
			};
			setCommand(execution);
		}, 500),
		[tabIndex, tableData],
	);

	const renderListJSX = () => {
		if (request && request.code) {
			return <Error />;
		}
		return <List data={tableData} idx={tabIndex} scrollEvent={loadNextPage} scrollEl={scrollEl} />;
	};

	useEffect(() => {
		setTableData(null);
	}, [tabIndex]);

	useEffect(() => {
		if (request) {
			const res = composeData(tableData, request);
			setTableData(res);
		}
	}, [request]);

	return (
		<WrapperUI>
			<Head data={tabData} idx={tabIndex} clickEvent={handleClick} />
			{renderListJSX()}
		</WrapperUI>
	);
};

export default News;
