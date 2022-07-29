import { StorageService } from '../services/StorageService'
import { AuthService } from '../services/AuthService'
import { User as UserModel } from '@prisma/client'
import { UserMethodsPayload } from 'types'

class User {
    public static save = async (payload: UserMethodsPayload['create']) => {
        try {
            if (payload.data.login && payload.data.password) {
                const { password } = payload.data
                const hashedPassword = await AuthService.hashPassword(password)
                return await StorageService.user.create({
                    ...payload,
                    data: {
                        ...payload.data,
                        password: hashedPassword
                    }
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

    public static findFirst = async (payload: UserMethodsPayload['findFirst']) => {
        return StorageService.user.findFirst(payload)
    }

    public static getByLogin = async (login: string) => {
        const existingUser = await User.findFirst({
            where: {
                login
            }
        })

        return existingUser
    }

    public static checkCredentials = async (login: string, password: string) => {
        const existingUser = await User.getByLogin(login)
        if (!existingUser) {
            throw new Error('Пользователя не существует')
        }

        const isPasswordCorrect = AuthService.comparePasswords(password, existingUser.password)
    }
}

export { User }