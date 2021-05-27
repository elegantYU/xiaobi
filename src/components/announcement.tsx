import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Update from '@Const/update';

interface Props {
	closeEvent: () => void;
	reward: () => void;
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

const ScaleIn = keyframes`
	0% {
		transform: scale(0.5);
	}
	100% {
		transform: scale(1);
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
	transform: scale(0.5);
	animation: ${ScaleIn} 0.4s ease forwards;
`;
const ScrollUI = styled.div`
	overflow: auto;
	height: 100%;
	padding: 40px 0;
`;
const Block = styled.div`
	width: 400px;
	margin: 0 auto;
	margin-bottom: 20px;
	border-radius: 6px;
	background-color: ${(p) => p.theme.updateBg};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 10px 20px;
`;

const TitleUI = styled.div`
	line-height: 30px;
	font-size: 16px;
	color: ${(p) => p.theme.updateTitle};
	display: flex;
	align-items: center;
	justify-content: space-between;

	i {
		font-size: 24px;
		cursor: pointer;
	}
`;

const ContentUI = styled.ul`
	li {
		font-size: 14px;
		padding: 5px 0;
		color: ${(p) => p.theme.updateDesc};

		a {
			font-size: 14px;
			color: ${(p) => p.theme.updateLink};
		}
	}
`;

const Announcement: React.FC<Props> = ({ closeEvent, reward }) => {
	const [out, setOut] = useState(false);

	const handleClick = () => {
		setOut(true);
		setTimeout(closeEvent, 200);
	};

	const renderBlockJSX = () =>
		Update.map((v, i) => (
			<Block key={i}>
				<TitleUI>
					{v.version} 版本
					<i className='iconfont iconqian' onClick={reward} />
				</TitleUI>
				<ContentUI>
					{v.content.map((l) => (
						<li key={l} dangerouslySetInnerHTML={{ __html: l }} />
					))}
				</ContentUI>
			</Block>
		));

	return (
		<WrapperUI className={`${out ? 'fadeOut' : ''}`}>
			<CloseUI className='iconfont iconguanbi' onClick={handleClick} />
			<ScrollUI>{renderBlockJSX()}</ScrollUI>
		</WrapperUI>
	);
};

export default Announcement;
