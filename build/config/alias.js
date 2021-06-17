const path = require('path');
const paths = require('../../tsconfig.json').compilerOptions.paths

const resolve = p => path.resolve(__dirname, path.join('../../', p))
const removeMatchExp = p => p.replace('/*', '')

module.exports =  Object.keys(paths).reduce((als, k) => ({
	...als,
	[removeMatchExp(k)]: resolve(removeMatchExp(paths[k][0]))
}), {})
