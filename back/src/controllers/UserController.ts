import { HTTP_STATUSES, RequestHandler, Router, UserModel } from "../types"
import { User } from "../entities"
import { STATUS_CODES } from "http"

class UserController {
    static create: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password && req.body.password2) {
            const existingUser = await User.getByLogin(req.body.login)

            if (existingUser) {
                res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                    login: 'Пользователь с таким именем уже существует'
                })
            }

            if (req.body.password !== req.body.password2) {
                res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                    password: 'Пароли не совпадают'
                })

                return
            }

            await User.save({
                data: {
                    login: req.body.login,
                    password: req.body.password
                }
            })

            return res.sendStatus(HTTP_STATUSES.SUCCESS)
        } else {
            return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: 'Все поля обязательны для заполнения'
            })
        }
    }

    static login: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
            const user = await User.getByLogin(req.body.login, {
                select: {
                    channels: true,
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

            return res.setHeader('Authorization', `Bearer ${userToken}`).sendStatus(HTTP_STATUSES.SUCCESS)
            
        } else {
            res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: 'Все поля обязательны для заполнения'
            })
        }
    }

    static findMany: RequestHandler = async (req, res) => {
        const result = await User.findMany()
        res.send(result)
    }
}

const UserRouter: Router = (app) => {
    app.get('/user/list', UserController.findMany)

    app.post('/user/register', UserController.create)

    app.post('/user/login', UserController.login)
}

export { UserRouter }