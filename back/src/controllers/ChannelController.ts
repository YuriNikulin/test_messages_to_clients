import { API_1 } from "../constants"
import { HTTP_STATUSES, RequestHandler, Router } from "../types"
import { Channel } from "../entities"

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
}

const ChannelRouter: Router = (app) => {
    app.get(`/${API_1}/getChannels`, ChannelController.getAllChannels)
}

export { ChannelRouter }