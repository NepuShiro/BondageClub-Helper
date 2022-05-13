/* eslint-disable */

export { };

declare global {
  // functions
  var bchSendAction: (text: string) => void;
  var bchSettingValue: (key: string) => boolean | number | string;
  var ChatRoomCurrentTime: () => string;
  var ElementIsScrolledToEnd: (element: string) => boolean;
  var ElementScrollToEnd: (element: string) => void;
  var ServerSend: (event: string, data: unknown) => void;
  var ChatRoomCanBeLeashedBy: (id: number, C: Character) => boolean;
  var ChatRoomPlayerIsAdmin: () => boolean;
  var ActivityOrgasmStart: (C: Character) => void;
  var ChatRoomSetLastChatRoom: (String) => String;
  var CharacterDeleteAllOnline: () => void;
  var ChatSearchExit: () => void;
  var CharacterReleaseTotal: (C: Character) => void;
  var ChatRoomStatusUpdate: (Status: string) => void;
  var CharacterAppearanceLoadCharacter: (C: Character) => void;
  var ChatRoomCanLeave: () => boolean;
  var MainHallWalk: (room: string) => void;
  var ChatRoomCharacterUpdate: (C: Character) => void;
  var PreferenceSubscreenBCHSettingsLoad: () => void;
  var PreferenceSubscreenBCHSettingsExit: () => void;
  var PreferenceSubscreenBCHSettingsRun: () => void;
  var PreferenceSubscreenBCHSettingsClick: () => void;
  var CommonSetScreen: (category: string, screen: string) => void;
  var ChatRoomClearAllElements: () => void;
  var ValidationCanRemoveItem: () => boolean;
  var InventoryGetItemProperty: (item: Array, assettype: string, a: boolean) => boolean;
  var ValidationCanAddOrRemoveItem: (previousItem: Array, params: Array) => boolean;
  var InventoryOwnerOnlyItem: (previousItem: string) => boolean;
  var InventoryLoverOnlyItem: (previousItem: string) => boolean;
  var InventoryGetLock: (previousitem: Array) => Array;
  var DrawText: (text: string, x: number, y: number, color: string, backColor?: string) => void;
  var DrawTextFit: (text: string, x: number, y: number, w: number, color: string, backColor?: string) => void;
  var DrawButton: (x: number, y: number, w: number, h: number, label: string, color: string, image?: string, hoveringText?: string, disabled?: boolean) => void;
  var DrawCheckbox: (x: number, y: number, w: number, h: number, text: string, isChecked: boolean, disabled?: boolean, textColor?: string, checkImage?: string) => void;
  var DrawImageResize: (image: string, x: number, y: number, w: number, h: number) => boolean;
  var MouseIn: (x: number, y: number, w: number, h: number) => boolean;
  var CharacterRefresh: (C: Character, push?: boolean, refreshDialog?: boolean ) => void;
  var WardrobeFastLoad: (C: Character, position: number, update?: boolean) => void;
  var ServerPlayerSync: () => void;

  // variables
  var Character: Character[];
  var BCH_VERSION: string;
  var Player: Character;
  var ServerAccountUpdate: AccountUpdater;
  var LZString: LZStringType;
  var ServerBeep: ServerBeep;
  var GameVersion: string;
  var StruggleProgress: number;
  var DialogLentLockpicks: boolean;
  var CharacterAppearanceReturnRoom: string;
  var CharacterAppearanceReturnModule: string;
  var CurrentScreen: string;
  var ChatRoomLeashPlayer: number;
  var ChatRoomCharacter: Character[];
  var PreferenceSubscreenList: string[];
  var PreferenceSubscreen: string;
  var PreferenceMessage: string;
  var ServerIsConnected: boolean;
  var ServerSocket: ServerSocket;
  var Commands: Command[];
  var CurrentCharacter: Character;
  var ChatRoomHideIconState: number;
  var ChatRoomData: {Admin: any; Game: string; Locked: any; Background: string; Name: string};
  var BCX_Loaded: boolean;
  var StruggleDrawLockpickProgress: number;
  var StruggleLockPickOrder: Array;
}
declare global {
  interface Window {
    InputChat?: HTMLTextAreaElement;
    MainCanvas: HTMLCanvasElement;
  }
  type Settings = Record<string, boolean | string> & { version?: number };
  type SettingsCategory = 
    "General"
    "Experimental";
  type DefaultSetting = DefaultSettingBoolean | DefaultSettingString;
  type DefaultSettings = Readonly<Record<string, DefaultSetting>>;
  type ArousalSettings = {
    Progress: number,
  }
  type Character = {
    CanWalk: () => boolean;
    CanChangeOwnClothes?: () => boolean;
    IsRestrained: () => boolean;
    CanChangeClothesOn: (C: Character) => boolean;
    IsSlow: () => boolean;
    ItemPermission: number;
    Effect: string;
    ID: number;
    Pose: string;
    RestrictionSettings: {SlowImmunity: boolean;};
    OnlineSettings: OnlineSettings;
    ArousalSettings: ArousalSettings;
    MemberNumber: number;
    Name: string;
    AccountName: string;
    Appearance: Item[];
    BCH: string;
    BCHOriginalName?: string;
  };
  type BCHChatMessage = ChatMessageBase & {
    Dictionary: { message: BCHMessage };
  };
  type ChatRoomSyncMemberJoinEvent = {
    MemberNumber: number;
    Character: Character;
  };
}