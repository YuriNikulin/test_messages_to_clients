import { StorageService } from '../services/StorageService'
import { User as UserModel } from '@prisma/client'
import { UserMethodsPayload } from 'types'

class User {
    public static save = async (payload: UserMethodsPayload['create']) => {
        try {
            if (payload.data.login && payload.data.password) {
                return await StorageService.user.create(payload)
            }
        } catch(e) {
            console.log(e)
        }
    }

    public static findMany = async () => {
        return StorageService.user.findMany({
            select: {
                login: true,
                id: true,
                channels: true
            }
        })
    }

    public static createFirstUserIfNecessary = async () => {
        const existingUsers = await User.findMany()
        if (!existingUsers.length) {
            User.save({
                data: {
                    login: 'user',
                    password: 'user',
                    channels: {
                        connect: {
                            id: 'vk'
                        }
                    }
                }
            })
        }
    }
}

export { User }