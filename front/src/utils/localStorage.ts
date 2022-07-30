class StorageClass {
    save(key: string, data: any) {
        localStorage.setItem(key, data)
    }

    get(key: string) {
        const item = localStorage.getItem(key)
        try {
            return JSON.parse(item as string)
        } catch(e) {
            return item
        }
    }
}

export const Storage = new StorageClass()