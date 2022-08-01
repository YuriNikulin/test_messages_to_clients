import express from 'express'
import { RootController } from './controllers/RootController'
import { config } from './config'
import { User } from './entities'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.port)
console.log(process.env.port)

RootController(app)
User.createFirstUserIfNecessary()