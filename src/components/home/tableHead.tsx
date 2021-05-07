import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SortData } from '@InterFace/index';

interface Props {
	clickEvent: (p: SortData) => void;
}

interface ItemProps {
	text: string;
	field: string;
	active?: boolean;
	clickEvent: (P: SortData) => void;
}

const WrapperUI = styled.div`
	height: 30px;
	border-radius: 6px;
	background-color: ${(p) => p.theme.panelBg};
	display: grid;
	padding: 0 8px;
	grid-template-columns: 120px auto 90px 90px;
	justify-items: flex-end;
`;

const CaretUI = styled.div`
	color: ${(p) => p.theme.tableHead};
	position: relative;
	display: inline-block;
	width: 6px;
	height: 18px;
	vertical-align: middle;
	text-align: center;
	font-weight: 400;

	.sorter-up {
		line-height: 6px;
		display: grid;
		grid-template-rows: 1fr 1fr;
		gap: 2px;
		width: 6px;
		height: 17px;
		cursor: pointer;
		pointer-events: none;
		position: relative;

		&.up::before {
			border-color: transparent transparent ${(p) => p.theme.tableSort} transparent;
		}

		&.down::after {
			border-color: ${(p) => p.theme.tableSort} transparent transparent transparent;
		}

		&::before {
			content: '';
			width: 0px;
			height: 0px;
			border-width: 4px 3px;
			border-style: solid;
			border-color: transparent transparent ${(p) => p.theme.tableHead} transparent;
		}

		&::after {
			content: '';
			width: 0px;
			height: 0px;
			border-width: 4px 3px;
			border-style: solid;
			border-color: ${(p) => p.theme.tableHead} transparent transparent transparent;
		}
	}
`;

const ItemUI = styled.div`
	font-size: 12px;
	color: ${(p) => p.theme.tableHead};
	display: flex;
	align-items: center;
	gap: 2px;
	cursor: pointer;
	user-select: none;
`;

const CombinUI = styled.div`
	color: ${(p) => p.theme.tableHead};
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	gap: 2px;
`;

const Item: React.FC<ItemProps> = ({ text, field, active, clickEvent }) => {
	const [sortRule, setSortRule] = useState(0);

	const className = `sorter-up ${!sortRule ? '' : sortRule === 1 ? 'up' : 'down'}`;

	const toggleSort = () => {
		const nextSort = sortRule === 2 ? 0 : sortRule + 1;

		setSortRule(nextSort);
		clickEvent({ field, sort: nextSort });
	};

	useEffect(() => {
		!active && setSortRule(0);
	}, [active]);

	return (
		<ItemUI onClick={toggleSort}>
			<span>{text}</span>
			<CaretUI>
				<span className={className}></span>
			</CaretUI>
		</ItemUI>
	);
};

const Head: React.FC<Props> = ({ clickEvent }) => {
	const [itemList, setItemList] = useState([
		{ text: '名称', field: 'currency', active: false },
		{ text: '24H额', field: 'volume', active: false },
		{ text: '最新价', field: 'usd', active: false },
		{ text: '换手率', field: 'turnover', active: false },
		{ text: '涨跌幅', field: 'percent', active: false },
	]);

	const handleClick = (sort: SortData) => {
		const temp = itemList.map((v) => ({ ...v, active: v.field === sort.field }));
		setItemList(temp);
		clickEvent(sort);
	};

	const renderItemJSX = () =>
		itemList
			.slice(2)
			.map(({ text, field, active }) => (
				<Item text={text} field={field} active={active} clickEvent={handleClick} key={text} />
			));

	return (
		<WrapperUI>
			<CombinUI>
				<Item text={itemList[0].text} field={itemList[0].field} active={itemList[0].active} clickEvent={handleClick} />
				/
				<Item text={itemList[1].text} field={itemList[1].field} active={itemList[1].active} clickEvent={handleClick} />
			</CombinUI>
			{renderItemJSX()}
		</WrapperUI>
	);
};

export default Head;
