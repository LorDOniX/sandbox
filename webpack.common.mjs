/* eslint-disable no-console */
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getJsonFile(jsonPath) {
	try {
		const strData = readFileSync(jsonPath);

		return JSON.parse(strData);
	} catch (exc) {
		console.log(exc);

		return null;
	}
}

function getConfig({
	versionFile = "./package.json",
	source = "./src/index.ts",
	dist = "./dist",
	publicDir = "public",
	patterns = [],
	staticItems = [],
}, envVars) {
	const { env } = envVars;
	const production = env && env === "prod";
	const PACKAGE = getJsonFile(versionFile);
	const nameWithHase = `ending-api`;

	return {
		mode: production ? 'production' : 'development',
		devtool: production ? 'source-map' : 'cheap-module-source-map',
		entry: path.resolve(__dirname, source),
		output: {
			path: path.resolve(__dirname, dist),
			publicPath: '/',
			filename: fileData => {
				if (fileData.chunk.name === "vendor") {
					return `vendor.[fullhash].js`;
				}

				return production ? `${nameWithHase}.js` : '[name].js';
			},
			chunkFilename: function chunkName() {
				return `${nameWithHase}.js`;
			},
			globalObject: 'self',
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js", ".jsx", ".mjs"],
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
		module: {
			rules: [{
				test: /\.(ts|js)x?$/u,
				exclude: /node_modules/u,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-typescript',
							[
								'@babel/preset-env',
								{
									modules: false,
									useBuiltIns: 'usage',
									corejs: '3',
								},
							],
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-object-rest-spread',
							'@babel/plugin-syntax-dynamic-import',
						],
					},
				},
			}, {
				test: /\.(css|less)$/u,
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							esModule: false,
						},
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								paths: [
									path.resolve(__dirname, './src'),
								],
							},
						},
					},
				],
			}, {
				test: /\.(png|svg|jpg|gif)$/u,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 2048,
						},
					},
				],
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/u,
				use: 'file-loader',
			}],
		},
		devServer: {
			client: {
				overlay: false,
			},
			setupMiddlewares: (middlewares, devServer) => {
				console.log(`Setup my dev rest api server...`);
				const app = devServer.app;

				//bindServer(app, dataDir);

				return middlewares;
			},
			static: [
				...staticItems,
			],
			port: 4444,
			hot: true,
			open: false,
			historyApiFallback: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, `${publicDir}/index.ejs`),
				version: PACKAGE.version,
			}),
			new CleanWebpackPlugin(),
			new StyleLintPlugin({
				customSyntax: "postcss-less",
				files: '**/*.(le|c)ss',
			}),
			new ESLintPlugin({
				extensions: ['js', 'jsx', 'ts', 'tsx'],
			}),
			...patterns.length > 0
				? [
					new CopyPlugin({
						patterns: [
							...patterns,
						],
					}),
				]
				: [],
			...production
				? [
					new MiniCssExtractPlugin({
						chunkFilename: `${nameWithHase}.css`,
						filename: `${nameWithHase}.css`,
					}),
					new CompressionPlugin({
						filename: '[path][base].gz[query]',
						algorithm: 'gzip',
						test: /\.js$|\.css$|\.html$/u,
						minRatio: 1,
					}),
					new CompressionPlugin({
						filename: '[path][base].br[query]',
						algorithm: 'brotliCompress',
						test: /\.(js|css|html|svg)$/u,
						compressionOptions: { level: 11 },
						minRatio: 1,
					}),
				]
				: [
				],
		],
		optimization: {
			minimizer: [
				new TerserPlugin({
					parallel: true,
				}),
				new CssMinimizerPlugin(),
			],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/u,
						chunks: 'initial',
						name: 'vendor',
						enforce: true,
					},
				},
			},
		},
	};
}

export { __dirname, getConfig };
