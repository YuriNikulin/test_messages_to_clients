import { hash, compare } from 'bcrypt'
import { UserModel } from 'types'
import { config } from '../config'
import jwt from 'jsonwebtoken'


class AuthServiceClass {
    async hashPassword(password: string) {
        const hashedPassword = await hash(password, config.passwordSaltRounds)
        return hashedPassword
    }

    async comparePasswords(rawPassword: string, hashedPassword: string) {
        const passwordsAreEqual = await compare(rawPassword, hashedPassword)
        return passwordsAreEqual
    }

    async generateUserToken({ channels, id, login }: UserModel) {
        const secret = process.env.JWT_SECRET
        const result = jwt.sign({
            channels, id, login
        }, secret as string)

        return result
    }
}

export const AuthService = new AuthServiceClass()