import { Router } from 'express'
import { body } from 'express-validator'
import { loginController } from '../controllers/auth.controller'
import { validateParams } from '../middlewares/validateParams.middleware'

const authRouter = Router()

authRouter.post(
  '/login',
  body('username').isLength({ min: 10, max: 25 }).isLowercase(),
  body('password').isStrongPassword({ minLength: 10 }),
  validateParams,
  loginController
)

export default authRouter
