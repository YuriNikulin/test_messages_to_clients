import { PrismaClient } from '@prisma/client'
import { DbService } from './DbService'
import { LocalStorageService } from './LocalStorageService'
import { config } from '../config'
import { IStorage } from 'types/index';



class StorageServiceClass {
    storage: IStorage = LocalStorageService;
    user = LocalStorageService.user
    channel = LocalStorageService.channel

    async defineStorageType() {
        if (config.storageType === 'localstorage') {
            this.setStorage(LocalStorageService)
            return
        }

        const isConnected = await DbService.isDbConnectionEstablished()
        if (isConnected) {
            this.setStorage(DbService)
        } else {
            this.setStorage(LocalStorageService)
        }

        return
    }

    private setStorage(storage: IStorage) {
        if (storage === LocalStorageService) {
            console.log('Local storage is used as a storage')
        } else {
            console.log('Database is used as a storage')
        }
        this.storage = storage
        this.user = storage.user
        this.channel = storage.channel
    }
}

export const StorageService = new StorageServiceClass()