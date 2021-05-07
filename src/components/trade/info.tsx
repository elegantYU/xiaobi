import React, { useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '@Utils/index';

interface Props {
	data: any;
}

const WrapperUI = styled.div`
	padding: 0 20px 10px;
`;

const TitleUI = styled.div`
	height: 60px;
	display: flex;
	align-items: center;
	gap: 4px;
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};

	img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		object-fit: cover;
	}

	p {
		font-size: 18px;
	}
`;

const LabelUI = styled.div`
	height: 42px;
	display: grid;
	align-items: center;
	grid-template-columns: 100px 1fr;
	justify-content: flex-end;
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};

	label {
		font-size: 14px;
		justify-self: flex-start;
		color: ${(p) => p.theme.tradeHeadDesc};
	}

	p {
		font-size: 16px;
		text-align: right;
		color: ${(p) => p.theme.tradeBlack};
	}

	a {
		font-size: 16px;
		text-align: right;
		white-space: pre-wrap;
		word-break: break-word;
		color: ${(p) => p.theme.tradeBlack};

		&:hover {
			color: ${(p) => p.theme.tabFontHover};
		}
	}
`;

const DescUI = styled.div`
	text-align: left;
	color: ${(p) => p.theme.tradeBlack};

	p {
		font-size: 14px;
		line-height: 1.5em;
	}

	.title {
		line-height: 40px;
	}
`;

const ItemList = [
	{ key: 'start_date', value: '启动日期' },
	{ key: 'total_supply', value: '发行总量' },
	{ key: 'available_supply', value: '流通总量' },
	{ key: 'start_trading_price', value: '初始价格' },
	{ key: 'turnover_rate', value: '换手率' },
	{ key: 'percent_rate_of_return', value: '历史回报率' },
	{ key: 'link', value: '链接' },
];
const LinkList = [
	{ key: 'website', value: '官网' },
	{ key: 'whitepaper', value: '白皮书' },
	{ key: 'github', value: 'github' },
	{ key: 'telegram', value: '电报' },
	{ key: 'twitter', value: '推特' },
];

const Info: React.FC<Props> = ({ data }) => {
	const {
		project_info: {
			content: [info],
		},
	} = data;
	const { list } = info;
	const desc = (list as any[]).find((v) => v.key === 'description')?.content || '--';

	const renderLabelJSX = () =>
		ItemList.map((v) => {
			const item = (list as any[]).find((val) => val.key === v.key);

			switch (v.key) {
				case 'link':
					return LinkList.map((val) => {
						const curr = (item?.content as any[]).find((l) => val.key === l.key);

						return (
							<LabelUI key={val.key}>
								<label>{val.value}</label>
								<a href={curr?.link} target='_blank'>
									{curr?.link || '--'}
								</a>
							</LabelUI>
						);
					});

				case 'start_date':
					return (
						<LabelUI key={v.key}>
							<label>{v.value}</label>
							<p>{item ? formatTime(item.content, '{y}/{m}/{d}') : '--'}</p>
						</LabelUI>
					);
				default:
					return (
						<LabelUI key={v.key}>
							<label>{v.value}</label>
							<p>{item?.content || '--'}</p>
						</LabelUI>
					);
			}
		});

	return (
		<WrapperUI>
			<TitleUI>
				<img src={data.logo} />
				<p>{data.pair}</p>
			</TitleUI>
			{renderLabelJSX()}
			<DescUI>
				<p className='title'>简介</p>
				<p className='desc' dangerouslySetInnerHTML={{ __html: desc }}></p>
			</DescUI>
		</WrapperUI>
	);
};

export default Info;
