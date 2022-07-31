import { StorageService } from '../services/StorageService'
import { AuthService } from '../services/AuthService'
import { UserMethodsPayload, UserModel } from 'types'
import { userQuerySelector } from '../querySelectors'

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
            select: userQuerySelector
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

    public static getBy =
        async (
            searchKey: 'id' | 'login' = 'id',
            searchValue: number | string,
            payload: Partial<UserMethodsPayload['findFirst']> = {}
        ) => {
        const existingUser = await User.findFirst({
            where: {
                [searchKey]: searchValue
            },
            select: userQuerySelector,
            ...payload
        })

        return existingUser
    }

    public static checkCredentials = async (login: string, password: string) => {
        const existingUser = await User.getBy('login', login, {
            select: {
                password: true
            }
        })
        if (!existingUser) {
            throw new Error('Пользователя не существует')
        }

        const isPasswordCorrect = await AuthService.comparePasswords(password, existingUser.password)
        return isPasswordCorrect
    }

    public static update = async (data: UserMethodsPayload['update']) => {
        return await StorageService.user.update(data)
    }

    public static getToken = async(user: UserModel) => {
        return await AuthService.generateUserToken(user)
    }
}

export { User }