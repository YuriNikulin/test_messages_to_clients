import express from 'express'
import { RootController } from './controllers/RootController'
import { config } from './config'
import { User } from './entities'

const app = express()

app.use(express.json())

app.listen(config.port)

RootController(app)
User.createFirstUserIfNecessary()