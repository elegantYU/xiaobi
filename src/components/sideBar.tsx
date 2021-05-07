import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StaticRoutes } from '@Const/routes';
import { Context } from '@Src/context/index';

import { TipUI } from '@Components/tipButton';

interface Props {
	path: string;
	icon: string;
	name: string;
}

const WrapperUI = styled.div.attrs({ className: 'sidebar' })`
	display: grid;
	grid-template-rows: 1fr 40px;
	width: 100%;
	height: 100%;
	box-shadow: -5px -10px 10px ${(p) => p.theme.sidebarShadow};
	background-color: ${(p) => p.theme.sidebar};
	position: relative;
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
			top: 50%;
			left: 0;
			width: 2px;
			height: 0;
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
		}
		.button::before {
			height: 100%;
			transform: translateY(-50%);
		}
	}
`;

const StyleIconNavUI = styled(NavLink).attrs({ activeClassName: 'active' })`
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;
	color: ${(p) => p.theme.tabFont};

	&::after {
		position: absolute;
		top: 50%;
		left: 0;
		width: 2px;
		height: 0;
		background-color: ${(p) => p.theme.tabFontHover};
		border-radius: 1px;
		transition: all 0.15s linear;
		content: '';
	}

	&.active,
	&:hover {
		color: ${(p) => p.theme.tabFontHover};
		&::after {
			height: 100%;
			transform: translateY(-50%);
		}
	}
`;

const IconItem: React.FC<Props> = ({ path, icon, name }) => {
	const [isShow, setIsShow] = useState(false);
	const className = `left ${isShow ? 'tip-show' : 'tip-hide'}`;

	const handleMouseIn = () => setIsShow(true);
	const handleMouseOut = () => setIsShow(false);

	return (
		<StyleIconNavUI
			to={path}
			exact
			className={`iconfont ${icon}`}
			onMouseEnter={handleMouseIn}
			onMouseOut={handleMouseOut}
		>
			<TipUI className={className}>{name}</TipUI>
		</StyleIconNavUI>
	);
};

const SideBar = () => {
	const { config } = useContext(Context);

	const routers = [
		{ name: '榜单', icon: 'iconbangdan2', path: StaticRoutes.Home },
		{ name: 'K线', icon: 'iconKxian', path: StaticRoutes.Trend },
		{ name: '通知', icon: 'icontongzhi', path: StaticRoutes.Notify },
		{ name: '新闻', icon: 'iconxinwen', path: StaticRoutes.News },
	];

	const renderLinkJSX = () => {
		if (config?.nav) {
			return routers.map(({ name, icon, path }) => (
				<StyleNavUI key={icon} to={path} exact>
					<div className='button'>{name}</div>
				</StyleNavUI>
			));
		}

		return routers.map(({ name, icon, path }) => <IconItem name={name} icon={icon} path={path} key={icon} />);
	};

	const renderSettingLinkJSX = () => {
		if (config?.nav) {
			return (
				<StyleNavUI to={StaticRoutes.Setting}>
					<div className='button'>设置</div>
				</StyleNavUI>
			);
		}

		return <IconItem name='设置' icon='iconshezhi' path={StaticRoutes.Setting} />;
	};

	return (
		<WrapperUI>
			<div>{renderLinkJSX()}</div>
			{renderSettingLinkJSX()}
		</WrapperUI>
	);
};

export default SideBar;
