/**
 * The global API of the SDK
 *
 * Accessible using the exported value or as `window.bcModSdk`
 * @public
 */
export declare interface ModSDKGlobalAPI {
  /** The version of the SDK itself. Attempting to load two different SDK versions will fail. */
  version: string;
  /**
   * Register a mod, receiving access to the mod API
   * @param name - Name of the mod
   * @param version - Version or other metadata for the mod, visible by other mods
   * @param allowReplace - If `true` subsequent calls to `registerMod` will unload old one, replacing it.
   * If `false` any attempt to register a new mod with same name will fail. Defaults to `false`
   * @returns The API usable by mod. @see ModSDKModAPI
   */
  registerMod(
    name: string,
    version: string,
    allowReplace?: boolean
  ): ModSDKModAPI;
  /** Get info about all registered mods */
  getModsInfo(): ModSDKModInfo[];
  /** Get info about all modified functions */
  getPatchingInfo(): Map<string, PatchedFunctionInfo>;
  /** Internal API, please **DO NOT USE** */
  errorReporterHooks: {
    hookEnter: ((fn: string, mod: string) => () => void) | null;
    hookChainExit:
      | ((fn: string, patchMods: ReadonlySet<string>) => () => void)
      | null;
  };
}

/** @public */
export declare interface ModSDKModAPI {
  /** Unload this mod, removing any hooks or patches by it. To continue using SDK another call to `registerMod` is required */
  unload(): void;
  /**
   * Hook a BC function
   * @param functionName - Name of function to hook. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   * @param priority - Number used to determinate order hooks will be called in. Higher number is called first
   * @param hook - The hook itself to use, @see PatchHook
   * @returns Function that can be called to remove this hook
   */
  hookFunction(
    functionName: string,
    priority: number,
    hook: PatchHook
  ): () => void;
  /**
   * Call original function, bypassing any hooks and ignoring any patches applied by ALL mods.
   * @param functionName - Name of function to call. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   * @param args - Arguments to use for the call
   * @param context - `this` context to use. Defaults to `window`. If calling method of object, then set this to the object itself (e.g. `functionName` = `Player.CanChange` then `context` = `Player`)
   */
  callOriginal(
    functionName: string,
    args: unknown[],
    context?: unknown
  ): unknown;
  /**
   * Patch a BC function
   *
   * **This method is DANGEROUS** to use and has high potential to conflict with other mods.
   *
   * Only use it if what you are trying to accomplish can't be done easily with `hookFunction`.
   *
   * This function tranforms BC function to string, replaces patches as pure text and then `eval`uates it.
   * If you don't know what this means, please avoid this function.
   * @param functionName - Name of function to patch. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   * @param patches - Object in key: value format, where keys are chunks to replace and values are result.
   *
   * Patches from multiple calls are merged; where key matches the older one is replaced.
   * Specifying value of `null` removes patch with this key.
   */
  patchFunction(
    functionName: string,
    patches: Record<string, string | null>
  ): void;
  /**
   * Remove all patches by `patchFunction` from specified function.
   * @param functionName - Name of function to patch. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   */
  removePatches(functionName: string): void;
  /**
   * Get hash of original function in CRC32.
   *
   * The hash is computed from source obtained using `toString` with line endings normalized to LF
   * @param functionName - Name of function. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   */
  getOriginalHash(functionName: string): string;
}

/**
 * Info about a mod registered within the Mod SDK
 * @public
 */
export declare interface ModSDKModInfo {
  name: string;
  version: string;
}

/**
 * Info about a function modified using the API
 * @public
 */
export declare interface PatchedFunctionInfo {
  name: string;
  /** CRC32 has of the original function */
  originalHash: string;
  /** List of names of mods that hooked this function */
  hookedByMods: string[];
  /** List of names of mods that patched this function */
  patchedByMods: string[];
}

/**
 * This is how hook from mod looks like.
 *
 * As first argument it receives all arguments the original function received.
 *
 * As second argument special `next` function that should be used to call original function (or next function in the hook chain).
 *
 * The return value is then used as return value instead of original one.
 * @public
 */
export declare type PatchHook = (
  args: unknown[],
  next: (modifiedArgs: unknown[]) => unknown
) => unknown;

export {};
