import { UserRouter } from './UserController'
import { ChannelRouter } from './ChannelController'
import { Router } from '../types'

const RootController: Router = (app) => {
    UserRouter(app)
    ChannelRouter(app)
}

export { RootController }