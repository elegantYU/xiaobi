export enum CMDS {
	CMD_INCREASELIST = 'CMD_INCREASELIST', //	涨幅榜
	CMD_FOLLOWLIST = 'CMD_FOLLOWLIST', //	关注榜
	CMD_HOTLIST = 'CMD_HOTLIST', //	热搜榜
	CMD_SELFCOIN = 'CMD_SELFCOIN', //	自选
	CMD_COINPAGE = 'CMD_COINPAGE', //	币网页 banner使用
	CMD_SETTING = 'CMD_SETTING', //	获取设置
	CMD_CHANGE_SETTING = 'CMD_CHANGE_SETTING', //	修改设置
	CMD_NEWS = 'CMD_NEWS', //	资讯
	CMD_NEWSFLASH = 'CMD_NEWSFLASH', //	快讯
	CMD_SEARCH = 'CMD_SEARCH', //	搜索
	CMD_CHANGE_SELFCOIN = 'CMD_CHANGE_SELFCOIN', //	加入自选
	CMD_KLINE = 'CMD_KLINE', //	币K线数据
	CMD_CUSTOMCOIN = 'CMD_CUSTOMCOIN', //	币种详情数据
	CMD_COINNEWS = 'CMD_COINNEWS', //	单个币相关新闻
	CMD_TOGGLE_SELF = 'CMD_TOGGLE_SELF', //	切换自选
	CMD_TOGGLE_FOLLOW = 'CMD_TOGGLE_FOLLOW', //	切换特殊关注
	CMD_COINTSTATE = 'CMD_COINTSTATE', //	获取币种本地的状态
}

export enum CMDS_PAGE {
	CMD_GET_SETTING = 'CMD_GET_SETTING',
}

export enum NewsType {
	HighLight = 124,
	DeFi = 138,
	NFT = 163,
	Market = 116,
	Mining = 139,
	Entry = 120,
}

export enum WorkerType {
	Start = 'start',
	Close = 'close',
}
