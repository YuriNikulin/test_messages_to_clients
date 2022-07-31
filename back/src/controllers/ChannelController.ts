import { API_1, ERROR_NOT_ENOUGH_DATA, CHANNEL_CONFIG, ERROR_CONFIG_NOT_FOUND } from "../constants"
import { HTTP_STATUSES, RequestHandler, RequestWithUserHandler, Router } from "../types"
import { Channel } from "../entities"
import { withUser } from "../decorators/withUser"
import { throwNoUserError } from "../utils"

class ChannelController {    
    static getAllChannels: RequestHandler = async (req, res) => {
        try {
            const result = await Channel.getAll()
            return res.status(HTTP_STATUSES.SUCCESS).send({
                channels: result
            })
        } catch(e) {
            res.status(HTTP_STATUSES.ERROR_SERVER).send({
                message: 'Не удалось получить список доступных каналов'
            })
        }
    }

    @withUser()
    static async getChannelDetails(...[req, res]: Parameters<RequestWithUserHandler>) {
        if (!req.user) {
            return throwNoUserError(res)
        }

        const channelId = req.body.id
        if (!channelId) {
            return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: ERROR_NOT_ENOUGH_DATA
            })
        }

        const channel = await Channel.getById(channelId)
        const channelConfig = CHANNEL_CONFIG[channelId]
        if (!channelConfig) {
            return res.status(HTTP_STATUSES.ERROR_REQUEST).send({
                message: ERROR_CONFIG_NOT_FOUND
            })
        }
        return res.status(HTTP_STATUSES.SUCCESS).send({
            config: channelConfig,
            channel
        })
    }
}

const ChannelRouter: Router = (app) => {
    app.get(`/${API_1}/channels/list`, ChannelController.getAllChannels)

    app.post(`/${API_1}/channels/info`, ChannelController.getChannelDetails as RequestHandler)
}

export { ChannelRouter }