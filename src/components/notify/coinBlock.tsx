import React, { useState } from 'react';
import styled from 'styled-components';
import type { NoticeBlockType } from '@InterFace/index';
import { useHistory } from 'react-router-dom';

import ListBlock from '@Components/notify/listBlock';
import { sendMessage } from '@Src/utils/chrome';
import { CMDS } from '@Src/constants/commands';

interface Props extends NoticeBlockType {
	update: () => void;
}

const CoinBlockUI = styled.div`
	border-radius: 6px;
	padding: 10px;
	background-color: ${(p) => p.theme.panelBg};
`;

const CoinBlockHeadUI = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	height: 42px;
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};

	.name {
		font-size: 16px;
		color: ${(p) => p.theme.noticeName};
		font-weight: bold;
	}

	.platform {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 14px;
		color: ${(p) => p.theme.noticePlat};
		font-weight: bold;
	}

	.link {
		font-size: 14px;
		cursor: pointer;
		color: ${(p) => p.theme.noticeLink};
		&:hover {
			color: ${(p) => p.theme.noticeLinkHover};
		}
	}
`;

const CoinBlock: React.FC<Props> = ({ id, market, name, children, update }) => {
	const h = useHistory();
	const goDetail = () => h.push({ pathname: `/notify/detail/${id}?pair=${name}` });

	const handleDel = async (uid: string) => {
		await sendMessage({ command: CMDS.CMD_DELNOTICE, data: uid });
		update();
	};
	const renderListJSX = () => {
		if (children.length > 0) {
			return children.map((d) => <ListBlock {...d} key={d.uid} current='' delEvent={() => handleDel(d.uid)} />);
		}
		return null;
	};

	return (
		<CoinBlockUI>
			<CoinBlockHeadUI>
				<p className='name'>{name}</p>
				<p className='platform'>{market}</p>
				<p className='link' onClick={goDetail}>
					添加
				</p>
			</CoinBlockHeadUI>
			{renderListJSX()}
		</CoinBlockUI>
	);
};

export default CoinBlock;
