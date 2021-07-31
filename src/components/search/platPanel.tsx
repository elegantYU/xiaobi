import { SearchData } from '@Src/interface';
import React, { useState } from 'react';
import styled from 'styled-components';
import ListBlock from './listBlock';

interface Props {
	name: string;
	data: SearchData[];
	clickEvent: (d: SearchData) => void;
}

const WrapperUI = styled.div`
	.title {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: ${(p) => p.theme.searchTitle};
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;

		i.hide {
			transform: rotate(90deg);
		}
	}
`;

const PlatPanel: React.FC<Props> = ({ name, data, clickEvent }) => {
	const [visible, setVisible] = useState(true);
	const hideClass = visible ? '' : 'hide';

	const toggleHide = () => setVisible(!visible);

	return (
		<WrapperUI>
			<p className='title' onClick={toggleHide}>
				<span>{name}</span>
				<i className={`iconfont iconxiala-copy ${hideClass}`} />
			</p>
			{visible ? (
				<div>
					{data.map((d) => (
						<ListBlock data={d} key={d.id} onClick={() => clickEvent(d)} />
					))}
				</div>
			) : null}
		</WrapperUI>
	);
};

export default PlatPanel;
