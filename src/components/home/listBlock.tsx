import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import RateBlock from '@Components/home/rateBlock';
import { TableList } from '@InterFace/index';
import { changeFollowState, changeSelfState } from '@Api/follow';
import { useHistory } from 'react-router-dom';
import { CMDS } from '@Src/constants/commands';
import useMessage from '@Src/hooks/useMessage';
import message from '../message';

interface Props {
	data: TableList;
	shortcut: boolean;
	onClick: () => void;
	refresh?: () => void;
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
	display: grid;
	grid-template-columns: 120px auto 90px 90px;
	justify-items: flex-end;
	align-items: center;
	width: 100%;
	height: 45px;
	background-color: ${(p) => p.theme.panelBg};
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};
	padding: 0 8px;
	cursor: pointer;
	position: relative;

	&:hover {
		background-color: ${(p) => p.theme.tdHover};
	}
`;

const TitleUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;

	.title {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		b {
			font-size: 16px;
			font-weight: bold;
			color: ${(p) => p.theme.tdTitle};
		}
		span {
			font-size: 12px;
			color: ${(p) => p.theme.tdType};
		}
	}

	.volume {
		font-size: 12px;
		color: ${(p) => p.theme.tdDesc};
	}
`;

const PriceUI = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;

	.usd {
		font-size: 16px;
		font-weight: bold;
		color: ${(p) => p.theme.tdTitle};
	}
	.cny {
		font-size: 12px;
		color: ${(p) => p.theme.tdDesc};
	}
`;

const MaskUI = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(5px);
	opacity: 0;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
	padding: 0 8px;

	&.fadeIn {
		pointer-events: all;
		animation: ${FadeIn} 0.15s ease forwards;
	}
	&.fadeOut {
		animation: ${FadeOut} 0.15s ease forwards;
	}
`;

const IconUI = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: ${(p) => p.theme.quickBtnBg};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;

	&.yellow {
		color: ${(p) => p.theme.yellow};
	}
	&.pink {
		color: ${(p) => p.theme.pink};
	}
	&.blue {
		color: ${(p) => p.theme.blue};
	}
`;

const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
	e.stopPropagation();
};

const ListBlock: React.FC<Props> = ({ data, shortcut, onClick, refresh }) => {
	const history = useHistory();
	const [animate, setAnimate] = useState('');
	const [selfState, setSelfState] = useState(false);
	const [followState, setFollowState] = useState(false);
	const [noticeState, setNoticeState] = useState(false);
	const { id, alias, anchor, currency, pair, usd, cny, percent, turnover, volume } = data;
	const { data: request } = useMessage({ command: CMDS.CMD_COINTSTATE, data: id });

	const selfClass = `iconfont ${selfState ? 'iconshoucang' : 'iconshoucang1'} yellow`;
	const followClass = `iconfont ${followState ? 'iconxinaixin1' : 'iconxinaixin2'} pink`;
	const noticeClass = `iconfont ${noticeState ? 'icontongzhi1' : 'icontongzhi2'} blue`;

	const handleMouseEnter = () => {
		if (!shortcut) return;
		setAnimate('fadeIn');
	};
	const handleMouseLeave = () => {
		if (!shortcut) return;
		setAnimate('fadeOut');
	};

	const toggleSelf: React.MouseEventHandler<HTMLDivElement> = (e) => {
		changeSelfState(id as number)
			.then((_) => {
				message.info(selfState ? '取消自选' : '添加自选');
				setSelfState(!selfState);
			})
			.catch((error) => error);

		// 自选列表刷新
		refresh?.();
		e.stopPropagation();
	};
	const toggleFollow: React.MouseEventHandler<HTMLDivElement> = (e) => {
		changeFollowState(id as number)
			.then((_) => {
				message.info(followState ? '取消特殊关注' : '添加特殊关注');
				setFollowState(!followState);
			})
			.catch((error) => error);

		e.stopPropagation();
	};
	const goNotice: React.MouseEventHandler<HTMLDivElement> = (e) => {
		history.push({ pathname: `/notify/detail/${id}?pair=${pair}` });
		e.stopPropagation();
	};

	useEffect(() => {
		if (request) {
			const { self, follow, notice } = request;
			setSelfState(self);
			setFollowState(follow);
			setNoticeState(notice);
		}
	}, [request]);

	useEffect(() => {
		setAnimate('');
	}, [shortcut]);

	return (
		<WrapperUI title={alias} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<TitleUI>
				<div className='title'>
					<b>{currency}</b>
					<span>/{anchor}</span>
				</div>
				<div className='volume'>24H额 ￥{volume}</div>
			</TitleUI>
			<PriceUI>
				<p className='usd'>{usd}</p>
				<p className='cny'>￥{cny}</p>
			</PriceUI>
			<RateBlock data={turnover} />
			<RateBlock data={percent} type='rate' />
			{shortcut ? (
				<MaskUI className={animate} onClick={stopPropagation}>
					<IconUI className={selfClass} onClick={toggleSelf} />
					<IconUI className={followClass} onClick={toggleFollow} />
					<IconUI className={noticeClass} onClick={goNotice} />
				</MaskUI>
			) : null}
		</WrapperUI>
	);
};

export default ListBlock;
