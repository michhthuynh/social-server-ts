import express, { Application, Request, Response } from 'express'
import routers from './routers'
import morgan from 'morgan'

import dotenv from 'dotenv'

dotenv.config()
if (process.env.PRODUCTION == 'true') {
  console.log('This server is using production of node')
} else {
  console.log('This server is using for development')
}

const PORT = process.env.PORT || 5000
const app: Application = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use('/', routers)
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
