import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
	data: Array<{
		label: string;
		value: any;
	}>;
	active: any;
	field: string;
	clickEvent: (value: any, key: string) => void;
}

const WrapperUI = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
`;

const ItemUI = styled.div`
	height: 30px;
	padding: 0 8px;
	font-size: 12px;
	display: flex;
	align-items: center;
	cursor: pointer;
	color: ${(p) => p.theme.ratio};
	background-color: ${(p) => p.theme.ratioBg};
	border-radius: 6px;

	&:hover {
		background-color: ${(p) => p.theme.ratioBgHover};
	}

	&.active {
		color: ${(p) => p.theme.ratioActive};
		background-color: ${(p) => p.theme.ratioActiveBg};
		&:hover {
			background-color: ${(p) => p.theme.ratioActiveBgHover};
		}
	}
`;

const RatioGroup: React.FC<Props> = ({ data, active, field, clickEvent }) => {
	const renderItemJSX = () =>
		data.map(({ label, value }) => (
			<ItemUI key={value} className={active === value ? 'active' : ''} onClick={() => clickEvent(value, field)}>
				{label}
			</ItemUI>
		));

	return <WrapperUI>{renderItemJSX()}</WrapperUI>;
};

export default RatioGroup;
