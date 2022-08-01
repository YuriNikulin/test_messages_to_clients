import {
    HTTP_STATUSES,
    RequestHandler,
    RequestWithUserHandler,
    Router,
    UserMethodsPayload,
    UserModel
} from "../types"
import { Channel, User } from "../entities"
import {
    API_1,
    CHANNEL_CONFIG,
    ERROR_CONFIG_NOT_FOUND,
    ERROR_FIELDS_REQUIRED,
    ERROR_NOT_ENOUGH_DATA,
    ERROR_USER_ALREADY_EXISTS,
    ERROR_USER_DONT_EXISTS,
    ERROR_WRONG_CREDENTIALS
} from "../constants"
import { withUser } from "../decorators/withUser"
import { throwNoUserError } from "../utils"
import { MessageService } from "../services/MessageService"

class UserController {
    static create: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
            const existingUser = await User.getBy('login', req.body.login)

            if (existingUser) {
                return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                    login: ERROR_USER_ALREADY_EXISTS
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
                message: ERROR_FIELDS_REQUIRED
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
                    login: ERROR_USER_DONT_EXISTS
                })
            }

            const credentialsAreCorrect = await User.checkCredentials(req.body.login, req.body.password)
            if (!credentialsAreCorrect) {
                return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                    password: ERROR_WRONG_CREDENTIALS
                })
            }

            const userToken = await User.getToken(user as UserModel)

            return res.status(HTTP_STATUSES.SUCCESS).send(({
                token: userToken
            }))
            
        } else {
            res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: ERROR_FIELDS_REQUIRED
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

        return throwNoUserError(res)
    }

    @withUser()
    static async toggleChannel(...[req, res]: Parameters<RequestWithUserHandler>) {
        if (req.user) {
            const channelId = req.body.id
            const channel = await Channel.getById(channelId)
            const user = await User.getBy('id', req.user.id) as UserModel
            if (channel && user) {
                let data: UserMethodsPayload['update']['data'] = {}
                const shouldAddChannel = !user.channels.some(c => c.id === channelId)
                if (shouldAddChannel) {
                    data = {
                        channels: {
                            connect: {
                                id: channelId
                            }
                        }
                    }
                } else {
                    data = {
                        channels: {
                            disconnect: {
                                id: channelId
                            }
                        }
                    }
                }

                await User.update({
                    where: {
                        id: user.id
                    },
                    data
                })

                return res.status(HTTP_STATUSES.SUCCESS).send({
                    channel,
                    action: shouldAddChannel ? 'added' : 'deleted'
                })
            }
        }

        return throwNoUserError(res)
    }

    @withUser()
    static async editMessage(...[req, res]: Parameters<RequestWithUserHandler>) {
        if (!req.user) {
            return throwNoUserError(res)
        }

        if (!req.body || !req.body.content || !req.body.channelId) {
            return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: ERROR_NOT_ENOUGH_DATA
            })
        }

        const channel = await Channel.getById(req.body.channelId)
        if (!channel || !CHANNEL_CONFIG[channel.id]) {
            return res.status(HTTP_STATUSES.ERROR_NOT_FOUND).send({
                message: ERROR_CONFIG_NOT_FOUND
            })
        }

        const errors = await MessageService.validateMessage(req.body.content, CHANNEL_CONFIG[channel.id])
        if (errors) {
            return res.status(HTTP_STATUSES.ERROR_REQUEST).send(errors)
        }

        return res.status(HTTP_STATUSES.SUCCESS).send({})
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

    app.patch(`/${API_1}/user/toggleChannel`, UserController.toggleChannel as RequestHandler)

    app.patch(`/${API_1}/user/editMessage`, UserController.editMessage as RequestHandler)
}

export { UserRouter }