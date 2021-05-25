import React, { useState } from 'react';
import styled from 'styled-components';
import type { NoticeBlockType } from '@InterFace/index';
import { useHistory } from 'react-router-dom';
import message from '@Components/message';

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
	margin-bottom: 10px;
`;

const TabUI = styled.div`
	height: 36px;
	display: grid;
	grid-template-columns: 140px 1fr 80px;
	align-items: center;
	gap: 10px;
	border-bottom: 1px solid ${(p) => p.theme.noticeBorder};
	padding: 0 20px;
	color: ${(p) => p.theme.noticeTab};

	p:last-child {
		justify-self: flex-end;
	}
`;

const CoinBlockHeadUI = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	height: 42px;
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};

	.platform {
		font-size: 16px;
		color: ${(p) => p.theme.noticePlat};
		font-weight: bold;
	}

	.name {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 14px;
		color: ${(p) => p.theme.noticeName};
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

const ListUI = styled.div`
	padding: 0 20px;
`;

const CoinBlock: React.FC<Props> = ({ id, market, name, children, update }) => {
	const h = useHistory();
	const goDetail = () => h.push({ pathname: `/notify/detail/${id}?pair=${name}` });

	const handleDel = async (uid: string) => {
		await sendMessage({ command: CMDS.CMD_DELNOTICE, data: uid });
		message.info('删除成功');
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
				<p className='platform'>{market}</p>
				<p className='name'>{name}</p>
				<p className='link' onClick={goDetail}>
					添加
				</p>
			</CoinBlockHeadUI>
			<TabUI>
				<p>类型</p>
				<p>提醒规则</p>
				<p>操作</p>
			</TabUI>
			<ListUI>{renderListJSX()}</ListUI>
		</CoinBlockUI>
	);
};

export default CoinBlock;
