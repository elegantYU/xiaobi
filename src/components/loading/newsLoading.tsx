import React, { useContext } from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';
import { Context } from '@Src/context';

import styled from 'styled-components';

const WrapperUI = styled.div`
	position: relative;

	&::before {
		position: absolute;
		content: '';
		width: calc(100% - 16px);
		height: 1px;
		bottom: 0px;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${(p) => p.theme.tabBorder};
	}
`;

const Loading: React.FC = () => {
	const { theme } = useTheme();
	const { config } = useContext(Context);
	const data =
		!config || !config.nav
			? [460, '0 0 460 76', 8, 76, 76, 396, 380, 316]
			: [440, '0 0 440 76', 8, 76, 76, 376, 360, 296];

	console.log('config', !config || !config.nav);
	return (
		<>
			{Array.from(new Array(8)).map((_, i) => (
				<WrapperUI key={i}>
					<ContentLoader
						speed={1}
						width={data[0]}
						height={76}
						viewBox={data[1] as string}
						backgroundColor={theme.loading}
						foregroundColor={theme.loadingFore}
						interval={0.2}
					>
						<rect x={data[2]} y='8' rx='6' ry='6' width='60' height='60' />
						<rect x={data[3]} y='8' rx='6' ry='6' width={data[6]} height='20' />
						<rect x={data[4]} y='32' rx='6' ry='6' width={data[7]} height='36' />
						<rect x={data[5]} y='32' rx='6' ry='6' width='60' height='36' />
					</ContentLoader>
				</WrapperUI>
			))}
		</>
	);
};

export default Loading;
