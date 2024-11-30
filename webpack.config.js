// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

// Определяем __dirname
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
const isProduction = process.env.NODE_ENV === 'production'; // Проверяем, является ли сборка продакшеном
const __dirname = path.resolve()
// Определяем обработчик стилей
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: './src/index.js', // Входной файл
    output: {
        path: path.resolve(__dirname, 'dist'), // Выходная папка
        filename: 'bundle.js', // Имя выходного файла
        clean: true, // Очищает папку dist перед каждой сборкой
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i, // Обработка JavaScript и JSX
                exclude: /node_modules/, // Исключаем node_modules
                use: {
                    loader: 'babel-loader', // Используем babel-loader
                    options: {
                        presets: ['@babel/preset-env'], // Пресет для ES6
                    },
                },
            },
            {
                test: /\.css$/i, // Обработка CSS
                use: [stylesHandler, 'css-loader', 'postcss-loader'], // Используем обработчики для CSS
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, // Обработка шрифтов и изображений
                type: 'asset', // Автоматическое определение типа ресурса
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон HTML
            filename: 'index.html', // Имя выходного файла
        }),
        ...(isProduction ? [
            new MiniCssExtractPlugin({
                filename: '[name].css', // Имя выходного файла CSS
                chunkFilename: '[id].css', // Имя файла CSS для чанков
            }),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
            }),
        ] : []), // Добавляем плагины только для продакшен-режима
    ],
    devServer: {
        open: true, // Автоматически открывать браузер
        host: 'localhost', // Хост для dev-сервера
    },
};

// Установка режима сборки
config.mode = isProduction ? 'production' : 'development';

// Экспорт конфигурации
export default config;
