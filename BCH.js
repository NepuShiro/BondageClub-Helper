
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
if(event.keyCode == 220){
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
