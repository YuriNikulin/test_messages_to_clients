import express from 'express'
import { RootController } from './controllers/RootController'
import { User } from './entities'
import dotenv from 'dotenv'
import cors from 'cors'
import { StorageService } from './services/StorageService'
import { LocalStorageService } from './services/LocalStorageService'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.port)
console.log(process.env.port)

RootController(app)

const createFirstUser = async () => {
    await StorageService.defineStorageType()
    User.createFirstUserIfNecessary()
}

createFirstUser()
