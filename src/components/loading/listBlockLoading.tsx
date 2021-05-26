import React, { useContext } from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';
import { Context } from '@Src/context';

import styled from 'styled-components';

const WrapperUI = styled.div`
	background-color: ${(p) => p.theme.panelBg};
	border-bottom: 1px solid ${(p) => p.theme.tdBorder};
	padding: 0 8px;

	&:hover {
		background-color: ${(p) => p.theme.tdHover};
	}
`;

const Loading: React.FC = () => {
	const { theme } = useTheme();
	const { config } = useContext(Context);
	const data =
		!config || !config.nav
			? [444, '0 0 444 45', 0, 0, 162, 182, 284, 374]
			: [424, '0 0 424 45', 0, 0, 142, 162, 264, 354];

	return (
		<>
			{Array.from(new Array(8)).map((_, i) => (
				<WrapperUI key={i}>
					<ContentLoader
						speed={1}
						width={data[0]}
						height={45}
						viewBox={data[1] as string}
						backgroundColor={theme.loading}
						foregroundColor={theme.loadingFore}
						interval={0.2}
					>
						<rect x={data[2]} y='7' rx='4' ry='4' width='60' height='18' />
						<rect x={data[3]} y='28' rx='4' ry='4' width='80' height='14' />
						<rect x={data[4]} y='7' rx='4' ry='4' width='100' height='18' />
						<rect x={data[5]} y='28' rx='4' ry='4' width='80' height='14' />
						<rect x={data[6]} y='8' rx='6' ry='6' width='68' height='28' />
						<rect x={data[7]} y='8' rx='6' ry='6' width='68' height='28' />
					</ContentLoader>
				</WrapperUI>
			))}
		</>
	);
};

export default Loading;
