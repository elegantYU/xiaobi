import React, { useState } from 'react';
import styled from 'styled-components';
import { CMDS } from '@Const/commands';
import useLoop from '@Hooks/useLoop';
import { TableList } from '@InterFace/index';
import { sendMessage } from '@Utils/chrome';

import SideBar from '@Components/trade/sidebar';
import Head from '@Components/trade/head';
import ChartView from '@Components/trade/chart';
import Tabs from '@Components/trade/tabs';

interface Props {
	location: any;
}

const WrapperUI = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	height: 500px;
	overflow: hidden;
	background-color: ${(p) => p.theme.bg};
`;

const ContentUI = styled.div`
	overflow: auto;
`;

const Trade: React.FC<Props> = ({ location }) => {
	const { list, id } = location.state;
	const [tableList, setTableList] = useState<TableList[]>(list.map((v: TableList) => ({ ...v, active: v.id === id })));
	const [current, setCurrent] = useState<TableList>(list.find((v: TableList) => v.id === id));
	const { data } = useLoop({
		fn: () => sendMessage({ command: CMDS.CMD_CUSTOMCOIN, data: current.id }),
		updated: [current.id],
		delay: 5000,
	});

	const handleToggle = (d: TableList) => {
		const temp = tableList.map((v) => ({ ...v, active: d.id === v.id }));
		setTableList(temp);
		setCurrent(d);
	};

	return (
		<WrapperUI>
			<SideBar data={tableList} clickEvent={handleToggle} />
			<ContentUI>
				<Head data={data} />
				<ChartView data={current} loading={!!data} />
				<Tabs data={data} id={current.id || 0} />
			</ContentUI>
		</WrapperUI>
	);
};

export default Trade;
