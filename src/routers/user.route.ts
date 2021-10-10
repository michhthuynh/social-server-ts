import { Router } from 'express'
import { body } from 'express-validator'
import { createUserController } from '../controllers/user.controller'
import { hashPassword } from '../middlewares/authen.middleware'
import { validateParams } from '../middlewares/validateParams.middleware'

const userRouter = Router()

userRouter.post(
  '/create',
  body('email').isEmail(),
  body('lastName').isLength({ min: 3, max: 20 }),
  body('firstName').isLength({ min: 3, max: 20 }),
  body('username').isLength({ min: 10, max: 25 }).isLowercase(),
  body('birthDate').isISO8601(),
  body('gender').isBoolean(),
  body('password').isStrongPassword({ minLength: 10 }),
  body('mobile').isMobilePhone('vi-VN'),
  validateParams,
  hashPassword,
  createUserController
)

export default userRouter
