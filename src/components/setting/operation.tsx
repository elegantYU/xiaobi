import React from 'react';
import styled from 'styled-components';

interface Props {
	title: string;
	desc?: string;
}

const WrapperUI = styled.div`
	padding: 10px 0;
	border-bottom: 1px solid ${(p) => p.theme.titleBorder};
`;

const ContentUI = styled.div`
	width: 100%;
	height: 50px;
	display: grid;
	grid-template-columns: 80px 1fr;
	gap: 10px;
	align-items: center;
`;

const TitleUI = styled.div`
	font-size: 14px;
	color: ${(p) => p.theme.title};
`;

const DescUI = styled.div`
	font-size: 12px;
	color: ${(p) => p.theme.desc};
`;

const HandleUI = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const Operation: React.FC<Props> = ({ title, desc, children }) => {
	const RenderDesc = () => (desc ? <DescUI>{desc}</DescUI> : null);

	return (
		<WrapperUI>
			<ContentUI>
				<TitleUI>{title}</TitleUI>
				<HandleUI>{children}</HandleUI>
			</ContentUI>
			<RenderDesc />
		</WrapperUI>
	);
};

export default Operation;
