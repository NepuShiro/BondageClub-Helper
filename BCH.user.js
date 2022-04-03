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
// @grant        none
// ==/UserScript==

/**
 *  THIS SCRIPT USES CODE FROM https://gitlab.com/Sidiousious/bch/ IT IS NOT MY CODE. IT IS LICENSED UDNER GPLv3
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
var bcModSdk=function(){"use strict";const o="1.0.2";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const a=new Map,i=new Set;function d(o){i.has(o)||(i.add(o),console.warn(o))}function c(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||d(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}function s(o){const e=[],t=new Map,n=new Set;for(const r of u.values()){const a=r.patching.get(o.name);if(a){e.push(...a.hooks);for(const[e,i]of a.patches.entries())t.has(e)&&t.get(e)!==i&&d(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${i}`),t.set(e,i),n.add(r.name)}}return e.sort(((o,e)=>e.priority-o.priority)),{hooks:e,patches:t,patchesSources:n,final:c(o.original,t)}}function l(o,e=!1){let r=a.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const i=o.split(".");for(let t=0;t<i.length-1;t++)if(e=e[i[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${i.slice(0,t+1).join(".")} is not object`);const d=e[i[i.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${o} to be patched not found`);const c=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:o,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l)}),a.set(o,r),e[i[i.length-1]]=function(o){return function(...e){const t=o.precomputed,n=t.hooks,r=t.final;let a=0;const i=d=>{var c,s,l,f;if(a<n.length){const e=n[a];a++;const t=null===(s=(c=w.errorReporterHooks).hookEnter)||void 0===s?void 0:s.call(c,o.name,e.mod),r=e.hook(d,i);return null==t||t(),r}{const n=null===(f=(l=w.errorReporterHooks).hookChainExit)||void 0===f?void 0:f.call(l,o.name,t.patchesSources),a=r.apply(this,e);return null==n||n(),a}};return i(e)}}(r)}return r}function f(){const o=new Set;for(const e of u.values())for(const t of e.patching.keys())o.add(t);for(const e of a.keys())o.add(e);for(const e of o)l(e,!0)}function p(){const o=new Map;for(const[e,t]of a)o.set(e,{name:e,originalHash:t.originalHash,hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const u=new Map;function h(o){u.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),u.delete(o.name),o.loaded=!1}function g(o,t,r){"string"==typeof o&&o||e("Failed to register mod: Expected non-empty name string, got "+typeof o),"string"!=typeof t&&e(`Failed to register mod '${o}': Expected version string, got ${typeof t}`),r=!0===r;const a=u.get(o);a&&(a.allowReplace&&r||e(`Refusing to load mod '${o}': it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),h(a));const i=t=>{"string"==typeof t&&t||e(`Mod '${o}' failed to patch a function: Expected function name string, got ${typeof t}`);let n=c.patching.get(t);return n||(n={hooks:[],patches:new Map},c.patching.set(t,n)),n},d={unload:()=>h(c),hookFunction:(t,n,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);"number"!=typeof n&&e(`Mod '${o}' failed to hook function '${t}': Expected priority number, got ${typeof n}`),"function"!=typeof r&&e(`Mod '${o}' failed to hook function '${t}': Expected hook function, got ${typeof r}`);const d={mod:c.name,priority:n,hook:r};return a.hooks.push(d),f(),()=>{const o=a.hooks.indexOf(d);o>=0&&(a.hooks.splice(o,1),f())}},patchFunction:(t,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);n(r)||e(`Mod '${o}' failed to patch function '${t}': Expected patches object, got ${typeof r}`);for(const[n,i]of Object.entries(r))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod '${o}' failed to patch function '${t}': Invalid format of patch '${n}'`);f()},removePatches:o=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);i(o).patches.clear(),f()},callOriginal:(t,n,r)=>(c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`),"string"==typeof t&&t||e(`Mod '${o}' failed to call a function: Expected function name string, got ${typeof t}`),Array.isArray(n)||e(`Mod '${o}' failed to call a function: Expected args array, got ${typeof n}`),function(o,e,t=window){return l(o).original.apply(t,e)}(t,n,r)),getOriginalHash:t=>("string"==typeof t&&t||e(`Mod '${o}' failed to get hash: Expected function name string, got ${typeof t}`),l(t).originalHash)},c={name:o,version:t,allowReplace:r,api:d,loaded:!0,patching:new Map};return u.set(o,c),Object.freeze(d)}function m(){const o=[];for(const e of u.values())o.push({name:e.name,version:e.version});return o}let w;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:m,getPatchingInfo:p,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return w=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.0.2' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.0.2' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

async function BondageClubHelper() {
    "use strict";

    const modApi = bcModSdk.registerMod('BondageClubHelper', '1.0');
    const SUPPORTED_GAME_VERSIONS = ["R78"];
    const w = window;

    if (typeof ChatRoomCharacter === "undefined") {
		console.warn("Bondage Club not detected. Skipping BCH initialization.");
		return;
	}

    const patchFunction = (functionName, patches, affectedFunctionality) => {
		// Guard against patching a function that has been modified by another addon not using the shared SDK on supported versions.
		if (
			SUPPORTED_GAME_VERSIONS.includes(GameVersion)
		) {

			skippedFunctionality.push(affectedFunctionality);
			return;
		}
		modApi.patchFunction(functionName, patches);
	};

	const bchLog = (...args) => {
		console.log("BCH:", ...args);
	};

	async function waitFor(func, cancelFunc = () => false) {
		while (!func()) {
			if (cancelFunc()) {
				return false;
			}
			// eslint-disable-next-line no-await-in-loop
			await sleep(10);
		}
		return true;
	}

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

	commands();

	await bchNotify(`Bondage Club Helper v1.0 Loaded`);
	bchLog("Bondage Club Helper v1.0 Loaded");

    async function commands() {
		await waitFor(() => !!Commands);
		bchLog("registering additional commands");

        /** @type {Command[]} */
        const cmds = [
            {
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
					/** @type {Character} */
					let targetMember = null;
					if (!target) {
						CharacterReleaseTotal(Player)
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
						bchChatNotify("Comepletely unbinded yourself");
					} else if(!target == NaN) {
						targetMember = Character.find((c) => c.MemberNumber === parseInt(target));
					} else {
						target.toLowerCase();
						targetMember = Character.find((c) => c.Name.toLowerCase() == target);
					}
					if (!targetMember) {
						bchLog("Could not find member", target);
						return;
					}
					CharacterReleaseTotal(targetMember)
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
					bchChatNotify("Comepletely unbinded " + targetMember.Name);
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
					} else if(!target == NaN) {
						targetMember = Character.find((c) => c.MemberNumber === parseInt(target));
					} else {
						target.toLowerCase();
						targetMember = Character.find((c) => c.Name.toLowerCase() === target);
					}
					if (!targetMember) {
						bchLog("Could not find member", target);
						return;
					}
					const whisper = whisperarg === "true";
					Str1 = "Passwords for " + targetMember.Name + "'s Locks:";
					if (!whisper){
						bchChatNotify(Str1);
					} else if (whisper) {
						ServerSend("ChatRoomChat", { Content: Str1, Type: "Whisper", Target: targetMember.MemberNumber })
						bchChatNotify(Str1);
					};

					for (var j=0; j<targetMember.Appearance.length; j++) {

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
								break;
							case "HighSecurityPadlock":
								Str2 = " - High ";
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
						};
						Str1 += Str2
						console.log(Str1);
						if (!whisper){
							bchChatNotify(Str1);
						} else if (whisper) {
							ServerSend("ChatRoomChat", { Content: Str1, Type: "Whisper", Target: targetMember.MemberNumber, Sender: Player.MemberNumber })
							Str1 += " == Whispered to " + targetMember.Name;
							bchChatNotify(Str1);
						};
					};
				},
			},
        ];
    
        // Skip history patch for /w
        patchFunction(
            "ChatRoomSendChat",
            {
                "ChatRoomSendChat()": `ChatRoomSendChat(skipHistory)`,
                "ChatRoomLastMessage.push(msg);": `if (!skipHistory) ChatRoomLastMessage.push(msg);`,
            },
            "Whispers sent via /w will trigger items such as the automated shock collar and futuristic training belt."
        );
    
        // Patch to allow /importlooks to exceed 1000 characters
        w.InputChat?.removeAttribute("maxlength");
        patchFunction(
            "ChatRoomCreateElement",
            {
                'document.getElementById("InputChat").setAttribute("maxLength", 1000);':
                    "",
            },
            "You may be unable to /importlooks due to the chat input being limited in length."
        );
		setTimeout(function(){
			for (const c of cmds) {
				if (Commands.some((a) => a.Tag === c.Tag)) {
					bchLog("already registered", c);
					continue;
				}
				Commands.push(c);
			}
		}, 5000)
    }


	function sleep(ms) {
		// eslint-disable-next-line no-promise-executor-return
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	//OLD KEYBINDS FOR COMPATABILITY
	let keys = {
		insert: false,
		delete: false,
	};
	  addEventListener("keydown", (event) => {
	  	if (event.key === "Insert") {
	  		keys.insert = true;
	  	}
	  	if (event.key === "Delete") {
	  		keys.delete = true;
	  	}
	  	if (CurrentCharacter == null && keys.delete && keys.insert) {
	  		CharacterReleaseTotal(Player)
	  	}
	  });
	  addEventListener("keyup", (event) => {
		if (event.key === "Insert") {
		  keys.insert = false;
		}
		if (event.key === "Delete") {
		  keys.delete = false;
		}
	  });
	addEventListener("keydown", (event) => {
		if (event.keyCode == 109) {
		   if (CurrentScreen == "ChatRoom") {
			 DialogLentLockpicks = false;
			 ChatRoomClearAllElements();
			 ServerSend("ChatRoomLeave", "");
			 ChatRoomSetLastChatRoom("");
			 ChatRoomLeashPlayer = null;
			 CommonSetScreen("Online", "ChatSearch");
			 CharacterDeleteAllOnline();
			 ChatSearchExit();
		   } else
			 MainHallWalk("MainHall");
		 } else if (event.key === "]") {
		   StruggleProgress = 125;
		 }
	   })
}

BondageClubHelper();
