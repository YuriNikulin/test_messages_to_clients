import { RequestHandler, Router } from "../types"
import { User } from "../entities"
import { STATUS_CODES } from "http"

class UserController {
    static create: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password && req.body.password2) {
            const existingUser = await User.getByLogin(req.body.login)

            if (existingUser) {
                res.status(400).send({
                    login: 'Пользователь с таким именем уже существует'
                })
            }

            if (req.body.password !== req.body.password2) {
                res.status(400).send({
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

            res.sendStatus(200)
        } else {
            res.status(400).send({
                message: 'Все поля обязательны для заполнения'
            })
        }
    }

    static login: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
            const user = User.getByLogin(req.body.login)

            if (!user) {
                res.status(400).send({
                    login: 'Пользователя с таким именем не существует'
                })
            }

            const credentialsAreCorrect = User.checkCredentials(req.body.login, req.body.password)
            res.sendStatus(200)
            
        } else {
            res.status(400).send({
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