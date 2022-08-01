// @ts-nocheck
import { Prisma } from "@prisma/client";
import { ChannelMethods, IStorage, UserMethods } from "types/index";

class LocalStorageServiceClass implements IStorage {
    storage = {}
    
    user: UserMethods = {
        create(args) {
            // return 5
        },
    }

    channel: ChannelMethod = {
        
    }
}

export const LocalStorageService = new LocalStorageServiceClass()