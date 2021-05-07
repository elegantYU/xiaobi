import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { StaticRoutes } from '@Const/routes';
import { CMDS_PAGE, CMDS } from '@Const/commands';
import { PageCmdMap, DefaultObject } from '@InterFace/index';
import { matchTheme } from '@Utils/index';
import { light } from '@Styles/theme';
import { Context } from '@Src/context/index';
import useMessage from '@Src/hooks/useMessage';

import SideBar from '@Components/sideBar';
import Home from './Home/index';
import Trade from './Trade/index';
import News from './News/index';
import Setting from './Setting/index';
import Search from './Search/index';
import Error from './Error/index';

const WrapperUI = styled.div`
	display: grid;
	grid-template-columns: 1fr 60px;
	width: 500px;
	height: 500px;
	background-color: ${(p) => p.theme.bg};

	&.iconMode {
		grid-template-columns: 1fr 40px;
	}
`;

const PageUI = styled.div`
	width: 100%;
	height: 500px;
	background-color: ${(p) => p.theme.bg};
`;

const App: React.FC = () => {
	const [theme, setTheme] = useState<DefaultObject | null>(light);
	const { data } = useMessage({ command: CMDS.CMD_SETTING });
	const [config, setConfig] = useState<any>(data);
	const wrapperClass = `${config?.nav === 1 ? '' : 'iconMode'}`;

	const onMessageListener = (msg: any) => {
		const { command, data } = msg;
		const cmdMap = new Map([
			[
				CMDS_PAGE.CMD_GET_SETTING,
				(data) => {
					setTheme(matchTheme(data));
				},
			],
		] as PageCmdMap);

		if (cmdMap.has(command)) {
			cmdMap.get(command)?.(data);
		}

		return true;
	};

	useEffect(() => {
		chrome.runtime.onMessage.addListener(onMessageListener);
		return () => {
			chrome.runtime.onMessage.removeListener(onMessageListener);
		};
	}, []);

	useEffect(() => {
		if (data) {
			setTheme(matchTheme(data));
			setConfig(data);
		}
	}, [data]);

	return (
		<Context.Provider value={{ config, setConfig }}>
			<ThemeProvider theme={theme}>
				<WrapperUI className={wrapperClass}>
					<PageUI>
						<Switch>
							<Route path={StaticRoutes.Home} exact component={Home}></Route>
							<Route path={StaticRoutes.Trend} exact component={Trade}></Route>
							<Route path={StaticRoutes.News} exact component={News}></Route>
							<Route path={StaticRoutes.Setting} component={Setting}></Route>
							<Route path={StaticRoutes.Search} exact component={Search}></Route>
						</Switch>
					</PageUI>
					<SideBar />
				</WrapperUI>
			</ThemeProvider>
		</Context.Provider>
	);
};

export default App;
