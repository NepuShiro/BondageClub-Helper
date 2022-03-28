// ==UserScript==
// @name         BCH - Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  BondageClub-Helper Loader
// @author       Nariko
// @match		 https://bondageprojects.elementfx.com/*
// @match		 https://www.bondageprojects.elementfx.com/*
// @match		 https://bondage-europe.com/*
// @match		 https://www.bondage-europe.com/*
// @match 		 http://localhost:*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @run-at       document-end
// @grant        none
// ==/UserScript==

setTimeout(
	function () {
			let n = document.createElement("script");
			n.setAttribute("language", "JavaScript");
			n.setAttribute("crossorigin", "anonymous");
			n.setAttribute("src", "https://narikonep.github.io/BondageClub-Helper/BCH.user.js?_=" + Date.now());
			n.onload = () => n.remove();
			document.head.appendChild(n);
		}
);
