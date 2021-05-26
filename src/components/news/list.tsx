import React, { useState, useRef, memo, useCallback, RefObject } from 'react';
import styled, { keyframes, css } from 'styled-components';

import Loading from '@Components/loading/newsLoading';
import FlashLoading from '@Components/loading/flashLoading';
import DayBlock from './dayBlock';

interface Props {
	data: any[];
	idx: number;
	scrollEl: RefObject<HTMLDivElement>;
	scrollEvent: () => void;
}

const bounce = keyframes`
	0% {
		height: 5px;
	}
	50% {
		height: 20px;
	}
	100% {
		height: 5px;
	}
`;

const WrapperUI = styled.div`
	height: 464px;
	overflow: auto;
`;
const bounceLine = ({ dur, delay }: { dur: number; delay: number }) => css`
	animation: ${bounce} ${dur}s ease ${delay}s infinite;
`;
const LoadingUI = styled.div`
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;

	.line {
		width: 3px;
		height: 20px;
		border-radius: 1.5px;
		background-color: ${(p) => p.theme.newsTitleHover};

		&:nth-of-type(1) {
			${bounceLine({ dur: 0.6, delay: 0 })}
		}
		&:nth-of-type(2) {
			${bounceLine({ dur: 0.6, delay: 0.1 })}
		}
		&:nth-of-type(3) {
			${bounceLine({ dur: 0.6, delay: 0.2 })}
		}
		&:nth-of-type(4) {
			${bounceLine({ dur: 0.6, delay: 0.3 })}
		}
	}
`;

const List: React.FC<Props> = ({ data, idx, scrollEvent, scrollEl }) => {
	const handleScroll = () => {
		if (scrollEl?.current) {
			const { offsetHeight, scrollHeight, scrollTop } = scrollEl?.current;
			const offset = 20; //	离底部20px时加载

			if (scrollHeight - scrollTop - offset <= offsetHeight) {
				scrollEvent(); //	加载下页
			}
		}
	};

	const renderListJSX = useCallback(
		() =>
			data ? (
				data.map((d, i) => <DayBlock date={d.date} list={d.list} idx={idx} key={i} />)
			) : idx === 1 ? (
				<FlashLoading />
			) : (
				<Loading />
			),
		[data],
	);

	return (
		<WrapperUI ref={scrollEl} onScroll={handleScroll}>
			{renderListJSX()}
			<LoadingUI>
				{Array.from(new Array(4)).map((v, i) => (
					<p className='line' key={i} />
				))}
			</LoadingUI>
		</WrapperUI>
	);
};

export default List;
