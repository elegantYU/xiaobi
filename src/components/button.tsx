import React from 'react';
import styled from 'styled-components';

interface Props {
	border?: boolean;
	type?: 'primary' | 'warning' | 'success';
	active?: boolean;
	group?: boolean;
	clickEvent?: () => void;
}

const WrapperUI = styled.button`
	border-radius: 6px;
	padding: 4px 5px;
	font-size: 12px;
	color: #000;
	cursor: pointer;

	&.group {
		border-radius: 0;
	}

	&.border {
		border: 1px solid #000;
	}

	&.active,
	&:hover {
		background-color: blue;
		color: white;
	}

	&.primary {
		background-color: blue;
		color: white;

		&.active,
		&:hover {
			background-color: #3c3cfd;
		}
	}
	&.warning {
		background-color: red;
		color: white;

		&.active,
		&:hover {
			background-color: #ff3333;
		}
	}
	&.success {
		background-color: green;
		color: white;

		&.active,
		&:hover {
			background-color: #09ac09;
		}
	}
`;

const Btn: React.FC<Props> = ({ type, border, active, group, children, clickEvent }) => {
	const className = `${type} ${border && 'border'} ${active && 'active'} ${group && 'group'} `;
	return (
		<WrapperUI className={className} onClick={clickEvent}>
			{children}
		</WrapperUI>
	);
};

export default Btn;
