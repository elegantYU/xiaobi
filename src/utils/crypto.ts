/* eslint-disable */
// @ts-nocheck because those codes are from website.
const o = function (t) {
	function r(t) {
		return !!t.constructor && typeof t.constructor.isBuffer === 'function' && t.constructor.isBuffer(t);
	}

	return (
		t != null &&
		(r(t) ||
			(function (t) {
				return typeof t.readFloatLE === 'function' && typeof t.slice === 'function' && r(t.slice(0, 0));
			})(t) ||
			!!t._isBuffer)
	);
};
const endian = (t) => {
	if (t.constructor == Number) return (16711935 & rotl(t, 8)) | (4278255360 & rotl(t, 24));
	for (let e = 0; e < t.length; e++) t[e] = endian(t[e]);
	return t;
};

const rotl = (t, e) => (t << e) | (t >>> (32 - e));

const bytesToWords = (t) => {
	for (var e = [], r = 0, n = 0; r < t.length; r++, n += 8) e[n >>> 5] |= t[r] << (24 - (n % 32));
	return e;
};

const wordsToBytes = (t) => {
	for (var e = [], r = 0; r < 32 * t.length; r += 8) e.push((t[r >>> 5] >>> (24 - (r % 32))) & 255);
	return e;
};

const bytesToHex = (t) => {
	for (var e = [], r = 0; r < t.length; r++) e.push((t[r] >>> 4).toString(16)), e.push((15 & t[r]).toString(16));
	return e.join('');
};

const stringToBytes = (t) => {
	t = unescape(encodeURIComponent(t));
	for (var e = [], r = 0; r < t.length; r++) e.push(255 & t.charCodeAt(r));
	return e;
};

