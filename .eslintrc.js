module.exports = {
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
		mocha: true,
	},
	rules: {
		'max-length': 0,
	},
	globals: {
		jQuery: true,
		$: true,
	},
};
