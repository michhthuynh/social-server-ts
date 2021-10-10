import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { QueryResult } from 'pg'
import Database from '../utils/Database'

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body
  try {
    const response: QueryResult = await Database.query('SELECT * FROM users where username=$1', [username])
    if (response.rows.length > 0) {
      const compareResult = await compare(password, response.rows[0]['password_hash'])
      if (compareResult) {
        const privateKey = process.env.JWT_SECRET_KEY || 'secret'
        const token = await sign({ username }, privateKey, { expiresIn: '1h' })
        const response: QueryResult = await Database.query('SELECT * FROM refresh_tokens where username=$1', [username])
        if (response.rowCount > 0) {
          res.status(200).json({
            username,
            token: token,
            refresh_token: response.rows[0]['refresh_token']
          })
          return
        } else {
          const refreshToken = await sign({ username }, privateKey)
          await Database.query('INSERT INTO refresh_tokens (username, refresh_token) VALUES ($1, $2)', [
            username,
            refreshToken
          ])
          res.status(200).json({
            username,
            token: token,
            refresh_token: refreshToken
          })
        }
      } else {
        res.status(400).json({
          message: 'Login failed'
        })
      }
    } else {
      res.status(400).json({
        message: 'Username is exist. Please check it again!!!'
      })
      return
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(503)
  }
}
