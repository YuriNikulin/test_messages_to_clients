import express from 'express'
import { RootController } from './controllers/RootController'
import { config } from './config'
import { User } from './entities'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())

app.listen(config.port)

RootController(app)
User.createFirstUserIfNecessary()