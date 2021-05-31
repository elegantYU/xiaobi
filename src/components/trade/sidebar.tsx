import React from 'react';
import styled from 'styled-components';
import { TableList } from '@InterFace/index';

interface Props {
	data: TableList[] | null;
	clickEvent: (p: TableList) => void;
}

const WrapperUI = styled.div.attrs({ className: 'sidebar' })`
	width: 60px;
	height: 100%;
	background-color: ${(p) => p.theme.bg};
	overflow: auto;
`;

const StyleNavUI = styled.div`
	.button {
		position: relative;
		width: 100%;
		height: 40px;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		color: ${(p) => p.theme.tabFont};
		cursor: pointer;

		&::before {
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 0;
			height: 2px;
			background-color: ${(p) => p.theme.tabFontHover};
			border-radius: 1px;
			transition: all 0.15s linear;
			content: '';
		}
	}

	&.active,
	&:hover {
		color: ${(p) => p.theme.tabFontHover};
		.button {
			color: ${(p) => p.theme.tabFontHover};
			background-color: ${(p) => p.theme.panelBg};
		}
		.button::before {
			width: 100%;
			transform: translateX(-50%);
		}
	}
`;

const SideBar: React.FC<Props> = ({ data, clickEvent }) => {
	const renderItemJSX = () =>
		data
			? data.map((d) => (
					<StyleNavUI key={`${d.com_id}-${d.id}`} className={d.active ? 'active' : ''} onClick={() => clickEvent(d)}>
						<div className='button'>{d.currency}</div>
					</StyleNavUI>
			  ))
			: null;

	return (
		<WrapperUI>
			<div>{renderItemJSX()}</div>
		</WrapperUI>
	);
};

export default SideBar;
