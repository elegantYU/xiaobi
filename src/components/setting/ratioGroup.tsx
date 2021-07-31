import React from 'react';
import styled from 'styled-components';
import { RatioBtnUI } from '@Components/button';

interface Props {
	data: Array<{
		label: string;
		value: any;
	}>;
	active: any;
	field: string;
	clickEvent: (value: any, key: string) => void;
}

const WrapperUI = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
`;

const RatioGroup: React.FC<Props> = ({ data, active, field, clickEvent }) => {
	const renderItemJSX = () =>
		data.map(({ label, value }) => (
			<RatioBtnUI key={value} className={active === value ? 'active' : ''} onClick={() => clickEvent(value, field)}>
				{label}
			</RatioBtnUI>
		));

	return <WrapperUI>{renderItemJSX()}</WrapperUI>;
};

export default RatioGroup;
