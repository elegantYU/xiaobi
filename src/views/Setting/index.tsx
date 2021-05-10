import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { StaticRoutes } from '@Const/routes';

import SideBar from '@Components/setting/sideBar';
import Base from './base';
import Notify from './notify';
import Help from './help';
import About from './about';

const WrapperUI = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	height: 500px;
	overflow: hidden;
	background-color: ${(p) => p.theme.panelBg};
`;

const PageUI = styled.div`
	width: 100%;
	height: 500px;
	background-color: ${(p) => p.theme.panelBg};
	padding: 0 10px 10px;
`;

const Setting = () => (
	<WrapperUI>
		<SideBar />
		<PageUI>
			<Redirect to={StaticRoutes.SettingBase} from={StaticRoutes.Setting} />
			<Switch>
				<Route path={StaticRoutes.SettingBase} component={Base} />
				<Route path={StaticRoutes.SettingNotify} component={Notify} />
				<Route path={StaticRoutes.SettingHelp} component={Help} />
				<Route path={StaticRoutes.SettingAbout} component={About} />
			</Switch>
		</PageUI>
	</WrapperUI>
);

export default Setting;
