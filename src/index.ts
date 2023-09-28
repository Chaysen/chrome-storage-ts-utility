/**
 * @module ChromeStorageTS
 * @description A TypeScript utility for interacting with Chrome's local storage.
 */

/**
 * Represents a generic object with string keys and values of any type.
 * @typedef {Object} ChromeStorageObject
 */
export type ChromeStorageObject = Record<string, any>;

/**
 * A class that provides utility methods to interact with Chrome's local storage in a type-safe manner.
 * @class ChromeStorageTS
 */
export class ChromeStorageTS {
  /** The storage object that holds key-value pairs. */
  public storage: ChromeStorageObject;

  /** An array of keys present in the storage object. */
  public keys: Array<keyof typeof this.storage>;

  /**
   * Creates an instance of ChromeStorageTS.
   * @param {ChromeStorageObject} storage - The initial storage object.
   */
  constructor(storage: ChromeStorageObject) {
    this.storage = storage;
    this.keys = Object.keys(storage);
  }

  /**
   * Resets the Chrome storage to its initial state by setting all keys to `undefined`.
   * @returns {Promise<void>}
   */
  public async resetChromeStorage(): Promise<void> {
    this.keys.forEach((storageKey) => {
      this.updateStorageSettingsKeyValue(storageKey, undefined);
    });
  }

  /**
   * Updates a specific key in the Chrome storage with the provided value.
   * @param {string} setting - The key to update.
   * @param {any} value - The value to set for the specified key.
   * @returns {Promise<void>}
   */
  public async updateStorageSettingsKeyValue<
    T extends keyof typeof this.storage
  >(setting: T, value: (typeof this.storage)[T]): Promise<void> {
    await chrome.storage.local.set({
      [setting]: value,
    });
  }

  /**
   * Retrieves the value associated with a specific key from the Chrome storage.
   * @param {string} key - The key to retrieve.
   * @param {Function} cb - The callback function to pass the retrieved value.
   * @returns {Promise<void>}
   */
  public async getStorageSettingsKeyValue<T extends keyof typeof this.storage>(
    key: T,
    cb: (settings: (typeof this.storage)[T]) => void
  ): Promise<void> {
    await chrome.storage.local.get(key, (value) => {
      cb(value[key] as (typeof this.storage)[T]);
    });
  }

  /**
   * Retrieves the values associated with multiple keys from the Chrome storage.
   * @param {Array<string>} keys - An array of keys to retrieve.
   * @param {Function} cb - The callback function to pass the retrieved values.
   * @returns {Promise<void>}
   */
  public async getStorageSettingsKeysValue<T extends keyof typeof this.storage>(
    keys: T[],
    cb: (settings: {
      [k in T]: (typeof this.storage)[k];
    }) => void
  ): Promise<void> {
    await chrome.storage.local.get(keys, (value) => {
      cb(value as { [k in T]: (typeof this.storage)[k] });
    });
  }

  /**
   * Adds a listener to detect changes to a specific key in the Chrome storage.
   * @param {string} key - The key to monitor.
   * @param {Function} cb - The callback function to pass the new value when a change is detected.
   * @returns {Promise<void>}
   */
  async addListenerChromeStorageSettingsValue<
    T extends keyof typeof this.storage
  >(key: T, cb: (settings: (typeof this.storage)[T]) => void): Promise<void> {
    await chrome.storage.local.onChanged.addListener((ChromeChangeObject) => {
      if (key in ChromeChangeObject) {
        cb(ChromeChangeObject[key].newValue);
      }
    });
  }

  /**
   * Adds a listener to detect changes to multiple keys in the Chrome storage.
   * @param {Array<string>} keys - An array of keys to monitor.
   * @param {Function} cb - The callback function to pass the new values when changes are detected.
   * @returns {Promise<void>}
   */
  async addListenerChromeStorageSettingsValues<
    T extends keyof typeof this.storage
  >(
    keys: T[],
    cb: (settings: {
      [k in T]?: (typeof this.storage)[k] | undefined;
    }) => void
  ): Promise<void> {
    await chrome.storage.local.onChanged.addListener((ChromeChangeObject) => {
      const newStorage: {
        [k in T]?: (typeof this.storage)[k];
      } = keys.reduce(
        (acc, val) => ({ ...acc, [val]: ChromeChangeObject[val]?.newValue }),
        {}
      );
      cb(newStorage);
    });
  }
}
