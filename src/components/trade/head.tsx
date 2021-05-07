import React, { useState } from 'react';
import styled from 'styled-components';
import { TableList } from '@InterFace/index';
import Loading from '@Components/loading/tradeBannerLoading';

interface Props {
	data: TableList | null;
}

const WrapperUI = styled.div`
	display: flex;
	height: 70px;
	justify-content: space-between;
	padding: 10px;
	background-color: ${(p) => p.theme.panelBg};
`;

const PriceUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	span {
		font-size: 26px;
		font-weight: bold;
	}

	.cny {
		color: ${(p) => p.theme.tradeHeadDesc};
		font-size: 16px;
	}

	.percent {
		margin-left: 6px;
		font-size: 16px;
	}

	&.increase {
		color: ${(p) => p.theme.increase};
	}
	&.decrease {
		color: ${(p) => p.theme.decrease};
	}
`;

const DataUI = styled.div`
	display: grid;
	grid-template-columns: 40px 1fr;
	align-items: center;
	gap: 0 4px;

	label {
		font-size: 12px;
		color: ${(p) => p.theme.tradeHeadDesc};
	}
	p {
		font-size: 12px;
		color: ${(p) => p.theme.tradeBlack};
		justify-self: flex-end;
	}
`;

const Head: React.FC<Props> = ({ data }) => {
	if (!data) {
		return (
			<WrapperUI>
				<Loading />
			</WrapperUI>
		);
	}

	const { currency, anchor, percent, cny, usd, volume, high_24h, low_24h } = data;
	const numSymbol = Number(percent);
	const symbol = numSymbol > 0 ? '+' : '';
	const className = numSymbol > 0 ? 'increase' : 'decrease';
	const str = `${symbol}${percent}%`;

	return (
		<WrapperUI>
			<PriceUI className={className}>
				<span>{usd}</span>
				<p>
					<span className='cny'>￥{cny}</span>
					<span className='percent'>{str}</span>
				</p>
			</PriceUI>
			<DataUI>
				<label>高</label>
				<p>{high_24h}</p>
				<label>低</label>
				<p>{low_24h}</p>
				<label>24H额</label>
				<p>{volume}</p>
			</DataUI>
		</WrapperUI>
	);
};

export default Head;
