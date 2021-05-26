import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import wechat from '@Styles/images/wechat.jpg';
import alibaba from '@Styles/images/alibaba.jpg';

interface Props {
	closeEvent: () => void;
}

const FadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;
const FadeOut = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;

const WrapperUI = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	backdrop-filter: blur(5px);
	animation: ${FadeIn} 0.2s ease forwards;
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	&.fadeOut {
		animation: ${FadeOut} 0.2s ease forwards;
	}
`;

const CloseUI = styled.div`
	position: absolute;
	top: 25px;
	right: 24px;
	color: ${(p) => p.theme.updateClose};
	cursor: pointer;
	font-size: 30px;
`;

const PanelUI = styled.div`
	width: 180px;
	height: 240px;
	border-radius: 6px;
	background-color: white;
	overflow: hidden;
	box-shadow: 0 0 10px rgb(0 0 0 / 10%);

	.img {
		height: 180px;
		padding: 30px;
	}
	img {
		width: 120px;
		height: 120px;
		object-fit: contain;
	}
	.footer {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		padding: 0 20px;
	}

	&.wechat .img {
		background-color: #2ba245;
	}
	&.alibaba .img {
		background-color: #027aff;
	}
`;

const Reward: React.FC<Props> = ({ closeEvent }) => {
	const [out, setOut] = useState(false);

	const handleClick = () => {
		setOut(true);
		setTimeout(closeEvent, 200);
	};

	return (
		<WrapperUI className={`${out ? 'fadeOut' : ''}`}>
			<CloseUI className='iconfont iconguanbi' onClick={handleClick} />
			<PanelUI className='wechat'>
				<div className='img'>
					<img src={wechat} alt='' />
				</div>
				<div className='footer'>感谢对开发者的鼓励</div>
			</PanelUI>
			<PanelUI className='alibaba'>
				<div className='img'>
					<img src={alibaba} alt='' />
				</div>
				<div className='footer'>当然白嫖也可以</div>
			</PanelUI>
		</WrapperUI>
	);
};

export default Reward;
