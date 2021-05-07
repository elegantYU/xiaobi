import React, { useState, useEffect } from 'react';
import Saga from '@Utils/saga';

interface Props {
	fn: () => Promise<void>;
	delay?: number;
	updated: any[];
}

const useLoop = ({ updated, fn, delay }: Props) => {
	const [response, setResponse] = useState<any>(null);

	useEffect(() => {
		if (!fn) return;

		const saga = new (Saga as any)(fn);
		saga.start((d: any) => {
			setResponse(d);
		}, delay);

		return () => {
			saga.stop();
		};
	}, [...updated]);

	return {
		data: response,
	};
};

export default useLoop;
