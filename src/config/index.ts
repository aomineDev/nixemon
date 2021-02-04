import dotenv from 'dotenv'

dotenv.config()
interface Config {
  token: string
  prefix: string
}

const config: Config = {
  token: process.env.TOKEN === undefined ? '' : process.env.TOKEN,
  prefix: process.env.PREFIX === undefined ? '' : process.env.PREFIX
}

export default config
