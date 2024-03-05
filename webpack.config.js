// Imports: Dependencies
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Webpack Configuration
const JSConfig = {
    mode: 'production',
    entry: {
        'OP-Generales': [path.resolve(__dirname, 'src/JS/Combos/General.js'), path.resolve(__dirname, 'src/CSS/Combos/General.scss')],
        'OP-Home': [path.resolve(__dirname, 'src/JS/Combos/Home.js'), path.resolve(__dirname, 'src/CSS/Combos/Home.scss')],
        'OP-Producto': [path.resolve(__dirname, 'src/JS/Combos/Producto.js'), path.resolve(__dirname, 'src/CSS/Combos/Producto.scss')],
        'OP-Category': [path.resolve(__dirname, 'src/JS/Combos/Category.js'), path.resolve(__dirname, 'src/CSS/Combos/Category.scss')],
        'OP-Libranza': [path.resolve(__dirname, 'src/JS/Combos/Libranza.js'), path.resolve(__dirname, 'src/CSS/Combos/Libranza.scss')],
        'OP-Formulario': [path.resolve(__dirname, 'src/JS/Combos/Formulario.js'), path.resolve(__dirname, 'src/CSS/Combos/Formulario.scss')],
        'OP-Promociones': [path.resolve(__dirname, 'src/JS/Combos/Promociones.js'), path.resolve(__dirname, 'src/CSS/Combos/Promociones.scss')],
        'OP-Checkout': [path.resolve(__dirname, 'src/JS/Combos/Checkout.js'), path.resolve(__dirname, 'src/CSS/Combos/Checkout.scss')],
        'OP-OrderPlaced': [path.resolve(__dirname, 'src/JS/Combos/OrderPlaced.js'), path.resolve(__dirname, 'src/CSS/Combos/OrderPlaced.scss')],
        'OP-StaticPages': [path.resolve(__dirname, 'src/JS/Combos/StaticPages.js'), path.resolve(__dirname, 'src/CSS/Combos/StaticPages.scss')],
    },
    output: {
        path: path.resolve(__dirname, 'outputs/scripts/'),
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
                        },
                    },
                    /*{
                        loader: 'eslint-loader',
                    },*/
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false, sourceMap: false },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '../styles/[name].min.css',
        }),
    ],
    watch: true,
    devtool: 'source-map',
};

module.exports = [JSConfig];
