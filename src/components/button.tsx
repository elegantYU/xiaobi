import React from 'react';
import styled from 'styled-components';

interface Props {
	style?: { [key: string]: string };
	changeEvent: (p: any) => void;
}

export const RatioBtnUI = styled.button`
	height: 30px;
	padding: 0 8px;
	font-size: 12px;
	display: flex;
	align-items: center;
	cursor: pointer;
	color: ${(p) => p.theme.ratio};
	background-color: ${(p) => p.theme.ratioBg};
	border-radius: 6px;
	position: relative;

	&:hover {
		background-color: ${(p) => p.theme.ratioBgHover};
	}

	&.active {
		color: ${(p) => p.theme.ratioActive};
		background-color: ${(p) => p.theme.ratioActiveBg};
		&:hover {
			background-color: ${(p) => p.theme.ratioActiveBgHover};
		}
	}

	input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
`;

export const FileBtn: React.FC<Props> = ({ changeEvent, children, style }) => {
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { files } = e.target;
		if (files) {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target && typeof event.target?.result === 'string') {
					changeEvent(JSON.parse(event.target?.result));
				}
			};

			reader.readAsText(files[0]);
		}
	};

	return (
		<RatioBtnUI className='active' style={style}>
			{children}
			<input type='file' onChange={handleChange} accept='.json' />
		</RatioBtnUI>
	);
};
