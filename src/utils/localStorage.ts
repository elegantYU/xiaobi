export const getStorage = (key: string) => {
	const res = localStorage.getItem(key);
	if (res) {
		return JSON.parse(res);
	}

	return null;
};

export const setStorage = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const rmStorage = (key: string) => localStorage.removeItem(key);
