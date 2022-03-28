
window.addEventListener('load', function () {
    console.log("Loaded BCH.");
})
let keys = {
    backslash: false,
    delete: false,
  };
addEventListener("keydown", (event) => {
    if (event.keyCode == 220) {
      keys.backslash = true;
    }
    if (event.key === "Delete") {
      keys.delete = true;
    }
    if(keys.backslash && keys.delete){
        CharacterReleaseTotal(Player);
        setTimeout(function(){
            WardrobeFastLoad(Player, 2, true)
        }, 500);
        CharacterRefresh(Player);
    }
});
addEventListener("keyup", (event) => {
    if (event.keyCode == 220) {
      keys.backslash = false;
    }
    if (event.key === "Delete") {
      keys.delete = false;
    }
});
addEventListener("keydown", (event) => {
if(event.key === "f"){
    KinkyDungeonChangeMana(99);
}
else if(event.key === "v"){
    KinkyDungeonChangeStamina(99);
}
else if(event.key === "t"){
    KinkyDungeonGold = 9999999;
    KinkyDungeonLockpicks = 999;
    KinkyDungeonRedKeys = 999;
    KinkyDungeonBlueKeys = 999;
    KinkyDungeonNormalBlades = 999;
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
else if(event.keyCode == 220){
    CharacterReleaseTotal(Player);
    CharacterRefresh(Player);
}
else if(event.keyCode == 109){
    if(CurrentScreen == "ChatRoom"){
        DialogLentLockpicks = false;
        ChatRoomClearAllElements();
        ServerSend("ChatRoomLeave", "");
        ChatRoomSetLastChatRoom("");
        // Clear leash since the player has escaped
        ChatRoomLeashPlayer = null;
        CommonSetScreen("Online", "ChatSearch");
        CharacterDeleteAllOnline();
        ChatSearchExit();
    }
    else
    MainHallWalk("MainHall");
}
else if(event.key === "]"){
    StruggleProgress = 125;
}
else if(event.key === "["){
  document.getElementById("InputChat").style.display = "none";
	document.getElementById("TextAreaChatLog").style.display = "none";
	CharacterAppearanceReturnRoom = "ChatRoom";
	CharacterAppearanceReturnModule = "Online";
	ChatRoomStatusUpdate("Wardrobe");
	CharacterAppearanceLoadCharacter(Player);
}
})
