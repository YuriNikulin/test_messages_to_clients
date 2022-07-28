import { PrismaClient } from "@prisma/client"
import { RequestHandler } from "../types"
import { prisma } from '../services/DbService'

class User {
    public static save: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
            const user = await prisma.user.create({
                data: {
                    login: req.body.login,
                    password: req.body.password
                }
            })

            console.log(user)
        }
        res.send('ok')
        return {}
    }
}

export { User }