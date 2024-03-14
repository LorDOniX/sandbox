import path from "path";
import { getConfig, __dirname } from "./webpack.common.mjs";

const buildConf = envVars => {
	const conf = getConfig({
		patterns: [],
		staticItems: [],
	}, envVars);

	conf.entry = path.resolve(__dirname, "./src/ending.ts");
	conf.output = {
		path: path.resolve(__dirname, "dist"),
		filename: `ending-api.js`,
		libraryTarget: 'window',
		library: "SznEnding",
	};
	delete conf.devServer;
	delete conf.optimization.splitChunks;

	return conf;
};

export default buildConf;
