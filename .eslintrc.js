// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2020: true,
    },
    parserOptions: {
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    ignorePatterns: [
        '.eslintrc.js',
        'lint-staged.config.js',
    ],
    plugins: ['@typescript-eslint', 'security', 'no-unsanitized', 'import'],
    extends: [
        'eslint:recommended', 'plugin:security/recommended', 'plugin:no-unsanitized/DOM',
        'airbnb-base', 'plugin:import/errors', 'plugin:import/warnings',
        'plugin:import/typescript', 'plugin:@typescript-eslint/recommended', 'airbnb-typescript/base',
    ],
    rules: {
        'no-plusplus': 0,
        'no-continue': 0,
        'no-console': 0,
        'no-param-reassign': ['error', { 'props': false }],
        'no-restricted-syntax': [0, { selector: 'ForOfStatement' }],
        'no-await-in-loop': 0,
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'max-len': ['error', { code: 120, ignoreStrings: true }],
        'func-names': 0,
        'valid-typeof': 0,
        'no-useless-constructor': 0, // sometimes constructor is necessary to generate right documentation
        'quotes': ['error', 'single'],
        'lines-between-class-members': 0,
        'class-methods-use-this': 0,
        'no-underscore-dangle': ['error', { allowAfterThis: true }],
        'max-classes-per-file': 0,
        'operator-linebreak': ['error', 'after'],
        'newline-per-chained-call': 0,
        'global-require': 0,
        'arrow-parens': ['error', 'always'],
        'security/detect-object-injection': 0, // the rule is relevant for user input data on the node.js environment
        'import/order': ['error', { 'groups': ['builtin', 'external', 'internal'] }],
        'import/prefer-default-export': 0, // works incorrect with interfaces

        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/lines-between-class-members': 0,
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    '{}': false, // TODO: try to fix with Record<string, unknown>
                    object: false, // TODO: try to fix with Record<string, unknown>
                    Function: false, // TODO: try to fix somehow
                },
            },
        ],
    },
};
