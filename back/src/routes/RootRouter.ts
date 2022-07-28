import { UserRouter } from './UserRouter'
import { ServiceRouter } from '../types'

const RootRouter: ServiceRouter = (app) => {
    UserRouter(app)
}

export { RootRouter }