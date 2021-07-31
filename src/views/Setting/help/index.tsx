import React from 'react';
import styled from 'styled-components';

import Title from '@Components/setting/title';
import { Help } from '@Const/setting';

const WrapperUI = styled.div`
	width: 100%;
	height: auto;
	padding: 0 10px 10px;
	background-color: ${(p) => p.theme.panelBg};
`;

const ContentUI = styled.div`
	height: 450px;
	overflow: auto;
	padding: 0 10px 10px;
	background-color: ${(p) => p.theme.panelBg};
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
	<WrapperUI>
		<Title>Q&A</Title>
		<ContentUI>{renderListJSX()}</ContentUI>
	</WrapperUI>
);

export default Base;
