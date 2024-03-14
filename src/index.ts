import "./index.less";

const API_KEY = "_OVxPujWTaSWxKL0brVSi0LpIUBQr21Fal6zpuJbujc";

function createWarningIcon() {
	const elem = document.createElement("div");

	elem.innerHTML = `<svg class="warning-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.2683 2.99722L0.733654 19.4994C-0.0367163 20.8328 0.925498 22.5 2.46538 22.5H21.5346C23.0745 22.5 24.0367 20.8328 23.2663 19.4994L13.7317 2.99723C12.9618 1.66463 11.0382 1.66463 10.2683 2.99722Z" fill="white"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1259 4.57344C11.5069 3.88763 12.4932 3.88763 12.8742 4.57344L21.1747 19.5143C21.545 20.1808 21.063 21 20.3005 21H3.69956C2.93707 21 2.45511 20.1808 2.8254 19.5143L11.1259 4.57344ZM13 19H11V17H13V19ZM11 15H13V8.99996H11V15Z" fill="#DB5200"/>
		</svg>`;

	return elem.querySelector("svg");
}

function createBubbleBeak() {
	const elem = document.createElement("div");

	elem.innerHTML = `<svg class="bubble-beak" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 0L9.6641 9.50385C8.87246 10.6913 7.12754 10.6913 6.3359 9.50385L1.04907e-06 -1.39876e-06L16 0Z" fill="#DB5200"/>
		</svg>`;

	return elem.querySelector("svg");
}

function createTooltip() {
	const elem = document.createElement("div");
	const bubble = document.createElement("div");
	const text = document.createElement("span");
	const link = document.createElement("a");

	text.innerHTML = "Podpora tohoto API končí<br />31. 7. 2024. ";
	link.href = "#";
	link.textContent = "Více o novém API";
	bubble.classList.add("bubble");
	bubble.append(text, link, createBubbleBeak());
	elem.classList.add("tooltip");
	elem.append(createWarningIcon(), bubble);

	return elem;
}

async function getList() {
	try {
		const request = await fetch(`https://api.mapy.dev.dszn.cz/checkApiKey?apiKey=${API_KEY}`);
		const json = await request.json();

		console.log(json);
	} catch (exc) {
		console.log(exc);
	}
}

async function main() {
	await getList();

	const parent = document.getElementById("content");

	parent.append(createTooltip());
}

main();
