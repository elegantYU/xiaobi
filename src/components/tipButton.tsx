import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
	icon: string;
	placement: 'top' | 'left';
	outState?: boolean; //	外层状态控制
	onClick?: () => void;
}

const fadeIn = keyframes`
	from: {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
const fadeOut = keyframes`
	from: {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

export const WrapperUI = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;
	color: ${(p) => p.theme.tabFont};

	&.active,
	&:hover {
		color: ${(p) => p.theme.tabFontHover};
	}
`;

export const TipUI = styled.div`
	position: absolute;
	padding: 2px 4px;
	border-radius: 2px;
	font-size: 12px;
	pointer-events: none;
	background-color: ${(p) => p.theme.tabTipBg};
	color: ${(p) => p.theme.tabTip};
	white-space: nowrap;
	opacity: 0;

	&::before {
		position: absolute;
		content: '';
		border-style: solid;
	}

	&.tip-show {
		animation: ${fadeIn} 0.12s linear forwards;
	}
	&.tip-hide {
		animation: ${fadeOut} 0.12s linear forwards;
	}

	&.top {
		top: 0;
		left: 50%;
		transform: translate(-50%, calc(-100% - 4px));

		&::before {
			bottom: -8px;
			left: 50%;
			transform: translateX(-50%);
			border-width: 4px 3px;
			border-color: ${(p) => p.theme.tabTipBg} transparent transparent transparent;
		}
	}
	&.left {
		top: 50%;
		left: 0;
		transform: translate(calc(-100% - 4px), -50%);
		&::before {
			right: -6px;
			top: 50%;
			transform: translateY(-50%);
			border-width: 4px 3px;
			border-color: transparent transparent transparent ${(p) => p.theme.tabTipBg};
		}
	}
`;

const TipButton: React.FC<Props> = ({ icon, placement, children, outState, onClick }) => {
	const [active, setActive] = useState(false);
	const [isShow, setIsShow] = useState(false);
	const className = `${placement} ${isShow ? 'tip-show' : 'tip-hide'}`;

	const handleMouseIn = () => setIsShow(true);
	const handleMouseOut = () => setIsShow(false);

	useEffect(() => {
		setActive(!!outState);
	}, [outState]);

	return (
		<WrapperUI
			className={`iconfont ${icon} ${active ? 'active' : ''}`}
			onMouseEnter={handleMouseIn}
			onMouseOut={handleMouseOut}
			onClick={onClick}
		>
			<TipUI className={className}>{children}</TipUI>
		</WrapperUI>
	);
};

export default TipButton;
