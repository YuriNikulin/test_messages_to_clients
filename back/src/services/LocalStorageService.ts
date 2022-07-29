// @ts-nocheck
import { Prisma } from "@prisma/client";
import { IStorage, UserMethods } from "types/index";

class LocalStorageServiceClass implements IStorage {
    storage = {}
    
    user: UserMethods = {
        create(args) {
            // return 5
        },
    }
}

export const LocalStorageService = new LocalStorageServiceClass()