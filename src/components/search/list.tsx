import React from 'react';
import styled from 'styled-components';
import { SearchData, PlatSearchDataType } from '@InterFace/index';

import Empty from '@Components/empty';
import PlatPanel from './platPanel';

interface Props {
	data: null | PlatSearchDataType;
	clickEvent: (d: SearchData) => void;
}

const WrapperUI = styled.div`
	height: 450px;
	overflow: auto;
`;

const List: React.FC<Props> = ({ data, clickEvent }) => {
	const renderListJSX = () => {
		if (!data) {
			return <Empty />;
		}
		const res = Object.keys(data).reduce((obj, k) => (data[k].length > 0 ? { ...obj, [k]: data[k] } : obj), {} as any);
		if (Object.keys(res).length === 0) {
			return <Empty />;
		}

		return Object.keys(res).map((k) => <PlatPanel key={k} name={k} data={res[k]} clickEvent={clickEvent} />);
	};

	return <WrapperUI>{renderListJSX()}</WrapperUI>;
};

export default List;
