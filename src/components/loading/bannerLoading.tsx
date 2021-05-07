import React from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';

const Loading: React.FC = () => {
	const { theme } = useTheme();

	return (
		<>
			{Array.from(Array(4)).map((_, idx) => (
				<ContentLoader
					speed={1}
					width={105}
					height={50}
					viewBox='0 0 105 50'
					backgroundColor={theme.loading}
					foregroundColor={theme.loadingFore}
					interval={0.2}
					key={idx}
				>
					<rect x='0' y='2' rx='3' ry='3' width='50' height='12' />
					<rect x='0' y='18' rx='3' ry='3' width='80' height='16' />
					<rect x='0' y='38' rx='3' ry='3' width='60' height='12' />
				</ContentLoader>
			))}
		</>
	);
};

export default Loading;
