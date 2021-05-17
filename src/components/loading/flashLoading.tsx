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
	const data = !config?.nav ? [460, '0 0 460 58', '0 0 460 28', 420] : [440, '0 0 440 58', '0 0 440 28', 400];

	return (
		<>
			<ContentLoader
				speed={1}
				width={data[0]}
				height={28}
				viewBox={data[2] as string}
				backgroundColor={theme.loading}
				foregroundColor={theme.loadingFore}
				interval={0.2}
			>
				<rect x='8' y='8' rx='4' ry='4' width='60' height='18' />
			</ContentLoader>
			{Array.from(new Array(8)).map((v, i) => (
				<ContentLoader
					speed={1}
					width={data[0]}
					height={58}
					viewBox={data[1] as string}
					backgroundColor={theme.loading}
					foregroundColor={theme.loadingFore}
					interval={0.2}
					key={i}
				>
					<rect x='32' y='8' rx='4' ry='4' width='36' height='18' />
					<rect x='32' y='30' rx='4' ry='4' width={data[3]} height='18' />
				</ContentLoader>
			))}
		</>
	);
};

export default Loading;
