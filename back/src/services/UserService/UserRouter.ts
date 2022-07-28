import { ServiceRouter } from "../../types"

const UserRouter: ServiceRouter = (app) => {
    app.get('/user', (req, res) => {
        res.send('get user')
    })

    app.post('/user', (req, res) => {
        res.send('post user')
    })
}

export { UserRouter }