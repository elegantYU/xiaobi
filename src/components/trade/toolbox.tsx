import React, { useState, useEffect, useContext, memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Context } from '@Src/context';
import TipButton from '@Components/tipButton';
import { changeFollowState, changeSelfState } from '@Api/follow';
import useMessage from '@Src/hooks/useMessage';
import { CMDS } from '@Src/constants/commands';

interface Props {
	id: number;
}

interface HighTipProps {
	id: number;
	before: string;
	after: string;
	status: boolean;
	color: string;
	clickEvent: (id: number) => void;
}

interface EventList {
	self: (id: number) => void;
	follow: (id: number) => void;
	notice: (id: number) => void;
}

const rollIn = keyframes`
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
`;
const rollOut = keyframes`
from {
	transform: translateX(0);
}
to {
	transform: translateX(100%);
}
`;

const WrapperUI = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 50%;
	position: fixed;
	bottom: 5px;
	right: 65px;

	&.close {
		right: 45px;
	}

	&:hover,
	&.active {
		transform: translateY(-5px);
	}
`;

const MoreUI = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 50%;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: relative;
	z-index: 1;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	background-color: ${(p) => p.theme.tradeDrawerBg};
	color: ${(p) => p.theme.tradeDrawer};

	&:hover {
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
	}
`;

const GroupBoxUI = styled.div`
	width: 140px;
	border-radius: 17.5px;
	height: 35px;
	position: absolute;
	top: 0;
	right: 0;
	padding-right: 35px;
	overflow: hidden;
	pointer-events: none;

	&.active {
		pointer-events: all;
		overflow: visible;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
		background-color: ${(p) => p.theme.tradeDrawerGroup};
	}
`;

const GroupUI = styled.div`
	width: 140px;
	height: 35px;
	display: flex;
	align-items: center;
	animation: ${rollIn} 0.15s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
	padding-left: 4px;

	&.close {
		animation: ${rollOut} 0.15s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
	}
`;

const ItemUI = styled.div`
	height: 32px;
	&.yellow {
		.iconfont {
			color: ${(p) => p.theme.yellow};
		}
	}
	&.pink {
		.iconfont {
			color: ${(p) => p.theme.pink};
		}
	}
	&.blue {
		.iconfont {
			color: ${(p) => p.theme.blue};
		}
	}
`;

const HighTip: React.FC<HighTipProps> = ({ id, before, after, status, color, clickEvent, children }) => {
	const icon = status ? after : before;

	return (
		<ItemUI className={color}>
			<TipButton icon={icon} placement='top' onClick={() => clickEvent(id)}>
				{children}
			</TipButton>
		</ItemUI>
	);
};

const TipsProps = [
	{
		id: 0,
		key: 'self',
		before: 'iconshoucang1',
		after: 'iconshoucang',
		status: false,
		color: 'yellow',
		text: '自选',
	},
	{
		id: 0,
		key: 'follow',
		before: 'iconxinaixin2',
		after: 'iconxinaixin1',
		status: false,
		color: 'pink',
		text: '特别关注',
	},
	{
		id: 0,
		key: 'notice',
		before: 'icontongzhi2',
		after: 'icontongzhi1',
		status: false,
		color: 'blue',
		text: '通知',
	},
];

const ToolBox: React.FC<Props> = ({ id }) => {
	const [list, setList] = useState(TipsProps);
	const { data: request } = useMessage({ command: CMDS.CMD_COINTSTATE, data: id });
	const [show, setShow] = useState(false);
	const { config } = useContext(Context);

	const isClose = !config?.nav;
	const className = `${isClose ? 'close' : ''}`;

	// 加入自选
	const eventList: EventList = {
		self: (id: number) => {
			changeSelfState(id);
			setList(list.map((v) => ({ ...v, status: v.key === 'self' ? !v.status : v.status })));
		},
		follow: (id: number) => {
			changeFollowState(id);
			setList(list.map((v) => ({ ...v, status: v.key === 'follow' ? !v.status : v.status })));
		},
		notice: (id: number) => {
			console.log('object');
		},
	};

	const handleToggle = () => setShow(!show);

	const renderBtnsJSX = () =>
		list.map((v) => (
			<HighTip {...v} key={v.key} clickEvent={eventList[v.key as keyof EventList]}>
				{v.text}
			</HighTip>
		));

	useEffect(() => {
		setShow(false);
	}, [id]);

	useEffect(() => {
		request && setList(TipsProps.map((v) => ({ ...v, id, status: request[v.key] })));
	}, [request]);

	return (
		<WrapperUI className={className}>
			<MoreUI className='iconfont iconyingyong' onClick={handleToggle} />
			<GroupBoxUI className={`${show ? 'active' : ''}`}>
				<GroupUI className={`${!show ? 'close' : ''}`}>{renderBtnsJSX()}</GroupUI>
			</GroupBoxUI>
		</WrapperUI>
	);
};

export default memo(ToolBox);
