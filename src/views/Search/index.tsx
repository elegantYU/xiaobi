import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import useMessage from '@Src/hooks/useMessage';
import { CMDS } from '@Const/commands';
import { StaticRoutes } from '@Const/routes';
import { setSelfCoinSM } from '@Api/setting';
import { SearchData } from '@InterFace/index';
import debounce from 'lodash.debounce';

import List from '@Components/search/list';

interface Props {
	history: any;
}

const WrapperUI = styled.div`
	height: 500px;
	overflow: hidden;
	background-color: ${(p) => p.theme.panelBg};
`;

const HeadUI = styled.div`
	padding: 8px 10px;
	display: grid;
	grid-template-columns: 1fr 40px;
	align-items: center;

	.cancel {
		text-align: right;
		font-size: 14px;
		cursor: pointer;
		color: ${(p) => p.theme.tabFont};

		&:hover {
			color: ${(p) => p.theme.tabFontHover};
		}
	}
`;

const SearchBoxUI = styled.div`
	height: 32px;
	border-radius: 16px;
	background-color: ${(p) => p.theme.bg};
	display: flex;
	align-items: center;

	i {
		width: 32px;
		height: 32px;
		font-size: 14px;
		display: flex;
		place-content: center;
		place-items: center;
		color: ${(p) => p.theme.searchIcon};
	}

	input {
		width: 100%;
		height: 32px;
		font-size: 14px;
		font-weight: bold;
		caret-color: ${(p) => p.theme.caret};
		color: ${(p) => p.theme.search};

		&::placeholder {
			font-weight: normal;
		}
	}
`;

const Search: React.FC<Props> = ({ history }) => {
	const [keywords, setKeyWords] = useState('');
	const { data } = useMessage({ command: CMDS.CMD_SEARCH, data: keywords });
	const [listData, setListData] = useState(data);

	const handleChange = useMemo(() => debounce((e) => setKeyWords(e.target.value), 500), []);
	const goBack = () => history.push(StaticRoutes.Home);

	const handleChangeSelfCoin = (d: SearchData) => {
		const temp = (listData as any[]).map((v) => ({ ...v, active: v.id === d.id ? !v.active : v.active }));
		setSelfCoinSM({ ...d, active: !d.active });
		setListData(temp);
	};

	useEffect(() => {
		setListData(data);
	}, [data]);

	return (
		<WrapperUI>
			<HeadUI>
				<SearchBoxUI>
					<i className='iconfont iconsousuo' />
					<input type='text' placeholder='搜索你关心的币种' onChange={handleChange} />
				</SearchBoxUI>
				<span className='cancel' onClick={goBack}>
					取消
				</span>
			</HeadUI>
			<List data={listData} clickEvent={handleChangeSelfCoin} />
		</WrapperUI>
	);
};

export default Search;
