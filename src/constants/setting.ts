export const creaseState = [
	{ label: '绿涨红跌', value: 0 },
	{ label: '绿跌红涨', value: 1 },
];

export const themeState = [
	{ label: '浅色', value: 0 },
	{ label: '深色', value: 1 },
	{ label: '跟随系统', value: 2 },
];

export const NavMode = [
	{ label: '图标', value: 0 },
	{ label: '文字', value: 1 },
];

export const HomeTabState = [
	{ label: '自选', value: 0 },
	{ label: '涨幅榜', value: 1 },
	{ label: '热搜榜', value: 2 },
	{ label: '关注榜', value: 3 },
];

export const PlatUpdateNotifyState = [
	{ label: '关闭', value: 0 },
	{ label: '开启', value: 1 },
];

export const BadgeDataType = [
	{ label: '现价', value: 'price' },
	{ label: '涨跌幅', value: 'percent' },
	{ label: '换手率', value: 'turnover' },
];

export const BadgeObserve = [
	{ label: '关闭', value: false },
	{ label: '开启', value: true },
];

export const Help = [
	{
		question: '这个插件怎么使用',
		answer:
			'这个插件聚合了币圈的基础行情数据和新闻公告。</br>大家可以自由选择币种，查看币种详情：走势、现价、交易量、白皮书、相关资讯等等。</br>还可以对需要及时跟踪信息的币种添加通知，目前只支持价格变动的通知。',
	},
	{
		question: '如何添加币种到自选',
		answer:
			'可以通过行情页的搜索功能，在搜索之后加入自选；</br>开启快捷操作后，可在行情列表页快速添加币种；</br>进入币种详情页后，右下角的功能工具箱也可以添加自选',
		iamges: [],
	},
	{
		question: '为什么搜索币种每次结果都不同',
		answer:
			'搜索功能使用的是 MyToken 的搜索接口，由于聚合平台过多，每次搜索结果会随机出现各家平台的币种，这点插件也没法解决...',
	},
	{
		question: '会添加单个币的买入卖出操作功能吗',
		answer:
			'不会的，此款插件只作为信息聚合，不包含货币操作，也不会做涉及平台交易、账号相关的内容。</br>(这又不是基金需要长期持有，来回变更很烦的)',
	},
	{
		question: '没有合约期货吗',
		answer: '暂时没有',
	},
	{
		question: '添加通知后，会怎么通知我',
		answer:
			'浏览器运行时，插件会自动更新已添加通知的币种数据，根据创建通知时的规则判断是否通知。</br>例：Btc 现价40000，添加通知价格为30000。</br>则价格每次下跌到30000时会让浏览器发起一次通知。</br>(网络正常的情况下)',
	},
	{
		question: '有的详情是K线图，有的却是折线图',
		answer: '币种变化趋势的数据也来自 MyToken，有些平台的币种有K线图的数据就会显示K线图，没有就显示折线图',
	},
	{
		question: '特别关注是什么',
		answer: '特别关注是可以让选定的币种，在插件logo的角标(badge)中显示。</br>可以选择数据类型、显示格式、实时提醒等',
	},
	{
		question: '为什么插件需要’所有网站‘的权限，是否会有什么不合理的操作',
		answer:
			'获取所有网站的权限，主要是因为币需要请求多个网站的接口(目前是两个)，</br>为了后续的扩展性考虑(可能会加入其它网站的数据请求)，选择了"all_urls"权限。</br>若是逐条添加网站，插件每次更新都会弹出”新权限请求“对话框，这样会引起很多用户的误会。</br></br>币代码已开源，大家可随意查看代码，若有其他的安全疑虑可提issue',
	},
	{
		question: '我的数据存放在哪里，怎么做同步',
		answer:
			'目前插件所有数据都存放在插件的远程存储路径中，可通过google账号进行多端同步</br>也可以在 设置 -> 基础 中下载或同步本地数据',
	},
	{
		question: '作者什么时候更新',
		answer: '尚在上班，更新不定期啊。当然有重要需求或紧急bug，会第一时间搞定的',
	},
	{
		question: '作者太厉害了吧，缺女友吗，想嫁',
		answer: '缺女友，更缺 star ♪(･ω･)ﾉ',
	},
];
