import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { StaticRoutes } from '@Const/routes';
import { CMDS_PAGE, CMDS } from '@Const/commands';
import { PageCmdMap, DefaultObject } from '@InterFace/index';
import { matchTheme, checkUpdate, changeViewPort } from '@Utils/index';
import { light } from '@Styles/theme';
import { Context } from '@Src/context';
import { getManifest } from '@Src/utils/chrome';
import useMessage from '@Src/hooks/useMessage';

import SideBar from '@Components/sideBar';
import AnnounceMent from '@Components/announcement';
import Reward from '@Components/reward';
import Home from './Home';
import Trade from './Trade';
import Notify from './Notify';
import NotifyDetail from './Notify/detail';
import News from './News';
import Setting from './Setting';
import Search from './Search';

const WrapperUI = styled.div`
	display: grid;
	grid-template-columns: calc(100% - 60px) 60px;
	width: 500px;
	height: 500px;
	background-color: ${(p) => p.theme.bg};
	position: relative;

	&.iconMode {
		grid-template-columns: 1fr 40px;
	}
`;

const PageUI = styled.div`
	width: 100%;
	height: 500px;
	background-color: ${(p) => p.theme.bg};
`;

const needUpdate = checkUpdate();

const App: React.FC = () => {
	const [showUpdate, setShowUpdate] = useState(!needUpdate);
	const [showReward, setReward] = useState(false);
	const [theme, setTheme] = useState<DefaultObject | null>(light);
	const [times, setTimes] = useState(0); //	及时更新设置
	const { data } = useMessage({ command: CMDS.CMD_SETTING, data: times });
	const [config, setConfig] = useState<any>(data);
	const { version } = getManifest();
	const wrapperClass = `${config?.nav === 1 ? '' : 'iconMode'}`;

	const handleClose = () => {
		setShowUpdate(false);
		localStorage.setItem(`version${version}`, 'true');
	};
	const handleCloseReward = () => setReward(false);
	const handleOpenReward = () => {
		handleClose();
		setReward(true);
	};

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
			changeViewPort(data.viewport);
		}
	}, [data]);

	return (
		<Context.Provider value={{ config, times, setConfig, setTimes, setShowUpdate, handleOpenReward }}>
			<ThemeProvider theme={theme}>
				<WrapperUI className={wrapperClass}>
					<PageUI>
						<Switch>
							<Route path={StaticRoutes.Home} exact component={Home} />
							<Route path={StaticRoutes.Trend} exact component={Trade} />
							<Route path={StaticRoutes.Notify} exact component={Notify} />
							<Route path={StaticRoutes.NotifyDetail} component={NotifyDetail} />
							<Route path={StaticRoutes.News} exact component={News} />
							<Route path={StaticRoutes.Setting} component={Setting} />
							<Route path={StaticRoutes.Search} exact component={Search} />
						</Switch>
					</PageUI>
					<SideBar />
					{/* 全屏通知 */}
					{showUpdate ? <AnnounceMent closeEvent={handleClose} reward={handleOpenReward} /> : null}
					{/* 打赏 */}
					{showReward ? <Reward closeEvent={handleCloseReward} /> : null}
				</WrapperUI>
			</ThemeProvider>
		</Context.Provider>
	);
};

export default App;
