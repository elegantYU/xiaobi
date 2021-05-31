import React from 'react';
import styled from 'styled-components';
import { DefaultObject, SortData, TableList } from '@InterFace/index';

import Head from '@Components/home/tableHead';
import ListBlock from '@Components/home/listBlock';
import Loading from '@Components/loading/listBlockLoading';
import Error from '@Components/error';
import Empty from '@Components/empty';

interface Props {
	idx: number;
	data: TableList[] | DefaultObject | any;
	shortcut: boolean;
	clickEvent: (p: SortData) => void;
	itemClick: (id: string | number) => void;
	refresh: () => void;
}

const WrapperUI = styled.div`
	height: 385px;
`;

const ContentUI = styled.div`
	height: 365px;
	padding-bottom: 10px;
	overflow: auto;
`;

const Table: React.FC<Props> = ({ idx, data, shortcut, clickEvent, itemClick, refresh }) => {
	const renderTableJSX = () => {
		if (data && data.code) {
			return <Error />;
		}
		return (
			<>
				<Head clickEvent={clickEvent} />
				<ContentUI>
					{data ? (
						data.length === 0 ? (
							<Empty />
						) : (
							(data as TableList[]).map((d) => (
								<ListBlock
									key={`${d.com_id}-${d.id}`}
									data={d}
									onClick={() => itemClick(d.id as number)}
									shortcut={shortcut}
									refresh={!idx ? refresh : undefined}
								/>
							))
						)
					) : (
						<Loading />
					)}
				</ContentUI>
			</>
		);
	};

	return <WrapperUI>{renderTableJSX()}</WrapperUI>;
};

export default Table;
