import { PrismaClient } from '@prisma/client'
import { EntitiesKeys, IStorage, UserMethods } from 'types'

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

    user: UserMethods = {
        create: (args) => {
            return this.prisma.user.create(args)
        },

        findMany: (args) => {
            return this.prisma.user.findMany(args)
        }
    }
}

export const DbService = new DbServiceClass()