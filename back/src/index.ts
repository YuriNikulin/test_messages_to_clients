import express from 'express'
import { RootRouter } from './routes/RootRouter'
import config from './config.json'

const app = express()

app.use(express.json())

app.listen(config.common.port)

RootRouter(app)
