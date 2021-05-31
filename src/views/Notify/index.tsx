import React, { useState } from 'react';
import styled from 'styled-components';
import { CMDS } from '@Src/constants/commands';
import type { NoticeBlockType } from '@InterFace/index';
import useLoop from '@Src/hooks/useLoop';
import { sendMessage } from '@Src/utils/chrome';

import CoinBlock from '@Components/notify/coinBlock';
import { useHistory } from 'react-router';
import { StaticRoutes } from '@Src/constants/routes';

const WrapperUI = styled.div`
	height: 100%;
	overflow: auto;
`;

const NothingUI = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 100px;
	gap: 20px;
	background-color: ${(p) => p.theme.panelBg};

	.icon {
		font-size: 120px;
		color: ${(p) => p.theme.noticeEmptyIcon};
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 20px;
		font-size: 14px;
		gap: 4px;
		border-radius: 2px;
		background-color: ${(p) => p.theme.noticeEmptyBtnBg};
		color: ${(p) => p.theme.noticeEmptyBtn};
		cursor: pointer;
	}
	.desc {
		width: 80%;
		text-align: center;
		font-size: 14px;
		color: ${(p) => p.theme.noticeEmptyDesc};
	}
`;

const Notify: React.FC = () => {
	const history = useHistory();
	const [times, setTimes] = useState(0);
	const { data } = useLoop({
		fn: () => sendMessage({ command: CMDS.CMD_LOCALNOTICE }),
		updated: [times],
		delay: 5000,
	});

	const update = () => setTimes(times + 1);

	const goHome = () => history.push({ pathname: StaticRoutes.Home });
	const renderBlockJSX = () => {
		if (data?.length) {
			return (data as NoticeBlockType[]).map((d) => <CoinBlock {...d} key={`${d.id}_${d.market}`} update={update} />);
		}

		return (
			<NothingUI>
				<i className='icon iconfont iconzanwutongzhi' />
				<div className='btn' onClick={goHome}>
					<i className='iconfont iconweibiaoti-1_huaban1' />
					创建提醒
				</div>
				<p className='desc'>当前暂无提醒，榜单列表开启快捷模式可快捷添加通知</p>
			</NothingUI>
		);
	};

	return <WrapperUI>{renderBlockJSX()}</WrapperUI>;
};

export default Notify;
