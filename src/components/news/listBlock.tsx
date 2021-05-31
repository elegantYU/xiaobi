import React from 'react';
import styled from 'styled-components';
import { NewsData, NewsEventData } from '@InterFace/index';
import { formatTime } from '@Utils/index';

interface Props {
	data?: any;
	idx?: number;
}

const WrapperUI = styled.div`
	padding: 8px 24px;
	padding-right: 0;
	position: relative;

	&::before {
		position: absolute;
		content: '';
		width: 1px;
		height: 100%;
		left: 4px;
		top: 0;
		background-color: ${(p) => p.theme.newsBorder};
	}

	&.cursor {
		cursor: pointer;
	}
`;

const ContentBoxUI = styled.div`
	padding-left: 40px;
	display: flex;
	flex-direction: column;
	gap: 2px;
`;
const TitleUI = styled.div`
	display: grid;
	grid-template-columns: 42px 1fr;
	color: ${(p) => p.theme.newsItemTitle};
	text-align: left;
	line-height: 20px;
	position: relative;
	margin-bottom: 2px;
	cursor: pointer;

	p {
		font-size: 14px;
	}

	.title {
		font-weight: bold;
		color: ${(p) => p.theme.newsTitle};
	}

	&::before {
		position: absolute;
		content: '';
		top: 5px;
		left: -24px;
		width: 8px;
		height: 8px;
		background-color: ${(p) => p.theme.newsGrade4};
		border-radius: 50%;
	}

	&.grade4 {
		&::before {
			background-color: ${(p) => p.theme.newsGrade4};
		}
		.title {
			color: ${(p) => p.theme.newsGrade4};
		}
	}
	&.grade5 {
		&::before {
			background-color: ${(p) => p.theme.newsGrade5};
		}
		.title {
			color: ${(p) => p.theme.newsGrade5};
		}
	}
`;
const FlashContentUI = styled.div`
	color: ${(p) => p.theme.newsItemDesc};
	text-align: left;
	font-size: 12px;
	cursor: pointer;
`;
const ImagesUI = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);

	.image {
		width: 100%;
		object-fit: contain;
	}
`;
const FooterUI = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.like {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;
const LikeBtnUI = styled.div`
	padding: 4px;
	display: flex;
	align-items: center;
	color: ${(p) => p.theme.newsItemDesc};
	gap: 5px;
	cursor: pointer;

	&.increase .iconfont,
	&.increase .count {
		color: ${(p) => p.theme.increase};
	}
	&.decrease .iconfont,
	&.decrease .count {
		color: ${(p) => p.theme.decrease};
	}
`;
const TagUI = styled.div`
	padding: 3px 4px;
	color: ${(p) => p.theme.newsAttr};
	background-color: ${(p) => p.theme.newsGrade4};
	border-radius: 2px;

	&.grade5 {
		background-color: ${(p) => p.theme.newsGrade5};
	}
`;
const ContentUI = styled.div`
	color: ${(p) => p.theme.newsItemDesc};
	text-align: left;
	font-size: 14px;
	cursor: pointer;

	&:hover {
		color: ${(p) => p.theme.newsTitleHover};
	}
`;

const ListBlock: React.FC<Props> = ({ data, idx }) => {
	const handleClick = () => {
		window.open(data.link, '_blank');
	};

	if (idx === 1) {
		const { time, title, author } = data as NewsEventData;

		return (
			<WrapperUI>
				<TitleUI>
					<p>{formatTime(time, '{h}:{i}:{s}')}</p>
				</TitleUI>
				<ContentUI onClick={handleClick}>{title}</ContentUI>
			</WrapperUI>
		);
	}
	const { title, content, grade, upCount, downCount, commentCount, attribute, time, images } = data as NewsData;
	const titleClass = attribute ? 'grade4' : grade === 5 ? 'grade5' : '';

	const renderImageJSX = () =>
		images?.length ? (
			<ImagesUI>
				{images.map((s) => (
					<img className='image' src={s} key={s} onClick={handleClick} alt='fail' />
				))}
			</ImagesUI>
		) : null;

	return (
		<WrapperUI>
			<TitleUI className={titleClass}>
				<p>{time}</p>
				<p className='title' onClick={handleClick}>
					{title}
				</p>
			</TitleUI>
			<ContentBoxUI>
				<FlashContentUI onClick={handleClick}>{content}</FlashContentUI>
				{renderImageJSX()}
				<FooterUI>
					<div className='like' onClick={handleClick}>
						<LikeBtnUI className='increase'>
							<i className='iconfont iconchangyongiconyikuozhan_huaban22' />
							利好 <span className='count'>{upCount}</span>
						</LikeBtnUI>
						<LikeBtnUI className='decrease'>
							<i className='iconfont iconchangyongiconyikuozhan_huaban23' />
							利空 <span className='count'>{downCount}</span>
						</LikeBtnUI>
						<LikeBtnUI>
							<i className='iconfont iconpinglun' />
							评论 {commentCount}
						</LikeBtnUI>
					</div>
					{attribute ? <TagUI className={grade === 5 ? 'grade5' : ''}>精选</TagUI> : null}
				</FooterUI>
			</ContentBoxUI>
		</WrapperUI>
	);
};

export default ListBlock;
