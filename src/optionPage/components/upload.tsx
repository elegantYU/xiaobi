import React, { useState } from 'react';
import styled from 'styled-components';
import { FileBtn } from '@Components/button';
import { setAllConfigSM } from '@Src/api/setting';
import message from '@Src/components/message';

const WrapperUI = styled.div`
	width: 300px;
	height: 200px;
	border-radius: 6px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	.title {
		font-size: 20px;
	}
`;

const style = {
	backgroundColor: '#3d85f7',
	color: '#fff',
	cursor: 'pointer',
};

const uploadJSON = async (data: any) => {
	await setAllConfigSM(data);
	message.info('同步成功');
};

const Upload = () => (
	<WrapperUI>
		<p className='title'>同步插件数据</p>
		<FileBtn style={style} changeEvent={uploadJSON}>
			上传配置
		</FileBtn>
	</WrapperUI>
);

export default Upload;
