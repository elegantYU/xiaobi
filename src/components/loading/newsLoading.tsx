import React, { useContext } from 'react';
import ContentLoader from 'react-content-loader';
import useTheme from '@Src/hooks/useTheme';
import { Context } from '@Src/context';

const Loading: React.FC = () => {
	const { theme } = useTheme();
	const { config } = useContext(Context);
	const data = !config?.nav ? [460, '0 0 460 118', '0 0 460 28', 370] : [440, '0 0 440 118', '0 0 440 28', 350];

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
			{Array.from(new Array(4)).map((v, i) => (
				<ContentLoader
					speed={1}
					width={data[0]}
					height={118}
					viewBox={data[1] as string}
					backgroundColor={theme.loading}
					foregroundColor={theme.loadingFore}
					interval={0.2}
					key={i}
				>
					<rect x='32' y='8' rx='4' ry='4' width='36' height='18' />
					<rect x='74' y='8' rx='4' ry='4' width={data[3]} height='18' />
					<rect x='74' y='30' rx='4' ry='4' width={data[3]} height='14' />
					<rect x='74' y='48' rx='4' ry='4' width={data[3]} height='14' />
					<rect x='74' y='66' rx='4' ry='4' width={data[3]} height='14' />
					<rect x='74' y='84' rx='4' ry='4' width={data[3]} height='22' />
				</ContentLoader>
			))}
		</>
	);
};

export default Loading;
