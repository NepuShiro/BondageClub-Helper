//     _______ _    _ _____  _____  __          __      _____   _   _  ____ _______   __  __          _____  ______   ______     __  __  __ ______ 
//    |__   __| |  | |_   _|/ ____| \ \        / /\    / ____| | \ | |/ __ \__   __| |  \/  |   /\   |  __ \|  ____| |  _ \ \   / / |  \/  |  ____|
// 	 | |  | |__| | | | | (___    \ \  /\  / /  \  | (___   |  \| | |  | | | |    | \  / |  /  \  | |  | | |__    | |_) \ \_/ /  | \  / | |__   
// 	 | |  |  __  | | |  \___ \    \ \/  \/ / /\ \  \___ \  | . ` | |  | | | |    | |\/| | / /\ \ | |  | |  __|   |  _ < \   /   | |\/| |  __|  
// 	 | |  | |  | |_| |_ ____) |    \  /\  / ____ \ ____) | | |\  | |__| | | |    | |  | |/ ____ \| |__| | |____  | |_) | | |    | |  | | |____ 
// 	 |_|  |_|  |_|_____|_____/      \/  \/_/    \_\_____/  |_| \_|\____/  |_|    |_|  |_/_/    \_\_____/|______| |____/  |_|    |_|  |_|______|

// ==UserScript==
// @name         BCHCMD
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  BondageClub-HelperCMD
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

	commands();

    function displayText(original, replacements = {}) {
		/** @type {Readonly<Record<string, Record<string, string>>>} */
		const translations = Object.freeze({
			CN: {
				"Automatic Arousal Expressions (Replaces Vanilla)":
					"自动欲望表情 (替换原版)",
				"Activity Expressions": "活动表示",
				"Alternate Arousal (Replaces Vanilla, requires hybrid/locked arousal meter)":
					"另一种欲望 (替换原版, 需要混合或锁定欲望条)",
				"Alternative speech stutter": "另一种言语不清",
				"Enable layering menus": "开启服装分层选项",
				"Extended wardrobe slots (96)": "扩展衣柜保存槽 (96个)",
				"Replace wardrobe list with character previews":
					"使用角色预览替换衣柜保存列表",
				"Clear Drawing Cache Hourly": "每小时清除绘图缓存",
				"Instant messenger (BcUtil compatible)": "即时通讯 (与BcUtil 兼容)",
				"Chat Links and Embeds": "聊天链接和嵌入",
				"Use Ctrl+Enter to OOC": "使用Ctrl+Enter进行OOC发言",
				"Use italics for input when whispering": "悄悄话使用斜体字",
				"Improve colors for readability": "改善颜色以提高可读性",
				"Show friend presence notifications": "显示好友在线通知",
				"Show friends going offline too (requires friend presence)":
					"显示朋友离线通知 (需要启用好友在线通知)",
				"Understand All Gagged and when Deafened":
					"在被堵住嘴和被堵住耳朵时可以听懂所有发言",
				"Reveal Lockpicking Order Based on Skill": "根据技能显示撬锁/开锁顺序",
				"Allow layering menus while bound": "允许在捆绑时用分层菜单",
				"Load BCX by Jomshir98 (requires refresh - no auto-update)":
					"加载 BCX by Jomshir98 (需要刷新 - 无自动更新)",
				"Load BCX beta (requires refresh - auto-updates, compatibility not guaranteed)":
					"加载 BCX beta 测试版 (需要刷新 - 自动升级, 不保证兼容性)",
				"Limited gag anti-cheat: cloth-gag equivalent garbling":
					"有限的堵嘴反作弊: 和布堵嘴相同的乱码",
				"Full gag anti-cheat: use equipped gags to determine garbling":
					"完整的堵嘴反作弊: 使用当前装备的堵嘴来确定乱码",
				"Extra gag anti-cheat: even more garbling for the most extreme gags":
					"扩展的堵嘴反作弊: 对于使用最极端的堵嘴更加混乱",
				"Require glasses to see": "需要眼镜才能看清",
				"Check for updates": "检查更新",
				"Automatic Relogin on Disconnect": "断线后自动重连",
				"Show gag cheat and anti-cheat options in chat":
					"在聊天室里显示堵嘴作弊和反作弊选项",
				"Automatically ghost+blocklist unnaturally new users":
					"自动对不自然的用户无视并添加黑名单",
				"Use accurate timer inputs": "使用准确的计时器输入",
				"Confirm leaving the game": "离开游戏前需要确认",
				"Discreet mode (disable drawing)": "谨慎模式 (禁用绘图)",
				"Keep tab active (requires refresh)":
					"保持标签页处于活动状态 (需要刷新)",
				"Show FPS counter": "显示 FPS 计数器",
				"Limit FPS in background": "在后台时限制FPS",
				"Limit FPS to ~15": "限制 FPS 最高为 ~15",
				"Limit FPS to ~30": "限制 FPS 最高为 ~30",
				"Limit FPS to ~60": "限制 FPS 最高为 ~60",
				"Make automatic progress while struggling": "在挣扎时自动增加进度",
				"Allow leashing without wearing a leashable item (requires leasher to have BCE too)":
					"允许在不佩戴牵引绳的情况下也可以进行牵引（需要牵引者也安装有BCE）",
				"Enable buttplug.io (requires refresh)":
					"启用buttplug.io（需要刷新网页)",
				"This page allows configuration of the synchronization of bluetooth connected toys.":
					"此页面允许配置将BC震动器状态同步到蓝牙连接的玩具",
				"Chat & Social": "聊天 & 社交",
				"Activities & Arousal": "活动 & 欲望",
				"Appearance & Wardrobe": "外观 & 衣柜",
				"Immersion & Anti-Cheat": "沉浸体验 & 反作弊",
				Performance: "表现",
				Misc: "杂项",
				Cheats: "作弊",
				"Other Addons": "其他插件",
				"Show nicknames": "修改你的昵称",
				"Change your nickname": "修改你的昵称",
			},
		});

		let text =
			TranslationLanguage in translations &&
			original in translations[TranslationLanguage]
				? translations[TranslationLanguage][original]
				: original;
		for (const [key, val] of Object.entries(replacements)) {
			while (text.includes(key)) {
				text = text.replace(key, val);
			}
		}
		return text;
	}

    async function commands() {
        /** @type {Command[]} */
        const cmds = [
            {
                Tag: "cum",
                Description: displayText("cum"),
                Action: async () => {
                    ActivityOrgasmStart(Player)
                },
            }
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
    
        for (const c of cmds) {
            if (Commands.some((a) => a.Tag === c.Tag)) {
                bceLog("already registered", c);
                continue;
            }
            Commands.push(c);
        }
    }

    
}

BondageClubHelper();
