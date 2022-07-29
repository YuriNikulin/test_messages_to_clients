import { StorageService } from '../services/StorageService'
import { RequestHandler } from "types"

class User {
    public static save: RequestHandler = async (req, res) => {
        if (req.body.login && req.body.password) {
        }
        res.send('ok')
        return {}
    }

    public static getList: RequestHandler = async (req, res) => {
        // const data = StorageService.
    }
}

export { User }