const s = (t, e) => {
	t.constructor == String
		? (t = e && e.encoding === 'binary' ? a.stringToBytes(t) : stringToBytes(t))
		: o(t)
		? (t = Array.prototype.slice.call(t, 0))
		: Array.isArray(t) || (t = t.toString());
	for (
		var r = bytesToWords(t), u = 8 * t.length, f = 1732584193, c = -271733879, l = -1732584194, h = 271733878, d = 0;
		d < r.length;
		d++
	)
		r[d] = (16711935 & ((r[d] << 8) | (r[d] >>> 24))) | (4278255360 & ((r[d] << 24) | (r[d] >>> 8)));
	(r[u >>> 5] |= 128 << u % 32), (r[14 + (((u + 64) >>> 9) << 4)] = u);
	const p = s._ff;
	const v = s._gg;
	const y = s._hh;
	const b = s._ii;
	for (d = 0; d < r.length; d += 16) {
		const m = f;
		const g = c;
		const _ = l;
		const w = h;
		(c = b(
			(c = b(
				(c = b(
					(c = b(
						(c = y(
							(c = y(
								(c = y(
									(c = y(
										(c = v(
											(c = v(
												(c = v(
													(c = v(
														(c = p(
															(c = p(
																(c = p(
																	(c = p(
																		c,
																		(l = p(
																			l,
																			(h = p(
																				h,
																				(f = p(f, c, l, h, r[d + 0], 7, -680876936)),
																				c,
																				l,
																				r[d + 1],
																				12,
																				-389564586,
																			)),
																			f,
																			c,
																			r[d + 2],
																			17,
																			606105819,
																		)),
																		h,
																		f,
																		r[d + 3],
																		22,
																		-1044525330,
																	)),
																	(l = p(
																		l,
																		(h = p(
																			h,
																			(f = p(f, c, l, h, r[d + 4], 7, -176418897)),
																			c,
																			l,
																			r[d + 5],
																			12,
																			1200080426,
																		)),
																		f,
																		c,
																		r[d + 6],
																		17,
																		-1473231341,
																	)),
																	h,
																	f,
																	r[d + 7],
																	22,
																	-45705983,
																)),
																(l = p(
																	l,
																	(h = p(
																		h,
																		(f = p(f, c, l, h, r[d + 8], 7, 1770035416)),
																		c,
																		l,
																		r[d + 9],
																		12,
																		-1958414417,
																	)),
																	f,
																	c,
																	r[d + 10],
																	17,
																	-42063,
																)),
																h,
																f,
																r[d + 11],
																22,
																-1990404162,
															)),
															(l = p(
																l,
																(h = p(
																	h,
																	(f = p(f, c, l, h, r[d + 12], 7, 1804603682)),
																	c,
																	l,
																	r[d + 13],
																	12,
																	-40341101,
																)),
																f,
																c,
																r[d + 14],
																17,
																-1502002290,
															)),
															h,
															f,
															r[d + 15],
															22,
															1236535329,
														)),
														(l = v(
															l,
															(h = v(h, (f = v(f, c, l, h, r[d + 1], 5, -165796510)), c, l, r[d + 6], 9, -1069501632)),
															f,
															c,
															r[d + 11],
															14,
															643717713,
														)),
														h,
														f,
														r[d + 0],
														20,
														-373897302,
													)),
													(l = v(
														l,
														(h = v(h, (f = v(f, c, l, h, r[d + 5], 5, -701558691)), c, l, r[d + 10], 9, 38016083)),
														f,
														c,
														r[d + 15],
														14,
														-660478335,
													)),
													h,
													f,
													r[d + 4],
													20,
													-405537848,
												)),
												(l = v(
													l,
													(h = v(h, (f = v(f, c, l, h, r[d + 9], 5, 568446438)), c, l, r[d + 14], 9, -1019803690)),
													f,
													c,
													r[d + 3],
													14,
													-187363961,
												)),
												h,
												f,
												r[d + 8],
												20,
												1163531501,
											)),
											(l = v(
												l,
												(h = v(h, (f = v(f, c, l, h, r[d + 13], 5, -1444681467)), c, l, r[d + 2], 9, -51403784)),
												f,
												c,
												r[d + 7],
												14,
												1735328473,
											)),
											h,
											f,
											r[d + 12],
											20,
											-1926607734,
										)),
										(l = y(
											l,
											(h = y(h, (f = y(f, c, l, h, r[d + 5], 4, -378558)), c, l, r[d + 8], 11, -2022574463)),
											f,
											c,
											r[d + 11],
											16,
											1839030562,
										)),
										h,
										f,
										r[d + 14],
										23,
										-35309556,
									)),
									(l = y(
										l,
										(h = y(h, (f = y(f, c, l, h, r[d + 1], 4, -1530992060)), c, l, r[d + 4], 11, 1272893353)),
										f,
										c,
										r[d + 7],
										16,
										-155497632,
									)),
									h,
									f,
									r[d + 10],
									23,
									-1094730640,
								)),
								(l = y(
									l,
									(h = y(h, (f = y(f, c, l, h, r[d + 13], 4, 681279174)), c, l, r[d + 0], 11, -358537222)),
									f,
									c,
									r[d + 3],
									16,
									-722521979,
								)),
								h,
								f,
								r[d + 6],
								23,
								76029189,
							)),
							(l = y(
								l,
								(h = y(h, (f = y(f, c, l, h, r[d + 9], 4, -640364487)), c, l, r[d + 12], 11, -421815835)),
								f,
								c,
								r[d + 15],
								16,
								530742520,
							)),
							h,
							f,
							r[d + 2],
							23,
							-995338651,
						)),
						(l = b(
							l,
							(h = b(h, (f = b(f, c, l, h, r[d + 0], 6, -198630844)), c, l, r[d + 7], 10, 1126891415)),
							f,
							c,
							r[d + 14],
							15,
							-1416354905,
						)),
						h,
						f,
						r[d + 5],
						21,
						-57434055,
					)),
					(l = b(
						l,
						(h = b(h, (f = b(f, c, l, h, r[d + 12], 6, 1700485571)), c, l, r[d + 3], 10, -1894986606)),
						f,
						c,
						r[d + 10],
						15,
						-1051523,
					)),
					h,
					f,
					r[d + 1],
					21,
					-2054922799,
				)),
				(l = b(
					l,
					(h = b(h, (f = b(f, c, l, h, r[d + 8], 6, 1873313359)), c, l, r[d + 15], 10, -30611744)),
					f,
					c,
					r[d + 6],
					15,
					-1560198380,
				)),
				h,
				f,
				r[d + 13],
				21,
				1309151649,
			)),
			(l = b(
				l,
				(h = b(h, (f = b(f, c, l, h, r[d + 4], 6, -145523070)), c, l, r[d + 11], 10, -1120210379)),
				f,
				c,
				r[d + 2],
				15,
				718787259,
			)),
			h,
			f,
			r[d + 9],
			21,
			-343485551,
		)),
			(f = (f + m) >>> 0),
			(c = (c + g) >>> 0),
			(l = (l + _) >>> 0),
			(h = (h + w) >>> 0);
	}
	return endian([f, c, l, h]);
};

s._ff = function (t, e, r, n, i, o, a) {
	const s = t + ((e & r) | (~e & n)) + (i >>> 0) + a;
	return ((s << o) | (s >>> (32 - o))) + e;
};
s._gg = function (t, e, r, n, i, o, a) {
	const s = t + ((e & n) | (r & ~n)) + (i >>> 0) + a;
	return ((s << o) | (s >>> (32 - o))) + e;
};
s._hh = function (t, e, r, n, i, o, a) {
	const s = t + (e ^ r ^ n) + (i >>> 0) + a;
	return ((s << o) | (s >>> (32 - o))) + e;
};
s._ii = function (t, e, r, n, i, o, a) {
	const s = t + (r ^ (e | ~n)) + (i >>> 0) + a;
	return ((s << o) | (s >>> (32 - o))) + e;
};
s._blocksize = 16;
s._digestsize = 16;

// 加密
const encryption = (t, e) => {
	if (void 0 === t || t === null) throw new Error(`Illegal argument ${t}`);
	const r = wordsToBytes(s(t, e));
	return e && e.asBytes ? r : e && e.asString ? a.bytesToString(r) : bytesToHex(r);
};

export default () => {
	const e = Date.now().toString();
	const temp = `${e}9527${e.slice(0, 6)}`;

	return {
		code: encryption(temp),
		timestamp: e,
	};
};
