// ==UserScript==
// @name         BCH
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  BondageClub-Helper
// @author       Nariko
// @match        https://bondageprojects.elementfx.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @match        https://bondage-europe.com/*
// @match        https://www.bondage-europe.com/*
// @match        http://localhost:*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// ==/UserScript==
// @ts-check
// eslint-disable-next-line
/// <reference path="./bch.d.ts" />
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-undef */
/* eslint-disable no-implicit-globals */
/* jshint esversion: 11 */
/*jshint -W018 */

const BCH_VERSION = "1.0";

/**
 *  THIS SCRIPT USES CODE FROM https://gitlab.com/Sidiousious/bch/ IT IS NOT MY CODE. IT IS LICENSED UNDER GPLv3
 * 	GO SUPPORT THE ORIGINAL AUTHOR	
 * 
 *  Copyright (C) 2022  Sid
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/** @type {import('./types/bcModSdk').ModSDKGlobalAPI} */
// eslint-disable-next-line capitalized-comments, multiline-comment-style
// prettier-ignore
// @ts-ignore
// eslint-disable-next-line
var BCH_bcModSdk=function(){"use strict";const o="1.0.2";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const a=new Map,i=new Set;function d(o){i.has(o)||(i.add(o),console.warn(o))}function c(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||d(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}function s(o){const e=[],t=new Map,n=new Set;for(const r of u.values()){const a=r.patching.get(o.name);if(a){e.push(...a.hooks);for(const[e,i]of a.patches.entries())t.has(e)&&t.get(e)!==i&&d(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${i}`),t.set(e,i),n.add(r.name)}}return e.sort(((o,e)=>e.priority-o.priority)),{hooks:e,patches:t,patchesSources:n,final:c(o.original,t)}}function l(o,e=!1){let r=a.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const i=o.split(".");for(let t=0;t<i.length-1;t++)if(e=e[i[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${i.slice(0,t+1).join(".")} is not object`);const d=e[i[i.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${o} to be patched not found`);const c=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:o,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l)}),a.set(o,r),e[i[i.length-1]]=function(o){return function(...e){const t=o.precomputed,n=t.hooks,r=t.final;let a=0;const i=d=>{var c,s,l,f;if(a<n.length){const e=n[a];a++;const t=null===(s=(c=w.errorReporterHooks).hookEnter)||void 0===s?void 0:s.call(c,o.name,e.mod),r=e.hook(d,i);return null==t||t(),r}{const n=null===(f=(l=w.errorReporterHooks).hookChainExit)||void 0===f?void 0:f.call(l,o.name,t.patchesSources),a=r.apply(this,e);return null==n||n(),a}};return i(e)}}(r)}return r}function f(){const o=new Set;for(const e of u.values())for(const t of e.patching.keys())o.add(t);for(const e of a.keys())o.add(e);for(const e of o)l(e,!0)}function p(){const o=new Map;for(const[e,t]of a)o.set(e,{name:e,originalHash:t.originalHash,hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const u=new Map;function h(o){u.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),u.delete(o.name),o.loaded=!1}function g(o,t,r){"string"==typeof o&&o||e("Failed to register mod: Expected non-empty name string, got "+typeof o),"string"!=typeof t&&e(`Failed to register mod '${o}': Expected version string, got ${typeof t}`),r=!0===r;const a=u.get(o);a&&(a.allowReplace&&r||e(`Refusing to load mod '${o}': it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),h(a));const i=t=>{"string"==typeof t&&t||e(`Mod '${o}' failed to patch a function: Expected function name string, got ${typeof t}`);let n=c.patching.get(t);return n||(n={hooks:[],patches:new Map},c.patching.set(t,n)),n},d={unload:()=>h(c),hookFunction:(t,n,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);"number"!=typeof n&&e(`Mod '${o}' failed to hook function '${t}': Expected priority number, got ${typeof n}`),"function"!=typeof r&&e(`Mod '${o}' failed to hook function '${t}': Expected hook function, got ${typeof r}`);const d={mod:c.name,priority:n,hook:r};return a.hooks.push(d),f(),()=>{const o=a.hooks.indexOf(d);o>=0&&(a.hooks.splice(o,1),f())}},patchFunction:(t,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);n(r)||e(`Mod '${o}' failed to patch function '${t}': Expected patches object, got ${typeof r}`);for(const[n,i]of Object.entries(r))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod '${o}' failed to patch function '${t}': Invalid format of patch '${n}'`);f()},removePatches:o=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);i(o).patches.clear(),f()},callOriginal:(t,n,r)=>(c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`),"string"==typeof t&&t||e(`Mod '${o}' failed to call a function: Expected function name string, got ${typeof t}`),Array.isArray(n)||e(`Mod '${o}' failed to call a function: Expected args array, got ${typeof n}`),function(o,e,t=window){return l(o).original.apply(t,e)}(t,n,r)),getOriginalHash:t=>("string"==typeof t&&t||e(`Mod '${o}' failed to get hash: Expected function name string, got ${typeof t}`),l(t).originalHash)},c={name:o,version:t,allowReplace:r,api:d,loaded:!0,patching:new Map};return u.set(o,c),Object.freeze(d)}function m(){const o=[];for(const e of u.values())o.push({name:e.name,version:e.version});return o}let w;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:m,getPatchingInfo:p,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return w=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.0.2' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.0.2' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}(); // jshint ignore:line

