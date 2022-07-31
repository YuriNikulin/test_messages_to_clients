import { HTTP_STATUSES, RequestHandler, RequestWithUserHandler, Router, UserModel } from "../types"
import { User } from "../entities"
import { API_1 } from "../constants"
import { withUser } from "../decorators/withUser"

class UserController {
    static create: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
            const existingUser = await User.getBy('login', req.body.login)

            if (existingUser) {
                return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                    login: 'Пользователь с таким именем уже существует'
                })
            }

            await User.save({
                data: {
                    login: req.body.login,
                    password: req.body.password
                }
            })

            return res.status(HTTP_STATUSES.SUCCESS).send({})
        } else {
            return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: 'Все поля обязательны для заполнения'
            })
        }
    }

    static login: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
            const user = await User.getBy('login', req.body.login, {
                select: {
                    id: true,
                    login: true,
                    password: true
                }
            })

            if (!user) {
                return res.status(HTTP_STATUSES.ERROR_NOT_FOUND).send({
                    login: 'Пользователя с таким именем не существует'
                })
            }

            const credentialsAreCorrect = await User.checkCredentials(req.body.login, req.body.password)
            if (!credentialsAreCorrect) {
                return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                    password: 'Неправильное имя пользователя или пароль'
                })
            }

            const userToken = await User.getToken(user as UserModel)

            return res.status(HTTP_STATUSES.SUCCESS).send(({
                token: userToken
            }))
            
        } else {
            res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: 'Все поля обязательны для заполнения'
            })
        }
    }

    
    @withUser()
    static async getInfo(...[req, res]: Parameters<RequestWithUserHandler>) {
        if (req.user) {
            const actualUser = await User.getBy('id', req.user.id)

            if (actualUser) {
                return res.status(HTTP_STATUSES.SUCCESS).send({
                    user: actualUser
                })
            }
        }

        return res.status(HTTP_STATUSES.ERROR_NOT_FOUND).send({
            message: 'Не удалось получить данные о пользователе'
        })
    }

    static findMany: RequestHandler = async (req, res) => {
        const result = await User.findMany()
        res.send(result)
    }
}

const UserRouter: Router = (app) => {
    app.get(`/${API_1}/user/list`, UserController.findMany)

    app.post(`/${API_1}/user/register`, UserController.create)

    app.post(`/${API_1}/user/login`, UserController.login)

    app.get(`/${API_1}/user/info`, UserController.getInfo as RequestHandler)
}

export { UserRouter }