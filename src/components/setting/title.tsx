import React from 'react';
import styled from 'styled-components';

const WrapperUI = styled.p`
	display: block;
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	color: ${(p) => p.theme.title};
	border-bottom: 1px solid ${(p) => p.theme.titleBorder};
`;

const Title: React.FC = ({ children }) => <WrapperUI>{children}</WrapperUI>;

export default Title;
