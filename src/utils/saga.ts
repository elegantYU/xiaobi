/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable unicorn/no-array-callback-reference */
// @ts-nocheck copy from my other project and it's a vanilla js

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

type Fns = ((...args: any[]) => any)[];

type Saga = {
	new (...fns: Fns): Saga;

	start(a: (a: any) => any, b: number | undefined): any;
	stop(): void;
};

const Saga = function Saga(...fns): Saga {
	this.fns = fns;
	this.pause = false;
} as Saga;

const self = (_) => _?.();

Saga.prototype.start = async function (callback, time = 5000) {
	while (!this.pause) {
		if (this.pause) break;

		try {
			callback(await Promise.all(this.fns.map(self)));
		} catch (error) {
			console.log('网络错误，但是keep going', error, this.fns);
		}

		await delay(time);
	}
};

Saga.prototype.stop = function () {
	this.pause = true;
};

export default Saga;
