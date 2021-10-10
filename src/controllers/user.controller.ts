import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { QueryResult } from 'pg'
import Database from '../utils/Database'

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const now = new Date()
  const { username, lastName, firstName, birthDate, gender, email, mobile } = req.body
  try {
    const response: QueryResult = await Database.query('SELECT* FROM users WHERE username = $1', [username])
    if (response.rows.length > 0) {
      res.status(400).json({
        message: 'Username is using, Please using another username!!!'
      })
      return
    }
  } catch (error) {
    returnError(res, error)
    return
  }
  try {
    const response: QueryResult = await Database.query('SELECT* FROM users WHERE email = $1', [email])
    if (response.rows.length > 0) {
      res.status(400).json({
        message: 'Email is using. Please using the another email!!!'
      })
      return
    }
  } catch (error) {
    returnError(res, error)
    return
  }

  try {
    const response: QueryResult = await Database.query(
      'INSERT INTO users (birth_date, created_date, gender, username, password_hash, first_name, last_name, update_date, email, mobile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *',
      [birthDate, now, gender, username, res.locals.passwordHash, firstName, lastName, now, email, mobile]
    )
    if (response.rowCount === 1) {
      console.log(`Insert User successfully: ${username}`)
      const privateKey = process.env.JWT_SECRET_KEY || 'secret'
      const token = await sign({ username }, privateKey, { expiresIn: '1h' })
      const refreshToken = await sign({ username }, privateKey)
      await Database.query('INSERT INTO refresh_tokens (username, refresh_token) VALUES ($1, $2)', [
        username,
        refreshToken
      ])
      res.status(201).json({
        username,
        token: token,
        refresh_token: refreshToken
      })
      return
    } else {
      res.status(503).json({
        message: 'Server is not ready!!!'
      })
      return
    }
  } catch (error) {
    returnError(res, error)
    return
  }
}

const returnError = (res: Response, error: any) => {
  console.log(error)
  res.status(400).json({
    message: 'Cannot create the user!!!'
  })
}
