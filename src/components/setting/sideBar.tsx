import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StaticRoutes } from '@Const/routes';

const WrapperUI = styled.div.attrs({ className: 'sidebar' })`
	width: 60px;
	height: 100%;
	background-color: ${(p) => p.theme.bg};
`;

const StyleNavUI = styled(NavLink).attrs({ activeClassName: 'active' })`
	.button {
		position: relative;
		width: 100%;
		height: 40px;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		color: ${(p) => p.theme.tabFont};

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

const renderLinkJSX = () => {
	const routers = [
		{ name: '基础', path: StaticRoutes.SettingBase },
		// { name: '通知', path: StaticRoutes.SettingNotify },
		{ name: '帮助', path: StaticRoutes.SettingHelp },
		{ name: '关于', path: StaticRoutes.SettingAbout },
	];

	return routers.map(({ name, path }) => (
		<StyleNavUI key={name} to={path} exact>
			<div className='button'>{name}</div>
		</StyleNavUI>
	));
};

const SideBar = () => (
	<WrapperUI>
		<div>{renderLinkJSX()}</div>
	</WrapperUI>
);

export default SideBar;
