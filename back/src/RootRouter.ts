import { UserRouter } from './services/UserService/UserRouter'
import { ServiceRouter } from './types'

const RootRouter: ServiceRouter = (app) => {
    UserRouter(app)
}

export { RootRouter }