async function BondageClubHelper() {
	"use strict";

	const w = window;

	if (typeof ChatRoomCharacter === "undefined") {
		console.error("Bondage Club not detected. Skipping BCH initialization.");
		return;
	}

	const modApi = BCH_bcModSdk.registerMod('BondageClubHelper', BCH_VERSION);

	w.BCH_VERSION = BCH_VERSION;

	var DressButtonTimer;
	var LeaveButtonTimer;
	var EmoticonBlockTimer;

	/** @type {"none" | "external" | "stable" | "devel"} */
	let bcxType = "none";

	const BCH_GITHUB = "https://github.com/NarikoNep/BondageClub-Helper",
		BCH_MSG = "BCHMsg",
		HIDDEN = "Hidden",
		MESSAGE_TYPES = Object.freeze({
			Hello: "Hello",
		});
	
	/** @type {Readonly<{Top: 11; OverrideBehavior: 10; ModifyBehaviorHigh: 6; ModifyBehaviorMedium: 5; ModifyBehaviorLow: 4; AddBehavior: 3; Observe: 0}>} */
	const HOOK_PRIORITIES = {
		Top: 11,
		OverrideBehavior: 10,
		ModifyBehaviorHigh: 6,
		ModifyBehaviorMedium: 5,
		ModifyBehaviorLow: 4,
		AddBehavior: 3,
		Observe: 0,
	};

	/**
	 * @type {Settings}
	 */
	let bchSettings = {};

	/**
	 * @type {Readonly<DefaultSettings>}
	 */
	const defaultSettings = Object.freeze({
		allowLeave: {
			label: "Allow yourself to leave the room while bound",
			value: false,
			sideEffects: (newValue) => {
				if (newValue) {
					bchLog("You are now allowed to leave the chatroom");
					ChatRoomCanLeave = function () {
						return true;
					};
					Player.IsSlow = function () {
						return false;
					};
					Player.CanChangeOwnClothes = function () {
						return true;
					};
					ChangeLeaveButtonColor();
					ChangeDressButtonColor();
				} else {
					ChatRoomCanLeave = function () {
						if (ChatRoomLeashPlayer != null) {
							if (ChatRoomCanBeLeashedBy(0, Player)) {
								return false;
							} else ChatRoomLeashPlayer = null;
						}
						if (!Player.CanWalk()) return false;
						if (ChatRoomData.Locked && (ChatRoomData.Game == "GGTS")) return false;
						if (!ChatRoomData.Locked || ChatRoomPlayerIsAdmin()) return true;
						for (let C = 0; C < ChatRoomCharacter.length; C++)
							if (ChatRoomData.Admin.indexOf(ChatRoomCharacter[C].MemberNumber) >= 0) return false;
						return true;
					};
					Player.IsSlow = function () {
						return (((Player.Effect.indexOf("Slow") >= 0) || (Player.Pose.indexOf("Kneel") >= 0)) && ((Player.ID != 0) || !Player.RestrictionSettings.SlowImmunity));
					};
					Player.CanChangeOwnClothes = function () {
						return this.CanChangeClothesOn(this);
					};
					clearTimeout(LeaveButtonTimer);
					clearTimeout(DressButtonTimer);
					modApi.removePatches("ChatRoomRun");
					modApi.removePatches("ChatRoomMenuDraw");
				}
				bchDebug("allowLeave", newValue);
			},
			category: "General",
		},
		EmoticonBlock: {
			label: "Block actions based on emoticon",
			value: false,
			sideEffects: (newValue) => {
				if (newValue) {
					EmoticonBlockTimerCheck();
				} else {
					clearTimeout(EmoticonBlockTimer);
				}
				bchDebug("EmoticonBlock", newValue);
			},
			category: "General",
		},
		Pastebin: {
			label: "Enable Pastebin for exportlook",
			value: false,
			sideEffects: (newValue) => {
				bchDebug("Pastebin", newValue);
			},
			category: "General",
		},
		RemoveValidation: {
			label: "Remove Validation, EXPERIMENTAL",
			value: false,
			sideEffects: (newValue) => {
				if (newValue) {
					patchFunction("ValidationCanRemoveItem",{"return false;":"return true;"});
					patchFunction("ValidationCanAddOrRemoveItem",{"return false;":"return false;"});
				} else {
					modApi.removePatches("ValidationCanRemoveItem");
					modApi.removePatches("ValidationCanAddOrRemoveItem");
				}
				bchDebug("RemoveValidation", newValue);
			},
			category: "Experimental",
		},
		Unrestrainbutton: {
			label: "Show an unstrain button",
			value: false,
			sideEffects: (newValue) => {
				bchDebug("UnrestrainButton", newValue);
			},
			category: "General",
		},
		LockPickHelpBCH: {
			label: "Show lockpick seed entirely",
			value: false,
			sideEffects: (newValue) => {
				bchDebug("LockPickHelpBCH", newValue);
			},
			category: "General",
		}
	});

	function settingsLoaded() {
		return Object.keys(bchSettings).length > 0;
	}

	const bchSettingKey = () => `bch.settings.${Player?.AccountName}`;

	/**
	 * @type {() => Promise<Settings>}
	 */
	const bchLoadSettings = async () => {
		await waitFor(() => !!Player?.AccountName);

		const key = bchSettingKey();

		bchDebug("loading settings", key);
		if (!settingsLoaded()) {

			let settings = JSON.parse(localStorage.getItem(key));
			const onlineSettings = JSON.parse(
				LZString.decompressFromBase64(Player.OnlineSettings.BCH) || null
			);
			if (onlineSettings?.version >= settings?.version || (typeof settings?.version === "undefined" && typeof onlineSettings?.version !== "undefined")) {
				settings = onlineSettings;
			}
			if (!settings) {
				bchDebug("no settings", key);
				settings = {};
			}

			for (const setting in defaultSettings) {
				if (!Object.prototype.hasOwnProperty.call(defaultSettings, setting)) {
					continue;
				}
				if (!(setting in settings)) {
					settings[setting] = defaultSettings[setting].value;
				}
			}
			bchSettings = settings;
			return settings;
		}
		return bchSettings;
	};

	const bchSaveSettings = () => {
		localStorage.setItem(bchSettingKey(), JSON.stringify(bchSettings));
		Player.OnlineSettings.BCH = LZString.compressToBase64(
			JSON.stringify(bchSettings)
		);
		ServerAccountUpdate.QueueData({
			OnlineSettings: Player.OnlineSettings,
		});
	};

	function postSettings() {
		bchDebug("handling settings side effects");
		for (const [k, v] of Object.entries(bchSettings)) {
			if (k in defaultSettings) {
				defaultSettings[k].sideEffects(v);
			}
		}
		bchSaveSettings();
	}

	const ICONS = Object.freeze({
		USER: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyEAYAAABOr1TyAAAACXBIWXMAAC4jAAAuIwF4pT92AAABeWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaldA9a1MBGMXx302UVo10MIJIhztU6dBCVSiOEsEu0SGNkESX5DZvkKTh3gQproKLQ8FBdLHq4DfQVXBVEARFEHHxC/i2SLkOKaQIHTzTn3M4Dw+HTLEX9ZNDK/QHo7i0Vggr1Vo4803OESeds1iPkuHV9StlB+r3BwG8X+5F/cT/6dhGM4kIZrEaDeMRwSUUb42GI4J7yEed+gbBDpbiSrVG8Ab5xoS/It+e8E/k43LpMplZhO193NjHUSfuk1nEQr83jvb+CZBrDq6v4zTmJUrWFIQaxrp6RpZ1DTigt4J512wKRTYNbYl1tXWMLAmNJZpCLbGmpp6tSrUW/rtn0rpwfnI9V+DwlzT9cYaZ++xup+mfJ2m6+5TsZ14Npv3NHS7+Irs99RYeM3eHF6+nXuMBL+9y6tOwHtdBFplWi+/POV7lxDuO3phstZd79pHybYpvefiIsy3mbv4FQr9oKb+MK8cAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAYpJREFUeNrsmtGRgjAQhsWhALWDowS1BCzBK8EWxAq8GrxSsAS9Eizhjg5yD3Ef0AQwkCD6/S87TgaW8P2bTRwipZRSaoSeRGNeAUAQQACCAAIQ5EFx9fA26ybN36+Oh0O7+7g+z6P5k0TH9afb/dJUx8XSPH4+6Xg83g3JOcQcu1KeV+dpGkPlT9N299tm1dfL+P31sZvjLperQ74tDvvQcbMpO04c3tSxtooIlb8HuTmyziFtHdZ3/v4qhKbOLgu12GUNVecfHVcryy6pAEhQSdM2bCtfs0IWcx3z3Dw+nZj33dnu2R3azfxlVxcMyHRWPgDVOrYYqmO7mb/3pi6OlzX6Nkol2Bz1tR94j6qZv/v5xrFCHnW8P0f11KNq5m/7y+Rtm7q8EFsl3vY0dlm+1/jJUCuSgyFAkIclS5aCph8QSfOznZxtiqLyb8kXKj8V8vaK+FCOCkEAAQgCCEAQQACCAAIQBBAEEIAggAAEAQQgCCAAQQBBAAEIAghAEEBeWf8AAAD//wMAOcMcbwwSh6AAAAAASUVORK5CYII=",
		GITHUB: "data:image/png;base64,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",
		LOGO: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABWCAYAAAEiUVFhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAHRgSURBVHgBAO8BEP4B2dnZ5ejo6A0DAwMA+Pj4ALi4uAAcHBwA6+vrABYWFgBra2s6AwMD1AAAAAAAvLy88qysrP////8AEhIS/0NDQ/8DAwP/ExMT/6CgoP/6+vr/5eXlZ////wAAzMzM8v///wB6enr/CQkJ/wAAAP9QUFD/AAAA/wAAAP8AAAD/ODg4/////wAA////AP///wCenp7/g4OD/wAAAP/Y2Nj/AAAA/wcHB/8wMDD/ICAg/////wAA////AP///wBvb2//Dw8P/y0tLf8AAAD/AAAA/wAAAP8bGxv/EhIS/////wAA////AP///wA6Ojr/nZ2d/+vr6///////8/Pz/2RkZP/l5eX/Hh4e/+fn52MA////AP///wD/////AQEB/5mZmf/w8PD//v7+/0pKSv9BQUH/AQEB/46Ojv8A////AP///wD///8AMzMz///////+/v7//////3BwcP+JiYn/AAAA/zw8PP8A////AP///wDR0dH/tLS0/0VFRf/MzMz/bGxs/wwMDP/r6+v/AAAA/zc3N/8A////AP///wD///8APj4+//Ly8v//////c3Nz/wAAAP/+/v7/VVVV/x4eHv8B////AAAAAAD09PT/BQUFANvb2wCdnZ0AEhISAOLi4gCAgIAAGxsbAMPDwwAA7wEQ/gHFxcXy7OzsAA8PDwDq6uoAzMzMAERERAC6uroAa2trACAgIA4AAAAAAAAAAACgoKD/////AD4+Pv+VlZX/AwMD/wMDA//29vb/BwcH/3x8fP////8A////AADExMT/////AHNzc/8AAAD/DQ0N/z4+Pv8kJCT/AAAA/woKCv/i4uJc////AAD///8A5ubm/+Tk5P+jo6P/AAAA//v7+/8AAAD/AAAA/wQEBP+IiIj3////AAIAAAAA0tLSAFxcXADj4+MABwcHACwsLACqqqoAAQEBAENDQwDExMQIAAAAAAD///8A/////w0NDf9dXV3//f39//////9FRUX/AAAA/729vf8vLy//////AAD///8AzMzMsw0NDf/6+vr///////7+/v/+/v7/AAAA/xMTE/8UFBT/////AAD///8A////AFFRUf8AAAD////////////+/v7/AAAA/x4eHv8WFhb/4uLiDQD///8A////AKurq/81NTX/CQkJ//////8AAAD/AAAA/6+vr/8EBAT/uLi4tAIAAAAAAAAAAN7e3gASEhIA8vLyAAAAAAD///8AVVVVAB0dHQCnp6cAuLi4SwL5+fklAAAAAKCgoAB6enoABAQEAHJycgAbGxsAJiYmAAkJCQBUVFQAAwMDAADTAyz8AcTExPLl5eUN/v7+AD8/PwC2trYACwsLAPz8/ADv7+8AqKioAF9fXwC7u7sAGBgYADY2NgDKysoAvLy8ABsbGwBOTk4AOTk5kTU1NXAAAAAAAAAAAAAAAAEBvr6+8uzs7A0LCwsASkpKAQAAAAA3Nzf/DQ0NABISEgCrq6sAAAAAAAAAAAASEhIA7u7uADg4OADn5+cAAAAAAAwMDAAPDw8AUFBQAHV1dQEAAAAAAAAAAADb29vy////AP///wD///8AiYmJ/1dXV/84ODj/AAAA//39/f8AAAD/AAAA/wAAAP8AAAD/AQEB/wQEBP8AAAD/AAAA/wQEBP9eXl7/mJiY3P///wD///8AAiQkJA4AAAAAAAAAAK6urv8eHh4ABAQEANvb2wD///8AAwMDAAAAAAAYGBgAKioqAB4eHgAMDAwAYGBgAAAAAAAbGxsAYWFhALu7uwDNzc0jAAAAAAAAAAAA////AP///wD///8A9PT0/2JiYv8xMTH/t7e3///////IyMj/pKSk/wAAAP//////k5OT/1ZWVv9TU1P/AAAA/1ZWVv+bm5v/DAwM/9nZ2f////8G////AAD///8A////AP///wDT09P/Ly8v/y8vL/8AAAD//////yEhIf///////v7+//7+/v/+/v7//////9jY2P8AAAD/LCws/+zs7P8DAwP/IiIi/8DAwPr///8AAP///wD///8A////AP///wDk5OT/Pz8//xcXF//q6ur//v7+//7+/v/FxcX//v7+//7+/v/6+vr//v7+/wAAAP9HR0f/JSUl/wAAAP8NDQ3/VFRU/////wMCAAAAAAAAAAAAAAAAAAAAAMPDwwAsLCwAPj4+AENDQwAMDAwAAQEBADk5OQDz8/MAAAAAAAUFBQAyMjIAAAAAADo6OgDg4OAAAAAAAB8fHwDo6OgAAAAAIQIAAAAAAAAAAAAAAADl5eX/WFhYATo6OgAAAAAAHBwcABwcHAABAQEAp6enAMTExABBQUEAsLCwANDQ0ABlZWUAWlpaAIaGhgAAAAAADg4OAA0NDQCenp7aAP///wD///8A3Nzc/////wCBgYH/ODg4/xAQEP8iIiL/+fn5//7+/v/Nzc3//////4yMjP8cHBz/AAAA///////+/v7/eXl5/wAAAP+1tbX/jIyM/8PDw/8B////AOvr6//x8fEACQkJAPX19QCIiIgAnp6eAAAAAAD7+/sABAQEAJubmwD9/f0AAwMDAMTExABMTEwABwcHALGxsQCenp4A29vbAIODgwAlJSUAeXl5AABOB7H4Ac7OzvLz8/MA/f39AAcHBwD///8A+vr6AP39/QDq6uoA6enpAObm5gBJSUkAAwMDAOjo6ADMzMwAJSUlADMzM/4zMzMQAAAAAAAAAAAAAAAAAAAAAATm5uYN8PDwAB4eHgDs7OwA9/f3AOzs7AAGBgYA8vLyACAgIADf398AlpaWAEhISAADAwMAs7OzAAUFBQCDg4MAMzMz/gAAAAMAAAD/AAAAAAAAAAAE9vb2APv7+wAdHR0APT09AQAAAAAlJSX/KioqALW1tQAAAAAAAAAAAAAAAACxsbEA////AEFBQQDAwMAA/Pz8ANXV1QH+/v79LS0tAgAAAAAAAAAAALCwsP+urq7/////AP///wBXV1f/np6e/wMDA/9ERET/AAAA/wAAAP8AAAD/ICAg/yQkJP8AAAD/MDAw/wEBAf9ISEj/VlZW/9jY2N3///8A////AADDw8P/3Nzc/////wD///8Ad3d3/xgYGP9AQED/29vb/wAAAP8AAAD/AAAA/29vb/8UFBT/AAAA/wAAAP9DQ0P/AgIC/1VVVf94eHj/////AP///wAEMzMzAAkJCQEAAAAA7u7u/8nJyQASEhIAwMDAAMrKygAjIyMARkZGAO3t7QDPz88ALy8vAMvLywDy8vIA4+PjAA0NDQC8vLwACQkJAAAAAAAAAAAAAP///wD///8A////AL6+vv9gYGD/aGho/w0NDf8dHR3/Pj4+/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8MDAz/DAwM/z4+Pv////8D////AAIAAAAAAAAAAAAAAAAMDAwAEBAQAMrKygDc3NwAOzs7AODg4AAAAAAAzc3NAP///wABAQEAAQEBACYmJgAAAAAA9PT0APz8/AD39/cAAAAAOAAAAAACAAAAAAAAAAD39/flzs7OAAMDAwD+/v4Aa2trAC4uLgDs7OwAAQEBAPPz8wAAAAAA/v7+AKysrACLi4sADAwMAAAAAAD8/PwAFhYWAPz8/IMAAAAAAP///wD///8A0NDQ+ISEhP9paWn/HR0d/wsLC//4+Pj//////wAAAP8AAAD/xMTE/6mpqf8cHBz/FxcX/xUVFf//////AgIC/zw8PP+Xl5fx////AAIAAAAAAAAAAAICAgQzMzMA3NzcAO3t7QDR0dEA3d3dAPDw8AD///8A////ANTU1ABWVlYAFRUVAMXFxQDr6+sAoKCgAP///wBzc3MA6urqDgAAAAACAAAAAAAAAAAtLS0ELCwsANPT0wD29vYAk5OTAHl5eQDDw8MA////AP///wBmZmYA////AE5OTgCenp4ABgYGAPn5+QD///8Aj4+PAAQEBAAAAAARAP///wD///8A////AP////8uLi7/BAQE/0lJSf//////pKSk//v7+//+/v7//v7+//7+/v///////////wAAAP82Njb/AAAA/yQkJP87Ozv/////4wD///8A////AP///wDv7+/2OTk5/x8fH//CwsL//v7+//7+/v///////v7+//7+/v/+/v7//////7Kysv8AAAD/BQUF/wAAAP8LCwv/IiIi//7+/vMCAAAAAAAAAAAAAAAAEBAQCj8/PwBMTEwAoKCgAPv7+wDAwMAA////AAEBAQABAQEAAAAAAAAAAABaWloAAAAAAC4uLgAAAAAA9vb2APv7+wC/v78IAgAAAAAAAAAAAAAAAAAAAACHh4cBKSkpAODg4AAaGhoAkpKSAAEBAQD///8A+Pj4AAAAAACsrKwA9PT0ADk5OQAWFhYAAAAAAP///wD7+/sApKSkBAIAAAAAAAAAAAAAAADp6en/7u7u/9bW1gAsLCwABwcHAMLCwgBTU1MAp6enAAgICAACAgIAQkJCAAAAAACampoAkJCQAAAAAAAAAAAA+vr6APz8/AAEAAAAAAAAAAAAAAAA4eHhANXV1QD7+/sA1dXVAOjo6AD+/v4ACwsLAElJSQDFxcUA////AI6OjgAAAAAA////ACYmJgAeHh4A4uLiAPr6+gDo6OgAAP///wD///8Avb29/////wC5ubn/VVVV/ygoKP//////9vb2//7+/v+6urr//////5iYmP8AAAD/BwcH////////////pqam/09PT/8PDw//Ozs7/wD///8A9vb2/////wD///8A/////09PT/8VFRX///////v7+//+/v7/xMTE////////////AAAA/8/Pz//+/v7////////////Z2dn/oqKi//////8EAAAAAAkJCQEAAAAAoqKi/9bW1gDQ0NAABQUFAAAAAADn5+cAHR0dAL+/vwDDw8MA2NjYABoaGgD19fUAk5OTACMjIwBLS0sAQUFBAOXl5QD8/PwABAAAAAD19fX/5ubmADw8PAA8PDwA5+fnAP///wDq6uoAHBwcAAAAAAAiIiIA+Pj4AN/f3wB9fX0A4eHhAGhoaADk5OQA////AOXl5QAAAAAAAQEBAAAxDs7xAc3NzfLx8fEN9/f3APr6+gABAQEA4+PjAN/f3wBSUlIA9fX1APz8/AD7+/sA+/v7APz8/AD+/v4ADw8PAJSUlACDg4MAhYWFAElJSQAYGBgA0tLSAPPz8wAZGRkA6+vrABwcHACysrIAAAAAAAAAAAABAQEABAQEAGtrawDe3t4AWlpa++jo6GcnJyefAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7+/8u3t7Q319fUA/f39AAkJCQAgICAAODg4AQAAAAAAAAAAAAAAAAAAAAA/Pz//Li4uANvb2wAMDAwAR0dHAMjIyACurq4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAD8/PwAhISEAExMTAH19fQACAgIAUlJSAAcHBwCUlJQAiIiIAHh4eADQ0NCOMDAwcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL9/f0A////AAICAgAHBwcA9vb2ADg4OAEAAAAAAAAAAAAAAADExMT/PDw8/+Li4gA7OzsACAgIAK6urgBvb28AtLS0APDw8ADw8PAA8PDwAPDw8AD7+/sA9fX1APDw8ADo6OgAGhoaAO7u7gAJCQkAISEhAH9/fwCvr68AAQEBAENDQwCZmZkAu7u7ALe3t3La2tr8+vr6LwAAAAAAAAAAAAAAAAAAAAAAAAAAAMPDw/K4uLj/tbW1/7Kysv////8A////AP///wD///8A1dXV/01NTf9VVVX/ZWVl/wcHB/8ZGRn/AAAA/3d3d/8AAAD/AAAA/wAAAP8BAQH/AAAA/zAwMP8AAAD/AQEB/xsbG/8AAAD/AAAA/xoaGv8AAAD/AAAA/6CgoP8AAAD/AgIC/wUFBf8RERH/r6+v/0VFRf/S0tL/////D////wD///8A////AP///wACEhISABYWFgAnJycATU1NAQAAAAAAAAAAAAAAAPT09P/S0tIACAgIAPX19QC5ubkA+/v7ABISEgAAAAAAW1tbAE9PTwAJCQkANDQ0AP///wBLS0sA9PT0AFpaWgBlZWUAn5+fAAMDAwAAAAAAHR0dAAAAAAAAAAAAYGBgADw8PAA2NjYA/Pz8APX19QBmZmYADAwMAJWVlQDV1dWnAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8Aurq6/4WFhf9gYGD/SUlJ/yAgIP9lZWX/AAAA/6ysrP9eXl7/AAAA/x8fH/8AAAD/AAAA/6Wlpf/CwsL/AAAA/wAAAP8EBAT/AAAA/wAAAP8AAAD/ISEh/wAAAP8AAAD/AgIC/wkJCf9VVVX/AwMD/w4ODv8kJCT/RERE/5KSku////8A////AP///wD///8ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN/f3//i4uIAWVlZAMXFxQD09PQAAwMDAN/f3wCUlJQAPDw8AGhoaAADAwMAIyMjAOHh4QASEhIAW1tbAObm5gB/f38A8fHxAJCQkAAAAAAAAAAAAAAAAADr6+sAAAAAAAAAAAD+/v4A9/f3APX19QAKCgoA+/v7APj4+AD19fUA6+vrD/Dw8BIQEBDuAAAAAAAAAAAA////AP///wD///8A////AP///wD///8Anp6e/6urq/9+fn7/dXV1/0VFRf8xMTH/ERER/93d3f//////2dnZ/wAAAP8AAAD/Ojo6/wAAAP/Dw8P/AAAA/76+vv8AAAD//////1xcXP8AAAD/AAAA/1ZWVv9DQ0P/AAAA/wAAAP8AAAD//////wYGBv8GBgb/FRUV/zo6Ov/09PT/39/ffP///wD///8A////AAIAAAAAAAAAAAAAAAAAAAAAAAAAAOPj4+87OzsA3NzcAO/v7wD7+/sA9vb2APj4+AB8fHwAXV1dAAAAAAAmJiYA////AEFBQQDGxsYAAAAAAD09PQCzs7MA3d3dACEhIQAAAAAAxMTEAJCQkAD///8AVFRUAL29vQD///8AAAAAAAgICABbW1sABwcHAP39/QD6+voAIyMjAGBgYAAUFBRn////AQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA5+fnDSYmJgDy8vIA4ODgAPX19QDn5+cA3d3dAEpKSgC8vLwAwsLCAAAAAAAAAAAAu7u7APr6+gD///8AbW1tAGpqagB/f38AwcHBAAEBAQA4ODgAuLi4ACwsLADR0dEAXFxcAAEBAQAAAAAA3d3dACcnJwBZWVkA/v7+APr6+gAqKioA4+PjAJaWlhoBAQEVAAAAAAAAAAAA////AP///wD///8A////AP///wDt7e3j9vb2/9DQ0P8yMjL/FxcX/zY2Nv8AAAD/goKC/wAAAP8ZGRn/AAAA/yoqKv+Li4v///////7+/v/+/v7//v7+//7+/v///////v7+//7+/v/k5OT/6urq/8/Pz///////AAAA/wAAAP8xMTH/4eHh/8jIyP8AAAD/CwsL/1tbW/8tLS3/c3Nz/8HBwc3///8A////AAD///8A////AP///wD///8A////AP///wCpqan/4eHh/4iIiP8oKCj/BQUF/wsLC/8GBgb/rq6u//j4+P+pqan/hISE/7y8vP//////+vr6///////+/v7//v7+//7+/v/+/v7//v7+//7+/v///////////wAAAP8UFBT/AAAA/zU1Nf/9/f3/IiIi/wAAAP8BAQH/RUVF/xkZGf80NDT/oaGh/////3b///8AAP///wD///8A////AP///wD///8A////AP///wCGhob7/////0VFRf82Njb/Gxsb/wMDA/84ODj/hYWF//7+/v///////v7+//7+/v/x8fH/5ubm//7+/v/+/v7//v7+//7+/v/+/v7//////6CgoP/IyMj//////wAAAP8AAAD/Ojo6/wAAAP8VFRX/AAAA/wAAAP8ZGRn/EBAQ/yYmJv9TU1P/8fHx9////wEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHl5eQXDw8P/ICAgAObm5gAWFhYA/f39ALi4uADw8PAAenp6AP///wABAQEA////AA0N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AAAAAAAAAAAAXFxcAPLy8gCXl5cAyMjIAJKSkgAgICAATExMAB8fHwD09PQAfHx8ABkZGQAbGxsAmpqaADU1NQD+/v4A/Pz8AMXFxQBra2sAExMTQgAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwD39/cA8PDwAOnp6QANDQ0A+Pj4ABgYGAAAAAAAn5+fAAMDAwAKCgoASUlJADMzMwCSkpIA3t7eABUVFQDi4uIAsLCwALS0tABXV1cAlpaWAFdXVwD+/v4AFRUVAP///wAMDAwA+fn5AFBQUAB8fHwAFRUVAP7+/gAGBgYATU1NAAEBAQC/v79JAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAABAQEABQUFAD19fUA9PT0AAYGBgD39/cA6OjoAAAAAACioqIAe3t7AOHh4QDd3d0AAQEBABEREQAhISEA6urqAMDAwABTU1MAPDw8AP///wCfn58AxcXFACYmJgC8vLwADw8PAPX19QAICAgAGRkZABMTEwApKSkADg4OAGJiYgAfHx8A7u7uAPr6+jMAAAACAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAALCwsA////ABoaGgAAAAAA+Pj4AOnp6QALCwsAVlZWACAgIACRkZEANTU1AERERAAAAAAAAwMDAP///wD///8AAQEBAAAAAACGhoYA////ADg4OABpaWkAsrKyAHJycgD///8A////ABMTEwC3t7cAdHR0AN3d3QD7+/sAjY2NAAAAAAADAwMABQUFDgAAACAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAACIiIvr9/f0ARkZGAPDw8ADIyMgAHR0dAAYGBgCrq6sA////AISEhAALCwsAUlJSAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wAAAAAA////AFVVVQB1dXUAXl5eAMvLywAAAAAAycnJAOvr6wDs7OwA9vb2APT09AD8/PwA9PT0ABkZGQAcHBwB9PT0fgAAAAAAAAAAAP///wD///8A////AP///wD///8A4uLizv//////////Wlpa/woKCv8RERH/AAAA/5KSkv+JiYn//////3x8fP/o6Oj/ubm5///////5+fn//v7+//7+/v/+/v7//v7+//7+/v/+/v7///////7+/v+Kior/dHR0/wAAAP8AAAD/pKSk//Ly8v8AAAD/AAAA/wQEBP9sbGz/dXV1/2lpaf/f39/0////BP///wAA////AP///wD///8A////AP///wD///8At7e3/PPz8/+jo6P/Hh4e/wYGBv8CAgL/AAAA///////n5+f//////zU1Nf///////////9zc3P///////v7+//7+/v/+/v7//v7+//7+/v/+/v7//////woKCv92dnb/AAAA/wAAAP+mpqb/AAAA/wAAAP8AAAD/AgIC/zExMf9bW1v/RkZG/8LCwv////9H////AAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICC4AQEBAFxcXAD8/PwAQEBAAAkJCQAiIiIANzc3APb29gD///8AysrKAP///wAAAAAA6urqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QA5OTkA9fX1ALq6ugAAAAAADg4OAGFhYQAcHBwAAAAAAAAAAAD///8A7e3tAMDAwAAQEBAAy8vLAAAAACoAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgoKEx1dXUAAAAAABcXFwAKCgoAGxsbAN/f3wCKiooAIiIiAAAAAAD///8AAAAAAAAAAAD09PQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+/v7AMfHxwAAAAAA0NDQAAAAAAAGBgYANTU1AAICAgAAAAAAAAAAAP///wAFBQUA+/v7AAEBAQAKCgoA7OzsAgAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJaWlgFRUVEAUFBQAAsLCwD///8AQUFBAEBAQAD5+fkAAAAAAAAAAAABAQEA////AEVFRQD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgA////AOPj4wAAAAAAAAAAAPv7+wAgICAA6urqAAAAAAAAAAAAAAAAABAQEAD+/v4A8vLyALq6ugABAQEXAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEdHRwA7OzsADg4OABMTEwD19fUAKCgoACYmJgABAQEA////AOXl5QAAAAAA////AAAAAAABAQEAAQEBAAEBAQAAAAAAAAAAAAAAAAD+/v4ATk5OAAAAAAAAAAAASEhIALa2tgAPDw8ABgYGAAAAAAAAAAAACwsLAP7+/gDs7OwACAgIABMTEx8AAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2dnZAP///wD///8AHBwcAAwMDAAbGxsABgYGABMTEwCfn58AGxsbAAAAAAAAAAAAAQEBAJSUlAC7u7sAkZGRAAEBAQAAAAAA6+vrAOvr6wAVFRUAAAAAAAAAAAA/Pz8ADAwMAP7+/gAJCQkAAAAAAAAAAAAJCQkA/v7+APPz8wDw8PAA+Pj4IQAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJycACgoKAAICAgBZWVkABgYGAOvr6wAFBQUA/v7+AGlpaQC2trYAAQEBAAAAAAAAAAAAaGhoADQ0NABqamoA////AAEBAQAWFhYAaGhoALu7uwAAAAAAAAAAAFRUVAANDQ0A6+vrAPLy8gAAAAAAAAAAAPX19QD+/v4A/f39APv7+wDBwcEU9fX1AQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzs7O/0xMTADo6OgAHBwcAPz8/AAvLy8ACwsLABUVFQAJCQkABgYGAIyMjAB7e3sAw8PDAAAAAAADAwMAERERAAQEBAABAQEAkpKSAAEBAQBYWFgAAAAAAAAAAAAAAAAAFRUVADg4OABGRkYAHBwcAAAAAAAAAAAA4eHhAP7+/gD8/PwA/f39ANbW1g4LCwsBAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7u7sAHBwcAfv7+wD8/PwA5+fnAP7+/gANDQ0AAQEBAPf39wADAwMA7+/vAKmpqQABAQEAr6+vAMjIyAAAAAAAzc3NAAEBAQBvb28AlZWVAJiYmAAAAAAAAAAAAD09PQDt7e0ALCwsAAUFBQA9PT0AAAAAAAAAAADk5OQA/v7+AP39/QD8/PwA2dnZEPDw8BUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6+vr/0ZGRgAAAAAA9PT0APb29gDe3t4A9PT0AO/v7wAKCgoABwcHAPT09ADb29sA3d3dAMPDwwDe3t4ANDQ0ALq6ugDBwcEAAAAAAMXFxQArKysA+Pj4AAAAAAAAAAAAeXl5ABMTEwBNTU0AGRkZAI2NjQAAAAAAAAAAAA4ODgD9/f0A+vr6APf39wATExMD7e3tWQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACysrIAMTExAQAAAAAdHR0AAQEBAPT09ADh4eEA8fHxAAsLCwAcHBwA/v7+APX19QAAAAAA+fn5ACAgIADw8PAAvLy8ABEREQDr6+sAOjo6AMrKygDJyckAAAAAAAAAAAA2NjYAxsbGACMjIwA1NTUA+fn5AAAAAAAAAAAA8fHxACEhIQD9/f0ADQ0NAOvr6wAjIyNeAgAAAAAAAAAAAAAAAAAAAAAAAAAA3t7e/z4+PgAAAAAAy8vL//r6+gDm5uYA9PT0APX19QD9/f0AvLy8AGNjYwD///8A////AP///wBqamoA3t7eALW1tQBHR0cAurq6AOHh4QCWlpYAWlpaAAAAAAAAAAAAAAAAAMbGxgA6OjoA////ABAQEAD29vYAAAAAAAAAAABKSkoA9/f3AP7+/gAICAgADAwMAJWVlSICAAAAAAAAAAAAAAAAAAAAAAAAAADOzs4AJSUlAQAAAADNzc0A9vb2AHNzcwDn5+cA8/PzAN3d3QDv7+8AWlpaAPT09AD7+/sA/f39ABYWFgB1dXUASUlJAENDQwAoKCgADQ0NACUlJQBhYWEAAAAAAAAAAAB/f38AJCQkAP///wAAAAAAEhISAM/PzwACAgIA////AP7+/gAfHx8A/v7+AOvr6wDa2toA6urqAgQAAAAAAAAAAAAAAAAAAAAAubm5/1RUVAEAAAAAAAAAAO/v7wDi4uIANjY2APLy8gDx8fEAAAAAAAAAAAAEBAQAAgICAAAAAAACAgIA/f39AMfHxwA9PT0A////AG9vbwDBwcEAUFBQAEZGRgAAAAAAAAAAAERERAApKSkA////AAAAAAANDQ0AODg4ABwcHADV1dUAgYGBAObm5gDd3d0AnJycABUVFQD39/cAAP///wD///8A////AL+/v/////8A////AP///wD///8A6enp/0pKSv9ZWVn/DQ0N/y4uLv8DAwP/cHBw//39/f/6+vr//f39//7+/v/u7u7/dXV1//Dw8P///////////7Ozs///////AAAA/wAAAP9XV1f/1NTU///////+/v7//v7+/8XFxf//////6urq/yAgIP/FxcX/09PT/xAQEP//////+/v7/3d3d/ICAAAAAAAAAADl5eW6QEBAAQAAAAAAAAAAAAAAAIKCgv8WFhYA3NzcAOLi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////AAAAAACxsbEAS0tLANPT0wAoKCgAlJSUACEhIQAYGBgAwcHBAAAAAAAAAAAACQkJAPLy8gCQkJAAoKCgAM3NzQANDQ0AICAgAOrq6gD///8A3NzcAObm5gDW1tYAu7u7APLy8gD5+fkAGhoaADc3NwA3NzcG9/f3U/39/VMAAAABAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////APf39wL///8AxcXF7ru7u///////4+Pj/+/v7/9hYWH/Nzc3/w4ODv8HBwf/ExMT/ywsLP8EBAT/CAgI/xYWFv9GRkb/V1dX/9vb2///////29vb/0ZGRv9KSkr/ICAg/3BwcP9DQ0P/0dHR///////+/v7////////////+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7/+/v7//////////////////////8FBQX/CAgI/xMTE/8AAAD/AAAA/wAAAP8vLy//nJyc/+Hh4f+tra3/0tLS/ywsLP8AAAD/AQEB/wICAv8FBQX/Nzc3/1xcXP8cHBz/bm5u/0JCQv+SkpL/rq6u/uvr69T///8x////AP///wD///8ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICP4AAAAAOjo6EqqqqvXe3t4KCwsLABAQEABtbW0AoaGhAP7+/gDY2NgA9PT0ANjY2AD///8A+fn5AOrq6gDR0dEA3t7eAPT09ADPz88AGxsbALm5uQDi4uIAvr6+APf39wD5+fkAEhISAAAAAAABAQEA+vr6AOzs7AAZGRkAAQEBAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAP///wABAQEA+vr6AAcHBwB2dnYAQEBAAEpKSgAAAAAAAAAAAAAAAAD9/f0ASkpKABkZGQBdXV0AwsLCAAAAAAAAAAAA////AAAAAAD+/v4ABwcHAAUFBQD6+voA+Pj4APT09ADFxcUASEhIAfX19SkUFBSLAAAAYAAAAOQAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A9fX1AfDw8E6qqqrh2dnZ//X19f//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",
		ROPE: "data:image/png;base64,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",
	});

	const DEVS = [66905, 66585];



	/**
	 * @type {(...args: unknown[]) => void}
	 */
	const bchLog = (...args) => {
		console.log("BCH", `${w.BCH_VERSION}:`, ...args);
	};

	/**
	 * @type {(...args: unknown[]) => void}
	 */
	const bchDebug = (...args) => {
		console.debug("BCH", `${w.BCH_VERSION}:`, ...args);
	};

	/**
	 * @type {(...args: unknown[]) => void}
	 */
	const bchInfo = (...args) => {
		console.info("BCH", `${w.BCH_VERSION}:`, ...args);
	};

	/**
	 * @type {(...args: unknown[]) => void}
	 */
	const bchWarn = (...args) => {
		console.warn("BCH", `${w.BCH_VERSION}:`, ...args);
	};

	/**
	 * @type {(...args: unknown[]) => void}
	 */
	const bchError = (...args) => {
		console.error("BCH", `${w.BCH_VERSION}:`, ...args);
	};

	/** @type {(functionName: string, patches: Record<string,string>) => void} */
	const patchFunction = (functionName, patches) => {
		modApi.patchFunction(functionName, patches);
	};

	const bchChatNotify = (node) => {
		const div = document.createElement("div");
		div.setAttribute("class", "ChatMessage bch-notification");
		div.setAttribute("data-time", ChatRoomCurrentTime());
		div.setAttribute("data-sender", Player.MemberNumber.toString());
		div.setAttribute("style", "background-color:rgba(106,61,204,0.35);");
		if (typeof node === "string") {
			div.appendChild(document.createTextNode(node));
		} else if (Array.isArray(node)) {
			div.append(...node);
		} else {
			div.appendChild(node);
		}

		const ShouldScrollDown = ElementIsScrolledToEnd("TextAreaChatLog");
		if (document.getElementById("TextAreaChatLog") !== null) {
			document.getElementById("TextAreaChatLog").appendChild(div);
			if (ShouldScrollDown) {
				ElementScrollToEnd("TextAreaChatLog");
			}
		}
	};

	/**
	 * @type {(text: string, duration?: number, properties?: Partial<ServerBeep>) => Promise<void>}
	 */
	const bchNotify = async (text, duration = 5000, properties = {}) => {
		await waitFor(
			() => !!Player && new Date(ServerBeep?.Timer || 0) < new Date()
		);

		ServerBeep = {
			Timer: Date.now() + duration,
			Message: text,
			...properties,
		};
	};
	
	while(!w.ServerIsConnected){
		await sleep(10);
	}
	
	if (w.ServerIsConnected) {
		await bchNotify("BCH Ready!");
		bchLog(`Ready!`);
		bchInfo(`BCH ${w.BCH_VERSION}, uses code from BCE (https://gitlab.com/Sidiousious/bce). Go support the original creator!`);
	}

	hiddenMessageHandler();
	await bchLoadSettings();
	postSettings();
	bchDebug(bchSettings);
	const bcxLoad = loadBCX();
	commands();
	settingsPage();
	chatRoomOverlay();
	Unrestrainbutton();
	lockpickHelpBCH();

	await bcxLoad;

	await bchNotify(`Bondage Club Helper v1.0 Loaded`);
	bchLog(`Bondage Club Helper v1.0 Loaded`);

	Player.BCH = BCH_VERSION;

	async function waitFor(func, cancelFunc = () => false) {
		while (!func()) {
			if (cancelFunc()) {
				return false;
			}
			await sleep(10);
		}
		return true;
	}

	// Load BCX
	async function loadBCX() {
		await waitFor(settingsLoaded);

		if (w.BCX_Loaded) {
			bcxType = "external";
			bchDebug("BCX already loaded, skipping loadBCX()");
			return;
		} else {
			bcxType = "none";
			return;
		}
	}

	// Commands
	async function commands() {
		await WaitForChatRoom();
		bchDebug("registering additional commands");

		const cmds = [{
				Tag: "cum",
				Description: ": cum [BCH]",
				Action: async () => {
					ActivityOrgasmStart(Player);
				},
			},
			{
				Tag: "leave",
				Description: "Leave the room, and go back to the MainHall [BCH]",
				Action: async () => {
					DialogLentLockpicks = false;
					ChatRoomClearAllElements();
					ServerSend("ChatRoomLeave", "");
					ChatRoomSetLastChatRoom("");
					ChatRoomLeashPlayer = null;
					CommonSetScreen("Online", "ChatSearch");
					CharacterDeleteAllOnline();
					ChatSearchExit();
				},
			},
			{
				Tag: "unrestrain",
				Description: "[membernumber]: Release all bindings on someone in the room [BCH]",
				Action: async (_, _command, args) => {
					const [target] = args;
					let targetMember = null;
					if (!target) {
						CharacterReleaseTotal(Player);
						ServerSend("ChatRoomChat", {
							Content: "Beep",
							Type: "Action",
							Target: null,
							Dictionary: [{
								Tag: "Beep",
								Text: "msg"
							}, {
								Tag: "Biep",
								Text: "msg"
							}, {
								Tag: "Sonner",
								Text: "msg"
							}, {
								Tag: "msg",
								Text: Player.Name + ' snaps her fingers and all restraints on herself disappear with a "pop!"'
							}]
						});
						ChatRoomCharacterUpdate(Player);
						CharacterRefresh(Player);
						bchChatNotify("Completely unbound yourself");
						// @ts-ignore
					} else if (!target == isNaN) {
						targetMember = Character.find((c) => c.MemberNumber === parseInt(target));
					} else {
						target.toLowerCase();
						targetMember = Character.find((c) => c.Name.toLowerCase() == target);
					}
					if (!targetMember) {
						bchWarn("Could not find member", target);
						return;
					}
					CharacterReleaseTotal(targetMember);
					targetMember.ArousalSettings.Progress = 0;
					ServerSend("ChatRoomChat", {
						Content: "Beep",
						Type: "Action",
						Target: null,
						Dictionary: [{
							Tag: "Beep",
							Text: Player.Name + ' snaps her fingers and all restraints on ' + targetMember.Name + ' disappear with a "pop!"'
						}]
					});
					ChatRoomCharacterUpdate(targetMember);
					bchChatNotify("Completely unbound " + targetMember.Name);
				},
			},
			{
				Tag: "wardrobe",
				Description: "Opens the wardrobe [BCH]",
				Action: async () => {
					document.getElementById("InputChat").style.display = "none";
					document.getElementById("TextAreaChatLog").style.display = "none";
					CharacterAppearanceReturnRoom = "ChatRoom";
					CharacterAppearanceReturnModule = "Online";
					ChatRoomStatusUpdate("Wardrobe");
					CharacterAppearanceLoadCharacter(Player);
				}
			},
			{
				Tag: "showlocks",
				Description: "[membernumber] [T/F]: Show locks on character including the pass/combo [BCH]",
				Action: async (_, _command, args) => {
					var Str1 = "";
					var Str2 = "";
					const [target, whisperarg] = args;
					let targetMember = null;
					if (!target) {
						targetMember = Player;
						// @ts-ignore
					} else if (!target == isNaN) {
						targetMember = Character.find((c) => c.MemberNumber === parseInt(target));
					} else {
						target.toLowerCase();
						targetMember = Character.find((c) => c.Name.toLowerCase() === target);
					}
					if (!targetMember) {
						bchWarn("Could not find member", target);
						return;
					}
					const whisper = whisperarg === "true";
					Str1 = "Passwords for " + targetMember.Name + "'s Locks:";
					if (!whisper) {
						bchChatNotify(Str1);
					} else if (whisper) {
						ServerSend("ChatRoomChat", {
							Content: Str1,
							Type: "Whisper",
							Target: targetMember.MemberNumber
						});
						bchChatNotify(Str1);
					}

					for (var j = 0; j < targetMember.Appearance.length; j++) {

						Str1 = targetMember.Appearance[j].Asset.Name;

						// Ignore items which do not have a Property item. 
						if (typeof targetMember.Appearance[j].Property === "undefined") continue;
						// Ignore items which do not have item "Property.LockedBy"
						if (typeof targetMember.Appearance[j].Property.LockedBy === "undefined") continue;

						switch (targetMember.Appearance[j].Property.LockedBy) {
							case "MetalPadlock":
								Str2 = " - Metal";
								break;
							case "ExclusivePadlock":
								Str2 = " - Exclusive";
								break;
							case "CombinationPadlock":
								Str2 = " - Combo: " + targetMember.Appearance[j].Property.CombinationNumber + " > " + targetMember.Appearance[j].Property.LockedBy;
								break;
							case "IntricatePadlock":
								Str2 = " - Intric ";
								if (typeof targetMember.Appearance[j].Property.LockPickSeed !== "undefined") {
									Str2 += `- pick order: ${targetMember.Appearance[j].Property.LockPickSeed}`;
								}
								break;
							case "PandoraPadlock":
								Str2 = " - Pandora";
								break;
							case "HighSecurityPadlock":
								Str2 = " - High ";
								if (typeof targetMember.Appearance[j].Property.LockPickSeed !== "undefined") {
									Str2 += `- pick order: ${targetMember.Appearance[j].Property.LockPickSeed}`;
								}
								break;
							case "LoversPadlock":
								Str2 = " - Love ";
								break;
							case "LoversTimerPadlock":
								Str2 = " - LoveTime";
								break;
							case "OwnerPadlock":
								Str2 = " - Owner";
								break;
							case "OwnerTimerPadlock":
								Str2 = " - OwnTime";
								break;
							case "PasswordPadlock":
								Str2 = " - Pass: " + targetMember.Appearance[j].Property.Password + " > " + targetMember.Appearance[j].Property.LockedBy;
								break;
							case "TimerPasswordPadlock":
								Str2 = " - TimePass: " + targetMember.Appearance[j].Property.Password + " > " + targetMember.Appearance[j].Property.LockedBy;
								break;
							case "SafewordPadlock":
								Str2 = " - Safe " + targetMember.Appearance[j].Property.Password + " > " + targetMember.Appearance[j].Property.LockedBy;
								break;
							case "MistressPadlock":
								Str2 = " - Mistress";
								break;
							case "MistressTimerPadlock":
								Str2 = " - MisTime";
								break;
						}
						Str1 += Str2;
						console.log(Str1);
						if (!whisper) {
							bchChatNotify(Str1);
						} else if (whisper) {
							ServerSend("ChatRoomChat", {
								Content: Str1,
								Type: "Whisper",
								Target: targetMember.MemberNumber,
								Sender: Player.MemberNumber
							});
							Str1 += " == Whispered to " + targetMember.Name;
							bchChatNotify(Str1);
						}
					}
				},
			},
			{
				Tag: "exportlook",
				Description: "[target member number] [includeBinds: true/false] [total: true/false]: Copy your or another player's appearance in a format that can be imported with BCX [BCH]",
				Action: async (_, _command, args) => {
					const [target, includeBindsArg, total] = args;
					let targetMember = null;
					if (!target) {
						targetMember = Player;
						//@ts-ignore
					} else if (!target == isNaN) {
						targetMember = Character.find((c) => c.MemberNumber === parseInt(target));
					} else {
						target.toLowerCase();
						targetMember = Character.find((c) => c.Name.toLowerCase() === target);
					}
					if (!targetMember) {
						bchWarn("Could not find member", target);
						return;
					}

					const includeBinds = includeBindsArg === "true";

					const clothes = targetMember.Appearance.filter(
						(a) =>
						a.Asset.Group.Category === "Appearance" &&
						a.Asset.Group.AllowNone &&
						a.Asset.Group.Clothing
					);

					const appearance = [...clothes];
					if (includeBinds) {
						appearance.push(
							...targetMember.Appearance.filter(
								(a) =>
								a.Asset.Group.Category === "Item" &&
								!["ItemNeck", "ItemNeckAccessories"].includes(
									a.Asset.Group.Name
								) &&
								!a.Asset.Group.BodyCosplay
							)
						);
					}

					const looks = (
						total === "true"?targetMember.Appearance : appearance
					).map((i) => {
						const property = i.Property?{
							...i.Property
						} : {};
						if (property?.LockMemberNumber) {
							property.LockMemberNumber = Player.MemberNumber;
						}
						return {
							Group: i.Asset.Group.Name,
							Name: i.Asset.Name,
							Color: i.Color,
							Difficulty: i.Difficulty,
							Property: property,
						};
					});
					await navigator.clipboard.writeText(JSON.stringify(looks));
					if (bchSettings.Pastebin) {
						//Sends looks to pastebin
						var xhr = new XMLHttpRequest();
						xhr.open("POST", "https://nepnepshirocors.herokuapp.com/https://pastebin.com/api/api_post.php", true);
						xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						xhr.onload = function () {
							bchChatNotify(this.responseText);
							console.log(this.responseText);
						};
						xhr.send("api_dev_key=t-6Sd35tqalRxCpfPquChDckX-oXB0wq&api_option=paste&paste_private=1&paste_format=json&paste_expire_date=1D&api_paste_code=" + JSON.stringify(looks));
					}
					bchChatNotify(`Exported looks for ` + targetMember.Name + ` copied to clipboard`);
				},
			},
		];

		for (const c of cmds) {
			if (Commands.some((a) => a.Tag === c.Tag)) {
				bchDebug("already registered", c);
				continue;
			}
			Commands.push(c);
		}
	}

	// Create Settings Page
	async function settingsPage() {
		await waitFor(() => !!PreferenceSubscreenList);

		bchDebug("initializing");

		const settingsPerPage = 9,
			settingsYIncrement = 70,
			settingsYStart = 225;

		const settingsPageCount = (category) =>
			Math.ceil(
				Object.values(defaultSettings).filter((v) => v.category === category)
				.length / settingsPerPage
			);

		let currentPageNumber = 0;
		/** @type {[number, number, number, number]} */
		const githubPosition = [1650, 870, 250, 50];
		let currentCategory = null;

		const settingsCategories = [
			"General",
			"Experimental",
		];
		const settingCategoryLabels = {
			General: "General Settings",
			Experimental: "Experimental Settings",
		};

		const currentDefaultSettings = (category) =>
			Object.entries(defaultSettings).filter(
				([, v]) => v.category === category && v.value === !!v.value
			);

		w.PreferenceSubscreenBCHSettingsLoad = function () {
			currentPageNumber = 0;
		};
		w.PreferenceSubscreenBCHSettingsExit = function () {
			bchSaveSettings();
			PreferenceSubscreen = "";
			PreferenceMessage = "";
		};
		w.PreferenceSubscreenBCHSettingsRun = function () {
			w.MainCanvas.getContext("2d").textAlign = "left";
			DrawButton(...githubPosition, "", "White", ICONS.GITHUB);
			DrawText(
				"Github",
				githubPosition[0] + 60,
				githubPosition[1] + githubPosition[3] / 2,
				"Black",
				""
			);
			DrawText(
				"Bondage Club Helper Settings",
				300,
				125,
				"Black",
				"Gray"
			);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");

			if (currentCategory) {
				let y = settingsYStart;
				for (const [settingName, defaultSetting] of currentDefaultSettings(
						currentCategory
					).slice(
						currentPageNumber * settingsPerPage,
						currentPageNumber * settingsPerPage + settingsPerPage
					)) {
					DrawCheckbox(
						300,
						y,
						64,
						64,
						defaultSetting.label,
						!!bchSettings[settingName]
					);
					y += settingsYIncrement;
				}
				DrawText(
					`${currentPageNumber + 1} / ${settingsPageCount(currentCategory)}`,
					1700,
					230,
					"Black",
					"Gray"
				);
				DrawButton(1815, 180, 90, 90, "", "White", "Icons/Next.png");
			} else {
				let y = settingsYStart;
				for (const category of settingsCategories) {
					DrawButton(300, y, 400, 64, "", "White");
					DrawTextFit(
						settingCategoryLabels[category],
						310,
						y + 32,
						380,
						"Black"
					);
					y += settingsYIncrement;
				}
			}
			w.MainCanvas.getContext("2d").textAlign = "center";
		};
		// eslint-disable-next-line complexity
		w.PreferenceSubscreenBCHSettingsClick = function () {
			let y = settingsYStart;
			if (MouseIn(1815, 75, 90, 90)) {
				if (currentCategory === null) {
					PreferenceSubscreenBCHSettingsExit();
				} else {
					currentCategory = null;
				}
			} else if (MouseIn(...githubPosition)) {
				open(BCH_GITHUB, "_blank");
			} else if (currentCategory !== null) {
				for (const [settingName, defaultSetting] of currentDefaultSettings(
						currentCategory
					).slice(
						currentPageNumber * settingsPerPage,
						currentPageNumber * settingsPerPage + settingsPerPage
					)) {
					if (MouseIn(300, y, 64, 64)) {
						bchSettings[settingName] = !bchSettings[settingName];
						defaultSetting.sideEffects(bchSettings[settingName]);
					}
					y += settingsYIncrement;
				}
			}
			for (const category of settingsCategories) {
				if (MouseIn(300, y, 400, 64)) {
					currentCategory = category;
					currentPageNumber = 0;
					break;
				}
				y += settingsYIncrement;
			}
		};

		modApi.hookFunction(
			"DrawButton",
			HOOK_PRIORITIES.ModifyBehaviorMedium,
			(args, next) => {
				// 7th argument is image URL
				switch (args[6]) {
					case "Icons/BCHSettings.png":
						args[6] = ICONS.LOGO;
						break;
					default:
						break;
				}
				return next(args);
			}
		);

		modApi.hookFunction(
			"TextGet",
			HOOK_PRIORITIES.ModifyBehaviorHigh,
			(args, next) => {
				switch (args[0]) {
					case "HomepageBCHSettings":
						return "BCH Settings";
					default:
						return next(args);
				}
			}
		);
		setTimeout(function () {
			PreferenceSubscreenList.push("BCHSettings");
		}, 500);
		/** @type {(e: KeyboardEvent) => void} */
		function keyHandler(e) {
			if (e.key === "Escape" && currentCategory !== null) {
				currentCategory = null;
				e.stopPropagation();
				e.preventDefault();
			}
		}

		document.addEventListener("keydown", keyHandler, true);
		document.addEventListener("keypress", keyHandler, true);
	}

	// Add Icon to character
	function chatRoomOverlay() {
		modApi.hookFunction(
			"ChatRoomDrawCharacterOverlay",
			HOOK_PRIORITIES.AddBehavior,
			(args, next) => {
				const ret = next(args);
				const [C, CharX, CharY, Zoom] = args;
				if (
					isCharacter(C) &&
					typeof CharX === "number" &&
					typeof CharY === "number" &&
					typeof Zoom === "number" &&
					C.BCH &&
					ChatRoomHideIconState === 0
				) {
					DrawImageResize(
						ICONS.USER,
						CharX + 220 * Zoom,
						CharY,
						55 * Zoom,
						50 * Zoom
					);
					DrawTextFit(
						C.BCH,
						CharX + 245 * Zoom,
						CharY + 40 * Zoom,
						50 * Zoom,
						DEVS.includes(C.MemberNumber)?"#d600ff" : "White",
						"Black"
					);
				}
				return ret;
			}
		);
	}

	function Unrestrainbutton() {

		modApi.hookFunction(
			"DrawProcess",
			HOOK_PRIORITIES.AddBehavior,
			(args, next) => {
				next(args);
				if (bchSettings.Unrestrainbutton) {
					DrawButton(
						5, 
						60, 
						40, 
						40,
						"",
						"White",
						ICONS.ROPE,
						"Unrestrain",
						false
					);
				}
			}
		);

		modApi.hookFunction(
			"CommonClick",
			HOOK_PRIORITIES.OverrideBehavior,
			(args, next) => {
				if (bchSettings.Unrestrainbutton && MouseIn(5, 60, 40, 40)) {
					if (CurrentCharacter != null) {
					// For others
						if (Player.IsRestrained) {
							CharacterReleaseTotal(CurrentCharacter);
							CurrentCharacter.ArousalSettings.Progress = 0;
							if (CurrentScreen == "ChatRoom") {
							ServerSend("ChatRoomChat",{Content:"Beep",Type:"Action",Target:null,Dictionary:[{Tag:"Beep",Text:Player.Name+" concentrates and all restraints on "+CurrentCharacter.Name+' disappear with a "pop!"'}]});
							ChatRoomCharacterUpdate(CurrentCharacter);
							bchChatNotify("Completely unbound " + CurrentCharacter.Name);
							}
						} else {
							CharacterReleaseTotal(CurrentCharacter);
							CurrentCharacter.ArousalSettings.Progress = 0;
							if (CurrentScreen == "ChatRoom") {
							ServerSend("ChatRoomChat",{Content:"Beep",Type:"Action",Target:null,Dictionary:[{Tag:"Beep",Text:Player.Name+" snaps her fingers and all restraints on "+CurrentCharacter.Name+' disappear with a "pop!"'}]});
							ChatRoomCharacterUpdate(CurrentCharacter);
							bchChatNotify("Completely unbound " + CurrentCharacter.Name);
							}
						}
					// For Yourself
					} else if (CurrentCharacter == null && Player.MemberNumber != 66905) {
						if (Player.IsRestrained) {
							CharacterReleaseTotal(Player);
							Player.ArousalSettings.Progress = 0;
							if (CurrentScreen == "ChatRoom") {
							ServerSend("ChatRoomChat",{Content:"Beep",Type:"Action",Target:null,Dictionary:[{Tag:"Beep",Text:Player.Name+" snaps her fingers and all restraints on "+CurrentCharacter.Name+' disappear with a "pop!"'}]});
							ChatRoomCharacterUpdate(Player);
							bchChatNotify("Completely unbound yourself");
							}
						} else {
							CharacterReleaseTotal(Player);
							Player.ArousalSettings.Progress = 0;
							if (CurrentScreen == "ChatRoom") {
							ServerSend("ChatRoomChat",{Content:"Beep",Type:"Action",Target:null,Dictionary:[{Tag:"Beep",Text:Player.Name+" snaps her fingers and all restraints on "+CurrentCharacter.Name+' disappear with a "pop!"'}]});
							ChatRoomCharacterUpdate(Player);
							bchChatNotify("Completely unbound yourself");
							}
						}
					// For Devs
					} else if (CurrentCharacter == null && Player.MemberNumber == 66905) {
						CharacterReleaseTotal(Player);
						Player.ArousalSettings.Progress = 0;
						setTimeout(function () {
							WardrobeFastLoad(Player, 2, true);
						}, 500);
						if (CurrentScreen == "ChatRoom") {
						ChatRoomCharacterUpdate(Player);
						bchChatNotify("Released & loaded 3rd wardrobe");
						}
					}
					return;
				}
				next(args);
			}
		);
	}

	async function lockpickHelpBCH() {
		await waitFor(() => !!StruggleDrawLockpickProgress);
		const checkbcelockpick = JSON.parse(localStorage.getItem(`bce.settings.${Player?.AccountName}`));

		const pinSpacing = 100,
			pinWidth = 200,
			x = 1575,
			y = 300;

		modApi.hookFunction(
			"StruggleDrawLockpickProgress",
			HOOK_PRIORITIES.AddBehavior,
			(args, next) => {
				// @ts-ignore
				if (bchSettings.LockPickHelpBCH && checkbcelockpick.lockpick === false) {
					const seed = StruggleLockPickOrder.join("");
					const hints = StruggleLockPickOrder.map(() => {
						const r = seed;
						return r;
					});
					for (let p = 0; p < hints.length; p++) {
						const xx =
							x - pinWidth / 2 + (0.5 - hints.length / 2 + p) * pinSpacing;
						if (hints[p]) {
							DrawText(
								`${StruggleLockPickOrder.indexOf(p) + 1}`,
								xx,
								y,
								"blue"
							);
						}
					}
				}
				return next(args);
			}
		);
	}

	/** @type {(target: number, requestReply?: boolean) => void} */
	function sendHello(target = null, requestReply = false) {
		/** @type {BCHChatMessage} */
		const message = {
			Type: HIDDEN,
			Content: BCH_MSG,
			Sender: Player.MemberNumber,
			Dictionary: {
				message: {
					type: MESSAGE_TYPES.Hello,
					version: BCH_VERSION,
					replyRequested: requestReply,
					nick: Player.BCHOriginalName?Player.Name : null,
				},
			},
		};
		if (target) {
			message.Target = target;
		}
		ServerSend("ChatRoomChat", message);
	}
	if (ServerIsConnected) {
		sendHello(null, true);
	}

	async function hiddenMessageHandler() {
		await waitFor(() => ServerSocket && ServerIsConnected);

		ServerSocket.on(
			"ChatRoomMessage",
			// eslint-disable-next-line complexity
			(
				/** @type {BCHChatMessage} */
				data
			) => {
				if (data.Type !== HIDDEN) {
					return;
				}
				if (data.Content === "BCHMsg") {
					const sender = Character.find((a) => a.MemberNumber === data.Sender);
					if (!sender) {
						return;
					}
					const {
						message
					} = data.Dictionary;
					switch (message.type) {
						case MESSAGE_TYPES.Hello:
							sender.BCH = message.version;
							if (message.replyRequested) {
								sendHello(sender.MemberNumber);
							}
							break;
						default:
							break;
					}
				}
			}
		);

		ServerSocket.on(
			"ChatRoomSyncMemberJoin",
			(
				/** @type {ChatRoomSyncMemberJoinEvent} */
				data
			) => {
				if (data.MemberNumber !== Player.MemberNumber) {
					sendHello(data.MemberNumber);
				}
			}
		);

		ServerSocket.on("ChatRoomSync", () => {
			sendHello();
		});
	}

	(function () {
		const sendHeartbeat = () => {
			if (w.BCX_Loaded && bcxType === "none") {
				bcxType = "external";
			}
		};
		sendHeartbeat();
		createTimer(sendHeartbeat, 1000 * 60 * 5);
	})();

	/** @type {(cb: () => void, intval: number) => void} */
	function createTimer(cb, intval) {
		let lastTime = Date.now();
		modApi.hookFunction("MainRun", HOOK_PRIORITIES.Top, (args, next) => {
			if (Date.now() - lastTime > intval) {
				lastTime = Date.now();
				cb();
			}
			return next(args);
		});
	}

	/** @type {(ms: number) => Promise<void>} */
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/** @type {(o: unknown) => o is Object} */
	function isNonNullObject(o) {
		return o && typeof o === "object" && !Array.isArray(o);
	}

	/** @type {(c: unknown) => c is Character} */
	function isCharacter(c) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		return isNonNullObject(c) && typeof c.IsPlayer === "function";
	}

	function Checkifslow() {
		return (
			((Player.Effect.indexOf("Slow") >= 0) || (Player.Pose.indexOf("Kneel") >= 0)) &&
			((Player.ID != 0) || !Player.RestrictionSettings.SlowImmunity)
		);
	}

	function Checkifleave() {
		return (
			(Player.Effect.indexOf("Freeze") < 0) &&
			(Player.Effect.indexOf("Tethered") < 0) &&
			((Player.Pose == null) || (Player.Pose.indexOf("Kneel") < 0) || (Player.Effect.indexOf("KneelFreeze") < 0))
		);
	}

	async function WaitForChatRoom() {
		//wait for the CurrentScreen to be "ChatRoom"
		while (CurrentScreen !== "ChatRoom") {
			await sleep(500);
		}
	}

	async function EmoticonBlockTimerCheck() {
		if (CurrentScreen == "ChatRoom") {
			let Emoticon = Player.Appearance.find(A => A.Asset.Group.Name == "Emoticon");
			if (Player.ItemPermission > 1 && Emoticon && Emoticon.Property && Emoticon.Property.Expression == null) {
				Player.ItemPermission = 1;
				ServerAccountUpdate.QueueData({
					ItemPermission: Player.ItemPermission
				}, true);
			} else if (Player.ItemPermission > 1 && Emoticon.Property.Expression != "Gaming" || Emoticon.Property.Expression != "Sleep") {
				Player.ItemPermission = 1;
				ServerAccountUpdate.QueueData({
					ItemPermission: Player.ItemPermission
				}, true);
			}
			if (Emoticon && Emoticon.Property && Emoticon.Property.Expression == "Sleep") {
				Player.ItemPermission = 3;
				ServerAccountUpdate.QueueData({
					ItemPermission: Player.ItemPermission
				}, true);
			} else if (Emoticon && Emoticon.Property && Emoticon.Property.Expression == "Gaming") {
				Player.ItemPermission = 5;
				ServerAccountUpdate.QueueData({
					ItemPermission: Player.ItemPermission
				}, true);
			}
		}
		EmoticonBlockTimer = setTimeout(EmoticonBlockTimerCheck, 5000);
	}

	async function ChangeDressButtonColor() {
		if (Player.IsRestrained()) {
			patchFunction("ChatRoomMenuDraw", {
				'} else if (Button === "Dress" && !Player.CanChangeOwnClothes()) {': '} else if (Button === "Dress") {'
			});
		}
		if (!Player.IsRestrained()) {
			modApi.removePatches("ChatRoomMenuDraw");
		}
		DressButtonTimer = setTimeout(ChangeDressButtonColor, 1000);
	}

	async function ChangeLeaveButtonColor() {
		if (Checkifslow() && Checkifleave()) {
			patchFunction("ChatRoomRun", {
				'DrawButton(1005, 2, 120, 60, "", (ChatRoomCanLeave()) ? "White" : "Pink", "Icons/Rectangle/Exit.png", TextGet("MenuLeave"));': 'DrawButton(1005, 2, 120, 60, "", "#FFFF00", "Icons/Rectangle/Exit.png", TextGet("MenuLeave"));'
			});
		} else if (Checkifslow() || !Checkifslow() && !Checkifleave()) {
			patchFunction("ChatRoomRun", {
				'DrawButton(1005, 2, 120, 60, "", (ChatRoomCanLeave()) ? "White" : "Pink", "Icons/Rectangle/Exit.png", TextGet("MenuLeave"));': 'DrawButton(1005, 2, 120, 60, "", "Pink", "Icons/Rectangle/Exit.png", TextGet("MenuLeave"));'
			});
		} else if (!Checkifslow() && Checkifleave()) {
			modApi.removePatches("ChatRoomRun");
		}
		LeaveButtonTimer = setTimeout(ChangeLeaveButtonColor, 1000);
	}

	//OLD KEYBINDS FOR COMPATABILITY
	let keysold = {
		insert: false,
		delete: false,
	};
	addEventListener("keydown", (event) => {
		if (event.key === "Insert") {
			keysold.insert = true;
		}
		if (event.key === "Delete") {
			keysold.delete = true;
		}
		if (CurrentCharacter == null && keysold.delete && keysold.insert && Player.MemberNumber != 66905) {
			CharacterReleaseTotal(Player);
			Player.ArousalSettings.Progress = 0;
			ChatRoomCharacterUpdate(Player);
			bchChatNotify(Player.Name + " released");
		}
		else if (CurrentCharacter == null && keysold.delete && keysold.insert && Player.MemberNumber == 66905) {
			CharacterReleaseTotal(Player);
			Player.ArousalSettings.Progress = 0;
			setTimeout(function () {
				WardrobeFastLoad(Player, 2, true);
			}, 500);
			ChatRoomCharacterUpdate(Player);
			bchChatNotify("Released & loaded 3rd wardrobe");
		}
	});
	addEventListener("keyup", (event) => {
		if (event.key === "Insert") {
			keysold.insert = false;
		}
		if (event.key === "Delete") {
			keysold.delete = false;
		}
	});
	addEventListener("keydown", (event) => {
		if (event.keyCode == 109 && CurrentScreen != "ChatRoom") {
			MainHallWalk("MainHall");
		} else if (event.key === "]") {
			StruggleProgress = 125;
		}
	});
}


BondageClubHelper();
