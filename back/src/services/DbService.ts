import { PrismaClient } from '@prisma/client'
import { EntitiesKeys, IStorage, CreateData } from 'types'

class DbServiceClass implements IStorage {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async isDbConnectionEstablished() {
        try {
            await this.prisma.$connect()
            return true
        } catch(e) {
            console.log(e)
            return false
        }
    }

    create: (
        payload: CreateData
    ) => Promise<any> = async (data) => {
        try {
            // @ts-ignore
            this.prisma[data.entity].create(data.payload)
        } catch(e) {
            console.error(e)
        }
    }
}

export const DbService = new DbServiceClass()