import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { isFireFox } from '@Utils/index';

interface Props {
	value: number;
	changeEvent: (v: number) => void;
}

const WrapperUI = styled.div`
	width: 200px;
	height: 30px;
	position: relative;
	padding: 5px;
`;

const BarUI = styled.div<{ width: number }>`
	width: 190px;
	height: 4px;
	border-radius: 2px;
	background-color: ${(p) => p.theme.progressBg};
	overflow: hidden;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		width: ${(p) => p.width}%;
		height: 4px;
		background-color: ${(p) => p.theme.progressActive};
		border-radius: 2px;
	}
`;

const BtnUI = styled.div`
	width: 10px;
	height: 10px;
	position: absolute;
	top: 2px;
	left: 0;
	border-radius: 50%;
	cursor: pointer;
	background-color: ${(p) => p.theme.progressBtn};
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.12s ease;

	&:hover {
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
	}

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 4px;
		height: 4px;
		background-color: ${(p) => p.theme.progressActive};
		border-radius: 50%;
	}
`;

const TextUI = styled.p<{ left: number }>`
	position: absolute;
	bottom: 0;
	left: ${(p) => p.left + 5}px;
	transform: translateX(-50%);
	color: ${(p) => p.theme.progressText};
	white-space: nowrap;
	user-select: none;
`;

const WIDTH = 190;
const Points = [
	{ point: 0, text: '小', zoom: 0.9 },
	{ point: 33.3, text: '默认', zoom: 1 },
	{ point: 66.6, text: '大', zoom: 1.1 },
	{ point: 100, text: '巨大', zoom: 1.2 },
];
const renderPointJSX = () =>
	Points.map((v) => (
		<TextUI left={(v.point * WIDTH) / 100} key={v.text}>
			{v.text}
		</TextUI>
	));

const Process: React.FC<Props> = ({ value, changeEvent }) => {
	const [width, setWidth] = useState(0);
	const [isDrag, setDrag] = useState(false);
	const [startX, setStartX] = useState(0);
	const [originLeft, setOriginLeft] = useState(0);
	const BtnEl = useRef<HTMLDivElement>(null);

	const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (BtnEl.current) {
			const { left, width: w } = BtnEl.current.getBoundingClientRect();
			const l = +BtnEl.current.style.left.replace('px', '');
			const realX = isFireFox ? e.clientX : e.clientX / Points[value].zoom;

			if (realX >= left && realX <= w + left) {
				setStartX(realX);
				setDrag(true);
				setOriginLeft(l);
			}
		}
	};
	const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (isDrag && BtnEl.current) {
			const barleft = isFireFox ? e.clientX - startX : e.clientX / Points[value].zoom - startX;
			let lastleft = originLeft + barleft;
			if (lastleft <= 0) lastleft = 0;
			if (lastleft >= WIDTH) lastleft = WIDTH;

			BtnEl.current.style.left = `${lastleft}px`;
			setWidth((lastleft / WIDTH) * 100);
		}
	};
	const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
		const resX = isFireFox ? e.clientX : e.clientX / Points[value].zoom;
		setStartX(resX);
		setDrag(false);

		if (BtnEl.current) {
			const nowLeft = +BtnEl.current.style.left.replace('px', '');

			const fixPoint = Points.reduce((res, { point }, i) => {
				const distance = point * WIDTH;
				const rangeX = !i ? 0 : ((distance - Points[i - 1].point * WIDTH) / 2 + Points[i - 1].point * WIDTH) / 100;
				const rangeY =
					i === Points.length - 1 ? WIDTH : ((Points[i + 1].point * WIDTH - distance) / 2 + distance) / 100;

				if (nowLeft >= rangeX && nowLeft <= rangeY) {
					return point;
				}
				return res;
			}, 0);

			setWidth(fixPoint);
			BtnEl.current.style.left = `${(fixPoint * WIDTH) / 100}px`;
			changeEvent(Points.findIndex((v) => v.point === fixPoint));
		}
	};

	useEffect(() => {
		if (BtnEl.current) {
			BtnEl.current.style.left = `${(Points[value].point * WIDTH) / 100}px`;
			setWidth(Points[value].point);
		}
	}, [value]);

	return (
		<WrapperUI
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			// onMouseOut={handleMouseOut}
		>
			<BarUI width={width} />
			<BtnUI ref={BtnEl} />
			{renderPointJSX()}
		</WrapperUI>
	);
};

export default Process;
