import React, { useState } from 'react';
import styled from 'styled-components';
import { NewsData } from '@InterFace/index';

import Loading from '@Components/loading/newsLoading';
import FlashLoading from '@Components/loading/flashLoading';
import ListBlock from './listBlock';

interface Props {
	data: NewsData[];
	idx?: number;
}

const WrapperUI = styled.div`
	height: 464px;
	overflow: auto;
`;

const List: React.FC<Props> = ({ data, idx }) => {
	const renderListJSX = () =>
		data ? data.map((d, i) => <ListBlock data={d} idx={idx} key={i} />) : idx ? <Loading /> : <FlashLoading />;

	return <WrapperUI>{renderListJSX()}</WrapperUI>;
};

export default List;
