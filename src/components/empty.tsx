import React from 'react';
import styled from 'styled-components';

const EmptyUI = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
	color: ${(p) => p.theme.searchEmpty};

	i {
		font-size: 60px;
	}
	span {
		font-size: 12px;
	}
`;

const Empty = () => (
	<EmptyUI>
		<i className='iconfont iconsousuowujieguo'></i>
		<span>无结果</span>
	</EmptyUI>
);

export default Empty;
