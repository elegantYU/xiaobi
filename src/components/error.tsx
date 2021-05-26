import { DefaultObject } from '@Src/interface';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
	type?: string;
}

const WrapperUI = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
	justify-content: center;

	&.small {
		gap: 0;
		i {
			font-size: 40px;
			width: 40px;
			height: 40px;
		}
		p {
			font-size: 12px;
		}
	}

	.icon {
		width: 80px;
		height: 80px;
		font-size: 80px;
		color: ${(p) => p.theme.error};

		&::before {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	p {
		font-size: 14px;
		color: ${(p) => p.theme.error};
	}
`;

const Error: React.FC<Props> = ({ type }) => (
	<WrapperUI className={type}>
		<i className='icon iconfont icondinosaur' />
		<p>Ooh,请稍后重试</p>
	</WrapperUI>
);

export default Error;
