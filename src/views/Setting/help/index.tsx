import React, { useState } from 'react';
import styled from 'styled-components';

import Title from '@Components/setting/title';
import { Help } from '@Const/setting';

const WrapperUI = styled.div`
	height: 450px;
	overflow: auto;
`;
const GroupUI = styled.div`
	margin-bottom: 20px;
	padding-top: 10px;

	.q {
		font-size: 16px;
		margin-bottom: 10px;
		color: ${(p) => p.theme.helpQuestion};
	}
	.a {
		font-size: 14px;
		line-height: 1.5;
		color: ${(p) => p.theme.helpAnswer};
	}
`;

const renderListJSX = () =>
	Help.map((v, i) => (
		<GroupUI key={v.question}>
			<div className='q'>
				{i + 1}. {v.question}
			</div>
			<div className='a' dangerouslySetInnerHTML={{ __html: v.answer }} />
		</GroupUI>
	));
const Base = () => (
	<>
		<Title>Q&A</Title>
		<WrapperUI>{renderListJSX()}</WrapperUI>
	</>
);

export default Base;
