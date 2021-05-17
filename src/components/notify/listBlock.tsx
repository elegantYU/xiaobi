import React, { useState } from 'react';
import styled from 'styled-components';
import { sendMessage } from '@Src/utils/chrome';
import { CMDS } from '@Src/constants/commands';

interface Props {
	uid: string;
	type: 'price' | 'turnover' | string;
	rule: number | string;
	sound?: boolean;
	create: number | string;
	current: number | string; //	现价 现换手率
	delEvent: () => void;
	soundEvent?: () => void;
}

const WrapperUI = styled.div`
	height: 36px;
	display: grid;
	grid-template-columns: 140px 1fr 80px;
	gap: 10px;
	align-items: center;
	border-bottom: 1px solid ${(p) => p.theme.noticeBorder};

	.title {
		font-size: 14px;
		color: ${(p) => p.theme.noticeItem};
	}
`;

const TradeContentUI = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;

	.icon {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	.price {
		font-size: 16px;
		font-weight: bold;
		color: ${(p) => p.theme.noticeItem};
	}

	&.increase {
		.icon {
			background-color: ${(p) => p.theme.increaseBg};
			color: ${(p) => p.theme.increase};
		}
	}
	&.decrease {
		.icon {
			background-color: ${(p) => p.theme.decreaseBg};
			color: ${(p) => p.theme.decrease};
		}
	}
`;

const OperationUI = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
`;

const IconUI = styled.div`
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 16px;
	color: ${(p) => p.theme.noticeItem};
`;

const ListBlock: React.FC<Props> = ({ uid, type, rule, sound, current, delEvent, soundEvent }) => {
	const typeEnum: { [key: string]: string } = {
		price: '价格提醒',
		turnover: '换手率提醒',
	};
	const renderTradeJSX = () => {
		if (current) {
			const creaseIcon = current > rule ? 'iconchangyongiconyikuozhan_huaban23' : 'iconchangyongiconyikuozhan_huaban22';
			const creaseClass = current > rule ? 'decrease' : 'increase';
			return (
				<TradeContentUI className={creaseClass}>
					<span className='icon'>
						<i className={`iconfont ${creaseIcon}`} />
					</span>
					<p className='price'>{rule}</p>
				</TradeContentUI>
			);
		}

		return (
			<TradeContentUI>
				<p className='price'>{rule}</p>
			</TradeContentUI>
		);
	};

	return (
		<WrapperUI>
			<p className='title'>{typeEnum[type]}</p>
			{renderTradeJSX()}
			<OperationUI>
				<IconUI className='iconfont iconshanchu' onClick={delEvent} />
			</OperationUI>
		</WrapperUI>
	);
};

export default ListBlock;
