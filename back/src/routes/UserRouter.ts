import { ServiceRouter } from "../types"
import { User } from "../entities"

const UserRouter: ServiceRouter = (app) => {
    app.get('/user', (req, res) => {
        res.send('get user')
    })

    app.post('/user', User.save)
}

export { UserRouter }