import { CreateData, IStorage } from "types/index";

class LocalStorageServiceClass implements IStorage {
    storage = {}
    
    create: (
        payload: CreateData
    ) => Promise<any> = async (payload: CreateData) => {

    }
}

export const LocalStorageService = new LocalStorageServiceClass()