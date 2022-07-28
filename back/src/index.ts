import express from 'express'
import { RootRouter } from './RootRouter'
import config from './config.json'

const app = express()

app.listen(config.common.port)

RootRouter(app)
