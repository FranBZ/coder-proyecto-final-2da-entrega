import { config } from 'dotenv'
config()

const { MONGO_USER, MONGO_PASS, MONGO_DB } = process.env

export const MONGO_URI_LOCAL = `mongodb://franbzroot:rootSarlacA4730@localhost:27017/ecommerce`