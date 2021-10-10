import { Router } from 'express'
import authRouter from './auth.route'
import userRouter from './user.route'

const routers = Router()

routers.use('/user', userRouter)
routers.use('/auth', authRouter)

export default routers
