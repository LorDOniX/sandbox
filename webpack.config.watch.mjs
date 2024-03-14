import path from "path";
import { getConfig, __dirname } from "./webpack.common.mjs";

const webpackConf = envVars => getConfig({
	patterns: [],
	staticItems: [{
		directory: path.resolve(__dirname, './web-data'),
		publicPath: '/web-data',
	}],
}, envVars);

export default webpackConf;
