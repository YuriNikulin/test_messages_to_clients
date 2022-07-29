import express from 'express'
import { RootRouter } from './routes/RootRouter'
import { config } from './config'
import { Channel } from './entities'

const app = express()

app.use(express.json())

app.listen(config.port)

RootRouter(app)
Channel.fillTableWithData()