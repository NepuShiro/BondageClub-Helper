// ==UserScript==
// @name         KDCheats Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  KinkyDungeon-Cheats Loader
// @author       Nariko
// @match        https://ada18980.github.io/KinkiestDungeon/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
/* jshint esversion: 11 */
/*jshint -W018 */
setTimeout(
	function () {
			let n = document.createElement("script");
			n.setAttribute("language", "JavaScript");
			n.setAttribute("crossorigin", "anonymous");
			n.setAttribute("src", "https://narikonep.github.io/BondageClub-Helper/KDCheats.user.js?_=" + Date.now());
			n.onload = () => n.remove();
			document.head.appendChild(n);
		}
);
