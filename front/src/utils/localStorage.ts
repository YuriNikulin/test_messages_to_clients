import { StorageType } from "types";

interface StorageOptions {
    storageType?: StorageType
}

class StorageClass {
    private defineStorage(options: StorageOptions) {
        let storage = options.storageType || 'localStorage';
        return storage === 'sessionStorage' ? sessionStorage : localStorage
    }

    save(key: string, data: any, options: StorageOptions = {}) {
        let result
        try {
            result = JSON.stringify(data)
        } catch(e) {
            result = data
        }
        this.defineStorage(options).setItem(key, result)
    }

    get(key: string, options: StorageOptions = {}) {
        const item = this.defineStorage(options).getItem(key)
        try {
            return JSON.parse(item as string)
        } catch(e) {
            return item
        }
    }
}

export const Storage = new StorageClass()