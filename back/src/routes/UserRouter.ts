import { ServiceRouter } from "../types"
import { User } from "../entities"

const UserRouter: ServiceRouter = (app) => {
    app.get('/user/list', User.getList)
    app.post('/user', User.save)
}

export { UserRouter }