import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NewsTabItem } from '@InterFace/index';

interface Props {
	idx: number;
	data: NewsTabItem[];
	clickEvent: (i: number) => void;
}

const WrapperUI = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 4px;

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
	z-index: 1;
`;

const Head: React.FC<Props> = ({ data, idx, clickEvent }) => {
	const [width, setWidth] = useState(0);
	const [offsetX, setOffsetX] = useState(0);

	const calcLineWidth = () => {
		const currentItem = document.querySelectorAll('.tab-item')[idx] as HTMLElement;
		const w = currentItem ? currentItem.offsetWidth : 0;
		const x = currentItem ? currentItem.offsetLeft : 0;

		setWidth(w);
		setOffsetX(x);
	};

	const renderBtnJSX = () =>
		data.map((v, i) => (
			<TabItemUI key={v.command} onClick={() => clickEvent(i)} className={v.active ? 'active' : ''}>
				{v.name}
			</TabItemUI>
		));

	useEffect(() => {
		calcLineWidth();
	}, [idx]);

	return (
		<WrapperUI>
			{renderBtnJSX()}
			<LineUI style={{ width: width + 'px', transform: `translateX(${offsetX}px)` }} />
		</WrapperUI>
	);
};

export default Head;
