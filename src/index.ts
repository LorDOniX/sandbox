/* eslint-disable no-console */
import {
	createConsoleInfo,
	checkApiKey,
	createVariant,
} from "./ending";
import "./index.less";

const API_KEY = "_OVxPujWTaSWxKL0brVSi0LpIUBQr21Fal6zpuJbujc";
const BACKEND_URL = "https://api.mapy.dev.dszn.cz";

async function main() {
	const check = await checkApiKey(BACKEND_URL, API_KEY);

	console.log(check);
	createConsoleInfo();

	const date = new Date();
	const parent = document.getElementById("content");

	parent.append(createVariant("fullscreen", date));
}

main();
