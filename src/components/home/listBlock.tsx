import React, { useState } from 'react';
import styled from 'styled-components';
import RateBlock from '@Components/home/rateBlock';
import { TableList } from '@InterFace/index';

interface Props {
	data: TableList;
	onClick: () => void;
}

const WrapperUI = styled.div`
	display: grid;
	grid-template-columns: 120px auto 90px 90px;
	justify-items: flex-end;
	align-items: center;
	width: 100%;
	height: 45px;
	background-color: ${(p) => p.theme.panelBg};
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};
	padding: 0 8px;
	cursor: pointer;

	&:hover {
		background-color: ${(p) => p.theme.tdHover};
	}
`;

const TitleUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;

	.title {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		b {
			font-size: 16px;
			font-weight: bold;
			color: ${(p) => p.theme.tdTitle};
		}
		span {
			font-size: 12px;
			color: ${(p) => p.theme.tdType};
		}
	}

	.volume {
		font-size: 12px;
		color: ${(p) => p.theme.tdDesc};
	}
`;

const PriceUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;

	.usd {
		font-size: 16px;
		font-weight: bold;
		color: ${(p) => p.theme.tdTitle};
	}
	.cny {
		font-size: 12px;
		color: ${(p) => p.theme.tdDesc};
	}
`;

const ListBlock: React.FC<Props> = ({ data, onClick }) => {
	const { alias, anchor, currency, pair, usd, cny, percent, turnover, volume } = data;

	return (
		<WrapperUI title={pair} onClick={onClick}>
			<TitleUI>
				<div className='title'>
					<b>{currency}</b>
					<span>/{anchor}</span>
				</div>
				<div className='volume'>24H额 ￥{volume}</div>
			</TitleUI>
			<PriceUI>
				<p className='usd'>{usd}</p>
				<p className='cny'>￥{cny}</p>
			</PriceUI>
			<RateBlock data={turnover} />
			<RateBlock data={percent} type='rate' />
		</WrapperUI>
	);
};

export default ListBlock;
