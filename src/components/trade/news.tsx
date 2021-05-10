import React, { useState } from 'react';
import styled from 'styled-components';
import { NewsData } from '@Src/interface';

interface Props {
	data: NewsData[];
}

interface ItemProps {
	data: NewsData;
}

const WrapperUI = styled.div`
	min-height: 440px;
`;

const ItemUI = styled.div`
	padding: 8px;
	display: grid;
	grid-template-columns: 60px 1fr;
	gap: 10px;
	border-bottom: 1px solid ${(p) => p.theme.tabBorder};
	cursor: pointer;
`;

const AvatarUI = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 6px;
	background-color: ${(p) => p.theme.newsItemAvatar};
	overflow: hidden;

	img {
		width: 60px;
		height: 60px;
		object-fit: cover;
	}
`;

const CombinUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4px;
`;

const TitleUI = styled.div`
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	font-size: 14px;
	color: ${(p) => p.theme.newsItemTitle};
	text-align: left;
	height: 20px;
	line-height: 20px;
`;

const ContentUI = styled.div`
	height: 34px;
	color: ${(p) => p.theme.newsItemDesc};
	text-align: left;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	font-size: 12px;
`;

const DescCombineUI = styled.div`
	display: grid;
	grid-template-columns: 1fr 60px;
	gap: 4px;
`;

const TimeUI = styled.div`
	font-size: 12px;
	white-space: nowrap;
	color: ${(p) => p.theme.newsItemTime};
	display: flex;
	align-items: flex-end;
`;

// news item
const Item: React.FC<ItemProps> = ({ data: { avatar, title, content, time, link } }) => {
	const handleClick = () => window.open(link);

	return (
		<ItemUI title={title} onClick={handleClick}>
			<AvatarUI>
				<img src={avatar} alt='' />
			</AvatarUI>
			<CombinUI>
				<TitleUI>{title}</TitleUI>
				<DescCombineUI>
					<ContentUI>{content}</ContentUI>
					<TimeUI>{time}</TimeUI>
				</DescCombineUI>
			</CombinUI>
		</ItemUI>
	);
};

const News: React.FC<Props> = ({ data }) => {
	const renderListJSX = () => data.map((d, i) => <Item data={d} key={i} />);

	return <WrapperUI>{renderListJSX()}</WrapperUI>;
};

export default News;
