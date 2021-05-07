import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchData, DefaultObject } from '@InterFace/index';

import ListBlock from './listBlock';
import Empty from '@Components/empty';

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
		if (!data || !data.length) {
			return <Empty />;
		} else {
			return (data as SearchData[]).map((d) => <ListBlock data={d} key={d.id} onClick={() => clickEvent(d)} />);
		}
	};

	return <WrapperUI>{renderListJSX()}</WrapperUI>;
};

export default List;
