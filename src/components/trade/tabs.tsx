import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TableList } from '@InterFace/index';
import useMessage from '@Src/hooks/useMessage';
import { CMDS } from '@Src/constants/commands';

import Info from './info';
import News from './news';

interface Props {
	data: TableList;
}

const WrapperUI = styled.div`
	border-radius: 6px 0 0 6px;
	background-color: ${(p) => p.theme.panelBg};
`;

const TabBoxUI = styled.div`
	height: 40px;
	position: relative;
	display: grid;
	align-items: center;
	grid-template-columns: repeat(2, 1fr);
	background-color: ${(p) => p.theme.panelBg};
	position: sticky;
	top: 0;

	&::before {
		content: '';
		position: absolute;
		bottom: 1px;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: ${(p) => p.theme.tabBorder};
	}
`;

const TabItemUI = styled.button`
	font-size: 14px;
	color: ${(p) => p.theme.tabFont};
	cursor: pointer;

	&:hover,
	&.active {
		color: ${(p) => p.theme.tabFontHover};
	}
`;

const LineUI = styled.div`
	position: absolute;
	height: 2px;
	border-radius: 1px;
	background-color: ${(p) => p.theme.tabFontHover};
	bottom: 0;
	left: 0;
	z-index: 1;
`;

const TabsList = [
	{ name: '简介', active: true },
	{ name: '相关资讯', active: false },
];

const Tabs: React.FC<Props> = ({ data }) => {
	const [tabData, setTabData] = useState(TabsList);
	const [idx, setIdx] = useState(0);
	const [width, setWidth] = useState(0);
	const [offsetX, setOffsetX] = useState(0);
	const { data: news } = useMessage({ command: CMDS.CMD_COINNEWS, data: data.id });

	console.log('data tabs', news);

	const handleClick = (idx: number) => {
		const temp = tabData.map((v, i) => ({ ...v, active: false }));
		temp[idx].active = true;

		setIdx(idx);
		setTabData(temp);
	};

	const calcLineWidth = () => {
		const currentItem = document.querySelectorAll('.tab-item')[idx] as HTMLElement;
		const w = currentItem ? currentItem.offsetWidth : 0;
		const x = currentItem ? currentItem.offsetLeft : 0;

		setWidth(w);
		setOffsetX(x);
	};

	const renderBtnJSX = () =>
		tabData.map((v, i) => (
			<TabItemUI key={v.name} onClick={() => handleClick(i)} className={`tab-item ${v.active ? 'active' : ''}`}>
				{v.name}
			</TabItemUI>
		));

	useEffect(() => {
		calcLineWidth();
	}, [idx]);

	return (
		<WrapperUI>
			<TabBoxUI>
				{renderBtnJSX()}
				<LineUI style={{ width: width + 'px', transform: `translateX(${offsetX}px)` }} />
			</TabBoxUI>
			{idx ? <News data={news} /> : <Info data={data} />}
		</WrapperUI>
	);
};

export default Tabs;
