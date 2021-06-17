import React from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 70px;
	background-color: ${(p) => p.theme.panelBg};
	margin-bottom: 10px;
`;

const Loading: React.FC = () => {
	const { theme } = useTheme();

	return (
		<Wrapper>
			<ContentLoader
				speed={1}
				width={380}
				height={70}
				viewBox='0 0 380 70'
				backgroundColor={theme.loading}
				foregroundColor={theme.loadingFore}
				interval={0.2}
			>
				<rect x='10' y='10' rx='4' ry='4' width='30' height='18' />
				<rect x='10' y='30' rx='4' ry='4' width='100' height='30' />
				<rect x='310' y='10' rx='4' ry='4' width='60' height='20' />
				<rect x='330' y='40' rx='4' ry='4' width='40' height='20' />
			</ContentLoader>
		</Wrapper>
	);
};

export default Loading;
