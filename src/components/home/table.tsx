import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DefaultObject, SortData, TableList } from '@InterFace/index';

import Head from '@Components/home/tableHead';
import ListBlock from '@Components/home/listBlock';
import Loading from '@Components/loading/listBlockLoading';
import Error from '@Components/error';
import Empty from '@Components/empty';

interface Props {
	data: TableList[] | DefaultObject | any;
	clickEvent: (p: SortData) => void;
	itemClick: (id: string | number) => void;
}

const WrapperUI = styled.div`
	height: 385px;
`;

const ContentUI = styled.div`
	height: 365px;
	padding-bottom: 10px;
	overflow: auto;
`;

const Table: React.FC<Props> = ({ data, clickEvent, itemClick }) => {
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
								<ListBlock key={`${d.com_id}-${d.id}`} data={d} onClick={() => itemClick(d.id as number)} />
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
