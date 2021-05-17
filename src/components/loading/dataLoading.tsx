import React from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';

const Loading = () => {
	const { theme } = useTheme();

	return (
		<ContentLoader
			speed={1}
			width={110}
			height={68}
			viewBox='0 0 110 68'
			backgroundColor={theme.loading}
			foregroundColor={theme.loadingFore}
			interval={0.2}
		>
			<rect x='5' y='0' rx='6' ry='6' width='100' height='50' />
			<rect x='0' y='55' rx='3' ry='3' width='64' height='16' />
			<rect x='75' y='55' rx='3' ry='3' width='35' height='16' />
		</ContentLoader>
	);
};

export default Loading;
