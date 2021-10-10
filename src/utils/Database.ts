import { Pool } from 'pg'

const Database = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'social_database'
})

export default Database
