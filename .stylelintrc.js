/**
 * stylelint 规则配置
 * @source: http://stylelint.cn/user-guide/rules/
 */

module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	rules: {
		indentation: 'tab',
		'max-empty-lines': 1,
		'no-empty-source': true,
		'color-hex-case': 'lower',
		'color-hex-length': 'long',
		'string-quotes': 'single',
		'length-zero-no-unit': true,
		'no-extra-semicolons': true,
		'color-no-invalid-hex': true,
		'function-name-case': 'lower',
		// 'function-whitespace-after': 'never',
		'number-leading-zero': 'always',
		'no-descending-specificity': true,
		'comment-empty-line-before': 'always',
		'no-invalid-double-slash-comments': true,
		'function-calc-no-unspaced-operator': true,
		'block-closing-brace-newline-after': 'always',
		'value-list-comma-newline-after': 'never-multi-line',
		'value-list-comma-newline-before': 'never-multi-line',
		'declaration-block-single-line-max-declarations': 1,
		'block-no-empty': true,
	},
	ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'build/**/*'],
};
