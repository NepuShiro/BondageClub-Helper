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