/* eslint-disable */

export { };

declare global {
  var BCH_VERSION: string;
  var bchSendAction: (text: string) => void;
  var bchSettingValue: (key: string) => boolean | number | string;
  var Player: Character;
  var ServerAccountUpdate: AccountUpdater;
  var ChatRoomCurrentTime: () => string;
  var LZString: LZStringType;
  var ElementIsScrolledToEnd: (element: string) => boolean;
  var ElementScrollToEnd: (element: string) => void;
  var ServerBeep: ServerBeep;
  var ServerSend: (event: string, data: unknown) => void;
  var GameVersion: string;
  var StruggleProgress: number;
  var ChatRoomCanBeLeashedBy: (id: number, C: Character) => boolean;
  var ChatRoomPlayerIsAdmin: () => boolean;
  var ActivityOrgasmStart: (C: Character) => void;
  var DialogLentLockpicks: boolean;
  var ChatRoomSetLastChatRoom: (String) => String;
  var CharacterDeleteAllOnline: () => void;
  var ChatSearchExit: () => void;
  var CharacterReleaseTotal: (C: Character) => void;
  var CharacterAppearanceReturnRoom: string;
  var CharacterAppearanceReturnModule: string;
  var ChatRoomStatusUpdate: (Status: string) => void;
  var CharacterAppearanceLoadCharacter: (C: Character) => void;
  var ChatRoomCanLeave: () => boolean;
  var MainHallWalk: (room: string) => void;
  var CurrentScreen: string;
  var ChatRoomCharacterUpdate: (C: Character) => void;
  var ChatRoomCharacter: Character[];
  var Character: Character[];
  var PreferenceSubscreenList: string[];
  var PreferenceSubscreen: string;
  var PreferenceMessage: string;
  var DrawText: (
    text: string,
    x: number,
    y: number,
    color: string,
    backColor?: string
  ) => void;
  var DrawTextFit: (
    text: string,
    x: number,
    y: number,
    w: number,
    color: string,
    backColor?: string
  ) => void;
  var DrawButton: (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: string,
    image?: string,
    hoveringText?: string,
    disabled?: boolean
  ) => void;
  var DrawCheckbox: (
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    isChecked: boolean,
    disabled?: boolean,
    textColor?: string,
    checkImage?: string
  ) => void;
  var DrawImageResize: (
    image: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) => boolean;
  var MouseIn: (x: number, y: number, w: number, h: number) => boolean;
  var ServerIsConnected: boolean;
  var ServerSocket: ServerSocket;
  var Commands: Command[];
  var CharacterRefresh: (
    C: Character,
    push?: boolean,
    refreshDialog?: boolean
  ) => void;
  var CurrentCharacter: Character;
  var ChatRoomHideIconState: number;
  var ChatRoomData: {
    Admin: any;
    Game: string;
    Locked: any; Background: string; Name: string
  };
  var WardrobeFastLoad: (
    C: Character,
    position: number,
    update?: boolean
  ) => void;
  var BCX_Loaded: boolean;
  var PreferenceSubscreenBCHSettingsLoad: () => void;
  var PreferenceSubscreenBCHSettingsExit: () => void;
  var PreferenceSubscreenBCHSettingsRun: () => void;
  var PreferenceSubscreenBCHSettingsClick: () => void;
  var CommonSetScreen: (category: string, screen: string) => void;
  var ChatRoomLeashPlayer: number;
  var ChatRoomClearAllElements: () => void;
}
declare global {
  interface Window {
    InputChat?: HTMLTextAreaElement;
    MainCanvas: HTMLCanvasElement;
  }
  type SettingsCategory =
    "General";

  type Character = {
    CanWalk: () => boolean;
    ItemPermission: number;
    CanChangeClothesOn: (C: Character) => boolean;
    IsSlow: () => boolean;
    Effect: string;
    ID: number;
    Pose: string;
    RestrictionSettings: {
      SlowImmunity: boolean;
    };
    OnlineSettings: OnlineSettings;
    MemberNumber: number;
    Name: string;
    AccountName: string;
    Appearance: Item[];
    BCH: string;
    BCHOriginalName?: string;
    CanChangeOwnClothes?: () => boolean;
    IsRestrained: () => boolean;
  };

  type BCHChatMessage = ChatMessageBase & {
    Dictionary: { message: BCHMessage };
  };
  type ChatRoomSyncMemberJoinEvent = {
    MemberNumber: number;
    Character: Character;
  };
}