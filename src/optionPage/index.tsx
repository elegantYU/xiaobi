import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import '@Styles/reset.scss';
import Upload from './components/upload';

const MainUI = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

ReactDOM.render(
	<MainUI>
		<Upload />
	</MainUI>,
	document.querySelector('#root'),
);
