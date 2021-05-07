module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb',
		'airbnb/hooks',
		'plugin:unicorn/recommended',
		'plugin:promise/recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react',
		'prettier/unicorn',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.tsx', '.ts', '.js', '.json'],
			},
			typescript: {}, // resolve alias
		},
	},
	rules: {
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-console': ['error', { allow: ['warn', 'error', 'log', 'time', 'timeEnd'] }],
		'no-use-before-define': 'off',
		'no-unused-expressions': [0, { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
		'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }],
		'unicorn/prefer-add-event-listener': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/prefer-spread': 'off',
		'unicorn/no-null': 'off',
		'prefer-destructuring': ['error', { object: false, array: false }],
		'@typescript-eslint/no-use-before-define': ['error'],
		'no-param-reassign': ['error', { props: false }],
		'react/jsx-filename-extension': 'off',
		indent: ['error', 'tab'],
		'import/extensions': 'off',
	},
	overrides: [
		{
			files: ['**/*.tsx'],
			rules: {
				'react/prop-types': 'off',
			},
		},
	],
};
