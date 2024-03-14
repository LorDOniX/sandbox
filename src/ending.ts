/* eslint-disable no-console */
import "./ending.less";

type TVariant = "tooltip" | "popup" | "fullscreen";
type TLang = "cs" | "en";

const LINK = "https://developer.mapy.cz/js-api/ukonceni-podpory-js-sdk/";
const LANGS = {
	cs: {
		console: `Používáte zastaralou verzi knihovny JS SDK Mapy.cz. Tato knihovna přestane být v blízké době podporováno. Doporučujeme přejít na nové REST API Mapy.cz.`
		+ ` Více informací najdete zde: https://developer.mapy.cz/js-api/ukonceni-podpory-js-sdk/`,
		tooltip: "Podpora tohoto API končí{bl}{date}.",
		popup: "Podpora tohoto API končí {date}. Pro obnovení služby{bl}se připojte na nové API.",
		fullscreen: "Podpora JS API byla ukončena {date}. Pro obnovení služby se připojte na nové API.",
		moreAboutApi: "Více o novém API",
		moreAboutApiFullscreen: "Chci nové API od Mapy.cz",
	},
	en: {
		console: `Používáte zastaralou verzi knihovny JS SDK Mapy.cz. Tato knihovna přestane být v blízké době podporováno. Doporučujeme přejít na nové REST API Mapy.cz.`
		+ ` Více informací najdete zde: https://developer.mapy.cz/js-api/ukonceni-podpory-js-sdk/`,
		tooltip: "Podpora tohoto API končí{bl}{date}.",
		popup: "Podpora tohoto API končí {date}. Pro obnovení služby{bl}se připojte na nové API.",
		fullscreen: "Podpora JS API byla ukončena {date}. Pro obnovení služby se připojte na nové API.",
		moreAboutApi: "More about new API",
		moreAboutApiFullscreen: "I want new API from Mapy.cz",
	},
};

function getSvgFromString(str: string): SVGElement {
	const elem = document.createElement("div");

	elem.innerHTML = str;

	return elem.querySelector("svg");
}

function createWarningIcon() {
	return getSvgFromString(`<svg class="warning-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.2683 2.99722L0.733654 19.4994C-0.0367163 20.8328 0.925498 22.5 2.46538 22.5H21.5346C23.0745 22.5 24.0367 20.8328 23.2663 19.4994L13.7317 2.99723C12.9618 1.66463 11.0382 1.66463 10.2683 2.99722Z" fill="white"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1259 4.57344C11.5069 3.88763 12.4932 3.88763 12.8742 4.57344L21.1747 19.5143C21.545 20.1808 21.063 21 20.3005 21H3.69956C2.93707 21 2.45511 20.1808 2.8254 19.5143L11.1259 4.57344ZM13 19H11V17H13V19ZM11 15H13V8.99996H11V15Z" fill="#DB5200"/>
		</svg>`);
}

function createBubbleBeakIcon() {
	return getSvgFromString(`<svg class="bubble-beak-icon" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 0L9.6641 9.50385C8.87246 10.6913 7.12754 10.6913 6.3359 9.50385L1.04907e-06 -1.39876e-06L16 0Z" fill="#DB5200"/>
		</svg>`);
}

function createCloseIcon() {
	return getSvgFromString(`<svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M12 10.5857L7.75797 6.34367C7.36465 5.95035 6.73367 5.95253 6.34314 6.34305C5.9499 6.7363 5.95289 7.36702 6.34376 7.75788L10.5858 11.9999L6.34376 16.2419C5.95044 16.6353 5.95262 17.2662 6.34314 17.6568C6.73639 18.05 7.36711 18.047 7.75797 17.6561L12 13.4141L16.242 17.6561C16.6353 18.0495 17.2663 18.0473 17.6569 17.6568C18.0501 17.2635 18.0471 16.6328 17.6562 16.2419L13.4142 11.9999L17.6562 7.75788C18.0496 7.36456 18.0474 6.73358 17.6569 6.34305C17.2636 5.9498 16.6329 5.9528 16.242 6.34367L12 10.5857Z" fill="white"/>
		</svg>`);
}

function formatDate(date: Date) {
	return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
}

function createApiLink(lang: TLang = "cs", fullscreen?: boolean) {
	const link = document.createElement("a");

	link.href = LINK;
	link.target = "_blank";
	link.textContent = fullscreen
		? LANGS[lang].moreAboutApiFullscreen
		: LANGS[lang].moreAboutApi;

	return link;
}

function createTooltip(lang: TLang = "cs", date: Date) {
	const elem = document.createElement("div");
	const bubble = document.createElement("div");
	const text = document.createElement("span");

	text.innerHTML = LANGS[lang].tooltip.replace("{bl}", "<br />").replace("{date}", formatDate(date));
	bubble.classList.add("bubble");
	bubble.append(text, createApiLink(lang), createBubbleBeakIcon());
	elem.classList.add("szn-ending-tooltip");
	elem.append(createWarningIcon(), bubble);

	return elem;
}

function createPopup(lang: TLang = "cs", date: Date) {
	const elem = document.createElement("div");
	const cover = document.createElement("div");
	const desc = document.createElement("p");
	const btn = document.createElement("button");

	elem.classList.add("szn-ending-popup");
	cover.classList.add("szn-ending-popup-cover");
	desc.innerHTML = LANGS[lang].popup.replace("{bl}", "<br />").replace("{date}", formatDate(date));
	btn.classList.add("close-btn");
	btn.append(createCloseIcon());
	desc.append(createApiLink(lang));
	elem.append(createWarningIcon(), desc, btn);
	cover.append(elem);
	btn.addEventListener("click", () => {
		cover.remove();
	});

	return cover;
}

function createFullscreen(lang: TLang = "cs", date: Date) {
	const elem = document.createElement("div");
	const cover = document.createElement("div");
	const desc = document.createElement("p");

	elem.classList.add("szn-ending-fullscreen");
	cover.classList.add("szn-ending-fullscreen-cover");
	desc.innerHTML = LANGS[lang].fullscreen.replace("{bl}", "<br />").replace("{date}", formatDate(date));
	elem.append(createWarningIcon(), desc, createApiLink(lang, true));
	cover.append(elem);

	return cover;
}

function createConsoleInfo(lang: TLang = "cs") {
	console.log(`%c${LANGS[lang].console}`, 'color:red;background:#fafafa;');
}

async function checkApiKey(backendUrl: string, apiKey: string): Promise<boolean> {
	try {
		const request = await fetch(`${backendUrl}/checkApiKey?apiKey=${apiKey}`);
		const json: { data: { whitelisted: boolean; } } = await request.json();

		return json.data.whitelisted;
	} catch (exc) {
		console.log(exc);
	}

	return false;
}

function createVariant(variant: TVariant, date: Date, lang: TLang = "cs"): HTMLElement {
	switch (variant) {
		case "tooltip":
			return createTooltip(lang, date);

		case "popup":
			return createPopup(lang, date);

		case "fullscreen":
			return createFullscreen(lang, date);

		default:
	}

	return document.createElement("div");
}

export {
	createConsoleInfo,
	checkApiKey,
	createVariant,
};
