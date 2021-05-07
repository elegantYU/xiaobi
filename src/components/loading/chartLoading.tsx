import React from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';

const Loading: React.FC = () => {
	const { theme } = useTheme();

	return (
		<>
			<ContentLoader
				speed={1}
				width={360}
				height={24}
				viewBox='0 0 360 24'
				backgroundColor={theme.loading}
				foregroundColor={theme.loadingFore}
				interval={0.2}
			>
				{Array.from(Array(5)).map((v, i) => (
					<rect x={i * 24 + 10} y='0' rx='4' ry='4' width='26' height='23' key={i} />
				))}
			</ContentLoader>
			<ContentLoader
				speed={1}
				width={360}
				height={400}
				viewBox='0 0 360 400'
				backgroundColor={theme.loading}
				foregroundColor={theme.loadingFore}
				interval={0.2}
			>
				<rect x='10' y='10' rx='6' ry='6' width='340' height='380' />
			</ContentLoader>
		</>
	);
};

export default Loading;
