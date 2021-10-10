import { genSalt, hash } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

export const hashPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { password } = req.body
  console.log(password)
  try {
    const salt = await genSalt(10)
    res.locals.passwordHash = await hash(password, salt)
    next()
    return
  } catch (error) {
    console.log(error)
    res.status(503).json({
      message: 'Server is not ready!!!'
    })
    return
  }
}
