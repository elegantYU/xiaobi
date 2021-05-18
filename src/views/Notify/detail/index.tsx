import React, { useState, useMemo, useRef, KeyboardEventHandler, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { CMDS } from '@Src/constants/commands';
import debounce from 'lodash.debounce';
import ListBlock from '@Components/notify/listBlock';
import useLoop from '@Src/hooks/useLoop';
import { sendMessage } from '@Src/utils/chrome';
import { getLocationQuery } from '@Utils/index';
import { NoticeType } from '@Src/interface';
import { useHistory } from 'react-router-dom';

import DataLoading from '@Components/loading/dataLoading';
import Empty from '@Components/empty';

interface Props {
	match: any;
}

const WrapperUI = styled.div`
	overflow: hidden;
`;

const ContentUI = styled.div`
	background-color: ${(p) => p.theme.panelBg};
	padding: 0 20px;
	border-radius: 0 6px 6px 0;
	margin-bottom: 10px;
`;

const HeadUI = styled.div`
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.name {
		font-size: 16px;
		font-weight: bold;
		color: ${(p) => p.theme.noticeUsd};
	}

	.back {
		font-size: 14px;
		cursor: pointer;
		color: ${(p) => p.theme.tabFont};

		&:hover {
			color: ${(p) => p.theme.tabFontHover};
		}
	}
`;

const DataUI = styled.div`
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	p {
		font-weight: bold;
	}

	.usd {
		font-size: 40px;
		color: ${(p) => p.theme.noticeUsd};
	}
	.desc {
		font-size: 14px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: ${(p) => p.theme.noticeDesc};

		.increase {
			color: ${(p) => p.theme.increase};
		}
		.decrease {
			color: ${(p) => p.theme.decrease};
		}
	}
`;

const InputBoxUI = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	border-bottom: 2px solid ${(p) => p.theme.noticeBorder};
	position: relative;
	margin-bottom: 10px;

	input {
		width: 100%;
		height: 40px;
		font-size: 24px;
		text-align: center;
		color: ${(p) => p.theme.noticeInput};
		caret-color: ${(p) => p.theme.noticeInput};

		&::placeholder {
			color: ${(p) => p.theme.noticePlace};
		}
	}

	&::before {
		position: absolute;
		bottom: -2px;
		left: 50%;
		width: 0;
		height: 2px;
		background-color: ${(p) => p.theme.noticeInput};
		transition: all 0.15s linear;
		transform: translateX(-50%);
		content: '';
	}

	&:hover,
	&.active {
		&::before {
			width: 100%;
		}
	}
`;

const BtnUI = styled.button`
	width: 100%;
	height: 40px;
	font-size: 14px;
	border-radius: 6px;
	color: ${(p) => p.theme.noticeBtn};
	background-color: ${(p) => p.theme.noticeBtnBg};
	cursor: pointer;

	&.active {
		background-color: ${(p) => p.theme.noticeBtnHover};
	}
`;

const DescUI = styled.div`
	font-size: 12px;
	padding: 10px 0;
	color: ${(p) => p.theme.noticeTip};
`;

const ListUI = styled.div`
	height: 198px;
	background-color: ${(p) => p.theme.panelBg};
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

const ScrollUI = styled.div`
	height: 162px;
	overflow: auto;
	padding: 0 20px;
`;

const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
	if (e.key === '-') {
		e.preventDefault();
	}
};

const Index: React.FC<Props> = ({ match }) => {
	const id = match.params.id.split('?')[0];
	const pair = getLocationQuery(window.location.href).pair;
	const history = useHistory();
	const [keywords, setKeyWords] = useState<string>();
	const [enable, setEnable] = useState(false);
	const [isFocus, setFocus] = useState(false);
	const [times, setTimes] = useState(0);
	const inputEl = useRef<HTMLInputElement>(null);
	const { data } = useLoop({
		fn: () => sendMessage({ command: CMDS.CMD_NOTICEINFO, data: id }),
		updated: [times],
		delay: 3000,
	});

	const handleCreate = useMemo(
		() =>
			debounce(() => {
				if (!enable || !keywords) return;

				const time = Date.now();
				const params: NoticeType = {
					id,
					uid: `${id}_${time}`,
					name: data.pair,
					type: 'price',
					rule: Number(keywords).toString(),
					market: data.market,
					create: time,
					compare: Number(keywords) > data.usd,
				};

				sendMessage({ command: CMDS.CMD_ADDNOTICE, data: params })
					.then((isSend) => {
						setTimes(times + 1);
						setEnable(false);
						if (inputEl.current) {
							inputEl.current.value = '';
						}
					})
					.catch((error) => error);
			}, 500),
		[enable, keywords],
	);

	const goBack = () => history.goBack();
	const handleFocus = () => setFocus(true);
	const handleBlur = () => setFocus(false);
	const handleKeyup: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key == 'Enter') {
			handleCreate();
		}
	};
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setEnable(!!e.target.value);
		setKeyWords(e.target.value);
	};

	const handleDel = (uid: string) => {
		sendMessage({ command: CMDS.CMD_DELNOTICE, data: uid });
		setTimes(times + 1);
	};

	const renderDataJSX = () => {
		if (data?.pair) {
			const { usd, cny, percent } = data;
			const className = percent > 0 ? 'increase' : 'decrease';
			const p = percent > 0 ? `+${percent}%` : `${percent}%`;

			return (
				<DataUI>
					<p className='usd'>{usd}</p>
					<div className='desc'>
						<p>￥{cny}</p>
						<p className={className}>{p}</p>
					</div>
				</DataUI>
			);
		}

		return (
			<DataUI>
				<DataLoading />
			</DataUI>
		);
	};
	const renderListJSX = () => {
		if (data?.list.length) {
			return (data.list as NoticeType[]).map((v) => (
				<ListBlock {...v} key={v.uid} current={data.usd} delEvent={() => handleDel(v.uid)} />
			));
		}
		return <Empty />;
	};

	return (
		<WrapperUI>
			<ContentUI>
				<HeadUI>
					<p className='name'>{pair}</p>
					<p className='back' onClick={goBack}>
						返回
					</p>
				</HeadUI>
				{renderDataJSX()}
				<InputBoxUI className={`${isFocus ? 'active' : ''}`}>
					<input
						ref={inputEl}
						type='number'
						placeholder='请输入价格'
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={handleKeydown}
						onKeyUp={handleKeyup}
						onChange={handleChange}
					/>
				</InputBoxUI>
				<BtnUI className={`${enable ? 'active' : ''}`} onClick={handleCreate}>
					创建提醒
				</BtnUI>
				<DescUI>提示：插件通知需开启浏览器通知权限，插件会定时更新数据根据填入规则决定是否通知</DescUI>
			</ContentUI>
			<ListUI>
				<TabUI>
					<p>类型</p>
					<p>提醒规则</p>
					<p>操作</p>
				</TabUI>
				<ScrollUI>{renderListJSX()}</ScrollUI>
			</ListUI>
		</WrapperUI>
	);
};

export default Index;
