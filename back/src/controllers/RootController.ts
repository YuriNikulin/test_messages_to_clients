import { UserController } from './UserController'
import { Controller } from 'types'

const RootController: Controller = (app) => {
    UserController(app)
}

export { RootController }