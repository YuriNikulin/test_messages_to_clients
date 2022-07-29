import { UserRouter } from './UserController'
import { Router } from 'types'

const RootController: Router = (app) => {
    UserRouter(app)
}

export { RootController }