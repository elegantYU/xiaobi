import React from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';

const Loading: React.FC = () => {
	const { theme } = useTheme();

	return (
		<ContentLoader
			speed={1}
			width={360}
			height={50}
			viewBox='0 0 380 50'
			backgroundColor={theme.loading}
			foregroundColor={theme.loadingFore}
			interval={0.2}
		>
			<rect x='0' y='0' rx='3' ry='3' width='100' height='20' />
			<rect x='0' y='30' rx='3' ry='3' width='130' height='16' />

			<rect x='280' y='0' rx='3' ry='3' width='90' height='14' />
			<rect x='280' y='17' rx='3' ry='3' width='90' height='14' />
			<rect x='280' y='34' rx='3' ry='3' width='90' height='14' />
		</ContentLoader>
	);
};

export default Loading;
