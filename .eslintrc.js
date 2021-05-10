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
		'no-tabs': [0, { allowIndentationTabs: true }],
		camelcase: 0,
		'no-shadow': 0,
		'no-plusplus': 0,
		'no-await-in-loop': 0,
		'consistent-return': 0,
		'no-console': ['error', { allow: ['warn', 'error', 'log', 'time', 'timeEnd'] }],
		'no-use-before-define': 'off',
		'no-unused-vars': 'off',
		'no-param-reassign': 'off',
		'@typescript-eslint/no-unused-vars': 0,
		'no-unused-expressions': [0, { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
		'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }],
		'unicorn/prefer-add-event-listener': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/prefer-spread': 'off',
		'unicorn/no-null': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-abusive-eslint-disable': 'off',
		'prefer-destructuring': ['error', { object: false, array: false }],
		'@typescript-eslint/no-use-before-define': ['error'],
		'react/no-array-index-key': 'off',
		'react/jsx-filename-extension': 'off',
		'react-hooks/exhaustive-deps': 0,
		indent: ['error', 'tab'],
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/label-has-associated-control': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'promise/always-return': 0,
		'@typescript-eslint/ban-ts-comment': [
			'warn',
			{
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': 'allow-with-description',
				'ts-nocheck': 'allow-with-description',
				'ts-check': 'allow-with-description',
			},
		],
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
