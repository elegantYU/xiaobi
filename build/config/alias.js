const path = require('path');
const resolve = p => path.resolve(__dirname, p)

module.exports = {
	"@Src": resolve('../../src'),
	"@Api": resolve('../../src/api'),
	"@Utils": resolve('../../src/utils'),
	"@Hooks": resolve('../../src/hooks'),
	"@Images": resolve('../../src/images'),
	"@Styles": resolve('../../src/styles'),
	"@Const": resolve("../../src/constants"),
	"@Services": resolve('../../src/services'),
	"@Inject": resolve('../../src/injectScripts'),
	"@InterFace": resolve('../../src/interface'),
	"@Components": resolve('../../src/components'),
}
