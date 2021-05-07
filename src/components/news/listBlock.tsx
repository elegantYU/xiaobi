import React, { useState } from 'react';
import styled from 'styled-components';
import { NewsData } from '@InterFace/index';

interface Props {
	data: NewsData;
	idx?: number;
}

const WrapperUI = styled.div`
	padding: 8px;
	display: grid;
	grid-template-columns: 60px 1fr;
	gap: 10px;
	position: relative;

	&::before {
		position: absolute;
		content: '';
		width: calc(100% - 16px);
		height: 1px;
		bottom: 0px;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${(p) => p.theme.tabBorder};
	}

	&.cursor {
		cursor: pointer;
	}
`;
const AvatarUI = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 6px;
	background-color: ${(p) => p.theme.newsItemAvatar};

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

const FlashTimeUI = styled(TimeUI)`
	font-size: 14px;
	align-items: flex-start;
	justify-content: center;
	color: ${(p) => p.theme.newsItemTime2};
`;

const FlashTitleUI = styled.div`
	font-size: 14px;
	color: ${(p) => p.theme.newsItemTitle};
	text-align: left;
	white-space: pre-wrap;
`;
const FlashContentUI = styled.div`
	color: ${(p) => p.theme.newsItemDesc};
	text-align: left;
	font-size: 12px;
`;

const ListBlock: React.FC<Props> = ({ data, idx }) => {
	const { avatar, time, title, content, link } = data;

	const handleClick = () => {
		window.open(link, '_blank');
	};

	if (idx) {
		return (
			<WrapperUI onClick={handleClick} title={title} className='cursor'>
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
			</WrapperUI>
		);
	}

	return (
		<WrapperUI title={title}>
			<FlashTimeUI>{time}</FlashTimeUI>
			<CombinUI>
				<FlashTitleUI>{title}</FlashTitleUI>
				<FlashContentUI>{content}</FlashContentUI>
			</CombinUI>
		</WrapperUI>
	);
};

export default ListBlock;
