import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchData, DefaultObject } from '@InterFace/index';

import Empty from '@Components/empty';
import ListBlock from './listBlock';

interface Props {
	data: SearchData[] | null | DefaultObject;
	clickEvent: (d: SearchData) => void;
}

const WrapperUI = styled.div`
	height: 450px;
	overflow: auto;
`;

const List: React.FC<Props> = ({ data, clickEvent }) => {
	const renderListJSX = () => {
		if (!data || data.length === 0) {
			return <Empty />;
		}
		return (data as SearchData[]).map((d) => <ListBlock data={d} key={d.id} onClick={() => clickEvent(d)} />);
	};

	return <WrapperUI>{renderListJSX()}</WrapperUI>;
};

export default List;
