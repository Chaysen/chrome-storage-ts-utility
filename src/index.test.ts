import { ChromeStorageTS, ChromeStorageObject } from "./"; // Adjust the path accordingly

// Mocking chrome.storage.local
const mockSet = jest.fn();
const mockGet = jest.fn();
const mockAddListener = jest.fn();

global.chrome = {
  storage: {
    local: {
      set: mockSet,
      get: mockGet,
      onChanged: {
        addListener: mockAddListener,
      },
    },
  },
} as any;

describe("ChromeStorageTS", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize storage and keys correctly", () => {
    const storage: ChromeStorageObject = { key1: "value1", key2: "value2" };
    const instance = new ChromeStorageTS(storage);
    expect(instance.storage).toEqual(storage);
    expect(instance.keys).toEqual(["key1", "key2"]);
  });

  it("should reset Chrome storage", async () => {
    const storage: ChromeStorageObject = { key1: "value1", key2: "value2" };
    const instance = new ChromeStorageTS(storage);
    await instance.resetChromeStorage();
    expect(mockSet).toHaveBeenCalledTimes(2);
    expect(mockSet).toHaveBeenCalledWith({ key1: undefined });
    expect(mockSet).toHaveBeenCalledWith({ key2: undefined });
  });

  it("should update storage key value", async () => {
    const instance = new ChromeStorageTS({});
    await instance.updateStorageSettingsKeyValue("key1", "newValue");
    expect(mockSet).toHaveBeenCalledWith({ key1: "newValue" });
  });

  it("should get storage key value", async () => {
    const callback = jest.fn();
    mockGet.mockImplementation((key, cb) => cb({ key1: "value1" }));
    const instance = new ChromeStorageTS({});
    await instance.getStorageSettingsKeyValue("key1", callback);
    expect(callback).toHaveBeenCalledWith("value1");
  });

  it("should get multiple storage keys value", async () => {
    const callback = jest.fn();
    mockGet.mockImplementation((keys, cb) =>
      cb({ key1: "value1", key2: "value2" })
    );
    const instance = new ChromeStorageTS({});
    await instance.getStorageSettingsKeysValue(["key1", "key2"], callback);
    expect(callback).toHaveBeenCalledWith({ key1: "value1", key2: "value2" });
  });

  it("should add listener for storage key", async () => {
    const callback = jest.fn();
    const instance = new ChromeStorageTS({});
    await instance.addListenerChromeStorageSettingsValue("key1", callback);
    expect(mockAddListener).toHaveBeenCalled();
  });

  it("should add listener for multiple storage keys", async () => {
    const callback = jest.fn();
    const instance = new ChromeStorageTS({});
    await instance.addListenerChromeStorageSettingsValues(
      ["key1", "key2"],
      callback
    );
    expect(mockAddListener).toHaveBeenCalled();
  });
});
