import React from 'react';
import styled from 'styled-components';

interface Props {
	data: number | string | undefined;
	type?: 'rate' | 'turn';
}

const WrapperUI = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 68px;
	height: 28px;
	font-weight: bold;
	font-size: 14px;
	border-radius: 6px;

	&.amount {
		color: ${(p) => p.theme.volumeFont};
		background-color: ${(p) => p.theme.volumeBg};
	}

	&.increase {
		color: ${(p) => p.theme.rateFont};
		background-color: ${(p) => p.theme.increase};
	}
	&.decrease {
		color: ${(p) => p.theme.rateFont};
		background-color: ${(p) => p.theme.decrease};
	}
`;

const RateBlock: React.FC<Props> = ({ data, type }) => {
	const numSymbol = Number(data);
	if (type === 'rate') {
		const symbol = numSymbol > 0 ? '+' : '';
		const className = numSymbol > 0 ? 'increase' : 'decrease';
		const str = `${symbol}${data}%`;

		return <WrapperUI className={className}>{str}</WrapperUI>;
	}

	return <WrapperUI className='amount'>{numSymbol}%</WrapperUI>;
};

export default RateBlock;
