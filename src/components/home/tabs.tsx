/*
 * @Date: 2021-04-01 15:28:03
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-04-16 23:39:21
 * @Description: tabs 栏
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TabItem } from '@InterFace/index';

interface Props {
	idx: number;
	data: TabItem[];
	clickEvent: (i: number) => void;
}

const WrapperUI = styled.div.attrs({ className: 'tabs' })`
	overflow: hidden;
	display: inline-block;
	vertical-align: middle;
	position: relative;
`;

const TabItemUI = styled.button`
	padding: 8px;
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
`;

const Tabs: React.FC<Props> = ({ data, idx, clickEvent }) => {
	const [width, setWidth] = useState(0);
	const [offsetX, setOffsetX] = useState(0);

	const calcLineWidth = () => {
		const currentItem = document.querySelectorAll('.tab-item')[idx] as HTMLElement;
		const w = currentItem ? currentItem.offsetWidth : 0;
		const x = currentItem ? currentItem.offsetLeft : 0;

		setWidth(w);
		setOffsetX(x);
	};

	const RenderBtnJSX = () => (
		<>
			{data.map((v, i) => (
				<TabItemUI key={i} onClick={() => clickEvent(i)} className={v.active ? 'active' : ''}>
					{v.name}
				</TabItemUI>
			))}
		</>
	);

	useEffect(() => {
		calcLineWidth();
	}, [idx]);

	return (
		<WrapperUI>
			<RenderBtnJSX />
			<LineUI style={{ width: `${width}px`, transform: `translateX(${offsetX}px)` }} />
		</WrapperUI>
	);
};

export default Tabs;
