# ChromeStorageTS
[![Node.js CI](https://github.com/Chaysen/chrome-storage-ts-utility/actions/workflows/nodejs.yml/badge.svg?branch=main&event=push)](https://github.com/Chaysen/chrome-storage-ts-utility/actions/workflows/nodejs.yml)
[![npm version](https://badge.fury.io/js/chrome-storegae-ts.svg)](https://badge.fury.io/js/chrome-storegae-ts)

A TypeScript utility for interacting with Chrome's local storage in a type-safe manner.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install chrome-storage-ts --save
```
## Usage 

```typescript
import { ChromeStorageTS } from 'chrome-storage-ts';

const initialStorage = {
  key1: 'value1',
  key2: 'value2',
};

const storageInstance = new ChromeStorageTS(initialStorage, 'local'); // 'local' is the default storage type

// Update a key in the storage
storageInstance.updateStorageKeyValue('key1', 'newValue');

// ... other operations
```
## API
### ChromeStorageTS
- **constructor(storage: ChromeStorageObject, storageType: StorageTypes = 'local')**
Initializes the storage instance with the provided storage object and specifies the type of 

- **resetChromeStorage(): Promise<void>**
Resets the Chrome storage to its initial state by setting all keys to undefined.

- **updateStorageKeyValue(setting: string, value: any): Promise<void>**
Updates a specific key in the Chrome storage with the provided value.

- **getStorageKeyValue(key: string, cb: Function): Promise<void>**
Retrieves the value associated with a specific key from the Chrome storage.

- **getStorageKeysValue(keys: Array<string>, cb: Function): Promise<void>**
Retrieves the values associated with multiple keys from the Chrome storage.

- **addListenerChromeStorageValue(key: string, cb: Function): Promise<void>**
Adds a listener to detect changes to a specific key in the Chrome storage.

- **addListenerChromeStorageValues(keys: Array<string>, cb: Function): Promise<void>**
Adds a listener to detect changes to multiple keys in the Chrome storage.

## Contributing
- Fork the repository.
- Create your feature branch (git checkout -b feature/YourFeature).
- Commit your changes (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/YourFeature).
- Open a pull request.
## License
This project is licensed under the MIT License. See the LICENSE file for details.
