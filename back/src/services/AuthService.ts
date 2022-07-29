import { hash } from 'bcrypt'
import { config } from '../config'

class AuthServiceClass {
    async hashPassword(password: string) {
        const hashedPassword = await hash(password, config.passwordSaltRounds)
        return hashedPassword
    }

    async comparePasswords(rawPassword: string, hashedPassword: string) {
        console.log(rawPassword, hashedPassword)
    }
}

export const AuthService = new AuthServiceClass()