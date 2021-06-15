import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { getExtURL, getManifest } from '@Src/utils/chrome';
import { Context } from '@Src/context';

const WrapperUI = styled.div`
	height: 100%;
	overflow: auto;
	padding: 0 10px 10px;
	background-color: ${(p) => p.theme.panelBg};
`;

const BannerUI = styled.div`
	height: 150px;
	padding: 10px;
	border-bottom: 2px solid ${(p) => p.theme.titleBorder};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;

	.logo {
		width: 80px;
		height: 80px;
		cursor: pointer;
		position: relative;
		object-fit: contain;
		transition: all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
	}
	.name {
		font-size: 16px;
		text-align: center;
		color: ${(p) => p.theme.aboutTitle};
	}
`;

const BtnUI = styled.button`
	height: 26px;
	padding: 0 8px;
	font-size: 12px;
	display: flex;
	align-items: center;
	cursor: pointer;
	color: ${(p) => p.theme.ratio};
	border-radius: 6px;
	color: ${(p) => p.theme.ratioActive};
	background-color: ${(p) => p.theme.ratioActiveBg};
	&:hover {
		background-color: ${(p) => p.theme.ratioActiveBgHover};
	}
`;

const GroupUI = styled.div`
	min-height: 45px;
	padding: 10px 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid ${(p) => p.theme.titleBorder};

	a {
		text-align: right;
		font-size: 16px;
		color: ${(p) => p.theme.tradeBlack};
		text-decoration: underline;
		&:hover {
			color: ${(p) => p.theme.tabFontHover};
		}
	}

	p {
		text-align: right;
		font-size: 16px;
		color: ${(p) => p.theme.tradeBlack};
	}

	label {
		font-size: 14px;
		color: ${(p) => p.theme.tradeHeadDesc};
	}
`;

const DescUI = styled.div`
	padding: 10px 0;
	font-size: 12px;
	color: ${(p) => p.theme.noticeTip};
`;

const Base = () => {
	const DivEl = useRef<HTMLImageElement>(null);
	const Logo = getExtURL('./static/icons/icon.png');
	const { name, version } = getManifest();
	const { setShowUpdate, handleOpenReward } = useContext(Context);

	const handleOut: React.MouseEventHandler<HTMLImageElement> = (e) => {
		if (DivEl.current) {
			DivEl.current.style.transform = `perspective(300px)
			rotateX(0deg)
			rotateY(0deg)
			rotateZ(0deg)`;
		}
	};
	const handleMove: React.MouseEventHandler<HTMLImageElement> = (e) => {
		if (DivEl.current) {
			const w = DivEl.current.clientWidth;
			const h = DivEl.current.clientHeight;
			const y = ((e.nativeEvent.offsetX - w * 0.5) / w) * 45;
			const x = ((1 - (e.nativeEvent.offsetY - h * 0.5)) / h) * 45;

			DivEl.current.style.transform = `perspective(300px)
										 rotateX(${x}deg)
										 rotateY(${y}deg)`;
		}
	};
	const handleUp: React.MouseEventHandler<HTMLImageElement> = (e) => {
		if (DivEl.current) {
			const { transform } = DivEl.current.style;
			DivEl.current.style.transform = transform.replace('translateZ(-25px)', 'translateZ(-12px)');
		}
	};
	const handleDown: React.MouseEventHandler<HTMLImageElement> = (e) => {
		if (DivEl.current) {
			const { transform } = DivEl.current.style;
			DivEl.current.style.transform = `${transform}
										translateZ(-25px)`;
		}
	};

	const openUpdate = () => setShowUpdate(true);

	return (
		<WrapperUI>
			<BannerUI>
				<img
					ref={DivEl}
					className='logo'
					onMouseOut={handleOut}
					onMouseMove={handleMove}
					onMouseUp={handleUp}
					onMouseDown={handleDown}
					src={Logo}
					alt=''
				/>
				<p className='name'>{name}</p>
			</BannerUI>
			<GroupUI>
				<label>版本号</label>
				<p>{version}</p>
			</GroupUI>
			<GroupUI>
				<label>开源地址</label>
				<a href='https://github.com/elegantYU/xiaobi' target='_blank' rel='noopener noreferrer'>
					github
				</a>
			</GroupUI>
			<GroupUI>
				<label>下载地址</label>
				<p>
					<a
						href='https://chrome.google.com/webstore/detail/acbboldcmppilbflnijahpgobpkkifkh'
						target='_blank'
						rel='noopener noreferrer'
					>
						谷歌商店
					</a>
					&nbsp;
					<a
						href='https://chrome.pictureknow.com/extension?id=44ff63184eef4b00bd7db9c7383876e3'
						target='_blank'
						rel='noopener noreferrer'
					>
						收藏猫(国内)
					</a>
				</p>
			</GroupUI>
			<GroupUI>
				<label>开发者</label>
				<a href='https://github.com/elegantYU' target='_blank' rel='noopener noreferrer'>
					elegantYU
				</a>
			</GroupUI>
			<GroupUI>
				<label>数据来源</label>
				<p>
					<a href='https://www.mytokencap.com/' target='_blank' rel='noopener noreferrer'>
						MyToken
					</a>
					&nbsp;
					<a href='https://www.jinse.com/' target='_blank' rel='noopener noreferrer'>
						金色财经
					</a>
				</p>
			</GroupUI>
			<GroupUI>
				<label>问题反馈</label>
				<p>
					<a href='https://github.com/elegantYU/xiaobi/issues' target='_blank' rel='noopener noreferrer'>
						issue
					</a>
				</p>
			</GroupUI>
			<GroupUI>
				<label>更新公告</label>
				<BtnUI onClick={openUpdate}>查看</BtnUI>
			</GroupUI>
			<GroupUI>
				<label>支持一下</label>
				<BtnUI onClick={handleOpenReward}>查看</BtnUI>
			</GroupUI>
			<DescUI>”小币“浏览器插件作为币圈数据聚合的工具，不提供任何投资理财建议，希望大家理性投资，早日上岸。</DescUI>
		</WrapperUI>
	);
};
export default Base;
