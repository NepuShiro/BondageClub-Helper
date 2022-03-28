// ==UserScript==
// @name         KDCheats
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  KinkyDungeon-Cheats
// @author       Nariko
// @match        https://ada18980.github.io/KinkyDungeonStandalone/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @run-at       document-end
// @grant        none
// ==/UserScript==

setTimeout(
	function () {
			let n = document.createElement("script");
			n.setAttribute("language", "JavaScript");
			n.setAttribute("crossorigin", "anonymous");
			n.setAttribute("src", "https://narikonep.github.io/BondageClub-Helper/KinkyDungeon-cheats.js?_=" + Date.now());
			n.onload = () => n.remove();
			document.head.appendChild(n);
		}
);
