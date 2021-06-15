import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CMDS, CMDS_PAGE } from '@Src/constants/commands';
import { BadgeData, BadgeSettingType } from '@InterFace/index';
import useMessage from '@Src/hooks/useMessage';
import { BadgeDataType, BadgeObserve } from '@Src/constants/setting';
import { setBadgeSettingSM } from '@Api/setting';
import { formatBadge } from '@Utils/index';

import Operation from '@Components/setting/operation';
import RatioGroup from '@Components/setting/ratioGroup';

const WrapperUI = styled.div`
	height: auto;
`;

const HeadUI = styled.div`
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
	background-color: ${(p) => p.theme.panelBg};

	.data {
		display: flex;
		flex-direction: column;
		justify-content: center;

		span {
			font-size: 12px;
		}

		p {
			font-size: 26px;
			font-weight: bold;
		}

		.increase {
			color: ${(p) => p.theme.increase};
		}
		.decrease {
			color: ${(p) => p.theme.decrease};
		}
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		gap: 4px;

		.name {
			font-size: 16px;
			display: flex;
			align-items: center;
			gap: 4px;

			img {
				width: 16px;
				height: 16px;
			}
		}

		.alias {
			font-size: 14px;
		}
	}
`;

const ViewUI = styled.div`
	width: 50px;
	height: 30px;
	background-color: ${(p) => p.theme.badgeBg};
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin-left: 2px;

	span {
		font-size: 14px;
		color: ${(p) => p.theme.badgeColor};
		padding: 0 4px;
		border-radius: 2px;

		&.increase {
			background-color: ${(p) => p.theme.increase};
		}
		&.decrease {
			background-color: ${(p) => p.theme.decrease};
		}
	}

	&.active {
		border: 1px solid ${(p) => p.theme.badgeActive};
	}
`;

const ContentUI = styled.div`
	padding: 0 10px;
	background-color: ${(p) => p.theme.panelBg};
`;

const Badge = () => {
	const [times, setTimes] = useState(0);
	const [badgeData, setBadgeData] = useState<BadgeData | null>(null);
	const [viewGroup, setViewGroup] = useState<(string | number)[]>();
	const { logo, alias, price, pair, market, percent, turnover } = badgeData || {};
	const creaseClass = percent && percent > 0 ? 'increase' : 'decrease';
	const { data: setting } = useMessage({ command: CMDS.CMD_GET_BADGESETTING, data: times });
	const { dataType, observe, viewType } = (setting as BadgeSettingType) ?? {};

	const handleRatioChange = (value: any, key: string) => {
		setBadgeSettingSM({ dataType, observe, viewType, [key]: value });
		setTimes(times + 1);
	};

	const onMessageListener = (msg: any) => {
		const { command, data } = msg;

		if (command === CMDS_PAGE.CMD_GET_BADGE) {
			setBadgeData(data);
		}

		return true;
	};

	const renderDataJSX = () => {
		const text = BadgeDataType.find(({ value }) => value === dataType)?.label;
		let view: any = price;

		if (dataType === 'percent') {
			view = `${percent}%`;
		} else if (dataType === 'turnover') {
			view = turnover;
		}

		return (
			<div className='data'>
				<span>{text}</span>
				<p className={creaseClass}>{view}</p>
			</div>
		);
	};

	useEffect(() => {
		chrome.runtime.onMessage.addListener(onMessageListener);
		return () => {
			chrome.runtime.onMessage.removeListener(onMessageListener);
		};
	}, []);

	useEffect(() => {
		if (setting && badgeData) {
			const group = [
				formatBadge(badgeData[dataType], dataType, false),
				formatBadge(badgeData[dataType], dataType, true),
			];
			setViewGroup(group);
		}
	}, [setting, badgeData]);

	if (!badgeData) {
		return null;
	}

	return (
		<WrapperUI>
			<HeadUI>
				{renderDataJSX()}
				<div className='title'>
					<div className='name'>
						<img src={logo} alt='' />
						{pair}
					</div>
					<p className='alias'>{alias}</p>
				</div>
			</HeadUI>
			<ContentUI>
				<Operation title='数据类型'>
					<RatioGroup data={BadgeDataType} active={dataType} field='dataType' clickEvent={handleRatioChange} />
				</Operation>
				<Operation title='显示类型' desc='角标文本内容有长度限制，最多显示4位数字/字母'>
					{viewGroup ? (
						<>
							<ViewUI className={`${!viewType ? 'active' : ''}`} onClick={() => handleRatioChange(false, 'viewType')}>
								<span className={creaseClass}>{viewGroup[0]}</span>
							</ViewUI>
							<ViewUI className={`${viewType ? 'active' : ''}`} onClick={() => handleRatioChange(true, 'viewType')}>
								<span className={creaseClass}>{viewGroup[1]}</span>
							</ViewUI>
						</>
					) : null}
				</Operation>
				<Operation title='实时提醒' desc='特殊关注币种会在涨跌变动时发出通知'>
					<RatioGroup data={BadgeObserve} active={observe} field='observe' clickEvent={handleRatioChange} />
				</Operation>
			</ContentUI>
		</WrapperUI>
	);
};

export default Badge;
