import React from 'react';
import ReactDom from 'react-dom';
import type { DefaultObject } from '@InterFace/index';
import Msg from './message';

type Type = 'info' | 'success';

export interface Props {
	text: string;
	during?: number;
	type?: Type;
}

let seed = 0;

const getUuid = () => {
	const now = Date.now();
	const id = seed;
	seed += 1;

	return `${now}_${id}`;
};

const formatProps: (p: Props | string, t: Type) => Props = (p, t) => {
	if (typeof p === 'string') {
		return { text: p, type: t };
	}

	return { ...p, type: t };
};

const message: DefaultObject & { list: string[] } = {
	list: [],
	count: 3,
	create(props: Props, uid: string) {
		const div = document.createElement('div');
		div.id = uid;
		document.body.append(div);

		ReactDom.render(<Msg {...props} uid={uid} destory={message.remove} />, div);
	},
	add(props: Props) {
		const length = message.list.length;
		if (length && length >= message.count) {
			const discard = message.list.shift();
			message.remove(discard);
		}

		const uid = getUuid();
		message.create(props, uid);

		message.list.push(uid);
	},
	remove(key: string) {
		const div = document.getElementById(key) as Element;

		if (div) {
			ReactDom.unmountComponentAtNode(div);
			div.remove();
		}

		message.list = message.list.filter((k) => k !== key);
	},
	info(props: Props | string) {
		const p = formatProps(props, 'info');
		message.add(p);
	},
};

export default message;
