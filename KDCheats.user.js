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

(function() {

var bcModSdk=function(){"use strict";const o="1.0.2";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const a=new Map,i=new Set;function d(o){i.has(o)||(i.add(o),console.warn(o))}function c(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||d(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}function s(o){const e=[],t=new Map,n=new Set;for(const r of u.values()){const a=r.patching.get(o.name);if(a){e.push(...a.hooks);for(const[e,i]of a.patches.entries())t.has(e)&&t.get(e)!==i&&d(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${i}`),t.set(e,i),n.add(r.name)}}return e.sort(((o,e)=>e.priority-o.priority)),{hooks:e,patches:t,patchesSources:n,final:c(o.original,t)}}function l(o,e=!1){let r=a.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const i=o.split(".");for(let t=0;t<i.length-1;t++)if(e=e[i[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${i.slice(0,t+1).join(".")} is not object`);const d=e[i[i.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${o} to be patched not found`);const c=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:o,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l)}),a.set(o,r),e[i[i.length-1]]=function(o){return function(...e){const t=o.precomputed,n=t.hooks,r=t.final;let a=0;const i=d=>{var c,s,l,f;if(a<n.length){const e=n[a];a++;const t=null===(s=(c=w.errorReporterHooks).hookEnter)||void 0===s?void 0:s.call(c,o.name,e.mod),r=e.hook(d,i);return null==t||t(),r}{const n=null===(f=(l=w.errorReporterHooks).hookChainExit)||void 0===f?void 0:f.call(l,o.name,t.patchesSources),a=r.apply(this,e);return null==n||n(),a}};return i(e)}}(r)}return r}function f(){const o=new Set;for(const e of u.values())for(const t of e.patching.keys())o.add(t);for(const e of a.keys())o.add(e);for(const e of o)l(e,!0)}function p(){const o=new Map;for(const[e,t]of a)o.set(e,{name:e,originalHash:t.originalHash,hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const u=new Map;function h(o){u.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),u.delete(o.name),o.loaded=!1}function g(o,t,r){"string"==typeof o&&o||e("Failed to register mod: Expected non-empty name string, got "+typeof o),"string"!=typeof t&&e(`Failed to register mod '${o}': Expected version string, got ${typeof t}`),r=!0===r;const a=u.get(o);a&&(a.allowReplace&&r||e(`Refusing to load mod '${o}': it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),h(a));const i=t=>{"string"==typeof t&&t||e(`Mod '${o}' failed to patch a function: Expected function name string, got ${typeof t}`);let n=c.patching.get(t);return n||(n={hooks:[],patches:new Map},c.patching.set(t,n)),n},d={unload:()=>h(c),hookFunction:(t,n,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);"number"!=typeof n&&e(`Mod '${o}' failed to hook function '${t}': Expected priority number, got ${typeof n}`),"function"!=typeof r&&e(`Mod '${o}' failed to hook function '${t}': Expected hook function, got ${typeof r}`);const d={mod:c.name,priority:n,hook:r};return a.hooks.push(d),f(),()=>{const o=a.hooks.indexOf(d);o>=0&&(a.hooks.splice(o,1),f())}},patchFunction:(t,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);n(r)||e(`Mod '${o}' failed to patch function '${t}': Expected patches object, got ${typeof r}`);for(const[n,i]of Object.entries(r))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod '${o}' failed to patch function '${t}': Invalid format of patch '${n}'`);f()},removePatches:o=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);i(o).patches.clear(),f()},callOriginal:(t,n,r)=>(c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`),"string"==typeof t&&t||e(`Mod '${o}' failed to call a function: Expected function name string, got ${typeof t}`),Array.isArray(n)||e(`Mod '${o}' failed to call a function: Expected args array, got ${typeof n}`),function(o,e,t=window){return l(o).original.apply(t,e)}(t,n,r)),getOriginalHash:t=>("string"==typeof t&&t||e(`Mod '${o}' failed to get hash: Expected function name string, got ${typeof t}`),l(t).originalHash)},c={name:o,version:t,allowReplace:r,api:d,loaded:!0,patching:new Map};return u.set(o,c),Object.freeze(d)}function m(){const o=[];for(const e of u.values())o.push({name:e.name,version:e.version});return o}let w;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:m,getPatchingInfo:p,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return w=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.0.2' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.0.2' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
const modApi = bcModSdk.registerMod('BondageClubHelper', BCH_VERSION);

const HOOK_PRIORITIES = {
	Top: 11,
	OverrideBehaviour: 10,
	ModifyBehaviourHigh: 6,
	ModifyBehaviourMedium: 5,
	ModifyBehaviourLow: 4,
	AddBehaviour: 3,
	Observe: 0,
};

window.addEventListener('load', function () {
    console.log("Loaded KDCheats.");
});

function fpsCounter() {
    let lastFrame = -1;

    /** @type {(ms: number) => number} */
    const expectedFrameTime = (ms) => (1000 / ms) | 0;

    modApi.hookFunction(
        "MainRun",
        HOOK_PRIORITIES.Observe,
        (args, next) => {
            const [time] = args;
            if (lastFrame >= 0) {
                let ftl = 0;
                if (lastFrame + expectedFrameTime(ftl) > time) {
                    requestAnimationFrame(MainRun);
                    return;
                }
            }
            const frameTime = time - lastFrame;
            lastFrame = time;
            next(args);{
            DrawTextFit(
                (Math.round(10000 / frameTime) / 10).toString(),
                15,
                12,
                30,
                "white",
                "black"
            );
            }
        }
    );
}

fpsCounter()

setTimeout(function(){
    for (let prop in KinkyDungeonStatsPresets) {
        KinkyDungeonStatsPresets[prop].cost = 0
    }
} , 5000);

addEventListener("keydown", (event) => {
if(event.key === "f"){
    KinkyDungeonStatMana = 100;
    KinkyDungeonStatDistraction = 0;
}
else if(event.key === "v"){
    KinkyDungeonStatStamina = 100;
    KinkyDungeonStatDistraction = 0;
}
else if(event.key === "t"){
    KinkyDungeonGold = 9999999;
    KinkyDungeonLockpicks = 999;
    KinkyDungeonRedKeys = 999;
    KinkyDungeonGreenKeys = 999;
    KinkyDungeonBlueKeys = 999;
    KinkyDungeonNormalBlades = 999;
    KinkyDungeonEnchantedBlades = 999;
}
else if(event.key === "y"){
    KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollArms, 999);
    KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollLegs, 999);
    KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollVerbal, 999);
}
else if(event.key === "u"){
    KinkyDungeonSpellLevel = {
        "Elements": 5,
        "Conjure": 5,
        "Illusion": 5,
    };
    KinkyDungeonSpellPoints = 999;
    KinkyDungeonSpells = [{"name":"Knife","sfx":"Miss","hitsfx":"LightSwing","school":"Elements","manacost":0,"components":["Arms"],"noMiscast":true,"knifecost":1,"staminacost":1,"level":1,"type":"bolt","projectileTargeting":true,"onhit":"","power":2.5,"delay":0,"range":50,"evadeable":true,"damage":"pierce","speed":2,"playerEffect":{"name":"Damage"},"events":[{"type":"DropKnife","trigger":"bulletHit"}]},{"name":"Analyze","sfx":"MagicSlash","school":"Illusion","manacost":5,"components":[],"level":1,"type":"special","special":"analyze","noMiscast":true,"onhit":"","time":25,"power":0,"range":1.5,"size":1,"damage":""},{"name":"Incinerate","noise":3,"sfx":"FireSpell","school":"Elements","manacost":10,"components":["Verbal"],"level":2,"type":"inert","onhit":"aoe","delay":1,"power":2.5,"range":2.5,"size":3,"aoe":1.5,"lifetime":6,"damage":"fire","playerEffect":{"name":"Damage"}},{"name":"SummonUp1","school":"Any","manacost":0,"components":[],"level":2,"passive":true,"type":"","onhit":"","time":0,"delay":0,"range":0,"lifetime":0,"power":0,"damage":"inert"},{"name":"SpellChoiceUp1","school":"Any","manacost":0,"components":[],"spellPointCost":1,"level":4,"passive":true,"type":"","onhit":"","time":0,"delay":0,"range":0,"lifetime":0,"power":0,"damage":"inert"},{"name":"Sleet","noise":8,"sfx":"FireSpell","school":"Elements","manacost":14,"components":["Verbal"],"level":3,"type":"inert","onhit":"aoe","delay":1,"power":2,"range":4.5,"size":5,"aoe":2.9,"lifetime":10,"time":2,"damage":"frost"},{"name":"SummonUp2","school":"Any","manacost":0,"components":[],"level":3,"passive":true,"type":"","onhit":"","time":0,"delay":0,"range":0,"lifetime":0,"power":0,"damage":"inert"},{"name":"SpellChoiceUp2","school":"Any","manacost":0,"components":[],"spellPointCost":1,"level":5,"passive":true,"type":"","onhit":"","time":0,"delay":0,"range":0,"lifetime":0,"power":0,"damage":"inert"},{"name":"Firebolt","sfx":"FireSpell","school":"Elements","manacost":3,"components":["Arms"],"level":1,"type":"bolt","projectileTargeting":true,"onhit":"","power":4.5,"delay":0,"range":50,"damage":"fire","speed":2,"playerEffect":{"name":"Damage"}},{"name":"Bomb","noise":5,"sfx":"FireSpell","school":"Conjure","manacost":5,"components":["Verbal"],"level":2,"type":"inert","onhit":"aoe","time":3,"delay":5,"power":10,"range":3,"size":3,"aoe":1.5,"lifetime":1,"damage":"fire","playerEffect":{"name":"Damage"},"channel":1},{"name":"Dagger","sfx":"MagicSlash","school":"Illusion","manacost":2,"components":["Arms"],"level":1,"type":"bolt","projectileTargeting":true,"noDoubleHit":true,"piercing":true,"onhit":"","power":2.5,"time":0,"delay":0,"range":6,"damage":"cold","speed":4,"playerEffect":{"name":"Damage"}},{"name":"Fireball","noise":3,"sfx":"FireSpell","school":"Elements","manacost":8,"components":["Arms"],"level":3,"type":"bolt","projectileTargeting":true,"onhit":"aoe","power":6,"delay":0,"range":50,"aoe":1.5,"size":3,"lifetime":1,"damage":"fire","speed":1,"playerEffect":{"name":"Damage"}},{"name":"Snare","sfx":"FireSpell","school":"Conjure","manacost":2,"components":["Legs"],"noTargetEnemies":true,"level":1,"type":"inert","onhit":"lingering","lifetime":9999,"time":8,"bind":20,"delay":5,"range":1,"damage":"stun","playerEffect":{"name":"MagicRope","time":3}},{"name":"Flash","noise":8,"sfx":"FireSpell","school":"Illusion","manacost":4,"components":["Verbal"],"level":1,"type":"inert","onhit":"aoe","time":4,"delay":1,"power":1,"range":2.5,"size":3,"aoe":1.5,"lifetime":1,"damage":"stun","playerEffect":{"name":"Blind","time":4}},{"name":"Icebolt","sfx":"MagicSlash","hitsfx":"Freeze","school":"Elements","manacost":5,"components":["Arms"],"level":1,"type":"bolt","projectileTargeting":true,"onhit":"","time":6,"power":3,"delay":0,"range":50,"damage":"ice","speed":3,"playerEffect":{"name":"Damage"}},{"name":"SummonGag","sfx":"MagicSlash","school":"Conjure","manacost":6,"components":["Arms"],"level":2,"projectileTargeting":true,"castRange":50,"type":"bolt","onhit":"summon","summon":[{"name":"PlayerGag","count":3,"time":12,"strict":true,"goToTarget":true}],"power":0,"damage":"tickle","time":12,"delay":1,"range":0.5,"size":3,"aoe":2.5,"lifetime":1,"speed":1,"playerEffect":{}},{"name":"Ring","noise":10,"sfx":"MagicSlash","school":"Illusion","manacost":1,"components":["Arms"],"level":2,"type":"inert","onhit":"aoe","time":2,"delay":1,"power":1,"range":7,"size":3,"aoe":1.5,"lifetime":1,"damage":"stun"},{"name":"Icicles","noise":3,"sfx":"MagicSlash","school":"Elements","manacost":6,"components":["Arms"],"projectileTargeting":true,"noTargetPlayer":true,"CastInWalls":true,"level":2,"type":"inert","onhit":"aoe","time":5,"delay":3,"power":3,"range":8,"meleeOrigin":true,"size":1,"lifetime":1,"damage":"inert","noMiscast":false,"castDuringDelay":true,"noCastOnHit":true,"spellcast":{"spell":"Icicle","target":"target","directional":true,"offset":false},"channel":3},{"name":"RopeStrike","sfx":"MagicSlash","school":"Conjure","manacost":6,"components":["Verbal"],"level":1,"type":"inert","onhit":"aoe","delay":1,"power":5,"bind":9,"range":3.5,"size":3,"aoe":1.5,"lifetime":1,"damage":"chain","playerEffect":{"name":"MagicRope","time":4}},{"name":"GreaterFlash","noise":10,"sfx":"FireSpell","school":"Illusion","manacost":6,"components":["Verbal"],"level":2,"type":"inert","onhit":"aoe","time":8,"delay":1,"power":1,"range":2.5,"size":5,"aoe":2.5,"lifetime":1,"damage":"stun","playerEffect":{"name":"Blind","time":5}},{"name":"BoulderLaunch","sfx":"FireSpell","school":"Elements","manacost":2,"components":["Legs"],"projectileTargeting":true,"noTargetPlayer":true,"CastInWalls":true,"level":2,"type":"inert","onhit":"aoe","time":4,"delay":1,"power":4,"range":8,"meleeOrigin":true,"size":1,"lifetime":1,"damage":"inert","spellcast":{"spell":"Boulder","target":"target","directional":true,"offset":false},"channel":1},{"name":"Slime","landsfx":"MagicSlash","school":"Conjure","manacost":8,"components":["Legs"],"level":1,"type":"inert","onhit":"lingering","time":4,"delay":1,"range":4,"size":3,"aoe":2,"lifetime":3,"power":4,"lifetimeHitBonus":20,"damage":"glue","playerEffect":{"name":"SlimeTrap","time":3}},{"name":"FocusedFlash","noise":10,"sfx":"FireSpell","school":"Illusion","manacost":9,"components":["Verbal"],"level":3,"type":"inert","onhit":"aoe","time":14,"delay":2,"power":1,"range":2.5,"size":3,"aoe":1.5,"lifetime":1,"damage":"stun","playerEffect":{"name":"Blind","time":12}},{"name":"Electrify","noise":6,"sfx":"FireSpell","landsfx":"Shock","school":"Elements","manacost":5,"components":["Verbal"],"level":1,"type":"inert","onhit":"aoe","power":8,"time":4,"delay":1,"range":4,"size":1,"aoe":0.75,"lifetime":1,"damage":"electric","playerEffect":{"name":"Shock","time":1}},{"name":"ChainBolt","sfx":"FireSpell","school":"Conjure","manacost":2,"components":["Arms"],"level":1,"type":"bolt","projectileTargeting":true,"onhit":"","time":8,"bind":10,"power":2,"delay":0,"range":50,"damage":"chain","speed":3,"playerEffect":{"name":"SingleChain","time":1}},{"name":"Shroud","sfx":"FireSpell","school":"Illusion","manacost":5,"components":["Verbal"],"level":1,"type":"inert","buffs":[{"id":"Shroud","type":"Evasion","power":7,"player":true,"enemies":true,"tags":["darkness"],"range":1.5},{"id":"Shroud2","type":"Sneak","power":3,"player":true,"duration":6,"enemies":false,"tags":["darkness"],"range":1.5}],"onhit":"","time":8,"aoe":1.5,"power":0,"delay":8,"range":4,"size":3,"damage":""},{"name":"Crackle","noise":6,"sfx":"Shock","school":"Elements","manacost":4,"components":["Arms"],"level":2,"type":"bolt","piercing":true,"projectileTargeting":true,"nonVolatile":true,"onhit":"","power":4.5,"delay":0,"time":1,"range":4,"speed":4,"size":1,"damage":"electric","trailPower":0,"trailLifetime":1.1,"trailTime":4,"trailDamage":"inert","trail":"lingering","trailChance":1,"playerEffect":{"name":"Shock","time":1}},{"name":"SlimeBall","noise":1,"sfx":"FireSpell","school":"Conjure","manacost":4,"components":["Arms"],"level":2,"type":"bolt","projectileTargeting":true,"onhit":"","time":3,"power":4,"delay":0,"range":50,"damage":"glue","speed":2,"trailPower":4,"trailLifetime":10,"trailTime":3,"trailDamage":"glue","trail":"lingering","trailChance":1,"playerEffect":{"name":"SlimeTrap","time":3}},{"name":"Invisibility","sfx":"MagicSlash","school":"Illusion","manacost":8,"components":["Verbal"],"mustTarget":true,"level":3,"type":"buff","buffs":[{"id":"Invisibility","type":"Sneak","duration":10,"power":10,"player":true,"enemies":true,"tags":["invisibility"]}],"onhit":"","time":10,"power":0,"range":2,"size":1,"damage":""},{"name":"Fissure","noise":7,"sfx":"FireSpell","school":"Elements","manacost":8,"components":["Legs"],"level":3,"type":"bolt","piercing":true,"projectileTargeting":true,"nonVolatile":true,"onhit":"","power":5.5,"delay":0,"range":4,"speed":4,"size":1,"damage":"fire","trailPower":1.5,"trailLifetime":6,"trailTime":4,"piercingTrail":true,"trailDamage":"fire","trail":"lingering","trailChance":1,"playerEffect":{"name":"DamageNoMsg","hitTag":"Fissure","time":1,"damage":"fire","power":3}},{"name":"Leap","sfx":"Teleport","school":"Conjure","manacost":8,"components":["Legs"],"noTargetDark":true,"noTargetEnemies":true,"level":3,"type":"hit","onhit":"teleport","delay":1,"lifetime":1,"range":3,"damage":""},{"name":"TrueSteel","sfx":"MagicSlash","school":"Illusion","manacost":2,"components":["Arms"],"noTargetPlayer":true,"mustTarget":true,"level":1,"type":"hit","onhit":"instant","evadeable":true,"time":1,"power":4,"range":1.5,"size":1,"lifetime":1,"aoe":0.5,"damage":"slash","events":[{"trigger":"beforeDamageEnemy","type":"MultiplyDamageStealth","power":2.5,"humanOnly":true}]},{"name":"Shield","sfx":"MagicSlash","school":"Elements","manacost":3,"components":["Arms"],"mustTarget":true,"level":1,"type":"buff","buffs":[{"id":"Shield","type":"DamageReduction","duration":50,"power":2.5,"player":false,"enemies":true,"maxCount":3,"tags":["defense","damageTaken"]},{"id":"Shield2","type":"DamageReduction","duration":50,"power":5,"player":true,"enemies":false,"maxCount":3,"tags":["defense","damageTaken"]}],"onhit":"","time":50,"power":0,"range":2,"size":1,"damage":""},{"name":"Blink","sfx":"Teleport","school":"Conjure","manacost":6,"components":["Verbal"],"noTargetEnemies":true,"level":2,"type":"inert","onhit":"teleport","delay":3,"lifetime":1,"range":5,"damage":""},{"name":"Camo","sfx":"MagicSlash","school":"Illusion","manacost":3,"components":["Legs"],"mustTarget":true,"noTargetEnemies":true,"level":2,"type":"buff","buffs":[{"id":"Camo","type":"SlowDetection","duration":50,"power":49,"player":true,"enemies":true,"endSleep":true,"maxCount":1,"tags":["SlowDetection","move","cast"]}],"onhit":"","time":50,"power":0,"range":2,"size":1,"damage":""},{"name":"GreaterShield","sfx":"MagicSlash","school":"Elements","manacost":1,"components":["Legs"],"noTargetEnemies":true,"noTargetPlayer":true,"level":2,"type":"inert","block":20,"onhit":"","power":0,"delay":5,"range":2,"size":1,"damage":""},{"name":"Wall","sfx":"MagicSlash","school":"Conjure","manacost":6,"components":["Legs"],"noTargetEnemies":true,"noTargetPlayer":true,"level":1,"type":"inert","onhit":"summon","summon":[{"name":"Wall","count":1,"time":10}],"power":0,"time":10,"delay":-1,"range":6,"size":1,"aoe":0,"lifetime":1,"damage":"fire"},{"name":"ShadowBlade","sfx":"MagicSlash","school":"Illusion","manacost":6,"components":["Arms"],"mustTarget":true,"level":2,"type":"buff","buffs":[{"id":"ShadowBlade","type":"AttackDmg","duration":50,"power":2,"player":true,"enemies":true,"maxCount":5,"tags":["attack","damage"]}],"onhit":"","time":50,"power":0,"range":2,"size":1,"damage":""},{"name":"IceBreath","sfx":"MagicSlash","hitsfx":"Freeze","school":"Elements","manacost":8,"components":["Verbal"],"level":2,"type":"inert","onhit":"lingering","time":1,"delay":1,"range":3,"size":3,"aoe":1.5,"lifetime":10,"power":5,"lifetimeHitBonus":5,"damage":"ice"},{"name":"Ally","sfx":"MagicSlash","school":"Conjure","manacost":8,"components":["Legs"],"noTargetEnemies":true,"level":1,"type":"inert","onhit":"summon","summon":[{"name":"Ally","count":1,"time":9999}],"power":0,"time":9999,"delay":-1,"range":2.9,"size":1,"aoe":0,"lifetime":1,"damage":"fire"},{"name":"ShadowSlash","sfx":"MagicSlash","school":"Illusion","manacost":3,"components":["Arms"],"level":2,"type":"bolt","projectileTargeting":true,"piercing":true,"noTerrainHit":true,"noEnemyCollision":true,"onhit":"aoe","power":4.5,"delay":0,"range":1.5,"aoe":1.5,"size":3,"lifetime":1,"damage":"cold","speed":1,"time":2,"trailspawnaoe":1.5,"trailPower":0,"trailLifetime":1.1,"trailHit":"","trailDamage":"inert","trail":"lingering","trailChance":0.4},{"name":"LightningBolt","noise":11,"sfx":"Shock","school":"Elements","manacost":9,"components":["Arms"],"level":3,"type":"bolt","piercing":true,"projectileTargeting":true,"nonVolatile":true,"onhit":"","power":8.5,"delay":0,"time":1,"range":50,"speed":50,"size":1,"damage":"electric","trailHit":"","trailPower":0,"trailLifetime":1.1,"trailTime":4,"trailDamage":"inert","trail":"lingering","trailChance":1,"playerEffect":{"name":"Shock","time":3}},{"name":"FireElemental","sfx":"MagicSlash","school":"Conjure","manacost":20,"components":["Verbal"],"noTargetEnemies":true,"level":2,"type":"inert","onhit":"summon","summon":[{"name":"FireElemental","count":1,"time":9999}],"power":0,"time":9999,"delay":-1,"range":3.5,"size":1,"aoe":0,"lifetime":1,"damage":"fire"},{"name":"Decoy","sfx":"MagicSlash","school":"Illusion","manacost":6,"components":["Legs"],"noTargetEnemies":true,"level":2,"type":"inert","onhit":"summon","summon":[{"name":"Decoy","count":1,"time":20}],"power":0,"time":20,"delay":-1,"range":4,"size":1,"aoe":0,"lifetime":1,"damage":"fire"},{"name":"StoneSkin","sfx":"Bones","school":"Elements","manacost":8,"components":["Arms"],"mustTarget":true,"level":1,"type":"buff","buffs":[{"id":"StoneSkin","type":"Armor","duration":40,"power":2,"player":true,"enemies":true,"tags":["defense","armor"]}],"onhit":"","time":30,"power":0,"range":2,"size":1,"damage":""},{"name":"Golem","sfx":"MagicSlash","school":"Conjure","manacost":24,"components":["Legs"],"noTargetEnemies":true,"level":3,"type":"inert","onhit":"summon","summon":[{"name":"Golem","count":1,"time":9999}],"power":0,"time":9999,"delay":-1,"range":2.5,"size":1,"aoe":0,"lifetime":1,"damage":"fire"},{"name":"ShadowWarrior","sfx":"MagicSlash","school":"Illusion","manacost":10,"components":["Verbal"],"noTargetEnemies":true,"level":2,"type":"inert","onhit":"summon","summon":[{"name":"ShadowWarrior","count":1,"time":12}],"power":6,"time":12,"delay":-1,"range":3.5,"size":1,"aoe":0,"lifetime":1,"damage":"inert"},{"name":"IronBlood","sfx":"FireSpell","school":"Elements","manacost":0,"components":["Verbal"],"mustTarget":true,"selfTargetOnly":true,"level":1,"type":"buff","channel":4,"buffs":[{"id":"IronBlood","aura":"#ff0000","type":"AttackStamina","duration":99999,"cancelOnReapply":true,"endSleep":true,"power":1,"player":true,"enemies":false,"tags":["attack","stamina"]},{"id":"IronBlood2","type":"ManaCostMult","duration":99999,"cancelOnReapply":true,"endSleep":true,"power":0.25,"player":true,"enemies":false,"tags":["manacost"]}],"onhit":"","time":30,"power":0,"range":2,"size":1,"damage":""},{"name":"StormCrystal","noise":7,"sfx":"MagicSlash","school":"Conjure","manacost":14,"components":["Legs"],"noTargetEnemies":true,"level":2,"type":"inert","onhit":"summon","summon":[{"name":"StormCrystal","count":1,"time":30}],"power":0,"time":30,"delay":-1,"range":2.5,"size":1,"aoe":0,"lifetime":1,"damage":"fire"},{"name":"Corona","noise":4,"sfx":"MagicSlash","school":"Illusion","manacost":7,"components":["Arms"],"projectileTargeting":true,"noTargetPlayer":true,"CastInWalls":true,"level":2,"type":"inert","onhit":"aoe","time":5,"delay":2,"power":12,"range":8,"meleeOrigin":true,"size":1,"lifetime":1,"damage":"inert","spellcast":{"spell":"CoronaBeam","target":"target","directional":true,"offset":false},"channel":2},{"name":"FlameBlade","sfx":"FireSpell","school":"Elements","manacost":3,"components":[],"level":1,"type":"passive","events":[{"type":"FlameBlade","trigger":"playerAttack"}]},{"name":"Heal","noise":3,"sfx":"FireSpell","school":"Conjure","manacost":4,"components":["Verbal"],"level":3,"type":"inert","onhit":"aoe","delay":1,"power":1.5,"range":4.5,"size":5,"aoe":2.9,"lifetime":4,"time":2,"damage":"heal","channel":4},{"name":"TrueSight","school":"Illusion","manacost":1,"defaultOff":true,"cancelAutoMove":true,"components":[],"level":1,"type":"passive","events":[{"type":"TrueSight","trigger":"vision"},{"type":"Blindness","trigger":"calcStats","power":-1}]},{"name":"Evasion","sfx":"MagicSlash","school":"Illusion","manacost":5,"components":["Legs"],"mustTarget":true,"level":1,"type":"buff","buffs":[{"id":"Evasion","type":"Evasion","duration":25,"power":3,"player":true,"enemies":true,"maxCount":5,"tags":["defense","incomingHit"]}],"onhit":"","time":25,"power":0,"range":2,"size":1,"damage":""},{"name":"EnemySense","school":"Illusion","manacost":4,"defaultOff":true,"cancelAutoMove":true,"costOnToggle":true,"components":[],"level":2,"type":"passive","events":[{"type":"EnemySense","trigger":"draw","dist":8,"distStealth":4}]},{"name":"FleetFooted","sfx":"FireSpell","school":"Illusion","manacost":0.5,"components":[],"level":2,"type":"passive","events":[{"type":"FleetFooted","trigger":"beforeMove","power":1},{"type":"FleetFooted","trigger":"afterMove"},{"type":"FleetFooted","trigger":"beforeTrap","chance":0.25}]},{"name":"Strength","sfx":"FireSpell","school":"Elements","manacost":1,"components":[],"level":1,"type":"passive","events":[{"type":"ElementalEffect","power":2,"damage":"crush","trigger":"playerAttack"},{"type":"ModifyStruggle","mult":1.5,"power":0.2,"StruggleType":"Struggle","trigger":"beforeStruggleCalc","msg":"KinkyDungeonSpellStrengthStruggle"}]},{"buff":true,"heal":true,"name":"Heal2","sfx":"MagicSlash","school":"Conjure","manacost":3,"components":["Verbal"],"noTargetPlayer":true,"mustTarget":true,"level":1,"type":"hit","onhit":"heal","time":2,"lifetime":1,"delay":1,"power":4.5,"aoe":0.9,"range":7,"size":1,"damage":"inert"},{"name":"FloatingWeapon","sfx":"MagicSlash","school":"Conjure","manacost":2,"components":[],"level":3,"type":"passive","events":[{"type":"FloatingWeapon","trigger":"playerAttack"},{"type":"HandsFree","trigger":"getWeapon"},{"type":"HandsFree","trigger":"calcDamage"}]}]
}
else if(event.key === "G"){
    KinkyDungeonGoddessRep = {Conjure: 50, Elements: -50, Ghost: -50, Illusion: -50, Latex: -50, Leather: -50, Metal: -50, Prisoner: 50, Rope: -50, Will: -50};
}
else if(event.key === "R"){
    KinkyDungeonPlayerEntity.x = KinkyDungeonEndPosition.x
    KinkyDungeonPlayerEntity.y = KinkyDungeonEndPosition.y
    KinkyDungeonStatStamina = 100;
    KinkyDungeonStatMana = 100;
    KinkyDungeonStatDistraction = 0;
}
else if(event.key === "r"){
    for(let i = 0; i < KinkyDungeonRestraints.length; i++){
        KinkyDungeonRemoveRestraint(KinkyDungeonRestraints[i].Group)
    }
}
})
})();