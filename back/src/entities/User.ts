import { StorageService } from '../services/StorageService'
import { DbService } from '../services/DbService'
import { RequestHandler } from "types"
import { User as UserModel } from '@prisma/client'

class User {
    public static save = async (payload: Record<string, unknown>) => {
        try {
            if (payload.login && payload.password) {
                return await StorageService.user.create({
                    data: { ...payload as UserModel }
                })
            }
        } catch(e) {
            console.log(e)
        }
    }

    public static findMany = async () => {
        return StorageService.user.findMany({
            select: {
                login: true,
                id: true
            }
        })
    }
}

export { User }