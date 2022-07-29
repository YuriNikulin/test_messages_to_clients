import { PrismaClient } from '@prisma/client'
import { DbService } from './DbService'
import { LocalStorageService } from './LocalStorageService'
import { config } from '../config'
import { IStorage } from 'types/index';



class StorageServiceClass {
    storage: IStorage = DbService;

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
    }

    sayHi() {
        console.log('hi from storage service')
    }

    user = this.storage.user
}

export const StorageService = new StorageServiceClass()
StorageService.defineStorageType()