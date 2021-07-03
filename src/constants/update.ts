export type ListType = {
	text: string;
	type: 0 | 1;
	href?: string;
};

export type ContentType = {
	title: string;
	list: ListType[];
};

export type UpdateType = {
	version: string;
	content: ContentType[];
}[];

export const Update: UpdateType = [
	{
		version: '1.2.3',
		content: [
			{
				title: '修复:',
				list: [
					{
						text: '插件无法打开问题',
						type: 0,
					},
				],
			},
			{
				title: '详情:',
				list: [
					{
						text: 'https://github.com/elegantYU/xiaobi/releases/tag/1.2.3',
						href: 'https://github.com/elegantYU/xiaobi/releases/tag/1.2.3',
						type: 1,
					},
				],
			},
		],
	},
	{
		version: '1.2.0',
		content: [
			{
				title: '重要:',
				list: [
					{
						text: `"币"插件改名啦~ 现更名为："币" 浏览器插件`,
						type: 0,
					},
				],
			},
			{
				title: '新增:',
				list: [
					{
						text: '- 特殊关注配置区域(设置 -> 角标)',
						type: 0,
					},
					{
						text: '- 本地配置文件可下载/同步',
						type: 0,
					},
					{
						text: '- 币种详情页可以直接跳转对应交易平台',
						type: 0,
					},
				],
			},
		],
	},
	{
		version: '1.1.2',
		content: [
			{
				title: '修复:',
				list: [
					{
						text: '- 删除通知和badge颜色配置未使用Storage存储',
						type: 0,
					},
					{
						text: '- 火狐调节窗口失效',
						type: 0,
					},
				],
			},
		],
	},
	{
		version: '1.1.1',
		content: [
			{
				title: '新增:',
				list: [
					{
						text: '- 小窗模式(独立窗口，摸鱼更隐蔽)',
						type: 0,
					},
				],
			},
			{
				title: '修复:',
				list: [
					{
						text: '- 去除数据四舍五入，还原精度',
						type: 0,
					},
					{
						text: '- 浏览器清除缓存导致数据丢失',
						type: 0,
					},
				],
			},
			{
				title: '详情:',
				list: [
					{
						text: 'https://github.com/elegantYU/xiaobi/issues/9',
						href: 'https://github.com/elegantYU/xiaobi/issues/9',
						type: 1,
					},
				],
			},
		],
	},
	{
		version: '1.0.2',
		content: [
			{
				title: '修复:',
				list: [
					{ text: '- 特殊关注角标数据粗略化展示', type: 0 },
					{ text: '- 特殊关注精确数据显示在图标title内，鼠标放置图标一会可显示', type: 0 },
					{ text: '- 行情页默认tab类型，可在设置中选择，当前默认为', type: 0 },
					{ text: '- 快捷模式切换后显示问题', type: 0 },
					{ text: '- 行情页24H成交量排序无效', type: 0 },
					{ text: '- 自选列表中取消自选，刷新列表', type: 0 },
				],
			},
			{
				title: '详情:',
				list: [
					{
						text: 'https://github.com/elegantYU/xiaobi/issues/5',
						type: 1,
						href: 'https://github.com/elegantYU/xiaobi/issues/5',
					},
				],
			},
		],
	},
	{
		version: '1.0.1',
		content: [
			{
				title: '修复:',
				list: [
					{ text: '- 通知文案有误', type: 0 },
					{ text: '- 币种详情页通知无法跳转', type: 0 },
					{ text: '- 通知详情返回页面错误', type: 0 },
				],
			},
		],
	},
	{
		version: '1.0.0',
		content: [
			{
				title: '功能:',
				list: [
					{ text: '- 快捷浏览区块链行情列表，掌握行情', type: 0 },
					{ text: '- 搜索心仪的币种加入自选，更方便查看', type: 0 },
					{ text: '- 币种自身简介及相关资讯快速了解，配合K线图判断更准确', type: 0 },
					{ text: '- 添加币种通知，插件会实时提醒你价格变化是否到达阈值', type: 0 },
					{ text: '- 金色财经新闻快速浏览，把握一手币圈资讯', type: 0 },
					{ text: '- 自定义界面主题更换、涨跌颜色等', type: 0 },
				],
			},
		],
	},
];
