import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import useLoop from '@Hooks/useLoop';
import { CMDS } from '@Const/commands';
import { TableList } from '@InterFace/index';
import { formatTime } from '@Utils/index';
import { sendMessage } from '@Utils/chrome';
import { Context } from '@Src/context';
import ChartLoading from '@Components/loading/chartLoading';

interface Props {
	data: TableList | null;
	theme?: any;
	loading?: boolean;
}

const WrapperUI = styled.div`
	padding: 0 10px;
	background-color: ${(p) => p.theme.panelBg};
	margin-bottom: 10px;
	border-radius: 0 6px 6px 0;
`;

const TabUI = styled.div`
	height: 24px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};

	.item {
		height: 100%;
		padding: 4px;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
		color: ${(p) => p.theme.tabFont};

		&:hover,
		&.active {
			background-color: ${(p) => p.theme.bannerHover};
			color: ${(p) => p.theme.tabFontHover};
		}
	}
`;

const PanelUI = styled.div.attrs({ id: 'container' })`
	height: 350px;
`;

const TabList1 = [
	{ period: '15m', text: '15分', limit: 96, active: true },
	{ period: '1h', text: '1时', limit: 96, active: false },
	{ period: '4h', text: '4时', limit: 96, active: false },
	{ period: '1d', text: '1日', limit: 96, active: false },
	{ period: '7d', text: '1周', limit: 96, active: false },
];

const TabList2 = [
	{ period: '15m', text: '1日', limit: 96, active: true },
	{ period: '2h', text: '1周', limit: 84, active: false },
	{ period: '1d', text: '1月', limit: 30, active: false },
	{ period: '1d', text: '6月', limit: 180, active: false },
	{ period: '1d', text: '1年', limit: 365, active: false },
];

const ChartView: React.FC<Props> = ({ data, loading }) => {
	if (!loading) {
		return (
			<WrapperUI>
				<ChartLoading />
			</WrapperUI>
		);
	}

	const { config } = useContext(Context);
	const [status, setStatus] = useState(0);
	const [tabList, setTabList] = useState(TabList1);
	const [params, setParams] = useState({ period: '15m', limit: 96 });
	const { data: response } = useLoop({
		fn: () => sendMessage({ command: CMDS.CMD_KLINE, data: { ...data, ...params } }),
		updated: [params.period, data?.com_id],
		delay: 20000,
	});
	const chartEl = useRef<any>();
	const increase = config.crease ? '#c35466' : '#4aaa91';
	const decrease = !config.crease ? '#c35466' : '#4aaa91';

	const clearChart = () => {
		chartEl.current.destroy();
		chartEl.current = null;
	};
	const changeTab = (value: { period: string; limit: number; text: string }) => {
		const temp = tabList.map((t) => ({ ...t, active: t.text === value.text }));
		setTabList(temp);
		clearChart();
		setParams(value);
	};

	const renderTabJSX = () =>
		tabList.map((t) => (
			<p
				className={`item ${t.active ? 'active' : ''}`}
				key={t.text}
				onClick={() => changeTab({ period: t.period, limit: t.limit, text: t.text })}
			>
				{t.text}
			</p>
		));

	const klineCreate = () => {
		const { kline } = response;
		const ds = new DataSet();
		const dv = ds.createView();
		dv.source(kline).transform({
			type: 'map',
			callback: (obj) => {
				obj.trend = obj.open <= obj.close ? '上涨' : '下跌';
				obj.range = [obj.open, obj.close, obj.high, obj.low];
				return obj;
			},
		});
		chartEl.current = new Chart({
			container: 'container',
			autoFit: true,
			height: 350,
			padding: [15, 10, 30, 40],
		});
		const chart = chartEl.current;
		chart.scale(
			{
				trend: {
					values: ['上涨', '下跌'],
				},
				volumefrom: { alias: '成交量' },
				open: { alias: '开盘价' },
				close: { alias: '收盘价' },
				high: { alias: '最高价' },
				low: { alias: '最低价' },
				range: { alias: '股票价格' },
			},
			{
				nice: true,
			},
		);

		chart.data(dv.rows);
		chart
			.schema()
			.position('time*range')
			.color('trend', (val: string) => {
				switch (val) {
				case '上涨':
					return increase;
				case '下跌':
				default:
					return decrease;
				}
			})
			.shape('candle')
			.tooltip('open*close*high*low*volumefrom');

		chart.axis('time', {
			label: {
				formatter: (text: string) => formatTime(`${text}000`, params.period !== '7d' ? '{h}:{i}' : '{m}/{d}'),
			},
		});
		chart.tooltip({
			showCrosshairs: true,
			crosshairs: {
				type: 'xy',
				follow: true,
			},
			title: (title: string) => formatTime(`${title}000`, '{m}/{d} {h}:{i}'),
		});

		chart.legend(false);
		chart.render();
	};

	const lineCreate = () => {
		const { kline } = response;

		chartEl.current = new Chart({
			container: 'container',
			autoFit: true,
			height: 350,
			padding: [15, 10, 30, 40],
		});
		const chart = chartEl.current;

		chart.data(kline);
		chart.scale(
			{
				close: {
					alias: '价格',
					showLast: true,
				},
				time: {
					alias: '时间',
				},
				volumefrom: {
					alias: '交易额',
				},
			},
			{
				nice: true,
			},
		);

		chart.legend(false);

		chart.line().position('time*close').color('#1890ff').tooltip('close*volumefrom');
		chart.area().position('time*close');
		chart.axis('time', {
			label: {
				formatter: (text: string) => formatTime(`${text}000`, params.period === '15m' ? '{h}:{i}' : '{m}/{d}'),
			},
		});
		chart.tooltip({
			showCrosshairs: true,
			crosshairs: {
				type: 'xy',
				follow: true,
			},
			title: (title: string) => formatTime(`${title}000`, '{m}/{d} {h}:{i}'),
		});

		chart.render();
	};

	useEffect(() => {
		if (response) {
			const { status, kline } = response;

			if (!chartEl.current) {
				!status ? klineCreate() : lineCreate();
			}

			setStatus(status);
		}
	}, [response]);

	useEffect(() => {
		setTabList(!status ? TabList1 : TabList2);
	}, [status]);

	useEffect(() => clearChart, [data]);

	return (
		<WrapperUI>
			<TabUI>{renderTabJSX()}</TabUI>
			<PanelUI />
		</WrapperUI>
	);
};

export default ChartView;
