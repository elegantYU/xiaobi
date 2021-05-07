// @ts-nocheck

// ws状态列表
const stateList = [
	{ key: 0, value: '建立连接中...' },
	{ key: 1, value: '连接成功' },
	{ key: 2, value: '连接关闭中...' },
	{ key: 3, value: '连接已关闭' },
];

class Socket {
	constructor(url, sub) {
		this.ws = new WebSocket(url);
		if (sub) {
			this.onopen(() => this.send(JSON.stringify(sub)));
		}
	}
	onopen(cb) {
		if (this.ws) {
			this.ws.onopen = (e) => {
				this.log();
				cb();
			};
		}
	}
	onclose(cb) {
		if (this.ws) {
			this.ws.onclose = (e) => {
				this.log();
				cb();
			};
		}
	}
	onerror(cb) {
		if (this.ws) {
			this.ws.onerror = (e) => {
				this.log();
				cb();
			};
		}
	}
	onmessage(cb) {
		if (this.ws) {
			this.ws.onmessage = ({ data }) => {
				console.log('ws.onmessage Data', data);
				cb(JSON.parse(data));
			};
		}
	}
	send(data: DefaultObject) {
		this.ws.send(JSON.stringify(data));
	}
	close() {
		this.ws.close();
	}
	log() {
		console.log(stateList[this.ws.readyState ?? 0].value);
	}
}

export default Socket;
