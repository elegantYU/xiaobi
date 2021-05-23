import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import type { Props } from '.';

interface SelfProps extends Props {
	uid: string;
	destory: (key: string) => void;
}

const slideIn = keyframes`
	0% {
		transform: translate(-50%, -5px);
		opacity: 0;
	}
	100% {
		transform: translate(-50%, 0);
		opacity: 1;
	}
`;
const slideOut = keyframes`
	0% {
		transform: translate(-50%, 0);
		opacity: 1;
	}
	100% {
		transform: translate(-50%, -5px);
		opacity: 0;
	}
`;

const WrapperUI = styled.div`
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	opacity: 0;
	max-width: 220px;
	border-radius: 6px;
	font-size: 12px;
	padding: 10px;
	text-align: center;

	&.info {
		background-color: #0d2346d9;
		color: white;
	}

	&.in {
		animation: ${slideIn} 0.2s ease forwards;
	}
	&.out {
		animation: ${slideOut} 0.2s ease forwards;
	}
`;

const Message: React.FC<SelfProps> = ({ text, type, uid, during, destory }) => {
	const [active, setActive] = useState(false);
	const className = `in ${active ? 'out' : ''} ${type}`;

	setTimeout(() => {
		setActive(true);
	}, during || 2000);

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				destory(uid);
			}, 200);
		}
	}, [active]);

	return <WrapperUI className={className}>{text}</WrapperUI>;
};

export default Message;
