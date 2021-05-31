import React from 'react';
import styled from 'styled-components';
import { SearchData } from '@InterFace/index';

interface Props {
	data: SearchData;
	onClick: () => void;
}

const WrapperUI = styled.div`
	height: 45px;
	padding: 0 10px;
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 40px;
	background-color: ${(p) => p.theme.panelBg};
	align-items: center;
	gap: 2px;

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100% - 20px);
		height: 1px;
		background-color: ${(p) => p.theme.tdBorder};
	}

	&:hover {
		background-color: ${(p) => p.theme.tdHover};
	}
`;
const TitleUI = styled.div`
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: bold;
	color: ${(p) => p.theme.tdTitle};
	cursor: pointer;
	gap: 10px;

	img {
		width: 24px;
		height: 24px;
		object-fit: contain;
		border-radius: 50%;
	}
`;
const MarketUI = styled.div`
	font-size: 16px;
	color: ${(p) => p.theme.tdTitle};
	justify-self: flex-end;
`;
const StarUI = styled.i`
	width: 100%;
	height: 100%;
	font-size: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(p) => p.theme.tdTitle};
	cursor: pointer;

	&.active {
		color: ${(p) => p.theme.tabFontHover};
	}
`;

const ListBlock: React.FC<Props> = ({ data, onClick }) => {
	const { id, pair, logo, marketName, active, symbol, kline } = data;
	const starClass = `iconfont ${active ? 'iconshoucang active' : 'iconshoucang1'}`;

	const openCoinPage = () => {
		const link = `https://www.mytokencap.com/currency/${symbol}/${id}`;
		window.open(link, '_blank');
	};

	return (
		<WrapperUI>
			<TitleUI onClick={openCoinPage}>
				<img src={logo} alt='' />
				{pair}
			</TitleUI>
			<MarketUI>{marketName}</MarketUI>
			<StarUI className={starClass} onClick={onClick} />
		</WrapperUI>
	);
};

export default ListBlock;
