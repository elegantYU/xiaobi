import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useMessage from '@Src/hooks/useMessage';
import { CMDS } from '@Src/constants/commands';
import { changeFollowState, changeSelfState } from '@Src/api/follow';
import { composeLink } from '@Src/utils';

interface Props {
	id: number;
	data: any;
}

const WrapperUI = styled.div`
	width: 100%;
	height: 45px;
	padding: 0 20px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	align-items: center;
	position: sticky;
	bottom: -1px;
	left: 0;
	background-color: ${(p) => p.theme.tradeDrawerGroup};
	box-shadow: 0 -5px 10px ${(p) => p.theme.sidebarShadow};
`;

const BtnUI = styled.button`
	width: 100%;
	height: 30px;
	border-radius: 6px;
	background-color: ${(p) => p.theme.ratioActiveBg};
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	cursor: pointer;

	i {
		font-size: 16px;
	}

	p {
		font-size: 12px;
	}

	&.active {
		.yellow {
			color: ${(p) => p.theme.yellow};
		}
		.pink {
			color: ${(p) => p.theme.pink};
		}
	}
`;

const groupDefault = [
	{
		key: 'plat',
		before: 'iconjiaoyipingtai',
		after: 'iconjiaoyipingtai',
		status: false,
		color: 'blue',
		text: '平台',
	},
	{
		key: 'self',
		before: 'iconshoucang1',
		after: 'iconshoucang',
		status: false,
		color: 'yellow',
		text: '自选',
	},
	{
		key: 'follow',
		before: 'iconxinaixin2',
		after: 'iconxinaixin1',
		status: false,
		color: 'pink',
		text: '关注',
	},
	{
		key: 'notice',
		before: 'icontongzhi2',
		after: 'icontongzhi1',
		status: false,
		color: 'blue',
		text: '通知',
	},
];

const Footer: React.FC<Props> = ({ id, data }) => {
	const { data: result } = useMessage({ command: CMDS.CMD_COINTSTATE, data: id });
	const [group, setGroup] = useState(groupDefault);
	const history = useHistory();

	const eventList: { [key: string]: () => void } = {
		plat: () => {
			const link = composeLink(data, id);
			window.open(link);
		},
		self: () => {
			changeSelfState(id);
			setGroup(group.map((v) => ({ ...v, status: v.key === 'self' ? !v.status : v.status })));
		},
		follow: () => {
			changeFollowState(id);
			setGroup(group.map((v) => ({ ...v, status: v.key === 'follow' ? !v.status : v.status })));
		},
		notice: () => {
			history.push({ pathname: `/notify/detail/${id}?pair=${data.pair}` });
		},
	};

	const handleEvent = (key: string) => eventList[key]();

	const renderBtnsJSX = () =>
		group.map((v) => (
			<BtnUI key={v.key} className={`${v.status ? 'active' : ''}`} onClick={() => handleEvent(v.key)}>
				<i className={`iconfont ${v.color} ${v.status ? v.after : v.before}`} />
				<p>{v.text}</p>
			</BtnUI>
		));

	useEffect(() => {
		result && setGroup(groupDefault.map((v) => ({ ...v, status: result[v.key] })));
	}, [result]);

	return <WrapperUI>{renderBtnsJSX()}</WrapperUI>;
};

export default Footer;
