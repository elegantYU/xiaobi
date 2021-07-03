import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CMDS } from '@Const/commands';
import { WS_TICKET } from '@Const/ws';
import useMessage from '@Src/hooks/useMessage';
import { BannerItem } from '@InterFace/index';
import Loading from '@Components/loading/bannerLoading';
import { convertCNUnit } from '@Utils/index';
import Error from '@Components/error';
import useSocket from '@Hooks/useSocket';

const WrapperUI = styled.div.attrs({ className: 'banner' })`
	height: 70px;
	padding: 4px;
	margin-bottom: 10px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	background-color: ${(p) => p.theme.panelBg};
	border-radius: 0 0 6px 6px;
`;

const ItemUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 2px;
	cursor: pointer;
	border-radius: 6px;

	&:hover {
		background-color: ${(p) => p.theme.bannerHover};
	}
`;

const TitleUI = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 4px;

	.title {
		font-size: 12px;
		color: ${(p) => p.theme.boldFont};
	}

	.rate {
		font-size: 12px;
		&.increase {
			color: ${(p) => p.theme.increase};
		}
		&.decrease {
			color: ${(p) => p.theme.decrease};
		}
	}
`;

const UsdUI = styled.p`
	font-size: 16px;
	font-weight: bold;
	&.increase {
		color: ${(p) => p.theme.increase};
	}
	&.decrease {
		color: ${(p) => p.theme.decrease};
	}
`;

const CnyUI = styled.p`
	font-size: 12px;
	color: ${(p) => p.theme.bannerDesc};
`;

const RenderItemJSX = (data: any) => {
	if (data && data.code) {
		return Array.from(new Array(4)).map((_, i) => <Error type='small' key={i} />);
	}
	return data ? (
		(data as BannerItem[]).map(({ alias, pair, anchor, currency, percent, cny, usd }) => (
			<ItemUI key={pair} title={alias}>
				<TitleUI>
					<p className='title'>
						{currency}/{anchor}
					</p>
					<p className={`rate ${percent < 0 ? 'decrease' : 'increase'}`}>
						{percent < 0 ? '' : '+'}
						{percent}%
					</p>
				</TitleUI>
				<UsdUI className={percent < 0 ? 'decrease' : 'increase'}>{convertCNUnit(usd)}</UsdUI>
				<CnyUI>￥{convertCNUnit(cny)}</CnyUI>
			</ItemUI>
		))
	) : (
		<Loading />
	);
};

const Banner = () => {
	const { data } = useMessage({ command: CMDS.CMD_COINPAGE });
	const { wsData } = useSocket({ url: WS_TICKET, data });
	const [bannerData, setBannerData] = useState(null);

	useEffect(() => {
		if (data && !data.code) {
			if (!wsData) {
				setBannerData(data);
			} else {
				const combine = data.map((v: any) => {
					if (v.id === (wsData as any).id) {
						return { ...v, ...wsData };
					}
					return { ...v };
				});
				setBannerData(combine);
			}
		}
	}, [data, wsData]);

	return <WrapperUI>{RenderItemJSX(bannerData)}</WrapperUI>;
};

export default Banner;
