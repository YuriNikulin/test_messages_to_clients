import { hash, compare } from 'bcrypt'
import { UserModel } from 'types'
import { config } from '../config'
import jwt from 'jsonwebtoken'


class AuthServiceClass {
    private static secret = process.env.JWT_SECRET as string
    async hashPassword(password: string) {
        const hashedPassword = await hash(password, config.passwordSaltRounds)
        return hashedPassword
    }

    async comparePasswords(rawPassword: string, hashedPassword: string) {
        const passwordsAreEqual = await compare(rawPassword, hashedPassword)
        return passwordsAreEqual
    }

    async generateUserToken({ channels, id, login }: UserModel) {
        const result = jwt.sign({
            channels, id, login
        }, AuthServiceClass.secret)

        return result
    }

    async parseUserToken(token: string) {
        const rawToken = token.replace('Bearer ', '')
        const isValid = jwt.verify(rawToken, AuthServiceClass.secret)
        if (!isValid) {
            return null
        }

        const result = jwt.decode(rawToken, {
            json: true
        })
        return result
    }
}

export const AuthService = new AuthServiceClass()