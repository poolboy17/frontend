import next from 'eslint-config-next'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
	...next,
	{
		plugins: { prettier: prettierPlugin },
		rules: {
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
		},
	},
]
