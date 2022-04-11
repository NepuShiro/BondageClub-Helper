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

window.addEventListener('load', function () {
    console.log("Loaded KDCheats.");
});
//timeout for 5 seconds
setTimeout(function(){
    for (let prop in KinkyDungeonStatsPresets) {
        KinkyDungeonStatsPresets[prop].cost = 0
    }
} , 5000);
addEventListener("keydown", (event) => {
if(event.key === "f"){
    KinkyDungeonStatMana = 100;
}
else if(event.key === "v"){
    KinkyDungeonStatStamina = 100;
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
}
else if(event.key === "g"){
    KinkyDungeonGoddessRep = {Conjure: 50, Elements: -50, Ghost: -50, Illusion: -50, Latex: -50, Leather: -50, Metal: -50, Prisoner: 50, Rope: -50, Will: -50};
}
})
})();
