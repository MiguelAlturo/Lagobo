module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    globals: {
        vtexjs: 'readonly',
        jQuery: 'readonly',
        Handlebars: 'readonly',
        skuJson: 'readonly',
        vtxctx: 'readonly',
        vtex: 'readonly',
        doSearch: 'readonly',
        $: 'readonly',
    },
    rules: {
        indent: [2, 4],
        radix: ['error', 'as-needed'],
        'prettier/prettier': ['error'],
        'class-methods-use-this': 0,
    },
};
