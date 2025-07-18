import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			'quotes': ['error', 'single', { 'avoidEscape': true }],
			'semi': ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'space-before-blocks': 'error',
			'keyword-spacing': ['error', { 'before': true, 'after': true }],
			'space-infix-ops': 'error',
			'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
			'jsx-quotes': ['error', 'prefer-double'],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
			}],
			'prefer-const': 'error',
			'no-var': 'error',
			'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/display-name': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': ['error', {
				'prefer': 'type-imports',
				'disallowTypeAnnotations': true,
			}],
			'import/order': ['error', {
				'groups': [
					'builtin',
					'external',
					'internal',
					['parent', 'sibling'],
					'index',
					'object',
					'type',
				],
				'alphabetize': {
					'order': 'asc',
					'caseInsensitive': true,
				},
			}],
		},
	},
];

export default eslintConfig;
