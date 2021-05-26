import React, { useState } from 'react';
import styled from 'styled-components';

import ListBlock from './listBlock';

interface Props {
	date: string;
	list: any[];
	idx: number;
}

const WrapperUI = styled.div`
	padding: 8px;
`;
const TitleUI = styled.div`
	padding-left: 3px;
	font-size: 14px;
	color: ${(p) => p.theme.newsItemTitle};
`;

const DayBlock: React.FC<Props> = ({ date, list, idx }) => {
	const renderListJSX = () => list.map((d) => <ListBlock data={d} key={d.id} idx={idx} />);

	return (
		<WrapperUI>
			<TitleUI>{date}</TitleUI>
			{renderListJSX()}
		</WrapperUI>
	);
};

export default DayBlock;
